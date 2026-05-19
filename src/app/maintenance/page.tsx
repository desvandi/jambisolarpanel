import { Metadata } from "next";
import MaintenancePage from "./MaintenancePage";

export const metadata: Metadata = {
  title: "O&M Maintenance PLTS | PT. Jaya Mandiri Smart Energy",
  description: "Layanan maintenance PLTS profesional: rutin, tahunan, emergency repair, audit sistem. Coverage Sumatera & Jawa Barat.",
};

export default function Page() {
  return <MaintenancePage />;
}
