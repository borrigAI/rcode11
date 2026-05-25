import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/data";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Geist({
  variable: "--font-display",
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600"],
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
    "Rcode11 — премиальный статический дизайн на FunPay: аватарки, баннеры, логотипы, превью, карточки товаров и лендинги. AI-брифинг 24/7 за 3–5 минут. 5.0 рейтинг, 750+ отзывов, 1000+ заказов.",
  keywords: [
    "Rcode11",
    "аватарки",
    "баннеры",
    "логотипы",
    "превью YouTube",
    "карточки товаров",
    "Wildberries дизайн",
    "Ozon карточки",
    "FunPay дизайнер",
    "Twitch баннер",
    "лендинг на заказ",
    "дизайнер FunPay",
    "брендинг для стримеров",
    "premium design",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Статический дизайн на FunPay: аватарки, баннеры, логотипы, превью, карточки товаров и лендинги. AI-брифинг 24/7. Лоты от ₽49.",
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Статический дизайн на FunPay: визуал, который выглядит дороже лота. AI-брифинг 24/7.",
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
      <body className="bg-ink text-bone h-full overflow-hidden selection:bg-gold/30">
        {children}
      </body>
    </html>
  );
}
