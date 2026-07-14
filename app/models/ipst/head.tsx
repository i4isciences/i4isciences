export default function Head() {
  const siteUrl = "https://i4isciences.in/models/ipst";
  const title = "IPST — i4iSciences | Immigrant & Parent Support Tools";
  const description = "IPST by i4iSciences provides resources, mentorship, and language support for immigrant families and students navigating new education systems.";
  const keywords = "IPST, immigrant support, parent resources, education navigation, i4iSciences IPST";

  const ld = { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/models/ipst";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/models/ipst" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-ipst.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
