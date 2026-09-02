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

const siteUrl = "https://www.i4isciences.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "i4iSciences | AI Education, Teacher Training & Learning Platforms",
    template: "%s | i4iSciences",
  },
  description:
    "i4iSciences builds AI-powered education platforms, teacher training, and learning tools that improve access, outcomes, and equity for learners worldwide.",
  icons: {
    icon: "/images/favicon.png",
  },
  keywords: [
    "i4iSciences",
    "AI education",
    "teacher training",
    "AI tutoring",
    "adaptive learning",
    "EdTech",
    "STEM learning",
    "immigrant education",
  ],
  openGraph: {
    siteName: "i4iSciences",
    images: [
      {
        url: "https://www.i4isciences.com/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "i4iSciences AI education and teacher training platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "i4iSciences | AI Education, Teacher Training & Learning Platforms",
    description:
      "AI-powered education platforms, teacher training, and learning tools that improve access, outcomes, and equity for learners worldwide.",
    images: ["https://www.i4isciences.com/images/og-default.svg"],
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
  authors: [{ name: "i4iSciences Team", url: "https://www.i4isciences.com" }],
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "i4iSciences",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  sameAs: [
    "https://www.facebook.com/i4isciences",
    "https://twitter.com/i4isciences",
    "https://www.linkedin.com/company/i4isciences",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "i4iSciences",
  url: siteUrl,
  inLanguage: "en",
  publisher: { "@id": `${siteUrl}/#organization` },
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
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
