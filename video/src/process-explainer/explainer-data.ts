import { developmentMessages, type Locale } from "../i18n";
import type { PixelAnimationId } from "../pixel/animations";
import { EXPLAINER_LABELS, PHASES, type ExplainerLabels } from "./explainer-copy";

export type ExplainerPhase = {
  title: string;
  /** What happens, in one plain sentence. */
  summary: string;
  /** What the client does, then what the developer does. */
  client: string;
  developer: string;
  animation: PixelAnimationId;
};

export type ExplainerData = {
  eyebrow: string;
  title: string;
  phases: ExplainerPhase[];
  labels: ExplainerLabels;
  url: string;
};

/**
 * Everything the explainer shows. Phase titles and briefs come from the same
 * `Development` messages that render the /development page.
 */
export function resolveExplainerData(locale: Locale): ExplainerData {
  const copy = developmentMessages(locale);

  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    phases: PHASES.map(({ code, animation }) => {
      const phase = copy[code];
      return { title: phase.title, ...phase.brief, animation };
    }),
    labels: EXPLAINER_LABELS[locale],
    // Unprefixed on purpose: the site's middleware adds the viewer's locale.
    url: "carlosarevalo.dev",
  };
}
