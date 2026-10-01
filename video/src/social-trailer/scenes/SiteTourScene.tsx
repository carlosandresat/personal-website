import { AbsoluteFill, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import { CornerTicks, Eyebrow, RevealWords, SceneFrame } from "../../components/primitives";
import { CourseTrailer } from "../../course-trailer/CourseTrailer";
import { pad2 } from "../../course-trailer/pacing";
import { mono } from "../../fonts";
import { rise, useEnter, useLayout } from "../../lib/motion";
import { ProcessExplainer } from "../../process-explainer/ProcessExplainer";
import { color } from "../../theme";
import { courses } from "../../../../src/data/courses";
import { TOUR_CLIPS, local, sceneFrames } from "../pacing";
import { RECORD_VIEWPORTS, SHOTS, type EmbedRect, type EmbedSlug, type Recording } from "../shots";
import { SOCIAL_COPY } from "../social-copy";

/** Width the filmed page is shown at, per format. */
const SCREEN_WIDTH = { landscape: 1140, portrait: 470 };
/** Frames into an embedded trailer it starts from: its title already in. */
const EMBED_FROM = 45;

/** The trailer a page plays, rendered from its own composition. */
function EmbeddedTrailer({ slug }: { slug: EmbedSlug }) {
  if (slug === "development") return <ProcessExplainer locale="es" />;
  const course = courses.find((c) => c.slug === slug);
  if (!course) throw new Error(`No course "${slug}" in src/data/courses.ts`);
  return <CourseTrailer courseKey={course.key} locale="es" />;
}

/**
 * The page's own <video>, filled with its trailer. The trailer is laid out
 * at full canvas size, as it was rendered for the site, then scaled into the
 * rect the recorder measured on this frame.
 */
function EmbedOverlay({ slug, rects, scale }: { slug: EmbedSlug; rects: EmbedRect[]; scale: number }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const rect = rects[Math.min(frame, rects.length - 1)];
  if (!rect) return null;
  const fit = (rect.width * scale) / width;

  return (
    <div
      style={{
        position: "absolute",
        left: rect.x * scale,
        top: rect.y * scale,
        width: rect.width * scale,
        height: rect.height * scale,
        overflow: "hidden",
        borderRadius: 12 * scale,
      }}
    >
      <div style={{ width, height, transform: `scale(${fit})`, transformOrigin: "top left" }}>
        <Sequence from={-EMBED_FROM} layout="none">
          <EmbeddedTrailer slug={slug} />
        </Sequence>
      </div>
    </div>
  );
}

/** Clip windows in scene frames: each shows until the next one cuts in. */
const WINDOWS = TOUR_CLIPS.map((clip, i) => {
  const start = i === 0 ? 0 : local("tour", clip.from);
  const next = TOUR_CLIPS[i + 1];
  const end = next ? local("tour", next.from) : sceneFrames("tour");
  return { shot: clip.shot, start, end };
});

/** Browser chrome on landscape, a phone on portrait, around the filmed page. */
function Device({ path, children }: { path: string; children: React.ReactNode }) {
  const { portrait } = useLayout();
  const enter = useEnter(4);
  const viewport = RECORD_VIEWPORTS[portrait ? "portrait" : "landscape"];
  const width = SCREEN_WIDTH[portrait ? "portrait" : "landscape"];
  const height = (width / viewport.width) * viewport.height;

  return (
    <div
      style={{
        position: "relative",
        flexShrink: 0,
        width,
        border: `1px solid ${color.brand(0.45)}`,
        borderRadius: portrait ? 48 : 18,
        padding: portrait ? 12 : 0,
        background: color.background(),
        boxShadow: `0 0 80px ${color.brand(0.12)}`,
        overflow: "hidden",
        ...rise(enter, 60),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          height: portrait ? 56 : 50,
          padding: portrait ? "0 18px" : "0 20px",
          borderBottom: portrait ? "none" : `1px solid ${color.border()}`,
        }}
      >
        {portrait ? null : (
          <span style={{ display: "flex", gap: 9 }}>
            {[0.9, 0.5, 0.3].map((alpha) => (
              <span key={alpha} style={{ width: 12, height: 12, borderRadius: 99, background: color.brand(alpha) }} />
            ))}
          </span>
        )}
        <span
          style={{
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: portrait ? 0 : "0 120px",
            padding: "8px 18px",
            borderRadius: 99,
            background: color.muted(),
            fontFamily: mono,
            fontSize: portrait ? 22 : 20,
            color: color.mutedForeground(),
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          carlosarevalo.dev<span style={{ color: color.foreground() }}>{path}</span>
        </span>
      </div>
      <div style={{ position: "relative", width, height, borderRadius: portrait ? 36 : 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/** The redesigned site, filmed: hero, catalog, a course page, /development. */
export function SiteTourScene({ recording }: { recording: Recording }) {
  const frame = useCurrentFrame();
  const { portrait } = useLayout();
  const format = portrait ? "portrait" : "landscape";
  const scale = SCREEN_WIDTH[format] / RECORD_VIEWPORTS[format].width;
  const { eyebrow, captions } = SOCIAL_COPY.tour;

  const current = WINDOWS.filter((w) => frame >= w.start).length - 1;
  const showing = WINDOWS[current];
  const shot = SHOTS.find((s) => s.id === showing.shot)!;
  // A beat-long flash on every cut.
  const flash = current === 0 ? 0 : interpolate(frame, [showing.start, showing.start + 5], [0.35, 0], { extrapolateRight: "clamp" });
  const eyebrowIn = useEnter(2);

  const caption = (
    <div style={{ display: "flex", flexDirection: "column", gap: portrait ? 22 : 30 }}>
      <div style={rise(eyebrowIn, 20)}>
        <Eyebrow size={26}>{eyebrow}</Eyebrow>
      </div>
      {/* Every caption shares one cell, so swapping them never moves the device. */}
      <div style={{ display: "grid" }}>
        {WINDOWS.map((w, i) => (
          <RevealWords
            key={w.shot}
            text={captions[w.shot]}
            delay={w.start + (i === 0 ? 8 : 0)}
            stagger={3}
            style={{
              gridArea: "1 / 1",
              fontSize: portrait ? 72 : 76,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              alignContent: "flex-start",
              opacity: i === current ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 14, fontFamily: mono, fontSize: 22, color: color.mutedForeground() }}>
        {WINDOWS.map((w, i) => (
          <span key={w.shot} style={{ color: i === current ? color.brand() : undefined }}>
            {pad2(i + 1)}
          </span>
        ))}
      </div>
    </div>
  );

  const device = (
    <Device path={shot.path}>
      {WINDOWS.map((w) => {
        const take = recording[format][w.shot];
        return (
          <Sequence key={w.shot} from={w.start} durationInFrames={w.end - w.start}>
            <AbsoluteFill>
              <OffthreadVideo src={staticFile(take.clip)} muted style={{ width: "100%", height: "100%" }} />
              {take.embed ? <EmbedOverlay slug={take.embed.slug} rects={take.embed.rects} scale={scale} /> : null}
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <AbsoluteFill style={{ background: color.brand(flash), pointerEvents: "none" }} />
      <CornerTicks size={18} />
    </Device>
  );

  return portrait ? (
    <SceneFrame style={{ alignItems: "center", gap: 44 }}>
      <div style={{ alignSelf: "stretch" }}>{caption}</div>
      {device}
    </SceneFrame>
  ) : (
    <SceneFrame style={{ flexDirection: "row", alignItems: "center", gap: 64 }}>
      <div style={{ flex: 1, minWidth: 0 }}>{caption}</div>
      {device}
    </SceneFrame>
  );
}
