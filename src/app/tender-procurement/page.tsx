import type { Metadata } from "next";
import TenderProcurementPage from "./TenderProcurementPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/tender-procurement",
  title: "Pengadaan & EPC PLTS Jambi | Jaya Mandiri Smart Energy",
  description:
    "Pengadaan barang & jasa energi terbarukan untuk pemerintah, BUMN, dan korporasi. Layanan EPC, RAB, survei, dan desain sistem PLTS. Konsultasi gratis.",
  ogImageAlt: "Tender & procurement energi terbarukan — EPC PLTS Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Tender & Procurement Energi Terbarukan",
          description:
            "Pengadaan barang & jasa energi terbarukan untuk pemerintah, BUMN, dan korporasi. EPC, RAB, survei, dan desain sistem PLTS.",
          path: "/tender-procurement",
          serviceType: "Tender & Procurement Energi Terbarukan",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tender & Pengadaan", path: "/tender-procurement" },
        ])}
      />
      <TenderProcurementPage />
    </>
  );
}
