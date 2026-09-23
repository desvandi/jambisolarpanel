"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Lightbulb,
  Tv,
  Refrigerator,
  WashingMachine,
  AirVent,
  Droplets,
  Plug,
  Minus,
  Plus,
  RotateCcw,
  Zap,
  Sun,
  Package,
  MessageCircle,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  calculatePackages,
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings,
  loadRemotePricing,
  formatRpShort,
  PLN_TARIFF_DEFAULT,
} from "@/lib/pricing";
import type { CalculatedPackage } from "@/lib/pricing";

/**
 * Kalkulator kebutuhan daya — dari daftar perangkat listrik.
 *
 * SUMBER DATA (E-E-A-T): daya acuan tiap perangkat DAN contoh default
 * diambil persis dari artikel Knowledge Center kami
 * "Cara Menentukan Kapasitas PLTS" (audit beban, tabel contoh rumah Jambi)
 * — bukan angka karangan. Rentang watt = rentang pada tabel artikel.
 */

const PSH_JAMBI = 3.75;
const EFISIENSI = 0.8;

interface ApplianceSpec {
  id: string;
  name: string;
  icon: LucideIcon;
  /** Rentang daya dari tabel artikel (W). */
  minW: number;
  maxW: number;
  /** Daya contoh dari tabel audit artikel (W). */
  defaultW: number;
  /** Jumlah unit pada contoh artikel. */
  defaultQty: number;
  /** Jam pemakaian efektif per hari pada contoh artikel. */
  defaultHours: number;
  hint: string;
}

const APPLIANCES: ApplianceSpec[] = [
  { id: "lampu", name: "Lampu LED", icon: Lightbulb, minW: 5, maxW: 15, defaultW: 10, defaultQty: 10, defaultHours: 5, hint: "5–15 W" },
  { id: "kulkas", name: "Kulkas", icon: Refrigerator, minW: 100, maxW: 150, defaultW: 150, defaultQty: 1, defaultHours: 8, hint: "100–150 W · kompresor efektif ±8 jam" },
  { id: "ac", name: "AC 1 PK", icon: AirVent, minW: 750, maxW: 750, defaultW: 750, defaultQty: 1, defaultHours: 4, hint: "±750 W · AC inverter bisa lebih hemat" },
  { id: "tv", name: "TV LED", icon: Tv, minW: 60, maxW: 100, defaultW: 100, defaultQty: 1, defaultHours: 3, hint: "60–100 W" },
  { id: "pompa", name: "Pompa Air", icon: Droplets, minW: 250, maxW: 750, defaultW: 300, defaultQty: 1, defaultHours: 1, hint: "250–750 W · tergantung daya pompa" },
  { id: "mesincuci", name: "Mesin Cuci", icon: WashingMachine, minW: 350, maxW: 500, defaultW: 400, defaultQty: 0, defaultHours: 0.5, hint: "350–500 W · tidak ada di contoh artikel — tambahkan jika dipakai" },
  { id: "lainnya", name: "Lainnya (charger, kipas, router)", icon: Plug, minW: 10, maxW: 200, defaultW: 70, defaultQty: 1, defaultHours: 10, hint: "±70 W pada contoh artikel" },
];

interface Row {
  watt: number;
  qty: number;
  hours: number;
}

function defaultRows(): Record<string, Row> {
  const rows: Record<string, Row> = {};
  for (const a of APPLIANCES) {
    rows[a.id] = { watt: a.defaultW, qty: a.defaultQty, hours: a.defaultHours };
  }
  return rows;
}

export function KebutuhanCalculator() {
  const [rows, setRows] = useState<Record<string, Row>>(defaultRows);
  const [packages, setPackages] = useState<CalculatedPackage[]>(() =>
    calculatePackages(defaultComponentPrices, defaultInverterPrices, defaultSettings)
  );

  // Muat harga aktual: remote (Sheets) → localStorage → default. Pola yang sama
  // dengan SavingsCalculator agar kedua kalkulator di halaman ini SELALU sepakat.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const remote = await loadRemotePricing();
        if (cancelled || !remote) return;
        const pkgs = calculatePackages(remote.components, remote.inverters, remote.settings);
        if (pkgs.length > 0) setPackages(pkgs);
      } catch {
        /* coba fallback lokal */
      }
      if (cancelled) return;
      try {
        const local = calculatePackages();
        if (local.length > 0) setPackages(local);
      } catch {
        /* pertahankan default */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      try {
        const local = calculatePackages();
        if (local.length > 0) setPackages(local);
      } catch {
        /* pertahankan paket saat ini */
      }
    };
    window.addEventListener("jmse-pricing-updated", handler);
    return () => window.removeEventListener("jmse-pricing-updated", handler);
  }, []);

  const { dailyWh, simultaneousW } = useMemo(() => {
    let wh = 0;
    let w = 0;
    for (const a of APPLIANCES) {
      const r = rows[a.id];
      if (!r || r.qty <= 0) continue;
      w += r.watt * r.qty;
      if (r.hours > 0) wh += r.watt * r.qty * r.hours;
    }
    return { dailyWh: wh, simultaneousW: w };
  }, [rows]);

  const dailyKwh = dailyWh / 1000;
  const kwpNeeded = dailyKwh / (PSH_JAMBI * EFISIENSI);
  const equivalentBill = dailyKwh * 30 * PLN_TARIFF_DEFAULT;

  const matched: CalculatedPackage | null = useMemo(() => {
    if (kwpNeeded <= 0) return null;
    return packages.find((p) => p.kWp >= kwpNeeded - 1e-9) ?? null;
  }, [packages, kwpNeeded]);

  const update = (id: string, patch: Partial<Row>) =>
    setRows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const reset = () => setRows(defaultRows());

  const waMessage = `Halo PT. Jaya Mandiri Smart Energy, saya sudah mencoba kalkulator perangkat di website anda:\n- Total kebutuhan: ${dailyKwh.toFixed(1).replace(".", ",")} kWh/hari (beban simultan ±${simultaneousW.toLocaleString("id-ID")} W)\n- Kebutuhan panel: ${kwpNeeded.toFixed(1).replace(".", ",")} kWp${matched ? `\n- Paket terdekat: ${matched.name} — ${matched.priceFormatted}` : "\n- Kebutuhan melebihi paket standar — minta penawaran custom"}\nMohon info lebih lanjut & jadwal survei gratis. Terima kasih.`;

  const fmtNum = (v: number, dec = 1) => v.toFixed(dec).replace(".", ",");

  return (
    <section
      aria-labelledby="kebutuhan-heading"
      className="py-14 md:py-20 border-t border-border/60"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8">
          <span className="section-badge">Cara Kedua Menghitung</span>
          <h2
            id="kebutuhan-heading"
            className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white mb-3"
          >
            Hitung dari Daftar Perangkat Listrik
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tidak hafal tagihan bulanan? Susun daftar perangkat di rumah atau
            usaha Anda — kalkulator ini memakai{" "}
            <Link
              href="/artikel/cara-menentukan-kapasitas-plts"
              className="text-solar font-semibold hover:underline underline-offset-2"
            >
              data audit beban dari artikel teknis kami
            </Link>
            , lalu mencocokkan hasilnya dengan daftar paket resmi.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-8 space-y-5">
          {/* Baris perangkat */}
          <div className="space-y-3">
            {APPLIANCES.map((a) => {
              const r = rows[a.id];
              const rowWh = r.watt * r.qty * r.hours;
              const wattFixed = a.minW === a.maxW;
              const inactive = r.qty === 0;
              return (
                <div
                  key={a.id}
                  className={`grid grid-cols-1 md:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))_auto] gap-3 md:gap-4 md:items-center p-4 rounded-xl border border-border/70 bg-background/40 appliance-row ${inactive ? "opacity-60" : ""}`}
                >
                  {/* Nama + daya acuan */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0">
                      <a.icon className="w-[18px] h-[18px] text-solar" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-navy dark:text-white truncate">
                        {a.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {a.hint}
                      </p>
                    </div>
                  </div>

                  {/* Daya (W) */}
                  <div>
                    <label
                      htmlFor={`watt-${a.id}`}
                      className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1"
                    >
                      Daya (W)
                    </label>
                    {wattFixed ? (
                      <div className="h-9 px-3 rounded-lg bg-muted/60 border border-border flex items-center text-sm font-semibold text-navy dark:text-white">
                        {r.watt} W
                      </div>
                    ) : (
                      <input
                        id={`watt-${a.id}`}
                        type="number"
                        inputMode="numeric"
                        min={a.minW}
                        max={a.maxW}
                        step={10}
                        value={r.watt}
                        onChange={(e) =>
                          update(a.id, {
                            watt: Math.min(
                              a.maxW,
                              Math.max(a.minW, Number(e.target.value) || a.minW)
                            ),
                          })
                        }
                        className="w-full md:w-24 h-9 px-3 rounded-lg bg-background border border-border text-sm font-semibold text-navy dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar"
                      />
                    )}
                  </div>

                  {/* Jumlah unit */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Jumlah
                    </span>
                    <div className="inline-flex items-center rounded-lg border border-border bg-muted/30 overflow-hidden stepper-group">
                      <button
                        type="button"
                        aria-label={`Kurangi jumlah ${a.name}`}
                        onClick={() =>
                          update(a.id, { qty: Math.max(0, r.qty - 1) })
                        }
                        className="w-9 h-9 flex items-center justify-center bg-muted/60 hover:bg-solar/15 hover:text-solar text-navy dark:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar focus-visible:ring-inset"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className="w-10 h-9 flex items-center justify-center text-sm font-bold text-navy dark:text-white tabular-nums"
                        aria-live="polite"
                      >
                        {r.qty}
                      </span>
                      <button
                        type="button"
                        aria-label={`Tambah jumlah ${a.name}`}
                        onClick={() =>
                          update(a.id, { qty: Math.min(30, r.qty + 1) })
                        }
                        className="w-9 h-9 flex items-center justify-center bg-muted/60 hover:bg-solar/15 hover:text-solar text-navy dark:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar focus-visible:ring-inset"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Jam/hari */}
                  <div>
                    <label
                      htmlFor={`jam-${a.id}`}
                      className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1"
                    >
                      Jam/hari
                    </label>
                    <input
                      id={`jam-${a.id}`}
                      type="number"
                      inputMode="decimal"
                      min={0}
                      max={24}
                      step={0.5}
                      value={r.hours}
                      onChange={(e) =>
                        update(a.id, {
                          hours: Math.min(
                            24,
                            Math.max(0, Number(e.target.value) || 0)
                          ),
                        })
                      }
                      className="w-full md:w-20 h-9 px-3 rounded-lg bg-background border border-border text-sm font-semibold text-navy dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar"
                    />
                  </div>

                  {/* Energi baris */}
                  <div className="md:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 md:hidden">
                      Energi/hari
                    </p>
                    <p
                      className={`text-sm font-bold tabular-nums ${
                        inactive ? "text-muted-foreground" : "text-solar"
                      }`}
                    >
                      {inactive
                        ? "—"
                        : `${(rowWh / 1000).toFixed(2).replace(".", ",")} kWh`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-solar transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Kembalikan contoh artikel (6 kWh/hari)
            </button>
            <p className="text-[11px] text-muted-foreground">
              Daya &amp; contoh bersumber dari tabel audit beban artikel kami.
            </p>
          </div>

          {/* Hasil */}
          <div
            aria-live="polite"
            className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/15"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-solar/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-solar" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Kebutuhan Energi
                  </p>
                  <p className="text-xl font-extrabold text-navy dark:text-white">
                    {fmtNum(dailyKwh)} kWh/hari
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Beban simultan maks ±{simultaneousW.toLocaleString("id-ID")} W
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sun className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Panel Dibutuhkan
                  </p>
                  <p className="text-xl font-extrabold text-navy dark:text-white">
                    {fmtNum(kwpNeeded)} kWp
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    ÷ PSH 3,75 × efisiensi 80%
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy/5 dark:bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package className="w-4 h-4 text-navy dark:text-white" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Paket Terdekat
                  </p>
                  {matched ? (
                    <>
                      <p className="text-base font-extrabold text-solar leading-tight">
                        {matched.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {matched.kWp} kWp · {matched.priceFormatted}
                      </p>
                    </>
                  ) : (
                    <p className="text-base font-extrabold text-navy dark:text-white leading-tight">
                      Sistem custom
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Jembatan ke kalkulator tagihan + edukasi inverter */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-background/60 border border-border/70 text-sm text-muted-foreground leading-relaxed mb-5">
              <Info className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
              <p>
                {dailyKwh > 0 ? (
                  <>
                    Kebutuhan ini setara tagihan ±{" "}
                    <strong className="text-navy dark:text-white">
                      {formatRpShort(equivalentBill)}/bulan
                    </strong>{" "}
                    — cocokkan angkanya dengan kalkulator tagihan di atas untuk
                    validasi silang.
                  </>
                ) : (
                  <>
                    Atur jam pemakaian atau jumlah perangkat di atas untuk
                    memulai perhitungan.
                  </>
                )}{" "}
                Beban simultan menentukan kapasitas{" "}
                <Link
                  href="/istilah-plts#inverter-hybrid"
                  className="text-solar font-semibold hover:underline underline-offset-2"
                >
                  inverter
                </Link>
                , bukan jumlah panel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="flex-1 text-xs text-muted-foreground leading-relaxed">
                Hasil bersifat titik awal — tim insinyur kami menghitung ulang
                dari audit beban nyata saat survei gratis. Kebutuhan di atas
                paket standar terbesar? Kami merancang sistem custom.
              </p>
              <a
                href={`https://wa.me/6281328190707?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-solar hover:bg-solar-dark text-white font-bold text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30 btn-shine flex-shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                Konsultasikan Kebutuhan Saya
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
