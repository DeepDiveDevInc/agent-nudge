# CDCP Guide — production web app

Bilingual (en-CA / fr-CA) Next.js (App Router) build of the consumer site for **cdcpguide.ca**:
plain-language CDCP education, a **hybrid eligibility chatbot**, cornerstone SEO/AEO guide pages, a
dentist-advisory section, and a consent-first lead flow.

This supersedes the static `../site/` prototype. See `../docs/STRATEGY.md` for the business model and
`../docs/ELIGIBILITY-REFERENCE.md` for the rules the engine encodes.

## Quick start

```bash
cd cdcp/web
npm install
cp .env.example .env.local      # optional: add ANTHROPIC_API_KEY to enable free-text chat
npm run dev                     # http://localhost:3000  (redirects to /en)
```

```bash
npm run test        # deterministic eligibility engine tests (node --test)
npm run typecheck   # tsc --noEmit
npm run build       # production build
```

## How the hybrid chatbot works

- **Verdict is always deterministic.** `src/lib/eligibility.ts` is the single source of truth; the
  bot fills four structured slots and the engine decides. It can never hallucinate "you qualify."
- **LLM only understands language.** When a user types a free-text answer mid-interview, the browser
  posts it to `POST /api/chat`, which uses Claude (Haiku) to normalize it into a slot value **or**
  answer a question and re-ask. The route is in `src/app/api/chat/route.ts`.
- **No key? Still works.** Without `ANTHROPIC_API_KEY`, `/api/chat` returns `unavailable` and the UI
  falls back to button-only input — fully functional, just not free-text.

## Architecture

```
src/
  lib/
    eligibility.ts          # deterministic engine (source of truth)
    i18n.ts                 # locale config, dictionary loader, hreflang
    dictionaries/{en,fr}.ts # all UI copy
    content.ts              # cornerstone guide content + helpers (SEO/AEO)
  components/
    Chat.tsx                # hybrid chat client component
    Header / Footer / DentistForm / JsonLd
  app/
    [locale]/               # root layout (html lang), home, guides, privacy
    api/chat/route.ts       # NL slot-filling endpoint
    sitemap.ts / robots.ts
test/
  eligibility.test.ts       # engine tests
```

Locale routing uses the App-Router `[locale]` pattern; `/` redirects to `/en`. Each guide page emits
`QAPage` + `Article` + `BreadcrumbList` JSON-LD and `hreflang` alternates for AEO/SEO.

## Production TODO (not in this build)

- Wire the lead capture (city + email + consent) to a real CRM/DB; nothing is persisted yet.
- Real dentist directory data + "find a dentist" results page.
- Finish French translations of guide bodies (UI + answers are already bilingual; long-form guide
  bodies fall back to English with a banner until translated — see `docs/SEO-PLAN.md §2`).
- Legal review (fee-splitting per province, PIPEDA/Law 25) before taking dentist payments or storing data.
