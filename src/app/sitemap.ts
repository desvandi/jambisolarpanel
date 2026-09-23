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

/** Tanggal pembaruan signifikan terakhir per route (ISO). */
const LAST_MODIFIED = {
  home: "2026-09-23",
  solarHome: "2026-09-24",
  solarCommercial: "2026-09-24",
  pjuts: "2026-09-24",
  solarPump: "2026-09-24",
  evCharging: "2026-09-24",
  smartIot: "2026-09-24",
  maintenance: "2026-09-24",
  tenderProcurement: "2026-09-24",
  sewaPlts: "2026-09-24",
  tentangKami: "2026-09-23",
  proyek: "2026-09-24",
  hargaPanelSurya: "2026-09-23",
  artikelIndex: "2026-09-23",
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
