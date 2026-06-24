"use client";

import { motion, type Variants } from "framer-motion";
import { 
  Sparkles, 
  Calendar, 
  Handshake, 
  Cpu, 
  ArrowUpRight 
} from "lucide-react";

export default function FinalCTASection() {
  // Pencil Drawing Animation Settings
  const pencilVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        // Framer Motion expects easing as an array or function, not a string
        ease: [0.42, 0, 0.58, 1],
        delay: 0.2,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-24 md:py-36">
      
      {/* BACKGROUND GRAPHICS & AMBIENT GLOWS */}
      <div className="absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#BFE3FF]/20 to-[#F5A623]/5 blur-[140px] pointer-events-none" />
      
      {/* TECHNICAL GRID STRUCTURE */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0A2E8A 1.5px, transparent 1.5px), linear-gradient(to right, #0A2E8A 1.5px, transparent 1.5px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-20 mx-auto max-w-[1300px] px-6 text-center">
        
        {/* COMPACT TOP BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#DDE8FF] bg-[#F7FAFF] px-4 py-1.5 shadow-sm"
        >
          <Sparkles size={14} className="text-[#F5A623]" />
          <span className="text-xs font-bold tracking-widest text-[#0A2E8A] uppercase">SHAPING THE FUTURE</span>
        </motion.div>

        {/* HEADING WITH ANIMATED PENCIL DOODLE LAYOUT */}
        <div className="relative mx-auto mb-14 max-w-[1050px]">
          <h2 className="relative z-10 text-4xl font-[900] tracking-[-0.04em] text-[#10204E] sm:text-6xl md:text-4xl lg:text-7xl leading-[1.05]">
            Transform Education <br />
            Globally With{" "}
            <span className="relative inline-block whitespace-nowrap text-[#0A2E8A]">
              AI
              {/* THE PENCIL DOODLE UNDERLINE */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-[25px] overflow-visible"
                viewBox="0 0 200 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M5 12C45 4 125 3 195 10C135 13 65 14 15 17C60 14 130 11 185 15"
                  stroke="#F5A623"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pencilVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* CONCISE SUB-TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-[680px] text-lg md:text-xl font-medium leading-8 text-[#4B5E92]"
        >
          Join thousands of institutions, developers, and global frameworks deploying hyper-personalized, ultra-scalable educational infrastructure.
        </motion.p>

        {/* THREE POWERFUL CTA BUTTONS MATRIX */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row"
        >
          
          {/* PRIMARY BUTTON: SCHEDULE DEMO */}
          <a
            href="#schedule-demo"
            className="
              group flex w-full items-center justify-center gap-3 rounded-full bg-[#0A2E8A] 
              px-10 py-5 text-lg font-bold text-white shadow-xl shadow-[#0A2E8A]/15
              transition-all duration-300 hover:bg-[#123FAE] hover:scale-[1.03] hover:shadow-[#0A2E8A]/25 sm:w-auto
            "
          >
            <Calendar size={18} className="text-[#BFE3FF]" />
            Schedule Demo
            <ArrowUpRight size={16} className="opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* SECONDARY BUTTON: BECOME PARTNER */}
          <a
            href="#become-partner"
            className="
              group flex w-full items-center justify-center gap-3 rounded-full border border-[#DDE8FF] bg-white 
              px-10 py-5 text-lg font-bold text-[#10204E] shadow-sm
              transition-all duration-300 hover:bg-[#F7FAFF] hover:border-gray-300 hover:scale-[1.03] sm:w-auto
            "
          >
            <Handshake size={18} className="text-[#0A2E8A]" />
            Become Partner
          </a>

          {/* TERTIARY BUTTON: EXPLORE MODELS */}
          <a
            href="#explore-models"
            className="
              group flex w-full items-center justify-center gap-3 rounded-full border border-transparent bg-[#EEF4FF] 
              px-10 py-5 text-lg font-bold text-[#0A2E8A]
              transition-all duration-300 hover:bg-[#DEEAFF] hover:scale-[1.03] sm:w-auto
            "
          >
            <Cpu size={18} className="text-[#0A2E8A]" />
            Explore Models
          </a>

        </motion.div>

        {/* METRICS DISPLAYER ROW */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mt-24 grid max-w-[800px] grid-cols-2 gap-8 border-t border-gray-100 pt-10 md:grid-cols-3"
        >
          <div>
            <p className="text-3xl font-[900] text-[#10204E] md:text-4xl">99.8%</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6073A2] mt-1">Uptime Reliability</p>
          </div>
          <div>
            <p className="text-3xl font-[900] text-[#10204E] md:text-4xl">30M+</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6073A2] mt-1">Global Core Learners</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-3xl font-[900] text-[#10204E] md:text-4xl">&lt; 14 Days</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6073A2] mt-1">Enterprise Setups</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}