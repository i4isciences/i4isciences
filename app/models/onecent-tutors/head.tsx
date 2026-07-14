export default function Head() {
  const siteUrl = "https://i4isciences.in/models/onecent-tutors";
  const title = "OneCent Tutors — i4iSciences | Affordable Tutor Marketplace";
  const description = "OneCent Tutors connects learners with vetted tutors for affordable, high-quality instruction across subjects and exam prep.";
  const keywords = "OneCent Tutors, tutors, tutoring marketplace, affordable tutors, i4iSciences tutors";

  const ld = { "@context": "https://schema.org", "@type": "Service", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/models/onecent-tutors";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/models/onecent-tutors" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-onecent.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
