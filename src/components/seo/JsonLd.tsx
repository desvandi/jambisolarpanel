/**
 * Render JSON-LD structured data di server component.
 * Gunakan hanya untuk data yang benar-benar terlihat di halaman terkait.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
