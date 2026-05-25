"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { ProjectVisual } from "@/components/sections/ProjectVisual";
import type { PortfolioItem } from "@/lib/data";

export function CaseModal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  // Lock background scroll and listen for Escape while modal is open.
  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-ink/85 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[32px] border border-line/80 bg-graphite md:grid-cols-[1.4fr_1fr]"
          >
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:min-h-[520px]">
              <ProjectVisual item={item} mode="modal" />
            </div>
            <div className="flex flex-col gap-6 p-7 md:p-10">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold">
                  Кейс · {item.id.toUpperCase()}
                </span>
                <button
                  onClick={onClose}
                  aria-label="Закрыть"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-ink/60 text-mist transition-colors hover:border-gold/60 hover:text-gold-glow"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-mist/70">
                  {item.category}
                </span>
                <h3 className="mt-2 font-display text-4xl font-light leading-[1] tracking-[-0.02em] text-bone">
                  {item.title}
                </h3>
                <p className="mt-2 text-mist">{item.client}</p>
              </div>
              <p className="text-[15px] leading-relaxed text-bone/90">{item.copy}</p>
              <div className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/40">
                {[
                  ["Год", item.year.toString()],
                  ["Результат", item.metric],
                  ["Формат", item.ticker],
                  ["Статус", item.status === "nda" ? "Под NDA" : "Сдан"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1 bg-graphite p-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      {k}
                    </span>
                    <span className="text-sm leading-tight text-bone">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
