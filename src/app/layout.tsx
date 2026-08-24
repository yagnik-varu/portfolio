import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PerspectiveSync } from "@/domains/perspective/perspective-sync";
import { Header } from "@/shared/components/layout/header";
import { Footer } from "@/shared/components/layout/footer";
import { SmoothScrollProvider } from "@/shared/components/smooth-scroll-provider";

import { GlobalShortcuts } from "@/shared/components/global-shortcuts";
// import { PortfolioPet } from "@/features/portfolio-pet/components/portfolio-pet";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://yagnikvaru.dev"
  ),
  title: {
    default: "Yagnik Varu | Backend Engineer",
    template: "%s | Yagnik Varu",
  },
  description: "Portfolio of Yagnik Varu, Backend Engineer focusing on scalable systems and clean architecture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Yagnik Varu | Backend Engineer",
    description: "Portfolio of Yagnik Varu, Backend Engineer focusing on scalable systems and clean architecture.",
    siteName: "Yagnik Varu Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yagnik Varu | Backend Engineer",
    description: "Portfolio of Yagnik Varu, Backend Engineer focusing on scalable systems and clean architecture.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col bg-background text-text overflow-x-hidden">
        <SmoothScrollProvider>
          <GlobalShortcuts />
          <PerspectiveSync />
          {/* <PortfolioPet /> */}
          <Header />
          <main className="flex-1 flex flex-col pt-24 md:pt-28 pb-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
