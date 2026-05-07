import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aura — Ethereal Digital Garden",
    template: "%s | Aura",
  },
  description:
    "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
  keywords: ["digital garden", "blog", "minimalism", "glassmorphism", "aurora"],
  authors: [{ name: "Aura" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aura",
    title: "Aura — Ethereal Digital Garden",
    description:
      "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Ethereal Digital Garden",
    description:
      "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
