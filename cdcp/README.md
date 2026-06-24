# CDCP Guide — Canadian Dental Care Plan eligibility + lead platform

Working project for **cdcpguide.com / .ca** (consumer eligibility + education) and
**cdcpbilling.com / .ca** (dentist advisory + billing onboarding).

The mission: become the #1 independent resource Canadians use to figure out whether
they qualify for the **Canadian Dental Care Plan (CDCP)** and to get connected to a
participating dentist — and the #1 resource that helps dental practices start accepting
CDCP patients.

## What's in here

| Path | What it is |
|------|------------|
| `docs/STRATEGY.md` | The full business + monetization + **compliance** strategy. Read this first. |
| `docs/ELIGIBILITY-REFERENCE.md` | Authoritative CDCP eligibility rules + the decision tree the chatbot uses. Single source of truth. |
| `docs/SEO-PLAN.md` | Keyword research, the page map for Google **and** AI search, and the content calendar. |
| `site/` | Working prototype of the consumer site, including a functional rules-based eligibility chatbot. |

## View the prototype

It's a static site — no build step, no API keys.

```bash
cd cdcp/site
python3 -m http.server 8080
# open http://localhost:8080
```

## The one thing you need to know before anything else

Your original model — **"sell leads to dentists and collect a referral fee per patient"** —
collides with Canadian dental regulation. Paying or receiving a fee for the *referral of a
patient* (fee-splitting) is prohibited nationally and enforced by every provincial dental
college. Ontario's RCDSO goes further and bars marketing fees that are tied to "the amount of
business you obtain."

This does **not** kill the business. It reshapes it: revenue from the dentist side has to be a
**fixed-fee advertising / directory / subscription / advisory** model, not a per-converted-patient
bounty. That model is more defensible and scales better anyway. The full reasoning, the citations,
and the compliant revenue design are in `docs/STRATEGY.md`.

> ⚠️ Nothing in this repo is legal advice. Before you take a dollar from a dentist, get a written
> opinion from a Canadian health-regulatory lawyer in each province you operate in.

## Status

First pass / strategy branch. The prototype demonstrates the consumer flow and eligibility bot.
Production stack recommendation (Next.js + bilingual i18n + real LLM-backed chat + CRM) is in the
strategy doc.
