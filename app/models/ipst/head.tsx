export default function Head() {
  const siteUrl = "https://www.i4isciences.com/models/ipst";
  const title = "IPST | i4iSciences";
  const description = "Support immigrant families with practical tools, mentoring, and guidance for navigating education systems.";
  const keywords = "IPST, immigrant support, parent resources, education navigation, i4iSciences IPST";

  const ld = { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: siteUrl };

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/models/ipst";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/models/ipst" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://www.i4isciences.com/images/og-ipst.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
