import { Metadata } from "next";
import SolarPumpPage from "./SolarPumpPage";

export const metadata: Metadata = {
  title: "Solar Water Pump — Pompa Air Tenaga Surya | PT. Jaya Mandiri Smart Energy",
  description: "Pompa air tenaga surya untuk irigasi kebun sawit, pertanian, peternakan. Tanpa listrik PLN, mulai dari Rp 18.000.000. Samking submersible pump.",
};

export default function Page() {
  return <SolarPumpPage />;
}
