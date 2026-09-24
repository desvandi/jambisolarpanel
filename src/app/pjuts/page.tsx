import type { Metadata } from "next";
import PJUTSPage from "./PJUTSPage";
import { ServicePageLayout } from "@/components/landing/ServicePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/pjuts",
  title: "PJUTS Jambi | Lampu Jalan Tenaga Surya",
  description:
    "Paket PJUTS (Penerangan Jalan Umum Tenaga Surya) 30W-150W untuk jalan desa, perkebunan, dan kawasan industri di Jambi. Tanpa kabel PLN, auto on/off, garansi 3 tahun. Mulai Rp 4.500.000.",
  ogImageAlt: "PJUTS — lampu jalan tenaga surya untuk jalan desa dan perkebunan Jambi",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "PJUTS — Penerangan Jalan Umum Tenaga Surya",
          description:
            "Instalasi PJUTS 30W-150W untuk jalan desa, perkebunan, dan kawasan industri di Jambi. Tanpa kabel PLN, auto on/off, garansi 3 tahun.",
          path: "/pjuts",
          serviceType: "PJUTS - Penerangan Jalan Umum Tenaga Surya",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "PJUTS", path: "/pjuts" },
        ])}
      />
      <ServicePageLayout
      subBrand="Jambi Solar Agro — PJUTS"
      currentPath="/pjuts"
      termIds={["pjuts", "plts", "psh", "baterai-lifepo4", "siklus-baterai", "bos"]}
      title="Penerangan Jalan Umum Tenaga Surya (PJUTS)"
      tagline="Cahaya untuk jalan desa, perkebunan, kawasan industri — tanpa kabel PLN."
      description="Solusi penerangan jalan mandiri tanpa koneksi PLN. Menggunakan panel surya monokristalin, baterai LiFePO4, dan LED SMD berkualitas tinggi dalam tiang all-in-one. Cocok untuk jalan desa, akses perkebunan sawit, kawasan industri, dan area publik."
      breadcrumbs={[{ label: "Solusi", href: "/" }, { label: "PJUTS" }]}
      waText="Halo PT. Jaya Mandiri Smart Energy, saya tertarik dengan paket PJUTS. Mohon informasi lebih lanjut mengenai harga dan spesifikasi."
      >
        <PJUTSPage />
      </ServicePageLayout>
    </>
  );
}
