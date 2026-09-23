import type { Article } from "./types";

export const article: Article = {
  slug: "cara-menentukan-kapasitas-plts",
  title: "Cara Menentukan Kapasitas PLTS: Panduan Audit Beban Listrik",
  description:
    "Pelajari cara menentukan kapasitas PLTS melalui audit beban listrik: inventaris perangkat, hitung kebutuhan Wh harian, lalu konversi ke kWp panel surya.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  readingMinutes: 8,
  keyTakeaways: [
    "Audit beban adalah langkah pertama menentukan kapasitas PLTS: catat daya setiap perangkat dan jam pemakaiannya, lalu hitung kebutuhan energi harian dalam Wh.",
    "Kapasitas panel dihitung dengan rumus: kebutuhan energi harian (kWh) dibagi (PSH × efisiensi sistem).",
    "Di Jambi, 1 kWp panel surya menghasilkan sekitar 3 kWh per hari (PSH 3,75 jam × efisiensi 80%).",
    "Rumah dengan kebutuhan 6 kWh per hari membutuhkan hitungan sekitar 2 kWp; dalam praktiknya pilih paket dengan margin, misalnya 2,6 kWp.",
    "Kebutuhan energi (kWh) menentukan jumlah panel, sedangkan daya perangkat yang menyala bersamaan menentukan kapasitas inverter.",
  ],
  blocks: [
    {
      type: "p",
      text: "Kapasitas adalah keputusan paling fundamental saat merencanakan Pembangkit Listrik Tenaga Surya (PLTS). Sistem yang terlalu kecil membuat listrik selalu kurang dan baterai cepat terkuras, sementara sistem yang terlalu besar memaksa Anda membayar panel, inverter, dan baterai yang tidak pernah dimanfaatkan penuh. Keduanya sama-sama merugikan. Kabar baiknya, kapasitas PLTS bukanlah tebakan — ia bisa dihitung dengan metodologi audit beban listrik yang akan kami jelaskan langkah demi langkah dalam panduan ini.",
    },
    { type: "h2", text: "Mengapa Audit Beban Listrik Itu Wajib" },
    {
      type: "p",
      text: "Panel surya tidak menghasilkan listrik sesuai keinginan Anda; ia menghasilkan energi sesuai penyinaran yang tersedia. Karena itu pertanyaan yang benar bukanlah berapa watt panel yang bagus, melainkan berapa energi (dalam kWh) yang rumah atau usaha Anda konsumsi setiap hari. Audit beban menjawab pertanyaan itu dengan data, bukan asumsi. Hasilnya juga menjadi dasar untuk menentukan kapasitas inverter, jumlah baterai, hingga estimasi penghematan tagihan listrik.",
    },
    {
      type: "ul",
      items: [
        "Sistem kurang kapasitas (undersize): produksi panel habis sebelum kebutuhan terpenuhi, baterai sering kosong, dan beban akhirnya kembali bergantung penuh ke PLN.",
        "Sistem berlebih kapasitas (oversize): biaya investasi membengkak untuk panel dan baterai yang menganggur, dan umur pakai komponen tidak termanfaatkan optimal.",
        "Sistem pas hitung: setiap kWh produksi terpakai, siklus baterai sehat, dan investasi kembali lebih cepat.",
      ],
    },
    { type: "h2", text: "Langkah 1: Inventarisasi Semua Perangkat Listrik" },
    {
      type: "p",
      text: "Mulailah dengan berkeliling rumah atau lokasi usaha, lalu catat setiap perangkat listrik yang benar-benar dipakai. Daya setiap perangkat biasanya tertera pada label di bagian belakang atau bawah alat, pada kartu garansi, atau di lembar spesifikasi. Nilai yang Anda cari adalah daya dalam watt (W), bukan arus dalam ampere. Jika label hanya mencantumkan ampere, kalikan dengan tegangan 220 V untuk mendapatkan perkiraan watt. Untuk pengukuran paling akurat, gunakan watt meter — alat murah yang ditancapkan di antara stopkontak dan perangkat.",
    },
    {
      type: "table",
      caption: "Perkiraan daya perangkat rumah tangga umum — selalu utamakan angka pada label perangkat Anda sendiri.",
      headers: ["Perangkat", "Daya Khas"],
      rows: [
        ["Lampu LED", "5–15 W"],
        ["TV LED", "60–100 W"],
        ["Kulkas", "100–150 W"],
        ["Mesin cuci", "350–500 W"],
        ["AC 1 PK", "±750 W"],
        ["Pompa air", "250–750 W"],
      ],
    },
    {
      type: "p",
      text: "Tabel di atas hanyalah titik awal. Daya nyata bisa berbeda antar merek dan model, dan perangkat berbasis elemen pemanas seperti setrika, water heater, atau hair dryer tergolong sangat rakus daya. Jika perangkat semacam ini termasuk dalam daftar pemakaian rutin Anda, catat dayanya secara terpisah dan jangan ditebak-tebak.",
    },
    { type: "h2", text: "Langkah 2: Catat Jam Pemakaian Setiap Perangkat" },
    {
      type: "p",
      text: "Daya saja tidak cukup; Anda harus tahu berapa lama perangkat itu menyala setiap hari. Gunakan angka yang realistis, bukan skenario terburuk atau terbaik. Sebagai contoh, jika AC kamar hanya dinyalakan saat tidur, catat 6–8 jam, bukan 24 jam. Mesin cuci yang dipakai setiap dua hari sekali berarti setengah jam pemakaian per hari dalam rata-rata. Untuk kulkas yang menyala terus, kita akan melakukan penyesuaian khusus pada langkah berikutnya.",
    },
    { type: "h2", text: "Langkah 3: Hitung Kebutuhan Energi Harian dalam Wh" },
    {
      type: "p",
      text: "Energi = daya × waktu pemakaian. Lampu LED 10 W yang menyala 5 jam membutuhkan 50 Wh per hari. Lakukan perhitungan ini untuk semua perangkat, lalu jumlahkan. Tabel berikut adalah contoh hasil audit untuk sebuah rumah keluarga di Jambi dengan pola pemakaian normal.",
    },
    {
      type: "table",
      caption: "Contoh hasil audit beban listrik rumah keluarga.",
      headers: ["Perangkat", "Jumlah", "Daya", "Pemakaian/hari", "Energi/hari"],
      rows: [
        ["Lampu LED", "10 unit", "10 W", "5 jam", "500 Wh"],
        ["Kulkas", "1 unit", "150 W", "8 jam efektif", "1.200 Wh"],
        ["AC 1 PK", "1 unit", "750 W", "4 jam", "3.000 Wh"],
        ["TV LED", "1 unit", "100 W", "3 jam", "300 Wh"],
        ["Pompa air", "1 unit", "300 W", "1 jam", "300 Wh"],
        ["Lainnya (charger, kipas, router)", "—", "±70 W", "10 jam", "700 Wh"],
        ["Total kebutuhan harian", "—", "—", "—", "±6.000 Wh (6 kWh)"],
      ],
    },
    {
      type: "note",
      title: "Catatan tentang kulkas",
      text: "Kulkas memang tercolok 24 jam, tetapi kompresornya bekerja secara siklus — menyala dan mati sendiri. Sebagai pendekatan yang lazim dan cukup aman, kulkas dihitung dengan jam efektif sekitar 8 jam (kira-kira sepertiga waktu), dengan syarat pintu sering dibuka-tutup rapat dan karet pintu masih baik.",
    },
    { type: "h2", text: "Langkah 4: Konversi Kebutuhan Energi menjadi kWp Panel" },
    {
      type: "p",
      text: "Setelah kebutuhan energi diketahui, saatnya menghitung berapa kWp panel yang diperlukan. Rumusnya: kWp panel = kebutuhan energi harian (kWh) ÷ (Peak Sun Hours × efisiensi sistem). Peak Sun Hours (PSH) adalah jumlah jam efektif penyinaran matahari setara 1.000 W/m² per hari. Untuk wilayah Jambi, angka acuan yang kami gunakan dalam desain sistem adalah PSH 3,75 jam. Efisiensi sistem dikalikan sekitar 0,8 (80%) untuk mengkompensasi kerugian konversi inverter, losses kabel, dan pengaruh suhu panel.",
    },
    {
      type: "p",
      text: "Diterapkan pada contoh rumah di atas: 6 kWh ÷ (3,75 × 0,8) = 6 ÷ 3 = 2 kWp. Dengan panel monokristalin 650 Wp, kebutuhan 2.000 Wp itu setara dengan 2.000 ÷ 650 = 3,1 panel — dibulatkan ke atas menjadi 4 panel, atau total 2,6 kWp terpasang.",
    },
    {
      type: "note",
      title: "Pesan penting",
      text: "Efisiensi 80% bukan berarti sistem Anda cacat. Selisih 20% adalah kerugian teknis yang wajar pada setiap PLTS — sebagian energi hilang saat konversi DC ke AC di inverter, di kabel, dan akibat panas permukaan panel. Desainer sistem profesional selalu memasukkannya ke dalam perhitungan sejak awal.",
    },
    { type: "h2", text: "Langkah 5: Pilih Paket dengan Margin Keamanan" },
    {
      type: "p",
      text: "Angka hasil hitungan adalah batas minimum, bukan target pemasangan. Konsumsi listrik cenderung bertambah seiring waktu, musim penghujan membuat produksi turun sementara, dan performa panel sangat perlahan menurun seiring usia. Karena itu, praktik yang kami anjurkan adalah memilih paket sistem satu tingkat di atas hasil hitungan. Rumah dengan hitungan 2 kWp di atas, misalnya, paling aman memakai paket 2,6 kWp yang terdiri dari 4 panel 650 Wp.",
    },
    {
      type: "ul",
      items: [
        "Rumah tangga: paket 1,3 / 2,6 / 3,25 / 5,2 kWp",
        "Bisnis dan usaha: paket 7,15 / 10,4 kWp",
        "Industri: paket 11,7 / 20,8 kWp",
      ],
    },
    { type: "h3", text: "Energi Menentukan Panel, Daya Menentukan Inverter" },
    {
      type: "p",
      text: "Satu poin yang sering terlewat: audit beban menghasilkan dua angka berbeda dengan fungsi berbeda. Kebutuhan energi harian (kWh) menentukan jumlah panel, sedangkan total daya perangkat yang menyala bersamaan (W) menentukan kapasitas inverter. Kompresor AC dan pompa air menarik arus start 2–3 kali daya nominalnya dalam sepersekian detik, jadi inverter harus punya ruang untuk itu. Inverter hybrid 1-fase umumnya tersedia dalam kapasitas 3,6 / 6 / 8 / 10 kW, sedangkan untuk beban tiga fase tersedia 10 / 15 / 20 kW.",
    },
    {
      type: "cta",
      text: "Sudah punya angka kebutuhan energi harian rumah Anda? Cocokkan dengan rentang paket PLTS rumah tangga kami.",
      href: "/solar-home",
      label: "Lihat Paket PLTS Rumah",
    },
    { type: "h2", text: "Kesalahan Umum saat Menentukan Kapasitas PLTS" },
    {
      type: "ul",
      items: [
        "Menghitung dari daya langganan PLN (misalnya 2.200 VA) — daya langganan adalah batas daya, bukan besarnya konsumsi energi harian.",
        "Memakai angka rata-rata rumah dari internet — pola konsumsi tiap rumah sangat berbeda tergantung jumlah penghuni dan kebiasaan.",
        "Melupakan perangkat yang dipakai musiman seperti pompa air, mesin cuci, dan setrika.",
        "Tidak menyiapkan margin untuk penambahan perangkat di masa depan, misalnya AC kedua.",
        "Mencampuradukkan satuan energi (kWh) dengan satuan daya (W) sehingga hasil perhitungan meleset jauh.",
      ],
    },
    {
      type: "p",
      text: "Audit beban hanya membutuhkan kertas, pena, dan satu jam waktu Anda, tetapi pengaruhnya menyeluruh: jumlah panel, kapasitas inverter, hingga jumlah baterai semuanya mengikuti hasilnya. Jika Anda ingin angka yang langsung presisi, tim teknis kami melakukan survei dan audit beban di lokasi sebagai bagian dari proses pemasangan — sehingga sistem yang ditawarkan benar-benar sesuai dengan cara Anda memakai listrik.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Berapa kWp Panel Surya untuk Rumah?",
          href: "/artikel/berapa-kwp-panel-surya-untuk-rumah",
          desc: "Ringkasan kebutuhan kWp berdasarkan tipe rumah.",
        },
        {
          label: "Biaya Pasang PLTS Rumah di Jambi",
          href: "/artikel/biaya-pasang-plts-rumah-jambi",
          desc: "Rincian biaya investasi PLTS rumah tangga.",
        },
        {
          label: "Cara Menghitung Kebutuhan Baterai PLTS",
          href: "/artikel/cara-menghitung-kebutuhan-baterai",
          desc: "Langkah lanjutan setelah mengetahui kapasitas panel.",
        },
      ],
    },
  ],
  relatedSlugs: [
    "berapa-kwp-panel-surya-untuk-rumah",
    "biaya-pasang-plts-rumah-jambi",
    "cara-menghitung-kebutuhan-baterai",
  ],
};
