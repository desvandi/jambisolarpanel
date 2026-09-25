# 📈 PANDUAN SEO UNTUK OWNER — jambisolarpanel.vercel.app

> **Target: Halaman 1 posisi atas Google untuk pencarian lokal** — "solar panel Jambi",
> "pasang panel surya Jambi", "harga panel surya Jambi", "PLTS Jambi", "sewa PLTS Jambi",
> "solar pump Jambi", "PJUTS Jambi", "EV charger Jambi".
>
> Dokumen ini berisi **pekerjaan yang HANYA BISA dilakukan owner** (pemilik usaha).
> Sisi website/teknis sudah selesai dan lolos audit 8 putaran — tugas owner sekarang
> adalah membuat Google menampilkan situs ini kepada pencari di Jambi.

**Dibuat:** 2026-09-24 · **Basis data:** hasil audit internal Round 1–8 · **Bertanggung jawab teknis:** developer (Z.ai)

---

## 0. RINGKASAN EKSEKUTIF (baca ini dulu — 2 menit)

**Kondisi website sekarang:** Fondasi teknis SEO **sudah 100% selesai** — 33 halaman
terindex-ready (sitemap, canonical, structured data, mobile-friendly, konten jujur &
teraudit, kalkulator interaktif, 13 artikel, 3 studi kasus, FAQ, glossary). Yang belum
terjadi hanyalah: **Google belum diajak mengenal situs ini.**

**Analogi:** Website ini seperti toko yang sudah rapi, pajangan lengkap, papan nama bagus —
tapi belum terdaftar di Google Maps dan belum pernah dikabari ke orang. Panduan ini adalah
cara "mendaftarkan toko" dan "membangun reputasi" agar Google percaya untuk menempatkan
toko ini di baris depan.

**3 kunci sukses terbesar (urutan kepentingan):**

| # | Kunci | Porsi pengaruh | Siapa yang kerjakan |
|---|-------|----------------|---------------------|
| 1 | **Google Business Profile (GBP) + ulasan asli** | ★★★★★ — penentu #1 untuk pencarian lokal | **OWNER** |
| 2 | **Indexing via Search Console (GSC)** | ★★★★★ — tanpa ini semua sia-sia | **OWNER** (5–10 menit setup) |
| 3 | **Bukti proyek nyata** (foto, data, testimoni) | ★★★★ — kepercayaan Google & calon pembeli | **OWNER** |

> ⚠️ **Kejujuran:** SEO bukan hasil instan. Untuk niche lokal kompetisi rendah–menengah
> seperti Jambi, timeline indikatif: **bulan 1** = terindeks penuh · **bulan 2–3** = mulai
> muncul halaman 2–3 · **bulan 3–6** = halaman 1 untuk kata kunci panjang (long-tail) ·
> **bulan 6–12** = berpotensi posisi atas untuk kata kunci utama — **jika** ulasan, bukti
> proyek, dan konten rutin dijalankan konsisten. Angka ini indikatif, bukan jaminan.

---

## 1. YANG SUDAH SELESAI DI SISI WEBSITE (tidak perlu dikerjakan owner)

✅ **33 URL siap index** — 9 halaman layanan, homepage, tentang-kami, proyek, 3 studi kasus,
harga, 13 artikel, FAQ, kalkulator, istilah PLTS
✅ **Sitemap.xml otomatis** (dengan lastmod disiplin) + robots.txt benar
✅ **Canonical tunggal** ke `https://jambisolarpanel.vercel.app` (keputusan final — jangan pernah diubah ke domain lain tanpa prosedur migrasi)
✅ **Structured data JSON-LD**: LocalBusiness, FAQ, BreadcrumbList, Article (divalidasi Rich Results Test)
✅ **Konten jujur & teraudit 8 putaran** — semua angka simulasi berlabel, model finansial reproducible
✅ **Mobile-friendly & cepat** (Core Web Vitals siap)
✅ **Halaman harga & kalkulator** — aset terkuat karena mayoritas pencari lokal mencari HARGA
✅ **Dashboard admin terlindungi** (Basic Auth)

---

## 2. TAHAP 1 — GOOGLE SEARCH CONSOLE (WAJIB, minggu ke-1, ±30 menit)

Google Search Console (GSC) = alat resmi Google untuk memantau & meminta index. **Tanpa ini,
website bisa berminggu-minggu bahkan berbulan-bulan tidak terindeks.**

### Langkah demi langkah

1. **Buka** https://search.google.com/search-console → login dengan akun Google
   (usahakan akun bisnis yang dipakai jangka panjang, bukan akun pribadi yang bisa hilang).
2. Klik **"Tambahkan properti" (Add a property)** → pilih **"Prefiks URL" (URL prefix)** →
   ketik: `https://jambisolarpanel.vercel.app`
3. Pilih metode verifikasi **"Tag HTML" (HTML tag)** → Google menampilkan kode seperti:
   ```html
   <meta name="google-site-verification" content="KODE_UNIK_DISINI" />
   ```
4. **Salin kode `KODE_UNIK` tersebut → kirim via WhatsApp ke developer** → developer
   memasangkannya ke website dalam hitungan menit → klik **"Verifikasi" (Verify)** di GSC.
   *(Alternatif tanpa kirim-kirim: pilih verifikasi via Google Analytics jika sudah punya GA.)*
5. Setelah terverifikasi, **kirim email undangan akses** ke developer (Settings → Users and
   permissions → Add user → role "Full") agar developer bisa membantu memantau & request index.
6. **Kirim sitemap:** menu **Sitemaps** → isi `sitemap.xml` → **Submit** → akan terbaca
   33 URL.
7. **Request indexing manual** (Google membatasi ±10 URL/hari — lakukan 3–4 hari berturut):
   menu **URL Inspection** → tempel URL → **Test Live URL** → tunggu "URL is available to
   Google" → **Request Indexing**. Urutan prioritas (kata kunci komersial dulu):

   | Hari | URL yang dimintakan index |
   |------|---------------------------|
   | 1 | `/` · `/solar-home` · `/solar-commercial` · `/harga-panel-surya-jambi` · `/proyek` · `/sewa-plts` · `/kalkulator-plts` · `/tentang-kami` · `/faq` · `/artikel` |
   | 2 | `/ev-charging` · `/solar-pump` · `/pjuts` · `/smart-iot` · `/maintenance` · `/tender-procurement` · `/istilah-plts` · 3 studi kasus · 2 artikel harga |
   | 3–4 | Sisa artikel (lihat daftar lengkap di `sitemap.xml`) |

8. **Rutinitas mingguan 5 menit** (mulai minggu ke-2): buka GSC →
   - **Indexing → Pages**: pastikan "Indexed" naik menuju 33/33, tidak ada error.
   - **Performance**: catat impresi & posisi rata-rata (laporkan ke developer bulanan).
   - Jika ada URL valid tapi >2 minggu tidak terindeks → kabari developer.

### Validasi structured data (sekali saja, 10 menit)
Buka https://search.google.com/test/rich-results → tempel `https://jambisolarpanel.vercel.app/faq`
dan `/harga-panel-surya-jambi` → pastikan tidak ada error → screenshot simpan.

---

## 3. TAHAP 2 — GOOGLE BUSINESS PROFILE (PALING KRITIS, minggu ke-1–2)

> Pencarian "… di Jambi" menampilkan **Local Pack** (peta + 3 bisnis teratas) di posisi
> paling atas hasil pencarian — **DI ATAS hasil organik biasa**. Masuk 3 besar local pack
> = jalan tercepat ke "halaman 1 urutan atas".

### Langkah demi langkah

1. **Buat profil:** https://www.google.com/business → "Kelola sekarang" → login akun Google bisnis.
2. **Isi data PERSIS sama dengan website** (Google mencocokkan N-A-P: Name, Address, Phone):

   | Field | Isi (WAJIB identik dengan website) |
   |-------|-------------------------------------|
   | Nama bisnis | **Jambi Solar Panel** (nama brand) — nama legal PT boleh di kolom tambahan |
   | Kategori utama | **Kontraktor Energi Surya / Solar Energy Contractor** |
   | Kategori tambahan | Pemasok Peralatan Energi Surya · Layanan Listrik · Stasiun Pengisian Kendaraan Listrik |
   | Alamat | Tangkit Baru Residence Blok D15, Jl. H. Saing, RT.001/RW.001, Desa Tangkit Baru, Kec. Sungai Gelam, Kab. Muaro Jambi, Jambi 36373 |
   | Telepon | +62 813-2819-0707 (sama persis, format internasional) |
   | Jam buka | Senin–Sabtu, 08:00–17:00 (Minggu tutup — samakan dengan footer website) |
   | Website | https://jambisolarpanel.vercel.app |
   | Area layanan | Jambi (utama), lalu: Muaro Jambi, Batanghari, Sarolangun, Tebo, dan area lain yang benar-benar dilayani |

3. **Verifikasi alamat** (biasanya kartu pos dari Google ke alamat kantor, 1–2 minggu;
   atau verifikasi video jika opsi tersedia). Lakukan SEGERA — profil tak terverifikasi
   tidak tampil di pencarian.
4. **Unggah minimal 10–15 foto asli:** kantor/toko, tim kerja (pakai APD), instalasi
   atap, panel & inverter, hasil pemasangan. Foto asli >> foto stok. Tambah 2–4 foto
   baru setiap bulan.
5. **Isi daftar layanan** (copy-paste dari website): PLTS Rumah (Solar Home) · PLTS
   Komersial & Industri · PJUTS (Penerangan Jalan) · Solar Pump · EV Charging · Smart
   IoT Monitoring · Maintenance · Sewa PLTS · Tender & Procurement — masing-masing
   dengan deskripsi singkat.
6. **Isi atribut & deskripsi profil** (±750 karakter): sebutkan natural kata kunci —
   "jasa pasang panel surya di Jambi dan sekitarnya, PLTS hybrid & off-grid, solar pump…".
7. **Aktifkan pesan/chat** dan isi **Q&A** (tanya-jawab sendiri sebagai pemilik usaha
   dengan jawaban dari FAQ website — 5–10 pertanyaan umum: harga, survei gratis, garansi).
8. **Setelah live → kirim URL profil GBP ke developer** agar ditautkan ke website
   (`sameAs` structured data — saat ini sengaja kosong menunggu profil resmi ini).

### Rutinitas GBP (15 menit/minggu)
- Posting update GBP 1×/minggu (proyek berjalan, tips hemat listrik, promo survei gratis).
- Balas SEMUA ulasan (positif & negatif) dalam 1×24 jam.
- Balas pertanyaan Q&A baru.

---

## 4. TAHAP 3 — ULASAN GOOGLE ASLI (bulan 1–3, berkelanjutan)

Ulasan Google = sinyal kepercayaan terkuat untuk ranking lokal **dan** alasan utama
calon pelanggan menelepon. Target: **3 ulasan bulan pertama → 10 di bulan ke-3 →
20+ di bulan ke-6.**

### Cara yang BENAR (sesuai kebijakan Google)
1. **Hanya minta ke pelanggan nyata** yang proyeknya benar-benar kami kerjakan.
2. Waktu terbaik meminta: 1–2 minggu setelah instalasi selesai, saat pelanggan puas
   (mis. saat follow-up "apakah produksi listriknya sesuai harapan?").
3. Cara meminta: WhatsApp dengan **link langsung** ke form ulasan
   (dari GBP: Home → "Minta ulasan" / Request reviews → salin link) + kalimat sederhana:
   > "Bapak/Ibu, kalau puas dengan pemasangan panel suryanya, tolong bantu beri ulasan
   > Google di link ini — sangat membantu usaha kecil kami. Terima kasih! 🙏"
4. **Minta menyebut layanan & lokasi secara natural** ("pasang panel surya di rumah saya
   di Jambi…") — ulasan yang mengandung kata kunci membantu ranking.
5. **DILARANG:** membayar/menjanjikan imbalan untuk ulasan, membuat ulasan sendiri dari
   akun milik kita, meminta massal ke orang yang bukan pelanggan → pelanggaran berat
   kebijakan Google, profil bisa diturunkan/disembunyikan.

### Respond template (contoh, jangan copy persis)
- Ulasan positif: ucapkan terima kasih + sebut layanan ("Terima kasih Pak Budi atas
  kepercayaan memasang PLTS hybrid 5,2 kWp di rumah Bapak di Jambi…")
- Ulasan negatif: minta maaf + alihkan ke penyelesaian offline + balas setelah selesai.

---

## 5. TAHAP 4 — BUKTI PROYEK NYATA / E-E-A-T (bulan 1–2, lalu tiap proyek selesai)

> Google menilai **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust). Untuk
> bisnis instalasi, bukti terkuat adalah **dokumentasi proyek nyata** — hal yang tidak
> bisa dibuat-buat oleh kompetitor dan tidak bisa dikerjakan developer.

### A. Foto dokumentasi (kirim 5–10 foto per proyek ke developer)
Yang perlu diambil di SETIAP proyek:
- [ ] Kondisi atap **sebelum** pemasangan
- [ ] Proses pemasangan (tim kerja, rangka, kabel — dengan APD)
- [ ] **Hasil akhir** dari beberapa sudut (panel rapi di atap)
- [ ] Inverter, MCB/panel distribusi, instalasi rapi
- [ ] Tim bersama pelanggan di depan rumah (dengan izin)
- [ ] Layar monitoring/ aplikasi produksi listrik (jika ada)

**Kualitas:** siang hari, tidak blur, orientasi lanskap lebih baik, min 1080px. KIRIM
FILE ASLI (jangan lewat WhatsApp kalau bisa terkompres — gunakan Google Drive).

### B. Data proyek (untuk halaman studi kasus baru — konten paling kuat untuk SEO)
- [ ] Kapasitas (kWp), lokasi (kecamatan saja boleh, mis. "rumah di Talang Mandi"),
      jenis sistem (hybrid/off-grid)
- [ ] Estimasi produksi harian (dari data monitoring jika ada)
- [ ] Tagihan listrik sebelum–sesudah (foto tagihan, coret data pribadi — **dengan izin pelanggan**)
- [ ] Testimoni tertulis 2–4 kalimat + nama + sebutan (mis. "Budi S., pemilik rumah, Jambi")
  **dengan izin tertulis** (cukup chat WhatsApp "boleh kami tampilkan testimoninya di website?")

Developer akan mengubah materi ini menjadi: halaman studi kasus baru + update halaman
proyek + postingan GBP + artikel — semuanya gratis, tinggal kirim.

### C. Dokumen kredibilitas (foto/scan untuk halaman tentang-kami)
- [ ] Sertifikat/SIU/izin usaha yang dimiliki (jika ada)
- [ ] Sertifikat pelatihan teknisi (jika ada)
- [ ] Dokumen tender/kontrak yang boleh dipublikasikan (coret data sensitif)

---

## 6. TAHAP 5 — KEPUTUSAN CUSTOM DOMAIN (minggu ke-1–2, SEBELUM bangun backlink)

**Situasi:** Situs sekarang memakai `jambisolarpanel.vercel.app` (subdomain Vercel).
Secara SEO teknis ini **valid dan bisa ranking**. Namun untuk jangka panjang, domain
sendiri (mis. `jambisolarpanel.com`) memberi: brand lebih kredibel (terutama untuk
tender/PEMDA/korporat), CTR lebih baik, dan aset yang tidak bergantung pada satu platform.

**Kapan harus memutuskan: SEKARANG, minggu ke-1–2** — sebelum backlink dan ranking mulai
dibangun. Migrasi setelah ranking terbentuk = selalu ada risiko penurunan sementara.

| Opsi | Biaya | Konsekuensi |
|------|-------|-------------|
| **A. Beli domain sendiri** (disarankan untuk serius jangka panjang) | ±Rp 150–300rb/tahun (.com/.id via registrar resmi) | Developer urus penuh: sambungkan ke Vercel, redirect 301, update canonical/sitemap/structured data, Change of Address di GSC. Peringkat lama dipindahkan oleh Google dalam 2–6 minggu. |
| **B. Tetap vercel.app** (boleh untuk mulai) | Rp 0 | Tetap bisa ranking untuk niche lokal. Keputusan bisa direvisi nanti, tapi semakin lama semakin berisiko dipindahkan. |

> **Cara memutuskan cepat:** kalau target 3 tahun ke depan ingin jadi installer PLTS
> terbesar di Jambi & menerima tender → beli domain sekarang. Kalau masih uji coba pasar →
> vercel.app dulu tidak masalah.

---

## 7. TAHAP 6 — KONTEN RUTIN (mulai bulan ke-1, developer-side, owner cukup "trigger")

Konsistensi konten = sinyal situs hidup. Rencana yang sudah disiapkan developer:

| Frekuensi | Konten | Trigger dari owner |
|-----------|--------|--------------------|
| 1–2×/bulan | Artikel baru long-tail lokal (mis. "solar panel untuk rumah di Muaro Jambi", "berapa biaya PLTS untuk kafe di Jambi") | — (developer proaktif) |
| Setiap proyek selesai | Studi kasus baru dari materi foto + data (Tahap 4) | Kirim materi |
| Saat tarif PLN berubah / komponen naik | Update halaman harga + artikel harga (lastmod) | Kabari developer |
| Saat ada pelanggan bertanya hal baru | Update FAQ / artikel baru | Teruskan pertanyaan pelanggan |
| Saat regulasi/kebijakan PLTS berubah | Artikel newsjacking lokal | Kabari developer |

**Owner TIDAK perlu menulis** — cukup teruskan pertanyaan pelanggan nyata ke developer
(pertanyaan nyata = sumber artikel terbaik, jawabannya bisa dipercaya).

---

## 8. TAHAP 7 — BACKLINK & OTORITAS LOKAL (mulai bulan ke-2)

Backlink = "suara rekomendasi" dari website lain. Untuk SEO lokal, **kualitas & relevansi
lokal >> jumlah**. 5 backlink lokal bermutu > 500 backlink murah.

### Prioritas (urut dari termudah)
1. **Direktori bisnis (gratis, 1–2 jam total):** Bing Places · Indonetwork · Businesslist.co ·
   Indotrading · Ralali — N-A-P harus persis sama dengan GBP (lihat Tahap 2). *(Tetap gunakan
   URL website resmi — bukan jayamandiri.co.id.)*
2. **Media lokal Jambi** (paling kuat untuk otoritas lokal): tawarkan cerita proyek yang
   "punya nilai berita" — mis. solar pump bantu petani/desa, PJUTS untuk jalan desa, proyek
   CSR. Kirim press release singkat + foto ke redaksi (Jambi Ekspres, Tribune Jambi,
   Jambi Independent, Metro Jambi). Berita 1 kali = backlink + kepercayaan +Expose brand.
3. **Kemitraan yang saling menautkan:** dealer mobil listrik (konten EV charging),
   pengembang perumahan baru (paket "rumah siap PLTS"), toko material bangunan besar.
4. **Keanggotaan resmi:** KADIN/Asosiasi industri yang diikuti (profil anggota biasanya
   bisa memuat link website).
5. **Media sosial bisnis** (Facebook Page & Instagram bisnis — bukan akun pribadi):
   aktif 1–3 postingan/minggu, tautkan ke website. Setelah live → kirim URL profilnya ke
   developer untuk diisi ke `sameAs` (entity consistency).

### ❌ JANGAN PERNAH
- Membeli backlink murah/PBN/jasa "500 backlink Rp 500rb" → penalti Google
- Comment spam / guestbook spam
- Menukar link massal dengan situs tak relevan

---

## 9. TAHAP 8 — SETUP DASHER VERCEL (10 menit, sekali saja)

Tiga environment variable di Vercel yang hanya bisa diset owner (untuk dashboard
kalibrasi harga internal):

1. Login https://vercel.com → pilih project `jambisolarpanel` → **Settings → Environment Variables**.
2. Tambahkan:
   - `ADMIN_PASSWORD` = kata sandi kuat untuk halaman `/kalibrasi-harga` (simpan baik-baik)
   - `GOOGLE_SCRIPT_URL` = URL Apps Script untuk sinkronisasi harga (buat di
     https://script.google.com — panduan terpisah dari developer bila diperlukan)
   - `GOOGLE_SCRIPT_API_KEY` = kunci rahasia untuk API di atas
3. Klik **Save** → otomatis ter-deploy ulang. Selesai.

---

## 10. PEMANTAUAN & TARGET (KPI)

### Rutinitas owner (total ±30 menit/minggu)
- [ ] GSC: Indexing → Pages (indexed naik? ada error?) + Performance (catat angka)
- [ ] GBP: balas ulasan & Q&A + 1 postingan mingguan
- [ ] Forward pertanyaan pelanggan baru ke developer (bahan artikel)

### Target indikatif per bulan (bukan jaminan — patokan arah, bukan janji)

| Metrik | Bulan 1 | Bulan 3 | Bulan 6 | Bulan 12 |
|--------|---------|---------|---------|----------|
| URL terindeks (dari 33) | ≥ 25 | 33/33 | 33/33 | 33/33 + konten baru |
| Ulasan Google | ≥ 3 | ≥ 10 | ≥ 20 | ≥ 35 |
| Impresi pencarian/bulan | mulai tercatat | ≥ 1.000 | ≥ 3.000 | ≥ 10.000 |
| Posisi rata-rata keyword utama | mulai tercatat | 15–25 | 8–15 | 3–8 |
| Local Pack (peta) | — | mulai muncul | stabil | top 3 untuk "solar panel Jambi" |
| Leads WhatsApp | baseline awal | +20% | +50% | 2–3× |

### Alat gratis yang dipakai
- **Google Search Console** (wajib) — index, performa, kata kunci
- **Google Business Profile dashboard** — ulasan, panggilan, rute
- **PageSpeed Insights** (sesekali, developer juga memantau) — kecepatan
- Hindari mengecek posisi keyword lewat penelusuran pribadi (hasilnya personal) —
  pakai data GSC yang akurat.

---

## 11. LARANGAN KERAS (ringkasan)

1. ❌ Beli backlink / jasa SEO "instan" yang menjanjikan posisi #1 dalam sebulan
2. ❌ Ulasan palsu / bayar ulasan / minta ulasan ke non-pelanggan
3. ❌ Menyalin konten kompetitor atau pasang konten duplikat
4. ❌ Mengubah domain/canonical tanpa prosedur migrasi developer (301 + GSC)
   — `jambisolarpanel.vercel.app` adalah domain resmi; `jayamandiri.co.id` **tidak dipakai**
5. ❌ Mengubah angka di website secara manual tanpa developer (semua angka wajib dari
   model terpusat `methodology.ts` — disiplin hasil audit 8 putaran)
6. ❌ Menjanjikan "gratis" ke pelanggan tanpa memperbarui website (klaim website sudah
   diaudit jujur — jangan dibuat tidak konsisten)

---

## 12. CHECKLIST MINGGU PERTAMA (cetak/screenshot ini)

| # | Tugas | Est. waktu | Status |
|---|-------|-----------|--------|
| 1 | Buat properti GSC + kirim kode verifikasi HTML ke developer + verifikasi | 15 mnt | ☐ |
| 2 | Submit sitemap.xml di GSC | 2 mnt | ☐ |
| 3 | Request indexing 10 URL prioritas (hari-1 list di Tahap 2) | 10 mnt | ☐ |
| 4 | Undang developer sebagai user GSC (role Full) | 2 mnt | ☐ |
| 5 | Buat Google Business Profile + isi N-A-P persis + unggah 10 foto | 45 mnt | ☐ |
| 6 | Ajukan verifikasi alamat GBP (kartu pos/video) | 5 mnt | ☐ |
| 7 | Minta ulasan Google ke 3 pelanggan terakhir (link review GBP) | 15 mnt | ☐ |
| 8 | **Putuskan custom domain** (beli / tetap vercel.app) → kabari developer | 10 mnt | ☐ |
| 9 | Set `ADMIN_PASSWORD` (+ 2 var lain) di Vercel | 10 mnt | ☐ |
| 10 | Kumpulkan & kirim foto + data proyek terbaru ke developer | 30 mnt | ☐ |

> Selesaikan #1–#5 dulu — itu yang menentukan kapan Google mulai menampilkan situs ini.

---

## 13. PEMBAGIAN TANGGUNG JAWAB OWNER vs DEVELOPER

| Owner (hanya bisa dilakukan owner) | Developer (tinggal minta) |
|------------------------------------|---------------------------|
| Akun Google + verifikasi GSC + submit sitemap | Pasang kode verifikasi GSC di website (menit) |
| Buat & verifikasi GBP + foto + postingan mingguan | Isi `sameAs` + integrasi URL GBP ke structured data |
| Minta & balas ulasan pelanggan nyata | Buat halaman studi kasus dari materi foto/data |
| Kirim foto + data + testimoni proyek | Artikel 1–2×/bulan + update harga saat tarif berubah |
| Keputusan & pembelian custom domain | Migrasi domain penuh (301, canonical, GSC change address) |
| Set env vars di Vercel | Setup Google Analytics 4 (bila diminta) |
| Press release & kemitraan lokal | Laporan performa bulanan dari data GSC |
| Teruskan pertanyaan pelanggan → bahan FAQ/artikel | Perbaikan bug & maintenance teknis |

**Kanal koordinasi:** WhatsApp ke developer (+62 813-2819-0707 → forward ke dev) atau
issue di GitHub repo `desvandi/jambisolarpanel`.

---

*Dokumen dibuat sebagai bagian dari kelanjutan proyek jambisolarpanel — sesuai arahan
audit Round 8: setelah fondasi teknis selesai, fokus berpindah ke indexing (GSC),
sinyal lokal (GBP + ulasan), dan bukti proyek nyata — BUKAN menambah fitur SEO baru.*
