export default function Head() {
  const siteUrl = "https://www.i4isciences.com";
  const title = "i4iSciences | AI Education, Teacher Training & Learning Platforms";
  const description = "i4iSciences builds AI-powered education platforms, teacher training, and learning tools that improve access, outcomes, and equity for learners worldwide.";
  const keywords = "i4iSciences, AI education, teacher training, AI tutoring, adaptive learning, EdTech, STEM learning, immigrant education";

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

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "i4iSciences",
    url: siteUrl,
    description,
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  };

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="i4iSciences Team" />
      <meta name="application-name" content="i4iSciences" />
      <meta name="apple-mobile-web-app-title" content="i4iSciences" />
      <meta name="theme-color" content="#071f3d" />
      <meta name="color-scheme" content="dark light" />
      <link rel="canonical" href={siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="i4iSciences" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={`https://www.i4isciences.com/images/og-default.svg`} />
      <meta property="og:image:alt" content="i4iSciences AI education and teacher training platform" />
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/" hrefLang="x-default" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@i4isciences" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.i4isciences.com/images/og-default.svg" />

      {/* LinkedIn-specific: LinkedIn reads Open Graph; add publisher and author hints */}
      <meta property="article:publisher" content="https://www.linkedin.com/company/i4isciences" />
      <meta name="linkedin:owner" content="https://www.linkedin.com/company/i4isciences" />

      <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
    </>
  );
}
