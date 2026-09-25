import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Building2,
  Zap,
  Sun,
  AlertTriangle,
  Wrench,
  TrendingDown,
  Quote,
  Calendar,
  ClipboardList,
  Ruler,
  Info,
  CheckCircle2,
} from "lucide-react";
import { SitePageLayout } from "@/components/site/SitePageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies, getCaseStudyBySlug, formatKwp } from "@/content/caseStudies";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) {
    return buildMetadata({
      path: `/studi-kasus/${slug}`,
      title: "Studi kasus tidak ditemukan | Jambi Solar Panel",
      description: "Studi kasus yang Anda cari tidak ditemukan.",
      noIndex: true,
    });
  }
  return buildMetadata({
    path: `/studi-kasus/${cs.slug}`,
    title: `${cs.title} | Studi Kasus PLTS`,
    description: cs.summary.slice(0, 158),
    ogImage: cs.image,
    ogImageAlt: cs.imageAlt,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const others = caseStudies.filter((c) => c.slug !== cs.slug);

  return (
    <SitePageLayout
      title={cs.title}
      breadcrumbs={[
        { label: "Proyek", href: "/proyek" },
        { label: cs.title },
      ]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Proyek & Studi Kasus", path: "/proyek" },
          { name: cs.title, path: `/studi-kasus/${cs.slug}` },
        ])}
      />

      <article className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Foto proyek */}
          <figure className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border mb-10">
            <Image
              src={cs.image}
              alt={cs.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
            <span className="absolute top-4 left-4 px-3 py-1 bg-solar text-white text-xs font-semibold rounded-full">
              {cs.segment}
            </span>
            <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/70 to-transparent text-[11px] text-white/85">
              {cs.imageCaption}
            </figcaption>
          </figure>

          {/* Ringkasan proyek */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              { icon: MapPin, label: "Lokasi", value: cs.lokasi },
              { icon: Zap, label: "Kapasitas", value: formatKwp(cs.kapasitasKwp) },
              { icon: Sun, label: "Sistem", value: cs.jenisSistem },
              { icon: Building2, label: "Bangunan", value: cs.jenisBangunan },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 rounded-xl bg-card border border-border text-center"
              >
                <item.icon className="w-5 h-5 text-solar mx-auto mb-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-navy dark:text-white mt-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-10">
            {/* Profil beban */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4">
                Kebutuhan &amp; Profil Beban
              </h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Sistem dirancang untuk melayani beban berikut:
              </p>
              <ul className="space-y-2.5">
                {cs.profilBeban.map((b) => (
                  <li key={b} className="flex gap-3 text-foreground/90 leading-relaxed">
                    <Zap className="w-4 h-4 text-solar flex-shrink-0 mt-1" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Masalah awal */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-gold" />
                Tantangan Sebelum Instalasi
              </h2>
              <p className="text-foreground/90 leading-relaxed">{cs.masalahAwal}</p>
            </section>

            {/* Desain sistem */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-solar" />
                Desain Sistem
              </h2>
              <p className="text-foreground/90 leading-relaxed">{cs.solusiDesain}</p>
              {cs.estimasiProduksiHarian ? (
                <p className="mt-4 p-4 rounded-xl bg-solar/5 border border-solar/20 text-sm text-foreground/90 leading-relaxed">
                  <strong className="text-navy dark:text-white">Estimasi produksi:</strong>{" "}
                  {cs.estimasiProduksiHarian}
                </p>
              ) : null}
            </section>

            {/* Spesifikasi sistem */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <Ruler className="w-6 h-6 text-solar" />
                Spesifikasi Sistem
              </h2>
              <dl className="rounded-2xl border border-border overflow-hidden">
                {cs.spesifikasi.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-1 sm:gap-4 px-5 py-3.5 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/40"
                    }`}
                  >
                    <dt className="text-sm font-semibold text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="text-sm text-foreground/90 leading-relaxed">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Catatan desain (engineering rationale) */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-solar" />
                Mengapa Desain Ini Dipilih
              </h2>
              <ul className="space-y-3">
                {cs.catatanDesain.map((c) => (
                  <li key={c} className="flex gap-3 text-foreground/90 leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-solar flex-shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Batasan sistem */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-gold" />
                Batasan yang Perlu Anda Tahu
              </h2>
              <ul className="space-y-3">
                {cs.batasan.map((b) => (
                  <li key={b} className="flex gap-3 text-foreground/90 leading-relaxed">
                    <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Hasil */}
            <section>
              <h2 className="text-2xl font-extrabold text-navy dark:text-white mb-6 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-solar" />
                Hasil
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cs.hasil.map((h) => (
                  <div
                    key={h.label}
                    className="p-5 rounded-xl bg-gradient-to-br from-solar/5 to-gold/5 border border-solar/20 text-center"
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {h.label}
                    </p>
                    <p className="text-lg font-extrabold text-solar mt-1.5 leading-snug">
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Metode data & verifikasi */}
            <section className="p-6 sm:p-7 rounded-2xl bg-muted/40 border border-border">
              <h2 className="text-lg font-extrabold text-navy dark:text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-solar" />
                Metode Data &amp; Verifikasi
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Transparansi untuk Anda nilai sendiri — inilah asal setiap angka di halaman ini:
              </p>
              <ul className="space-y-2.5">
                {cs.metodeData.map((m) => (
                  <li key={m} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-solar flex-shrink-0"
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimoni */}
            {cs.testimoni ? (
              <section>
                <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border relative">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-solar/10" />
                  <p className="text-foreground/90 leading-relaxed mb-4 italic">
                    &ldquo;{cs.testimoni.quote}&rdquo;
                  </p>
                  <p className="font-bold text-navy dark:text-white">
                    {cs.testimoni.nama}
                  </p>
                  <p className="text-sm text-muted-foreground">{cs.testimoni.peran}</p>
                </div>
              </section>
            ) : null}

            {/* CTA layanan terkait */}
            <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-solar/10 to-gold/10 border border-solar/20">
              <p className="text-foreground/90 leading-relaxed mb-4">
                Butuh solusi serupa untuk {cs.segment === "Agriculture" ? "kebun atau perkebunan" : cs.segment === "Commercial" ? "bisnis atau industri" : "rumah atau properti"} Anda?
                Lihat layanan{" "}
                <Link
                  href={cs.relatedService.href}
                  className="text-solar font-semibold hover:underline underline-offset-2"
                >
                  {cs.relatedService.label}
                </Link>{" "}
                atau konsultasikan langsung dengan tim kami.
              </p>
              <a
                href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20tertarik%20solusi%20PLTS%20seperti%20studi%20kasus%20di%20website%20anda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-semibold text-sm rounded-full transition-colors"
              >
                Konsultasi Gratis via WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </section>
          </div>
        </div>
      </article>

      {/* Studi kasus lainnya */}
      {others.length > 0 ? (
        <section className="pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-solar" />
              Studi Kasus Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/studi-kasus/${o.slug}`}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-solar/30 hover:shadow-lg transition-all duration-300"
                >
                  <span className="px-2.5 py-0.5 rounded-full bg-solar/10 text-solar text-xs font-semibold mb-3 inline-block">
                    {o.segment} — {formatKwp(o.kapasitasKwp)} {o.jenisSistem}
                  </span>
                  <h3 className="font-bold text-navy dark:text-white leading-snug mb-2 group-hover:text-solar transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {o.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SitePageLayout>
  );
}
