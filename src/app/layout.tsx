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
    "Rcode11 — премиальные аватарки, баннеры, логотипы, превью и карточки товаров. Сделка через FunPay. AI-брифинг 24/7. 1000+ заказов, 750+ отзывов, рейтинг 4.97.",
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
    "Discord айдентика",
    "Telegram оформление",
    "брендинг для стримеров",
    "premium design",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Аватарки, баннеры, логотипы, превью, карточки товаров. AI-брифинг 24/7. FunPay-гарантия.",
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "Аватарки, баннеры, логотипы, превью, карточки товаров. AI-брифинг 24/7.",
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
