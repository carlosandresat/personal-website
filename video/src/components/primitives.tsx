import { AbsoluteFill } from "remotion";

import { display, mono } from "../fonts";
import { rise, useEnter, useLayout } from "../lib/motion";
import { color } from "../theme";

/** The site's bracketed mono kicker (`[ LABEL ]`). */
export function Eyebrow({
  children,
  size = 26,
  style,
}: {
  children: React.ReactNode;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: mono,
        fontSize: size,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: color.brand(),
        ...style,
      }}
    >
      [ {children} ]
    </span>
  );
}

/** Bracket ticks on a panel's corners; the parent must be positioned. */
export function CornerTicks({
  size = 22,
  corners = "all",
  tone = color.brand(0.6),
}: {
  size?: number;
  corners?: "top" | "all";
  tone?: string;
}) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderColor: tone,
    borderStyle: "solid",
    borderWidth: 0,
  };
  const edge = 2;

  return (
    <>
      <span style={{ ...base, left: -1, top: -1, borderLeftWidth: edge, borderTopWidth: edge }} />
      <span style={{ ...base, right: -1, top: -1, borderRightWidth: edge, borderTopWidth: edge }} />
      {corners === "all" ? (
        <>
          <span style={{ ...base, left: -1, bottom: -1, borderLeftWidth: edge, borderBottomWidth: edge }} />
          <span style={{ ...base, right: -1, bottom: -1, borderRightWidth: edge, borderBottomWidth: edge }} />
        </>
      ) : null}
    </>
  );
}

/** A bordered panel with a mono title bar; `children` fill the body. */
export function Window({
  title,
  label,
  delay,
  children,
  style,
}: {
  title: React.ReactNode;
  label: React.ReactNode;
  delay: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${color.border()}`,
        borderRadius: 20,
        background: color.background(0.92),
        overflow: "hidden",
        fontFamily: mono,
        ...rise(enter, 40),
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 32px",
          borderBottom: `1px solid ${color.border()}`,
          fontSize: 22,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: color.mutedForeground(),
        }}
      >
        <span>{title}</span>
        <span style={{ color: color.brand() }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

/** Mono caption with a brand square, like the title scene's meta items. */
export function SubLabel({ children, delay }: { children: React.ReactNode; delay: number }) {
  const enter = useEnter(delay);
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: mono,
        fontSize: 24,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: color.mutedForeground(),
        ...rise(enter, 16),
      }}
    >
      <span style={{ width: 9, height: 9, background: color.brand() }} />
      {children}
    </span>
  );
}

/** Each word slides up from behind its own clip line. */
function RevealWord({ children, delay }: { children: string; delay: number }) {
  const enter = useEnter(delay);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.08em" }}>
      <span style={{ display: "inline-block", transform: `translateY(${(1 - enter) * 110}%)` }}>
        {children}
      </span>
    </span>
  );
}

export function RevealWords({
  text,
  delay,
  stagger = 4,
  style,
}: {
  text: string;
  delay: number;
  stagger?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "flex", flexWrap: "wrap", columnGap: "0.24em", ...style }}>
      {text.split(" ").map((word, i) => (
        <RevealWord key={i} delay={delay + i * stagger}>
          {word}
        </RevealWord>
      ))}
    </span>
  );
}

/** Content area inside the HUD's safe margins. */
export function SceneFrame({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { padX, padTop, padBottom } = useLayout();
  return (
    <AbsoluteFill
      style={{
        padding: `${padTop}px ${padX}px ${padBottom}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: display,
        color: color.foreground(),
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

/**
 * Eyebrow + heading with a hairline that draws out to the right — the
 * video take on the site's SectionHeader/RuleHeading.
 */
export function SceneHeader({
  eyebrow,
  title,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  delay?: number;
}) {
  const { portrait } = useLayout();
  const eyebrowIn = useEnter(delay);
  const titleIn = useEnter(delay + 5);
  const rule = useEnter(delay + 12);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={rise(eyebrowIn, 20)}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <h2
          style={{
            margin: 0,
            fontSize: portrait ? 70 : 68,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            ...rise(titleIn),
          }}
        >
          {title}
        </h2>
        {portrait ? null : (
          <span
            style={{
              flex: 1,
              height: 1,
              background: color.border(),
              transform: `scaleX(${rule})`,
              transformOrigin: "left",
            }}
          />
        )}
      </div>
    </div>
  );
}
