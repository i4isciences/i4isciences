export default function Head() {
  const siteUrl = "https://i4isciences.com";
  const title = "i4iSciences — AI for education, teacher training, and learning platforms";
  const description = "i4iSciences builds AI-powered education platforms, teacher training, and learning tools that expand access and improve outcomes for learners worldwide.";
  const keywords = "i4iSciences, education technology, AI tutoring, teacher training, online learning, EdTech, adaptive learning, AI in education";

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "i4iSciences",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.svg`,
    sameAs: [
      "https://www.facebook.com/i4isciences",
      "https://twitter.com/i4isciences",
      "https://www.linkedin.com/company/i4isciences",
    ],
  };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="i4iSciences" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={`https://i4isciences.com/images/og-default.svg`} />
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/" hrefLang="x-default" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i4isciences" />

      {/* LinkedIn-specific: LinkedIn reads Open Graph; add publisher and author hints */}
      <meta property="article:publisher" content="https://www.linkedin.com/company/i4isciences" />
      <meta name="linkedin:owner" content="https://www.linkedin.com/company/i4isciences" />

      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
    </>
  );
}
