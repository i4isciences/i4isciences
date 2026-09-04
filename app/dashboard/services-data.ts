export type DashboardService = {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  accentColor: string;
  accentLight: string;
  slug: string;
};

export const DASHBOARD_SERVICES: DashboardService[] = [
  {
    id: "TTT",
    name: "Teach the Teacher",
    tagline: "Your expertise is worth more than one classroom.",
    logo: "/images/tttlogo.png",
    accentColor: "#0a2e8a",
    accentLight: "rgba(10,46,138,0.10)",
    slug: "teach-the-teacher",
  },
  {
    id: "OCT",
    name: "OneCent Tutors",
    tagline: "24/7 live teaching for every subject, any grade.",
    logo: "/images/octlogo.jpg",
    accentColor: "#0891b2",
    accentLight: "rgba(8,145,178,0.10)",
    slug: "onecent-tutors",
  },
  {
    id: "IPST",
    name: "Immigrant Parent Support",
    tagline: "Your family moves together — educationally and emotionally.",
    logo: "/images/ipstlogo.jpg",
    accentColor: "#16a34a",
    accentLight: "rgba(22,163,74,0.10)",
    slug: "ipst",
  },
  {
    id: "AI",
    name: "AI Competition & Scholarships",
    tagline: "From Grade 4 curiosity to global-stage achievement.",
    logo: "/images/ailogo.png",
    accentColor: "#7c3aed",
    accentLight: "rgba(124,58,237,0.10)",
    slug: "ai-ecosystem",
  },
  {
    id: "LABTRICKS",
    name: "LabTricks",
    tagline: "Real laboratories, real equipment, real experiments.",
    logo: "/images/labtrickslogo.jpg",
    accentColor: "#F5A623",
    accentLight: "rgba(245,166,35,0.12)",
    slug: "labtrick",
  },
];
