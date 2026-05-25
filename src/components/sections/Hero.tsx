"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ParticleField } from "@/components/fx/ParticleField";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { CaseModal } from "@/components/ui/CaseModal";
import { BRAND, PORTFOLIO, PORTFOLIO_CATEGORIES, type PortfolioItem } from "@/lib/data";

const CATEGORY_PILLS = PORTFOLIO_CATEGORIES.filter((c) => c !== "Все");

// Index works by id for cinema-wall columns.
const BY_ID = Object.fromEntries(PORTFOLIO.map((p) => [p.id, p]));

// Cinema wall — only 1:1 works so the columns read as a clean mosaic.
// (Wide DMC and 2:1 Borrlg are excluded; they appear properly proportioned
// in the Portfolio archive instead.)
const CINEMA_COLUMNS: Array<{
  ids: string[];
  duration: number; // seconds per full loop
  direction: "up" | "down";
}> = [
  { ids: ["p-01", "p-03", "p-02", "p-04"], duration: 44, direction: "up" },
  { ids: ["p-02", "p-04", "p-01", "p-03"], duration: 56, direction: "down" },
  { ids: ["p-03", "p-01", "p-04", "p-02"], duration: 38, direction: "up" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bgPos = useMotionTemplate`${mx}% ${my}%`;
  const [openWork, setOpenWork] = useState<PortfolioItem | null>(null);

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
      {/* Layered background — body gradient shines through; this is just a faint dark wash */}
      <div className="absolute inset-0 -z-10 bg-black/30" />
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

          {/* Right: premium scroll-wall of real works (cinema columns) */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <ScrollCinema onOpenWork={setOpenWork} />
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

      {/* Work-detail modal — opened by clicking any tile in the cinema wall */}
      <CaseModal item={openWork} onClose={() => setOpenWork(null)} />
    </section>
  );
}

/* -------------------------------------------------------------------------- *
 *  ScrollCinema — premium 1:1 cinema-wall of real works                       *
 *  - 3 vertical CSS-keyframe marquee columns (GPU only, no JS frame work)     *
 *  - static perspective tilt (no cursor parallax — zero per-frame cost)      *
 *  - 1:1 works only so the mosaic reads as a clean gallery, not a junk grid  *
 *  - every work is a button → opens the full case modal on click             *
 * -------------------------------------------------------------------------- */
function ScrollCinema({
  onOpenWork,
}: {
  onOpenWork: (item: PortfolioItem) => void;
}) {
  return (
    <div
      className="relative mx-auto aspect-[4/5] w-full max-w-[560px] [perspective:1900px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Floor glow — anchors the wall in space */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-4 bottom-0 h-40 opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(201,163,90,0.18), rgba(201,163,90,0) 75%)",
        }}
      />

      {/* The tilted wall — static perspective for performance */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          transform: "perspective(1900px) rotateY(-9deg) rotateX(2deg)",
          transformOrigin: "55% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="grid h-full grid-cols-3 gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {CINEMA_COLUMNS.map((col, i) => (
            <CinemaColumn
              key={i}
              ids={col.ids}
              duration={col.duration}
              direction={col.direction}
              featured={i === 1}
              priority={i === 0}
              onOpenWork={onOpenWork}
            />
          ))}
        </div>
      </div>

      {/* Vignette top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0) 100%)",
        }}
      />
      {/* Vignette bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0) 100%)",
        }}
      />
      {/* Side soft fade (inner edge towards headline) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0) 100%)",
        }}
      />

      {/* Floating live label — top */}
      <div className="absolute right-0 top-3 z-40 flex items-center gap-2 rounded-full border border-bone/10 bg-black/55 px-3 py-1.5 backdrop-blur">
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-gold-glow" />
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone/80">
          Подборка работ · 2024 — 2026
        </span>
      </div>

      {/* Hint label — bottom-left */}
      <div className="absolute bottom-3 left-0 z-40 flex items-center gap-2 rounded-full border border-bone/10 bg-black/55 px-3 py-1.5 backdrop-blur">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-bone/70">
          нажмите для просмотра кейса
        </span>
      </div>
    </div>
  );
}

function CinemaColumn({
  ids,
  duration,
  direction,
  featured,
  priority,
  onOpenWork,
}: {
  ids: string[];
  duration: number;
  direction: "up" | "down";
  featured: boolean;
  priority: boolean;
  onOpenWork: (item: PortfolioItem) => void;
}) {
  const works = ids
    .map((id) => BY_ID[id])
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.image));
  // duplicate the list — moving by 50% of total height yields a seamless loop.
  const list = [...works, ...works];

  return (
    <div className="relative h-full overflow-hidden rounded-[14px]">
      <div
        className={`flex flex-col gap-3 ${direction === "up" ? "animate-cinema-up" : "animate-cinema-down"}`}
        style={{ ["--cinema-duration" as "width"]: `${duration}s` }}
      >
        {list.map((p, i) => {
          const img = p.image!;
          return (
            <button
              key={`${p.id}-${i}`}
              type="button"
              onClick={() => onOpenWork(p)}
              aria-label={`Открыть кейс ${p.title}`}
              className="group relative block w-full overflow-hidden rounded-[12px] border border-bone/10 bg-graphite/40 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.02)] transition-transform duration-300 hover:scale-[1.02] hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={featured ? "(min-width:1024px) 22vw, 60vw" : "(min-width:1024px) 16vw, 40vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: img.objectPosition ?? "center" }}
                priority={priority && i < 2}
                loading={priority && i < 2 ? "eager" : "lazy"}
              />
              {/* inner sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              {/* hover sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-gold/0 via-gold/0 to-gold/0 transition-colors duration-500 group-hover:from-gold/10 group-hover:to-gold/0"
              />
            </button>
          );
        })}
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
