export type ProjectId =
  | "tinderyt"
  | "edf"
  | "tutou"
  | "orientayt"
  | "kidneyapp";

export interface Project {
  id: ProjectId;
  name: string;
  /** Omitted for projects with no logo asset — the card falls back to an icon. */
  logo?: string;
  /** Light-theme variant, when the project ships a pair. */
  logoLight?: string;
  logoRounded?: boolean;
  logoClassName?: string;
  tech: string[];
  live?: string;
  repo?: string;
  /** Max-width classes for this project's dialog; screenshot sets differ a lot. */
  dialogClassName: string;
}

export const PROJECTS: Project[] = [
  {
    id: "tinderyt",
    name: "TinderYT",
    logo: "/tinderYTlogo.webp",
    logoRounded: true,
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
    ],
    dialogClassName: "sm:max-w-[525px] md:max-w-xl xl:max-w-3xl",
  },
  {
    id: "edf",
    name: "EDF Academy Website",
    logo: "/logoEDF.png",
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "MySQL",
      "GCP",
    ],
    live: "https://edfacademy.com/",
    repo: "https://github.com/carlosandresat/educacion-del-futuro-web",
    dialogClassName: "sm:max-w-[525px] md:max-w-xl xl:max-w-3xl",
  },
  {
    id: "tutou",
    name: "Tuto-U",
    logo: "/Tuto-U-logo.png",
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "GCP",
    ],
    live: "https://tutou.app/",
    repo: "https://github.com/carlosandresat/tuto-u",
    dialogClassName: "sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl",
  },
  {
    id: "orientayt",
    name: "OrientaYT",
    logo: "/logoTutoYT.png",
    logoLight: "/logoTutoYTwhite.png",
    logoClassName: "p-1",
    tech: [
      "React",
      "CSS",
      "JavaScript",
      "Node.js",
      "MySQL",
      "Express",
      "Windows Server",
    ],
    dialogClassName: "sm:max-w-[525px] md:max-w-2xl xl:max-w-5xl",
  },
  {
    id: "kidneyapp",
    name: "Kidney App",
    tech: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Recharts",
      "Prisma",
      "SQLite",
    ],
    repo: "https://github.com/carlosandresat/kidney-app",
    dialogClassName: "sm:max-w-[525px] md:max-w-2xl xl:max-w-3xl",
  },
];
