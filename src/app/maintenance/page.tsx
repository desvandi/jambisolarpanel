import type { Metadata } from "next";
import MaintenancePage from "./MaintenancePage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/maintenance",
  title: "Maintenance Panel Surya Jambi | Servis PLTS",
  description:
    "Layanan maintenance & servis PLTS profesional di Jambi: perawatan rutin, tahunan, emergency repair, dan audit sistem. Melayani Jambi, Sumatera & Jawa Bagian Barat.",
  ogImageAlt: "Teknisi melakukan maintenance panel surya — servis PLTS Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Maintenance PLTS — Servis Panel Surya",
          description:
            "Layanan maintenance PLTS: perawatan rutin, tahunan, emergency repair, dan audit sistem. Melayani Jambi, Sumatera & Jawa Bagian Barat.",
          path: "/maintenance",
          serviceType: "Maintenance PLTS",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Maintenance", path: "/maintenance" },
        ])}
      />
      <ServicePageLayout
      subBrand="Jambi Solar Maintenance"
      currentPath="/maintenance"
      termIds={["maintenance-plts", "plts", "commissioning", "siklus-baterai", "efisiensi-sistem", "inverter-hybrid", "string"]}
      title="Operation & Maintenance PLTS"
      tagline="Jaga performa sistem PLTS Anda tetap optimal dengan layanan maintenance profesional."
      description="Layanan pemeliharaan berkala dan perbaikan untuk sistem PLTS Anda. Tim teknisi berpengalaman kami siap menjaga performa dan umur panjang investasi energi surya Anda."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "Maintenance" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya ingin mengetahui layanan maintenance PLTS. Mohon informasi lebih lanjut."
      >
        <MaintenancePage />
      </ServicePageLayout>
    </>
  );
}
