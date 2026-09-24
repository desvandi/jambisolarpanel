"use client";

import { useState } from "react";
import {
  Droplets,
  MessageCircle,
  Crop,
  Gauge,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { solarPumpPackages, type SolarPumpPackage } from "@/lib/pricing-solarpump";

/**
 * "Pilih Solar Pump dalam 30 Detik" — mini-configurator.
 *
 * CLIENT ISLAND (interaktif) tapi TANPA framer-motion (pola R7/R8):
 * animasi entrance via CSS (.stagger-item), panel hasil memakai
 * .fade-in-quick yang berjalan saat elemen pertama kali muncul
 * (perilaku sama dengan initial/animate framer sebelumnya).
 *
 * Dua pertanyaan (luas lahan + kedalaman sumber air) → rekomendasi
 * paket dari data resmi pricing-solarpump.ts. Mapping:
 *   - luas lahan → HP (desc paket resmi memetakan hektar → paket)
 *   - kedalaman → validasi maxHead paket
 * Rekomendasi = paket terkecil yang memenuhi KEDUA syarat.
 */

interface LahanOption {
  id: string;
  label: string;
  /** HP minimum sesuai desc paket resmi */
  minHp: number;
  hint: string;
}

const LAHAN_OPTIONS: LahanOption[] = [
  { id: "rumah", label: "Rumah tangga / taman / kolam", minHp: 1, hint: "Kebutuhan air harian & irigasi < 1 ha" },
  { id: "kecil", label: "Lahan 1–2 hektar", minHp: 1.5, hint: "Sawit kecil, sayuran, peternakan menengah" },
  { id: "menengah", label: "Lahan 2–4 hektar", minHp: 2, hint: "Sawit, kebun karet skala menengah" },
  { id: "besar", label: "Lahan 5–10+ hektar", minHp: 3, hint: "Perkebunan besar, pabrik mini" },
];

const KEDALAMAN_OPTIONS = [
  { id: "30", label: "≤ 30 meter", head: 30 },
  { id: "45", label: "31–45 meter", head: 45 },
  { id: "60", label: "46–60 meter", head: 60 },
  { id: "80", label: "61–80 meter", head: 80 },
];

function parseHead(maxHead: string): number {
  return Number(maxHead.replace(/[^0-9]/g, "")) || 0;
}

function formatRpShort(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    return `Rp ${jt % 1 === 0 ? jt.toFixed(0) : jt.toFixed(1).replace(".", ",")}jt`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function SolarPumpConfigurator() {
  const [lahanId, setLahanId] = useState<string | null>(null);
  const [kedalamanId, setKedalamanId] = useState<string | null>(null);

  const lahan = LAHAN_OPTIONS.find((l) => l.id === lahanId) ?? null;
  const kedalaman = KEDALAMAN_OPTIONS.find((k) => k.id === kedalamanId) ?? null;

  // Paket terkecil yang memenuhi HP minimum DAN maxHead >= kedalaman.
  const recommended: SolarPumpPackage | null = lahan
    ? solarPumpPackages.find(
        (p) =>
          p.hp >= lahan.minHp &&
          (!kedalaman || parseHead(p.maxHead) >= kedalaman.head)
      ) ?? null // jika tak ada yang lolos head, tampilkan null → pesan survei
    : null;

  const headBlocked = lahan && kedalaman && !recommended;

  const waMessage = recommended
    ? `Halo PT. Jaya Mandiri Smart Energy, saya sudah mencoba pemilih Solar Pump: lahan "${lahan?.label}" dengan kedalaman sumber air ${kedalaman?.label ?? "-"}. Rekomendasi: ${recommended.name} (${formatRpShort(recommended.price)}). Mohon info lebih lanjut & jadwal survei gratis.`
    : `Halo PT. Jaya Mandiri Smart Energy, saya mencoba pemilih Solar Pump: lahan "${lahan?.label}" dengan kedalaman ${kedalaman?.label}, namun belum ada paket standar yang cocok. Mohon bantu hitung kebutuhan pompa saya.`;

  return (
    <section className="py-14 md:py-20" id="pemilih-pompa">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="stagger-item text-center mb-10"
          style={{ animationDelay: "0s" }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-sm font-semibold text-sky-600 bg-sky-600/10 rounded-full">
            <Droplets className="w-4 h-4" />
            Pilih Solar Pump dalam 30 Detik
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-3">
            Dua Pertanyaan, Satu Rekomendasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jawab dua hal sederhana tentang lahan dan sumber air Anda — kami
            tunjukkan titik awal pompa yang paling sesuai dari daftar resmi.
          </p>
        </div>

        <div
          className="stagger-item p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-8"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Q1 — Lahan */}
          <fieldset>
            <legend className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
              1 — Untuk apa pompa akan dipakai?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LAHAN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLahanId(opt.id)}
                  aria-pressed={lahanId === opt.id}
                  className={`wizard-option flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    lahanId === opt.id
                      ? "border-sky-500 bg-sky-500/10"
                      : "border-border bg-background hover:border-sky-500/40"
                  }`}
                >
                  <Crop className={`w-4 h-4 mt-0.5 flex-shrink-0 ${lahanId === opt.id ? "text-sky-600" : "text-muted-foreground"}`} />
                  <span>
                    <span className="block text-sm font-semibold text-navy dark:text-white">
                      {opt.label}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {opt.hint}
                    </span>
                  </span>
                  {lahanId === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600 ml-auto flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Q2 — Kedalaman */}
          <fieldset>
            <legend className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">
              2 — Berapa kedalaman sumber air (sumur/bore)?
            </legend>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {KEDALAMAN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setKedalamanId(opt.id)}
                  aria-pressed={kedalamanId === opt.id}
                  className={`wizard-option flex flex-col items-start gap-2 p-3.5 rounded-xl border text-left transition-all duration-200 ${
                    kedalamanId === opt.id
                      ? "border-sky-500 bg-sky-500/10"
                      : "border-border bg-background hover:border-sky-500/40"
                  }`}
                >
                  <Gauge className={`w-4 h-4 flex-shrink-0 ${kedalamanId === opt.id ? "text-sky-600" : "text-muted-foreground"}`} />
                  <span className="text-sm font-semibold text-navy dark:text-white">
                    {opt.label}
                  </span>
                  {kedalamanId === opt.id && (
                    <CheckCircle2 className="w-4 h-4 text-sky-600 self-end -mt-8" />
                  )}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Result */}
          {recommended ? (
            <div
              className="fade-in-quick p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent border border-sky-500/25"
              aria-live="polite"
            >
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">
                Rekomendasi Awal Anda
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xl sm:text-2xl font-extrabold text-navy dark:text-white">
                    {recommended.name}
                    <span className="ml-2 text-sm font-semibold text-sky-600">
                      {formatRpShort(recommended.price)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {recommended.pump} · {recommended.panel} · {recommended.controller}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Debit {recommended.flowRate} · Head maksimal{" "}
                    <strong className="text-navy dark:text-white">{recommended.maxHead}</strong>{" "}
                    (kedalaman Anda: {kedalaman?.label})
                  </p>
                </div>
                <a
                  href={`https://wa.me/6281328190707?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-sky-600/30 flex-shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  Konsultasikan Rekomendasi
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-sky-500/15">
                Rekomendasi ini titik awal — debit aktual, kondisi pipa, dan
                profil pemakaian diverifikasi tim saat survei gratis.
              </p>
            </div>
          ) : headBlocked ? (
            <div
              className="fade-in-quick p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30"
              aria-live="polite"
            >
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                Perlu Hitungan Khusus
              </p>
              <p className="text-sm text-foreground/90 leading-relaxed">
                Kombinasi lahan{" "}
                <strong className="text-navy dark:text-white">{lahan?.label}</strong>{" "}
                dengan kedalaman{" "}
                <strong className="text-navy dark:text-white">{kedalaman?.label}</strong>{" "}
                berada di luar paket standar. Pompa untuk head dalam dengan
                kapasitas besar perlu perhitungan insinyur — justru di sinilah
                desain custom kami dibutuhkan.
              </p>
              <a
                href={`https://wa.me/6281328190707?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                Minta Hitungan Custom
              </a>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2" aria-live="polite">
              {lahanId ? "Pilih kedalaman sumber air untuk melihat rekomendasi." : "Jawab pertanyaan pertama untuk melihat rekomendasi."}
            </p>
          )}
        </div>

        {/* Link ke daftar lengkap */}
        <p
          className="fade-in-item text-center text-sm text-muted-foreground mt-6"
          style={{ animationDelay: "0.3s" }}
        >
          Ingin membandingkan semua spesifikasi?{" "}
          <a href="#harga" className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline underline-offset-2">
            Lihat tabel 4 paket lengkap
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
