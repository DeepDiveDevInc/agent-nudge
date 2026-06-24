import { en } from "./dictionaries/en";
import { fr } from "./dictionaries/fr";

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Maps our short locale to the BCP-47 tag used in <html lang> and hreflang. */
export const HREFLANG: Record<Locale, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

export type Dictionary = typeof en;

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Build a locale-prefixed path, e.g. localePath("fr", "/eligibility"). */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return `/${locale}${clean}`;
}
