import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CornerTicks } from "@/components/design/corner-ticks";
import { Eyebrow } from "@/components/design/eyebrow";
import { pad2 } from "@/components/design/ledger-divider";
import { RuleHeading } from "@/components/design/rule-heading";
import { cn } from "@/lib/utils";

/**
 * Per phase: the message key, then one [clientActions, developerActions] pair
 * per step. Mirrors Development.<phase>.phases.<n>.* in messages/{en,es}.json —
 * add a bullet there and bump the number here.
 */
const PHASES: { code: string; steps: [number, number][] }[] = [
  { code: "requirements", steps: [[3, 3]] },
  { code: "planning", steps: [[2, 2], [2, 2]] },
  { code: "development", steps: [[2, 2], [2, 2], [2, 2]] },
  { code: "deployment", steps: [[1, 2], [2, 2]] },
  { code: "maintenance", steps: [[2, 2], [2, 2]] },
];

const RAIL_LIST = cn(
  "flex h-auto w-full justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0",
  "lg:flex-col lg:gap-0 lg:overflow-visible"
);

const RAIL_TRIGGER = cn(
  "group relative flex shrink-0 items-center justify-start gap-3 whitespace-nowrap lg:w-full",
  "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
  "rounded-lg border px-3 py-2",
  "lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-1 lg:py-3.5 lg:last:border-b-0",
  "transition-colors hover:text-foreground data-[state=active]:text-foreground"
);

function ActionList({ label, actions }: { label: string; actions: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <ul className="flex flex-col gap-1.5">
        {actions.map((action) => (
          <li key={action} className="flex gap-2 text-[13px] leading-relaxed">
            <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
            <span>{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  index,
  stepLabel,
  title,
  description,
  clientLabel,
  clientActions,
  developerLabel,
  developerActions,
  wide,
}: {
  index: number;
  stepLabel: string;
  title: string;
  description: string;
  clientLabel: string;
  clientActions: string[];
  developerLabel: string;
  developerActions: string[];
  wide: boolean;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-brand/40",
        wide && "md:col-span-2"
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {stepLabel} {pad2(index + 1)}
      </span>
      <div
        className={cn(
          "flex flex-col gap-4",
          wide && "lg:grid lg:grid-cols-[1fr_2fr] lg:gap-5"
        )}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-semibold leading-snug">{title}</h3>
          <p className="text-[12.5px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className={cn("flex flex-col gap-4", wide && "lg:grid lg:grid-cols-2 lg:gap-5")}>
          <ActionList label={clientLabel} actions={clientActions} />
          <ActionList label={developerLabel} actions={developerActions} />
        </div>
      </div>
    </article>
  );
}

export default function Page(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("Development");

  const bullets = (prefix: string, n: number) =>
    Array.from({ length: n }, (_, i) => t(`${prefix}.${i + 1}` as never));

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full max-w-screen-xl flex-col items-center gap-4 px-8 pb-6 pt-28 text-center lg:pt-32">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Tabs
        orientation="vertical"
        defaultValue={PHASES[0].code}
        className="flex w-full max-w-screen-xl flex-col gap-8 px-8 pb-20 pt-6 lg:flex-row lg:gap-10"
      >
        <div className="flex flex-col gap-3 lg:w-[220px] lg:shrink-0 lg:border-r lg:pr-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {t("phasesLabel")}
          </span>
          <TabsList className={RAIL_LIST}>
            {PHASES.map((phase, i) => (
              <TabsTrigger
                key={phase.code}
                value={phase.code}
                className={RAIL_TRIGGER}
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-border transition-colors group-data-[state=active]:bg-brand"
                />
                <span className="group-data-[state=active]:text-brand">
                  {pad2(i + 1)}
                </span>
                <span>{t(`${phase.code}.title` as never)}</span>
                {/* The one place a tick belongs here: it encodes active state. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden opacity-0 group-data-[state=active]:opacity-100 lg:block"
                >
                  <CornerTicks />
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {PHASES.map((phase) => (
          <TabsContent
            key={phase.code}
            value={phase.code}
            className="mt-0 flex min-w-0 flex-1 flex-col gap-6 data-[state=inactive]:hidden"
          >
            <RuleHeading level="sub" meta={pad2(phase.steps.length)}>
              {t(`${phase.code}.title` as never)}
            </RuleHeading>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {phase.steps.map(([client, developer], i) => {
                const key = `${phase.code}.phases.${i + 1}`;
                return (
                  <StepCard
                    key={key}
                    index={i}
                    stepLabel={t("step")}
                    title={t(`${key}.title` as never)}
                    description={t(`${key}.description` as never)}
                    clientLabel={t("clientActions")}
                    clientActions={bullets(`${key}.clientActions`, client)}
                    developerLabel={t("developerActions")}
                    developerActions={bullets(
                      `${key}.developerActions`,
                      developer
                    )}
                    wide={
                      i === phase.steps.length - 1 && phase.steps.length % 2 === 1
                    }
                  />
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
