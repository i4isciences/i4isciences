"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  GraduationCap,
  Rocket,
  BadgeCheck,
  BarChart3,
  Users,
  ArrowRight,
  Sparkles,
  Video,
  Mic2,
  DollarSign,
} from "lucide-react";

const studentJourney = [
  { title: "Discover", desc: "Explore personalized AI Paths.", icon: Rocket },
  { title: "AI Path", desc: "Adaptive algorithms build tracks.", icon: Brain },
  { title: "Live Tutoring", desc: "Instantly connect with tutors.", icon: Video },
  { title: "Analytics", desc: "Monitor assessment metrics.", icon: BarChart3 },
  { title: "Certify", desc: "Earn digital evaluations.", icon: BadgeCheck },
];

const tutorJourney = [
  { title: "Apply", desc: "Build your educator profile seamlessly.", icon: GraduationCap },
  { title: "AI Screening", desc: "Complete interactive evaluations.", icon: Mic2 },
  { title: "Train", desc: "Unlock premium enablement modules.", icon: BadgeCheck },
  { title: "Match", desc: "Get paired with matched students.", icon: Users },
  { title: "Grow", desc: "Track performance and revenues.", icon: DollarSign },
];

export default function JourneyTimeline() {
  const [role, setRole] = useState<"student" | "tutor">("student");
  const currentJourney = role === "student" ? studentJourney : tutorJourney;
  const accentColor = role === "student" ? "#0A2E8A" : "#F5A623";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFF] to-[#EDF4FF] py-24">
      {/* Background Blurs */}
      <div className="absolute left-[-200px] top-[120px] h-[500px] w-[500px] rounded-full bg-[#BFE3FF]/30 blur-3xl" />
      <div className="absolute right-[-150px] bottom-[50px] h-[450px] w-[450px] rounded-full bg-[#F5A623]/5 blur-3xl" />

      <div className="relative z-20 mx-auto max-w-6xl px-6 text-center">
        {/* Header */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6E5FF] bg-white/80 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles size={14} className="text-[#F5A623]" />
          <span className="text-xs font-semibold tracking-wider text-[#0A2E8A]">THE ECOSYSTEM</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight text-[#10204E] md:text-5xl">
          Your Path, <span style={{ color: accentColor }} className="transition-colors duration-300">Intelligently Mapped</span>
        </h2>

        {/* Tab Buttons Toggle */}
        <div className="mt-10 inline-flex rounded-full bg-[#E5EEFF] p-1.5">
          <button
            onClick={() => setRole("student")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
              role === "student" ? "bg-[#0A2E8A] text-white shadow-md" : "text-[#4B5E92] hover:text-[#0A2E8A]"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setRole("tutor")}
            className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
              role === "tutor" ? "bg-[#F5A623] text-white shadow-md" : "text-[#4B5E92] hover:text-[#F5A623]"
            }`}
          >
            Tutors
          </button>
        </div>

        {/* --- Curvy Desktop Journey Path Container --- */}
        <div className="relative mx-auto mb-20 mt-28 hidden max-w-5xl lg:block h-[320px]">
          {/* Base SVG Path */}
          <svg viewBox="0 0 1000 160" fill="none" className="absolute left-0 top-1/2 w-full -translate-y-1/2 overflow-visible">
            {/* Background Path Track */}
            <path d="M 50 80 Q 275 -10, 500 80 T 950 80" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            
            {/* Animated Tracer Line Path */}
            <motion.path
              key={`${role}-curve`}
              d="M 50 80 Q 275 -10, 500 80 T 950 80"
              stroke={accentColor}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />

            {/* Step Node Tracer Circles */}
            {[0, 1, 2, 3, 4].map((index) => {
              const x = 50 + index * 225;
              const y = index === 0 || index === 4 ? 80 : index === 1 ? 40 : index === 2 ? 80 : 120;

              return (
                <g key={index}>
                  <motion.circle
                    key={`${role}-dot-${index}`}
                    cx={x}
                    cy={y}
                    r="8"
                    fill={accentColor}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.25, duration: 0.3 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="16"
                    stroke={accentColor}
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: [0.4, 0], scale: [1, 1.8] }}
                    transition={{ delay: index * 0.25, repeat: Infinity, duration: 2 }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Absolute-Positioned Floating Cards */}
          <AnimatePresence mode="wait">
            {currentJourney.map((step, index) => {
              const Icon = step.icon;
              
              // Calculate positioning percentages relative to the container frame
              const leftPercent = `${5 + index * 22.5}%`;
              
              // Alternates card offsets cleanly above or below the node heights 
              // Node 0: Center-ish, Node 1: High up, Node 2: Center, Node 3: Low down, Node 4: Center-ish
              const topPositions = ["60%", "-20%", "60%", "10%", "65%"];
              const topPercent = topPositions[index];

              return (
                <motion.div
                  key={`${role}-${index}`}
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -15 }}
                  transition={{ delay: index * 0.2, duration: 0.4, ease: "easeOut" }}
                  className="absolute w-[180px] -translate-x-1/2 text-left"
                  style={{ left: leftPercent, top: topPercent }}
                >
                  <div className="relative rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="absolute right-3 top-3 text-[10px] font-black text-slate-300">0{index + 1}</div>
                    
                    <div
                      className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Icon size={16} />
                    </div>
                    <h4 className="mb-1 text-sm font-bold text-[#10204E] truncate">{step.title}</h4>
                    <p className="text-[11px] leading-relaxed text-[#4B5E92] line-clamp-2">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* --- Responsive Fallback Mobile Grid (sm/md screens) --- */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:hidden text-left">
          <AnimatePresence mode="wait">
            {currentJourney.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={`mobile-${role}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="relative rounded-2xl border border-white/60 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
                >
                  <div className="absolute right-4 top-4 text-xs font-black text-slate-300">0{index + 1}</div>
                  <div
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-[#10204E]">{step.title}</h4>
                  <p className="text-xs leading-relaxed text-[#4B5E92]">{step.desc}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Simplistic CTA */}
        <motion.div layout className="mt-20 rounded-3xl border border-white/80 bg-white/40 p-12 shadow-sm backdrop-blur-sm">
          <h3 className="mx-auto max-w-2xl text-2xl font-bold text-[#10204E] sm:text-3xl">
            Empowering Next-Gen Ecosystem Infrastructure
          </h3>
          <a
            href="#"
            className="group mt-6 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
            style={{ backgroundColor: "#0A2E8A" }}
          >
            Explore Ecosystem
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}