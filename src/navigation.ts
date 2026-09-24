import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
    
export const locales = ['en', 'es'];
export const localePrefix = 'always';

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix,
  // hreflang lives in each page's metadata (src/lib/seo.ts); the middleware's
  // `Link` header would be a second, conflicting source.
  alternateLinks: false
});
    
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);