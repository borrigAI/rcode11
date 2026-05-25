"use client";

import { motion } from "motion/react";
import { useState } from "react";
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
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section
      id="services"
      aria-label="Услуги"
      className="relative isolate flex h-full flex-col overflow-clip"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.10] mask-radial-center"
      />
      <div
        aria-hidden
        className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-gold/[0.05] blur-3xl"
      />

      {/* Phase E — giant background numeral that mirrors the hovered service.
         Pure CSS, GPU only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          key={hover ?? "idle"}
          className="font-display font-light leading-none text-gradient-gold opacity-[0.06] transition-opacity duration-700"
          style={{ fontSize: "clamp(18rem, 38vw, 36rem)" }}
        >
          {hover ?? "07"}
        </span>
      </div>

      <div className="container-x relative flex h-full flex-col">
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

        {/* Heading split — tighter clamp & spacing for 100svh fit */}
        <div className="mt-4 grid items-end gap-4 md:mt-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] font-medium leading-[0.96] tracking-[-0.03em] text-bone text-balance">
              Семь направлений.{" "}
              <span className="text-gradient-gold">Один человек.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[13px] leading-snug text-mist md:ml-auto md:text-right">
              Каждое направление — закрытая система: свой стиль, шаблоны под площадку и
              сотни закрытых сделок.
            </p>
          </Reveal>
        </div>

        {/* Editorial menu — compact rows */}
        <ul className="mt-4 md:mt-6 border-t border-line/70">
          {SERVICES.map((s, i) => {
            const t = TEASERS[s.category] ?? { short: s.body, sla: "~4ч" };
            return (
              <Reveal key={s.n} delay={i * 0.03} as="li">
                <motion.a
                  href={s.href ?? BRAND.funpay}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  onMouseEnter={() => setHover(s.n)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(s.n)}
                  onBlur={() => setHover(null)}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                  className="group relative grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 border-b border-line/60 py-2 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.4fr)_auto] md:gap-x-6 md:py-2.5"
                  aria-label={`${s.category} — открыть лот на FunPay`}
                >
                  {/* Hover gold underline */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-gold-glow via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />

                  {/* Number */}
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold md:text-[11px]">
                    {s.n}
                  </span>

                  {/* Service name */}
                  <h3 className="min-w-0 font-display text-[clamp(1.05rem,2.1vw,1.6rem)] font-light leading-[1.1] tracking-[-0.02em] text-bone transition-colors duration-500 group-hover:text-gold-glow">
                    <span className="block truncate">{s.category}</span>
                  </h3>

                  {/* Teaser — desktop only, single line */}
                  <span className="hidden truncate text-[12px] leading-snug text-mist md:block md:text-[13px]">
                    {t.short}
                  </span>

                  {/* SLA badge + arrow */}
                  <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-block h-1 w-1 rounded-full bg-gold/70" />
                      {t.sla}
                    </span>
                    <span
                      aria-hidden
                      className="hidden h-7 w-7 items-center justify-center rounded-full border border-line/80 bg-graphite/60 text-bone/70 transition-all duration-500 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold-glow md:inline-flex"
                    >
                      →
                    </span>
                  </span>
                </motion.a>
              </Reveal>
            );
          })}
        </ul>

        {/* Footnote — single compact row */}
        <Reveal delay={0.18}>
          <div className="mt-3 flex flex-col items-start justify-between gap-2 md:mt-4 md:flex-row md:items-center">
            <p className="max-w-md text-[12px] text-muted">
              Все цены и форматы — на странице лота FunPay. Сделка ведётся через площадку.
            </p>
            <a
              href={BRAND.funpay}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow transition-colors hover:bg-gold/20"
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
