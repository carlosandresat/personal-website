import { Img, staticFile, useCurrentFrame } from "remotion";

import { CornerTicks, Eyebrow, RevealWords, SceneFrame, SubLabel } from "../../components/primitives";
import { sliceChars, typedCount, useEnter, useLayout } from "../../lib/motion";
import { color } from "../../theme";
import type { TrailerData } from "../trailer-data";

export function LogoPanel({
  src,
  size,
  delay,
}: {
  src: string;
  size: number;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const enter = useEnter(delay, 16);
  const glow = 0.16 + 0.06 * Math.sin(frame / 12);

  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${color.border()}`,
        borderRadius: 28,
        background: `radial-gradient(circle at center, ${color.brand(glow)}, ${color.background(0.92)} 68%)`,
        opacity: enter,
        transform: `scale(${0.85 + 0.15 * enter})`,
      }}
    >
      <CornerTicks size={30} />
      <Img
        src={staticFile(src)}
        style={{
          width: size * 0.5,
          transform: `translateY(${Math.sin(frame / 20) * 6}px)`,
          filter: `drop-shadow(0 12px 40px ${color.brand(0.25)})`,
        }}
      />
    </div>
  );
}

function MetaRow({ items, delay }: { items: string[]; delay: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 40px" }}>
      {items.map((item, i) => (
        <SubLabel key={item} delay={delay + i * 5}>
          {item}
        </SubLabel>
      ))}
    </div>
  );
}

export function TitleScene({ data }: { data: TrailerData }) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const rule = useEnter(30);

  const text = (
    <div style={{ display: "flex", flexDirection: "column", gap: 34, flex: portrait ? undefined : 1 }}>
      <Eyebrow size={28}>{sliceChars(data.track, typedCount(frame, 4, 1.5))}</Eyebrow>
      <h1
        style={{
          margin: 0,
          fontSize: portrait ? 104 : 108,
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
      <MetaRow items={data.meta} delay={36} />
    </div>
  );

  return (
    <SceneFrame
      style={{
        flexDirection: portrait ? "column" : "row",
        alignItems: portrait ? "flex-start" : "center",
        justifyContent: portrait ? "center" : "space-between",
        gap: portrait ? 72 : 100,
      }}
    >
      {portrait ? (
        <>
          <LogoPanel src={data.image} size={420} delay={4} />
          {text}
        </>
      ) : (
        <>
          {text}
          <LogoPanel src={data.image} size={440} delay={6} />
        </>
      )}
    </SceneFrame>
  );
}
