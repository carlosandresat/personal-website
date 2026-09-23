export type Track = "foundations" | "frontend" | "backend" | "iot";

export type SessionKind = "lecture" | "workshop" | "homework";

export type CourseBlock =
  | { type: "module"; sessions: { kind: SessionKind; minutes: number }[] }
  | { type: "project"; minutes: number; final?: boolean };

export interface CourseConfig {
  /** URL segment under `/courses`. */
  slug: string;
  /** Namespace under `Courses` in `messages/{locale}.json`. */
  key: string;
  image: string;
  /** Must live in `public/` — colocated OG images break the prerender. */
  ogImage: string;
  track: Track;
  /** 1-student price in USD, passed to `PricingDialog`. */
  basePrice: number;
  /** Modules and projects, in the order they are taught. */
  blocks: CourseBlock[];
}

/** A module: lecture + workshop, plus optional homework. Minutes per session. */
function moduleBlock(minutes: {
  lecture: number;
  workshop: number;
  homework?: number;
}): CourseBlock {
  const sessions: { kind: SessionKind; minutes: number }[] = [
    { kind: "lecture", minutes: minutes.lecture },
    { kind: "workshop", minutes: minutes.workshop },
  ];
  if (minutes.homework) {
    sessions.push({ kind: "homework", minutes: minutes.homework });
  }
  return { type: "module", sessions };
}

function projectBlock(minutes: number, { final = false } = {}): CourseBlock {
  return { type: "project", minutes, final };
}

function repeat(n: number, block: CourseBlock): CourseBlock[] {
  return Array.from({ length: n }, () => block);
}

export const courses: CourseConfig[] = [
  {
    slug: "basics-python",
    key: "BasicsPython",
    image: "/Python.png",
    ogImage: "/opengraph-image.png",
    track: "foundations",
    basePrice: 120,
    blocks: [
      ...repeat(8, moduleBlock({ lecture: 20, workshop: 40, homework: 120 })),
      projectBlock(360, { final: true }),
    ],
  },
  {
    slug: "front-end-html-css-js",
    key: "FrontI",
    image: "/front1.png",
    ogImage: "/opengraph-image.png",
    track: "frontend",
    basePrice: 150,
    blocks: [
      ...repeat(2, moduleBlock({ lecture: 20, workshop: 40, homework: 60 })),
      projectBlock(180),
      ...repeat(2, moduleBlock({ lecture: 20, workshop: 40, homework: 60 })),
      projectBlock(180),
      ...repeat(3, moduleBlock({ lecture: 20, workshop: 50, homework: 90 })),
      projectBlock(480, { final: true }),
    ],
  },
  {
    slug: "scratch-kids",
    key: "Scratch",
    image: "/scratch.png",
    ogImage: "/courses/scratch-kids/opengraph-image.png",
    track: "foundations",
    basePrice: 100,
    blocks: [
      ...repeat(2, moduleBlock({ lecture: 15, workshop: 45 })),
      projectBlock(120),
      ...repeat(2, moduleBlock({ lecture: 15, workshop: 45 })),
      projectBlock(120),
      ...repeat(2, moduleBlock({ lecture: 15, workshop: 45 })),
      projectBlock(300),
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function getCourseByKey(key: string) {
  return courses.find((course) => course.key === key);
}

export function blockMinutes(block: CourseBlock) {
  return block.type === "module"
    ? block.sessions.reduce((sum, session) => sum + session.minutes, 0)
    : block.minutes;
}

/** The countable parts of a course, in display order. */
export const COUNT_KEYS = [
  "lectures",
  "workshops",
  "homework",
  "projects",
] as const;

export function courseStats(course: CourseConfig) {
  const stats = {
    lectures: 0,
    workshops: 0,
    homework: 0,
    projects: 0,
    totalMinutes: 0,
  };
  for (const block of course.blocks) {
    stats.totalMinutes += blockMinutes(block);
    if (block.type === "project") {
      stats.projects++;
      continue;
    }
    for (const session of block.sessions) {
      if (session.kind === "lecture") stats.lectures++;
      else if (session.kind === "workshop") stats.workshops++;
      else stats.homework++;
    }
  }
  return stats;
}
