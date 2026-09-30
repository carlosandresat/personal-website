import { RevealList, StageLayout } from "../../components/ListWithStage";
import { SceneFrame, SceneHeader } from "../../components/primitives";
import { Stage } from "../../pixel/Stage";
import { ITEM_FRAMES, TRANSITION_FRAMES, listFrames, pad2 } from "../pacing";
import type { TrailerData } from "../trailer-data";

const START = 16;

export function outcomesFrames(data: TrailerData) {
  return START + listFrames(data.outcomes.length) + TRANSITION_FRAMES;
}

export function OutcomesScene({ data }: { data: TrailerData }) {
  const count = data.outcomes.length;
  const cues = data.outcomes.map((item, i) => ({
    animation: item.animation,
    at: START + i * ITEM_FRAMES,
    label: `${pad2(i + 1)} / ${pad2(count)}`,
  }));

  return (
    <SceneFrame style={{ gap: 52 }}>
      <SceneHeader eyebrow={data.labels.outcomesEyebrow} title={data.labels.outcomesHeading} />
      <StageLayout stage={<Stage cues={cues} delay={8} />}>
        <RevealList items={data.outcomes.map((item) => item.text)} start={START} />
      </StageLayout>
    </SceneFrame>
  );
}
