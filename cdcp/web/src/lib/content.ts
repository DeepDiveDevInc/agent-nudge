import type { Locale } from "./i18n";

/**
 * Cornerstone guide content (SEO/AEO). Each guide is authored answer-first so answer engines
 * (ChatGPT/Claude/Gemini/Perplexity) can lift a clean, sourced answer. English is always present;
 * French is added per guide as the translation sprint progresses (see docs/SEO-PLAN.md §2). When a
 * locale is missing we fall back to English and show a banner — honest and crawl-safe.
 */

export type Cluster = "eligibility" | "coverage" | "apply" | "find" | "alternatives" | "dentist";

export interface Source {
  label: string;
  url: string;
}

export interface GuideContent {
  metaTitle: string;
  metaDescription: string;
  /** H1 — phrased as the real search question. */
  question: string;
  /** 2–3 sentence direct answer shown in the answer box (the AEO-critical bit). */
  answer: string;
  /** Detailed body as sanitized HTML (authored here, not user input). */
  bodyHtml: string;
}

export interface Guide {
  slug: string;
  cluster: Cluster;
  /** ISO date — drives `dateModified` and the visible "Last updated". */
  updated: string;
  related: string[];
  sources: Source[];
  content: { en: GuideContent } & Partial<Record<Locale, GuideContent>>;
}

const OFFICIAL: Source[] = [
  { label: "Government of Canada — CDCP: Do you qualify", url: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html" },
  { label: "Government of Canada — CDCP: Apply", url: "https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html" },
];
const SUNLIFE: Source = { label: "Sun Life — Canadian Dental Care Plan", url: "https://www.sunlife.ca/sl/cdcp/en/" };

export const GUIDES: Guide[] = [
  {
    slug: "cdcp-eligibility",
    cluster: "eligibility",
    updated: "2026-06-24",
    related: ["do-i-qualify-for-cdcp", "cdcp-income-thresholds-2026", "cdcp-with-dental-insurance"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "CDCP Eligibility 2026: Who Qualifies for the Canadian Dental Care Plan?",
        metaDescription:
          "The 4 requirements to qualify for the Canadian Dental Care Plan in 2026 — residency, tax filing, income under $90,000, and no access to private dental insurance.",
        question: "Who is eligible for the Canadian Dental Care Plan?",
        answer:
          "You qualify for the CDCP if all four are true: you're a Canadian resident for tax purposes, you filed last year's tax return, your adjusted family net income is under $90,000, and you don't have access to private dental insurance. The plan is now open to eligible residents of every age.",
        bodyHtml: `
<h2>The four requirements (all must be true)</h2>
<ol>
  <li><strong>Canadian residency for tax purposes.</strong></li>
  <li><strong>You filed your tax return</strong> for the previous year (your 2025 return for the 2026 benefit year). Your spouse or common-law partner must have filed too.</li>
  <li><strong>Adjusted family net income under $90,000.</strong> This is your and your partner's net income (line 23600), not gross salary.</li>
  <li><strong>No access to private dental insurance.</strong></li>
</ol>
<p>If any one of these is not met, you won't qualify — but you may still have other options, and you can still find a dentist through us.</p>
<h2>What "no access to private insurance" means</h2>
<p>You're considered to have access (and therefore not eligible) if you have dental coverage through an employer, a pension, a professional/group/student plan, or a plan you bought — yours <em>or a family member's</em> — even if you choose not to use it. One important exception: coverage through a <strong>government social program</strong> does not count as private insurance, so you may still qualify.</p>
<h2>How much does it cover?</h2>
<p>If you qualify, your share depends on income. Under $70,000 the plan pays 100% of eligible costs; $70,000–$79,999 it pays 60%; $80,000–$89,999 it pays 40%. See <a href="/{locale}/guides/cdcp-income-thresholds-2026">income thresholds</a> for the full table.</p>`,
      },
    },
  },
  {
    slug: "do-i-qualify-for-cdcp",
    cluster: "eligibility",
    updated: "2026-06-24",
    related: ["cdcp-eligibility", "cdcp-with-dental-insurance", "how-to-apply-for-cdcp"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "Do I Qualify for the Canadian Dental Care Plan? (2026 Check)",
        metaDescription:
          "Find out if you qualify for the CDCP in 2026. Check residency, tax filing, income under $90,000, and insurance access — or use our 60-second eligibility checker.",
        question: "Do I qualify for the Canadian Dental Care Plan?",
        answer:
          "You likely qualify if you're a Canadian tax resident, filed last year's taxes, have adjusted family net income under $90,000, and have no access to private dental insurance. The fastest way to know is to run our free 60-second eligibility check.",
        bodyHtml: `
<h2>Quick self-check</h2>
<ul>
  <li>Are you a resident of Canada for tax purposes? <em>(must be yes)</em></li>
  <li>Did you — and your partner — file last year's tax return? <em>(must be yes)</em></li>
  <li>Is your adjusted family net income under $90,000? <em>(must be yes)</em></li>
  <li>Do you have access to private/employer/pension dental insurance? <em>(must be no)</em></li>
</ul>
<p>Four yes/no/yes/no answers and you have your result. Our eligibility assistant walks you through them and tells you your exact co-pay tier.</p>
<h2>Common "do I still qualify if…" cases</h2>
<p><strong>…I'm retired or a senior?</strong> Yes, age doesn't matter — the income and insurance tests do.<br>
<strong>…I'm self-employed?</strong> Yes, as long as you filed and meet the income/insurance tests.<br>
<strong>…I declined my work benefits?</strong> No — having access counts even if you declined it.<br>
<strong>…I only have provincial/social-program dental coverage?</strong> That doesn't count as private insurance, so you may still qualify.</p>`,
      },
    },
  },
  {
    slug: "cdcp-income-thresholds-2026",
    cluster: "eligibility",
    updated: "2026-06-24",
    related: ["cdcp-eligibility", "cdcp-co-pay-explained", "does-cdcp-cover-100-percent"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "CDCP Income Limits & Co-Pay Tiers 2026",
        metaDescription:
          "CDCP income thresholds for 2026: under $70,000 = 100% covered, $70k–$80k = 60%, $80k–$90k = 40%, $90,000+ = not eligible. Based on adjusted family net income.",
        question: "What are the CDCP income limits for 2026?",
        answer:
          "The CDCP covers people with adjusted family net income under $90,000. Under $70,000, the plan pays 100% of eligible costs; $70,000–$79,999 it pays 60%; $80,000–$89,999 it pays 40%; at $90,000 or more you aren't eligible.",
        bodyHtml: `
<h2>Co-pay tiers by income</h2>
<table>
  <thead><tr><th>Adjusted family net income</th><th>CDCP pays</th><th>You pay</th></tr></thead>
  <tbody>
    <tr><td>Under $70,000</td><td>100%</td><td>$0</td></tr>
    <tr><td>$70,000 – $79,999</td><td>60%</td><td>40%</td></tr>
    <tr><td>$80,000 – $89,999</td><td>40%</td><td>60%</td></tr>
    <tr><td>$90,000 or more</td><td>—</td><td>Not eligible</td></tr>
  </tbody>
</table>
<h2>What "adjusted family net income" means</h2>
<p>It's the net income (line 23600 of the T1) of you plus your spouse or common-law partner, with CRA adjustments — not your gross salary. Because it's based on your tax return, filing is what makes the number official.</p>
<h2>Important: the share is of <em>eligible</em> costs</h2>
<p>These percentages apply to the CDCP's established fees, which can be lower than what a dentist actually charges. See <a href="/{locale}/guides/does-cdcp-cover-100-percent">does CDCP really cover 100%?</a></p>`,
      },
    },
  },
  {
    slug: "what-does-cdcp-cover",
    cluster: "coverage",
    updated: "2026-06-24",
    related: ["does-cdcp-cover-100-percent", "cdcp-dentures-coverage", "cdcp-co-pay-explained"],
    sources: [SUNLIFE, ...OFFICIAL],
    content: {
      en: {
        metaTitle: "What Does the Canadian Dental Care Plan Cover?",
        metaDescription:
          "The CDCP covers preventive care (exams, cleanings, x-rays), fillings, root canals, extractions, dentures and more — within established fees and, for some services, with preauthorization.",
        question: "What does the Canadian Dental Care Plan cover?",
        answer:
          "The CDCP covers a broad range of oral-health services: preventive care like exams, cleanings and x-rays; restorative care like fillings; root canals; extractions and oral surgery; and prosthodontics like dentures. Some services require preauthorization, and coverage is paid against established fees.",
        bodyHtml: `
<h2>Covered service categories</h2>
<ul>
  <li><strong>Preventive:</strong> exams, cleanings (scaling/polishing), fluoride, sealants, x-rays.</li>
  <li><strong>Diagnostic:</strong> assessments and imaging.</li>
  <li><strong>Restorative:</strong> fillings, and other tooth-repair services.</li>
  <li><strong>Endodontic:</strong> root canal treatment.</li>
  <li><strong>Periodontal:</strong> treatment of the gums.</li>
  <li><strong>Prosthodontic:</strong> dentures (and related services).</li>
  <li><strong>Oral surgery:</strong> extractions and related procedures.</li>
</ul>
<h2>Two things to understand before you book</h2>
<p><strong>1. Preauthorization.</strong> Some services need to be approved before they're covered; your dentist handles this through Sun Life.</p>
<p><strong>2. Established fees.</strong> The plan pays based on CDCP established fees, which may differ from your dentist's charges — so confirm costs up front. See <a href="/{locale}/guides/does-cdcp-cover-100-percent">does CDCP cover 100%?</a></p>
<p>Exact covered codes and amounts are set out in the Sun Life benefit grids, updated yearly.</p>`,
      },
    },
  },
  {
    slug: "does-cdcp-cover-100-percent",
    cluster: "coverage",
    updated: "2026-06-24",
    related: ["cdcp-co-pay-explained", "what-does-cdcp-cover", "cdcp-income-thresholds-2026"],
    sources: [SUNLIFE, ...OFFICIAL],
    content: {
      en: {
        metaTitle: "Does CDCP Cover 100%? Why You Might Still Pay",
        metaDescription:
          "If your income is under $70,000 the CDCP pays 100% of eligible costs — but it pays against established fees that can be lower than a dentist's charge, so you may still owe a difference.",
        question: "Does the CDCP really cover 100%?",
        answer:
          "If your adjusted family net income is under $70,000, the CDCP pays 100% of eligible costs — but 'eligible' means the CDCP's established fee, which can be lower than what your dentist charges. So even at the 0% co-pay tier you may owe the difference, plus the cost of any non-covered services.",
        bodyHtml: `
<h2>Why "100%" doesn't always mean "$0"</h2>
<p>The CDCP reimburses dentists according to its own <strong>established fee schedule</strong>. Many dentists set their fees using their provincial suggested fee guide, which is often higher. When a dentist charges above the CDCP established fee, the difference is not covered — even if you're in the 100% tier.</p>
<h2>How to avoid a surprise bill</h2>
<ul>
  <li>Ask the practice directly: "Do you bill at the CDCP established fee, or will I owe a difference?"</li>
  <li>Ask whether any planned service needs preauthorization.</li>
  <li>Ask whether the treatment is fully covered or only partially.</li>
</ul>
<p>We highlight dentists who confirm they bill at the CDCP rate, so you can keep your out-of-pocket cost at or near zero. Run the eligibility check, then we'll help you find one.</p>`,
      },
    },
  },
  {
    slug: "cdcp-co-pay-explained",
    cluster: "coverage",
    updated: "2026-06-24",
    related: ["cdcp-income-thresholds-2026", "does-cdcp-cover-100-percent", "cdcp-eligibility"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "CDCP Co-Pay Explained: How Much Will You Pay?",
        metaDescription:
          "Your CDCP co-pay depends on adjusted family net income: 0% under $70k, 40% from $70k–$80k, 60% from $80k–$90k. Plus any difference above the CDCP established fee.",
        question: "How much is the CDCP co-pay?",
        answer:
          "Your co-pay is the share of eligible costs the CDCP doesn't pay: 0% if your adjusted family net income is under $70,000, 40% from $70,000–$79,999, and 60% from $80,000–$89,999. On top of the co-pay, you may owe any amount a dentist charges above the CDCP established fee.",
        bodyHtml: `
<h2>Two separate amounts you might pay</h2>
<p><strong>1. Your co-pay</strong> — a percentage of the eligible cost, set by your income tier (0%, 40%, or 60%).</p>
<p><strong>2. The "above-grid" difference</strong> — if your dentist charges more than the CDCP established fee, that gap isn't covered, regardless of your tier.</p>
<h2>Example</h2>
<p>Say a covered service has a CDCP established fee of $100 and you're in the 100% tier. The CDCP pays $100. But if your dentist charges $130, you owe the $30 difference. In the 60%-covered tier, the CDCP pays $60, you pay $40 co-pay, plus any above-grid difference.</p>
<p>This is exactly why asking "do you bill at the CDCP rate?" matters so much.</p>`,
      },
    },
  },
  {
    slug: "how-to-apply-for-cdcp",
    cluster: "apply",
    updated: "2026-06-24",
    related: ["cdcp-eligibility", "do-i-qualify-for-cdcp", "find-a-cdcp-dentist"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "How to Apply for the Canadian Dental Care Plan (2026)",
        metaDescription:
          "Apply for the CDCP through Service Canada online or by phone. The CRA validates your income; once approved, Sun Life sends your welcome package and coverage start date.",
        question: "How do I apply for the Canadian Dental Care Plan?",
        answer:
          "Apply through Service Canada online or by phone. The CRA validates your income against your tax return, so make sure you've filed. Once approved, Sun Life sends a welcome package with your coverage start date, and you can start seeing participating dentists.",
        bodyHtml: `
<h2>Before you apply</h2>
<ul>
  <li>File your most recent tax return (and your partner's) — eligibility is based on it.</li>
  <li>Confirm you don't have access to private dental insurance.</li>
  <li>Have your Social Insurance Number and address details ready.</li>
</ul>
<h2>Steps</h2>
<ol>
  <li><strong>Apply</strong> via Service Canada (online or phone).</li>
  <li><strong>Income check</strong> — the CRA confirms your adjusted family net income.</li>
  <li><strong>Enrolment</strong> — if approved, Sun Life administers your coverage and mails a welcome package / member details with a start date.</li>
  <li><strong>Get care</strong> — visit a participating provider on or after your start date.</li>
</ol>
<p>Use the <a href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html" rel="noopener" target="_blank">official application</a> to apply. Then come back and we'll help you find a dentist.</p>`,
      },
    },
  },
  {
    slug: "cdcp-with-dental-insurance",
    cluster: "eligibility",
    updated: "2026-06-24",
    related: ["cdcp-eligibility", "do-i-qualify-for-cdcp", "dont-qualify-for-cdcp-alternatives"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "Can I Get CDCP if I Have Dental Insurance?",
        metaDescription:
          "Generally no — having access to private, employer, pension, or group dental insurance disqualifies you from the CDCP, even if you decline it. Government-program coverage doesn't count.",
        question: "Can I get the CDCP if I have dental insurance?",
        answer:
          "Generally no. If you have access to private dental insurance — through your or a family member's employer, pension, a group/student plan, or a plan you bought — you aren't eligible, even if you decline it. The exception: dental coverage through a government social program does not count, so you may still qualify.",
        bodyHtml: `
<h2>What counts as "access" (disqualifies you)</h2>
<ul>
  <li>Employer or a family member's employer benefits, including health/wellness spending accounts.</li>
  <li>Pension benefits (including government employer pensions).</li>
  <li>Insurance you, a family member, or a group/professional/student plan purchased.</li>
</ul>
<p>Declining available coverage still counts as having access.</p>
<h2>What does <em>not</em> count</h2>
<p>Dental coverage provided through a federal, provincial, or territorial <strong>government social program</strong> is not "private insurance" for this test — so people on those programs can still qualify, and the CDCP coordinates with them.</p>
<h2>If you do have insurance</h2>
<p>You already have coverage to use — we can still connect you with a dentist who accepts your plan. And if that coverage ends (e.g., a job change), come back and re-check, because eligibility is reviewed each year.</p>`,
      },
    },
  },
  {
    slug: "cdcp-for-seniors",
    cluster: "eligibility",
    updated: "2026-06-24",
    related: ["cdcp-eligibility", "what-does-cdcp-cover", "cdcp-dentures-coverage"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "CDCP for Seniors: Eligibility & Coverage (2026)",
        metaDescription:
          "Seniors qualify for the CDCP on the same terms as everyone else: income under $90,000 and no access to private dental insurance. Coverage includes dentures, exams, and more.",
        question: "Are seniors eligible for the Canadian Dental Care Plan?",
        answer:
          "Yes. There's no age limit — seniors qualify on the same terms as everyone: Canadian tax residency, a filed tax return, adjusted family net income under $90,000, and no access to private dental insurance. Coverage includes the services many seniors need, like dentures and exams.",
        bodyHtml: `
<h2>Seniors were among the first groups enrolled</h2>
<p>The CDCP rolled out to seniors first, and it's now open to eligible residents of all ages. If you're 65+, the same four requirements apply.</p>
<h2>Watch the income test for couples</h2>
<p>Eligibility uses <strong>adjusted family net income</strong> — your and your spouse/partner's combined net income. A modest pension can still keep you under the $90,000 threshold.</p>
<h2>Pension coverage caveat</h2>
<p>If you have dental coverage through a pension (including a government employer pension), that counts as access to private insurance and would make you ineligible. Coverage through a government social program does not count.</p>
<p>Dentures, exams, cleanings and more are covered — see <a href="/{locale}/guides/cdcp-dentures-coverage">denture coverage</a>.</p>`,
      },
    },
  },
  {
    slug: "cdcp-dentures-coverage",
    cluster: "coverage",
    updated: "2026-06-24",
    related: ["what-does-cdcp-cover", "does-cdcp-cover-100-percent", "cdcp-for-seniors"],
    sources: [SUNLIFE],
    content: {
      en: {
        metaTitle: "Does the CDCP Cover Dentures?",
        metaDescription:
          "Yes — the CDCP covers dentures as a prosthodontic service, subject to established fees, frequency limits, and (in some cases) preauthorization. Here's what to expect.",
        question: "Does the CDCP cover dentures?",
        answer:
          "Yes, dentures are a covered prosthodontic service under the CDCP. Coverage is paid against established fees and may be subject to frequency limits (for example, how often a denture can be replaced) and, in some cases, preauthorization. You may owe a co-pay and any above-grid difference.",
        bodyHtml: `
<h2>What's typically involved</h2>
<ul>
  <li>Complete and partial dentures are covered categories.</li>
  <li>Replacements are usually limited to once every several years.</li>
  <li>Some denture services may require preauthorization through Sun Life.</li>
</ul>
<h2>What you might pay</h2>
<p>Your income tier sets your co-pay (0%, 40%, or 60%), and if your denturist or dentist charges above the CDCP established fee you'll owe the difference. Ask for a written estimate that shows the CDCP-covered amount and your portion before treatment starts.</p>`,
      },
    },
  },
  {
    slug: "find-a-cdcp-dentist",
    cluster: "find",
    updated: "2026-06-24",
    related: ["how-to-apply-for-cdcp", "does-cdcp-cover-100-percent", "cdcp-eligibility"],
    sources: [SUNLIFE, ...OFFICIAL],
    content: {
      en: {
        metaTitle: "How to Find a Dentist Who Accepts the CDCP",
        metaDescription:
          "Find a dentist who accepts the Canadian Dental Care Plan near you. Participation is voluntary, so confirm the practice takes CDCP and bills at the established fee.",
        question: "How do I find a dentist who accepts the CDCP?",
        answer:
          "Look for practices that have signed up with Sun Life or that bill the CDCP claim-by-claim. Participation is voluntary, so always confirm a practice accepts the CDCP and ask whether they bill at the established fee. Use our eligibility check and we'll point you to participating dentists near you.",
        bodyHtml: `
<h2>Two ways a dentist can take part</h2>
<p>Participation is voluntary. A practice can either formally <strong>sign up with Sun Life</strong> or bill <strong>claim-by-claim</strong>. Either way they bill Sun Life directly, so you don't pay the covered portion up front.</p>
<h2>What to ask when you call</h2>
<ul>
  <li>"Do you accept the Canadian Dental Care Plan?"</li>
  <li>"Do you bill at the CDCP established fee, or will I owe a difference?"</li>
  <li>"Are you accepting new CDCP patients?"</li>
</ul>
<h2>Find one near you</h2>
<p>Run the free eligibility check above and tell us your city or postal code — we'll surface participating dentists accepting new patients, including ones who bill at the CDCP rate to keep your costs down.</p>`,
      },
    },
  },
  {
    slug: "dont-qualify-for-cdcp-alternatives",
    cluster: "alternatives",
    updated: "2026-06-24",
    related: ["cdcp-with-dental-insurance", "cdcp-income-thresholds-2026", "find-a-cdcp-dentist"],
    sources: OFFICIAL,
    content: {
      en: {
        metaTitle: "Don't Qualify for the CDCP? Your Other Options",
        metaDescription:
          "If you're over the income limit or have insurance, you still have options: private dental insurance, dental discount/membership plans, financing, and provincial programs.",
        question: "What are my options if I don't qualify for the CDCP?",
        answer:
          "If you don't qualify for the CDCP, you still have ways to lower dental costs: private dental insurance, dental discount or membership plans, pay-over-time financing for larger treatments, and provincial or territorial dental programs. You can still see any dentist — we'll help you find one.",
        bodyHtml: `
<h2>Your alternatives</h2>
<ul>
  <li><strong>Private dental insurance</strong> — worth comparing if you're just over the income limit or recently lost coverage.</li>
  <li><strong>Dental discount / membership plans</strong> — flat annual fee for reduced rates, no claims.</li>
  <li><strong>Dental financing</strong> — pay-over-time options for crowns, implants, or orthodontics.</li>
  <li><strong>Provincial / territorial programs</strong> — many provinces run targeted dental programs for low-income residents, kids, or seniors that are separate from the CDCP.</li>
</ul>
<h2>You can still get care now</h2>
<p>Not qualifying for the CDCP doesn't change the fact that you need a dentist. Tell us your city and we'll connect you with practices accepting new patients, plus point you to the option that fits your situation.</p>`,
      },
    },
  },
];

/** Look up a guide by its slug. */
export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getGuideContent(g: Guide, locale: Locale): { content: GuideContent; fellBack: boolean } {
  const localized = g.content[locale];
  if (localized) return { content: localized, fellBack: false };
  return { content: g.content.en, fellBack: locale !== "en" };
}

/** All guides in a given intent cluster. */
export function guidesByCluster(cluster: Cluster): Guide[] {
  return GUIDES.filter((g) => g.cluster === cluster);
}

export const CLUSTER_LABELS: Record<Cluster, { en: string; fr: string }> = {
  eligibility: { en: "Eligibility", fr: "Admissibilité" },
  coverage: { en: "Coverage & costs", fr: "Couverture et coûts" },
  apply: { en: "Applying", fr: "Faire une demande" },
  find: { en: "Finding a dentist", fr: "Trouver un dentiste" },
  alternatives: { en: "If you don't qualify", fr: "Si vous n'êtes pas admissible" },
  dentist: { en: "For dentists", fr: "Pour les dentistes" },
};
