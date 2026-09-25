import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /api/ tidak ada halaman HTML untuk search — cukup Disallow.
        disallow: ["/api/"],
        // CATATAN (Audit 1 P2-1, 2026-09-24): /kalibrasi-harga SENGAJA
        // TIDAK di-Disallow. Halaman itu dilindungi Basic Auth + selalu
        // mengirim X-Robots-Tag: noindex, nofollow (lihat src/proxy.ts).
        // Disallow justru kontraproduktif: crawler yang diblokir tidak bisa
        // membaca header noindex, sehingga URL berisiko di-index "opaque"
        // bila ditemukan dari tautan eksternal. Proteksi utama = auth;
        // noindex = sinyal indexing; robots.txt hanya mengatur crawl.
      },
    ],
    sitemap: "https://jambisolarpanel.vercel.app/sitemap.xml",
  };
}
