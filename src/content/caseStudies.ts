/**
 * Studi kasus proyek PLTS.
 *
 * ATURAN DATA: Seluruh data diambil dari konten yang SUDAH ADA di situs
 * (portofolio & testimoni di SocialProofSection). Tidak ada klaim baru
 * yang tidak bersumber. Field tanpa datainternal tidak diisi (opsional).
 * Estimasi produksi dihitung dengan parameter desain standar situs:
 * PSH Jambi 3.75 jam × efisiensi sistem 80% ≈ 3 kWh/hari per kWp.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  /** Ringkasan 1 kalimat untuk kartu & meta description. */
  summary: string;
  /** Kategori untuk badge. */
  segment: "Residential" | "Commercial" | "Agriculture";
  lokasi: string;
  jenisBangunan: string;
  kapasitasKwp: number;
  jenisSistem: "Hybrid" | "Off-Grid";
  /** Beban/listrik yang dilayani sistem. */
  profilBeban: string[];
  masalahAwal: string;
  solusiDesain: string;
  hasil: { label: string; value: string }[];
  /** Estimasi produksi berdasarkan parameter desain (kWh/hari), jika ingin ditampilkan. */
  estimasiProduksiHarian?: string;
  /** Testimoni terkait dari konten yang ada (opsional). */
  testimoni?: { quote: string; nama: string; peran: string };
  image: string;
  imageAlt: string;
  /** Layanan terkait untuk internal linking. */
  relatedService: { label: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "villa-jambi-5-kwp-hybrid",
    title: "Villa Premium Jambi — PLTS Hybrid 5 kWp",
    summary:
      "Instalasi PLTS hybrid 5 kWp untuk villa eksklusif dengan kolam renang dan garden lighting — tagihan listrik turun dari Rp 4 juta menjadi Rp 500 ribu per bulan.",
    segment: "Residential",
    lokasi: "Jambi",
    jenisBangunan: "Villa (kolam renang & garden lighting)",
    kapasitasKwp: 5,
    jenisSistem: "Hybrid",
    profilBeban: [
      "Pompa kolam renang",
      "Garden lighting",
      "Kebutuhan listrik villa sehari-hari",
    ],
    masalahAwal:
      "Tagihan listrik villa mencapai Rp 4 juta per bulan akibat pemakaian pompa kolam dan pencahayaan taman yang berjalan hampir sepanjang waktu.",
    solusiDesain:
      "Sistem PLTS hybrid 5 kWp dipasang untuk men-supply beban utama villa di siang hari, sementara grid PLN tetap terhubung sebagai cadangan. Sistem hybrid dipilih agar villa tetap mendapat listrik dari PLN saat produksi surya berkurang.",
    hasil: [
      { label: "Tagihan sebelum", value: "Rp 4 juta/bulan" },
      { label: "Tagihan sesudah", value: "Rp 500 ribu/bulan" },
      { label: "Penghematan", value: "± Rp 3,5 juta/bulan" },
    ],
    estimasiProduksiHarian: "± 15 kWh/hari (estimasi desain: 5 kWp × 3,75 PSH × 80% efisiensi)",
    testimoni: {
      quote:
        "Sejak pasang panel surya dari Jambi Solar Panel, tagihan listrik villa saya turun drastis. Pemasangan rapi, tim profesional, dan respon cepat. Sangat recommended!",
      nama: "Bapak Hendra",
      peran: "Pemilik Villa, Jambi",
    },
    image: "/portfolio-residential.jpg",
    imageAlt:
      "Instalasi PLTS hybrid 5 kWp di atap villa premium — Jambi Solar Panel",
    relatedService: { label: "Panel Surya Rumah", href: "/solar-home" },
  },
  {
    slug: "kebun-sawit-riau-10-kwp-off-grid",
    title: "Kebun Sawit Riau — PLTS Off-Grid 10 kWp",
    summary:
      "Sistem PLTS off-grid 10 kWp untuk kebun sawit di Riau yang tidak terjangkau jaringan PLN — pompa air, CCTV, dan pondok kebun kini beroperasi 24 jam tanpa genset.",
    segment: "Agriculture",
    lokasi: "Riau",
    jenisBangunan: "Kebun sawit (pondok kebun & area produksi)",
    kapasitasKwp: 10,
    jenisSistem: "Off-Grid",
    profilBeban: [
      "Pompa air untuk kebun",
      "CCTV keamanan 24 jam",
      "Listrik pondok kebun",
    ],
    masalahAwal:
      "Lokasi kebun jauh dari jangkauan jaringan PLN. Selama ini operasional bergantung pada genset dengan biaya BBM ± Rp 12 juta per bulan, belum termasuk biaya perawatan genset dan risiko pasokan bahan bakar ke lokasi terpencil.",
    solusiDesain:
      "Sistem PLTS off-grid 10 kWp dirancang untuk kemandirian penuh: panel surya mengisi baterai penyimpanan di siang hari, dan beban pompa, CCTV, serta pondok kebun dilayani dari baterai pada malam hari. Tidak ada koneksi PLN sama sekali.",
    hasil: [
      { label: "Biaya sebelum (genset)", value: "Rp 12 juta/bulan" },
      { label: "Biaya sesudah", value: "Rp 0 — listrik mandiri" },
      { label: "Penghematan", value: "± Rp 8 juta/bulan (di luar biaya perawatan genset)" },
      { label: "Keandalan", value: "Listrik & CCTV aktif 24 jam" },
    ],
    estimasiProduksiHarian: "± 30 kWh/hari (estimasi desain: 10 kWp × 3,75 PSH × 80% efisiensi)",
    testimoni: {
      quote:
        "Kebun saya jauh dari PLN, selama ini pakai genset yang boros. Dengan sistem off-grid dari Jambi Solar Panel, sekarang CCTV dan pompa air saya jalan 24 jam tanpa masalah.",
      nama: "Bapak Darmawan",
      peran: "Pemilik Kebun Sawit, Riau",
    },
    image: "/portfolio-plantation.jpg",
    imageAlt:
      "Instalasi PLTS off-grid 10 kWp untuk kebun sawit di Riau — Jambi Solar Panel",
    relatedService: { label: "Solar Pump untuk Kebun", href: "/solar-pump" },
  },
  {
    slug: "gudang-palembang-50-kwp-hybrid",
    title: "Gudang Industri Palembang — PLTS Hybrid 50 kWp (Custom)",
    summary:
      "Sistem PLTS hybrid 50 kWp custom untuk pergudangan modern di Palembang — mengurangi biaya operasional listrik hingga 60%.",
    segment: "Commercial",
    lokasi: "Palembang",
    jenisBangunan: "Gudang industri modern",
    kapasitasKwp: 50,
    jenisSistem: "Hybrid",
    profilBeban: [
      "Pencahayaan gudang",
      "Peralatan operasional pergudangan",
    ],
    masalahAwal:
      "Biaya listrik operasional gudang yang tinggi dengan pemakaian beban di jam kerja siang hingga sore.",
    solusiDesain:
      "Sistem hybrid 50 kWp dirancang custom (di luar katalog paket standar) mengikuti profil beban gudang. Produksi surya di siang hari langsung memotong konsumsi dari grid PLN pada jam kerja.",
    hasil: [
      { label: "Biaya operasional", value: "Berkurang ± 60%" },
      { label: "Skema", value: "Paket custom di luar katalog standar" },
    ],
    estimasiProduksiHarian: "± 150 kWh/hari (estimasi desain: 50 kWp × 3,75 PSH × 80% efisiensi)",
    image: "/portfolio-industrial.jpg",
    imageAlt:
      "Instalasi PLTS hybrid 50 kWp untuk gudang industri di Palembang — Jambi Solar Panel",
    relatedService: { label: "PLTS Bisnis & Industri", href: "/solar-commercial" },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
