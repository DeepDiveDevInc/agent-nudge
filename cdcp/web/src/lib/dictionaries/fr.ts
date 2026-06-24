/**
 * Dictionnaire français (fr-CA). Cet objet reflète exactement la structure de en.ts :
 * mêmes clés, même imbrication, mêmes longueurs de tableaux et mêmes types.
 * Seules les valeurs lisibles sont traduites — les clés restent inchangées.
 */
export const fr = {
  meta: {
    locale: "fr-CA",
    siteName: "CDCP Guide",
  },
  topbar:
    "Guide indépendant — non affilié au gouvernement du Canada. Nous vous aidons à comprendre le régime et à trouver un dentiste.",
  nav: {
    how: "Comment ça marche",
    coverage: "Ce qui est couvert",
    guides: "Guides",
    dentists: "Pour les dentistes",
    check: "Vérifier l'admissibilité",
  },
  hero: {
    badge: "Maintenant ouvert à tous les âges · année de prestations 2026",
    titleLead: "Êtes-vous admissible au",
    titleHi: "Régime canadien de soins dentaires?",
    lede: "Le gouvernement couvre les soins dentaires de millions de Canadiens qui gagnent moins de 90 000 $ et n'ont pas d'assurance privée — mais son site web ne permet pas de savoir facilement si c'est votre cas. Nous avons simplifié les choses.",
    ctaPrimary: "Vérifier mon admissibilité →",
    ctaSecondary: "Voir ce qui est couvert",
    trust: ["Gratuit et anonyme", "Environ 60 secondes", "Puis trouvez un dentiste près de chez vous"],
  },
  chat: {
    title: "Assistant d'admissibilité",
    status: "En ligne · estimation non officielle",
    restart: "Recommencer",
    placeholderType: "Tapez votre réponse…",
    placeholderCity: "p. ex. Calgary ou T2P 1J9",
    placeholderEmail: "vous@courriel.com",
    send: "Envoyer",
    disclaimer: "Estimation non officielle. L'admissibilité finale est décidée par Service Canada et l'ARC.",
    officialLink: "Site officiel ↗",
    intro: [
      "Bonjour! Je vais vous aider à savoir si vous êtes probablement admissible au Régime canadien de soins dentaires. 🦷",
      "Ça prend environ une minute, c'est anonyme, et j'ai seulement besoin de réponses approximatives. Prêt?",
    ],
    start: "C'est parti →",
    yes: "Oui",
    no: "Non",
    questions: {
      taxResident: ["D'abord : êtes-vous un résident du Canada aux fins de l'impôt?"],
      taxFiled: [
        "Avez-vous (et votre époux ou conjoint de fait, le cas échéant) produit votre déclaration de revenus de l'an dernier?",
        "L'admissibilité au RCSD se base sur votre déclaration la plus récente.",
      ],
      hasPrivateInsuranceAccess: [
        "Avez-vous <strong>accès</strong> à une assurance dentaire privée — par un employeur, une pension, un régime collectif ou étudiant, ou une assurance que vous avez achetée (la vôtre ou celle d'un membre de votre famille)?",
        "Ça compte même si vous la refusez. Mais une couverture offerte par un programme social <em>gouvernemental</em> ne compte <strong>pas</strong> ici.",
      ],
      incomeBand: [
        "Dernière question — dans quelle tranche se situe votre <strong>revenu familial net rajusté</strong>? (C'est environ votre revenu net plus celui de votre conjoint, pas le salaire brut.)",
      ],
    },
    answers: {
      taxFiledYes: "Oui, produite",
      taxFiledNo: "Pas encore",
      insNo: "Aucune assurance privée",
      insGov: "Seulement un programme gouvernemental",
      insYes: "Oui, j'y ai accès",
    },
    cityPrompt: "Parfait — trouvons-vous un dentiste. Dans quelle ville ou quel code postal êtes-vous?",
    cityAck:
      "Merci! Dans la version réelle, je vous montrerais des dentistes près de <strong>{city}</strong> qui acceptent de nouveaux patients.",
    consentAsk:
      "Puis-je vous envoyer par courriel les dentistes correspondants et un bref résumé de votre admissibilité? Vous pouvez vous désabonner en tout temps, et nous utilisons vos renseignements uniquement pour vous aider — voir notre politique de confidentialité.",
    emailPrompt: "Bien sûr — quel est le meilleur courriel pour vous joindre?",
    done: [
      "✓ Parfait — tout est en ordre.",
      "Quand ce service sera en ligne, vous recevriez ici les dentistes correspondants, en plus d'un résumé en langage clair de vos prestations du RCSD. Merci d'utiliser CDCP Guide! 🦷",
    ],
    remindPrompt: "Voulez-vous un rappel pour vérifier de nouveau après avoir produit votre déclaration? Laissez votre courriel.",
  },
  income: {
    under70: "Moins de 70 000 $",
    "70to80": "70 000 $ – 79 999 $",
    "80to90": "80 000 $ – 89 999 $",
    "90plus": "90 000 $ ou plus",
  },
  results: {
    findDentist: "Trouver un dentiste du RCSD près de chez moi",
    showOptions: "Montrez-moi les options + trouver un dentiste",
    findAnyDentist: "Trouver un dentiste près de chez moi",
    learnMore: "En savoir plus sur canada.ca",
    remindMe: "Me rappeler de vérifier de nouveau",
    officialApply: "Demande officielle ↗",
    eligible_full: {
      verdict: "Vous êtes probablement admissible — au meilleur palier!",
      tier: "Le RCSD paie 100 % · aucune quote-part",
      body: "Vous remplissez les quatre exigences, et avec un revenu inférieur à 70 000 $, le régime couvre 100 % des coûts admissibles.",
      notes: [
        "⚠️ Même à une quote-part de 0 %, vous pourriez devoir payer une différence si votre dentiste facture au-dessus du tarif établi du RCSD — nous vous aiderons à trouver des dentistes qui facturent au tarif du RCSD.",
        "Les services couverts comprennent les examens, les nettoyages, les radiographies, les obturations, les traitements de canal, les prothèses dentaires et plus encore.",
      ],
    },
    eligible_60: {
      verdict: "Vous êtes probablement admissible!",
      tier: "Le RCSD paie 60 % · vous payez 40 %",
      body: "Vous remplissez les quatre exigences. Dans la tranche de 70 000 $ à 79 999 $, le RCSD couvre 60 % des coûts admissibles.",
      notes: [
        "Votre dentiste pourrait aussi facturer une différence au-dessus du tarif établi du RCSD — informez-vous à l'avance.",
        "Nous pouvons vous mettre en contact avec des dentistes qui acceptent de nouveaux patients du RCSD.",
      ],
    },
    eligible_40: {
      verdict: "Vous êtes probablement admissible!",
      tier: "Le RCSD paie 40 % · vous payez 60 %",
      body: "Vous remplissez les quatre exigences. Dans la tranche de 80 000 $ à 89 999 $, le RCSD couvre 40 % des coûts admissibles.",
      notes: [
        "Comme vous payez la plus grande part, comparez avec un régime privé ou d'adhésion — nous pouvons vous montrer les options.",
        "Votre dentiste pourrait facturer une différence au-dessus du tarif établi du RCSD.",
      ],
    },
    ineligible_income: {
      verdict: "Vous dépassez probablement la limite de revenu du RCSD",
      tier: "",
      body: "Le RCSD s'adresse aux personnes dont le revenu familial net rajusté est inférieur à 90 000 $. Mais vous avez quand même de bonnes options — et vous avez toujours besoin d'un dentiste.",
      notes: [
        "Comparez une assurance dentaire privée ou un régime de rabais/d'adhésion en soins dentaires.",
        "Informez-vous sur le financement dentaire / le paiement échelonné pour les traitements plus importants.",
        "Nous pouvons quand même vous mettre en contact avec un excellent dentiste près de chez vous.",
      ],
    },
    ineligible_insurance: {
      verdict: "Vous n'êtes probablement pas admissible — vous avez une autre couverture",
      tier: "",
      body: "Comme vous avez accès à une assurance dentaire privée, le RCSD ne s'applique pas. La bonne nouvelle : vous avez déjà une couverture à utiliser.",
      notes: [
        "Nous vous aiderons à trouver un dentiste qui accepte votre régime.",
        "Si cette couverture prend fin, revenez vérifier de nouveau — l'admissibilité est révisée chaque année.",
      ],
    },
    ineligible_residency: {
      verdict: "Le RCSD s'adresse aux résidents canadiens aux fins de l'impôt",
      tier: "",
      body: "Le régime exige que vous soyez un résident du Canada aux fins de l'impôt, donc il ne s'applique pas pour l'instant.",
      notes: ["Si votre statut de résidence change, revenez vérifier de nouveau."],
    },
    not_yet_tax: {
      verdict: "Presque — vous devez d'abord produire votre déclaration de revenus",
      tier: "",
      body: "L'admissibilité au RCSD se base sur votre déclaration de revenus la plus récente. Produisez-la (et celle de votre conjoint, le cas échéant), puis vous pourrez faire une demande.",
      notes: [
        "C'est la production de la déclaration qui débloque l'admissibilité, même si vous aviez peu ou pas de revenu.",
        "Voulez-vous un rappel pour vérifier de nouveau après avoir produit votre déclaration?",
      ],
    },
  },
  howSection: {
    title: "Comment fonctionne CDCP Guide",
    steps: [
      {
        h: "Vérifier l'admissibilité",
        p: "Notre assistant pose les quatre questions qui déterminent réellement l'admissibilité — résidence, production de la déclaration, tranche de revenu et accès à une assurance — et vous donne une réponse claire (oui ou non) avec votre palier de quote-part.",
      },
      {
        h: "Comprendre vos prestations",
        p: "Nous expliquons — en langage clair — ce qui est couvert, ce que vous paierez réellement, et le piège du « gratuit n'est pas toujours gratuit » que le site du gouvernement enterre.",
      },
      {
        h: "Trouver un dentiste",
        p: "Admissible ou non, nous vous mettons en contact avec un dentiste près de chez vous qui accepte de nouveaux patients — y compris ceux qui facturent au tarif du RCSD pour vous éviter les frais surprises.",
      },
    ],
  },
  coverageSection: {
    title: "Ce que vous paierez — en un coup d'œil",
    sub: "Votre quote-part dépend de votre revenu familial net rajusté. Le RCSD paie une part des coûts admissibles :",
    cols: { income: "Revenu familial net rajusté", cdcp: "Le RCSD paie", you: "Vous payez" },
    rows: [
      { income: "Moins de 70 000 $", cdcp: "100 %", you: "0 $", best: true },
      { income: "70 000 $ – 79 999 $", cdcp: "60 %", you: "40 %", best: false },
      { income: "80 000 $ – 89 999 $", cdcp: "40 %", you: "60 %", best: false },
      { income: "90 000 $ ou plus", cdcp: "—", you: "Non admissible*", best: false },
    ],
    callout:
      "<strong>⚠️ « Gratuit » n'est pas toujours gratuit.</strong> Le RCSD paie selon ses propres tarifs établis, qui peuvent être inférieurs à ce que certains dentistes facturent. Même au palier de quote-part de 0 %, vous pourriez devoir payer la différence. Nous vous aidons à trouver des dentistes qui facturent au tarif du RCSD. <span class=\"muted\">*Non admissible au RCSD — mais nous vous aiderons quand même à trouver des soins et des solutions de rechange.</span>",
  },
  dentistSection: {
    badge: "Pour les cabinets dentaires",
    title: "Commencez à accepter des patients du RCSD — sans tracas",
    body: "Les grands groupes corporatifs ont déjà maîtrisé la facturation du RCSD. Les cabinets indépendants prennent du retard. Nous vous aidons à vous inscrire auprès de la Sun Life, à comprendre la grille des prestations, à éviter les rejets de demandes — et à être repérés par les patients que nous informons chaque jour.",
    bullets: [
      "Appel-conseil personnalisé sur la préparation au RCSD",
      "Inscription accompagnée auprès de la Sun Life",
      "Fiche en vedette « Accepte de nouveaux patients du RCSD »",
      "Guide de facturation et mises à jour annuelles de la grille",
    ],
    cta: "Réserver un appel-conseil →",
    micro: "cdcpbilling.com · conseil et visibilité à tarif fixe — aucuns frais par patient.",
    formTitle: "Parlez-nous",
    formMicro: "Réservé aux cabinets dentaires. Nous communiquerons avec vous dans un jour ouvrable.",
    fields: { practice: "Nom du cabinet", name: "Votre nom", email: "Courriel" },
    interest: { label: "Je suis intéressé par…", advisory: "Appel-conseil", enroll: "Aide à l'inscription", listing: "Fiche dans le répertoire des patients", all: "Tout" },
    submit: "Demander un appel",
    done: "✓ Merci — formulaire prototype (pas encore relié à un CRM).",
  },
  guidesSection: {
    title: "Guides et questions fréquentes",
    sub: "Des réponses en langage clair à ce que les Canadiens demandent réellement au sujet du RCSD.",
    readMore: "En savoir plus →",
    relatedTitle: "Questions connexes",
    sourcesTitle: "Sources",
    updatedPrefix: "Dernière mise à jour",
    ctaTitle: "Vous ne savez pas si vous êtes admissible?",
    ctaBody: "Vérifiez votre admissibilité en environ 60 secondes.",
    ctaButton: "Vérifier l'admissibilité →",
  },
  consent: {
    title: "Votre vie privée",
    body: "Nous utilisons les renseignements que vous partagez uniquement pour estimer votre admissibilité et, si vous le demandez, pour vous mettre en contact avec un dentiste. Nous ne vendons pas vos renseignements personnels.",
    checkbox: "J'accepte d'être contacté et la politique de confidentialité.",
    accept: "Continuer",
    privacyLink: "Politique de confidentialité",
  },
  footer: {
    tagline:
      "Une ressource indépendante pour aider les Canadiens à comprendre le Régime canadien de soins dentaires et à trouver des soins. Non affiliée au gouvernement du Canada ni à la Sun Life.",
    patients: "Patients",
    dentists: "Dentistes",
    official: "Sources officielles",
    links: {
      check: "Vérifier l'admissibilité",
      coverage: "Ce qui est couvert",
      find: "Trouver un dentiste",
      advisory: "Aide-conseil et facturation",
      getListed: "Être inscrit",
      privacy: "Politique de confidentialité",
    },
    legal:
      "Renseignements résumés à partir de sources publiques en date de juin 2026. Non officiel — vérifiez votre admissibilité à canada.ca.",
  },
};
