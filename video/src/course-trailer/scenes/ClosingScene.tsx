import { Img, staticFile } from "remotion";

import { Eyebrow, PulsePill, SceneFrame, TypedUrl } from "../../components/primitives";
import { rise, useEnter, useLayout } from "../../lib/motion";
import { MascotArt } from "../../pixel/mascot";
import { color } from "../../theme";
import type { TrailerData } from "../trailer-data";

export function ClosingScene({ data }: { data: TrailerData }) {
  const { portrait } = useLayout();

  const logo = useEnter(0, 14);
  const eyebrow = useEnter(6);
  const title = useEnter(10);

  return (
    <SceneFrame style={{ alignItems: "center", textAlign: "center", gap: 40 }}>
      {data.image ? (
        <Img
          src={staticFile(data.image)}
          style={{
            width: 150,
            opacity: logo,
            transform: `scale(${0.6 + 0.4 * logo})`,
            filter: `drop-shadow(0 0 36px ${color.brand(0.35)})`,
          }}
        />
      ) : (
        <div style={{ opacity: logo, transform: `scale(${0.6 + 0.4 * logo})` }}>
          <MascotArt size={120} />
        </div>
      )}
      <div style={rise(eyebrow, 20)}>
        <Eyebrow size={28}>{data.track}</Eyebrow>
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
        {data.title}
      </h1>
      <PulsePill delay={24}>{data.enrolling}</PulsePill>
      <TypedUrl
        url={data.url}
        start={34}
        // Long course slugs would touch the edges on portrait.
        fontSize={portrait ? (data.url.length > 40 ? 28 : 32) : 36}
      />
    </SceneFrame>
  );
}
