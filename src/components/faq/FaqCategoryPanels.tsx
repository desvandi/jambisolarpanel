"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Wallet, Cpu, ClipboardCheck, CalendarClock } from "lucide-react";
import type { FaqCategory } from "@/lib/faq";

const CATEGORY_ICONS = {
  "biaya-investasi": Wallet,
  "teknis-sistem": Cpu,
  "proses-layanan": ClipboardCheck,
  "sewa-plts": CalendarClock,
} as const;

/**
 * Panel FAQ terkategorisasi untuk halaman /faq.
 * Scrollspy pada chip kategori (sticky di bawah navbar).
 */
export function FaqCategoryPanels({ categories }: { categories: FaqCategory[] }) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("faq-", "");
          setActiveCategory(id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 1] }
    );

    categories.forEach(({ id }) => {
      const el = document.getElementById(`faq-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <div>
      {/* Sticky category chips */}
      <div className="sticky top-16 md:top-20 z-30 -mx-4 px-4 py-3 bg-background/90 backdrop-blur-md border-b border-border mb-10">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Kategori FAQ">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS];
            const active = activeCategory === cat.id;
            return (
              <a
                key={cat.id}
                href={`#faq-${cat.id}`}
                role="tab"
                aria-selected={active}
                data-active={active}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(`faq-${cat.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`link-underline relative inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "border-solar bg-solar/10 text-solar"
                    : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {Icon ? <Icon className="w-4 h-4" /> : null}
                {cat.title}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    active ? "bg-solar/20 text-solar" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {cat.items.length}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-14">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id as keyof typeof CATEGORY_ICONS];
          return (
            <section key={cat.id} id={`faq-${cat.id}`} className="scroll-mt-36 md:scroll-mt-40">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-solar/10 border border-solar/20 flex items-center justify-center flex-shrink-0">
                  {Icon ? <Icon className="w-6 h-6 text-solar" /> : null}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white">
                    {cat.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mt-1">
                    {cat.description}
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {cat.items.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`${cat.id}-${i}`}
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
