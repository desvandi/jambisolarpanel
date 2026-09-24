import type { Article } from "./types";

export const article: Article = {
  slug: "penyebab-produksi-plts-turun",
  title: "Penyebab Produksi PLTS Turun dan Cara Mengatasinya",
  description:
    "Kenali enam penyebab produksi PLTS turun — debu, shading, panel rusak, inverter, baterai menua, error monitoring — beserta gejala khas dan solusinya.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  readingMinutes: 8,
  keyTakeaways: [
    "Fluktuasi produksi harian itu normal (cuaca); yang perlu dicurigai adalah penurunan konsisten saat hari cerah.",
    "Enam penyebab tersering: debu/kotoran, bayangan (shading), panel rusak atau hotspot, masalah inverter, baterai menua, dan kesalahan data monitoring.",
    "Patokan praktis: jika hari cerah menghasilkan 15–20% lebih rendah dari hari cerah sebelumnya secara berulang, lakukan pemeriksaan.",
    "Bayangan tipis sekalipun pada sebagian panel bisa menurunkan output lebih besar dari proporsi areanya karena karakteristik rangkaian sel.",
    "Monitoring berbasis IoT memudahkan deteksi dini — anomali terlihat jauh sebelum tagihan listrik ikut naik.",
  ],
  blocks: [
    {
      type: "p",
      text: "Grafik produksi PLTS tidak pernah berupa garis lurus. Naik saat cerah, turun saat mendung — itu perilaku normal yang justru menandakan sistem bekerja. Yang tidak normal adalah produksi yang turun terus-menerus meski langit cerah, atau backup malam yang terasa semakin pendek. Artikel ini memetakan enam penyebab paling umum penurunan produksi PLTS, gejala khas masing-masing, dan cara mengatasinya.",
    },
    { type: "h2", text: "Penurunan Normal vs Penurunan yang Perlu Dicurigai" },
    {
      type: "p",
      text: "Sebelum menyalahkan peralatan, bandingkan yang sebanding: produksi hari cerah sekarang versus hari cerah di periode sebelumnya, bukan hari hujan versus hari cerah. Di Jambi, musim penghujan membuat rata-rata produksi turun karena langit lebih sering mendung — itu bukan kerusakan. Patokan praktis yang bisa dipakai: jika pada hari cerah penuh produksi Anda konsisten 15–20% lebih rendah dibanding hari cerah sejenis sebelumnya selama lebih dari satu minggu, ada indikasi masalah fisik yang perlu dicek.",
    },
    { type: "h2", text: "Penyebab 1: Debu dan Kotoran Menempel" },
    {
      type: "p",
      text: "Penyebab paling sering sekaligus paling mudah diatasi. Di musim kemarau, lapisan debu tipis bisa menyelimuti permukaan panel dan mengurangi cahaya yang masuk ke sel. Gejalanya: penurunan produksi yang halus dan merata setiap hari, tanpa kode error apa pun, dan biasanya membaik setelah hujan deras. Solusinya: cek visual permukaan panel, lalu bersihkan dengan air bersih dan sikat lembut mengikuti prosedur yang benar. Di lokasi berdebu — dekat jalan tanah, area konstruksi, atau perkebunan — jadwalkan pembersihan lebih sering.",
    },
    { type: "h2", text: "Penyebab 2: Bayangan Baru (Shading)" },
    {
      type: "p",
      text: "Pohon yang tumbuh, bangunan baru milik tetangga, atau bahkan tiang bendera bisa menciptakan bayangan yang dulu tidak ada. Shading sering diremehkan karena tampak kecil, padahal dampaknya tidak proporsional: sel-sel surya dalam satu panel dan satu string terhubung seri, sehingga sel yang tertutup bayangan menahan alur arus keseluruhan — ibarat satu keran tertutup di jalur pipa. Gejalanya: produksi turun pada jam-jam tertentu saja, membentuk lekukan mencolok di grafik harian, lalu normal kembali di luar jam itu. Solusinya: pangkas dahan yang menghalangi, atau konsultasikan penataan ulang posisi panel bila bayangannya berasal dari struktur permanen.",
    },
    { type: "h2", text: "Penyebab 3: Panel Rusak atau Hotspot" },
    {
      type: "p",
      text: "Retak mikro pada sel akibat benturan benda keras, cabang pohon, atau tekanan saat pemasangan bisa berkembang menjadi hotspot — titik yang memanas lebih dari sekitarnya karena arus terpusat di area rusak. Hotspot berbahaya: selain menurunkan output, panas berlebih bisa merusak panel secara permanen. Gejalanya: penurunan produksi yang terus memburuk, perubahan warna atau bercak pada permukaan panel yang terlihat dari bawah, dan pada tahap lanjut titik panas yang bisa dirasakan. Solusinya: inspeksi dan pemindaian termal oleh teknisi, lalu penggantian panel yang rusak dengan unit yang sepadan.",
    },
    { type: "h2", text: "Penyebab 4: Masalah pada Inverter" },
    {
      type: "p",
      text: "Inverter adalah otot konversi DC ke AC, dan gangguannya langsung terlihat di hasil produksi — mulai dari kode error di layar, kipas pendingin yang bekerja lebih keras, hingga produksi yang terpotong di jam-jam tertentu ketika unit memutus menyala untuk melindungi dirinya dari suhu berlebih. Penyebab umumnya: ventilasi tersumbat debu, posisi terpapar panas matahari langsung, atau komponen internal yang mulai menua. Solusinya: catat kode error persisnya, periksa sirkulasi udara di sekitar unit, dan jika error berulang segera hubungi teknisi — kode error adalah bahasa inverter yang paling mempercepat diagnosis.",
    },
    { type: "h2", text: "Penyebab 5: Baterai Mulai Menua" },
    {
      type: "p",
      text: "Pada sistem hybrid, penurunan kapasitas baterai sering terasa seperti masalah produksi, padahal panelnya baik-baik saja. Gejalanya khas: backup malam hari semakin pendek, state of charge turun lebih cepat dari biasanya dengan beban yang sama, atau sistem lebih sering menarik listrik PLN di pagi hari. Baterai LiFePO4 bertahan 3.000–6.000 siklus, tetapi kapasitasnya tetap menurun perlahan seiring pemakaian bertahun-tahun. Solusinya: cek riwayat siklus dan kesehatan sel dari aplikasi monitoring; jika kapasitas tinggal jauh di bawah kondisi normal, tambahkan unit baterai atau ganti sesuai saran teknisi.",
    },
    { type: "h2", text: "Penyebab 6: Kesalahan Data Monitoring" },
    {
      type: "p",
      text: "Kadang produksi tidak benar-benar turun — yang salah adalah datanya. Sensor arus yang terpasang kurang tepat, perangkat monitoring yang kehilangan koneksi, atau aplikasi yang gagal sinkron bisa menampilkan angka produksi yang menyesatkan. Gejalanya: angka di aplikasi aneh (misalnya nol mendadak atau loncat tidak wajar) padahal beban rumah terlihat normal dan tidak ada gangguan listrik. Solusinya: cek apakah perangkat monitoring online, bandingkan dengan indikator fisik di inverter, lalu minta teknisi memverifikasi pemasangan sensor bila kecurigaan berlanjut.",
    },
    { type: "h2", text: "Tabel Ringkas: Masalah, Gejala, dan Solusi" },
    {
      type: "table",
      caption: "Diagnosis cepat enam penyebab produksi PLTS turun.",
      headers: ["Masalah", "Gejala Khas", "Solusi"],
      rows: [
        [
          "Debu dan kotoran",
          "Turun merata tiap hari, membaik setelah hujan deras",
          "Bersihkan panel sesuai prosedur; jadwalkan rutin di area berdebu",
        ],
        [
          "Bayangan (shading)",
          "Turun hanya di jam tertentu, membentuk lekukan di grafik",
          "Pangkas pohon; evaluasi relokasi panel bila bayangan permanen",
        ],
        [
          "Panel rusak / hotspot",
          "Turun terus memburuk; ada bercak atau perubahan warna",
          "Inspeksi dan pemindaian termal; ganti panel rusak",
        ],
        [
          "Masalah inverter",
          "Kode error, unit mati sendiri, produksi terpotong",
          "Catat kode error, perbaiki ventilasi, panggil teknisi bila berulang",
        ],
        [
          "Baterai menua",
          "Backup malam makin pendek, PLN lebih sering dipakai pagi hari",
          "Cek kesehatan baterai; tambah atau ganti unit",
        ],
        [
          "Kesalahan data monitoring",
          "Angka aneh di aplikasi, kondisi fisik normal",
          "Cek koneksi perangkat; verifikasi pemasangan sensor",
        ],
      ],
    },
    { type: "h2", text: "Kapan Memanggil Teknisi" },
    {
      type: "ul",
      items: [
        "Penurunan produksi konsisten lebih dari satu minggu padahal cuaca cerah.",
        "Kode error inverter yang sama muncul berulang meski sudah direstart.",
        "Ada keretakan, bercak, atau perubahan warna pada panel.",
        "Anda mencium bau terbakar atau mendengar suara dengung tidak normal dari inverter.",
        "Butuh pemeriksaan di atap curam atau tinggi — jangan memaksakan naik sendiri.",
      ],
    },
    {
      type: "cta",
      text: "Grafik produksi Anda menunjukkan gejala di atas? Tim maintenance kami dapat melakukan diagnosis, pembersihan, hingga penggantian komponen.",
      href: "/maintenance",
      label: "Layanan Maintenance PLTS",
    },
    {
      type: "p",
      text: "Pencegahan tetap lebih murah daripada perbaikan. Dengan sistem monitoring IoT, anomali produksi terlihat sejak hari pertama — jauh sebelum penurunan menumpuk dan tagihan listrik ikut naik. Biasakan membaca grafik mingguan Anda, jaga panel tetap bersih, dan lakukan inspeksi berkala; sisanya biarkan data yang bicara.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Cara Merawat Panel Surya: Checklist Perawatan Rutin",
          href: "/artikel/cara-merawat-panel-surya",
          desc: "Jadwal perawatan untuk mencegah enam masalah di atas.",
        },
        {
          label: "Berapa Produksi Listrik 1 kWp Panel Surya per Hari?",
          href: "/artikel/berapa-produksi-1-kwp-panel-surya",
          desc: "Acuan produksi normal sebagai pembanding.",
        },
        {
          label: "Smart Monitoring IoT",
          href: "/smart-iot",
          desc: "Deteksi anomali produksi lebih dini dari ponsel Anda.",
        },
      ],
    },
  ],
  relatedSlugs: [
    "cara-merawat-panel-surya",
    "berapa-produksi-1-kwp-panel-surya",
  ],
};
