# CDCP Guide — SEO + AI-Search (AEO) Plan

Goal: be the **#1 independent resource** Canadians and AI assistants reach for CDCP eligibility and
"find a dentist who takes it." Win classic Google **and** answer-engine citations (ChatGPT, Claude,
Gemini, Perplexity, Google AI Overviews).

The government site is our biggest tailwind: it's confusing, administrative, and **English-only**.
We out-explain it and we go **bilingual**.

---

## 1. Intent clusters & the page map

### Cluster A — Eligibility intent (highest value, our wedge)
The "am I in?" searches. Each becomes a focused page that ends in the chatbot.

- `do I qualify for the canadian dental care plan`
- `cdcp eligibility` / `cdcp income limit` / `cdcp income threshold 2026`
- `cdcp eligibility calculator` ← the bot is the page; strong linkbait
- `am I eligible for the dental plan if I have insurance`
- `cdcp adjusted family net income explained`
- `cdcp eligibility seniors / kids / students / self-employed / unemployed / disability`
- `can I get cdcp if I decline my work benefits`
- `cdcp 90000 income / 70000 / 80000 co-pay`

### Cluster B — Coverage / cost intent
- `what does the canadian dental care plan cover`
- `is X covered by cdcp` → dentures, braces, root canal, crowns, cleanings, fillings, extractions,
  implants, x-rays, wisdom teeth
- `cdcp copay how much do I pay`
- `does cdcp cover 100 percent` → THE "free isn't free" page (high-trust, high-traffic)
- `why did my dentist charge me extra cdcp` → the established-fee gap explainer
- `cdcp dentures cost` / `cdcp coverage limits per year`

### Cluster C — Application / process intent
- `how to apply for the canadian dental care plan`
- `cdcp application status` / `cdcp sun life member card` / `cdcp welcome package`
- `when does cdcp coverage start`
- `cdcp renewal 2027`
- `cdcp apply by phone / online`

### Cluster D — Find-a-dentist intent (feeds the directory — Side B value)
Programmatic geo pages: **`CDCP dentist in {city}`** and **`dentists that accept CDCP near me`**.
- Top metros first: Toronto, Montreal, Vancouver, Calgary, Edmonton, Ottawa, Winnipeg, Mississauga,
  Hamilton, Quebec City, Brampton, Surrey, Halifax, London, Victoria, Saskatoon, Regina, St. John's…
- Then provinces, then smaller cities. Each page: intro + live directory results + local FAQ.
- `does my dentist accept cdcp` / `how to find a cdcp dentist`

### Cluster E — Non-eligible / alternatives intent (monetize the "no")
- `dental help if I don't qualify for cdcp`
- `private dental insurance canada` (allowed affiliate)
- `dental discount plans canada` / `dental financing canada`
- `provincial dental programs {province}` (Ontario OSDCP/Healthy Smiles, etc.)
- `cheap dentist no insurance {city}`

### Cluster F — Dentist-side (cdcpbilling.com)
- `how to bill cdcp` / `cdcp sun life provider sign up`
- `cdcp benefit grid 2026` / `cdcp fee guide vs provincial fee guide`
- `should my practice accept cdcp` / `cdcp claim rejections`
- `cdcp patient eligibility check for dentists`

---

## 2. Bilingual strategy (don't skip — it's the moat)
- Full **French** mirror, professionally translated (not machine), French-first in Quebec.
- `hreflang` pairs (`en-CA` / `fr-CA`) on every page; separate URLs (`/fr/...`).
- French keyword research is its own pass (`régime canadien de soins dentaires`, `admissibilité
  RCSD`, `dentiste qui accepte le régime`). Much less competition than English.
- Quebec language-law (Bill 96) compliance is also a legal requirement, not just SEO.

---

## 3. AEO — getting cited by AI assistants
Answer engines lift **concise, well-structured, well-sourced** answers. For every Cluster A/B/C
question page:
- **Answer-first:** a 2–3 sentence direct answer in the first 100 words, then detail.
- **Structured data:** `FAQPage` / `QAPage` JSON-LD; `Article` with `datePublished`/`dateModified`;
  `BreadcrumbList`; `LocalBusiness`/`Dentist` for directory entries.
- **Extractable formatting:** clear H2/H3 questions, short paragraphs, tables (the co-pay table, the
  income bands), bulleted criteria.
- **Cite primary sources** (canada.ca, Sun Life) inline — answer engines favor pages that
  themselves cite authority, and it builds E-E-A-T.
- **Freshness:** visible "Last updated" + real `dateModified`. CDCP numbers change yearly; being the
  most-current source wins the citation.
- **Entity clarity:** consistent naming ("Canadian Dental Care Plan (CDCP)") so models associate us
  with the entity.

---

## 4. E-E-A-T / YMYL (this is government-benefit + money + health = strict)
- Named author + a reviewer credential line ("Reviewed by …"). 
- Clear **"independent, not affiliated with the Government of Canada"** disclosure on every page
  (also protects against gov-impersonation / trademark issues).
- About page, real contact, privacy policy.
- Link out to official sources generously (helps trust, doesn't hurt ranking for this content type).

---

## 5. Page template spec (each question page)
```
H1: the question, verbatim-ish
[Answer box]: 2–3 sentence direct answer + "Last updated {date}"
[CTA]: "Check your eligibility in 60 seconds →" (opens the bot)
Body: detailed explanation, table(s), examples
[Related questions] internal links (topic cluster)
[Sources] canada.ca / Sun Life links
JSON-LD: FAQPage/QAPage + Article + Breadcrumb
hreflang en-CA/fr-CA
```

## 6. Internal linking / site architecture
- **Hub-and-spoke:** pillar pages ("CDCP eligibility", "CDCP coverage", "Find a CDCP dentist") link
  to all spoke question pages and vice versa.
- The **bot** is reachable from every page (sticky CTA) — it's the conversion point.
- Geo directory pages link to relevant city question pages and back to the eligibility hub.

## 7. Off-page / authority
- The free **eligibility calculator/bot** = primary link magnet (tools earn links).
- Outreach: community orgs, seniors' groups, newcomer-settlement orgs, low-income advocacy, student
  unions — audiences who need CDCP info and link to helpful tools.
- Digital PR around CDCP changes ("2027 thresholds announced — here's who newly qualifies").

## 8. Launch priority (first ~20 cornerstone pages)
1. CDCP eligibility (pillar) + the bot
2. Do I qualify for CDCP
3. CDCP income limits / thresholds 2026
4. What does CDCP cover
5. Does CDCP cover 100%? (free-isn't-free)
6. CDCP co-pay explained
7. How to apply for CDCP
8. Am I eligible if I have insurance / declined work benefits
9. CDCP for seniors / kids / students / self-employed (4 pages)
10. Find a CDCP dentist (pillar) + top-5 metro geo pages
11. Is [dentures / root canal / braces / cleanings] covered (4 pages)
12. Dental help if you don't qualify for CDCP (alternatives hub)

French mirrors of #1–7 in the same sprint.

## 9. Measurement
- Track: rankings for Cluster A/B head terms, organic sessions, bot starts, bot completions,
  find-a-dentist clicks, email captures, AI-citation monitoring (manual + tools that track
  assistant mentions).
- North-star: **completed eligibility checks** and **dentist directory clicks** (the things that
  create Side-B value), not raw pageviews.
