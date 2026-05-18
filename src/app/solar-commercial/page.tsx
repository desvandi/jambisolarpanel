import { Metadata } from "next";
import SolarCommercialPage from "./SolarCommercialPage";

export const metadata: Metadata = {
  title: "JMSE Commercial Solar — PLTS Bisnis & Industri | PT. Jaya Mandiri Smart Energy",
  description: "Paket PLTS komersial mulai dari 6.5 kWp hingga 20 kWp untuk kantor, gudang, pabrik. ROI lebih cepat 5-7 tahun. Monitoring & carport add-on tersedia.",
};

export default function Page() {
  return <SolarCommercialPage />;
}
