import type { Article } from "./types";

export const article: Article = {
  slug: "berapa-kwp-panel-surya-untuk-rumah",
  title: "Berapa kWp Panel Surya untuk Rumah? Panduan Menghitung Kebutuhan",
  description:
    "Cara menghitung kebutuhan kWp panel surya untuk rumah: audit beban perangkat, rumus konversi kWh ke kWp, dan padanannya dengan paket PLTS yang tersedia.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  readingMinutes: 7,
  keyTakeaways: [
    "Kapasitas PLTS rumah ditentukan oleh konsumsi listrik harian (kWh), bukan oleh luas atap atau daya langganan semata.",
    "Di Jambi, 1 kWp menghasilkan sekitar 3 kWh per hari — dari PSH 3,75 jam dikali efisiensi sistem 80%.",
    "Rumus cepat: kebutuhan kWp = kWh harian ÷ 3, lalu bulatkan ke atas ke paket terdekat.",
    "Rumah dengan daya 900 VA umumnya cukup paket 1,3–3,25 kWp; daya 1300–2200 VA biasanya cocok dengan 3,25–5,2 kWp.",
  ],
  blocks: [
    {
      type: "p",
      text: "Berapa kWp panel surya yang dibutuhkan rumah saya? Pertanyaan ini hampir selalu menjadi pembuka dalam konsultasi PLTS — dan jawabannya tidak bisa satu angka untuk semua rumah. Kapasitas yang tepat ditentukan oleh konsumsi listrik harian Anda, bukan luas atap, bukan pula daya langganan semata. Kabar baiknya, menghitungnya tidak sulit: cukup tiga langkah yang bisa Anda kerjakan sendiri di rumah.",
    },
    { type: "h2", text: "Beda kWp dan kWh: Pahami Dulu Ini" },
    {
      type: "p",
      text: "kWp (kilowatt-peak) adalah kapasitas puncak pembangkit — jumlah panel yang Anda pasang. kWh (kilowatt-hour) adalah energi yang benar-benar dihasilkan atau terpakai. Di Jambi, Peak Sun Hours rata-rata 3,75 jam per hari dan efisiensi sistem sekitar 80%, sehingga tiap 1 kWp panel menghasilkan kira-kira 3 kWh per hari (3,75 × 0,8 ≈ 3). Dengan panel 650 Wp per unit: 2 panel = 1,3 kWp ≈ 3,9 kWh/hari, sedangkan 8 panel = 5,2 kWp ≈ 15,6 kWh/hari.",
    },
    { type: "h2", text: "Langkah 1: Audit Beban — Daftar Semua Perangkat" },
    {
      type: "p",
      text: "Ambil kertas atau lembar kerja, lalu daftarkan setiap perangkat listrik di rumah: dayanya (cek label di bagian belakang alat atau buku manual) dan perkiraan jam pemakaian per hari. Tabel berikut berisi daya khas perangkat rumah tangga sebagai titik awal:",
    },
    {
      type: "table",
      caption: "Daya khas perangkat listrik rumah tangga",
      headers: ["Perangkat", "Daya Khas", "Contoh Pemakaian/Hari", "Perkiraan kWh/Hari"],
      rows: [
        ["AC split 1 PK", "±750 W", "4–6 jam", "3,0–4,5 kWh"],
        ["AC split 2 PK", "±1.500 W", "4–6 jam", "6,0–9,0 kWh"],
        ["Kulkas 2 pintu", "±100–200 W", "24 jam (kompresor siklik)", "1,2–2,4 kWh"],
        ["Mesin cuci", "±350–500 W", "1 jam", "0,35–0,5 kWh"],
        ["Pompa air", "±250–750 W", "0,5–1 jam", "0,15–0,75 kWh"],
        ["TV LED", "±50–100 W", "4–6 jam", "0,2–0,6 kWh"],
        ["Lampu LED (10 titik)", "±5–15 W per titik", "5–6 jam", "0,25–0,9 kWh"],
        ["Setrika", "±300–500 W", "0,5 jam", "0,15–0,25 kWh"],
      ],
    },
    {
      type: "note",
      title: "Catatan",
      text: "Daya di atas adalah perkiraan umum. Selalu utamakan angka pada label perangkat Anda — terutama untuk AC inverter yang daya aktualnya berubah-ubah mengikuti beban pendinginan.",
    },
    { type: "h2", text: "Langkah 2: Jumlahkan Kebutuhan kWh per Hari" },
    {
      type: "p",
      text: "Contoh rumah dengan daya 900 VA: satu AC 1 PK dipakai 4 jam (3 kWh), kulkas (1,5 kWh), TV dan lampu (0,8 kWh), serta pompa air (0,2 kWh). Totalnya sekitar 5,5 kWh per hari. Untuk rumah 1300–2200 VA dengan dua AC plus perangkat lain, kebutuhan umumnya berada di kisaran 8–14 kWh per hari.",
    },
    { type: "h2", text: "Langkah 3: Bagi dengan Produksi per kWp" },
    {
      type: "p",
      text: "Kebutuhan kWp = kWh harian ÷ 3 (produksi per kWp di Jambi). Dari contoh di atas: 5,5 ÷ 3 ≈ 1,83 kWp — bulatkan ke atas ke paket terdekat, yaitu 2,6 kWp atau 4 panel 650 Wp. Sebelum memutuskan, pertimbangkan juga beberapa hal berikut:",
    },
    {
      type: "ul",
      items: [
        "Rencana ke depan: akan menambah AC, pompa, atau berencana membeli mobil listrik? Hitung kebutuhan masa depan sejak awal agar kapasitas tidak cepat kurang.",
        "Kondisi atap: bayangan pohon atau orientasi yang kurang ideal menurunkan produksi — kapasitas perlu dikompensasi atau titik pasang dipindahkan.",
        "Tujuan pemasangan: menutup seluruh tagihan atau hanya sebagian? Sistem hybrid bisa dirancang bertahap mengikuti anggaran.",
      ],
    },
    { type: "h2", text: "Padanan Daya PLN dengan Kapasitas PLTS" },
    {
      type: "p",
      text: "Jika audit beban terasa merepotkan, daya langganan PLN bisa dipakai sebagai patokan kasar yang cukup berguna:",
    },
    {
      type: "table",
      caption: "Patokan kapasitas PLTS berdasarkan daya langganan PLN",
      headers: ["Daya PLN", "Konsumsi Tipikal", "Rekomendasi Kapasitas", "Jumlah Panel 650 Wp", "Estimasi Produksi/Hari"],
      rows: [
        ["900 VA", "3–8 kWh", "1,3–3,25 kWp", "2–5 panel", "±3,9–9,8 kWh"],
        ["1300–2200 VA", "6–14 kWh", "3,25–5,2 kWp", "5–8 panel", "±9,8–15,6 kWh"],
        ["3500–5500 VA", "12–20 kWh", "5,2–7,15 kWp", "8–11 panel", "±15,6–21,5 kWh"],
      ],
    },
    {
      type: "p",
      text: "Angka produksi dihitung dari PSH Jambi 3,75 jam dikali efisiensi sistem 80%. Perlu dicatat: pada sistem hybrid, surya bekerja berdampingan dengan PLN — produksi siang hari memangkas tagihan, sementara PLN tetap tersedia di malam hari atau saat cuaca buruk.",
    },
    { type: "h2", text: "Jangan Terlewat: Kapasitas Inverter dan Baterai" },
    {
      type: "p",
      text: "Kapasitas inverter harus mampu memikul beban puncak yang menyala bersamaan, bukan sekadar mengikuti kWp panel. Untuk rumah satu fase tersedia inverter hybrid kelas 3,6/6/8/10 kW; beban besar atau instalasi tiga fase memakai kelas 10/15/20 kW. Sementara itu baterai — jika Anda menginginkan backup malam hari — dihitung dari kebutuhan malam dibagi kedalaman pelepasan (DoD) baterai LiFePO4 80–90%, dalam satuan unit 4,8 kWh. Perhitungan lengkapnya kami bahas di artikel Cara Menghitung Kebutuhan Baterai.",
    },
    { type: "h2", text: "Dari Hitungan ke Paket yang Tersedia" },
    {
      type: "p",
      text: "Paket PLTS rumah tangga tersedia dalam beberapa pilihan kapasitas — 1,3, 2,6, 3,25, hingga 5,2 kWp — lengkap dengan inverter hybrid, struktur mounting, proteksi, instalasi, dan garansi. Setelah menghitung kebutuhan seperti di atas, tinggal memilih paket yang paling dekat di atas angka Anda. Jika ragu di antara dua paket, prinsipnya sederhana: lebih baik sedikit lebih besar daripada terus menyesal karena produksi kurang menutup kebutuhan.",
    },
    {
      type: "cta",
      text: "Sudah punya angka kebutuhan kWh rumah Anda? Bandingkan dengan daftar paket PLTS rumah tangga kami — kapasitas, jumlah panel, dan harganya tercantum lengkap, sudah termasuk PPN serta instalasi.",
      href: "/harga-panel-surya-jambi",
      label: "Lihat Harga Paket PLTS Jambi",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Cara Menghitung Kebutuhan Baterai PLTS",
          href: "/artikel/cara-menghitung-kebutuhan-baterai",
          desc: "Menentukan kapasitas baterai LiFePO4 untuk malam hari dan backup",
        },
        {
          label: "Berapa Produksi 1 kWp Panel Surya?",
          href: "/artikel/berapa-produksi-1-kwp-panel-surya",
          desc: "Faktor-faktor yang memengaruhi output per kWp di Jambi",
        },
        {
          label: "Biaya Pasang PLTS Rumah di Jambi",
          href: "/artikel/biaya-pasang-plts-rumah-jambi",
          desc: "Rincian komponen biaya dan estimasi balik modal",
        },
      ],
    },
  ],
  relatedSlugs: [
    "biaya-pasang-plts-rumah-jambi",
    "cara-menghitung-kebutuhan-baterai",
    "berapa-produksi-1-kwp-panel-surya",
  ],
};
