"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";

export type Slide = {
  id: string;
  label: string;
  element: ReactNode;
  /** Allow internal vertical scroll inside this slide as a fallback. */
  allowScroll?: boolean;
};

const SWIPE_THRESHOLD_PX = 60;

/**
 * SlideDeck — horizontal "one-screen-at-a-time" deck navigation.
 *
 * Replaces vertical scroll with arrow-key / button / swipe driven
 * left↔right transitions, exactly as requested. Each slide takes
 * 100vw × 100svh, no internal vertical scrolling.
 */
export function SlideDeck({ slides }: { slides: Slide[] }) {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [hintSeen, setHintSeen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.max(0, Math.min(total - 1, i + delta)));
    },
    [total],
  );
  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(total - 1, i))),
    [total],
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      // Don't hijack typing inside form fields.
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, total]);

  // Touch swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const startX = touchStartXRef.current;
      touchStartXRef.current = null;
      if (startX == null) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > SWIPE_THRESHOLD_PX) {
        go(diff > 0 ? 1 : -1);
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [go]);

  // Horizontal mouse-wheel / touchpad swipe → navigate slides. Vertical
  // wheel stays untouched so users can scroll *inside* a slide that
  // overflows, instead of accidentally jumping to the next block.
  useEffect(() => {
    let lastWheelAt = 0;
    const onWheel = (e: WheelEvent) => {
      const dx = e.deltaX;
      const dy = Math.abs(e.deltaY);
      if (Math.abs(dx) < 25 || Math.abs(dx) <= dy) return;
      const now = Date.now();
      if (now - lastWheelAt < 700) return;
      lastWheelAt = now;
      go(dx > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go]);

  // Hash-link support — if user lands on `#portfolio` go directly to it.
  useEffect(() => {
    const map = new Map(slides.map((s, i) => [s.id, i]));
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (!h) return;
      const i = map.get(h);
      if (i != null) goTo(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [slides, goTo]);

  // First-time hint — auto-dismiss after 6s
  useEffect(() => {
    const t = setTimeout(() => setHintSeen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  // Once the user has navigated, also dismiss the hint.
  const goAndHide = useCallback(
    (delta: number) => {
      setHintSeen(true);
      go(delta);
    },
    [go],
  );
  const goToAndHide = useCallback(
    (i: number) => {
      setHintSeen(true);
      goTo(i);
    },
    [goTo],
  );

  const current = slides[index];
  const next = slides[Math.min(total - 1, index + 1)];
  const prev = slides[Math.max(0, index - 1)];

  const labelDisplay = useMemo(
    () =>
      `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ${current.label}`,
    [index, total, current.label],
  );

  return (
    <div className="relative isolate h-svh w-screen overflow-hidden">
      {/* Sliding track */}
      <div
        ref={trackRef}
        className="flex h-full will-change-transform"
        style={{
          width: `${total * 100}vw`,
          transform: `translate3d(-${index * 100}vw, 0, 0)`,
          transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            id={s.id}
            data-active={s.id === current.id ? "true" : "false"}
            className={`deck-slide ${s.allowScroll ? "allow-scroll" : ""}`}
          >
            {s.element}
          </div>
        ))}
      </div>

      {/* ───────────── Navigation overlays ───────────── */}

      {/* Left/right arrows — visible on desktop, slightly smaller on mobile */}
      <button
        type="button"
        onClick={() => goAndHide(-1)}
        disabled={index === 0}
        aria-label={`Предыдущий блок${prev ? ` · ${prev.label}` : ""}`}
        className="group fixed left-3 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-line/70 bg-ink/60 p-3 text-bone backdrop-blur-md transition-all hover:border-gold/60 hover:bg-ink/80 hover:text-gold-glow disabled:cursor-not-allowed disabled:opacity-25 md:left-6 md:p-4"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M12 3L5 9l7 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goAndHide(1)}
        disabled={index === total - 1}
        aria-label={`Следующий блок${next ? ` · ${next.label}` : ""}`}
        className="group fixed right-3 top-1/2 z-[60] -translate-y-1/2 rounded-full border border-line/70 bg-ink/60 p-3 text-bone backdrop-blur-md transition-all hover:border-gold/60 hover:bg-ink/80 hover:text-gold-glow disabled:cursor-not-allowed disabled:opacity-25 md:right-6 md:p-4"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path
            d="M6 3l7 6-7 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Bottom progress strip + label */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-[55] flex justify-center md:bottom-5">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-line/70 bg-ink/70 px-4 py-2 backdrop-blur-md md:gap-4 md:px-5 md:py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist md:text-[11px]">
            {labelDisplay}
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToAndHide(i)}
                aria-label={`Перейти к блоку ${s.label}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-6 bg-gold-glow"
                    : "w-1.5 bg-bone/30 hover:bg-bone/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* First-time hint */}
      <AnimatePresence>
        {!hintSeen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-x-0 top-5 z-[59] flex justify-center md:top-7"
          >
            <div className="flex items-center gap-3 rounded-full border border-gold/40 bg-ink/80 px-4 py-2 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-glow">
                ←  →  для перелистывания · свайп на телефоне
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
