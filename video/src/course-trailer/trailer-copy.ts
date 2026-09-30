import type { Locale } from "../i18n";
import type { PixelAnimationId } from "../pixel/animations";

/** Per-course trailer material that has no home on the site. */
export type TrailerExtras = {
  /** Typed in the code scene, per locale. Keep it under ~8 short lines. */
  code: Partial<Record<Locale, { snippet: string; output: string[] }>>;
  /** One stage animation per `Courses.<key>.motivations` entry, in order. */
  motivationAnimations: {
    central: PixelAnimationId;
    learning: PixelAnimationId[];
    course: PixelAnimationId[];
  };
  /** One stage animation per `Courses.<key>.outcomes` entry, in order. */
  outcomeAnimations: PixelAnimationId[];
};

export const TRAILER_EXTRAS: Record<string, TrailerExtras> = {
  BasicsPython: {
    code: {
      es: {
        snippet: [
          "def saludar(nombre):",
          '    return f"¡Hola, {nombre}!"',
          "",
          'alumnos = ["Ana", "Luis", "Sofía"]',
          "for alumno in alumnos:",
          "    print(saludar(alumno))",
        ].join("\n"),
        output: ["¡Hola, Ana!", "¡Hola, Luis!", "¡Hola, Sofía!"],
      },
    },
    motivationAnimations: {
      central: "city",
      learning: ["ages", "sprout", "maze", "door"],
      course: ["live", "bricks", "diploma"],
    },
    outcomeAnimations: ["conveyor", "files", "snake", "bug"],
  },
};

/** Trailer-only labels. Course copy itself comes from messages/*.json. */
export const TRAILER_LABELS: Record<
  Locale,
  {
    codeEyebrow: string;
    codeHeading: string;
    motivationsEyebrow: string;
    motivationsHeading: string;
    centralLabel: string;
    learningLabel: string;
    courseLabel: string;
    outcomesEyebrow: string;
    outcomesHeading: string;
  }
> = {
  es: {
    codeEyebrow: "Desde la primera clase",
    codeHeading: "Escribe tu primer programa",
    motivationsEyebrow: "Motivaciones",
    motivationsHeading: "Empieza hoy porque…",
    centralLabel: "La idea central",
    learningLabel: "Sobre programar",
    courseLabel: "Sobre el curso",
    outcomesEyebrow: "Después del curso",
    outcomesHeading: "Al terminar podrás…",
  },
  en: {
    codeEyebrow: "From the very first class",
    codeHeading: "Write your first program",
    motivationsEyebrow: "Motivation",
    motivationsHeading: "Start today because…",
    centralLabel: "The big idea",
    learningLabel: "About coding",
    courseLabel: "About the course",
    outcomesEyebrow: "After the course",
    outcomesHeading: "When you finish, you'll be able to…",
  },
};
