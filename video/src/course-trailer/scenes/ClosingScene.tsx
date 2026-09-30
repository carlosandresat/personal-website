import { Img, staticFile, useCurrentFrame } from "remotion";

import { Eyebrow, SceneFrame } from "../../components/primitives";
import { mono } from "../../fonts";
import { rise, sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import type { TrailerData } from "../trailer-data";

export function ClosingScene({ data }: { data: TrailerData }) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();

  const logo = useEnter(0, 14);
  const eyebrow = useEnter(6);
  const title = useEnter(10);
  const pill = useEnter(24, 12);
  const urlStart = 34;
  const urlTyped = typedCount(frame, urlStart, 1.4);
  const caretOn = Math.floor(frame / 15) % 2 === 0;
  const dot = 0.45 + 0.55 * Math.abs(Math.sin(frame / 9));

  return (
    <SceneFrame style={{ alignItems: "center", textAlign: "center", gap: 40 }}>
      <Img
        src={staticFile(data.image)}
        style={{
          width: 150,
          opacity: logo,
          transform: `scale(${0.6 + 0.4 * logo})`,
          filter: `drop-shadow(0 0 36px ${color.brand(0.35)})`,
        }}
      />
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
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "16px 30px",
          borderRadius: 999,
          border: `1px solid ${color.brand(0.45)}`,
          background: color.brand(0.1),
          fontFamily: mono,
          fontSize: 26,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: color.brand(),
          opacity: pill,
          transform: `scale(${0.8 + 0.2 * pill})`,
        }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: color.brand(),
            opacity: dot,
            boxShadow: `0 0 14px ${color.brand(0.8)}`,
          }}
        />
        {data.enrolling}
      </span>
      <span
        style={{
          fontFamily: mono,
          fontSize: portrait ? 32 : 36,
          color: color.foreground(),
          whiteSpace: "pre",
          opacity: frame >= urlStart ? 1 : 0,
        }}
      >
        {sliceChars(data.url, urlTyped)}
        <span
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1.1em",
            marginLeft: 3,
            verticalAlign: "text-bottom",
            background: color.brand(),
            opacity: caretOn ? 1 : 0,
          }}
        />
      </span>
    </SceneFrame>
  );
}
