export default function Head() {
  const siteUrl = "https://www.i4isciences.com/about";
  const title = "About — i4iSciences | Mission, Team & Impact";
  const description = "Learn about i4iSciences' mission to expand access to quality education with AI, teacher training programs, and global partnerships.";
  const keywords = "i4iSciences about, EdTech mission, teacher training, AI in education, educational impact";

  const ld = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: title,
    description,
    url: siteUrl,
    mainEntity: {
      "@id": "https://www.i4isciences.com/#organization",
    },
    publisher: {
      "@id": "https://www.i4isciences.com/#organization",
    },
  };

  const personLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#ranjit-chauhan",
        name: "Ranjit Chauhan",
        jobTitle: "Founder & CEO",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Founder and CEO of i4iSciences, building education platforms that connect AI, teacher development, tutoring, and family support.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#nishi-patel",
        name: "Nishi Patel",
        jobTitle: "Chief Operating Officer",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Helps lead operations and execution for i4iSciences across international education initiatives.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#jerany-jackson",
        name: "Jerany Jackson",
        jobTitle: "Senior Advisor",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Provides strategic guidance to support i4iSciences' long-term growth and global educational impact.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#pankaj-jain",
        name: "Pankaj Jain",
        jobTitle: "Advisor",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Advises on AI Olympiad strategy and educational innovation for i4iSciences programs.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#sanjay-mishra",
        name: "Sanjay Mishra",
        jobTitle: "Chief Operating Officer",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Supports execution and operational delivery across i4iSciences' India-based initiatives.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#victoria-gens",
        name: "Victoria Gens",
        jobTitle: "Office Administrator",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Coordinates administrative systems and day-to-day operations that keep the organization running smoothly.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#savvy-vaishnav",
        name: "Savvy Vaishnav",
        jobTitle: "Senior Manager & Mathematics Teacher",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Supports mathematics education and learner engagement through teaching and team leadership.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#rockey-goyal",
        name: "Rockey Goyal",
        jobTitle: "Manager",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Coordinates team activity and operational support across i4iSciences projects.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#jaiprakash",
        name: "Jaiprakash",
        jobTitle: "Mathematics Teacher",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Teaches mathematics and helps students build confidence through clear, practical instruction.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#krisha-patel",
        name: "Krisha Patel",
        jobTitle: "STEM Teacher",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Delivers STEM instruction in Algebra and Biology with an inquiry-based teaching approach.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#isha",
        name: "Isha",
        jobTitle: "Biology Teacher",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Inspires curiosity in biology through engaging and hands-on educational experiences.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#sudha-chauhan",
        name: "Sudha Chauhan",
        jobTitle: "Social Outreach",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Builds community connections and outreach initiatives that expand access to education.",
      },
      {
        "@type": "Person",
        "@id": "https://www.i4isciences.com/#rishabh-birla",
        name: "Rishabh Birla",
        jobTitle: "CA & Financial Advisor",
        worksFor: {
          "@id": "https://www.i4isciences.com/#organization",
        },
        description:
          "Supports financial planning and advisory strategy to strengthen sustainable growth.",
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who leads i4iSciences?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "i4iSciences is led by founder and CEO Ranjit Chauhan, alongside a global team focused on operations, education, and impact.",
        },
      },
      {
        "@type": "Question",
        name: "What kinds of programs does i4iSciences create?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The company creates AI-powered education programs, certification pathways, tutoring experiences, and support systems for teachers, students, and families.",
        },
      },
    ],
  };

  const domains = [
    "https://www.i4isciences.com",
    "https://www.i4isciences.in",
    "https://www.i4isciences.ai",
    "https://www.i4isciences.us",
    "https://www.i4isciences.ca",
  ];
  const path = "/about";

  return (
    <>
      <title>{title}</title>
      {domains.map((d) => (
        <link key={d} rel="alternate" href={`${d}${path}`} hrefLang="en" />
      ))}
      <link rel="alternate" href="https://www.i4isciences.com/about" hrefLang="x-default" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content="https://www.i4isciences.com/images/og-about.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
      <script type="application/ld+json">{JSON.stringify(personLd)}</script>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
    </>
  );
}
