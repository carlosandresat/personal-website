import { AbsoluteFill, Audio, type CalculateMetadataFunction, Sequence, Series, staticFile } from "remotion";

import { mono } from "../fonts";
import { Captions } from "./Captions";
import { LEAD, sceneFrames, voiceFrames } from "./pacing";
import { PIECES } from "./pieces";
import { ArrayScene } from "./scenes/ArrayScene";
import { CodeScene } from "./scenes/CodeScene";
import { GraphScene } from "./scenes/GraphScene";
import { HookScene } from "./scenes/HookScene";
import { HANDLE, OutroScene } from "./scenes/OutroScene";
import { PixelScene } from "./scenes/PixelScene";
import { PlotScene } from "./scenes/PlotScene";
import { PointsScene } from "./scenes/PointsScene";
import { LAYOUT, alpha, ink, ink2, muted } from "./theme";
import type { Scene } from "./types";

/**
 * Only the slug travels as a prop (pieces hold functions, which props can't);
 * `voice` is filled in by calculateMetadata with each recording's length.
 */
export type ExplainerProps = { slug: string; voice: (number | null)[] };

/** One recording per scene, numbered from 01; written by `pnpm voz <slug>`. */
export const voicePath = (slug: string, i: number) => `redes/${slug}/voz/${String(i + 1).padStart(2, "0")}.wav`;

/** Length of a PCM WAV in seconds, from its header; null if there's no file. */
async function wavSeconds(path: string): Promise<number | null> {
  const response = await fetch(staticFile(path));
  if (!response.ok) return null;
  const view = new DataView(await response.arrayBuffer());
  let byteRate = 0;
  for (let at = 12; at + 8 <= view.byteLength; ) {
    const id = String.fromCharCode(...[0, 1, 2, 3].map((k) => view.getUint8(at + k)));
    const size = view.getUint32(at + 4, true);
    if (id === "fmt ") byteRate = view.getUint32(at + 16, true);
    if (id === "data" && byteRate) return size / byteRate;
    at += 8 + size + (size % 2);
  }
  throw new Error(`public/${path} is not a PCM WAV; run \`pnpm voz\` to convert it`);
}

function piece(slug: string) {
  const found = PIECES[slug];
  if (!found) throw new Error(`No piece "${slug}" in src/explainer/pieces/index.ts`);
  return found;
}

export const calculateExplainerMetadata: CalculateMetadataFunction<ExplainerProps> = async ({ props }) => {
  const { scenes } = piece(props.slug);
  const voice = await Promise.all(scenes.map((_, i) => wavSeconds(voicePath(props.slug, i))));
  const durationInFrames = scenes.reduce((sum, scene, i) => sum + sceneFrames(scene, voice[i]), 0);
  return { durationInFrames, props: { ...props, voice } };
};

function SceneView({ scene, frames }: { scene: Scene; frames: number }) {
  switch (scene.kind) {
    case "hook":
      return <HookScene scene={scene} />;
    case "points":
      return <PointsScene scene={scene} frames={frames} />;
    case "plot":
      return <PlotScene scene={scene} frames={frames} />;
    case "graph":
      return <GraphScene scene={scene} frames={frames} />;
    case "array":
      return <ArrayScene scene={scene} frames={frames} />;
    case "code":
      return <CodeScene scene={scene} frames={frames} />;
    case "pixel":
      return <PixelScene scene={scene} />;
    case "outro":
      return <OutroScene scene={scene} />;
  }
}

function Watermark() {
  return (
    <div
      style={{
        position: "absolute",
        top: LAYOUT.watermarkTop,
        left: LAYOUT.left,
        fontFamily: mono,
        fontSize: 28,
        color: alpha(muted, 0.75),
      }}
    >
      {HANDLE}
    </div>
  );
}

/**
 * A vertical explainer for Reels, TikTok and LinkedIn: one scene per line of
 * voice, the visual in the middle band, subtitles under it, the handle on top.
 */
export function Explainer({ slug, voice }: ExplainerProps) {
  const { scenes } = piece(slug);

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 28%, ${ink2}, ${ink} 72%)` }}>
      <Series>
        {scenes.map((scene, i) => {
          const recorded = voice[i] ?? null;
          const frames = sceneFrames(scene, recorded);
          return (
            <Series.Sequence key={i} durationInFrames={frames}>
              <SceneView scene={scene} frames={frames} />
              {/* The outro shows the handle and its line large, so no corner handle or subtitles there. */}
              {scene.kind !== "outro" ? <Watermark /> : null}
              {scene.say && scene.kind !== "outro" ? (
                <Captions say={scene.say} voiceFrames={voiceFrames(scene, recorded)} />
              ) : null}
              {recorded != null ? (
                <Sequence from={LEAD}>
                  <Audio src={staticFile(voicePath(slug, i))} />
                </Sequence>
              ) : null}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
}
