"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { BRAND } from "@/lib/data";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section
      id="contact"
      aria-label="Contact"
      ref={ref}
      className="relative isolate flex h-full flex-col overflow-hidden"
    >
      {/* Background glow + huge ghost logo */}
      <motion.div
        aria-hidden
        style={{ y, scale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[80vmin] w-[80vmin] max-h-[840px] max-w-[840px]">
          <div className="absolute inset-0 rounded-full bg-gold/15 blur-3xl" />
          <Image
            src="/brand/rcode11-logo.png"
            alt=""
            fill
            sizes="840px"
            className="object-contain opacity-[0.14] mix-blend-screen"
          />
        </div>
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18] mask-radial-center" />
      <div aria-hidden className="absolute -left-32 -top-32 h-[40rem] w-[40rem] rounded-full bg-gold/[0.06] blur-3xl" />

      <div className="container-x relative flex h-full flex-col">
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold">
              [08] Финал
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-r from-gold/30 via-line/60 to-transparent md:block" />
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:inline">
              сделка ведётся на FunPay · с гарантией площадки
            </span>
          </div>
        </Reveal>

        {/* Editorial dramatic headline — left-aligned, asymmetric */}
        <motion.div style={{ y: headlineY }} className="mt-6 md:mt-8 max-w-[18ch]">
          <Reveal>
            <h2 className="font-display font-medium leading-[0.86] tracking-[-0.05em] text-bone text-balance"
                style={{ fontSize: "clamp(2.4rem, 9vw, 7.5rem)" }}>
              <span className="animate-gold-sweep">Закажите</span>
              <br />
              <span className="text-bone/85">лот.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-[13px] leading-snug text-mist md:text-[14px]">
              Цена не равна виду. 1000+ сделок, 5.0 на FunPay, стартую
              от ₽{BRAND.entryPrice}.
            </p>
          </Reveal>
        </motion.div>

        {/* Single dominant CTA — anchored bottom-right of headline column */}
        <Reveal delay={0.22}>
          <div className="mt-6 flex flex-col items-start gap-3 md:mt-8 md:flex-row md:items-center">
            <PremiumButton href={BRAND.funpay} variant="primary">
              Открыть мой профиль на FunPay
              <span aria-hidden>↗</span>
            </PremiumButton>
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-bone/65 transition-colors hover:text-gold-glow"
            >
              <span
                aria-hidden
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/80 transition-colors group-hover:border-gold/60 group-hover:bg-gold/10"
              >
                ↑
              </span>
              Сначала посмотреть работы
            </a>
          </div>
        </Reveal>

        {/* Bottom rail — large editorial KPI strip, single line, no card-grid */}
        <Reveal delay={0.3}>
          <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line/70 pt-4 md:grid-cols-4 md:gap-x-8 md:pt-5">
            {[
              { k: "Площадка", v: "FunPay", sub: "#9159608" },
              { k: "Рейтинг", v: `${BRAND.rating}`, sub: "5.0 / 5.00 · 750+ оценок" },
              { k: "Бриф", v: "3–5 мин", sub: "AI · 24/7" },
              { k: "Срок", v: "~4 часа", sub: "лендинг/бот · 3–5 дней" },
            ].map((m) => (
              <div key={m.k} className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                  {m.k}
                </span>
                <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-none tracking-[-0.02em] text-bone">
                  {m.v}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
