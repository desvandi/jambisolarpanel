/**
 * SINGLE SOURCE OF TRUTH untuk FAQ.
 *
 * FAQ UI (src/components/landing/FAQSection.tsx), FAQPage JSON-LD homepage
 * (src/app/page.tsx), dan halaman /faq HARUS membaca dari file ini
 * agar structured data selalu identik dengan konten yang terlihat.
 *
 * ATURAN KONTEN: hanya data terverifikasi internal —
 * PSH Jambi 3,75 jam; efisiensi 80%; 1 kWp ±3 kWh/hari;
 * paket rumah 1,3–5,2 kWp; bisnis 7,15–10,4 kWp; industri 11,7–20,8 kWp;
 * baterai LiFePO4 48V 100Ah (4,8 kWh/unit); garansi panel 25 thn performa,
 * inverter 5–10 thn, baterai 5–10 thn, instalasi 2 thn;
 * ROI rumah 8–9 thn, bisnis 5–7 thn; PPN 11%.
 */

export interface FaqItem {
  q: string;
  a: string;
}

/* ---------- FAQ homepage (8 item, urutan tetap) ---------- */

const FAQ_BIAYA: FaqItem = {
  q: "Berapa biaya pasang panel surya?",
  a: "Biaya instalasi panel surya bervariasi tergantung kapasitas sistem dan kebutuhan spesifik Anda. Untuk rumah tangga, paket mulai dari Paket 1.3 kWp (tanpa baterai) hingga Paket 5.2 kWp. Untuk bisnis dan industri, paket mulai dari Paket 7.15 kWp. Semua harga sudah termasuk PPN 11%, peralatan, instalasi, survei, desain, dan garansi resmi. Tersedia juga add-on Kanopi Carport dan Smart Monitoring untuk paket Bisnis & Industri. Kami menyediakan konsultasi dan survei gratis untuk memberikan estimasi biaya yang akurat sesuai kebutuhan Anda. Rincian harga per kapasitas dapat dilihat di halaman Harga Panel Surya Jambi.",
};

export const FAQ_ROI: FaqItem = {
  q: "Berapa lama balik modal (ROI)?",
  a: "Masa balik modal (Return on Investment) bervariasi tergantung kapasitas sistem dan kebutuhan listrik Anda. Untuk rumah tangga (paket 2.6-5.2 kWp), ROI realistis tercapai dalam 8-9 tahun. Untuk bisnis dan industri (paket 7.15-20.8 kWp), ROI tercapai dalam 5-7 tahun karena skala ekonomi yang lebih besar. Perhitungan ini sudah memperhitungkan kenaikan tarif PLN rata-rata 6% per tahun. Yang lebih penting: dalam 25 tahun umur panel, total keuntungan bersih mencapai 5-7 kali lipat dari investasi awal — artinya investasi Rp 100 juta menghasilkan keuntungan bersih Rp 500-700 juta selama masa pakai sistem. Kami akan memberikan perhitungan ROI detail saat konsultasi.",
};

const FAQ_OFFGRID: FaqItem = {
  q: "Apakah sistem bisa bekerja tanpa PLN?",
  a: "Ya, absolut bisa! Sistem PLTS Off-Grid dirancang khusus untuk area yang tidak terjangkau jaringan PLN. Sistem ini menggunakan panel surya yang terhubung ke baterai penyimpanan, sehingga Anda mendapatkan pasokan listrik 24 jam tanpa bergantung pada PLN. Ini sangat ideal untuk kebun, pondok, vila terpencil, pos keamanan, dan area rural lainnya. Tim kami akan melakukan survei dan desain yang tepat untuk memastikan sistem berjalan optimal.",
};

const FAQ_HUJAN: FaqItem = {
  q: "Bagaimana performa panel surya saat hujan atau mendung?",
  a: "Panel surya modern tetap menghasilkan energi listrik meskipun saat mendung atau hujan, meskipun kapasitasnya berkurang sekitar 10-25% dibandingkan cuaca cerah. Indonesia yang beriklim tropis justru merupakan lokasi ideal untuk panel surya karena intensitas matahari yang tinggi sepanjang tahun. Untuk sistem Hybrid dan Off-Grid, baterai penyimpanan akan memastikan pasokan listrik tetap stabil. Anda juga tetap bisa menggunakan listrik PLN sebagai backup pada sistem Hybrid.",
};

const FAQ_GARANSI: FaqItem = {
  q: "Berapa lama garansi yang diberikan?",
  a: "Kami memberikan garansi yang sangat komprehensif: Panel surya bergaransi performa hingga 25 tahun dengan penurunan output minimal. Inverter bergaransi 5-10 tahun tergantung merek dan model. Baterai penyimpanan bergaransi 5-10 tahun. Instalasi dan pekerjaan bergaransi 2 tahun. Semua garansi didukung langsung oleh PT. Jaya Mandiri Smart Energy dan didokumentasikan secara resmi dalam perjanjian kerja.",
};

const FAQ_CICILAN: FaqItem = {
  q: "Apakah tersedia opsi cicilan?",
  a: "Ya, kami memahami bahwa investasi panel surya memerlukan perencanaan keuangan yang matang. Kami menyediakan beberapa opsi pembayaran termasuk cicilan untuk memudahkan Anda. Skema pembayaran dapat disesuaikan dengan kondisi finansial Anda. Alternatif lain, tersedia program Sewa PLTS dengan skema bayar bulanan tanpa investasi awal. Hubungi tim sales kami via WhatsApp untuk mendapatkan informasi lebih detail mengenai opsi cicilan dan skema pembayaran yang tersedia saat ini.",
};

const FAQ_ATAP: FaqItem = {
  q: "Apakah atap rumah saya cocok untuk panel surya?",
  a: "Sebagian besar jenis atap cocok untuk instalasi panel surya, termasuk atap datar (flat), atap miring (pitched), dan atap genteng. Faktor penting yang perlu dipertimbangkan adalah arah hadap atap (idealnya menghadap utara/selatan di Indonesia), kemiringan atap, kondisi struktural atap, dan tidak adanya bayangan yang signifikan. Tim kami akan melakukan survei gratis untuk menilai kelayakan atap Anda dan memberikan rekomendasi terbaik.",
};

const FAQ_INSTALASI: FaqItem = {
  q: "Berapa lama proses instalasi?",
  a: "Proses instalasi standar untuk rumah tangga biasanya memakan waktu 1-3 hari kerja tergantung kapasitas sistem. Untuk proyek bisnis dan industri, waktu instalasi bisa 1-2 minggu. Keseluruhan proses dari survei, desain, pengadaan material, hingga instalasi biasanya memakan waktu 2-4 minggu. Kami berkomitmen untuk menyelesaikan proyek dengan cepat tanpa mengorbankan kualitas.",
};

export const homepageFaqs: FaqItem[] = [
  FAQ_BIAYA,
  FAQ_ROI,
  FAQ_OFFGRID,
  FAQ_HUJAN,
  FAQ_GARANSI,
  FAQ_CICILAN,
  FAQ_ATAP,
  FAQ_INSTALASI,
];

/* ---------- FAQ tambahan khusus halaman /faq ---------- */

export const FAQ_PRODUKSI: FaqItem = {
  q: "Berapa produksi listrik 1 kWp panel surya di Jambi?",
  a: "Di wilayah Jambi, potensi sinar matahari (PSH) rata-rata sekitar 3,75 jam per hari. Dengan efisiensi sistem sekitar 80%, setiap 1 kWp panel surya menghasilkan kira-kira 3 kWh listrik per hari, atau sekitar 90 kWh per bulan. Sebagai contoh, Paket 5.2 kWp menghasilkan sekitar 15 kWh per hari — cukup untuk kebutuhan rumah dengan AC 1 unit, kulkas, dan peralatan rumah tangga lainnya. Estimasi produksi untuk setiap paket tercantum di halaman Harga Panel Surya Jambi, dan tim kami akan memberikan perhitungan yang lebih akurat berdasarkan profil pemakaian Anda saat survei.",
};

const FAQ_HYBRID: FaqItem = {
  q: "Apa perbedaan sistem Hybrid dan Off-Grid?",
  a: "Sistem Hybrid terhubung ke jaringan PLN sekaligus memiliki baterai: siang hari beban Anda dipasok panel surya, kelebihan energi mengisi baterai, dan saat PLN padam sistem otomatis beralih ke baterai — sehingga listrik tetap menyala. Sistem Off-Grid sepenuhnya mandiri tanpa koneksi PLN: seluruh kebutuhan listrik dipasok panel surya dan baterai, cocok untuk kebun, pondok, dan lokasi terpencil yang tidak terjangau jaringan. Pilihan terbaik bergantung pada lokasi dan pola pemakaian Anda — tim insinyur kami akan merekomendasikan konfigurasi yang tepat saat konsultasi. Panduan lengkapnya juga tersedia di artikel kami tentang perbandingan PLTS Hybrid vs Off-Grid.",
};

const FAQ_BATERAI: FaqItem = {
  q: "Berapa banyak baterai yang saya butuhkan?",
  a: "Kebutuhan baterai bergantung pada beban listrik malam hari dan durasi backup yang diinginkan. Kami menggunakan baterai LiFePO4 48V 100Ah dengan kapasitas 4,8 kWh per unit. Sebagai aturan praktis, kapasitas baterai (kWh) idealnya mendekati hasil kali kapasitas sistem (kWp) dengan PSH lokasi Anda — misalnya sistem 2,6 kWp di Jambi (PSH 3,75) cocok dengan sekitar 2 unit baterai. Karena baterai LiFePO4 memiliki depth of discharge 80-90%, tersedia energi cadangan yang cukup untuk malam hari. Jumlah unit final selalu dihitung ulang oleh insinyur kami berdasarkan audit beban saat survei.",
};

const FAQ_UMUR: FaqItem = {
  q: "Berapa umur pakai panel surya dan apakah perlu perawatan?",
  a: "Panel surya monokristalin modern memiliki umur pakai 25 tahun atau lebih, dengan garansi performa hingga 25 tahun — penurunan output yang terjamin minimal. Perawatan yang dibutuhkan relatif sederhana: pembersihan panel secara berkala dari debu dan kotoran (terutama di area berdebu atau dekat perkebunan), serta pengecekan koneksi dan performa sistem. Kami menyediakan layanan Maintenance untuk perawatan berkala, dan paket tertentu dapat dilengkapi Smart Monitoring agar Anda dapat memantau produksi real-time dari smartphone. Detailnya ada di halaman layanan Maintenance kami.",
};

const FAQ_AREA: FaqItem = {
  q: "Area layanan mana saja yang terjangkau?",
  a: "Kami berbasis di Muaro Jambi, Provinsi Jambi, dan melayani wilayah Jambi serta Sumatera dan Jawa Bagian Barat — termasuk Riau, Palembang (Sumsel), Padang (Sumbar), Lampung, dan Bangka. Untuk proyek di luar area tersebut, silakan hubungi kami via WhatsApp untuk konsultasi kelayakan. Survei lokasi gratis tersedia untuk area tertentu — tim kami akan mengonfirmasi cakupan survei gratis saat penjadwalan.",
};

const FAQ_SURVEI: FaqItem = {
  q: "Bagaimana proses survei dan konsultasi gratis?",
  a: "Prosesnya sederhana: hubungi kami via WhatsApp, ceritakan kebutuhan dan lokasi Anda, lalu jadwalkan kunjungan survei. Saat survei, tim kami mengaudit beban listrik (menghitung konsumsi peralatan), menilai kondisi atap atau lokasi pemasangan (arah hadap, kemiringan, bayangan), dan mengukur ruang yang tersedia. Hasilnya berupa rekomendasi kapasitas sistem, konfigurasi hybrid/off-grid, estimasi produksi, dan penawaran harga resmi. Survei dan konsultasi ini tidak dipungut biaya dan tanpa kewajiban memesan.",
};

const FAQ_SEWA_APA: FaqItem = {
  q: "Apa itu Sewa PLTS dan bagaimana cara kerjanya?",
  a: "Sewa PLTS memungkinkan Anda menggunakan sistem panel surya dengan pembayaran bulanan, tanpa investasi awal besar seperti pembelian. Sistem dipasang di lokasi Anda, dan Anda cukup membayar biaya sewa bulanan selama masa kontrak. Cocok untuk usaha yang ingin menekan biaya operasional segera, mencoba PLTS sebelum membeli, atau menghindari pengeluaran modal di awal. Daftar paket sewa dan skema pembayarannya dapat dilihat di halaman Sewa PLTS kami.",
};

const FAQ_SEWA_TERMASUK: FaqItem = {
  q: "Apa saja yang termasuk dalam paket Sewa PLTS?",
  a: "Paket sewa mencakup pemasangan sistem PLTS di lokasi Anda, perawatan selama masa sewa, dan dukungan teknis — sehingga Anda tidak perlu memikirkan biaya perawatan terpisu. Konfigurasi sistem (kapasitas panel, inverter, dan baterai) disesuaikan dengan profil beban dan kebutuhan Anda, ditentukan lewat survei gratis sebelum kontrak. Detail lengkap komponen tiap paket sewa, termasuk opsi dual-mode, tersedia di halaman Sewa PLTS.",
};

const FAQ_SEWA_DUAL: FaqItem = {
  q: "Apakah sistem sewa bisa dikonversi menjadi milik sendiri?",
  a: "Ya, tersedia skema dual-mode: Anda dapat menyewa terlebih dahulu, lalu mengonversi sistem menjadi milik sendiri di kemudian hari sesuai ketentuan kontrak. Skema ini cocok jika Anda ingin segera menikmati manfaat PLTS namun belum siap berinvestasi penuh, atau ingin menguji performa sistem di lokasi Anda terlebih dahulu. Tim kami akan menjelaskan mekanisme konversi dan perhitungan nilainya saat konsultasi — hubungi kami via WhatsApp untuk detail skema yang berlaku saat ini.",
};

/* ---------- Struktur kategori halaman /faq ---------- */

export interface FaqCategory {
  /** Anchor id untuk navigasi kategori. */
  id: string;
  title: string;
  description: string;
  items: FaqItem[];
}

/**
 * FAQ terkategorisasi untuk halaman /faq.
 * Item homepage dipakai ulang (single source) + FAQ tambahan.
 */
export const faqCategories: FaqCategory[] = [
  {
    id: "biaya-investasi",
    title: "Biaya & Investasi",
    description: "Harga paket, ROI, skema pembayaran, dan struktur biaya PLTS.",
    items: [FAQ_BIAYA, FAQ_ROI, FAQ_CICILAN, FAQ_PRODUKSI],
  },
  {
    id: "teknis-sistem",
    title: "Teknis & Sistem",
    description: "Performa sistem, konfigurasi hybrid/off-grid, dan baterai.",
    items: [FAQ_HYBRID, FAQ_OFFGRID, FAQ_HUJAN, FAQ_BATERAI, FAQ_ATAP, FAQ_UMUR],
  },
  {
    id: "proses-layanan",
    title: "Proses & Layanan",
    description: "Survei, instalasi, garansi, dan area layanan kami.",
    items: [FAQ_SURVEI, FAQ_INSTALASI, FAQ_GARANSI, FAQ_AREA],
  },
  {
    id: "sewa-plts",
    title: "Sewa PLTS",
    description: "Skema bayar bulanan tanpa investasi awal besar.",
    items: [FAQ_SEWA_APA, FAQ_SEWA_TERMASUK, FAQ_SEWA_DUAL],
  },
];

/** Semua FAQ halaman /faq (untuk FAQPage JSON-LD). */
export const allFaqItems: FaqItem[] = faqCategories.flatMap((c) => c.items);
