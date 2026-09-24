/**
 * METODOLOGI KLAIM ANGKA — SINGLE EXECUTABLE SOURCE OF TRUTH.
 *
 * Tujuan (audit SEO 2026-09-24, Round 8): setiap klaim kuantitatif di
 * halaman publik harus DAPAT DIREPRODUKSI dan JUJUR — pembaca tahu
 * asumsi, rumus, dan batasannya, dan mesin kalkulator memakai PARAMETER
 * YANG SAMA dengan yang tertulis di halaman (bukan dua sumber berbeda).
 *
 * Aliran dependensi (WAJIB dijaga):
 *   methodology.ts (DESIGN_PARAMS)
 *     → pricing.ts (PLN_TARIFF_DEFAULT, SELF_CONSUMPTION_DEFAULT,
 *       PLN_INCREASE_RATE_DEFAULT, defaultSettings)
 *     → pricing-ev.ts, rentalPackages.ts, KebutuhanCalculator,
 *       SavingsCalculator, FAQ, artikel.
 *
 * ATURAN LABEL (hasil audit Round 8):
 * 1. PSH 3,75 = PARAMETER DESAIN INTERNAL, bukan rata-rata terukur
 *    resmi wilayah Jambi. Jangan menulis "rata-rata PSH Jambi"
 *    seolah-olah angka resmi/pengukuran.
 * 2. Kenaikan tarif 6%/tahun = ASUMSI SKENARIO SIMULASI — BUKAN
 *    rata-rata historis PLN (statistik tarif rumah tangga PLN
 *    2017–2024 ≈ 1–2%/tahun CAGR) dan BUKAN prediksi tarif.
 * 3. Penghematan = min(produksi surya, pemakaian PLN) × tingkat
 *    pemanfaatan (self-consumption) × tarif — TIDAK PERNAH 100%
 *    produksi otomatis menjadi penghematan.
 * 4. Rentang penghematan (50–90% dsb.) = KISARAN SKENARIO berdasarkan
 *    profil beban, bukan hasil pengukuran empiris.
 */

/** Parameter desain standar situs — dipakai kalkulator & semua estimasi. */
export const DESIGN_PARAMS = {
  /**
   * Peak Sun Hours — parameter desain internal untuk wilayah Jambi.
   * Bukan angka resmi terukur; untuk pembanding, studi World Bank/ESMAP
   * memberikan specific yield Jambi ± 3,4 kWh/kWp/hari (PR ± 76,7%).
   */
  pshJambi: 3.75,
  /** Efisiensi sistem (losses kabel, suhu, konversi inverter, baterai). */
  systemEfficiency: 0.8,
  /** Produksi listrik per kWp per hari = PSH × efisiensi (kWh). */
  kWhPerKwpPerDay: 3.75 * 0.8, // ≈ 3 kWh/hari/kWp
  /** Tarif PLN default (R-1 1300VA+, non-subsidi) — Rp/kWh. */
  plnTariffPerKwh: 1444.7,
  /**
   * Asumsi skenario kenaikan tarif PLN per tahun untuk simulasi ROI.
   * SCENARIO ASSUMPTION — bukan rata-rata historis PLN (statistik PLN
   * 2017–2024: tarif rumah tangga naik ± 1–2%/tahun CAGR) dan bukan
   * prediksi. Dipakai agar simulasi ROI konservatif-optimis terlihat
   * jelas; pembaca bisa menilai sendiri sensitivitasnya.
   */
  plnIncreaseRatePerYear: 0.06,
  /**
   * Tingkat pemanfaatan energi surya (self-consumption) default untuk
   * simulasi ROI — profil "campuran + baterai". Lihat
   * SELF_CONSUMPTION_PROFILES untuk rentang per profil beban.
   */
  selfConsumptionDefault: 0.8,
  /** Kapasitas 1 unit baterai LiFePO4 48V 100Ah (kWh). */
  batteryUnitKwh: 4.8,
} as const;

/**
 * Profil pemanfaatan energi surya — parameter eksplisit kalkulator ROI
 * (audit Round 8: jangan asumsikan 100% produksi = penghematan).
 *
 * Penghematan = min(produksi surya, pemakaian PLN) × rate × tarif.
 */
export const SELF_CONSUMPTION_PROFILES = [
  {
    id: "siang",
    label: "Dominan siang",
    shortLabel: "Siang",
    rate: 0.9,
    desc: "Beban utama berjalan di jam produksi surya (pompa, usaha jam kerja, produksi) — sebagian besar produksi langsung terpakai.",
  },
  {
    id: "campuran",
    label: "Campuran + baterai",
    shortLabel: "Campuran",
    rate: DESIGN_PARAMS.selfConsumptionDefault,
    desc: "Beban terbagi siang–malam dengan baterai sesuai rekomendasi (menampung kelebihan produksi untuk malam hari).",
  },
  {
    id: "malam",
    label: "Dominan malam",
    shortLabel: "Malam",
    rate: 0.5,
    desc: "Rumah/pihak yang hampir kosong di siang hari dan tanpa baterai memadai — banyak produksi tidak terpakai saat dihasilkan.",
  },
] as const;

export type SelfConsumptionProfileId =
  (typeof SELF_CONSUMPTION_PROFILES)[number]["id"];

/**
 * Rentang penghematan tagihan — KISARAN SKENARIO berdasarkan profil
 * beban (peta ke SELF_CONSUMPTION_PROFILES), bukan hasil pengukuran
 * empiris proyek.
 */
export const SAVINGS_RANGES = {
  residential: {
    low: 50,
    high: 90,
    lowWhen:
      "pemakaian listrik dominan malam hari dan kapasitas baterai terbatas (profil pemanfaatan rendah)",
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

/** Catatan bahwa rentang adalah skenario, bukan hasil ukur. */
export const SAVINGS_RANGE_NOTE =
  "Rentang ini adalah kisaran skenario berdasarkan profil beban — bukan hasil pengukuran proyek aktual.";

/** Asumsi baku yang dirender di MethodologyNote (urutan tetap). */
export const CORE_ASSUMPTIONS = [
  {
    label: "Produksi 1 kWp",
    value:
      "± 3 kWh/hari (parameter desain internal: PSH 3,75 jam × efisiensi sistem 80%)",
  },
  {
    label: "Tarif listrik acuan",
    value: "Rp 1.444,7/kWh (golongan R-1 1300VA+, non-subsidi)",
  },
  {
    label: "Kenaikan tarif PLN",
    value:
      "Asumsi skenario simulasi: 6% per tahun — bukan rata-rata historis PLN dan bukan prediksi tarif",
  },
  {
    label: "Pemanfaatan energi",
    value:
      "Penghematan = min(produksi surya, pemakaian) × tingkat pemanfaatan profil beban (50–90%) × tarif",
  },
] as const;

/**
 * Rumus penghematan bulanan (teks, untuk ditampilkan).
 * Penghematan = energi surya terpakai (kWh) × tarif PLN (Rp/kWh).
 */
export const SAVINGS_FORMULA =
  "Penghematan/bulan = min(produksi surya, pemakaian listrik) × tingkat pemanfaatan × tarif listrik (Rp/kWh)";

/** Catatan batasan wajib untuk setiap klaim angka. */
export const CLAIM_DISCLAIMERS = [
  "Angka adalah estimasi simulasi dengan parameter desain di atas — bukan hasil pengukuran proyek Anda.",
  "Hasil aktual bergantung pada profil beban, arah & kemiringan atap, shading, dan cuaca di lokasi.",
  "Simulasi spesifik properti Anda (input beban per peralatan) tersedia gratis lewat kalkulator atau survei lokasi.",
] as const;
