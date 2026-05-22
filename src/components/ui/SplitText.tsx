"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  perWord?: boolean;
};

export function SplitText({ text, className, delay = 0, perWord = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const parts = perWord ? text.split(" ") : Array.from(text);

  return (
    <div ref={ref} className={cn("inline-block", className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {parts.map((p, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + i * (perWord ? 0.05 : 0.025),
              }}
              className="inline-block will-change-transform"
            >
              {p === " " ? "\u00A0" : p}
              {perWord && i < parts.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </div>
  );
}
