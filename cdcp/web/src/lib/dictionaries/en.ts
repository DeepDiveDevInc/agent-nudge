/**
 * English (en-CA) dictionary. This object's SHAPE is the source of truth for `Dictionary`;
 * fr.ts must match it. Keep keys stable — components reference them directly.
 */
export const en = {
  meta: {
    locale: "en-CA",
    siteName: "CDCP Guide",
  },
  topbar:
    "Independent guide — not affiliated with the Government of Canada. We help you understand the plan and find a dentist.",
  nav: {
    how: "How it works",
    coverage: "What's covered",
    guides: "Guides",
    dentists: "For dentists",
    check: "Check eligibility",
  },
  hero: {
    badge: "Now open to all ages · 2026 benefit year",
    titleLead: "Do you qualify for the",
    titleHi: "Canadian Dental Care Plan?",
    lede: "The government covers dental care for millions of Canadians who earn under $90,000 and don't have private insurance — but their website makes it hard to tell if that's you. We made it simple.",
    ctaPrimary: "Check my eligibility →",
    ctaSecondary: "See what's covered",
    trust: ["Free & anonymous", "Takes ~60 seconds", "Then find a dentist near you"],
  },
  chat: {
    title: "Eligibility Assistant",
    status: "Online · unofficial estimate",
    restart: "Start over",
    placeholderType: "Type your answer…",
    placeholderCity: "e.g. Calgary or T2P 1J9",
    placeholderEmail: "you@email.com",
    send: "Send",
    disclaimer: "Unofficial estimate. Final eligibility is decided by Service Canada & the CRA.",
    officialLink: "Official site ↗",
    intro: [
      "Hi! I'll help you find out if you likely qualify for the Canadian Dental Care Plan. 🦷",
      "It takes about a minute, it's anonymous, and I only need rough answers. Ready?",
    ],
    start: "Let's go →",
    yes: "Yes",
    no: "No",
    questions: {
      taxResident: ["First: are you a resident of Canada for tax purposes?"],
      taxFiled: [
        "Have you (and your spouse or common-law partner, if any) filed last year's tax return?",
        "CDCP eligibility is based on your most recent return.",
      ],
      hasPrivateInsuranceAccess: [
        "Do you have <strong>access</strong> to private dental insurance — through an employer, pension, a group/student plan, or one you bought (yours or a family member's)?",
        "It counts even if you decline it. But coverage through a <em>government</em> social program does <strong>not</strong> count here.",
      ],
      incomeBand: [
        "Last question — which band is your <strong>adjusted family net income</strong> in? (That's roughly your + your partner's net income, not gross salary.)",
      ],
    },
    answers: {
      taxFiledYes: "Yes, filed",
      taxFiledNo: "Not yet",
      insNo: "No private insurance",
      insGov: "Only a government program",
      insYes: "Yes, I have access",
    },
    cityPrompt: "Great — let's find you a dentist. What city or postal code are you in?",
    cityAck:
      "Thanks! In the live version I'd show dentists near <strong>{city}</strong> who are accepting new patients.",
    consentAsk:
      "Can I email you the matches and a short eligibility summary? You can unsubscribe anytime, and we only use your info to help you — see our privacy policy.",
    emailPrompt: "Sure — what's the best email to reach you?",
    done: [
      "✓ Perfect — you're all set.",
      "When this is live you'd get your dentist matches here, plus a plain-language summary of your CDCP benefits. Thanks for using CDCP Guide! 🦷",
    ],
    remindPrompt: "Want a reminder to re-check after you file? Drop your email.",
  },
  income: {
    under70: "Under $70,000",
    "70to80": "$70,000 – $79,999",
    "80to90": "$80,000 – $89,999",
    "90plus": "$90,000 or more",
  },
  results: {
    findDentist: "Find a CDCP dentist near me",
    showOptions: "Show me options + find a dentist",
    findAnyDentist: "Find a dentist near me",
    learnMore: "Learn more at canada.ca",
    remindMe: "Remind me to re-check",
    officialApply: "Official apply ↗",
    eligible_full: {
      verdict: "You likely qualify — at the best tier!",
      tier: "CDCP pays 100% · no co-pay",
      body: "You meet all four requirements, and with income under $70,000 the plan covers 100% of eligible costs.",
      notes: [
        "⚠️ Even at 0% co-pay you can owe a difference if your dentist charges above the CDCP established fee — we'll help you find dentists who bill at the CDCP rate.",
        "Covered services include check-ups, cleanings, x-rays, fillings, root canals, dentures and more.",
      ],
    },
    eligible_60: {
      verdict: "You likely qualify!",
      tier: "CDCP pays 60% · you pay 40%",
      body: "You meet all four requirements. In the $70,000–$79,999 band, CDCP covers 60% of eligible costs.",
      notes: [
        "Your dentist may also charge a difference above the CDCP established fee — ask up front.",
        "We can connect you with dentists accepting new CDCP patients.",
      ],
    },
    eligible_40: {
      verdict: "You likely qualify!",
      tier: "CDCP pays 40% · you pay 60%",
      body: "You meet all four requirements. In the $80,000–$89,999 band, CDCP covers 40% of eligible costs.",
      notes: [
        "Because you pay the larger share, compare this against a private or membership plan — we can show you options.",
        "Your dentist may charge a difference above the CDCP established fee.",
      ],
    },
    ineligible_income: {
      verdict: "You're likely over the income limit for CDCP",
      tier: "",
      body: "CDCP is for adjusted family net income under $90,000. But you still have good options — and you still need a dentist.",
      notes: [
        "Compare private dental insurance or a dental discount/membership plan.",
        "Ask about dental financing / pay-over-time for bigger treatments.",
        "We can still connect you with a great dentist near you.",
      ],
    },
    ineligible_insurance: {
      verdict: "You likely aren't eligible — you have other coverage",
      tier: "",
      body: "Because you have access to private dental insurance, CDCP won't apply. The good news: you already have coverage to use.",
      notes: [
        "We'll help you find a dentist who accepts your plan.",
        "If that coverage ends, come back and re-check — eligibility is reviewed yearly.",
      ],
    },
    ineligible_residency: {
      verdict: "CDCP is for Canadian tax residents",
      tier: "",
      body: "The plan requires you to be a resident of Canada for tax purposes, so it won't apply right now.",
      notes: ["If your residency status changes, come back and check again."],
    },
    not_yet_tax: {
      verdict: "Almost — you need to file your tax return first",
      tier: "",
      body: "CDCP eligibility is based on your most recent tax return. File it (and your partner's, if applicable), then you can apply.",
      notes: [
        "Filing is what unlocks eligibility even if you had little or no income.",
        "Want a reminder to re-check after you file?",
      ],
    },
  },
  howSection: {
    title: "How CDCP Guide works",
    steps: [
      {
        h: "Check eligibility",
        p: "Our assistant asks the four questions that actually decide eligibility — residency, tax filing, income band, and insurance access — and gives you a clear yes/no with your co-pay tier.",
      },
      {
        h: "Understand your benefits",
        p: "We explain — in plain language — what's covered, what you'll actually pay, and the 'free isn't always free' gotcha the government site buries.",
      },
      {
        h: "Find a dentist",
        p: "Eligible or not, we connect you with a dentist near you who's accepting new patients — including ones who bill at the CDCP rate so you avoid surprise charges.",
      },
    ],
  },
  coverageSection: {
    title: "What you'll pay — at a glance",
    sub: "Your co-pay depends on your adjusted family net income. CDCP pays a share of eligible costs:",
    cols: { income: "Adjusted family net income", cdcp: "CDCP pays", you: "You pay" },
    rows: [
      { income: "Under $70,000", cdcp: "100%", you: "$0", best: true },
      { income: "$70,000 – $79,999", cdcp: "60%", you: "40%", best: false },
      { income: "$80,000 – $89,999", cdcp: "40%", you: "60%", best: false },
      { income: "$90,000 or more", cdcp: "—", you: "Not eligible*", best: false },
    ],
    callout:
      "<strong>⚠️ \"Free\" isn't always free.</strong> CDCP pays against its own established fees, which can be lower than what some dentists charge. Even at the 0% co-pay tier you may owe the difference. We help you find dentists who bill at the CDCP rate. <span class=\"muted\">*Not eligible for CDCP — but we'll still help you find care and alternatives.</span>",
  },
  dentistSection: {
    badge: "For dental practices",
    title: "Start accepting CDCP patients — without the headache",
    body: "The big corporate groups already cracked CDCP billing. Independent practices are getting left behind. We help you enroll with Sun Life, understand the benefit grid, avoid claim rejections — and get found by the patients we educate every day.",
    bullets: [
      "1:1 CDCP readiness advisory call",
      "Done-with-you Sun Life enrollment",
      "\"Accepting new CDCP patients\" featured listing",
      "Billing playbook & yearly grid updates",
    ],
    cta: "Book an advisory call →",
    micro: "cdcpbilling.com · fixed-fee advisory & visibility — no per-patient fees.",
    formTitle: "Talk to us",
    formMicro: "For dental practices only. We'll reach out within one business day.",
    fields: { practice: "Practice name", name: "Your name", email: "Email" },
    interest: { label: "I'm interested in…", advisory: "Advisory call", enroll: "Enrollment help", listing: "Patient directory listing", all: "Everything" },
    submit: "Request a call",
    done: "✓ Thanks — prototype form (not yet wired to a CRM).",
  },
  guidesSection: {
    title: "Guides & common questions",
    sub: "Plain-language answers to what Canadians actually ask about the CDCP.",
    readMore: "Read more →",
    relatedTitle: "Related questions",
    sourcesTitle: "Sources",
    updatedPrefix: "Last updated",
    ctaTitle: "Not sure if you qualify?",
    ctaBody: "Check your eligibility in about 60 seconds.",
    ctaButton: "Check eligibility →",
  },
  consent: {
    title: "Your privacy",
    body: "We use the details you share only to estimate your eligibility and, if you ask, to connect you with a dentist. We don't sell your personal information.",
    checkbox: "I agree to be contacted and to the privacy policy.",
    accept: "Continue",
    privacyLink: "Privacy policy",
  },
  footer: {
    tagline:
      "An independent resource to help Canadians understand the Canadian Dental Care Plan and find care. Not affiliated with the Government of Canada or Sun Life.",
    patients: "Patients",
    dentists: "Dentists",
    official: "Official sources",
    links: {
      check: "Check eligibility",
      coverage: "What's covered",
      find: "Find a dentist",
      advisory: "Advisory & billing help",
      getListed: "Get listed",
      privacy: "Privacy policy",
    },
    legal:
      "Information summarized from public sources as of June 2026. Unofficial — verify eligibility at canada.ca.",
  },
};
