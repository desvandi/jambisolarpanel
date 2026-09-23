"use client";

import { Printer, Check } from "lucide-react";
import { useState } from "react";

/**
 * Tombol cetak / simpan PDF untuk halaman harga.
 * Menggunakan window.print() — stylesheet @media print di globals.css
 * yang menyembunyikan navbar/footer/CTA dan merapikan tabel.
 */
export function PrintPricelistButton() {
  const [clicked, setClicked] = useState(false);

  const handlePrint = () => {
    setClicked(true);
    // Beri jeda singkat agar state ter-render sebelum dialog print
    setTimeout(() => {
      window.print();
      setClicked(false);
    }, 150);
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="no-print inline-flex items-center gap-2 px-4 py-2 rounded-full border border-solar/30 bg-card text-solar text-xs sm:text-sm font-semibold hover:bg-solar/10 hover:border-solar transition-all duration-200 hover:scale-105 flex-shrink-0"
      aria-label="Cetak atau simpan daftar harga sebagai PDF"
    >
      {clicked ? (
        <Check className="w-4 h-4" />
      ) : (
        <Printer className="w-4 h-4" />
      )}
      {clicked ? "Menyiapkan…" : "Cetak / Simpan PDF"}
    </button>
  );
}
