import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/ai-ecosystem";
const title = "AI Ecosystem | i4iSciences";
const description = "Explore the AI Ecosystem powering education, healthcare and innovation.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["AI Ecosystem", "AI Olympiad", "AI programs for kids", "AI education", "i4iSciences"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-default.svg" }],
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

export default function AiEcosystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
