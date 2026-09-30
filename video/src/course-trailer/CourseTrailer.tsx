import { fade } from "@remotion/transitions/fade";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { AbsoluteFill, type CalculateMetadataFunction } from "remotion";

import { GridBackground } from "../components/GridBackground";
import { Hud } from "../components/Hud";
import type { Locale } from "../i18n";
import { TRANSITION_FRAMES } from "./pacing";
import { BlocksScene } from "./scenes/BlocksScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { CodeScene } from "./scenes/CodeScene";
import { MotivationsScene, motivationsFrames } from "./scenes/MotivationsScene";
import { OutcomesScene, outcomesFrames } from "./scenes/OutcomesScene";
import { TitleScene } from "./scenes/TitleScene";
import { resolveTrailerData, type TrailerData } from "./trailer-data";

export type CourseTrailerProps = {
  courseKey: string;
  locale: Locale;
};

/** Typed Python, or a Scratch script snapping together, per the course. */
function CodeDemoScene({ data }: { data: TrailerData }) {
  return data.code.kind === "blocks" ? (
    <BlocksScene data={data} program={data.code.program} />
  ) : (
    <CodeScene data={data} code={data.code} />
  );
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
  // Blocks get longer: the sprite needs time to walk once the flag is hit.
  { frames: (data) => (data.code.kind === "blocks" ? 200 : 175), Scene: CodeDemoScene },
  { frames: motivationsFrames, Scene: MotivationsScene },
  { frames: outcomesFrames, Scene: OutcomesScene },
  { frames: 110, Scene: ClosingScene },
];

function sceneFrames(data: TrailerData) {
  return SCENES.map(({ frames }) => (typeof frames === "number" ? frames : frames(data)));
}

// Each transition overlaps two scenes, so it shortens the total.
function trailerDuration(data: TrailerData) {
  return sceneFrames(data).reduce((sum, n) => sum + n, 0) - TRANSITION_FRAMES * (SCENES.length - 1);
}

export const calculateTrailerMetadata: CalculateMetadataFunction<CourseTrailerProps> = ({ props }) => ({
  durationInFrames: trailerDuration(resolveTrailerData(props.courseKey, props.locale)),
});

export function CourseTrailer({ courseKey, locale }: CourseTrailerProps) {
  const data = resolveTrailerData(courseKey, locale);
  const frames = sceneFrames(data);

  // Frame each scene takes over the HUD counter (mid-transition).
  const sceneStarts = frames.map((_, i) =>
    frames
      .slice(0, i)
      .reduce((start, n) => start + n - TRANSITION_FRAMES, i === 0 ? 0 : TRANSITION_FRAMES / 2)
  );

  return (
    <AbsoluteFill>
      <GridBackground />
      <TransitionSeries>
        {SCENES.flatMap(({ Scene }, i) => [
          ...(i > 0
            ? [
                <TransitionSeries.Transition
                  key={`t${i}`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />,
              ]
            : []),
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={frames[i]}>
            <Scene data={data} />
          </TransitionSeries.Sequence>,
        ])}
      </TransitionSeries>
      <Hud sceneStarts={sceneStarts} />
    </AbsoluteFill>
  );
}
