export default function Head() {
  const siteUrl = "https://www.i4isciences.com/models/labtrick";
  const title = "LabTricks — i4iSciences | Practical Lab Simulations for Learning";
  const description = "LabTricks offers hands-on lab simulations and interactive experiments to make science learning accessible and engaging for students.";
  const keywords = "LabTricks, lab simulations, science education, virtual labs, i4iSciences";

  const ld = { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: siteUrl };

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/models/labtrick";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/models/labtrick" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://www.i4isciences.com/images/og-labtrick.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
