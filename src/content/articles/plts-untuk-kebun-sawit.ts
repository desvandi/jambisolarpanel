import type { Article } from "./types";

export const article: Article = {
  slug: "plts-untuk-kebun-sawit",
  title: "PLTS untuk Kebun Sawit: Listrik Mandiri di Area Tanpa Jangkauan PLN",
  description:
    "PLTS off-grid menghadirkan listrik mandiri untuk kebun sawit tanpa jangkauan PLN — bandingkan biaya genset vs panel surya beserta panduan kapasitasnya.",
  category: "Kebun & Perkebunan",
  date: "2026-09-23",
  // 2026-09-24: klaim "energi gratis" pada tabel perbandingan dirapikan
  // (akurasi klaim audit R8 — energi surya tanpa biaya bahan bakar).
  updated: "2026-09-24",
  readingMinutes: 8,
  keyTakeaways: [
    "Areal kebun sawit yang jauh dari jaringan PLN umumnya bergantung pada genset BBM — dengan biaya operasional yang terus berjalan setiap hari.",
    "PLTS off-grid memasok listrik di siang hari sekaligus menyimpan kelebihannya di baterai LiFePO4 untuk malam hari.",
    "Studi kasus terdokumentasi: kebun sawit di Riau yang semula membayar Rp 12 juta per bulan untuk genset kini mandiri energi dengan sistem 10 kWp off-grid.",
    "Beban khas kebun — pompa air, CCTV, dan penerangan pondok — terpetakan jelas sehingga kapasitas sistem mudah dihitung.",
  ],
  blocks: [
    {
      type: "p",
      text: "Areal kebun sawit tersebar luas di Jambi — dari Muaro Jambi dan Batanghari hingga Sarolangun, Tebo, dan Bungo. Tantangan yang paling persisten: banyak blok kebun berada jauh dari jaringan PLN. Selama bertahun-tahun solusinya adalah genset — mudah dipasang, tetapi mahal dijalankan. Artikel ini membahas mengapa PLTS off-grid kini menjadi alternatif yang jauh lebih rasional untuk listrik kebun sawit, dibedah dari sisi biaya, komponen teknis, dan langkah penerapannya.",
    },
    { type: "h2", text: "Mengapa Kebun Sawit Butuh Listrik Mandiri" },
    {
      type: "p",
      text: "Kebun sawit modern bukan sekadar lahan tanaman. Ada serangkaian fasilitas yang membutuhkan daya listrik setiap hari di lokasi yang jauh dari sumber listrik mana pun:",
    },
    {
      type: "ul",
      items: [
        "Pompa air untuk pengairan, kebutuhan pondok karyawan, dan campuran pupuk.",
        "CCTV dan sistem keamanan yang harus aktif 24 jam menjaga aset dan hasil panen.",
        "Penerangan pondok karyawan, kantor kebun, gudang pupuk, dan area TPH (tempat pengolahan hasil).",
        "Pengisian alat komunikasi, alat ukur lapangan, dan peralatan kerja lainnya.",
      ],
    },
    {
      type: "p",
      text: "Jaringan PLN memang tidak selalu menjangkau blok-blok tersebut. Menarik jaringan baru ke pedalaman mahal dan bisa memakan waktu sangat lama, sementara kebutuhan listriknya sudah ada hari ini.",
    },
    { type: "h2", text: "Biaya Tersembunyi Genset BBM" },
    {
      type: "p",
      text: "Genset terlihat murah di awal — tetapi biaya sesungguhnya muncul setiap hari setelahnya: BBM yang harus diangkut ke lokasi, oli dan filter untuk servis rutin, keausan mesin, ditambah kebisingan dan asap yang menemani kerja karyawan. Setiap jam genset menyala adalah rupiah yang keluar, terlepas dari berapa banyak listrik yang benar-benar terpakai.",
    },
    {
      type: "p",
      text: "Sebagai gambaran nyata dari proyek yang terdokumentasi di situs kami: sebuah kebun sawit di Riau menghabiskan sekitar Rp 12 juta per bulan untuk operasional genset — sebelum beralih ke sistem PLTS off-grid 10 kWp yang kini memasok pompa air, CCTV, dan pondok kebun secara mandiri tanpa tagihan bulanan.",
    },
    { type: "h2", text: "Genset vs PLTS Off-Grid: Perbandingan Langsung" },
    {
      type: "table",
      caption: "Perbandingan genset BBM dan PLTS off-grid untuk kebun",
      headers: ["Aspek", "Genset BBM", "PLTS Off-Grid"],
      rows: [
        ["Biaya operasional harian", "BBM dan oli setiap jam operasi", "Praktis nol — energi surya tanpa biaya bahan bakar"],
        ["Kebutuhan logistik", "Angkutan BBM rutin ke lokasi", "Tidak ada"],
        ["Perawatan rutin", "Servis mesin, ganti oli dan filter", "Pembersihan panel secara berkala"],
        ["Kebisingan dan emisi", "Bising dan berasap", "Senyap dan tanpa emisi operasional"],
        ["Pasokan 24 jam", "Mesin harus menyala terus (cepat aus)", "Baterai LiFePO4 mengambil alih di malam hari"],
        ["Beban kecil vs biaya", "Tetap bayar penuh walau beban ringan", "Produksi otomatis menyesuaikan beban"],
      ],
    },
    { type: "h2", text: "Komponen Sistem PLTS Off-Grid untuk Kebun" },
    {
      type: "p",
      text: "Sistem off-grid yang andal untuk kebun tersusun dari komponen inti berikut:",
    },
    {
      type: "ul",
      items: [
        "Panel surya monokristalin 650Wp — dipasang dalam string untuk mencapai kapasitas target; 10 kWp setara sekitar 16 panel.",
        "Inverter hybrid — mengubah arus DC menjadi AC sekaligus mengatur alur daya antara panel, baterai, dan beban.",
        "Baterai LiFePO4 48V 100Ah — modular 4,8 kWh per unit, disusun sesuai kebutuhan cadangan malam hari.",
        "Proteksi lengkap: MCB DC, SPD penahan surja petir, dan grounding — krusial untuk area terbuka di dalam kebun.",
        "Monitoring arus dan tegangan untuk memantau kesehatan sistem langsung dari kantor kebun.",
      ],
    },
    { type: "h2", text: "Menghitung Cadangan Baterai untuk Malam Hari" },
    {
      type: "p",
      text: "Panel bekerja di siang hari; baterai yang menanggung malam hari. Karena itu kebutuhan baterai dihitung dari total beban malam, bukan dari kapasitas panel. Contoh praktis: jika CCTV, penerangan pondok, dan charger membutuhkan sekitar 5 kWh per malam, maka dua unit baterai LiFePO4 48V 100Ah (2 × 4,8 kWh = 9,6 kWh) memberikan cadangan nyaman untuk malam biasa sekaligus margin satu hari mendung. Untuk beban siang seperti pompa air yang berjalan saat matahari terik, kebutuhan baterai bisa ditekan lebih rendah lagi.",
    },
    {
      type: "p",
      text: "Prinsipnya: daftar dulu beban malam hari dalam kWh, bagi dengan 4,8 kWh per unit baterai, lalu bulatkan ke atas dan tambahkan satu unit sebagai cadangan. Perhitungan sederhana ini yang kami lakukan bersama pengelola kebun saat survei, sehingga anggaran tidak habis untuk kapasitas yang tidak terpakai.",
    },
    { type: "h2", text: "Langkah Membangun PLTS Kebun Sawit" },
    {
      type: "ol",
      items: [
        "Inventarisasi seluruh beban: daya setiap peralatan dan jam operasinya per hari.",
        "Survei lokasi: titik pemasangan panel yang bebas bayangan pohon, posisi pompa dan CCTV, serta jalur kabel.",
        "Hitung kapasitas: jumlah kWp panel dan jumlah unit baterai berdasarkan kebutuhan malam hari.",
        "Tentukan arsitektur: off-grid murni, atau hybrid dengan genset sebagai cadangan saat musim hujan ekstrem.",
        "Instalasi, commissioning, dan pengujian beban secara bertahap.",
        "Jadwalkan perawatan: pembersihan panel, pengecekan terminal, dan reviu data monitoring.",
      ],
    },
    {
      type: "note",
      title: "Strategi bertahap",
      text: "Banyak kebun memulai dari beban paling kritis (CCTV dan pompa air) dengan sistem kecil, lalu menambah kapasitas setelah performanya terbukti. Baterai LiFePO4 yang modular membuat penambahan ini mudah tanpa mengganti sistem.",
    },
    {
      type: "cta",
      text: "Mengelola kebun di area tanpa jangkauan PLN? Kami merancang sistem off-grid berdasarkan survei lokasi dan audit beban langsung di kebun Anda.",
      href: "/solar-commercial",
      label: "Konsultasi PLTS Kebun & Perkebunan",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Studi Kasus: Kebun Sawit Riau 10 kWp Off-Grid",
          href: "/studi-kasus/kebun-sawit-riau-10-kwp-off-grid",
          desc: "Dari tagihan genset Rp 12 juta per bulan menjadi listrik mandiri.",
        },
        {
          label: "PLTS Hybrid vs Off-Grid: Mana yang Tepat?",
          href: "/artikel/plts-hybrid-vs-off-grid",
          desc: "Perbedaan, kelebihan, dan kekurangan kedua arsitektur sistem.",
        },
        {
          label: "Solar Pump untuk Perkebunan",
          href: "/artikel/solar-pump-untuk-perkebunan",
          desc: "Pompa air tenaga surya tanpa biaya BBM untuk irigasi kebun.",
        },
      ],
    },
  ],
  relatedSlugs: ["solar-pump-untuk-perkebunan", "pjuts-untuk-jalan-desa-dan-perkebunan", "plts-hybrid-vs-off-grid"],
};
