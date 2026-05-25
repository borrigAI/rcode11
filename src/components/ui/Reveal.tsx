"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "header" | "footer" | "span";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export function Reveal({ children, className, delay = 0, once = true, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={delay}
    >
      {children}
    </Component>
  );
}
