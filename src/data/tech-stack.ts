export type TechCategory =
  | "frontend"
  | "backend"
  | "datascience"
  | "devops";

/** 1 = core, 2 = secondary, 3 = exploring. Drives the badge and corner ticks. */
export type TechTier = 1 | 2 | 3;

export interface TechItem {
  id: string;
  name: string;
  src: string;
  /**
   * Intrinsic dimensions differ per asset on purpose — they normalise the
   * optical size of logos with very different padding. Do not round them.
   */
  width: number;
  height: number;
  category: TechCategory;
  tier: TechTier;
  darkInvert?: boolean;
}

export const TECH_CATEGORIES = [
  "frontend",
  "backend",
  "datascience",
  "devops",
] as const;

/** The bracketed short tag shown on each card and graph node. */
export const TECH_CATEGORY_TAG: Record<TechCategory, string> = {
  frontend: "FE",
  backend: "BE",
  datascience: "DS",
  devops: "DO",
};

export const TECHNOLOGIES: TechItem[] = [
  // Frontend & Client
  { id: "react", name: "React", src: "/stack-react.png", width: 64, height: 64, category: "frontend", tier: 1, darkInvert: true },
  { id: "nextjs", name: "Next.js", src: "/Next.js.png", width: 80, height: 80, category: "frontend", tier: 1, darkInvert: true },
  { id: "typescript", name: "TypeScript", src: "/Typescrip.png", width: 60, height: 60, category: "frontend", tier: 1 },
  { id: "tailwindcss", name: "TailwindCSS", src: "/tailwind.png", width: 64, height: 64, category: "frontend", tier: 1 },
  { id: "jquery", name: "jQuery", src: "/jquery.png", width: 70, height: 70, category: "frontend", tier: 2 },
  { id: "bootstrap", name: "Bootstrap", src: "/Bootstrap.png", width: 80, height: 80, category: "frontend", tier: 2 },
  { id: "tanstack", name: "TanStack", src: "/tanstack.png", width: 80, height: 80, category: "frontend", tier: 3 },
  { id: "zustand", name: "Zustand", src: "/zustand.png", width: 120, height: 120, category: "frontend", tier: 3 },

  // Backend & Databases
  { id: "nestjs", name: "NestJS", src: "/nestjs.svg", width: 70, height: 70, category: "backend", tier: 1 },
  { id: "prisma", name: "Prisma", src: "/prisma.png", width: 50, height: 50, category: "backend", tier: 1 },
  { id: "typeorm", name: "TypeORM", src: "/typeorm.png", width: 60, height: 60, category: "backend", tier: 1 },
  { id: "trpc", name: "tRPC", src: "/trpc.svg", width: 64, height: 64, category: "backend", tier: 1 },
  { id: "postgresql", name: "PostgreSQL", src: "/postgres.png", width: 64, height: 64, category: "backend", tier: 1 },
  { id: "mysql", name: "MySQL", src: "/mysql.png", width: 80, height: 80, category: "backend", tier: 1 },
  { id: "express", name: "Express", src: "/express.png", width: 90, height: 90, category: "backend", tier: 2, darkInvert: true },
  { id: "php", name: "PHP", src: "/php.png", width: 100, height: 100, category: "backend", tier: 3 },
  { id: "laravel", name: "Laravel", src: "/laravel.png", width: 75, height: 75, category: "backend", tier: 3 },

  // Data Science & AI
  { id: "python", name: "Python", src: "/Python.png", width: 64, height: 64, category: "datascience", tier: 2 },
  { id: "matplotlib", name: "Matplotlib", src: "/matplotlib.png", width: 70, height: 70, category: "datascience", tier: 2 },
  { id: "scikitlearn", name: "Scikit-learn", src: "/scikitlearn.png", width: 90, height: 90, category: "datascience", tier: 2 },
  { id: "tensorflow", name: "Tensorflow", src: "/tensorflow.png", width: 64, height: 64, category: "datascience", tier: 2 },
  { id: "jupyter", name: "Jupyter", src: "/jupyter.png", width: 60, height: 60, category: "datascience", tier: 2 },
  { id: "numpy", name: "Numpy", src: "/numpy.svg", width: 70, height: 70, category: "datascience", tier: 2 },
  { id: "opencv", name: "OpenCV", src: "/OpenCV.png", width: 64, height: 64, category: "datascience", tier: 2 },

  // DevOps & Tools
  { id: "gcs", name: "Google Cloud Storage", src: "/google-cloud-storage.png", width: 64, height: 64, category: "devops", tier: 1 },
  { id: "vercel", name: "Vercel", src: "/vercel.svg", width: 64, height: 64, category: "devops", tier: 1, darkInvert: true },
  { id: "jest", name: "Jest", src: "/jest.png", width: 64, height: 64, category: "devops", tier: 1 },
  { id: "docker", name: "Docker", src: "/docker.png", width: 80, height: 80, category: "devops", tier: 1 },
  { id: "kubernetes", name: "Kubernetes", src: "/kubernetes.png", width: 70, height: 70, category: "devops", tier: 2 },
  { id: "githubactions", name: "GitHub Actions", src: "/github-actions.png", width: 70, height: 70, category: "devops", tier: 2, darkInvert: true },
  { id: "antigravity", name: "Antigravity", src: "/antigravity.png", width: 70, height: 70, category: "devops", tier: 1 },
  { id: "claudecode", name: "Claude Code", src: "/claude.png", width: 70, height: 70, category: "devops", tier: 1 },
  { id: "playwright", name: "Playwright", src: "/playwright.png", width: 80, height: 80, category: "devops", tier: 3 },
  { id: "bun", name: "Bun", src: "/bun.svg", width: 70, height: 70, category: "devops", tier: 3 },
];

/**
 * The techs that represent a category in the hero graph: lowest tier first,
 * then array order. Sorting by tier rather than filtering on `tier === 1`
 * matters because Data Science & AI currently has no tier-1 entry at all.
 */
export function leadingTechs(category: TechCategory, count = 4): TechItem[] {
  return TECHNOLOGIES.filter((tech) => tech.category === category)
    .slice()
    .sort((a, b) => a.tier - b.tier)
    .slice(0, count);
}
