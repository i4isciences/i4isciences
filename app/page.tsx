import type { Metadata } from "next";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/home/Hero";
import Ecosystems from "@/components/home/Ecosystems";
import PlatformOverview from "@/components/home/PlatformOverview";
import RoleBasedExperience from '@/components/home/RoleExperience';
import AIfeatures from "@/components/home/AIFeatures";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/Testimonials";
import EnterprisePartnershipSection from "@/components/home/Partnerships";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "i4iSciences | AI Education, Teacher Training & Learning Platforms",
  description:
    "i4iSciences delivers AI-powered education, teacher training, tutoring, parent support, and science learning experiences for learners, teachers, and families worldwide.",
  alternates: {
    canonical: "https://www.i4isciences.com/",
  },
  keywords: [
    "i4iSciences",
    "AI education",
    "teacher training",
    "AI tutoring",
    "online learning",
    "STEM education",
    "immigrant education",
    "education technology",
  ],
  openGraph: {
    title: "i4iSciences | AI Education, Teacher Training & Learning Platforms",
    description:
      "Discover AI-powered learning, certification, tutoring, and support programs that make quality education more accessible and practical.",
    url: "https://www.i4isciences.com/",
    siteName: "i4iSciences",
    type: "website",
    images: [
      {
        url: "https://www.i4isciences.com/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "i4iSciences AI education and teacher training platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "i4iSciences | AI Education, Teacher Training & Learning Platforms",
    description:
      "Discover AI-powered learning, certification, tutoring, and support programs that make quality education more accessible and practical.",
    images: ["https://www.i4isciences.com/images/og-default.svg"],
  },
};

export default function HomePage() {
  const homeOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "i4iSciences",
    url: "https://www.i4isciences.com",
    description:
      "i4iSciences provides AI-powered education, teacher training, tutoring, family support, and science learning experiences for learners and educators worldwide.",
    sameAs: ["https://www.linkedin.com/company/i4isciences"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Education programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "Teach the Teacher",
            url: "https://www.i4isciences.com/models/teach-the-teacher",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "OneCent Tutors",
            url: "https://www.i4isciences.com/models/onecent-tutors",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "AI Ecosystem",
            url: "https://www.i4isciences.com/ai-ecosystem",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does i4iSciences offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "i4iSciences offers AI-powered education platforms, teacher training, tutoring, parental support, and science learning experiences that help learners and educators thrive.",
        },
      },
      {
        "@type": "Question",
        name: "Who can benefit from i4iSciences programs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students, teachers, parents, schools, and institutions can all benefit from i4iSciences programs and support resources.",
        },
      },
      {
        "@type": "Question",
        name: "Is i4iSciences available globally?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. i4iSciences supports learners and educators across multiple countries through online programs and multilingual support.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <Ecosystems />
        <PlatformOverview />
        <RoleBasedExperience />
        <AIfeatures />
        <HowItWorks />
        <TestimonialsSection />
        <EnterprisePartnershipSection />
        <FinalCTA />
      </main>
    </>
  );
}