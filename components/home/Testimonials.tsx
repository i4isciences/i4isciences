"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Star,
  Building2,
  TrendingUp,
  Quote,
  Lightbulb,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

// Simplified background doodles - reduced quantity for a minimal feel
const BackgroundDoodles = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      {/* Top Left */}
      <motion.div
        className="absolute top-1/4 left-[10%] rotate-[-15deg] text-blue-300"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star size={24} className="fill-blue-200" />
      </motion.div>
      <div className="absolute top-[35%] left-[18%]">
        <svg width="60" height="60" viewBox="0 0 100 100" className="text-gray-200 stroke-current">
          <path d="M 10 10 L 90 90 M 10 90 L 90 10" strokeWidth="3" fill="none" />
        </svg>
      </div>

      {/* Top Right */}
      <motion.div
        className="absolute top-1/4 right-[10%] rotate-[10deg] text-yellow-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={28} />
      </motion.div>
      <div className="absolute top-[40%] right-[15%]">
        <Heart size={20} className="text-pink-200 fill-pink-100" />
      </div>

      {/* Bottom Left */}
      <motion.div
        className="absolute bottom-[30%] left-[8%] text-amber-300"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <Lightbulb size={24} />
      </motion.div>
      <div className="absolute bottom-[20%] left-[15%] opacity-20">
        <svg width="40" height="40" viewBox="0 0 100 100" className="text-blue-100 stroke-current">
          <circle cx="50" cy="50" r="40" strokeWidth="3" fill="none" strokeDasharray="10 5" />
        </svg>
      </div>

      {/* Bottom Right */}
      <div className="absolute bottom-[35%] right-[12%] text-blue-200">
        <MessageCircle size={24} />
      </div>
      <motion.div
        className="absolute bottom-[20%] right-[8%] text-gray-200"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="50" height="30" viewBox="0 0 100 50" className="stroke-current">
          <path d="M 10 25 L 90 25 M 70 10 L 90 25 L 70 40" strokeWidth="3" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
};

// Playful card element decorations (like in the image)
const PlayfulCardDecorations = () => {
  return (
    <>
      <div className="absolute -top-3 -right-3 text-amber-400 rotate-12">
        <Sparkles size={20} />
      </div>
      <div className="absolute -bottom-2 -left-2 text-blue-300 -rotate-12">
        <Star size={16} />
      </div>
      <div className="absolute top-[60%] -left-6 transform -translate-y-1/2 text-gray-200">
        <svg width="30" height="60" viewBox="0 0 50 100" className="stroke-current opacity-30">
          <path d="M 40 10 C 10 40, 10 60, 40 90" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-200">
        <svg width="30" height="60" viewBox="0 0 50 100" className="stroke-current opacity-30">
          <path d="M 10 10 C 40 40, 40 60, 10 90" strokeWidth="2" fill="none" />
        </svg>
      </div>
    </>
  );
};

// Integrated data set to prevent empty page elements and save total layout space
const testimonials = [
  {
    name: "The Amara Family",
    role: "Immigrant Parent Community",
    country: "Toronto",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&h=250&fit=crop",
    quote:
      "The platform helped our children adapt to a completely new education system within weeks. Through multilingual onboarding and AI-guided pathways, we transitioned confidently.",
    tag: "Featured Family Story",
  },
  {
    name: "Sophia Williams",
    role: "International Student",
    country: "Canada",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&h=250&fit=crop",
    quote:
      "The AI learning pathways completely transformed how I study. Everything feels personalized and motivating, matching my exact learning speed.",
    tag: "Student Spotlight",
  },
  {
    name: "Daniel Carter",
    role: "Certified Tutor",
    country: "United States",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&h=250&fit=crop",
    quote:
      "The platform helped me build a global tutoring career with intelligent student matching, real-time feedback systems, and powerful engagement analytics.",
    tag: "Educator Milestone",
  },
];

const institutions = [
  "Global Learning Academy",
  "Future Scholars Network",
  "International Education Alliance",
  "North America Learning Council",
  "AI Education Consortium",
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000); // Rolls every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] to-[#F7FAFF] py-20 md:py-24">
      {/* MINIMAL BACKGROUND DECORATIONS (Doodles reduced and styled) */}
      <BackgroundDoodles />

      {/* Primary blobs from original code */}
      <div className="absolute left-[-150px] top-[10%] h-[400px] w-[400px] rounded-full bg-[#BFE3FF]/20 blur-3xl z-0" />
      <div className="absolute right-[-150px] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#F5A623]/10 blur-3xl z-0" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* COMPACT HEADER */}
        <div className="mx-auto mb-16 max-w-[750px] text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DDE8FF] bg-white/70 px-5 py-2 backdrop-blur-xl">
            <Sparkles size={16} className="text-[#F5A623]" />
            <span className="text-sm font-bold tracking-wide text-[#0A2E8A]">
              GLOBAL IMPACT
            </span>
          </div>
          <h2 className="text-5xl font-[800] tracking-[-0.04em] text-[#10204E] md:text-6xl leading-[1.1]">
            Transforming Learning{" "}
            <span className="relative inline-block text-[#F5A623]">
              Across Generations
              <svg
                viewBox="0 0 300 20"
                className="absolute -bottom-3 left-0 w-full h-auto text-[#F5A623]/30"
                preserveAspectRatio="none"
              >
                <path
                  d="M10,10 C50,0 150,20 290,10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* COMPACT AUTO-ROLLING ROW HERO WITH PLAYFUL STYLING */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative group overflow-visible rounded-[32px] border border-white/90 bg-white/80 p-8 shadow-[0_20px_60px_rgba(10,46,138,0.08)] backdrop-blur-xl md:p-12"
            >
              {/* Playful elements around the card */}
              <PlayfulCardDecorations />

              <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                {/* LEFT SIDE: AVATAR & METADATA */}
                <div className="flex items-center gap-6 min-w-[280px]">
                  <div className="relative h-20 w-20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {/* Playful outline around image */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#BFE3FF] scale-110" />
                    <img
  src={current.image}
  alt={current.name}
  className="h-full w-full rounded-full object-cover shadow-inner z-10 relative"
  loading="lazy"
/>
                  </div>
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-[#EEF4FF] px-4 py-1 text-xs font-bold text-[#0A2E8A] border border-[#DDE8FF]">
                      {current.tag}
                    </span>
                    <h4 className="text-xl font-bold text-[#10204E]">
                      {current.name}
                    </h4>
                    <p className="text-sm text-[#6073A2]">{current.role}</p>
                  </div>
                </div>

                {/* CENTER: SINGLE ROW QUOTE */}
                <div className="flex-1 relative md:border-l md:border-gray-100 md:pl-8">
                  {/* Playful quote icons */}
                  <Quote
                    size={28}
                    className="absolute -top-6 -left-3 text-[#BFE3FF] rotate-[-10deg] opacity-60"
                  />
                  <p className="text-lg leading-8 text-[#4B5E92] md:text-xl font-medium relative z-10 italic">
                    “{current.quote}”
                  </p>
                </div>

                {/* RIGHT SIDE: SCORE & GEOGRAPHY */}
                <div className="flex flex-row items-center gap-5 justify-between w-full border-t border-gray-100 pt-6 md:w-auto md:flex-col md:border-none md:pt-0 md:items-end">
                  <div className="flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-[#F5A623] text-[#F5A623]"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[#0A2E8A] bg-white border border-[#DDE8FF] rounded-full px-4 py-1.5 shadow-sm">
                    <Globe size={16} />
                    <span className="text-sm font-semibold">
                      {current.country}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* NAVIGATION DOTS */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ease-out ${
                currentIndex === index
                  ? "w-8 bg-[#0A2E8A]"
                  : "w-3 bg-[#DDE8FF] hover:bg-[#BFE3FF]"
              }`}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* INFINITE MARQUEE ROW (Reduced whitespace and refined) */}
        <div className="relative mt-20 overflow-hidden py-6 border-y border-gray-100 bg-white/40 backdrop-blur-sm rounded-xl">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#F7FAFF] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#F7FAFF] to-transparent" />

          <motion.div
            className="flex gap-16 whitespace-nowrap w-max"
            animate={{ x: [0, -1000] }}
            transition={{
              ease: "linear",
              duration: 28,
              repeat: Infinity,
            }}
          >
            {[...institutions, ...institutions].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-base font-semibold text-[#4B5E92] hover:text-[#0A2E8A] transition-colors"
              >
                <div className="bg-[#EEF4FF] p-2 rounded-lg border border-[#DDE8FF]">
                  <Building2 size={20} className="text-[#0A2E8A]" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* COMPACT MINIMAL CTA BANNER (Playful gradient and borders) */}
        <div className="relative mt-20 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0A2E8A] via-[#123FAE] to-[#123FAE] p-1 px-8 py-12 text-center md:px-16 shadow-lg">
          {/* Subtle glowing outline effect */}
          <div className="absolute inset-0 rounded-[32px] border-4 border-white/5 opacity-50" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row lg:text-left">
            <div className="max-w-[700px]">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-white border border-white/10">
                <TrendingUp size={14} className="text-[#F5A623]" />
                <span className="text-xs font-bold tracking-wide">
                  GLOBAL IMPACT
                </span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl leading-tight">
                Empowering The Next Generation Through Intelligent Education
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-base font-bold text-[#0A2E8A] shadow-md transition-all hover:scale-[1.03] hover:shadow-lg active:scale-95"
              >
                Explore
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="/contact"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:scale-[1.03] hover:bg-white/20 active:scale-95"
              >
                Book Demo
              </a>
            </div>
          </div>

          {/* Very minimal, abstract shapes inside the dark banner for texture */}
          <div className="absolute top-0 right-1/4 h-20 w-20 rounded-full bg-white/5 blur-xl" />
          <div className="absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        </div>
      </div>
    </section>
  );
}