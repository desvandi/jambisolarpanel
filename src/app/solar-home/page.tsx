import { Metadata } from "next";
import SolarHomePage from "./SolarHomePage";

export const metadata: Metadata = {
  title: "JMSE Home Solar — PLTS Rumah Tangga | PT. Jaya Mandiri Smart Energy",
  description: "Paket PLTS rumah tangga mulai dari 1 kWp hingga 5 kWp + baterai. Hemat tagihan listrik, backup saat PLN padam. Konsultasi gratis, garansi resmi.",
};

export default function Page() {
  return <SolarHomePage />;
}
