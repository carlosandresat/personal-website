import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

import { CornerTicks } from "@/components/design/corner-ticks";
import { Eyebrow } from "@/components/design/eyebrow";
import { pad2 } from "@/components/design/ledger-divider";
import { SectionShell } from "@/components/design/section-shell";
import { StatusBadge } from "@/components/design/status-badge";
import { cn } from "@/lib/utils";

/** Newest first; `activities` too, so each list reads top-down from the present. */
const PROGRAMS: {
  key: string;
  current: boolean;
  specialization?: boolean;
  focus?: string[];
  activities: string[];
}[] = [
  {
    key: "msc",
    current: true,
    specialization: true,
    focus: ["data-science", "machine-learning", "ai"],
    activities: ["exec-leadership"],
  },
  {
    key: "it-eng",
    current: false,
    activities: ["hult-prize", "scientific-poster", "board-member"],
  },
];

export default function EducationSection() {
  const t = useTranslations("Education");
  const tk = (key: string) => t(key as never);

  const currentCount = PROGRAMS.filter((p) => p.current).length;

  return (
    <SectionShell id="education" band="muted">
      <div className="flex w-full flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex shrink-0 flex-col gap-5 lg:w-80">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="scroll-m-20 text-4xl font-bold leading-none tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <div aria-hidden className="h-px bg-foreground" />
          <div className="relative isolate flex h-44 flex-col justify-end gap-1 overflow-hidden rounded-xl border bg-card p-5">
            <div
              aria-hidden
              className="circuit-grid pointer-events-none absolute inset-0 -z-10"
            />
            <span className="text-5xl font-semibold leading-none text-brand">
              {pad2(PROGRAMS.length)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {t("summary", { current: currentCount })}
            </span>
          </div>
        </div>

        <ol className="flex flex-1 flex-col">
          {PROGRAMS.map((program) => {
            const date = program.current ? (
              <span className="text-brand">{t("present")}</span>
            ) : (
              <>
                <span className="font-medium">{tk(`${program.key}.date`)}</span>
                <span className="text-muted-foreground">
                  {tk(`${program.key}.dateNote`)}
                </span>
              </>
            );

            return (
              <li key={program.key} className="flex gap-4 pb-10 last:pb-0 md:gap-7">
                <div className="hidden w-32 shrink-0 flex-col gap-1 pt-1 text-right font-mono text-xs uppercase tracking-wide md:flex">
                  {date}
                </div>

                <div aria-hidden className="flex w-5 shrink-0 flex-col items-center">
                  {program.current ? (
                    <>
                      <span className="mt-1 size-3.5 rounded-full bg-brand ring-[5px] ring-brand/15" />
                      <span className="mt-2.5 w-0 flex-1 border-l border-dashed border-brand" />
                    </>
                  ) : (
                    <>
                      <span className="mt-[5px] size-3 rounded-full border-[1.5px] border-foreground bg-background" />
                      <span className="mt-2.5 w-px flex-1 bg-border" />
                    </>
                  )}
                </div>

                <article
                  className={cn(
                    "relative flex flex-1 flex-col gap-4 rounded-xl border bg-card p-6 md:p-7",
                    program.current && "border-brand/40"
                  )}
                >
                  {program.current ? <CornerTicks /> : null}

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {tk(`${program.key}.level`)}
                    </span>
                    <StatusBadge tone={program.current ? "brand" : "muted"}>
                      {program.current ? t("statusCurrent") : t("statusDone")}
                    </StatusBadge>
                  </div>

                  <div className="flex gap-2 font-mono text-xs uppercase tracking-wide md:hidden">
                    {date}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-semibold leading-tight md:text-2xl">
                      {tk(`${program.key}.degree`)}
                    </h3>
                    {program.specialization ? (
                      <p className="text-muted-foreground">
                        {tk(`${program.key}.specialization`)}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
                    <span className="flex items-start gap-2 text-sm font-medium text-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      {tk(`${program.key}.institution`)}
                    </span>
                    <span className="font-mono text-xs">
                      · {tk(`${program.key}.location`)}
                    </span>
                  </div>

                  {program.focus ? (
                    <ul className="flex flex-wrap gap-2">
                      {program.focus.map((focus) => (
                        <li
                          key={focus}
                          className="rounded-md border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                        >
                          {tk(`${program.key}.focus.${focus}`)}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="flex flex-col border-t border-dashed pt-3">
                    <span className="pb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {tk(`${program.key}.activitiesLabel`)}
                    </span>
                    <ul className="flex flex-col">
                      {program.activities.map((activity) => (
                        <li
                          key={activity}
                          className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-4"
                        >
                          <span className="shrink-0 font-mono text-[11px] text-muted-foreground sm:w-36 sm:pt-0.5">
                            {tk(`${program.key}.activities.${activity}.date`)}
                          </span>
                          <span className="text-sm">
                            {tk(`${program.key}.activities.${activity}.title`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionShell>
  );
}
