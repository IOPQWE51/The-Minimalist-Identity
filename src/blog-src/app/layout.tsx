import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

<<<<<<< HEAD
=======
const BASE_URL = "https://aura.blog";

>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
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
<<<<<<< HEAD
=======
  metadataBase: new URL(BASE_URL),
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
  title: {
    default: "Aura — Ethereal Digital Garden",
    template: "%s | Aura",
  },
  description:
    "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
<<<<<<< HEAD
  keywords: ["digital garden", "blog", "minimalism", "glassmorphism", "aurora"],
  authors: [{ name: "Aura" }],
  openGraph: {
    type: "website",
    locale: "en_US",
=======
  keywords: ["digital garden", "blog", "minimalism", "glassmorphism", "aurora", "design", "code"],
  authors: [{ name: "Aura", url: BASE_URL }],
  creator: "Aura",
  publisher: "Aura",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
    siteName: "Aura",
    title: "Aura — Ethereal Digital Garden",
    description:
      "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
<<<<<<< HEAD
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura — Ethereal Digital Garden",
    description:
      "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
=======
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Aura — Ethereal Digital Garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aura",
    creator: "@aura",
    title: "Aura — Ethereal Digital Garden",
    description:
      "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Aura — Ethereal Digital Garden",
      },
    ],
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
  },
  robots: {
    index: true,
    follow: true,
<<<<<<< HEAD
=======
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
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
<<<<<<< HEAD
=======
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Aura",
              "alternateName": "Aura — Ethereal Digital Garden",
              "url": BASE_URL,
              "description":
                "A minimalist digital garden built with glassmorphism, spring physics, and ethereal aesthetics.",
              "publisher": {
                "@type": "Organization",
                "name": "Aura",
                "url": BASE_URL,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${BASE_URL}/opengraph-image`,
                },
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${BASE_URL}/blog?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
>>>>>>> 4ab16c15 (feat: complete blog system — MDX articles, search, tags, SEO, RSS, tests)
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
