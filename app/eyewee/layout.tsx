import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/eyewee";
const pageTitle = "Eyewee";
const title = "Eyewee | i4iSciences";
const description =
  "Eyewee is the AI agent behind Doc2Postdoc — it reads the record, checks the endorsement, connects the network, and reassesses over time.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: [
    "eyewee",
    "Doc2Postdoc",
    "AI research agent",
    "postdoc verification agent",
    "i4iSciences",
  ],
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
  "@type": "Service",
  name: title,
  description,
  url: siteUrl,
};

export default function EyeweeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
