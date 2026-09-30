# PANDUAN SEO UNTUK OWNER — jambisolarpanel.vercel.app

> **Versi 2.0** · Restrukturisasi total berdasarkan fase bulanan · Mencakup 15 area gap
> yang tidak ada di versi 1.0 (GA4, Bing, WhatsApp Business, kalender konten, multi-kota,
> PR & template, kompetitor, brand konsistensi, legal UU PDP, tracking konversi, krisis
> reputasi, aset sales, monitoring teknis, advanced SEO, sosial media per platform).
>
> **Target:** Halaman 1 posisi atas Google untuk pencarian lokal — "solar panel Jambi",
> "pasang panel surya Jambi", "harga panel surya Jambi", "PLTS Jambi", "sewa PLTS Jambi",
> "solar pump Jambi", "PJUTS Jambi", "EV charger Jambi" — serta area layanan lainnya
> (Muaro Jambi, Batanghari, Sarolangun, Tebo, Riau, Palembang).
>
> Dokumen ini berisi **pekerjaan yang HANYA BISA dilakukan owner** (pemilik usaha).
> Sisi website/teknis sudah selesai dan lolos audit 8 putaran — tugas owner sekarang
> adalah membuat Google menampilkan situs ini kepada pencari di Jambi dan sekitarnya.

**Dibuat:** 2026-09-30 (restrukturisasi dari v1.0 2026-09-24) · **Basis data:** hasil audit
internal Round 1–8 + analisis 15 area gap · **Bertanggung jawab teknis:** developer (Z.ai)

**Brand resmi:** `Jambi Solar Panel` (nama brand / trading name) — digunakan di Google
Business Profile, media sosial, brosur, dan semua listing eksternal. **Legal entity:**
`PT. Jaya Mandiri Smart Energy` — digunakan di dokumen tender, kontrak, dan halaman
tentang-kami. Website title tag menggabungkan keduanya untuk konteks SEO.

---

# BAGIAN A — FONDASI & KONTEKS

## 0. RINGKASAN EKSEKUTIF (baca ini dulu — 5 menit)

### 0.1 Kondisi Website Sekarang

Fondasi teknis SEO **sudah 100% selesai** — 33 halaman terindex-ready (sitemap.xml
otomatis dengan lastmod disiplin, canonical tunggal ke
`https://jambisolarpanel.vercel.app`, structured data JSON-LD LocalBusiness + FAQ +
BreadcrumbList + Article, mobile-friendly, Core Web Vitals siap, konten jujur & teraudit
8 putaran, kalkulator interaktif, 13 artikel, 3 studi kasus, FAQ, glossary). Yang belum
terjadi hanyalah: **Google belum diajak mengenal situs ini.**

### 0.2 Analogi untuk Owner

Website ini seperti toko yang sudah rapi, pajangan lengkap, papan nama bagus — tapi
belum terdaftar di Google Maps dan belum pernah dikabari ke orang. Panduan ini adalah
cara "mendaftarkan toko" dan "membangun reputasi" agar Google percaya untuk menempatkan
toko ini di baris depan hasil pencarian ketika seseorang di Jambi mencari "pasang panel
surya" atau "harga PLTS".

### 0.3 Tiga Kunci Sukses Terbesar (urutan kepentingan)

| # | Kunci | Porsi pengaruh | Siapa yang kerjakan |
|---|-------|----------------|---------------------|
| 1 | **Google Business Profile (GBP) + ulasan asli** | ★★★★★ — penentu #1 untuk pencarian lokal | **OWNER** |
| 2 | **Indexing via Search Console (GSC)** + GA4 tracking | ★★★★★ — tanpa ini semua sia-sia | **OWNER** (30 menit setup) |
| 3 | **Bukti proyek nyata** (foto, data, testimoni, video) | ★★★★ — kepercayaan Google & calon pembeli | **OWNER** |

Tiga kunci tambahan yang sering diabaikan tapi berdampak besar di bulan 3–12:
**WhatsApp Business conversion path**, **brand konsistensi N-A-P**, dan **backlink lokal
dari media/kemitraan**. Ketiganya dibahas detail di Bagian C–E.

### 0.4 Timeline Realistis (Bukan Janji — Patokan Arah)

SEO bukan hasil instan. Untuk niche lokal kompetisi rendah–menengah seperti Jambi:

| Periode | Yang terjadi (indikatif, bukan jaminan) |
|---------|-----------------------------------------|
| **Minggu 1–2** | Setup semua properti Google (GSC, GA4, GBP, Bing). Mulai request indexing. |
| **Bulan 1** | Terindeks penuh (33/33 URL). GA4 mulai catat traffic. GBP live. 3 ulasan pertama. |
| **Bulan 2–3** | Mulai muncul halaman 2–3 untuk kata kunci utama. Local Pack mulai muncul. 10 ulasan. |
| **Bulan 3–6** | Halaman 1 untuk kata kunci panjang (long-tail). Local Pack stabil. 20 ulasan. |
| **Bulan 6–12** | Berpotensi posisi atas untuk kata kunci utama — **jika** ulasan, bukti proyek, dan konten rutin dijalankan konsisten. |

> ⚠️ **Kejujuran penting:** Tidak ada jasa SEO yang bisa menjamin posisi #1 dalam sebulan.
> Jika ada yang menjanjikan itu, mereka kemungkinan pakai taktik black-hat yang akan
> berakhir penalti Google. Konsistensi 6–12 bulan lebih berharga dari "kilat" 1 bulan.

---

## 1. YANG SUDAH SELESAI DI SISI WEBSITE (tidak perlu dikerjakan owner)

Fondasi teknis berikut sudah dibangun developer dan lolos audit 8 putaran. Owner cukup
tahu ini ada, tidak perlu mengutak-atik:

✅ **33 URL siap index** — 9 halaman layanan (solar-home, solar-commercial, pjuts,
solar-pump, ev-charging, smart-iot, maintenance, tender-procurement, sewa-plts),
homepage, tentang-kami, proyek, 3 studi kasus, harga, 13 artikel, FAQ, kalkulator,
istilah PLTS.

✅ **Sitemap.xml otomatis** (dengan lastmod disiplin per halaman) + robots.txt yang
benar (Allow: /, Disallow: /api/, Sitemap: ...).

✅ **Canonical tunggal** ke `https://jambisolarpanel.vercel.app` (keputusan final —
jangan pernah diubah ke domain lain tanpa prosedur migrasi 301 + GSC Change of Address).

✅ **Structured data JSON-LD**: LocalBusiness (dengan N-A-P lengkap, jam buka,
areaServed: Jambi, Riau, dll), FAQ, BreadcrumbList, Article. Sudah divalidasi Rich
Results Test.

✅ **Konten jujur & teraudit** — semua angka simulasi berlabel "simulasi", model
finansial reproducible dari `methodology.ts` terpusat, tidak ada klaim palsu.

✅ **Mobile-friendly & cepat** (Core Web Vitals siap — LCP, CLS, INP dalam threshold).

✅ **Halaman harga & kalkulator interaktif** — aset terkuat karena mayoritas pencari
lokal mencari HARGA sebelum menghubungi.

✅ **Dashboard admin terlindungi** (Basic Auth di `/kalibrasi-harga`).

✅ **Google Analytics 4 sudah terpasang** (measurement ID `G-5TLRNLS0KK`) — tapi owner
**belum punya akses**. Lihat Tahap 1 bagaimana mendapatkannya.

✅ **Cross-linking internal** antar halaman layanan, artikel, dan studi kasus sudah
dibangun developer untuk membantu Google memahami struktur situs.

---

## 2. PEMAHAMAN SEO LOKAL 101 (untuk owner awam)

Bagian ini menjelaskan konsep dasar agar owner paham **kenapa** setiap tugas penting,
bukan sekadar **apa** yang harus dikerjakan. Lewati jika sudah paham.

### 2.1 Bagaimana Google Menentukan Ranking untuk Pencarian Lokal

Ketika seseorang di Jambi mencari "pasang panel surya Jambi", Google mempertimbangkan
tiga faktor utama (sering disebut "Local SEO Triad"):

1. **Relevance (Relevansi)** — Apakah halaman web dan profil bisnis cocok dengan yang
   dicari? Ini dijawab oleh konten website (sudah selesai) + kategori & deskripsi GBP
   + ulasan yang menyebut kata kunci.

2. **Distance (Jarak)** — Seberapa dekat bisnis dengan pencari atau lokasi yang
   disebut? Ini dijawab oleh alamat di GBP + area layanan yang dideklarasikan. Karena
   owner melayani seluruh Jambi + Sumatera, area layanan harus diisi strategis.

3. **Prominence (Keprominenan)** — Seberapa terkenal & terpercaya bisnisnya? Ini
   dijawab oleh jumlah & kualitas ulasan Google, backlink dari situs lain, keberadaan
   di direktori bisnis, dan konsistensi nama-alamat-telepon (N-A-P) di seluruh web.

Local Pack (3 bisnis di peta paling atas hasil pencarian) muncul **di atas** hasil
organik biasa. Masuk 3 besar Local Pack = jalan tercepat ke "halaman 1 urutan atas".

### 2.2 Konsep E-E-A-T (yang dinilai Google tentang bisnis Anda)

Google menilai setiap halaman web berdasarkan **E-E-A-T**:

- **Experience (Pengalaman)** — Apakah pembuat konten punya pengalaman langsung?
  Untuk installer PLTS, ini dibuktikan dengan foto proyek nyata, bukan foto stok.
- **Expertise (Keahlian)** — Apakah penulis ahli? Dibuktikan dengan sertifikat, artikel
  teknis mendalam, dan jawaban FAQ yang akurat.
- **Authoritativeness (Otoritas)** — Apakah bisnis diakui pihak lain? Dibuktikan dengan
  backlink dari media, keanggotaan asosiasi, dan profil GBP lengkap.
- **Trust (Kepercayaan)** — Apakah bisnis bisa dipercaya? Dibuktikan dengan ulasan
  asli, transparansi harga, kebijakan privasi, dan kontak yang jelas.

Panduan ini dirancang agar owner bisa membangun semua sisi E-E-A-T secara konsisten.

### 2.3 Istilah Teknis yang Akan Sering Muncul

| Istilah | Arti singkat |
|---------|--------------|
| **Index / Indexing** | Google menyimpan halaman web ke database-nya agar bisa ditampilkan di hasil pencarian. |
| **Crawl** | Googlebot (robot Google) mengunjungi halaman untuk dibaca. |
| **Sitemap.xml** | Daftar semua URL situs untuk memberi tahu Google halaman apa yang ada. |
| **Canonical** | Tag yang memberi tahu Google "ini URL resmi, jangan pakai yang lain". |
| **Structured data / Schema** | Kode terstruktur yang membantu Google memahami konten (mis. ini bisnis lokal, ini FAQ). |
| **Local Pack** | Kotak peta + 3 bisnis teratas yang muncul di paling atas pencarian lokal. |
| **N-A-P** | Name, Address, Phone — harus identik di semua platform (website, GBP, direktori). |
| **Backlink** | Link dari website lain ke website kita = "suara rekomendasi". |
| **Long-tail keyword** | Kata kunci panjang & spesifik (mis. "harga panel surya 5kwp untuk rumah di Jambi") — lebih mudah ranking. |
| **UTM parameter** | Tambahan di URL untuk tracking sumber traffic di GA4 (mis. `?utm_source=whatsapp`). |
| **Core Web Vitals** | Metrik kecepatan & UX: LCP (loading), CLS (stabilitas visual), INP (responsivitas). |
| **Rich Results / Rich Snippet** | Tampilan kaya di Google (bintang ulasan, FAQ accordion, breadcrumb). |

---

## 3. BRAND KONSISTENSI — Jambi Solar Panel vs Jaya Mandiri Smart Energy

### 3.1 Kenapa Ini Penting

Google membandingkan nama bisnis di seluruh web. Jika di website tertulis "Jambi Solar
Panel", di GBP tertulis "Jaya Mandiri Smart Energy", di Facebook tertulis "JM Solar" —
Google bingung dan bisa menurunkan ranking karena sinyal inkonsistensi. Konsistensi
N-A-P (Name-Address-Phone) adalah salah satu sinyal ranking lokal terkuat.

### 3.2 Kebijakan Brand Resmi (putusan final, terapkan di semua platform)

| Aspek | Nilai resmi | Digunakan di |
|-------|--------------|--------------|
| **Nama brand (trading name)** | `Jambi Solar Panel` | GBP, Facebook Page, Instagram, TikTok, YouTube, LinkedIn, brosur, name tag tim, signage toko |
| **Nama legal (entity)** | `PT. Jaya Mandiri Smart Energy` | Dokumen tender, kontrak, invoice, halaman tentang-kami (bagian legal), profil LinkedIn perusahaan |
| **Title tag website** | "Jasa Pasang Panel Surya & PLTS Jambi \| Jaya Mandiri Smart Energy" | Sudah diset developer — jangan diubah |
| **Domain** | `jambisolarpanel.vercel.app` (sekarang) → `jambisolarpanel.com` (target) | **TIDAK dipakai:** `jayamandiri.co.id` |
| **Telepon** | `+62 813-2819-0707` (format internasional: `+6281328190707`) | Semua platform |
| **Alamat** | `Tangkit Baru Residence Blok D15, Jl. H. Saing, RT.001/RW.001, Desa Tangkit Baru, Kec. Sungai Gelam, Kab. Muaro Jambi, Jambi 36373` | Semua platform |
| **Jam buka** | Senin–Sabtu 08:00–17:00, Minggu tutup | Semua platform |
| **Logo** | `logo-jmse.png` (sudah di website) | Pakai versi yang sama di mana-mana |

### 3.3 Catatan Penting tentang Domain Lama `jayamandiri.co.id`

Jika domain ini masih aktif atau pernah dipakai, **jangan** dipakai untuk listing baru.
Semua listing eksternal (GBP, direktori, media sosial) harus pakai
`https://jambisolarpanel.vercel.app` (atau domain custom setelah dibeli di Tahap 1).
Jika nanti ada traffic ke `jayamandiri.co.id`, minta developer setup redirect 301 ke
domain resmi agar tidak ada traffic terbuang.

### 3.4 Audit Konsistensi N-A-P (lakukan di Tahap 1)

Setelah semua listing dibuat, lakukan audit konsistensi:

- [ ] Nama bisnis persis sama di: Website JSON-LD · GBP · Facebook · Instagram · TikTok
      · YouTube · LinkedIn · semua direktori lokal.
- [ ] Alamat persis sama (sampai RT/RW dan kode pos) di semua platform.
- [ ] Nomor telepon format internasional (`+6281328190707`) di semua platform.
- [ ] Jam buka identik di GBP, website footer, dan semua listing.
- [ ] URL website sama di semua listing.
- [ ] Logo dan warna brand konsisten di semua profil.

Jika ada inkonsistensi, perbaiki segera — setiap perbaikan = sinyal kepercayaan ke Google.

---

# BAGIAN B — FASE 1: MINGGU 1-2 (SETUP DASAR, ±3 JAM TOTAL)

> **Tujuan fase ini:** Google tahu situs ini ada, mulai meng-crawl, dan owner punya
> semua alat untuk memantau + menerima lead. Setelah fase ini selesai, mesin SEO
> mulai berjalan.

## 4. GOOGLE SEARCH CONSOLE (GSC) — WAJIB, ±30 MENIT

Google Search Console = alat resmi Google untuk memantau & meminta index. **Tanpa ini,
website bisa berminggu-minggu bahkan berbulan-bulan tidak terindeks.**

### 4.1 Setup dari Nol (owner belum punya akun GSC)

1. **Buka** https://search.google.com/search-console → klik "Mulai sekarang" → login
   dengan **akun Google bisnis** (usahakan akun yang dipakai jangka panjang, bukan akun
   pribadi yang bisa hilang). Rekomendasi: `admin@jambisolarpanel.com` atau akun yang
   sudah dipakai untuk email bisnis.

2. Klik **"Tambahkan properti" (Add a property)** → pilih **"Prefiks URL" (URL prefix)**
   → ketik persis: `https://jambisolarpanel.vercel.app`

3. Pilih metode verifikasi **"Tag HTML" (HTML tag)** → Google menampilkan kode seperti:
   ```html
   <meta name="google-site-verification" content="KODE_UNIK_DISINI" />
   ```

4. **Salin kode `KODE_UNIK` tersebut → kirim via WhatsApp ke developer** → developer
   memasangkannya ke website dalam hitungan menit → klik **"Verifikasi" (Verify)** di
   GSC. *(Alternatif tanpa kirim-kirim: pilih verifikasi via Google Analytics jika GA4
   sudah terverifikasi — lihat Tahap 6.)*

5. Setelah terverifikasi, **kirim email undangan akses** ke developer: Settings → Users
   and permissions → Add user → masukkan email developer → role **"Full"** agar
   developer bisa membantu memantau & request index.

### 4.2 Submit Sitemap

Menu **Sitemaps** → isi `sitemap.xml` → **Submit**. Status akan berubah dari "Pending"
menjadi "Success" dalam beberapa hari, dengan **33 URL ditemukan**. Jika setelah 1
minggu masih "Couldn't fetch" → kabari developer.

### 4.3 Request Indexing Manual (3–4 hari berturut, ±10 URL/hari)

Google membatasi request indexing ±10 URL/hari. Lakukan bertahap. Menu **URL
Inspection** → tempel URL lengkap → **Test Live URL** → tunggu "URL is available to
Google" → **Request Indexing**. Urutan prioritas (kata kunci komersial dulu):

| Hari | URL yang dimintakan index |
|------|---------------------------|
| **1** | `/` · `/solar-home` · `/solar-commercial` · `/harga-panel-surya-jambi` · `/proyek` · `/sewa-plts` · `/kalkulator-plts` · `/tentang-kami` · `/faq` · `/artikel` |
| **2** | `/ev-charging` · `/solar-pump` · `/pjuts` · `/smart-iot` · `/maintenance` · `/tender-procurement` · `/istilah-plts` · `/studi-kasus/villa-jambi-5-kwp-hybrid` · `/studi-kasus/kebun-sawit-riau-10-kwp-off-grid` · `/studi-kasus/gudang-palembang-50-kwp-hybrid` |
| **3** | `/artikel/harga-panel-surya-jambi-faktor-biaya` · `/artikel/biaya-pasang-plts-rumah-jambi` · `/artikel/berapa-kwp-panel-surya-untuk-rumah` · `/artikel/plts-hybrid-vs-off-grid` · `/artikel/potensi-energi-surya-jambi` · `/artikel/plts-untuk-kebun-sawit` · `/artikel/solar-pump-untuk-perkebunan` · `/artikel/pjuts-untuk-jalan-desa-dan-perkebunan` · `/artikel/cara-menentukan-kapasitas-plts` · `/artikel/cara-menghitung-kebutuhan-baterai` |
| **4** | `/artikel/berapa-produksi-1-kwp-panel-surya` · `/artikel/cara-merawat-panel-surya` · `/artikel/penyebab-produksi-plts-turun` |

### 4.4 Validasi Structured Data (sekali saja, 10 menit)

Buka https://search.google.com/test/rich-results → tempel URL berikut satu per satu →
pastikan tidak ada error → screenshot simpan sebagai bukti audit:

- `https://jambisolarpanel.vercel.app/` (LocalBusiness)
- `https://jambisolarpanel.vercel.app/faq` (FAQPage)
- `https://jambisolarpanel.vercel.app/harga-panel-surya-jambi` (BreadcrumbList)
- `https://jambisolarpanel.vercel.app/artikel/plts-hybrid-vs-off-grid` (Article)

Jika ada error → screenshot → kirim ke developer untuk diperbaiki.

### 4.5 Rutinitas Mingguan GSC (5 menit/minggu, mulai minggu ke-2)

- **Indexing → Pages**: pastikan "Indexed" naik menuju 33/33. Periksa tab "Not indexed"
  untuk URL yang gagal → jika valid tapi >2 minggu tidak terindeks → kabari developer.
- **Performance**: catat impresi & posisi rata-rata (laporkan ke developer bulanan).
- **Security & Manual Actions**: pastikan tidak ada penalti.
- **Coverage**: cek apakah ada error crawl atau 404 baru.

---

## 5. BING WEBMASTER TOOLS (±15 MENIT, SEKALI SAJA)

Bing (Microsoft) punya ~5–10% pangsa pencarian di Indonesia, lebih tinggi di pengguna
Windows & Edge. Verifikasi cepat dan free backlink dari domain otoritas tinggi.

### 5.1 Setup

1. Buka https://www.bing.com/webmasters → login dengan **akun Google yang sama** dengan
   GSC (Bing accept login Google) atau akun Microsoft.
2. Klik **"Add site"** → ketik `https://jambisolarpanel.vercel.app`.
3. Pilih **"Import from Google Search Console"** (paling cepat) — Bing akan otomatis
   copy verifikasi & sitemap dari GSC. Jika opsi tidak muncul, pakai verifikasi tag HTML
   (kode berbeda dari GSC — minta developer pasang).
4. Submit sitemap: ketik `sitemap.xml` → **Submit**.

### 5.2 Kenapa Bing Penting untuk Bisnis B2B/Tender

- Banyak komputer korporat & pemerintah pakai Windows + Edge + Bing default.
- Bing-powered search juga dipakai di Cortana, Yahoo, dan DuckDuckGo (sebagian).
- Untuk tender/PEMDA yang browsing dari kantor, Bing sering jadi search engine default.

### 5.3 Rutinitas Bulanan Bing (5 menit/bulan)

- Cek **SEO Reports** → apakah ada issue baru (missing meta, broken link).
- Cek **Backlinks** → berapa backlink baru ditemukan Bing.

---

## 6. GOOGLE ANALYTICS 4 (GA4) — AKSES & KONVERSI, ±20 MENIT

Website sudah terpasang GA4 dengan measurement ID `G-5TLRNLS0KK`, tapi owner belum tentu
punya akses. GA4 penting untuk tahu: dari mana pengunjung datang, halaman apa yang
paling banyak dilihat, dan berapa yang akhirnya klik WhatsApp/telepon.

### 6.1 Dapatkan Akses GA4

1. **Tanya developer** apakah properti GA4 `G-5TLRNLS0KK` sudah ada owner-nya. Jika
   belum, minta developer invite email bisnis owner sebagai **"Admin"** (role tertinggi).
2. Setelah dapat email undangan dari Google Analytics → klik link → accept.
3. Login di https://analytics.google.com → pastikan properti "Jambi Solar Panel"
   muncul di dropdown.

### 6.2 Setup Konversi (Event Penting yang Harus Dilacak)

GA4 mencatat "event" — aksi pengunjung. Yang penting untuk bisnis instalasi PLTS:

| Event | Arti | Cara setup |
|-------|------|------------|
| `click_to_whatsapp` | Pengunjung klik tombol WhatsApp | Developer setup via GTM atau GA4 native |
| `click_to_call` | Pengunjung klik nomor telepon | Developer setup |
| `form_submit_survei` | Form survei gratis dikirim | Developer setup |
| `calculator_used` | Pengunjung pakai kalkulator PLTS | Developer setup |
| `scroll_depth_50` | Pengunjung baca setengah halaman | Otomatis GA4 |
| `file_download` | Brosur/PDF di-download | Otomatis GA4 |

**Tindakan owner:** kirim list event di atas ke developer, minta setup + tandai sebagai
**"Conversion"** di GA4 (Admin → Events → tandai "Mark as conversion"). Setelah ini,
owner bisa lihat berapa konversi per minggu di dashboard GA4.

### 6.3 UTM Parameter untuk Tracking Kampanye

Saat share link website di WhatsApp, Instagram, brosur, atau iklan — tambahkan UTM
agar GA4 tahu sumbernya. Format:

```
https://jambisolarpanel.vercel.app/?utm_source=whatsapp&utm_medium=chat&utm_campaign=survei_gratis
https://jambisolarpanel.vercel.app/harga-panel-surya-jambi?utm_source=instagram&utm_medium=bio&utm_campaign=harga_q4
https://jambisolarpanel.vercel.app/kalkulator-plts?utm_source=brosur&utm_medium=print&utm_campaign=offline_event
```

Gunakan [Google UTM Builder](https://ga-dev-tools.google/ga4/campaign-url-builder/)
resmi untuk generate. Konsisten dengan penamaan `utm_source` (lowercase, no space):
`whatsapp`, `instagram`, `facebook`, `brosur`, `tender`, `referral`.

### 6.4 Rutinitas Mingguan GA4 (5 menit/minggu)

- Buka **Reports → Acquisition → User acquisition**: dari mana pengunjung datang?
  (Organic Search, Direct, Social, Referral).
- Buka **Reports → Engagement → Pages and screens**: halaman mana paling populer?
- Buka **Reports → Conversions**: berapa konversi (klik WA, form survei) minggu ini?

---

## 7. GOOGLE BUSINESS PROFILE (GBP) — PALING KRITIS, ±45 MENIT

> Pencarian "… di Jambi" menampilkan **Local Pack** (peta + 3 bisnis teratas) di posisi
> paling atas hasil pencarian — **DI ATAS** hasil organik biasa. Masuk 3 besar local
> pack = jalan tercepat ke "halaman 1 urutan atas".

### 7.1 Setup dari Nol (owner belum punya GBP)

1. **Buat profil:** https://www.google.com/business → "Kelola sekarang" → login akun
   Google bisnis yang sama dengan GSC.
2. **Isi data PERSIS sama dengan website** (Google mencocokkan N-A-P):

   | Field | Isi (WAJIB identik dengan website) |
   |-------|-------------------------------------|
   | Nama bisnis | **Jambi Solar Panel** (nama brand resmi — lihat Tahap 3) |
   | Kategori utama | **Kontraktor Energi Surya / Solar Energy Contractor** |
   | Kategori tambahan | Pemasok Peralatan Energi Surya · Layanan Listrik · Stasiun Pengisian Kendaraan Listrik · Kontraktor Listrik |
   | Alamat | Tangkit Baru Residence Blok D15, Jl. H. Saing, RT.001/RW.001, Desa Tangkit Baru, Kec. Sungai Gelam, Kab. Muaro Jambi, Jambi 36373 |
   | Telepon | +62 813-2819-0707 (sama persis, format internasional `+6281328190707`) |
   | Jam buka | Senin–Sabtu, 08:00–17:00 (Minggu tutup — samakan dengan footer website) |
   | Website | https://jambisolarpanel.vercel.app |
   | Area layanan | Jambi (utama), lalu: Muaro Jambi, Batanghari, Sarolangun, Tebo, Merangin, Riau, Palembang — hanya area yang benar-benar dilayani |

3. **Verifikasi alamat** (biasanya kartu pos dari Google ke alamat kantor, 1–2 minggu;
   atau verifikasi video jika opsi tersedia). Lakukan SEGERA — profil tak terverifikasi
   tidak tampil di pencarian. Sambil menunggu kartu pos, lengkapi semua data lain.

### 7.2 Lengkapi Profil (setelah verifikasi diterima, lanjutkan ini)

4. **Unggah minimal 10–15 foto asli:** kantor/toko, tim kerja (pakai APD), instalasi
   atap, panel & inverter, hasil pemasangan. Foto asli >> foto stok. Tambah 2–4 foto
   baru setiap bulan. Lihat Tahap 13 untuk format foto dokumentasi proyek.

5. **Isi daftar layanan** (copy-paste dari website): PLTS Rumah (Solar Home) · PLTS
   Komersial & Industri · PJUTS (Penerangan Jalan) · Solar Pump · EV Charging · Smart
   IoT Monitoring · Maintenance · Sewa PLTS · Tender & Procurement — masing-masing
   dengan deskripsi singkat (1–2 kalimat, sebut kata kunci natural).

6. **Isi atribut & deskripsi profil** (±750 karakter): sebutkan natural kata kunci —
   contoh: "Jasa pasang panel surya & instalasi PLTS di Jambi dan sekitarnya. Melayani
   PLTS hybrid & off-grid untuk rumah, bisnis, kebun, dan infrastruktur. Solar pump
   untuk perkebunan, PJUTS untuk jalan desa, EV charging, smart monitoring. Survei
   & konsultasi gratis, garansi resmi."

7. **Aktifkan pesan/chat** (Business Profile → Messaging → enable) — calon pelanggan
   bisa chat langsung dari Google Search/Maps.

8. **Isi Q&A** (tanya-jawab sendiri sebagai pemilik usaha) dengan jawaban dari FAQ
   website — 5–10 pertanyaan umum:
   - "Berapa harga pasang panel surya untuk rumah di Jambi?"
   - "Apakah survei gratis?"
   - "Berapa lama pemasangan PLTS?"
   - "Apakah ada garansi?"
   - "Apakah melayani area di luar Jambi?"
   - "Jenis sistem apa yang cocok untuk kebun sawit?"
   - dst.

9. **Buat link review** (Home → "Minta ulasan" / Request reviews → salin link). Simpan
   link ini — akan dipakai di Tahap 12 untuk minta ulasan pelanggan.

10. **Setelah live → kirim URL profil GBP ke developer** agar ditautkan ke website
    (`sameAs` structured data — saat ini sengaja kosong menunggu profil resmi ini).
    Developer update JSON-LD `sameAs: [URL_GBP, URL_FB, URL_IG, ...]`.

### 7.3 Produk di GBP (Katalog Mini)

GBP mendukung tab "Products" — tambahkan 5–10 paket utama dengan harga dari halaman
`/harga-panel-surya-jambi`:

| Produk | Kategori | Harga |
|--------|----------|-------|
| PLTS Hybrid Rumah 3 kWp | Paket Rumah | Rp 45–60 juta |
| PLTS Hybrid Rumah 5 kWp | Paket Rumah | Rp 70–90 juta |
| PLTS Off-Grid Kebun 5 kWp | Paket Komersial | Rp 80–110 juta |
| Solar Pump 1 HP | Paket Pertanian | Rp 15–25 juta |
| PJUTS 60W per titik | Paket Infrastruktur | Rp 3–5 juta/titik |
| Sewa PLTS bulanan | Sewa | mulai Rp 875rb/bulan |
| EV Charger 7kW | EV | Rp 15–25 juta |
| Maintenance PLTS tahunan | Service | Rp 1–3 juta/tahun |

Gunakan rentang harga (bukan harga pasti) untuk mengelola ekspektasi. Sertakan foto
produk + link ke halaman layanan terkait.

### 7.4 Rutinitas GBP (15 menit/minggu)

- Posting update GBP 1×/minggu (proyek berjalan, tips hemat listrik, promo survei
  gratis, foto instalasi terbaru).
- Balas SEMUA ulasan (positif & negatif) dalam 1×24 jam — lihat Tahap 12 untuk template.
- Balas pertanyaan Q&A baru dalam 1×24 jam.
- Cek GBP Insights: berapa panggilan, klik website, rute, pencarian langsung.

---

## 8. WHATSAPP BUSINESS SETUP (±30 MENIT, SEKALI SAJA)

Nomor `+62 813-2819-0707` sudah dipakai untuk bisnis. Upgrade ke **WhatsApp Business**
( gratis, beda aplikasi dari WhatsApp pribadi) untuk dapat fitur katalog, auto-reply,
dan label.

### 8.1 Install & Setup

1. Download **WhatsApp Business** di Play Store / App Store (beda aplikasi dari WA pribadi).
2. Login dengan nomor `+62 813-2819-0707` — pilih "Bisnis" saat prompt.
3. Isi **Business Profile**: nama "Jambi Solar Panel", kategori "Kontraktor Energi
   Surya", alamat (sama persis GBP), jam buka, email, website
   `https://jambisolarpanel.vercel.app`, deskripsi singkat dengan kata kunci.
4. Upload logo profil yang sama dengan GBP & media sosial.

### 8.2 Katalog Produk (Sinkron dengan GBP)

Tambahkan 5–10 produk yang sama dengan GBP (Tahap 7.3) — sinkron agar konsisten.
Setiap produk: foto, nama, deskripsi, harga/rentang harga, link produk website. Calon
pelanggan bisa lihat katalog langsung di chat tanpa harus buka website.

### 8.3 Greeting & Away Message (Auto-Reply)

Setup di Settings → Business Tools → Greeting Message:

```
Selamat datang di Jambi Solar Panel! 🌞
Kami adalah jasa pasang panel surya & PLTS di Jambi dan sekitarnya.

Mohon sebutkan:
1. Nama Bapak/Ibu
2. Jenis properti (rumah/bisnis/kebun/infrastruktur)
3. Lokasi (kota/kecamatan)
4. Kebutuhan listrik atau kapasitas yang diinginkan

Tim kami akan membalas dalam ±15 menit (jam kerja 08:00–17:00).
Untuk survei gratis, hubungi: https://jambisolarpanel.vercel.app/kalkulator-plts
```

Away Message (di luar jam kerja):

```
Terima kasih telah menghubungi Jambi Solar Panel.
Saat ini kami di luar jam kerja (Senin–Sabtu 08:00–17:00).
Pesan Bapak/Ibu akan dibalas di jam kerja berikutnya.

Sementara, lihat estimasi harga & kalkulator PLTS di:
https://jambisolarpanel.vercel.app/kalkulator-plts
```

### 8.4 Click-to-Chat Link & QR Code Review

Buat link click-to-chat untuk dipakai di website, brosur, Instagram bio:

```
https://wa.me/6281328190707?text=Halo%20Jambi%20Solar%20Panel%2C%20saya%20tertarik%20survei%20PLTS%20gratis
```

(Wa.me otomatis buka WhatsApp dengan pesan pre-filled — tingkatkan conversion.)

**QR Code review GBP** (untuk dicetak & ditempel di kantor/surat jalan/brosur):
- Buka GBP → "Minta ulasan" → salin link → generate QR code di
  https://www.qr-code-generator.com (gratis) → download PNG.
- Cetak, tempel di: meja depan kantor, box alat instalasi, brosur, kartu nama.
- Pelanggan tinggal scan → langsung ke form review Google.

### 8.5 Label Lead untuk Tracking (CRPM Mini)

WA Business mendukung "Label" untuk kategorisasi chat. Buat label:
- `🔴 Lead Baru` — chat masuk baru, belum direspons
- `🟡 Survei Terjadwal` — sudah jadwal survei
- `🟢 Closing` — sudah deal/deposit
- `🔵 Follow-up` — survei selesai, belum putuskan
- `⚫ Maintenance` — pelanggan existing, maintenance rutin

Gunakan label ini untuk tracking funnel konversi di Tahap 17.

---

## 9. KEPUTUSAN CUSTOM DOMAIN (MINGGU 1-2, SEBELUM BACKLINK)

### 9.1 Situasi

Situs sekarang memakai `jambisolarpanel.vercel.app` (subdomain Vercel). Secara SEO
teknis ini **valid dan bisa ranking**. Namun untuk jangka panjang, domain sendiri
(mis. `jambisolarpanel.com` atau `jambisolarpanel.id`) memberi: brand lebih kredibel
(terutama untuk tender/PEMDA/korporat), CTR lebih baik, dan aset yang tidak bergantung
pada satu platform.

### 9.2 Kapan Harus Memutuskan: SEKARANG, Minggu 1-2

**Sebelum** backlink dan ranking mulai dibangun. Migrasi setelah ranking terbentuk =
selalu ada risiko penurunan sementara.

| Opsi | Biaya | Konsekuensi |
|------|-------|-------------|
| **A. Beli domain sendiri** (disarankan untuk serius jangka panjang) | ±Rp 150–300rb/tahun (.com/.id via registrar resmi: Niagahoster, DomaiNesia, Rumahweb, GoDaddy) | Developer urus penuh: sambungkan ke Vercel, redirect 301, update canonical/sitemap/structured data, Change of Address di GSC. Peringkat lama dipindahkan oleh Google dalam 2–6 minggu. |
| **B. Tetap vercel.app** (boleh untuk mulai) | Rp 0 | Tetap bisa ranking untuk niche lokal. Keputusan bisa direvisi nanti, tapi semakin lama semakin berisiko dipindahkan. |

### 9.3 Rekomendasi Domain

Cek ketersediaan di registrar, prioritas:
1. `jambisolarpanel.com` (paling ideal — sesuai brand)
2. `jambisolarpanel.id` (domain Indonesia, butuh KTP/NPWP perusahaan)
3. `jambisolarpanel.co.id` (lebih formal, untuk tender)
4. `jmse.id` / `jaya-mandiri-solar.id` (alternatif)

### 9.4 Cara Memutuskan Cepat

Kalau target 3 tahun ke depan ingin jadi installer PLTS terbesar di Jambi & menerima
tender → **beli domain sekarang**. Kalau masih uji coba pasar → vercel.app dulu tidak
masalah. Setelah beli, kirim konfirmasi + akses DNS ke developer untuk migrasi penuh.

---

## 10. SETUP ENVIRONMENT VARIABLES VERCEL (10 MENIT, SEKALI SAJA)

Tiga environment variable di Vercel yang hanya bisa diset owner (untuk dashboard
kalibrasi harga internal `/kalibrasi-harga`):

1. Login https://vercel.com → pilih project `jambisolarpanel` → **Settings →
   Environment Variables**.
2. Tambahkan (pilih environment: Production + Preview + Development):

   | Variable | Value | Catatan |
   |----------|-------|--------|
   | `ADMIN_PASSWORD` | (buat kata sandi kuat 16+ karakter, simpan di password manager) | Untuk akses `/kalibrasi-harga` |
   | `GOOGLE_SCRIPT_URL` | URL Apps Script untuk sinkronisasi harga | Buat di https://script.google.com — panduan terpisah dari developer |
   | `GOOGLE_SCRIPT_API_KEY` | (generate string acak 32 karakter) | Kunci rahasia untuk API di atas |

3. Klik **Save** → otomatis ter-deploy ulang. Selesai.
4. Test: buka `https://jambisolarpanel.vercel.app/kalibrasi-harga` → masukkan
   `ADMIN_PASSWORD` → pastikan masuk dashboard.

---

## 11. CHECKLIST MINGGU 1-2 (cetak / screenshot ini)

| # | Tugas | Est. waktu | Status |
|---|-------|-----------|--------|
| 1 | Buat properti GSC + kirim kode verifikasi HTML ke developer + verifikasi | 15 mnt | ☐ |
| 2 | Submit sitemap.xml di GSC (33 URL) | 2 mnt | ☐ |
| 3 | Request indexing 10 URL prioritas Hari-1 (lihat Tahap 4.3) | 10 mnt | ☐ |
| 4 | Undang developer sebagai user GSC (role Full) | 2 mnt | ☐ |
| 5 | Validasi structured data Rich Results Test (4 URL) + screenshot | 10 mnt | ☐ |
| 6 | Setup Bing Webmaster Tools + import dari GSC + submit sitemap | 15 mnt | ☐ |
| 7 | Dapatkan akses GA4 (minta developer invite email bisnis) | 5 mnt | ☐ |
| 8 | Kirim list event konversi ke developer (click_to_whatsapp, dll.) | 5 mnt | ☐ |
| 9 | Buat Google Business Profile + isi N-A-P persis + unggah 10 foto | 45 mnt | ☐ |
| 10 | Ajukan verifikasi alamat GBP (kartu pos/video) | 5 mnt | ☐ |
| 11 | Isi Q&A GBP (5–10 pertanyaan) + salin link review | 15 mnt | ☐ |
| 12 | Install WhatsApp Business + setup katalog + greeting message | 30 mnt | ☐ |
| 13 | Generate QR code review GBP + cetak | 10 mnt | ☐ |
| 14 | **Putuskan custom domain** (beli / tetap vercel.app) → kabari developer | 10 mnt | ☐ |
| 15 | Set `ADMIN_PASSWORD` (+ 2 var lain) di Vercel + test `/kalibrasi-harga` | 10 mnt | ☐ |
| 16 | Audit konsistensi N-A-P (Tahap 3.4) — pastikan identik semua platform | 15 mnt | ☐ |
| 17 | Kumpulkan & kirim foto + data proyek terbaru ke developer | 30 mnt | ☐ |
| 18 | Minta ulasan Google ke 3 pelanggan terakhir (link review GBP + QR) | 15 mnt | ☐ |

> Selesaikan #1, #9, #14 dulu — itu yang menentukan kapan Google mulai menampilkan
> situs ini. Sisanya bisa paralel dalam 2 minggu.

---

# BAGIAN C — FASE 2: BULAN 1-3 (BANGUN SINYAL KEPERCAYAAN)

> **Tujuan fase ini:** Google melihat sinyal bahwa bisnis ini nyata, aktif, dan
> dipercaya pelanggan. Fokus pada ulasan, bukti proyek, keberadaan di direktori lokal,
> dan konsistensi brand di semua platform.

## 12. ULASAN GOOGLE ASLI (BULAN 1-3, BERKELANJUTAN)

Ulasan Google = sinyal kepercayaan terkuat untuk ranking lokal **dan** alasan utama
calon pelanggan menelepon. Target: **3 ulasan bulan pertama → 10 di bulan ke-3 →
20+ di bulan ke-6 → 35+ di bulan ke-12.**

### 12.1 Cara yang BENAR (Sesuai Kebijakan Google)

1. **Hanya minta ke pelanggan nyata** yang proyeknya benar-benar kita kerjakan.
2. **Waktu terbaik meminta:** 1–2 minggu setelah instalasi selesai, saat pelanggan puas
   (mis. saat follow-up "apakah produksi listriknya sesuai harapan?").
3. **Cara meminta:** WhatsApp dengan link langsung ke form ulasan (dari GBP: Home →
   "Minta ulasan" / Request reviews → salin link) + QR code (Tahap 8.4) untuk yang
   tatap muka. Kalimat sederhana:
   > "Bapak/Ibu, kalau puas dengan pemasangan panel suryanya, tolong bantu beri
   > ulasan Google di link ini — sangat membantu usaha kecil kami. Terima kasih! 🙏"
4. **Minta menyebut layanan & lokasi secara natural** ("pasang panel surya di rumah
   saya di Jambi…", "PLTS hybrid 5 kWp untuk kebun sawit saya…") — ulasan yang
   mengandung kata kunci membantu ranking.
5. **DILARANG keras:** membayar/menjanjikan imbalan untuk ulasan, membuat ulasan
   sendiri dari akun milik kita, meminta massal ke orang yang bukan pelanggan →
   pelanggaran berat kebijakan Google, profil bisa diturunkan/disembunyikan permanen.

### 12.2 Template WhatsApp Minta Ulasan (variasikan, jangan copy persis)

**Template A — Pasca-instalasi (1-2 minggu setelah selesai):**
```
Selamat pagi Bapak [Nama], semoga PLTS-nya berjalan baik. Sudah 2 minggu, apakah
produksi listriknya sesuai harapan?

Kalau Bapak puas dengan pelayanan kami, boleh kami minta bantuan kecil: review singkat
di Google di link ini — sangat membantu kami menjangkau lebih banyak pelanggan di Jambi.

Link review: [LINK GBP]
(Cukup 2-3 kalimat + bintang, <1 menit)

Terima kasih banyak sudah mempercayakan pemasangan ke Jambi Solar Panel! 🌞
```

**Template B — Pasca-maintenance (untuk pelanggan lama):**
```
Halo Bapak/Ibu [Nama], terima kasih sudah menggunakan layanan maintenance kami.

Kalau Bapak/Ibu puas dengan service-nya, review Google di link ini sangat membantu
kami berkembang: [LINK GBP]

Sekalian bantu sebut lokasi (mis. "di rumah saya di Jambi") — agar calon pelanggan
sekitar bisa nemu kami. Terima kasih! 🙏
```

### 12.3 Template Respons Ulasan (balas SEMUA dalam 1×24 jam)

**Ulasan 5 bintang:**
```
Terima kasih banyak Pak [Nama] atas kepercayaan memasang PLTS [hybrid/off-grid]
[kapasitas kWp] di [lokasi]! Senang mendengar produksinya sesuai harapan.
Tim Jambi Solar Panel siap membantu jika ada pertanyaan atau kebutuhan maintenance.
Salam hemat listrik! 🌞
```

**Ulasan 4 bintang:**
```
Terima kasih Pak [Nama] atas ulasannya & kepercayaan memilih Jambi Solar Panel untuk
PLTS di [lokasi]. Kami catat masukan Bapak tentang [sebutkan] untuk perbaikan ke depan.
Jangan ragu hubungi kami di 0813-2819-0707 jika ada yang bisa kami bantu. 🙏
```

**Ulasan 1–3 bintang (KRITIS — lihat Tahap 26 untuk protokol lengkap):**
```
Mohon maaf atas pengalaman yang kurang menyenangkan, Pak [Nama]. Kami sangat serius
menangani keluhan Bapak. Tim kami akan menghubungi Bapak langsung hari ini juga untuk
menyelesaikan masalahnya. Mohon kesediaan Bapak memberi kesempatan kami memperbaiki.
Hubungi kami: 0813-2819-0707. Terima kasih.
```

> Setelah masalah selesai di lapangan, boleh minta pelanggan update review-nya
> (jangan paksa — cukup tanya "apakah Bapak sudah puas sekarang? Kalau iya, boleh
> update review-nya agar mencerminkan kondisi sekarang?").

### 12.4 DILARANG (Ringkasan)

- Membayar/menjanjikan imbalan/discount untuk ulasan
- Membuat ulasan sendiri dari akun milik kita/keluarga/karyawan
- Minta massal ke orang yang bukan pelanggan (mis. grup WA teman)
- Minta ulasan positif saja (Google juga bisa deteksi pola "5 bintang semua" sebagai
  tidak natural) — biarkan pelanggan jujur, fokus perbaiki service

---

## 13. BUKTI PROYEK NYATA / E-E-A-T (BULAN 1-2, LALU TIAP PROYEK SELESAI)

> Google menilai **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust). Untuk
> bisnis instalasi, bukti terkuat adalah **dokumentasi proyek nyata** — hal yang tidak
> bisa dibuat-buat oleh kompetitor dan tidak bisa dikerjakan developer.

### 13.1 Foto Dokumentasi (Kirim 5–10 Foto per Proyek ke Developer)

Yang perlu diambil di SETIAP proyek:

- [ ] Kondisi atap/lokasi **sebelum** pemasangan ( foto konteks rumah/bisnis)
- [ ] Proses pemasangan (tim kerja, rangka, kabel — dengan APD: helm, sarung tangan,
      harness)
- [ ] **Hasil akhir** dari beberapa sudut (panel rapi di atap, ground-mount, atau
      wall-mount inverter)
- [ ] Inverter, MCB/panel distribusi, instalasi rapi & tertutup
- [ ] Tim bersama pelanggan di depan rumah/proyek (dengan izin)
- [ ] Layar monitoring / aplikasi produksi listrik (jika ada, coret data sensitif)
- [ ] Detail komponen (merek panel, inverter, baterai — bagus untuk SEO long-tail)

**Kualitas foto:** siang hari, tidak blur, orientasi lanskap lebih baik untuk website,
min 1080px (idealnya 1920×1080 atau lebih). KIRIM FILE ASLI via Google Drive — **jangan
lewat WhatsApp** karena terkompres & kualitas turun.

### 13.2 Data Proyek (untuk Halaman Studi Kasus Baru — Konten Paling Kuat)

- [ ] **Kapasitas** (kWp), **lokasi** (kecamatan saja boleh, mis. "rumah di Talang
      Mandi"), **jenis sistem** (hybrid/off-grid/on-grid)
- [ ] **Estimasi produksi harian** (dari data monitoring jika ada — lebih kredibel
      daripada angka simulasi)
- [ ] **Tagihan listrik sebelum–sesudah** (foto tagihan, coret data pribadi — **dengan
      izin pelanggan tertulis** via WhatsApp "boleh kami tampilkan tagihan listriknya
      di website?")
- [ ] **Testimoni tertulis** 2–4 kalimat + nama + sebutan (mis. "Budi S., pemilik rumah,
      Jambi") — dengan izin tertulis
- [ ] **Lama pemasangan** (hari kerja)
- [ ] **Tantangan unik** (mis. "atap miring 35°", "akses terbatas", "sistem off-grid
      karena lokasi terpencil") — bagus untuk SEO & menunjukkan expertise

Developer akan mengubah materi ini menjadi: halaman studi kasus baru + update halaman
proyek + postingan GBP + artikel + postingan media sosial — semuanya gratis, tinggal
kirim.

### 13.3 Video Testimoni & Instalasi (ASET KUAT untuk YouTube & SEO)

Video lebih kuat dari foto untuk trust. Tidak perlu profesional — smartphone cukup:

- [ ] **Video testimoni pelanggan** (30–60 detik): "Halo, saya [Nama] dari [lokasi],
      pasang PLTS [kapasitas] sama Jambi Solar Panel. [kesan/hasil]." — dengan izin
- [ ] **Time-lapse instalasi** (1–2 menit): dari atap kosong → panel terpasang. Bagus
      untuk YouTube & Instagram Reels.
- [ ] **Demo monitoring real-time** (1 menit): tunjukkan aplikasi produksi listrik,
      jelaskan singkat fungsi.
- [ ] **Tips edukasi** (2–3 menit): "3 hal yang harus dicek sebelum pasang panel surya",
      "berapa kWp untuk rumah 4 orang di Jambi?" — konten evergreen untuk YouTube.

Upload ke YouTube (channel "Jambi Solar Panel"), embed di halaman studi kasus website,
bagikan ke Instagram/TikTok. Video YouTube yang terindex Google sering muncul di hasil
pencarian ("video carousel").

### 13.4 Dokumen Kredibilitas (Foto/Scan untuk Halaman Tentang-Kami)

- [ ] Sertifikat/SIU/NIB/izin usaha yang dimiliki (foto/scan, coret nomor sensitif jika
      perlu)
- [ ] Sertifikat pelatihan teknisi (jika ada — mis. dari Trina, Jinko, Huawei, Sofar)
- [ ] Dokumen tender/kontrak yang boleh dipublikasikan (coret data sensitif & harga
      jika perlu)
- [ ] Foto sertifikat brand komponen yang dipakai (dealer authorized)
- [ ] Foto tim bersertifikat (K3, elekrikal)

Kirim semua ke developer untuk diunggah ke halaman `/tentang-kami`. Halaman tentang-kami
yang menampilkan dokumen kredibilitas = sinyal Trust yang kuat untuk Google.

---

## 14. DIREKTORI LOKAL & LOCAL CITATIONS — NAP AUDIT (BULAN 1-2)

N-A-P (Name-Address-Phone) harus muncul **konsisten** di banyak situs direktori
lokal = sinyal Prominence ke Google.

### 14.1 Daftar Direktori yang WAJIB Didaftar (Gratis, Total ±3 Jam)

| # | Direktori | URL | Catatan |
|---|-----------|-----|---------|
| 1 | **Google Business Profile** | https://www.google.com/business | Tahap 7 — paling penting |
| 2 | **Bing Places for Business** | https://www.bingplaces.com | Wajib, mirip GBP tapi untuk Bing |
| 3 | **Apple Business Connect** | https://business.apple.com | Untuk Apple Maps & Siri |
| 4 | **Indonetwork** | https://www.indonetwork.co.id | Direktori B2B Indonesia |
| 5 | **Businesslist.co.id** | https://www.businesslist.co.id | Direktori bisnis Indonesia |
| 6 | **Indotrading** | https://www.indotrading.com | Marketplace B2B Indonesia |
| 7 | **Ralali** | https://www.ralali.com | Marketplace B2B |
| 8 | **Tokopedia (Official Store)** | https://www.tokopedia.com | Jika jual komponen eceran |
| 9 | **Facebook Page** | https://www.facebook.com | Wajib — lihat Tahap 15 |
| 10 | **Instagram Business** | https://www.instagram.com | Wajib — lihat Tahap 15 |
| 11 | **LinkedIn Company Page** | https://www.linkedin.com | Penting untuk B2B/tender |
| 12 | **YouTube Channel** | https://www.youtube.com | Untuk video testimoni & tutorial |
| 13 | **TikTok Business** | https://www.tiktok.com | Reach organik tinggi di Indonesia |
| 14 | **Google Maps (via GBP)** | — | Otomatis dari GBP |
| 15 | **OpenStreetMap** | https://www.openstreetmap.org | Edit langsung, free |
| 16 | ** foursquare** | https://foursquare.com | Listing lokal |
| 17 | **TripAdvisor** | https://www.tripadvisor.com | Jika ada wisata terkait PLTS |
| 18 | **KADIN Indonesia** | https://kadin.id | Profil anggota (jika terdaftar) |
| 19 | **ATMI / Asosiasi PLTS Indonesia** | (cari yang relevan) | Profil anggota = backlink otoritas |

### 14.2 N-A-P Audit Checklist

Untuk SETAP direktori di atas, isi **persis sama** (cek karakter per karakter):

```
Nama:        Jambi Solar Panel
Legal name:  PT. Jaya Mandiri Smart Energy (di kolom tambahan jika ada)
Alamat:      Tangkit Baru Residence Blok D15, Jl. H. Saing, RT.001/RW.001,
             Desa Tangkit Baru, Kec. Sungai Gelam, Kab. Muaro Jambi, Jambi 36373
Telepon:     +62 813-2819-0707 (atau +6281328190707 — konsisten format)
Website:     https://jambisolarpanel.vercel.app
Email:       (email bisnis resmi, mis. hello@jambisolarpanel.com)
Jam buka:    Senin–Sabtu 08:00–17:00, Minggu tutup
Kategori:    Solar Energy Contractor / Kontraktor Energi Surya
Deskripsi:   (copy-paste deskripsi yang sama, ±750 karakter)
```

### 14.3 Audit Konsistensi Berkala (tiap 3 bulan, 30 menit)

- Cek 5–10 direktori: apakah N-A-P masih sama? (terutama jika pindah alamat/ganti nomor)
- Hapus listing duplikat (Google benci duplikat — bisa turunkan ranking)
- Update foto & info terbaru (proyek baru, jam buka, dll)

---

## 15. SOSIAL MEDIA PER PLATFORM (BULAN 1-3, BERKELANJUTAN)

Setiap platform punya karakteristik berbeda. Strategi spesifik per platform:

### 15.1 Facebook Page (B2C + Komunitas Lokal)

- **Setup:** Buat Page "Jambi Solar Panel", kategori "Kontraktor Energi Surya", isi
  N-A-P persis sama, link website, jam buka. Add button "Kirim WhatsApp".
- **Audience:** Pemilik rumah, UMKM, komunitas Jambi.
- **Frekuensi:** 3–4 posting/minggu.
- **Jenis konten:**
  - Foto proyek sebelum-sesudah (reach tinggi)
  - Tips hemat listrik (educational, shareable)
  - Promo survei gratis
  - Live video Q&A mingguan (30 menit, rabu malam)
- **Grup Facebook lokal:** Join "Warga Jambi", "UMKM Jambi", "Pemilik Rumah Jambi" —
  bantu jawab pertanyaan solar panel (jangan spam jualan, value dulu).
- **Kolaborasi:** Tag mitra (developer rumah, contractor) di postingan proyek bersama.

### 15.2 Instagram (Visual + Reels)

- **Setup:** Business account "Jambisolarpanel" (handle singkat), bio dengan link
  website + emoji (🌞 Jasa Pasang Panel Surya Jambi), link WA click-to-chat di bio.
- **Audience:** Millennial & Gen Z, pemilik rumah modern.
- **Frekuensi:** 4–5 posting/minggu + 3 Reels/minggu.
- **Jenis konten:**
  - **Feed post:** Carousel "Before-After" proyek (5–10 slide), tips singkat
  - **Reels:** Time-lapse instalasi (15–30 detik), tips cepat, behind-the-scenes
  - **Stories:** Daily update proyek, polling "kira-kira berapa kWp yang Bapak butuh?",
    Q&A sticker
  - **Highlights:** "Proyek", "Testimoni", "Tips", "FAQ", "Promo"
- **Hashtag:** `#jambisolarpanel #panelsuryajambi #pltsjambi #solarpaneljambi
  #hematlistrik #energiterbarukan #pltsindonesia #jambi #muarojambi` (10–15 hashtag).
- **Link di bio:** Pakai Linktree atau Beacons untuk multiple link (website, WA, GBP
  review, kalkulator PLTS).

### 15.3 TikTok (Reach Organik Tinggi di Indonesia)

- **Setup:** Business account "Jambisolarpanel", bio link click-to-chat.
- **Audience:** Millennial & Gen Z, owner UMKM muda.
- **Frekuensi:** 3–5 video/minggu (konsisten > kualitas perfect).
- **Jenis konten:**
  - Time-lapse instalasi (viral potential — "1 hari jadi pasang panel surya")
  - Edukasi singkat (30–60 detik): "Berapa harga panel surya untuk rumah 5kWp?",
    "Myth: panel surya tidak bisa saat hujan — bener?"
  - Testimoni pelanggan (raw, jangan over-produced)
  - Behind-the-scenes tim kerja
  - Trending audio + lip-sync tips solar
- **Hashtag:** `#jambi #panelsurya #plts #solartok #fyp`

### 15.4 YouTube Channel (SEO + Trust Jangka Panjang)

- **Setup:** Channel "Jambi Solar Panel", isi About dengan N-A-P & link website.
  Channel art & logo konsisten brand.
- **Audience:** Calon pelanggan yang riset mendalam sebelum beli.
- **Frekuensi:** 1–2 video/minggu (long-form) + 2–3 Short/minggu.
- **Jenis konten:**
  - **Long-form (5–15 menit):** Studi kasus proyek lengkap, tutorial "cara pilih
    kapasitas PLTS", perbandingan hybrid vs off-grid, tour instalasi
  - **Short (15–60 detik):** Tips cepat, FAQ, before-after, demo komponen
- **SEO YouTube:** Judul dengan kata kunci ("Harga Panel Surya 5kWp di Jambi 2026 —
  Breakdown Lengkap"), deskripsi detail dengan link website, tag relevan, thumbnail
  menarik (text besar, kontras).
- **Embed video** di halaman studi kasus website (developer bantu) = boost SEO halaman.

### 15.5 LinkedIn Company Page (B2B & Tender)

- **Setup:** Company page "PT. Jaya Mandiri Smart Energy" (pakai nama legal untuk
  audiens korporat), showcase page "Jambi Solar Panel" (brand) jika perlu.
- **Audience:** Procurement, owner UMKM, pemerintah daerah, developer perumahan.
- **Frekuensi:** 2–3 posting/minggu.
- **Jenis konten:**
  - Case study B2B ("PLTS 50kWp untuk gudang Palembang — case study lengkap")
  - Insight industri ("regulasi ESDM terbaru untuk PLTS komersial")
  - Pengumuman tender/partnership
  - Update proyek besar ( CSR solar pump untuk desa)
- **Personal LinkedIn owner & tim:** Setiap karyawan punya personal LinkedIn yang
  mention "Jambi Solar Panel" sebagai workplace — sinyal otoritas.

### 15.6 Sinkronisasi sameAs ke Website

Setelah semua profil media sosial live, **kirim semua URL profil ke developer** untuk
ditambahkan ke JSON-LD `sameAs` di structured data LocalBusiness:

```json
"sameAs": [
  "https://www.facebook.com/jambisolarpanel",
  "https://www.instagram.com/jambisolarpanel",
  "https://www.tiktok.com/@jambisolarpanel",
  "https://www.youtube.com/@jambisolarpanel",
  "https://www.linkedin.com/company/jaya-mandiri-smart-energy",
  "URL_GBP"
]
```

Ini membantu Google memahami entity consistency — bisnis yang sama di mana-mana.

---

## 16. LEGAL & COMPLIANCE — UU PDP INDONESIA (BULAN 1-2)

Sejak UU Pelindungan Data Pribadi (UU PDP) No. 27/2022 berlaku, website yang mengumpulkan
data pengunjung (form survei, GA4, cookies) wajib punya:

### 16.1 Halaman Privacy Policy (Developer Buat, Owner Approve)

Minta developer buat halaman `/kebijakan-privasi` yang menjelaskan:

- Data apa yang dikumpulkan (nama, telepon, email dari form survei; data analitik dari
  GA4; cookies)
- Tujuan pengumpulan (untuk kontak, survei, analisis traffic)
- Pihak ketiga yang akses data (Google Analytics, Google Search Console, WhatsApp)
- Hak pengguna (akses, koreksi, hapus data — sesuai UU PDP)
- Kontak DPO: hello@jambisolarpanel.com atau nomor WA
- Link dari footer website + halaman form survei

### 16.2 Halaman Syarat & Ketentuan (Terms of Service)

Minta developer buat `/syarat-ketentuan` yang menjelaskan:

- Layanan yang ditawarkan (pasang PLTS, maintenance, sewa, dll)
- Estimasi harga bersifat indikatif (bukan binding contract)
- Garansi & after-sales (sesuai paket)
- Kewajiban pelanggan (akses atap, KTP untuk kontrak, pembayaran DP)
- Force majeure (cuaca, regulasi, force pola)

### 16.3 Cookie Consent Banner (WAJIB untuk GA4)

Karena GA4 pakai cookies, wajib ada banner consent sesuai GDPR-like standard UU PDP:

- Minta developer pasang banner cookie consent (opsi: Cookiebot gratis sampai 500 page
  view/bulan, atau Osano, atau custom script sederhana).
- Banner tampil saat pengunjung pertama buka website, dengan opsi "Setuju" /
  "Hanya yang perlu" / "Tolak".
- Tanpa consent, GA4 tidak boleh kirim data tracking (setup "consent mode" GA4).

### 16.4 Disclaimer untuk Kalkulator & Simulasi

Kalkulator PLTS di website menghasilkan estimasi — wajib ada disclaimer:

- Di bawah hasil kalkulator: "Estimasi berdasarkan asumsi [produksi 4 kWh/kWp/hari,
  tarif PLN R1 1.444/kWh]. Hasil aktual dapat berbeda ±20% tergantung kondisi atap,
  orientasi, musim, dan shading. Untuk estimasi presisi, jadwalkan survei gratis."
- Link ke form survei dari hasil kalkulator.

### 16.5 Compliance lain (Jika Relevan)

- **Sertifikasi SNI komponen** (panel, inverter, baterai) — jika ada, tampilkan di
  halaman layanan
- **K3 (Keselamatan & Kesehatan Kerja)** — foto tim pakai APD di semua dokumentasi
- **Izin usaha** (SIUP/NIB/TDP) — tampilkan di halaman tentang-kami
- **Asuransi pekerjaan** — jika ada, sebutkan untuk tender

---

## 17. TRACKING KONVERSI & CRM SEDERHANA (BULAN 1, ±2 JAM)

Tanpa tracking, owner tidak tahu marketing mana yang efektif. Setup CRM sederhana di
Google Sheets.

### 17.1 Funnel Konversi (Pahami Alurnya)

```
Impresi pencarian (Google)
   ↓ CTR ~3-5%
Klik ke website (organic search)
   ↓ ~10-20% bounce
Pengunjung engaged (baca >30 detik)
   ↓ ~5-10%
Klik WhatsApp / Telepon (lead mentah)
   ↓ ~50%
Survei terjadwal (lead qualified)
   ↓ ~40%
Closing / deposit (deal)
   ↓ ~80%
Instalasi selesai (revenue)
   ↓
Minta review + testimoni (loop)
```

Setiap tahap harus dilacak. Owner fokus di tahap "Lead → Closing" karena itulah uang.

### 17.2 CRM Google Sheet (Buat Sendiri, Gratis)

Buat Google Sheet dengan sheet bernama "Leads", kolom:

| Tanggal | Nama | Sumber | Platform | Status | Kapasitas | Lokasi | Survei Date | Closing Date | Nilai (Rp) | Catatan |
|---------|------|--------|----------|--------|-----------|--------|-------------|--------------|-----------|---------|
| 2026-10-01 | Budi S. | WhatsApp | Instagram | 🔴 Lead Baru | 5 kWp | Jambi | — | — | — | Mau hybrid |
| 2026-10-02 | Sari W. | Telepon | Google Search | 🟡 Survei Terjadwal | 3 kWp | Muaro Jambi | 2026-10-05 | — | — | Rumah 2 lantai |

- **Sumber:** WhatsApp / Telepon / Form Website / GBP Chat / Facebook / Instagram /
  TikTok / YouTube / Referral / Walk-in
- **Status:** 🔴 Lead Baru / 🟡 Survei Terjadwal / 🟢 Closing / 🔵 Follow-up / ⚫
  Maintenance / ❌ Lost (dengan alasan)
- Update setiap lead baru & perubahan status
- Tiap akhir bulan, hitung conversion rate: Leads → Survei → Closing

### 17.3 UTM Tracking di Setiap Channel

Setiap link yang owner share harus pakai UTM (Tahap 6.3). Konsisten penamaan:

| Channel | utm_source | utm_medium | Contoh |
|---------|-----------|-----------|--------|
| WhatsApp blast | `whatsapp` | `blast` | `?utm_source=whatsapp&utm_medium=blast&utm_campaign=oct_promo` |
| Instagram bio | `instagram` | `bio` | `?utm_source=instagram&utm_medium=bio` |
| Instagram post | `instagram` | `post` | `?utm_source=instagram&utm_medium=post&utm_campaign=proyek_villa` |
| Facebook post | `facebook` | `post` | — |
| TikTok bio | `tiktok` | `bio` | — |
| YouTube deskripsi | `youtube` | `description` | — |
| Brosur cetak | `brosur` | `print` | `?utm_source=brosur&utm_medium=print&utm_campaign=tender_oct` |
| Email signature | `email` | `signature` | — |
| Kartu nama | `kartu_nama` | `print` | — |
| QR code review | `qrcode` | `review` | — |

Di GA4 nanti, owner bisa lihat lead datang dari channel mana paling efektif.

### 17.4 Lead Response Time (KRITIS untuk Closing)

- Target **balas lead dalam 15 menit** (jam kerja) atau <2 jam (weekend/malam)
- Studi: pelanggan yang dibalas dalam 5 menit = 21× lebih mungkin closing vs 30 menit
- WA Business greeting message (Tahap 8.3) sudah bantu — pelanggan tahu kapan dibalas
- Jika owner sibuk lapangan, set auto-forward ke tim sales atau developer (emergency)

---

## 18. KALENDER KONTEN 3 BULAN PERTAMA (KONKRET, DEVELOPER EXECUTE)

Owner cukup "trigger" — teruskan pertanyaan pelanggan & kabari event. Developer tulis.
Kalender konkret ini mengisi 3 bulan pertama dengan 6 artikel + 4 studi kasus + update
rutin:

### 18.1 Kalender Konten Bulan 1

| Minggu | Tipe Konten | Topik | Trigger Owner |
|--------|-------------|-------|---------------|
| 1 | Update halaman | Update `/harga-panel-surya-jambi` dengan komponen & tarif PLN Q4 2026 | Konfirmasi tarif PLN terbaru |
| 1 | Artikel baru | "Berapa kWh Produksi Panel Surya 5kWp di Jambi per Bulan?" (long-tail lokal) | — |
| 2 | Studi kasus | Dari proyek pertama yang owner kirim foto+datanya (Tahap 13) | Kirim materi proyek |
| 2 | Update FAQ | Tambah 5 pertanyaan baru dari pelanggan bulan 1 | Teruskan pertanyaan pelanggan |
| 3 | Artikel | "Solar Panel untuk Rumah di Muaro Jambi: Panduan Lengkap" (target area) | — |
| 4 | Artikel | "PLTS Hybrid vs Off-Grid: Mana yang Cocok untuk Kebun Sawit?" (update dari artikel lama) | — |

### 18.2 Kalender Konten Bulan 2

| Minggu | Tipe Konten | Topik | Trigger Owner |
|--------|-------------|-------|---------------|
| 1 | Studi kasus | Proyek kedua (foto + data) | Kirim materi |
| 1 | Artikel newsjacking | "Update Tarif PLN 2026: Apakah PLTS Masih Worth It?" | Kabari jika tarif PLN naik |
| 2 | Artikel | "Cara Pilih Inverter untuk PLTS Rumah (3–10 kWp)" | — |
| 3 | Update kalkulator | Tambah opsi "estimasi ROI 10 tahun" jika belum ada | — |
| 3 | Studi kasus | Proyek ketiga | Kirim materi |
| 4 | Artikel | "PJUTS untuk Jalan Desa: Studi Kasus & Anggaran" | — |

### 18.3 Kalender Konten Bulan 3

| Minggu | Tipe Konten | Topik | Trigger Owner |
|--------|-------------|-------|---------------|
| 1 | Artikel musiman | "Persiapan PLTS Menjelang Musim Hujan: 5 Hal yang Dicek" | — |
| 1 | Update FAQ | 5 pertanyaan baru | Teruskan |
| 2 | Studi kasus | Proyek keempat | Kirim materi |
| 2 | Artikel | "Solar Pump untuk Kebun Sawit: ROI & Break Even" | — |
| 3 | Artikel | "Maintenance PLTS Tahunan: Apa yang Dilakukan & Biayanya?" | — |
| 4 | Update | Refresh 3 artikel pertama (lastmod) — sinyal konten hidup | — |

### 18.4 Topik Artikel Evergreen (Stok untuk Bulan 4-12)

Stok ide artikel long-tail yang developer bisa pakai bertahap:

- "Harga Panel Surya 3 kWp untuk Rumah di Jambi"
- "Berapa Lama Pemasangan PLTS 5 kWp di Rumah?"
- "Cara Klaim Subsidi Panel Surya dari Pemerintah"
- "PLTS untuk Cafe & Restoran di Jambi: Break Even 5 Tahun?"
- "Solar Panel Trina vs Jinko vs Canadian Solar: Mana yang Bagus?"
- "Berapa Lama Break Even PLTS Rumah di Jambi (2026)?"
- "Cara Baca Aplikasi Monitoring PLTS (Smart IoT)"
- "PLTS untuk Gudang & Pabrik di Sumatera: Studi Kasus 50 kWp"
- "Apa Itu Net Metering PLN & Cara Apply di Jambi"
- "EV Charger + PLTS: Paket Hemat untuk Pemilik Mobil Listrik di Jambi"
- "Solar Pump untuk Tambak Udang & Ikan: Studi Kasus"
- "Mitos vs Fakta: Panel Surya Saat Musim Hujan di Indonesia"
- "Cara Memilih Baterai Lithium vs Lead-Acid untuk PLTS Off-Grid"
- "PJUTS untuk Jalan Desa: Anggaran & ROI untuk Pemerintah Desa"

### 18.5 Newsjacking Trigger (Owner → Developer)

Kabari developer SEGERA jika ada event berikut — peluang artikel viral:

- Kenaikan tarif PLN (TDL baru)
- Subsidi/insentif PLTS baru dari pemerintah (ESDM)
- Pameran energi terbarukan di Jambi/Sumatera
- Tender PLTS dari PEMDA/BUMN
- Berita listrik di Jambi (pemadaman, proyek PLN)
- Kompetitor baru masuk pasar Jambi
- Cuaca ekstrem (El Nino/La Nina) yang berdampak produksi PLTS

---

# BAGIAN D — FASE 3: BULAN 4-6 (BANGUN OTORITAS)

> **Tujuan fase ini:** Google melihat bisnis ini bukan hanya ada, tapi **diakui pihak
> lain** sebagai otoritas. Fokus pada backlink dari media lokal, ekspansi ke area
> layanan, monitoring kompetitor, dan aset sales yang membuat closing lebih mudah.

## 19. BACKLINK & PR LOKAL — TEMPLATE PRESS RELEASE + KONTAK MEDIA

Backlink = "suara rekomendasi" dari website lain. Untuk SEO lokal, **kualitas &
relevansi lokal >> jumlah**. 5 backlink lokal bermutu > 500 backlink murah.

### 19.1 Hierarki Prioritas Backlink (Urut dari Termudah)

1. **Direktori bisnis** (Tahap 14) — sudah selesai di Fase 2.
2. **Media lokal Jambi** (paling kuat untuk otoritas lokal) — bagian ini.
3. **Kemitraan yang saling menautkan** (Tahap 25) — dealer EV, perumahan, material.
4. **Keanggotaan resmi** (KADIN, asosiasi PLTS) — profil anggota = backlink.
5. **Sponsorship event lokal** — pameran, workshop, CSR desa.
6. **Media sosial bisnis** (Tahap 15) — link di bio + caption.

### 19.2 Media Lokal Jambi — Daftar & Cara Pitch

| Media | URL | Kontak (cari di web/redaksi) | Angle berita |
|-------|-----|------------------------------|--------------|
| **Jambi Ekspres** | https://jambiekspres.com | Cari "redaksi" di footer | Proyek CSR, solar pump desa |
| **Tribune Jambi** | https://jambi.tribunnews.com | redaksi@tribunnews.com | Tender, inovasi PLTS |
| **Jambi Independent** | https://jambiindependent.com | Cari kontak redaksi | Edukasi PLTS untuk UMKM |
| **Metro Jambi** | https://metrojambi.com | Cari kontak redaksi | Proyek pemerintah, PJUTS |
| **Jambi Link** | https://jambilink.com | — | Berita lokal umum |
| **Antara Jambi** | https://jambi.antaranews.com | redaksi@antaranews.com | Press release resmi |
| **RMOL Jambi** | https://www.rmoljambi.com | — | Berita politik & pembangunan |
| **Jambipost** | https://jambipostonline.com | — | Berita lokal |

**Cara pitch ke media:**

1. **Cari angle yang punya nilai berita** — bukan "kami buka usaha", tapi:
   - "Jambi Solar Panel Bantu Petani Sawit di [Kecamatan] dengan Solar Pump — Hemat
     80% Biaya Solar"
   - "PJUTS Solar Panel Terangi Jalan Desa [Nama Desa] — Warga Tak Lagi Gelap Malam"
   - "UMKM Cafe di Jambi Hemat Listrik 70% dengan PLTS Hybrid 5 kWp"
   - "CSR [Nama Perusahaan] + Jambi Solar Panel Salurkan PLTS ke Desa Tertinggal"
2. **Siapkan press release** (template di bawah) + 3–5 foto resolusi tinggi + kontak.
3. **Kirim ke email redaksi** + follow-up via WhatsApp 2 hari kemudian.
4. **Setelah dimuat → minta backlink** ke website (banyak media ngasih link ke sumber
   bisnis, sebagian tidak — tetap worth it untuk expose brand).
5. **Setelah berita tayang → bagikan** ke media sosial + tag media + tag tokoh lokal.

### 19.3 Template Press Release Siap Pakai

```
FOR IMMEDIATE RELEASE
[Tanggal]

[JUDUL MENARIK — Maks 12 Kata, Sebut Lokasi & Manfaat]
Contoh: "Jambi Solar Panel Sukses Pasang Solar Pump di Desa Tangkit Baru —
80% Lebih Hemat dari Solar"

[JAMBI, Tanggal] — [Paragraf pembuka 2-3 kalimat: APA, SIAPA, KAPAN, DI MANA]
Jambi Solar Panel, kontraktor energi surya berbasis di Kabupaten Muaro Jambi,
sukses menyelesaikan instalasi [jenis proyek: solar pump PLTS] di [lokasi lengkap]
pada [tanggal]. Proyek ini [manfaat konkret: menghemat biaya solar 80% / mengaliri
air untuk 50 hektar sawit / menerangi 2 km jalan desa].

[Paragraf detail teknis: kapasitas, komponen, durasi pemasangan]
Proyek ini menggunakan [kapasitas: 10 kWp PLTS off-grid] dengan komponen [merek
panel] dan [merek inverter], dipasang dalam [durasi: 3 hari kerja] oleh tim
bersertifikat Jambi Solar Panel. Sistem ini dipantau via [Smart IoT Monitoring]
sehingga produksi real-time bisa dicek dari mana saja.

[Quote dari owner / pelanggan]
"Bapak [Nama Pelanggan], pemilik [jenis usaha] di [lokasi] mengatakan: 'Sebelum
pakai solar pump, kami habis [Rp X juta/bulan] untuk solar. Sekarang cuma [Rp Y
ribu/bulan] untuk maintenance. Pengembalian modal dalam [Z] tahun.'"

Bapak [Nama Owner], Direktur Jambi Solar Panel menambahkan: "Kami percaya energi
surya adalah masa depan untuk Jambi. Proyek ini bukti bahwa PLTS bukan hanya untuk
rumah mewah, tapi juga solusi nyata untuk [pertanian/infrastruktur desa/UMKM]."

[Paragraf konteks bisnis]
Jambi Solar Panel (PT. Jaya Mandiri Smart Energy) adalah kontraktor energi surya
yang melayani Jambi dan sekitarnya sejak [tahun]. Layanan: PLTS rumah & komersial,
solar pump, PJUTS, EV charging, smart monitoring, dan maintenance. Sudah
menyelesaikan [jumlah] proyek di [jumlah kota]. Survei & konsultasi gratis.

[Closing]
Untuk informasi lebih lanjut atau survei gratis, hubungi:
Jambi Solar Panel
Telp/WhatsApp: +62 813-2819-0707
Website: https://jambisolarpanel.vercel.app
Email: hello@jambisolarpanel.com
Alamat: Tangkit Baru Residence Blok D15, Jl. H. Saing, Muaro Jambi, Jambi 36373

###
```

> **Tip:** Kirim press release sebagai **email** (bukan WhatsApp) ke redaksi. Subject
> email: "PRESS RELEASE: [Judul Singkat]". Lampirkan foto terpisah (jangan embed di
> Word, kirim sebagai attachment JPG/PNG).

### 19.4 Kemitraan Backlink (Detail di Tahap 25)

Saat mulai Fase 3, owner harus sudah punya 3–5 kemitraan yang bisa saling menautkan:

- Dealer mobil listrik (link timbal balik di page EV charging ↔ dealer)
- Pengembang perumahan baru (paket "rumah siap PLTS")
- Toko material bangunan besar (display panel + brosur, link dari web mereka)
- Bank/Koperasi (pembiayaan PLTS — bisa jadi referral)
- Asosiasi industri (KADIN, HIPMI, asosiasi PLTS Indonesia)

### 19.5 ❌ JANGAN PERNAH

- Membeli backlink murah/PBN/jasa "500 backlink Rp 500rb" → penalti Google
- Comment spam / guestbook spam
- Menukar link massal dengan situs tak relevan (mis. judi, dewasa, pharma)
- Private Blog Network (PBN) — jaringan blog palsu untuk backlink
- Link farm / link exchange otomatis

---

## 20. MULTI-KOTA / AREA LAYANAN LANDING PAGES (BULAN 4-6)

Studi kasus sudah ada di Riau (kebun sawit) dan Palembang (gudang). GBP areaServed
mencakup Jambi, Riau, Sumatera, Jawa Barat. Saatnya ekspansi dengan **landing page
per kota** untuk tangkap traffic "solar panel [kota]".

### 20.1 Strategi Landing Page per Kota

Buat halaman spesifik per kota/area (developer execute, owner approve konten):

| URL | Target Keyword | Konten inti |
|-----|----------------|--------------|
| `/solar-panel-jambi` | "solar panel Jambi" | Kota Jambi — utama, link ke semua layanan |
| `/solar-panel-muaro-jambi` | "solar panel Muaro Jambi" | Spesifik area Muaro Jambi + testimonial lokal |
| `/solar-panel-batanghari` | "solar panel Batanghari" | Spesifik Batanghari |
| `/solar-panel-sarolangun` | "solar panel Sarolangun" | Spesifik Sarolangun |
| `/solar-panel-tebo` | "solar panel Tebo" | Spesifik Tebo |
| `/solar-panel-merangin` | "solar panel Merangin" | Spesifik Merangin |
| `/solar-panel-riau` | "solar panel Riau" / "PLTS Riau" | Link ke studi kasus kebun sawit Riau |
| `/solar-panel-palembang` | "solar panel Palembang" | Link ke studi kasus gudang Palembang |
| `/solar-panel-jakarta` (jika layani) | "solar panel Jakarta" | Untuk ekspansi (sesuai areaServed Jawa Barat) |

### 20.2 Struktur Landing Page per Kota (Template Konten)

Setiap landing page harus berisi (developer execute):

1. **Hero:** "Jasa Pasang Panel Surya di [Kota] — Survei Gratis" + CTA WhatsApp
2. **Konten unik (BUKAN copy-paste):** kenapa PLTS cocok untuk [kota] (potensi sinar
   matahari, tarif listrik PLN wilayah tersebut, kebutuhan spesifik)
3. **Studi kasus lokal** (atau terdekat) — jika ada proyek di kota itu
4. **Testimoni** pelanggan dari kota tersebut (atau sekitar)
5. **Daftar layanan** link ke halaman layanan utama
6. **FAQ spesifik kota** ("Berapa harga panel surya di [kota]?" "Apakah melayani
   kecamatan [nama]?")
7. **Embed Google Maps** kota tersebut + area layanan
8. **CTA akhir:** WhatsApp + form survei
9. **Schema LocalBusiness** dengan `areaServed: [Kota]`

> ⚠️ **PENTING:** Jangan buat 9 landing page dengan konten identik hanya ganti nama
> kota (ini "doorway page" — bisa kena penalti Google). Setiap halaman harus punya
> konten unik minimal 60% (foto berbeda, testimoni berbeda, info spesifik kota).

### 20.3 Multi-Location Schema (Developer Setup)

Update JSON-LD LocalBusiness dengan multiple `areaServed`:

```json
{
  "@type": "LocalBusiness",
  "name": "Jambi Solar Panel",
  "areaServed": [
    {"@type": "AdministrativeArea", "name": "Jambi"},
    {"@type": "AdministrativeArea", "name": "Muaro Jambi"},
    {"@type": "AdministrativeArea", "name": "Batanghari"},
    {"@type": "AdministrativeArea", "name": "Sarolangun"},
    {"@type": "AdministrativeArea", "name": "Tebo"},
    {"@type": "AdministrativeArea", "name": "Merangin"},
    {"@type": "AdministrativeArea", "name": "Riau"},
    {"@type": "AdministrativeArea", "name": "Sumatera Selatan"}
  ]
}
```

Untuk kota yang punya kantor cabang nyata (bukan hanya area layanan), buat JSON-LD
terpisah per lokasi dengan alamat & jam buka spesifik.

---

## 21. KOMPETITOR MONITORING & KEYWORD GAP (BULAN 4-6)

### 21.1 Identifikasi Kompetitor Lokal

Cari di Google: "solar panel Jambi", "pasang PLTS Jambi", "harga panel surya Jambi" —
catat 5–10 kompetitor yang muncul di halaman 1 + Local Pack. Contoh kemungkinan:
- Installer PLTS lokal lain di Jambi
- Distributor panel surya Jambi
- Toko listrik yang jual panel ecer

### 21.2 Tools Gratis untuk Monitoring Kompetitor

| Tool | URL | Fungsi |
|------|-----|--------|
| **Google** (manual) | google.com | Cari keyword, lihat siapa ranking |
| **Google Search Console** | search.google.com/search-console | Lihat keyword yang sudah buat traffic ke kita (Performance → Queries) |
| **Google Trends** | trends.google.com | Bandingkan popularitas keyword dari waktu ke waktu |
| **UberSuggest** (free 3x/hari) | neilpatel.com/ubersuggest | Keyword ideas + kompetitor analysis |
| **Answer The Public** (free 2x/hari) | answerthepublic.com | Pertanyaan yang dicari orang tentang topik |
| **Also Asked** (free) | alsoasked.com | People Also Ask questions |
| **Google People Also Ask** | di hasil pencarian Google | Pertanyaan terkait yang bisa jadi konten |

### 21.3 Rutinitas Bulanan Kompetitor (1 jam/bulan)

1. **Search keyword utama** di Google (gunakan mode incognito/private + lokasi Jambi)
2. **Catat di Google Sheet:**
   - Siapa yang ranking top 10?
   - Siapa yang masuk Local Pack (3 bisnis di peta)?
   - Posisi Jambi Solar Panel di mana? (jika sudah muncul)
3. **Analisis 3 kompetitor top:**
   - Buka website mereka — konten apa yang mereka punya & kita tidak?
   - Berapa artikel/blog mereka? (bandingkan dengan 13 kita)
   - Apakah mereka punya studi kasus? Berapa? (bandingkan dengan 3 kita)
   - Berapa ulasan Google mereka? Rata-rata bintang berapa?
4. **Identifikasi gap konten:** topik yang kompetitor punya tapi kita belum → masuk ke
   kalender konten bulan depan.

### 21.4 Keyword Gap Analysis — dari Pertanyaan Pelanggan

Owner punya akses unik ke "data real" yang kompetitor tidak punya: **pertanyaan pelanggan
nyata**. Setiap kali pelanggan bertanya sesuatu yang belum ada di FAQ/artikel → itu
peluang konten.

**Setup:** Setiap kali dapat pertanyaan baru via WhatsApp, catat di Google Sheet:

| Tanggal | Pertanyaan Pelanggan | Sudah ada di FAQ/Artikel? | Topik Artikel? | Prioritas |
|---------|----------------------|---------------------------|----------------|-----------|
| 2026-10-01 | "Apakah panel surya bisa dipindah kalau pindah rumah?" | Tidak | "Pindah Rumah dengan PLTS: Bisa?" | Tinggi |
| 2026-10-03 | "Berapa lama garansi panel vs inverter?" | Sebagian | Update FAQ + artikel | Sedang |

Akhir bulan, teruskan 5–10 pertanyaan terbaik ke developer untuk dijadikan artikel.
Pertanyaan nyata = topik artikel paling relevan & paling mungkin ranking.

### 21.5 Featured Snippet Targeting (Advanced)

Featured snippet = kotak jawaban di atas hasil pencarian ("position zero"). Untuk
mendapatkannya, artikel harus:

- Jawab pertanyaan langsung di paragraf pertama (40–60 kata)
- Format paragraf singkat ATAU list ATAU tabel
- Pertanyaan eksplisit di heading (H2/H3)
- Target: "Berapa kWp panel surya untuk rumah?", "Apa itu PLTS hybrid?", "Berapa
  lama break even PLTS?"

Developer bisa optimasi artikel yang sudah ada untuk featured snippet. Owner cukup
**identifikasi artikel mana yang sudah ada traffic** (dari GSC) → minta developer
optimasi.

---

## 22. ASET PENDUKUNG SALES (BULAN 4-6)

Aset offline/printed yang membuat closing lebih mudah & punya value SEO (saat dibagikan
online, link UTM ter-track).

### 22.1 Brosur PDF (untuk WhatsApp ke Calon Pelanggan)

Brosur 1–2 halaman A4 berisi:
- Cover: logo, tagline, foto proyek terbaik, no WA
- Halaman 1: layanan utama + range harga + keunggulan
- Halaman 2: studi kasus singkat + FAQ + CTA survei gratis

**Generate PDF:** Mint developer buat di website (`/brosur.pdf` yang auto-generate
dari konten website). Pakai tools gratis: Canva, Figma, atau LibreOffice. Simpan di
Google Drive untuk akses tim.

**Pakai UTM:** Saat kirim brosur PDF via WhatsApp, link-nya pakai
`?utm_source=whatsapp&utm_medium=pdf&utm_campaign=brosur_v1` (track di GA4 siapa yang
klik dari brosur).

### 22.2 Company Profile PDF (untuk Tender & Korporat)

Dokumen formal 8–15 halaman:
- Cover dengan logo & legal name "PT. Jaya Mandiri Smart Energy"
- Profil perusahaan (sejarah, visi, misi, tim, legalitas)
- Layanan & sertifikasi
- Portofolio proyek (3–5 case study dengan foto + data)
- Sertifikat & izin usaha (NIB, SIUP, K3, dll)
- Klien & testimoni
- Kontak

**Pakai untuk:** Tender PEMDA, korporat, BUMN, developer perumahan. Print kualitas
tinggi atau kirim PDF. Update tiap 6 bulan dengan proyek terbaru.

### 22.3 Template Proposal Tender (DOCX/PDF)

Template editable untuk tender:
- Cover surat (kop perusahaan, perihal, tujuan)
- Profil singkat
- Penawaran teknis (spesifikasi komponen, kapasitas, layout)
- Penawaran harga (rincian per komponen + jasa)
- Timeline pengerjaan
- Garansi & after-sales
- Sertifikat & legalitas (lampiran)
- Testimoni klien (lampiran)

**Format:** Word (.docx) untuk edit, export PDF untuk kirim. Simpan template di
Google Drive tim. Owner review, tim sales customize per tender.

### 22.4 QR Code Aset (Cetak Sekali, Pakai Lama)

Generate QR code (gratis di qr-code-generator.com atau goqr.me) untuk:

| QR | Tujuan | Cetak di mana |
|----|--------|---------------|
| QR Review GBP | Link ke form review Google | Kartu nama, brosur, box alat, surat jalan, stiker di panel |
| QR WhatsApp | Link click-to-chat dengan pesan pre-filled | Kartu nama, brosur, signage toko |
| QR Website | https://jambisolarpanel.vercel.app | Kartu nama, brosur, signage |
| QR Kalkulator | Link ke /kalkulator-plts | Brosur, signage, kartu nama |
| QR YouTube | Link channel YouTube | Brosur, kartu nama |

Print di material yang awet (laminated, vinyl sticker) untuk panel & box alat.

### 22.5 Email Signature dengan Link Website

Setup signature email bisnis untuk semua tim (Gmail / Outlook / lainnya):

```
Bapak [Nama] · [Jabatan]
Jambi Solar Panel (PT. Jaya Mandiri Smart Energy)
WA: +62 813-2819-0707 · Email: nama@jambisolarpanel.com
Website: jambisolarpanel.vercel.app
Survei gratis: jambisolarpanel.vercel.app/kalkulator-plts
[Logo kecil sebagai gambar signature]
```

Setiap email keluar = promosi website + backlink click (track dengan UTM jika perlu).

### 22.6 Kartu Nama (Printed)

Kartu nama profesional 2 sisi:
- **Depan:** Logo + "Jambi Solar Panel" + tagline + no WA
- **Belakang:** QR code review GBP + QR WhatsApp + website

Cetak di material premium (minimal 310gsm art carton, laminasi doff). Distribusi ke
semua tim sales & teknisi.

---

## 23. KONTEN MUSIMAN & NEWSJACKING (BULAN 4-6, BERKELANJUTAN)

### 23.1 Kalender Musiman PLTS di Jambi

| Periode | Event | Peluang Konten |
|---------|-------|----------------|
| **Jan–Feb** | Awal tahun, musim hujan | "Tips Rawat PLTS di Musim Hujan" / "Produksi PLTS di Musim Hujan: Realita" |
| **Mar–Apr** | Pra-Ramadan | "PLTS untuk Cafe Buka Puasa: Hemat Listrik Malam" |
| **Mei–Jun** | Panen sawit | "Solar Pump untuk Kebun Sawit: Musim Panen" / "PLTS untuk Pabrik Kelapa Sawit" |
| **Jul–Aug** | HUT Kemerdekaan, musim kemarau | "Potensi PLTS Jambi di Musim Kemarau (Puncak Produksi)" / "PJUTS untuk Jalan Desa: HUT RI" |
| **Sep–Oct** | Tahun baru Suku Bursa | "Investasi PLTS Tahun Baru: Tax Deductible?" / "PLTS untuk Bisnis: Break Even di Tahun ke-?" |
| **Nov–Dec** | Akhir tahun, musim hujan mulai | "Recap Proyek 2026: X Proyek, Y kWp Terpasang" / "Tips Siapkan PLTS untuk 2027" |

### 23.2 Newsjacking Trigger (Owner → Developer)

Kabari developer SEGERA (WhatsApp) jika ada event berikut — peluang artikel viral dalam
24–48 jam:

- **Kenaikan tarif PLN** (TDL baru diumumkan) → artikel "Update Tarif PLN: Apakah PLTS
  Masih Worth It?"
- **Subsidi/insentif PLTS baru** dari pemerintah (ESDM, Kemenkeu) → "Cara Klaim Subsidi
  PLTS [Tahun]"
- **Pameran energi terbarukan** di Jambi/Sumatera → coverage live + foto
- **Tender PLTS** dari PEMDA/BUMN diumumkan → "Peluang Tender PLTS di Jambi Q?"
- **Pemadaman listrik PLN** di area Jambi → "PLTS sebagai Backup Listrik Saat
  Pemadaman PLN"
- **Berita cuaca ekstrem** (El Nino/La Nina) → "Dampak El Nino pada Produksi PLTS"
- **Kompetitor baru** masuk pasar → (internal, untuk strategi, bukan artikel)
- **Regulasi PLN** baru (mis. net metering, biaya interkoneksi) → artikel edukasi

### 23.3 Repurposing Konten (Satu Materi → Multi-Platform)

Saat ada studi kasus / artikel baru, developer harus maximize dengan repurpose:

| Materi Inti | Facebook | Instagram | TikTok | YouTube | LinkedIn | GBP |
|-------------|----------|-----------|--------|---------|----------|-----|
| Studi kasus proyek (artikel website) | Foto Before-After + caption | Carousel 5–10 slide | Time-lapse 30s | Video 5–10 menit | Case study B2B versi | Post singkat + foto |
| Artikel edukasi (mis. "Cara Pilih Baterai") | Foto + tips singkat | Carousel tips | Tips 60s | Long-form tutorial | Insight industri | Q&A singkat |
| Testimoni pelanggan | Foto + quote | Quote card | Testimoni video 30s | Testimoni 60s | Quote + tag client | Foto + caption |
| Press release media | Share link berita | Screenshot berita | Tips terkait | Reaksi video | Post formal | Update profil |

---


# BAGIAN E — FASE 4: BULAN 7-12 (SKALA & OPTIMASI)

> **Tujuan fase ini:** Setelah fondasi & otoritas terbangun, fokus pada scaling:
> advanced SEO techniques, kemitraan strategis, dan manajemen krisis reputasi. Target:
> top 3 Local Pack untuk "solar panel Jambi" & kata kunci utama.

## 24. ADVANCED SEO TECHNIQUES (DEVELOPER EXECUTE, OWNER APPROVE)

### 24.1 Featured Snippet Optimization

Featured snippet = "position zero" di atas hasil pencarian Google. Untuk
mendapatkannya:

- **Struktur konten:** H2/H3 berbentuk pertanyaan langsung ("Berapa harga panel surya
  di Jambi?") diikuti paragraf jawaban singkat (40–60 kata) di bawahnya.
- **Format:** paragraf singkat, list bernomor, atau tabel — tergantung jenis query.
- **Target query informasional:** "Apa itu PLTS hybrid?", "Berapa kWh produksi 1 kWp
  panel surya?", "Cara menghitung kebutuhan baterai PLTS."
- **Audit artikel yang sudah ada traffic** (dari GSC Performance) → minta developer
  optimasi untuk featured snippet.

### 24.2 Voice Search Optimization (Google Assistant Bahasa Indonesia)

Voice search tumbuh cepat di Indonesia (Google Assistant di Android). Karakteristik:

- **Query lebih natural & panjang:** "Google, berapa harga pasang panel surya di rumah
  saya di Jambi?" (bukan "harga panel surya Jambi")
- **Jawaban konversasional:** artikel harus jawab dengan kalimat lengkap, bukan
  keyword stuff
- **FAQ schema** sudah dipasang developer → optimasi konten FAQ agar jawabannya
  natural & lengkap (1–3 kalimat per jawaban)
- **Local intent:** "Jasa pasang panel surya terdekat" — pastikan GBP lengkap & ulasan
  banyak

### 24.3 Image Search Optimization

Google Images bisa sumber traffic signifikan untuk bisnis instalasi (calon pelanggan
cari "contoh pemasangan panel surya di atap"). Optimasi:

- **Nama file deskriptif:** `pasang-panel-surya-atap-rumah-jambi.jpg` (bukan
  `IMG_20261001_1234.jpg`)
- **Alt text:** setiap foto harus ada `alt="Instalasi panel surya 5kWp di atap rumah
  Jambi"` — deskriptif dengan kata kunci natural
- **Caption di artikel:** deskripsi singkat di bawah foto
- **Structured data ImageObject:** developer tambahkan schema untuk galeri proyek
- **Kualitas tinggi:** min 1200px, format WebP (developer handle compression)
- **EXIF metadata:** pertahankan (lokasi, tanggal) — Google baca untuk konteks lokal
- **Sitemap gambar:** minta developer generate `sitemap-images.xml` terpisah

### 24.4 Video Schema (untuk YouTube Embed di Website)

Setiap video YouTube yang di-embed di website harus punya `VideoObject` schema:

```json
{
  "@type": "VideoObject",
  "name": "Studi Kasus PLTS 5kWp Villa Jambi",
  "description": "Time-lapse instalasi PLTS hybrid 5kWp di villa Jambi...",
  "thumbnailUrl": "https://...",
  "uploadDate": "2026-10-15",
  "contentUrl": "https://jambisolarpanel.vercel.app/studi-kasus/...",
  "embedUrl": "https://www.youtube.com/embed/..."
}
```

Developer setup. Video dengan schema muncul di Google Video search & carousel.

### 24.5 Review Schema (Aggregate Rating)

Setelah punya ≥10 ulasan Google, minta developer pasang `AggregateRating` schema di
homepage & halaman layanan:

```json
{
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12",
    "bestRating": "5"
  }
}
```

Hasil: bintang review muncul di hasil pencarian Google → CTR naik 15–30%. **PENTING:**
hanya pakai rating dari ulasan asli Google (jangan fabrication — penalti).

### 24.6 Multi-Location Schema (untuk Cabang)

Jika buka cabang di kota lain (Palembang, Riau, Jakarta), buat JSON-LD terpisah per
lokasi dengan `@id` unik, alamat, jam buka, dan telepon spesifik. Link dari landing
page per kota (Tahap 20).

### 24.7 Site Search Tracking di GA4

Aktifkan "site search" tracking di GA4 (Admin → Data Streams → Web → Enhanced
Measurement → enable site search). Lihat di Reports → Engagement → Pages → cari
`?s=` atau `/search?q=`. Ketahui apa yang dicari pengunjung di website — bahan konten
baru.

### 24.8 Internal Linking Strategy (Developer Execute)

Pastikan internal linking konsisten:

- Setiap artikel baru → link ke 2–3 artikel terkait + 1 halaman layanan
- Setiap halaman layanan → link ke 2–3 artikel terkait + 1 studi kasus
- Setiap studi kasus → link ke halaman layanan + artikel terkait
- Anchor text bervariasi & natural (jangan always exact match keyword)
- Breadcrumb navigation di semua halaman (sudah ada)

Audit internal linking tiap 3 bulan: buka 5 artikel random, cek apakah ada link ke
konten lain. Jika ada "orphan page" (tidak di-link dari mana-mana) → minta developer
tambahkan link dari artikel relevan.

---

## 25. KEMITRAAN & KOLABORASI KONKRET (BULAN 7-12)

### 25.1 Daftar Mitra Potensial (Prioritas Outreach)

| Mitra | Tipe | Skema Kolaborasi | Backlink? |
|-------|------|------------------|-----------|
| **Dealer mobil listrik** (Wuling, BYD, Hyundai EV) | Otomotif | Konten "EV + PLTS: Paket Hemat" | Ya, mutual |
| **Pengembang perumahan baru** (Jambi, Muaro Jambi) | Properti | Paket "rumah siap PLTS" | Ya, dari page proyek mereka |
| **Toko material bangunan besar** (Mitra 10, BangunanKita, lokal) | Material | Display panel + brosur di toko | Ya, dari web mereka |
| **Bank / Koperasi** (BRI, BNI, koperasi PLN) | Finansial | Pembiayaan PLTS untuk nasabah | Ya, program referral |
| **Asosiasi industri** (KADIN, HIPMI, APAMSI) | Asosiasi | Profil anggota + event | Ya, otoritas tinggi |
| **Universitas / Politeknik Jambi** | Akademik | Workshop, magang, riset | Ya, dari .ac.id (backlink otoritas) |
| **Dinas ESDM / PUPR Jambi** | Pemerintah | CSR, kerjasama edukasi | Ya, dari .go.id (backlink kuat) |
| **PLN Jambi** | BUMN | Kerjasama net metering, edukasi | Jika memungkinkan |
| **Influencer lokal Jambi** (travel, lifestyle, UMKM) | Influencer | Review proyek, kolaborasi konten | Ya, dari profile mereka |
| **Kafe / restoran yang sudah pakai PLTS** | Klien | Case study + cross-promo | Dari website mereka jika ada |

### 25.2 Cara Outreach (Email/WhatsApp Template)

```
Halo [Nama Mitra / Bapak/Ibu],

Saya [Nama] dari Jambi Solar Panel (jambisolarpanel.vercel.app) — kontraktor
energi surya di Jambi. Kami melihat potensi kolaborasi yang saling menguntungkan:

[Pitch spesifik, mis. "Kami sering dapat pelanggan yang juga butuh EV charger —
kami bisa referensikan ke dealer Bapak, sebaliknya kalau ada pembeli EV yang
butuh PLTS, bisa referensikan ke kami."]

Yang kami tawarkan:
- Cross-promo konten (artikel bersama, video kolaborasi)
- Tautan timbal balik di website masing-masing (untuk SEO)
- Komisi referral [X%] jika ada deal yang materialize
- Kerjasama event/workshop bersama

Boleh jadwalkan meeting 30 menit untuk diskusi detail? Bapak/Ibu bisa pilih
waktu: [link Calendly atau sebut waktu].

Terima kasih,
[Nama] · Jambi Solar Panel · 0813-2819-0707
```

### 25.3 Skema Referral (Formal)

Setup program referral untuk mitra & pelanggan:

- **Referral fee:** 2–5% dari nilai proyek (kapasitas kecil) atau fee tetap (Rp 500rb–2jt)
- **Klausul:** dibayar setelah DP pelanggan masuk & instalasi dimulai
- **Tracking:** berikan kode unik per mitra (mis. `REF-KAFE01`) + UTM di link
- **Dokumen:** surat perjanjian singkat (1 halaman) — siapkan template

### 25.4 Cross-Promotion Content dengan Mitra

Setelah mitra onboarding, bikin konten bersama:

- **Artikel co-authored:** "5 Pertimbangan Beli Mobil Listrik + PLTS Rumah" (Jambi
  Solar Panel + dealer EV) — publish di kedua website, saling tag
- **Video kolaborasi:** YouTube bersama (interview, panel diskusi)
- **Instagram Live bersama:** Q&A "PLTS + Mobil Listrik untuk Hidup Hemat"
- **Webinar:** "Investasi Energi Surya untuk UMKM" — Jambi Solar Panel + Bank

Setiap konten bersama = backlink mutual + expose ke audience baru.

---

## 26. KRISIS REPUTASI & MANAJEMEN ULASAN NEGATIF (BULAN 7-12)

### 26.1 Protokol Eskalasi Ulasan Negatif

Ketika dapat ulasan 1–3 bintang di Google, jangan panik — tapi jangan diabaikan.

**Step 1 (Dalam 1 jam):** Balas public review dengan template "akui + alihkan offline":
```
Mohon maaf atas pengalaman yang kurang menyenangkan, Pak/Bu [Nama]. Kami sangat
serius menangani keluhan Bapak/Ibu. Tim kami akan menghubungi Bapak/Ibu langsung
hari ini juga untuk menyelesaikan masalahnya. Mohon kesediaan memberi kesempatan
kami memperbaiki. Hubungi kami: 0813-2819-0707. Terima kasih.
```

**Step 2 (Dalam 4 jam):** Hubungi pelanggan via WhatsApp/telepon, dengarkan, catat
detail masalah. Jangan defensif. Akui kesalahan jika ada.

**Step 3 (Dalam 24–48 jam):** Kirim teknisi/owner untuk perbaiki masalah di lapangan.
Biaya perbaikan gratis jika memang kesalahan kami.

**Step 4 (Setelah masalah selesai):** Minta pelanggan update review-nya secara natural
("Bapak/Ibu, apakah sekarang sudah puas? Jika iya, boleh update review-nya agar
mencerminkan kondisi sekarang? Tidak paksa ya, hanya jika Bapak/Ibu mau.").

**Step 5:** Internal review — kenapa ini terjadi? Update SOP agar tidak terulang.

### 26.2 Template Respons Berdasarkan Jenis Keluhan

**Keluhan kualitas instalasi:**
```
Mohon maaf atas masalah instalasi yang Bapak alami, Pak [Nama]. Ini tidak
sesuai standar kami. Tim teknisi kami akan kontak Bapak hari ini untuk
pengecekan & perbaikan gratis. Mohon kabari jika belum dihubungi dalam 4 jam:
0813-2819-0707. Terima kasih atas feedback yang sangat berarti ini.
```

**Keluhan delay pengerjaan:**
```
Saya pribadi minta maaf atas keterlambatan pengerjaan, Pak [Nama]. Saya sudah
cek internal — [sebab singkat, tanpa excuse]. Tim kami akan prioritaskan
penyelesaian proyek Bapak dalam [X hari]. Sebagai kompensasi, kami berikan
[maintenance gratis 1 tahun / diskon Rp X]. Hubungi saya langsung: [WA owner].
```

**Keluhan harga (after quote):**
```
Terima kasih sudah membandingkan, Pak [Nama]. Harga kami mencerminkan [komponen
brand premium / garansi 5 tahun / tim bersertifikat / after-sales]. Tapi kami
paham budget Bapak. Boleh diskusi opsi paket yang lebih sesuai? Hubungi:
0813-2819-0707. Kami tetap appreciate Bapak sudah consider kami.
```

**Keluhan pasca-maintenance:**
```
Mohon maaf maintenance-nya kurang memuaskan, Pak [Nama]. Tim kami akan
kunjungi ulang gratis untuk perbaikan. Mohon kabari waktu yang nyaman:
0813-2819-0707. Kami berkomitmen puas pelanggan 100%.
```

**Ulasan tidak fair / spam / kompetitor:**
- Flag ke Google sebagai "Tidak relevan" / "Spam" / "Konflik kepentingan"
- Jangan balas emosi — balas tenang dengan fakta
- Kumpulkan bukti (kontrak, WhatsApp, foto) jika perlu eskalasi Google

### 26.3 Skenario Viral Negatif (Media Sosial / Berita)

Jika ada keluhan viral di Facebook/TikTok/media:

1. **Jangan hapus komentar** (kecuali spam/threat) — itu memperburuk
2. **Balas di publik dengan empati & akusi** — dalam 1 jam
3. **Alihkan ke DM/WhatsApp** untuk penyelesaian private
4. **Update progress di publik** ("Kami sudah kontak Pak [Nama], sedang proses
   penyelesaian, update lagi setelah selesai") — transparansi
5. **Issue statement resmi** jika viral di media (press release "Klarifikasi &
   Tindak Lanjut")
6. **Internal post-mortem** — root cause analysis, update SOP, training tim
7. **Turnaround ke positif:** jika selesai dengan baik, minta pelanggan share
   pengalamannya (dengan izin)

### 26.4 Monitoring Reputasi (Rutin Mingguan)

- **GBP:** cek ulasan baru setiap Senin & Kamis
- **Google Alert:** setup alert untuk "Jambi Solar Panel" + "Jaya Mandiri Smart Energy"
  + "Jambi Solar Panel review" — notifikasi email jika ada mention baru di web
- **Facebook/Instagram:** aktifkan notifikasi komentar & tag
- **TikTok:** cek komentar video viral
- **Google Maps:** cek photo customer upload (pelanggan upload foto proyek = social proof)

### 26.5 Apa yang TIDAK Boleh Dilakukan saat Krisis

- ❌ Hapus ulasan (kecuali spam) — Google bisa penalti
- ❌ Balas dengan emosi / menyerang pelanggan
- ❌ Buat ulasan positif palsu untuk "menetralkan"
- ❌ Bayar orang untuk hapus review negatif
- ❌ Block pelanggan di WhatsApp/medsos
- ❌ Hindari tanggung jawab / blame pelanggan
- ❌ Diam saja (no response = sinyal tidak peduli)

---

# BAGIAN F — OPERASI & PEMANTAUAN

## 27. RUTINITAS OWNER (HARIAN / MINGGUAN / BULANAN)

Total waktu yang dibutuhkan owner untuk menjalankan SEO: **±30 menit/minggu + 2 jam/bulan**.
Ringan, tapi harus konsisten.

### 27.1 Rutinitas Harian (5 menit, hari kerja)

- [ ] Cek WhatsApp Business — balas lead dalam 15 menit (Tahap 17.4)
- [ ] Cek GBP — balas Q&A & ulasan baru (jika ada)
- [ ] Cek media sosial — balas komentar & DM
- [ ] Update label lead di WA Business (Tahap 8.5)

### 27.2 Rutinitas Mingguan (30 menit, setiap Senin)

- [ ] **GSC:** Indexing → Pages (ada error? indexed naik?) + Performance (catat impresi
      & posisi rata-rata minggu lalu)
- [ ] **GA4:** Acquisition (dari mana traffic?) + Conversions (berapa klik WA/survei?)
- [ ] **GBP:** balas ulasan & Q&A + 1 postingan mingguan + cek Insights
- [ ] **MedSos:** 3–5 postingan FB/IG + 3 Reels/TikTok + 1 YouTube Short
- [ ] **CRM:** update status lead di Google Sheet (Tahap 17.2)
- [ ] **Forward:** kirim pertanyaan pelanggan baru ke developer (bahan artikel)

### 27.3 Rutinitas Bulanan (2 jam, akhir bulan)

- [ ] **GSC bulanan:** catat metrik di Google Sheet (impresi, klik, CTR, posisi avg,
      URL terindeks). Bandingkan bulan lalu.
- [ ] **GA4 bulanan:** traffic, source, top pages, conversions. Bandingkan.
- [ ] **GBP bulanan:** total panggilan, klik website, rute, search direct. Catat.
- [ ] **Kompetitor monitoring** (Tahap 21.3) — 1 jam
- [ ] **Audit N-A-P** (Tahap 14.3) — cek 5–10 direktori
- [ ] **Update kalender konten** bulan depan — koordinasi dengan developer
- [ ] **Kirim laporan singkat** ke developer (GSC + GA4 + GBP metrics + lead count) —
      developer akan bantu analisa & rekomendasi
- [ ] **Audit internal:** cek broken link (developer bantu), 404 report GSC,
      Core Web Vitals (developer juga pantau)

### 27.4 Rutinitas Kuartalan (4 jam, tiap 3 bulan)

- [ ] **Strategi review:** evaluasi performa 3 bulan, ajust target
- [ ] **Audit konten:** artikel mana yang perlu update (lastmod refresh)?
- [ ] **Audit direktori:** apakah ada direktori baru? Inkonsistensi N-A-P?
- [ ] **Update company profile PDF & brosur** dengan proyek terbaru
- [ ] **Kompetitor deep dive:** analisis 3 kompetitor top, identifikasi gap
- [ ] **Tim sync:** rapat 1 jam dengan developer untuk roadmap konten 3 bulan ke depan

### 27.5 Template Laporan Bulanan (Kirim ke Developer)

```
LAPORAN SEO BULANAN — Jambi Solar Panel
Periode: [Bulan Tahun]

1. GOOGLE SEARCH CONSOLE
   - URL terindeks: [X/33]
   - Impresi bulan ini: [X] (bulan lalu: [Y])
   - Klik: [X] (bulan lalu: [Y])
   - CTR: [X%]
   - Posisi rata-rata: [X.X]
   - Top 5 keyword (impresi): [daftar]
   - Error/priority: [jika ada]

2. GOOGLE ANALYTICS 4
   - Total pengunjung: [X]
   - Sumber traffic: Organic Search [X%], Direct [X%], Social [X%], Referral [X%]
   - Top 5 halaman: [daftar]
   - Konversi (click WA): [X]
   - Konversi (form survei): [X]

3. GOOGLE BUSINESS PROFILE
   - Total panggilan: [X]
   - Klik website: [X]
   - Rute: [X]
   - Ulasan baru: [X] (total: [X], rata-rata: [X.X])
   - Q&A baru: [X]

4. LEADS & SALES
   - Lead baru bulan ini: [X]
   - Survei terjadwal: [X]
   - Closing: [X]
   - Revenue: [Rp X]
   - Lead source: WA [X], GBP [X], IG [X], FB [X], dst.

5. ISSUE / BLOCKER
   - [daftar issue yang butuh bantuan developer]

6. PRIORITAS BULAN DEPAN
   - [3 fokus utama]
```

---

## 28. KPI & TARGET PER BULAN (INDIKATIF, BUKAN JAMINAN)

### 28.1 Tabel Target KPI

| Metrik | Bulan 1 | Bulan 3 | Bulan 6 | Bulan 12 |
|--------|---------|---------|---------|----------|
| **Indexing** | | | | |
| URL terindeks (dari 33) | ≥ 25 | 33/33 | 33/33 | 33/33 + konten baru |
| Sitemap error | 0 | 0 | 0 | 0 |
| **Visibility** | | | | |
| Impresi pencarian/bulan | mulai tercatat | ≥ 1.000 | ≥ 3.000 | ≥ 10.000 |
| Klik/bulan | mulai tercatat | ≥ 50 | ≥ 200 | ≥ 500 |
| Posisi rata-rata keyword utama | mulai tercatat | 15–25 | 8–15 | 3–8 |
| **Local SEO** | | | | |
| Local Pack muncul | — | mulai muncul | stabil | top 3 "solar panel Jambi" |
| Ulasan Google | ≥ 3 | ≥ 10 | ≥ 20 | ≥ 35 |
| Rating rata-rata | — | ≥ 4.5 | ≥ 4.7 | ≥ 4.8 |
| Foto GBP | ≥ 15 | ≥ 25 | ≥ 40 | ≥ 60 |
| **Brand & Authority** | | | | |
| Backlink referral (referring domains) | 0 | ≥ 5 | ≥ 10 | ≥ 20 |
| Mention media lokal | 0 | 1–2 | 3–5 | 6–10 |
| Medsos follower (FB+IG+TikTok+YT) | 50–100 | 300–500 | 800–1.500 | 2.000–5.000 |
| **Conversion** | | | | |
| Leads WhatsApp | baseline awal | +20% | +50% | 2–3× |
| Survei terjadwal | — | +30% | +60% | 3× |
| Closing rate (survei→deal) | baseline | ≥ 35% | ≥ 40% | ≥ 45% |
| Revenue dari lead digital | — | mulai tercatat | ≥ 30% revenue | ≥ 50% revenue |

### 28.2 Kenapa "Indikatif" Bukan "Jaminan"

SEO dipengaruhi banyak variabel di luar kontrol kita:

- Kompetisi: ada installer baru masuk Jambi? Mereka juga ngomongin SEO.
- Algoritma Google: update algoritma bisa naikkan/turunkan ranking tiba-tiba.
- Perilaku pencari: tren pencarian bisa berubah.
- Konten kompetitor: mereka juga berkembang.

Karena itu, target di atas adalah **patokan arah**, bukan janji. Yang penting: trend
naik konsisten, bukan angka absolut per bulan.

### 28.3 Alat Gratis yang Dipakai

| Tool | Untuk | Frekuensi |
|------|-------|-----------|
| **Google Search Console** | Index, performa, keyword, error | Mingguan |
| **Google Analytics 4** | Traffic, behavior, conversion | Mingguan + Bulanan |
| **Google Business Profile dashboard** | Ulasan, panggilan, rute, search | Mingguan |
| **PageSpeed Insights** | Core Web Vitals (LCP, CLS, INP) | Bulanan |
| **Rich Results Test** | Validasi structured data | Saat update konten |
| **Google Trends** | Tren pencarian keyword | Bulanan |
| **Google Mobile-Friendly Test** | Cek mobile UX | Saat redesign |
| **Bing Webmaster Tools** | Bing performance | Bulanan |

> Hindari mengecek posisi keyword lewat penelusuran pribadi (hasilnya personal — Google
> tahu Anda lagi cari bisnis sendiri, akan ditampilkan lebih tinggi). Pakai data GSC
> yang akurat.

---

## 29. PEMBAGIAN TANGGUNG JAWAB OWNER vs DEVELOPER

### 29.1 Tabel Pembagian Detail

| Owner (hanya bisa dilakukan owner) | Developer (tinggal minta) |
|------------------------------------|---------------------------|
| **Akun & Verifikasi** | |
| Buat akun Google bisnis + verifikasi GSC | Pasang kode verifikasi GSC di website (menit) |
| Submit sitemap.xml di GSC + request indexing | Bantu prioritaskan URL untuk di-request |
| Setup Bing Webmaster Tools + submit sitemap | Pasang kode verifikasi Bing (menit) |
| Dapatkan akses GA4 dari developer | Invite owner ke GA4 + setup event konversi |
| **Google Business Profile** | |
| Buat & verifikasi GBP + isi N-A-P + foto + Q&A | Isi `sameAs` + integrasi URL GBP ke structured data |
| Rutinitas mingguan: postingan, balas review | Update schema AggregateRating setelah ulasan cukup |
| Mintak review ke pelanggan nyata | (tidak relevan — owner side) |
| **Bukti Proyek** | |
| Foto proyek + data + testimoni | Buat halaman studi kasus dari materi |
| Video testimoni & instalasi | Edit & upload ke YouTube + embed di website |
| Dokumen kredibilitas (sertifikat) | Tambahkan ke halaman tentang-kami |
| **Domain & Hosting** | |
| Keputusan & pembelian custom domain | Migrasi domain penuh (301, canonical, GSC change address) |
| Set env vars di Vercel (ADMIN_PASSWORD, dll.) | Setup Apps Script untuk sinkronisasi harga |
| **Konten** | |
| Forward pertanyaan pelanggan → bahan artikel | Artikel 1–2×/bulan + update harga saat tarif berubah |
| Kabari event/newsjacking (tarif PLN, regulasi) | Artikel newsjacking dalam 24–48 jam |
| Review & approve konten sebelum publish | Tulis, edit, publish, submit ke GSC |
| **Backlink & PR** | |
| Press release & kemitraan lokal | Update `sameAs` setiap ada mitra baru |
| Outreach ke media & mitra | Buat landing page per kota (Tahap 20) |
| Sponsorship event lokal | Coverage event di website + medsos |
| **MedSos** | |
| Setup & kelola FB/IG/TikTok/YouTube/LinkedIn | Embed video YouTube di website |
| Konten harian/mingguan | Optimasi video schema (Tahap 24.4) |
| **Tracking & CRM** | |
| Update lead di Google Sheet | Setup UTM tracking + event GA4 |
| Email signature dengan link website | (tidak relevan) |
| **Legal & Compliance** | |
| Approve Privacy Policy & Terms content | Buat halaman `/kebijakan-privasi` + `/syarat-ketentuan` |
| Setup Cookie Consent (opsi: owner pilih tool) | Pasang cookie consent banner + GA4 consent mode |
| Disclaimer kalkulator — approve wording | Tambah disclaimer di bawah hasil kalkulator |
| **Monitoring & Krisis** | |
| Rutinitas mingguan (GSC, GA4, GBP, medsos) | Laporan performa bulanan dari data GSC |
| Manajemen krisis reputasi | Teknis: hapus halaman jika perlu, redirect, dll. |
| Forward bug yang ditemukan | Perbaikan bug & maintenance teknis |

### 29.2 Kanal Koordinasi

- **WhatsApp utama** (cepat, harian): +62 813-2819-0707 → forward ke developer
- **Email** (untuk dokumen/press release/konten panjang): hello@jambisolarpanel.com
- **GitHub Issues** (untuk bug/feature request terstruktur): repo `desvandi/jambisolarpanel`
  → buat issue dengan label `seo`, `content`, atau `bug`
- **Google Sheet shared** (untuk kalender konten, CRM lead, laporan bulanan): buat
  shared folder Google Drive tim

### 29.3 SLA (Service Level Agreement) Indikatif

| Tipe request | Response developer |
|--------------|-------------------|
| Pasang kode verifikasi GSC/Bing | <4 jam (jam kerja) |
| Bug produksi (website down, form error) | <2 jam (jam kerja) / <8 jam (weekend/malam) |
| Artikel baru (dari trigger owner) | <7 hari |
| Update halaman (lastmod, foto baru) | <3 hari |
| Studi kasus baru (dari materi proyek) | <5 hari |
| Migrasi domain | <1 minggu (kompleks) |
| Konsultasi strategi | <48 jam |

---

## 30. LARANGAN KERAS (RINGKASAN — CETAK & TEMPEL)

### 30.1 Larangan SEO Black-Hat

1. ❌ **Beli backlink** murah / PBN / jasa "500 backlink Rp 500rb" → penalti Google
2. ❌ **Comment spam** / guestbook spam / forum spam
3. ❌ **Tukar link massal** dengan situs tak relevan (judi, dewasa, pharma)
4. ❌ **Cloaking** (tampilkan konten beda ke Google vs user)
5. ❌ **Hidden text** (text warna sama dengan background)
6. ❌ **Keyword stuffing** (ulang keyword 50× di satu halaman)
7. ❌ **Doorway pages** (banyak halaman tipis dengan ganti nama kota saja)
8. ❌ **Scrape & duplicate content** kompetitor
9. ❌ **Spin content** ( artikel di-rewrite otomatis)

### 30.2 Larangan Ulasan

10. ❌ Bayar/menjanjikan imbalan untuk ulasan
11. ❌ Buat ulasan sendiri dari akun milik kita / karyawan / keluarga
12. ❌ Minta massal ke non-pelanggan (grup WA teman, dll.)
13. ❌ Minta hanya ulasan positif (Google deteksi pola tidak natural)
14. ❌ Hapus ulasan negatif (kecuali spam) — flag ke Google, bukan hapus paksa
15. ❌ Buat multiple GBP untuk bisnis yang sama (satu bisnis = satu GBP)

### 30.3 Larangan Teknis & Brand

16. ❌ Mengubah domain/canonical tanpa prosedur migrasi developer (301 + GSC Change of
    Address). `jambisolarpanel.vercel.app` adalah domain resmi; `jayamandiri.co.id`
    **tidak dipakai**.
17. ❌ Mengubah angka di website secara manual tanpa developer (semua angka wajib dari
    model terpusat `methodology.ts` — disiplin hasil audit 8 putaran)
18. ❌ Menjanjikan "gratis" / angka ke pelanggan tanpa memperbarui website (klaim website
    sudah diaudit jujur — jangan dibuat tidak konsisten)
19. ❌ Mengubah struktur URL tanpa redirect 301 (404 = bocor link equity)
20. ❌ Login dashboard admin dari jaringan publik WiFi tanpa VPN
21. ❌ Share `ADMIN_PASSWORD` / `GOOGLE_SCRIPT_API_KEY` ke pihak di luar tim inti

### 30.4 Larangan Krisis

22. ❌ Balas ulasan negatif dengan emosi / menyerang pelanggan
23. ❌ Diam saja saat krisis (no response = sinyal tidak peduli)
24. ❌ Hapus komentar negatif di medsos (kecuali spam/threat)
25. ❌ Block pelanggan di WhatsApp/medsos saat ada konflik

---

## 31. TROUBLESHOOTING & FAQ OWNER (20+ SKENARIO UMUM)

### 31.1 Indexing & GSC

**Q: URL tidak terindeks setelah 2 minggu, kenapa?**
A: Buka GSC → URL Inspection → tempel URL → cek pesan error. Penyebab umum:
- "Crawled but not indexed" → minta developer periksa kualitas konten, internal linking
- "Discovered but not crawled" → biasanya tunggu, Google antri
- "Blocked by robots.txt" → minta developer cek robots.txt
- "Duplicate without canonical" → minta developer fix canonical tag

**Q: Saya bisa pakai akun Google pribadi atau harus buat baru?**
A: Sangat disarankan buat akun bisnis baru (`admin@jambisolarpanel.com` atau
`hello@...`). Akun pribadi bisa hilang/kompromi, dan transfer kepemilikan GSC/GA4/GBP
ribet. Kalau sudah pakai akun pribadi, pertimbangkan transfer sekarang (sebelum ranking
terbentuk).

**Q: Sitemap menunjukkan 33 URL tapi hanya 20 yang terindeks, apa salah?**
A: Tidak salah. Google butuh waktu. Lanjutkan request indexing manual (Tahap 4.3),
tunggu 2–4 minggu. Yang >4 minggu belum terindeks → kabari developer.

**Q: Apakah perlu submit sitemap ulang setiap ada konten baru?**
A: Tidak perlu. Sitemap auto-generate dengan lastmod disiplin, Google akan fetch ulang
otomatis. Cukup request indexing URL baru via URL Inspection.

### 31.2 Google Business Profile

**Q: Kartu verifikasi GBP belum datang setelah 3 minggu, apa harus lakukan?**
A: Buka GBP → "Verifikasi" → pilih "Tidak menerima kartu pos" → Google akan kirim
ulang atau tawarkan opsi video verification. Lakukan verifikasi video jika tersedia
(lebih cepat).

**Q: Bisakah punya 2 GBP untuk area berbeda (Jambi + Palembang)?**
A: Hanya jika punya kantor fisik nyata di kedua lokasi. Jika tidak, jangan buat GBP
palsu (penalti). Cukup 1 GBP dengan areaServed mencakup Palembang.

**Q: Pelanggan upload foto jelek di GBP saya, bisa dihapus?**
A: Tidak bisa dihapus oleh owner (kebijakan Google). Yang bisa dilakukan: unggah lebih
banyak foto bagus untuk "menenggelamkan" foto jelek, dan balas review-nya positif.

### 31.3 Ulasan

**Q: Saya dapat ulasan 1 bintang yang tidak fair, bisa hapus?**
A: Bisa flag ke Google sebagai "Tidak relevan" / "Spam" / "Konflik kepentingan" jika
memang tidak fair. Tapi Google jarang hapus. Yang lebih efektif: balas tenang + alihkan
ke offline (Tahap 26.1) + minta lebih banyak ulasan positif untuk menenggelamkan.

**Q: Berapa ulasan ideal per bulan?**
A: 3–5 ulasan/bulan asli lebih baik dari 50 ulasan/bulan palsu. Konsistensi > jumlah.

**Q: Apakah boleh minta ulasan dengan diskon?**
A: TIDAK. Diskon/imbalan untuk ulasan = pelanggaran berat kebijakan Google. Minta
ulasan setelah pelanggan puas, tanpa janji apa pun.

### 31.4 Konten & Website

**Q: Saya menemukan typo di website, bisa edit sendiri?**
A: Tidak. Semua perubahan konten website harus via developer (untuk jaga format,
schema, internal linking, lastmod). Kirim screenshot typo ke developer → fixed dalam
1–3 hari.

**Q: Pelanggan bilang kalkulator salah hitung, apa harus lakukan?**
A: Jangan ubah angka sendiri. Catat: input apa, output berapa, expected berapa. Kirim
ke developer untuk debug. Sementara, jelaskan ke pelanggan bahwa kalkulator adalah
estimasi (lihat disclaimer Tahap 16.4) dan tawarkan survei gratis untuk angka presisi.

**Q: Saya ingin tambah layanan baru (mis. surya water heater), bagaimana?**
A: Buka issue di GitHub dengan label `feature`. Diskusi dengan developer: feasibility,
content, schema, sitemap. Developer akan eksekusi dalam 1–2 minggu.

### 31.5 Backlink & Media

**Q: Ada yang tawarkan "Jasa SEO #1 Google dalam 1 bulan Rp 5 juta", boleh pakai?**
A: TIDAK. Jasa yang menjanjikan #1 dalam waktu singkat hampir pasti pakai black-hat
(ulasan palsu, PBN, spam). Akibatnya: ranking naik singkat, lalu penalti permanen.
Investasi yang benar: konten konsisten + ulasan asli + backlink otoritas (lambat tapi
berkelanjutan).

**Q: Media lokal minta "biaya pemberitaan" untuk muat berita, apakah wajar?**
A: Tidak ideal. Berita seharusnya dipublish karena nilai beritanya, bukan bayar. Tapi
jika media lokal Jambi memang menerapkan model "advertorial berbayar" (umum di
Indonesia), itu sah selaku advertorial — pastikan ada label "advertorial" atau
"sponsored" di artikel. Backlink dari advertorial kurang bernilai SEO (Google tahu),
tapi tetap ada expose brand.

**Q: Kompetitor copy-paste konten saya, apa harus lakukan?**
A: 1) Screenshot bukti + archive (Wayback Machine). 2) Kirim email sopan ke kompetitor
minta hapus. 3) Jika tidak respons, file DMCA takedown ke Google
(https://support.google.com/legal/troubleshooter/1114905). 4) Hubungi hosting
kompetitor. Jangan balas dendam dengan copy konten mereka.

### 31.6 MedSos & WhatsApp

**Q: Akun Instagram/Facebook saya di-hack, apa harus lakukan?**
A: 1) Recover via Facebook/Instagram recovery. 2) Aktifkan 2FA setelah recover.
3) Kabari pelanggan via website + WA broadcast. 4) Setup akun backup admin dari
awal (jangan single point of failure).

**Q: WhatsApp Business tidak bisa login di HP baru, apa salah?**
A: WA Business terikat ke nomor telepon. Pastikan nomor `+62 813-2819-0707` masih aktif
(SIM card masih aktif untuk terima SMS OTP). Jika pindah nomor, semua pelanggan harus
dikabari + link click-to-chat di website harus diupdate (developer).

### 31.7 Legal & Compliance

**Q: Saya dapat email "dugaan pelanggaran UU PDP" dari pihak ketiga, apa harus lakukan?**
A: Jangan panik. 1) Cek apakah email resmi (bukan phishing). 2) Jika valid, kumpulkan
bukti (data apa yang diklaim dilanggar). 3) Konsultasi developer + ahli hukum.
4) Jika memang ada pelanggaran, perbaiki segera + komunikasi ke pelanggan yang terdampak.

**Q: Apakah form survei di website wajib punya checkbox "Saya setuju data saya diproses"?**
A: YA, wajib sesuai UU PDP. Minta developer tambahkan checkbox consent + link ke
Privacy Policy di setiap form.

---

## 32. APENDIKS — TEMPLATE & RESOURCE

### 32.1 Template Caption Instagram (4 Variasi)

**A. Studi Kasus Proyek:**
```
[Before-After foto] 🌞

PROYEK SELESAI: PLTS [kapasitas] [hybrid/off-grid] di [lokasi]!

Pelanggan: Bapak [Nama], [jenis properti: rumah/kafe/gudang]
Tantangan: [1 kalimat tantangan unik, mis. "lokasi belum terjangkau PLN"]
Solusi: PLTS [kapasitas] dengan [komponen unggulan]
Hasil: [manfaat konkret, mis. "listrik 24 jam, hemat Rp X/bulan"]

Tim Jambi Solar Panel pasang dalam [durasi] hari, dengan garansi [X tahun]
panel + [Y tahun] inverter.

Mau survei gratis untuk rumah/bisnis Bapak/Ibu?
👉 WA: 0813-2819-0707 (link di bio)
👉 Kalkulator: jambisolarpanel.vercel.app/kalkulator-plts

#jambisolarpanel #panelsuryajambi #pltsjambi #solarpaneljambi #energiterbarukan
```

**B. Tips Edukasi:**
```
3 HAL yang harus dicek SEBELUM pasang panel surya: 👇

1️⃣ Kondisi atap — strukturnya kuat? Orientasi utara/selatan?
2️⃣ Kebutuhan listrik — berapa kWh/bulan? Cek tagihan PLN
3️⃣ Budget — paket mulai Rp 30jt (3kWp) sampai Rp 250jt+ (10kWp+)

Detail lengkap + kalkulator estimasi di:
jambisolarpanel.vercel.app/kalkulator-plts

Simpan post ini + share ke yang butuh! 🌞

#tipspanelsurya #pltsjambi #hematlistrik #jambisolarpanel
```

**C. Testimoni Pelanggan:**
```
"Sebelum pakai PLTS, tagihan listrik bulanan Rp 1,2jt.
Sekarang rata-rata Rp 200rb — saving 80%!"

— Bapak [Nama], pemilik rumah di [lokasi], pelanggan PLTS 5kWp hybrid.

Terima kasih Pak [Nama] sudah share pengalaman & izin tampilkan di sini. 🙏

Mau hemat listrik juga?
👉 WA: 0813-2819-0707 (link di bio)
👉 Survei gratis: jambisolarpanel.vercel.app/kalkulator-plts

#testimoni #pltsjambi #hematlistrik #panelsurya
```

**D. Promosi Survei Gratis:**
```
SURVEI GRATIS untuk rumah/bisnis di Jambi & sekitarnya! 🌞

Tim Jambi Solar Panel akan:
✅ Cek kondisi atap & shading
✅ Hitung kebutuhan listrik
✅ Rekomendasi kapasitas & jenis sistem
✅ Estimasi harga + ROI
✅ Tanya jawab tanpa paksaan

Tanpa biaya, tanpa komitmen. Hasil survei = laporan PDF.

Booking survei:
👉 WA: 0813-2819-0707 (klik link di bio)
👉 Form: jambisolarpanel.vercel.app (klik "Survei Gratis")

Limited slot minggu ini — 5 dari 10 tersisa.

#surveigratis #pltsjambi #panelsuryajambi #jambisolarpanel
```

### 32.2 Template WhatsApp Follow-up Lead

**Follow-up 1 (1 hari setelah lead masuk, belum respons):**
```
Selamat [pagi/siang], Bapak/Ibu [Nama].

Saya [Nama Owner] dari Jambi Solar Panel. Kemarin Bapak/Ibu kirim
pertanyaan tentang [sebutkan topik, mis. "PLTS untuk rumah"] lewat
[WA/website/IG].

Mohon maaf belum sempat balas cepat. Boleh saya bantu?

Untuk respons cepat, bisa langsung telepon/VC di jam kerja (08:00-17:00).
Atau kabari waktu yang nyaman untuk saya hubungi.

Terima kasih,
[Nama] — 0813-2819-0707
jambisolarpanel.vercel.app
```

**Follow-up 2 (3 hari setelah survei, belum putuskan):**
```
Selamat [pagi/siang] Bapak/Ibu [Nama].

Terima kasih sudah menyediakan waktu untuk survei [tanggal survei].
Berdasarkan survey, rekomendasi kami: PLTS [kapasitas] [hybrid/off-grid]
dengan estimasi [produksi kWh/hari] dan break even [X tahun].

Saya kirim quote resmi + detail komponen + garansi via email Bapak/Ibu
[email]. Mohon diperiksa.

Kalau ada pertanyaan atau ingin diskusi opsi lain (kapasitas beda,
komponen brand lain, paket sewa), jangan ragu WA/telepon saya.

Kalau Bapak/Ibu belum siap lanjut bulan ini, tidak masalah — kami simpan
quotenya 30 hari. Kalau butuh adjust, kabari saja.

Terima kasih sudah consider Jambi Solar Panel. 🌞
```

**Follow-up 3 (1 minggu setelah survei, closing reminder):**
```
Selamat [pagi/siang] Bapak/Ibu [Nama].

Saya follow-up singkat — apakah ada pertanyaan tentang quote yang saya
kirim? Atau ada yang mau didiskusikan?

Bulan ini kami ada [promo: mis. "free maintenance 1 tahun" / "free
smart monitoring" / "diskon Rp X"] untuk yang closing sebelum [tanggal].
Kalau Bapak/Ibu tertarik, kabari saya.

Kalau Bapak/Ibu sudah putuskan untuk tidak lanjut, terima kasih sudah
consider kami — jika ada yang bisa kami bantu di masa depan, jangan
ragu hubungi.

Salam,
[Nama] — 0813-2819-0707
```

### 32.3 Template Email Signature (HTML)

```html
<table style="font-family: Arial, sans-serif; font-size: 12px; color: #333;">
  <tr>
    <td style="padding-right: 12px; border-right: 2px solid #f59e0b;">
      <img src="https://jambisolarpanel.vercel.app/logo-jmse.png"
           width="60" alt="Jambi Solar Panel logo" />
    </td>
    <td style="padding-left: 12px;">
      <strong style="font-size: 14px; color: #1e3a8a;">[Nama Owner]</strong><br/>
      <span style="color: #666;">[Jabatan] · Jambi Solar Panel</span><br/>
      <span>📞 +62 813-2819-0707</span> ·
      <span>✉️ nama@jambisolarpanel.com</span><br/>
      <span>🌐 jambisolarpanel.vercel.app</span><br/>
      <span>📍 Tangkit Baru, Muaro Jambi, Jambi 36373</span><br/>
      <span style="color: #f59e0b;">🌞 Survei gratis: jambisolarpanel.vercel.app/kalkulator-plts</span>
    </td>
  </tr>
</table>
```

(Pakai di Gmail Settings → Signature → paste HTML via "Insert HTML" atau editor visual.)

### 32.4 Daftar Lengkap URL Website (33 URL) untuk Referensi

| # | URL | Kategori |
|---|-----|----------|
| 1 | `/` | Homepage |
| 2 | `/solar-home` | Layanan — PLTS Rumah |
| 3 | `/solar-commercial` | Layanan — PLTS Komersial |
| 4 | `/pjuts` | Layanan — Penerangan Jalan |
| 5 | `/solar-pump` | Layanan — Solar Pump |
| 6 | `/ev-charging` | Layanan — EV Charging |
| 7 | `/smart-iot` | Layanan — Smart Monitoring |
| 8 | `/maintenance` | Layanan — Maintenance |
| 9 | `/tender-procurement` | Layanan — Tender |
| 10 | `/sewa-plts` | Layanan — Sewa PLTS |
| 11 | `/tentang-kami` | Tentang Kami |
| 12 | `/proyek` | Portofolio Proyek |
| 13 | `/harga-panel-surya-jambi` | Harga |
| 14 | `/artikel` | Blog Index |
| 15 | `/faq` | FAQ |
| 16 | `/kalkulator-plts` | Kalkulator |
| 17 | `/istilah-plts` | Glossary |
| 18 | `/studi-kasus/villa-jambi-5-kwp-hybrid` | Studi Kasus 1 |
| 19 | `/studi-kasus/kebun-sawit-riau-10-kwp-off-grid` | Studi Kasus 2 |
| 20 | `/studi-kasus/gudang-palembang-50-kwp-hybrid` | Studi Kasus 3 |
| 21–33 | `/artikel/[slug]` (13 artikel) | Blog Articles |

### 32.5 Resource & Link Penting (Bookmark Semua)

**Google Tools:**
- Google Search Console: https://search.google.com/search-console
- Google Analytics 4: https://analytics.google.com
- Google Business Profile: https://www.google.com/business
- Google Rich Results Test: https://search.google.com/test/rich-results
- Google PageSpeed Insights: https://pagespeed.web.dev
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- Google Trends: https://trends.google.com
- Google UTM Builder: https://ga-dev-tools.google/ga4/campaign-url-builder/
- Google People Also Ask: di hasil pencarian Google

**Microsoft / Other Search:**
- Bing Webmaster Tools: https://www.bing.com/webmasters
- Bing Places for Business: https://www.bingplaces.com
- Apple Business Connect: https://business.apple.com

**Direktori & Sosial:**
- Indonetwork: https://www.indonetwork.co.id
- Businesslist: https://www.businesslist.co.id
- Indotrading: https://www.indotrading.com
- Ralali: https://www.ralali.com
- Facebook Business: https://business.facebook.com
- Instagram Business: https://business.instagram.com
- TikTok Business: https://www.tiktok.com/business
- YouTube Studio: https://studio.youtube.com
- LinkedIn Company: https://www.linkedin.com/company

**Tools SEO Gratis:**
- UberSuggest: https://neilpatel.com/ubersuggest
- Answer The Public: https://answerthepublic.com
- Also Asked: https://alsoasked.com
- Google Keyword Planner: https://ads.google.com/home/tools/keyword-planner
- Schema Markup Validator: https://validator.schema.org
- OpenLinkProfiler (backlink check): https://openlinkprofiler.org
- Wayback Machine (archive): https://web.archive.org

**QR Code Generator:**
- QR Code Generator: https://www.qr-code-generator.com
- GoQR: https://goqr.me

**Cookie Consent Tools:**
- Cookiebot (free sampai 500 pageview/bulan): https://www.cookiebot.com
- Osano: https://www.osano.com
- Termly: https://termly.io

**Vercel & Developer:**
- Vercel Dashboard: https://vercel.com
- Google Apps Script: https://script.google.com
- GitHub Repo: https://github.com/desvandi/jambisolarpanel

### 32.6 Glosarium Istilah SEO untuk Owner (Quick Reference)

| Istilah | Arti singkat |
|---------|--------------|
| **Index** | Google simpan halaman di database |
| **Crawl** | Googlebot mengunjungi halaman |
| **Sitemap.xml** | Daftar URL untuk Google |
| **Canonical** | Tag "URL resmi" |
| **Schema / Structured data** | Kode bantu Google paham konten |
| **Local Pack** | 3 bisnis di peta paling atas hasil pencarian |
| **N-A-P** | Name, Address, Phone — harus konsisten |
| **Backlink** | Link dari situs lain = rekomendasi |
| **Long-tail keyword** | Keyword panjang spesifik |
| **UTM parameter** | Tag URL untuk tracking sumber traffic |
| **Core Web Vitals** | Metrik kecepatan (LCP, CLS, INP) |
| **Rich Snippet** | Tampilan kaya di Google (bintang, FAQ) |
| **Featured Snippet** | "Position zero" di atas hasil pencarian |
| **E-E-A-T** | Experience, Expertise, Authoritativeness, Trust |
| **CTR** | Click-Through Rate (klik/impresi) |
| **Bounce rate** | % pengunjung langsung keluar |
| **Conversion** | Aksi yang dicari (klik WA, form, dll) |
| **GSC** | Google Search Console |
| **GA4** | Google Analytics 4 |
| **GBP** | Google Business Profile |
| **BWT** | Bing Webmaster Tools |

---

## PENUTUP

Dokumen ini dirancang sebagai **operating system** untuk owner menjalankan SEO Jambi
Solar Panel secara mandiri (dengan dukungan developer). Tidak semua tahap harus
dijalankan sempurna — konsistensi dalam 6–12 bulan lebih berharga dari kesempurnaan
dalam 1 bulan.

**Tiga prinsip penutup:**

1. **Konsistensi > Kesempurnaan.** 30 menit/minggu yang konsisten selama 12 bulan
   akan kalahkan 5 jam/minggu yang inconsistent. Jadikan rutinitas seperti gosok gigi.

2. **Jujur > Cepat.** Ulasan asli 3/bulan lebih baik dari 50 ulasan palsu. Backlink
   otoritas 5/bulan lebih baik dari 500 backlink murah. Google makin pintar deteksi
   manipulasi.

3. **Owner + Developer = Tim.** Owner pegang sisi bisnis (akun, ulasan, bukti proyek,
   kemitraan); developer pegang sisi teknis (kode, schema, performance). Komunikasi
   via WA/GitHub Issues terstruktur = hasil maksimal.

Selamat menjalankan. Jambi Solar Panel menuju halaman 1 Google untuk pencarian lokal. 🌞

---

*Dokumen v2.0 (restrukturisasi) dibuat 2026-09-30 sebagai kelanjutan v1.0 (2026-09-24).
Mencakup 15 area gap yang teridentifikasi setelah analisis website
(jambisolarpanel.vercel.app), sitemap (33 URL), JSON-LD, dan repository GitHub
(desvandi/jambisolarpanel). Bertujuan agar owner punya panduan lengkap dari setup awal
sampai advanced SEO, dengan pembagian fase bulanan yang realistis dan template siap
pakai untuk eksekusi harian.*
