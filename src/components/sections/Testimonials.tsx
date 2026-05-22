"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  // Split into two rows for marquee
  const rowA = TESTIMONIALS.slice(0, 3);
  const rowB = TESTIMONIALS.slice(3);

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="relative isolate overflow-hidden bg-ink py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15] mask-radial-center" />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <Reveal>
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [06] Отзывы
              </span>
              <h2 className="font-display text-5xl font-medium leading-[0.92] tracking-[-0.03em] text-bone md:text-7xl">
                Отзывы
                <br />
                <span className="text-gradient-gold">с FunPay.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-md text-mist md:ml-auto md:text-right">
              750+ верифицированных отзывов на FunPay и в Telegram. Выписки ниже —
              от реальных клиентов, которые вернулись за второй, третьей и десятой работой.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...rowA, ...rowB].map((t, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <TestimonialCard
                quote={t.quote}
                name={t.name}
                role={t.role}
                rating={t.rating}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  rating,
}: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}) {
  return (
    <motion.figure
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-line/70 bg-graphite/60 p-7 backdrop-blur-md md:p-8"
    >
      <div aria-hidden className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
      <div aria-hidden className="absolute right-0 top-0 h-32 w-32 -translate-y-1/3 translate-x-1/3 rounded-full bg-gold/8 blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

      <div className="relative">
        <svg
          width="36"
          height="28"
          viewBox="0 0 36 28"
          fill="none"
          aria-hidden
          className="text-gold/70"
        >
          <path
            d="M0 28V14C0 6.27 6.27 0 14 0V6C9.58 6 6 9.58 6 14V14H14V28H0ZM22 28V14C22 6.27 28.27 0 36 0V6C31.58 6 28 9.58 28 14V14H36V28H22Z"
            fill="currentColor"
          />
        </svg>
        <blockquote className="mt-5 text-[15px] leading-relaxed text-bone/95">
          {quote}
        </blockquote>
      </div>
      <figcaption className="relative flex items-center justify-between gap-3 border-t border-line/70 pt-5">
        <div className="flex flex-col">
          <span className="font-display text-base text-bone">{name}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            {role}
          </span>
        </div>
        <div className="flex items-center gap-0.5" aria-label={`${rating} из 5 звёзд`}>
          {Array.from({ length: rating }).map((_, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M8 1.5l1.96 4.16 4.54.5-3.4 3.07.9 4.47L8 11.49 3.99 13.7l.91-4.47L1.5 6.16l4.54-.5L8 1.5z"
                fill="#d9b878"
              />
            </svg>
          ))}
        </div>
      </figcaption>
    </motion.figure>
  );
}
