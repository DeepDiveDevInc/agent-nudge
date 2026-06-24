import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getDictionary, localePath, isLocale, LOCALES, HREFLANG, type Locale } from "@/lib/i18n";
import { GUIDES, getGuide, getGuideContent, CLUSTER_LABELS } from "@/lib/content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://cdcpguide.ca").replace(/\/+$/, "");

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => GUIDES.map((g) => ({ locale, slug: g.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const g = getGuide(params.slug);
  if (!g) return {};
  const { content } = getGuideContent(g, locale);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `/${locale}/guides/${g.slug}`,
      languages: {
        "en-CA": `/en/guides/${g.slug}`,
        "fr-CA": `/fr/guides/${g.slug}`,
      },
    },
    openGraph: { type: "article", title: content.metaTitle, description: content.metaDescription },
  };
}

/** Single guide page: answer box, eligibility CTA, body, related links, and QAPage/Article JSON-LD. */
export default function GuidePage({ params }: { params: { locale: string; slug: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const d = getDictionary(locale);
  const g = getGuide(params.slug);
  if (!g) notFound();
  const { content, fellBack } = getGuideContent(g, locale);

  const url = `${SITE_URL}/${locale}/guides/${g.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "QAPage",
        mainEntity: {
          "@type": "Question",
          name: content.question,
          acceptedAnswer: { "@type": "Answer", text: content.answer },
        },
      },
      {
        "@type": "Article",
        headline: content.metaTitle,
        description: content.metaDescription,
        inLanguage: HREFLANG[locale],
        dateModified: g.updated,
        datePublished: g.updated,
        mainEntityOfPage: url,
        isPartOf: { "@type": "WebSite", name: d.meta.siteName, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: d.meta.siteName, item: `${SITE_URL}/${locale}` },
          { "@type": "ListItem", position: 2, name: d.nav.guides, item: `${SITE_URL}/${locale}/guides` },
          { "@type": "ListItem", position: 3, name: content.question, item: url },
        ],
      },
    ],
  };

  const related = g.related.map((slug) => getGuide(slug)).filter(Boolean);

  return (
    <main className="article">
      <JsonLd data={jsonLd} />
      <div className="breadcrumb">
        <Link href={localePath(locale, "/")}>{d.meta.siteName}</Link> ›{" "}
        <Link href={localePath(locale, "/guides")}>{d.nav.guides}</Link> ›{" "}
        {CLUSTER_LABELS[g.cluster][locale]}
      </div>

      <h1>{content.question}</h1>

      {fellBack && (
        <div className="fallback-banner">
          🌐 {locale === "fr" ? "Traduction française à venir — affichage en anglais." : "Showing English while the translation is finalized."}
        </div>
      )}

      <div className="answer-box">
        <p style={{ margin: 0 }}>
          <strong>{content.answer}</strong>
        </p>
        <p className="updated">
          {d.guidesSection.updatedPrefix} {g.updated}
        </p>
      </div>

      <div className="article-cta">
        <strong>{d.guidesSection.ctaTitle}</strong>
        <span className="muted">{d.guidesSection.ctaBody}</span>
        <Link className="btn btn-primary" href={localePath(locale, "/") + "#chat"}>
          {d.guidesSection.ctaButton}
        </Link>
      </div>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: content.bodyHtml.replace(/\{locale\}/g, locale) }}
      />

      {related.length > 0 && (
        <div className="related">
          <h3>{d.guidesSection.relatedTitle}</h3>
          <ul>
            {related.map((r) => {
              const rc = getGuideContent(r!, locale).content;
              return (
                <li key={r!.slug}>
                  <Link href={localePath(locale, `/guides/${r!.slug}`)}>{rc.question}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="sources">
        <h3>{d.guidesSection.sourcesTitle}</h3>
        <ul>
          {g.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener">
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
