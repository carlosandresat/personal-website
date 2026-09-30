import type { Locale } from "../i18n";
import type { PixelAnimationId } from "../pixel/animations";

/**
 * The five phases in order, as keyed under `Development` in the message
 * files (mirrors PHASES in src/app/[locale]/development/page.tsx), and the
 * stage animation that tells each one.
 */
export const PHASES = [
  { code: "requirements", animation: "kickoff" },
  { code: "planning", animation: "blueprint" },
  { code: "development", animation: "build" },
  { code: "deployment", animation: "launch" },
  { code: "maintenance", animation: "upkeep" },
] as const satisfies readonly { code: string; animation: PixelAnimationId }[];

/** Video-only copy: headings and tags with no home on the site. */
export type ExplainerLabels = {
  intro: string;
  phase: string;
  client: string;
  developer: string;
  closingHeading: string;
  closingPill: string;
};

export const EXPLAINER_LABELS: Record<Locale, ExplainerLabels> = {
  es: {
    intro: "De tu idea a una aplicación en línea, en cinco fases.",
    phase: "Fase",
    client: "Tú",
    developer: "Yo",
    closingHeading: "¿Empezamos tu proyecto?",
    closingPill: "Escríbeme y conversemos",
  },
  en: {
    intro: "From your idea to a live application, in five phases.",
    phase: "Phase",
    client: "You",
    developer: "Me",
    closingHeading: "Shall we start your project?",
    closingPill: "Write to me and let's talk",
  },
};
