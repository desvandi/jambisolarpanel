import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HardHat, Shield, PenLine } from "lucide-react";

/**
 * Author box E-E-A-T untuk halaman artikel.
 * Memperkuat sinyal experience & expertise: konten ditulis tim teknis,
 * diawasi langsung owner PT (lihat /tentang-kami).
 * Server component — tanpa JS tambahan.
 */
export function ArticleAuthorBox() {
  return (
    <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-card border border-border">
      <p className="flex items-center gap-2 text-xs font-bold text-solar uppercase tracking-wider mb-5">
        <PenLine className="w-4 h-4" />
        Tentang Penulis
      </p>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Foto — rasio tetap, tidak mengganggu layout */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-solar/20 shrink-0 mx-auto sm:mx-0">
          <Image
            src="/team-owner.jpg"
            alt="Owner PT. Jaya Mandiri Smart Energy mengawasi pemasangan panel surya di lokasi proyek"
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2 justify-center sm:justify-start">
            <p className="font-bold text-navy dark:text-white">
              Tim Teknis Jambi Solar Panel
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-solar/10 border border-solar/20 text-[10px] font-bold text-solar self-center sm:self-auto">
              <BadgeCheck className="w-3 h-3" />
              Owner Supervised
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Artikel ditulis oleh tim teknis{" "}
            <strong className="text-foreground/90">
              PT. Jaya Mandiri Smart Energy
            </strong>{" "}
            berdasarkan praktik perancangan dan pemasangan PLTS yang kami
            kerjakan sendiri di Jambi, Sumatera &amp; Jawa Bagian Barat.
            Setiap sistem dirancang custom oleh insinyur dan diawasi langsung
            oleh pemilik perusahaan.
          </p>

          {/* Kredensial ringkas */}
          <ul className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2 mt-4">
            <li className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <HardHat className="w-3.5 h-3.5 text-solar" />
              Desain oleh insinyur
            </li>
            <li className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Shield className="w-3.5 h-3.5 text-solar" />
              Garansi tertulis resmi
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-5 sm:mt-4">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-solar hover:gap-2.5 hover:underline underline-offset-2 transition-all"
            >
              Kenali tim kami
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-border" aria-hidden="true" />
            <a
              href="https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy%2C%20saya%20baru%20saja%20membaca%20artikel%20di%20website%20anda%20dan%20ingin%20konsultasi%20tentang%20PLTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-solar hover:bg-solar-dark text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-solar/30"
            >
              Konsultasi Gratis
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
