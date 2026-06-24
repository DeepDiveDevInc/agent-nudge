import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const f = d.footer;
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <div className="brand brand-foot">
            <span className="logo">C</span> {d.meta.siteName}
          </div>
          <p className="micro">{f.tagline}</p>
        </div>
        <div>
          <h4>{f.patients}</h4>
          <Link href={localePath(locale, "/") + "#chat"}>{f.links.check}</Link>
          <Link href={localePath(locale, "/") + "#coverage"}>{f.links.coverage}</Link>
          <Link href={localePath(locale, "/guides/find-a-cdcp-dentist")}>{f.links.find}</Link>
        </div>
        <div>
          <h4>{f.dentists}</h4>
          <Link href={localePath(locale, "/") + "#dentists"}>{f.links.advisory}</Link>
          <Link href={localePath(locale, "/") + "#dentists"}>{f.links.getListed}</Link>
          <Link href={localePath(locale, "/privacy")}>{f.links.privacy}</Link>
        </div>
        <div>
          <h4>{f.official}</h4>
          <a href="https://www.canada.ca/en/services/benefits/dental/dental-care-plan.html" target="_blank" rel="noopener">
            Canada.ca — CDCP ↗
          </a>
          <a href="https://www.sunlife.ca/sl/cdcp/en/" target="_blank" rel="noopener">
            Sun Life — CDCP ↗
          </a>
        </div>
      </div>
      <p className="footer-legal">{f.legal} © {new Date().getFullYear()} {d.meta.siteName}.</p>
    </footer>
  );
}
