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
} as const;

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
  /** Harga sewa bulanan (Rupiah, sudah termasuk PPN). */
  monthlyPrice: number;
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

/**
 * Daftar paket sewa PLTS.
 *
 * Cara mengubah harga:
 *   Ubah nilai `monthlyPrice` pada paket di bawah — selesai.
 *   Tidak perlu mengubah file lain.
 *
 * Cara menonaktifkan paket:
 *   Set `active: false`.
 *
 * Cara menambah paket baru:
 *   Salin satu objek paket, ubah id, nama, kapasitas, harga, deskripsi.
 */
export const rentalPackages: RentalPackage[] = [
  {
    id: "starter",
    name: "Starter",
    kWp: 1,
    storageKwh: 5.12,
    monthlyPrice: 950000,
    description:
      "Paket awal untuk rumah kecil atau apartemen. Cocok untuk beban ringan seperti lampu, kulkas, TV, dan kipas.",
    estimatedMonthlyKwh: "90 – 120 kWh",
    savingsRange: "Hemat hingga Rp 200rb/bulan",
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
    monthlyPrice: 1850000,
    description:
      "Paket terpopuler untuk rumah keluarga. Mendukung AC 1 PK, kulkas, TV, mesin cuci, dan pompa air.",
    estimatedMonthlyKwh: "180 – 240 kWh",
    savingsRange: "Hemat hingga Rp 450rb/bulan",
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
    monthlyPrice: 2500000,
    description:
      "Untuk keluarga dengan 2 AC, kulkas besar, water heater, dan peralatan rumah tangga modern lainnya.",
    estimatedMonthlyKwh: "270 – 360 kWh",
    savingsRange: "Hemat hingga Rp 700rb/bulan",
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
    monthlyPrice: 3000000,
    description:
      "Untuk rumah besar dengan 3–4 AC, peralatan smart home, dan kebutuhan listrik tinggi sepanjang hari.",
    estimatedMonthlyKwh: "360 – 480 kWh",
    savingsRange: "Hemat hingga Rp 950rb/bulan",
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
    monthlyPrice: 3500000,
    description:
      "Untuk rumah besar, kos-kosan, atau bisnis kecil. Mendukung beban komersial seperti AC 5 PK dan kantor.",
    estimatedMonthlyKwh: "450 – 600 kWh",
    savingsRange: "Hemat hingga Rp 1.2jt/bulan",
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
    buy: "Rp 25 – 100 juta+ (sesuai kapasitas)",
    rent: "Rp 0 — tanpa DP, tanpa biaya instalasi",
    winner: "rent",
  },
  {
    aspect: "Biaya Bulanan",
    buy: "Hanya tagihan PLN sisa (kecil)",
    rent: "Tagihan PLN sisa + biaya sewa (tetap)",
    winner: "buy",
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
      "Kontrak minimum adalah 12 bulan, dengan opsi perpanjangan otomatis. Pembayaran sewa dilakukan bulanan di mellow melalui transfer bank atau virtual account yang akan dikirimkan setiap awal bulan. Tersedia juga opsi pembayaran tahunan dengan diskon khusus — hubungi tim kami untuk detail lebih lanjut.",
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
    "Satu sistem, dua manfaat: tagihan listrik turun setiap bulan, dan rumah tetap menyala saat PLN padam. Tanpa investasi puluhan juta rupiah — mulai hanya Rp 650 ribu/bulan.",
  primaryCta: "Hitung Paket Saya",
  secondaryCta: "Konsultasi WhatsApp",
  stats: [
    { label: "Mulai dari", value: "Rp 650rb", suffix: "/bulan" },
    { label: "Backup PLN padam", value: "Otomatis", suffix: "" },
    { label: "Hemat tagihan", value: "Hingga 90%", suffix: "" },
    { label: "Kontrak minimum", value: "12", suffix: "bulan" },
  ],
} as const;

/** Konfigurasi kalkulator sewa. */
export const rentalCalculatorConfig = {
  /** Preset pemakaian listrik bulanan (kWh). */
  usagePresets: [
    { label: "200 kWh", value: 200 },
    { label: "400 kWh", value: 400 },
    { label: "600 kWh", value: 600 },
    { label: "900 kWh", value: 900 },
    { label: "1.200 kWh", value: 1200 },
  ],
  /** Preset budget bulanan (Rupiah). */
  budgetPresets: [
    { label: "Rp 650rb", value: 650000 },
    { label: "Rp 1.15jt", value: 1150000 },
    { label: "Rp 1.6jt", value: 1600000 },
    { label: "Rp 2jt", value: 2000000 },
    { label: "Rp 2.5jt", value: 2500000 },
  ],
  /** Tarif PLN default (Rupiah/kWh) — R-1 1300VA+ non-subsidi. */
  plnTariffPerKwh: 1444,
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
 * Rekomendasikan paket berdasarkan pemakaian listrik bulanan (kWh)
 * dan budget bulanan (Rupiah).
 *
 * Strategi:
 * 1. Filter paket yang estimatedMonthlyKwh bisa menampung pemakaian.
 * 2. Dari yang muat, pilih yang harganya <= budget.
 * 3. Jika tidak ada yang <= budget, ambil paket termurah yang muat.
 * 4. Jika tidak ada yang muat, ambil paket terbesar.
 */
export function recommendRentalPackage(
  monthlyKwh: number,
  monthlyBudget: number
): { package: RentalPackage; reason: string } | null {
  const active = getActiveRentalPackages();
  if (active.length === 0) return null;

  // Estimasi kapasitas minimum yang dibutuhkan (kWp)
  // Asumsi: dailyKwh = monthlyKwh / 30, dan produksi = kWp * PSH * eff
  // Maka kWp minimum = (monthlyKwh / 30) / (PSH * eff)
  const minKwpNeeded =
    monthlyKwh / 30 / (rentalProgramConfig.pshHours * rentalProgramConfig.systemEfficiency);

  // Paket yang kapasitasnya menampung kebutuhan
  const sufficient = active.filter((p) => p.kWp >= minKwpNeeded - 0.01);

  if (sufficient.length > 0) {
    // Dari yang muat, cari yang <= budget
    const affordable = sufficient.filter((p) => p.monthlyPrice <= monthlyBudget);
    if (affordable.length > 0) {
      // Pilih yang paling mendekati budget (memberi ruang hemat maksimal)
      const best = affordable.sort((a, b) => b.monthlyPrice - a.monthlyPrice)[0];
      return {
        package: best,
        reason: `Kapasitas ${best.kWp} kWp cukup untuk kebutuhan ${monthlyKwh} kWh/bulan Anda dan masih dalam budget.`,
      };
    }
    // Tidak ada yang <= budget, ambil termurah yang muat
    const cheapest = sufficient.sort((a, b) => a.monthlyPrice - b.monthlyPrice)[0];
    return {
      package: cheapest,
      reason: `Kapasitas ${cheapest.kWp} kWp cukup, namun sedikit di atas budget. Tim kami bisa menawarkan opsi cicilan atau paket custom.`,
    };
  }

  // Tidak ada yang muat — ambil paket terbesar dan sarankan custom
  const largest = active.sort((a, b) => b.kWp - a.kWp)[0];
  return {
    package: largest,
    reason: `Kebutuhan Anda (${monthlyKwh} kWh/bulan) melebihi kapasitas paket terbesar. Tim kami dapat merancang paket custom — silakan konsultasi.`,
  };
}

/** Estimasi produksi bulanan (kWh) dari sebuah paket. */
export function estimateMonthlyProduction(kWp: number): number {
  return Math.round(kWp * rentalProgramConfig.pshHours * rentalProgramConfig.systemEfficiency * 30);
}
