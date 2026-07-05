"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { ArrowDown, Users, BookOpen, Globe2, Sparkles, 
  Award, 
  Heart, 
  Activity, AlertTriangle, TrendingUp, Globe,
  ArrowRight, Lightbulb, ArrowUpRight, Quote } from "lucide-react"

import { useRef } from "react";



const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Thin rule with label ── */
function SectionRule({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <span
        className="text-[10px] font-bold tracking-[0.22em] uppercase"
        style={{ color: "rgba(15,45,122,0.45)" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(15,45,122,0.12)" }} />
    </div>
  );
}

/* ── Sketch underline for one word ── */
function SketchLine({ color = "#F4A623" }) {
  return (
    <svg
      viewBox="0 0 120 8"
      fill="none"
      className="absolute -bottom-0.5 left-0 w-full overflow-visible pointer-events-none"
      style={{ height: 8 }}
    >
      <motion.path
        d="M2 5 C 28 2, 60 6, 90 4 C 105 3, 116 5, 119 5"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.5, ease: "easeInOut" }}
      />
    </svg>
  );
}
  
  /* ─── AMBIENT SVG DOODLES (background decoration) ─ */
  function BgDoodles() {
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-left loose loop */}
        <ellipse cx="60" cy="80" rx="44" ry="36" fill="none" stroke="#F4A623" strokeWidth="1.8" strokeDasharray="6 5" opacity="0.3" />
        {/* Top-right asterisk */}
        {[0, 45, 90, 135].map((deg, i) => (
          <line
            key={i}
            x1={`calc(100% - 88px)`} y1="64"
            x2={`calc(100% - 88px)`} y2="38"
            stroke="#0F2D7A" strokeWidth="1.6" strokeLinecap="round" opacity="0.18"
            transform={`rotate(${deg}, calc(100% - 88px), 51)`}
            style={{ transformBox: "content-box" }}
          />
        ))}
        {/* Wavy line bottom left */}
        <path d="M 0 92% Q 60 88%, 120 92% Q 180 96%, 240 92%" stroke="#F4A623" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.25" />
        {/* Dotted arc top center */}
        <path d="M 35% 0 Q 50% 48px, 65% 0" stroke="#0F2D7A" strokeWidth="1.5" fill="none" strokeDasharray="3 5" opacity="0.15" />
        {/* Small cross bottom right */}
        <line x1="calc(100% - 52px)" y1="calc(100% - 52px)" x2="calc(100% - 36px)" y2="calc(100% - 36px)" stroke="#F4A623" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        <line x1="calc(100% - 36px)" y1="calc(100% - 52px)" x2="calc(100% - 52px)" y2="calc(100% - 36px)" stroke="#F4A623" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      </svg>
    );
  }
  
  /* ─── HAND-DRAWN UNDERLINE ──────────────────────── */
  function SketchUnderline({ color = "#F4A623", delay = 0.6 }) {
    return (
      <motion.svg
        viewBox="0 0 260 12"
        fill="none"
        className="absolute -bottom-1 left-0 w-full overflow-visible"
        style={{ height: "0.35em", minHeight: 10 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.path
          d="M4 8 C 50 3, 120 10, 180 6 C 220 3, 248 8, 258 7"
          stroke={color} strokeWidth="3.5" strokeLinecap="round"
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M10 10 C 60 7, 130 11, 185 9 C 222 7, 250 10, 257 9"
          stroke={color} strokeWidth="2" strokeLinecap="round" opacity={0.35}
          variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 0.35 } }}
          transition={{ duration: 0.7, delay: delay + 0.1, ease: "easeInOut" }}
        />
      </motion.svg>
    );
  }

type ProblemItem = {
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  headline: string;
  body: string;
  accent: string;
  iconColor: string;
  border: string;
};
  /* ─── PROBLEM CARD ──────────────────────────────── */
  function ProblemCard({
    item,
    index,
  }: {
    item: ProblemItem;
    index: number;
  }) {
    const Icon = item.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
        whileHover={{ y: -5 }}
        className="group relative rounded-[22px] p-6 transition-all duration-300"
        style={{
          background: item.accent,
          border: `1.5px solid ${item.border}`,
        }}
      >
        {/* Stat pill — top right */}
        <div
          className="absolute top-5 right-5 rounded-full px-3 py-1 text-[10px] font-bold tracking-wide"
          style={{ background: "rgba(255,255,255,0.85)", color: item.iconColor, border: `1px solid ${item.border}` }}
        >
          {item.stat}
        </div>
  
        {/* Icon */}
        <div
          className="h-10 w-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
          style={{ background: "rgba(255,255,255,0.75)", border: `1px solid ${item.border}` }}
        >
          <Icon size={18} style={{ color: item.iconColor }} />
        </div>
  
        {/* Headline */}
        <h3
          className="font-black tracking-tight mb-1.5 leading-tight"
          style={{ fontSize: "clamp(1rem, 1.3vw, 1.05rem)", color: "#0F2D7A" }}
        >
          {item.headline}
        </h3>
  
        {/* Stat label */}
        <p
          className="font-semibold mb-2.5"
          style={{ fontSize: "clamp(0.82rem, 0.85vw, 0.72rem)", color: item.iconColor, opacity: 0.85 }}
        >
          {item.statLabel}
        </p>
  
        {/* Body */}
        <p
          className="font-medium leading-relaxed"
          style={{ fontSize: "clamp(0.90rem, 0.95vw, 0.78rem)", color: "rgba(15,45,122,0.68)" }}
        >
          {item.body}
        </p>
  
        {/* Bottom sketch line decoration */}
        <svg className="absolute bottom-4 right-4 opacity-20" width="32" height="8" viewBox="0 0 32 8" fill="none">
          <path d="M1 4 Q8 1, 16 4 Q24 7, 31 4" stroke={item.iconColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    );
  }

  function PartnerCard({
    logo,
  }: {
    logo: string;
  }) {
    return (
      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
        h-24
        bg-white/80
        backdrop-blur-sm
        rounded-2xl
        border
        border-[#0A2E8A]/6
        shadow-[0_4px_20px_rgba(15,25,34,0.04)]
        flex
        items-center
        justify-center
        "
      >
        <Image
          src={logo}
          alt=""
          width={90}
          height={32}
          className="
          opacity-60
          grayscale
          transition-all
          duration-500
          hover:opacity-100
          hover:grayscale-0
          "
        />
      </motion.div>
    );
  }
export default function AboutHero() {
  const COUNTRIES = [
    {
      flag: "🇺🇸",
      name: "United States",
      short: "USA",
      detail: "Serving immigrant families, K–12 districts, and university programs across 48 states.",
      color: "#0a2e8a",
    },
    {
      flag: "🇨🇦",
      name: "Canada",
      short: "CANADA",
      detail: "Supporting newcomer integration programs, bilingual education, and provincial school boards.",
      color: "#c8102e",
    },
    {
      flag: "🇮🇳",
      name: "India",
      short: "INDIA",
      detail: "Powering teacher certification, competitive exam prep, and rural EdTech infrastructure.",
      color: "#f5a623",
    },
    {
      flag: "🇿🇦",
      name: "South Africa",
      short: "S. AFRICA",
      detail: "Bridging educational gaps across provinces with multilingual AI tutoring and teacher training.",
      color: "#007a4d",
    },
  ];
  
  const STATS = [
    { value: "4", suffix: " Countries", label: "Active Markets" },
    { value: "10M", suffix: "+", label: "Scalable Users" },
    { value: "120", suffix: "+", label: "Languages Supported" },
    { value: "500K", suffix: "+", label: "Concurrent Learners" },
  ];
  
 
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-60px" });
  const PROBLEMS = [
    {
      icon: AlertTriangle,
      stat: "300M+",
      statLabel: "children out of school globally",
      headline: "Access is broken",
      body: "Millions of students never reach a qualified teacher. Geography, cost, and language put quality education out of reach for the families who need it most.",
      accent: "#E8F0FF",
      iconColor: "#0F2D7A",
      border: "rgba(15,45,122,0.12)",
    },
    {
      icon: TrendingUp,
      stat: "60%",
      statLabel: "of teachers feel under-supported",
      headline: "Teachers are stretched thin",
      body: "Great educators exist everywhere — but without training, tools, or recognition, they burn out. The system consumes talent instead of multiplying it.",
      accent: "#FFF5E0",
      iconColor: "#C07C00",
      border: "rgba(192,124,0,0.15)",
    },
    {
      icon: Globe,
      stat: "50M+",
      statLabel: "immigrant families navigating new systems",
      headline: "Families get left behind",
      body: "Immigrant parents want to support their children's education — but language barriers and unfamiliar systems make that nearly impossible without a guide.",
      accent: "#E6F7F1",
      iconColor: "#0A6B47",
      border: "rgba(10,107,71,0.12)",
    },
    {
      icon: Users,
      stat: "1 in 3",
      statLabel: "students struggle silently without tutoring",
      headline: "1-on-1 support is a luxury",
      body: "Private tutoring changes outcomes dramatically — yet it remains reserved for those who can afford it. Personalised help shouldn't be a privilege.",
      accent: "#FBF0FF",
      iconColor: "#6B21A8",
      border: "rgba(107,33,168,0.12)",
    },
  ];
  
  const BELIEFS = [
    { text: "Every child deserves a teacher who believes in them.", icon: "✦" },
    { text: "Education is the only investment with infinite returns.", icon: "✦" },
    { text: "Technology should widen access, not deepen divides.", icon: "✦" },
  ];
  
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: EASE },
});

const TEAM = [
  {
    name: "Nishi Patel",
    role: "Chief Operating Officer · Canada",
    line: "Builds the operational backbone that turns ambitious educational ideas into consistent global execution.",
    initials: "NP",
    hue: "#DCEBFF",
    textColor: "#0F2D7A",
  },
  {
    name: "Jerany Jackson",
    role: "Senior Advisor · USA",
    line: "Brings strategic guidance and global perspective to help shape long-term educational impact.",
    initials: "JJ",
    hue: "#FFF4D8",
    textColor: "#8A5A00",
  },
 
  {
    name: "Pankaj Jain",
    role: "Advisor · AI Olympiad",
    line: "AI researcher and educator with expertise in machine learning and intelligent systems, guiding the AI Olympiad initiative.",
    initials: "PJ",
    hue: "#F3E8FF",
    textColor: "#6B21A8",
  },
  {
    name: "Sanjay Mishra",
    role: "Chief Operating Officer · India",
    line: "Leads execution across India, ensuring every initiative reaches learners efficiently.",
    initials: "SM",
    hue: "#FDECEC",
    textColor: "#991B1B",
  },

  {
    name: "Victoria Gens",
    role: "Office Administrator",
    line: "Keeps people, processes, and daily operations running with care, precision, and calm.",
    initials: "VG",
    hue: "#E6F7F1",
    textColor: "#065F46",
  },

  {
    name: "Savvy Vaishnav",
    role: "Senior Manager & Mathematics Teacher",
    line: "Passionate about making mathematics engaging, practical, and accessible for every learner.",
    initials: "SV",
    hue: "#EEF5FF",
    textColor: "#1E3A8A",
  },

  {
    name: "Rockey Goyal",
    role: "Manager",
    line: "Coordinates teams and operations with a focus on collaboration, efficiency, and growth.",
    initials: "RG",
    hue: "#F3F4F6",
    textColor: "#374151",
  },

  {
    name: "Jaiprakash",
    role: "Mathematics Teacher",
    line: "Believes every mathematical concept becomes easier when students experience it with confidence.",
    initials: "JP",
    hue: "#F0FDF4",
    textColor: "#166534",
  },
  {
    name: "Krisha Patel",
    role: "STEM Teacher (Algebra & Biology) · USA",
    line: "Empowers students in STEM subjects, including Algebra and Biology, with practical, inquiry-based teaching that builds confidence and curiosity.",
    initials: "KP",
    hue: "#ECFDF5",
    textColor: "#047857",
  },
  {
    name: "Sudha Chauhan",
    role: "Social Outreach",
    line: "Builds meaningful connections with communities to make education more inclusive and accessible.",
    initials: "SC",
    hue: "#FFF7ED",
    textColor: "#C2410C",
  },

];
const partners = [
  "/logos/google.svg",
  "/logos/unacademy.svg",
  "/logos/redhat.svg",
  "/logos/pearson.svg",
  "/logos/coursera.svg",
  "/logos/zoom.svg",
  "/logos/khanacademy.svg",
  "/logos/academia.svg",
  "/logos/microsoft.svg",
];
const row1 = [
  "/logos/google.svg",
  "/logos/khanacademy.svg",
  "/logos/unacademy.svg",
];

const row2 = [
  "/logos/redhat.svg",
  "/logos/zoom.svg",
  "/logos/academia.svg",
];

const row3 = [
  "/logos/pearson.svg",
  "/logos/coursera.svg",
  "/logos/microsoft.svg",
  
];


  const globalRef = useRef(null);

const globalInView = useInView(globalRef, {
  once: true,
  margin: "-100px",
});

  return (
    <>
    <section className="relative min-h-[90vh] pt-28 w-full flex items-center justify-center overflow-hidden bg-[#0F1922] selection:bg-amber-400 selection:text-slate-900">
      
      {/* HERO IMAGE BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/about-hero.png"
          alt="Children learning outdoors backdrop"
          className="w-full h-full object-cover object-bottom opacity-55"
        />
        
      </div>

      {/* GEOMETRIC BLUEPRINT MESH (Same line weight style as the footer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1 opacity-[0.15]">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#475569" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* CORE CONTENT BLOCK */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center pt-20 pb-12 md:px-12">
        
       

        {/* HEADLINE WITH GEIST + CURVY SERIF + SKETCHY UNDERLINE */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto max-w-4xl text-4xl font-[700] tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.15] font-sans"
        >
          One Ecosystem. 
{" "}
       
          <span className="relative inline-block text-white font-serif italic font-normal px-2">
          Five Ways to Grow
            {/* Sketchy uneven yellow underline SVG */}
            <svg
              viewBox="0 0 300 24"
              className="absolute -bottom-3 left-0 w-full h-6 text-amber-400 opacity-90 fill-none stroke-current"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4,14 C45,6 125,18 294,8 C210,12 90,22 12,16"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* EDITORIAL DESCRIPTION (Clean layout, avoids the machine-written sound) */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl text-lg md:text-lg leading-relaxed text-slate-300 font-medium"
        >
          One platform. Five ways to grow. i4i Sciences is a complete online education ecosystem connecting teachers, students, and families across the globe. Become a certified online educator and earn from home with Teach the Teacher. Get affordable, 24/7 tutoring from real human tutors in every subject with OneCent Tutors. Help immigrant and newcomer students thrive with IPST. Win AI scholarships, certificates, and internships at the AI Olympiad. And bring real science experiments to life with LabTricks. Learning, earning, and belonging, all in one trusted place.
        </motion.p>


        {/* INTERACTIVE SCROLL PROMPT */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mt-16 flex flex-col items-center justify-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' })}
        >
          <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
            Meet the team
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </motion.div>

      </div>
    </section>
    <section className="relative w-full overflow-hidden bg-[#F9F8F3] py-24 text-[#10204E] font-sans selection:bg-amber-400 selection:text-slate-900">
      
    {/* WATERCOLOR / PAPERCUT STYLE HEADER ACCENT (Top Left) */}
    <div className="absolute left-0 top-0 pointer-events-none opacity-40 z-0 select-none">
      <svg width="350" height="250" viewBox="0 0 350 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-50,0 C80,-20 180,60 120,160 C70,240 200,220 300,180 C350,160 380,80 350,0 Z" fill="url(#blue-watercolor)" opacity="0.4"/>
        <defs>
          <linearGradient id="blue-watercolor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-0">
        
        {/* LEFT COLUMN: THE INTENTIONAL HEADLINE & CONTENT MAP */}
        <div className="lg:col-span-5 space-y-8 z-20">
          
          {/* BRAND ACCENT BADGE */}
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-1.5 shadow-sm">
            <span className="text-xs font-bold tracking-[0.18em] text-[#0A2E8A] uppercase">
              Our Vision
            </span>
          </div>

          {/* TYPOGRAPHY BLOCKS WITH DECORATIVE ACCENTS */}
          <div className="relative space-y-4">
            {/* Subtle Hand-Drawn Sparkle Accent lines above headline */}
            <div className="absolute -top-6 left-[40%] text-amber-500 opacity-90 select-none">
              <svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M4,16 L8,6 M12,18 L14,2 M18,17 L22,9" />
              </svg>
            </div>

            <h2 className="text-4xl font-[800] tracking-tight text-[#10204e] sm:text-5xl md:text-5xl leading-[1.15]">
              A world where <br />
              <span className="text-[#10204e]">every learner rises</span>, <br />
              and every teacher <br />
              <span className="relative inline-block text-[#F5A623]">
                inspires
                {/* Subtle hand-drawn final dot element */}
                <span className="absolute -right-3 bottom-2 h-2 w-2 rounded-full bg-[#0F2942]" />
              </span>
            </h2>
            
            {/* Minimal structural separator line */}
            <div className="pt-2">
              <div className="h-[2px] w-24 bg-blue-500/40 rounded" />
            </div>
          </div>

          {/* PLATFORM PARAGRAPH BLOCKS */}
          <p className="max-w-lg text-base font-medium leading-relaxed text-[#4B5E92]">
          Whether you want to teach, learn, or lead, i4i Sciences has a path built for you. Earn globally as a certified educator, book budget-friendly tutoring in all subjects and grades, or guide your child through a new school system in your own language. Spark your kid's future with AI competitions, coding scholarships, and real internships, or get them hands-on with practical science labs and exam prep near you. Five powerful education models, one platform, endless opportunities to succeed. Email or call us today and find your path.
          </p>

          {/* THREE COLUMN ASYMMETRIC METRICS MATRIX */}
          <div className="grid grid-cols-1 gap-6 pt-6 sm:grid-cols-3 sm:gap-4">
            
            {/* METRIC 1 */}
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 shadow-sm border border-blue-50/50">
                <Users size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F2942]">Empowered People</h4>
                <p className="mt-1 text-xs font-medium text-[#6073A2] leading-relaxed">
                  Every learner discovers their potential.
                </p>
              </div>
            </div>

            {/* METRIC 2 */}
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm border border-amber-50/50">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F2942]">Inspired Educators</h4>
                <p className="mt-1 text-xs font-medium text-[#6073A2] leading-relaxed">
                  Every teacher feels valued and supported.
                </p>
              </div>
            </div>

            {/* METRIC 3 */}
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-50/50">
                <Globe2 size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F2942]">Stronger Communities</h4>
                <p className="mt-1 text-xs font-medium text-[#6073A2] leading-relaxed">
                  Together, we build a better tomorrow.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: THE COMPREHENSIVE ILLUSTRATIVE ARTWORK */}
        {/* Using custom negative margins to extend full height, mirroring about-1.jpg */}
        {/* RIGHT COLUMN */}
<div className="lg:col-span-7 relative min-h-[780px] w-full">

  {/* IMAGE */}
  <img
    src="/images/about-1.png"
    alt="Teacher with children"
    className="
      absolute
      top-0
      right-0
      w-full
      h-full
      object-cover
      object-right
      pointer-events-none
      select-none
    "
  />

  {/* LEFT FADE BLEND */}
  <div className="absolute inset-y-0 left-0 w-[220px] bg-gradient-to-r from-[#F9F8F3] via-[#F9F8F3]/85 to-transparent z-10" />

  {/* BOTTOM BLEND */}
  <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F9F8F3] to-transparent z-10" />

</div>

      </div>
    </div>

    {/* FOOTER-LEVEL COMPACT HAND-DRAWN CONNECTOR PATH (Bottom Left) */}
    <div className="absolute bottom-4 left-6 pointer-events-none opacity-30 select-none z-0 hidden md:block">
      <svg width="500" height="120" viewBox="0 0 500 120" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 8" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,80 C120,110 210,40 280,90 C330,120 370,60 490,95" strokeLinecap="round"/>
        <circle cx="280" cy="90" r="4" fill="#3B82F6" />
      </svg>
    </div>

  </section>
    <section
      className="relative w-full overflow-hidden select-none antialiased font-sans text-[#0F2D7A]"
      style={{
        background: "#FAF8F4",
        paddingTop: "clamp(72px, 9vw, 110px)",
        paddingBottom: "clamp(72px, 9vw, 110px)",
        paddingLeft: "clamp(24px, 5vw, 80px)",
        paddingRight: "clamp(24px, 5vw, 80px)",
      }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(15,45,122,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient doodles */}
      <BgDoodles />

      {/* Soft color washes */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,166,35,0.08), transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,45,122,0.06), transparent 70%)" }} />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1280 }}>

        {/* ── HEADER ── */}
        <div ref={headingRef} className="text-center mb-16">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 mb-6"
            style={{ background: "#E8F0FF", borderColor: "rgba(15,45,122,0.18)" }}
          >
            <Lightbulb size={11} className="text-[#0F2D7A]" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#0F2D7A] uppercase">
              Why We Built This
            </span>
          </motion.div>

          {/* Main heading with sketch underline behind/under keyword */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[900] tracking-tight text-[#0F2D7A] mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
            }}
          >
            The world has a{" "}
            <span className="relative inline-block text-[#F4A623]">
              learning crisis.
              <SketchUnderline color="#F4A623" delay={0.7} />
            </span>
            <br />
            <span style={{ fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400, color: "#0F2D7A" }}>
              We built i4iSciences to solve it.
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="mx-auto font-medium leading-relaxed"
            style={{
              maxWidth: 580,
              fontSize: "clamp(1.1rem, 1.2vw, 1.2rem)",
              color: "rgba(15,45,122,0.72)",
              lineHeight: 1.75,
            }}
          >
            Four systemic problems. One integrated platform. Here&apos;s exactly what we saw,
            and why we couldn&apos;t look away.
          </motion.p>

          {/* Decorative hand-drawn arrow pointing down to cards */}
          <motion.svg
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            width="32" height="40" viewBox="0 0 32 40" fill="none"
            className="mx-auto mt-6"
          >
            <motion.path
              d="M16 2 Q 18 18, 16 32"
              stroke="#F4A623" strokeWidth="2.5" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.0 }}
            />
            <motion.path
              d="M8 26 L16 36 L24 26"
              stroke="#F4A623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.35, delay: 1.5 }}
            />
          </motion.svg>
        </div>

        {/* ── 2×2 PROBLEM CARDS ── */}
        <div
          className="grid gap-5 mb-16"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {PROBLEMS.map((item, i) => (
            <ProblemCard key={item.headline} item={item} index={i} />
          ))}
        </div>

        {/* ── ANSWER STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="rounded-[28px] relative overflow-hidden"
          style={{
            background: "#0F2D7A",
            padding: "clamp(32px, 4vw, 48px) clamp(28px, 4vw, 52px)",
          }}
        >
          {/* Doodle stars on dark bg */}
          {[[92, 38], [96, 62], ["calc(100% - 52px)", 44]].map(([x, y], i) => (
            <svg key={i} className="absolute pointer-events-none" style={{ left: typeof x === "string" ? x : x, top: y, width: 16, height: 16 }} viewBox="0 0 16 16">
              <path d="M8 1 L9.2 6.2 L14.5 8 L9.2 9.8 L8 15 L6.8 9.8 L1.5 8 L6.8 6.2Z" fill="#F4A623" opacity={[0.4, 0.2, 0.35][i]} />
            </svg>
          ))}
          {/* Doodle circle top right */}
          <svg className="absolute top-4 right-16 pointer-events-none" width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="26" fill="none" stroke="#F4A623" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.2" />
          </svg>
          {/* Wavy line top */}
          <svg className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none" width="200" height="12" viewBox="0 0 200 12">
            <path d="M0 6 Q 25 2, 50 6 Q 75 10, 100 6 Q 125 2, 150 6 Q 175 10, 200 6" stroke="#F4A623" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.15" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">

            {/* Left: answer heading */}
            <div className="flex-1">
              <p
                className="font-black tracking-tight text-white mb-3"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)", lineHeight: 1.12, letterSpacing: "-0.8px" }}
              >
                So we built the{" "}
                <span style={{ color: "#F4A623", fontStyle: "italic", fontFamily: "Georgia, serif", fontWeight: 400 }}>
                  whole ecosystem.
                </span>
              </p>
              <p
                className="font-medium leading-relaxed"
                style={{ fontSize: "clamp(0.78rem, 1.05vw, 0.9rem)", color: "rgba(255,255,255,0.68)", maxWidth: 420 }}
              >
               Not a single app. A complete education ecosystem — empowering educators, connecting tutors, supporting immigrant families, advancing AI education, and bringing practical science learning to life through LabTricks.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block self-stretch w-px" style={{ background: "rgba(255,255,255,0.12)" }} />

            {/* Right: beliefs list */}
            <div className="flex-1 space-y-4">
              {BELIEFS.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span style={{ color: "#F4A623", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✦</span>
                  <p
                    className="font-medium leading-snug text-white/80"
                    style={{ fontSize: "clamp(0.74rem, 1vw, 0.85rem)" }}
                  >
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mt-12 flex-wrap"
        >
          <a
            href="#platform"
            className="inline-flex items-center gap-2 rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#0F2D7A",
              color: "white",
              fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
              padding: "0.72rem 1.8rem",
              boxShadow: "0 4px 20px rgba(15,45,122,0.25)",
            }}
          >
            See how we solve it
            <ArrowRight size={14} />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full font-bold border transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.75)",
              color: "#0F2D7A",
              fontSize: "clamp(0.78rem, 1vw, 0.88rem)",
              padding: "0.72rem 1.8rem",
              borderColor: "rgba(15,45,122,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            Our full story
          </a>
        </motion.div>

      </div>
    </section>
    <section
  className="relative w-full overflow-hidden select-none antialiased font-sans text-[#0F2D7A]"
  style={{ aspectRatio: "3 / 2", minHeight: "100svh" }}
>
  {/* ── BACKGROUND IMAGE — object-fit:fill preserves exact 3:2, zero crop, zero zoom ── */}
  <img
    src="/images/about-2.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ objectFit: "fill" }}
  />

  {/* Subtle right-side veil — only over the cream area, left artwork fully untouched */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        "linear-gradient(to left, rgba(250,248,244,0.55) 0%, rgba(250,248,244,0.22) 32%, transparent 52%)",
    }}
  />

  {/* ── CONTENT — right side only, over the clean cream area ── */}
  <div
    className="relative z-10 h-full flex flex-col justify-center pr-10 pl-4 sm:pr-14 xl:pr-20 ml-auto"
    style={{ maxWidth: "46%" }}
  >
    {/* EYEBROW LABEL */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#DCEBFF] border border-[#B9D7FF] px-3 py-1 mb-4"
    >
      <Sparkles size={10} className="text-[#0F2D7A]" />
      <span className="text-[9px] font-bold tracking-[0.22em] text-[#0F2D7A] uppercase">
        Our Mission
      </span>
    </motion.div>

    {/* MAIN HEADING */}
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.08 }}
      className="font-[900] leading-[1.03] tracking-[-1.5px] text-[#0F2D7A] mb-3"
      style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}
    >
      Giving Every Learner
      <br />
      the{" "}
      <span className="relative inline-block text-[#F4A623]">
        Wings
        <svg
          className="absolute -bottom-1 left-0 w-full fill-none stroke-[#F4A623]/60"
          style={{ height: "0.45em" }}
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <path d="M3,7 Q50,1 97,6 T50,4" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>{" "}
      to{" "}
      <span className="text-[#F4A623] italic font-serif font-normal tracking-tight">
        Rise.
      </span>
    </motion.h2>

    {/* SUPPORTING PARAGRAPH */}
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.16 }}
      className="font-medium leading-[1.65] text-[#0F2D7A]/75 mb-6"
      style={{ fontSize: "clamp(1rem, 1.1vw, 1.2rem)" }}
    >
      We believe education should feel personal, hopeful, accessible,
      and deeply empowering—for students, teachers, parents, and
      communities across the world.
    </motion.p>

    {/* 2×2 PILLAR CARDS */}
    <div className="grid grid-cols-2 gap-2.5">

      {/* ACCESS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.22 }}
        whileHover={{ y: -4 }}
        className="bg-white/72 border border-white/65 backdrop-blur-md rounded-2xl p-3.5 space-y-2 group transition-colors hover:bg-white/90"
      >
        <div className="h-8 w-8 rounded-xl flex items-center justify-center border bg-blue-50 text-blue-600 border-blue-100 group-hover:scale-105 transition-transform">
          <Globe2 size={16} />
        </div>
        <h3 className="font-black tracking-tight text-[#0F2D7A] leading-none" style={{ fontSize: "clamp(0.7rem, 1vw, 0.88rem)" }}>
          Access
        </h3>
        <p className="font-medium leading-snug text-[#0F2D7A]/65" style={{ fontSize: "clamp(0.8rem, 0.85vw, 0.75rem)" }}>
          Premium education pathways available to every learner, everywhere.
        </p>
      </motion.div>

      {/* EMPOWERMENT */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.29 }}
        whileHover={{ y: -4 }}
        className="bg-white/72 border border-white/65 backdrop-blur-md rounded-2xl p-3.5 space-y-2 group transition-colors hover:bg-white/90"
      >
        <div className="h-8 w-8 rounded-xl flex items-center justify-center border bg-amber-50 text-amber-600 border-amber-100 group-hover:scale-105 transition-transform">
          <Award size={16} />
        </div>
        <h3 className="font-black tracking-tight text-[#0F2D7A] leading-none" style={{ fontSize: "clamp(0.7rem, 1vw, 0.88rem)" }}>
          Empowerment
        </h3>
        <p className="font-medium leading-snug text-[#0F2D7A]/65" style={{ fontSize: "clamp(0.8rem, 0.85vw, 0.75rem)" }}>
          Students and educators growing together with confidence and mentorship.
        </p>
      </motion.div>

      {/* COMMUNITY */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.36 }}
        whileHover={{ y: -4 }}
        className="bg-white/72 border border-white/65 backdrop-blur-md rounded-2xl p-3.5 space-y-2 group transition-colors hover:bg-white/90"
      >
        <div className="h-8 w-8 rounded-xl flex items-center justify-center border bg-rose-50 text-rose-600 border-rose-100 group-hover:scale-105 transition-transform">
          <Heart size={16} className="fill-rose-500/10" />
        </div>
        <h3 className="font-black tracking-tight text-[#0F2D7A] leading-none" style={{ fontSize: "clamp(0.7rem, 1vw, 0.88rem)" }}>
          Community
        </h3>
        <p className="font-medium leading-snug text-[#0F2D7A]/65" style={{ fontSize: "clamp(0.8rem, 0.85vw, 0.75rem)" }}>
          Uniting families, schools, and tutoring networks in shared support.
        </p>
      </motion.div>

      {/* INNOVATION */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.43 }}
        whileHover={{ y: -4 }}
        className="bg-white/72 border border-white/65 backdrop-blur-md rounded-2xl p-3.5 space-y-2 group transition-colors hover:bg-white/90"
      >
        <div className="h-8 w-8 rounded-xl flex items-center justify-center border bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:scale-105 transition-transform">
          <Activity size={16} />
        </div>
        <h3 className="font-black tracking-tight text-[#0F2D7A] leading-none" style={{ fontSize: "clamp(0.7rem, 1vw, 0.88rem)" }}>
          Innovation
        </h3>
        <p className="font-medium leading-snug text-[#0F2D7A]/65" style={{ fontSize: "clamp(0.8rem, 0.85vw, 0.75rem)" }}>
          Responsible AI personalising learning without replacing its human core.
        </p>
      </motion.div>

    </div>
  </div>
</section>


    <section
      className="relative w-full font-sans antialiased text-[#0F2D7A] select-none"
      style={{
        background: "#FAF8F4",
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "clamp(24px, 6vw, 96px)",
        paddingRight: "clamp(24px, 6vw, 96px)",
      }}
    >
      {/* Very faint paper dots — same as other sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,45,122,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1160 }}>

        {/* ════════════════════════════════════════
            FOUNDER STORY
        ════════════════════════════════════════ */}
        <SectionRule label="Founder" />

        {/*
          Two-column: left = all text, right = photo.
          On mobile they stack, photo second.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-center">

          {/* ── LEFT: story text ── */}
          <div>

            {/* Name + title line */}
            

            {/* Main headline */}
            <motion.h2
              {...fadeUp(0.08)}
              className="font-[900] tracking-tight mb-8"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                lineHeight: 1.06,
                letterSpacing: "-1.5px",
                color: "#0F2D7A",
              }}
            >
              He didn&apos;t set out to build   {" "}
              <span className="relative inline-block">
                a platform.
                <SketchLine color="#F4A623" />
              </span>
              <br />
              <span
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "rgba(15,45,122,0.75)",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                }}
              >
                He set out to fix a feeling.
              </span>
            </motion.h2>

            {/* Pull quote */}
            <motion.blockquote
              {...fadeUp(0.16)}
              className="mb-8 pl-5"
              style={{ borderLeft: "3px solid #F4A623" }}
            >
              <Quote
                size={18}
                className="mb-2"
                style={{ color: "rgba(244,166,35,0.6)" }}
              />
              <p
                className="font-medium leading-relaxed"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  color: "rgba(15,45,122,0.82)",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                &quot;I watched brilliant students lose confidence, not because they weren&apos;t capable, but because nobody ever showed up for them at the right moment. I couldn&apos;t un-see that.&quot;
              </p>
            </motion.blockquote>

            {/* Story paragraphs */}
            {[
              "Ranjit has spent his life in the world of science. A biomedical scientist with a foundation in computer science, an expert in molecular genetic virology, and the author of more than 25 international publications, he built his career on a single belief: that the right knowledge, placed in the right hands, can change everything.              ",
              "That belief carried him across continents. He studied, researched, and worked in many countries, moving between laboratories, universities, and the real communities around them. And everywhere he went, he saw the same thing. Education worked beautifully for some and failed quietly for many others. Families who had recently immigrated. Students in under-resourced classrooms. Teachers doing their best with no support behind them. The gap was always the same: the distance between what education could be and what it actually was.",
              "Years spent inside labs, classrooms, edtech companies, and community programs taught him something most founders miss. The problem was never content. The internet overflows with content. The real problem is connection. The right teacher, the right support, at the right moment, in a language and context that actually makes sense to the learner.",
              "He had spent his career turning complex problems into working systems, so he approached this one the same way a scientist approaches anything. He asked a better question. What if we built the entire ecosystem, instead of just one piece of it? Not another app. A platform that certifies teachers, connects tutors with students, stands beside immigrant families, and gives young minds real science and real AI to explore. Technology used thoughtfully, not to replace people, but to help them reach further than they ever could alone.",
              "That question became i4i Sciences.",
            ].map((para, i) => (
              <motion.p
                key={i}
                {...fadeUp(0.22 + i * 0.08)}
                className="font-medium leading-relaxed mb-5"
                style={{
                  fontSize: "clamp(0.85rem, 1.1vw, 0.96rem)",
                  color: "rgba(15,45,122,0.72)",
                  lineHeight: 1.8,
                }}
              >
                {para}
              </motion.p>
            ))}

            {/* Signature line */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex items-center gap-4 mt-10 pt-8"
              style={{ borderTop: "1px solid rgba(15,45,122,0.1)" }}
            >
              <div>
                {/* Simulated signature using italic serif */}
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                    color: "#0F2D7A",
                    lineHeight: 1,
                    marginBottom: 4,
                    letterSpacing: "0.5px",
                  }}
                >
                  Ranjit Chauhan
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "rgba(15,45,122,0.42)",
                    textTransform: "uppercase",
                  }}
                >
                  Founder & CEO
                </p>
              </div>
              <div className="ml-auto">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-bold transition-all hover:-translate-y-0.5"
                  style={{
                    fontSize: "0.78rem",
                    color: "#0F2D7A",
                    textDecoration: "none",
                    borderBottom: "1.5px solid rgba(15,45,122,0.25)",
                    paddingBottom: 2,
                  }}
                >
                  Connect with Ranjit
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: founder photo ── */}
          <motion.div
  {...fadeUp(0.12)}
  className="relative self-center"
>
            <div className="relative">
              {/* Offset amber border — purely CSS, no shadow */}
              

              {/* Photo */}
              <div
                className="relative overflow-hidden rounded-2xl w-full"
                style={{ aspectRatio: "4/5", background: "#E8EEFC" }}
              >
                <img
                  src="/images/ranjit-chauhan.jpg"
                  alt="Ranjit Chauhan, Founder & CEO of i4iSciences"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Graceful placeholder if image missing
                    e.currentTarget.style.display = "none";
                  }}
                />

                {/* Placeholder shown when image not loaded */}
                
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-3 font-black text-2xl"
                    style={{ background: "#DCEBFF", color: "#0F2D7A" }}
                  >
                    RC
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "rgba(15,45,122,0.5)", fontWeight: 600 }}>
                    Ranjit Chauhan
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "rgba(15,45,122,0.38)" }}>
                    Add photo at /images/ranjit-chauhan.jpg
                  </p>
              </div>

              {/* Caption tag */}
              <div
                className="mt-4 inline-flex flex-col"
              >
                <p
                  className="font-bold"
                  style={{ fontSize: "0.8rem", color: "#0F2D7A" }}
                >
                  Ranjit Chauhan
                </p>
                <p
                  style={{ fontSize: "0.7rem", color: "rgba(15,45,122,0.5)", fontWeight: 500 }}
                >
                  Founder & CEO · i4iSciences
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ════════════════════════════════════════
            TEAM DIVIDER
        ════════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0)}
          className="mt-28 mb-14"
          style={{ borderTop: "1px solid rgba(15,45,122,0.1)" }}
        >
          <div className="pt-14 flex items-end justify-between flex-wrap gap-6">
            <div>
              <SectionRule label="The Team" />
              <h3
                className="font-[900] tracking-tight"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.4rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  color: "#0F2D7A",
                  marginTop: -8,
                }}
              >
                The people who show up{" "}
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#F4A623",
                  }}
                >
                  every day.
                </span>
              </h3>
            </div>
            <p
              className="font-medium leading-relaxed"
              style={{
                fontSize: "clamp(0.72rem, 0.9vw, 0.82rem)",
                color: "rgba(15,45,122,0.6)",
                maxWidth: 360,
                lineHeight: 1.75,
              }}
            >
              Small team. Enormous belief. Each person here chose this work
              because they&apos;ve lived some version of the problem we&apos;re solving.
            </p>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════
            TEAM MEMBERS
        ════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp(i * 0.12)}
              className="group"
            >
              {/* Photo */}
              <div
  className="relative overflow-hidden rounded-xl mb-4 mx-auto"
  style={{
    width: "170px",
    aspectRatio: "3/4",
    background: member.hue,
  }}
>
                <img
  src={`/images/team-${member.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
  alt={member.name}
  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
/>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-2"
                    style={{ background: "rgba(255,255,255,0.7)", color: member.textColor }}
                  >
                    {member.initials}
                  </div>
                </div>

                {/* Subtle bottom gradient so name reads if overlaid */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{
                    background: `linear-gradient(to top, ${member.hue}cc, transparent)`,
                  }}
                />

              {/* Text */}
              <div>
                {/* Role label */}
                <p
                  className="font-bold mb-1"
                  style={{
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(15,45,122,0.42)",
                  }}
                >
                  {member.role}
                </p>

                {/* Name */}
                <h4
                  className="font-[900] tracking-tight mb-3"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    color: "#0F2D7A",
                    letterSpacing: "-0.4px",
                    lineHeight: 1.1,
                  }}
                >
                  {member.name}
                </h4>

                {/* One honest human line */}
                <p
                  className="font-medium leading-relaxed"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(0.80rem, 0.9vw, 0.82rem)",
                    color: "rgba(15,45,122,0.65)",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                  }}
                >
                  {member.line}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ════════════════════════════════════════
            CLOSING NOTE — human, not salesy
        ════════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-24 pt-10"
          style={{ borderTop: "1px solid rgba(15,45,122,0.1)" }}
        >
          <p
            className="font-medium leading-relaxed text-center mx-auto"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: "rgba(15,45,122,0.55)",
              maxWidth: 560,
              lineHeight: 1.85,
              fontStyle: "italic",
            }}
          >
            We&apos;re a small team building something we genuinely believe the world needs.
            If that resonates — we&apos;d love to hear from you.
          </p>
          <div className="flex justify-center mt-7">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold transition-all hover:-translate-y-0.5"
              style={{
                fontSize: "0.82rem",
                color: "#0F2D7A",
                textDecoration: "none",
                borderBottom: "1.5px solid #F4A623",
                paddingBottom: 3,
              }}
            >
              Get in touch with us
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>


    <section
  ref={globalRef}
      style={{
        background:
          "linear-gradient(180deg, #f8f4ec 0%, #f5efe4 26%, #edf3f8 55%, #f5efe4 82%, #f8f4ec 100%)",
        padding:    "clamp(72px, 10vw, 120px) 0 clamp(80px, 11vw, 130px)",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* Very soft watercolour-style ambient wash — matches the image edges */}
      <div style={{
        position:     "absolute",
        top:          "-80px",
        left:         "-120px",
        width:        "500px",
        height:       "500px",
        borderRadius: "50%",
        background:
  "radial-gradient(circle, rgba(202,223,247,0.32) 0%, transparent 72%)",
        pointerEvents:"none",
      }} />
      <div style={{
        position:     "absolute",
        bottom:       "-60px",
        right:        "-80px",
        width:        "420px",
        height:       "420px",
        borderRadius: "50%",
        background:
  "radial-gradient(circle, rgba(245,166,35,0.14) 0%, transparent 72%)",
        pointerEvents:"none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 72px)", position: "relative", zIndex: 1 }}>

        {/* ── TOP LABEL + HEADLINE ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 56px)" }}>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={globalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.5rem",
              padding:       "0.32rem 1rem",
              borderRadius:  "999px",
              background:    "rgba(10,46,138,0.07)",
              border:        "1px solid rgba(10,46,138,0.13)",
              marginBottom:  "1.2rem",
            }}
          >
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#f5a623", display: "inline-block",
            }} />
            <span style={{
              fontFamily:    "'Geist','Geist Variable',sans-serif",
              fontSize:      "0.68rem",
              fontWeight:    700,
              letterSpacing: "0.14em",
              color:         "#0a2e8a",
              textTransform: "uppercase",
            }}>
              Global Reach
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={globalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            style={{
              fontFamily:    "'Geist','Geist Variable',sans-serif",
              fontWeight:    800,
              fontSize:      "clamp(2rem, 4vw, 3.4rem)",
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#10204e",
              marginBottom:  "1rem",
            }}
          >
            Education Without{" "}
            <span style={{ color: "#f5a623" }}>Borders.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={globalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16 }}
            style={{
              fontFamily:  "'Geist','Geist Variable',sans-serif",
              fontSize:    "clamp(0.9rem, 1.1vw, 1.04rem)",
              lineHeight:  1.72,
              color:       "#3d4f82",
              maxWidth:    "520px",
              margin:      "0 auto",
            }}
          >
            i4iSciences is live across four countries — uniting learners, teachers,
            and families through one intelligent platform designed for the world.
          </motion.p>
        </div>

        {/* ── MAP IMAGE — blends into section bg ── */}
        <motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  animate={globalInView ? { opacity: 1, scale: 1 } : {}}
  transition={{
    duration: 0.9,
    delay: 0.22,
    ease: EASE,
  }}
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "1100px",
    height: "520px", // controls vertical space
    margin: "0 auto",

    maskImage:
      "radial-gradient(ellipse 95% 90% at center, black 65%, transparent 100%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 95% 90% at center, black 65%, transparent 100%)",
  }}
>
  <img
    src="/images/globe.png"
    alt="i4iSciences global presence map"
    draggable={false}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
      userSelect: "none",
    }}
    
  />
  
</motion.div>

        {/* ── COUNTRY CARDS ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap:                 "clamp(12px, 2vw, 20px)",
            marginTop:           "clamp(32px, 5vw, 56px)",
          }}
        >
          {COUNTRIES.map((c, i) => (
            <motion.div
            key={c.short}
            initial={{ opacity: 0, y: 28 }}
            animate={globalInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.55,
              delay: 0.35 + i * 0.1,
              ease: EASE,
            }}
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(15,45,122,0.12)",
              borderRadius: "24px",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: `${c.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              {c.flag}
            </div>
          
            <div>
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#10204e",
                  marginBottom: "4px",
                }}
              >
                {c.name}
              </h3>
          
              <p
                style={{
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                  color: "rgba(15,45,122,0.68)",
                }}
              >
                {c.detail}
              </p>
            </div>
          </motion.div>
          ))}
        </div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={globalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.7 }}
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            marginTop:           "clamp(40px, 5.5vw, 64px)",
            borderRadius:        "18px",
            overflow:            "hidden",
            background:          "rgba(255,255,255,0.65)",
            backdropFilter:      "blur(14px)",
            border:              "1.5px solid rgba(10,46,138,0.09)",
            boxShadow:           "0 4px 32px rgba(10,46,138,0.06)",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding:    "clamp(22px, 3vw, 36px) clamp(16px, 2vw, 24px)",
                textAlign:  "center",
                borderRight: i < 3 ? "1px solid rgba(10,46,138,0.08)" : "none",
              }}
            >
              <div style={{
                fontFamily:    "'Geist','Geist Variable',sans-serif",
                fontWeight:    800,
                fontSize:      "clamp(1.7rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em",
                color:         "#0a2e8a",
                lineHeight:    1.1,
                marginBottom:  "0.3rem",
              }}>
                {s.value}
                <span style={{ color: "#f5a623" }}>{s.suffix}</span>
              </div>
              <div style={{
                fontFamily:    "'Geist','Geist Variable',sans-serif",
                fontSize:      "0.72rem",
                fontWeight:    500,
                letterSpacing: "0.02em",
                color:         "#6b7aa1",
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── BOTTOM CALLOUT ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={globalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{
            marginTop:      "clamp(48px, 6vw, 72px)",
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            gap:            "0.6rem",
            textAlign:      "center",
          }}
        >
          <p style={{
            fontFamily:  "'Geist','Geist Variable',sans-serif",
            fontSize:    "clamp(0.85rem, 1vw, 0.95rem)",
            lineHeight:  1.65,
            color:       "#3d4f82",
            maxWidth:    "480px",
          }}>
            Expanding across the UK, UAE, Australia and Southeast Asia in 2025 —
            one platform, every student, everywhere.
          </p>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", justifyContent: "center", marginTop: "0.4rem" }}>
            {["🇬🇧 UK", "🇦🇪 UAE", "🇦🇺 Australia", "🌏 SE Asia"].map(label => (
              <span
                key={label}
                style={{
                  padding:       "0.3rem 0.9rem",
                  borderRadius:  "999px",
                  background:    "rgba(255,255,255,0.70)",
                  border:        "1px solid rgba(10,46,138,0.12)",
                  fontFamily:    "'Geist','Geist Variable',sans-serif",
                  fontSize:      "0.75rem",
                  fontWeight:    600,
                  color:         "#0a2e8a",
                  backdropFilter:"blur(8px)",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <span style={{
            marginTop:     "0.4rem",
            fontFamily:    "'Geist','Geist Variable',sans-serif",
            fontSize:      "0.7rem",
            fontWeight:    600,
            letterSpacing: "0.08em",
            color:         "#f5a623",
            textTransform: "uppercase",
            opacity:       0.85,
          }}>
            Coming 2025
          </span>
        </motion.div>
      </div>
    </section>

    <section
      className="
      relative
      overflow-hidden
      py-32
      bg-[#F7F3EC]
      "
    >
      {/* subtle doodles */}

      <div className="absolute top-20 left-16 w-2 h-2 rounded-full bg-[#F5A623]/30" />
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-[#0A2E8A]/10" />
      <div className="absolute bottom-20 left-32 w-2 h-2 rounded-full bg-[#F5A623]/20" />

      <div className="max-w-7xl mx-auto px-8">

        {/* heading */}

        <div className="text-center mb-20">

          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#0A2E8A]/10
            bg-white
            px-5
            py-2
            text-xs
            font-semibold
            tracking-[0.24em]
            uppercase
            text-[#0A2E8A]
            "
          >
            Our Partners
          </span>

          <h2
            className="
            mt-6
            text-5xl
            md:text-6xl
            font-extrabold
            tracking-[-0.04em]
            text-[#0A2E8A]
            "
          >
            Building Impact
            <span className="text-[#F5A623]">
              {" "}Together
            </span>
          </h2>

          <p
            className="
            mt-5
            max-w-3xl
            mx-auto
            text-lg
            leading-relaxed
            text-slate-600
            "
          >
            Collaborating with educational institutions,
            technology innovators, nonprofits and learning
            organizations to expand access to world-class
            education globally.
          </p>
        </div>

        {/* matrix */}

        <div
          className="
          max-w-4xl
          mx-auto
          space-y-8
          "
        >

          {/* ROW 1 */}

          <motion.div
            animate={{
              x: [-40, 40, -40],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
            grid
            grid-cols-3
            gap-6
            "
          >
            {row1.map((logo, index) => (
              <PartnerCard key={index} logo={logo} />
            ))}
          </motion.div>

          {/* ROW 2 */}

          <motion.div
            animate={{
              x: [40, -40, 40],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
            grid
            grid-cols-3
            gap-6
            "
          >
            {row2.map((logo, index) => (
              <PartnerCard key={index} logo={logo} />
            ))}
          </motion.div>

          {/* ROW 3 */}

          <motion.div
            animate={{
              x: [-40, 40, -40],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
            grid
            grid-cols-3
            gap-6
            "
          >
            {row3.map((logo, index) => (
              <PartnerCard key={index} logo={logo} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
    <section
      className="
      relative
      py-32
      bg-[#F7F3EC]
      "
    >
      <div className="max-w-7xl mx-auto px-8">

        <div
          className="
          relative
          overflow-hidden
          rounded-[40px]
          bg-white
          border
          border-slate-200
          px-16
          py-24
          text-center
          shadow-xl
          "
        >
          <div
            className="
            absolute
            inset-0
            opacity-40
            bg-[radial-gradient(circle_at_top_right,#F5A62320,transparent_40%)]
            "
          />

          <span
            className="
            inline-flex
            rounded-full
            bg-[#0A2E8A]/5
            px-5
            py-2
            text-xs
            font-semibold
            tracking-[0.25em]
            uppercase
            text-[#0A2E8A]
            "
          >
            Join The Mission
          </span>

          <h2
            className="
            mt-8
            text-6xl
            font-extrabold
            leading-tight
            text-[#0A2E8A]
            "
          >
            Education Has The Power
            <br />
            To Change
            <span className="text-[#F5A623]">
              {" "}
              Everything.
            </span>
          </h2>

          <p
            className="
            mt-8
            max-w-3xl
            mx-auto
            text-xl
            text-slate-600
            leading-relaxed
            "
          >
            Whether you&apos;re a student seeking
            opportunity, a tutor creating impact,
            or an institution shaping the future,
            i4iSciences is building the platform that
            connects people, knowledge and growth.
          </p>

          <div
            className="
            mt-12
            flex
            flex-wrap
            justify-center
            gap-5
            "
          >
            <Link
              href="/contact"
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#0A2E8A]
              px-8
              py-4
              text-white
              font-semibold
              "
            >
              Become a Partner
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/models"
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0A2E8A]
              px-8
              py-4
              font-semibold
              text-[#0A2E8A]
              "
            >
              Explore Models
            </Link>
          </div>
        </div>
      </div>
    </section>

 
  
  </>
  );
}