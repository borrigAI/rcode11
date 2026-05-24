"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/lib/data";

const MARQUEE_ITEMS = [
  "1 000+ выполненных заказов",
  "750+ отзывов",
  "5.0 на FunPay",
  "~4 часа в среднем",
  "макс. сутки даже с очередью",
  "AI-брифинг 3–5 минут",
  "Лоты от ₽99",
  "Один живой аккаунт",
  "100% по ТЗ",
  "Лендинги и Telegram-боты",
];

const KPI = [
  { value: "1 000+", label: "выполненных", sub: "заказов на FunPay" },
  { value: "750+", label: "верифицированных", sub: "отзывов" },
  { value: "~4 ч", label: "средний", sub: "срок статики" },
  { value: "100%", label: "по ТЗ", sub: "без вычурных правок" },
];

export function Trust() {
  return (
    <section
      id="trust"
      aria-label="Доверие"
      className="relative isolate overflow-clip bg-obsidian py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] mask-radial-center" />
      <div aria-hidden className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-3xl" />

      <div className="container-x">
        {/* Eyebrow row */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
              [02] Доверие
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              {BRAND.experienceYears} года на FunPay · профиль #9159608
            </span>
          </div>
        </Reveal>

        {/* Editorial composition: big rating + accompanying paragraph */}
        <div className="mt-12 grid items-end gap-12 lg:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <RatingAnchor />
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-8">
              <h2 className="font-display text-[clamp(2.3rem,5.4vw,4rem)] font-medium leading-[0.94] tracking-[-0.035em] text-bone text-balance">
                Не «обещаю».
                <br />
                <span className="text-gradient-gold">Уже доказал.</span>
              </h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-mist md:text-base">
                Два года на FunPay, один живой аккаунт без обнуления, тысячи закрытых сделок и
                ни одного «исчез и не отдал». Статика уходит в среднем за 4 часа, лендинги и
                боты — 3–5 рабочих дней. Рабочее время — 05:00–17:00 МСК.
              </p>

              {/* Mini KPI row — minimal, editorial, no card chrome */}
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line/70 pt-8 sm:grid-cols-4">
                {KPI.map((k) => (
                  <li key={k.value} className="flex flex-col gap-1.5 min-w-0">
                    <span className="font-display text-[clamp(1.75rem,3.2vw,2.4rem)] font-light leading-none tracking-[-0.035em] text-gradient-bone">
                      {k.value}
                    </span>
                    <span className="text-[13px] leading-tight text-bone/90">
                      {k.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                      {k.sub}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee proof strip */}
      <div className="relative mt-20 overflow-hidden border-y border-line/60 bg-ink/40 py-5 md:mt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-obsidian to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-obsidian to-transparent"
        />
        <div className="flex w-max animate-marquee-x items-center gap-12">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 font-mono text-[11px] uppercase tracking-[0.35em] text-bone/55"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-gold/70" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingAnchor() {
  return (
    <a
      href={BRAND.funpay}
      target="_blank"
      rel="noreferrer"
      className="group relative block w-full"
      aria-label="5.0 на FunPay — открыть профиль"
    >
      {/* Soft gold halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-[1] rounded-[40px] bg-gradient-to-br from-gold/15 via-transparent to-transparent blur-3xl"
      />

      <div className="relative flex flex-col items-start gap-6">
        {/* Stars row */}
        <div className="flex items-center gap-3">
          <BigStars />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-bone/60">
            FunPay
          </span>
        </div>

        {/* Massive 5.0 */}
        <div className="relative flex items-end gap-3 md:gap-5">
          <span
            className="font-display font-light leading-[0.84] tracking-[-0.05em] text-gradient-gold"
            style={{ fontSize: "clamp(7rem, 22vw, 18rem)" }}
          >
            5.0
          </span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow"
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold-glow" />
            </span>
            live
          </motion.span>
        </div>

        {/* Caption row */}
        <div className="flex flex-col gap-1">
          <span className="font-display text-lg text-bone md:text-xl">
            Идеальная репутация · {BRAND.reviews}+ отзывов
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            FunPay 9159608 · обновляется в реальном времени
          </span>
        </div>

        <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow transition-colors group-hover:text-bone">
          Открыть профиль
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </div>
      </div>
    </a>
  );
}

function BigStars() {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 1.5l1.96 4.16 4.54.5-3.4 3.07.9 4.47L8 11.49 3.99 13.7l.91-4.47L1.5 6.16l4.54-.5L8 1.5z"
            fill="url(#starGoldBig)"
          />
          <defs>
            <linearGradient id="starGoldBig" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0dba6" />
              <stop offset="100%" stopColor="#a67e36" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}
