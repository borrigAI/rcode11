"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/data";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { cn } from "@/lib/utils";

const layoutSpan: Record<PortfolioItem["layout"], string> = {
  wide: "lg:col-span-8 lg:row-span-1",
  tall: "lg:col-span-4 lg:row-span-2",
  square: "lg:col-span-4 lg:row-span-1",
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Portfolio() {
  const [active, setActive] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>("Все");
  const [open, setOpen] = useState<PortfolioItem | null>(null);

  const items = useMemo(
    () =>
      active === "Все"
        ? PORTFOLIO
        : PORTFOLIO.filter((p) => p.category === active),
    [active]
  );

  return (
    <section
      id="portfolio"
      aria-label="Портфолио"
      className="relative isolate overflow-hidden bg-ink py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18] mask-radial-center" />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [04] Избранные работы
              </span>
              <h2 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.03em] text-bone md:text-7xl">
                Архив сданных
                <br />
                <span className="text-gradient-gold">FunPay-сделок.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-mist">
              Публично показана лишь часть работ. Большинство проектов выходит под NDA —
              конфиденциальность входит в условия.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-2 border-y border-line/60 py-4">
            {PORTFOLIO_CATEGORIES.map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300",
                    isActive
                      ? "border-gold/70 bg-gold/10 text-gold-glow"
                      : "border-line/70 bg-graphite/40 text-mist hover:border-line hover:text-bone"
                  )}
                >
                  {c}
                </button>
              );
            })}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              {items.length.toString().padStart(2, "0")} / {PORTFOLIO.length.toString().padStart(2, "0")} показано
            </span>
          </div>
        </Reveal>

        <div
          className={cn(
            "mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:grid-flow-dense",
            "auto-rows-[22rem] lg:auto-rows-[20rem]"
          )}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                onClick={() => setOpen(item)}
                className={cn(
                  "group relative block overflow-hidden rounded-[28px] border border-line/70 bg-graphite text-left transition-shadow duration-500",
                  layoutSpan[item.layout],
                  "hover:shadow-[0_40px_120px_-30px_rgba(201,163,90,0.35)]"
                )}
              >
                <div className="absolute inset-0">
                  <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ProjectVisual item={item} />
                  </motion.div>
                </div>

                {/* Bottom info plate */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 md:p-6">
                  <div className="rounded-2xl border border-line/70 bg-ink/70 px-4 py-3 backdrop-blur-xl">
                    <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold/90">
                      {item.category}
                    </div>
                    <div className="mt-1 font-display text-xl leading-tight text-bone">
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-mist/80">
                      {item.client} · {item.year}
                    </div>
                  </div>
                  <span className="hidden rounded-full border border-line/70 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80 backdrop-blur-xl md:inline-flex">
                    {item.metric}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute right-5 top-5 z-[6] inline-flex items-center gap-1.5 rounded-full border border-bone/30 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                  Открыть кейс
                  <span aria-hidden>→</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <CaseModal item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function CaseModal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-ink/85 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] border border-line/80 bg-graphite md:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-[520px]">
              <ProjectVisual item={item} mode="modal" />
            </div>
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                  Кейс · {item.id.toUpperCase()}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Закрыть"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-ink/60 text-mist transition-colors hover:border-gold/60 hover:text-gold-glow"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist/70">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-4xl font-light leading-[1] tracking-[-0.02em] text-bone">
                  {item.title}
                </h3>
                <p className="mt-2 text-mist">{item.client}</p>
              </div>
              <p className="text-bone/90">{item.copy}</p>
              <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40">
                {[
                  ["Год", item.year.toString()],
                  ["Результат", item.metric],
                  ["Формат", item.ticker],
                  ["Статус", "Сдан"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 bg-graphite p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {k}
                    </span>
                    <span className="font-display text-base text-bone">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-muted">
                  Полный кейс под NDA. Предоставляется по запросу.
                </span>
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/70 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-glow transition-colors hover:bg-gold/10"
                >
                  Обсудить задачу
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
