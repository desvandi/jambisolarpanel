import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import type { ArticleBlock } from "@/content/articles/types";
import { buildTocHeadings } from "@/lib/anchor";

/**
 * Renderer blok konten artikel (server component, tanpa JS tambahan).
 * Setiap h2 mendapat id anchor untuk Daftar Isi & deep-linking —
 * id dihitung dengan logika yang sama dengan ToC halaman artikel.
 */
export function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  const headings = buildTocHeadings(
    blocks.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2")
      .map((b) => b.text)
  );
  let headingIndex = 0;

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2": {
            const heading = headings[headingIndex++];
            return (
              <h2
                key={i}
                id={heading?.id}
                className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-white pt-4 scroll-mt-24"
              >
                {block.text}
              </h2>
            );
          }
          case "h3":
            return (
              <h3
                key={i}
                className="text-xl font-bold text-navy dark:text-white pt-2"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-base text-foreground/90 leading-relaxed">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-foreground/90 leading-relaxed">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-solar flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5 list-decimal pl-5 marker:text-solar marker:font-bold">
                {block.items.map((item, j) => (
                  <li key={j} className="text-foreground/90 leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <figure key={i} className="space-y-2">
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-navy text-white text-left">
                        {block.headers.map((h, j) => (
                          <th key={j} className="px-4 py-3 font-semibold whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-t border-border odd:bg-muted/40">
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-3 text-foreground/90 align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {block.caption ? (
                  <figcaption className="text-xs text-muted-foreground text-center">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "note":
            return (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl bg-solar/5 border border-solar/20"
              >
                <Info className="w-5 h-5 text-solar flex-shrink-0 mt-0.5" />
                <div>
                  {block.title ? (
                    <p className="font-bold text-navy dark:text-white mb-1">{block.title}</p>
                  ) : null}
                  <p className="text-sm text-foreground/90 leading-relaxed">{block.text}</p>
                </div>
              </div>
            );
          case "cta":
            return (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-solar/10 to-gold/10 border border-solar/20"
              >
                <p className="text-foreground/90 leading-relaxed mb-4">{block.text}</p>
                <Link
                  href={block.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-solar hover:bg-solar-dark text-white font-semibold text-sm rounded-full transition-colors"
                >
                  {block.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          case "links":
            return (
              <div key={i} className="p-5 rounded-2xl bg-card border border-border">
                <p className="font-bold text-navy dark:text-white mb-3">{block.intro}</p>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={item.href}
                        className="group inline-flex items-baseline gap-2 text-sm"
                      >
                        <ArrowRight className="w-3.5 h-3.5 text-solar flex-shrink-0 relative top-0.5 group-hover:translate-x-1 transition-transform" />
                        <span>
                          <span className="font-semibold text-solar group-hover:underline underline-offset-2">
                            {item.label}
                          </span>
                          {item.desc ? (
                            <span className="text-muted-foreground"> — {item.desc}</span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
