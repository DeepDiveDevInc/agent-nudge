import Anthropic from "@anthropic-ai/sdk";
import type { StepId } from "@/lib/eligibility";

export const runtime = "nodejs";

/**
 * Hybrid eligibility chat — natural-language layer only.
 *
 * The browser sends the user's free-text answer plus which structured slot we're trying to fill.
 * Claude does ONE of two things and returns strict JSON:
 *   - extracts a normalized value for that slot  -> { type: "slot", step, value }
 *   - answers a CDCP question and re-asks        -> { type: "reply", text }
 *
 * It NEVER decides eligibility — that verdict is computed deterministically in the browser from the
 * slots (see lib/eligibility.ts). If ANTHROPIC_API_KEY is unset, we return { type: "unavailable" }
 * and the UI falls back to button-only input, which works fully.
 */

const MODEL = process.env.CDCP_CHAT_MODEL || "claude-haiku-4-5-20251001";

const GROUNDING = `You are the eligibility assistant for an independent guide to the Canadian Dental Care Plan (CDCP). Facts you may rely on:
- Four requirements, all needed: (1) Canadian resident for tax purposes; (2) filed last year's tax return (spouse/common-law partner too); (3) adjusted family net income under $90,000; (4) no ACCESS to private dental insurance.
- "Access" to insurance = employer/pension/group/student/purchased coverage, own or a family member's, even if declined. Coverage through a GOVERNMENT social program does NOT count.
- Co-pay tiers: under $70k -> CDCP pays 100%; $70k-$79,999 -> 60%; $80k-$89,999 -> 40%; $90k+ -> not eligible.
- CDCP pays against established fees that can be lower than a dentist's charge, so people may owe a difference even at the 0% co-pay tier.
- You are NOT the government; you give unofficial estimates. Be warm, brief, plain-language. Never state a final eligibility verdict yourself — the app computes it.`;

interface SlotSpec {
  description: string;
  values: string;
}

function slotSpec(step: StepId): SlotSpec {
  switch (step) {
    case "taxResident":
      return { description: "Is the user a resident of Canada for tax purposes?", values: '"true" or "false"' };
    case "taxFiled":
      return { description: "Has the user (and partner, if any) filed last year's tax return?", values: '"true" or "false"' };
    case "hasPrivateInsuranceAccess":
      return {
        description:
          "Does the user have ACCESS to private dental insurance (employer/pension/group/purchased, own or family member's, even if declined)? A government social program does NOT count, so that is false.",
        values: '"true" or "false"',
      };
    case "incomeBand":
      return {
        description: "Which adjusted family net income band is the user in?",
        values: '"under_70k", "70k_80k", "80k_90k", or "90k_plus"',
      };
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ type: "unavailable" });
  }

  let body: { text?: string; step?: StepId; locale?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ type: "error", text: "Bad request." }, { status: 400 });
  }

  const text = (body.text || "").slice(0, 600).trim();
  const step = body.step;
  if (!text || !step) {
    return Response.json({ type: "error", text: "Missing input." }, { status: 400 });
  }
  const locale = body.locale === "fr" ? "fr" : "en";
  const spec = slotSpec(step);

  const system = `${GROUNDING}

We are currently trying to answer ONE question: ${spec.description}
Valid normalized values: ${spec.values}.

Read the user's message and respond with STRICT JSON, no prose, one of:
{"type":"slot","value":<one of the valid values as a string>}
  - use this when the message clearly answers the current question.
{"type":"reply","text":"<a short, friendly clarification or answer, then re-ask the current question>"}
  - use this when the message is a question, is ambiguous, or doesn't answer the current question.
Reply in ${locale === "fr" ? "French (Canadian)" : "English"}. Keep "reply" under 60 words. Output ONLY the JSON object.`;

  try {
    const client = new Anthropic({ apiKey });
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system,
      messages: [{ role: "user", content: text }],
    });

    const raw = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    const parsed = safeParse(raw);
    if (parsed && parsed.type === "slot" && isValidValue(step, parsed.value)) {
      return Response.json({ type: "slot", step, value: parsed.value });
    }
    if (parsed && parsed.type === "reply" && typeof parsed.text === "string") {
      return Response.json({ type: "reply", text: parsed.text });
    }
    // Model didn't return usable JSON — degrade gracefully to a clarifying reply.
    return Response.json({
      type: "reply",
      text:
        locale === "fr"
          ? "Désolé, je n'ai pas bien compris. Pouvez-vous reformuler ou utiliser les boutons ci-dessous ?"
          : "Sorry, I didn't quite catch that. Could you rephrase, or use the buttons below?",
    });
  } catch {
    // API failure — let the client fall back to buttons.
    return Response.json({ type: "unavailable" });
  }
}

function safeParse(raw: string): { type?: string; value?: string; text?: string } | null {
  try {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start < 0 || end < 0) return null;
    return JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
}

function isValidValue(step: StepId, value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (step === "incomeBand") {
    return ["under_70k", "70k_80k", "80k_90k", "90k_plus"].includes(value);
  }
  return value === "true" || value === "false";
}
