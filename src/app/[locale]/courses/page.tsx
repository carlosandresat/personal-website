import { Card, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  FilterTabsList,
  FilterTabsTrigger,
} from "@/components/design/filter-tabs";
import { CornerTicks } from "@/components/design/corner-ticks";
import { Eyebrow } from "@/components/design/eyebrow";
import { StatusBadge } from "@/components/design/status-badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ComingSoonDialog } from "@/components/coming-soon-dialog";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { cn } from "@/lib/utils";
import {
  COUNT_KEYS,
  courseStats,
  getCourseByKey,
  type CourseConfig,
  type Track,
} from "@/data/courses";

interface CourseData {
  key: string;
  image: string;
  track: Track;
  status: "enrolling" | "soon";
}

const courses: CourseData[] = [
  {
    key: "BasicsPython",
    image: "/Python.png",
    track: "foundations",
    status: "enrolling",
  },
  {
    key: "Scratch",
    image: "/scratch.png",
    track: "foundations",
    status: "enrolling",
  },
  {
    key: "FrontI",
    image: "/front1.png",
    track: "frontend",
    status: "enrolling",
  },
  {
    key: "FrontII",
    image: "/React-icon.png",
    track: "frontend",
    status: "soon",
  },
  {
    key: "FrontIII",
    image: "/Next.js.png",
    track: "frontend",
    status: "soon",
  },
  {
    key: "Databases",
    image: "/postgres.png",
    track: "backend",
    status: "soon",
  },
  {
    key: "BackExpress",
    image: "/express.png",
    track: "backend",
    status: "soon",
  },
  {
    key: "BackNext",
    image: "/Next.js.png",
    track: "backend",
    status: "soon",
  },
  {
    key: "Matplotlib",
    image: "/matplotlib.png",
    track: "backend",
    status: "soon",
  },
  {
    key: "IoTArduino",
    image: "/arduino-logo.png",
    track: "iot",
    status: "soon",
  },
  {
    key: "IoTESP8266",
    image: "/nodemcu.png",
    track: "iot",
    status: "soon",
  },
];

function CourseMeta({
  t,
  detail,
}: {
  t: ReturnType<typeof useTranslations<"Courses">>;
  detail?: CourseConfig;
}) {
  if (!detail) {
    return (
      <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
        {t("syllabusInProgress")}
      </span>
    );
  }

  const stats = courseStats(detail);

  return (
    <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
      {COUNT_KEYS.filter((key) => stats[key] > 0)
        .map((key) => `${stats[key]} ${t(`counts.${key}`, { count: stats[key] })}`)
        .join(" · ")}
    </span>
  );
}

function CourseCard({ course }: { course: CourseData }) {
  const t = useTranslations("Courses");
  const enrolling = course.status === "enrolling";
  const detail = getCourseByKey(course.key);

  return (
    <Card
      className={cn(
        "relative flex flex-col gap-3.5 p-5",
        enrolling && "border-brand shadow-[0_0_0_3px_hsl(var(--brand)/0.06)]"
      )}
    >
      {enrolling && <CornerTicks />}
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-[10px] bg-muted p-2.5">
          <Image
            src={course.image}
            height={200}
            width={200}
            alt={t(`${course.key}.title` as never)}
            className={cn(
              "object-contain",
              (course.key === "FrontIII" || course.key === "BackNext") &&
                "dark:invert"
            )}
          />
        </div>
        <StatusBadge tone={enrolling ? "brand" : "muted"}>
          {t(enrolling ? "enrolling" : "soon")}
        </StatusBadge>
      </div>
      <div className="flex flex-col gap-2">
        <CardTitle className="text-lg leading-tight">
          {t(`${course.key}.title` as never)}
        </CardTitle>
        <CourseMeta t={t} detail={detail} />
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t(`${course.key}.summary` as never)}
        </p>
      </div>
      <div className="mt-auto pt-1">
        {detail ? (
          <Button variant="brand" asChild>
            <Link href={`/courses/${detail.slug}`}>{t("viewMore")}</Link>
          </Button>
        ) : (
          <ComingSoonDialog />
        )}
      </div>
    </Card>
  );
}

const tracks: { key: "all" | Track; filterKey: keyof CoursesFilters }[] = [
  { key: "all", filterKey: "all" },
  { key: "foundations", filterKey: "foundations" },
  { key: "frontend", filterKey: "frontend" },
  { key: "backend", filterKey: "backend" },
  { key: "iot", filterKey: "iot" },
];

type CoursesFilters = {
  all: string;
  foundations: string;
  frontend: string;
  backend: string;
  iot: string;
};

export default function Courses(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("Courses");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full max-w-screen-lg flex-col items-center gap-4 px-8 pb-6 pt-28 text-center lg:pt-32">
        <Eyebrow>{t("catalogLabel", { count: courses.length })}</Eyebrow>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <Tabs
        defaultValue="all"
        className="flex w-full max-w-screen-lg flex-col items-center px-4 pb-16"
      >
        <FilterTabsList>
          {tracks.map((track) => (
            <FilterTabsTrigger key={track.key} value={track.key}>
              {t(`filters.${track.filterKey}`)}
            </FilterTabsTrigger>
          ))}
        </FilterTabsList>

        {tracks.map((track) => (
          <TabsContent
            key={track.key}
            value={track.key}
            className="mt-8 w-full"
          >
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((c) => track.key === "all" || c.track === track.key)
                .map((course) => (
                  <CourseCard key={course.key} course={course} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex w-full max-w-screen-lg flex-col items-center gap-4 border-t border-dashed px-8 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            {t("needSomethingElse")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("needSomethingElseDescription")}
          </p>
        </div>
        <Button asChild>
          <a href="mailto:carlosarevalodev@gmail.com">{t("getInTouch")}</a>
        </Button>
      </div>
    </main>
  );
}
