import type { Article } from "./types";

export const article: Article = {
  slug: "biaya-pasang-plts-rumah-jambi",
  title: "Biaya Pasang PLTS Rumah di Jambi: Komponen Biaya & Cara Menghitungnya",
  description:
    "Rincian komponen biaya pasang PLTS rumah di Jambi — panel, inverter, baterai, instalasi — plus cara menghitung kebutuhan dan estimasi balik modalnya.",
  category: "Biaya & Harga",
  date: "2026-09-23",
  readingMinutes: 8,
  keyTakeaways: [
    "Biaya pasang PLTS mencakup panel, inverter, baterai (opsional), mounting, kabel, proteksi, serta jasa survei dan instalasi — bukan hanya harga panel.",
    "Mulai dari audit beban: kalikan daya tiap perangkat dengan jam pemakaian untuk mendapat kebutuhan kWh per hari, lalu bagi 3 untuk mendapat kWp.",
    "Rumah dengan daya 900 VA umumnya cukup paket 1,3–3,25 kWp; daya 1300–2200 VA cocok dengan 3,25–5,2 kWp.",
    "Estimasi balik modal PLTS rumah tangga 8–9 tahun (asumsi kenaikan tarif PLN ±6% per tahun), sementara panel bergaransi performa 25 tahun.",
  ],
  blocks: [
    {
      type: "p",
      text: "Berapa biaya pasang PLTS untuk rumah di Jambi? Ini pertanyaan pertama yang muncul di hampir setiap diskusi dengan pemilik rumah — dan jawabannya selalu bergantung pada dua hal: berapa besar listrik yang Anda pakai, dan konfigurasi sistem seperti apa yang Anda pilih. Yang bisa dijelaskan dengan pasti adalah struktur biayanya: dari komponen apa saja yang Anda bayar, bagaimana cara menghitung kebutuhan, hingga kira-kira kapan investasi kembali modal. Artikel ini membahas semuanya langkah demi langkah.",
    },
    { type: "h2", text: "Yang Anda Bayar: Rincian Komponen Biaya" },
    {
      type: "p",
      text: "Biaya pasang PLTS bukanlah harga panel dikalikan jumlah unit. Berikut komponen yang membentuk angka akhir:",
    },
    {
      type: "table",
      caption: "Struktur biaya pemasangan PLTS rumah",
      headers: ["Komponen", "Penjelasan", "Sifat Biaya"],
      rows: [
        [
          "Panel surya 650 Wp",
          "Sumber energi utama; jumlah unit menyesuaikan target kWp",
          "Wajib — proporsional terhadap kapasitas",
        ],
        [
          "Inverter hybrid",
          "Inverter hybrid 1 fase (3,6/6/8/10 kW) untuk rumah; inverter 3 fase (10/15/20 kW) untuk beban besar",
          "Wajib — menyesuaikan beban puncak rumah",
        ],
        [
          "Baterai LiFePO4 48V 100Ah",
          "4,8 kWh per unit; untuk kebutuhan malam hari dan backup saat listrik padam",
          "Opsional pada sistem hybrid — bisa ditambah belakangan",
        ],
        [
          "Mounting dan kabel",
          "Rangka atap, jalur kabel DC-AC, dan konektor MC4",
          "Wajib — mengikuti jumlah panel dan tata letak atap",
        ],
        [
          "Proteksi (MCB DC, SPD, grounding)",
          "Melindungi sistem dari beban lebih dan gangguan surja",
          "Wajib — satu set per sistem",
        ],
        [
          "Survei, desain, instalasi, commissioning",
          "Dari survei lokasi sampai sistem dinyalakan dan teruji",
          "Sekali di awal — menentukan performa jangka panjang",
        ],
      ],
    },
    {
      type: "p",
      text: "Semua paket PLTS rumah tangga di situs kami sudah memasukkan seluruh komponen di atas termasuk PPN 11%, sehingga angka yang Anda lihat adalah angka final — tidak ada biaya tambahan yang muncul di tengah pengerjaan.",
    },
    { type: "h2", text: "Langkah 1: Hitung Konsumsi Listrik Rumah" },
    {
      type: "p",
      text: "Biaya paling akurat selalu berawal dari audit beban: daftarkan seluruh perangkat listrik, dayanya, dan estimasi jam pemakaian per hari. Contoh untuk rumah dengan daya langganan 900 VA:",
    },
    {
      type: "table",
      caption: "Contoh audit beban rumah 900 VA",
      headers: ["Perangkat", "Daya Khas", "Pemakaian", "Perkiraan kWh/Hari"],
      rows: [
        ["AC split 1 PK", "±750 W", "4 jam", "3,0 kWh"],
        ["Kulkas", "±100–150 W", "24 jam (kompresor siklik)", "±1,5 kWh"],
        ["TV dan lampu LED", "±100–200 W total", "5 jam", "±0,8 kWh"],
        ["Pompa air", "±250–500 W", "0,5 jam", "±0,2 kWh"],
      ],
    },
    {
      type: "p",
      text: "Totalnya sekitar 5,5 kWh per hari. Panduan lengkap audit beban — termasuk daftar daya khas perangkat lain seperti mesin cuci dan setrika — kami bahas tuntas di artikel Berapa kWp Panel Surya untuk Rumah.",
    },
    { type: "h2", text: "Langkah 2: Konversi Kebutuhan menjadi Kapasitas (kWp)" },
    {
      type: "p",
      text: "Di Jambi, 1 kWp panel menghasilkan sekitar 3 kWh per hari — dari PSH 3,75 jam dikali efisiensi sistem 80%. Maka kapasitas yang dibutuhkan = kebutuhan harian dibagi 3. Dari contoh di atas: 5,5 kWh ÷ 3 ≈ 1,83 kWp, dibulatkan ke paket terdekat di atasnya yaitu 2,6 kWp (4 panel 650 Wp). Sebagai patokan umum: rumah 900 VA cukup dengan paket 1,3–3,25 kWp, sementara 1300–2200 VA umumnya cocok dengan 3,25–5,2 kWp.",
    },
    { type: "h2", text: "Langkah 3: Putuskan Kebutuhan Baterai" },
    {
      type: "p",
      text: "Baterai adalah komponen dengan pengaruh biaya terbesar setelah panel. Pada sistem hybrid, Anda bebas memilih: tanpa baterai (surya memasok siang hari, PLN mengambil alih malam hari), atau dengan baterai untuk menikmati listrik surya di malam hari sekaligus backup saat PLN padam. Kapasitas dihitung per unit 4,8 kWh (LiFePO4 48V 100Ah); sebagai acuan, kebutuhan baterai pada sistem hybrid umumnya sekitar kWp × 3,75 jam, dibulatkan ke kelipatan 4,8 kWh. Karena baterai LiFePO4 aman digunakan hingga kedalaman pelepasan (DoD) 80–90%, kapasitas terpakai per unit sekitar 3,8–4,3 kWh.",
    },
    {
      type: "note",
      title: "Bisa mulai tanpa baterai?",
      text: "Bisa. Sistem hybrid dirancang moduler — pasang panel dan inverter lebih dulu, lalu tambahkan unit baterai 4,8 kWh kapan pun anggaran tersedia tanpa membongkar instalasi utama.",
    },
    { type: "h2", text: "Estimasi Penghematan dan Balik Modal" },
    {
      type: "p",
      text: "Dengan tarif acuan PLN Rp1.352/kWh (R-1/900 VA) hingga Rp1.444,70/kWh (R-1/1300 VA ke atas), rumah contoh di atas yang mengalihkan 5,5 kWh per hari ke surya menghemat sekitar Rp7.400–8.000 per hari, atau kira-kira Rp223.000–238.000 per bulan. Estimasi internal kami — dengan asumsi kenaikan tarif listrik rata-rata 6% per tahun — menunjukkan balik modal PLTS rumah tangga tercapai dalam 8–9 tahun, sementara panelnya sendiri bergaransi performa 25 tahun. Artinya, lebih dari separuh masa pakai panel menghasilkan listrik nyaris tanpa biaya. Untuk usaha dengan beban siang hari besar, estimasi balik modalnya lebih cepat lagi: 5–7 tahun.",
    },
    {
      type: "note",
      title: "Angka bersifat estimasi",
      text: "Penghematan aktual bergantung pada pola pemakaian, cuaca, arah atap, dan kebersihan panel. Gunakan angka di atas sebagai kerangka berpikir, bukan janji hasil.",
    },
    { type: "h2", text: "Biaya Setelah Pemasangan" },
    {
      type: "p",
      text: "PLTS nyaris tanpa biaya operasional: tidak ada bahan bakar dan sedikit komponen bergerak. Yang perlu dianggarkan hanyalah pembersihan panel secara berkala — terutama di musim hujan Jambi saat debu dan lumut lebih cepat menempel — serta pemeriksaan berkala untuk memastikan produksi tetap optimal. Pekerjaan semacam ini bisa Anda lakukan sendiri atau memanfaatkan layanan maintenance khusus PLTS.",
    },
    { type: "h2", text: "Cara Mendapatkan Angka Akurat untuk Rumah Anda" },
    {
      type: "p",
      text: "Semua perhitungan di atas adalah kerangka. Angka final ditentukan oleh survei: kondisi atap, arah hadap, bayangan, dan posisi panel distribusi di rumah Anda. Karena itu setiap paket kami sudah mencakup survei dan desain — bukan sekadar jual komponen — sehingga kapasitas yang terpasang benar-benar sesuai kebutuhan, tidak kurang dan tidak berlebihan.",
    },
    {
      type: "cta",
      text: "Lihat daftar paket PLTS rumah tangga beserta kapasitas dan rincian harganya — semuanya sudah termasuk PPN, survei, instalasi, dan garansi resmi.",
      href: "/harga-panel-surya-jambi",
      label: "Lihat Harga Paket PLTS Jambi",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Berapa kWp Panel Surya untuk Rumah?",
          href: "/artikel/berapa-kwp-panel-surya-untuk-rumah",
          desc: "Panduan lengkap audit beban untuk menentukan kapasitas PLTS",
        },
        {
          label: "Harga Panel Surya di Jambi: Faktor-Faktor yang Mempengaruhi Biaya",
          href: "/artikel/harga-panel-surya-jambi-faktor-biaya",
          desc: "Mengapa harga PLTS berbeda-beda dan cara membaca penawaran",
        },
        {
          label: "Layanan Maintenance PLTS",
          href: "/maintenance",
          desc: "Perawatan berkala agar produksi panel tetap optimal",
        },
      ],
    },
  ],
  relatedSlugs: [
    "harga-panel-surya-jambi-faktor-biaya",
    "berapa-kwp-panel-surya-untuk-rumah",
    "plts-hybrid-vs-off-grid",
  ],
};
