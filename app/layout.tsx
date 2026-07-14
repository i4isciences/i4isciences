import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import GoToTopButton from "@/components/GoToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i4iSciences — AI for Education, Teacher Training & Learning",
  description: "i4iSciences builds AI-powered education platforms, teacher training, and learning tools that expand access and improve outcomes for learners worldwide.",
  icons: {
    icon: "/images/favicon.png",
  },
  keywords: [
    "i4iSciences",
    "education technology",
    "AI tutoring",
    "teacher training",
    "online learning",
    "EdTech",
  ],
  openGraph: {
    title: "i4iSciences — AI for Education, Teacher Training & Learning",
    description: "AI-powered education platforms, teacher training, and learning tools that expand access and improve outcomes.",
    url: "https://i4isciences.in",
    siteName: "i4iSciences",
    images: [
      {
        url: "https://i4isciences.in/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "i4iSciences — AI for education",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "i4iSciences — AI for Education",
    description: "AI-powered education platforms, teacher training, and learning tools.",
    images: ["https://i4isciences.in/images/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "i4iSciences Team", url: "https://i4isciences.in" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <main id="page-top" className="overflow-x-hidden">
          {children}
        </main>

        <div id="page-end-sentinel" aria-hidden="true" className="h-px" />
        <GoToTopButton />
        <Footer />
      </body>
    </html>
  );
}
