"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/data";

export function Process() {
  const [active, setActive] = useState(0);
  const current = PROCESS_STEPS[active];
  const total = PROCESS_STEPS.length;

  return (
    <section
      id="process"
      aria-label="Process"
      className="relative isolate flex h-full flex-col overflow-clip bg-obsidian"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] mask-radial-center"
      />
      <div
        aria-hidden
        className="absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-gold/8 blur-3xl"
      />

      <div className="container-x relative flex h-full flex-col">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [05] Процесс
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              {total.toString().padStart(2, "0")} этапов · стартует с AI-брифинга
            </span>
          </div>
        </Reveal>

        {/* Heading + paragraph row */}
        <div className="mt-4 grid items-end gap-4 md:mt-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] font-medium leading-[0.96] tracking-[-0.03em] text-bone text-balance">
              {total} этапов.{" "}
              <span className="text-gradient-gold">Без срезов.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[13px] leading-snug text-mist md:ml-auto md:text-right">
              Старт — с AI-брифинга 24/7. Я выдаю один внятный концепт вместо
              пяти «вариантов на выбор».
            </p>
          </Reveal>
        </div>

        {/* Phase E — horizontal vector line + active gold pulse */}
        <div className="relative mt-6 md:mt-8">
          <div
            aria-hidden
            className="absolute left-7 right-7 top-7 h-px bg-line/70 md:top-9"
          />
          <div
            aria-hidden
            className="absolute left-7 top-7 h-px bg-gradient-to-r from-gold-glow via-gold to-transparent transition-[width] duration-700 md:top-9"
            style={{ width: `calc((100% - 56px) * ${active / Math.max(1, total - 1)})` }}
          />
          <ol className="relative grid grid-cols-6 gap-1.5 md:gap-3">
            {PROCESS_STEPS.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <li key={s.n} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Шаг ${s.n} — ${s.label}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full border bg-ink/80 backdrop-blur transition-all duration-300 md:h-[72px] md:w-[72px] ${
                      isActive
                        ? "border-gold scale-110 animate-step-pulse"
                        : isPast
                          ? "border-gold/60"
                          : "border-line/70 hover:border-gold/50"
                    }`}
                  >
                    <span
                      className={`relative font-mono text-[11px] uppercase tracking-[0.25em] transition-colors md:text-[13px] ${
                        isActive
                          ? "text-gold-glow"
                          : isPast
                            ? "text-gold/80"
                            : "text-bone/55"
                      }`}
                    >
                      {s.n}
                    </span>
                    {s.highlight && (
                      <span
                        aria-hidden
                        className="absolute -top-1.5 -right-1.5 inline-flex h-3.5 items-center rounded-full border border-gold/70 bg-ink/90 px-1 font-mono text-[7px] uppercase tracking-[0.2em] text-gold-glow md:text-[8px]"
                      >
                        AI
                      </span>
                    )}
                  </button>
                  <span
                    className={`mt-2 hidden text-center font-mono text-[9px] uppercase tracking-[0.25em] transition-colors md:block ${
                      isActive ? "text-gold-glow" : "text-bone/45"
                    }`}
                  >
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detail card for the active step */}
        <div className="mt-6 min-h-0 flex-1 md:mt-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.n}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`relative h-full overflow-hidden rounded-2xl border p-5 backdrop-blur-md md:p-7 ${
                current.highlight
                  ? "border-gold/40 bg-gradient-to-br from-[#1a1408] via-graphite to-graphite"
                  : "border-line/70 bg-graphite/60"
              }`}
            >
              {current.highlight && (
                <span
                  aria-hidden
                  className="absolute right-4 top-4 inline-flex h-6 items-center rounded-full border border-gold/60 bg-ink/80 px-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-glow"
                >
                  NEW · AI
                </span>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
                  {current.label}
                </span>
                <span className="hidden h-px w-12 bg-line md:block" />
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-glow">
                  <span
                    aria-hidden
                    className="inline-block h-1 w-1 rounded-full bg-gold-glow"
                  />
                  {current.sla}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[clamp(1.3rem,2.8vw,2rem)] font-light leading-[1.08] tracking-[-0.02em] text-bone text-balance">
                {current.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[13px] leading-snug text-mist md:text-[14px]">
                {current.body}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {current.deliverables.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-ink/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-mist md:text-[10px]"
                  >
                    <span className="h-1 w-1 rounded-full bg-gold/80" />
                    {d}
                  </span>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
