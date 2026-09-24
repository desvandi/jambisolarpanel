import type { Article } from "./types";

export const article: Article = {
  slug: "berapa-produksi-1-kwp-panel-surya",
  title: "Berapa Produksi Listrik 1 kWp Panel Surya per Hari?",
  description:
    "Produksi 1 kWp panel surya di Jambi sekitar 3 kWh per hari. Pelajari konsep Peak Sun Hours, faktor cuaca, orientasi panel, dan cara memonitor produksi.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  // 2026-09-24: label asumsi skenario tarif + pemanfaatan energi (audit Round 8).
  updated: "2026-09-24",
  readingMinutes: 7,
  keyTakeaways: [
    "Di Jambi, 1 kWp panel surya menghasilkan rata-rata ±3 kWh per hari: 3,75 Peak Sun Hours × efisiensi sistem 80%.",
    "PSH (Peak Sun Hours) adalah jam efektif penyinaran setara 1.000 W/m² — bukan panjang siang dari terbit hingga terbenam.",
    "Saat mendung atau hujan, produksi turun sekitar 10–25% dibanding hari cerah; fluktuasi harian itu normal.",
    "Orientasi ideal panel di Indonesia: menghadap utara atau selatan dengan kemiringan sekitar 10–15 derajat.",
    "Paket 2,6 kWp menghasilkan ±7,8 kWh/hari dan paket 5,2 kWp ±15,6 kWh/hari dalam kondisi rata-rata Jambi.",
  ],
  blocks: [
    {
      type: "p",
      text: "Berapa sih sebenarnya listrik yang dihasilkan satu kWp panel surya setiap hari? Ini pertanyaan pertama yang hampir selalu diajukan calon pengguna PLTS — dan wajar, karena dari angka inilah semua perhitungan kebutuhan, penghematan, dan masa balik modal diturunkan. Jawabannya berbeda-beda tergantung lokasi, tetapi untuk wilayah Jambi angkanya cukup jelas. Mari kita bedah dari konsep dasarnya.",
    },
    { type: "h2", text: "Jawaban Singkat: Sekitar 3 kWh per Hari di Jambi" },
    {
      type: "p",
      text: "Dalam desain sistem, kami menggunakan dua angka acuan: Peak Sun Hours (PSH) Jambi 3,75 jam dan efisiensi sistem 80%. Produksi harian per kWp dihitung dengan rumus: 1 kWp × 3,75 jam × 0,8 = 3 kWh per hari. Artinya sistem 2,6 kWp menghasilkan sekitar 7,8 kWh/hari, sistem 5,2 kWp sekitar 15,6 kWh/hari, dalam kondisi rata-rata sepanjang tahun.",
    },
    {
      type: "note",
      title: "Perlu diingat",
      text: "Angka 3 kWh per hari per kWp adalah rata-rata tahunan, bukan jaminan harian. Pada hari cerah penuh produksi bisa melampaui angka itu; pada hari sangat mendung bisa jauh di bawahnya. Sepanjang produksi tahunan mendekati rata-rata, sistem Anda bekerja normal.",
    },
    { type: "h2", text: "Apa Itu Peak Sun Hours (PSH)?" },
    {
      type: "p",
      text: "PSH bukan lamanya siang dari matahari terbit hingga terbenam. PSH adalah jumlah jam ketika iradiasi matahari mencapai intensitas penuh 1.000 W per meter persegi — standar pengujian yang dipakai pabrikan panel. Intensitas matahari di pagi dan sore hari jauh lebih rendah dari siang bolong, dan awan memotongnya lagi, sehingga 12 jam siang hanya setara beberapa jam sinar penuh. Untuk Jambi, angka acuan desain kami adalah 3,75 PSH per hari — dipakai konsisten dalam kalkulasi kapasitas sistem.",
    },
    { type: "h2", text: "Faktor-Faktor yang Memengaruhi Produksi" },
    { type: "h3", text: "Cuaca dan musim" },
    {
      type: "p",
      text: "Awan adalah variabel terbesar produksi harian. Saat langit mendung atau hujan, produksi panel umumnya turun sekitar 10–25% dibanding hari cerah — bahkan lebih pada hujan lebat seharian. Karena itu jangan panik melihat grafik produksi turun di musim penghujan; yang perlu diwaspadai adalah penurunan konsisten pada hari-hari cerah (lihat pembahasan penyebab produksi PLTS turun).",
    },
    { type: "h3", text: "Orientasi dan kemiringan panel" },
    {
      type: "p",
      text: "Indonesia berada di garis khatulistiwa, sehingga posisi matahari hampir selalu di atas kepala sepanjang tahun. Orientasi ideal panel adalah menghadap ke utara atau ke selatan dengan kemiringan sekitar 10–15 derajat — cukup landai untuk menangkap sinar dari posisi matahari yang hampir tegak, sekaligus memudahkan air hujan mencuci kotoran dari permukaan kaca. Kemiringan terlalu curam justru mengurangi produksi di wilayah ekuator dan menaikkan biaya rangka.",
    },
    { type: "h3", text: "Suhu permukaan panel" },
    {
      type: "p",
      text: "Ini yang sering tidak disadari: panel menghasilkan lebih rendah saat permukaannya panas. Sel surya kehilangan sedikit efisiensi pada setiap kenaikan suhu di atas 25 derajat Celsius — suhu sel saat diuji di laboratorium. Di iklim tropis, permukaan panel bisa jauh lebih panas dari udara sekitarnya. Karena itu pemasangan profesional selalu menyisakan celah ventilasi di bawah panel agar panas mengalir keluar, bukan menempel panel langsung di atap.",
    },
    { type: "h3", text: "Kehilangan sistem (system losses)" },
    {
      type: "p",
      text: "Listrik dari panel melewati kabel DC, inverter, dan kabel AC sebelum sampai ke beban. Di setiap tahap ada kerugian konversi dan hambatan. Inilah alasan faktor efisiensi 80% dipakai dalam semua perhitungan: panel 1 kWp tidak pernah mengirim 3,75 kWh murni ke rumah Anda, melainkan sekitar 3 kWh setelah semua kerugian dihitung. Desainer yang menghitung tanpa faktor ini akan mengecewakan kliennya.",
    },
    { type: "h3", text: "Degradasi panel seiring usia" },
    {
      type: "p",
      text: "Semua panel surya mengalami degradasi output dari tahun ke tahun, tetapi pada panel monokristalin berkualitas lajuannya sangat kecil — umumnya di bawah 1% per tahun. Panel kelas atas 650 Wp yang kami gunakan dilindungi garansi performa 25 tahun yang menjamin degradasi output tetap minimal hingga akhir periode. Dalam perencanaan kapasitas, degradasi tahun-tahun awal ini sudah tercakup oleh margin keamanan paket.",
    },
    { type: "h2", text: "Estimasi Produksi 1 kWp per Musim di Jambi" },
    {
      type: "p",
      text: "Jambi mengenal dua musim utama: kemarau yang umumnya jatuh sekitar Juni–September dan penghujan sekitar November–April, dengan periode peralihan di antaranya. Tabel berikut merangkum estimasi produksi harian per kWp pada masing-masing periode.",
    },
    {
      type: "table",
      caption: "Estimasi produksi listrik 1 kWp panel surya per hari menurut musim di Jambi.",
      headers: ["Periode", "Kondisi Langit Khas", "Produksi 1 kWp/hari"],
      rows: [
        ["Kemarau (± Juni–September)", "Cerah mendominasi", "3,0–3,5 kWh"],
        ["Peralihan (± Mei dan Oktober)", "Campuran cerah dan berawan", "2,7–3,1 kWh"],
        ["Penghujan (± November–April)", "Mendung dan hujan lebih sering", "2,3–2,8 kWh"],
      ],
    },
    {
      type: "p",
      text: "Dirata-rata sepanjang tahun, angka-angka itu bermuara pada ±3 kWh per hari per kWp, atau sekitar 90 kWh per bulan per kWp. Untuk sistem 3,25 kWp, itu berarti rata-rata ±9,75 kWh/hari — cukup untuk menutup kebutuhan rumah dengan satu unit AC yang rutin menyala.",
    },
    { type: "h2", text: "Cara Memonitor Produksi Panel Surya Anda" },
    {
      type: "p",
      text: "Anda tidak perlu menebak-nebak produksi sistem dari tagihan listrik. Inverter hybrid modern mencatat produksi harian, bulanan, dan tahunan secara otomatis, lengkap dengan notifikasi bila terjadi anomali. Dengan sistem monitoring berbasis IoT, data produksi bisa dipantau dari ponsel kapan saja — termasuk arus masuk-keluar baterai dan beban rumah secara real-time. Membiasakan diri membaca grafik produksi selama beberapa minggu akan membuat Anda langsung tahu ketika ada sesuatu yang tidak beres.",
    },
    {
      type: "cta",
      text: "Ingin memantau produksi PLTS Anda langsung dari ponsel, lengkap dengan notifikasi anomali?",
      href: "/smart-iot",
      label: "Layanan Smart Monitoring IoT",
    },
    {
      type: "p",
      text: "Ringkasnya: 1 kWp di Jambi menghasilkan sekitar 3 kWh per hari sebagai rata-rata tahunan. Angka ini turun-naik mengikuti musim, menurun sangat perlahan seiring usia panel, dan bisa dipantau detil lewat aplikasi monitoring. Dari angka dasar inilah Anda bisa melanjutkan ke perhitungan kapasitas sistem dan kebutuhan baterai yang tepat.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Potensi Energi Surya di Jambi",
          href: "/artikel/potensi-energi-surya-jambi",
          desc: "Gambaran iradiasi matahari wilayah Jambi.",
        },
        {
          label: "Cara Menentukan Kapasitas PLTS",
          href: "/artikel/cara-menentukan-kapasitas-plts",
          desc: "Konversi kebutuhan energi menjadi kWp panel.",
        },
        {
          label: "Penyebab Produksi PLTS Turun dan Cara Mengatasinya",
          href: "/artikel/penyebab-produksi-plts-turun",
          desc: "Kapan penurunan produksi perlu dicurigai.",
        },
      ],
    },
  ],
  relatedSlugs: [
    "potensi-energi-surya-jambi",
    "cara-menentukan-kapasitas-plts",
    "penyebab-produksi-plts-turun",
  ],
};
