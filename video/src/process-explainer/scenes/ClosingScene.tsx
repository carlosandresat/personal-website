import { useCurrentFrame, useVideoConfig } from "remotion";

import { Eyebrow, PulsePill, SceneFrame, TypedUrl } from "../../components/primitives";
import { enterAt, rise, useEnter, useLayout } from "../../lib/motion";
import type { ExplainerData } from "../explainer-data";
import { PhaseRail } from "../PhaseRail";

const CHECK_FROM = 4;
const CHECK_STAGGER = 6;

/** Every phase checks off in turn, then the invitation. */
export function ClosingScene({ data }: { data: ExplainerData }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = useLayout();
  const eyebrow = useEnter(30);
  const title = useEnter(34);

  const done = data.phases.map((_, i) => enterAt(frame, fps, CHECK_FROM + i * CHECK_STAGGER));
  const nodes = done.map((d) => ({ enter: 1, active: 0, done: d }));

  return (
    <SceneFrame style={{ alignItems: "center", textAlign: "center", gap: 44 }}>
      <div style={{ width: portrait ? "100%" : 1300, marginBottom: 20 }}>
        <PhaseRail titles={data.phases.map((p) => p.title)} nodes={nodes} fill={done.slice(1)} />
      </div>
      <div style={rise(eyebrow, 20)}>
        <Eyebrow size={28}>{data.eyebrow}</Eyebrow>
      </div>
      <h1
        style={{
          margin: 0,
          maxWidth: portrait ? 900 : 1400,
          fontSize: portrait ? 92 : 100,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.04,
          textWrap: "balance",
          ...rise(title, 40),
        }}
      >
        {data.labels.closingHeading}
      </h1>
      <PulsePill delay={48}>{data.labels.closingPill}</PulsePill>
      <TypedUrl url={data.url} start={58} fontSize={portrait ? 34 : 36} />
    </SceneFrame>
  );
}
