import type { Article } from "./types";

export const article: Article = {
  slug: "cara-menghitung-kebutuhan-baterai",
  title: "Cara Menghitung Kebutuhan Baterai PLTS (dengan Contoh Perhitungan)",
  description:
    "Panduan menghitung kebutuhan baterai PLTS: rumus kapasitas, DoD, perbedaan Ah vs kWh, contoh perhitungan LiFePO4 48V 100Ah, dan perbandingan lead-acid.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  readingMinutes: 8,
  keyTakeaways: [
    "Kapasitas baterai dihitung dengan rumus: energi yang harus ditanggung baterai dibagi DoD (depth of discharge).",
    "Baterai LiFePO4 48V 100Ah menyimpan 4,8 kWh per unit, dengan DoD aman 80–90% — gunakan 80% untuk perhitungan konservatif.",
    "Contoh: kebutuhan malam 4 kWh ÷ 0,8 = 5 kWh → dibulatkan ke 2 unit 4,8 kWh, karena satu unit hanya menyediakan 3,84 kWh energi pakai.",
    "Aturan praktis desain sistem: kapasitas baterai ≈ kWp × PSH, dibulatkan ke unit 4,8 kWh.",
    "LiFePO4 bertahan 3.000–6.000 siklus versus 300–500 siklus pada lead-acid — biaya per siklusnya jauh lebih murah.",
  ],
  blocks: [
    {
      type: "p",
      text: "Setelah mengetahui berapa kWp panel yang dibutuhkan, pertanyaan berikutnya yang hampir selalu muncul adalah: berapa kapasitas baterai yang tepat? Baterai adalah salah satu komponen dengan porsi biaya terbesar dalam sebuah PLTS. Terlalu kecil, rumah Anda gelap di tengah malam atau PLN padam hanya beberapa jam. Terlalu besar, Anda membayar ribuan watt-jam kapasitas yang tidak pernah terpakai. Panduan ini menguraikan cara menghitungnya dengan benar, lengkap dengan contoh perhitungan yang bisa Anda ikuti.",
    },
    { type: "h2", text: "Peran Baterai dalam Sistem PLTS" },
    {
      type: "p",
      text: "Pada sistem hybrid, siang hari panel surya memasok beban rumah sekaligus mengisi baterai. Ketika matahari terbenam atau pasokan PLN padam, inverter hybrid otomatis beralih ke baterai hingga pagi hari atau hingga listrik kembali normal. Pada sistem off-grid yang sama sekali tidak terhubung PLN, baterai memikul tanggung jawab lebih besar: menampung seluruh kelebihan produksi siang untuk dipakai setiap malam. Semakin besar peran baterai dalam sistem Anda, semakin krusial perhitungan kapasitasnya.",
    },
    { type: "h2", text: "Pahami Dulu Tiga Istilah: Ah, kWh, dan DoD" },
    {
      type: "p",
      text: "Kapasitas baterai sering ditulis dalam ampere-jam (Ah), tetapi untuk kebutuhan perencanaan PLTS satuan yang tepat adalah kilowatt-jam (kWh) — satuan energi yang sama dengan yang tertera di tagihan listrik Anda. Konversinya sederhana: kWh = (tegangan × Ah) ÷ 1.000. Baterai LiFePO4 48V 100Ah dengan demikian menyimpan 48 × 100 ÷ 1.000 = 4,8 kWh energi.",
    },
    {
      type: "p",
      text: "Istilah kedua yang wajib dipahami adalah DoD (depth of discharge) — porsi kapasitas baterai yang boleh dipakai tanpa memperpendek umurnya. Baterai LiFePO4 modern memiliki DoD 80–90%; dalam perhitungan sebaiknya dipakai angka konservatif 0,8 agar ada ruang aman. Baterai lead-acid hanya nyaman dipakai sekitar 50% kapasitasnya. Konsekuensinya: energi pakai (usable) = kapasitas nominal × DoD. Satu unit 4,8 kWh dengan DoD 0,8 menyediakan 4,8 × 0,8 = 3,84 kWh energi yang benar-benar bisa diandalkan.",
    },
    {
      type: "note",
      title: "Catatan",
      text: "Menguras baterai sampai 0% secara rutin memperpendek umur pakainya. Pada baterai LiFePO4, BMS (battery management system) bawaan akan memutus pemakaian sebelum baterai benar-benar habis — tetapi mendesain sistem dengan DoD 80% tetap lebih sehat untuk jangka panjang.",
    },
    { type: "h2", text: "Rumus Dasar Menghitung Kebutuhan Baterai" },
    {
      type: "p",
      text: "Rumus intinya satu baris saja: kapasitas baterai (kWh) = energi yang harus ditanggung baterai (kWh) ÷ DoD. Yang menentukan pembilang adalah skenario pemakaian Anda. Pada sistem hybrid, baterai terutama menanggung beban malam hari — lampu, TV, kipas, charger — karena beban siang hari dipasok langsung oleh panel. Jika Anda ingin baterai juga siap membackup satu hari penuh saat PLN padam lama, pembilangnya adalah seluruh kebutuhan energi harian.",
    },
    { type: "h2", text: "Contoh Perhitungan Lengkap" },
    { type: "h3", text: "Studi kasus 1: rumah dengan beban malam 4 kWh" },
    {
      type: "p",
      text: "Dari audit beban (lihat panduan audit beban listrik kami), sebuah rumah mencatat kebutuhan malam — lampu, TV, kipas, router, dan charger — sebesar 4 kWh. Ikuti tiga langkah berikut.",
    },
    {
      type: "ol",
      items: [
        "Tentukan energi yang harus ditanggung baterai: beban malam 4 kWh.",
        "Bagi dengan DoD: 4 ÷ 0,8 = 5 kWh kapasitas nominal yang dibutuhkan.",
        "Konversi ke jumlah unit: 5 ÷ 4,8 = 1,04 → dibulatkan ke atas menjadi 2 unit baterai LiFePO4 48V 100Ah (total 9,6 kWh).",
      ],
    },
    {
      type: "p",
      text: "Mengapa tidak cukup satu unit? Satu unit 4,8 kWh hanya menyediakan 3,84 kWh energi pakai — kurang dari kebutuhan 4 kWh. Dua unit memberikan 9,6 kWh nominal atau 7,68 kWh energi pakai, cukup untuk beban malam dengan ruang cadangan sehat.",
    },
    { type: "h3", text: "Studi kasus 2: backup satu hari penuh saat PLN padam" },
    {
      type: "p",
      text: "Jika rumah yang sama (kebutuhan harian total 6 kWh) ingin tetap menyala satu hari penuh tanpa PLN dan tanpa sinar matahari, hitungannya: 6 ÷ 0,8 = 7,5 kWh → 7,5 ÷ 4,8 = 1,56 → dibulatkan ke atas menjadi 2 unit (9,6 kWh nominal, 7,68 kWh energi pakai). Kebetulan hasilnya sama dengan studi kasus pertama — tetapi untuk kebutuhan yang lebih besar, jumlah unitnya akan langsung terasa bedanya.",
    },
    { type: "h2", text: "Aturan Praktis Desain: kWp × PSH" },
    {
      type: "p",
      text: "Dalam praktik desain sistem yang kami gunakan, kapasitas baterai yang direkomendasikan untuk tiap paket adalah kWp × PSH, dibulatkan ke unit 4,8 kWh terdekat. Logikanya: baterai mampu menampung produksi panel selama satu hari penuh, sehingga tidak ada energi matahari yang terbuang dan rumah tetap bertahan ketika PLN padam semalaman. Sebagai contoh, untuk sistem 2,6 kWp di Jambi: 2,6 × 3,75 = 9,75 kWh → dibulatkan menjadi 2 unit baterai 4,8 kWh (9,6 kWh).",
    },
    { type: "h2", text: "LiFePO4 vs Lead-Acid: Mengapa Kimia Baterai Itu Penting" },
    {
      type: "p",
      text: "Dua kimia baterai paling umum untuk PLTS adalah lithium iron phosphate (LiFePO4) dan lead-acid. Lead-acid memang lebih murah di muka, tetapi perbandingan berikut menunjukkan mengapa sistem modern hampir selalu memilih LiFePO4.",
    },
    {
      type: "table",
      caption: "Perbandingan baterai LiFePO4 dan lead-acid untuk aplikasi PLTS.",
      headers: ["Aspek", "LiFePO4", "Lead-Acid"],
      rows: [
        ["Umur siklus", "3.000–6.000 siklus", "300–500 siklus"],
        ["DoD yang dianjurkan", "80–90%", "±50%"],
        ["Perawatan", "Praktis tanpa perawatan (ada BMS)", "Perlu pengecekan air dan terminal rutin"],
        ["Keamanan termal", "Struktur kimia stabil", "Lebih sensitif terhadap salah perlakuan"],
        ["Bobot per kWh", "Ringan", "Berat"],
      ],
    },
    {
      type: "p",
      text: "Cara paling jujur membandingkan harga baterai bukan dari harga belinya, melainkan biaya per siklus. Baterai lead-acid yang awet 300–500 siklus harus diganti berkali-kali selama umur PLTS, sedangkan LiFePO4 yang awet 3.000–6.000 siklus bisa dipakai bertahun-tahun tanpa penggantian. Dengan asumsi satu siklus per hari, LiFePO4 bertahan 8–16 tahun pemakaian — sebanding dengan garansi panel dan inverter yang dipasang bersamanya.",
    },
    { type: "h2", text: "Kesalahan Umum saat Menghitung Baterai" },
    {
      type: "ul",
      items: [
        "Memasukkan seluruh beban siang dan malam ke dalam hitungan baterai, padahal beban siang dipasok langsung oleh panel.",
        "Mengabaikan DoD, sehingga kapasitas yang terpasang selalu terasa kurang saat dipakai.",
        "Tertukar antara Ah dan kWh — baterai 100Ah 12V hanya menyimpan 1,2 kWh, jauh berbeda dari 100Ah 48V yang menyimpan 4,8 kWh.",
        "Melupakan arus start (surge) pompa atau AC yang memengaruhi pemilihan inverter, bukan kapasitas baterai.",
        "Tidak menetapkan berapa hari backup yang diinginkan sejak awal, sehingga sistem berakhir kurang atau lebih kapasitas.",
      ],
    },
    {
      type: "cta",
      text: "Untuk kebutuhan usaha yang menuntut backup lebih besar, sistem PLTS komersial kami dirancang dengan kapasitas baterai sesuai hasil audit.",
      href: "/solar-commercial",
      label: "Sistem PLTS untuk Bisnis",
    },
    {
      type: "p",
      text: "Intinya: hitung beban yang benar-benar ditanggung baterai, bagi dengan DoD, lalu bulatkan ke atas ke unit baterai yang tersedia. Tiga langkah itu akan menghemat banyak biaya dan menjaga rumah Anda tetap menyala persis seperti yang direncanakan.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "PLTS Hybrid vs Off-Grid: Mana yang Tepat?",
          href: "/artikel/plts-hybrid-vs-off-grid",
          desc: "Perbedaan peran baterai pada kedua jenis sistem.",
        },
        {
          label: "Cara Menentukan Kapasitas PLTS",
          href: "/artikel/cara-menentukan-kapasitas-plts",
          desc: "Langkah pertama: audit beban listrik.",
        },
        {
          label: "Paket PLTS Rumah dengan Baterai LiFePO4",
          href: "/solar-home",
          desc: "Konfigurasi paket rumah tangga.",
        },
      ],
    },
  ],
  relatedSlugs: ["plts-hybrid-vs-off-grid", "cara-menentukan-kapasitas-plts"],
};
