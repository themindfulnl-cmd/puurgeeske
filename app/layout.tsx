import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

const SITE = "https://www.puurgeeske.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "PuurGeeske — Yoga, pilates en coaching in Hoofddorp",
    template: "%s · PuurGeeske",
  },
  description:
    "Verbind met je ware zelf in alle rust en ruimte. Yoga, pilates, breathwork, massage en persoonlijke coaching bij Geeske.",
  keywords: [
    "yoga Hoofddorp",
    "pilates Hoofddorp",
    "breathwork",
    "yin yoga",
    "personal coaching",
    "massage",
    "retreats",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE,
    siteName: "PuurGeeske",
    title: "PuurGeeske — Yoga, pilates en coaching in Hoofddorp",
    description:
      "Verbind met je ware zelf in alle rust en ruimte. Maak kennis met Geeske.",
    images: [
      {
        url: "/opt/intro-poster-1024.webp",
        width: 1024,
        height: 576,
        alt: "Geeske van PuurGeeske",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PuurGeeske — Yoga, pilates en coaching in Hoofddorp",
    description: "Verbind met je ware zelf in alle rust en ruimte.",
    images: ["/opt/intro-poster-1024.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1d181c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* Runs before first paint, so revealed sections never flash in and
            back out. Without it they simply stay visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
