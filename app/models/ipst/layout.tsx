import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/models/ipst";
const pageTitle = "IPST";
const title = "IPST | i4iSciences";
const description =
  "Support immigrant families with practical tools, mentoring, and guidance for navigating education systems.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: ["IPST", "immigrant support", "parent resources", "education navigation", "i4iSciences IPST"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-ipst.png" }],
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

export default function IpstLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
