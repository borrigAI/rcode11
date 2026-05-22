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
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);

  return (
    <section
      id="contact"
      aria-label="Contact"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-line/60 bg-ink py-32 md:py-44"
    >
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
            className="object-contain opacity-[0.18] mix-blend-screen"
          />
        </div>
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18] mask-radial-center" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.45em] text-gold">
              [08] Финал
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,8.5vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.04em] text-bone">
              Откройте
              <br />
              сделку на
              <br />
              <span className="text-gradient-gold">FunPay.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl text-lg text-mist">
              Открываете сделку на FunPay — деньги ложатся на площадку, я не получаю их,
              пока вы не подтвердили результат. AI-брифинг за 60 секунд, первый концепт
              — в течение 24 часов. На этот квартал свободны 2 слота.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <PremiumButton href={BRAND.funpay} variant="primary">
                Заказать на FunPay
                <span aria-hidden>↗</span>
              </PremiumButton>
              <PremiumButton href={BRAND.telegram} variant="outline">
                Написать в Telegram
                <span aria-hidden>→</span>
              </PremiumButton>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { k: "FunPay", v: "Заказ за 5 минут", href: BRAND.funpay },
                { k: "AI-брифинг", v: "24/7 · 60 сек", href: BRAND.funpay },
                { k: "Telegram", v: BRAND.telegramHandle, href: BRAND.telegram },
              ].map((c) => (
                <a
                  key={c.k}
                  href={c.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line/70 bg-graphite/60 px-5 py-4 backdrop-blur transition-colors duration-500 hover:border-gold/60"
                >
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {c.k}
                    </span>
                    <span className="font-display text-base text-bone">{c.v}</span>
                  </div>
                  <span
                    aria-hidden
                    className="text-mist transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold-glow"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
