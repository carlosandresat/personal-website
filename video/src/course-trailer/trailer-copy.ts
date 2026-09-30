import type { Locale } from "../i18n";
import type { PixelAnimationId } from "../pixel/animations";

export type ScratchCategory = "events" | "control" | "motion" | "looks";

/**
 * A Scratch-style block. In `text`, `{flag}` renders the green flag and a
 * `{number}` renders a number input. `children` makes it a C block.
 */
export type ScratchBlock = {
  category: ScratchCategory;
  text: string;
  children?: ScratchBlock[];
};

/** What the code scene shows: typed Python, or a Scratch script snapping together. */
export type CodeDemo =
  | { kind: "python"; snippet: string; output: string[] }
  | { kind: "blocks"; program: ScratchBlock[] };

export type TrailerLabels = {
  codeEyebrow: string;
  codeHeading: string;
  blocksWindow: string;
  stageWindow: string;
  motivationsEyebrow: string;
  motivationsHeading: string;
  centralLabel: string;
  learningLabel: string;
  courseLabel: string;
  outcomesEyebrow: string;
  outcomesHeading: string;
};

/** Per-course trailer material that has no home on the site. */
export type TrailerExtras = {
  /** The code scene, per locale. Python snippets: keep under ~8 short lines. */
  code: Partial<Record<Locale, CodeDemo>>;
  /**
   * Artwork on the title and closing scenes. "mascot" swaps the course image
   * for the trailers' own pixel kid, for artwork we shouldn't use to promote
   * a paid course (the Scratch Cat is a Scratch Foundation trademark).
   */
  artwork?: "course-image" | "mascot";
  /** Overrides of TRAILER_LABELS, e.g. copy addressed to parents. */
  labels?: Partial<Record<Locale, Partial<TrailerLabels>>>;
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
        kind: "python",
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
  Scratch: {
    // Module 1's workshop: "make a sprite move". Block text as in Scratch 3's
    // Spanish interface.
    code: {
      es: {
        kind: "blocks",
        program: [
          { category: "events", text: "al hacer clic en {flag}" },
          {
            category: "control",
            text: "por siempre",
            children: [
              { category: "motion", text: "mover {10} pasos" },
              { category: "motion", text: "rebotar si toca un borde" },
              { category: "looks", text: "siguiente disfraz" },
            ],
          },
        ],
      },
    },
    artwork: "mascot",
    labels: {
      es: {
        codeHeading: "Su primer programa, bloque a bloque",
        motivationsHeading: "Inscríbelos hoy porque…",
        outcomesHeading: "Al terminar, podrán…",
      },
      en: {
        codeHeading: "Their first program, block by block",
        motivationsHeading: "Enroll them today because…",
        outcomesHeading: "When they finish, they'll be able to…",
      },
    },
    motivationAnimations: {
      central: "cityKid",
      learning: ["playToCreate", "blockStack", "maze"],
      course: ["live", "clock", "diploma"],
    },
    outcomeAnimations: ["snake", "story", "present", "bricks"],
  },
};

/** Trailer-only labels. Course copy itself comes from messages/*.json. */
export const TRAILER_LABELS: Record<Locale, TrailerLabels> = {
  es: {
    codeEyebrow: "Desde la primera clase",
    codeHeading: "Escribe tu primer programa",
    blocksWindow: "Código",
    stageWindow: "Escenario",
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
    blocksWindow: "Code",
    stageWindow: "Stage",
    motivationsEyebrow: "Motivation",
    motivationsHeading: "Start today because…",
    centralLabel: "The big idea",
    learningLabel: "About coding",
    courseLabel: "About the course",
    outcomesEyebrow: "After the course",
    outcomesHeading: "When you finish, you'll be able to…",
  },
};
