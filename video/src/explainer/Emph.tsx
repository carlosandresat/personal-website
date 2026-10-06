import { accent } from "./theme";

/** Text with *asterisked* words in the accent colour. */
export function Emph({ text, tone = accent }: { text: string; tone?: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <span key={i} style={{ color: tone }}>
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
