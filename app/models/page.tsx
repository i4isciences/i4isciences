import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Models",
  description:
    "Explore the i4iSciences family of programs, including IPST, LabTricks, OneCent Tutors, and Teach the Teacher.",
  alternates: {
    canonical: "https://www.i4isciences.com/models",
  },
  openGraph: {
    title: "Our Models | i4iSciences",
    description:
      "Explore the i4iSciences family of programs, including IPST, LabTricks, OneCent Tutors, and Teach the Teacher.",
    url: "https://www.i4isciences.com/models",
  },
};

export default function ModelsPage() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Models Overview
      </div>
    );
  }