import { Metadata } from "next";
import EVChargingPage from "./EVChargingPage";

export const metadata: Metadata = {
  title: "EV Charging Terintegrasi PLTS | Jambi Solar Panel",
  description: "Charger AC 7.2kW + PLTS untuk kendaraan listrik. Hemat hingga jutaan per tahun vs tarif PLN. Isi daya EV dari matahari — gratis. Mulai dari Rp 25 juta.",
};

export default function Page() {
  return <EVChargingPage />;
}
