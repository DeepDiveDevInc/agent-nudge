import type { MetadataRoute } from "next";
import { LOCALES, HREFLANG } from "@/lib/i18n";
import { GUIDES } from "@/lib/content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://cdcpguide.ca").replace(/\/+$/, "");

/** Build `alternates.languages` pairing the en-CA / fr-CA equivalents of a locale-relative path. */
function alternates(path: string): MetadataRoute.Sitemap[number]["alternates"] {
  return {
    languages: Object.fromEntries(LOCALES.map((l) => [HREFLANG[l], `${SITE_URL}/${l}${path}`])),
  };
}

/** Generates the bilingual sitemap: home, guides index, each guide, and the privacy page per locale. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: alternates(""),
    });
    entries.push({
      url: `${SITE_URL}/${locale}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: alternates("/guides"),
    });
    entries.push({
      url: `${SITE_URL}/${locale}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
      alternates: alternates("/privacy"),
    });
    for (const g of GUIDES) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${g.slug}`,
        lastModified: g.updated,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: alternates(`/guides/${g.slug}`),
      });
    }
  }
  return entries;
}
