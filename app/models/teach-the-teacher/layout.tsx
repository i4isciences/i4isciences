import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/models/teach-the-teacher";
const title = "Teach The Teacher | i4iSciences";
const description = "Train, certify, and grow educators with professional development designed for lasting impact.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "teacher training",
    "professional development",
    "teacher certification",
    "Teach The Teacher",
    "i4iSciences",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-ttt.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: title,
  description,
  url: siteUrl,
};

export default function TeachTheTeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      {children}
    </>
  );
}
