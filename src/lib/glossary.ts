/**
 * SINGLE SOURCE OF TRUTH untuk Kamus Istilah PLTS (/istilah-plts).
 *
 * ATURAN KONTEN (E-E-A-T): definisi hanya memakai data terverifikasi
 * internal situs — PSH Jambi 3,75 jam; efisiensi sistem 80%;
 * 1 kWp ±3 kWh/hari; panel monokristalin 650 Wp; baterai LiFePO4
 * 48V 100Ah (4,8 kWh/unit, DoD 80–90%, siklus 3.000–6.000);
 * paket rumah 1,3–5,2 kWp; bisnis 7,15–10,4 kWp; industri 11,7–20,8 kWp;
 * ROI rumah 9–11 thn, bisnis 8–9 thn; garansi panel 25 thn performa,
 * inverter 5–10 thn, baterai 5–10 thn, instalasi 2 thn; PPN 11%;
 * sewa PLTS mulai Rp875rb/bln; PJUTS 30–150 W; solar pump 1–3 HP;
 * EV charger AC 7,2 kW; tarif PLN acuan Rp1.352–1.444,70/kWh.
 *
 * JANGAN menambahkan angka/klaim di luar daftar di atas.
 */

export type GlossaryCategory =
  | "Konsep Dasar"
  | "Komponen PLTS"
  | "Biaya & Investasi"
  | "Produk & Layanan";

export interface GlossaryLink {
  label: string;
  href: string;
}

export interface GlossaryTerm {
  /** Anchor id (deterministik, dipakai di URL #hash). */
  id: string;
  /** Istilah yang ditampilkan. */
  term: string;
  /** Definisi lengkap (2–4 kalimat). */
  definition: string;
  category: GlossaryCategory;
  /** Link internal terkait (artikel / halaman layanan / FAQ). */
  related: GlossaryLink[];
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "Konsep Dasar",
  "Komponen PLTS",
  "Biaya & Investasi",
  "Produk & Layanan",
];

export const glossaryTerms: GlossaryTerm[] = [
  /* ---------- Konsep Dasar ---------- */
  {
    id: "plts",
    term: "PLTS",
    category: "Konsep Dasar",
    definition:
      "Pembangkit Listrik Tenaga Surya — sistem yang mengubah energi matahari menjadi listrik memakai panel surya, inverter, dan (opsional) baterai penyimpanan. PLTS dapat dipasang untuk rumah, bisnis, industri, hingga penerangan jalan. Di Jambi, potensi energi surya sangat baik karena iradiasi matahari tinggi sepanjang tahun (parameter desain kami: PSH 3,75 jam/hari).",
    related: [
      { label: "Artikel: Potensi Energi Surya Jambi", href: "/artikel/potensi-energi-surya-jambi" },
      { label: "Layanan panel surya rumah", href: "/solar-home" },
    ],
  },
  {
    id: "kwp",
    term: "kWp (Kilowatt-Peak)",
    category: "Konsep Dasar",
    definition:
      "Satuan kapasitas puncak panel surya dalam kondisi iradiasi standar. Semakin besar kWp, semakin besar energi yang bisa diproduksi. Di Jambi, 1 kWp panel menghasilkan sekitar ±3 kWh listrik per hari (sudah memperhitungkan efisiensi sistem 80%). Paket PLTS rumah tangga umumnya berkisar 1,3–5,2 kWp, bisnis 7,15–10,4 kWp, dan industri 11,7–20,8 kWp.",
    related: [
      { label: "Artikel: Berapa kWp Panel Surya untuk Rumah?", href: "/artikel/berapa-kwp-panel-surya-untuk-rumah" },
      { label: "Artikel: Berapa Produksi 1 kWp Panel Surya?", href: "/artikel/berapa-produksi-1-kwp-panel-surya" },
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
    ],
  },
  {
    id: "kwh",
    term: "kWh (Kilowatt-Hour)",
    category: "Konsep Dasar",
    definition:
      "Satuan energi listrik — jumlah listrik yang dipakai atau dihasilkan selama satu jam. Tagihan PLN Anda dihitung dalam kWh. Contoh: pendingin udara 750 W yang menyala 8 jam memakai ±6 kWh. Untuk menentukan kapasitas PLTS yang tepat, langkah pertama adalah mengaudit kebutuhan kWh harian rumah atau bisnis Anda.",
    related: [
      { label: "Artikel: Cara Menentukan Kapasitas PLTS", href: "/artikel/cara-menentukan-kapasitas-plts" },
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
    ],
  },
  {
    id: "psh",
    term: "PSH (Peak Sun Hours)",
    category: "Konsep Dasar",
    definition:
      "Jumlah jam per hari ketika iradiasi matahari setara dengan kondisi puncak (1.000 W/m²). PSH menentukan seberapa banyak energi bisa dipanen per kWp panel. Parameter desain yang kami gunakan untuk wilayah Jambi adalah 3,75 jam per hari — salah satu alasan Jambi dan Sumatera umumnya cocok untuk investasi PLTS.",
    related: [
      { label: "Artikel: Potensi Energi Surya Jambi", href: "/artikel/potensi-energi-surya-jambi" },
      { label: "Artikel: Berapa Produksi 1 kWp?", href: "/artikel/berapa-produksi-1-kwp-panel-surya" },
    ],
  },
  {
    id: "efisiensi-sistem",
    term: "Efisiensi Sistem",
    category: "Konsep Dasar",
    definition:
      "Rasio energi listrik yang benar-benar sampai ke beban dibanding energi teoretis panel. Penyebab penurunan antara lain rugi inverter, kabel, suhu panel, dan debu. Perhitungan situs ini memakai asumsi konservatif 80% — artinya 1 kWp di Jambi diperhitungkan menghasilkan ±3 kWh/hari, bukan angka laboratorium. Nilai aktual sistem Anda diverifikasi saat commissioning.",
    related: [
      { label: "Artikel: Penyebab Produksi PLTS Turun", href: "/artikel/penyebab-produksi-plts-turun" },
    ],
  },
  {
    id: "on-grid",
    term: "On-Grid",
    category: "Konsep Dasar",
    definition:
      "Konfigurasi PLTS yang terhubung ke jaringan PLN tanpa baterai. Panel memasok beban siang hari; saat produksi kurang, listrik PLN otomatis melengkapi. Skema eksport ke jaringan mengikuti regulasi PLN yang berlaku. Cocok untuk bisnis dengan beban siang besar karena hemat biaya (tanpa baterai).",
    related: [
      { label: "Artikel: PLTS Hybrid vs Off-Grid", href: "/artikel/plts-hybrid-vs-off-grid" },
      { label: "Layanan bisnis & industri", href: "/solar-commercial" },
    ],
  },
  {
    id: "off-grid",
    term: "Off-Grid",
    category: "Konsep Dasar",
    definition:
      "Konfigurasi PLTS mandiri penuh — tidak terhubung jaringan PLN sama sekali, dengan baterai sebagai penyimpan energi untuk malam dan hari mendung. Ideal untuk kebun, pondok, vila terpencil, pos keamanan, dan area rural yang belum terjangkau listrik. Kebutuhan baterai dihitung dari konsumsi malam hari dibagi DoD dan jumlah hari otonomi.",
    related: [
      { label: "Artikel: PLTS Hybrid vs Off-Grid", href: "/artikel/plts-hybrid-vs-off-grid" },
      { label: "Artikel: Cara Menghitung Kebutuhan Baterai", href: "/artikel/cara-menghitung-kebutuhan-baterai" },
      { label: "Studi kasus kebun sawit off-grid", href: "/studi-kasus/kebun-sawit-riau-10-kwp-off-grid" },
    ],
  },
  {
    id: "hybrid",
    term: "Hybrid",
    category: "Konsep Dasar",
    definition:
      "Konfigurasi PLTS yang menggabungkan panel, baterai, dan koneksi PLN. Siang hari panel memasok beban dan mengisi baterai; malam hari beban diambil dari baterai; PLN berperan sebagai cadangan. Sistem hybrid adalah pilihan paling umum untuk rumah dan bisnis di Jambi karena tagihan turun drastis sambil listrik tetap stabil 24 jam.",
    related: [
      { label: "Artikel: PLTS Hybrid vs Off-Grid", href: "/artikel/plts-hybrid-vs-off-grid" },
      { label: "Layanan panel surya rumah", href: "/solar-home" },
    ],
  },
  {
    id: "daya-pln",
    term: "Daya PLN (VA)",
    category: "Konsep Dasar",
    definition:
      "Kapasitas langganan listrik PLN rumah atau bisnis Anda (misalnya 900 VA, 1.300 VA, 3.500 VA). Daya PLN menentukan inverter dan konfigurasi PLTS yang bisa dipasang — sistem hybrid memakai inverter yang dipasangkan dengan daya terpasang agar beban puncak tetap terlayani. Saat survei gratis, tim teknis mencatat daya PLN Anda sebagai dasar desain sistem.",
    related: [
      { label: "Artikel: Berapa kWp untuk Rumah?", href: "/artikel/berapa-kwp-panel-surya-untuk-rumah" },
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
    ],
  },

  /* ---------- Komponen PLTS ---------- */
  {
    id: "panel-monokristalin",
    term: "Panel Surya Monokristalin",
    category: "Komponen PLTS",
    definition:
      "Jenis panel dengan sel silikon tunggal — efisiensi paling tinggi di kelas panel komersial sehingga menghasilkan daya lebih besar per meter persegi. Paket PLTS di situs ini memakai panel monokristalin 650 Wp per lembar: Paket 1,3 kWp cukup 2 panel, Paket 5,2 kWp cukup 8 panel. Panel bergaransi performa hingga 25 tahun.",
    related: [
      { label: "Harga paket per kapasitas", href: "/harga-panel-surya-jambi" },
      { label: "Layanan panel surya rumah", href: "/solar-home" },
    ],
  },
  {
    id: "inverter-hybrid",
    term: "Inverter Hybrid",
    category: "Komponen PLTS",
    definition:
      "Perangkat yang mengubah arus DC dari panel menjadi AC untuk peralatan rumah, sekaligus mengelola pengisian dan pengosongan baterai, dan bisa bekerja paralel dengan PLN. Tersedia pilihan 1-fase (3,6–10 kW) untuk rumah dan 3-fase (10–20 kW) untuk bisnis/industri. Bergaransi 5–10 tahun.",
    related: [
      { label: "Artikel: PLTS Hybrid vs Off-Grid", href: "/artikel/plts-hybrid-vs-off-grid" },
      { label: "Layanan bisnis & industri", href: "/solar-commercial" },
    ],
  },
  {
    id: "mppt",
    term: "MPPT (Maximum Power Point Tracking)",
    category: "Komponen PLTS",
    definition:
      "Teknologi di dalam inverter yang terus mencari titik kerja panel dengan daya output maksimum saat kondisi matahari berubah (cerah, berawan, pagi/sore). MPPT membuat sistem tetap efisien walau iradiasi tidak ideal — salah satu faktor yang menjaga produksi sistem di Jambi tetap optimal sepanjang tahun.",
    related: [
      { label: "Artikel: Penyebab Produksi PLTS Turun", href: "/artikel/penyebab-produksi-plts-turun" },
    ],
  },
  {
    id: "baterai-lifepo4",
    term: "Baterai LiFePO4",
    category: "Komponen PLTS",
    definition:
      "Baterai lithium iron phosphate — standar penyimpanan modern untuk PLTS karena umur panjang dan aman. Unit yang dipakai paket PLTS di situs ini: 48V 100Ah = 4,8 kWh per unit. Baterai LiFePO4 bertahan 3.000–6.000 siklus pengisian, DoD 80–90%, dan bergaransi 5–10 tahun. Kebutuhan unit dihitung dari konsumsi malam hari dibagi kapasitas tiap unit.",
    related: [
      { label: "Artikel: Cara Menghitung Kebutuhan Baterai", href: "/artikel/cara-menghitung-kebutuhan-baterai" },
      { label: "FAQ: kebutuhan baterai", href: "/faq" },
    ],
  },
  {
    id: "dod",
    term: "DoD (Depth of Discharge)",
    category: "Komponen PLTS",
    definition:
      "Persentase kapasitas baterai yang boleh dipakai sebelum harus diisi ulang. Baterai LiFePO4 menoleransi DoD 80–90% — jauh lebih dalam dibanding baterai timbal-asam — sehingga kapasitas terpasang lebih termanfaatkan. Rumus praktis: kebutuhan energi malam dibagi 0,8 (DoD 80%) = kapasitas baterai minimum.",
    related: [
      { label: "Artikel: Cara Menghitung Kebutuhan Baterai", href: "/artikel/cara-menghitung-kebutuhan-baterai" },
    ],
  },
  {
    id: "siklus-baterai",
    term: "Siklus Baterai",
    category: "Komponen PLTS",
    definition:
      "Satu siklus = satu proses isi penuh lalu kosong sampai batas DoD. Baterai LiFePO4 bertahan 3.000–6.000 siklus. Jika dipakai satu siklus penuh per hari, umur baterai bisa mencapai 8–16 tahun — melampaui garansi 5–10 tahun yang diberikan.",
    related: [
      { label: "Artikel: Cara Menghitung Kebutuhan Baterai", href: "/artikel/cara-menghitung-kebutuhan-baterai" },
      { label: "FAQ: umur & perawatan", href: "/faq" },
    ],
  },
  {
    id: "string",
    term: "String Panel",
    category: "Komponen PLTS",
    definition:
      "Deretan panel yang disambung seri menjadi satu rangkaian input inverter. Jumlah panel per string mengikuti batas tegangan input inverter dan dirancang saat tahap desain sistem. Konfigurasi string yang benar menjaga sistem bekerja pada tegangan optimal di berbagai kondisi cuaca.",
    related: [
      { label: "Artikel: Cara Menentukan Kapasitas PLTS", href: "/artikel/cara-menentukan-kapasitas-plts" },
    ],
  },
  {
    id: "bos",
    term: "BOS (Balance of System)",
    category: "Komponen PLTS",
    definition:
      "Kumpulan komponen pendukung selain panel, inverter, dan baterai: struktur mounting atap, kabel DC/AC, MCCB proteksi, grounding, dan lain-lain. Kualitas BOS menentukan keamanan dan keandalan sistem dalam jangka panjang — semua paket di situs ini sudah termasuk BOS standar instalasi.",
    related: [
      { label: "Artikel: Faktor Biaya Panel Surya", href: "/artikel/harga-panel-surya-jambi-faktor-biaya" },
      { label: "Harga paket lengkap", href: "/harga-panel-surya-jambi" },
    ],
  },
  {
    id: "kanopi-carport",
    term: "Kanopi Carport",
    category: "Komponen PLTS",
    definition:
      "Struktur kanopi parkir mobil yang panel suryanya dipasang di atasnya — solusi saat atap rumah tidak memadai atau ingin tambahan area panel. Tersedia sebagai add-on untuk paket PLTS rumah dan bisnis. Kanopi sekaligus melindungi kendaraan dari panas dan hujan.",
    related: [
      { label: "Layanan panel surya rumah", href: "/solar-home" },
      { label: "Harga paket + add-on", href: "/harga-panel-surya-jambi" },
    ],
  },
  {
    id: "smart-monitoring",
    term: "Smart Monitoring",
    category: "Komponen PLTS",
    definition:
      "Sistem pemantauan berbasis IoT untuk melihat produksi panel, status baterai, dan konsumsi listrik secara real-time dari ponsel. Tersedia sebagai add-on untuk paket bisnis & industri, serta bagian dari layanan Smart IoT & CCTV. Data historis membantu mendeteksi dini penurunan performa.",
    related: [
      { label: "Layanan Smart IoT & CCTV", href: "/smart-iot" },
      { label: "Layanan maintenance", href: "/maintenance" },
    ],
  },

  /* ---------- Biaya & Investasi ---------- */
  {
    id: "roi",
    term: "ROI (Return on Investment)",
    category: "Biaya & Investasi",
    definition:
      "Waktu balik modal investasi PLTS. Dalam simulasi kami (model: min(produksi surya, pemakaian) × pemanfaatan energi × tarif, dengan skenario kenaikan tarif 6%/tahun — asumsi simulasi, bukan prediksi), paket rumah tangga 2,6–5,2 kWp mencapai balik modal sekitar 9–11 tahun pada profil campuran + baterai, dan paket bisnis/industri 7,15–20,8 kWp sekitar 8–9 tahun pada profil dominan siang berkat skala ekonomi. Selama masa garansi performa panel 25 tahun, total penghematan kumulatif dalam simulasi bisa mencapai beberapa kali lipat investasi awal — angka pastinya bergantung profil beban dan pemanfaatan energi. Hitung sendiri di Kalkulator PLTS.",
    related: [
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
      { label: "FAQ: berapa lama balik modal?", href: "/faq" },
    ],
  },
  {
    id: "paket-kwp",
    term: "Paket kWp",
    category: "Biaya & Investasi",
    definition:
      "Paket sistem PLTS siap pasang yang sudah termasuk panel monokristalin 650 Wp, inverter hybrid, baterai (sesuai paket), BOS, instalasi, survei, desain, dan garansi resmi. Rentang paket: rumah 1,3 / 2,6 / 3,25 / 5,2 kWp; bisnis 7,15 / 10,4 kWp; industri 11,7 / 20,8 kWp. Semua harga termasuk PPN 11%.",
    related: [
      { label: "Harga Panel Surya Jambi", href: "/harga-panel-surya-jambi" },
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
    ],
  },
  {
    id: "tarif-pln",
    term: "Tarif PLN",
    category: "Biaya & Investasi",
    definition:
      "Harga listrik per kWh yang Anda bayar ke PLN — dasar perhitungan penghematan PLTS. Tarif acuan rumah tangga yang dipakai kalkulator situs ini: Rp1.352–1.444,70/kWh (golongan R-1). Semakin tinggi tagihan bulanan Anda, semakin besar penghematan dan semakin cepat balik modal PLTS.",
    related: [
      { label: "Kalkulator PLTS", href: "/kalkulator-plts" },
      { label: "Artikel: Biaya Pasang PLTS Rumah di Jambi", href: "/artikel/biaya-pasang-plts-rumah-jambi" },
    ],
  },
  {
    id: "sewa-plts",
    term: "Sewa PLTS",
    category: "Biaya & Investasi",
    definition:
      "Skema pakai sistem PLTS tanpa investasi awal — cukup bayar bulanan mulai Rp875rb/bulan, peralatan tetap milik penyedia dan dirawat oleh penyedia selama masa sewa. Cocok untuk rumah dan bisnis yang ingin langsung menikmati penghematan tagihan tanpa mengeluarkan modal di depan.",
    related: [
      { label: "Halaman Sewa PLTS", href: "/sewa-plts" },
      { label: "FAQ: sewa PLTS", href: "/faq" },
    ],
  },
  {
    id: "garansi-plts",
    term: "Garansi PLTS",
    category: "Biaya & Investasi",
    definition:
      "Jaminan resmi tertulis yang menyertai setiap instalasi: garansi performa panel hingga 25 tahun, inverter 5–10 tahun, baterai 5–10 tahun, dan pekerjaan instalasi 2 tahun. Semua garansi didokumentasikan dalam perjanjian kerja — bukan janji lisan.",
    related: [
      { label: "Tentang kami & komitmen", href: "/tentang-kami" },
      { label: "FAQ: garansi", href: "/faq" },
    ],
  },

  /* ---------- Produk & Layanan ---------- */
  {
    id: "pjuts",
    term: "PJUTS",
    category: "Produk & Layanan",
    definition:
      "Penerangan Jalan Umum Tenaga Surya — lampu jalan mandiri dengan panel, baterai LiFePO4, dan LED dalam satu tiang (4–9 meter). Spek paket 30–150 W dengan panel 50–300 Wp dan baterai 20–100 Ah, mulai Rp4,5 juta per titik. Ideal untuk jalan desa, perumahan, kawasan perkebunan, dan area publik tanpa jaringan PLN.",
    related: [
      { label: "Layanan PJUTS", href: "/pjuts" },
      { label: "Artikel: PJUTS untuk Jalan Desa", href: "/artikel/pjuts-untuk-jalan-desa-dan-perkebunan" },
    ],
  },
  {
    id: "solar-pump",
    term: "Solar Pump",
    category: "Produk & Layanan",
    definition:
      "Pompa air berdaya surya untuk irigasi dan kebutuhan air di area tanpa listrik PLN. Paket 1–3 HP dengan debit 1–10 m³/jam dan head 30–80 meter. Solar pump menghilangkan biaya bahan bakar genset dan perawatan minimal — populer untuk kebun sawit, koboi, dan pertanian di Jambi serta sekitarnya.",
    related: [
      { label: "Layanan Solar Pump", href: "/solar-pump" },
      { label: "Artikel: Solar Pump untuk Perkebunan", href: "/artikel/solar-pump-untuk-perkebunan" },
    ],
  },
  {
    id: "ev-charging",
    term: "EV Charging",
    category: "Produk & Layanan",
    definition:
      "Infrastruktur pengisian mobil listrik (EV). Kami menyediakan dan memasang EV charger AC 7,2 kW untuk rumah, kantor, dan area publik di Jambi dan sekitarnya — termasuk konsultasi daya listrik yang diperlukan serta pengurusan kebutuhan instalasinya.",
    related: [
      { label: "Layanan EV Charging", href: "/ev-charging" },
    ],
  },
  {
    id: "commissioning",
    term: "Commissioning",
    category: "Produk & Layanan",
    definition:
      "Tahap uji dan verifikasi sistem setelah instalasi selesai sebelum diserahterimakan: pengukuran produksi, pengujian proteksi, dan pengecekan fungsi perangkat. Tim kami melakukan commissioning pada setiap proyek, disertai pelatihan pemakaian bagi pemilik — bagian dari standar kerja yang terdokumentasi.",
    related: [
      { label: "Tentang kami & proses kerja", href: "/tentang-kami" },
      { label: "Layanan maintenance", href: "/maintenance" },
    ],
  },
  {
    id: "maintenance-plts",
    term: "Maintenance PLTS",
    category: "Produk & Layanan",
    definition:
      "Perawatan berkala panel surya: pembersihan permukaan panel dari debu dan kotoran, pengecekan koneksi dan proteksi, inspeksi baterai, serta verifikasi produksi. Perawatan rutin menjaga produksi tetap optimal — produksi menurun seiring debu menumpuk adalah salah satu penyebab paling umum turunnya hasil PLTS.",
    related: [
      { label: "Layanan Maintenance", href: "/maintenance" },
      { label: "Artikel: Cara Merawat Panel Surya", href: "/artikel/cara-merawat-panel-surya" },
    ],
  },
  {
    id: "tender-pengadaan",
    term: "Tender & Pengadaan",
    category: "Produk & Layanan",
    definition:
      "Layanan pengadaan dan pemasangan PLTS untuk lelang pemerintah, BUMN, dan korporasi — termasuk penyusunan dokumen teknis, NIB dan legalitas PT lengkap, serta pengalaman proyek terdokumentasi. Berpengalaman dalam proses tender pengadaan energi terbarukan berskala instansi.",
    related: [
      { label: "Layanan Tender & Pengadaan", href: "/tender-procurement" },
      { label: "Proyek & studi kasus", href: "/proyek" },
    ],
  },
];

/** Grup istilah per huruf awal (A–Z) untuk navigasi alfabet. */
export function groupByFirstLetter(
  terms: GlossaryTerm[]
): { letter: string; terms: GlossaryTerm[] }[] {
  const map = new Map<string, GlossaryTerm[]>();
  for (const t of [...terms].sort((a, b) => a.term.localeCompare(b.term, "id"))) {
    const letter = t.term[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(t);
  }
  return [...map.entries()].map(([letter, terms]) => ({ letter, terms }));
}
