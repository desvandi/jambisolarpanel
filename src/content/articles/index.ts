import type { Article } from "./types";
import { article as hargaPanelSuryaFaktorBiaya } from "./harga-panel-surya-jambi-faktor-biaya";
import { article as biayaPasangPltsRumah } from "./biaya-pasang-plts-rumah-jambi";
import { article as berapaKwpPanelSuryaUntukRumah } from "./berapa-kwp-panel-surya-untuk-rumah";
import { article as pltsHybridVsOffGrid } from "./plts-hybrid-vs-off-grid";
import { article as potensiEnergiSuryaJambi } from "./potensi-energi-surya-jambi";
import { article as pltsUntukKebunSawit } from "./plts-untuk-kebun-sawit";
import { article as solarPumpUntukPerkebunan } from "./solar-pump-untuk-perkebunan";
import { article as pjutsUntukJalanDesa } from "./pjuts-untuk-jalan-desa-dan-perkebunan";
import { article as caraMenentukanKapasitasPlts } from "./cara-menentukan-kapasitas-plts";
import { article as caraMenghitungKebutuhanBaterai } from "./cara-menghitung-kebutuhan-baterai";
import { article as berapaProduksi1Kwp } from "./berapa-produksi-1-kwp-panel-surya";
import { article as caraMerawatPanelSurya } from "./cara-merawat-panel-surya";
import { article as penyebabProduksiPltsTurun } from "./penyebab-produksi-plts-turun";

export type { Article, ArticleBlock, ArticleCategory } from "./types";

/** Registry seluruh artikel Knowledge Center. Urutan = urutan tampil di /artikel. */
export const articles: Article[] = [
  hargaPanelSuryaFaktorBiaya,
  biayaPasangPltsRumah,
  berapaKwpPanelSuryaUntukRumah,
  pltsHybridVsOffGrid,
  potensiEnergiSuryaJambi,
  pltsUntukKebunSawit,
  solarPumpUntukPerkebunan,
  pjutsUntukJalanDesa,
  caraMenentukanKapasitasPlts,
  caraMenghitungKebutuhanBaterai,
  berapaProduksi1Kwp,
  caraMerawatPanelSurya,
  penyebabProduksiPltsTurun,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(article: Article, max = 3): Article[] {
  const related = (article.relatedSlugs ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => Boolean(a));
  if (related.length >= max) return related.slice(0, max);
  const sameCategory = articles.filter(
    (a) => a.slug !== article.slug && a.category === article.category && !related.includes(a)
  );
  return [...related, ...sameCategory].slice(0, max);
}

export function formatDateId(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
