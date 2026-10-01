import { ArrowUpRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { CornerTicks } from "@/components/design/corner-ticks";
import { Eyebrow } from "@/components/design/eyebrow";
import { LedgerDivider, pad2 } from "@/components/design/ledger-divider";
import { SpecRow } from "@/components/design/spec-row";
import { ProjectLogo } from "@/components/project-card";
import { ZoomableShot } from "@/components/projects/zoomable-shot";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROJECTS, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const TUTOU_URL = PROJECTS.find((p) => p.id === "tutou")?.live;

const COVER = { src: "/TutoYT4.png", width: 1377, height: 941 };

/**
 * The journey, in the order a session happened. `wide` steps span both
 * columns with the caption beside the shot; `flip` puts the shot first.
 */
const STEPS: {
  src: string;
  width: number;
  height: number;
  crop?: string;
  wide?: boolean;
  flip?: boolean;
}[] = [
  { src: "/TutoYT5.png", width: 1375, height: 891, crop: "object-top" },
  {
    src: "/TutoYT6.png",
    width: 1920,
    height: 1080,
    crop: "object-[center_35%]",
  },
  {
    src: "/TutoYT1.png",
    width: 1718,
    height: 888,
    crop: "object-top",
    wide: true,
  },
  { src: "/TutoYT2.png", width: 579, height: 423, crop: "object-top" },
  { src: "/TutoYT3.png", width: 701, height: 463, crop: "object-top" },
  {
    src: "/TutoYT7.png",
    width: 943,
    height: 669,
    crop: "object-[center_45%]",
    wide: true,
    flip: true,
  },
];

export default function OrientaYTBody({ project }: { project: Project }) {
  const t = useTranslations("Projects.projects.orientayt.content");
  const tp = useTranslations("Projects");
  const zoomLabel = tp("zoomImage");

  return (
    <div className="grid gap-6 pb-1 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:grid-rows-[auto_1fr]">
      <aside className="flex flex-col gap-3">
        <div className="relative flex flex-col gap-4 border bg-muted/30 p-6">
          <CornerTicks />
          <ProjectLogo project={project} size="card" />
          <div className="flex flex-col gap-2">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <DialogTitle className="text-3xl leading-tight">
              {project.name}
            </DialogTitle>
            <DialogDescription>
              {tp("projects.orientayt.description")}
            </DialogDescription>
          </div>
          <p className="text-sm leading-relaxed">{t("introduction")}</p>
        </div>

        <div className="border px-5 py-1">
          <SpecRow label={t("specs.campus")} value="Yachay Tech" />
          <SpecRow label={t("specs.pilot")} value={t("specs.pilotDate")} />
          <SpecRow label={t("specs.subjects")} value="05" />
          <SpecRow label={t("specs.version")} value="v0.4" />
        </div>

        <div className="flex flex-col gap-2 border px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {t("stack")}
          </span>
          <p className="font-mono text-[11px] leading-relaxed tracking-wide">
            {project.tech.join(" · ")}
          </p>
        </div>

        {TUTOU_URL ? (
          <a
            href={TUTOU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 border border-brand/40 bg-brand/10 px-5 py-4 transition-colors hover:bg-brand/15"
          >
            <span className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand">
                {t("successor")}
              </span>
              <span className="text-lg font-semibold">Tuto-U</span>
            </span>
            <ArrowUpRightIcon className="size-5 text-brand" aria-hidden />
          </a>
        ) : null}

        <blockquote className="flex flex-col gap-2 border px-5 py-4">
          <span
            aria-hidden
            className="text-4xl font-bold leading-[0.7] text-brand"
          >
            “
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("closing")}
          </p>
        </blockquote>
      </aside>

      <section className="flex min-w-0 flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-11">
        <LedgerDivider
          label={t("journey.title")}
          meta={t("journey.count", { count: pad2(STEPS.length) })}
          className="pt-0"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <figure className="flex flex-col gap-3 border bg-muted/30 p-3 sm:col-span-2">
            <ZoomableShot
              {...COVER}
              alt={t("journey.cover")}
              zoomLabel={zoomLabel}
              sizes="(min-width: 1024px) 680px, 95vw"
              className="h-48 sm:h-64"
              imageClassName="object-top"
            />
            <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>
                {pad2(0)} — {t("journey.cover")}
              </span>
              <span>“{t("journey.coverQuote")}”</span>
            </figcaption>
          </figure>

          {STEPS.map((step, i) => {
            const n = i + 1;
            const title = t(`journey.steps.${n}.title` as never);
            const caption = (
              <figcaption
                className={cn(
                  "flex gap-3",
                  step.wide && "sm:col-span-2 sm:flex-col sm:gap-2.5"
                )}
              >
                <span className="font-mono text-xl font-medium leading-tight text-brand">
                  {pad2(n)}
                </span>
                <span className="flex flex-col gap-1">
                  <span
                    className={cn("font-semibold", step.wide && "sm:text-lg")}
                  >
                    {title}
                  </span>
                  <span className="text-sm leading-snug text-muted-foreground">
                    {t(`journey.steps.${n}.description` as never)}
                  </span>
                </span>
              </figcaption>
            );
            const shot = (
              <ZoomableShot
                src={step.src}
                width={step.width}
                height={step.height}
                alt={title}
                zoomLabel={zoomLabel}
                sizes={
                  step.wide
                    ? "(min-width: 1024px) 420px, (min-width: 640px) 60vw, 95vw"
                    : "(min-width: 1024px) 340px, (min-width: 640px) 45vw, 95vw"
                }
                className={cn(
                  "h-44",
                  step.wide && "sm:col-span-3 sm:h-56",
                  step.flip && "sm:order-first"
                )}
                imageClassName={step.crop}
              />
            );

            return (
              <figure
                key={step.src}
                className={cn(
                  "flex flex-col gap-3 border bg-muted/30 p-4",
                  step.wide &&
                    "sm:col-span-2 sm:grid sm:grid-cols-5 sm:items-center sm:gap-4"
                )}
              >
                {caption}
                {shot}
              </figure>
            );
          })}
        </div>
      </section>

      {/* Ends the aside on desktop, the whole dialog on mobile. */}
      <DialogClose asChild>
        <Button variant="secondary" className="w-full lg:-mt-3 lg:self-start">
          {tp("backButton")}
        </Button>
      </DialogClose>
    </div>
  );
}
