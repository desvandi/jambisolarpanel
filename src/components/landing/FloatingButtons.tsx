"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Phone, MessageCircle } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20konsultasi%20panel%20surya%20(melalui%20tombol%20WhatsApp%20mengambang)";

export function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 500);
      setShowButtons(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-navy/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-inset-bottom">
        <div className="flex items-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
                (window as unknown as Record<string, (...args: unknown[]) => void>).fbq!('track', 'Lead');
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#25D366]/30"
          >
            <MessageCircle className="w-5 h-5" />
            Cek Kebutuhan PLTS Gratis
          </a>
          <a
            href="tel:+6281328190707"
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-solar text-white shadow-lg shadow-solar/30"
            aria-label="Telepon"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Desktop Floating Buttons */}
      <div
        className={`hidden md:block fixed bottom-6 right-6 z-40 flex flex-col gap-3 transition-all duration-500 ${
          showButtons
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* WhatsApp Button */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).fbq) {
              (window as unknown as Record<string, (...args: unknown[]) => void>).fbq!('track', 'Contact');
            }
          }}
          className="group flex items-center gap-3"
        >
          {/* Label */}
          <span className="px-4 py-2 bg-white dark:bg-navy text-navy dark:text-white text-sm font-semibold rounded-xl shadow-lg border border-border whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            Cek Kebutuhan PLTS
          </span>
          {/* Button */}
          <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40 hover:shadow-xl hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
        </a>

        {/* Call Button */}
        <a
          href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20ingin%20menghubungi%20anda%20melalui%20tombol%20telepon%20di%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="px-4 py-2 bg-white dark:bg-navy text-navy dark:text-white text-sm font-semibold rounded-xl shadow-lg border border-border whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            Hubungi Kami
          </span>
          <div className="w-12 h-12 rounded-full bg-solar flex items-center justify-center shadow-lg shadow-solar/40 hover:shadow-xl hover:shadow-solar/50 hover:scale-110 transition-all duration-300">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </a>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed z-40 w-12 h-12 rounded-full bg-navy dark:bg-white text-white dark:text-navy flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 ${
          showScroll
            ? "opacity-100 translate-y-0 bottom-6 left-6 md:bottom-6"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        style={{ bottom: showScroll ? "5.5rem" : undefined }}
        aria-label="Scroll ke atas"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  );
}
