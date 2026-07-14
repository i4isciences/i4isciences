export default function Head() {
  const siteUrl = "https://i4isciences.in/models/teach-the-teacher";
  const title = "Teach The Teacher — i4iSciences | Teacher Development & Certification";
  const description = "Teach The Teacher offers training, certification, and professional development for teachers to improve classroom outcomes and scale quality instruction.";
  const keywords = "teacher training, professional development, teacher certification, Teach The Teacher, i4iSciences";

  const ld = { "@context": "https://schema.org", "@type": "Course", name: title, description, url: siteUrl };

  const domains = [
    "https://i4isciences.com",
    "https://i4isciences.in",
    "https://i4isciences.ai",
    "https://i4isciences.us",
    "https://i4isciences.ca",
  ];
  const path = "/models/teach-the-teacher";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://i4isciences.com/models/teach-the-teacher" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://i4isciences.in/images/og-ttt.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </>
  );
}
