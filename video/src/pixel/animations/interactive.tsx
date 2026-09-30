import { Px, Sprite, lerp, progress, type Grid } from "../draw";
import { CURSOR } from "./browser";

// "Bring them to life with JavaScript": a click flips the card's theme, then
// a form gets filled in and submitted.

const CHECK: Grid = ["....4", "...44", "4.44.", "444..", ".4..."];

export function Interactive({ frame }: { frame: number }) {
  const toggled = frame >= 12;
  const flash = frame >= 12 && frame < 15;
  const typed = Math.max(0, Math.min(8, Math.floor((frame - 17) / 1.5)));
  const submitted = frame >= 34;

  // Pointer: to the toggle, then down to the submit button.
  const toToggle = progress(frame, 0, 10);
  const toSubmit = progress(frame, 26, 32);
  const cursorX = lerp(lerp(38, 28, toToggle), 29, toSubmit);
  const cursorY = lerp(lerp(28, 6, toToggle), 21, toSubmit);

  return (
    <>
      {/* Card with a theme toggle. */}
      <Px x={7} y={2} w={26} h={13} c={flash ? "4" : "2"} />
      <Px x={8} y={3} w={24} h={11} c={toggled ? "4" : "1"} />
      <Px x={10} y={5} w={10} h={2} c={toggled ? "1" : "3"} />
      <Px x={10} y={9} w={14} c="2" />
      <Px x={10} y={11} w={11} c="2" />
      <Px x={26} y={5} w={5} h={2} c={toggled ? "3" : "2"} />
      <Px x={toggled ? 29 : 26} y={5} w={2} h={2} c={toggled ? "1" : "3"} />

      {/* Form: an input that fills in, and a submit button. */}
      <Px x={7} y={19} w={19} h={3} c="2" />
      <Px x={8} y={20} w={17} c="1" />
      {Array.from({ length: typed }, (_, i) => (
        <Px key={i} x={9 + i * 2} y={20} c="4" />
      ))}
      <Px x={27} y={19} w={6} h={3} c={submitted && frame < 38 ? "4" : "3"} />
      {submitted ? <Sprite grid={CHECK} x={34} y={18} /> : null}

      <Sprite grid={CURSOR} x={cursorX} y={cursorY} />
    </>
  );
}
