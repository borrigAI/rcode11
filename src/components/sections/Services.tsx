"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND, SERVICES } from "@/lib/data";

// Compact, scannable copy that complements the menu format.
const TEASERS: Record<string, { short: string; sla: string }> = {
  Аватарки: { short: "Сильный силуэт, читаемый свет, характер.", sla: "~4ч" },
  Баннеры: { short: "Шапка канала, которая выглядит дороже лота.", sla: "~4ч" },
  Логотипы: { short: "Знак, wordmark и пакет файлов под бренд.", sla: "~4ч" },
  Превью: { short: "Обложки YouTube, собранные под CTR.", sla: "~4ч" },
  "Карточки товаров": { short: "Карточки маркетплейса, которые продают.", sla: "~4ч" },
  Лендинги: { short: "Посадочные под лот, продукт или бренд.", sla: "3–5 д" },
  "Telegram-боты": { short: "Боты под заявки, продажи и CRM.", sla: "3–5 д" },
};

export function Services() {
  return (
    <section
      id="services"
      aria-label="Услуги"
      className="relative isolate overflow-clip bg-ink py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12] mask-radial-center" />
      <div aria-hidden className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/[0.05] blur-3xl" />

      <div className="container-x">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [03] Услуги
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              {SERVICES.length.toString().padStart(2, "0")} направлений · 1 исполнитель
            </span>
          </div>
        </Reveal>

        {/* Heading split */}
        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="font-display text-[clamp(2.3rem,5.6vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.035em] text-bone text-balance">
              Семь направлений.
              <br />
              <span className="text-gradient-gold">Один человек.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-[15px] leading-relaxed text-mist md:ml-auto md:text-right">
              Каждое направление — закрытая система: свой стиль, шаблоны под площадку и сотни
              закрытых сделок. Никакого «дизайна на всё подряд».
            </p>
          </Reveal>
        </div>

        {/* Editorial menu */}
        <ul className="mt-12 md:mt-16">
          {SERVICES.map((s, i) => {
            const t = TEASERS[s.category] ?? { short: s.body, sla: "~4ч" };
            return (
              <Reveal key={s.n} delay={i * 0.04} as="li">
                <motion.a
                  href={s.href ?? BRAND.funpay}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 border-t border-line/70 py-6 md:grid-cols-[3.5rem_minmax(0,1.2fr)_minmax(0,1.5fr)_auto_auto] md:gap-x-8 md:py-8"
                  aria-label={`${s.category} — открыть лот на FunPay`}
                >
                  {/* Hover gold underline */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gradient-to-r from-gold-glow via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />

                  {/* Number */}
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                    {s.n}
                  </span>

                  {/* Service name */}
                  <h3 className="min-w-0 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-bone transition-colors duration-500 group-hover:text-gold-glow">
                    <span className="block break-words">{s.category}</span>
                  </h3>

                  {/* Teaser + formats */}
                  <div className="col-span-2 flex min-w-0 flex-col gap-2 md:col-span-1">
                    <span className="text-[14px] leading-snug text-mist md:text-[15px]">
                      {t.short}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {s.formats.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-line/80 bg-ink/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-bone/65"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* SLA badge */}
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55 md:inline-flex md:items-center md:gap-2">
                    <span className="inline-block h-1 w-1 rounded-full bg-gold/70" />
                    {t.sla}
                  </span>

                  {/* Open arrow */}
                  <span
                    aria-hidden
                    className="hidden h-10 w-10 items-center justify-center rounded-full border border-line/80 bg-graphite/60 text-bone/70 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold-glow md:inline-flex"
                  >
                    →
                  </span>

                  {/* Mobile inline meta */}
                  <span className="col-span-3 mt-1 inline-flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55 md:hidden">
                    <span className="flex items-center gap-2">
                      <span className="inline-block h-1 w-1 rounded-full bg-gold/70" />
                      {t.sla}
                    </span>
                    <span className="text-gold-glow">FunPay ↗</span>
                  </span>
                </motion.a>
              </Reveal>
            );
          })}
          <li
            aria-hidden
            className="block h-px w-full bg-line/70"
          />
        </ul>

        {/* Footnote */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="max-w-md text-[13px] text-muted">
              Все цены и форматы — на странице лота FunPay. Сделка ведётся через площадку,
              с гарантией возврата на её стороне.
            </p>
            <a
              href={BRAND.funpay}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow transition-colors hover:bg-gold/20"
            >
              Все лоты на FunPay
              <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
