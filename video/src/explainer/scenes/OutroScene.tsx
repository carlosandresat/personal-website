import { mono } from "../../fonts";
import { rise, useEnter } from "../../lib/motion";
import { MascotArt } from "../../pixel/mascot";
import { Emph } from "../Emph";
import { accent, muted } from "../theme";
import type { OutroScene as OutroData } from "../types";
import { Shell } from "./Shell";

export const HANDLE = "@carlosarevalo.dev";

const LINES = {
  suave: { main: "Sígueme para más *tecnología explicada simple*", sub: "Guárdalo para repasarlo" },
  fuerte: { main: "Escríbeme por *WhatsApp*", sub: "Link en la bio" },
};

/** Brand close: the pixel mascot (in place of a face), the handle and the call to action. */
export function OutroScene({ scene }: { scene: OutroData }) {
  const mascot = useEnter(0, 14);
  const handle = useEnter(8);
  const main = useEnter(14);
  const sub = useEnter(20);
  const copy = LINES[scene.cta];

  return (
    <Shell center>
      {() => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 40 }}>
          <div style={{ opacity: mascot, transform: `scale(${0.6 + 0.4 * mascot})` }}>
            <MascotArt size={200} />
          </div>
          <span style={{ fontFamily: mono, fontSize: 50, color: accent, ...rise(handle, 20) }}>{HANDLE}</span>
          <span style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, ...rise(main, 24) }}>
            <Emph text={scene.line ?? copy.main} />
          </span>
          <span style={{ fontFamily: mono, fontSize: 30, letterSpacing: "0.12em", textTransform: "uppercase", color: muted, ...rise(sub, 16) }}>
            {copy.sub}
          </span>
        </div>
      )}
    </Shell>
  );
}
