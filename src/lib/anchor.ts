/**
 * Utilitas anchor heading untuk artikel.
 * ID harus deterministik (server & client menghitung sama)
 * dan mudah dibaca (mirip slug WordPress).
 */
export function headingId(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "") // diacritics
      .replace(/[^a-z0-9\s-]/g, "") // non alfanumerik
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "bagian"
  );
}

export interface TocHeading {
  id: string;
  text: string;
}

/**
 * Kumpulkan heading h2 dari blok artikel dan beri id unik.
 * Dipakai bersama oleh ArticleBlocks (render) dan halaman artikel (ToC)
 * agar id selalu konsisten.
 */
export function buildTocHeadings(headings: string[]): TocHeading[] {
  const seen = new Map<string, number>();
  return headings.map((text) => {
    const base = headingId(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return { id: n === 0 ? base : `${base}-${n + 1}`, text };
  });
}
