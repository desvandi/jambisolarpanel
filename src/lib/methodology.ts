/**
 * METODOLOGI KLAIM ANGKA — single source of truth.
 *
 * Tujuan (audit SEO 2026-09-24): setiap klaim kuantitatif di halaman
 * publik harus dapat DIREPRODUKSI — pembaca tahu asumsi, rumus, dan
 * batasannya. Bukan sekadar menambah kata "potensi".
 *
 * Semua parameter di bawah SUDAH dipakai konsisten di:
 * - KebutuhanCalculator (/kalkulator-plts): PSH 3,75 × efisiensi 80%
 * - SavingsCalculator (homepage): tarif & kenaikan tarif PLN
 * - caseStudies.ts: estimasi produksi per kWp
 * - faq.ts: jawaban produksi & ROI
 *
 * ATURAN: jangan menambah parameter baru yang tidak konsisten dengan
 * kalkulator situs. Angka ini adalah parameter desain/simulasi internal,
 * BUKAN hasil pengukuran proyek aktual.
 */

/** Parameter desain standar situs — dipakai kalkulator & semua estimasi. */
export const DESIGN_PARAMS = {
  /** Peak Sun Hours Jambi (rata-rata iradiasi harian). */
  pshJambi: 3.75,
  /** Efisiensi sistem (losses kabel, suhu, konversi inverter, baterai). */
  systemEfficiency: 0.8,
  /** Produksi listrik per kWp per hari = PSH × efisiensi (kWh). */
  kWhPerKwpPerDay: 3.75 * 0.8, // ≈ 3 kWh/hari/kWp
  /** Tarif PLN default (R-1 1300VA+, non-subsidi) — Rp/kWh. */
  plnTariffPerKwh: 1444.7,
  /** Kenaikan tarif PLN per tahun (rata-rata historis 2017–2024). */
  plnIncreaseRatePerYear: 0.06,
  /** Kapasitas 1 unit baterai LiFePO4 48V 100Ah (kWh). */
  batteryUnitKwh: 4.8,
} as const;

/**
 * Rentang penghematan tagihan — dijelaskan BERDASARKAN PROFIL BEBAN,
 * bukan angka lisan. Sumber: logika teknis PLTS hybrid (self-consumption).
 *
 * - Pemakaian DOMINAN SIANG (pompa, usaha jam kerja, produksi):
 *   produksi surya langsung dipakai beban → potensi tertinggi.
 * - Pemakaian DOMINAN MALAM (rumah kosong siang): produksi masuk
 *   baterai (terbatas kapasitas) / diekspor → potensi lebih rendah.
 */
export const SAVINGS_RANGES = {
  residential: {
    low: 50,
    high: 90,
    lowWhen:
      "pemakaian listrik dominan malam hari dan kapasitas baterai terbatas",
    highWhen:
      "beban berjalan di siang hari (AC, pompa, mesin) sehingga produksi surya langsung terpakai",
  },
  commercial: {
    low: 70,
    high: 90,
    lowWhen:
      "sebagian beban berjalan di luar jam produksi surya (shift malam)",
    highWhen:
      "operasional utama di jam kerja siang — hampir seluruh produksi surya langsung dipakai beban",
  },
} as const;

/** Asumsi baku yang dirender di MethodologyNote (urutan tetap). */
export const CORE_ASSUMPTIONS = [
  {
    label: "Produksi 1 kWp",
    value: "± 3 kWh/hari (PSH Jambi 3,75 jam × efisiensi sistem 80%)",
  },
  {
    label: "Tarif listrik acuan",
    value: "Rp 1.444,7/kWh (golongan R-1 1300VA+, non-subsidi)",
  },
  {
    label: "Kenaikan tarif PLN",
    value: "6% per tahun (rata-rata historis 2017–2024)",
  },
  {
    label: "Hemat dihitung dari",
    value: "energi surya yang terpakai (langsung oleh beban atau via baterai)",
  },
] as const;

/**
 * Rumus penghematan bulanan (teks, untuk ditampilkan).
 * Penghematan = energi surya terpakai (kWh) × tarif PLN (Rp/kWh).
 */
export const SAVINGS_FORMULA =
  "Penghematan/bulan = energi surya terpakai (kWh/bulan) × tarif listrik Anda (Rp/kWh)";

/** Catatan batasan wajib untuk setiap klaim angka. */
export const CLAIM_DISCLAIMERS = [
  "Angka adalah estimasi simulasi dengan parameter desain di atas — bukan hasil pengukuran proyek Anda.",
  "Hasil aktual bergantung pada profil beban, arah & kemiringan atap, shading, dan cuaca di lokasi.",
  "Simulasi spesifik properti Anda (input beban per peralatan) tersedia gratis lewat kalkulator atau survei lokasi.",
] as const;
