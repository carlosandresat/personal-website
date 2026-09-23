import Image from "next/image";
import { Award, BookOpen, Check, MapPin, Timer } from "lucide-react";
import { PricingDialog } from "@/components/pricing-dialog";
import { Eyebrow } from "@/components/design/eyebrow";
import { LedgerDivider, pad2 } from "@/components/design/ledger-divider";
import { RuleHeading } from "@/components/design/rule-heading";
import { SpecRow } from "@/components/design/spec-row";
import {
  blockMinutes,
  COUNT_KEYS,
  courseStats,
  type CourseBlock,
  type CourseConfig,
  type SessionKind,
} from "@/data/courses";
import { useTranslations } from "next-intl";

const META = [Timer, MapPin, BookOpen, Award];

const SESSION_ICON: Record<SessionKind, string> = {
  lecture: "/theoretical.png",
  workshop: "/workshop.png",
  homework: "/assessment.png",
};

/** Compact duration for ledger metadata: `40min`, `3h`. */
const shortDuration = (minutes: number) =>
  minutes < 60 ? `${minutes}min` : `${minutes / 60}h`;

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

export function CourseDetail({ course }: { course: CourseConfig }) {
  const t = useTranslations(`Courses.${course.key}`);
  const tc = useTranslations("Courses");

  const stats = courseStats(course);
  const objectives = Object.keys(t.raw("objectives"));
  const requirements = Object.keys(t.raw("req"));

  const duration = (minutes: number) =>
    minutes < 60
      ? tc("duration.minutes", { count: minutes })
      : tc("duration.hours", { count: minutes / 60 });

  // Heading meta describes a typical module: live time, plus homework if any.
  const firstModule = course.blocks.find((block) => block.type === "module");
  const moduleMeta = firstModule
    ? [
        firstModule.sessions
          .filter((session) => session.kind !== "homework")
          .reduce((sum, session) => sum + session.minutes, 0),
        firstModule.sessions
          .filter((session) => session.kind === "homework")
          .reduce((sum, session) => sum + session.minutes, 0),
      ]
        .filter(Boolean)
        .map(shortDuration)
        .join(" + ")
    : null;

  // Modules and projects are numbered independently: Module 01…, Project 01…
  const numbered: { block: CourseBlock; n: number }[] = [];
  let modules = 0;
  let projects = 0;
  for (const block of course.blocks) {
    numbered.push({
      block,
      n: block.type === "module" ? ++modules : ++projects,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="flex w-full justify-center border-b px-8 pb-16 pt-28 lg:pt-32">
        <div className="flex w-full max-w-screen-xl flex-col items-end justify-between gap-10 lg:flex-row">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>{tc(`track.${course.track}`)}</Eyebrow>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground">{t("description")}</p>
          </div>
          <div className="grid w-full shrink-0 grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] tracking-wide text-muted-foreground sm:w-auto">
            {[
              duration(stats.totalMinutes),
              tc("online"),
              t("difficulty"),
              tc("certificate"),
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
                src={course.image}
                height={200}
                width={200}
                alt={t("title")}
                className="h-20 w-20 object-contain"
              />
            </div>
            <div className="flex flex-col">
              {COUNT_KEYS.filter((key) => stats[key] > 0).map((key) => (
                <SpecRow
                  key={key}
                  label={tc(`counts.${key}`, { count: stats[key] })}
                  value={stats[key]}
                />
              ))}
            </div>
            <PricingDialog basePrice={course.basePrice} variant="brand" />
          </aside>

          <div className="flex flex-1 flex-col gap-6">
            <RuleHeading level="sub">{tc("learningObjectives")}</RuleHeading>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {objectives.map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-brand" />
                  <span className="text-sm leading-relaxed">
                    {t(`objectives.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            <RuleHeading level="sub" className="mt-4">
              {tc("prerequisites")}
            </RuleHeading>
            {requirements.map((i) => (
              <p key={i} className="text-sm text-muted-foreground">
                {t(`req.${i}`)}
              </p>
            ))}
          </div>
        </section>

        <section className="flex flex-col">
          <RuleHeading
            level="sub"
            meta={[
              `${stats.lectures} ${tc("counts.lectures", { count: stats.lectures })}`,
              moduleMeta,
            ]
              .filter(Boolean)
              .join(" · ")}
          >
            {tc("content")}
          </RuleHeading>

          {numbered.map(({ block, n }, i) => {
            if (block.type === "project") {
              const title = block.final
                ? tc("finalProject")
                : tc("projectN", { n: pad2(n) });
              return (
                <div key={i}>
                  <LedgerDivider
                    label={title}
                    meta={duration(block.minutes)}
                  />
                  <SessionRow
                    icon="/idea.png"
                    kind={tc("project")}
                    title={title}
                    duration={duration(block.minutes)}
                  />
                </div>
              );
            }

            return (
              <div key={i}>
                <LedgerDivider
                  label={`${tc("module")} ${pad2(n)}`}
                  meta={shortDuration(blockMinutes(block))}
                />
                {block.sessions.map((session) => (
                  <SessionRow
                    key={session.kind}
                    icon={SESSION_ICON[session.kind]}
                    kind={tc(session.kind)}
                    title={
                      session.kind === "homework"
                        ? tc("homeworkFor", { module: n })
                        : t(`modules.${n}.${session.kind}`)
                    }
                    duration={duration(session.minutes)}
                  />
                ))}
              </div>
            );
          })}

          <SessionRow
            icon="/certificate.png"
            kind=""
            title={tc("obtainCertificate")}
            duration=""
          />
        </section>
      </div>
    </main>
  );
}
