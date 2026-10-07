import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";

import { Eyebrow } from "@/components/design/eyebrow";
import { StatusBadge } from "@/components/design/status-badge";
import { EXPLORA_CONTENT } from "@/components/explora";
import { exploraTopics, getExploraTopic } from "@/data/explora";
import { pageMetadata } from "@/lib/seo";
import { Link, locales } from "@/navigation";

export function generateStaticParams() {
  return locales.flatMap((locale) => exploraTopics.map((topic) => ({ locale, slug: topic.slug })));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const topic = getExploraTopic(slug);
  if (!topic) return {};
  const t = await getTranslations({ locale, namespace: "Explora.meta" });
  return pageMetadata({
    locale,
    path: `/explora/${slug}`,
    title: `${topic.title} | ${t("title")}`,
    description: topic.summary,
    noindex: locale !== "es",
  });
}

export default function Page(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("Explora");
  const topic = getExploraTopic(slug);
  const Content = EXPLORA_CONTENT[slug];
  if (!topic || !Content) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <article lang="es" className="flex w-full max-w-3xl flex-col gap-10 px-6 pb-20 pt-28 md:px-8 lg:pt-32">
        <header className="flex flex-col gap-4">
          <Link
            href="/explora"
            className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            ← {t("back")}
          </Link>
          <Eyebrow>{t(`series.${topic.series}` as never)}</Eyebrow>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">{topic.title}</h1>
          <p className="text-muted-foreground">{topic.summary}</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge>{t("season", { n: topic.season })}</StatusBadge>
            <StatusBadge>{t("minutes", { n: topic.minutes })}</StatusBadge>
            {locale !== "es" ? <StatusBadge tone="brand">{t("spanishOnly")}</StatusBadge> : null}
          </div>
        </header>
        <Content />
      </article>
    </main>
  );
}
