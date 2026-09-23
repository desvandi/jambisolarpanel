/**
 * Proses instalasi PLTS — single source of truth.
 *
 * ATURAN DATA: Setiap langkah hanya mendeskripsikan proses kerja yang
 * tercermin dari konten situs yang sudah ada (survei gratis, desain custom,
 * garansi resmi, monitoring Smart IoT, layanan maintenance). Tidak ada
 * klaim angka baru yang tidak bersumber.
 *
 * Dipakai oleh: ProcessTimeline (UI) + howToJsonLd (structured data).
 */

export interface ProcessStep {
  /** Judul langkah. */
  name: string;
  /** Deskripsi lengkap — juga dipakai sebagai HowToStep text. */
  text: string;
  /** Ringkasan singkat untuk kartu timeline. */
  short: string;
  /** Estimasi durasi (chip kecil di kartu). */
  duration: string;
  /** Nama ikon lucide — di-map di ProcessTimeline. */
  icon: "search" | "drafting" | "calendar" | "wrench" | "check" | "monitor";
}

export const installationSteps: ProcessStep[] = [
  {
    name: "Survei & Audit Energi (Gratis)",
    text: "Tim teknisi mendatangi lokasi Anda untuk memeriksa kondisi atap, arah & iradiasi matahari, potensi shading, serta profil beban listrik. Hasil survei menjadi dasar perhitungan kapasitas sistem yang dibutuhkan.",
    short:
      "Tim teknisi mendatangi lokasi, memeriksa atap, iradiasi matahari, dan profil beban listrik Anda.",
    duration: "1 kunjungan",
    icon: "search",
  },
  {
    name: "Desain Sistem & Proposal",
    text: "Kami menyusun desain sistem PLTS (kapasitas panel, inverter, dan baterai bila diperlukan), estimasi produksi energi, serta rincian biaya yang transparan — tanpa biaya tersembunyi.",
    short:
      "Desain sistem, estimasi produksi energi, dan rincian biaya transparan disusun sesuai hasil survei.",
    duration: "1–3 hari",
    icon: "drafting",
  },
  {
    name: "Persetujuan & Penjadwalan",
    text: "Penawaran disepakati, kontrak diteken, dan jadwal instalasi ditentukan sesuai kesepakatan bersama — fleksibel mengikuti operasional rumah atau bisnis Anda.",
    short:
      "Penawaran disepakati, kontrak diteken, jadwal instalasi ditentukan sesuai kesepakatan.",
    duration: "Fleksibel",
    icon: "calendar",
  },
  {
    name: "Instalasi & Pemasangan",
    text: "Tim instalasi memasang struktur mounting, panel surya, inverter, baterai (untuk sistem hybrid/off-grid), wiring, dan panel distribusi — dikerjakan rapi dengan pengaman sesuai standar.",
    short:
      "Pemasangan struktur, panel surya, inverter, baterai, dan wiring oleh tim berpengalaman.",
    duration: "1–3 hari (rumah)",
    icon: "wrench",
  },
  {
    name: "Commissioning & Pelatihan",
    text: "Seluruh sistem diuji: produksi energi, fungsi proteksi, dan pembacaan monitoring. Anda juga dilatih cara pengoperasian sehari-hari dan pemeliharaan dasar sistem.",
    short:
      "Pengujian seluruh sistem dan pelatihan pengoperasian sehari-hari untuk Anda.",
    duration: "1 hari",
    icon: "check",
  },
  {
    name: "Monitoring & Dukungan Berkelanjutan",
    text: "Sistem dapat dimonitor melalui aplikasi (fitur Smart Monitoring). Anda mendapatkan garansi resmi tertulis serta dukungan servis — tersedia juga layanan maintenance berkala.",
    short:
      "Monitoring via aplikasi, garansi resmi tertulis, dan dukungan servis berkelanjutan.",
    duration: "Berkelanjutan",
    icon: "monitor",
  },
];
