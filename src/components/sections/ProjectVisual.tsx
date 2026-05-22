import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/data";

const accentMap = {
  gold: {
    from: "from-[#c9a35a]",
    via: "via-[#8a6a2d]",
    to: "to-[#3a2b10]",
    text: "text-[#f0dba6]",
    border: "border-[#c9a35a]/40",
    glow: "shadow-[0_30px_120px_-30px_rgba(201,163,90,0.45)]",
  },
  crimson: {
    from: "from-[#9b1f3a]",
    via: "via-[#4a0d1d]",
    to: "to-[#180407]",
    text: "text-[#f7d8de]",
    border: "border-[#9b1f3a]/40",
    glow: "shadow-[0_30px_120px_-30px_rgba(155,31,58,0.45)]",
  },
  violet: {
    from: "from-[#5a2eaa]",
    via: "via-[#2b1452]",
    to: "to-[#0f0820]",
    text: "text-[#dccef9]",
    border: "border-[#5a2eaa]/40",
    glow: "shadow-[0_30px_120px_-30px_rgba(90,46,170,0.45)]",
  },
  ice: {
    from: "from-[#3d6c8f]",
    via: "via-[#1c3245]",
    to: "to-[#091018]",
    text: "text-[#d5e7f5]",
    border: "border-[#3d6c8f]/40",
    glow: "shadow-[0_30px_120px_-30px_rgba(61,108,143,0.45)]",
  },
  ember: {
    from: "from-[#c75a1e]",
    via: "via-[#5c2509]",
    to: "to-[#1a0a02]",
    text: "text-[#f8d5b8]",
    border: "border-[#c75a1e]/40",
    glow: "shadow-[0_30px_120px_-30px_rgba(199,90,30,0.45)]",
  },
} as const;

export function ProjectVisual({ item }: { item: PortfolioItem }) {
  const a = accentMap[item.accent];

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[26px] border bg-gradient-to-br",
        a.from,
        a.via,
        a.to,
        a.border
      )}
    >
      {/* Subtle noise + grid for depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.18] mix-blend-overlay" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(233,212,161,0.25), transparent 70%)",
        }}
      />

      {/* Kind-specific composition */}
      {item.kind === "thumbnail" && <ThumbnailMock item={item} />}
      {item.kind === "logo" && <LogoMock item={item} />}
      {item.kind === "identity" && <IdentityMock item={item} />}
      {item.kind === "banner" && <BannerMock item={item} />}
      {item.kind === "discord" && <DiscordMock item={item} />}
      {item.kind === "telegram" && <TelegramMock item={item} />}

      {/* Top-left ticker */}
      <div className="absolute left-5 top-5 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-gold-glow shadow-[0_0_12px_rgba(233,212,161,0.8)]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          {item.ticker}
        </span>
      </div>

      {/* Top-right corner mark */}
      <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
        {item.id.toUpperCase()}
      </span>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

function ThumbnailMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-0 flex items-end p-6 md:p-8">
      {/* Faux silhouette block */}
      <div
        aria-hidden
        className="absolute right-[-10%] bottom-0 h-[110%] w-[55%] opacity-90"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.45) 100%), radial-gradient(circle at 35% 25%, rgba(255,255,255,0.16), rgba(0,0,0,0) 55%)",
          clipPath:
            "polygon(20% 0, 80% 5%, 95% 25%, 100% 60%, 95% 100%, 5% 100%, 0 70%)",
        }}
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 h-44 w-44 md:h-56 md:w-56">
        <Image
          src="/brand/rcode11-logo.png"
          alt=""
          fill
          sizes="240px"
          className="object-contain opacity-0"
        />
      </div>

      {/* Big shouty thumbnail text */}
      <div className="relative z-10 max-w-[70%]">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-bone/30 bg-black/40 px-2.5 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/90">
            СЕЙЧАС В ЭФИРЕ
          </span>
        </div>
        <p className="font-display text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.02em] text-bone drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] md:text-5xl">
          Он сказал
          <br />
          <span className="text-gradient-gold italic">«невозможно».</span>
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] text-bone/70">
          {item.client}
        </p>
      </div>
    </div>
  );
}

function LogoMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="relative h-full w-full">
      {/* Faux grid construction lines */}
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 400">
        <g stroke="rgba(245,239,225,0.4)" strokeWidth="0.5" fill="none">
          <line x1="200" y1="0" x2="200" y2="400" />
          <line x1="0" y1="200" x2="400" y2="200" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="80" />
          <line x1="80" y1="80" x2="320" y2="320" />
          <line x1="320" y1="80" x2="80" y2="320" />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-48 w-48 md:h-56 md:w-56">
          <Image
            src="/brand/rcode11-logo.png"
            alt={`${item.title} mark`}
            fill
            sizes="240px"
            className="object-contain drop-shadow-[0_18px_60px_rgba(201,163,90,0.45)]"
          />
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          Знак · {item.year}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          1 / 1
        </span>
      </div>
    </div>
  );
}

function IdentityMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-0 grid grid-rows-[1.4fr_1fr] gap-2 p-5">
      <div className="relative overflow-hidden rounded-2xl border border-bone/15 bg-black/40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 70% at 30% 30%, rgba(233,212,161,0.45), rgba(0,0,0,0) 60%)",
          }}
        />
        <div className="absolute left-5 top-5 h-12 w-12">
          <Image
            src="/brand/rcode11-logo.png"
            alt=""
            fill
            sizes="48px"
            className="object-contain"
          />
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <p className="font-display text-3xl font-light leading-[0.9] tracking-[-0.02em] text-bone md:text-4xl">
            <span className="text-gradient-bone">{item.title}</span>
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
            {item.client}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="relative overflow-hidden rounded-xl border border-bone/15 bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-br from-bone/15 to-transparent" />
          <span className="absolute left-3 bottom-3 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/70">
            A
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-bone/15 bg-black/60">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(245,239,225,0.04) 0 8px, transparent 8px 16px)",
            }}
          />
          <span className="absolute right-3 top-3 font-display text-xl leading-none text-bone">
            R11
          </span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-bone/15 bg-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(201,163,90,0.45),transparent_60%)]" />
          <span className="absolute right-3 bottom-3 font-mono text-[9px] uppercase tracking-[0.3em] text-bone/70">
            {item.year}
          </span>
        </div>
      </div>
    </div>
  );
}

function BannerMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          Key Art · {item.year}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/70">
          Обложка · Соцсети · Стор
        </span>
      </div>
      <div className="relative">
        <p className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-light leading-[0.85] tracking-[-0.03em] text-bone">
          <span className="text-gradient-bone">{item.title}</span>
        </p>
        <p className="mt-3 max-w-sm text-sm text-bone/70">
          {item.copy}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-bone/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
            {item.metric}
          </span>
          <span className="inline-flex items-center rounded-full border border-bone/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
            {item.client}
          </span>
        </div>
      </div>
    </div>
  );
}

function DiscordMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[88px_1fr] p-4">
      {/* Server rail */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-bone/10 bg-black/50 py-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-gold/40 ring-2 ring-gold/30">
          <Image
            src="/brand/rcode11-logo.png"
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="h-10 w-10 rounded-full bg-bone/10"
            style={{ opacity: 1 - i * 0.18 }}
          />
        ))}
      </div>
      {/* Channel area */}
      <div className="ml-3 flex flex-col gap-2 rounded-2xl border border-bone/10 bg-black/40 p-4">
        <div className="flex items-center gap-2 border-b border-bone/10 pb-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/70">
            # lounge · {item.client}
          </span>
        </div>
        <div className="flex items-start gap-3">
          <span className="h-8 w-8 shrink-0 rounded-full bg-gold/40" />
          <div>
            <p className="font-display text-sm leading-tight text-bone">
              Founders <span className="text-mist/70 text-[10px] ml-1">сегодня в 21:04</span>
            </p>
            <p className="text-[12px] leading-snug text-bone/80">
              новый пакет айдентики в сервере. чисто. дорого. в бренде.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="h-8 w-8 shrink-0 rounded-full bg-bone/15" />
          <div>
            <p className="font-display text-sm leading-tight text-bone">
              Velour <span className="text-mist/70 text-[10px] ml-1">сегодня в 21:05</span>
            </p>
            <p className="text-[12px] leading-snug text-bone/80">
              именно таким это и должно было быть. сервер ощущается как закрытый клуб.
            </p>
          </div>
        </div>
        <div className="mt-auto rounded-xl border border-bone/15 bg-black/40 px-3 py-2 text-[12px] text-bone/60">
          Сообщение #lounge…
        </div>
      </div>
    </div>
  );
}

function TelegramMock({ item }: { item: PortfolioItem }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/40 ring-2 ring-gold/30">
            <Image
              src="/brand/rcode11-logo.png"
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base leading-none text-bone">
              {item.client}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/60">
              канал · приватный
            </span>
          </div>
        </div>
        <span className="rounded-full border border-bone/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/80">
          подписчики · 9 142
        </span>
      </div>
      <div className="space-y-2">
        <div className="rounded-2xl border border-bone/10 bg-black/40 p-4">
          <p className="font-display text-lg leading-tight text-bone">
            <span className="text-gradient-gold">Дроп №7</span> — Inner Circle
          </p>
          <p className="mt-1 text-[12px] text-bone/70">
            Двенадцать мест. Ожидания нет. Пишите, если уже знаете, что это.
          </p>
        </div>
        <div className="rounded-2xl border border-bone/10 bg-black/40 p-3">
          <p className="text-[12px] text-bone/60">
            Закреплено · шаблон сообщения от Rcode11
          </p>
        </div>
      </div>
    </div>
  );
}
