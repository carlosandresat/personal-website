import { useLocale, useTranslations } from "next-intl";

/**
 * Floating "message me" button. Links to the /wa route (not wa.me) so the
 * number stays out of the page and contacts can be counted per source.
 * A plain <a>, not `Link` from @/navigation: /wa sits outside the locale tree.
 */
export default function WhatsAppButton() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const label = t("whatsapp");

  return (
    <a
      href={locale === "es" ? "/wa/web" : "/wa/web-en"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-6 md:right-6 md:px-5"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        <path
          transform="translate(7.2 7.2) scale(0.4)"
          fill="currentColor"
          stroke="none"
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        />
      </svg>
      <span className="hidden text-sm font-semibold md:inline">WhatsApp</span>
    </a>
  );
}
