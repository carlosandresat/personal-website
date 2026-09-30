import { fade } from "@remotion/transitions/fade";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";

import { TRANSITION_FRAMES } from "../course-trailer/pacing";
import { GridBackground } from "./GridBackground";
import { Hud } from "./Hud";

export type SeriesScene = { frames: number; content: React.ReactNode };

/** Each transition overlaps two scenes, so it shortens the total. */
export function seriesDuration(frames: number[]) {
  return frames.reduce((sum, n) => sum + n, 0) - TRANSITION_FRAMES * (frames.length - 1);
}

/**
 * Scenes cross-fading one into the next over the circuit grid, framed by the
 * HUD. Scene lengths include the overlap with the next transition.
 */
export function SceneSeries({ scenes }: { scenes: SeriesScene[] }) {
  // Frame each scene takes over the HUD counter (mid-transition).
  const sceneStarts = scenes.map((_, i) =>
    scenes
      .slice(0, i)
      .reduce((start, { frames }) => start + frames - TRANSITION_FRAMES, i === 0 ? 0 : TRANSITION_FRAMES / 2)
  );

  return (
    <AbsoluteFill>
      <GridBackground />
      <TransitionSeries>
        {scenes.flatMap(({ frames, content }, i) => [
          ...(i > 0
            ? [
                <TransitionSeries.Transition
                  key={`t${i}`}
                  presentation={fade()}
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />,
              ]
            : []),
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={frames}>
            {content}
          </TransitionSeries.Sequence>,
        ])}
      </TransitionSeries>
      <Hud sceneStarts={sceneStarts} />
    </AbsoluteFill>
  );
}
