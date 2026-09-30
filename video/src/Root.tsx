import { Composition } from "remotion";

import {
  CourseTrailer,
  calculateTrailerMetadata,
  type CourseTrailerProps,
} from "./course-trailer/CourseTrailer";

/** Every trailer, each rendered in both formats. */
const TRAILERS: { id: string; props: CourseTrailerProps }[] = [
  { id: "PythonTrailer", props: { courseKey: "BasicsPython", locale: "es" } },
  { id: "ScratchTrailer", props: { courseKey: "Scratch", locale: "es" } },
];

const FORMATS = [
  { suffix: "Landscape", width: 1920, height: 1080 },
  { suffix: "Portrait", width: 1080, height: 1920 },
];

// durationInFrames is a placeholder: calculateMetadata sizes each trailer
// from its course's item counts.
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
    </>
  );
}
