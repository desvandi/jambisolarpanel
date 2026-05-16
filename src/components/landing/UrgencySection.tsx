"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Gift, MessageCircle, ArrowRight } from "lucide-react";

const WA_LINK =
  "https://wa.me/6281328190707?text=Halo%20PT.%20Jaya%20Mandiri%20Smart%20Energy,%20saya%20tertarik%20promo%20konsultasi%20gratis%20panel%20surya";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set deadline to end of current month
    const now = new Date();
    const deadline = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs text-white/60 mt-2 font-medium">{unit.label}</p>
        </div>
      ))}
    </div>
  );
}

export function UrgencySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 solar-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-solar/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold-light text-sm font-bold animate-shimmer">
            <Gift className="w-4 h-4" />
            PENAWARAN TERBATAS BULAN INI
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            Gratis Konsultasi +{" "}
            <span className="text-gold-light">Desain Awal</span>
            <br />
            untuk Anda yang Menghubungi Kami Bulan Ini
          </h2>

          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Jangan lewatkan kesempatan mendapatkan konsultasi gratis dan desain
            sistem awal tanpa biaya. Penawaran ini terbatas untuk pendaftar
            bulan ini saja. Ambil langkah pertama menuju energi mandiri sekarang.
          </p>

          {/* Countdown */}
          <div className="mb-10">
            <p className="text-sm text-white/50 mb-4 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Sisa waktu penawaran bulan ini:
            </p>
            <CountdownTimer />
          </div>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {[
              "Konsultasi Gratis",
              "Desain Awal Gratis",
              "Survei Area Tertentu",
              "Estimasi ROI Detail",
            ].map((benefit) => (
              <span
                key={benefit}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20"
              >
                <ArrowRight className="w-3 h-3 text-solar-light" />
                {benefit}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && (window as Record<string, unknown>).fbq) {
                (window as Record<string, (...args: unknown[]) => void>).fbq!('track', 'Lead');
              }
            }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold hover:bg-gold-light text-navy font-extrabold text-lg rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-gold/30 hover:scale-105 animate-whatsapp-pulse"
          >
            <MessageCircle className="w-6 h-6" />
            Klaim Penawaran Gratis Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
