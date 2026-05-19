import { Metadata } from "next";
import TenderProcurementPage from "./TenderProcurementPage";

export const metadata: Metadata = {
  title: "Tender & Procurement Energi Terbarukan | PT. Jaya Mandiri Smart Energy",
  description: "Pengadaan barang & jasa energi terbarukan untuk pemerintah, BUMN, dan korporasi. EPC, RAB, survei, desain sistem. Konsultasi gratis.",
};

export default function Page() {
  return <TenderProcurementPage />;
}
