/**
 * Tipe data untuk artikel Knowledge Center (/artikel).
 *
 * ATURAN KONTEN (E-E-A-T):
 * - Artikel harus ditulis berdasarkan pengetahuan teknis PLTS yang benar.
 * - JANGAN mengarang klaim bisnis (jumlah pelanggan, rating, proyek fiktif,
 *   statistik tanpa sumber).
 * - Angka teknis boleh memakai data internal situs yang nyata:
 *   PSH Jambi 3.75 jam, efisiensi sistem 80%, panel LONGi 650Wp,
 *   inverter PowMr/Deye hybrid, baterai LiFePO4 48V 100Ah (unit 4.8 kWh),
 *   tarif PLN acuan Rp1.352–1.444,70/kWh (R-1), PPN 11%.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "note"; title?: string; text: string }
  | {
      type: "cta";
      text: string;
      href: string;
      label: string;
    }
  | {
      type: "links";
      intro: string;
      items: { label: string; href: string; desc?: string }[];
    };

export type ArticleCategory =
  | "Biaya & Harga"
  | "Panduan Teknis"
  | "Energi Surya Jambi"
  | "Kebun & Perkebunan";

export interface Article {
  slug: string;
  title: string;
  /** Meta description, maksimal ~160 karakter. */
  description: string;
  category: ArticleCategory;
  /** Tanggal publikasi ISO, contoh: "2026-09-23". */
  date: string;
  updated?: string;
  readingMinutes: number;
  /** 3-5 poin ringkasan untuk pembaca cepat. */
  keyTakeaways: string[];
  blocks: ArticleBlock[];
  /** Slug artikel terkait untuk internal linking. */
  relatedSlugs?: string[];
}
