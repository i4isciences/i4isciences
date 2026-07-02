'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Brain,
  BookOpen,
  Video,
  BarChart3,
  Award,
  Globe2,
  ArrowRight
} from 'lucide-react';

const platformFeatures = [
  {
    icon: Brain,
    title: 'AI Engine',
    description: 'Intelligent recommendations that adapt to every learner',
    color: '#f5a623',
    delay: 0
  },
  {
    icon: BookOpen,
    title: 'Learning Management',
    description: 'Complete course delivery and progress tracking',
    color: '#0a2e8a',
    delay: 0.1
  },
  {
    icon: Video,
    title: 'Live Tutoring',
    description: 'Real-time expert instruction at scale',
    color: '#bfe3ff',
    delay: 0.2
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Deep insights into learning outcomes',
    color: '#0a2e8a',
    delay: 0.3
  },
  {
    icon: Award,
    title: 'Certification',
    description: 'Verified credentials for teachers and students',
    color: '#f5a623',
    delay: 0.4
  },
  {
    icon: Globe2,
    title: 'Global Reach',
    description: 'Multi-language support across 50+ countries',
    color: '#bfe3ff',
    delay: 0.5
  }
];

export default function PlatformOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [activeFeature, setActiveFeature] = useState(0);
  

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#000000] py-24 md:py-24 lg:py-24"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#10204e] via-[#000000] to-[#10204e]" />

      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Header Section - Clean and Centered */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="relative text-center py-24 mb-20"
>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight">
            One platform.
            <br />
            <span className="text-[#f5a623]">Infinite possibilities.</span>
          </h2>
          <p className="text-sm md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
            A complete AI-powered education ecosystem that connects students, teachers,
            and institutions worldwide.
          </p>
          {/* Floating Feature Icons Around Heading */}

  {platformFeatures.map((feature, index) => {
   const positions = [
    'top-[1%] left-[18%]',
    'top-[8%] right-[18%]',
    'top-[48%] left-[10%]',
    'top-[48%] right-[10%]',
    'bottom-[5%] left-[22%]',
    'bottom-[5%] right-[22%]'
  ];

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.2 + index * 0.12,
          ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={{
          scale: 1.08,
          y: -4
        }}
        onMouseEnter={() => setActiveFeature(index)}
        className={`absolute ${positions[index]} cursor-pointer z-20`}
      >
        <div className="relative group">

          {/* Glow */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              backgroundColor: `${feature.color}40`
            }}
          />

          {/* Icon Circle */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm flex items-center justify-center">

            <feature.icon
              className="w-7 h-7 md:w-8 md:h-8"
              style={{ color: feature.color }}
            />
          </div>
        </div>
      </motion.div>
    );
  })}

  

        </motion.div>
      
        {/* Features Grid - Clean Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.8 + feature.delay,
                ease: [0.16, 1, 0.3, 1]
              }}
              onMouseEnter={() => setActiveFeature(index)}
              className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500 cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden"
                style={{
                  backgroundColor: `${feature.color}10`
                }}
              >
                <feature.icon
                  className="w-7 h-7 relative z-10"
                  style={{ color: feature.color }}
                />
                <motion.div
                  className="absolute inset-0 blur-xl"
                  style={{ backgroundColor: feature.color }}
                  animate={{
                    opacity: [0, 0.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    ease: 'easeInOut'
                  }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed mb-4">
                {feature.description}
              </p>

              

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color}15 0%, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - Clean and Simple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-white/40 mb-8 text-lg">
            Ready to transform education?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-white/90 transition-colors shadow-2xl"
            >
              Get started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/5 text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors border border-white/10"
            >
              Watch demo
            </motion.button>
          </div>
        </motion.div>

        {/* Stats - Clean presentation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.4 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-white/5"
        >
          {[
            { value: '50+', label: 'Countries' },
            { value: '1M+', label: 'Students' },
            { value: '99.9%', label: 'Uptime' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-semibold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}