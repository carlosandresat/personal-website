import { Img, staticFile } from "remotion";

import { PulsePill, SceneFrame, TypedUrl } from "../../components/primitives";
import { rise, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import { CLOSING } from "../pacing";
import { SOCIAL_COPY } from "../social-copy";

/** The logo, an invitation to both offers, and the URL typed out. */
export function ClosingScene() {
  const { portrait } = useLayout();
  const { title, pill, url } = SOCIAL_COPY.closing;
  const logo = useEnter(CLOSING.logoAt, 14);
  const heading = useEnter(CLOSING.titleAt);

  return (
    <SceneFrame style={{ alignItems: "center", textAlign: "center", gap: 44 }}>
      <Img
        src={staticFile("logo.png")}
        style={{
          width: portrait ? 180 : 160,
          opacity: logo,
          transform: `scale(${0.6 + 0.4 * logo})`,
          filter: `drop-shadow(0 0 40px ${color.brand(0.4)})`,
        }}
      />
      <h1
        style={{
          margin: 0,
          fontSize: portrait ? 120 : 124,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.02,
          ...rise(heading, 40),
        }}
      >
        {title}
      </h1>
      <PulsePill delay={CLOSING.pillAt}>
        <span style={{ maxWidth: portrait ? 760 : undefined, lineHeight: 1.35 }}>{pill}</span>
      </PulsePill>
      <TypedUrl url={url} start={CLOSING.urlAt} fontSize={portrait ? 46 : 52} />
    </SceneFrame>
  );
}
