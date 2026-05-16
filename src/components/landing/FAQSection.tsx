"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Berapa biaya pasang panel surya?",
    a: "Biaya instalasi panel surya bervariasi tergantung kapasitas sistem dan kebutuhan spesifik Anda. Untuk rumah tangga, investasi mulai dari Rp 15 juta untuk sistem 1 kWp. Untuk bisnis dan industri, biaya disesuaikan dengan skala proyek. Yang perlu diingat, panel surya adalah investasi jangka panjang yang akan menghemat tagihan listrik Anda selama 25 tahun ke depan. Kami menyediakan konsultasi dan survei gratis untuk memberikan estimasi biaya yang akurat sesuai kebutuhan Anda.",
  },
  {
    q: "Berapa lama balik modal (ROI)?",
    a: "Rata-rata masa balik modal (Return on Investment) terjadi dalam 3-5 tahun, tergantung dari penggunaan listrik dan kapasitas sistem yang dipasang. Setelah masa ROI tercapai, Anda menikmati listrik gratis selama sisa umur panel (20+ tahun). Dengan kenaikan tarif PLN rata-rata 5-10% per tahun, ROI Anda bahkan bisa lebih cepat dari estimasi. Kami akan memberikan perhitungan ROI detail saat konsultasi.",
  },
  {
    q: "Apakah sistem bisa bekerja tanpa PLN?",
    a: "Ya, absolut bisa! Sistem PLTS Off-Grid dirancang khusus untuk area yang tidak terjangkau jaringan PLN. Sistem ini menggunakan panel surya yang terhubung ke baterai penyimpanan, sehingga Anda mendapatkan pasokan listrik 24 jam tanpa bergantung pada PLN. Ini sangat ideal untuk kebun, pondok, vila terpencil, pos keamanan, dan area rural lainnya. Tim kami akan melakukan survei dan desain yang tepat untuk memastikan sistem berjalan optimal.",
  },
  {
    q: "Bagaimana performa panel surya saat hujan atau mendung?",
    a: "Panel surya modern tetap menghasilkan energi listrik meskipun saat mendung atau hujan, meskipun kapasitasnya berkurang sekitar 10-25% dibandingkan cuaca cerah. Indonesia yang beriklim tropis justru merupakan lokasi ideal untuk panel surya karena intensitas matahari yang tinggi sepanjang tahun. Untuk sistem Hybrid dan Off-Grid, baterai penyimpanan akan memastikan pasokan listrik tetap stabil. Anda juga tetap bisa menggunakan listrik PLN sebagai backup pada sistem Hybrid.",
  },
  {
    q: "Berapa lama garansi yang diberikan?",
    a: "Kami memberikan garansi yang sangat komprehensif: Panel surya bergaransi performa hingga 25 tahun dengan penurunan output minimal. Inverter bergaransi 5-10 tahun tergantung merek dan model. Baterai penyimpanan bergaransi 5-10 tahun. Instalasi dan pekerjaan bergaransi 2 tahun. Semua garansi didukung langsung oleh PT. Jaya Mandiri Smart Energy dan didokumentasikan secara resmi dalam perjanjian kerja.",
  },
  {
    q: "Apakah tersedia opsi cicilan?",
    a: "Ya, kami memahami bahwa investasi panel surya memerlukan perencanaan keuangan yang matang. Kami menyediakan beberapa opsi pembayaran termasuk cicilan untuk memudahkan Anda. Skema pembayaran dapat disesuaikan dengan kondisi finansial Anda. Hubungi tim sales kami via WhatsApp untuk mendapatkan informasi lebih detail mengenai opsi cicilan dan skema pembayaran yang tersedia saat ini.",
  },
  {
    q: "Apakah atap rumah saya cocok untuk panel surya?",
    a: "Sebagian besar jenis atap cocok untuk instalasi panel surya, termasuk atap datar (flat), atap miring (pitched), dan atap genteng. Faktor penting yang perlu dipertimbangkan adalah arah hadap atap (idealnya menghadap utara/selatan di Indonesia), kemiringan atap, kondisi struktural atap, dan tidak adanya bayangan yang signifikan. Tim kami akan melakukan survei gratis untuk menilai kelayakan atap Anda dan memberikan rekomendasi terbaik.",
  },
  {
    q: "Berapa lama proses instalasi?",
    a: "Proses instalasi standar untuk rumah tangga biasanya memakan waktu 1-3 hari kerja tergantung kapasitas sistem. Untuk proyek bisnis dan industri, waktu instalasi bisa 1-2 minggu. Keseluruhan proses dari survei, desain, pengadaan material, hingga instalasi biasanya memakan waktu 2-4 minggu. Kami berkomitmen untuk menyelesaikan proyek dengan cepat tanpa mengorbankan kualitas.",
  },
];

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold text-solar bg-solar/10 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy dark:text-white mb-6">
            Pertanyaan yang{" "}
            <span className="gradient-text">Sering Diajukan</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Temukan jawaban atas pertanyaan umum seputar instalasi panel surya
            dan layanan PT. Jaya Mandiri Smart Energy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md data-[state=open]:border-solar/20 transition-all"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-navy dark:text-white hover:text-solar hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
