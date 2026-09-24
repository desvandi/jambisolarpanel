import type { Article } from "./types";

export const article: Article = {
  slug: "cara-merawat-panel-surya",
  title: "Cara Merawat Panel Surya: Checklist Perawatan PLTS Rutin",
  description:
    "Checklist perawatan panel surya dan PLTS rutin: cara membersihkan panel, jadwal inspeksi koneksi, monitoring produksi, dan tanda kapan perlu teknisi.",
  category: "Panduan Teknis",
  date: "2026-09-23",
  readingMinutes: 7,
  keyTakeaways: [
    "PLTS minim perawatan karena tanpa komponen bergerak, tetapi tetap butuh rutinitas: cek monitoring mingguan, inspeksi visual bulanan, pemeriksaan menyeluruh 6–12 bulanan.",
    "Bersihkan panel saat pagi atau sore saat panel dingin, pakai air bersih dan sikat lembut — hindari high pressure washer dan bahan kimia keras.",
    "Debu, daun, dan kotoran burung yang menempel lama bisa menurunkan produksi secara nyata; air hujan biasanya sudah membantu mencuci sebagian besar.",
    "Periksa berkala: kekencangan mounting, kabel dan konektor, ventilasi inverter, kesehatan baterai, dan pertumbuhan pohon di sekitar panel.",
    "Produksi turun konsisten saat hari cerah adalah sinyal kuat untuk memanggil teknisi, bukan sekadar cuaca.",
  ],
  blocks: [
    {
      type: "p",
      text: "Salah satu alasan terbesar orang beralih ke PLTS adalah minimnya perawatan: tidak ada mesin berputar, tidak ada bahan bakar, tidak ada oli yang harus diganti. Tetapi minim perawatan bukan berarti tanpa perawatan. Panel yang kotor, kabel yang longgar, atau pohon yang tumbuh menutupi sinar matahari bisa diam-diam memangkas produksi listrik Anda bulan demi bulan. Panduan ini merangkum checklist perawatan rutin yang bisa Anda jalankan sendiri, plus tanda-tanda kapan urusannya harus diserahkan ke teknisi.",
    },
    { type: "h2", text: "Mengapa Perawatan Rutin Itu Penting" },
    {
      type: "p",
      text: "Panel surya didesain bertahan puluhan tahun — garansi performa panel berkualitas mencapai 25 tahun. Tetapi garansi itu mengasumsikan panel dirawat secara wajar. Di lingkungan tropis seperti Jambi, hujan sebenarnya membantu mencuci permukaan panel, namun di musim kemarau debu, serbuk, dan kotoran burung bisa menumpuk dan menghalangi sinar matahari sampai ke sel. Perawatan rutin juga berfungsi sebagai deteksi dini: koneksi yang mulai longgar atau inverter yang mulai bermasalah jauh lebih murah ditangani sebelum berkembang menjadi kerusakan serius.",
    },
    { type: "h2", text: "Checklist Mingguan: Pantau lewat Aplikasi Monitoring" },
    {
      type: "p",
      text: "Perawatan termudah justru yang paling sering dilewatkan: membuka aplikasi monitoring. Lima menit seminggu sudah cukup untuk memastikan semuanya normal.",
    },
    {
      type: "ul",
      items: [
        "Cek produksi harian — apakah angkanya masuk akal untuk cuaca hari itu (cerah, berawan, atau hujan).",
        "Cek notifikasi dan kode error pada inverter; catat jika ada yang berulang.",
        "Bandingkan produksi minggu ini dengan minggu sebelumnya dengan kondisi cuaca serupa.",
        "Pastikan perangkat monitoring tetap terhubung ke internet dan datanya ter-update.",
      ],
    },
    { type: "h2", text: "Checklist Bulanan: Inspeksi Visual Sederhana" },
    {
      type: "p",
      text: "Sekali sebulan, lakukan pemeriksaan visual dari tanah atau titik yang aman — Anda tidak perlu naik ke atap untuk ini.",
    },
    {
      type: "ul",
      items: [
        "Lihat permukaan panel dari kejauhan: apakah ada lapisan debu tebal, daun kering, atau bekas kotoran burung yang menempel?",
        "Perhatikan adakah bayangan baru pada jam-jam penyinaran puncak — pohon yang tumbuh, kain jemuran, atau konstruksi baru di sekitar.",
        "Periksa kabel yang terlihat: tidak ada yang menggantung, terkelupas, atau digerogoti hewan.",
        "Pastikan area di sekitar inverter bersih, tidak tertutup barang, dan ventilasinya tidak terhalang.",
      ],
    },
    { type: "h2", text: "Cara Membersihkan Panel Surya dengan Benar" },
    {
      type: "p",
      text: "Frekuensi pembersihan bergantung kondisi lingkungan. Di area terbuka dengan hujan rutin, dua hingga empat kali setahun biasanya cukup. Dekat jalan berdebu, lahan pertanian, atau banyak burung, frekuensinya bisa lebih sering. Ikuti langkah berikut saat membersihkan.",
    },
    {
      type: "ol",
      items: [
        "Jadwalkan pembersihan di pagi atau sore hari, ketika panel masih dingin. Menyiram panel panas dengan air bisa merusak kaca karena perubahan suhu mendadak.",
        "Ikuti prosedur pemadaman sesuai panduan sistem — atau jika Anda tidak yakin, serahkan pembersihan ke teknisi.",
        "Bilas seluruh permukaan panel dengan air bersih mengalir untuk meluruhkan debu dan kotoran lepas.",
        "Gunakan sikat lembut bertangkai panjang atau kain microfiber dengan air sabun netral untuk kotoran yang menempel. Jangan menggosok keras.",
        "Bilas kembali hingga tidak ada sisa sabun, lalu biarkan mengering atau lap dengan kain lembut.",
        "Periksa hasil akhirnya secara visual: permukaan kaca bersih, tidak ada goresan, dan frame tidak tergeser.",
      ],
    },
    {
      type: "note",
      title: "Yang tidak boleh dilakukan",
      text: "Jangan memakai high pressure washer — tekanannya bisa merusak lapisan kaca dan sealant panel. Jangan memakai deterjen keras, cairan pemutih, atau bahan abrasif. Jangan berdiri atau berjalan di atas panel. Dan paling penting: jika atap Anda curam, tinggi, atau licin setelah hujan, jangan memaksakan membersihkan sendiri — jatuh dari atap jauh lebih mahal daripada biaya teknisi.",
    },
    { type: "h2", text: "Perawatan Enam Bulanan hingga Tahunan" },
    {
      type: "p",
      text: "Selain pembersihan, ada pemeriksaan teknis yang sebaiknya dilakukan berkala. Sebagian bisa Anda lakukan sendiri dari titik aman; sisanya lebih baik dikerjakan teknisi yang terbiasa bekerja di ketinggian dan memahami kelistrikan DC.",
    },
    {
      type: "ul",
      items: [
        "Periksa kekencangan rangka mounting dan baut — getaran angin dan hujan deras bisa membuatnya longgar perlahan.",
        "Periksa konektor MC4 dan seluruh jalur kabel DC/AC: tidak terkelupas, tidak terendam genangan, tidak terpapar langsung matahari berlebih.",
        "Pangkas dahan pohon yang mulai menutupi arah matahari ke panel, terutama di sisi timur dan barat.",
        "Bersihkan debu pada kisi ventilasi inverter dan pastikan sirkulasi udaranya lancar.",
        "Cek kesehatan baterai dari aplikasi: kapasitas, tegangan antar sel, dan riwayat siklus masih dalam rentang normal.",
      ],
    },
    {
      type: "table",
      caption: "Ringkasan jadwal perawatan PLTS.",
      headers: ["Frekuensi", "Aktivitas", "Pelaku"],
      rows: [
        ["Mingguan", "Cek produksi dan notifikasi lewat aplikasi monitoring", "Pemilik"],
        ["Bulanan", "Inspeksi visual panel, kabel, dan area inverter", "Pemilik"],
        ["Bulanan / sesuai kondisi", "Pembersihan panel bila debu atau kotoran menumpuk", "Pemilik / teknisi"],
        ["Setiap 6 bulan", "Pemeriksaan mounting, konektor, kabel, dan trimming pohon", "Teknisi"],
        ["Tahunan", "Inspeksi menyeluruh sistem dan evaluasi performa tahunan", "Teknisi"],
      ],
    },
    { type: "h2", text: "Tanda Sistem Perlu Ditangani Profesional" },
    {
      type: "ul",
      items: [
        "Produksi turun secara konsisten selama lebih dari satu minggu padahal cuaca cerah.",
        "Kode error yang sama muncul berulang kali di inverter.",
        "Panel terlihat retak, berubah warna, atau ada bercak terbakar (hotspot).",
        "Backup baterai malam terasa semakin pendek meski beban tidak bertambah.",
        "Inverter berbunyi dengung atau kipas berisik tidak seperti biasanya.",
      ],
    },
    {
      type: "cta",
      text: "Tidak punya waktu menaiki atap atau ingin memastikan sistem dicek oleh yang berpengalaman? Layanan maintenance PLTS kami menangani pembersihan hingga inspeksi menyeluruh.",
      href: "/maintenance",
      label: "Layanan Maintenance PLTS",
    },
    {
      type: "p",
      text: "Perawatan PLTS sebenarnya sederhana: pantau grafiknya mingguan, lihat fisiknya bulanan, bersihkan sesuai kebutuhan, dan panggil teknisi untuk pemeriksaan berkala. Dengan rutinitas ringan itu, sistem Anda akan bekerja mendekati performa penuh selama puluhan tahun — sesuai standar yang dijanjikan garansi panel dan inverternya.",
    },
    {
      type: "links",
      intro: "Bacaan terkait:",
      items: [
        {
          label: "Penyebab Produksi PLTS Turun dan Cara Mengatasinya",
          href: "/artikel/penyebab-produksi-plts-turun",
          desc: "Diagnosis enam penyebab umum penurunan produksi.",
        },
        {
          label: "Berapa Produksi Listrik 1 kWp Panel Surya per Hari?",
          href: "/artikel/berapa-produksi-1-kwp-panel-surya",
          desc: "Acuan produksi normal agar penyimpangan mudah terdeteksi.",
        },
        {
          label: "Smart Monitoring IoT",
          href: "/smart-iot",
          desc: "Pantau produksi dan anomali sistem dari ponsel.",
        },
      ],
    },
  ],
  relatedSlugs: [
    "penyebab-produksi-plts-turun",
    "berapa-produksi-1-kwp-panel-surya",
  ],
};
