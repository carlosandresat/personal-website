import { interpolate, useCurrentFrame } from "remotion";

import { RevealList, StageLayout } from "../../components/ListWithStage";
import { RevealWords, SceneFrame, SceneHeader, SubLabel } from "../../components/primitives";
import { useEnter, useLayout } from "../../lib/motion";
import { Stage, type StageCue } from "../../pixel/Stage";
import { color } from "../../theme";
import {
  HERO_FRAMES,
  ITEM_FRAMES,
  PAGE_SWAP_FRAMES,
  TRANSITION_FRAMES,
  listFrames,
  pad2,
} from "../pacing";
import type { TrailerData } from "../trailer-data";

const HERO_START = 14;

/** When each page's first row arrives and when the page is done. */
function schedule(data: TrailerData) {
  let start = HERO_START + HERO_FRAMES + PAGE_SWAP_FRAMES;
  let numberFrom = 0;
  return data.motivations.pages.map((page) => {
    const end = start + listFrames(page.items.length);
    const scheduled = { ...page, start, end, numberFrom };
    start = end + PAGE_SWAP_FRAMES;
    numberFrom += page.items.length;
    return scheduled;
  });
}

export function motivationsFrames(data: TrailerData) {
  const pages = schedule(data);
  return pages[pages.length - 1].end + TRANSITION_FRAMES;
}

/**
 * "Start today because…": the central idea on its own, then the reasons in
 * pages that build up row by row. Header and stage stay put throughout, so
 * the beats are timed inside one scene rather than as separate sequences.
 */
export function MotivationsScene({ data }: { data: TrailerData }) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const { labels, motivations } = data;
  const pages = schedule(data);
  const total = pages.reduce((n, page) => n + page.items.length, 0);
  const rule = useEnter(HERO_START + 30);

  const fadeOut = (from: number) =>
    interpolate(frame, [from, from + PAGE_SWAP_FRAMES], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  const cues: StageCue[] = [
    { animation: motivations.central.animation, at: HERO_START, label: labels.centralLabel },
    ...pages.flatMap((page) =>
      page.items.map((item, i) => ({
        animation: item.animation,
        at: page.start + i * ITEM_FRAMES,
        label: `${pad2(page.numberFrom + i + 1)} / ${pad2(total)}`,
      }))
    ),
  ];

  const layer: React.CSSProperties = {
    gridArea: "1 / 1",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <SceneFrame style={{ gap: 52 }}>
      <SceneHeader eyebrow={labels.motivationsEyebrow} title={labels.motivationsHeading} />
      <StageLayout stage={<Stage cues={cues} delay={8} />}>
        {/* Hero and pages share one cell, so the list area never jumps. */}
        <div style={{ display: "grid" }}>
          <div style={{ ...layer, gap: 30, opacity: fadeOut(HERO_START + HERO_FRAMES) }}>
            <SubLabel delay={HERO_START}>{labels.centralLabel}</SubLabel>
            <RevealWords
              text={motivations.central.text}
              delay={HERO_START + 4}
              stagger={3}
              style={{
                fontSize: portrait ? 66 : 60,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            />
            <span
              style={{
                width: 180,
                height: 4,
                background: color.brand(),
                transform: `scaleX(${rule})`,
                transformOrigin: "left",
              }}
            />
          </div>

          {pages.map((page, p) => (
            <div
              key={page.label}
              style={{
                ...layer,
                gap: 22,
                opacity: p < pages.length - 1 ? fadeOut(page.end) : 1,
              }}
            >
              <SubLabel delay={page.start - 4}>{page.label}</SubLabel>
              <RevealList
                items={page.items.map((item) => item.text)}
                start={page.start}
                numberFrom={page.numberFrom}
              />
            </div>
          ))}
        </div>
      </StageLayout>
    </SceneFrame>
  );
}
