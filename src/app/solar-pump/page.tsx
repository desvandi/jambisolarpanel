import type { Metadata } from "next";
import SolarPumpPage from "./SolarPumpPage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/solar-pump",
  title: "Solar Pump Jambi | Pompa Air Tenaga Surya",
  description:
    "Pompa air tenaga surya (solar pump) untuk irigasi kebun sawit, pertanian, dan peternakan di Jambi. Tanpa listrik PLN, mulai Rp 18.000.000. Submersible pump tahan lama.",
  ogImageAlt: "Solar pump — pompa air tenaga surya untuk kebun dan pertanian di Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Solar Pump — Pompa Air Tenaga Surya",
          description:
            "Instalasi pompa air tenaga surya untuk irigasi kebun sawit, pertanian, dan peternakan di Jambi. Tanpa listrik PLN, mulai Rp 18.000.000.",
          path: "/solar-pump",
          serviceType: "Solar Water Pump",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Solar Pump", path: "/solar-pump" },
        ])}
      />
      <ServicePageLayout
      subBrand="Jambi Solar Agro — Solar Pump"
      currentPath="/solar-pump"
      termIds={["solar-pump", "plts", "kwp", "psh", "mppt", "baterai-lifepo4", "bos"]}
      title="Solar Water Pump — Pompa Air Tenaga Surya"
      tagline="Irigasi kebun sawit, pertanian, peternakan tanpa listrik PLN."
      description="Pompa air submersible bertenaga surya untuk irigasi perkebunan sawit, pertanian, dan peternakan. Menggunakan komponen berkualitas tinggi dengan garansi resmi dan MPPT controller untuk efisiensi maksimal."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Solar Pump" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan Solar Water Pump. Mohon informasi lebih lanjut mengenai harga dan spesifikasi."
      >
        <SolarPumpPage />
      </ServicePageLayout>
    </>
  );
}
