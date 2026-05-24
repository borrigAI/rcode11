"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/data";

// Four pillars rewritten as kinetic editorial statements (no "card pattern").
const PILLARS = [
  {
    n: "01",
    headline: "Один лот. Один человек. Одна репутация.",
    body: "Не команда из десяти. Не подряд. Я лично сдаю каждый заказ — поэтому на FunPay 5.0 ровный, без просадок.",
    pill: "5.0 на FunPay",
  },
  {
    n: "02",
    headline: "Дороже выглядит — за те же ₽49–200.",
    body: "Сделано так, чтобы покупатель в первой же секунде подумал, что лот стоит в 3–5 раз больше своей цены.",
    pill: "от ₽49",
  },
  {
    n: "03",
    headline: "~4 часа на статику. Максимум сутки.",
    body: "AI-брифинг занимает 3–5 минут. Дальше — без долгой переписки. Лендинги и боты — 3–5 рабочих дней.",
    pill: "~4ч · 24ч max",
  },
  {
    n: "04",
    headline: "100% по ТЗ. Не «креатив ради креатива».",
    body: "Дизайн — не самовыражение. Это инструмент. Каждый кадр работает на цель: клик, заказ, восприятие.",
    pill: "100% по ТЗ",
  },
];

export function WhyChoose() {
  return (
    <section
      id="why"
      aria-label="Почему Rcode11"
      className="relative isolate overflow-hidden bg-obsidian py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16] mask-radial-center" />
      <div aria-hidden className="absolute -right-32 -bottom-32 h-[40rem] w-[40rem] rounded-full bg-gold/8 blur-3xl" />

      <div className="container-x">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [07] Почему Rcode11
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              манифест · без воды
            </span>
          </div>
        </Reveal>

        {/* Headline + side comparison */}
        <div className="mt-10 grid items-end gap-12 md:mt-14 md:grid-cols-[1.35fr_1fr] md:gap-16">
          <Reveal>
            <h2 className="font-display text-[clamp(2.5rem,6.2vw,5.2rem)] font-medium leading-[0.9] tracking-[-0.04em] text-bone text-balance">
              Дешёвый лот ≠ дешёвый
              <br className="hidden md:block" />
              <span className="text-gradient-gold"> вид.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-mist md:ml-auto md:text-right">
              На FunPay много дизайна за ₽100–200. Цена там одинаковая. Разница только в одном —
              в том, как лот выглядит. У меня лот за ₽{BRAND.entryPrice} зачастую выглядит
              сильнее, чем у конкурентов за ₽1 000.
            </p>
          </Reveal>
        </div>

        {/* Visual comparison — minimal */}
        <Reveal delay={0.18}>
          <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-10">
            <MockLot variant="typical" />
            <MockLot variant="rcode11" />
          </div>
        </Reveal>

        {/* Pillars — editorial manifest list (not card grid) */}
        <ul className="mt-20 md:mt-28">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05} as="li">
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="group relative grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 border-t border-line/70 py-8 md:grid-cols-[5rem_minmax(0,1.4fr)_minmax(0,1fr)_auto] md:gap-x-10 md:py-12"
              >
                {/* Hover gold underline */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gradient-to-r from-gold-glow via-gold to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                {/* Number */}
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold md:text-[13px]">
                  {p.n}
                </span>
                {/* Headline */}
                <h3 className="min-w-0 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-light leading-[1.05] tracking-[-0.025em] text-bone transition-colors duration-500 group-hover:text-gold-glow">
                  {p.headline}
                </h3>
                {/* Body */}
                <p className="col-span-2 max-w-md text-[14px] leading-relaxed text-mist md:col-span-1 md:text-[15px]">
                  {p.body}
                </p>
                {/* Pill */}
                <span className="col-span-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 bg-gold/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow md:col-span-1">
                  <span className="inline-block h-1 w-1 rounded-full bg-gold-glow" />
                  {p.pill}
                </span>
              </motion.div>
            </Reveal>
          ))}
          <li aria-hidden className="block h-px w-full bg-line/70" />
        </ul>
      </div>
    </section>
  );
}

/* Minimal lot mockup — visual story, not text. */
function MockLot({ variant }: { variant: "typical" | "rcode11" }) {
  const isPremium = variant === "rcode11";
  return (
    <article
      className={
        isPremium
          ? "relative overflow-hidden rounded-[26px] border border-gold/35 bg-gradient-to-br from-[#1a1308] via-graphite to-graphite p-7 md:p-9"
          : "relative overflow-hidden rounded-[26px] border border-line/70 bg-graphite/80 p-7 md:p-9"
      }
    >
      {isPremium && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
        </>
      )}

      {/* header chip + price */}
      <div className="relative flex items-center justify-between">
        <span
          className={
            isPremium
              ? "font-mono text-[10px] uppercase tracking-[0.35em] text-gold"
              : "font-mono text-[10px] uppercase tracking-[0.35em] text-mist/70"
          }
        >
          {isPremium ? "Rcode11" : "Обычный лот"}
        </span>
        <span
          className={
            isPremium
              ? "rounded-full border border-gold/60 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow"
              : "rounded-full border border-line/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70"
          }
        >
          {isPremium ? `от ₽${BRAND.entryPrice}` : "₽100–200"}
        </span>
      </div>

      {/* visual area — simulated avatar/banner shape */}
      <div
        className={`relative mt-6 aspect-[5/4] overflow-hidden rounded-[18px] ${
          isPremium
            ? "bg-gradient-to-br from-[#2a1f10] via-[#120c05] to-[#080603]"
            : "bg-gradient-to-br from-[#1d1d1d] via-[#141414] to-[#101010]"
        }`}
      >
        {isPremium ? (
          <>
            {/* Premium: tight typographic mock */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,163,90,0.25),transparent_55%)]" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold-glow">
                Avatar · 1:1 · 1500px
              </span>
              <div>
                <div className="font-display text-2xl leading-tight tracking-[-0.02em] text-bone md:text-3xl">
                  Liquid
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.35em] text-bone/60">
                  музыкальный артист · cover
                </div>
              </div>
            </div>
            {/* subtle dial */}
            <div className="absolute right-3 top-3 h-12 w-12 rounded-full border border-gold/40" />
          </>
        ) : (
          <>
            {/* Typical: hap-hazard layout with poor hierarchy */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.04),transparent_55%)]" />
            <div className="absolute inset-3 flex flex-col items-start gap-2">
              <div className="rounded-md bg-bone/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-mist">
                AVA 600x600
              </div>
              <div className="rounded-md bg-bone/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-mist">
                любой стиль
              </div>
              <div className="ml-auto mt-auto rounded-md bg-bone/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-mist">
                3–7 дней
              </div>
            </div>
            <div className="absolute inset-x-3 bottom-3 h-8 rounded-md bg-bone/5" />
          </>
        )}
      </div>

      {/* bottom row */}
      <div className="relative mt-5 flex items-center justify-between text-[12px]">
        <span className={isPremium ? "text-bone/85" : "text-mist/70"}>
          {isPremium ? "Сдача за ~4 часа · 5.0 рейтинг" : "Сроки плавающие · без портфолио"}
        </span>
        {isPremium && (
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
            →
          </span>
        )}
      </div>
    </article>
  );
}
