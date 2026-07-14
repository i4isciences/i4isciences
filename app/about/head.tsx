export default function Head() {
  const siteUrl = "https://i4isciences.in/about";
  const title = "About — i4iSciences | Mission, Team & Impact";
  const description = "Learn about i4iSciences' mission to expand access to quality education with AI, teacher training programs, and global partnerships.";
  const keywords = "i4iSciences about, EdTech mission, teacher training, AI in education, educational impact";

  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: siteUrl,
  };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/about";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/about" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-about.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
