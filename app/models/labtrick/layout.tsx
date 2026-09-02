import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/models/labtrick";
const pageTitle = "LabTricks";
const title = "LabTricks | i4iSciences";
const description =
  "Bring science learning to life with practical lab simulations and interactive experiments.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: ["LabTricks", "lab simulations", "science education", "virtual labs", "i4iSciences"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-labtrick.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: siteUrl,
};

export default function LabtrickLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
