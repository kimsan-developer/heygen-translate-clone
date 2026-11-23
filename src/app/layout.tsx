import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Video Translator — Translate videos in 175+ languages",
  description:
    "Translate videos into 175+ languages with realistic AI voices, lip sync, and subtitles. Expand your global reach in minutes with no editing required.",
  keywords: [
    "AI video translator", "video translation", "AI dubbing", "voice cloning",
    "lip sync", "YouTube translator", "subtitles",
  ],
  openGraph: {
    title: "AI Video Translator",
    description: "Translate videos into 175+ languages with realistic AI voices, lip sync, and subtitles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
