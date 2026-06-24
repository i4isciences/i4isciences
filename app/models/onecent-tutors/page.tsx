"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   ICON COMPONENTS (fully custom SVG, no emojis)
   ───────────────────────────────────────────── */
const GlobeIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
  </svg>
);
const ShieldIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" />
  </svg>
);
const VideoIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m22 8-6 4 6 4V8z" /><rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);
const CalendarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const StarIcon = ({ size = 16, filled = false }: { size?: number; filled?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#F5A623" : "none"} stroke="#F5A623" strokeWidth="1.5">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);
const SearchIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const CheckIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const ArrowIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const WhiteboardIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
  </svg>
);
const MicIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
  </svg>
);
const RecordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" fill="currentColor" />
  </svg>
);
const ChatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ClockIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const BookIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const UserCheckIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16,11 18,13 22,9" />
  </svg>
);
const TrendingIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
);
const AwardIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
const UsersIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ShareIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
const FilterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);
const MapPinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const DollarIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const TargetIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const LightbulbIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);
const SparkleIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" /><path d="M5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75z" />
  </svg>
);
const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const ZapIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
  </svg>
);

/* ─────────────────────────────────────────────
   COLOR TOKENS
   ───────────────────────────────────────────── */
const C = {
  navy: "#1B2D5B",
  navyLight: "#243770",
  gold: "#F5A623",
  goldLight: "#FFC04D",
  goldPale: "#FFF8EC",
  white: "#FFFFFF",
  beige: "#F8F4EC",
  blueTint: "#F4F8FF",
  text: "#1A1A2E",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E8E3D8",
  borderBlue: "#D8E6F5",
};

/* ─────────────────────────────────────────────
   TUTOR CARD DATA
   ───────────────────────────────────────────── */
const tutors = [
  { name: "Priya Sharma", subject: "Mathematics", country: "India", flag: "🇮🇳", rating: 4.9, reviews: 312, experience: "8 years", languages: ["English", "Hindi"], price: "₹500/hr", avatar: "PS", color: "#E8F4FD" },
  { name: "James Mitchell", subject: "IELTS / English", country: "UK", flag: "🇬🇧", rating: 4.8, reviews: 198, experience: "6 years", languages: ["English"], price: "$40/hr", avatar: "JM", color: "#FFF0E8" },
  { name: "Aisha Al-Farsi", subject: "Science & Physics", country: "UAE", flag: "🇦🇪", rating: 5.0, reviews: 89, experience: "5 years", languages: ["English", "Arabic"], price: "$35/hr", avatar: "AA", color: "#F0F8EC" },
  { name: "Wei Chen", subject: "Coding & Python", country: "Singapore", flag: "🇸🇬", rating: 4.9, reviews: 241, experience: "7 years", languages: ["English", "Mandarin"], price: "$50/hr", avatar: "WC", color: "#F4F0FF" },
  { name: "Sarah Thompson", subject: "SAT Prep", country: "USA", flag: "🇺🇸", rating: 4.7, reviews: 156, experience: "4 years", languages: ["English"], price: "$55/hr", avatar: "ST", color: "#FFF8EC" },
  { name: "Rahul Verma", subject: "Public Speaking", country: "India", flag: "🇮🇳", rating: 4.8, reviews: 203, experience: "9 years", languages: ["English", "Hindi"], price: "₹600/hr", avatar: "RV", color: "#F0F4FF" },
];

const subjects = ["All", "Math", "Science", "Coding", "English", "IELTS", "SAT", "Olympiad", "Public Speaking", "Career Skills"];

const successStories = [
  {
    name: "Ananya Krishnan",
    age: "17, Chennai",
    before: "Struggling with Calculus, scoring 54% in school tests",
    after: "Scored 96% in boards, cleared JEE Advanced",
    tutor: "Priya Sharma",
    subject: "Mathematics",
    duration: "8 months",
    avatar: "AK",
    color: "#FFF0E8",
  },
  {
    name: "Mohammed Al-Rashid",
    age: "24, Dubai",
    before: "IELTS Band 5.5, needed 7.0 for university",
    after: "Achieved Band 7.5, admitted to University of Edinburgh",
    tutor: "James Mitchell",
    subject: "IELTS English",
    duration: "4 months",
    avatar: "MA",
    color: "#E8F4FD",
  },
  {
    name: "Zara Okafor",
    age: "16, Toronto",
    before: "No coding experience, feeling left behind",
    after: "Built her first app, accepted into CS summer camp",
    tutor: "Wei Chen",
    subject: "Python Coding",
    duration: "6 months",
    avatar: "ZO",
    color: "#F0F8EC",
  },
];

const verificationSteps = [
  { icon: <UserCheckIcon size={22} />, title: "Identity Verified", desc: "Government ID and proof of credentials checked by our compliance team" },
  { icon: <AwardIcon size={22} />, title: "Education Verified", desc: "Degrees and certifications cross-checked with issuing institutions" },
  { icon: <ShieldIcon size={22} />, title: "Background Check", desc: "Criminal and professional background screening for every applicant" },
  { icon: <TargetIcon size={22} />, title: "Skills Assessment", desc: "Subject-matter competency tests designed by education experts" },
  { icon: <VideoIcon size={22} />, title: "Demo Session", desc: "Live teaching demonstration reviewed and scored by senior educators" },
  { icon: <StarIcon size={22} />, title: "Ongoing Reviews", desc: "Continuous student feedback loop with performance thresholds" },
];

const classroomFeatures = [
  { icon: <VideoIcon />, label: "HD Live Video" },
  { icon: <WhiteboardIcon />, label: "Interactive Whiteboard" },
  { icon: <ShareIcon />, label: "Screen Sharing" },
  { icon: <BookIcon />, label: "Assignments" },
  { icon: <RecordIcon />, label: "Session Recording" },
  { icon: <ChatIcon />, label: "Live Chat" },
  { icon: <MicIcon />, label: "Two-way Audio" },
  { icon: <TrendingIcon />, label: "Progress Notes" },
];

const tutorBenefits = [
  { icon: <ClockIcon />, title: "Flexible Hours", desc: "Teach on your own schedule, morning or midnight." },
  { icon: <GlobeIcon />, title: "Global Students", desc: "Connect with learners from 100+ countries." },
  { icon: <TrendingIcon />, title: "Recurring Income", desc: "Build a stable monthly income with repeat students." },
  { icon: <AwardIcon />, title: "Training & Resources", desc: "Access our educator library and teaching tools." },
  { icon: <UsersIcon />, title: "Tutor Community", desc: "Join thousands of educators sharing best practices." },
  { icon: <ZapIcon />, title: "Fast Payouts", desc: "Earnings deposited directly, every week." },
];

const matchingFactors = [
  { icon: <TargetIcon size={18} />, label: "Learning Goals" },
  { icon: <CalendarIcon size={18} />, label: "Schedule" },
  { icon: <DollarIcon size={18} />, label: "Budget" },
  { icon: <GlobeIcon size={18} />, label: "Language" },
  { icon: <TrendingIcon size={18} />, label: "Skill Level" },
  { icon: <LightbulbIcon size={18} />, label: "Learning Style" },
];

/* ─────────────────────────────────────────────
   SECTION BACKGROUNDS
   ───────────────────────────────────────────── */
const sectionBgs = [
  C.white,       // Hero
  C.beige,       // What is OCT
  C.white,       // How it works
  C.blueTint,    // Find tutor
  C.white,       // Booking
  C.beige,       // Classroom
  C.white,       // Smart matching
  C.blueTint,    // Verified tutors
  "#F0EBE0",     // Global network (matches image)
  C.white,       // Success stories
  C.beige,       // For tutors
  C.blueTint,    // Platform preview
  C.navy,        // Final CTA
];

/* ─────────────────────────────────────────────
   WAVY SECTION DIVIDER
   ───────────────────────────────────────────── */
const WaveDivider = ({ color, flip = false }: { color: string; flip?: boolean }) => (
  <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginBottom: -2 }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 60 }}>
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={color} />
    </svg>
  </div>
);

/* ─────────────────────────────────────────────
   STAR RATING
   ───────────────────────────────────────────── */
const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} size={14} filled={i <= Math.round(rating)} />)}
  </div>
);

/* ─────────────────────────────────────────────
   TUTOR CARD
   ───────────────────────────────────────────── */
const TutorCard = ({ t }: { t: typeof tutors[0] }) => (
  <div style={{
    background: C.white,
    borderRadius: 20,
    padding: "24px 22px",
    border: `1.5px solid ${C.border}`,
    boxShadow: "0 4px 24px rgba(27,45,91,0.07)",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(27,45,91,0.13)"; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(27,45,91,0.07)"; }}
  >
    {/* Avatar */}
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 54, height: 54, borderRadius: "50%",
        background: t.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 18, color: C.navy,
        border: `2px solid ${C.border}`,
        flexShrink: 0,
      }}>{t.avatar}</div>
      <div>
        <div style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 700, fontSize: 15, color: C.navy }}>{t.name}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t.subject}</div>
      </div>
    </div>
    {/* Stats row */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <StarRating rating={t.rating} />
      <span style={{ fontSize: 12, color: C.textMuted }}>{t.rating} ({t.reviews})</span>
    </div>
    <div style={{ display: "flex", gap: 8, fontSize: 12, color: C.textMuted, flexWrap: "wrap" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPinIcon size={12} />{t.country} {t.flag}</span>
      <span>•</span>
      <span>{t.experience}</span>
    </div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {t.languages.map((lang) => (
        <span key={lang} style={{ background: C.blueTint, color: C.navy, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 500 }}>{lang}</span>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
      <span style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>{t.price}</span>
      <button style={{
        background: C.gold, color: C.white, border: "none", borderRadius: 10,
        padding: "8px 16px", fontSize: 12, fontWeight: 700,
        cursor: "pointer", fontFamily: "var(--font-geist-sans)",
        transition: "background 0.2s",
      }}>Book Session</button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   JOURNEY STEP
   ───────────────────────────────────────────── */
const JourneyStep = ({ step, label, icon, isLast }: { step: number; label: string; icon: React.ReactNode; isLast?: boolean }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
    {!isLast && (
      <div style={{
        position: "absolute", top: 28, left: "60%", right: "-40%",
        height: 3, background: `repeating-linear-gradient(90deg, ${C.gold} 0, ${C.gold} 8px, transparent 8px, transparent 16px)`,
        zIndex: 0,
      }} />
    )}
    <div style={{
      width: 56, height: 56, borderRadius: "50%",
      background: C.navy, color: C.gold,
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1, boxShadow: `0 0 0 6px ${C.goldPale}`,
      marginBottom: 12,
    }}>{icon}</div>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Step {step}</div>
      <div style={{ fontWeight: 700, color: C.navy, fontSize: 14, marginTop: 4 }}>{label}</div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   BOOKING MOCKUP
   ───────────────────────────────────────────── */
const BookingMockup = () => {
  const [selected, setSelected] = useState<string>("21");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [pkg, setPkg] = useState("trial");
  const days = [
    { day: "Mon", date: "19" },
    { day: "Tue", date: "20" },
    { day: "Wed", date: "21" },
    { day: "Thu", date: "22" },
    { day: "Fri", date: "23" },
    { day: "Sat", date: "24" },
  ];
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  return (
    <div style={{
      background: C.white, borderRadius: 24, boxShadow: "0 20px 60px rgba(27,45,91,0.12)",
      overflow: "hidden", border: `1.5px solid ${C.border}`,
      display: "grid", gridTemplateColumns: "1fr 1.4fr",
    }}>
      {/* Left: tutor info */}
      <div style={{ background: C.navy, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#E8F4FD", display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 22, color: C.navy, border: `3px solid ${C.gold}`,
        }}>PS</div>
        <div>
          <div style={{ color: C.white, fontWeight: 800, fontSize: 20 }}>Priya Sharma</div>
          <div style={{ color: C.gold, fontSize: 13, marginTop: 4 }}>Mathematics · India</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <StarRating rating={4.9} />
          <span style={{ color: "#ffffff99", fontSize: 12 }}>4.9 (312 reviews)</span>
        </div>
        <div style={{ borderTop: "1px solid #ffffff22", paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[["Duration", "60 min"], ["Language", "English"], ["Timezone", "IST / GMT +5:30"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#ffffff77", fontSize: 12 }}>{k}</span>
              <span style={{ color: C.white, fontSize: 12, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        {/* Package */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[["trial", "Trial Session", "₹500"], ["monthly", "Monthly Pack", "₹3,500"], ["yearly", "Yearly Pack", "₹30,000"]].map(([id, name, price]) => (
            <div key={id} onClick={() => setPkg(id)} style={{
              padding: "10px 14px", borderRadius: 12, cursor: "pointer",
              background: pkg === id ? C.gold : "rgba(255,255,255,0.07)",
              border: `1.5px solid ${pkg === id ? C.gold : "rgba(255,255,255,0.15)"}`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: pkg === id ? C.navy : C.white }}>{name}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: pkg === id ? C.navy : C.gold }}>{price}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right: calendar */}
      <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 17, color: C.navy }}>Select Date & Time</div>
        <div style={{ fontSize: 13, color: C.textMuted, marginTop: -10 }}>June 2026</div>
        {/* Days */}
        <div style={{ display: "flex", gap: 8 }}>
          {days.map(({ day, date }) => (
            <div key={date} onClick={() => setSelected(date)} style={{
              flex: 1, padding: "10px 4px", borderRadius: 12, cursor: "pointer", textAlign: "center",
              background: selected === date ? C.navy : C.white,
              border: `1.5px solid ${selected === date ? C.navy : C.border}`,
              transition: "all 0.15s",
            }}>
              <div style={{ fontSize: 10, color: selected === date ? C.gold : C.textMuted, fontWeight: 600 }}>{day}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: selected === date ? C.white : C.navy, marginTop: 4 }}>{date}</div>
            </div>
          ))}
        </div>
        {/* Times */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {times.map((t) => (
            <div key={t} onClick={() => setSelectedTime(t)} style={{
              padding: "9px 6px", borderRadius: 10, cursor: "pointer", textAlign: "center",
              background: selectedTime === t ? C.goldPale : C.white,
              border: `1.5px solid ${selectedTime === t ? C.gold : C.border}`,
              fontSize: 12, fontWeight: 600, color: selectedTime === t ? C.navy : C.textMuted,
              transition: "all 0.15s",
            }}>{t}</div>
          ))}
        </div>
        {/* Confirm */}
        <button style={{
          marginTop: 8, padding: "14px 0", borderRadius: 14, border: "none",
          background: C.gold, color: C.white, fontWeight: 800, fontSize: 15,
          cursor: "pointer", fontFamily: "var(--font-geist-sans)",
          boxShadow: `0 6px 24px ${C.gold}55`,
        }}>
          Confirm Booking &rarr;
        </button>
        <div style={{ textAlign: "center", fontSize: 11, color: C.textMuted }}>Free cancellation up to 24 hours before session</div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   PLATFORM PREVIEW MOCKUP
   ───────────────────────────────────────────── */
const PlatformPreview = () => (
  <div style={{
    background: C.white, borderRadius: 20, boxShadow: "0 24px 64px rgba(27,45,91,0.15)",
    overflow: "hidden", border: `1.5px solid ${C.border}`,
  }}>
    {/* Top bar */}
    <div style={{ background: C.navy, padding: "14px 24px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {["#FF5F57", "#FFBD2E", "#28CA41"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
      </div>
      <div style={{ flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 12px", fontSize: 11, color: "#ffffff88" }}>
        app.onecenttutors.com/dashboard
      </div>
    </div>
    {/* Sidebar + content */}
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr" }}>
      {/* Sidebar */}
      <div style={{ background: "#F8F9FC", borderRight: `1px solid ${C.border}`, padding: "20px 0" }}>
        {[
          { icon: <CalendarIcon size={14} />, label: "Sessions", active: true },
          { icon: <UsersIcon size={14} />, label: "My Students" },
          { icon: <BookIcon size={14} />, label: "Assignments" },
          { icon: <TrendingIcon size={14} />, label: "Progress" },
          { icon: <DollarIcon size={14} />, label: "Payments" },
          { icon: <ChatIcon size={14} />, label: "Messages" },
        ].map(({ icon, label, active }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 20px", fontSize: 12, fontWeight: active ? 700 : 500,
            color: active ? C.navy : C.textMuted,
            background: active ? C.goldPale : "transparent",
            borderRight: active ? `3px solid ${C.gold}` : "3px solid transparent",
            cursor: "pointer",
          }}>
            {icon} {label}
          </div>
        ))}
      </div>
      {/* Main content */}
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 15, color: C.navy }}>Upcoming Sessions</div>
        {[
          { student: "Ananya K.", subject: "Algebra · Chapter 7", time: "Today, 6:00 PM", color: "#E8F4FD" },
          { student: "Rohan M.", subject: "IELTS Writing Task", time: "Tomorrow, 9:00 AM", color: "#F0F8EC" },
          { student: "Sara L.", subject: "Python Basics", time: "Thu, 4:00 PM", color: "#FFF0E8" },
        ].map(s => (
          <div key={s.student} style={{
            background: s.color, borderRadius: 12, padding: "12px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{s.student}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{s.subject}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: C.textMuted }}>{s.time}</div>
              <div style={{
                marginTop: 4, fontSize: 10, fontWeight: 700,
                background: C.gold, color: C.white, borderRadius: 6, padding: "2px 8px",
                display: "inline-block",
              }}>Join</div>
            </div>
          </div>
        ))}
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 4 }}>
          {[
            { label: "Total Students", value: "24" },
            { label: "This Month", value: "₹18,400" },
            { label: "Avg Rating", value: "4.9 ★" },
          ].map(s => (
            <div key={s.label} style={{ background: C.blueTint, borderRadius: 12, padding: "12px 14px", textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: C.navy }}>{s.value}</div>
              <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */
export default function OneCentTutorsPage() {
  const [activeSubject, setActiveSubject] = useState("All");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  const filteredTutors = activeSubject === "All" ? tutors : tutors.filter(t =>
    t.subject.toLowerCase().includes(activeSubject.toLowerCase())
  );

  return (
    <main style={{ fontFamily: "var(--font-geist-sans)", overflowX: "hidden" }}>

      {/* ────────────────────────────────────────
          SECTION 1 — HERO
          ──────────────────────────────────────── */}
      <section style={{ background: C.white, paddingTop: 80, paddingBottom: 0, overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 60, alignItems: "center",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            {/* Left */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: C.goldPale, borderRadius: 100, padding: "6px 16px",
                width: "fit-content", border: `1px solid ${C.gold}44`,
              }}>
                
              </div>

              <h1 style={{
                fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900,
                color: C.navy, lineHeight: 1.1, margin: 0,
              }}>
                Find the Right Tutor.{" "}
                <span style={{
                  fontFamily: "'Caveat', cursive", fontWeight: 700,
                  color: C.gold, fontSize: "1.05em",
                }}>Learn Without Limits.</span>
              </h1>

              <p style={{ fontSize: 18, color: C.textMuted, lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
                OneCent Tutors connects students with verified educators across subjects, skills and countries through personalized live learning experiences.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button style={{
                  background: C.navy, color: C.white,
                  border: "none", borderRadius: 14,
                  padding: "16px 32px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: "var(--font-geist-sans)",
                  display: "flex", alignItems: "center", gap: 8,
                  boxShadow: `0 8px 32px ${C.navy}44`,
                  transition: "transform 0.2s",
                }}>
                  Explore Tutors <ArrowIcon size={16} />
                </button>
                <button style={{
                  background: C.white, color: C.navy,
                  border: `2px solid ${C.navy}`, borderRadius: 14,
                  padding: "14px 32px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: "var(--font-geist-sans)",
                  transition: "all 0.2s",
                }}>
                  Book Trial Session
                </button>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap", paddingTop: 8 }}>
                {[["50,000+", "Verified Tutors"], ["120+", "Subjects"], ["1M+", "Sessions Done"]].map(([val, lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: C.navy }}>{val}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero image in organic shape */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {/* Organic blob background */}
              <svg viewBox="0 0 500 480" style={{ position: "absolute", width: "100%", top: -20 }}>
                <defs>
                  <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={C.goldPale} />
                    <stop offset="100%" stopColor={C.blueTint} />
                  </linearGradient>
                  <clipPath id="heroClip">
                    <path d="M250,30 C360,20 460,80 470,180 C480,280 420,380 310,430 C200,480 80,450 40,350 C0,250 30,130 120,70 C170,40 200,35 250,30Z" />
                  </clipPath>
                </defs>
                <path d="M250,30 C360,20 460,80 470,180 C480,280 420,380 310,430 C200,480 80,450 40,350 C0,250 30,130 120,70 C170,40 200,35 250,30Z" fill="url(#blobGrad)" />
              </svg>

              <div
  style={{
    position: "relative",
    width: "100%",
    maxWidth: 650,
    aspectRatio: "500 / 480",
    zIndex: 1
  }}
>
<svg
viewBox="0 0 500 480"
style={{
  width: "100%",
  maxWidth: 650,
  display: "block"
}}
>
<defs>
  <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor={C.goldPale} />
    <stop offset="100%" stopColor={C.blueTint} />
  </linearGradient>

  <clipPath id="heroClip">
    <path d="M250,30 C360,20 460,80 470,180 C480,280 420,380 310,430 C200,480 80,450 40,350 C0,250 30,130 120,70 C170,40 200,35 250,30Z" />
  </clipPath>
</defs>

{/* Blob background */}
<path
  d="M250,30 C360,20 460,80 470,180 C480,280 420,380 310,430 C200,480 80,450 40,350 C0,250 30,130 120,70 C170,40 200,35 250,30Z"
  fill="url(#blobGrad)"
/>

{/* Full image */}
<image
  href="/images/oct.png"
  x="0"
  y="0"
  width="500"
  height="480"
  preserveAspectRatio="xMidYMid slice"
  clipPath="url(#heroClip)"
/>
</svg>
                
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={C.beige} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 2 — WHAT IS ONECENT TUTORS
          ──────────────────────────────────────── */}
      <section style={{ background: C.beige, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            {/* Left: organic image */}
            <div style={{ position: "relative" }}>
              <svg viewBox="0 0 500 500" style={{ width: "100%", display: "block" }}>
                <defs>
                  <clipPath id="s2clip">
                    <path d="M260,20 C380,10 490,100 480,220 C470,340 370,460 240,470 C110,480 10,380 20,250 C30,120 140,30 260,20Z" />
                  </clipPath>
                  <linearGradient id="s2bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={C.goldPale} />
                    <stop offset="100%" stopColor={C.blueTint} />
                  </linearGradient>
                </defs>
                <path d="M260,20 C380,10 490,100 480,220 C470,340 370,460 240,470 C110,480 10,380 20,250 C30,120 140,30 260,20Z" fill="url(#s2bg)" />
                <image href="/images/m2whatisoct.png" x="20" y="20" width="460" height="460" clipPath="url(#s2clip)" preserveAspectRatio="xMidYMid slice" />
              </svg>
              {/* Floating stat badge */}
              <div style={{
                position: "absolute", bottom: "10%", right: "0",
                background: C.navy, color: C.white, borderRadius: 18, padding: "16px 22px",
                boxShadow: "0 12px 40px rgba(27,45,91,0.2)",
              }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.gold }}>120+</div>
                <div style={{ fontSize: 12, color: "#ffffff99", marginTop: 2 }}>Subjects Available</div>
              </div>
              <div style={{
                position: "absolute", top: "8%", right: "-4%",
                background: C.white, borderRadius: 18, padding: "14px 18px",
                boxShadow: "0 8px 32px rgba(27,45,91,0.1)", border: `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: C.navy }}>24/7</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>Always Available</div>
              </div>
            </div>
            {/* Right: content */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>
                What is OneCent Tutors
              </div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, lineHeight: 1.2, margin: 0 }}>
                More Than Tutoring.{" "}
                <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>A Global Learning Marketplace.</span>
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                Like Airbnb connects travellers with unique homes worldwide, OneCent Tutors connects learners with the perfect educator — wherever they are, whatever they need.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  [<ShieldIcon size={18} />, "Verified Tutors", "Every educator is background-checked, degree-verified, and skills-assessed before they can teach."],
                  [<VideoIcon size={18} />, "Live Learning", "Real-time classes with interactive whiteboards, screen sharing and session recordings."],
                  [<DollarIcon size={18} />, "Secure Payments", "Stripe-powered payments with escrow protection. Pay only when you're happy."],
                  [<CalendarIcon size={18} />, "Flexible Schedules", "Book 1-hour or recurring sessions. Change, reschedule or cancel anytime."],
                  [<GlobeIcon size={18} />, "Worldwide Access", "Connect with tutors across 100+ countries in multiple languages."],
                ].map(([icon, title, desc]) => (
                  <div key={title as string} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12,
                      background: C.white, display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.navy, flexShrink: 0, boxShadow: "0 2px 12px rgba(27,45,91,0.08)",
                      border: `1px solid ${C.border}`,
                    }}>{icon as React.ReactNode}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{title as string}</div>
                      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3, lineHeight: 1.6 }}>{desc as string}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={C.white} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 3 — HOW THE MARKETPLACE WORKS
          ──────────────────────────────────────── */}
      <section style={{ background: C.white, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
              Your Learning Journey
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              How the{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Marketplace</span>{" "}
              Works
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
              From discovery to growth — here&apos;s how thousands of students find their perfect tutor and start learning.
            </p>
          </div>

          {/* Journey path */}
          <div style={{
            background: C.beige, borderRadius: 32,
            padding: "48px 40px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Doodle dots */}
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 6, height: 6, borderRadius: "50%",
                background: C.gold + "44",
                left: `${10 + i * 12}%`,
                top: i % 2 === 0 ? "15%" : "80%",
              }} />
            ))}

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
              {[
                { step: 1, label: "Search", icon: <SearchIcon size={22} /> },
                { step: 2, label: "Compare Tutors", icon: <UsersIcon size={22} /> },
                { step: 3, label: "Book Session", icon: <CalendarIcon size={22} /> },
                { step: 4, label: "Attend Live Class", icon: <VideoIcon size={22} /> },
                { step: 5, label: "Track Progress", icon: <TrendingIcon size={22} /> },
                { step: 6, label: "Keep Growing", icon: <AwardIcon size={22} /> },
              ].map(({ step, label, icon }, i, arr) => (
                <JourneyStep key={step} step={step} label={label} icon={icon} isLast={i === arr.length - 1} />
              ))}
            </div>

          </div>
        </div>
        <WaveDivider color={C.blueTint} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 4 — FIND YOUR PERFECT TUTOR
          ──────────────────────────────────────── */}
      <section style={{ background: C.blueTint, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
              Tutor Marketplace
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Find Your{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Perfect Tutor</span>
            </h2>
          </div>

          {/* Search bar */}
          <div style={{
            background: C.white, borderRadius: 20,
            padding: "20px 24px", boxShadow: "0 8px 40px rgba(27,45,91,0.08)",
            border: `1.5px solid ${C.border}`,
            display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap",
            marginBottom: 24,
          }}>
            <div style={{
              flex: 1, minWidth: 200,
              display: "flex", alignItems: "center", gap: 10,
              background: C.blueTint, borderRadius: 12, padding: "12px 16px",
              border: `1px solid ${C.borderBlue}`,
            }}>
              <SearchIcon size={18} />
              <input type="text" placeholder="Search by subject, skill or tutor name..."
                style={{
                  border: "none", background: "transparent", outline: "none",
                  fontSize: 14, color: C.text, fontFamily: "var(--font-geist-sans)",
                  flex: 1,
                }} />
            </div>
            {[
              [<GlobeIcon size={14} />, "Country"],
              [<GlobeIcon size={14} />, "Language"],
              [<CalendarIcon size={14} />, "Availability"],
              [<DollarIcon size={14} />, "Price"],
            ].map(([icon, label]) => (
              <div key={label as string} style={{
                display: "flex", alignItems: "center", gap: 6,
                background: C.white, border: `1.5px solid ${C.border}`,
                borderRadius: 12, padding: "10px 14px",
                fontSize: 13, color: C.navy, fontWeight: 600, cursor: "pointer",
              }}>
                {icon as React.ReactNode} {label as string}
              </div>
            ))}
            <button style={{
              background: C.navy, color: C.white, border: "none",
              borderRadius: 12, padding: "12px 24px", fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "var(--font-geist-sans)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <FilterIcon size={14} /> Filter
            </button>
          </div>

          {/* Subject chips */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
            {subjects.map(s => (
              <button key={s} onClick={() => setActiveSubject(s)} style={{
                padding: "8px 18px", borderRadius: 100, border: "none",
                background: activeSubject === s ? C.navy : C.white,
                color: activeSubject === s ? C.white : C.navy,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                boxShadow: activeSubject === s ? `0 4px 16px ${C.navy}33` : "0 2px 8px rgba(27,45,91,0.06)",
                border: activeSubject === s ? "none" : `1.5px solid ${C.border}`,
                transition: "all 0.15s",
              }}>{s}</button>
            ))}
          </div>

          {/* Tutor cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {(filteredTutors.length > 0 ? filteredTutors : tutors).map(t => <TutorCard key={t.name} t={t} />)}
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button style={{
              background: "transparent", color: C.navy,
              border: `2px solid ${C.navy}`, borderRadius: 14,
              padding: "14px 36px", fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "var(--font-geist-sans)",
            }}>
              Browse All Tutors
            </button>
          </div>
        </div>
        <WaveDivider color={C.white} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 5 — BOOKING EXPERIENCE
          ──────────────────────────────────────── */}
      <section style={{ background: C.white, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>
              Booking
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Schedule a Session in{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Seconds</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
              Choose your tutor, pick a time, select a package and you&apos;re set. Booking as simple as ordering food online.
            </p>
          </div>
          <BookingMockup />
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 6 — LIVE CLASSROOM
          ──────────────────────────────────────── */}
      <section style={{ background: C.beige, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Live Classroom</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Learn Together, Grow{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Together</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
              A fully-featured virtual classroom designed for real human connection, not screen fatigue.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Image in organic shape */}
            <div style={{ position: "relative" }}>
              <svg viewBox="0 0 580 500" style={{ width: "100%", display: "block" }}>
                <defs>
                  <clipPath id="s6clip">
                    <path d="M60,40 C160,10 420,20 500,100 C570,170 560,340 480,420 C400,500 160,490 80,400 C0,310 -10,160 60,40Z" />
                  </clipPath>
                </defs>
                <path d="M60,40 C160,10 420,20 500,100 C570,170 560,340 480,420 C400,500 160,490 80,400 C0,310 -10,160 60,40Z" fill={C.goldPale} />
                <image href="/images/m2s6.png" x="30" y="20" width="520" height="460" clipPath="url(#s6clip)" preserveAspectRatio="xMidYMid slice" />
              </svg>
              {/* Overlay badge */}
              <div style={{
                position: "absolute", bottom: "12%", left: "-6%",
                background: C.navy, borderRadius: 18, padding: "14px 20px",
                boxShadow: "0 12px 40px rgba(27,45,91,0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
                  <span style={{ color: C.white, fontSize: 12, fontWeight: 700 }}>Live Now</span>
                </div>
                <div style={{ color: "#ffffff77", fontSize: 11, marginTop: 4 }}>Algebra · 6 students joined</div>
              </div>
            </div>

            {/* Features grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                Not just a video call. Your OneCent classroom is built for focused, interactive learning — with every tool a great teacher needs.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {classroomFeatures.map(({ icon, label }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: C.white, borderRadius: 14, padding: "14px 16px",
                    border: `1.5px solid ${C.border}`,
                    boxShadow: "0 2px 8px rgba(27,45,91,0.05)",
                  }}>
                    <div style={{ color: C.navy, flexShrink: 0 }}>{icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{label}</span>
                  </div>
                ))}
              </div>
              <div style={{
                background: C.goldPale, borderRadius: 16, padding: "18px 22px",
                border: `1.5px solid ${C.gold}44`,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <RecordIcon size={22} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>Every session is recorded</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Revisit, review and revise on your own time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={C.white} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 7 — SMART MATCHING
          ──────────────────────────────────────── */}
      <section style={{ background: C.white, paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Smart Matching</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, lineHeight: 1.2, margin: 0 }}>
                Get Matched With the{" "}
                <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Right Tutor.</span>
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                Tell us about your learning goals, schedule and budget. We&apos;ll find tutors that fit like a glove — no scrolling for hours.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {matchingFactors.map(({ icon, label }) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: C.beige, borderRadius: 14, padding: "14px 16px",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: C.navy, color: C.gold,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>{icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{label}</span>
                  </div>
                ))}
              </div>
              <button style={{
                background: C.gold, color: C.white, border: "none",
                borderRadius: 14, padding: "16px 32px", fontSize: 15, fontWeight: 700,
                cursor: "pointer", fontFamily: "var(--font-geist-sans)",
                display: "flex", alignItems: "center", gap: 8, width: "fit-content",
                boxShadow: `0 8px 32px ${C.gold}44`,
              }}>
                Find My Tutor <ArrowIcon />
              </button>
            </div>

            {/* Matching flow visual */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              {/* Student card */}
              <div style={{
                background: C.blueTint, borderRadius: 20, padding: "20px 24px",
                border: `2px solid ${C.borderBlue}`, width: "100%",
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 12, letterSpacing: 0.5 }}>YOUR PROFILE</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", color: C.gold, fontWeight: 800, fontSize: 16 }}>S</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.navy }}>Student, Grade 10</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>Needs Math help · Evenings · Budget $30/hr</div>
                  </div>
                </div>
              </div>

              {/* Arrow down */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 2, height: 20, background: C.gold }} />
                <SparkleIcon size={22} />
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Matching in progress...</div>
                <div style={{ width: 2, height: 20, background: C.gold }} />
              </div>

              {/* Matched tutor card */}
              <div style={{
                background: C.goldPale, borderRadius: 20, padding: "20px 24px",
                border: `2px solid ${C.gold}44`, width: "100%",
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, marginBottom: 12, letterSpacing: 0.5 }}>PERFECT MATCH</div>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#E8F4FD", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: C.navy }}>PS</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.navy }}>Priya Sharma</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>Math · India · 98% match · ₹500/hr</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  {["Goals match", "Schedule fits", "Budget ok", "Language: English"].map(tag => (
                    <span key={tag} style={{ background: C.white, color: C.navy, borderRadius: 100, padding: "3px 10px", fontSize: 10, fontWeight: 600, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 4 }}>
                      <CheckIcon size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 8 — VERIFIED TUTOR ECOSYSTEM
          ──────────────────────────────────────── */}
      <section style={{ background: C.blueTint, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>Trust First</div>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, lineHeight: 1.2, margin: 0 }}>
                Every Tutor is{" "}
                <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Verified.</span>{" "}
                Every Time.
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                We don&apos;t just check boxes. Every tutor goes through a rigorous multi-stage vetting process designed by education experts — because your trust is everything.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {verificationSteps.map(({ icon, title, desc }) => (
                  <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: C.navy, color: C.gold,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>{icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{title}</div>
                      <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div style={{ position: "relative" }}>
              <svg viewBox="0 0 520 520" style={{ width: "100%", display: "block" }}>
                <defs>
                  <clipPath id="s8clip">
                    <path d="M280,20 C400,15 510,110 500,240 C490,370 380,490 240,490 C100,490 10,380 20,250 C30,120 160,25 280,20Z" />
                  </clipPath>
                  <linearGradient id="s8bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={C.blueTint} />
                    <stop offset="100%" stopColor={C.goldPale} />
                  </linearGradient>
                </defs>
                <path d="M280,20 C400,15 510,110 500,240 C490,370 380,490 240,490 C100,490 10,380 20,250 C30,120 160,25 280,20Z" fill="url(#s8bg)" />
                <image href="/images/m2s8.png" x="20" y="20" width="480" height="480" clipPath="url(#s8clip)" preserveAspectRatio="xMidYMid slice" />
              </svg>
              {/* Badge overlay */}
              <div style={{
                position: "absolute", bottom: "8%", right: "-4%",
                background: C.navy, borderRadius: 20, padding: "16px 20px",
                boxShadow: "0 12px 40px rgba(27,45,91,0.2)",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ShieldIcon size={20} />
                </div>
                <div>
                  <div style={{ color: C.white, fontWeight: 800, fontSize: 14 }}>Verified Tutor</div>
                  <div style={{ color: "#ffffff77", fontSize: 11 }}>6-stage vetting process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={"#F0EBE0"} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 9 — GLOBAL NETWORK
          ──────────────────────────────────────── */}
      <section style={{ background: "#F0EBE0", paddingTop: 80, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Global Network</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Learning Has No{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Borders</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
              Students and tutors from every corner of the world, connected by a shared love of learning.
            </p>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 48 }}>
            {[["50,000+", "Tutors Worldwide"], ["120+", "Subjects"], ["24/7", "Availability"], ["100+", "Countries"], ["1M+", "Sessions"]].map(([val, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: C.navy, fontFamily: "'Caveat', cursive" }}>{val}</div>
                <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Image naturally blended */}
          <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
            <img
              src="/images/m2s9.png"
              alt="Global tutoring network"
              style={{
                width: "100%",
                display: "block",
                borderRadius: 32,
                boxShadow: "0 24px 64px rgba(27,45,91,0.1)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 10 — SUCCESS STORIES
          ──────────────────────────────────────── */}
      <section style={{ background: C.white, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Success Stories</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Real Students,{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Real Results.</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
              Not testimonials. These are journeys — before, after, and everything in between.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {successStories.map(s => (
              <div key={s.name} style={{
                background: C.white, borderRadius: 24,
                border: `1.5px solid ${C.border}`,
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(27,45,91,0.07)",
                display: "flex", flexDirection: "column",
              }}>
                {/* Top banner */}
                <div style={{ background: s.color, padding: "24px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: C.white, display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 20, color: C.navy, border: `2.5px solid ${C.gold}`,
                  }}>{s.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: C.navy }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{s.age}</div>
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
                  <div style={{ background: "#FEF2F2", borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#EF4444", letterSpacing: 1, marginBottom: 6 }}>BEFORE</div>
                    <div style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>{s.before}</div>
                  </div>
                  <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px 16px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", letterSpacing: 1, marginBottom: 6 }}>AFTER</div>
                    <div style={{ fontSize: 13, color: "#14532D", lineHeight: 1.6 }}>{s.after}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 4 }}>
                    <div style={{ fontSize: 12, color: C.textMuted }}>
                      Tutor: <strong style={{ color: C.navy }}>{s.tutor}</strong>
                    </div>
                    <span style={{ background: C.goldPale, color: C.navy, borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700, border: `1px solid ${C.gold}44` }}>
                      {s.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider color={C.beige} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 11 — FOR TUTORS
          ──────────────────────────────────────── */}
      <section style={{ background: C.beige, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase" }}>For Tutors</div>
              <h2 style={{ fontSize: "clamp(32px, 3.5vw, 52px)", fontWeight: 900, color: C.navy, lineHeight: 1.15, margin: 0 }}>
                <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Teach.</span>{" "}
                Earn.{" "}
                <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Grow.</span>
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.8, margin: 0 }}>
                Join thousands of educators building meaningful, flexible careers on OneCent Tutors. Your knowledge is a business — we give you the platform.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {tutorBenefits.map(({ icon, title, desc }) => (
                  <div key={title} style={{
                    background: C.white, borderRadius: 16, padding: "16px",
                    border: `1.5px solid ${C.border}`,
                    boxShadow: "0 2px 8px rgba(27,45,91,0.05)",
                  }}>
                    <div style={{ color: C.navy, marginBottom: 10 }}>{icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.navy }}>{title}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button style={{
                  background: C.navy, color: C.white, border: "none",
                  borderRadius: 14, padding: "16px 32px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: "var(--font-geist-sans)",
                  boxShadow: `0 8px 32px ${C.navy}44`,
                }}>
                  Become a Tutor
                </button>
                <button style={{
                  background: "transparent", color: C.navy,
                  border: `2px solid ${C.navy}`, borderRadius: 14,
                  padding: "14px 24px", fontSize: 15, fontWeight: 700,
                  cursor: "pointer", fontFamily: "var(--font-geist-sans)",
                }}>
                  Learn More
                </button>
              </div>
            </div>

            {/* Visual */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Income card */}
              <div style={{
                background: C.navy, borderRadius: 24, padding: "28px",
                boxShadow: "0 20px 60px rgba(27,45,91,0.2)",
              }}>
                <div style={{ color: "#ffffff77", fontSize: 13, marginBottom: 8 }}>Monthly Earnings</div>
                <div style={{ color: C.gold, fontSize: 36, fontWeight: 900, fontFamily: "'Caveat', cursive" }}>₹62,400</div>
                <div style={{ color: "#ffffff55", fontSize: 12, marginTop: 4 }}>Based on 3 sessions/day · 5 days/week</div>
                {/* Simple bar chart */}
                <div style={{ display: "flex", gap: 6, alignItems: "flex-end", marginTop: 20, height: 60 }}>
                  {[40, 55, 48, 72, 60, 85, 78].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? C.gold : "rgba(255,255,255,0.2)", borderRadius: "4px 4px 0 0" }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#ffffff55" }}>{d}</span>
                  ))}
                </div>
              </div>
              {/* Student reach */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { label: "Active Students", value: "24", icon: <UsersIcon size={18} />, bg: C.white },
                  { label: "Countries Reached", value: "8", icon: <GlobeIcon size={18} />, bg: C.goldPale },
                  { label: "Avg Rating", value: "4.9", icon: <StarIcon size={18} filled />, bg: C.blueTint },
                  { label: "Hours Taught", value: "340", icon: <ClockIcon size={18} />, bg: C.white },
                ].map(({ label, value, icon, bg }) => (
                  <div key={label} style={{
                    background: bg, borderRadius: 16, padding: "16px",
                    border: `1.5px solid ${C.border}`,
                    display: "flex", flexDirection: "column", gap: 8,
                  }}>
                    <div style={{ color: C.navy }}>{icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 22, color: C.navy }}>{value}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={C.blueTint} />
      </section>

      {/* ────────────────────────────────────────
          SECTION 12 — PLATFORM PREVIEW
          ──────────────────────────────────────── */}
      <section style={{ background: C.blueTint, paddingTop: 80, paddingBottom: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 80px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>The Dashboard</div>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: C.navy, margin: 0 }}>
              Everything in One{" "}
              <span style={{ fontFamily: "'Caveat', cursive", color: C.gold }}>Beautiful Place</span>
            </h2>
            <p style={{ fontSize: 16, color: C.textMuted, marginTop: 14, maxWidth: 500, margin: "14px auto 0" }}>
              A clean, focused dashboard that puts your learning — or your teaching — front and center.
            </p>
          </div>
          <PlatformPreview />
        </div>
        <WaveDivider color={C.navy} />
      </section>

      {/* ────────────────────────────────────────
          FINAL CTA
          ──────────────────────────────────────── */}
      <section style={{
        background: C.navy, paddingTop: 100, paddingBottom: 100,
        position: "relative", overflow: "hidden",
      }}>
        {/* Background decoration */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: -80,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Doodle stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} filled />)}
          </div>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 900, color: C.white, lineHeight: 1.15, margin: 0 }}>
            Every Great Learner Starts With the{" "}
            <span style={{ fontFamily: "'Caveat', cursive", color: C.gold, fontSize: "1.05em" }}>Right Teacher.</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginTop: 22, lineHeight: 1.7 }}>
            Join thousands of students and educators building meaningful learning journeys through OneCent Tutors.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <button style={{
              background: C.gold, color: C.navy, border: "none",
              borderRadius: 14, padding: "18px 36px", fontSize: 16, fontWeight: 800,
              cursor: "pointer", fontFamily: "var(--font-geist-sans)",
              boxShadow: `0 8px 32px ${C.gold}55`,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              Explore Tutors <ArrowIcon />
            </button>
            <button style={{
              background: "rgba(255,255,255,0.1)", color: C.white,
              border: "2px solid rgba(255,255,255,0.3)", borderRadius: 14,
              padding: "16px 32px", fontSize: 16, fontWeight: 700,
              cursor: "pointer", fontFamily: "var(--font-geist-sans)",
              backdropFilter: "blur(4px)",
            }}>
              Book Trial Session
            </button>
            <button style={{
              background: "transparent", color: "rgba(255,255,255,0.6)",
              border: "2px solid rgba(255,255,255,0.15)", borderRadius: 14,
              padding: "16px 32px", fontSize: 16, fontWeight: 600,
              cursor: "pointer", fontFamily: "var(--font-geist-sans)",
            }}>
              Open Tutor Dashboard
            </button>
          </div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 24 }}>
            No credit card required for trial sessions. Cancel anytime.
          </p>
        </div>
      </section>

      {/* CSS animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
        @keyframes float1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        * { box-sizing: border-box; }
        input::placeholder { color: #9CA3AF; }
      `}</style>
    </main>
  );
}