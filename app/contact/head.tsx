export default function Head() {
  const siteUrl = "https://www.i4isciences.com/contact";
  const title = "Contact — i4iSciences | Book a Demo & Get Support";
  const description = "Get in touch with i4iSciences for demos, partnerships, and support. We'll respond within 48 hours.";
  const keywords = "contact i4iSciences, book demo, partnership, education support, contact us";

  const ld = { "@context": "https://schema.org", "@type": "ContactPage", name: title, description, url: siteUrl };

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

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/contact";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/contact" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://www.i4isciences.com/images/og-default.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </>
  );
}
