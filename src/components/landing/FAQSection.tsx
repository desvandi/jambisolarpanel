"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homepageFaqs } from "@/lib/faq";

/**
 * FAQ UI membaca dari src/lib/faq.ts — sumber yang sama dengan FAQPage JSON-LD.
 * Tanpa framer-motion untuk mengurangi JavaScript pada section bawah fold.
 */
export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
        </div>

        <div>
          <Accordion type="single" collapsible className="space-y-3">
            {homepageFaqs.map((faq, i) => (
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
        </div>
      </div>
    </section>
  );
}
