import type { Metadata } from "next";

/**
 * Metadata untuk halaman admin/internal Kalibrasi Harga.
 * noindex + nofollow sebagai defense-in-depth (selain robots.txt
 * dan Basic Auth di proxy.ts) agar tidak pernah terindeks Google.
 */
export const metadata: Metadata = {
  title: "Kalibrasi Harga (Internal)",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function KalibrasiHargaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
