export default function Head() {
  const siteUrl = "https://i4isciences.in/contact";
  const title = "Contact — i4iSciences | Book a Demo & Get Support";
  const description = "Get in touch with i4iSciences for demos, partnerships, and support. We'll respond within 48 hours.";
  const keywords = "contact i4iSciences, book demo, partnership, education support, contact us";

  const ld = { "@context": "https://schema.org", "@type": "ContactPage", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/contact";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/contact" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-contact.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
