import Link from "next/link";
import { Calculator, FlaskConical, ChevronDown } from "lucide-react";
import {
  CORE_ASSUMPTIONS,
  SAVINGS_FORMULA,
  CLAIM_DISCLAIMERS,
  SAVINGS_RANGES,
} from "@/lib/methodology";

interface MethodologyNoteProps {
  /**
   * Varian konten: rumah (residential) atau bisnis (commercial).
   * Menentukan penjelasan rentang penghematan yang dirender.
   */
  variant: "residential" | "commercial";
  /** Sub-judul opsional; default mengikuti varian. */
  title?: string;
  /** id anchor opsional. */
  id?: string;
}

/**
 * "Bagaimana angka ini dihitung?" — panel metodologi terbuka-tutup
 * (native <details>, TANPA JavaScript) yang menjelaskan asumsi,
 * rumus, dan batasan setiap klaim penghematan/ROI di halaman layanan.
 *
 * Tujuan E-E-A-T: klaim kuantitatif menjadi dapat direproduksi
 * pembaca, bukan sekadar angka pemasaran.
 * Server component murni — aman untuk SEO (konten ada di HTML awal).
 */
export function MethodologyNote({ variant, title, id }: MethodologyNoteProps) {
  const range = SAVINGS_RANGES[variant];
  const isResidential = variant === "residential";

  return (
    <details
      id={id}
      className="methodology-note group rounded-2xl border border-solar/25 bg-solar/[0.04] open:bg-solar/[0.06] transition-colors"
    >
      <summary className="flex items-center gap-3 px-5 sm:px-6 py-4 cursor-pointer select-none list-none">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-solar/10 border border-solar/20 flex-shrink-0">
          <FlaskConical className="w-4.5 h-4.5 text-solar" />
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-bold text-navy dark:text-white">
            {title || "Bagaimana angka penghematan ini dihitung?"}
          </span>
          <span className="block text-xs text-muted-foreground mt-0.5">
            Asumsi, rumus, dan batasan — transparan agar bisa Anda cek sendiri
          </span>
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
      </summary>

      <div className="px-5 sm:px-6 pb-6 pt-1 space-y-5">
        {/* Rentang & kapan tercapai */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Potensi lebih rendah ({range.low}%)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Bila {range.lowWhen}.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Potensi tertinggi ({range.high}%)
            </p>
            <p className="text-sm text-foreground/90 leading-relaxed">
              Bila {range.highWhen}.
            </p>
          </div>
        </div>

        {/* Asumsi */}
        <div>
          <p className="text-xs font-bold text-solar uppercase tracking-wider mb-2.5">
            Asumsi perhitungan
          </p>
          <dl className="rounded-xl bg-card border border-border divide-y divide-border">
            {CORE_ASSUMPTIONS.map((a) => (
              <div
                key={a.label}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-2.5"
              >
                <dt className="text-xs font-semibold text-muted-foreground sm:w-44 flex-shrink-0">
                  {a.label}
                </dt>
                <dd className="text-sm text-foreground/90 leading-relaxed">
                  {a.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Rumus */}
        <div className="p-4 rounded-xl bg-navy/[0.04] dark:bg-white/[0.04] border border-border">
          <p className="text-xs font-bold text-solar uppercase tracking-wider mb-1.5">
            Rumus
          </p>
          <p className="text-sm font-mono text-foreground/90 leading-relaxed">
            {SAVINGS_FORMULA}
          </p>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {isResidential
              ? "Contoh: sistem 3 kWp menghasilkan ± 9 kWh/hari → ± 270 kWh/bulan × Rp 1.444,7 ≈ Rp 390 ribu/bulan yang tidak Anda bayar ke PLN — seberapa besar persentase dari tagihan Anda bergantung pada profil beban di atas."
              : "Contoh: sistem 10 kWp menghasilkan ± 30 kWh/hari → ± 900 kWh/bulan × Rp 1.444,7 ≈ Rp 1,3 juta/bulan — bisnis dengan operasional siang menyerap sebagian besar produksi ini secara langsung."}
          </p>
        </div>

        {/* Batasan */}
        <div>
          <p className="text-xs font-bold text-solar uppercase tracking-wider mb-2">
            Catatan &amp; batasan
          </p>
          <ul className="space-y-1.5">
            {CLAIM_DISCLAIMERS.map((d) => (
              <li
                key={d}
                className="flex gap-2 text-xs text-muted-foreground leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1 h-1 rounded-full bg-solar flex-shrink-0"
                />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA kalkulator */}
        <p className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Calculator className="w-3.5 h-3.5 text-solar" />
          Ingin angka untuk profil beban Anda sendiri? Coba
          <Link
            href="/kalkulator-plts"
            className="font-semibold text-solar hover:underline underline-offset-2"
          >
            Kalkulator PLTS kami
          </Link>
          — atau minta simulasi detail saat survei gratis.
        </p>
      </div>
    </details>
  );
}
