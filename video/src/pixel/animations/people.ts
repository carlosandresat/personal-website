import type { Grid } from "../draw";

// The two people in the development explainer: the client (with a tie) and
// the developer (with hair), the same build as the course trailers' student.

export const CLIENT: Grid = [
  "..44..", "..44..", ".3333.", "3.43.3", "3.43.3", "..33..",
  "..33..", "..33..", ".3..3.", ".3..3.", ".3..3.",
];

export const DEVELOPER: Grid = [
  "..22..", "..44..", ".3333.", "3.33.3", "3.33.3", "..33..",
  "..33..", "..33..", ".3..3.", ".3..3.", ".3..3.",
];

/** A speech bubble; its 5×5 inside starts at (x + 1, y + 1). */
export const BUBBLE: Grid = [
  ".33333.",
  "3.....3",
  "3.....3",
  "3.....3",
  "3.....3",
  "3.....3",
  ".33333.",
];

export const QUESTION: Grid = ["444", "..4", ".44", "...", ".4."];

export const CHECK: Grid = ["......4", ".....44", "4...44.", "44.44..", ".444...", "..4...."];
