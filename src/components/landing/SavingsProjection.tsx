"use client";

import { useId, useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { formatRpShort } from "@/lib/pricing";

/**
 * Grafik proyeksi penghematan 25 tahun (SVG murni — tanpa dependensi chart).
 *
 * KONSISTENSI ANGKA (penting):
 * Deret kumulatif memakai rumus yang SAMA dengan calculateROI() di
 * src/lib/pricing.ts — hemat tahun-y = base × (1+r)^(y-1) — sehingga:
 * - tahun garis balik modal = roi.roiYearsWithIncrease (kartu "Estimasi ROI")
 * - net di tahun ke-25       = roi.return25Year (kartu "Return 25 Tahun")
 * Grafik dan kartu hasil tidak akan menampilkan dua angka berbeda.
 */

interface SavingsProjectionProps {
  /** Harga investasi paket (Rp). */
  price: number;
  /** Penghematan tahun pertama pada tarif hari ini (Rp/tahun). */
  annualSavingsBase: number;
  /** Kenaikan tarif PLN per tahun, mis. 0.06. */
  increaseRate: number;
  /** Tahun balik modal dari calculateROI — dipakai sebagai penanda grafik. */
  breakevenYear: number;
}

const YEARS = 25;
const W = 760;
const H = 340;
const PAD_L = 64;
const PAD_R = 14;
const PAD_T = 48;
const PAD_B = 30;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

function fmtSigned(value: number): string {
  if (Math.abs(value) < 1000) return "Rp 0";
  const sign = value < 0 ? "−" : "+";
  return `${sign}${formatRpShort(Math.abs(value))}`;
}

/** Label sumbu-Y: negatif diberi tanda minus, positif polos. */
function fmtAxis(value: number): string {
  if (Math.abs(value) < 1000) return "Rp 0";
  return value < 0 ? `−${formatRpShort(Math.abs(value))}` : formatRpShort(value);
}

export function SavingsProjection({
  price,
  annualSavingsBase,
  increaseRate,
  breakevenYear,
}: SavingsProjectionProps) {
  const gradientId = useId().replace(/[^a-zA-Z0-9-]/g, "");
  const [hovered, setHovered] = useState<number | null>(null);

  const series = useMemo(() => {
    let cum = 0;
    const points: { year: number; cum: number; net: number }[] = [];
    for (let y = 1; y <= YEARS; y++) {
      cum += annualSavingsBase * Math.pow(1 + increaseRate, y - 1);
      points.push({ year: y, cum, net: cum - price });
    }
    return points;
  }, [annualSavingsBase, increaseRate, price]);

  const net25 = series[series.length - 1]?.net ?? 0;
  const cum25 = series[series.length - 1]?.cum ?? 0;

  // Skala vertikal — beri ruang naik untuk label balik modal.
  const rawMin = Math.min(0, series[0]?.net ?? 0);
  const rawMax = net25;
  const range = Math.max(rawMax - rawMin, 1);
  const vMin = rawMin - range * 0.04;
  const vMax = rawMax + range * 0.1;

  const yToPx = (v: number) => PAD_T + ((vMax - v) / (vMax - vMin)) * PLOT_H;
  const zeroY = yToPx(0);
  const slot = PLOT_W / YEARS;
  const barW = slot * 0.62;
  const xCenter = (year: number) => PAD_L + (year - 0.5) * slot;

  // 4 garis skala horizontal merata + garis nol terpisah (lebih tegas).
  const ticks = useMemo(
    () => Array.from({ length: 4 }, (_, i) => vMin + ((vMax - vMin) / 3) * i),
    [vMin, vMax]
  );

  const showBreakeven = breakevenYear >= 1 && breakevenYear <= YEARS;
  const bx = xCenter(Math.min(breakevenYear, YEARS));
  // Label pill dijaga tetap di dalam kanvas.
  const pillW = 150;
  const pillX = Math.min(Math.max(bx - pillW / 2, PAD_L - 10), W - PAD_R - pillW + 10);

  const hoveredPoint = hovered ? series[hovered - 1] : null;
  // Jepit posisi agar tooltip batang pertama/terakhir tidak keluar layar mobile.
  const tooltipLeft = hovered
    ? Math.min(Math.max((xCenter(hovered) / W) * 100, 20), 80)
    : 0;
  const tooltipTop = hovered
    ? Math.min(Math.max((yToPx(series[hovered - 1].net) / H) * 100, 14), 78)
    : 0;

  const ariaLabel =
    `Grafik batang proyeksi penghematan 25 tahun. Investasi ${formatRpShort(price)}. ` +
    `Balik modal sekitar tahun ${breakevenYear}. ` +
    `Total penghematan kumulatif 25 tahun ${formatRpShort(cum25)}, ` +
    `keuntungan bersih sekitar ${formatRpShort(net25)}.`;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white/40 dark:bg-navy/40 border border-border/60 backdrop-blur-sm mb-6">
      <div className="flex items-start gap-2.5 mb-1.5">
        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <TrendingUp className="w-4 h-4 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-navy dark:text-white text-base">
            Kapan Anda Balik Modal?
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
            Posisi net kumulatif (total hemat − investasi) tiap tahun, sepanjang
            masa garansi panel 25 tahun. Arahkan kursor ke batang untuk detail.
          </p>
        </div>
        {/* Legenda warna batang */}
        <div className="hidden sm:flex flex-col gap-1.5 flex-shrink-0 pt-1">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: "var(--muted-foreground)", opacity: 0.5 }}
              aria-hidden="true"
            />
            Belum balik modal
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ background: "var(--color-solar)" }}
              aria-hidden="true"
            />
            Sudah untung
          </span>
        </div>
      </div>

      <figure
        className="relative m-0 chart-fade"
        role="img"
        aria-label={ariaLabel}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto text-navy dark:text-white select-none"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${gradientId}-up`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-solar-light)" />
              <stop offset="100%" stopColor="var(--color-solar-dark)" />
            </linearGradient>
          </defs>

          {/* Garis skala + label angka */}
          <g className="text-muted-foreground" fontSize="10" fontWeight="600">
            {ticks.map((t, i) =>
              Math.abs(t) < range / 200 ? null : (
                <g key={i}>
                  <line
                    x1={PAD_L}
                    x2={W - PAD_R}
                    y1={yToPx(t)}
                    y2={yToPx(t)}
                    stroke="currentColor"
                    strokeOpacity="0.15"
                  />
                  <text
                    x={PAD_L - 8}
                    y={yToPx(t) + 3}
                    textAnchor="end"
                    fill="currentColor"
                  >
                    {fmtAxis(t)}
                  </text>
                </g>
              )
            )}
          </g>

          {/* Garis nol — titik balik modal */}
          <g className="text-muted-foreground">
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={zeroY}
              y2={zeroY}
              stroke="currentColor"
              strokeOpacity="0.5"
              strokeWidth="1.5"
            />
            <text
              x={PAD_L - 8}
              y={zeroY + 3}
              textAnchor="end"
              fill="currentColor"
              fontSize="10"
              fontWeight="700"
            >
              Rp 0
            </text>
          </g>

          {/* Label sumbu-X */}
          <g className="text-muted-foreground" fontSize="10">
            {[5, 10, 15, 20, 25].map((y) => (
              <text
                key={y}
                x={xCenter(y)}
                y={H - 10}
                textAnchor="middle"
                fill="currentColor"
              >
                Thn {y}
              </text>
            ))}
          </g>

          {/* Kolom sorot belakang batang aktif */}
          {hovered && (
            <rect
              x={PAD_L + (hovered - 1) * slot}
              y={PAD_T - 6}
              width={slot}
              height={PLOT_H + 12}
              fill="currentColor"
              fillOpacity="0.05"
              rx="4"
            />
          )}

          {/* Batang: di bawah nol (masih mengembalikan investasi) vs di atas nol */}
          {series.map((p) => {
            const top = Math.min(yToPx(p.net), zeroY);
            const height = Math.max(2, Math.abs(yToPx(p.net) - zeroY));
            const isHover = hovered === p.year;
            return (
              <rect
                key={p.year}
                x={xCenter(p.year) - barW / 2}
                y={top}
                width={barW}
                height={height}
                rx="3"
                fill={
                  p.net < 0
                    ? "var(--muted-foreground)"
                    : `url(#${gradientId}-up)`
                }
                fillOpacity={
                  hovered === null
                    ? p.net < 0
                      ? 0.5
                      : 0.92
                    : isHover
                      ? 1
                      : p.net < 0
                        ? 0.3
                        : 0.55
                }
                onMouseEnter={() => setHovered(p.year)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", transition: "fill-opacity 0.2s" }}
              />
            );
          })}

          {/* Penanda balik modal */}
          {showBreakeven && (
            <g>
              <line
                x1={bx}
                x2={bx}
                y1={PAD_T + 24}
                y2={PAD_T + PLOT_H}
                stroke="var(--color-gold)"
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              <rect
                x={pillX}
                y={PAD_T - 18}
                width={pillW}
                height={24}
                rx="12"
                fill="var(--color-gold)"
              />
              <text
                x={pillX + pillW / 2}
                y={PAD_T - 2}
                textAnchor="middle"
                fill="#0f172a"
                fontSize="11"
                fontWeight="800"
              >
                Balik Modal ≈ Thn {breakevenYear}
              </text>
            </g>
          )}
        </svg>

        {/* Tooltip HTML — posisi persentase mengikuti viewBox */}
        {hoveredPoint && (
          <div
            className="absolute z-10 pointer-events-none px-3 py-2 rounded-lg bg-navy/95 dark:bg-white/95 text-white dark:text-navy text-xs shadow-xl border border-white/10 dark:border-navy/10 projection-tooltip"
            style={{
              left: `${tooltipLeft}%`,
              top: `${tooltipTop}%`,
            }}
            aria-hidden="true"
          >
            <p className="font-bold mb-0.5">Tahun {hoveredPoint.year}</p>
            <p>Total hemat: {formatRpShort(hoveredPoint.cum)}</p>
            <p className="font-semibold">
              Posisi net: {fmtSigned(hoveredPoint.net)}
            </p>
          </div>
        )}
      </figure>

      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1 text-center">
        Garis emas = titik balik modal (estimasi{" "}
        {Math.round(increaseRate * 100)}%/thn kenaikan tarif PLN). Estimasi —
        hasil akhir bergantung pola pemakaian aktual Anda.
      </p>
    </div>
  );
}
