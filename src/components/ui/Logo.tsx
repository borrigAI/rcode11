import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  size = 36,
  withWordmark = false,
  className,
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#top"
      aria-label="Rcode11 — back to top"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        className="relative inline-flex items-center justify-center rounded-md"
        style={{ width: size, height: size }}
      >
        <span className="absolute inset-0 rounded-md bg-gold/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <Image
          src="/brand/rcode11-logo.png"
          alt="Rcode11"
          width={size}
          height={size}
          priority
          className="relative h-full w-full object-contain"
        />
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.15rem] font-medium tracking-[0.02em] text-bone">
            Rcode11
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            Премиум-дизайн
          </span>
        </span>
      )}
    </a>
  );
}
