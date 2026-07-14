export default function Head() {
  const siteUrl = "https://i4isciences.in/models";
  const title = "Models — i4iSciences | AI Models & Education Solutions";
  const description = "Discover AI models and education solutions from i4iSciences including IPST, LabTricks, OneCent Tutors, and Teach The Teacher.";
  const keywords = "AI models, education models, IPST, LabTricks, OneCent Tutors, Teach The Teacher, i4iSciences models";

  const ld = { "@context": "https://schema.org", "@type": "CollectionPage", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/models";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/models" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-models.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
