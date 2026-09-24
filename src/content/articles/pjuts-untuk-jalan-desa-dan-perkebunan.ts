import type { Article } from "./types";

export const article: Article = {
  slug: "pjuts-untuk-jalan-desa-dan-perkebunan",
  title: "PJUTS untuk Jalan Desa dan Perkebunan: Penerangan Tanpa Kabel PLN",
  description:
    "PJUTS menerangi jalan desa dan jalan kebun tanpa kabel PLN dan tanpa tagihan bulanan. Panduan memilih kapasitas 30–150W untuk wilayah Jambi.",
  category: "Energi Surya Jambi",
  date: "2026-09-23",
  readingMinutes: 7,
  keyTakeaways: [
    "PJUTS (Penerangan Jalan Umum Tenaga Surya) menyala otomatis saat gelap tanpa jaringan PLN, tanpa kabel, dan tanpa meteran.",
    "Satu tiang all-in-one memadatkan panel surya, baterai LiFePO4, dan lampu LED — pemasangan cepat tanpa penggalian kabel.",
    "Kapasitas 30W cocok untuk gang dan pekarangan; 60–100W untuk jalan desa dan akses kebun; 150W untuk jalan raya dan area luas.",
    "Biaya operasional setelah terpasang praktis nol — cocok untuk anggaran desa (APBDes) maupun anggaran perusahaan kebun.",
  ],
  blocks: [
    {
      type: "p",
      text: "Banyak jalan desa dan jalan akses kebun di Jambi gelap total setelah maghrib. Warga yang pulang malam, anak sekolah yang berangkat subuh, dan truk angkut TBS yang melintas di jalan kebun sama-sama menanggung risiko yang sama: penerangan yang tidak ada, sementara menarik kabel PLN ke lokasi terpencil tidak masuk akal biayanya. PJUTS — Penerangan Jalan Umum Tenaga Surya — hadir tepat untuk mengisi kebutuhan ini: penerangan yang berdiri sendiri, tanpa kabel, tanpa meteran, dan tanpa tagihan bulanan.",
    },
    { type: "h2", text: "Apa Itu PJUTS dan Bagaimana Cara Kerjanya" },
    {
      type: "p",
      text: "PJUTS adalah lampu penerangan jalan yang seluruh kebutuhan energinya berasal dari matahari. Desain all-in-one modern menyatukan tiga komponen — panel surya, baterai LiFePO4, dan lampu LED — dalam satu unit di ujung tiang. Siang hari panel mengisi baterai; saat senja sensor cahaya menyalakan lampu secara otomatis; menjelang fajar lampu kembali padam sendiri. Tidak ada saklar yang perlu ditekan dan tidak ada petugas yang perlu berkeliling.",
    },
    {
      type: "ul",
      items: [
        "Sensor cahaya: nyala otomatis saat gelap, padam otomatis saat terang.",
        "Remote monitoring pada kapasitas tertentu — status lampu dapat dipantau dari ponsel.",
        "Standar tahan air IP65/IP66, siap untuk curah hujan tropis Jambi.",
        "Garansi 3 tahun untuk ketenangan pengelola desa maupun kebun.",
      ],
    },
    { type: "h2", text: "Keunggulan Dibanding Lampu Jalan Berlistrik PLN" },
    {
      type: "p",
      text: "Cara konvensional memasang lampu jalan menuntut kabel tanah, tiang jaringan, dan meteran — biayanya melonjak di lokasi terpencil karena panjang penggalian dan tarikan kabel. PJUTS memotong semua kebutuhan itu:",
    },
    {
      type: "table",
      caption: "Perbandingan lampu jalan berlistrik PLN dan PJUTS",
      headers: ["Aspek", "Lampu Jalan PLN", "PJUTS"],
      rows: [
        ["Kebutuhan kabel dan galian", "Ya — makin jauh dari sumber, makin mahal", "Tidak ada"],
        ["Tagihan listrik bulanan", "Ada, rutin setiap bulan", "Tidak ada"],
        ["Pemasangan di area tanpa PLN", "Sangat mahal atau tidak memungkinkan", "Sangat memungkinkan"],
        ["Penambahan titik baru", "Perlu hitung ulang seluruh instalasi", "Tinggal tambah unit baru"],
        ["Perawatan", "Periksa kabel, jaringan, dan meteran", "Bersihkan panel dan cek berkala"],
      ],
    },
    { type: "h2", text: "Kapasitas 30W sampai 150W: Mana yang Tepat?" },
    {
      type: "p",
      text: "Kapasitas lampu dipilih dari lebar jalan dan tingkat kebutuhan penerangan. Ringkasan spesifikasi paket PJUTS yang kami sediakan:",
    },
    {
      type: "table",
      caption: "Spesifikasi paket PJUTS per tingkatan kapasitas",
      headers: ["Paket", "Lampu LED", "Panel Surya", "Baterai LiFePO4", "Tiang", "Aplikasi"],
      rows: [
        ["PJUTS 30W", "30W", "50Wp", "20Ah", "4 meter", "Gang kecil, pekarangan, area terbatas"],
        ["PJUTS 40W", "40W", "80Wp", "30Ah", "5 meter", "Jalan kampung, perkebunan kecil"],
        ["PJUTS 60W", "60W", "120Wp", "50Ah", "6 meter", "Jalan desa, akses perkebunan"],
        ["PJUTS 80W", "80W", "150Wp", "60Ah", "7 meter", "Jalan utama desa, jalan kebun sawit"],
        ["PJUTS 100W", "100W", "200Wp", "80Ah", "8 meter", "Jalan kawasan industri dan perkebunan besar"],
        ["PJUTS 150W", "150W", "300Wp", "100Ah", "9 meter", "Jalan raya, lapangan, area publik luas"],
      ],
    },
    {
      type: "p",
      text: "Harga mulai dari sekitar Rp 4,5 juta per titik untuk kapasitas 30W — sudah termasuk tiang, baterai, instalasi, dan garansi 3 tahun — hingga sekitar Rp 18 juta untuk kapasitas 150W yang dilengkapi motion sensor. Semua unit sudah mencakup pemasangan sehingga desa atau kebun tidak perlu mencari tukang tambahan.",
    },
    { type: "h2", text: "Berapa Unit yang Dibutuhkan untuk Satu Jalan?" },
    {
      type: "p",
      text: "Aturan praktisnya: jarak antar titik 20–40 meter menyesuaikan tinggi tiang, lebar jalan, dan titik rawan. Contoh: untuk jalan desa sepanjang 1 km dengan jarak antar titik 30 meter, dibutuhkan sekitar 33 titik lampu. Dalam praktiknya desa jarang memasang semuanya sekaligus — pola yang umum adalah bertahap per dusun atau per ruas jalan mengikuti ketersediaan anggaran tiap tahun, dimulai dari titik paling rawan: tikungan, jembatan, pertemuan jalan, dan area tanah kosong.",
    },
    {
      type: "p",
      text: "Karena tiap unit PJUTS berdiri sendiri, penambahan tahun berikutnya tidak mengganggu unit yang sudah terpasang — tidak ada hitung ulang instalasi seperti pada lampu berjaringan kabel.",
    },
    { type: "h2", text: "PJUTS di Jalan Kebun: Penerangan untuk Jalan Angkut" },
    {
      type: "p",
      text: "Di dalam areal kebun, jalan angkut TBS dan jalan inspeksi biasanya gelap total setelah senja. Penerangan di titik-titik rawan — tikungan, jembatan, dan pertemuan jalan — mengurangi risiko kecelakaan truk angkut sekaligus memudahkan patroli keamanan malam. Karena tidak butuh kabel, PJUTS dapat dipasang persis di titik yang paling dibutuhkan, dipindah saat tata letak jalan berubah, dan ditambah bertahap mengikuti anggaran.",
    },
    { type: "h2", text: "Pembiayaan: Dana Desa hingga Anggaran Perusahaan" },
    {
      type: "p",
      text: "Untuk desa, PJUTS umumnya dianggarkan melalui APBDes atau bantuan Dana Desa karena biaya operasionalnya nyaris nol setelah terpasang — tidak menambah beban rutin desa di tahun-tahun berikutnya. Untuk perusahaan kebun, PJUTS masuk kategori belanja sarana keselamatan dan fasilitas kerja. Proses pengadaannya sederhana: spesifikasi teknis sudah jelas per tingkatan watt, sehingga mudah dimasukkan ke dokumen pengadaan maupun tender.",
    },
    {
      type: "note",
      title: "Tips penempatan titik lampu",
      text: "Jarak antar titik umumnya 20–40 meter menyesuaikan tinggi tiang dan lebar jalan. Pastikan lokasi tiang bebas bayangan pohon — bayangan tetap menghambat pengisian baterai walau matahari terlihat cukup terang.",
    },
    {
      type: "cta",
      text: "Menyusun rencana penerangan jalan desa atau jalan kebun? Kami membantu pemetaan titik, pemilihan kapasitas, hingga penyusunan dokumen pengadaan.",
      href: "/pjuts",
      label: "Layanan PJUTS Jambi",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Potensi Energi Surya di Jambi",
          href: "/artikel/potensi-energi-surya-jambi",
          desc: "Mengapa letak geografis Jambi menguntungkan untuk tenaga surya.",
        },
        {
          label: "PLTS untuk Kebun Sawit",
          href: "/artikel/plts-untuk-kebun-sawit",
          desc: "Listrik mandiri untuk kebun tanpa jangkauan PLN.",
        },
        {
          label: "Layanan Tender & Pengadaan",
          href: "/tender-procurement",
          desc: "Dukungan dokumen teknis untuk pengadaan pemerintah dan perusahaan.",
        },
      ],
    },
  ],
  relatedSlugs: ["potensi-energi-surya-jambi", "plts-untuk-kebun-sawit", "solar-pump-untuk-perkebunan"],
};
