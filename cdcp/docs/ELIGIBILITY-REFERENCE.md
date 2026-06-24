# CDCP Eligibility Reference — single source of truth

This is the canonical logic for the eligibility chatbot. The code in `site/app.js` must match this
document. **When the rules change (they update roughly yearly), change this file first, then the
code.** Verify against canada.ca before each publish.

_Summarized from public sources as of June 2026. Unofficial. Final eligibility is determined by
Service Canada / CRA._

---

## The 4 requirements (ALL must be true)

A person qualifies for the CDCP only if **all four** are true:

1. **Resident of Canada for tax purposes.**
2. **Filed a tax return** for the previous year (for the **2026** benefit year, the **2025** return —
   and the spouse/common-law partner must have filed too, if applicable).
3. **Adjusted family net income (AFNI) under $90,000.**
4. **No access to private dental insurance.**

If any one is false → **not eligible** (route to alternatives, see STRATEGY §6).

---

## Definitions the bot must handle

### Adjusted family net income (AFNI)
- Net income (line 23600 of the T1) of the applicant **plus** spouse/common-law partner, with CRA
  adjustments. **Not** gross salary.
- We only ever need the **band**, not the exact number. Ask which band they're in.

### "Access to private dental insurance" — the tricky test
A person is considered to **have access** (→ disqualified) if they have dental coverage through:
- Their or a **family member's employer** benefits (incl. health/wellness spending accounts).
- Their or a family member's **pension** (incl. federal/provincial/territorial government employer
  pensions).
- **Insurance purchased privately** by them/a family member or through a **group/professional/
  student** plan.

Critical nuances the bot must state:
- **Declining** available employer/pension coverage **still counts as having access** → not eligible.
- Coverage through a **government social program** (federal/provincial/territorial) does **NOT** count
  as private insurance → such a person can **still qualify** (CDCP coordinates with these programs).

---

## Co-payment tiers (what CDCP pays of *eligible* costs)

| Adjusted family net income | CDCP pays | You pay (co-pay) |
|---|---|---|
| Under **$70,000** | 100% | 0% |
| **$70,000 – $79,999** | 60% | 40% |
| **$80,000 – $89,999** | 40% | 60% |
| **$90,000 or more** | — | Not eligible |

### The "free isn't always free" caveat (the bot MUST surface this)
CDCP reimburses against its **established fees** (the Sun Life benefit grid), which can be **lower
than what a dentist actually charges**. So even at the **0% co-pay** tier, a patient may owe the
**difference** between the dentist's charge and the CDCP established fee, plus any non-covered
services. Tell users to confirm costs with the dentist up front, and prefer dentists who bill at the
CDCP grid.

---

## Decision tree (what the chatbot implements)

```
START
 │
 ├─ Q1. Are you a resident of Canada for tax purposes?
 │     NO  → NOT ELIGIBLE (reason: residency) → alternatives
 │     YES ↓
 │
 ├─ Q2. Have you (and your spouse/common-law partner, if any) filed last year's tax return?
 │     NO  → NOT YET ELIGIBLE (reason: must file the 2025 return first) → "file, then come back"
 │     YES ↓
 │
 ├─ Q3. Do you have ACCESS to private dental insurance (employer / pension / group / purchased —
 │       yours OR a family member's), even if you don't use it?
 │       (Coverage through a GOVERNMENT social program does NOT count here.)
 │     YES → NOT ELIGIBLE (reason: has access to private insurance) → alternatives
 │     NO  ↓
 │
 └─ Q4. What is your adjusted family net income band?
        ≥ $90,000        → NOT ELIGIBLE (reason: income) → alternatives / private options
        $80,000–$89,999  → ELIGIBLE, tier: CDCP pays 40% (you pay 60%)
        $70,000–$79,999  → ELIGIBLE, tier: CDCP pays 60% (you pay 40%)
        < $70,000        → ELIGIBLE, tier: CDCP pays 100% (no co-pay)
```

### Outcomes the bot returns
- `eligible_full` — under $70k, 0% co-pay. Show: covered services, "free isn't free" caveat, find a
  dentist, how to apply.
- `eligible_60` — $70–80k, 40% co-pay.
- `eligible_40` — $80–90k, 60% co-pay.
- `ineligible_income` — ≥ $90k → private insurance / discount plans / financing / still find a
  dentist.
- `ineligible_insurance` — has access → "use your existing coverage" content + find a dentist.
- `ineligible_residency` — not a tax resident → general info, no routing to CDCP.
- `not_yet_tax` — hasn't filed → "file your return, then re-check," capture email for follow-up.

Every outcome routes to **find-a-dentist** (eligible or not — see STRATEGY §6) and offers email
follow-up.

---

## Mandatory disclaimers (must appear with every result)
- "This is an unofficial estimate, not a guarantee of coverage."
- "Final eligibility is determined by the Government of Canada (Service Canada) and the CRA."
- Link to the official apply page: https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html

---

## Application channel (for the "how do I apply" content)
- Apply online or by phone via Service Canada; eligibility is validated against CRA tax data.
- Once approved, **Sun Life** administers coverage and sends a welcome package / member card with a
  coverage start date. Care is received from **participating providers**.

## Sources
- https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html
- https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html
- https://www.sunlife.ca/sl/cdcp/en/member/
- https://www.cda-adc.ca/en/oral_health/cdcp/
