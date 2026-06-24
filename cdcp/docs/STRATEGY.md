# CDCP Guide — Business & Compliance Strategy

_Last updated: 2026-06-24. Not legal advice — see the disclaimer at the bottom._

---

## 1. The opportunity in one paragraph

The Canadian Dental Care Plan (CDCP) is a federal program that, as of 2025, opened to all
eligible residents of every age. It covers people with an **adjusted family net income under
$90,000** who **don't have access to private dental insurance**. That's a very large slice of the
country — millions of people, many of whom have never had dental coverage in their adult lives and
have no idea (a) whether they qualify, (b) what's covered, or (c) how to find a dentist who takes
it. The **government's own site is confusing, English-only, and built to administer the program,
not to help a nervous first-time user understand it.** That gap is the business. We build the
clear, bilingual, fast, "just tell me if I qualify" front door — and we monetize the two sides of
the marketplace we sit between: patients who need a dentist, and dentists who want these patients.

---

## 2. The single most important constraint — read before designing revenue

You proposed two dentist-side revenue ideas:

1. **Sell patient leads to dentists.**
2. **Collect a referral fee per patient** we send to a dentist.

Both, *as literally described*, run into Canadian dental regulation. Here is the rule and why it
matters.

### 2.1 Fee-splitting / referral fees are prohibited

The Code of Ethics shared across the Canadian dental profession states, in substance:

> _A dentist may not enter into an arrangement with another dentist, or person, whereby one
> receives part of the fee paid to the other, or by way of commission or discount, for the referral
> of patients._
> — Provincial Dental Board of Nova Scotia, Code of Ethics (this is the national guideline; every
> provincial college has adopted a comparable rule).

So a dentist paying us **"$X every time you send me a patient"** is the textbook prohibited
arrangement. It doesn't matter that the dentist is happy to pay — the *dentist* is the one who gets
disciplined by their college.

### 2.2 You can't disguise it as a "marketing fee" tied to volume

Ontario's regulator (RCDSO) Advertising Guidelines are explicit:

> _Dentists must not engage in advertising/promotion that would result in the sharing or splitting
> of fees or payments to a third party that relate to **the amount of business** that you obtain as
> a result of an advertising or marketing campaign._

Translation: **pay-per-lead and pay-per-converted-patient pricing are also off the table** in
Ontario, and the same logic is applied by other colleges. The regulators specifically anticipated
people relabeling referral fees as "marketing."

### 2.3 What IS allowed

Dentists in Canada spend ~5–10% of gross revenue on marketing routinely. What's permitted is paying
a **fixed fee for advertising and marketing services that is not tied to how many patients show
up**. That includes:

- Directory listings (flat monthly/annual).
- Featured placement / premium profiles (flat fee).
- Advertising on our properties (flat fee or standard CPM/CPC ad-buy — priced on impressions/clicks,
  **not** on booked patients).
- Software/SaaS subscriptions (e.g. a tool that helps them manage CDCP billing).
- Consulting / advisory services (your dentist-side advisory idea — this one is clean).
- Continuing-education / training content.

### 2.4 The pivot (this is the actual model)

> **We do not sell "a patient" or take a cut of a patient's treatment. We sell dentists
> *visibility, tools, and expertise* on a fixed-fee basis, and we sell patients nothing — we serve
> them and route them for free.**

This is strictly better for a durable business:

- **Recurring revenue** (subscriptions) instead of one-off bounties.
- **No per-patient tracking liability** — we never have to prove "this filling came from us," which
  is exactly the thing that makes it look like fee-splitting.
- **Defensible** — every incumbent dental directory in Canada already operates on the fixed-fee
  advertising model. We're not inventing a gray area; we're entering an established, compliant one
  with a better wedge (CDCP-specific intent).

Everywhere this doc says "monetize dentists," read it as the fixed-fee model above. Per-patient
referral fees are dead; stop thinking about them.

> Get a written legal opinion per province before launch. Quebec (ODQ), Ontario (RCDSO), Alberta
> (CDSA), BC (CDSBC/“BC College of Oral Health Professionals”) each have their own advertising and
> ethics rules, and Quebec also triggers French-language (Bill 96 / Charter) obligations.

---

## 3. Who we serve (the two-sided marketplace)

### Side A — Patients / consumers (cdcpguide.com / .ca)
People asking "do I qualify for the dental plan?" We are free to them, forever. We win their trust,
determine eligibility, educate them, and route them to a dentist.

### Side B — Dentists / practices (cdcpbilling.com / .ca)
Practices — especially independent ones — that want CDCP patients and/or help getting set up to bill
the plan. The big DSO/corporate groups already figured this out; **independents are underserved and
that's our opening.** We sell them advisory, tools, and visibility.

The flywheel: more patients → more valuable to dentists → more dentists pay for visibility/tools →
better coverage map → better patient experience → more patients.

---

## 4. Consumer-side product (Side A)

### 4.1 The core flow

1. **Land** on a clean, reassuring page that explains CDCP in plain language (and in French).
2. **Chat** — a ChatGPT-style window where a bot interviews them and tells them, in ~60 seconds,
   whether they likely qualify and at what co-pay tier. (See `ELIGIBILITY-REFERENCE.md` for the
   exact logic. The prototype in `site/` implements this as a deterministic decision tree so it's
   accurate, free to run, and never hallucinates eligibility.)
3. **Educate** — based on their answer, show what's covered, what it'll cost them, how to apply.
4. **Route** — connect them to a participating dentist near them (this is where Side-B value is
   created). Capture consent + contact info so we can help them and follow up.

### 4.2 The chatbot — build approach

- **v1 (in this repo):** deterministic rules engine styled as a chat. It asks the 4 qualifying
  questions, branches, and returns a precise result. **Never** let a probabilistic model invent an
  eligibility verdict — wrong "you qualify"/"you don't" answers are a trust- and liability-killer.
- **v2 (production):** LLM wrapper *around* the rules engine for natural language understanding and
  Q&A ("what does it cover for kids?"), but the **final eligibility determination stays
  deterministic** and cites the official criteria. Pattern: LLM parses free text → fills the
  structured slots (income band, insurance access, residency, tax-filed) → rules engine decides →
  LLM explains the result warmly. Use Claude with the eligibility reference as grounding context.
- Always show: "This is an unofficial estimate. Final eligibility is determined by Service Canada /
  the CRA." Link to the official apply page. This protects users and us.

### 4.3 Lead capture & consent (consumer side)

We are collecting personal + financial-adjacent info from Canadians. This is **PIPEDA** territory
(and Quebec **Law 25**). Requirements baked into the design:

- Explicit, purpose-specific consent before we store anything or share with a dentist.
- Clear privacy policy; data minimization (we don't need their exact income — a *band* is enough).
- A real consent checkbox to be contacted by / matched with a dentist. No pre-checked boxes.
- Right to access/delete. A named privacy contact.
- Don't store more than we need. The eligibility bot can run entirely client-side and only persist
  data once the user opts into matching.

---

## 5. The "send them to a dentist" mechanic — how it actually works without fee-splitting

You asked how a referral gets paid and tracked in the real world. Here's the honest answer and the
compliant design.

### 5.1 Why "track the patient and bill the dentist per conversion" is the wrong instinct
That tracking *is* the fee-splitting evidence. If we build attribution to charge dentists per booked
patient, we've built the exact thing the colleges prohibit. So we deliberately **don't** monetize on
per-patient conversion.

### 5.2 What we do instead — three compliant routing models

**Model 1 — Directory / subscription (primary, recommended).**
Dentists pay a **flat monthly subscription** to appear in our "Find a CDCP dentist" tool (tiers:
basic listing free or cheap; premium = featured placement, profile, photos, "accepting new CDCP
patients" badge). Patients search and pick. We charge for the *listing and placement*, never for the
patient. This is identical to how Opencare/123Dentist-style directories and Google Business
fundamentally work, and it's compliant because the fee is independent of bookings.

**Model 2 — Advertising inventory.**
Standard ad units on our high-traffic SEO pages, sold per impression/click (CPM/CPC) — not per
patient. A dentist in Calgary buys clicks on our "CDCP dentist Calgary" page. Priced like any ad
network.

**Model 3 — Booking SaaS (later).**
A booking widget we license to practices (flat SaaS fee). We can route patients to book directly.
The dentist pays for the *software*, regardless of how many patients book. Compliant, and creates
the data + stickiness for upsells.

### 5.3 What about lead-gen networks that DO charge per lead?
Some general home-services lead-gen models charge per lead — but **healthcare is special**. Because
dentistry is a regulated profession with fee-splitting rules, the per-lead model is the risky one.
A small number of dental lead vendors operate per-lead; many have faced exactly the "is this
fee-splitting?" scrutiny. We avoid the category risk entirely by pricing on visibility/tools. If we
ever test per-lead, it's only after a provincial legal opinion blesses it in that province, and
even then priced as a flat "advertising slot," not "$ per patient who books."

### 5.4 Tracking we DO build (for our own value story, not for billing patients)
- Listing impressions, profile views, "get directions"/"call" clicks, "request appointment" clicks.
- We report these to the dentist as **engagement analytics** ("your premium profile got 1,240 views
  and 80 calls last month") to justify the *subscription* — same as any ad platform. Crucially the
  price doesn't change with the numbers; the numbers justify renewing the flat fee.

---

## 6. Non-eligible patients — don't waste the traffic

A big share of people who run the eligibility bot will **not** qualify (income over $90k, or they
have employer insurance). These are still high-intent dental customers who just got told "no."
Don't drop them. Options, all monetizable on the **same compliant basis**:

1. **Route them to a dentist anyway.** They still need a dentist; many will pay privately or use
   their employer plan. They flow into the **same directory** (Model 1). We don't charge per
   patient, so it costs us nothing to be generous, and it widens dentist value.
2. **"You have insurance — here's how to use it."** Educational content for the employer-insured.
   Pure SEO + trust play; routes to directory.
3. **Alternative coverage / financing affiliate offers.** People over the threshold may want
   **private dental insurance** or **dental discount/membership plans** or **dental financing**
   (e.g. medical credit lines like Dentalcard/iFinance, or pay-over-time). These are *insurance/
   financial products*, **not dental fees**, so affiliate/referral commissions on *those* are a
   normal, allowed revenue stream — the fee-splitting rule is about dentists' clinical fees, not
   insurance products. Verify each affiliate program's Canadian licensing (insurance referral may
   require restricted licensing in some provinces).
4. **Provincial/territorial program matcher.** Some non-CDCP folks qualify for provincial dental
   programs (low-income, seniors, kids, social assistance). A "what *else* can I get" matcher is
   huge for trust and SEO, and still funnels them to a dentist.
5. **Email/newsletter capture.** Their income or job changes; eligibility changes yearly. Stay in
   touch ("CDCP 2027 thresholds just changed — recheck your eligibility").

> Net: **every** visitor, eligible or not, is routable to a dentist and/or an allowed financial
> product. The eligibility result just changes *which* message and *which* offer.

---

## 7. Dentist-side product (Side B — cdcpbilling.com / .ca)

This is your advisory idea, and it's the cleanest revenue in the whole plan.

### 7.1 The thesis
Corporate/DSO groups have CDCP billing figured out. **Independent practices don't** — the Sun Life
enrollment, the benefit grids, the fact that CDCP established fees differ from provincial suggested
fee guides, the patient eligibility checks, the claim workflow. Many independents are wary of CDCP
because it looks like admin pain and below-guide fees. We sell them clarity.

### 7.2 Products (all fixed-fee, all compliant)

| Product | What it is | Pricing |
|---|---|---|
| **CDCP Readiness Advisory call** | 1:1 consult: should you participate, full vs claim-by-claim, the economics of the benefit grid vs your fee guide, workflow setup | Flat per-call fee |
| **Done-with-you enrollment** | We walk them through Sun Life Direct signup / participation form, EDI estimate setup | Flat package fee |
| **CDCP billing playbook / course** | Self-serve content: codes, grids, eligibility verification, common claim rejections | Subscription or one-time |
| **Directory / visibility** | "Accepting new CDCP patients" featured listing on the consumer site | Flat monthly subscription |
| **Ongoing membership** | Updates when grids/thresholds change yearly, templates, a community, priority support | Recurring subscription |

### 7.3 The cross-sell (the magic)
When a practice buys advisory, we **capture them as a Side-B customer** and immediately offer the
directory listing so the patients we're educating can find them. One sale funds the next. And
because we're not charging per patient, the directory offer is an easy, low-risk yes for the
dentist.

### 7.4 Key facts about the dentist side (from research)
- Participation is **voluntary**; providers either **sign up via Sun Life Direct** or bill
  **claim-by-claim**. Claim-by-claim providers can formally enroll any time.
- Providers **bill and are paid directly by Sun Life**.
- Sun Life publishes annual **benefit grids** (procedure codes + established fees). The 2026 grids
  are out. CDCP established fees can be **below** provincial suggested fee guides — a real concern
  for practices and a core thing our advisory explains (and where patients may owe a balance even at
  the 0% co-pay tier; see §8).
- Sun Life CDCP provider contact centre: 1-888-888-8110.

---

## 8. The CDCP facts our content must get right (and that the gov site explains poorly)

These are the highest-value "we explain it better" topics — they're also §9's SEO goldmine.

- **Eligibility = 4 tests, ALL required:** (1) Canadian resident for tax purposes; (2) filed your
  prior-year tax return (2025 return for the 2026 benefit year); (3) **adjusted family net income
  under $90,000**; (4) **no access to private dental insurance**.
- **"Access" is the tricky one.** You're disqualified if you *have access* to private/employer/
  pension/group/purchased dental insurance — even via a family member, even a health-spending
  account, **even if you decline it.** BUT coverage through a **government social program** does NOT
  count as private insurance — those people can still qualify.
- **Co-pay tiers (share CDCP pays of *eligible* costs):**
  - AFNI **under $70,000** → CDCP pays **100%** (no co-pay).
  - **$70,000–$79,999** → CDCP pays **60%** (you pay 40%).
  - **$80,000–$89,999** → CDCP pays **40%** (you pay 60%).
  - **$90,000+** → not eligible.
- **The "free isn't always free" gotcha (huge education win):** CDCP pays against its **established
  fees**, which can be lower than what a dentist charges. So even at the 0% co-pay tier, a patient
  can owe the **difference** if their dentist bills above the CDCP grid. People are blindsided by
  this. Explaining it clearly builds enormous trust and routes them to dentists who bill at grid.
- **All ages now eligible** (program fully phased in as of 2025).
- **Coverage** includes preventive (exams, cleanings, x-rays), restorative (fillings),
  endodontic, prosthodontic (dentures), oral surgery, etc., per the grids — some services need
  preauthorization (phasing in).

---

## 9. SEO + AI-search domination (summary — full plan in SEO-PLAN.md)

The strategy is to own the **eligibility intent** keyword cluster and the long tail of "does X
qualify / is Y covered / how much does Z cost on CDCP" questions, in **English and French**, and to
be the answer that **AI assistants cite**.

- **Programmatic geo pages:** "CDCP dentist in {city}" for every major city — feeds the directory.
- **Question pages (AEO):** one clean, schema-marked page per real question (FAQ/QAPage structured
  data, concise answer up top). These are what ChatGPT/Claude/Gemini/Perplexity pull from.
- **The calculator/bot itself** is linkbait and earns backlinks.
- **Bilingual from day one** — the government site's English-only weakness is our biggest single
  opening for French-Canada traffic (and .ca authority).
- **E-E-A-T:** cite canada.ca and Sun Life, show "last updated," have a named reviewer. Government-
  adjacent YMYL content needs trust signals or it won't rank.

See `SEO-PLAN.md` for the keyword map, page templates, structured-data spec, and calendar.

---

## 10. Domains

| Domain | Role |
|---|---|
| **cdcpguide.com / .ca** | Consumer brand. Eligibility, education, find-a-dentist. Primary traffic engine. |
| **cdcpbilling.com / .ca** | Dentist brand. Advisory, enrollment help, billing playbook, directory sales. |

Keep the brands separate (different audiences, different intent) but share infrastructure, the
dentist database, and analytics. `.ca` builds Canadian trust/ranking; 301 or hreflang strategy in
SEO-PLAN.

---

## 11. Risks & how we handle them

| Risk | Mitigation |
|---|---|
| Fee-splitting / referral-fee violation (dentist disciplined) | Fixed-fee model only; provincial legal opinion; never price on patient conversion (§2, §5). |
| Privacy (PIPEDA / Quebec Law 25) | Consent-first, data minimization, client-side bot, privacy policy, deletion rights (§4.3). |
| Misleading "government" impression | Clear "unofficial / independent" labeling everywhere; cite + link official sources. Don't imply gov affiliation (also a trademark/advertising risk). |
| Giving wrong eligibility answers | Deterministic rules engine, not a hallucinating LLM, for the verdict; "estimate only" disclaimer (§4.2). |
| Quebec language law (Bill 96) | French-first there; legal review of marketing French. |
| Insurance-affiliate licensing | Verify each affiliate's licensing per province before promoting (§6.3). |
| Google YMYL/E-E-A-T | Authoritative sourcing, named experts, update cadence (§9). |

---

## 12. Recommended build sequence

1. **Now (this repo):** strategy locked, eligibility logic locked, prototype consumer site + bot,
   SEO page map. ✅
2. **MVP launch:** production Next.js build of cdcpguide (bilingual), the deterministic bot, ~20
   cornerstone SEO/AEO pages, a basic email-capture directory waitlist. Privacy policy + consent.
3. **Seed the directory:** manually list participating dentists (public info) to make the
   find-a-dentist tool useful *before* any dentist pays. Value first.
4. **Side B:** launch cdcpbilling advisory calls (your cleanest first revenue — sell expertise).
   Cross-sell directory listings.
5. **Monetize Side A:** paid featured listings, ad inventory, allowed financial affiliates for the
   non-eligible segment.
6. **v2 bot:** LLM-wrapped natural-language chat over the deterministic core; programmatic geo
   pages at scale; French content expansion.

---

## Disclaimer
This document is strategic analysis, not legal, tax, or financial advice. Canadian dental
advertising, fee-splitting, privacy, and language rules vary by province and change. Before
operating, obtain written advice from a qualified Canadian health-regulatory lawyer (and a privacy
lawyer) for every province you operate in. Eligibility and coverage details are summarized from
public sources as of June 2026 and must be verified against canada.ca and Sun Life before publishing.

## Sources
- Government of Canada — CDCP "Do you qualify": https://www.canada.ca/en/services/benefits/dental/dental-care-plan/qualify.html
- Government of Canada — CDCP apply: https://www.canada.ca/en/services/benefits/dental/dental-care-plan/apply.html
- Government of Canada — CDCP info for oral health professionals: https://www.canada.ca/en/services/benefits/dental/dental-care-plan/providers.html
- Sun Life — Oral health provider (CDCP): https://www.sunlife.ca/sl/cdcp/en/provider/
- Sun Life — CDCP dental benefit grids: https://www.sunlife.ca/sl/cdcp/en/provider/dental-benefit-grids/
- Sun Life — Oral health provider FAQ: https://www.sunlife.ca/sl/cdcp/en/support/oral-health-provider-faq/
- Provincial Dental Board of Nova Scotia — Code of Ethics (fee-splitting): http://pdbns.ca/about/regulation/code-of-ethics
- RCDSO — Advertising Guidelines: https://www.rcdso.org/en-ca/standards-guidelines-resources/standards-guidelines-advisories/advertising-guidelines
- CDA — Principles of Ethics: https://www.cda-adc.ca/en/about/ethics/
- Canadian Dental Association — CDCP overview: https://www.cda-adc.ca/en/oral_health/cdcp/
