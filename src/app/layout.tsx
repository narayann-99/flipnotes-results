import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlipNotes Results - AKTU Result Explorer",
  description: "A premium, clean, and organized dashboard to explore your university academic results.",
  metadataBase: new URL("https://results.flipnotes.in"),
  openGraph: {
    title: "FlipNotes Results - AKTU Result Explorer",
    description: "View your university results in a beautifully organized dashboard.",
    url: "https://results.flipnotes.in",
    siteName: "FlipNotes Results",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlipNotes Results - AKTU Result Explorer",
    description: "View your university results in a beautifully organized dashboard.",
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
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-bg-matte text-text-primary selection:bg-brand-primary/30 selection:text-text-primary noise-bg flex flex-col`}
      >
        {/* Ambient background elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle dots grid */}
          <div className="absolute inset-0 dots-grid opacity-60" />
          
          {/* Ambient soft purple glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        </div>

        {/* Global Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10 flex-1 flex flex-col">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
