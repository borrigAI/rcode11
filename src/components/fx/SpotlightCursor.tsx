"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useSpring } from "motion/react";

// Subscribe to media-query state via useSyncExternalStore (no setState-in-effect lint).
function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}
function getMediaSnapshot(query: string) {
  return () =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches;
}

export function SpotlightCursor() {
  const isCoarse = useSyncExternalStore(
    subscribeMedia("(hover: none)"),
    getMediaSnapshot("(hover: none)"),
    () => false
  );
  const reduced = useSyncExternalStore(
    subscribeMedia("(prefers-reduced-motion: reduce)"),
    getMediaSnapshot("(prefers-reduced-motion: reduce)"),
    () => false
  );

  const enabled = !isCoarse && !reduced;
  const x = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(0, { stiffness: 90, damping: 18, mass: 0.6 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[2] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(233,212,161,0.18), rgba(201,163,90,0.06) 35%, transparent 65%)",
          filter: "blur(12px)",
        }}
      />
    </motion.div>
  );
}
