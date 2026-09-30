import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/postdocworks/doc2postdoc";
const pageTitle = "Doc2Postdoc";
const title = "Doc2Postdoc | PostdocWorks | i4iSciences";
const description =
  "Doc2Postdoc pairs every PhD facing the postdoc transition with peers and postdocs who've already made the same move — by field, career stage, and institution type.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: [
    "Doc2Postdoc",
    "PostdocWorks",
    "PhD to postdoc transition",
    "peer mentoring",
    "postdoc mentorship",
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
  brand: { "@type": "Brand", name: "PostdocWorks" },
};

export default function Doc2PostdocLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
