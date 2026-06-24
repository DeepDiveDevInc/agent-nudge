import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LOCALES, HREFLANG, isLocale, getDictionary, type Locale } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cdcpguide.ca";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${d.meta.siteName} — ${d.hero.titleHi}`,
      template: `%s · ${d.meta.siteName}`,
    },
    description: d.hero.lede,
    alternates: {
      canonical: `/${locale}`,
      languages: { "en-CA": "/en", "fr-CA": "/fr" },
    },
    openGraph: { type: "website", locale: HREFLANG[locale], siteName: d.meta.siteName },
    robots: { index: true, follow: true },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return (
    <html lang={HREFLANG[locale]} className={inter.className}>
      <body>
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
