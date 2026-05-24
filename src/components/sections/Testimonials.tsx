"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

const AUTOPLAY_MS = 8000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      aria-label="Отзывы"
      className="relative isolate overflow-clip bg-ink py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.13] mask-radial-center" />
      <div aria-hidden className="absolute -left-32 top-1/3 h-[40rem] w-[40rem] rounded-full bg-gold/[0.07] blur-3xl" />

      <div className="container-x">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [06] Отзывы
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              750+ отзывов · 5.0 на FunPay
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-display text-[clamp(2.3rem,5.6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.035em] text-bone text-balance">
              Голос
              <br />
              <span className="text-gradient-gold">FunPay-клиентов.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-[15px] leading-relaxed text-mist md:ml-auto md:text-right">
              Без подбора в свою пользу. Ниже — реальные формулировки. Клиенты в один голос
              отмечают скорость, точность по ТЗ и визуал на класс выше площадки.
            </p>
          </Reveal>
        </div>

        {/* Featured quote */}
        <div
          className="mt-12 md:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <article className="relative overflow-hidden rounded-[28px] border border-line/70 bg-gradient-to-br from-graphite to-[#0d0d0d] p-7 md:p-12">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
              <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

              <div className="relative flex flex-col gap-8 md:gap-12">
                <div className="flex items-center justify-between">
                  <Stars />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Отзыв · FunPay
                  </span>
                </div>

                <div className="min-h-[180px] md:min-h-[220px]">
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-light leading-[1.18] tracking-[-0.015em] text-bone text-balance"
                    >
                      «{current.quote}»
                    </motion.blockquote>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-start justify-between gap-5 border-t border-line/70 pt-6 md:flex-row md:items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`meta-${active}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-display text-base text-gold-glow">
                        {initials(current.name)}
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <span className="font-display text-lg text-bone">{current.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                          {current.role}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center gap-3">
                    <NavButton
                      direction="left"
                      onClick={() =>
                        setActive((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                      }
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/55">
                      {(active + 1).toString().padStart(2, "0")} /{" "}
                      {TESTIMONIALS.length.toString().padStart(2, "0")}
                    </span>
                    <NavButton
                      direction="right"
                      onClick={() => setActive((p) => (p + 1) % TESTIMONIALS.length)}
                    />
                  </div>
                </div>

                {/* Autoplay progress */}
                <div className="relative h-px w-full overflow-hidden bg-line/70">
                  <motion.div
                    key={`bar-${active}-${paused ? "p" : "r"}`}
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: paused ? 0.2 : AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-glow via-gold to-gold-deep"
                  />
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Footnote — link to all reviews */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-md text-[13px] text-muted">
              Реальные отзывы с FunPay. На профиле — 750+ оценок, все 5.0 без единой просадки.
            </p>
            <a
              href="https://funpay.com/users/9159608/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow transition-colors hover:bg-gold/20"
            >
              Все отзывы на FunPay
              <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NavButton({
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
      onClick={onClick}
      aria-label={isLeft ? "Предыдущий отзыв" : "Следующий отзыв"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-ink/60 text-bone/70 transition-colors hover:border-gold/60 hover:bg-gold/10 hover:text-gold-glow"
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
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

function Stars({ size = 12 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 1.5l1.96 4.16 4.54.5-3.4 3.07.9 4.47L8 11.49 3.99 13.7l.91-4.47L1.5 6.16l4.54-.5L8 1.5z"
            fill="#d9b878"
          />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? "" : "";
  return (first + last).toUpperCase();
}
