"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2
} from "lucide-react";

const partnershipTargets = [
  {
    id: "schools",
    title: "Schools",
    icon: Building2,
    badge: "K-12 & Secondary",
    tagline: "Empower classrooms with next-generation infrastructure.",
    benefits: [
      "AI-driven localized curriculum pathways",
      "Automated diagnostic grading and workload reduction",
      "Real-time student progress & retention analytics"
    ],
    accentGlow: "from-[#BFE3FF]/20 to-transparent"
  },
  {
    id: "universities",
    title: "Universities",
    icon: GraduationCap,
    badge: "Higher Education",
    tagline: "Bridge institutional academia and global employment scales.",
    benefits: [
      "Credit-backed global course interoperability",
      "Advanced research-matching matching engines",
      "Instant multi-jurisdictional verification networks"
    ],
    accentGlow: "from-[#0A2E8A]/5 to-transparent"
  },
  {
    id: "ngos",
    title: "NGOs",
    icon: HeartHandshake,
    badge: "Social Impact Organizations",
    tagline: "Deploy accessible high-tier education where it's needed most.",
    benefits: [
      "Fully functional offline-first learning modules",
      "Granular real-time grant impact tracking structures",
      "Multilingual dialect onboarding and localized scaling"
    ],
    accentGlow: "from-[#F5A623]/10 to-transparent"
  },
  {
    id: "governments",
    title: "Governments",
    icon: ShieldCheck,
    badge: "Ministries & Public Sector",
    tagline: "Build foundational national frameworks for human capital.",
    benefits: [
      "GDPR & strict multi-regional data sovereignty compliance",
      "Socio-economic labor workforce analysis reports",
      "Mass scale upskilling architectures for citizens"
    ],
    accentGlow: "from-[#4DA8FF]/10 to-transparent"
  },
  {
    id: "immigration",
    title: "Immigration Support Orgs",
    icon: Globe2,
    badge: "Settle & Adapt",
    tagline: "Accelerate domestic economic assimilation seamlessly.",
    benefits: [
      "Instant rapid foreign credential alignment",
      "Adaptive structural language training engines",
      "Regional community mentorship pipeline integration"
    ],
    accentGlow: "from-[#BFE3FF]/30 to-transparent"
  }
];

export default function EnterprisePartnershipSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through partnership segments unless hovered by user
  useEffect(() => {
    if (!isHovered) {
      autoPlayTimer.current = setInterval(() => {
        setActiveTab((prev) => (prev + 1) % partnershipTargets.length);
      }, 6000); // Transitions smoothly every 6 seconds
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isHovered]);

  const activeTarget = partnershipTargets[activeTab];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFF] to-[#FFFFFF] py-20 md:py-28"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* CREATIVE BACKGROUND ELEMENTS */}
      <div className="absolute right-[-150px] top-[10%] h-[500px] w-[500px] rounded-full bg-[#BFE3FF]/25 blur-[120px] pointer-events-none" />
      <div className="absolute left-[-150px] bottom-[10%] h-[500px] w-[500px] rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />
      
      {/* DIGITAL MESH PATTERN */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0A2E8A 1.5px, transparent 1.5px), linear-gradient(to right, #0A2E8A 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1400px] px-6 lg:px-16">
        
        {/* SECTION HEADER */}
        <div className="mx-auto mb-16 max-w-[800px] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DDE8FF] bg-white/80 px-4 py-1.5 backdrop-blur-xl shadow-sm"
          >
            <Sparkles size={14} className="text-[#F5A623]" />
            <span className="text-xs font-bold tracking-wider text-[#0A2E8A]">INSTITUTIONAL ECOSYSTEM</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-[800] tracking-[-0.03em] text-[#10204E] md:text-5xl lg:text-6xl"
          >
            <span>Scale Intelligent Learning</span>
            <span className="block text-[#0A2E8A] mt-1">As an Enterprise Partner</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg leading-8 text-[#4B5E92]"
          >
            We align with global entities to build robust local infrastructure, reduce structural barriers, and distribute validated learning outcomes.
          </motion.p>
        </div>

        {/* INTERACTIVE HUB CONSOLE */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          
          {/* LEFT COLUMN: INTERACTIVE TABS MENU (5 cols) */}
          <div className="flex flex-col justify-center gap-3 lg:col-span-5">
            {partnershipTargets.map((target, idx) => {
              const TargetIcon = target.icon;
              const isSelected = activeTab === idx;

              return (
                <button
                  key={target.id}
                  onClick={() => setActiveTab(idx)}
                  className="relative text-left w-full transition-all duration-300 group"
                >
                  <div className={`
                    relative z-10 flex items-center gap-5 px-6 py-4.5 rounded-[22px] border transition-all duration-300
                    ${isSelected 
                      ? "bg-white border-[#DDE8FF] shadow-[0_10px_30px_rgba(10,46,138,0.06)]" 
                      : "bg-white/40 border-transparent hover:bg-white/70 hover:border-gray-200"
                    }
                  `}>
                    
                    {/* ICON CONSOLE */}
                    <div className={`
                      flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300
                      ${isSelected 
                        ? "bg-[#0A2E8A] text-white shadow-md shadow-[#0A2E8A]/20" 
                        : "bg-[#EEF4FF] text-[#0A2E8A] group-hover:bg-[#0A2E8A] group-hover:text-white"
                      }
                    `}>
                      <TargetIcon size={22} className="transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    {/* LABEL CONTENT */}
                    <div className="flex-1">
                      <p className={`text-xs font-bold tracking-wide uppercase transition-colors ${isSelected ? "text-[#F5A623]" : "text-[#6073A2]"}`}>
                        {target.badge}
                      </p>
                      <h4 className="text-xl font-[700] text-[#10204E] mt-0.5">
                        {target.title}
                      </h4>
                    </div>

                    {/* INTERACTIVE ACTIVE INDICATOR BLOCK */}
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute right-4 h-2 w-2 rounded-full bg-[#0A2E8A]" 
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: COHESIVE VALUE PROPOSITION DISPLAYER (7 cols) */}
          <div className="relative flex lg:col-span-7">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E8A]/[0.02] to-transparent rounded-[32px] border border-white/60 pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTarget.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="
                  relative flex flex-col justify-between w-full rounded-[32px] 
                  border border-white bg-white/80 p-8 md:p-12 
                  shadow-[0_20px_50px_rgba(10,46,138,0.04)] backdrop-blur-xl overflow-hidden
                "
              >
                {/* DYNAMIC AMBIENT BACKDROP ACCENT */}
                <div className={`absolute top-0 right-0 h-48 w-48 rounded-full bg-gradient-to-bl ${activeTarget.accentGlow} blur-2xl pointer-events-none`} />

                {/* HUB CONTENT TOP */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-[#EEF4FF] px-3 py-1 text-xs font-bold text-[#0A2E8A]">
                    <Layers size={12} />
                    {activeTarget.badge.toUpperCase()}
                  </div>

                  <h3 className="mt-5 text-2xl font-[800] tracking-tight text-[#10204E] md:text-3xl">
                    Tailored Frameworks for {activeTarget.title}
                  </h3>
                  
                  <p className="mt-3 text-base text-[#4B5E92] font-medium leading-relaxed">
                    {activeTarget.tagline}
                  </p>

                  <div className="mt-8 h-[1px] w-full bg-gray-100" />

                  {/* VALUE LIST INTEGRATION */}
                  <div className="mt-8 space-y-4">
                    {activeTarget.benefits.map((benefit, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-start gap-3.5"
                      >
                        <CheckCircle2 size={18} className="text-[#F5A623] mt-1 flex-shrink-0" />
                        <span className="text-base font-medium leading-7 text-[#4B5E92]">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* BOTTOM CTA ACTIONS SEGMENT */}
                <div className="mt-12 pt-6 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="text-left">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#6073A2]">Ready to integrate?</p>
                    <p className="text-sm font-semibold text-[#10204E]">Deploy deployment in as fast as 14 business days.</p>
                  </div>
                  
                  <a
                    href="#partner-form"
                    className="
                      group inline-flex items-center justify-center gap-3 rounded-full bg-[#0A2E8A] 
                      px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#0A2E8A]/15
                      transition-all duration-300 hover:bg-[#123FAE] hover:scale-[1.02] hover:shadow-[#0A2E8A]/25
                    "
                  >
                    Partner With Us
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}