import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

import { Eyebrow, RevealWords, SceneFrame, SubLabel } from "../../components/primitives";
import { sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import { HOOK } from "../pacing";
import { SOCIAL_COPY } from "../social-copy";

/** A brand scanline that sweeps down once as the screen "boots". */
function BootSweep() {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" });
  if (t >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: `${t * 100}%`,
        height: 3,
        background: color.brand(),
        boxShadow: `0 0 40px 12px ${color.brand(0.35)}`,
        opacity: 1 - t * 0.6,
      }}
    />
  );
}

/** The announcement: the site has a new look, and what it offers. */
export function HookScene() {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const { eyebrow, title, labels } = SOCIAL_COPY.hook;
  const logo = useEnter(2, 14);
  const rule = useEnter(HOOK.titleAt + 16);

  return (
    <>
      <SceneFrame style={{ gap: 40 }}>
        <Img
          src={staticFile("logo.png")}
          style={{
            width: portrait ? 132 : 112,
            opacity: logo,
            transform: `scale(${0.6 + 0.4 * logo})`,
            filter: `drop-shadow(0 0 36px ${color.brand(0.35)})`,
          }}
        />
        <Eyebrow size={30}>{sliceChars(eyebrow, typedCount(frame, HOOK.eyebrowAt, HOOK.eyebrowCharsPerFrame))}</Eyebrow>
        <h1
          style={{
            margin: 0,
            fontSize: portrait ? 118 : 128,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
          }}
        >
          <RevealWords text={title} delay={HOOK.titleAt} stagger={HOOK.titleStagger} />
        </h1>
        <span
          style={{
            width: 200,
            height: 4,
            background: color.brand(),
            transform: `scaleX(${rule})`,
            transformOrigin: "left",
          }}
        />
        <div style={{ display: "flex", flexDirection: portrait ? "column" : "row", gap: portrait ? 18 : 48 }}>
          {labels.map((label, i) => (
            <SubLabel key={label} delay={HOOK.subAt + i * 6}>
              {label}
            </SubLabel>
          ))}
        </div>
      </SceneFrame>
      <BootSweep />
    </>
  );
}
