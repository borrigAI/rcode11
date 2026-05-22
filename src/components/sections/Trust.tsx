"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/lib/data";

export function Trust() {
  return (
    <section
      id="trust"
      aria-label="Trust"
      className="relative isolate overflow-hidden border-y border-line/60 bg-obsidian py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial-center" />
      <div aria-hidden className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [02] Доверие
              </span>
              <h2 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.03em] text-bone md:text-6xl">
                Два года.
                <br />
                <span className="text-gradient-gold">Тысяча сделок.</span>
                <br />
                4.97 на FunPay.
              </h2>
              <p className="max-w-md text-mist">
                Один аккаунт без обнуления, 750+ верифицированных отзывов и репутация,
                которая собиралась 2 года. Возвраты бывают — это рабочая ситуация: доделываем
                или возвращаем деньги через FunPay. Поэтому повторных клиентов больше, чем разовых.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line/70 bg-line/40 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="contents">
                <div className="group relative flex flex-col justify-between gap-6 bg-graphite p-7 transition-colors duration-500 hover:bg-elevated md:p-9">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                    0{i + 1} /
                  </span>
                  <div>
                    <Counter
                      to={s.value}
                      suffix={s.suffix}
                      className="font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-none tracking-[-0.04em] text-gradient-gold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-bone">{s.label}</span>
                    <span className="text-xs text-muted">{s.caption}</span>
                  </div>
                  <span className="absolute right-0 top-0 h-12 w-px bg-gradient-to-b from-gold/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
                4.97 · средний рейтинг FunPay (верифицированный)
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-80">
              {["FunPay", "Telegram", "Discord", "Twitch", "YouTube", "Wildberries"].map(
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
