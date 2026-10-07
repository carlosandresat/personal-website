import { mono } from "../../fonts";
import { rise, useEnter } from "../../lib/motion";
import { MascotArt } from "../../pixel/mascot";
import { Emph } from "../Emph";
import { accent, alpha, fg, line, muted } from "../theme";
import type { OutroScene as OutroData } from "../types";
import { Shell } from "./Shell";

export const HANDLE = "@carlosarevalo.dev";
/** The brand line, on every close (video and carousel). */
export const TAGLINE = "Si no lo entiendes,\n*¿cómo lo usas?*";

const CTA = {
  suave: "Sígueme para más",
  fuerte: "Escríbeme por WhatsApp · link en la bio",
};

/** The close: homework for the house, then the tagline, mascot and handle. */
export function OutroScene({ scene }: { scene: OutroData }) {
  const tarea = useEnter(0);
  const brand = useEnter(scene.tarea ? 18 : 0, 14);
  const tagline = useEnter(scene.tarea ? 24 : 6);
  const handle = useEnter(scene.tarea ? 30 : 12);

  return (
    <Shell center>
      {() => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 64 }}>
          {scene.tarea ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                padding: "34px 36px",
                borderRadius: 24,
                border: `2px dashed ${alpha(accent, 0.6)}`,
                textAlign: "left",
                ...rise(tarea, 24),
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 28, letterSpacing: "0.16em", textTransform: "uppercase", color: accent }}>
                Tarea para la casa
              </span>
              <span style={{ fontSize: 46, fontWeight: 600, lineHeight: 1.22, color: fg }}>
                <Emph text={scene.tarea} />
              </span>
            </div>
          ) : null}

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <div style={{ opacity: brand, transform: `scale(${0.6 + 0.4 * brand})` }}>
              <MascotArt size={scene.tarea ? 120 : 180} />
            </div>
            <span style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, whiteSpace: "pre-line", ...rise(tagline, 24) }}>
              <Emph text={TAGLINE} />
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center", ...rise(handle, 16) }}>
              <span style={{ fontFamily: mono, fontSize: 44, color: accent }}>{HANDLE}</span>
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 26,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: muted,
                  paddingTop: 14,
                  borderTop: `2px solid ${line}`,
                }}
              >
                {CTA[scene.cta]}
              </span>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
