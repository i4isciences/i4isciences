export default function Head() {
  const siteUrl = "https://i4isciences.in/ai-ecosystem";
  const title = "AI Ecosystem — i4iSciences | Competitions, Programs & Resources";
  const description = "Explore the i4iSciences AI Ecosystem: AI Olympiad, learning programs, competitions, and resources that help young creators build real AI projects.";
  const keywords = "AI Ecosystem, AI Olympiad, AI programs for kids, AI education, i4iSciences";

  const ld = { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/ai-ecosystem";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/ai-ecosystem" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-aiecosystem.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
