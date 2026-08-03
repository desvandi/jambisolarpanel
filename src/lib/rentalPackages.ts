/* ============================================================
   SEWA PLTS CONFIG — Solar as a Service (SaaS)
   PT. Jaya Mandiri Smart Energy — Jambi Solar Panel

   Single source of truth untuk seluruh konten halaman /sewa-plts.
   Owner cukup mengubah file ini untuk:
   - Mengubah harga sewa bulanan
   - Menambah / menonaktifkan paket
   - Mengubah pesan WhatsApp (CTA)
   - Mengubah FAQ
   - Mengubah data perbandingan Beli vs Sewa
   ============================================================ */

/** Nomor WhatsApp tujuan (CS Jambi Solar Panel). */
export const RENTAL_WA_NUMBER = "6281328190707";

/** Pesan default yang terisi otomatis ketika user klik tombol WhatsApp. */
export const RENTAL_DEFAULT_WA_MESSAGE =
  "Halo Jambi Solar Panel.\n\n" +
  "Saya tertarik dengan program Sewa PLTS.\n" +
  "Mohon konsultasi mengenai paket yang cocok untuk rumah saya.\n\n" +
  "Terima kasih.";

/** Membangun URL WhatsApp dengan pesan tertentu. */
export function buildWhatsAppUrl(message: string = RENTAL_DEFAULT_WA_MESSAGE): string {
  return `https://wa.me/${RENTAL_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Konfigurasi global program Sewa PLTS. */
export const rentalProgramConfig = {
  /** Nama brand program. */
  programName: "Solar as a Service",
  /** Sub-badge pada hero. */
  subBrand: "Jambi Solar Rent",
  /** Sistem yang ditawarkan. */
  systemType: "PLTS Hybrid Off-Grid",
  /** Kontrak minimum (bulan). */
  minContractMonths: 12,
  /** PSH Jambi (jam/hari). */
  pshHours: 3.75,
  /** Efisiensi sistem. */
  systemEfficiency: 0.8,
  /**
   * Konfigurasi cicilan biaya instalasi.
   *
   * Biaya instalasi (pengadaan + pemasangan + bongkar akhir kontrak)
   * dapat dicicil selama maksimal `maxMonths` bulan. Selama periode
   * cicilan, user membayar: harga sewa bulanan + (biaya instalasi / maxMonths).
   *
   * Setelah periode cicilan selesai, user hanya membayar harga sewa
   * bulanan normal.
   */
  installationInstallment: {
    /** Maksimal bulan cicilan untuk biaya instalasi. */
    maxMonths: 2,
    /** Persentase diskon tahunan jika user bayar 12 bulan di muka (0-1). */
    annualPrepayDiscount: 0.0, // set > 0 untuk promo bayar tahunan
  },
} as const;

/**
 * Tarif bertingkat (tiered) untuk jasa instalasi awal + bongkar akhir sewa.
 *
 * Sudah mencakup:
 *   - Survei, desain, engineering
 *   - Pemasangan panel, inverter, baterai, mounting, proteksi
 *   - Commissioning & testing
 *   - Pembongkaran/percabutan equipment saat kontrak berakhir
 *
 * Tarif per tier (tidak lagi per-kWp):
 *   - Paket 1 – 3 kWp  : Rp 2.000.000
 *   - Paket 4 – 7 kWp  : Rp 5.000.000
 *   - Paket 8 – 10 kWp : Rp 8.000.000
 *
 * Owner dapat memperbarui angka di sini tanpa mengubah file lain.
 */
export interface InstallationTier {
  /** Rentang kWp minimum (inklusif). */
  minKwp: number;
  /** Rentang kWp maksimum (inklusif). */
  maxKwp: number;
  /** Biaya instalasi untuk tier ini (Rupiah). */
  fee: number;
  /** Label tier untuk ditampilkan di UI. */
  label: string;
}

export const installationFeeTiers: InstallationTier[] = [
  { minKwp: 1, maxKwp: 3, fee: 2_000_000, label: "Paket 1 – 3 kWp" },
  { minKwp: 4, maxKwp: 7, fee: 5_000_000, label: "Paket 4 – 7 kWp" },
  { minKwp: 8, maxKwp: 10, fee: 8_000_000, label: "Paket 8 – 10 kWp" },
];

/**
 * Hitung biaya instalasi untuk sebuah paket berdasarkan kWp.
 * Menggunakan tier lookup: paket 1-3 kWp = Rp 2jt, 4-7 kWp = Rp 5jt, 8-10 kWp = Rp 8jt.
 * Jika kWp di atas 10, gunakan tier tertinggi.
 */
export function getInstallationFee(kWp: number): number {
  for (const tier of installationFeeTiers) {
    if (kWp >= tier.minKwp && kWp <= tier.maxKwp) {
      return tier.fee;
    }
  }
  // Jika kWp > 10, gunakan tier tertinggi
  if (kWp > installationFeeTiers[installationFeeTiers.length - 1].maxKwp) {
    return installationFeeTiers[installationFeeTiers.length - 1].fee;
  }
  // Fallback: tier terendah
  return installationFeeTiers[0].fee;
}

/**
 * Ambil tier instalasi untuk sebuah paket (untuk label UI).
 */
export function getInstallationTier(kWp: number): InstallationTier {
  for (const tier of installationFeeTiers) {
    if (kWp >= tier.minKwp && kWp <= tier.maxKwp) {
      return tier;
    }
  }
  if (kWp > installationFeeTiers[installationFeeTiers.length - 1].maxKwp) {
    return installationFeeTiers[installationFeeTiers.length - 1];
  }
  return installationFeeTiers[0];
}

/**
 * Hitung cicilan bulanan biaya instalasi.
 *
 * Cicilan = biaya instalasi / maxMonths (dibagi rata selama periode cicilan).
 * Pada bulan ke-1..maxMonths, user membayar: sewa bulanan + cicilan.
 * Setelah bulan maxMonths, user hanya membayar sewa bulanan.
 *
 * @param kWp - Kapasitas paket
 * @returns Object { installmentPerMonth, months } — null jika tidak ada cicilan
 */
export function getInstallationInstallment(kWp: number): {
  installmentPerMonth: number;
  months: number;
  totalInstallment: number;
} | null {
  const maxMonths = rentalProgramConfig.installationInstallment.maxMonths;
  if (maxMonths <= 0) return null;
  const total = getInstallationFee(kWp);
  if (total <= 0) return null;
  return {
    installmentPerMonth: Math.ceil(total / maxMonths / 1000) * 1000, // bulatkan ke ribuan
    months: maxMonths,
    totalInstallment: total,
  };
}

/**
 * Hitung total tagihan bulan ke-N untuk sebuah paket.
 *
 * Bulan 1..maxMonths: sewa + cicilan instalasi
 * Bulan > maxMonths: sewa saja
 */
export function getMonthlyBill(kWp: number, monthlyPrice: number, monthIndex: number): number {
  const installment = getInstallationInstallment(kWp);
  if (installment && monthIndex <= installment.months) {
    return monthlyPrice + installment.installmentPerMonth;
  }
  return monthlyPrice;
}

/** Kategori paket untuk filter di UI. */
export type PackageCategory = "rumah" | "bisnis" | "industri";

/** Definisi satu paket sewa PLTS. */
export interface RentalPackage {
  /** Identifier unik (slug-friendly). */
  id: string;
  /** Nama paket yang ditampilkan. */
  name: string;
  /** Kapasitas panel dalam kWp. */
  kWp: number;
  /** Kapasitas baterai dalam kWh. */
  storageKwh: number;
  /** Harga sewa bulanan (Rupiah, sudah dibulatkan ke atas ke puluhan ribu, termasuk PPN). */
  monthlyPrice: number;
  /** Harga sewa tahunan (Rupiah, dibayar di muka, sudah termasuk PPN). */
  annualPrice: number;
  /** Kategori paket untuk filter (rumah / bisnis / industri). */
  category: PackageCategory;
  /** Deskripsi singkat paket. */
  description: string;
  /** Estimasi pemakaian yang cocok (kWh/bulan). */
  estimatedMonthlyKwh: string;
  /** Estimasi penghematan tagihan listrik. */
  savingsRange: string;
  /** Fitur unggulan paket. */
  features: string[];
  /** CTA text pada tombol WhatsApp. */
  ctaLabel: string;
  /** Pesan WhatsApp khusus paket (opsional). */
  waMessage?: string;
  /** Tandai paket sebagai "Paling Populer". */
  popular?: boolean;
  /** Status aktif/nonaktif. false = disembunyikan dari halaman. */
  active: boolean;
}

/** Konfigurasi kategori paket untuk filter UI. */
export const packageCategories: {
  id: PackageCategory | "all";
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: "all",
    label: "Semua Paket",
    description: "Tampilkan seluruh 10 paket dari 1 – 10 kWp",
    icon: "LayoutGrid",
  },
  {
    id: "rumah",
    label: "Rumah",
    description: "1 – 4 kWp — rumah kecil hingga besar",
    icon: "Home",
  },
  {
    id: "bisnis",
    label: "Bisnis",
    description: "5 – 7 kWp — kos, villa, ruko, restoran",
    icon: "Building2",
  },
  {
    id: "industri",
    label: "Industri",
    description: "8 – 10 kWp — workshop, pabrik, hotel, fasilitas besar",
    icon: "Factory",
  },
];

/**
 * Daftar paket sewa PLTS (1 kWp – 10 kWp).
 *
 * Harga sewa bulanan sudah dibulatkan ke atas ke puluhan ribu terdekat.
 * Harga sewa tahunan diambil dari tabel owner (sudah total diskon vs 12× bulanan).
 * Biaya instalasi (pengadaan + jasa instalasi + bongkar akhir kontrak) diambil
 * dari `installationFeeByKwp` di atas — bisa dicicil maksimal 2 bulan.
 *
 * Cara mengubah harga:
 *   - Untuk harga sewa: ubah `monthlyPrice` & `annualPrice` di paket terkait.
 *   - Untuk biaya instalasi: ubah di `installationFeeByKwp` mapping di atas.
 *   Tidak perlu mengubah file lain.
 *
 * Cara menonaktifkan paket:
 *   Set `active: false`.
 */
export const rentalPackages: RentalPackage[] = [
  {
    id: "starter",
    name: "Starter",
    kWp: 1,
    storageKwh: 5.12,
    monthlyPrice: 960_000,
    annualPrice: 10_950_612,
    category: "rumah",
    description:
      "Paket awal untuk rumah kecil atau apartemen. Cocok untuk beban ringan seperti lampu, kulkas, TV, dan kipas.",
    estimatedMonthlyKwh: "90 – 120 kWh",
    savingsRange: "Hemat hingga Rp 300rb/bulan",
    features: [
      "1 kWp Panel Surya LONGi",
      "Baterai LiFePO4 5.12 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
    ],
    ctaLabel: "Tanya Paket Starter",
    active: true,
  },
  {
    id: "home",
    name: "Home",
    kWp: 2,
    storageKwh: 10.24,
    monthlyPrice: 1_720_000,
    annualPrice: 19_711_102,
    category: "rumah",
    description:
      "Paket terpopuler untuk rumah keluarga. Mendukung AC 1 PK, kulkas, TV, mesin cuci, dan pompa air.",
    estimatedMonthlyKwh: "180 – 240 kWh",
    savingsRange: "Hemat hingga Rp 550rb/bulan",
    features: [
      "2 kWp Panel Surya LONGi",
      "Baterai LiFePO4 10.24 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
    ],
    ctaLabel: "Tanya Paket Home",
    popular: true,
    active: true,
  },
  {
    id: "family",
    name: "Family",
    kWp: 3,
    storageKwh: 15.36,
    monthlyPrice: 2_400_000,
    annualPrice: 27_595_542,
    category: "rumah",
    description:
      "Untuk keluarga dengan 2 AC, kulkas besar, water heater, dan peralatan rumah tangga modern lainnya.",
    estimatedMonthlyKwh: "270 – 360 kWh",
    savingsRange: "Hemat hingga Rp 800rb/bulan",
    features: [
      "3 kWp Panel Surya LONGi",
      "Baterai LiFePO4 15.36 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
    ],
    ctaLabel: "Tanya Paket Family",
    active: true,
  },
  {
    id: "premium",
    name: "Premium",
    kWp: 4,
    storageKwh: 20.48,
    monthlyPrice: 3_080_000,
    annualPrice: 35_479_983,
    category: "rumah",
    description:
      "Untuk rumah besar dengan 3–4 AC, peralatan smart home, dan kebutuhan listrik tinggi sepanjang hari.",
    estimatedMonthlyKwh: "360 – 480 kWh",
    savingsRange: "Hemat hingga Rp 1jt/bulan",
    features: [
      "4 kWp Panel Surya LONGi",
      "Baterai LiFePO4 20.48 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
    ],
    ctaLabel: "Tanya Paket Premium",
    active: true,
  },
  {
    id: "business",
    name: "Business",
    kWp: 5,
    storageKwh: 25.6,
    monthlyPrice: 3_730_000,
    annualPrice: 42_926_399,
    category: "bisnis",
    description:
      "Untuk rumah besar, kos-kosan, atau bisnis kecil. Mendukung beban komersial seperti AC 5 PK dan kantor.",
    estimatedMonthlyKwh: "450 – 600 kWh",
    savingsRange: "Hemat hingga Rp 1.3jt/bulan",
    features: [
      "5 kWp Panel Surya LONGi",
      "Baterai LiFePO4 25.6 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
    ],
    ctaLabel: "Tanya Paket Business",
    active: true,
  },
  {
    id: "estate",
    name: "Estate",
    kWp: 6,
    storageKwh: 30.72,
    monthlyPrice: 4_340_000,
    annualPrice: 49_934_791,
    category: "bisnis",
    description:
      "Untuk rumah mewah, villa, atau guest house dengan banyak AC dan peralatan premium berjalan serentak.",
    estimatedMonthlyKwh: "540 – 720 kWh",
    savingsRange: "Hemat hingga Rp 1.6jt/bulan",
    features: [
      "6 kWp Panel Surya LONGi",
      "Baterai LiFePO4 30.72 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
    ],
    ctaLabel: "Tanya Paket Estate",
    active: true,
  },
  {
    id: "villa",
    name: "Villa",
    kWp: 7,
    storageKwh: 35.84,
    monthlyPrice: 4_910_000,
    annualPrice: 56_505_158,
    category: "bisnis",
    description:
      "Untuk villa, homestay, atau properti komersial menengah dengan tingkat okupansi tinggi dan beban listrik besar.",
    estimatedMonthlyKwh: "630 – 840 kWh",
    savingsRange: "Hemat hingga Rp 1.8jt/bulan",
    features: [
      "7 kWp Panel Surya LONGi",
      "Baterai LiFePO4 35.84 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
      "Quarterly performance review",
    ],
    ctaLabel: "Tanya Paket Villa",
    active: true,
  },
  {
    id: "commercial",
    name: "Commercial",
    kWp: 8,
    storageKwh: 40.96,
    monthlyPrice: 5_440_000,
    annualPrice: 62_637_500,
    category: "industri",
    description:
      "Untuk ruko, restoran, atau kantor kecil dengan operasional 12 jam/hari dan kebutuhan listrik komersial.",
    estimatedMonthlyKwh: "720 – 960 kWh",
    savingsRange: "Hemat hingga Rp 2jt/bulan",
    features: [
      "8 kWp Panel Surya LONGi",
      "Baterai LiFePO4 40.96 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
      "Quarterly performance review",
    ],
    ctaLabel: "Tanya Paket Commercial",
    active: true,
  },
  {
    id: "industrial",
    name: "Industrial",
    kWp: 9,
    storageKwh: 46.08,
    monthlyPrice: 5_940_000,
    annualPrice: 68_331_819,
    category: "industri",
    description:
      "Untuk bengkel, workshop, atau pabrik kecil dengan motor listrik, mesin produksi, dan beban industri ringan.",
    estimatedMonthlyKwh: "810 – 1.080 kWh",
    savingsRange: "Hemat hingga Rp 2.3jt/bulan",
    features: [
      "9 kWp Panel Surya LONGi",
      "Baterai LiFePO4 46.08 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
      "Quarterly performance review",
      "SLA respons 4 jam",
    ],
    ctaLabel: "Tanya Paket Industrial",
    active: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    kWp: 10,
    storageKwh: 51.2,
    monthlyPrice: 6_850_000,
    annualPrice: 78_844_406,
    category: "industri",
    description:
      "Untuk pabrik menengah, hotel, atau fasilitas besar dengan beban listrik 24/7 dan kebutuhan redundansi tinggi.",
    estimatedMonthlyKwh: "900 – 1.200 kWh",
    savingsRange: "Hemat hingga Rp 2.6jt/bulan",
    features: [
      "10 kWp Panel Surya LONGi",
      "Baterai LiFePO4 51.2 kWh",
      "Inverter Hybrid Powmr",
      "Instalasi profesional",
      "Maintenance berkala",
      "Backup saat PLN padam",
      "Prioritas dukungan teknis",
      "Monitoring smart IoT",
      "Konsultan energi dedikated",
      "Quarterly performance review",
      "SLA respons 4 jam",
      "Dedicated account manager",
    ],
    ctaLabel: "Tanya Paket Enterprise",
    active: true,
  },
];

/**
 * Daftar keunggulan program Sewa PLTS (Solar as a Service).
 *
 * Dua manfaat UTAMA yang ditonjolkan diurutan pertama:
 *   1. Backup saat PLN padam  — sistem otomatis mengambil alih beban.
 *   2. Turunkan tagihan listrik — jadwal timer menghemat pemakaian PLN.
 *
 * Dua manfaat ini adalah diferensiator utama vs kompetitor yang PLTS-nya
 * hanya sebagai penghemat (tidak bisa backup) atau hanya backup
 * (tidak hemat tagihan).
 */
export const rentalBenefits: { icon: string; title: string; desc: string }[] = [
  {
    icon: "ShieldCheck",
    title: "Backup Otomatis Saat PLN Padam",
    desc: "Saat grid PLN mati, sistem otomatis mengalihkan beban rumah ke inverter & baterai dalam hitungan detik. Lampu, kulkas, dan peralatan penting tetap menyala — tanpa genset, tanpa UPS tambahan, tanpa kepanikan.",
  },
  {
    icon: "TrendingDown",
    title: "Tagihan Listrik Bulanan Turun",
    desc: "Beban rumah dialihkan ke surya & baterai pada jam-jam sibuk tarif PLN. Hasilnya: tagihan PLN turun signifikan setiap bulan, sementara biaya sewa tetap dan dapat diprediksi.",
  },
  {
    icon: "Wallet",
    title: "Tanpa Investasi Besar",
    desc: "Nikmati PLTS tanpa perlu mengeluarkan puluhan juta rupiah di depan. Cukup bayar biaya sewa bulanan terjangkau, langsung nikmati manfaat hari ini.",
  },
  {
    icon: "Wrench",
    title: "Instalasi Profesional",
    desc: "Tim teknisi bersertifikat memasang sistem sesuai standar K3 dan SNI. Survei, desain, dan commissioning gratis — termasuk konfigurasi timer & relay optimal untuk rumah Anda.",
  },
  {
    icon: "ShieldCheck",
    title: "Maintenance Tersedia",
    desc: "Pemeliharaan rutin dan perbaikan selama masa kontrak ditangani oleh tim kami. Tanpa biaya tersembunyi, tanpa kejutan tagihan servis.",
  },
  {
    icon: "ArrowUpCircle",
    title: "Bisa Upgrade Kapasitas",
    desc: "Kebutuhan listrik bertambah? Kapasitas dapat ditingkatkan sesuai kebutuhan tanpa memulai dari nol. Fleksibilitas penuh selama masa kontrak.",
  },
];

/** Satu baris perbandingan Beli vs Sewa. */
export interface ComparisonRow {
  /** Aspek yang dibandingkan. */
  aspect: string;
  /** Sisi "Beli PLTS". */
  buy: string;
  /** Sisi "Sewa PLTS". */
  rent: string;
  /** "rent" | "buy" | null — pihak yang lebih unggul. */
  winner: "rent" | "buy" | null;
}

/** Data perbandingan Beli PLTS vs Sewa PLTS. */
export const rentalComparison: ComparisonRow[] = [
  {
    aspect: "Investasi Awal",
    buy: "Rp 25 – 180 juta (sesuai kapasitas, bayar penuh)",
    rent: "Rp 2 – 8 juta (tier 1-3 / 4-7 / 8-10 kWp, bisa cicil 2 bulan)",
    winner: "rent",
  },
  {
    aspect: "Biaya Bulanan",
    buy: "Hanya tagihan PLN sisa (kecil)",
    rent: "Tagihan PLN sisa + sewa (Rp 960rb – Rp 6,85jt/bulan)",
    winner: "buy",
  },
  {
    aspect: "Pembayaran Fleksibel",
    buy: "Tidak ada — harus lunas di awal",
    rent: "Bulanan atau tahunan (lebih hemat), instalasi cicil 2 bulan",
    winner: "rent",
  },
  {
    aspect: "Backup Saat PLN Padam",
    buy: "Hanya jika beli paket baterai tambahan (mahal)",
    rent: "Sudah termasuk — otomatis switch ke baterai",
    winner: "rent",
  },
  {
    aspect: "Penghematan Tagihan",
    buy: "Ya, tapi butuh konfigurasi sendiri (rumit)",
    rent: "Sudah dikonfigurasi optimal oleh tim kami",
    winner: "rent",
  },
  {
    aspect: "Maintenance",
    buy: "Biaya sendiri saat rusak (Rp 500rb – jutaan)",
    rent: "Sudah termasuk dalam paket sewa",
    winner: "rent",
  },
  {
    aspect: "Risiko Kerusakan",
    buy: "Menanggung sendiri kerusakan komponen",
    rent: "Ditanggung pemilik (Jambi Solar Panel)",
    winner: "rent",
  },
  {
    aspect: "Upgrade Kapasitas",
    buy: "Beli komponen tambahan, investasi baru",
    rent: "Cukup upgrade paket sewa, fleksibel",
    winner: "rent",
  },
  {
    aspect: "Cashflow",
    buy: "Modal besar di awal, kas terkunci",
    rent: "Arus kas sehat, biaya operasional bulanan",
    winner: "rent",
  },
  {
    aspect: "Kepemilikan",
    buy: "Milik penuh sejak hari pertama",
    rent: "Milik Jambi Solar Panel (bisa beli nanti)",
    winner: "buy",
  },
  {
    aspect: "Garansi & Support",
    buy: "Garansi pabrikan, klaim sendiri",
    rent: "Garansi & support satu pintu via JMSE",
    winner: "rent",
  },
];

/** Item FAQ untuk halaman Sewa PLTS. */
export interface RentalFaqItem {
  question: string;
  answer: string;
}

/** Daftar FAQ Sewa PLTS. */
export const rentalFaqs: RentalFaqItem[] = [
  {
    question: "Apakah alat PLTS menjadi milik saya?",
    answer:
      "Selama masa kontrak sewa, seluruh peralatan (panel, inverter, baterai, mounting) tetap menjadi milik PT. Jaya Mandiri Smart Energy. Anda menikmati manfaat listrik tenaga surya dengan membayar biaya sewa bulanan. Setelah kontrak selesai, Anda dapat memperpanjang, upgrade kapasitas, atau beralih ke skema sewa-milik (rent-to-own) yang akan kami tawarkan di masa mendatang.",
  },
  {
    question: "Bagaimana jika ada peralatan yang rusak?",
    answer:
      "Kerusakan akibat cacat komponen atau pemakaian normal sepenuhnya menjadi tanggung jawab kami. Tim teknisi akan datang untuk memperbaiki atau mengganti tanpa biaya tambahan selama masa kontrak. Anda cukup melaporkan via WhatsApp dan kami akan merespons sesuai SLA paket yang dipilih. Untuk kerusakan akibat kelalaian (misal modifikasi tanpa sepengetahuan kami), biaya perbaikan dapat dikenakan.",
  },
  {
    question: "Bagaimana jika saya pindah rumah?",
    answer:
      "Jika rumah baru masih dalam area layanan kami (Jambi, Riau, Palembang, Padang, Lampung, Bangka), sistem dapat dipindahkan dengan biaya relokasi yang akan dihitung berdasarkan jarak dan kompleksitas. Alternatif lain, kontrak dapat dialihkan ke penghuni baru rumah lama (subject to approval). Hubungi tim kami minimal 30 hari sebelum rencana pindah agar dapat kami bantu pilihkan opsi terbaik.",
  },
  {
    question: "Apakah saya bisa membeli sistem yang sudah disewa?",
    answer:
      "Ya. Kami sedang menyiapkan skema rent-to-own (sewa-milik) yang memungkinkan sebagian biaya sewa dihitung sebagai kredit terhadap harga beli. Detail skema ini akan diumumkan kemudian. Jika Anda tertarik membeli sekarang, hubungi kami — kami akan memberikan penawaran khusus untuk pelanggan sewa yang ingin beralih menjadi pemilik.",
  },
  {
    question: "Apakah sistem tetap bekerja saat PLN padam?",
    answer:
      "Ya, dan ini salah satu manfaat utama program kami. Saat PLN padam, sistem otomatis mengalihkan beban rumah Anda ke inverter dan baterai LiFePO4 dalam hitungan detik — lampu, kulkas, dan peralatan penting tetap menyala tanpa perlu genset atau UPS tambahan. Sistem ini dirancang dengan konfigurasi cerdas: ketika grid PLN kembali normal, beban otomatis kembali dipasok PLN. Durasi backup tergantung kapasitas baterai paket yang dipilih dan beban aktual rumah Anda, namun untuk pemakaian normal rumah tangga, baterai kami mampu memenuhi kebutuhan esensial selama pemadaman berjam-jam.",
  },
  {
    question: "Bagaimana sistem mengurangi tagihan listrik bulanan saya?",
    answer:
      "Selain sebagai backup, sistem dikonfigurasi untuk mengoptimalkan biaya listrik harian Anda. Pada jam-jam tertentu (misalnya malam hari saat tarif PLN tinggi atau saat baterai penuh), beban rumah otomatis dialihkan ke inverter sehingga pemakaian dari PLN berkurang. Hasilnya, tagihan PLN bulanan turun signifikan. Tim kami akan mengkonfigurasi jadwal switching yang optimal sesuai pola pemakaian rumah Anda — Anda tidak perlu pusing dengan setting teknis, cukup nikmati tagihan yang lebih hemat setiap bulan.",
  },
  {
    question: "Berapa lama kontrak minimum dan bagaimana pembayaran?",
    answer:
      "Kontrak minimum adalah 12 bulan, dengan opsi perpanjangan otomatis. Pembayaran sewa dapat dilakukan dua cara: (1) bulanan di awal bulan via transfer bank atau virtual account, atau (2) tahunan di muka dengan total harga tahunan yang sudah lebih hemat dibanding 12× harga bulanan. Tersedia juga berbagai opsi pembayaran fleksibel lain — hubungi tim kami untuk detail.",
  },
  {
    question: "Apakah ada biaya instalasi awal?",
    answer:
      "Ya, ada biaya jasa instalasi awal + bongkar akhir kontrak yang dibayar sekali di awal. Biayanya ditentukan oleh tier kapasitas paket, bukan per-kWp: paket 1 – 3 kWp (Starter, Home, Family) = Rp 2.000.000; paket 4 – 7 kWp (Premium, Business, Estate, Villa) = Rp 5.000.000; paket 8 – 10 kWp (Commercial, Industrial, Enterprise) = Rp 8.000.000. Biaya ini sudah mencakup survei, desain, engineering, pemasangan lengkap (panel, inverter, baterai, mounting, proteksi), commissioning & testing — sekaligus pembongkaran/percabutan equipment saat kontrak berakhir. Jadi tidak ada biaya tambahan untuk bongkar di akhir. Biayanya dapat dicicil maksimal 2 bulan.",
  },
  {
    question: "Apakah biaya instalasi bisa dicicil?",
    answer:
      "Ya, biaya instalasi dapat dicicil maksimal 2 bulan. Selama 2 bulan pertama kontrak, Anda membayar: harga sewa bulanan + (biaya instalasi ÷ 2). Contoh untuk paket Home 2 kWp (tier 1-3 kWp, biaya instalasi Rp 2.000.000): bulan 1 & 2 = Rp 1.720.000 (sewa) + Rp 1.000.000 (cicilan instalasi) = Rp 2.720.000/bulan. Mulai bulan ke-3, Anda hanya membayar Rp 1.720.000/bulan. Contoh lain untuk paket Business 5 kWp (tier 4-7 kWp, biaya instalasi Rp 5.000.000): bulan 1 & 2 = Rp 3.730.000 (sewa) + Rp 2.500.000 (cicilan) = Rp 6.230.000/bulan, lalu bulan 3+ = Rp 3.730.000/bulan. Skema ini membantu menjaga cashflow Anda di awal kontrak.",
  },
  {
    question: "Apakah ada opsi bayar tahunan?",
    answer:
      "Ya. Selain pembayaran bulanan, kami menyediakan opsi bayar tahunan di muka dengan total harga yang sudah lebih hemat dibanding 12× harga bulanan. Contoh untuk paket Home 2 kWp: pembayaran bulanan 12× Rp 1.720.000 = Rp 20.640.000/tahun, sedangkan bayar tahunan hanya Rp 19.711.102 (hemat sekitar Rp 929rb/tahun). Opsi ini cocok untuk Anda yang ingin mengunci biaya operasional setahun ke depan dan mendapatkan diskon. Hubungi tim kami untuk skema pembayaran tahunan paket lainnya.",
  },
  {
    question: "Apakah biaya instalasi bisa dikembalikan jika berhenti di tengah jalan?",
    answer:
      "Biaya instalasi bersifat non-refundable karena langsung digunakan untuk pekerjaan instalasi fisik (pengadaan material, tenaga kerja, commissioning) yang sudah dilakukan. Jika kontrak berakhir sesuai tenor, biaya bongkar sudah termasuk — tanpa biaya tambahan. Untuk terminasi dini sebelum kontrak minimum 12 bulan, ada penalti sesuai perjanjian yang akan dijelaskan saat penandatanganan kontrak. Hubungi tim kami untuk skenario khusus seperti relokasi rumah.",
  },
  {
    question: "Apakah ada survei sebelum pemasangan?",
    answer:
      "Ya, survei gratis adalah bagian dari layanan. Tim kami akan datang untuk mengecek kondisi atap, arah hadap, sudut kemiringan, kapasitas panel yang muat, serta pola konsumsi listrik Anda. Dari hasil survei, kami akan merekomendasikan paket yang paling sesuai — Anda bebas memilih atau menolak tanpa biaya.",
  },
  {
    question: "Apakah saya tetap membutuhkan PLN?",
    answer:
      "Ya, sistem ini bersifat Hybrid — tetap terhubung dengan PLN, namun peran PLN berubah dari sumber utama menjadi sumber sekunder. Saat produksi surya tinggi atau baterai penuh, beban rumah dipasok dari surya/inverter. Saat surya rendah (malam/hujan berkepanjangan), beban diambil dari baterai atau PLN. Konfigurasi ini memberi Anda tiga lapis keandalan: surya, baterai, dan PLN — sekaligus dua manfaat ganda: tagihan PLN turun dan rumah tetap menyala saat PLN padam. Anda tetap membayar tagihan PLN, namun jauh lebih kecil dari sebelumnya.",
  },
];

/** Konfigurasi hero section. */
export const rentalHero = {
  badge: "Solar as a Service — Bayar Bulanan",
  title: "Gunakan PLTS Sekarang. Bayarnya Bulanan.",
  subtitle:
    "Satu sistem, dua manfaat: tagihan listrik turun setiap bulan, dan rumah tetap menyala saat PLN padam. Cukup bayar biaya instalasi sekali di awal (mulai Rp 2jt — bisa dicicil 2 bulan, termasuk bongkar saat kontrak selesai), lalu bayar sewa bulanan mulai Rp 960 ribu.",
  primaryCta: "Hitung Paket Saya",
  secondaryCta: "Konsultasi WhatsApp",
  stats: [
    { label: "Sewa mulai dari", value: "Rp 960rb", suffix: "/bulan" },
    { label: "Instalasi mulai", value: "Rp 2jt", suffix: "sekali bayar" },
    { label: "Backup PLN padam", value: "Otomatis", suffix: "" },
    { label: "Hemat tagihan", value: "Hingga 90%", suffix: "" },
  ],
} as const;

/** Konfigurasi kalkulator sewa. */
export const rentalCalculatorConfig = {
  /**
   * Preset pemakaian listrik bulanan (kWh).
   * Diperluas hingga 3.000 kWh agar bisa men-triger rekomendasi paket besar
   * (Estate, Villa, Commercial, Industrial, Enterprise).
   */
  usagePresets: [
    { label: "200 kWh", value: 200 },
    { label: "400 kWh", value: 400 },
    { label: "600 kWh", value: 600 },
    { label: "900 kWh", value: 900 },
    { label: "1.200 kWh", value: 1200 },
    { label: "1.500 kWh", value: 1500 },
    { label: "1.800 kWh", value: 1800 },
    { label: "2.100 kWh", value: 2100 },
    { label: "2.400 kWh", value: 2400 },
    { label: "3.000 kWh", value: 3000 },
  ],
  /** Preset budget bulanan (Rupiah) — disesuaikan dengan harga sewa baru. */
  budgetPresets: [
    { label: "Rp 960rb", value: 960000 },
    { label: "Rp 1.72jt", value: 1720000 },
    { label: "Rp 2.4jt", value: 2400000 },
    { label: "Rp 3.08jt", value: 3080000 },
    { label: "Rp 3.73jt", value: 3730000 },
    { label: "Rp 4.34jt", value: 4340000 },
    { label: "Rp 4.91jt", value: 4910000 },
    { label: "Rp 5.44jt", value: 5440000 },
    { label: "Rp 5.94jt", value: 5940000 },
    { label: "Rp 6.85jt", value: 6850000 },
  ],
  /** Tarif PLN default (Rupiah/kWh) — R-1 1300VA+ non-subsidi. */
  plnTariffPerKwh: 1444,
  /** Batas minimum & maksimum input manual pemakaian (kWh). */
  usageMin: 50,
  usageMax: 5000,
  /** Batas minimum & maksimum input manual budget (Rupiah). */
  budgetMin: 500000,
  budgetMax: 10_000_000,
} as const;

/** Helper: format Rupiah penuh (Rp 1.150.000). */
export function formatRentalRp(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

/** Helper: format Rupiah ringkas (Rp 1,15jt). */
export function formatRentalRpShort(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    const str = jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    return `Rp ${str}jt`;
  }
  if (value >= 1_000) {
    const rb = value / 1_000;
    const str = rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1);
    return `Rp ${str}rb`;
  }
  return formatRentalRp(value);
}

/** Ambil hanya paket yang aktif (untuk ditampilkan di halaman publik). */
export function getActiveRentalPackages(): RentalPackage[] {
  return rentalPackages.filter((p) => p.active);
}

/** Ambil paket termurah (untuk hero "mulai dari"). */
export function getCheapestRentalPackage(): RentalPackage | undefined {
  const active = getActiveRentalPackages();
  return active.sort((a, b) => a.monthlyPrice - b.monthlyPrice)[0];
}

/**
 * Hasil perhitungan savings untuk satu paket vs tagihan PLN user.
 */
export interface PackageSavingsResult {
  pkg: RentalPackage;
  monthlyProduction: number;
  /** Persentase pemakaian user yang dipasok oleh surya (0-100). */
  coveragePercent: number;
  /** Pengurangan tagihan PLN (Rupiah/bulan). */
  plnSaving: number;
  /** Sisa tagihan PLN setelah dipasok surya (Rupiah/bulan). */
  plnRemaining: number;
  /** Total outflow bulanan = sisa PLN + sewa. */
  totalOutflow: number;
  /** Net saving = tagihan PLN awal - total outflow. Positif = untung. */
  netSaving: number;
  /** Apakah paket ini terjangkau sesuai budget user? */
  affordable: boolean;
  /** Status rekomendasi. */
  status: "recommended" | "affordable" | "sufficient" | "oversize" | "undersize";
}

/**
 * Hitung savings untuk sebuah paket berdasarkan pemakaian listrik user.
 *
 * Asumsi:
 *   - Tarif PLN default dari rentalCalculatorConfig.plnTariffPerKwh
 *   - Produksi surya menutupi pemakaian PLN (tidak ada ekspor)
 *   - Jika produksi > pemakaian, kelebihan disimpan di baterai (coverage max 100%)
 *
 * @param pkg - Paket sewa
 * @param monthlyKwh - Pemakaian listrik user (kWh/bulan)
 * @param monthlyBudget - Budget sewa user (Rupiah/bulan)
 * @param plnTariffPerKwh - Tarif PLN (Rupiah/kWh), default dari config
 */
export function computePackageSavings(
  pkg: RentalPackage,
  monthlyKwh: number,
  monthlyBudget: number,
  plnTariffPerKwh: number = rentalCalculatorConfig.plnTariffPerKwh
): PackageSavingsResult {
  const monthlyProduction = estimateMonthlyProduction(pkg.kWp);
  // kWh yang dipasok surya (tidak bisa lebih dari pemakaian)
  const solarCoveredKwh = Math.min(monthlyProduction, monthlyKwh);
  const coveragePercent = monthlyKwh > 0 ? Math.round((solarCoveredKwh / monthlyKwh) * 100) : 0;

  const plnCostBefore = monthlyKwh * plnTariffPerKwh;
  const plnSaving = solarCoveredKwh * plnTariffPerKwh;
  const plnRemaining = Math.max(monthlyKwh - solarCoveredKwh, 0) * plnTariffPerKwh;
  const totalOutflow = plnRemaining + pkg.monthlyPrice;
  const netSaving = plnCostBefore - totalOutflow;
  const affordable = pkg.monthlyPrice <= monthlyBudget;

  // Status klasifikasi
  let status: PackageSavingsResult["status"];
  if (coveragePercent >= 100) {
    status = "oversize"; // paket over-capacity (produksi > kebutuhan)
  } else if (coveragePercent < 50) {
    status = "undersize"; // paket terlalu kecil, cover < 50%
  } else if (affordable) {
    status = "affordable";
  } else {
    status = "sufficient"; // cukup technically tapi di atas budget
  }

  return {
    pkg,
    monthlyProduction,
    coveragePercent,
    plnSaving,
    plnRemaining,
    totalOutflow,
    netSaving,
    affordable,
    status,
  };
}

/**
 * Hitung savings untuk SEMUA paket aktif (untuk tabel komparasi).
 * Diurutkan dari net saving tertinggi ke terendah.
 */
export function computeAllPackageSavings(
  monthlyKwh: number,
  monthlyBudget: number,
  plnTariffPerKwh: number = rentalCalculatorConfig.plnTariffPerKwh
): PackageSavingsResult[] {
  return getActiveRentalPackages()
    .map((pkg) => computePackageSavings(pkg, monthlyKwh, monthlyBudget, plnTariffPerKwh))
    .sort((a, b) => b.netSaving - a.netSaving);
}

/**
 * Rekomendasikan paket berdasarkan pemakaian listrik + budget bulanan.
 *
 * Algoritma (budget-aware, capacity-aware):
 *
 *   1. Dari semua paket terjangkau (monthlyPrice <= budget):
 *      a. Jika ada yang net saving POSITIF → pilih yang net saving tertinggi.
 *      b. Jika SEMUA net saving negatif → pilih yang coverage TERTINGGI
 *         (memberi penghematan PLN terbesar meski masih rugi bersih),
 *         karena paket lebih besar menutupi lebih banyak kWh.
 *
 *   2. Jika TIDAK ADA paket terjangkau sama sekali:
 *      pilih paket termurah (paling dekat ke budget) + jelaskan gap.
 *
 * Tujuan: rekomendasi memperhitungkan KEMAMPUAN FINANSIAL (budget)
 * dan KEBUTUHAN TEKNIS (coverage). Paket besar direkomendasikan
 * ketika user punya pemakaian & budget yang sesuai.
 */
export function recommendRentalPackage(
  monthlyKwh: number,
  monthlyBudget: number
): { package: RentalPackage; reason: string; savings: PackageSavingsResult | null } | null {
  const active = getActiveRentalPackages();
  if (active.length === 0) return null;

  const allSavings = computeAllPackageSavings(monthlyKwh, monthlyBudget);

  // 1. Filter paket terjangkau (affordable)
  const affordable = allSavings.filter((s) => s.affordable);

  if (affordable.length > 0) {
    // 1a. Cari yang net saving POSITIF → pilih net saving tertinggi
    const positiveNetSaving = affordable.filter((s) => s.netSaving >= 0);
    if (positiveNetSaving.length > 0) {
      // Sudah sorted by netSaving desc di computeAllPackageSavings,
      // tapi re-sort untuk safety
      const best = positiveNetSaving.sort((a, b) => b.netSaving - a.netSaving)[0];
      return {
        package: best.pkg,
        savings: best,
        reason: `Paket ${best.pkg.name} (${best.pkg.kWp} kWp) terjangkau untuk budget Anda (${formatRentalRp(best.pkg.monthlyPrice)}/bulan ≤ budget ${formatRentalRp(monthlyBudget)}/bulan) dan memberi net saving positif ${formatRentalRpShort(best.netSaving)}/bulan. Coverage ${best.coveragePercent}% dari pemakaian ${monthlyKwh.toLocaleString("id-ID")} kWh Anda — pengurangan tagihan PLN ${formatRentalRpShort(best.plnSaving)}/bulan.`,
      };
    }

    // 1b. Semua affordable punya net saving negatif → pilih coverage TERTINGGI
    // (paket terbesar yang masih terjangkau, memberi penghematan PLN terbesar)
    const bestCoverage = affordable.sort((a, b) => b.coveragePercent - a.coveragePercent)[0];
    return {
      package: bestCoverage.pkg,
      savings: bestCoverage,
      reason: `Paket ${bestCoverage.pkg.name} (${bestCoverage.pkg.kWp} kWp) adalah paket terbesar yang terjangkau untuk budget Anda (${formatRentalRp(bestCoverage.pkg.monthlyPrice)}/bulan). Coverage ${bestCoverage.coveragePercent}% — pengurangan tagihan PLN ${formatRentalRpShort(bestCoverage.plnSaving)}/bulan. Namun net saving masih negatif (${formatRentalRpShort(bestCoverage.netSaving)}/bulan) karena pemakaian ${monthlyKwh.toLocaleString("id-ID")} kWh Anda tinggi. Disarankan: naikkan budget atau konsultasi paket custom untuk coverage 100%.`,
    };
  }

  // 2. Tidak ada paket terjangkau — ambil termurah (paling dekat ke budget)
  const sortedByPriceAsc = [...allSavings].sort((a, b) => a.pkg.monthlyPrice - b.pkg.monthlyPrice);
  const cheapest = sortedByPriceAsc[0];
  const gap = cheapest.pkg.monthlyPrice - monthlyBudget;
  return {
    package: cheapest.pkg,
    savings: cheapest,
    reason: `Tidak ada paket terjangkau untuk budget ${formatRentalRp(monthlyBudget)}/bulan. Paket termurah: ${cheapest.pkg.name} (${cheapest.pkg.kWp} kWp) di ${formatRentalRp(cheapest.pkg.monthlyPrice)}/bulan — kekurangan ${formatRentalRpShort(gap)}/bulan. Coverage ${cheapest.coveragePercent}%. Disarankan: naikkan budget atau konsultasi paket custom.`,
  };
}

/** Estimasi produksi bulanan (kWh) dari sebuah paket. */
export function estimateMonthlyProduction(kWp: number): number {
  return Math.round(kWp * rentalProgramConfig.pshHours * rentalProgramConfig.systemEfficiency * 30);
}
