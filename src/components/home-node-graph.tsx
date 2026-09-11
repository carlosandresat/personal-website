import Image from "next/image";
import { useTranslations } from "next-intl";

import { CornerTicks } from "@/components/design/corner-ticks";
import {
  TECH_CATEGORY_TAG,
  leadingTechs,
  type TechCategory,
} from "@/data/tech-stack";
import { cn } from "@/lib/utils";

function CategoryNode({
  category,
  label,
  align = "left",
}: {
  category: TechCategory;
  label: string;
  /** Which edge the connector leaves from, on the desktop layout. */
  align?: "left" | "right";
}) {
  const techs = leadingTechs(category, 4);

  return (
    <a
      href="#tech-stack"
      className="group relative flex flex-col gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-brand"
    >
      <CornerTicks tone="muted" className="group-hover:border-brand/50" />

      {/* Connector stub into the centre node. Desktop only — the mobile
          layout runs its own vertical bus. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden h-px w-16 bg-border lg:block",
          align === "left" ? "left-full" : "right-full"
        )}
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden size-1.5 -translate-y-1/2 rounded-full bg-brand lg:block",
          align === "left"
            ? "left-full -translate-x-1/2"
            : "right-full translate-x-1/2"
        )}
      />

      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          [ {TECH_CATEGORY_TAG[category]} ]
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        {techs.map((tech) => (
          <span
            key={tech.id}
            title={tech.name}
            className="flex size-8 items-center justify-center rounded-[10px] bg-muted p-1.5"
          >
            <Image
              src={tech.src}
              alt={tech.name}
              width={tech.width}
              height={tech.height}
              className={cn(
                "max-h-full object-contain",
                tech.darkInvert && "dark:invert"
              )}
            />
          </span>
        ))}
      </div>
    </a>
  );
}

function CentreNode() {
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <Image
        alt="Carlos Arévalo"
        src="/carlos.arevalo.jpg"
        width={900}
        height={900}
        priority
        className="size-40 rounded-full border border-brand object-cover shadow-[0_0_0_3px_hsl(var(--brand)/0.06)] lg:size-52"
      />
    </div>
  );
}

export default function HomeNodeGraph() {
  const t = useTranslations("TechStack");

  const nodes: { category: TechCategory; label: string }[] = [
    { category: "frontend", label: t("tabFrontend") },
    { category: "backend", label: t("tabBackend") },
    { category: "datascience", label: t("tabDataScience") },
    { category: "devops", label: t("tabDevOps") },
  ];

  return (
    <div className="w-full">
      {/* Desktop: portrait centred, four categories radiating around it. */}
      <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-x-16 gap-y-8 lg:grid">
        <CategoryNode {...nodes[0]} align="left" />
        <div className="row-span-2">
          <CentreNode />
        </div>
        <CategoryNode {...nodes[1]} align="right" />
        <CategoryNode {...nodes[2]} align="left" />
        <CategoryNode {...nodes[3]} align="right" />
      </div>

      {/* Mobile / tablet: portrait on top, then a vertical bus rail. */}
      <div className="flex flex-col items-center gap-8 lg:hidden">
        <CentreNode />
        <div className="relative w-full">
          <span
            aria-hidden
            className="absolute left-3 top-0 h-full w-px bg-border"
          />
          <ul className="flex flex-col gap-4 pl-10">
            {nodes.map((node) => (
              <li key={node.category} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-7 top-1/2 h-px w-7 bg-border"
                />
                <span
                  aria-hidden
                  className="absolute -left-7 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand"
                />
                <CategoryNode {...node} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
