import type { Language } from "../lib/syntax";
import type { PixelAnimationId } from "../pixel/animations";

/**
 * A piece is a list of scenes. Each scene has `say`, the line Carlos records
 * for it (one audio file per scene); it becomes the subtitles too. Wrap words
 * in *asterisks* to colour them in the subtitles and on screen.
 *
 * `at` values are fractions of the scene (0–1), to sync a step with the
 * voice by hand; without them, steps are spread evenly.
 */
export type Piece = {
  /** Folder under public/redes/ and the composition id (Redes-<slug>). */
  slug: string;
  scenes: Scene[];
};

type Base = {
  say?: string;
  /** Title over the visual, for every kind except hook and outro. */
  title?: string;
  /** Extra seconds after the voice, for the animation to breathe. */
  hold?: number;
};

export type HookScene = Base & { kind: "hook"; kicker?: string; headline: string };

export type PointsScene = Base & { kind: "points"; points: { text: string; at?: number }[] };

export type Curve = {
  fn: (x: number) => number;
  label?: string;
  /** Where along x the label sits (default: the end of the curve). */
  labelX?: number;
  tone?: "accent" | "amber" | "fg";
  at?: number;
};
export type Mark = { x: number; y: number; label?: string; guides?: boolean; at?: number };
export type PlotScene = Base & {
  kind: "plot";
  x: [number, number];
  y: [number, number];
  xTicks?: number[];
  yTicks?: number[];
  xLabel?: string;
  yLabel?: string;
  curves: Curve[];
  marks?: Mark[];
};

export type GraphNode = {
  id: string;
  label: string;
  sub?: string;
  /** Centre, as a fraction of the content box. */
  x: number;
  y: number;
  accent?: boolean;
  at?: number;
};
export type GraphEdge = { from: string; to: string; label?: string; dashed?: boolean; at?: number };
export type GraphScene = Base & {
  kind: "graph";
  nodes: GraphNode[];
  edges: GraphEdge[];
  /** Node ids a dot travels through, after everything is drawn. */
  packet?: string[];
};

export type ArrayStep = {
  /** Cells still in play (inclusive); the rest fade out. */
  range?: [number, number];
  /** The cell being looked at. */
  focus?: number;
  /** Replaces the values from this step on (e.g. a swap while sorting). */
  values?: (number | string)[];
  found?: boolean;
  note?: string;
  at?: number;
};
export type ArrayScene = Base & { kind: "array"; values: (number | string)[]; steps: ArrayStep[] };

export type CodeScene = Base & {
  kind: "code";
  lang: Language;
  code: string;
  /** 1-based lines lit up once the code is typed. */
  highlight?: number[];
};

export type PixelScene = Base & { kind: "pixel"; animation: PixelAnimationId; label: string };

/**
 * The fixed close: "Ahora que ya sabes X, podrás Y. Tarea para la casa: …"
 * in the voice (`say`), the homework on screen, then the tagline and handle.
 */
export type OutroScene = Base & {
  kind: "outro";
  /** Soft for teaching pieces, strong (WhatsApp) for "Trabaja conmigo". */
  cta: "suave" | "fuerte";
  /** Homework shown on screen; usually doable, now and then absurd as a joke. */
  tarea?: string;
};

export type Scene =
  | HookScene
  | PointsScene
  | PlotScene
  | GraphScene
  | ArrayScene
  | CodeScene
  | PixelScene
  | OutroScene;
