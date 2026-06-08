import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
    
export const locales = ['en', 'es'];
export const localePrefix = 'always';

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix
});
    
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);