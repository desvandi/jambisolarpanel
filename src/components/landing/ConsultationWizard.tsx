"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Sprout,
  Landmark,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Calculator,
  Sparkles,
  RotateCcw,
} from "lucide-react";

/**
 * Konsultasi Terpandu — wizard 4 langkah yang mengkualifikasi kebutuhan
 * pengunjung lalu mengarahkan ke layanan + paket yang relevan
 * (messaging WhatsApp terstruktur untuk tim sales).
 *
 * Rekomendasi hanya memakai layanan & rentang paket yang benar-benar
 * tersedia di situs — tanpa klaim angka karangan.
 */

type PropertyType = "rumah" | "bisnis" | "kebun" | "instansi";
type BillRange = "<500" | "500-1jt" | "1-3jt" | ">3jt";
type Goal = "hemat" | "backup" | "keduanya" | "sewa";
type Timeline = "segera" | "1-3bulan" | "riset";

interface WizardState {
  property?: PropertyType;
  bill?: BillRange;
  goal?: Goal;
  timeline?: Timeline;
}

const steps = [
  { id: 1, title: "Jenis Properti", question: "PLTS akan dipasang di mana?" },
  { id: 2, title: "Tagihan Listrik", question: "Berapa tagihan listrik bulanan Anda?" },
  { id: 3, title: "Tujuan Utama", question: "Apa yang paling Anda inginkan?" },
  { id: 4, title: "Rencana Pasang", question: "Kapan rencana pemasangannya?" },
] as const;

const propertyOptions: { value: PropertyType; label: string; desc: string; icon: typeof Home }[] = [
  { value: "rumah", label: "Rumah Tangga", desc: "Rumah, villa, guest house", icon: Home },
  { value: "bisnis", label: "Bisnis & UMKM", desc: "Kantor, gudang, restoran, pabrik", icon: Building2 },
  { value: "kebun", label: "Kebun & Perkebunan", desc: "Sawit, karet, pertanian, irigasi", icon: Sprout },
  { value: "instansi", label: "Instansi / Lainnya", desc: "Pemerintah, BUMN, proyek besar", icon: Landmark },
];

const billOptions: { value: BillRange; label: string; hint: string }[] = [
  { value: "<500", label: "Di bawah Rp 500rb", hint: "Daya 450–900 VA umumnya" },
  { value: "500-1jt", label: "Rp 500rb – 1jt", hint: "Daya 900–1300 VA" },
  { value: "1-3jt", label: "Rp 1jt – 3jt", hint: "Rumah besar / bisnis kecil" },
  { value: ">3jt", label: "Di atas Rp 3jt", hint: "Bisnis / industri" },
];

const goalOptions: { value: Goal; label: string; desc: string }[] = [
  { value: "hemat", label: "Hemat Tagihan", desc: "Tekan biaya listrik bulanan" },
  { value: "backup", label: "Listrik Cadangan", desc: "Tetap nyala saat PLN padam" },
  { value: "keduanya", label: "Keduanya", desc: "Hemat sekaligus backup" },
  { value: "sewa", label: "Coba Dulu (Sewa)", desc: "Bayar bulanan tanpa investasi awal" },
];

const timelineOptions: { value: Timeline; label: string; desc: string }[] = [
  { value: "segera", label: "Segera", desc: "Dalam 1 bulan ke depan" },
  { value: "1-3bulan", label: "1–3 Bulan", desc: "Sedang membandingkan opsi" },
  { value: "riset", label: "Baru Riset", desc: "Mencari info untuk rencana" },
];

const propertyLabels: Record<PropertyType, string> = {
  rumah: "Rumah Tangga",
  bisnis: "Bisnis & UMKM",
  kebun: "Kebun & Perkebunan",
  instansi: "Instansi / Lainnya",
};

const billLabels: Record<BillRange, string> = {
  "<500": "Di bawah Rp 500rb/bulan",
  "500-1jt": "Rp 500rb – 1jt/bulan",
  "1-3jt": "Rp 1jt – 3jt/bulan",
  ">3jt": "Di atas Rp 3jt/bulan",
};

const goalLabels: Record<Goal, string> = {
  hemat: "Hemat tagihan listrik",
  backup: "Listrik cadangan saat padam",
  keduanya: "Hemat + listrik cadangan",
  sewa: "Coba dulu dengan sewa bulanan",
};

const timelineLabels: Record<Timeline, string> = {
  segera: "Segera (≤ 1 bulan)",
  "1-3bulan": "1–3 bulan",
  riset: "Baru riset",
};

interface Recommendation {
  title: string;
  system: string;
  packageHint: string;
  reasons: string[];
  serviceHref: string;
  serviceLabel: string;
}

function recommend(state: WizardState): Recommendation {
  const { property, bill, goal } = state;

  // Sewa PLTS punya jalur sendiri — apapun propertinya
  if (goal === "sewa") {
    return {
      title: "Sewa PLTS — Bayar Bulanan",
      system: "PLTS sewa tanpa investasi awal besar",
      packageHint: "Paket sewa mulai dari skala rumah tangga hingga komersial",
      reasons: [
        "Anda ingin mencoba PLTS dulu sebelum membeli — mode sewa bulanan cocok.",
        "Termasuk opsi dual-mode: sewa dulu, bisa beli sistemnya nanti.",
      ],
      serviceHref: "/sewa-plts",
      serviceLabel: "Lihat Paket Sewa PLTS",
    };
  }

  const wantsBackup = goal === "backup" || goal === "keduanya";
  const bigLoad = bill === "1-3jt" || bill === ">3jt";

  if (property === "rumah") {
    return {
      title: "PLTS Hybrid untuk Rumah Tangga",
      system: wantsBackup
        ? "Sistem hybrid + baterai — tetap nyala saat PLN padam"
        : "Sistem on-grid/hybrid sesuai target penghematan",
      packageHint: "Paket rumah tangga 1,3 – 5,2 kWp (2–8 panel monokristalin)",
      reasons: [
        wantsBackup
          ? "Tujuan Anda mencakup listrik cadangan — konfigurasi hybrid dengan baterai LiFePO4 direkomendasikan."
          : "Fokus penghematan — sistem tanpa/baterai minimal memberikan ROI terbaik.",
        bigLoad
          ? "Tagihan Anda termasuk besar untuk rumah tangga — paket 3,25–5,2 kWp biasanya paling pas."
          : "Tagihan < Rp 1jt — paket 1,3–2,6 kWp umumnya sudah cukup sebagai awal.",
      ],
      serviceHref: "/solar-home",
      serviceLabel: "Lihat PLTS Rumah Tangga",
    };
  }

  if (property === "bisnis") {
    return {
      title: "PLTS Bisnis & Industri",
      system: bigLoad
        ? "Sistem 3-fase untuk beban operasional besar"
        : "Sistem hybrid skala UMKM",
      packageHint: "Paket bisnis & industri 7,15 – 20,8 kWp",
      reasons: [
        "Jam operasional bisnis cocok dengan profil produksi surya siang hari.",
        bigLoad
          ? "Tagihan besar → potensi penghematan tahunan yang signifikan dengan paket 10–20 kWp."
          : "Mulai dari paket 7,15 kWp, bisa ditingkatkan bertahap.",
      ],
      serviceHref: "/solar-commercial",
      serviceLabel: "Lihat PLTS Bisnis & Industri",
    };
  }

  if (property === "kebun") {
    return {
      title: "PLTS Off-Grid untuk Kebun & Perkebunan",
      system: "Sistem off-grid dengan baterai — mandiri total dari jaringan PLN",
      packageHint: "Solar pump 1–3 HP, PJUTS, hingga PLTS kantor kebun",
      reasons: [
        "Lokasi kebun biasanya jauh dari jaringan PLN — off-grid adalah solusi utama.",
        "Solar pump & PJUTS menghilangkan biaya genset/saluran kabel ke area luas.",
      ],
      serviceHref: "/solar-pump",
      serviceLabel: "Lihat Solar Pump & PJUTS",
    };
  }

  return {
    title: "Tender, Pengadaan & EPC PLTS",
    system: "Proyek pengadaan energi terbarukan dengan legalitas lengkap",
    packageHint: "Skala instansi pemerintah/BUMN — proses tender & procurement",
    reasons: [
      "Kebutuhan instansi memerlukan dokumen legalitas dan proses pengadaan resmi.",
      "Tim kami berpengalaman menangani proses tender dengan spesifikasi teknis lengkap.",
    ],
    serviceHref: "/tender-procurement",
    serviceLabel: "Lihat Tender & Pengadaan",
  };
}

export function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>({});

  const isLast = step === steps.length;
  const canNext =
    (step === 1 && state.property) ||
    (step === 2 && state.bill) ||
    (step === 3 && state.goal) ||
    (step === 4 && state.timeline);

  const rec = state.timeline ? recommend(state) : null;

  const waMessage = () => {
    const lines = [
      "Halo PT. Jaya Mandiri Smart Energy,",
      "",
      "Saya baru menyelesaikan Konsultasi Terpandu di website Anda:",
      `• Jenis properti: ${state.property ? propertyLabels[state.property] : "-"}`,
      `• Tagihan listrik: ${state.bill ? billLabels[state.bill] : "-"}`,
      `• Tujuan utama: ${state.goal ? goalLabels[state.goal] : "-"}`,
      `• Rencana pasang: ${state.timeline ? timelineLabels[state.timeline] : "-"}`,
      "",
      "Mohon info lebih lanjut untuk kebutuhan saya. Terima kasih!",
    ];
    return `https://wa.me/6281328190707?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const reset = () => {
    setState({});
    setStep(1);
  };

  const optionsForStep = () => {
    switch (step) {
      case 1:
        return propertyOptions.map((o) => (
          <button
            key={o.value}
            type="button"
            data-selected={state.property === o.value}
            onClick={() => setState((s) => ({ ...s, property: o.value }))}
            className="wizard-option text-left p-4 rounded-xl border border-border bg-background hover:border-solar/40"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-solar/10 flex items-center justify-center shrink-0">
                <o.icon className="w-5 h-5 text-solar" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-navy dark:text-white">{o.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{o.desc}</p>
              </div>
            </div>
          </button>
        ));
      case 2:
        return billOptions.map((o) => (
          <button
            key={o.value}
            type="button"
            data-selected={state.bill === o.value}
            onClick={() => setState((s) => ({ ...s, bill: o.value }))}
            className="wizard-option text-left p-4 rounded-xl border border-border bg-background hover:border-solar/40"
          >
            <p className="font-bold text-sm text-navy dark:text-white">{o.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{o.hint}</p>
          </button>
        ));
      case 3:
        return goalOptions.map((o) => (
          <button
            key={o.value}
            type="button"
            data-selected={state.goal === o.value}
            onClick={() => setState((s) => ({ ...s, goal: o.value }))}
            className="wizard-option text-left p-4 rounded-xl border border-border bg-background hover:border-solar/40"
          >
            <p className="font-bold text-sm text-navy dark:text-white">{o.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{o.desc}</p>
          </button>
        ));
      default:
        return timelineOptions.map((o) => (
          <button
            key={o.value}
            type="button"
            data-selected={state.timeline === o.value}
            onClick={() => setState((s) => ({ ...s, timeline: o.value }))}
            className="wizard-option text-left p-4 rounded-xl border border-border bg-background hover:border-solar/40"
          >
            <p className="font-bold text-sm text-navy dark:text-white">{o.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{o.desc}</p>
          </button>
        ));
    }
  };

  return (
    <div>
      {/* Wizard */}
      {!rec && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="flex items-center gap-2" aria-label={`Langkah ${step} dari 4`}>
            {steps.map((s) => (
              <div key={s.id} className="flex-1">
                <div
                  className={`h-1.5 rounded-full transition-colors duration-300 ${
                    s.id <= step ? "bg-solar" : "bg-border"
                  }`}
                />
                <p
                  className={`text-[10px] font-semibold mt-1.5 hidden sm:block transition-colors ${
                    s.id === step ? "text-solar" : "text-muted-foreground"
                  }`}
                >
                  {s.title}
                </p>
              </div>
            ))}
          </div>

          {/* Question */}
          <div>
            <p className="text-xs font-bold text-solar uppercase tracking-wider mb-1">
              Langkah {step} dari 4
            </p>
            <h4 className="text-lg font-bold text-navy dark:text-white">
              {steps[step - 1].question}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{optionsForStep()}</div>

          {/* Nav */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground rounded-lg transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
              disabled={!canNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-solar hover:bg-solar-dark disabled:bg-muted disabled:text-muted-foreground text-white font-bold text-sm rounded-xl transition-all duration-300 enabled:hover:shadow-lg enabled:hover:shadow-solar/30"
            >
              {isLast ? "Lihat Rekomendasi" : "Lanjut"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {rec && (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-solar/10 border border-solar/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-solar" />
            </div>
            <div>
              <p className="text-xs font-bold text-solar uppercase tracking-wider">
                Rekomendasi Awal Anda
              </p>
              <h4 className="text-lg font-bold text-navy dark:text-white leading-snug">
                {rec.title}
              </h4>
            </div>
          </div>

          {/* Detail */}
          <div className="p-5 rounded-2xl bg-solar/5 border border-solar/20 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Sistem yang cocok
              </p>
              <p className="text-sm font-semibold text-navy dark:text-white">{rec.system}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Rentang paket
              </p>
              <p className="text-sm text-foreground/90">{rec.packageHint}</p>
            </div>
            <ul className="space-y-2 pt-1">
              {rec.reasons.map((reason, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-foreground/90 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-solar flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground pt-1 border-t border-solar/15">
              Rekomendasi awal berdasarkan jawaban Anda. Penentuan paket final
              tetap melalui survei gratis oleh tim teknis kami.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <a
              href={waMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-solar hover:bg-solar-dark text-white font-bold text-base rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-solar/30"
            >
              <MessageCircle className="w-5 h-5" />
              Lanjut Konsultasi via WhatsApp
            </a>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={rec.serviceHref}
                className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-navy border-2 border-solar/30 text-solar font-semibold text-sm rounded-xl transition-all duration-300 hover:bg-solar/5 hover:border-solar"
              >
                {rec.serviceLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#kalkulator"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("kalkulator")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 py-3 bg-muted/50 hover:bg-muted border border-border text-foreground font-semibold text-sm rounded-xl transition-colors"
              >
                <Calculator className="w-4 h-4 text-solar" />
                Hitung Estimasi Hemat
              </a>
            </div>
          </div>

          {/* Restart */}
          <button
            type="button"
            onClick={reset}
            className="mx-auto flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-solar transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Ulangi konsultasi terpandu
          </button>
        </div>
      )}
    </div>
  );
}
