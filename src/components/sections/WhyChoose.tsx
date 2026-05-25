"use client";

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
      className="relative isolate flex h-full flex-col overflow-hidden bg-obsidian"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16] mask-radial-center" />
      <div aria-hidden className="absolute -right-32 -bottom-32 h-[40rem] w-[40rem] rounded-full bg-gold/8 blur-3xl" />

      <div className="container-x relative">
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
        <div className="mt-4 grid items-end gap-4 md:mt-6 md:grid-cols-[1.4fr_1fr] md:gap-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.7rem,4vw,3rem)] font-medium leading-[0.96] tracking-[-0.03em] text-bone text-balance">
              Дешёвый лот ≠ дешёвый{" "}
              <span className="text-gradient-gold">вид.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[13px] leading-snug text-mist md:ml-auto md:text-right">
              На FunPay много дизайна за ₽100–200. Лот за ₽{BRAND.entryPrice} у меня выглядит
              сильнее конкурентов за ₽1 000.
            </p>
          </Reveal>
        </div>

        {/* Visual comparison — compact mock lots */}
        <Reveal delay={0.16}>
          <div className="mt-3 grid grid-cols-2 gap-3 md:mt-4 md:gap-5">
            <MockLot variant="typical" />
            <MockLot variant="rcode11" />
          </div>
        </Reveal>

        {/* Pillars — compact 4-column manifest */}
        <ul className="mt-3 grid grid-cols-2 gap-2 md:mt-4 md:grid-cols-4 md:gap-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.04} as="li">
              <div className="group relative flex h-full flex-col gap-2 rounded-xl border border-line/70 bg-graphite/40 p-3 backdrop-blur-md transition-colors hover:border-gold/50 md:p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    {p.n}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/[0.06] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.25em] text-gold-glow md:text-[9px]">
                    <span className="inline-block h-1 w-1 rounded-full bg-gold-glow" />
                    {p.pill}
                  </span>
                </div>
                <h3 className="font-display text-[clamp(0.95rem,1.6vw,1.2rem)] font-light leading-[1.15] tracking-[-0.015em] text-bone transition-colors group-hover:text-gold-glow">
                  {p.headline}
                </h3>
                <p className="text-[11px] leading-snug text-mist md:text-[12px]">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Minimal lot mockup — visual story, not text. Phase E: left mock has a
   typed-out title via CSS step-reveal; right one is drawn instantly. */
function MockLot({ variant }: { variant: "typical" | "rcode11" }) {
  const isPremium = variant === "rcode11";
  return (
    <article
      className={
        isPremium
          ? "relative overflow-hidden rounded-2xl border border-gold/35 bg-gradient-to-br from-[#1a1308] via-graphite to-graphite p-3 md:p-4"
          : "relative overflow-hidden rounded-2xl border border-line/70 bg-graphite/80 p-3 md:p-4"
      }
    >
      {isPremium && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
        </>
      )}

      {/* header chip + price — Phase E: typed-out "Обычный лот", instant Rcode11 */}
      <div className="relative flex items-center justify-between">
        {isPremium ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
            Rcode11
          </span>
        ) : (
          <span className="flex items-center font-mono text-[10px] uppercase tracking-[0.35em] text-mist/70">
            <span className="animate-typing-11">Обычный лот</span>
            <span aria-hidden className="ml-0.5 inline-block h-3 w-[1px] bg-mist/70 animate-caret" />
          </span>
        )}
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
        className={`relative mt-2 aspect-[16/9] overflow-hidden rounded-xl md:mt-3 ${
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
      <div className="relative mt-2 flex items-center justify-between text-[10px] md:text-[11px]">
        <span className={isPremium ? "text-bone/85" : "text-mist/70"}>
          {isPremium ? "Сдача ~4ч · 5.0" : "Плавающие сроки"}
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
