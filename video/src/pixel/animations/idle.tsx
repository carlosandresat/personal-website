import { Px } from "../draw";

/** Before the first cue: a prompt waiting for input. */
export function Idle({ frame }: { frame: number }) {
  return (
    <>
      <Px x={2} y={3} w={1} h={3} c="2" />
      {Math.floor(frame / 12) % 2 === 0 ? <Px x={4} y={3} w={2} h={3} c="3" /> : null}
    </>
  );
}
