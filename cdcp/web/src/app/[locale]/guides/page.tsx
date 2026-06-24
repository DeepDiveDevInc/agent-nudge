import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, localePath, isLocale, type Locale } from "@/lib/i18n";
import { GUIDES, getGuideContent, CLUSTER_LABELS, type Cluster } from "@/lib/content";

const CLUSTER_ORDER: Cluster[] = ["eligibility", "coverage", "apply", "find", "alternatives"];

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const d = getDictionary(locale);
  return {
    title: d.guidesSection.title,
    description: d.guidesSection.sub,
    alternates: { canonical: `/${locale}/guides`, languages: { "en-CA": "/en/guides", "fr-CA": "/fr/guides" } },
  };
}

/** Guides index — cornerstone Q&A pages grouped by intent cluster. */
export default function GuidesIndex({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const d = getDictionary(locale);

  return (
    <main className="band">
      <h1 className="section-title">{d.guidesSection.title}</h1>
      <p className="section-sub">{d.guidesSection.sub}</p>

      {CLUSTER_ORDER.map((cluster) => {
        const guides = GUIDES.filter((g) => g.cluster === cluster);
        if (guides.length === 0) return null;
        return (
          <section key={cluster} style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: "1.3rem" }}>{CLUSTER_LABELS[cluster][locale]}</h2>
            <div className="guides-grid">
              {guides.map((g) => {
                const { content } = getGuideContent(g, locale);
                return (
                  <Link className="guide-card" key={g.slug} href={localePath(locale, `/guides/${g.slug}`)}>
                    <span className="cluster-tag">{CLUSTER_LABELS[g.cluster][locale]}</span>
                    <h3>{content.question}</h3>
                    <p>{content.answer}</p>
                    <span className="read">{d.guidesSection.readMore}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
