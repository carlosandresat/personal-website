import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/** A 0→1 spring that starts `delay` frames into the current sequence. */
export function useEnter(delay: number, damping = 200) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
}

/** Fade + lift driven by an enter progress. */
export function rise(progress: number, distance = 36): React.CSSProperties {
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * distance}px)`,
  };
}

/** How many characters a typewriter has revealed by `frame`. */
export function typedCount(frame: number, start: number, charsPerFrame: number) {
  return Math.max(0, Math.floor((frame - start) * charsPerFrame));
}

/** Slice by code point, so "¡" or "í" is never cut in half. */
export function sliceChars(text: string, count: number) {
  return Array.from(text).slice(0, count).join("");
}

/** Safe margins; portrait clears the platform UI of Reels/TikTok/Shorts. */
export function useLayout() {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  return {
    portrait,
    padX: portrait ? 90 : 140,
    padTop: portrait ? 230 : 150,
    padBottom: portrait ? 280 : 150,
  };
}
