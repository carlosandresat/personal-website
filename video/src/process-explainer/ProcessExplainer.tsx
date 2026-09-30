import { SceneSeries, seriesDuration } from "../components/SceneSeries";
import type { Locale } from "../i18n";
import { resolveExplainerData, type ExplainerData } from "./explainer-data";
import { CLOSING_FRAMES, INTRO_FRAMES } from "./pacing";
import { ClosingScene } from "./scenes/ClosingScene";
import { IntroScene } from "./scenes/IntroScene";
import { PhasesScene, explainerPhasesFrames } from "./scenes/PhasesScene";

export type ProcessExplainerProps = { locale: Locale };

/** Scenes in playback order (frames at 30 fps). */
const SCENES: {
  frames: number | ((data: ExplainerData) => number);
  Scene: React.FC<{ data: ExplainerData }>;
}[] = [
  { frames: INTRO_FRAMES, Scene: IntroScene },
  { frames: explainerPhasesFrames, Scene: PhasesScene },
  { frames: CLOSING_FRAMES, Scene: ClosingScene },
];

function sceneFrames(data: ExplainerData) {
  return SCENES.map(({ frames }) => (typeof frames === "number" ? frames : frames(data)));
}

export function explainerDuration(locale: Locale) {
  return seriesDuration(sceneFrames(resolveExplainerData(locale)));
}

/**
 * The /development page's explainer: the five phases of a project, what the
 * client and the developer each do in them, told with the course trailers'
 * pixel-art stage.
 */
export function ProcessExplainer({ locale }: ProcessExplainerProps) {
  const data = resolveExplainerData(locale);
  const frames = sceneFrames(data);
  return (
    <SceneSeries scenes={SCENES.map(({ Scene }, i) => ({ frames: frames[i], content: <Scene data={data} /> }))} />
  );
}
