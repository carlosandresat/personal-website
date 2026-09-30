import { useCurrentFrame, useVideoConfig } from "remotion";

import { Eyebrow, RevealWords, SceneFrame } from "../../components/primitives";
import { enterAt, rise, sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import type { ExplainerData } from "../explainer-data";
import { PhaseRail } from "../PhaseRail";

const RAIL_FROM = 44;
const RAIL_STAGGER = 6;

/** The title, then the five phases lining up: the map of what's coming. */
export function IntroScene({ data }: { data: ExplainerData }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = useLayout();
  const rule = useEnter(28);
  const intro = useEnter(32);

  const nodes = data.phases.map((_, i) => ({
    enter: enterAt(frame, fps, RAIL_FROM + i * RAIL_STAGGER, 14),
    active: 0,
    done: 0,
  }));

  return (
    <SceneFrame style={{ gap: portrait ? 110 : 96 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <Eyebrow size={28}>{sliceChars(data.eyebrow, typedCount(frame, 4, 1.5))}</Eyebrow>
        <h1
          style={{
            margin: 0,
            fontSize: portrait ? 100 : 108,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
          }}
        >
          <RevealWords text={data.title} delay={10} />
        </h1>
        <span
          style={{
            width: 180,
            height: 4,
            background: color.brand(),
            transform: `scaleX(${rule})`,
            transformOrigin: "left",
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: portrait ? 42 : 40,
            fontWeight: 500,
            lineHeight: 1.3,
            textWrap: "balance",
            color: color.mutedForeground(),
            ...rise(intro, 24),
          }}
        >
          {data.labels.intro}
        </p>
      </div>
      <PhaseRail titles={data.phases.map((p) => p.title)} nodes={nodes} fill={nodes.slice(1).map(() => 0)} />
    </SceneFrame>
  );
}
