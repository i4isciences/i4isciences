import type { Metadata } from "next";

const siteUrl = "https://www.i4isciences.com/about";
const pageTitle = "About Us";
const title = "About Us | i4iSciences";
const description = "Learn about our mission, leadership and global vision.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  keywords: [
    "i4iSciences about",
    "EdTech mission",
    "teacher training",
    "AI in education",
    "educational impact",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    images: [{ url: "https://www.i4isciences.com/images/og-about.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const orgId = "https://www.i4isciences.com/#organization";

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: title,
  description,
  url: siteUrl,
  mainEntity: { "@id": orgId },
  publisher: { "@id": orgId },
};

const personLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#ranjit-chauhan",
      name: "Ranjit Chauhan",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": orgId },
      description:
        "Founder and CEO of i4iSciences, building education platforms that connect AI, teacher development, tutoring, and family support.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#nishi-patel",
      name: "Nishi Patel",
      jobTitle: "Chief Operating Officer",
      worksFor: { "@id": orgId },
      description:
        "Helps lead operations and execution for i4iSciences across international education initiatives.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#jerany-jackson",
      name: "Jerany Jackson",
      jobTitle: "Senior Advisor",
      worksFor: { "@id": orgId },
      description:
        "Provides strategic guidance to support i4iSciences' long-term growth and global educational impact.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#pankaj-jain",
      name: "Pankaj Jain",
      jobTitle: "Advisor",
      worksFor: { "@id": orgId },
      description:
        "Advises on AI Olympiad strategy and educational innovation for i4iSciences programs.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#sanjay-mishra",
      name: "Sanjay Mishra",
      jobTitle: "Chief Operating Officer",
      worksFor: { "@id": orgId },
      description:
        "Supports execution and operational delivery across i4iSciences' India-based initiatives.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#victoria-gens",
      name: "Victoria Gens",
      jobTitle: "Office Administrator",
      worksFor: { "@id": orgId },
      description:
        "Coordinates administrative systems and day-to-day operations that keep the organization running smoothly.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#savvy-vaishnav",
      name: "Savvy Vaishnav",
      jobTitle: "Senior Manager & Mathematics Teacher",
      worksFor: { "@id": orgId },
      description:
        "Supports mathematics education and learner engagement through teaching and team leadership.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#rockey-goyal",
      name: "Rockey Goyal",
      jobTitle: "Manager",
      worksFor: { "@id": orgId },
      description:
        "Coordinates team activity and operational support across i4iSciences projects.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#jaiprakash",
      name: "Jaiprakash",
      jobTitle: "Mathematics Teacher",
      worksFor: { "@id": orgId },
      description:
        "Teaches mathematics and helps students build confidence through clear, practical instruction.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#krisha-patel",
      name: "Krisha Patel",
      jobTitle: "STEM Teacher",
      worksFor: { "@id": orgId },
      description:
        "Delivers STEM instruction in Algebra and Biology with an inquiry-based teaching approach.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#isha",
      name: "Isha",
      jobTitle: "Biology Teacher",
      worksFor: { "@id": orgId },
      description:
        "Inspires curiosity in biology through engaging and hands-on educational experiences.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#sudha-chauhan",
      name: "Sudha Chauhan",
      jobTitle: "Social Outreach",
      worksFor: { "@id": orgId },
      description:
        "Builds community connections and outreach initiatives that expand access to education.",
    },
    {
      "@type": "Person",
      "@id": "https://www.i4isciences.com/#rishabh-birla",
      name: "Rishabh Birla",
      jobTitle: "CA & Financial Advisor",
      worksFor: { "@id": orgId },
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
    </>
  );
}
