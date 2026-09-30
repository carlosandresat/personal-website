import { Px, Sprite, step, type Grid } from "../draw";
import { MASCOT } from "../mascot";
import { BrowserFrame } from "./browser";

// "Your own profile page to show your work": avatar, name, bio and links
// come in, and the page collects stars.

const STAR: Grid = [".4.", "444", ".4."];
const AVATAR = MASCOT[0].slice(0, 7);

export function Profile({ frame }: { frame: number }) {
  return (
    <>
      <BrowserFrame x={5} y={2} w={30} h={26} />
      {frame >= 4 ? <Sprite grid={AVATAR} x={15} y={6} /> : null}
      {frame >= 10 ? <Px x={11} y={15} w={18} h={2} c={frame < 12 ? "3" : "4"} /> : null}
      {frame >= 14 ? <Px x={9} y={19} w={22} c="2" /> : null}
      {frame >= 17 ? <Px x={12} y={21} w={16} c="2" /> : null}
      {frame >= 20
        ? [13, 18, 23].map((x) => <Px key={x} x={x} y={24} w={3} h={2} c="3" />)
        : null}
      {frame >= 26
        ? [
            [1, 4],
            [36, 8],
            [1, 19],
            [36, 22],
          ].map(([x, y], i) =>
            (step(frame, 4) + i) % 3 !== 0 ? <Sprite key={i} grid={STAR} x={x} y={y} /> : null
          )
        : null}
    </>
  );
}
