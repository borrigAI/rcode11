"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background] duration-500",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
        <div
          className={cn(
            "flex items-center gap-3 rounded-full border border-line/0 bg-ink/0 px-2 py-1 transition-all duration-500",
            scrolled &&
              "border-line/70 bg-ink/60 px-3 py-2 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
          )}
        >
          <Logo withWordmark />
        </div>

        <nav
          className={cn(
            "hidden items-center gap-1 rounded-full border border-line/70 bg-ink/50 px-2 py-2 backdrop-blur-xl transition-all duration-500 lg:flex",
            scrolled && "border-line/80 bg-ink/70"
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.22em] text-mist transition-colors hover:text-bone"
            >
              {link.label}
              <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-gold/70 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <PremiumButton href={BRAND.funpay} variant="primary">
            Заказать дизайн
          </PremiumButton>
        </div>

        <button
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-ink/60 backdrop-blur lg:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-bone transition-all duration-300",
              open ? "rotate-45" : "-translate-y-1"
            )}
          />
          <span
            className={cn(
              "absolute h-px w-5 bg-bone transition-all duration-300",
              open ? "-rotate-45" : "translate-y-1"
            )}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden"
          >
            <div className="mx-6 mt-3 rounded-3xl border border-line/80 bg-ink/85 p-6 backdrop-blur-2xl">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base text-mist transition-colors hover:bg-elevated hover:text-bone"
                  >
                    <span className="font-display text-lg">{link.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      →
                    </span>
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <PremiumButton href={BRAND.funpay} className="w-full">
                  Заказать дизайн
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
