/**
 * CDCP deterministic eligibility engine — the single source of truth.
 *
 * Mirrors docs/ELIGIBILITY-REFERENCE.md exactly. The hybrid chatbot uses an LLM only to
 * understand natural language and fill these structured slots; the VERDICT is always computed
 * here, deterministically, so the bot can never hallucinate a wrong "you qualify / you don't".
 *
 * When the rules change (≈yearly), update ELIGIBILITY-REFERENCE.md first, then this file, then
 * the tests in test/eligibility.test.mjs.
 */

export const APPLY_URL =
  "https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html";

/** The four structured inputs that decide eligibility. `null` = not yet answered. */
export interface EligibilityAnswers {
  /** Resident of Canada for tax purposes. */
  taxResident: boolean | null;
  /** Applicant (and spouse/common-law partner, if any) filed last year's tax return. */
  taxFiled: boolean | null;
  /**
   * Has ACCESS to private dental insurance (employer / pension / group / purchased — own or a
   * family member's), even if declined. Coverage through a government social program does NOT
   * count and should be recorded as `false` here.
   */
  hasPrivateInsuranceAccess: boolean | null;
  /** Adjusted family net income band. */
  incomeBand: IncomeBand | null;
}

export type IncomeBand = "under_70k" | "70k_80k" | "80k_90k" | "90k_plus";

export type ResultKey =
  | "eligible_full"
  | "eligible_60"
  | "eligible_40"
  | "ineligible_income"
  | "ineligible_insurance"
  | "ineligible_residency"
  | "not_yet_tax"
  | "incomplete";

export interface EligibilityResult {
  key: ResultKey;
  eligible: boolean;
  /** Share of eligible costs CDCP pays (0..1), or null when not eligible/unknown. */
  cdcpShare: number | null;
  /** Patient co-pay share (0..1), or null. */
  coPayShare: number | null;
  /** i18n key used to look up the localized result copy. */
  reason: string;
}

export const INCOME_BANDS: { value: IncomeBand; labelKey: string }[] = [
  { value: "under_70k", labelKey: "income.under70" },
  { value: "70k_80k", labelKey: "income.70to80" },
  { value: "80k_90k", labelKey: "income.80to90" },
  { value: "90k_plus", labelKey: "income.90plus" },
];

export function emptyAnswers(): EligibilityAnswers {
  return {
    taxResident: null,
    taxFiled: null,
    hasPrivateInsuranceAccess: null,
    incomeBand: null,
  };
}

/**
 * Evaluate the decision tree. Short-circuits in priority order so the user gets the most relevant
 * single reason (residency → tax filing → insurance access → income), matching the reference doc.
 */
export function evaluate(a: EligibilityAnswers): EligibilityResult {
  if (a.taxResident === false) {
    return result("ineligible_residency", false, null, null);
  }
  if (a.taxFiled === false) {
    return result("not_yet_tax", false, null, null);
  }
  if (a.hasPrivateInsuranceAccess === true) {
    return result("ineligible_insurance", false, null, null);
  }

  switch (a.incomeBand) {
    case "90k_plus":
      return result("ineligible_income", false, null, null);
    case "80k_90k":
      return result("eligible_40", true, 0.4, 0.6);
    case "70k_80k":
      return result("eligible_60", true, 0.6, 0.4);
    case "under_70k":
      return result("eligible_full", true, 1, 0);
    default:
      // Not all questions answered yet.
      return result("incomplete", false, null, null);
  }
}

function result(
  key: ResultKey,
  eligible: boolean,
  cdcpShare: number | null,
  coPayShare: number | null
): EligibilityResult {
  return { key, eligible, cdcpShare, coPayShare, reason: `result.${key}` };
}

/** Ordered conversation steps the chat walks through. */
export type StepId = "taxResident" | "taxFiled" | "hasPrivateInsuranceAccess" | "incomeBand";

export const STEP_ORDER: StepId[] = [
  "taxResident",
  "taxFiled",
  "hasPrivateInsuranceAccess",
  "incomeBand",
];

/** Next unanswered step, or null when every slot is filled. */
export function nextStep(a: EligibilityAnswers): StepId | null {
  for (const id of STEP_ORDER) {
    if (a[id] === null) return id;
  }
  return null;
}

/** True once a terminal verdict can be given (either short-circuited or all slots filled). */
export function isComplete(a: EligibilityAnswers): boolean {
  return evaluate(a).key !== "incomplete";
}
