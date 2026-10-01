import { RevealRow, StageLayout } from "../../components/ListWithStage";
import { SceneFrame, SceneHeader, SubLabel } from "../../components/primitives";
import { pad2 } from "../../course-trailer/pacing";
import { courseCopy } from "../../i18n";
import { useLayout } from "../../lib/motion";
import { Stage } from "../../pixel/Stage";
import { itemAt } from "../pacing";
import { SOCIAL_COPY, type StagedRow } from "../social-copy";

/** Courses per area and the catalog summary, checked against messages/es.json. */
function courseCounts() {
  const { areas, summary } = SOCIAL_COPY.courses;
  const counts = areas.map((area) => {
    area.courseKeys.forEach((key) => courseCopy("es", key));
    return area.courseKeys.length;
  });
  const total = counts.reduce((sum, n) => sum + n, 0);
  return {
    counts,
    summary: summary.replace("{courses}", String(total)).replace("{areas}", String(areas.length)),
  };
}

/**
 * A heading, then rows arriving on the beat beside the stage, which plays
 * each row's animation as it lands.
 */
function OfferList({
  scene,
  eyebrow,
  title,
  rows,
  details,
  markers,
  summary,
}: {
  scene: "development" | "courses";
  eyebrow: string;
  title: string;
  rows: StagedRow[];
  details?: string[];
  markers: string[];
  summary?: string;
}) {
  const { portrait } = useLayout();
  const at = rows.map((_, i) => itemAt(scene, i));
  const cues = rows.map((row, i) => ({ animation: row.animation, at: at[i], label: row.tag }));

  return (
    <SceneFrame style={{ gap: portrait ? 48 : 52 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <SceneHeader eyebrow={eyebrow} title={title} delay={4} />
        {summary ? <SubLabel delay={14}>{summary}</SubLabel> : null}
      </div>
      <StageLayout stage={<Stage cues={cues} delay={8} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {rows.map((row, i) => (
            <RevealRow
              key={row.text}
              text={row.text}
              detail={details?.[i]}
              marker={markers[i]}
              at={at[i]}
              next={i < rows.length - 1 ? at[i + 1] : null}
            />
          ))}
        </div>
      </StageLayout>
    </SceneFrame>
  );
}

/** "I build your software": the kinds of projects I take on. */
export function DevelopmentScene() {
  const { eyebrow, title, rows } = SOCIAL_COPY.development;
  return (
    <OfferList
      scene="development"
      eyebrow={eyebrow}
      title={title}
      rows={rows}
      markers={rows.map((_, i) => pad2(i + 1))}
    />
  );
}

/** "Learn with me": the course areas, their tech and how many courses each has. */
export function CoursesScene() {
  const { eyebrow, title, areas } = SOCIAL_COPY.courses;
  const { counts, summary } = courseCounts();
  return (
    <OfferList
      scene="courses"
      eyebrow={eyebrow}
      title={title}
      rows={areas}
      details={areas.map((area, i) => `${area.detail} · ${counts[i]} ${counts[i] === 1 ? "curso" : "cursos"}`)}
      markers={areas.map((_, i) => pad2(i + 1))}
      summary={summary}
    />
  );
}
