"use client";

import { motion, type HTMLMotionProps, type Transition } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";

type Props = {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  children: React.ReactNode;
  iconRight?: React.ReactNode;
  magnetic?: boolean;
} & Omit<HTMLMotionProps<"button">, "children">;

export function PremiumButton({
  variant = "primary",
  href,
  className,
  children,
  iconRight,
  magnetic = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!magnetic) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    "group relative inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[13px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 will-change-transform";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "text-ink bg-gradient-to-b from-[#f0dba6] via-[#d4b06a] to-[#a67e36] shadow-[0_10px_40px_-12px_rgba(201,163,90,0.6)] hover:shadow-[0_18px_60px_-12px_rgba(201,163,90,0.8)]",
    outline:
      "text-bone border border-line/80 bg-graphite/40 backdrop-blur hover:border-gold/60 hover:text-gold-glow",
    ghost:
      "text-mist hover:text-bone",
  };

  const spring: Transition = { type: "spring", stiffness: 300, damping: 20, mass: 0.4 };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={spring}
      className="inline-block"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        className={cn(base, styles[variant], className)}
        {...rest}
      >
        {variant === "primary" && (
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute -inset-y-2 -left-1/3 w-1/3 translate-x-[-100%] rotate-12 bg-white/40 blur-md transition-transform duration-700 group-hover:translate-x-[400%]" />
          </span>
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
          {iconRight ?? null}
        </span>
      </motion.button>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {inner}
      </a>
    );
  }
  return inner;
}
