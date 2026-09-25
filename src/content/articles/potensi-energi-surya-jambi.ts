import type { Article } from "./types";

export const article: Article = {
  slug: "potensi-energi-surya-jambi",
  title: "Potensi Energi Surya di Jambi: Mengapa Jambi Cocok untuk PLTS",
  description:
    "Potensi energi surya di Jambi sangat menjanjikan: parameter desain kami memakai PSH 3,75 jam per hari dengan iradiasi stabil sepanjang tahun. Pelajari mengapa Jambi ideal untuk PLTS.",
  category: "Energi Surya Jambi",
  date: "2026-09-23",
  // 2026-09-24: label asumsi skenario tarif + pemanfaatan energi (audit Round 8).
  // 2026-09-25: sweep konsistensi kapasitas studi kasus (audit ulang total) —
  // villa 5 kWp → 5,2 kWp, sawit 10 kWp → 10,4 kWp (selaras caseStudies.ts
  // dan tabel kapasitas di artikel ini).
  updated: "2026-09-25",
  readingMinutes: 7,
  keyTakeaways: [
    "Jambi berada dekat garis khatulistiwa sehingga iradiasi mataharinya tinggi dan relatif stabil sepanjang tahun.",
    "Peak Sun Hours (PSH) — acuan desain kami untuk Jambi: 3,75 jam per hari; dengan efisiensi sistem sekitar 80%, setiap 1 kWp menghasilkan sekitar 3 kWh listrik per hari.",
    "Wilayah perkebunan seperti Muaro Jambi, Batanghari, Sarolangun, Tebo, dan Bungo banyak yang belum terjangkau jaringan PLN, sehingga PLTS off-grid sangat relevan.",
    "Musim hujan menurunkan produksi sementara, tetapi desain baterai dan sistem hybrid menjaga pasokan listrik tetap andal.",
  ],
  blocks: [
    {
      type: "p",
      text: "Pertanyaan yang paling sering kami terima dari pemilik rumah, villa, dan kebun di Jambi: apakah sinar matahari di provinsi ini cukup untuk membangkitkan listrik secara ekonomis? Jawaban singkatnya: ya, dan sering kali lebih dari perkiraan mereka. Posisi Jambi yang berdekatan dengan garis khatulistiwa memberikan potensi energi surya yang nyata dan stabil. Artikel ini membahas potensi energi surya di Jambi dari sisi teknis — berapa listrik yang bisa dihasilkan, wilayah mana yang paling berpotensi, dan bagaimana musim memengaruhi produksi.",
    },
    { type: "h2", text: "Mengapa Letak Geografis Jambi Menguntungkan" },
    {
      type: "p",
      text: "Jambi terletak di bagian tengah Pulau Sumatra, hanya beberapa derajat di selatan khatulistiwa. Konsekuensinya, sudut datang sinar matahari hampir tegak lurus sepanjang tahun dan durasi siang hari relatif konstan, sekitar 12 jam. Berbeda dengan negara empat musim yang produksi suryanya anjlok saat musim dingin, iklim tropis Jambi membuat pancaran matahari tetap tersedia setiap bulan — termasuk di bulan-bulan musim hujan.",
    },
    {
      type: "ul",
      items: [
        "PSH (Peak Sun Hours) — acuan desain kami untuk Jambi 3,75 jam per hari, setara dengan standar perencanaan PLTS di banyak kawasan tropis.",
        "Durasi siang yang stabil membuat pola produksi harian mudah diprediksi saat desain sistem.",
        "Suhu udara yang konsisten sepanjang tahun memudahkan estimasi derating panel sejak tahap perencanaan.",
        "Iradiasi tersebar merata di seluruh kabupaten, bukan terkonsentrasi di satu wilayah saja.",
      ],
    },
    { type: "h2", text: "Berapa Listrik yang Dihasilkan 1 kWp di Jambi?" },
    {
      type: "p",
      text: "Perhitungan praktisnya sederhana. Parameter desain kami memakai PSH 3,75 jam dikalikan efisiensi sistem sekitar 80% — sudah memperhitungkan rugi-rugi pada kabel, inverter, dan pengaruh suhu panel — menghasilkan sekitar 3 kWh per hari untuk setiap 1 kWp kapasitas terpasang. Dengan panel monokristalin 650Wp, satu unit panel saja menghasilkan hampir 2 kWh per hari. Tabel berikut memberikan gambaran kapasitas terhadap produksi:",
    },
    {
      type: "table",
      caption: "Estimasi produksi PLTS di Jambi (asumsi PSH 3,75 jam, efisiensi sistem 80%)",
      headers: ["Kapasitas Sistem", "Produksi per Hari", "Produksi per Bulan", "Contoh Pemakaian"],
      rows: [
        ["1,3 kWp (2 panel 650Wp)", "±3,9 kWh", "±117 kWh", "Lampu, kipas, charger, TV kecil"],
        ["2,6 kWp (4 panel 650Wp)", "±7,8 kWh", "±234 kWh", "Kebutuhan rumah kecil hingga menengah"],
        ["5,2 kWp (8 panel 650Wp)", "±15,6 kWh", "±468 kWh", "Rumah besar, villa, kafe kecil"],
        ["10,4 kWp (16 panel 650Wp)", "±31,2 kWh", "±936 kWh", "Pondok kebun, pompa air, CCTV 24 jam"],
      ],
    },
    {
      type: "p",
      text: "Sebagai pembanding: dengan tarif listrik PLN acuan Rp1.352–1.444,70 per kWh, produksi 936 kWh per bulan pada sistem 10,4 kWp setara dengan sekitar Rp 1,2–1,35 juta listrik yang tidak perlu dibeli — setiap bulan, selama usia pakai sistem yang bisa mencapai 25 tahun dengan garansi performa panel.",
    },
    { type: "h2", text: "Wilayah Jambi dengan Potensi PLTS Terbesar" },
    {
      type: "p",
      text: "Secara teknis, seluruh wilayah Jambi menerima iradiasi yang layak untuk PLTS. Namun beberapa kawasan menonjol karena kebutuhan listriknya paling mendesak:",
    },
    {
      type: "ul",
      items: [
        "Muaro Jambi dan sekitarnya — kawasan hunian dan usaha baru yang berkembang di pinggiran Kota Jambi.",
        "Batanghari — wilayah villa, wisata sungai, dan perkebunan karet yang membutuhkan pasokan andal.",
        "Sarolangun, Tebo, dan Bungo — kawasan perkebunan sawit dan karet luas yang sebagian arealnya belum terjangkau jaringan PLN.",
        "Desa-desa pedalaman dan kawasan transmigrasi yang masih mengandalkan genset untuk listrik harian.",
      ],
    },
    {
      type: "p",
      text: "Justru di area yang jauh dari jaringan inilah PLTS paling masuk akal secara ekonomi. Menarik jaringan PLN baru ke lokasi terpencil bisa sangat mahal dan memakan waktu lama, sementara genset menguras biaya BBM setiap hari. PLTS off-grid memotong kedua masalah tersebut sekaligus.",
    },
    { type: "h2", text: "Bagaimana dengan Musim Hujan?" },
    {
      type: "p",
      text: "Tantangan iklim Jambi bukan kurangnya matahari, melainkan hari-hari mendung dan hujan yang menurunkan produksi untuk sementara. Perencanaan yang baik mengatasinya dengan dua cara: menambah cadangan baterai LiFePO4 (tersedia dalam modul 48V 100Ah setara 4,8 kWh per unit) dan memilih sistem hybrid yang otomatis beralih ke PLN atau genset saat produksi surya tidak mencukupi.",
    },
    {
      type: "note",
      title: "Catatan perencanaan",
      text: "Jangan menghitung kebutuhan panel hanya berdasarkan hari cerah. Gunakan asumsi produksi konservatif dan siapkan margin baterai untuk 1–2 hari mendung beruntun, terutama untuk sistem off-grid murni di dalam kebun.",
    },
    { type: "h2", text: "Aplikasi PLTS yang Sudah Terbukti di Jambi" },
    {
      type: "p",
      text: "Potensi tidak berarti apa-apa tanpa penerapan nyata. Beberapa aplikasi yang paling umum dan ekonomis di Jambi:",
    },
    {
      type: "ul",
      items: [
        "PLTS hybrid untuk rumah dan villa — menekan tagihan PLN secara signifikan dengan baterai sebagai cadangan.",
        "PLTS off-grid untuk kebun sawit dan karet — menggantikan genset untuk pompa air, CCTV, dan pondok kebun.",
        "Solar pump — mengairi kebun dan mengisi penampungan tanpa biaya BBM sama sekali.",
        "PJUTS — penerangan jalan desa dan jalan kebun tanpa kabel dan tanpa tagihan bulanan.",
      ],
    },
    {
      type: "p",
      text: "Salah satu contoh terdokumentasi: villa di Jambi dengan sistem hybrid 5,2 kWp yang menekan tagihan listriknya dari Rp 4 juta menjadi sekitar Rp 500 ribu per bulan. Di sektor perkebunan, kebun sawit di Riau yang semula membayar Rp 12 juta per bulan untuk genset kini memasok pompa air, CCTV, dan pondok secara mandiri dengan sistem off-grid 10,4 kWp.",
    },
    {
      type: "cta",
      text: "Ingin tahu berapa potensi untuk rumah atau usaha Anda? Tim kami melakukan survei lokasi dan simulasi produksi berdasarkan data iradiasi Jambi.",
      href: "/solar-home",
      label: "Konsultasi PLTS Rumah & Usaha di Jambi",
    },
    { type: "h2", text: "Langkah Awal Memanfaatkan Potensi Ini" },
    {
      type: "ol",
      items: [
        "Audit beban: catat semua peralatan listrik beserta daya dan jam pemakaiannya per hari.",
        "Pilih arsitektur: on-grid untuk menekan tagihan, hybrid dengan baterai dan cadangan PLN, atau off-grid untuk area tanpa jaringan PLN.",
        "Hitung kapasitas panel dan baterai berdasarkan kebutuhan harian nyata, bukan sekadar anggaran.",
        "Minta survei lokasi untuk memastikan area panel bebas bayangan dan jalur kabel efisien.",
        "Jadwalkan perawatan berkala agar produksi tetap optimal selama puluhan tahun.",
      ],
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "PLTS untuk Kebun Sawit: Listrik Mandiri di Area Tanpa Jangkauan PLN",
          href: "/artikel/plts-untuk-kebun-sawit",
          desc: "Mengapa kebun yang jauh dari PLN paling diuntungkan oleh PLTS off-grid.",
        },
        {
          label: "Berapa Produksi 1 kWp Panel Surya per Hari?",
          href: "/artikel/berapa-produksi-1-kwp-panel-surya",
          desc: "Rumus lengkap menghitung produksi panel surya di lokasi Anda.",
        },
        {
          label: "Harga Panel Surya di Jambi",
          href: "/harga-panel-surya-jambi",
          desc: "Faktor-faktor yang menentukan biaya pemasangan PLTS di wilayah Jambi.",
        },
      ],
    },
  ],
  relatedSlugs: ["plts-untuk-kebun-sawit", "berapa-produksi-1-kwp-panel-surya", "biaya-pasang-plts-rumah-jambi"],
};
