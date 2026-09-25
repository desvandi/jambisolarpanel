import type { Article } from "./types";

export const article: Article = {
  slug: "plts-hybrid-vs-off-grid",
  title: "PLTS Hybrid vs Off-Grid: Perbedaan, Kelebihan, dan Mana yang Cocok",
  description:
    "Beda PLTS hybrid dan off-grid: cara kerja, kelebihan, perbandingan biaya, dan panduan memilih konfigurasi yang tepat untuk rumah, kebun, atau usaha Anda.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  // 2026-09-25: sweep konsistensi kapasitas studi kasus (audit ulang total) —
  // villa 5 kWp → 5,2 kWp, sawit 10 kWp → 10,4 kWp pada narasi portofolio
  // dan label tautan studi kasus (selaras caseStudies.ts).
  updated: "2026-09-25",
  readingMinutes: 7,
  keyTakeaways: [
    "PLTS hybrid tetap terhubung ke PLN sebagai jaring pengaman; baterainya opsional dan sistem tetap menyala ketika listrik PLN padam.",
    "PLTS off-grid berdiri sendiri tanpa jaringan PLN; baterai wajib dan kapasitasnya harus menutup kebutuhan malam serta hari mendung berturut-turut.",
    "Rumah di area dengan PLN stabil umumnya lebih ekonomis memakai hybrid; lokasi tanpa akses listrik lebih cocok off-grid.",
    "Baterai LiFePO4 4,8 kWh per unit adalah komponen yang paling membedakan biaya kedua sistem.",
  ],
  blocks: [
    {
      type: "p",
      text: "Saat merencanakan pemasangan PLTS, keputusan paling mendasar bukanlah merek panel atau kapasitas — melainkan konfigurasi sistem: hybrid atau off-grid. Pilihan ini menentukan komponen yang dipasang, besar biaya, dan bagaimana rumah atau usaha Anda menghadapi malam hari serta pemadaman. Artikel ini membedah perbedaan keduanya secara teknis, lalu membantu Anda memilih yang paling sesuai.",
    },
    { type: "h2", text: "Cara Kerja PLTS Hybrid" },
    {
      type: "p",
      text: "Sistem hybrid memasang panel surya dan inverter hybrid yang tetap terhubung dengan jaringan PLN. Alur energinya berjalan dalam tiga skenario:",
    },
    {
      type: "ol",
      items: [
        "Siang hari: panel memasok beban rumah secara langsung; kelebihan produksi mengisi baterai jika dipasang.",
        "Sore hingga malam: beban dialihkan ke baterai atau PLN, sesuai prioritas yang diatur di inverter.",
        "Saat PLN padam: inverter hybrid otomatis mengambil alih dari baterai, sehingga beban penting tetap menyala tanpa jeda.",
      ],
    },
    {
      type: "p",
      text: "Inverter hybrid satu fase tersedia di kelas 3,6, 6, 8, hingga 10 kW untuk kebutuhan rumah. Instalasi tiga fase — untuk usaha, workshop, atau gedung — memakai kelas 10, 15, atau 20 kW.",
    },
    { type: "h2", text: "Cara Kerja PLTS Off-Grid" },
    {
      type: "p",
      text: "Sistem off-grid tidak terhubung ke jaringan PLN sama sekali. Panel, baterai, dan inverter bekerja mandiri:",
    },
    {
      type: "ol",
      items: [
        "Siang hari: panel memasok beban sekaligus mengisi baterai.",
        "Malam hari: seluruh kebutuhan diambil dari baterai.",
        "Cuaca buruk berkepanjangan: sistem mengandalkan cadangan baterai, penjadwalan beban, atau genset cadangan.",
      ],
    },
    {
      type: "p",
      text: "Karena tidak ada jaringan pengaman, off-grid menuntut perhitungan yang jauh lebih ketat: panel harus menutup kebutuhan harian ditambah rugi-rugi pengisian, dan baterai harus cukup untuk melewati malam serta rangkaian hari mendung.",
    },
    { type: "h2", text: "Perbandingan Langsung: PLTS Hybrid vs Off-Grid" },
    {
      type: "table",
      caption: "Perbandingan PLTS hybrid dan off-grid",
      headers: ["Aspek", "PLTS Hybrid", "PLTS Off-Grid"],
      rows: [
        ["Sumber listrik", "Surya + PLN + baterai (opsional)", "Surya + baterai saja"],
        ["Baterai", "Opsional; bisa ditambah belakangan", "Wajib; kapasitas besar"],
        ["Saat PLN padam", "Beban penting tetap menyala dari baterai", "Tidak berdampak — memang tidak terhubung PLN"],
        ["Hari mendung panjang", "Otomatis tertutup oleh pasokan PLN", "Butuh genset atau penjadwalan beban"],
        ["Biaya di muka", "Lebih ringan karena baterai bisa ditunda", "Lebih besar karena panel dan baterai lebih banyak"],
        ["Tagihan bulanan", "Berlanjut, namun jauh berkurang", "Tidak ada sama sekali"],
        ["Paling cocok untuk", "Rumah dan usaha yang terjangkau PLN", "Kebun, pompa air, pos jaga, area tanpa jaringan"],
      ],
    },
    { type: "h2", text: "Kelebihan dan Keterbatasan Masing-masing" },
    { type: "h3", text: "PLTS Hybrid" },
    {
      type: "ul",
      items: [
        "Biaya awal fleksibel: baterai bisa ditunda atau ditambah bertahap per unit 4,8 kWh.",
        "Tidak pernah kehabisan listrik — PLN menjadi jaring pengaman saat produksi surya rendah.",
        "Efektif menekan tagihan karena beban siang hari disuplai langsung oleh surya.",
        "Keterbatasannya: membutuhkan akses jaringan PLN di lokasi, sehingga tidak berlaku untuk area terpencil.",
      ],
    },
    { type: "h3", text: "PLTS Off-Grid" },
    {
      type: "ul",
      items: [
        "Mandiri penuh: tanpa tagihan listrik dan tanpa dampak kenaikan tarif.",
        "Satu-satunya pilihan di lokasi yang belum terjangkau jaringan, atau bila biaya penyambungan listrik baru melampaui biaya sistem surya.",
        "Sangat efektif untuk beban terjadwal seperti pompa irigasi yang hanya beroperasi siang hari.",
        "Keterbatasannya: menuntut disiplin energi — beban harus disesuaikan dengan kapasitas yang tersedia, terutama saat mendung berhari-hari.",
      ],
    },
    { type: "h2", text: "Mana yang Cocok untuk Anda?" },
    {
      type: "p",
      text: "Secara praktis, jawaban ditentukan oleh satu pertanyaan: apakah lokasi Anda terjangkau jaringan PLN dengan andal?",
    },
    {
      type: "ul",
      items: [
        "Pilih hybrid jika rumah atau usaha Anda berada di area dengan pasokan PLN stabil dan tujuan utamanya memangkas tagihan — sambil mendapat bonus ketahanan saat pemadaman.",
        "Pilih off-grid jika lokasi berada jauh dari jaringan: kebun sawit atau perkebunan, pompa air di ladang, pos keamanan, atau pondok kerja di kawasan terpencil.",
        "Belum yakin? Konfigurasi bisa dirancang per kasus — misalnya hybrid dengan kapasitas baterai besar untuk area yang terjangkau PLN namun sering padam.",
      ],
    },
    {
      type: "p",
      text: "Dua proyek di portofolio kami menggambarkan perbedaan ini dengan baik: sebuah villa di Jambi yang memilih sistem hybrid 5,2 kWp karena lokasinya sudah tersambung PLN dan mengutamakan kenyamanan tamu, serta kebun sawit di Riau yang memilih off-grid 10,4 kWp karena areal kerjanya tidak terjangkau jaringan. Keduanya benar — karena keduanya menjawab konteks lokasi yang berbeda.",
    },
    {
      type: "cta",
      text: "Rumah Anda terjangkau PLN dan ingin mulai menghemat tagihan? Kenali solusi PLTS untuk rumah tangga — dari kapasitas paket hingga opsi baterai yang bisa ditambah belakangan.",
      href: "/solar-home",
      label: "Solusi PLTS Rumah Tangga",
    },
    { type: "h2", text: "Peran Baterai: Komponen Pembeda Kedua Sistem" },
    {
      type: "p",
      text: "Pada sistem hybrid, baterai berfungsi memberi kenyamanan: menikmati listrik surya di malam hari dan tetap menyala ketika PLN padam. Pada sistem off-grid, baterai adalah jantung sistem — tanpa baterai, tidak ada listrik begitu matahari terbenam. Kebutuhan baterai off-grid dihitung dengan rumus: kebutuhan kWh malam × hari otonomi ÷ kedalaman pelepasan (DoD). Baterai LiFePO4 48V 100Ah menyimpan 4,8 kWh per unit dengan DoD 80–90%, sehingga kapasitas terpakainya sekitar 3,8–4,3 kWh per unit. Contoh: kebutuhan malam 5 kWh dengan satu hari otonomi membutuhkan 5 ÷ 0,8 ≈ 6,25 kWh — berarti memasang 2 unit (9,6 kWh terpasang) agar aman.",
    },
    { type: "h2", text: "Kesimpulan" },
    {
      type: "p",
      text: "Hybrid dan off-grid bukan soal mana yang lebih baik, melainkan mana yang sesuai konteks lokasi dan pola konsumsi Anda. Hybrid unggul dalam fleksibilitas biaya dan kenyamanan; off-grid unggul dalam kemandirian untuk area tanpa jaringan. Tentukan kondisi lapangan dan kebutuhan energi Anda lebih dulu — konfigurasi dan kapasitas tinggal menyesuaikan.",
    },
    {
      type: "cta",
      text: "Untuk kebun, perkebunan, atau usaha di lokasi terpencil, sistem off-grid dirancang khusus mengikuti profil beban dan kondisi lapangan Anda.",
      href: "/solar-commercial",
      label: "Solusi PLTS Komersial dan Industri",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Studi Kasus: Villa Jambi 5,2 kWp Hybrid",
          href: "/studi-kasus/villa-jambi-5-kwp-hybrid",
          desc: "Contoh penerapan sistem hybrid untuk properti yang terjangkau PLN",
        },
        {
          label: "Studi Kasus: Kebun Sawit Riau 10,4 kWp Off-Grid",
          href: "/studi-kasus/kebun-sawit-riau-10-kwp-off-grid",
          desc: "Sistem mandiri untuk kebutuhan kebun tanpa jaringan PLN",
        },
        {
          label: "Berapa kWp Panel Surya untuk Rumah?",
          href: "/artikel/berapa-kwp-panel-surya-untuk-rumah",
          desc: "Langkah menghitung kapasitas sebelum memilih konfigurasi",
        },
      ],
    },
  ],
  relatedSlugs: [
    "berapa-kwp-panel-surya-untuk-rumah",
    "harga-panel-surya-jambi-faktor-biaya",
    "cara-menghitung-kebutuhan-baterai",
  ],
};
