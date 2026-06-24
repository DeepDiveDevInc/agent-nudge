import Link from "next/link";
import Chat from "@/components/Chat";
import DentistForm from "@/components/DentistForm";
import JsonLd from "@/components/JsonLd";
import { getDictionary, localePath, isLocale, type Locale } from "@/lib/i18n";
import { GUIDES, getGuideContent, CLUSTER_LABELS } from "@/lib/content";

/** Localized home page: hero + eligibility chat, how-it-works, co-pay tiers, dentist CTA, guides. */
export default function Home({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const d = getDictionary(locale);
  const featured = GUIDES.slice(0, 6);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: featured.map((g) => {
      const { content } = getGuideContent(g, locale);
      return {
        "@type": "Question",
        name: content.question,
        acceptedAnswer: { "@type": "Answer", text: content.answer },
      };
    }),
  };

  return (
    <main>
      <JsonLd data={faqLd} />

      {/* HERO + CHAT */}
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="pill">{d.hero.badge}</div>
          <h1>
            {d.hero.titleLead} <span className="grad">{d.hero.titleHi}</span>
          </h1>
          <p className="lede">{d.hero.lede}</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#chat">
              {d.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#coverage">
              {d.hero.ctaSecondary}
            </a>
          </div>
          <ul className="trust-row">
            {d.hero.trust.map((t) => (
              <li key={t}>✓ {t}</li>
            ))}
          </ul>
        </div>
        <Chat dict={d} locale={locale} />
      </section>

      {/* HOW */}
      <section id="how" className="band">
        <h2 className="section-title">{d.howSection.title}</h2>
        <div className="cards-3">
          {d.howSection.steps.map((s, i) => (
            <div className="info-card" key={i}>
              <div className="ic">{i + 1}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="band-alt">
        <div className="band-alt-inner">
          <h2 className="section-title">{d.coverageSection.title}</h2>
          <p className="section-sub">{d.coverageSection.sub}</p>
          <div className="tier-table">
            <div className="tier-row tier-head">
              <span>{d.coverageSection.cols.income}</span>
              <span>{d.coverageSection.cols.cdcp}</span>
              <span>{d.coverageSection.cols.you}</span>
            </div>
            {d.coverageSection.rows.map((r, i) => (
              <div className={`tier-row${r.you.includes("Not") || r.cdcp === "—" ? " tier-out" : ""}`} key={i}>
                <span>{r.income}</span>
                <span className={r.best ? "good" : ""}>{r.cdcp}</span>
                <span>{r.you}</span>
              </div>
            ))}
          </div>
          <div className="callout" dangerouslySetInnerHTML={{ __html: d.coverageSection.callout }} />
        </div>
      </section>

      {/* DENTISTS */}
      <section id="dentists" className="dentist-band">
        <div className="dentist-grid">
          <div>
            <div className="pill pill-dark">{d.dentistSection.badge}</div>
            <h2>{d.dentistSection.title}</h2>
            <p>{d.dentistSection.body}</p>
            <ul className="check-list">
              {d.dentistSection.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <a className="btn btn-primary" href="#dentist-form">
              {d.dentistSection.cta}
            </a>
            <p className="micro">{d.dentistSection.micro}</p>
          </div>
          <DentistForm dict={d} />
        </div>
      </section>

      {/* GUIDES PREVIEW */}
      <section className="band-alt">
        <div className="band-alt-inner">
          <h2 className="section-title">{d.guidesSection.title}</h2>
          <p className="section-sub">{d.guidesSection.sub}</p>
          <div className="guides-grid">
            {featured.map((g) => {
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
          <p style={{ textAlign: "center", marginTop: 28 }}>
            <Link className="btn btn-ghost" href={localePath(locale, "/guides")}>
              {d.nav.guides} →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
