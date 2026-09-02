import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/models/onecent-tutors";
const title = "OneCent Tutors | i4iSciences";
const description = "Connect learners with affordable, high-quality tutoring through a trusted marketplace.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["OneCent Tutors", "tutors", "tutoring marketplace", "affordable tutors", "i4iSciences tutors"],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-onecent.png" }],
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

export default function OnecentTutorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
