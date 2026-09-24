import type { Article } from "./types";

export const article: Article = {
  slug: "harga-panel-surya-jambi-faktor-biaya",
  title: "Harga Panel Surya di Jambi: Faktor-Faktor yang Mempengaruhi Biaya",
  description:
    "Faktor penentu harga panel surya di Jambi: kapasitas kWp, jenis sistem, kualitas komponen, garansi, hingga kondisi atap rumah Anda.",
  category: "Biaya & Harga",
  date: "2026-09-23",
  // 2026-09-24: label asumsi skenario tarif + pemanfaatan energi (audit Round 8).
  updated: "2026-09-24",
  readingMinutes: 8,
  keyTakeaways: [
    "Harga PLTS ditentukan oleh kapasitas (kWp), konfigurasi hybrid atau off-grid, kualitas komponen, kondisi atap, dan PPN — bukan sekadar merek panel.",
    "Di Jambi, 1 kWp panel menghasilkan sekitar 3 kWh per hari (PSH 3,75 jam × efisiensi 80%), sehingga kebutuhan listrik menentukan kapasitas yang harus dibeli.",
    "Baterai adalah komponen dengan pengaruh harga terbesar setelah panel; pada sistem hybrid baterai bersifat opsional dan bisa ditambah belakangan.",
    "Bandingkan penawaran dari sisi total biaya kepemilikan: garansi performa panel 25 tahun membuat komponen berkualitas justru lebih hemat dalam jangka panjang.",
  ],
  blocks: [
    {
      type: "p",
      text: "Mencari harga panel surya di Jambi sering kali berujung pada kebingungan: satu vendor menyebut angka yang jauh berbeda dengan vendor lain, padahal kapasitasnya terlihat sama. Hal ini wajar, karena harga sebuah sistem PLTS (Pembangkit Listrik Tenaga Surya) tidak ditentukan oleh panel semata. Ada lima faktor besar yang membentuk angka akhir: kapasitas sistem, jenis konfigurasi, kualitas komponen, kondisi atap dan lokasi, serta komponen administratif seperti PPN. Artikel ini membahas satu per satu agar Anda bisa membaca penawaran dengan lebih kritis — dan tahu pertanyaan apa yang perlu diajukan sebelum menandatangani kontrak.",
    },
    { type: "h2", text: "Komponen yang Membentuk Harga Sistem PLTS" },
    {
      type: "p",
      text: "Sebelum masuk ke faktor-faktor, penting memahami bahwa yang Anda beli adalah satu sistem utuh, bukan sekadar tumpukan panel. Tabel berikut merinci komponen standar sebuah PLTS hybrid dan bagaimana masing-masing memengaruhi biaya.",
    },
    {
      type: "table",
      caption: "Komponen sistem PLTS dan pengaruhnya terhadap biaya",
      headers: ["Komponen", "Fungsi", "Pengaruh terhadap Harga"],
      rows: [
        [
          "Panel surya 650 Wp",
          "Mengubah sinar matahari menjadi listrik DC",
          "Jumlah unit mengikuti target kWp — penentu biaya terbesar pertama",
        ],
        [
          "Inverter hybrid",
          "Mengubah DC menjadi AC dan mengatur aliran daya dari PLN, surya, serta baterai",
          "Kapasitas 3,6–10 kW (1 fase) atau 10–20 kW (3 fase) menyesuaikan beban puncak",
        ],
        [
          "Baterai LiFePO4",
          "Menyimpan energi untuk malam hari dan backup saat listrik padam",
          "Penentu biaya terbesar kedua; opsional pada sistem hybrid, ditambah per unit 4,8 kWh",
        ],
        [
          "Struktur mounting",
          "Merangkai panel pada atap, carport, atau struktur tanah",
          "Bergantung pada tipe atap, jumlah panel, dan kebutuhan carport",
        ],
        [
          "Kabel, konektor, dan proteksi",
          "Menyalurkan daya serta melindungi sistem (MCB DC, SPD, grounding)",
          "Naik seiring jumlah string dan panjang jalur kabel",
        ],
        [
          "Survei, instalasi, dan commissioning",
          "Memastikan desain tepat, pemasangan aman, dan sistem teruji",
          "Biaya sekali di awal; menentukan performa 25 tahun ke depan",
        ],
      ],
    },
    { type: "h2", text: "Faktor 1: Kapasitas Sistem (kWp) — Penentu Utama Harga" },
    {
      type: "p",
      text: "Kapasitas PLTS dinyatakan dalam kWp (kilowatt-peak). Acuan desain kami untuk Jambi memakai Peak Sun Hours (PSH) 3,75 jam per hari dan efisiensi sistem sekitar 80%, sehingga 1 kWp menghasilkan kira-kira 3 kWh listrik per hari. Artinya, rumah yang memakai 6 kWh per hari membutuhkan sekitar 2 kWp — dengan panel 650 Wp per unit, itu setara 4 panel, atau paket 2,6 kWp.",
    },
    {
      type: "p",
      text: "Karena jumlah panel, kabel, dan luas mounting naik linear terhadap kWp, kapasitas adalah faktor biaya paling dominan. Namun perhitungannya tidak murni linear: ada biaya yang relatif tetap seperti survei, desain, panel proteksi, dan mobilisasi tim, sehingga paket kecil memiliki harga per kWp yang sedikit lebih tinggi daripada paket besar.",
    },
    { type: "h2", text: "Faktor 2: Konfigurasi Sistem — Hybrid atau Off-Grid" },
    {
      type: "p",
      text: "Sistem hybrid tetap terhubung dengan jaringan PLN: siang hari beban disuplai surya, kelebihannya mengisi baterai, dan malam hari rumah beralih ke baterai atau PLN. Pada konfigurasi ini baterai bersifat opsional — Anda bisa memasang PLTS tanpa baterai lebih dulu, lalu menambahkannya ketika anggaran tersedia. Sebaliknya, sistem off-grid berdiri sendiri tanpa jaringan PLN sehingga baterai wajib dan kapasitasnya besar. Inilah alasan off-grid hampir selalu lebih mahal untuk kebutuhan yang sama, sekaligus menjadi satu-satunya pilihan di lokasi yang belum terjangkau jaringan listrik.",
    },
    { type: "h2", text: "Faktor 3: Kualitas Komponen dan Panjang Garansi" },
    {
      type: "p",
      text: "Dua penawaran dengan kapasitas sama bisa berbeda harga karena kualitas komponen di dalamnya. Panel kelas baik datang dengan garansi performa hingga 25 tahun, yang berarti output dijamin tetap di atas ambang tertentu sepanjang masa pakai. Inverter hybrid berkualitas digaransi 5–10 tahun, dan pengerjaan instalasi profesional umumnya digaransi sekitar 2 tahun. Komponen murah tanpa garansi jelas menurunkan harga di muka — tetapi biaya penggantian inverter atau penurunan produksi panel di tahun-tahun awal bisa membuat total biaya kepemilikan justru lebih tinggi.",
    },
    {
      type: "p",
      text: "Saat membandingkan penawaran, pastikan Anda mengetahui hal-hal berikut:",
    },
    {
      type: "ul",
      items: [
        "Daya per panel: sistem dengan panel 650 Wp membutuhkan lebih sedikit unit, kabel, dan titik mounting dibandingkan panel 300–400 Wp.",
        "Jenis inverter: inverter hybrid memungkinkan integrasi baterai dan PLN; inverter on-grid biasa tidak punya kemampuan ini.",
        "Lengkapan proteksi: MCB DC, SPD, dan grounding bukan opsional, melainkan standar keselamatan instalasi.",
        "Garansi tertulis: garansi performa panel, garansi produk inverter, dan garansi pekerjaan instalasi.",
      ],
    },
    { type: "h2", text: "Faktor 4: Kondisi Atap dan Lokasi Pemasangan di Jambi" },
    {
      type: "p",
      text: "Kondisi lapangan di Jambi sangat beragam — dari perumahan modern di Kota Jambi hingga rumah dan kebun di Muaro Jambi, Batanghari, atau Sarolangun. Beberapa hal yang memengaruhi biaya instalasi:",
    },
    {
      type: "ul",
      items: [
        "Tipe atap: genteng keramik memerlukan bracket berbeda dengan atap spandek atau baja ringan; pemasangan carport memerlukan struktur tersendiri.",
        "Orientasi dan kemiringan: Jambi berada di dekat garis khatulistiwa sehingga atap menghadap utara umumnya sedikit lebih baik; orientasi yang kurang ideal bisa menuntut penyangga khusus.",
        "Bayangan: pepohonan rimbun khas Jambi bisa menutupi atap; pemangkasan cabang atau relokasi titik pasang menambah pekerjaan.",
        "Akses dan jarak: lokasi yang jauh dari Kota Jambi menambah biaya mobilisasi tim, dan jalur kabel panel ke inverter yang panjang menambah material.",
      ],
    },
    { type: "h2", text: "Faktor 5: PPN dan Biaya Administrasi" },
    {
      type: "p",
      text: "Pembelian dan pemasangan PLTS dikenakan PPN 11%. Pastikan penawaran yang Anda terima sudah termasuk PPN, survei, instalasi, dan garansi — bukan sekadar harga komponen. Penawaran yang tampak murah sering kali belum memasukkan biaya pemasangan atau perlengkapan proteksi, sehingga total biaya membengkak di tengah pengerjaan.",
    },
    { type: "h2", text: "Cara Menilai Penawaran: Fokus pada Total Biaya Kepemilikan" },
    {
      type: "p",
      text: "Cara paling sehat membandingkan harga bukan mencari angka termurah, melainkan membandingkan total biaya kepemilikan selama 20–25 tahun: harga awal ditambah biaya perawatan dan kemungkinan penggantian komponen, diukur terhadap penghematan listrik yang dihasilkan. Dengan tarif acuan PLN Rp1.352–1.444,70/kWh untuk pelanggan rumah tangga R-1, estimasi internal kami menunjukkan balik modal PLTS rumah tangga tercapai dalam 9–11 tahun dengan asumsi skenario kenaikan tarif listrik 6% per tahun (asumsi simulasi, bukan rata-rata historis PLN) dan pemanfaatan energi 80% (profil campuran + baterai). Sisanya — belasan tahun lagi — adalah masa garansi panel yang terus menghasilkan listrik dengan biaya operasional sangat rendah.",
    },
    {
      type: "cta",
      text: "Ingin melihat harga paket PLTS terpasang di Jambi? Halaman harga kami merinci setiap paket lengkap dengan kapasitas, jumlah panel, dan spesifikasi inverter — semuanya sudah termasuk PPN, survei, instalasi, dan garansi.",
      href: "/harga-panel-surya-jambi",
      label: "Lihat Harga Paket PLTS Jambi",
    },
    {
      type: "note",
      title: "Sebelum menandatangani kontrak",
      text: "Minta selalu rincian komponen dalam penawaran: merek dan daya panel, model inverter, kapasitas baterai, serta cakupan garansi. Penawaran yang profesional transparan sampai ke level ini.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Biaya Pasang PLTS Rumah di Jambi: Komponen Biaya & Cara Menghitungnya",
          href: "/artikel/biaya-pasang-plts-rumah-jambi",
          desc: "Rincian tiap komponen biaya dan langkah menghitungnya untuk rumah Anda",
        },
        {
          label: "Berapa kWp Panel Surya untuk Rumah?",
          href: "/artikel/berapa-kwp-panel-surya-untuk-rumah",
          desc: "Panduan audit beban listrik untuk menentukan kapasitas PLTS",
        },
        {
          label: "PLTS Hybrid vs Off-Grid: Perbedaan dan Mana yang Cocok",
          href: "/artikel/plts-hybrid-vs-off-grid",
          desc: "Perbandingan dua konfigurasi sistem beserta implikasi biayanya",
        },
      ],
    },
  ],
  relatedSlugs: [
    "biaya-pasang-plts-rumah-jambi",
    "berapa-kwp-panel-surya-untuk-rumah",
    "plts-hybrid-vs-off-grid",
  ],
};
