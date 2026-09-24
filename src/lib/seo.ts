import type { Metadata } from "next";
import { locales } from "@/navigation";

export const SITE_URL = "https://carlosarevalo.dev";
export const SITE_NAME = "Carlos Arévalo";
export const DEFAULT_OG_IMAGE = "/opengraph-image.png";

/** Public profiles: the hero's social buttons and the Person `sameAs`. */
export const PROFILES = {
  github: "https://github.com/carlosandresat",
  linkedin: "https://www.linkedin.com/in/carlosandresat/",
};

const OG_LOCALE: Record<string, string> = { en: "en_US", es: "es_EC" };

/** Absolute URL of `path` in `locale`. `path` is "" for the home page. */
export function localeUrl(locale: string, path: string) {
  return `${SITE_URL}/${locale}${path}`;
}

/** Per-locale URLs of `path`, plus `x-default` pointing at the English one. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/en${path}`,
  };
}

/**
 * Metadata for one page: title, description, self-referencing canonical,
 * hreflang alternates and Open Graph/Twitter cards. Every page must call this —
 * the layout sets no `alternates`, so nothing inherits a wrong canonical.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: title }];
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url: `/${locale}${path}`,
      siteName: SITE_NAME,
      title,
      description,
      locale: OG_LOCALE[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}

/** schema.org Person for the site owner, referenced by `@id` elsewhere. */
export function personSchema(jobTitle: string) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/carlos.arevalo.jpg`,
    jobTitle,
    sameAs: Object.values(PROFILES),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
