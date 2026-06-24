"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  emptyAnswers,
  evaluate,
  nextStep,
  APPLY_URL,
  type EligibilityAnswers,
  type IncomeBand,
  type ResultKey,
  type StepId,
} from "@/lib/eligibility";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

type Who = "bot" | "user";
interface Msg {
  who: Who;
  html: string;
}

type InputMode =
  | { kind: "choices"; step: StepId }
  | { kind: "text"; field: "city" | "email" }
  | { kind: "consent" }
  | { kind: "restart" }
  | { kind: "none" };

const INCOME_LABEL_KEY: Record<IncomeBand, keyof Dictionary["income"]> = {
  under_70k: "under70",
  "70k_80k": "70to80",
  "80k_90k": "80to90",
  "90k_plus": "90plus",
};

/** Hybrid eligibility chat: deterministic interview/verdict with an optional LLM free-text layer. */
export default function Chat({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.chat;
  const [messages, setMessages] = useState<Msg[]>([]);
  const [mode, setMode] = useState<InputMode>({ kind: "none" });
  const [typing, setTyping] = useState(false);
  const [llmEnabled, setLlmEnabled] = useState(true);
  const [draft, setDraft] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const answers = useRef<EligibilityAnswers>(emptyAnswers());
  const logRef = useRef<HTMLDivElement>(null);
  const pendingResultCta = useRef<ResultKey | null>(null);

  const pushBot = useCallback((html: string) => setMessages((m) => [...m, { who: "bot", html }]), []);
  const pushUser = useCallback((text: string) => setMessages((m) => [...m, { who: "user", html: escapeHtml(text) }]), []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing, mode]);

  // Type out a sequence of bot bubbles with a small delay, then run cb.
  const botSay = useCallback(
    async (lines: string[]) => {
      for (const line of lines) {
        setTyping(true);
        await wait(420 + Math.min(line.length * 6, 600));
        setTyping(false);
        pushBot(line);
        await wait(180);
      }
    },
    [pushBot]
  );

  const askStep = useCallback(
    async (step: StepId) => {
      setMode({ kind: "none" });
      await botSay(t.questions[step]);
      setMode({ kind: "choices", step });
    },
    [botSay, t.questions]
  );

  const advance = useCallback(async () => {
    const r = evaluate(answers.current);
    if (r.key !== "incomplete") {
      await showResult(r.key);
      return;
    }
    const step = nextStep(answers.current);
    if (step) await askStep(step);
  }, [askStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- applying an answer to a slot ----
  const applyAnswer = useCallback(
    async (step: StepId, value: string) => {
      const a = answers.current;
      if (step === "incomeBand") {
        a.incomeBand = value as IncomeBand;
      } else if (step === "taxResident") {
        a.taxResident = value === "true";
      } else if (step === "taxFiled") {
        a.taxFiled = value === "true";
      } else {
        a.hasPrivateInsuranceAccess = value === "true";
      }
      await advance();
    },
    [advance]
  );

  // ---- result card ----
  const showResult = useCallback(
    async (key: ResultKey) => {
      setMode({ kind: "none" });
      await wait(300);
      const r = dict.results[key as Exclude<ResultKey, "incomplete">];
      const notes = r.notes.map((n) => `<li>${n}</li>`).join("");
      const tier = r.tier ? `<div class="tier-badge">${r.tier}</div>` : "";
      pendingResultCta.current = key;
      pushBot(
        `<div class="result-card" data-result="${key}">${tier}` +
          `<h4 class="${verdictClass(key)}">${r.verdict}</h4>` +
          `<p>${r.body}</p><ul>${notes}</ul></div>`
      );
      setMode({ kind: "restart" });
    },
    [dict.results, pushBot]
  );

  // ---- CTA handling after a result ----
  const handleCta = useCallback(
    async (key: ResultKey) => {
      if (key === "ineligible_residency") {
        window.open(APPLY_URL, "_blank", "noopener");
        return;
      }
      if (key === "not_yet_tax") {
        // Route the reminder-email capture through the SAME consent gate as the lead flow
        // (PIPEDA / Law 25): never collect a contact email without explicit consent.
        pushUser(dict.results.remindMe);
        await botSay([t.remindPrompt]);
        setMode({ kind: "consent" });
        return;
      }
      // all eligible + over-income + has-insurance → route to a dentist
      pushUser(ctaLabel(key, dict));
      await botSay([t.cityPrompt]);
      setMode({ kind: "text", field: "city" });
    },
    [botSay, dict, pushUser, t.cityPrompt, t.remindPrompt]
  );

  // ---- free-text submit (hybrid LLM path or city/email capture) ----
  const submitText = useCallback(
    async (raw: string) => {
      const value = raw.trim();
      if (!value) return;

      if (mode.kind === "text" && mode.field === "city") {
        // TODO(next phase): capture postal code (not free-text city) + eligibility result + consent
        // metadata and POST to a lead endpoint/CRM. Intentionally a no-op prototype for now — see
        // cdcp/web/README.md "Production TODO".
        pushUser(value);
        setDraft("");
        await botSay([t.cityAck.replace("{city}", escapeHtml(value)), t.consentAsk]);
        setMode({ kind: "consent" });
        return;
      }
      if (mode.kind === "text" && mode.field === "email") {
        if (!isValidEmail(value)) {
          // Give feedback instead of silently doing nothing; keep the draft so they can fix it.
          await botSay([emailInvalidHint(locale)]);
          return;
        }
        pushUser(value);
        setDraft("");
        await botSay(t.done);
        setMode({ kind: "restart" });
        return;
      }
      // Otherwise we're mid-interview: send to the hybrid LLM endpoint to fill the current slot.
      if (mode.kind === "choices") {
        const step = mode.step;
        pushUser(value);
        setDraft("");
        setTyping(true);
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: value, step, locale }),
          });
          const data = await res.json();
          setTyping(false);
          if (data.type === "unavailable") {
            setLlmEnabled(false);
            await botSay([fallbackHint(locale)]);
            setMode({ kind: "choices", step });
          } else if (data.type === "slot") {
            await applyAnswer(step, data.value);
          } else if (data.type === "reply") {
            await botSay([escapeHtml(data.text)]);
            setMode({ kind: "choices", step });
          } else {
            setMode({ kind: "choices", step });
          }
        } catch {
          setTyping(false);
          setLlmEnabled(false);
          setMode({ kind: "choices", step });
        }
      }
    },
    [applyAnswer, botSay, locale, mode, pushUser, t]
  );

  const start = useCallback(async () => {
    answers.current = emptyAnswers();
    setMessages([]);
    setMode({ kind: "none" });
    setConsentChecked(false);
    setDraft("");
    pendingResultCta.current = null;
    await botSay(t.intro);
    await askStep("taxResident");
  }, [botSay, t.intro, askStep]);

  // Kick off on mount.
  useEffect(() => {
    void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- render helpers for the current input area ----
  function renderChoices(step: StepId) {
    const buttons: { label: string; value: string }[] = choicesFor(step, dict);
    return (
      <div className="choices">
        {buttons.map((b) => (
          <button
            key={b.value + b.label}
            type="button"
            className="choice-btn"
            onClick={() => {
              pushUser(b.label);
              void applyAnswer(step, b.value);
            }}
          >
            {b.label}
          </button>
        ))}
        {llmEnabled && renderTextRow(t.placeholderType)}
      </div>
    );
  }

  function renderTextRow(placeholder: string, type: "text" | "email" = "text") {
    return (
      <form
        className="text-row"
        onSubmit={(e) => {
          e.preventDefault();
          void submitText(draft);
        }}
      >
        <input
          type={type}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          autoComplete="off"
        />
        <button className="btn btn-primary" type="submit">
          {t.send}
        </button>
      </form>
    );
  }

  function renderInput() {
    if (typing) return null;
    switch (mode.kind) {
      case "choices":
        return renderChoices(mode.step);
      case "text":
        return renderTextRow(mode.field === "email" ? t.placeholderEmail : t.placeholderCity, mode.field === "email" ? "email" : "text");
      case "consent":
        return (
          <div className="consent-box">
            <label className="consent-check">
              <input type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} />
              <span>
                {dict.consent.checkbox}{" "}
                <a href={localePath(locale, "/privacy")} target="_blank" rel="noopener">
                  {dict.consent.privacyLink}
                </a>
              </span>
            </label>
            <button
              className="btn btn-primary"
              type="button"
              disabled={!consentChecked}
              onClick={() => {
                void botSay([t.emailPrompt]).then(() => setMode({ kind: "text", field: "email" }));
              }}
            >
              {dict.consent.accept}
            </button>
          </div>
        );
      case "restart": {
        const key = pendingResultCta.current;
        return (
          <div className="choices">
            {key && key !== "not_yet_tax" && key !== "ineligible_residency" && (
              <button className="btn btn-primary" type="button" onClick={() => void handleCta(key)}>
                {ctaLabel(key, dict)}
              </button>
            )}
            {key === "not_yet_tax" && (
              <button className="btn btn-primary" type="button" onClick={() => void handleCta(key)}>
                {dict.results.remindMe}
              </button>
            )}
            {key === "ineligible_residency" && (
              <button className="btn btn-primary" type="button" onClick={() => void handleCta(key)}>
                {dict.results.learnMore}
              </button>
            )}
            <a className="btn btn-ghost" href={APPLY_URL} target="_blank" rel="noopener">
              {dict.results.officialApply}
            </a>
            <button className="choice-btn" type="button" onClick={() => void start()}>
              ↺ {t.restart}
            </button>
          </div>
        );
      }
      default:
        return null;
    }
  }

  return (
    <div className="chat-card" id="chat">
      <div className="chat-head">
        <div className="chat-head-left">
          <span className="bot-avatar">🦷</span>
          <div>
            <div className="bot-name">{t.title}</div>
            <div className="bot-status">
              <span className="dot" /> {t.status}
            </div>
          </div>
        </div>
        <button className="restart" type="button" title={t.restart} onClick={() => void start()}>
          ↺
        </button>
      </div>

      <div className="chat-log" ref={logRef} aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}`} dangerouslySetInnerHTML={{ __html: m.html }} />
        ))}
        {typing && (
          <div className="typing">
            <span /> <span /> <span />
          </div>
        )}
      </div>

      <div className="chat-input-area">{renderInput()}</div>

      <div className="chat-disclaimer">
        {t.disclaimer}{" "}
        <a href={APPLY_URL} target="_blank" rel="noopener">
          {t.officialLink}
        </a>
      </div>
    </div>
  );
}

// ---- pure helpers ----
function choicesFor(step: StepId, dict: Dictionary): { label: string; value: string }[] {
  const c = dict.chat;
  switch (step) {
    case "taxResident":
      return [
        { label: c.yes, value: "true" },
        { label: c.no, value: "false" },
      ];
    case "taxFiled":
      return [
        { label: c.answers.taxFiledYes, value: "true" },
        { label: c.answers.taxFiledNo, value: "false" },
      ];
    case "hasPrivateInsuranceAccess":
      return [
        { label: c.answers.insNo, value: "false" },
        { label: c.answers.insGov, value: "false" },
        { label: c.answers.insYes, value: "true" },
      ];
    case "incomeBand":
      return [
        { label: dict.income[INCOME_LABEL_KEY.under_70k], value: "under_70k" },
        { label: dict.income[INCOME_LABEL_KEY["70k_80k"]], value: "70k_80k" },
        { label: dict.income[INCOME_LABEL_KEY["80k_90k"]], value: "80k_90k" },
        { label: dict.income[INCOME_LABEL_KEY["90k_plus"]], value: "90k_plus" },
      ];
  }
}

function ctaLabel(key: ResultKey, dict: Dictionary): string {
  const r = dict.results;
  if (key === "ineligible_income") return r.showOptions;
  if (key === "ineligible_insurance") return r.findAnyDentist;
  if (key === "ineligible_residency") return r.learnMore;
  if (key === "not_yet_tax") return r.remindMe;
  return r.findDentist;
}

function verdictClass(key: ResultKey): string {
  return key.startsWith("eligible") ? "verdict-eligible" : "verdict-no";
}

/** Pragmatic email check — stricter than `includes("@")` without over-rejecting valid addresses. */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function emailInvalidHint(locale: Locale): string {
  return locale === "fr"
    ? "Hmm, cette adresse courriel ne semble pas valide — pouvez-vous la vérifier ?"
    : "Hmm, that doesn't look like a valid email — mind double-checking it?";
}

function fallbackHint(locale: Locale): string {
  return locale === "fr"
    ? "Pas de souci — choisissez simplement une réponse ci-dessous. 👇"
    : "No problem — just pick an answer below. 👇";
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
