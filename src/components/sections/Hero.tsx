"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/fx/ParticleField";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { BRAND, PORTFOLIO_CATEGORIES } from "@/lib/data";

const CATEGORY_PILLS = PORTFOLIO_CATEGORIES.filter((c) => c !== "Все");

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bgPos = useMotionTemplate`${mx}% ${my}%`;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(((e.clientX - rect.left) / rect.width) * 100);
      my.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-screen-svh w-full overflow-hidden"
    >
      {/* Layered background — restrained */}
      <div className="absolute inset-0 -z-10 bg-ink" />
      <motion.div
        aria-hidden
        style={{
          background: useMotionTemplate`radial-gradient(620px circle at ${bgPos}, rgba(201,163,90,0.10), transparent 65%)`,
        }}
        className="pointer-events-none absolute inset-0 -z-[1]"
      />
      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <ParticleField density={28} className="h-full w-full opacity-50" />
      </div>

      {/* Diagonal cut motif echoing the logo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
        <div
          className="absolute -right-40 top-0 h-[140%] w-[60%] origin-top-right"
          style={{
            background:
              "linear-gradient(108deg, transparent 0 38%, rgba(201,163,90,0.06) 38% 39.2%, transparent 39.2% 61%, rgba(201,163,90,0.04) 61% 61.8%, transparent 61.8%)",
          }}
        />
      </div>

      {/* Side rails — minimalized */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-4 hidden flex-col items-start justify-between py-32 xl:flex xl:left-6"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          [01] — Студия
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          с 2024 · FunPay 9159608
        </span>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-4 hidden flex-col items-end justify-between py-32 xl:flex xl:right-6"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          {BRAND.orders.toLocaleString("en-US")}+ заказов
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          rating · {BRAND.rating}
        </span>
      </div>

      <div className="container-x relative flex min-h-screen-svh flex-col pb-16 pt-32 lg:pt-36">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 bg-white/[0.02] px-2.5 py-1 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-glow" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
              Премиум-студия · FunPay 5.0★
            </span>
          </span>
          <a
            href={BRAND.funpay}
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.04] px-2.5 py-1 backdrop-blur transition-colors hover:border-gold/70 hover:bg-gold/10"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-gold-glow" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
              AI-брифинг · 24/7 · 3–5 минут
            </span>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16"
        >
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="font-display font-medium leading-[0.86] tracking-[-0.045em] text-bone text-balance"
              style={{ fontSize: "clamp(2.5rem, 9vw, 8.5rem)" }}
            >
              Дизайн,
              <br />
              который
              <br />
              <span className="text-gradient-gold">продаёт</span>
              <span className="text-bone/40"> за вас.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="mt-8 max-w-[44ch] text-balance text-base leading-relaxed text-mist md:text-lg"
            >
              Аватарки, баннеры, логотипы, превью, карточки товаров, лендинги и Telegram-боты.
              Заказ — только через FunPay. Бриф занимает 3–5 минут, средний срок
              сдачи статики — около 4 часов. Лендинги и боты — 3–5 рабочих дней.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              {CATEGORY_PILLS.map((c) => (
                <a
                  key={c}
                  href="#portfolio"
                  className="inline-flex items-center gap-1.5 rounded-full border border-bone/12 bg-white/[0.015] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-bone/65 transition-colors hover:border-gold/50 hover:text-gold-glow"
                >
                  <span className="h-1 w-1 rounded-full bg-gold/60" />
                  {c}
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PremiumButton href={BRAND.funpay} variant="primary">
                Заказать на FunPay
                <ArrowExternal />
              </PremiumButton>
              <PremiumButton href="#portfolio" variant="outline">
                Смотреть работы
                <ArrowDown />
              </PremiumButton>
            </motion.div>
          </div>

          {/* Right floating panel: live offer card */}
          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="sticky top-32">
              <OfferCard />
            </div>
          </motion.aside>
        </motion.div>

        {/* Bottom panel — clean closed rectangle on mobile and desktop */}
        <motion.div
          style={{ y: subY, opacity: subOpacity }}
          className="mt-auto overflow-hidden rounded-2xl border border-line/70 bg-graphite/40 backdrop-blur-md"
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { k: "Площадка", v: "FunPay · #9159608" },
              { k: "Рейтинг", v: `${BRAND.rating} / 5.00` },
              { k: "Сделок", v: `${BRAND.orders.toLocaleString("en-US")}+` },
              { k: "Бриф", v: "AI · 3–5 минут" },
            ].map((m, i) => (
              <div
                key={m.k}
                className={`flex flex-col gap-1.5 px-5 py-4 md:px-6 md:py-5 ${
                  i % 2 === 1 ? "border-l border-line/60" : ""
                } ${i < 2 ? "border-b border-line/60 md:border-b-0" : ""} ${
                  i === 2 ? "md:border-l md:border-line/60" : ""
                } ${i === 3 ? "md:border-l md:border-line/60" : ""}`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  {m.k}
                </span>
                <span className="truncate font-display text-base leading-tight text-bone md:text-lg">
                  {m.v}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom edge fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />
    </section>
  );
}

function OfferCard() {
  return (
    <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-bone/12 bg-gradient-to-br from-[#0d0a06] to-[#050403]">
      {/* Diagonal gold cut */}
      <div
        aria-hidden
        className="absolute -right-20 top-0 h-full w-[120%] opacity-90"
        style={{
          background:
            "linear-gradient(112deg, transparent 0 48%, rgba(201,163,90,0.18) 48% 50%, transparent 50% 70%, rgba(201,163,90,0.10) 70% 71.5%, transparent 71.5%)",
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />

      {/* Header chrome */}
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
          FunPay · Активен
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 bg-black/40 px-2 py-1 backdrop-blur">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-green-400/80" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone/80">
            ONLINE
          </span>
        </span>
      </div>

      {/* Main offer block */}
      <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          Что заказывают
        </p>
        <ul className="space-y-3 font-display text-2xl font-light leading-none text-bone">
          {["Аватарка", "Баннер", "Логопак", "Превью", "Лендинг"].map((label, i) => (
            <li key={label} className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-gold-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{label}</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">
                {["~4 часа", "~4 часа", "до 24 ч", "~4 часа", "3–5 дней"][i]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer chrome */}
      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          Гарантия площадки
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
          → FunPay
        </span>
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5v11M2 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowExternal() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
