"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/data";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section
      id="process"
      aria-label="Process"
      ref={ref}
      className="relative isolate overflow-clip bg-obsidian py-28 md:py-40"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16] mask-radial-center" />
      <div aria-hidden className="absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-gold/8 blur-3xl" />

      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [05] Процесс
              </span>
              <h2 className="mt-4 font-display text-[clamp(2.3rem,5.4vw,4rem)] font-medium leading-[0.94] tracking-[-0.035em] text-bone text-balance">
                Шесть этапов.
                <br />
                <span className="text-gradient-gold">Без срезов.</span>
              </h2>
              <p className="mt-6 max-w-md text-mist">
                Старт — с AI-брифинга, который работает круглосуточно. Вы пишете
                задачу в любое время, ассистент собирает вводные, я подключаюсь и
                выдаю один внятный концепт вместо пяти «вариантов на выбор».
              </p>

              <div className="mt-10 hidden flex-col gap-4 lg:flex">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-gold/60" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
                      Средний срок сдачи
                    </span>
                  </div>
                  <span className="font-display text-3xl text-gradient-bone">
                    статика — ±4 часа
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-10 bg-gold/40" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      Лендинги и Telegram-боты
                    </span>
                  </div>
                  <span className="font-display text-2xl text-mist">
                    3–5 рабочих дней
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical rail */}
            <div aria-hidden className="absolute left-7 top-0 h-full w-px bg-line/70 md:left-9" />
            <motion.div
              aria-hidden
              style={{ height: lineH }}
              className="absolute left-7 top-0 w-px bg-gradient-to-b from-gold-glow via-gold to-transparent md:left-9"
            />

            <ol className="flex flex-col gap-12">
              {PROCESS_STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.05} as="li">
                  <div className="relative grid grid-cols-[3.5rem_1fr] gap-6 pl-1 md:grid-cols-[4.5rem_1fr] md:gap-10">
                    <div className="relative flex items-start justify-center">
                      <span
                        className={`relative inline-flex h-14 w-14 items-center justify-center rounded-full border bg-ink/80 backdrop-blur md:h-16 md:w-16 ${
                          s.highlight ? "border-gold" : "border-gold/50"
                        }`}
                      >
                        <span
                          className={`absolute inset-0 rounded-full blur-md ${
                            s.highlight ? "bg-gold/30" : "bg-gold/10"
                          }`}
                        />
                        {s.highlight && (
                          <span
                            aria-hidden
                            className="absolute inset-0 animate-ping rounded-full bg-gold/20"
                          />
                        )}
                        <span className="relative font-mono text-[12px] uppercase tracking-[0.25em] text-gold-glow">
                          {s.n}
                        </span>
                      </span>
                    </div>
                    <div
                      className={`relative rounded-3xl border p-6 backdrop-blur-md md:p-8 ${
                        s.highlight
                          ? "border-gold/40 bg-gradient-to-br from-[#1a1408] via-graphite to-graphite"
                          : "border-line/70 bg-graphite/60"
                      }`}
                    >
                      {s.highlight && (
                        <span
                          aria-hidden
                          className="absolute -right-2 -top-2 inline-flex h-6 items-center rounded-full border border-gold/60 bg-ink/80 px-2 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-glow"
                        >
                          NEW · AI
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
                          {s.label}
                        </span>
                        <span className="h-px flex-1 bg-line" />
                      </div>
                      <h3 className="mt-3 font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.08] tracking-[-0.02em] text-bone text-balance">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-mist">{s.body}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {s.deliverables.map((d) => (
                          <span
                            key={d}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mist"
                          >
                            <span className="h-1 w-1 rounded-full bg-gold/80" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
