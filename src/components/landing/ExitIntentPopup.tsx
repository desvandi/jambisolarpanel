"use client";

import { useState, useEffect, useCallback } from "react";
import { X, MessageCircle, Gift } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20dengan%20penawaran%20diskon%20spesial%20panel%20surya%20yang%20tampil%20di%20popup%20website%20anda";

export function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        !dismissed &&
        !sessionStorage.getItem("exitPopupDismissed")
      ) {
        setShow(true);
      }
    },
    [dismissed]
  );

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("exitPopupDismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative w-full max-w-md bg-white dark:bg-navy-light rounded-2xl shadow-2xl overflow-hidden animate-slide-in-up">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors z-10"
          aria-label="Tutup"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-white" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-r from-solar to-solar-dark px-6 py-8 text-center text-white">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-gold-light" />
          </div>
          <h3 className="text-xl font-bold mb-2">Tunggu Dulu!</h3>
          <p className="text-white/80 text-sm">
            Dapatkan penawaran eksklusif sebelum Anda pergi
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-solar/5 border border-solar/10">
              <span className="text-xl">📊</span>
              <p className="text-sm font-medium text-navy dark:text-white">
                Konsultasi Gratis + Analisis Kebutuhan Energi
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-solar/5 border border-solar/10">
              <span className="text-xl">📐</span>
              <p className="text-sm font-medium text-navy dark:text-white">
                Desain Sistem Awal Tanpa Biaya
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gold/5 border border-gold/20">
              <span className="text-xl">💰</span>
              <p className="text-sm font-medium text-navy dark:text-white">
                Diskon Spesial untuk Pendaftar Hari Ini
              </p>
            </div>
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
                (window as unknown as Record<string, (...args: unknown[]) => void>).fbq!('track', 'Lead');
              }
              handleClose();
            }}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-solar hover:bg-solar-dark text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Klaim Penawaran via WhatsApp
          </a>

          <button
            onClick={handleClose}
            className="w-full mt-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tidak, terima kasih
          </button>
        </div>
      </div>
    </div>
  );
}
