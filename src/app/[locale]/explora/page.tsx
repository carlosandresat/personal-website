import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Eyebrow } from "@/components/design/eyebrow";
import { StatusBadge } from "@/components/design/status-badge";
import { exploraTopics } from "@/data/explora";
import { pageMetadata } from "@/lib/seo";
import { Link } from "@/navigation";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Explora.meta" });
  // The topics are Spanish only, so the English page isn't worth indexing.
  return pageMetadata({
    locale,
    path: "/explora",
    title: t("title"),
    description: t("description"),
    noindex: locale !== "es",
  });
}

export default function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("Explora");
  const topics = [...exploraTopics].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-4 px-8 pb-6 pt-28 text-center lg:pt-32">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">{t("title")}</h1>
        <p className="max-w-xl text-muted-foreground">{t("subtitle")}</p>
        {locale !== "es" ? <StatusBadge>{t("spanishOnly")}</StatusBadge> : null}
      </div>

      <section className="grid w-full max-w-screen-lg grid-cols-1 gap-4 px-8 pb-20 pt-6 md:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/explora/${topic.slug}`}
            className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-brand/50"
          >
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge tone="brand">{t(`series.${topic.series}` as never)}</StatusBadge>
              <StatusBadge>{t("season", { n: topic.season })}</StatusBadge>
            </div>
            <h2 className="text-lg font-semibold leading-snug group-hover:text-brand">{topic.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{topic.summary}</p>
            <span className="mt-auto font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("minutes", { n: topic.minutes })} · {t("read")} →
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
