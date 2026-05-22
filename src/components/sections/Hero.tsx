"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { ParticleField } from "@/components/fx/ParticleField";
import { FloatingLightStreaks } from "@/components/fx/Backgrounds";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { SplitText } from "@/components/ui/SplitText";
import { BRAND } from "@/lib/data";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const bgPos = useMotionTemplate`${mx}% ${my}%`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      mx.set(px);
      my.set(py);
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
      {/* Layered background */}
      <div className="absolute inset-0 -z-10 bg-ink" />
      <FloatingLightStreaks />
      <motion.div
        aria-hidden
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${bgPos}, rgba(233,212,161,0.18), transparent 60%)`,
        }}
        className="pointer-events-none absolute inset-0 -z-[1] mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 -z-[1]">
        <ParticleField density={50} className="h-full w-full opacity-90" />
      </div>

      {/* Side rails */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-6 hidden flex-col items-start justify-between py-32 lg:flex lg:left-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          [01] Главная
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          студия · с 2024
        </span>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-6 hidden flex-col items-end justify-between py-32 lg:flex lg:right-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
          FunPay · верифицирован
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          {BRAND.orders.toLocaleString()}+ заказов · {BRAND.reviews}+ отзывов
        </span>
      </div>

      <div className="relative mx-auto flex min-h-screen-svh w-full max-w-[1440px] flex-col justify-between px-6 pb-16 pt-36 lg:px-12 lg:pt-40">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/50 md:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-gold">
              ✦ Премиальная визуальная студия ✦
            </span>
            <span className="hidden h-px w-16 bg-gradient-to-l from-transparent to-gold/50 md:block" />
          </div>
          <a
            href={BRAND.funpay}
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-3 py-1.5 backdrop-blur transition-colors hover:border-gold/70 hover:bg-gold/10"
          >
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-block h-2 w-2 rounded-full bg-gold-glow" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
              AI-брифинг · 24/7 · ответ за 60 сек
            </span>
          </a>
        </motion.div>

        {/* Main title */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative flex flex-1 flex-col items-center justify-center text-center"
        >
          {/* Big mark behind */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 0.22, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          >
            <div className="relative h-[60vmin] w-[60vmin] max-h-[640px] max-w-[640px]">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl" />
              <Image
                src="/brand/rcode11-logo.png"
                alt=""
                fill
                priority
                className="object-contain mix-blend-screen"
                sizes="640px"
              />
            </div>
          </motion.div>

          <h1 className="relative font-display text-[clamp(3rem,11vw,10.5rem)] font-light leading-[0.88] tracking-[-0.03em]">
            <span className="block text-gradient-bone">
              <SplitText text="Не просто дизайн." />
            </span>
            <span className="mt-2 block italic text-gradient-gold">
              <SplitText text="Восприятие." delay={0.25} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            className="mt-10 max-w-xl text-balance text-base leading-relaxed text-mist md:text-lg"
          >
            {BRAND.subTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <PremiumButton href={BRAND.funpay} variant="primary">
              Заказать на FunPay
              <ArrowExternal />
            </PremiumButton>
            <PremiumButton href="#portfolio" variant="outline">
              Смотреть портфолио
              <ArrowDown />
            </PremiumButton>
          </motion.div>
        </motion.div>

        {/* Bottom marquee strip */}
        <motion.div
          style={{ y: subY, opacity: subOpacity }}
          className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { k: "Студия", v: "Rcode11" },
            { k: "Практика", v: "Визуальная идентика" },
            { k: "География", v: "Без границ" },
            { k: "Слоты квартала", v: "2 из 5" },
          ].map((m) => (
            <div key={m.k} className="flex flex-col gap-2 border-l border-line/70 pl-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {m.k}
              </span>
              <span className="font-display text-lg leading-tight text-bone">{m.v}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted">
            Прокрутить
          </span>
          <span className="relative block h-10 w-px bg-gradient-to-b from-gold/70 to-transparent">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 animate-pulse rounded-full bg-gold-glow" />
          </span>
        </div>
      </motion.div>

      {/* Bottom edge fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" />
    </section>
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
