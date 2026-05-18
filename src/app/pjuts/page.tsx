import { Metadata } from "next";
import PJUTSPage from "./PJUTSPage";

export const metadata: Metadata = {
  title: "PJUTS — Penerangan Jalan Tenaga Surya | PT. Jaya Mandiri Smart Energy",
  description: "Paket PJUTS 30W-150W untuk jalan desa, perkebunan, kawasan industri. Tanpa kabel PLN, auto on/off, garansi 3 tahun. Mulai dari Rp 4.500.000.",
};

export default function Page() {
  return <PJUTSPage />;
}
