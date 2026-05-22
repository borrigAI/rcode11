"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/lib/data";

export function Trust() {
  return (
    <section
      id="trust"
      aria-label="Trust"
      className="relative isolate overflow-hidden bg-obsidian py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18] mask-radial-center" />
      <div aria-hidden className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [02] Доверие
              </span>
              <h2 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.03em] text-bone md:text-6xl">
                5.0 на FunPay.
                <br />
                <span className="text-gradient-gold">Быстро. Сильно.</span>
                <br />
                Без лишних слов.
              </h2>
              <p className="max-w-md text-mist">
                1000+ заказов, 750+ отзывов и один живой аккаунт на FunPay. Средний срок
                статической работы — около 4 часов, при очереди ориентир остаётся в пределах
                суток. Лендинги и Telegram-боты — 3–5 рабочих дней. Рабочее время: 05:00–17:00 МСК.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-line/70 bg-gradient-to-br from-graphite to-[#0d0d0d] p-7 transition-colors duration-500 hover:border-gold/40 hover:bg-elevated md:p-8">
                  <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
                  <div className="relative flex h-full flex-col gap-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                      0{i + 1} /
                    </span>
                    <Counter
                      to={s.value}
                      suffix={s.suffix}
                      className="font-display text-[clamp(2.7rem,6vw,4.7rem)] font-light leading-none tracking-[-0.045em] text-gradient-gold"
                    />
                    <div className="mt-auto flex flex-col gap-2">
                      <span className="text-base leading-tight font-medium text-bone">{s.label}</span>
                      <span className="text-sm leading-snug text-muted">{s.caption}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <Stars />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                5.0 · актуальный рейтинг FunPay
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-80">
              {["FunPay", "Лоты от ₽99", "~4 часа в среднем", "максимум сутки", "Лендинги", "Telegram-боты"].map(
                (label) => (
                  <span
                    key={label}
                    className="font-display text-base tracking-wide text-mist/80"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 1.5l1.96 4.16 4.54.5-3.4 3.07.9 4.47L8 11.49 3.99 13.7l.91-4.47L1.5 6.16l4.54-.5L8 1.5z"
            fill="url(#starGold)"
          />
          <defs>
            <linearGradient id="starGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0dba6" />
              <stop offset="100%" stopColor="#a67e36" />
            </linearGradient>
          </defs>
        </svg>
      ))}
    </div>
  );
}
