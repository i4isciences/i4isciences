import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/postdocworks";
const pageTitle = "PostdocWorks";
const title = "PostdocWorks | i4iSciences";
const description =
  "PostdocWorks connects postdoctoral researchers with real career pathways — translating academic achievement into industry opportunity, verified every step of the way.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: [
    "PostdocWorks",
    "postdoc jobs",
    "PhD career network",
    "verified researcher network",
    "postdoc mentorship",
    "Doc2Postdoc",
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

export default function PostdocWorksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
