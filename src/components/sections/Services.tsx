"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES, BRAND } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      aria-label="Услуги"
      className="relative isolate overflow-hidden bg-ink py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] mask-radial-center" />
      <div aria-hidden className="absolute -right-32 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/[0.05] blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [03] Услуги
              </span>
              <h2 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.03em] text-bone md:text-7xl">
                Пять направлений.
                <br />
                <span className="text-gradient-gold">Без «дизайна вообще».</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-mist md:ml-auto md:text-right">
              Делаю только то, в чём наработал систему и стиль. Каждое направление —
              со своим воркфлоу, форматами под площадку и опытом в сотнях сданных
              сделок на FunPay.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line/70 bg-line/40 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06} className="contents">
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="group relative flex flex-col justify-between gap-6 bg-graphite/70 p-7 backdrop-blur transition-colors duration-500 hover:bg-elevated md:p-8"
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
                <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gold/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
                    {s.n}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">
                    {s.category}
                  </span>
                </div>

                <div className="relative flex flex-col gap-4">
                  <h3 className="font-display text-2xl font-medium leading-[1.05] tracking-[-0.02em] text-bone">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-mist">{s.body}</p>
                </div>

                <div className="relative flex flex-wrap gap-2">
                  {s.formats.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-ink/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/85"
                    >
                      <span className="h-1 w-1 rounded-full bg-gold/70" />
                      {f}
                    </span>
                  ))}
                </div>

                <a
                  href={BRAND.funpay}
                  className="relative mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow transition-colors hover:text-bone"
                >
                  Заказать через FunPay
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
