import type { Metadata, Viewport } from "next";
import { Inter, Cormorant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/data";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

const display = Cormorant({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "Rcode11 — премиальный визуальный дизайнер. Айдентика, превью YouTube, киберспорт-бренды, Discord и Telegram, баннеры и кинематографичные ключевые арты. AI-брифинг 24/7.",
  keywords: [
    "Rcode11",
    "премиальный дизайнер",
    "превью YouTube",
    "киберспорт-бренд",
    "логотипы",
    "Discord-айдентика",
    "Telegram-айдентика",
    "брендинг",
    "FunPay дизайнер",
    "визуальная идентика",
    "premium design",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Премиальная визуальная идентика, киберспорт-брендинг и кинематографичные превью. AI-брифинг 24/7.",
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Премиальная визуальная идентика, киберспорт-брендинг, превью YouTube. AI-брифинг 24/7.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-ink text-bone min-h-full flex flex-col selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
