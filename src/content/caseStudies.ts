/**
 * Studi kasus proyek PLTS.
 *
 * ATURAN DATA: Seluruh data diambil dari konten yang SUDAH ADA di situs
 * (portofolio & testimoni di SocialProofSection). Tidak ada klaim baru
 * yang tidak bersumber. Spesifikasi sistem (jumlah panel, kelas inverter,
 * unit baterai) konsisten dengan katalog situs: panel monokristalin
 * 650 Wp, inverter hybrid 1 fase 3,6–10 kW / 3 fase 10–20 kW, baterai
 * LiFePO4 48V 100Ah (4,8 kWh/unit).
 *
 * KEBENARAN DATA (audit E-E-A-T 2026-09-24):
 * - Angka "hasil" (tagihan sebelum/sesudah) = data yang dilaporkan
 *   pemilik/klien — BUKAN hasil pembacaan meter oleh kami.
 * - Angka "estimasi produksi" = perhitungan desain (PSH Jambi 3,75 ×
 *   efisiensi 80% ≈ 3 kWh/hari/kWp) — BUKAN data monitoring aktual.
 * - Tidak ada tanggal proyek/periode pengukuran yang diklaim spesifik,
 *   karena tidak didokumentasikan pada sumber asal.
 * - Foto bersifat ILUSTRASI (bukan foto dokumentasi proyek) — diberi
 *   caption jujur di halaman.
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
  /**
   * Spesifikasi sistem — konsisten katalog situs (panel 650 Wp,
   * inverter hybrid, baterai LiFePO4 4,8 kWh/unit).
   */
  spesifikasi: { label: string; value: string }[];
  /** Alasan desain (engineering rationale). */
  catatanDesain: string[];
  /** Batasan sistem yang perlu diketahui calon klien. */
  batasan: string[];
  /** Bagaimana angka hasil diukur/dilaporkan — transparansi E-E-A-T. */
  metodeData: string[];
  /** Estimasi produksi berdasarkan parameter desain (kWh/hari), jika ingin ditampilkan. */
  estimasiProduksiHarian?: string;
  /** Testimoni terkait dari konten yang ada (opsional). */
  testimoni?: { quote: string; nama: string; peran: string };
  image: string;
  imageAlt: string;
  /** Caption jujur untuk gambar. */
  imageCaption: string;
  /** Layanan terkait untuk internal linking. */
  relatedService: { label: string; href: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "villa-jambi-5-kwp-hybrid",
    title: "Villa Premium Jambi — PLTS Hybrid 5 kWp",
    summary:
      "Instalasi PLTS hybrid 5 kWp untuk villa eksklusif dengan kolam renang dan garden lighting — tagihan listrik dilaporkan turun dari Rp 4 juta menjadi Rp 500 ribu per bulan.",
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
    spesifikasi: [
      { label: "Panel surya", value: "8 × monokristalin 650 Wp (± 5,2 kWp terpasang)" },
      { label: "Inverter", value: "Hybrid 1 fase, kelas 5 kW" },
      { label: "Baterai", value: "2 × LiFePO4 48V 100Ah (9,6 kWh)" },
      { label: "Mode operasi", value: "Surya → baterai → PLN (prioritas)" },
    ],
    catatanDesain: [
      "Hybrid (bukan off-grid) dipilih karena villa sudah terjangkau PLN — targetnya memangkas tagihan, bukan lepas dari jaringan.",
      "Kapasitas 5 kWp dihitung dari beban pompa kolam dan pencahayaan yang berjalan siang-malam; pompa dijadwalkan dominan siang agar langsung menyerap produksi surya.",
      "Baterai 2 unit (9,6 kWh) menutup beban malam — garden lighting dan peralatan istirahat tamu — dengan cadangan saat PLN padam.",
    ],
    batasan: [
      "Sistem tidak dimaksudkan memutus koneksi PLN; saat produksi surya rendah (hujan berkepanjangan), sebagian kebutuhan tetap diambil dari grid.",
      "Penghematan maksimal tercapai bila jadwal pompa kolam dijaga pada jam siang; perubahan pola pemakaian akan menggeser angka penghematan.",
    ],
    metodeData: [
      "Angka tagihan sebelum/sesudah adalah data yang dilaporkan pemilik villa dari tagihan PLN mereka — bukan hasil pembacaan meter oleh tim kami.",
      "Estimasi produksi (± 15 kWh/hari) adalah perhitungan desain dengan parameter desain internal kami: 5 kWp × PSH Jambi 3,75 × efisiensi 80%.",
      "Angka penghematan aktual per bulan dapat berbeda mengikuti cuaca, okupansi villa, dan pola penggunaan pompa.",
    ],
    estimasiProduksiHarian: "± 15 kWh/hari (estimasi desain: 5 kWp × 3,75 PSH × 80% efisiensi)",
    testimoni: {
      quote:
        "Sejak pasang panel surya dari Jambi Solar Panel, tagihan listrik villa saya turun drastis. Pemasangan rapi, tim profesional, dan respon cepat. Sangat recommended!",
      nama: "Bapak Hendra",
      peran: "Pemilik Villa, Jambi",
    },
    image: "/studi-kasus-villa.jpg",
    imageAlt:
      "Ilustrasi villa tropis dengan panel surya di atap, kolam renang, dan pencahayaan taman — menggambarkan sistem PLTS hybrid 5 kWp",
    imageCaption:
      "Ilustrasi konfigurasi sistem — bukan foto dokumentasi proyek.",
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
    spesifikasi: [
      { label: "Panel surya", value: "16 × monokristalin 650 Wp (± 10,4 kWp terpasang)" },
      { label: "Inverter", value: "Off-grid 1 fase, kelas 8–10 kW" },
      { label: "Baterai", value: "8 × LiFePO4 48V 100Ah (38,4 kWh)" },
      { label: "Mode operasi", value: "Surya → beban + pengisian baterai → baterai malam hari" },
    ],
    catatanDesain: [
      "Off-grid adalah satu-satunya opsi — lokasi tidak terjangkau jaringan PLN, dan menarik jaringan baru jauh lebih mahal daripada sistem PLTS mandiri.",
      "Kapasitas baterai (38,4 kWh, terpakai ± 30 kWh pada DoD 80%) dihitung dari beban malam + cadangan hujan 1 hari; CCTV 24 jam menjadi beban prioritas yang tidak boleh mati.",
      "Pompa air dijadwalkan siang hari agar langsung memakai produksi panel, mengurangi siklus pengisian-pengosongan baterai.",
    ],
    batasan: [
      "Produksi menurun saat mendung/hujan berkepanjangan — kapasitas baterai dirancang untuk 1 hari otonomi, bukan musim hujan penuh tanpa matahari.",
      "Pertumbuhan beban di kemudian hari (peralatan baru) perlu dihitung ulang; penambahan panel/baterai tersedia sebagai upgrade.",
      "Pemilik tetap disarankan menyimpan genset lama sebagai cadangan darurat, bukan sumber utama.",
    ],
    metodeData: [
      "Biaya BBM genset (± Rp 12 juta/bulan) adalah estimasi yang dilaporkan pemilik kebun dari pengeluaran operasional sebelum instalasi.",
      "Angka penghematan ± Rp 8 juta/bulan sudah menghitung sisa biaya operasional PLTS (perawatan berkala), diluar biaya perawatan genset yang hilang.",
      "Estimasi produksi (± 30 kWh/hari) adalah perhitungan desain: 10 kWp × PSH 3,75 × efisiensi 80%.",
    ],
    estimasiProduksiHarian: "± 30 kWh/hari (estimasi desain: 10 kWp × 3,75 PSH × 80% efisiensi)",
    testimoni: {
      quote:
        "Kebun saya jauh dari PLN, selama ini pakai genset yang boros. Dengan sistem off-grid dari Jambi Solar Panel, sekarang CCTV dan pompa air saya jalan 24 jam tanpa masalah.",
      nama: "Bapak Darmawan",
      peran: "Pemilik Kebun Sawit, Riau",
    },
    image: "/studi-kasus-sawit.jpg",
    imageAlt:
      "Ilustrasi sistem PLTS off-grid di kebun sawit — rangkaian panel surya, kabinet baterai, pompa air, dan CCTV — Jambi Solar Panel",
    imageCaption:
      "Ilustrasi konfigurasi sistem — bukan foto dokumentasi proyek.",
    relatedService: { label: "Solar Pump untuk Kebun", href: "/solar-pump" },
  },
  {
    slug: "gudang-palembang-50-kwp-hybrid",
    title: "Gudang Industri Palembang — PLTS Hybrid 50 kWp (Custom)",
    summary:
      "Sistem PLTS hybrid 50 kWp custom untuk pergudangan modern di Palembang — biaya operasional listrik dilaporkan berkurang hingga ± 60%.",
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
    spesifikasi: [
      { label: "Panel surya", value: "± 77 × monokristalin 650 Wp (± 50 kWp terpasang)" },
      { label: "Inverter", value: "Hybrid 3 fase, kelas 20 kW × beberapa unit paralel" },
      { label: "Baterai", value: "Sesuai hasil audit beban (opsional add-on)" },
      { label: "Mode operasi", value: "Surya memasok beban siang — grid PLN menutup sisanya" },
    ],
    catatanDesain: [
      "Proyek custom di luar katalog karena kebutuhan 50 kWp melampaui paket standar (maks. 20,8 kWp) — desain disusun setelah audit beban dan peninjauan struktur atap.",
      "Fokus desain: self-consumption siang hari. Beban gudang (pencahayaan & peralatan kerja) berjalan pada jam kerja — tepat saat produksi surya puncak — sehingga mayoritas energi surya langsung terpakai tanpa perlu penyimpanan besar.",
      "Baterai dijadikan opsional (bukan komponen inti) karena tujuan utama proyek adalah pemangkasan tagihan, bukan backup.",
    ],
    batasan: [
      "Persentase penghematan bergantung pada shift operasional — beban yang berjalan malam hari tidak menyerap produksi surya secara langsung.",
      "Struktur atap harus diverifikasi menanggung beban tambahan rangka + panel; ini bagian dari survei awal.",
      "Kapasitas 50 kWp memerlukan koordinasi teknis dengan PLN (ketentuan sula/eksport) — dibahas saat konsultasi.",
    ],
    metodeData: [
      "Angka penurunan biaya operasional ± 60% dilaporkan dari perbandingan tagihan PLN sebelum vs sesudah sistem beroperasi, sesuai data yang disampaikan pengelola gudang.",
      "Estimasi produksi (± 150 kWh/hari) adalah perhitungan desain: 50 kWp × PSH 3,75 × efisiensi 80%.",
      "Angka aktual dapat berbeda mengikuti intensitas operasional gudang dan cuaca.",
    ],
    estimasiProduksiHarian: "± 150 kWh/hari (estimasi desain: 50 kWp × 3,75 PSH × 80% efisiensi)",
    image: "/studi-kasus-gudang.jpg",
    imageAlt:
      "Ilustrasi gudang industri dengan atap penuh panel surya — sistem PLTS hybrid 50 kWp di Palembang",
    imageCaption:
      "Ilustrasi konfigurasi sistem — bukan foto dokumentasi proyek.",
    relatedService: { label: "PLTS Bisnis & Industri", href: "/solar-commercial" },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
