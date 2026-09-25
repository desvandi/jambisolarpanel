import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { articles } from "@/content/articles";
import { caseStudies } from "@/content/caseStudies";

/**
 * Sitemap — HANYA berisi URL canonical (https://jambisolarpanel.vercel.app).
 *
 * lastModified memakai tanggal perubahan konten yang nyata, BUKAN new Date()
 * (Google menggunakan lastmod sebagai sinyal scheduling crawl).
 * priority & changeFrequency dihilangkan karena tidak digunakan Google.
 *
 * Halaman admin/internal (/kalibrasi-harga, /api) TIDAK dimasukkan.
 */

/**
 * Tanggal pembaruan signifikan terakhir per route (ISO).
 *
 * DISIPLIN LASTMOD (audit SEO 2026-09-24): tanggal HANYA dibump bila
 * perubahan konten/konten terstruktur yang bermakna terjadi di route
 * tersebut — bukan setiap kali repository tersentuh (mis. refactor
 * internal, penyesuaian link kecil, perubahan komponen bersama).
 */
const LAST_MODIFIED = {
  // 2026-09-24: copy TrustSection (klaim legalitas) — perubahan konten nyata.
  home: "2026-09-24",
  // 2026-09-24: panel metodologi + penulisan ulang klaim penghematan/ROI.
  solarHome: "2026-09-24",
  solarCommercial: "2026-09-24",
  // 2026-09-24: penghapusan HowTo JSON-LD (perubahan structured data).
  pjuts: "2026-09-24",
  // 2026-09-24 (audit R8 lanjutan — sweep konsistensi): klaim residual
  // "Rp 0 (gratis matahari)"/"air gratis 20+ tahun"/"100% tenaga surya"
  // ditulis ulang jadi akuntansi jujur (tanpa BBM & listrik, perawatan
  // tetap ada, garansi performa 25 thn) + footnote estimasi kasar.
  solarPump: "2026-09-24",
  // 2026-09-24 (audit R8 lanjutan): model simulasi khusus EV ditulis ulang —
  // klaim "100% energi surya"/"gratis"/"Rp 5-7 jt" dihapus, tarif disatukan
  // ke DESIGN_PARAMS, penghematan charging = min(produksi, kebutuhan) × 70% × tarif.
  evCharging: "2026-09-24",
  // 2026-09-24 — ketiga route di bawah diubah KONTENYA di commit 1fbd70a
  // (00:37 UTC: klaim tak terverifikasi dilunakkan + editorial process note)
  // — BUKAN karena refactor rendering e66e049 (04:07 UTC, "zero copy
  // changes"). Audit ulang total 2026-09-24 sempat menandai ini; verifikasi
  // git menunjukkan lastmod 2026-09-24 tetap sah karena perubahan konten
  // E-E-A-T terjadi di hari yang sama, sebelum refactor.
  smartIot: "2026-09-24",
  maintenance: "2026-09-24",
  tenderProcurement: "2026-09-24",
  // 2026-09-24: stat hero & klaim "hingga 90%" ditulis ulang + catatan kaki.
  // 2026-09-24 (audit R8 lanjutan): label paket "Hemat hingga Rp X" diganti
  // simulasi terhitung dari model pusat (simulatePackageSavings) + footnote.
  sewaPlts: "2026-09-24",
  // 2026-09-24: blok verifikasi legalitas ditambahkan.
  tentangKami: "2026-09-24",
  // 2026-09-24: studi kasus diperdalam (spesifikasi, metode data, batasan).
  proyek: "2026-09-24",
  // 2026-09-24 (R8): footnote estimasi hemat memakai model pemanfaatan energi.
  hargaPanelSurya: "2026-09-24",
  artikelIndex: "2026-09-23",
  // 2026-09-24: jawaban ROI & performa hujan ditulis ulang (metodologi).
  faq: "2026-09-24",
  kalkulatorPlts: "2026-09-24",
  istilahPlts: "2026-09-24",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: LAST_MODIFIED.home },
    { url: `${SITE_URL}/solar-home`, lastModified: LAST_MODIFIED.solarHome },
    { url: `${SITE_URL}/solar-commercial`, lastModified: LAST_MODIFIED.solarCommercial },
    { url: `${SITE_URL}/pjuts`, lastModified: LAST_MODIFIED.pjuts },
    { url: `${SITE_URL}/solar-pump`, lastModified: LAST_MODIFIED.solarPump },
    { url: `${SITE_URL}/ev-charging`, lastModified: LAST_MODIFIED.evCharging },
    { url: `${SITE_URL}/smart-iot`, lastModified: LAST_MODIFIED.smartIot },
    { url: `${SITE_URL}/maintenance`, lastModified: LAST_MODIFIED.maintenance },
    { url: `${SITE_URL}/tender-procurement`, lastModified: LAST_MODIFIED.tenderProcurement },
    { url: `${SITE_URL}/sewa-plts`, lastModified: LAST_MODIFIED.sewaPlts },
    { url: `${SITE_URL}/tentang-kami`, lastModified: LAST_MODIFIED.tentangKami },
    { url: `${SITE_URL}/proyek`, lastModified: LAST_MODIFIED.proyek },
    { url: `${SITE_URL}/harga-panel-surya-jambi`, lastModified: LAST_MODIFIED.hargaPanelSurya },
    { url: `${SITE_URL}/artikel`, lastModified: LAST_MODIFIED.artikelIndex },
    { url: `${SITE_URL}/faq`, lastModified: LAST_MODIFIED.faq },
    { url: `${SITE_URL}/kalkulator-plts`, lastModified: LAST_MODIFIED.kalkulatorPlts },
    { url: `${SITE_URL}/istilah-plts`, lastModified: LAST_MODIFIED.istilahPlts },
  ];

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/studi-kasus/${cs.slug}`,
    lastModified: LAST_MODIFIED.proyek,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/artikel/${article.slug}`,
    lastModified: article.updated || article.date,
  }));

  return [...staticPages, ...caseStudyPages, ...articlePages];
}
