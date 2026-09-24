import type { Metadata } from "next";
import TenderProcurementPage from "./TenderProcurementPage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
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
      <ServicePageLayout
      subBrand="Jambi Solar Infrastructure"
      currentPath="/tender-procurement"
      termIds={["tender-pengadaan", "plts", "commissioning", "bos", "kwp", "garansi-plts"]}
      title="Pengadaan Barang & Jasa Energi Terbarukan"
      tagline="Siap melayani proyek pengadaan energi terbarukan untuk pemerintah, BUMN, dan korporasi."
      description="JMSE menyediakan layanan EPC dan pengadaan barang & jasa energi terbarukan secara profesional. Kami siap mendukung proyek pemerintah daerah, BUMN, korporasi, dan institusi dalam mewujudkan transisi energi bersih."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Tender & Procurement" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya ingin konsultasi mengenai pengadaan/tender energi terbarukan. Mohon informasi lebih lanjut."
      >
        <TenderProcurementPage />
      </ServicePageLayout>
    </>
  );
}
