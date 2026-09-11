import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CornerTicks } from "@/components/design/corner-ticks";
import { Eyebrow } from "@/components/design/eyebrow";
import {
  FilterTabsList,
  FilterTabsTrigger,
} from "@/components/design/filter-tabs";
import { SectionHeader } from "@/components/design/section-header";
import { SectionShell } from "@/components/design/section-shell";
import { StatusBadge } from "@/components/design/status-badge";
import {
  TECHNOLOGIES,
  TECH_CATEGORIES,
  TECH_CATEGORY_TAG,
  type TechItem,
} from "@/data/tech-stack";
import { cn } from "@/lib/utils";

function TechCard({ tech, tierLabel }: { tech: TechItem; tierLabel: string }) {
  const core = tech.tier === 1;

  return (
    <Card
      className={cn(
        "group relative flex h-40 flex-col justify-between overflow-hidden rounded-xl border border-border/80 bg-card p-4 transition-colors",
        core
          ? "hover:border-brand hover:shadow-[0_0_0_3px_hsl(var(--brand)/0.06)]"
          : "hover:border-brand/40"
      )}
    >
      {/* Ticks mark the core stack — a state, not decoration. */}
      {core ? <CornerTicks corners="all" /> : null}

      <div className="flex w-full items-center justify-between">
        <Eyebrow className="text-muted-foreground opacity-60">
          {TECH_CATEGORY_TAG[tech.category]}
        </Eyebrow>
        <StatusBadge tone={core ? "brand" : "muted"}>{tierLabel}</StatusBadge>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center py-2">
        <div className="relative flex h-14 w-full items-center justify-center">
          <Image
            alt={tech.name}
            height={tech.height}
            src={tech.src}
            width={tech.width}
            className={cn(
              "max-h-full object-contain",
              tech.darkInvert && "dark:invert"
            )}
          />
        </div>
      </div>

      <div className="w-full text-center">
        <span className="text-base font-semibold tracking-tight md:text-lg">
          {tech.name}
        </span>
      </div>
    </Card>
  );
}

export default function TechStackSection() {
  const t = useTranslations("TechStack");

  const categoryLabel = {
    frontend: t("tabFrontend"),
    backend: t("tabBackend"),
    datascience: t("tabDataScience"),
    devops: t("tabDevOps"),
  };

  const tierLabel = {
    1: t("coreBadge"),
    2: t("secondaryBadge"),
    3: t("exploringBadge"),
  };

  return (
    <SectionShell id="tech-stack" band="muted">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        meta={`${TECHNOLOGIES.length} entries`}
      />

      <Tabs
        defaultValue="frontend"
        className="flex w-full flex-col items-center"
      >
        <FilterTabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4">
          {TECH_CATEGORIES.map((category) => (
            <FilterTabsTrigger key={category} value={category}>
              {categoryLabel[category]}
            </FilterTabsTrigger>
          ))}
        </FilterTabsList>

        {TECH_CATEGORIES.map((category) => (
          <TabsContent key={category} value={category} className="mt-10 w-full">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {TECHNOLOGIES.filter((tech) => tech.category === category).map(
                (tech) => (
                  <TechCard
                    key={tech.id}
                    tech={tech}
                    tierLabel={tierLabel[tech.tier]}
                  />
                )
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </SectionShell>
  );
}
