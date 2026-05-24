"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/fx/ParticleField";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { BRAND, PORTFOLIO, PORTFOLIO_CATEGORIES } from "@/lib/data";

const CATEGORY_PILLS = PORTFOLIO_CATEGORIES.filter((c) => c !== "Все");

// Pick the 4 strongest live works as constellation pieces.
const CONSTELLATION = (() => {
  const byId = Object.fromEntries(PORTFOLIO.map((p) => [p.id, p]));
  return ["p-03", "p-01", "p-06", "p-05"]
    .map((id) => byId[id])
    .filter((p) => p?.image)
    .slice(0, 4);
})();

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
          className="relative mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[1.35fr_1fr] lg:gap-12 xl:gap-20"
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

          {/* Right: cinematic portfolio constellation (desktop) + mobile compact */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative"
          >
            <Constellation mx={mx} my={my} />
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

/* -------------------------------------------------------------------------- *
 *  Cinematic portfolio constellation                                          *
 *  A premium-feeling floating composition of real works in 3D-tilted space.   *
 *  - depth-based parallax on cursor                                            *
 *  - slow orbital drift (loop animation per card)                              *
 *  - gold light sweep travelling across the canvas                             *
 * -------------------------------------------------------------------------- */
function Constellation({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
}) {
  // smoothed cursor offsets used to drive parallax (% 0..100 → -1..1 range)
  const sx = useSpring(useTransform(mx, (v) => (v - 50) / 50), {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });
  const sy = useSpring(useTransform(my, (v) => (v - 50) / 50), {
    stiffness: 60,
    damping: 18,
    mass: 0.6,
  });

  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[520px] [perspective:1400px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 bottom-2 h-32 rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,163,90,0.22), rgba(201,163,90,0) 70%)",
        }}
      />

      {/* gold light sweep */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        initial={{ x: "-30%" }}
        animate={{ x: "130%" }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity, repeatType: "loop", delay: 1.5 }}
        style={{
          background:
            "linear-gradient(110deg, transparent 35%, rgba(201,163,90,0.16) 50%, transparent 65%)",
          filter: "blur(8px)",
        }}
      />

      {/* Floating frame label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        className="absolute -top-1 right-0 z-30 flex items-center gap-2 rounded-full border border-bone/10 bg-black/40 px-2.5 py-1 backdrop-blur"
      >
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold-glow" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/75">
          Live · Подборка работ
        </span>
      </motion.div>

      {/* Cards (back to front so later cards overlap earlier ones) */}
      {CONSTELLATION.map((p, i) => {
        if (!p?.image) return null;
        return (
          <FloatingCard
            key={p.id}
            index={i}
            sx={sx}
            sy={sy}
            title={p.title}
            category={p.category}
            ticker={p.ticker}
            image={p.image}
          />
        );
      })}

      {/* Center monogram subtle hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 2.4, ease: "easeOut", delay: 0.6 }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[8rem] font-medium tracking-[-0.04em] text-gold-glow"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        R11
      </motion.div>
    </div>
  );
}

type FloatingCardProps = {
  index: number;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  title: string;
  category: string;
  ticker: string;
  image: { src: string; width: number; height: number; alt: string; objectPosition?: string };
};

// Per-card layout constants (offset in % of container, size in % of container,
// depth multiplier for parallax intensity, rotation, float duration).
const CARD_LAYOUT: Array<{
  top: string;
  left?: string;
  right?: string;
  size: string;
  depth: number;
  rotate: number;
  delay: number;
  float: number;
  aspect: string;
  zIndex: number;
}> = [
  // 0: hero — big back-left
  { top: "6%", left: "-2%", size: "62%", depth: 1.6, rotate: -7, delay: 0.2, float: 8.4, aspect: "1 / 1", zIndex: 10 },
  // 1: foreground right
  { top: "30%", right: "-4%", size: "44%", depth: 2.4, rotate: 9, delay: 0.6, float: 7.6, aspect: "1 / 1", zIndex: 20 },
  // 2: bottom wide preview
  { top: "62%", left: "8%", size: "58%", depth: 2.0, rotate: -4, delay: 0.95, float: 9.2, aspect: "16 / 9", zIndex: 15 },
  // 3: tiny top-right badge card
  { top: "-2%", right: "8%", size: "26%", depth: 3.0, rotate: 14, delay: 1.25, float: 6.8, aspect: "2 / 1", zIndex: 25 },
];

function FloatingCard({ index, sx, sy, title, category, ticker, image }: FloatingCardProps) {
  const layout = CARD_LAYOUT[index];
  // depth controls how much the card moves with cursor parallax
  const tx = useTransform(sx, (v) => v * 18 * (1 / layout.depth));
  const ty = useTransform(sy, (v) => v * 12 * (1 / layout.depth));

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: layout.delay,
      }}
      style={{
        position: "absolute",
        top: layout.top,
        left: layout.left,
        right: layout.right,
        width: layout.size,
        aspectRatio: layout.aspect,
        zIndex: layout.zIndex,
        x: tx,
        y: ty,
        rotate: layout.rotate,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{ y: [0, -10, 0, 6, 0] }}
        transition={{
          duration: layout.float,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: layout.delay,
        }}
        className="relative h-full w-full"
      >
        <div className="group relative h-full w-full overflow-hidden rounded-[18px] border border-bone/15 bg-graphite/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,163,90,0.05)]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width:1024px) 30vw, 70vw"
            className="object-cover"
            style={{ objectPosition: image.objectPosition ?? "center" }}
            priority={index < 2}
          />
          {/* Inner gradient frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[18px]"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%)",
            }}
          />
          {/* Top corner ticker */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-gold-glow" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/80">
              {category}
            </span>
          </div>
          {/* Bottom caption */}
          <div className="absolute inset-x-3 bottom-2.5 flex items-end justify-between gap-2">
            <p className="font-display text-[13px] leading-tight text-bone">
              {title}
            </p>
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-bone/55 text-right shrink-0 max-w-[60%] truncate">
              {ticker}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
