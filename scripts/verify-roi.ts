/** Verifikasi angka ROI model baru (audit Round 8) — dijalankan sekali via bun. */
import {
  calculatePackages,
  calculateROI,
  recommendPackage,
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings,
  PLN_TARIFF_DEFAULT,
} from "../src/lib/pricing";
import { SELF_CONSUMPTION_PROFILES } from "../src/lib/methodology";

const pkgs = calculatePackages(
  defaultComponentPrices,
  defaultInverterPrices,
  defaultSettings
);

console.log("=== RUMAH (1.3–5.2 kWp) & BISNIS (7.15+) — ROI per profil ===\n");
for (const p of pkgs) {
  const dailyKwh = p.kWp * defaultSettings.pshHours * defaultSettings.efficiency;
  console.log(`\n--- ${p.name} (${p.kWp} kWp, ${p.priceFormatted}) ---`);
  console.log(`  produksi: ${(dailyKwh * 30).toFixed(0)} kWh/bulan`);
  for (const prof of SELF_CONSUMPTION_PROFILES) {
    const r = calculateROI(p.price, dailyKwh, { selfConsumption: prof.rate });
    console.log(
      `  [${prof.label.padEnd(20)}] hemat=${(r.monthlySavingsBase / 1e6).toFixed(2)}jt/bln  ROI(skenario 6%)=${r.roiYearsWithIncrease}thn  ROI(flat)=${r.roiYears}thn  25thn=${r.returnMultiplier}x`
    );
  }
}

console.log("\n=== SIMULASI KALKULATOR (dengan cap pemakaian) ===\n");
for (const bill of [500000, 1000000, 2000000, 3000000, 5000000]) {
  const rec = recommendPackage(bill, pkgs);
  if (!rec) continue;
  const monthlyKwh = bill / PLN_TARIFF_DEFAULT;
  const dailyKwh = rec.kWp * defaultSettings.pshHours * defaultSettings.efficiency;
  const production = dailyKwh * 30;
  console.log(`\nTagihan Rp${(bill / 1e6).toFixed(1)}jt → ${rec.name} (${rec.kWp} kWp, ${rec.priceFormatted})`);
  console.log(`  pemakaian=${monthlyKwh.toFixed(0)} kWh/bln, produksi=${production.toFixed(0)} kWh/bln (coverage ${((production / monthlyKwh) * 100).toFixed(0)}%)`);
  for (const prof of SELF_CONSUMPTION_PROFILES) {
    const r = calculateROI(rec.price, dailyKwh, {
      selfConsumption: prof.rate,
      monthlyConsumptionKwh: monthlyKwh,
    });
    const billCut = Math.min(100, Math.round((r.monthlySavingsBase / bill) * 100));
    console.log(
      `  [${prof.label.padEnd(20)}] hemat=${(r.monthlySavingsBase / 1e6).toFixed(2)}jt/bln (${billCut}% tagihan)  ROI(6%)=${r.roiYearsWithIncrease}thn  solar terpakai=${r.monthlySolarUtilizedKwh}kWh`
    );
  }
}
