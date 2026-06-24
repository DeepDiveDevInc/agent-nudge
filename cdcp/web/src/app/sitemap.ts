import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n";
import { GUIDES } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cdcpguide.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    entries.push({ url: `${SITE_URL}/${locale}`, changeFrequency: "weekly", priority: 1 });
    entries.push({ url: `${SITE_URL}/${locale}/guides`, changeFrequency: "weekly", priority: 0.8 });
    for (const g of GUIDES) {
      entries.push({
        url: `${SITE_URL}/${locale}/guides/${g.slug}`,
        lastModified: g.updated,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return entries;
}
