import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

/** Top disclosure bar + primary nav, with the EN/FR language toggle. */
export default function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const other: Locale = locale === "en" ? "fr" : "en";
  return (
    <>
      <div className="topbar">
        <span>🍁 {d.topbar}</span>
        <div className="lang-toggle" aria-label="Language">
          <Link className={locale === "en" ? "active" : ""} href="/en">
            EN
          </Link>
          <Link className={locale === "fr" ? "active" : ""} href="/fr">
            FR
          </Link>
          <span className="visually-hidden" data-other={other} />
        </div>
      </div>
      <header className="nav">
        <Link className="brand" href={localePath(locale, "/")}>
          <span className="logo">C</span>
          <span>{d.meta.siteName}</span>
        </Link>
        <nav className="nav-links">
          <Link href={localePath(locale, "/") + "#how"}>{d.nav.how}</Link>
          <Link href={localePath(locale, "/") + "#coverage"}>{d.nav.coverage}</Link>
          <Link href={localePath(locale, "/guides")}>{d.nav.guides}</Link>
          <Link href={localePath(locale, "/") + "#dentists"}>{d.nav.dentists}</Link>
          <Link className="btn btn-ghost" href={localePath(locale, "/") + "#chat"}>
            {d.nav.check}
          </Link>
        </nav>
      </header>
    </>
  );
}
