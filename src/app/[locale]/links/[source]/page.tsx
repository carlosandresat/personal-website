import { ArrowUpRight, BookOpen, Code2, Compass, Globe, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";

import { pageMetadata } from "@/lib/seo";
import { Link, locales } from "@/navigation";

/**
 * The bio link of each professional account (/<locale>/links/<source>).
 * One page per network so its WhatsApp button goes to /wa/<source> and the
 * Vercel logs keep counting contacts per network. Never rename these: they
 * are in the profiles.
 */
const SOURCES = ["instagram", "tiktok", "facebook", "linkedin"] as const;

export function generateStaticParams() {
  return locales.flatMap((locale) => SOURCES.map((source) => ({ locale, source })));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; source: string }>;
}): Promise<Metadata> {
  const { locale, source } = await props.params;
  const t = await getTranslations({ locale, namespace: "Links.meta" });
  // A hub for visitors from the profiles, not a page to rank.
  return pageMetadata({
    locale,
    path: `/links/${source}`,
    title: t("title"),
    description: t("description"),
    noindex: true,
  });
}

const ROW =
  "group flex items-center gap-4 rounded-xl border bg-card px-5 py-4 transition-colors hover:border-brand/50";

function Row({
  icon: Icon,
  label,
  sub,
  highlight = false,
}: {
  icon: typeof Globe;
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <>
      <span
        className={
          highlight
            ? "flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white"
            : "flex size-10 shrink-0 items-center justify-center rounded-lg border text-brand"
        }
      >
        <Icon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-semibold group-hover:text-brand">{label}</span>
        <span className="text-sm text-muted-foreground">{sub}</span>
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground group-hover:text-brand" />
    </>
  );
}

export default function Page(props: { params: Promise<{ locale: string; source: string }> }) {
  const { locale, source } = use(props.params);
  setRequestLocale(locale);
  if (!(SOURCES as readonly string[]).includes(source)) notFound();

  const t = useTranslations("Links");
  const pages = [
    { href: "/explora", icon: Compass, key: "explora" },
    { href: "/courses", icon: BookOpen, key: "courses" },
    { href: "/development", icon: Code2, key: "development" },
    { href: "/", icon: Globe, key: "site" },
  ] as const;

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pb-20 pt-28 lg:pt-32">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src="/logo.png" alt="" width={88} height={88} priority />
          <p className="font-mono text-sm text-brand">@carlosarevalo.dev</p>
          <h1 className="text-2xl font-bold tracking-tight">{t("tagline")}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{t("intro")}</p>
        </div>

        <nav className="flex w-full flex-col gap-3">
          {/* A plain <a>: /wa sits outside the locale tree. */}
          <a href={`/wa/${source}`} target="_blank" rel="noopener noreferrer" className={ROW}>
            <Row icon={MessageCircle} label={t("whatsapp.label")} sub={t("whatsapp.sub")} highlight />
          </a>
          {pages.map(({ href, icon, key }) => (
            <Link key={key} href={href} className={ROW}>
              <Row icon={icon} label={t(`${key}.label`)} sub={t(`${key}.sub`)} />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
