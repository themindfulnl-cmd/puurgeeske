import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
  preload: true,
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
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
    "Yoga, pilates, ademwerk en persoonlijke begeleiding in Hoofddorp. Ontdek het aanbod van Geeske en vind een les of sessie die bij je past.",
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
      "Yoga en persoonlijke aandacht in Hoofddorp. Maak kennis met Geeske en ontdek wat bij je past.",
    images: [
      {
        url: "/brand/puurgeeske-logo.png",
        width: 1254,
        height: 1254,
        alt: "Puur Geeske logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PuurGeeske — Yoga, pilates en coaching in Hoofddorp",
    description: "Yoga en persoonlijke aandacht in Hoofddorp.",
    images: ["/brand/puurgeeske-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ed",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Runs before first paint, so revealed sections never flash in and
            back out. Without it they simply stay visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className={`${editorial.variable} ${body.variable} antialiased`}>
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
