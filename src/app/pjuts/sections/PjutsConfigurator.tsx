"use client";

import { useState } from "react";
import {
  Lightbulb,
  MessageCircle,
  MapPin,
  Route,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { pjutsPackages, type PJUTSPackage } from "@/lib/pricing-pjuts";

/**
 * "Pilih Paket PJUTS dalam 30 Detik" — mini-configurator.
 *
 * CLIENT ISLAND (interaktif) tapi TANPA framer-motion (pola R7/R8):
 * animasi entrance via CSS (.stagger-item), panel hasil memakai
 * .fade-in-quick yang berjalan saat elemen pertama kali muncul
 * (perilaku sama dengan initial/animate framer sebelumnya).
 *
 * Dua pertanyaan sederhana → rekomendasi paket dari data resmi
 * pricing-pjuts.ts (desc tiap paket sudah memetakan area penggunaan).
 * Rekomendasi = paket terkecil yang cocok dengan area terpilih;
 * finalisasi tetap via survei gratis (disclaimer).
 */

interface AreaOption {
  id: string;
  label: string;
  /** wattage minimum yang sesuai (dari desc paket resmi) */
  minWattage: number;
  hint: string;
}

const AREA_OPTIONS: AreaOption[] = [
  { id: "gang", label: "Gang kecil / pekarangan", minWattage: 30, hint: "Pencahayaan fokus area terbatas" },
  { id: "jalan-kampung", label: "Jalan kampung / parkir mini", minWattage: 40, hint: "Jalan lingkungan, area parkir kecil" },
  { id: "jalan-desa", label: "Jalan desa / cluster", minWattage: 60, hint: "Jalan lingkungan perumahan & perkebunan" },
  { id: "jalan-utama", label: "Jalan utama desa / sawit", minWattage: 80, hint: "Jalan utama & kawasan industri ringan" },
  { id: "industri", label: "Kawasan industri / area publik", minWattage: 100, hint: "Jalan industri, area publik besar" },
  { id: "jalan-raya", label: "Jalan raya / lapangan", minWattage: 150, hint: "Cahaya terang merata area luas" },
];

const JARAK_OPTIONS = [
  { id: "pendek", label: "< 200 meter", countMin: 4, countMax: 8, hint: "≈ 4–8 titik lampu" },
  { id: "sedang", label: "200–500 meter", countMin: 8, countMax: 15, hint: "≈ 8–15 titik lampu" },
  { id: "panjang", label: "> 500 meter", countMin: 15, countMax: 25, hint: "≥ 15 titik lampu", openEnded: true },
];

function formatRpShort(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    return `Rp ${jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1).replace(".", ",")}jt`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function PjutsConfigurator() {
  const [areaId, setAreaId] = useState<string | null>(null);
  const [jarakId, setJarakId] = useState<string | null>(null);

  const area = AREA_OPTIONS.find((a) => a.id === areaId) ?? null;
  const jarak = JARAK_OPTIONS.find((j) => j.id === jarakId) ?? null;

  const recommended: PJUTSPackage | null = area
    ? pjutsPackages.find((p) => p.wattage >= area.minWattage) ??
      pjutsPackages[pjutsPackages.length - 1]
    : null;

  // Estimasi total = harga/titik × rentang jumlah titik PADA TOMBOL PILIHAN —
  // konsisten dengan hint "≈ N–M titik" yang terbaca di atas, bukan rumus tersembunyi.
  const estMin = recommended && jarak ? recommended.price * jarak.countMin : null;
  const estMax = recommended && jarak ? recommended.price * jarak.countMax : null;
  const estPoints = jarak
    ? `≈ ${jarak.countMin}–${jarak.countMax} titik · jarak antar tiang ideal 30–50 m`
    : "";

  const waMessage = recommended
    ? `Halo PT. Jaya Mandiri Smart Energy, saya sudah mencoba pemilih paket PJUTS: area "${area?.label}" dengan jarak ${jarak?.label ?? "-"}. Rekomendasi: ${recommended.name} (${formatRpShort(recommended.price)}/titik)${estMin && estMax ? `, estimasi kasar ${formatRpShort(estMin)} – ${formatRpShort(estMax)}${jarak?.openEnded ? "+" : ""}` : ""}. Mohon info lebih lanjut & jadwal survei gratis.`
    : "";

  return (
    <section className="py-14 md:py-20" id="pemilih-paket">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="stagger-item text-center mb-10"
          style={{ animationDelay: "0s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-emerald-600 bg-emerald-600/10 rounded-full">
            <Lightbulb className="w-4 h-4" />
            Pilih Paket PJUTS dalam 30 Detik
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-3">
            Dua Pertanyaan, Satu Rekomendasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jawab dua hal sederhana tentang lokasi Anda — kami tunjukkan titik
            awal paket yang paling sesuai dari daftar harga resmi.
          </p>
        </div>

        <div
          className="stagger-item p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-8"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Q1 — Area */}
          <fieldset>
            <legend className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
              1 — Di mana lampu akan dipasang?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AREA_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAreaId(opt.id)}
                  aria-pressed={areaId === opt.id}
                  className={`wizard-option flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    areaId === opt.id
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border bg-background hover:border-emerald-500/40"
                  }`}
                >
                  <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${areaId === opt.id ? "text-emerald-600" : "text-muted-foreground"}`} />
                  <span>
                    <span className="block text-sm font-semibold text-navy dark:text-white">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {opt.hint}
                    </span>
                  </span>
                  {areaId === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Q2 — Jarak */}
          <fieldset>
            <legend className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3">
              2 — Berapa perkiraan panjang ruas yang diterangi?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {JARAK_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setJarakId(opt.id)}
                  aria-pressed={jarakId === opt.id}
                  className={`wizard-option flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    jarakId === opt.id
                      ? "border-emerald-500 bg-emerald-500/10"
                      : "border-border bg-background hover:border-emerald-500/40"
                  }`}
                >
                  <Route className={`w-4 h-4 mt-0.5 flex-shrink-0 ${jarakId === opt.id ? "text-emerald-600" : "text-muted-foreground"}`} />
                  <span>
                    <span className="block text-sm font-semibold text-navy dark:text-white">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {opt.hint}
                    </span>
                  </span>
                  {jarakId === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Result */}
          {recommended && area ? (
            <div
              className="fade-in-quick p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25"
              aria-live="polite"
            >
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                Rekomendasi Awal Anda
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">
                    {recommended.name}
                    <span className="ml-2 text-sm font-semibold text-emerald-600">
                      {formatRpShort(recommended.price)}/titik
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {recommended.panel} · {recommended.battery} · {recommended.pole}
                  </p>
                  {estMin && estMax ? (
                    <p className="text-sm text-muted-foreground mt-2">
                      Estimasi kasar untuk {jarak?.label}:{" "}
                      <strong className="text-navy dark:text-white">
                        {formatRpShort(estMin)} – {formatRpShort(estMax)}
                        {jarak?.openEnded ? "+" : ""}
                      </strong>{" "}
                      ({estPoints})
                    </p>
                  ) : null}
                </div>
                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/30 flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasikan Rekomendasi
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-emerald-500/15">
                Rekomendasi ini titik awal — jarak antar tiang, tinggi tiang,
                dan kondisi lingkungan diverifikasi tim saat survei gratis.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2" aria-live="polite">
              {areaId ? "Pilih perkiraan panjang ruas untuk melihat estimasi total." : "Jawab pertanyaan pertama untuk melihat rekomendasi."}
            </p>
          )}
        </div>

        {/* Link ke daftar lengkap */}
        <p
          className="fade-in-item text-center text-sm text-muted-foreground mt-6"
          style={{ animationDelay: "0.3s" }}
        >
          Ingin membandingkan semua spesifikasi?{" "}
          <a href="#harga" className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline underline-offset-2">
            Lihat tabel 6 paket lengkap
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
