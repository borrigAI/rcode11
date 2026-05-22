"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function GoldOrb({ size = 480, className }: { size?: number; className?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ width: size, height: size }}
    >
      <div
        className="h-full w-full rounded-full opacity-70 mix-blend-screen"
        style={{
          background:
            "radial-gradient(closest-side, rgba(233,212,161,0.55), rgba(201,163,90,0.28) 38%, rgba(138,106,45,0.10) 60%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

export function FloatingLightStreaks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 -left-32 h-[55rem] w-[55rem] animate-floaty"
      >
        <GoldOrb size={880} />
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute -bottom-72 -right-40 h-[40rem] w-[40rem] animate-pulse-gold"
      >
        <GoldOrb size={640} />
      </motion.div>
      <div className="absolute inset-0 bg-grid opacity-[0.35] mask-radial-center" />
      <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay" />
      {/* Diagonal streaks echoing the logo */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,163,90,0)" />
            <stop offset="50%" stopColor="rgba(201,163,90,0.55)" />
            <stop offset="100%" stopColor="rgba(201,163,90,0)" />
          </linearGradient>
        </defs>
        <g opacity="0.35">
          <line x1="-100" y1="200" x2="900" y2="-100" stroke="url(#streak)" strokeWidth="1" />
          <line x1="200" y1="950" x2="1600" y2="350" stroke="url(#streak)" strokeWidth="1" />
          <line x1="-200" y1="700" x2="1100" y2="100" stroke="url(#streak)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] bg-noise opacity-[0.06] mix-blend-overlay"
    />
  );
}

export function VignetteOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
}
