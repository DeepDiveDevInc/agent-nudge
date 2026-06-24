import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const title = locale === "fr" ? "Politique de confidentialité" : "Privacy policy";
  return {
    title,
    alternates: { canonical: `/${locale}/privacy`, languages: { "en-CA": "/en/privacy", "fr-CA": "/fr/privacy" } },
    robots: { index: false, follow: true },
  };
}

const EN = {
  title: "Privacy policy",
  intro:
    "This is a template privacy notice for the CDCP Guide prototype. Before launch, have it reviewed by a Canadian privacy lawyer for PIPEDA and Quebec Law 25 compliance.",
  sections: [
    ["What we collect", "Only what's needed to estimate your eligibility and, if you ask, connect you with a dentist: your answers to the eligibility questions (which we keep as broad bands, not exact figures), and — only if you choose to continue — your city/postal code and email address."],
    ["How we use it", "To give you an eligibility estimate, to show dentists near you, and (with your consent) to email you matches and a summary. We do not sell your personal information."],
    ["The eligibility check runs in your browser", "The eligibility verdict is computed on your device. We only store information after you explicitly opt in to be matched or contacted."],
    ["Your choices", "You can use the eligibility checker without giving any contact details. If you provide an email, you can unsubscribe at any time, and you can ask us to access or delete your information."],
    ["Sharing with dentists", "We only share your details with a dentist after you consent. Dentists pay us for fixed-fee listings and advertising — never a per-patient referral fee."],
    ["Contact", "Reach our privacy contact at privacy@cdcpguide.ca (placeholder)."],
  ],
};

const FR = {
  title: "Politique de confidentialité",
  intro:
    "Ceci est un modèle d'avis de confidentialité pour le prototype CDCP Guide. Avant le lancement, faites-le réviser par un avocat canadien en protection de la vie privée (LPRPDE et Loi 25 du Québec).",
  sections: [
    ["Ce que nous recueillons", "Uniquement ce qui est nécessaire pour estimer votre admissibilité et, si vous le demandez, vous mettre en relation avec un dentiste : vos réponses (conservées sous forme de tranches, non de montants exacts) et, seulement si vous choisissez de continuer, votre ville/code postal et votre courriel."],
    ["Comment nous l'utilisons", "Pour vous donner une estimation, vous montrer des dentistes à proximité et (avec votre consentement) vous envoyer des résultats par courriel. Nous ne vendons pas vos renseignements personnels."],
    ["La vérification se fait dans votre navigateur", "Le verdict d'admissibilité est calculé sur votre appareil. Nous ne conservons des renseignements qu'après votre consentement explicite."],
    ["Vos choix", "Vous pouvez utiliser l'outil sans fournir de coordonnées. Si vous donnez un courriel, vous pouvez vous désabonner à tout moment et demander l'accès ou la suppression de vos renseignements."],
    ["Partage avec les dentistes", "Nous ne partageons vos renseignements avec un dentiste qu'avec votre consentement. Les dentistes nous paient pour des inscriptions et de la publicité à tarif fixe — jamais de frais de recommandation par patient."],
    ["Nous joindre", "Contactez notre responsable de la confidentialité à privacy@cdcpguide.ca (provisoire)."],
  ],
};

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const c = locale === "fr" ? FR : EN;
  return (
    <main className="article">
      <h1>{c.title}</h1>
      <div className="fallback-banner">{c.intro}</div>
      <div className="article-body">
        {c.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
