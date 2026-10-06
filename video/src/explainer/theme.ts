/**
 * The social accounts' clean register: the print palette (marketing/print,
 * the Facebook cover, the WhatsApp images) rather than the site's neutral
 * dark tokens, so every post reads as the same brand. Mint is an accent for
 * whatever matters at that moment, not a fill.
 */
export const ink = "#0a1a13";
export const ink2 = "#13291f";
export const fg = "#e3ece7";
export const muted = "#93a89e";
export const line = "#26372f";
export const accent = "#5ed6a0";
/** A second highlight, for comparisons (one curve against another). */
export const amber = "#f2b84b";

export const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/**
 * Portrait layout. The platform UI (Reels, TikTok) covers roughly the top
 * 10 %, the bottom 20 % and a strip on the right, so visuals live in a band
 * in the middle and the subtitles sit just under it.
 */
export const LAYOUT = {
  width: 1080,
  height: 1920,
  left: 90,
  right: 140,
  top: 300,
  bottom: 1250,
  captionTop: 1300,
  watermarkTop: 205,
};

export const CONTENT_W = LAYOUT.width - LAYOUT.left - LAYOUT.right;
export const CONTENT_H = LAYOUT.bottom - LAYOUT.top;
