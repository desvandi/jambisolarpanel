import { glossaryTerms } from "@/lib/glossary";

/**
 * AUTO-LINK KAMUS ISTILAH di badan artikel.
 *
 * Tujuan SEO: hub-and-spoke internal linking — kemunculan pertama
 * setiap istilah di artikel ditautkan ke anchor /istilah-plts#<id>.
 *
 * Aturan agar tidak spammy & aman SEO:
 * 1. Setiap istilah hanya ditautkan SEKALI per artikel (kemunculan pertama).
 * 2. Maksimal MAX_LINKS_PER_ARTICLE tautan per artikel.
 * 3. Hanya badan teks (p/ul/ol/note) — heading & tabel tidak ditautkan.
 * 4. Matching memakai word-boundary sehingga tidak memotong kata lain.
 * 5. Pola multi-kata didahulukan (mis. "inverter hybrid" sebelum "hybrid").
 * 6. Teks yang ditampilkan TIDAK berubah — hanya dibungkus <Link>.
 *    (Server component → link muncul di HTML awal; aman untuk crawler.)
 */

const MAX_LINKS_PER_ARTICLE = 10;

/** Pola pencarian → id istilah (urutan = prioritas, multi-kata dulu). */
const AUTOLINK_PATTERNS: { re: RegExp; id: string }[] = [
  { re: /\binverter hybrid\b/i, id: "inverter-hybrid" },
  { re: /\bsmart monitoring\b/i, id: "smart-monitoring" },
  { re: /\bsolar pump\b/i, id: "solar-pump" },
  { re: /\btarif PLN\b/i, id: "tarif-pln" },
  { re: /\bpanel monokristalin\b/i, id: "panel-monokristalin" },
  { re: /\bmonokristalin\b/i, id: "panel-monokristalin" },
  { re: /\bLiFePO4\b/i, id: "baterai-lifepo4" },
  { re: /\bPJUTS\b/, id: "pjuts" },
  { re: /\bPLTS\b/, id: "plts" },
  { re: /\bPSH\b/, id: "psh" },
  { re: /\bkWp\b/, id: "kwp" },
  { re: /\bkWh\b/, id: "kwh" },
  { re: /\bMPPT\b/, id: "mppt" },
  { re: /\bDoD\b/, id: "dod" },
  { re: /\bROI\b/, id: "roi" },
  { re: /\bon-grid\b/i, id: "on-grid" },
  { re: /\boff-grid\b/i, id: "off-grid" },
  { re: /\bhybrid\b/i, id: "hybrid" },
  { re: /\bcommissioning\b/i, id: "commissioning" },
  { re: /\bmaintenance\b/i, id: "maintenance-plts" },
  { re: /\bcarport\b/i, id: "kanopi-carport" },
];

/** Segmen hasil: teks polos atau tautan ke istilah. */
export type AutoLinkSegment =
  | { kind: "text"; text: string }
  | { kind: "term"; text: string; id: string };

/** State berbagi antar-blok dalam SATU artikel. */
export interface AutoLinkState {
  usedIds: Set<string>;
  linkCount: number;
}

export function createAutoLinkState(): AutoLinkState {
  return { usedIds: new Set(), linkCount: 0 };
}

/** Map id → label istilah (untuk atribut title tautan). */
const TERM_LABELS: Map<string, string> = new Map(
  glossaryTerms.map((t) => [t.id, t.term])
);

export function termLabel(id: string): string | undefined {
  return TERM_LABELS.get(id);
}

/**
 * Memecah teks menjadi segmen, menautkan kemunculan pertama
 * setiap istilah yang belum dipakai. Deterministik (aman SSR/hydration).
 */
export function autoLinkSegments(
  text: string,
  state: AutoLinkState
): AutoLinkSegment[] {
  if (!text) return [{ kind: "text", text: "" }];

  // 1. Kumpulkan kandidat dari semua pola yang belum terpakai.
  interface Candidate {
    start: number;
    end: number;
    id: string;
  }
  const candidates: Candidate[] = [];
  for (const { re, id } of AUTOLINK_PATTERNS) {
    if (state.usedIds.has(id)) continue;
    const m = re.exec(text);
    if (m) {
      candidates.push({ start: m.index, end: m.index + m[0].length, id });
    }
  }

  if (candidates.length === 0) return [{ kind: "text", text }];

  // 2. Urutkan: posisi paling awal dulu, lalu match terpanjang.
  candidates.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - b.start - (a.end - a.start);
  });

  // 3. Pilih non-overlapping sampai batas tautan.
  const chosen: Candidate[] = [];
  let lastEnd = -1;
  for (const c of candidates) {
    if (state.linkCount + chosen.length >= MAX_LINKS_PER_ARTICLE) break;
    if (c.start >= lastEnd) {
      chosen.push(c);
      lastEnd = c.end;
    }
  }
  if (chosen.length === 0) return [{ kind: "text", text }];

  // 4. Bangun segmen.
  const segments: AutoLinkSegment[] = [];
  let cursor = 0;
  for (const c of chosen) {
    if (c.start > cursor) {
      segments.push({ kind: "text", text: text.slice(cursor, c.start) });
    }
    segments.push({ kind: "term", text: text.slice(c.start, c.end), id: c.id });
    state.usedIds.add(c.id);
    state.linkCount += 1;
    cursor = c.end;
  }
  if (cursor < text.length) {
    segments.push({ kind: "text", text: text.slice(cursor) });
  }
  return segments;
}

/** Daftar istilah yang terpakai (urutan pemakaian) — untuk chip footer artikel. */
export function usedTerms(state: AutoLinkState) {
  return glossaryTerms.filter((t) => state.usedIds.has(t.id));
}
