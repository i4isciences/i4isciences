export default function Head() {
  const siteUrl = "https://www.i4isciences.com/ai-ecosystem";
  const title = "AI Ecosystem — i4iSciences | Competitions, Programs & Resources";
  const description = "Explore the i4iSciences AI Ecosystem: AI Olympiad, learning programs, competitions, and resources that help young creators build real AI projects.";
  const keywords = "AI Ecosystem, AI Olympiad, AI programs for kids, AI education, i4iSciences";

  const ld = { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: siteUrl };

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/ai-ecosystem";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/ai-ecosystem" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://www.i4isciences.com/images/og-default.svg" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
