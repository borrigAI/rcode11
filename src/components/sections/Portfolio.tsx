"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/data";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [active, setActive] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>("Все");
  const [open, setOpen] = useState<PortfolioItem | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState({ current: 1, total: 0 });

  const items = useMemo(
    () =>
      active === "Все"
        ? PORTFOLIO
        : PORTFOLIO.filter((p) => p.category === active),
    [active]
  );

  useEffect(() => {
    // reset scroll when filter changes
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);

    // figure out visible card index
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (!cards.length) return;
    const rectLeft = el.getBoundingClientRect().left;
    let best = 0;
    let bestDelta = Number.POSITIVE_INFINITY;
    cards.forEach((c, i) => {
      const d = Math.abs(c.getBoundingClientRect().left - rectLeft - 12);
      if (d < bestDelta) {
        bestDelta = d;
        best = i;
      }
    });
    setPosition({ current: best + 1, total: cards.length });
  };

  useEffect(() => {
    // initial calc once items render
    requestAnimationFrame(onScroll);
  }, [items]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.clientWidth + 20 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="portfolio"
      aria-label="Портфолио"
      className="relative isolate overflow-clip bg-ink py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] mask-radial-center" />

      <div className="container-x">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [04] Работы
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              выберите категорию · листайте вправо
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-display text-[clamp(2.3rem,5.6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.035em] text-bone text-balance">
              Что вас интересует
              <br />
              <span className="text-gradient-gold">из работ?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-[15px] leading-relaxed text-mist md:ml-auto md:text-right">
              Выберите направление — ниже появятся реальные работы. Листайте вправо, чтобы
              увидеть все. Часть проектов под NDA — обозначены отдельно.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Category picker — full-bleed scroll on mobile */}
      <div className="mt-10 md:mt-14">
        <div
          className="no-scrollbar flex gap-2 overflow-x-auto"
          style={{
            paddingLeft: "max(1.375rem, 4.2vw)",
            paddingRight: "max(1.375rem, 4.2vw)",
          }}
        >
          {PORTFOLIO_CATEGORIES.map((c) => {
            const isActive = active === c;
            const count =
              c === "Все"
                ? PORTFOLIO.length
                : PORTFOLIO.filter((p) => p.category === c).length;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={cn(
                  "group relative inline-flex flex-none items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300",
                  isActive
                    ? "border-gold/70 bg-gold/10 text-gold-glow shadow-[0_10px_40px_-10px_rgba(201,163,90,0.45)]"
                    : "border-line/70 bg-graphite/40 text-mist hover:border-line hover:text-bone"
                )}
              >
                <span>{c}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] tracking-[0.2em]",
                    isActive ? "bg-ink/60 text-gold-glow" : "bg-ink/60 text-muted"
                  )}
                >
                  {count.toString().padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel header — counter + arrows */}
      <div className="container-x mt-8 flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          {position.current.toString().padStart(2, "0")} /{" "}
          {position.total.toString().padStart(2, "0")}
          <span className="ml-3 text-muted">показано</span>
        </span>

        <div className="flex items-center gap-2">
          <CarouselArrow direction="left" onClick={() => scrollByCard(-1)} />
          <CarouselArrow direction="right" onClick={() => scrollByCard(1)} />
        </div>
      </div>

      {/* Track */}
      <div className="relative mt-4">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar relative flex gap-5 overflow-x-auto scroll-smooth pb-4 [scroll-snap-type:x_mandatory] md:gap-6"
          style={{
            paddingLeft: "max(1.375rem, 4.2vw)",
            paddingRight: "max(1.375rem, 4.2vw)",
            scrollPaddingLeft: "max(1.375rem, 4.2vw)",
          }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              // Each card matches its work's natural aspect ratio so nothing is cropped.
              // Width = height × ratio; height is fluid (responsive clamp via CSS var).
              const ratio = item.image
                ? item.image.width / item.image.height
                : item.layout === "wide"
                  ? 16 / 9
                  : item.layout === "tall"
                    ? 4 / 5
                    : 1;
              return (
                <motion.button
                  key={item.id}
                  data-card
                  layout
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                  onClick={() => setOpen(item)}
                  className={cn(
                    "group relative flex-none overflow-hidden rounded-[28px] border border-line/70 bg-graphite text-left transition-shadow duration-500",
                    "[scroll-snap-align:start]",
                    "hover:shadow-[0_40px_120px_-30px_rgba(201,163,90,0.35)]"
                  )}
                  style={{
                    // height responsive — width follows aspect ratio so work renders whole, no cropping
                    height: "clamp(360px, 60vh, 600px)",
                    aspectRatio: `${ratio}`,
                  }}
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

                  {/* Top chrome */}
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 p-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/75 backdrop-blur-md">
                      {item.category}
                    </span>
                    {item.status === "nda" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-glow backdrop-blur-md">
                        NDA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/20 bg-ink/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/75 backdrop-blur-md">
                        {item.year}
                      </span>
                    )}
                  </div>

                  {/* Bottom info — minimal */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-1 p-5 md:p-6">
                    <span className="font-display text-xl leading-tight text-bone md:text-2xl">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-bone/65">
                      {item.client}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink/80 via-ink/0 to-ink/15 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Open badge */}
                  <div className="pointer-events-none absolute right-5 top-1/2 z-[6] inline-flex -translate-y-1/2 translate-x-4 items-center gap-1.5 rounded-full border border-gold/50 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                    Открыть
                    <span aria-hidden>→</span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-24"
        />

        {/* Progress bar */}
        <div className="container-x mt-4">
          <div className="relative h-px w-full overflow-hidden bg-line/70">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-glow via-gold to-gold-deep"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Mobile hint */}
      <div className="container-x mt-6 flex items-center gap-2 md:hidden">
        <span aria-hidden className="font-mono text-[10px] text-gold-glow">←</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          свайп для смены работы
        </span>
        <span aria-hidden className="font-mono text-[10px] text-gold-glow">→</span>
      </div>

      <CaseModal item={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const isLeft = direction === "left";
  return (
    <button
      type="button"
      aria-label={isLeft ? "Предыдущая работа" : "Следующая работа"}
      onClick={onClick}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-graphite/60 text-bone/70 transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold-glow"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path
          d={isLeft ? "M9 2L4 7l5 5" : "M5 2l5 5-5 5"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
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
            <div className="flex flex-col gap-6 p-7 md:p-10">
              <div className="flex items-center justify-between gap-3">
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
              <p className="text-[15px] leading-relaxed text-bone/90">{item.copy}</p>
              <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40">
                {[
                  ["Год", item.year.toString()],
                  ["Результат", item.metric],
                  ["Формат", item.ticker],
                  ["Статус", item.status === "nda" ? "Под NDA" : "Сдан"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 bg-graphite p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {k}
                    </span>
                    <span className="text-sm leading-tight text-bone">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
