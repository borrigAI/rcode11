import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PortfolioItem } from "@/lib/data";

const accentMap = {
  gold: {
    from: "from-[#1a1408]",
    via: "via-[#0b0905]",
    to: "to-[#050403]",
    accent: "#e9d4a1",
    accentSoft: "#c9a35a",
    border: "border-[#c9a35a]/25",
    glow: "shadow-[0_30px_120px_-30px_rgba(201,163,90,0.45)]",
  },
  crimson: {
    from: "from-[#1a0808]",
    via: "via-[#0a0303]",
    to: "to-[#050202]",
    accent: "#f4b2bd",
    accentSoft: "#9b1f3a",
    border: "border-[#9b1f3a]/25",
    glow: "shadow-[0_30px_120px_-30px_rgba(155,31,58,0.45)]",
  },
  violet: {
    from: "from-[#10081e]",
    via: "via-[#070310]",
    to: "to-[#030206]",
    accent: "#dccef9",
    accentSoft: "#5a2eaa",
    border: "border-[#5a2eaa]/25",
    glow: "shadow-[0_30px_120px_-30px_rgba(90,46,170,0.45)]",
  },
  ice: {
    from: "from-[#091420]",
    via: "via-[#040a12]",
    to: "to-[#020407]",
    accent: "#bcd6ea",
    accentSoft: "#3d6c8f",
    border: "border-[#3d6c8f]/25",
    glow: "shadow-[0_30px_120px_-30px_rgba(61,108,143,0.45)]",
  },
  ember: {
    from: "from-[#1d0c04]",
    via: "via-[#0a0402]",
    to: "to-[#050201]",
    accent: "#f8c89c",
    accentSoft: "#c75a1e",
    border: "border-[#c75a1e]/25",
    glow: "shadow-[0_30px_120px_-30px_rgba(199,90,30,0.45)]",
  },
} as const;

export function ProjectVisual({
  item,
  mode = "card",
}: {
  item: PortfolioItem;
  mode?: "card" | "modal";
}) {
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
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-noise opacity-[0.12] mix-blend-overlay" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{
          background: `radial-gradient(closest-side, ${a.accent}33, transparent 70%)`,
        }}
      />

      {item.image ? (
        <RealImage item={item} mode={mode} />
      ) : (
        <>
          {item.kind === "avatar" && <AvatarMock item={item} accent={a} />}
          {item.kind === "banner" && <BannerMock item={item} accent={a} />}
          {item.kind === "logo" && <LogoMock item={item} accent={a} />}
          {item.kind === "thumbnail" && <ThumbnailMock item={item} accent={a} />}
          {item.kind === "product-card" && (
            <ProductCardMock item={item} accent={a} />
          )}
        </>
      )}

      {mode === "modal" && (
        <>
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{
                background: a.accent,
                boxShadow: `0 0 12px ${a.accent}cc`,
              }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
              {item.ticker}
            </span>
          </div>
          <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">
            {item.id.toUpperCase()}
          </span>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

type AccentTokens = (typeof accentMap)[keyof typeof accentMap];

/* ---------- REAL IMAGE (real work sample from /public/portfolio) ---------- */
function RealImage({
  item,
  mode,
}: {
  item: PortfolioItem;
  mode: "card" | "modal";
}) {
  if (!item.image) return null;
  const isCard = mode === "card";
  return (
    <div className="absolute inset-0">
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes={
          isCard
            ? "(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
            : "(min-width: 1024px) 60vw, 100vw"
        }
        style={{
          objectFit: isCard ? "cover" : "contain",
          objectPosition: item.image.objectPosition ?? "center",
        }}
        className="select-none"
        priority={false}
      />
      {isCard && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-ink/30"
        />
      )}
    </div>
  );
}

/* ---------- AVATAR ---------- */
function AvatarMock({ item, accent }: { item: PortfolioItem; accent: AccentTokens }) {
  const initial = item.title.replace(/[^A-ZА-Я]/gi, "").slice(0, 1).toUpperCase() || "R";

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      {/* Concentric construction guides */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 400">
        <g stroke={accent.accent} strokeOpacity="0.25" fill="none" strokeWidth="0.5">
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="118" />
          <circle cx="200" cy="200" r="80" />
          <line x1="50" y1="200" x2="350" y2="200" />
          <line x1="200" y1="50" x2="200" y2="350" />
        </g>
      </svg>

      {/* Stack of avatar sizes (1024 / 256 / 64) — implies asset pack */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        <Avatar size={64} initial={initial} accent={accent} bordered />
        <Avatar size={40} initial={initial} accent={accent} bordered />
        <Avatar size={24} initial={initial} accent={accent} bordered />
      </div>

      {/* Hero avatar centered */}
      <div className="relative">
        <Avatar size={160} initial={initial} accent={accent} hero />
        {/* Live ring */}
        <span
          className="absolute -inset-1 rounded-full border-2 opacity-80"
          style={{ borderColor: accent.accent }}
        />
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.3em] text-black"
          style={{ background: accent.accent }}
        >
          LIVE
        </span>
      </div>

      {/* Metric panel right */}
      <div className="absolute right-6 bottom-6 max-w-[42%] text-right">
        <p className="font-display text-2xl font-light leading-none text-bone">
          {item.title}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          {item.client}
        </p>
        <p
          className="mt-3 inline-flex items-center justify-end rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{
            borderColor: `${accent.accent}55`,
            color: accent.accent,
          }}
        >
          {item.metric}
        </p>
      </div>
    </div>
  );
}

function Avatar({
  size,
  initial,
  accent,
  bordered,
  hero,
}: {
  size: number;
  initial: string;
  accent: AccentTokens;
  bordered?: boolean;
  hero?: boolean;
}) {
  return (
    <div
      className="relative rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        boxShadow: hero
          ? `0 25px 80px -20px ${accent.accent}66, inset 0 0 0 1px ${accent.accent}33`
          : bordered
            ? `inset 0 0 0 1px ${accent.accent}55`
            : undefined,
        background: `radial-gradient(120% 120% at 30% 20%, ${accent.accent}66, transparent 55%), radial-gradient(80% 80% at 70% 80%, ${accent.accentSoft}aa, #0a0807 75%)`,
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center font-display"
        style={{
          fontSize: size * 0.5,
          fontWeight: 300,
          color: accent.accent,
          letterSpacing: "-0.04em",
        }}
      >
        {initial}
      </span>
      {hero && (
        <div
          className="absolute inset-0 mix-blend-overlay opacity-60"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 45%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      )}
    </div>
  );
}

/* ---------- BANNER ---------- */
function BannerMock({ item, accent }: { item: PortfolioItem; accent: AccentTokens }) {
  return (
    <div className="absolute inset-0 flex flex-col p-5">
      {/* Faux platform chrome */}
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-bone/45">
        <span>{item.client}</span>
        <span>{item.ticker}</span>
      </div>

      {/* The banner */}
      <div
        className="relative mt-3 flex-1 overflow-hidden rounded-2xl border"
        style={{
          borderColor: `${accent.accent}33`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 100% at 20% 40%, ${accent.accent}33, transparent 55%), linear-gradient(120deg, ${accent.accentSoft}55 0%, transparent 60%), linear-gradient(180deg, #060403 0%, #0c0a08 100%)`,
          }}
        />
        {/* Diagonal cut from the logo language */}
        <div
          aria-hidden
          className="absolute -right-10 top-0 h-full w-[55%]"
          style={{
            background: `linear-gradient(115deg, transparent 0 30%, ${accent.accent}22 30% 32%, transparent 32% 55%, ${accent.accent}11 55% 57%, transparent 57%)`,
          }}
        />
        {/* Headline */}
        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 max-w-[60%]">
          <p
            className="font-display uppercase leading-[0.85] tracking-[-0.04em]"
            style={{ color: accent.accent, fontSize: "clamp(1.8rem,4.5vw,3rem)" }}
          >
            {item.title}
          </p>
          <p className="mt-2 max-w-[28ch] text-[12px] leading-snug text-bone/75">
            {item.copy}
          </p>
        </div>
        {/* CTA chip mimicking a subscribe button */}
        <span
          className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-black"
          style={{ background: accent.accent }}
        >
          Подписаться
        </span>
      </div>

      {/* Format strip — implies multi-platform export */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["YT 2560×1440", "TW 1920×480", "VK 1590×400"].map((fmt) => (
          <div
            key={fmt}
            className="rounded-lg border border-bone/10 bg-black/40 px-2 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-bone/55"
          >
            {fmt}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- LOGO ---------- */
function LogoMock({ item, accent }: { item: PortfolioItem; accent: AccentTokens }) {
  const mark = item.title
    .replace(/[^A-Za-zА-Яа-я0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="absolute inset-0 grid grid-rows-[1.5fr_1fr] gap-2 p-4">
      {/* Hero plate */}
      <div className="relative overflow-hidden rounded-2xl border border-bone/10 bg-black/55">
        {/* Construction grid */}
        <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 240">
          <g stroke={accent.accent} strokeOpacity="0.3" fill="none" strokeWidth="0.4">
            <line x1="0" y1="120" x2="400" y2="120" />
            <line x1="200" y1="0" x2="200" y2="240" />
            <line x1="100" y1="40" x2="300" y2="200" />
            <line x1="300" y1="40" x2="100" y2="200" />
            <circle cx="200" cy="120" r="70" />
            <circle cx="200" cy="120" r="44" />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="font-display tracking-[-0.06em] leading-none"
            style={{
              fontSize: "clamp(3rem,8vw,5.5rem)",
              color: accent.accent,
              textShadow: `0 20px 60px ${accent.accent}40`,
            }}
          >
            {mark}
          </div>
        </div>
        <span className="absolute left-4 bottom-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          MARK · {item.year}
        </span>
        <span className="absolute right-4 bottom-4 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
          1 / 1
        </span>
      </div>

      {/* Variants strip */}
      <div className="grid grid-cols-4 gap-2">
        {/* Black on cream */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-[#f5efe1]">
          <span
            className="font-display text-2xl tracking-[-0.05em] text-black/90"
          >
            {mark}
          </span>
          <span className="absolute left-2 bottom-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-black/60">
            LIGHT
          </span>
        </div>
        {/* Cream on black */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-black">
          <span className="font-display text-2xl tracking-[-0.05em] text-bone">
            {mark}
          </span>
          <span className="absolute left-2 bottom-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-bone/55">
            DARK
          </span>
        </div>
        {/* Outline */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-bone/15 bg-black/30">
          <span
            className="font-display text-2xl tracking-[-0.05em] text-transparent"
            style={{ WebkitTextStroke: `1px ${accent.accent}` }}
          >
            {mark}
          </span>
          <span className="absolute left-2 bottom-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-bone/55">
            OUTLINE
          </span>
        </div>
        {/* Mono */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl bg-[#1a1a1a]">
          <span className="font-display text-2xl tracking-[-0.05em] text-white/85">
            {mark}
          </span>
          <span className="absolute left-2 bottom-1.5 font-mono text-[8px] uppercase tracking-[0.25em] text-white/45">
            MONO
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- THUMBNAIL ---------- */
function ThumbnailMock({ item, accent }: { item: PortfolioItem; accent: AccentTokens }) {
  return (
    <div className="absolute inset-0 flex flex-col p-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45">
        <span>YOUTUBE · {item.client}</span>
        <span>{item.metric}</span>
      </div>

      {/* Hero thumbnail */}
      <div
        className="relative mt-3 overflow-hidden rounded-2xl border"
        style={{
          aspectRatio: "16 / 9",
          borderColor: `${accent.accent}33`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(80% 100% at 70% 50%, ${accent.accentSoft}55, transparent 60%), linear-gradient(135deg, #0e0805 0%, #1c0f06 50%, #050302 100%)`,
          }}
        />
        {/* Silhouette */}
        <div
          aria-hidden
          className="absolute right-[-5%] bottom-0 h-[110%] w-[55%] opacity-90"
          style={{
            background: `radial-gradient(circle at 30% 25%, ${accent.accent}33, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.65) 100%)`,
            clipPath:
              "polygon(20% 0, 80% 5%, 95% 25%, 100% 60%, 95% 100%, 5% 100%, 0 70%)",
          }}
        />
        {/* Live tag */}
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-bone/30 bg-black/50 px-2.5 py-1 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/90">
            СЕЙЧАС В ЭФИРЕ
          </span>
        </div>
        {/* Big shouty thumbnail text */}
        <div className="absolute inset-x-5 bottom-4 max-w-[70%]">
          <p
            className="font-display uppercase leading-[0.85] tracking-[-0.03em]"
            style={{ color: accent.accent, fontSize: "clamp(1.4rem,3.5vw,2.4rem)" }}
          >
            {item.title}
          </p>
        </div>
        {/* Faux duration */}
        <span className="absolute right-4 bottom-4 rounded-md bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-white">
          12:48
        </span>
      </div>

      {/* Related thumbnails strip — implies series */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-lg border border-bone/10 bg-black/45"
            style={{ aspectRatio: "16 / 9" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${120 + i * 25}deg, ${accent.accentSoft}55 0%, transparent 65%), #0a0604`,
              }}
            />
            <span
              className="absolute left-2 bottom-1.5 font-display text-[10px] uppercase leading-none tracking-[-0.02em]"
              style={{ color: accent.accent }}
            >
              EP-{(i + 1).toString().padStart(2, "0")}
            </span>
            <span className="absolute right-2 bottom-1.5 font-mono text-[8px] text-white/70">
              {7 + i}:0{i}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PRODUCT CARD ---------- */
function ProductCardMock({ item, accent }: { item: PortfolioItem; accent: AccentTokens }) {
  return (
    <div className="absolute inset-0 grid grid-cols-[1.15fr_1fr] gap-3 p-4">
      {/* Big product card */}
      <div
        className="relative overflow-hidden rounded-2xl border bg-[#f5efe1] text-black"
        style={{ borderColor: `${accent.accent}55` }}
      >
        {/* Top: discount badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5">
          <span
            className="rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-black"
            style={{ background: accent.accent }}
          >
            −38%
          </span>
          <span className="rounded-md border border-black/15 bg-white/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-black/75">
            BESTSELLER
          </span>
        </div>

        {/* Product visual area */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pb-32 pt-12">
          <div
            className="relative h-full w-full rounded-xl"
            style={{
              background: `radial-gradient(70% 80% at 50% 40%, ${accent.accentSoft}22, transparent 65%), linear-gradient(160deg, #1a1612 0%, #050302 100%)`,
            }}
          >
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display tracking-[-0.05em]"
              style={{
                color: accent.accent,
                fontSize: "clamp(2rem,5vw,3.5rem)",
              }}
            >
              {item.title.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Bottom info block */}
        <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 p-3 shadow-[0_8px_20px_-12px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/55">
              {item.client}
            </span>
            <div className="flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((s) => (
                <svg key={s} viewBox="0 0 20 20" width="10" height="10">
                  <path
                    d="M10 1l2.6 5.8 6.4.6-4.9 4.3 1.5 6.3L10 14.7 4.4 18l1.5-6.3L1 7.4l6.4-.6L10 1z"
                    fill="#0a0807"
                  />
                </svg>
              ))}
              <span className="ml-1 font-mono text-[9px] text-black/55">4.9</span>
            </div>
          </div>
          <p className="mt-1 font-display text-base leading-tight text-black">
            {item.copy.split(".")[0]}.
          </p>
          <div className="mt-1.5 flex items-baseline gap-1.5">
            <span className="font-display text-base leading-none text-black">
              4 290 ₽
            </span>
            <span className="font-mono text-[10px] text-black/45 line-through">
              6 950 ₽
            </span>
          </div>
        </div>
      </div>

      {/* Stacked side cards mimicking marketplace grid */}
      <div className="grid grid-rows-2 gap-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-bone/10 bg-[#0d0a07]"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-90"
              style={{
                background: `radial-gradient(60% 70% at 50% 50%, ${accent.accentSoft}40, transparent 70%)`,
              }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display tracking-[-0.04em]"
              style={{
                color: accent.accent,
                fontSize: "1.5rem",
              }}
            >
              {item.title.split(" ").slice(-1)[0]}
              <span className="ml-0.5 font-mono text-[10px]">/{i + 2}</span>
            </span>
            <div className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-md bg-white/90 px-2 py-1 text-black">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/55">
                {item.client.split(" ")[0]}
              </span>
              <span className="font-display text-[11px] leading-none text-black">
                {(3 + i) * 1000 + 290} ₽
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
