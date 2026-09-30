import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { RevealRow, StageLayout } from "../../components/ListWithStage";
import { RevealWords, SceneFrame, SubLabel } from "../../components/primitives";
import { pad2 } from "../../course-trailer/pacing";
import { enterAt, rise, useEnter, useLayout } from "../../lib/motion";
import { progress } from "../../pixel/draw";
import { Stage, type StageCue } from "../../pixel/Stage";
import { color } from "../../theme";
import type { ExplainerData, ExplainerPhase } from "../explainer-data";
import {
  CLIENT_AT,
  DEVELOPER_AT,
  PAGE_SWAP_FRAMES,
  PHASE_FRAMES,
  SUMMARY_AT,
  phaseStart,
  phasesFrames,
} from "../pacing";
import { PhaseRail } from "../PhaseRail";

export function explainerPhasesFrames(data: ExplainerData) {
  return phasesFrames(data.phases.length);
}

/** One phase's copy: its title and summary, then who does what. */
function PhaseCopy({
  phase,
  index,
  count,
  data,
}: {
  phase: ExplainerPhase;
  index: number;
  count: number;
  data: ExplainerData;
}) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const start = phaseStart(index);
  const summary = useEnter(start + SUMMARY_AT);
  const last = index === count - 1;
  const end = start + PHASE_FRAMES;
  const fadeOut = last
    ? 1
    : interpolate(frame, [end - PAGE_SWAP_FRAMES, end], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

  // Phases not yet due are laid out but invisible (their entrances haven't
  // started), so the tallest one sizes the cell from frame 0.
  return (
    <div
      style={{
        gridArea: "1 / 1",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        opacity: fadeOut,
      }}
    >
      <SubLabel delay={start}>
        {data.labels.phase} {pad2(index + 1)} / {pad2(count)}
      </SubLabel>
      <RevealWords
        text={phase.title}
        delay={start + 2}
        style={{ fontSize: portrait ? 84 : 76, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}
      />
      <p
        style={{
          margin: 0,
          marginBottom: 12,
          fontSize: portrait ? 42 : 38,
          fontWeight: 500,
          lineHeight: 1.28,
          color: color.foreground(0.92),
          ...rise(summary, 20),
        }}
      >
        {phase.summary}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <RevealRow marker={data.labels.client} text={phase.client} at={start + CLIENT_AT} next={start + DEVELOPER_AT} />
        <RevealRow marker={data.labels.developer} text={phase.developer} at={start + DEVELOPER_AT} next={null} />
      </div>
    </div>
  );
}

/**
 * The five phases, one after another. The rail and the stage stay put: the
 * rail's line creeps towards the next phase while the copy and the stage
 * animation tell the current one.
 */
export function PhasesScene({ data }: { data: ExplainerData }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = useLayout();
  const count = data.phases.length;

  const nodes = data.phases.map((_, i) => {
    const handOff = i < count - 1 ? enterAt(frame, fps, phaseStart(i + 1)) : 0;
    return { enter: 1, active: enterAt(frame, fps, phaseStart(i)) * (1 - handOff), done: handOff };
  });
  const fill = data.phases.slice(1).map((_, i) => progress(frame, phaseStart(i) + 20, phaseStart(i + 1)));

  const cues: StageCue[] = data.phases.map((phase, i) => ({
    animation: phase.animation,
    at: phaseStart(i),
    label: phase.title,
  }));

  return (
    <SceneFrame style={{ gap: portrait ? 64 : 60 }}>
      <PhaseRail titles={data.phases.map((p) => p.title)} nodes={nodes} fill={fill} />
      <StageLayout stage={<Stage cues={cues} delay={6} />}>
        {/* Every phase shares one cell, so the layout never jumps. */}
        <div style={{ display: "grid" }}>
          {data.phases.map((phase, i) => (
            <PhaseCopy key={phase.title} phase={phase} index={i} count={count} data={data} />
          ))}
        </div>
      </StageLayout>
    </SceneFrame>
  );
}
