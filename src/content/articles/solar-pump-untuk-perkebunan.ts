import type { Article } from "./types";

export const article: Article = {
  slug: "solar-pump-untuk-perkebunan",
  title: "Solar Pump untuk Perkebunan: Pompa Air Tanpa Biaya BBM",
  description:
    "Solar pump mengairi kebun sawit dan karet tanpa biaya BBM. Pelajari cara kerja pompa air tenaga surya, pilihan kapasitas 1–3 HP, dan tips memilihnya.",
  category: "Kebun & Perkebunan",
  date: "2026-09-23",
  // 2026-09-25: sweep konsistensi kapasitas studi kasus (audit ulang total) —
  // label tautan sawit 10 kWp → 10,4 kWp (selaras caseStudies.ts).
  updated: "2026-09-25",
  readingMinutes: 7,
  keyTakeaways: [
    "Solar pump mengubah sinar matahari langsung menjadi daya pompa — tanpa BBM, tanpa tagihan, dan tanpa kabel PLN.",
    "Pompa submersible dengan controller MPPT bekerja paling keras saat matahari terik, tepat ketika kebutuhan air di kebun paling tinggi.",
    "Tersedia kapasitas 1–3 HP untuk berbagai skala lahan, dari irigasi kecil hingga perkebunan 5–10 hektar.",
    "Fitur proteksi dry-run dan bodi stainless steel menjaga pompa aman dipakai di sumur bor kebun sepanjang tahun.",
  ],
  blocks: [
    {
      type: "p",
      text: "Air adalah nyawa perkebunan. Pembibitan sawit dan karet butuh penyiraman konsisten, pondok karyawan butuh air bersih, dan kolam ikan di dalam kebun butuh pasokan rutin. Masalahnya, titik air di kebun sering berada jauh dari jaringan listrik — dan selama ini satu-satunya pilihan adalah pompa berbahan bakar solar yang logistiknya melelahkan. Solar pump mengubah situasi itu: pompa air yang seluruh energinya berasal dari matahari, tanpa biaya BBM sepeser pun setelah terpasang.",
    },
    { type: "h2", text: "Cara Kerja Solar Pump" },
    {
      type: "p",
      text: "Solar pump adalah sistem pompa air yang digerakkan langsung oleh panel surya. Rantainya sederhana dan andal:",
    },
    {
      type: "ol",
      items: [
        "Panel surya menghasilkan daya DC sejak matahari pagi mulai terbit.",
        "Controller MPPT mengekstraksi daya maksimum dari panel dan menyalurkannya ke pompa submersible.",
        "Pompa mengangkat air dari sumur bor ke tangki, kolam, atau jaringan irigasi.",
        "Saat matahari terbenam pompa berhenti otomatis — air yang sudah tersimpan di penampung melanjutkan pasokan.",
      ],
    },
    {
      type: "p",
      text: "Karena pompa bekerja di siang hari, sebagian besar sistem solar pump tidak membutuhkan baterai sama sekali. Ini menekan biaya investasi sekaligus mengurangi komponen yang perlu dirawat — strategi penampungan air menggantikan fungsi penyimpanan listrik.",
    },
    { type: "h2", text: "Aplikasi Solar Pump di Perkebunan" },
    {
      type: "ul",
      items: [
        "Irigasi kebun sawit dan karet, terutama pembibitan dan tanaman muda yang butuh air stabil.",
        "Pasokan air bersih untuk pondok karyawan dan area TPH.",
        "Pengisian kolam ikan dan embung penampung air di dalam kebun.",
        "Air untuk campuran pupuk dan pestisida di area semai.",
        "Kebutuhan air peternakan yang berada satu kawasan dengan kebun.",
      ],
    },
    { type: "h2", text: "Pompa BBM vs Solar Pump" },
    {
      type: "table",
      caption: "Perbandingan pompa berbahan bakar dan solar pump untuk kebun",
      headers: ["Aspek", "Pompa BBM", "Solar Pump"],
      rows: [
        ["Biaya bahan bakar", "Terus-menerus, naik saat harga BBM naik", "Nol — energi dari matahari"],
        ["Logistik", "Angkutan BBM rutin ke titik pompa", "Tidak ada"],
        ["Perawatan", "Servis mesin, busi, dan filter berkala", "Minim — tanpa mesin pembakaran"],
        ["Kebisingan dan asap", "Ada, mengganggu area kerja", "Tidak ada"],
        ["Jam operasi paling kuat", "Tergantung BBM yang tersedia", "Jam terik — tepat saat penguapan dan kebutuhan air tertinggi"],
        ["Simpanan energi", "Tangki BBM yang menyusut", "Tangki air dan embung yang terisi setiap siang"],
      ],
    },
    { type: "h2", text: "Memilih Kapasitas: dari 1 sampai 3 HP" },
    {
      type: "p",
      text: "Kapasitas pompa ditentukan oleh dua parameter: debit air yang dibutuhkan per jam dan total head — ketinggian angkat ditambah kerugian gesekan pada pipa. Panduan praktis berdasarkan paket solar pump yang kami sediakan:",
    },
    {
      type: "table",
      caption: "Panduan kapasitas solar pump untuk perkebunan",
      headers: ["Kapasitas Pompa", "Panel Surya", "Debit Air", "Maks. Head", "Skala Pemakaian"],
      rows: [
        ["1 HP", "1 × 650Wp", "1–2 m³/jam", "30 meter", "Rumah kebun, taman, kolam, lahan di bawah 1 hektar"],
        ["1,5 HP", "2 × 650Wp", "2–4 m³/jam", "45 meter", "Irigasi kebun 1–2 hektar dan peternakan menengah"],
        ["2 HP", "2 × 650Wp", "4–6 m³/jam", "60 meter", "Kebun sawit dan karet 2–4 hektar"],
        ["3 HP", "3 × 650Wp", "6–10 m³/jam", "80 meter", "Perkebunan 5–10 hektar dan kebutuhan industrial ringan"],
      ],
    },
    {
      type: "p",
      text: "Semua paket menggunakan pompa submersible berbodi stainless steel dengan controller MPPT dan proteksi dry-run — pompa berhenti otomatis saat sumber air habis sehingga motor tidak terbakar.",
    },
    { type: "h2", text: "Tips Pemasangan Solar Pump di Kebun" },
    {
      type: "ol",
      items: [
        "Survei sumber air: kedalaman muka air sumur dan ketersediaan debitnya sepanjang tahun.",
        "Hitung total head dinamis: kedalaman angkat, jarak horizontal, ditambah kerugian gesekan pipa.",
        "Pasang panel di area terbuka yang bebas bayangan — ingat bahwa pohon kebun terus tumbuh, jadi cek ulang bayangan setiap tahun.",
        "Sediakan tangki atau embung penampung sebagai cadangan pasokan malam hari.",
        "Aktifkan proteksi dry-run dan pasang penutup panel berjaring bila lokasi rawan kotoran daun.",
      ],
    },
    {
      type: "note",
      title: "Mengapa tanpa baterai?",
      text: "Sebagian besar sistem solar pump dirancang day-only: pompa bekerja saat matahari terik dan mengisi penampung. Air yang tersimpan berfungsi seperti baterai — jauh lebih murah dan bertahan puluhan tahun tanpa penurunan kapasitas.",
    },
    { type: "h2", text: "Perawatan Solar Pump: Sedikit tapi Rutin" },
    {
      type: "p",
      text: "Karena tidak ada mesin pembakaran, daftar perawatan solar pump jauh lebih pendek daripada pompa BBM. Yang perlu dilakukan secara berkala:",
    },
    {
      type: "ul",
      items: [
        "Bersihkan permukaan panel dari debu, daun, dan noda — panel kotor menurunkan daya pompa secara langsung.",
        "Periksa sambungan kabel MC4 dan terminal controller dari korosi dan gigitan hewan.",
        "Uji fungsi proteksi dry-run setiap beberapa bulan agar pompa berhenti sebagaimana mestinya saat air habis.",
        "Cek posisi panel terhadap pohon di sekitarnya — kanopi yang membesar bisa menutup matahari secara perlahan tanpa disadari.",
      ],
    },
    {
      type: "p",
      text: "Pompa submersible pada paket kami dilengkapi garansi 2 tahun, dan pembersihan panel bisa digabung ke dalam kunjungan perawatan PLTS lain di kebun agar biayanya efisien.",
    },
    {
      type: "cta",
      text: "Butuh pompa air untuk kebun tanpa biaya BBM? Kami membantu menghitung debit, head, dan konfigurasi panel sesuai kondisi sumur Anda.",
      href: "/solar-pump",
      label: "Layanan Solar Pump untuk Kebun",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Studi Kasus: Kebun Sawit Riau 10,4 kWp Off-Grid",
          href: "/studi-kasus/kebun-sawit-riau-10-kwp-off-grid",
          desc: "Sistem off-grid untuk pompa air, CCTV, dan pondok kebun.",
        },
        {
          label: "PLTS untuk Kebun Sawit",
          href: "/artikel/plts-untuk-kebun-sawit",
          desc: "Listrik mandiri lengkap untuk kebun tanpa jangkauan PLN.",
        },
        {
          label: "Cara Menentukan Kapasitas PLTS",
          href: "/artikel/cara-menentukan-kapasitas-plts",
          desc: "Langkah menghitung kebutuhan sistem langkah demi langkah.",
        },
      ],
    },
  ],
  relatedSlugs: ["plts-untuk-kebun-sawit", "cara-menentukan-kapasitas-plts", "cara-menghitung-kebutuhan-baterai"],
};
