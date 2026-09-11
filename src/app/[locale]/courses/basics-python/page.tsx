import Image from "next/image";
import { Award, BookOpen, Check, MapPin, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/design/eyebrow";
import { LedgerDivider, pad2 } from "@/components/design/ledger-divider";
import { RuleHeading } from "@/components/design/rule-heading";
import { SpecRow } from "@/components/design/spec-row";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

const META = [Timer, MapPin, BookOpen, Award];

function SessionRow({
  icon,
  kind,
  title,
  duration,
}: {
  icon: string;
  kind: string;
  title: string;
  duration: string;
}) {
  return (
    <div className="flex items-center gap-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground">
        <Image
          src={icon}
          width={200}
          height={200}
          alt=""
          className="size-[19px] object-contain invert dark:invert-0"
        />
      </span>
      <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {kind}
      </span>
      <span className="flex-grow text-sm">{title}</span>
      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
        {duration}
      </span>
    </div>
  );
}

export default function BasicsPython(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("Courses.BasicsPython");
  const tc = useTranslations("Courses");

  const modules = Array.from({ length: 8 }, (_, i) => i + 1);
  const objectives = [1, 2, 3, 4] as const;

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex w-full justify-center border-b px-8 py-16 lg:pt-32">
        <div className="flex w-full max-w-screen-xl flex-col items-end justify-between gap-10 lg:flex-row">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{tc("trackFoundations")}</Eyebrow>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
          <div className="grid w-full shrink-0 grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] tracking-wide text-muted-foreground sm:w-auto">
            {[
              `30 ${t("time")}`,
              `Online (${t("place")})`,
              t("difficulty"),
              t("certificate"),
            ].map((label, i) => {
              const Icon = META[i];
              return (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="size-[18px] text-brand" />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex w-full max-w-screen-xl flex-col gap-16 px-8 py-14">
        <section className="flex flex-col gap-10 lg:flex-row-reverse">
          <aside className="flex w-full shrink-0 flex-col gap-5 rounded-xl border border-brand p-6 shadow-sm lg:w-80">
            <div className="flex h-32 items-center justify-center rounded-lg bg-secondary">
              <Image
                src="/Python.png"
                height={200}
                width={200}
                alt="Python"
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="flex flex-col">
              {[
                { label: t("lectures"), value: 8 },
                { label: t("workshops"), value: 8 },
                { label: tc("homework"), value: 8 },
                { label: t("project"), value: 1 },
              ].map((row) => (
                <SpecRow key={row.label} label={row.label} value={row.value} />
              ))}
            </div>
            <Button variant="brand" asChild>
              <a href="mailto:carlosarevalodev@gmail.com">
                {tc("requestSeat")}
              </a>
            </Button>
          </aside>

          <div className="flex flex-1 flex-col gap-6">
            <RuleHeading level="sub">{t("learningObjective.title")}</RuleHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {objectives.map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  <span className="text-sm leading-relaxed">
                    {t(`learningObjective.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            <RuleHeading level="sub" className="mt-4">
              {t("prerequisites")}
            </RuleHeading>
            <p className="text-sm text-muted-foreground">{t("req.1")}</p>
          </div>
        </section>

        <section className="flex flex-col">
          <RuleHeading level="sub" meta={`8 ${t("lectures")} · 1h + 2h`}>
            {t("content")}
          </RuleHeading>

          {modules.map((n) => (
            <div key={n}>
              <LedgerDivider
                label={`${tc("module")} ${pad2(n)}`}
                meta="3h"
              />
              <SessionRow
                icon="/theoretical.png"
                kind={t("lecture")}
                title={t(`lecturesData.${n}`)}
                duration="20 min"
              />
              <SessionRow
                icon="/workshop.png"
                kind={t("workshop")}
                title={t(`workshopsData.${n}`)}
                duration="40 min"
              />
              <SessionRow
                icon="/assessment.png"
                kind={tc("homework")}
                title={tc("homeworkFor", { module: n })}
                duration={`2 ${t("time")}`}
              />
            </div>
          ))}

          <LedgerDivider
            label={t("finalProject")}
            meta={`6 ${t("time")}`}
          />
          <SessionRow
            icon="/idea.png"
            kind={t("project")}
            title={t("finalProject")}
            duration={`6 ${t("time")}`}
          />
          <SessionRow
            icon="/certificate.png"
            kind=""
            title={t("obtainCertificate")}
            duration=""
          />
        </section>
      </div>
    </main>
  );
}
