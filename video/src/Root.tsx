import { Composition } from "remotion";

import {
  CourseTrailer,
  calculateTrailerMetadata,
  type CourseTrailerProps,
} from "./course-trailer/CourseTrailer";
import { ProcessExplainer, explainerDuration } from "./process-explainer/ProcessExplainer";
import { SocialTrailer, calculateSocialMetadata } from "./social-trailer/SocialTrailer";

/** Every trailer, each rendered in both formats. */
const TRAILERS: { id: string; props: CourseTrailerProps }[] = [
  { id: "PythonTrailer", props: { courseKey: "BasicsPython", locale: "es" } },
  { id: "ScratchTrailer", props: { courseKey: "Scratch", locale: "es" } },
  { id: "FrontITrailer", props: { courseKey: "FrontI", locale: "es" } },
];

/** The /development page's process explainer, per locale. */
const EXPLAINERS = [{ id: "DevelopmentExplainer", locale: "es" as const }];

const FORMATS = [
  { suffix: "Landscape", width: 1920, height: 1080 },
  { suffix: "Portrait", width: 1080, height: 1920 },
];

// durationInFrames is a placeholder for trailers: calculateMetadata sizes
// each one from its course's item counts (the social trailer's loads its
// recorded clips).
export function RemotionRoot() {
  return (
    <>
      {TRAILERS.flatMap(({ id, props }) =>
        FORMATS.map(({ suffix, width, height }) => (
          <Composition
            key={`${id}${suffix}`}
            id={`${id}${suffix}`}
            component={CourseTrailer}
            durationInFrames={1}
            calculateMetadata={calculateTrailerMetadata}
            fps={30}
            width={width}
            height={height}
            defaultProps={props}
          />
        ))
      )}
      {EXPLAINERS.flatMap(({ id, locale }) =>
        FORMATS.map(({ suffix, width, height }) => (
          <Composition
            key={`${id}${suffix}`}
            id={`${id}${suffix}`}
            component={ProcessExplainer}
            durationInFrames={explainerDuration(locale)}
            fps={30}
            width={width}
            height={height}
            defaultProps={{ locale }}
          />
        ))
      )}
      {FORMATS.map(({ suffix, width, height }) => (
        <Composition
          key={`SocialTrailer${suffix}`}
          id={`SocialTrailer${suffix}`}
          component={SocialTrailer}
          durationInFrames={1}
          calculateMetadata={calculateSocialMetadata}
          fps={30}
          width={width}
          height={height}
          defaultProps={{ recording: null }}
        />
      ))}
    </>
  );
}
