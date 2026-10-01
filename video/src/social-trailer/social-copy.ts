import type { PixelAnimationId } from "../pixel/animations";
import type { ShotId } from "./pacing";

/**
 * Copy for the social trailer. It's an announcement with no home on the site,
 * so it lives here rather than in messages/; Spanish only for now. Course
 * keys point into messages/es.json, and every count is derived from them.
 * Type imports only: scripts/synth-audio.mts reads this file too.
 */

export type StagedRow = { text: string; tag: string; animation: PixelAnimationId };

export type CourseArea = StagedRow & {
  /** Short tech names under the area. */
  detail: string;
  /** `Courses.<key>` entries the area covers. */
  courseKeys: string[];
};

export const SOCIAL_COPY = {
  hook: {
    eyebrow: "Nueva versión",
    title: "Mi web tiene nuevo diseño",
    labels: ["Desarrollo de software", "Cursos de programación"],
  },
  tour: {
    eyebrow: "La nueva web",
    captions: {
      hero: "Un diseño renovado",
      catalog: "Todos mis cursos",
      course: "Cada uno con su tráiler",
      development: "Tu proyecto, paso a paso",
    } satisfies Record<ShotId, string>,
  },
  development: {
    eyebrow: "Desarrollo a medida",
    title: "Construyo tu software",
    rows: [
      { text: "Sitios web y portafolios", tag: "web", animation: "portfolio" },
      { text: "Aplicaciones web a medida", tag: "app", animation: "browserBuild" },
      { text: "Bases de datos", tag: "db", animation: "database" },
    ] satisfies StagedRow[],
  },
  courses: {
    eyebrow: "Cursos",
    title: "Aprende conmigo",
    /** `{courses}` and `{areas}` are filled in from the areas below. */
    summary: "{courses} cursos en {areas} áreas",
    areas: [
      {
        text: "Lógica de programación",
        detail: "Scratch · Python",
        courseKeys: ["Scratch", "BasicsPython"],
        tag: "lógica",
        animation: "blockStack",
      },
      {
        text: "Desarrollo web",
        detail: "HTML · React · Next.js · Express",
        courseKeys: ["FrontI", "FrontII", "FrontIII", "BackExpress", "BackNext"],
        tag: "web",
        animation: "livePreview",
      },
      {
        text: "Bases de datos y análisis",
        detail: "PostgreSQL · Matplotlib",
        courseKeys: ["Databases", "Matplotlib"],
        tag: "datos",
        animation: "dataChart",
      },
      {
        text: "Internet de las cosas",
        detail: "Arduino · ESP8266",
        courseKeys: ["IoTArduino", "IoTESP8266"],
        tag: "iot",
        animation: "iot",
      },
    ] satisfies CourseArea[],
  },
  closing: {
    title: "¿Empezamos?",
    pill: "Cotiza tu proyecto · Inscríbete a un curso",
    url: "carlosarevalo.dev",
  },
};
