import { useCurrentFrame } from "remotion";

import { SceneFrame, SceneHeader, Window } from "../../components/primitives";
import { display } from "../../fonts";
import { useEnter, useLayout } from "../../lib/motion";
import { Stage } from "../../pixel/Stage";
import type { ScratchBlock, ScratchCategory } from "../trailer-copy";
import type { TrailerData } from "../trailer-data";

// Scratch 3's block colours: the one thing on screen not in brand green,
// because recognising "that's Scratch" at a glance is the point.
const CATEGORY: Record<ScratchCategory, { fill: string; edge: string }> = {
  events: { fill: "#FFBF00", edge: "#CC9900" },
  control: { fill: "#FFAB19", edge: "#CF8B17" },
  motion: { fill: "#4C97FF", edge: "#3373CC" },
  looks: { fill: "#9966FF", edge: "#774DCB" },
};

const FIRST_BLOCK = 20;
const BLOCK_EVERY = 14;
const ARM = 28;

function countBlocks(blocks: ScratchBlock[]): number {
  return blocks.reduce((n, b) => n + 1 + countBlocks(b.children ?? []), 0);
}

function GreenFlag({ size = "1em" }: { size?: string }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} style={{ display: "block" }}>
      <path d="M3 1.5v13" stroke="#45993D" strokeWidth={2} strokeLinecap="round" />
      <path d="M3.5 2.5c3-1.8 5.5 1.5 9.5-.5v7c-4 2-6.5-1.3-9.5.5z" fill="#4CBF56" stroke="#45993D" strokeWidth={1} />
    </svg>
  );
}

/** Block text with `{flag}` and `{number}` tokens turned into their widgets. */
function BlockLabel({ text, flagPulse }: { text: string; flagPulse: number }) {
  return (
    <>
      {text.split(/(\{[^}]+\})/).filter(Boolean).map((part, i) => {
        const token = part.match(/^\{(.+)\}$/)?.[1];
        if (token === "flag") {
          return (
            <span key={i} style={{ display: "inline-block", transform: `scale(${1 + 0.35 * flagPulse})` }}>
              <GreenFlag size="1.1em" />
            </span>
          );
        }
        if (token) {
          return (
            <span
              key={i}
              style={{
                padding: "2px 16px",
                borderRadius: 999,
                background: "#FFFFFF",
                color: "#575E75",
                fontSize: "0.9em",
              }}
            >
              {token}
            </span>
          );
        }
        return <span key={i}>{part.trim()}</span>;
      })}
    </>
  );
}

function blockBar(category: ScratchCategory): React.CSSProperties {
  const { fill, edge } = CATEGORY[category];
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 22px",
    minHeight: 60,
    background: fill,
    border: `2px solid ${edge}`,
    borderRadius: 8,
    color: "#FFFFFF",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };
}

/** The tab under a block that the next block locks onto. */
function Tab({ category }: { category: ScratchCategory }) {
  const { fill, edge } = CATEGORY[category];
  return (
    <span
      style={{
        position: "absolute",
        left: 22,
        bottom: -10,
        width: 32,
        height: 10,
        background: fill,
        border: `2px solid ${edge}`,
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        zIndex: 1,
      }}
    />
  );
}

function SnapIn({ at, children }: { at: number; children: React.ReactNode }) {
  const enter = useEnter(at, 12);
  return (
    <div
      style={{
        opacity: Math.min(1, enter * 1.5),
        transform: `translate(${(1 - enter) * 80}px, ${(1 - enter) * -30}px)`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Renders a script, numbering blocks depth-first to stagger their entrance.
 * A plain function, not a component, so a C block's children are numbered
 * before the blocks after it.
 */
function renderScript(blocks: ScratchBlock[], counter: { n: number }, flagPulse: number) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      {blocks.map((block, i) => {
        const at = FIRST_BLOCK + counter.n++ * BLOCK_EVERY;
        const { fill, edge } = CATEGORY[block.category];
        const isHat = block.category === "events" && i === 0;

        if (block.children) {
          return (
            <SnapIn key={i} at={at}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{ ...blockBar(block.category), borderBottomLeftRadius: 0 }}>
                  <BlockLabel text={block.text} flagPulse={flagPulse} />
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: ARM,
                      background: fill,
                      borderLeft: `2px solid ${edge}`,
                      borderRight: `2px solid ${edge}`,
                    }}
                  />
                  <div style={{ padding: "0 0 10px" }}>
                    {renderScript(block.children, counter, flagPulse)}
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    width: 220,
                    height: 30,
                    background: fill,
                    border: `2px solid ${edge}`,
                    borderRadius: "0 8px 8px 8px",
                  }}
                >
                  <Tab category={block.category} />
                </div>
              </div>
            </SnapIn>
          );
        }

        return (
          <SnapIn key={i} at={at}>
            <div
              style={{
                ...blockBar(block.category),
                ...(isHat ? { borderTopLeftRadius: 44, borderTopRightRadius: 14, paddingTop: 24 } : {}),
              }}
            >
              <BlockLabel text={block.text} flagPulse={flagPulse} />
              <Tab category={block.category} />
            </div>
          </SnapIn>
        );
      })}
    </div>
  );
}

export function BlocksScene({
  data,
  program,
}: {
  data: TrailerData;
  program: ScratchBlock[];
}) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();

  const runAt = FIRST_BLOCK + countBlocks(program) * BLOCK_EVERY + 16;
  const pulse = frame >= runAt && frame < runAt + 10 ? Math.sin((Math.PI * (frame - runAt)) / 10) : 0;
  const running = frame >= runAt;
  const glow = 0.55 + 0.35 * Math.sin(frame / 5);

  const cues = [
    { animation: "spriteStand" as const, at: 0, label: data.labels.stageWindow },
    { animation: "spriteWalk" as const, at: runAt, label: data.labels.stageWindow },
  ];

  return (
    <SceneFrame style={{ gap: 52 }}>
      <SceneHeader eyebrow={data.labels.codeEyebrow} title={data.labels.codeHeading} />
      <div
        style={{
          display: "flex",
          flexDirection: portrait ? "column" : "row",
          alignItems: portrait ? "stretch" : "center",
          gap: portrait ? 36 : 48,
        }}
      >
        <Window
          title={data.labels.blocksWindow}
          label={<GreenFlag size="26px" />}
          delay={8}
          style={{ flex: portrait ? undefined : 1 }}
        >
          <div
            style={{
              padding: "36px 40px 44px",
              minHeight: portrait ? 460 : 480,
              fontFamily: display,
              fontSize: portrait ? 40 : 38,
              // Scratch outlines a running script in yellow.
              filter: running ? `drop-shadow(0 0 8px rgba(255, 213, 0, ${glow}))` : undefined,
            }}
          >
            {renderScript(program, { n: 0 }, pulse)}
          </div>
        </Window>
        <div style={{ alignSelf: "center" }}>
          <Stage cues={cues} delay={14} />
        </div>
      </div>
    </SceneFrame>
  );
}
