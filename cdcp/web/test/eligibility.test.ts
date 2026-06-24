import { test } from "node:test";
import assert from "node:assert/strict";
import {
  evaluate,
  emptyAnswers,
  nextStep,
  isComplete,
  type EligibilityAnswers,
} from "../src/lib/eligibility.ts";

function answers(p: Partial<EligibilityAnswers>): EligibilityAnswers {
  return { ...emptyAnswers(), ...p };
}

const base = {
  taxResident: true,
  taxFiled: true,
  hasPrivateInsuranceAccess: false,
} as const;

test("eligible — full coverage under $70k", () => {
  const r = evaluate(answers({ ...base, incomeBand: "under_70k" }));
  assert.equal(r.key, "eligible_full");
  assert.equal(r.eligible, true);
  assert.equal(r.cdcpShare, 1);
  assert.equal(r.coPayShare, 0);
});

test("eligible — 60% tier $70k–80k", () => {
  const r = evaluate(answers({ ...base, incomeBand: "70k_80k" }));
  assert.equal(r.key, "eligible_60");
  assert.equal(r.cdcpShare, 0.6);
  assert.equal(r.coPayShare, 0.4);
});

test("eligible — 40% tier $80k–90k", () => {
  const r = evaluate(answers({ ...base, incomeBand: "80k_90k" }));
  assert.equal(r.key, "eligible_40");
  assert.equal(r.cdcpShare, 0.4);
});

test("ineligible — income $90k+", () => {
  const r = evaluate(answers({ ...base, incomeBand: "90k_plus" }));
  assert.equal(r.key, "ineligible_income");
  assert.equal(r.eligible, false);
});

test("ineligible — has private insurance access (short-circuits before income)", () => {
  const r = evaluate(
    answers({ taxResident: true, taxFiled: true, hasPrivateInsuranceAccess: true, incomeBand: "under_70k" })
  );
  assert.equal(r.key, "ineligible_insurance");
});

test("not eligible yet — tax return not filed", () => {
  const r = evaluate(answers({ taxResident: true, taxFiled: false }));
  assert.equal(r.key, "not_yet_tax");
});

test("ineligible — not a tax resident (highest priority)", () => {
  const r = evaluate(
    answers({ taxResident: false, taxFiled: false, hasPrivateInsuranceAccess: true, incomeBand: "90k_plus" })
  );
  assert.equal(r.key, "ineligible_residency");
});

test("incomplete until income is provided", () => {
  const a = answers({ ...base });
  assert.equal(evaluate(a).key, "incomplete");
  assert.equal(isComplete(a), false);
  assert.equal(nextStep(a), "incomeBand");
});

test("nextStep walks the steps in order", () => {
  assert.equal(nextStep(emptyAnswers()), "taxResident");
  assert.equal(nextStep(answers({ taxResident: true })), "taxFiled");
  assert.equal(nextStep(answers({ taxResident: true, taxFiled: true })), "hasPrivateInsuranceAccess");
});

test("short-circuit makes a verdict 'complete' even with later slots empty", () => {
  // Not a resident → terminal, even though taxFiled/insurance/income are still null.
  assert.equal(isComplete(answers({ taxResident: false })), true);
});
