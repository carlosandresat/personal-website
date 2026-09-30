import { Composition } from "remotion";

import {
  CourseTrailer,
  calculateTrailerMetadata,
  type CourseTrailerProps,
} from "./course-trailer/CourseTrailer";

const PYTHON: CourseTrailerProps = { courseKey: "BasicsPython", locale: "es" };

// durationInFrames is a placeholder: calculateMetadata sizes each trailer
// from its course's item counts.
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="PythonTrailerLandscape"
        component={CourseTrailer}
        durationInFrames={1}
        calculateMetadata={calculateTrailerMetadata}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={PYTHON}
      />
      <Composition
        id="PythonTrailerPortrait"
        component={CourseTrailer}
        durationInFrames={1}
        calculateMetadata={calculateTrailerMetadata}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={PYTHON}
      />
    </>
  );
}
