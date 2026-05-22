"use client";

import { Reveal } from "@/components/ui/Reveal";
import { COMPARISON, WHY_POINTS } from "@/lib/data";

export function WhyChoose() {
  return (
    <section
      id="why"
      aria-label="Why Rcode11"
      className="relative isolate overflow-hidden bg-obsidian py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-[0.16] mask-radial-center" />
      <div
        aria-hidden
        className="absolute -right-32 -bottom-32 h-[40rem] w-[40rem] rounded-full bg-gold/8 blur-3xl"
      />

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Reveal>
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                [06] Почему Rcode11
              </span>
              <h2 className="font-display text-5xl font-light leading-[0.95] tracking-[-0.02em] text-bone md:text-7xl">
                Разница
                <br />
                между
                <br />
                <span className="italic text-gradient-gold">дешёвым</span> и
                {" "}
                <span className="italic text-gradient-gold">продуманным.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-mist md:ml-auto md:text-right">
              Рынок перенасыщен дешёвыми исполнителями. Rcode11 — это противоположность
              гонки по цене на маркетплейсах. Работа сделана так, чтобы это было видно
              в первые же секунды.
            </p>
          </Reveal>
        </div>

        {/* Comparison table */}
        <Reveal delay={0.15}>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-line/70 bg-line/40 md:grid-cols-2">
            <div className="flex flex-col gap-5 bg-graphite/80 p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-mist/70">
                  Вариант A
                </span>
                <span className="rounded-full border border-line/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70">
                  бюджет 50$
                </span>
              </div>
              <h3 className="font-display text-3xl text-mist">
                {COMPARISON.cheap.label}
              </h3>
              <ul className="mt-2 flex flex-col gap-3">
                {COMPARISON.cheap.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-mist/75"
                  >
                    <span className="mt-2 inline-block h-px w-4 bg-mist/40" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col gap-5 bg-gradient-to-br from-[#161208] via-graphite to-graphite p-8 md:p-10">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay" />
              <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
                  Вариант B
                </span>
                <span className="rounded-full border border-gold/60 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
                  Премиум
                </span>
              </div>
              <h3 className="relative font-display text-3xl text-gradient-bone">
                {COMPARISON.premium.label}
              </h3>
              <ul className="relative mt-2 flex flex-col gap-3">
                {COMPARISON.premium.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-bone"
                  >
                    <span
                      className="mt-1.5 inline-flex h-4 w-4 flex-none items-center justify-center rounded-full border border-gold/70 text-gold"
                      aria-hidden
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path
                          d="M1 5l3 3 5-7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Why-points grid */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line/70 bg-line/40 md:grid-cols-2 lg:grid-cols-3">
          {WHY_POINTS.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <article className="group relative flex h-full flex-col gap-4 bg-graphite p-7 transition-colors duration-500 hover:bg-elevated md:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/80">
                    0{i + 1}
                  </span>
                  <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold/40 to-transparent transition-all duration-500 group-hover:via-gold" />
                </div>
                <h3 className="font-display text-2xl font-light leading-[1.1] tracking-[-0.01em] text-bone">
                  {w.title}
                </h3>
                <p className="text-mist/90">{w.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
