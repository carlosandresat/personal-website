"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechItem {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  category: "frontend" | "backend" | "datascience" | "devops";
  tier: 1 | 2 | 3;
  brandColor: string;
  darkInvert?: boolean;
}

const technologies: TechItem[] = [
  // Frontend & Client
  { id: "react", name: "React", src: "/stack-react.png", width: 64, height: 64, category: "frontend", tier: 1, brandColor: "#61dafb", darkInvert: true },
  { id: "nextjs", name: "Next.js", src: "/Next.js.png", width: 80, height: 80, category: "frontend", tier: 1, brandColor: "#888888", darkInvert: true },
  { id: "typescript", name: "TypeScript", src: "/Typescrip.png", width: 60, height: 60, category: "frontend", tier: 1, brandColor: "#3178c6" },
  { id: "tailwindcss", name: "TailwindCSS", src: "/tailwind.png", width: 64, height: 64, category: "frontend", tier: 1, brandColor: "#38bdf8" },
  { id: "jquery", name: "jQuery", src: "/jquery.png", width: 70, height: 70, category: "frontend", tier: 2, brandColor: "#0769ad" },
  { id: "bootstrap", name: "Bootstrap", src: "/Bootstrap.png", width: 80, height: 80, category: "frontend", tier: 2, brandColor: "#7952b3" },
  { id: "tanstack", name: "TanStack", src: "/tanstack.png", width: 80, height: 80, category: "frontend", tier: 3, brandColor: "#ff4154" },
  { id: "zustand", name: "Zustand", src: "/zustand.png", width: 120, height: 120, category: "frontend", tier: 3, brandColor: "#eab308" },

  // Backend & Databases
  { id: "nestjs", name: "NestJS", src: "/nestjs.svg", width: 70, height: 70, category: "backend", tier: 1, brandColor: "#e0234e" },
  { id: "prisma", name: "Prisma", src: "/prisma.png", width: 50, height: 50, category: "backend", tier: 1, brandColor: "#5a67d8" },
  { id: "typeorm", name: "TypeORM", src: "/typeorm.png", width: 60, height: 60, category: "backend", tier: 1, brandColor: "#f07223" },
  { id: "trpc", name: "tRPC", src: "/trpc.svg", width: 64, height: 64, category: "backend", tier: 1, brandColor: "#398ccb" },
  { id: "postgresql", name: "PostgreSQL", src: "/postgres.png", width: 64, height: 64, category: "backend", tier: 1, brandColor: "#336791" },
  { id: "mysql", name: "MySQL", src: "/mysql.png", width: 80, height: 80, category: "backend", tier: 1, brandColor: "#00758f" },
  { id: "express", name: "Express", src: "/express.png", width: 90, height: 90, category: "backend", tier: 2, brandColor: "#828282", darkInvert: true },
  { id: "php", name: "PHP", src: "/php.png", width: 100, height: 100, category: "backend", tier: 3, brandColor: "#777bb4" },
  { id: "laravel", name: "Laravel", src: "/laravel.png", width: 75, height: 75, category: "backend", tier: 3, brandColor: "#ff2d20" },

  // Data Science & AI
  { id: "python", name: "Python", src: "/Python.png", width: 64, height: 64, category: "datascience", tier: 2, brandColor: "#3776ab" },
  { id: "matplotlib", name: "Matplotlib", src: "/matplotlib.png", width: 70, height: 70, category: "datascience", tier: 2, brandColor: "#11557c" },
  { id: "scikitlearn", name: "Scikit-learn", src: "/scikitlearn.png", width: 90, height: 90, category: "datascience", tier: 2, brandColor: "#f89939" },
  { id: "tensorflow", name: "Tensorflow", src: "/tensorflow.png", width: 64, height: 64, category: "datascience", tier: 2, brandColor: "#ff6f00" },
  { id: "jupyter", name: "Jupyter", src: "/jupyter.png", width: 60, height: 60, category: "datascience", tier: 2, brandColor: "#f37626" },
  { id: "numpy", name: "Numpy", src: "/numpy.svg", width: 70, height: 70, category: "datascience", tier: 2, brandColor: "#4d77cf" },
  { id: "opencv", name: "OpenCV", src: "/OpenCV.png", width: 64, height: 64, category: "datascience", tier: 2, brandColor: "#5c3ee6" },

  // DevOps & Tools
  { id: "gcs", name: "Google Cloud Storage", src: "/google-cloud-storage.png", width: 64, height: 64, category: "devops", tier: 1, brandColor: "#4285f4" },
  { id: "vercel", name: "Vercel", src: "/vercel.svg", width: 64, height: 64, category: "devops", tier: 1, brandColor: "#888888", darkInvert: true },
  { id: "jest", name: "Jest", src: "/jest.png", width: 64, height: 64, category: "devops", tier: 1, brandColor: "#c21325" },
  { id: "docker", name: "Docker", src: "/docker.png", width: 80, height: 80, category: "devops", tier: 1, brandColor: "#2496ed" },
  { id: "kubernetes", name: "Kubernetes", src: "/kubernetes.png", width: 70, height: 70, category: "devops", tier: 2, brandColor: "#326ce5" },
  { id: "githubactions", name: "GitHub Actions", src: "/github-actions.png", width: 70, height: 70, category: "devops", tier: 2, brandColor: "#f2521c", darkInvert: true },
  { id: "antigravity", name: "Antigravity", src: "/antigravity.png", width: 70, height: 70, category: "devops", tier: 1, brandColor: "#2f81f7" },
  { id: "claudecode", name: "Claude Code", src: "/claude.png", width: 70, height: 70, category: "devops", tier: 1, brandColor: "#ea580c" },
  { id: "playwright", name: "Playwright", src: "/playwright.png", width: 80, height: 80, category: "devops", tier: 3, brandColor: "#2ead33" },
  { id: "bun", name: "Bun", src: "/bun.svg", width: 70, height: 70, category: "devops", tier: 3, brandColor: "#e2b89d" },
];

function TechCard({ tech }: { tech: TechItem }) {
  const t = useTranslations("TechStack");

  const getTierInfo = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return {
          text: t("coreBadge"),
          className:
            "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
        };
      case 2:
        return {
          text: t("secondaryBadge"),
          className:
            "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400 dark:border-blue-500/30",
        };
      case 3:
        return {
          text: t("exploringBadge"),
          className:
            "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400 dark:border-purple-500/30",
        };
    }
  };

  const tierInfo = getTierInfo(tech.tier);

  return (
    <Card
      style={{ "--brand-color": tech.brandColor } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden h-40 flex flex-col justify-between p-4 rounded-xl border border-border/80 bg-card/30 backdrop-blur-md transition-all duration-500",
        "hover:-translate-y-2 hover:border-[var(--brand-color)] hover:bg-card/50",
        "hover:shadow-[0_0_25px_-5px_var(--brand-color)] dark:hover:shadow-[0_0_30px_-5px_var(--brand-color)]"
      )}
    >
      {/* Decorative technical corners */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-muted-foreground/30 group-hover:border-[var(--brand-color)] transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-muted-foreground/30 group-hover:border-[var(--brand-color)] transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-muted-foreground/30 group-hover:border-[var(--brand-color)] transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-muted-foreground/30 group-hover:border-[var(--brand-color)] transition-colors duration-500" />

      {/* Dynamic background glow gradient on hover */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-color),transparent)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none blur-xl" />

      {/* Card Header: Tech Category abbreviation and Tier badge */}
      <div className="flex items-center justify-between w-full z-10">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase opacity-60">
          {tech.category === "frontend" && "[ FE ]"}
          {tech.category === "backend" && "[ BE ]"}
          {tech.category === "datascience" && "[ DS ]"}
          {tech.category === "devops" && "[ DO ]"}
        </span>
        <Badge
          variant="outline"
          className={cn(
            "text-[9px] font-mono font-medium px-2 py-0.5 rounded-full border transition-all duration-500",
            tierInfo.className
          )}
        >
          {tierInfo.text}
        </Badge>
      </div>

      {/* Card Body: Tech Icon */}
      <div className="flex flex-col items-center justify-center flex-grow py-2 z-10 transition-transform duration-500 group-hover:scale-105">
        <div className="relative flex items-center justify-center h-14 w-full">
          <Image
            alt={tech.name}
            height={tech.height}
            src={tech.src}
            width={tech.width}
            className={cn(
              "object-contain max-h-full transition-all duration-500 filter drop-shadow-sm group-hover:drop-shadow-[0_0_8px_var(--brand-color)]",
              tech.darkInvert && "dark:invert"
            )}
          />
        </div>
      </div>

      {/* Card Footer: Tech Name */}
      <div className="w-full text-center z-10">
        <span className="font-semibold text-base md:text-lg tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-500">
          {tech.name}
        </span>
      </div>
    </Card>
  );
}

export default function TechStackSection() {
  const t = useTranslations("TechStack");

  const categories = [
    { key: "frontend", label: t("tabFrontend") },
    { key: "backend", label: t("tabBackend") },
    { key: "datascience", label: t("tabDataScience") },
    { key: "devops", label: t("tabDevOps") },
  ];

  return (
    <section
      className="w-full bg-secondary flex flex-col justify-center items-center py-12 md:py-24 lg:py-28"
      id="tech-stack"
    >
      <h2 className="scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
        {t("title")}
      </h2>

      <Tabs defaultValue="frontend" className="w-full max-w-screen-xl flex flex-col items-center mt-8 px-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl h-auto p-1.5 gap-1.5 bg-muted/50 border border-border/80 rounded-xl">
          {categories.map((category) => (
            <TabsTrigger
              key={category.key}
              value={category.key}
              className="py-2.5 px-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 font-semibold text-sm"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.key}
            value={category.key}
            className="w-full mt-10 focus-visible:ring-0 focus-visible:outline-none"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 md:px-8 max-w-screen-xl w-full mx-auto">
              {technologies
                .filter((tech) => tech.category === category.key)
                .map((tech) => (
                  <TechCard key={tech.id} tech={tech} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
