import type { CalculateMetadataFunction } from "remotion";

import { SceneSeries, seriesDuration } from "../components/SceneSeries";
import type { Locale } from "../i18n";
import { BlocksScene } from "./scenes/BlocksScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { CodeScene } from "./scenes/CodeScene";
import { MotivationsScene, motivationsFrames } from "./scenes/MotivationsScene";
import { OutcomesScene, outcomesFrames } from "./scenes/OutcomesScene";
import { TitleScene } from "./scenes/TitleScene";
import { WebScene, webTiming } from "./scenes/WebScene";
import { resolveTrailerData, type TrailerData } from "./trailer-data";

export type CourseTrailerProps = {
  courseKey: string;
  locale: Locale;
};

/** Typed Python, a Scratch script, or HTML/CSS/JS with a live preview. */
function CodeDemoScene({ data }: { data: TrailerData }) {
  const { code } = data;
  if (code.kind === "blocks") return <BlocksScene data={data} program={code.program} />;
  if (code.kind === "web") return <WebScene data={data} files={code.files} preview={code.preview} />;
  return <CodeScene data={data} code={code} />;
}

/** Blocks and web demos need longer: the sprite walks, the page gets clicked. */
function codeFrames({ code }: TrailerData) {
  if (code.kind === "blocks") return 200;
  if (code.kind === "web") return webTiming(code.files).frames;
  return 175;
}

/**
 * Scenes in playback order. Reading scenes size themselves from how many
 * items the course has; the rest are fixed (frames at 30 fps).
 */
const SCENES: {
  frames: number | ((data: TrailerData) => number);
  Scene: React.FC<{ data: TrailerData }>;
}[] = [
  { frames: 105, Scene: TitleScene },
  { frames: codeFrames, Scene: CodeDemoScene },
  { frames: motivationsFrames, Scene: MotivationsScene },
  { frames: outcomesFrames, Scene: OutcomesScene },
  { frames: 110, Scene: ClosingScene },
];

function sceneFrames(data: TrailerData) {
  return SCENES.map(({ frames }) => (typeof frames === "number" ? frames : frames(data)));
}

export const calculateTrailerMetadata: CalculateMetadataFunction<CourseTrailerProps> = ({ props }) => ({
  durationInFrames: seriesDuration(sceneFrames(resolveTrailerData(props.courseKey, props.locale))),
});

export function CourseTrailer({ courseKey, locale }: CourseTrailerProps) {
  const data = resolveTrailerData(courseKey, locale);
  const frames = sceneFrames(data);
  return (
    <SceneSeries scenes={SCENES.map(({ Scene }, i) => ({ frames: frames[i], content: <Scene data={data} /> }))} />
  );
}
