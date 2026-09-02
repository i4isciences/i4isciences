import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/contact";
const pageTitle = "Contact Us";
const title = "Contact Us | i4iSciences";
const description = "Connect with i4iSciences for partnerships, demos, and support.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: ["contact i4iSciences", "book demo", "partnership", "education support", "contact us"],
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
  "@type": "ContactPage",
  name: title,
  description,
  url: siteUrl,
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I contact i4iSciences?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach i4iSciences through the contact form on this page for demos, partnerships, support, and general inquiries.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly will i4iSciences respond?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The team aims to respond within 48 hours for most outreach requests.",
      },
    },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
    </>
  );
}
