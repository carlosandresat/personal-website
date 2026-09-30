/**
 * Mirrors the `.dark` tokens in src/app/globals.css (HSL triplets, same
 * notation), so a colour change on the site is a copy-paste here. Emitted in
 * comma syntax because Remotion's interpolateColors can't parse `hsl(h s l)`.
 */
const token =
  (triplet: string) =>
  (alpha = 1) =>
    `hsla(${triplet.split(" ").join(", ")}, ${alpha})`;

export const color = {
  background: token("0 0% 3.9%"),
  foreground: token("0 0% 98%"),
  muted: token("0 0% 14.9%"),
  mutedForeground: token("0 0% 63.9%"),
  border: token("0 0% 14.9%"),
  brand: token("142.1 70.6% 45.3%"),
};

/** The site's --grid-cell is 44px on a ~1280px viewport; scaled for 1080p. */
export const GRID_CELL = 64;
