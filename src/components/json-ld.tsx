/** Renders schema.org data. `<` is escaped so content can't close the tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data })
          .replace(/</g, "\u003c"),
      }}
    />
  );
}
