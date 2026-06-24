/**
 * Renders a JSON-LD <script> block. Data is authored server-side, never user input.
 * We still escape `<` to `<` so a stray "</script>" in any string can't break out of the tag.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const safeJson = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
