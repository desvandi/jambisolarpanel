import { Metadata } from "next";
import EVChargingPage from "./EVChargingPage";

export const metadata: Metadata = {
  title: "EV Charging Terintegrasi PLTS | PT. Jaya Mandiri Smart Energy",
  description: "Charger AC 7.2kW + PLTS untuk kendaraan listrik. Hemat Rp 3-6 juta/bulan vs charging PLN. Mulai dari Rp 25 juta.",
};

export default function Page() {
  return <EVChargingPage />;
}
