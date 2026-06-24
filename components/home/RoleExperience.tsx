'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { LucideIcon } from "lucide-react";
import {
  GraduationCap,
  Users,
  Heart,
  Building2,
  BookOpen,
  Video,
  Trophy,
  TrendingUp,
  Calendar,
  DollarSign,
  Target,
  BarChart3,
  Bell,
  Shield,
  Globe,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

type Role = 'student' | 'tutor' | 'parent' | 'institution';

interface RoleData {
  id: Role;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  cta: {
    primary: string;
    secondary: string;
  };
  dashboardPreview: {
    cards: {
      title: string;
      value: string;
      change: string;
      icon: LucideIcon;
      color: string;
    }[];
    charts: {
      type: 'bar' | 'line';
      data: number[];
    };
  };
}

const rolesData: Record<Role, RoleData> = {
  student: {
    id: 'student',
    title: 'Students',
    subtitle: 'Your Learning Journey',
    description: 'AI-powered personalized learning paths designed to help you excel',
    icon: GraduationCap,
    color: '#0a2e8a',
    gradient: 'from-[#0a2e8a] to-[#1e3a8a]',
    features: [
      {
        icon: Sparkles,
        title: 'AI Recommendations',
        description: 'Personalized course suggestions based on your learning style'
      },
      {
        icon: Video,
        title: 'Live Classes',
        description: 'Interactive sessions with expert tutors worldwide'
      },
      {
        icon: Trophy,
        title: 'Gamification',
        description: 'Earn badges and rewards as you progress'
      },
      {
        icon: TrendingUp,
        title: 'Progress Tracking',
        description: 'Visual analytics of your learning journey'
      }
    ],
    stats: [
      { value: '10K+', label: 'Courses' },
      { value: '95%', label: 'Success Rate' },
      { value: '24/7', label: 'Support' }
    ],
    cta: {
      primary: 'Start Learning',
      secondary: 'Explore Courses'
    },
    dashboardPreview: {
      cards: [
        { title: 'Active Courses', value: '8', change: '+2 this week', icon: BookOpen, color: '#0a2e8a' },
        { title: 'Hours Learned', value: '124', change: '+12 this week', icon: Zap, color: '#f5a623' },
        { title: 'Achievements', value: '23', change: '+3 new', icon: Trophy, color: '#bfe3ff' }
      ],
      charts: { type: 'bar', data: [65, 75, 82, 88, 92, 95] }
    }
  },
  tutor: {
    id: 'tutor',
    title: 'Tutors',
    subtitle: 'Teach Your Way',
    description: 'Professional tools to manage students and grow your teaching business',
    icon: Users,
    color: '#f5a623',
    gradient: 'from-[#f5a623] to-[#ffc107]',
    features: [
      {
        icon: Target,
        title: 'Smart Matching',
        description: 'AI connects you with ideal students automatically'
      },
      {
        icon: Calendar,
        title: 'Schedule Management',
        description: 'Intuitive booking system with automated reminders'
      },
      {
        icon: DollarSign,
        title: 'Earnings Dashboard',
        description: 'Track income, payouts, and financial analytics'
      },
      {
        icon: BarChart3,
        title: 'Student Analytics',
        description: 'Monitor student progress and engagement metrics'
      }
    ],
    stats: [
      { value: '$5K+', label: 'Avg Monthly' },
      { value: '4.9/5', label: 'Tutor Rating' },
      { value: '50+', label: 'Students' }
    ],
    cta: {
      primary: 'Become a Tutor',
      secondary: 'View Earnings'
    },
    dashboardPreview: {
      cards: [
        { title: 'Active Students', value: '47', change: '+5 this month', icon: Users, color: '#f5a623' },
        { title: 'This Month', value: '$4,820', change: '+18% growth', icon: DollarSign, color: '#0a2e8a' },
        { title: 'Sessions', value: '156', change: '+12 scheduled', icon: Video, color: '#bfe3ff' }
      ],
      charts: { type: 'line', data: [3200, 3800, 4100, 4400, 4600, 4820] }
    }
  },
  parent: {
    id: 'parent',
    title: 'Parents',
    subtitle: 'Support Their Growth',
    description: 'Stay connected with your child\'s learning journey every step of the way',
    icon: Heart,
    color: '#bfe3ff',
    gradient: 'from-[#bfe3ff] to-[#8dd0ff]',
    features: [
      {
        icon: Bell,
        title: 'Real-time Updates',
        description: 'Get instant notifications about progress and achievements'
      },
      {
        icon: BarChart3,
        title: 'Progress Reports',
        description: 'Detailed insights into learning outcomes'
      },
      {
        icon: Globe,
        title: 'Multilingual Support',
        description: 'Access platform in 50+ languages'
      },
      {
        icon: Shield,
        title: 'Safe Environment',
        description: 'Verified tutors and secure communication'
      }
    ],
    stats: [
      { value: '100%', label: 'Verified Tutors' },
      { value: '98%', label: 'Satisfaction' },
      { value: '24/7', label: 'Monitoring' }
    ],
    cta: {
      primary: 'Get Started',
      secondary: 'See Demo'
    },
    dashboardPreview: {
      cards: [
        { title: 'Children', value: '2', change: 'Both active', icon: Heart, color: '#bfe3ff' },
        { title: 'Progress', value: '89%', change: '+7% this month', icon: TrendingUp, color: '#0a2e8a' },
        { title: 'Alerts', value: '3', change: '1 new', icon: Bell, color: '#f5a623' }
      ],
      charts: { type: 'line', data: [78, 82, 85, 86, 88, 89] }
    }
  },
  institution: {
    id: 'institution',
    title: 'Institutions',
    subtitle: 'Enterprise Solutions',
    description: 'Comprehensive platform to manage and scale educational programs',
    icon: Building2,
    color: '#10204e',
    gradient: 'from-[#10204e] to-[#1e3a8a]',
    features: [
      {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Deep insights into institutional performance'
      },
      {
        icon: Shield,
        title: 'Certification System',
        description: 'Blockchain-verified credential management'
      },
      {
        icon: Users,
        title: 'Multi-user Management',
        description: 'Role-based access for staff and administrators'
      },
      {
        icon: Globe,
        title: 'Global Compliance',
        description: 'Meet educational standards across regions'
      }
    ],
    stats: [
      { value: '500+', label: 'Institutions' },
      { value: '1M+', label: 'Students' },
      { value: '99.9%', label: 'Uptime' }
    ],
    cta: {
      primary: 'Request Demo',
      secondary: 'Contact Sales'
    },
    dashboardPreview: {
      cards: [
        { title: 'Total Students', value: '2,450', change: '+234 this year', icon: GraduationCap, color: '#10204e' },
        { title: 'Active Tutors', value: '186', change: '+12 this month', icon: Users, color: '#f5a623' },
        { title: 'Completion Rate', value: '94%', change: '+3% improved', icon: Target, color: '#bfe3ff' }
      ],
      charts: { type: 'bar', data: [1850, 2000, 2150, 2280, 2380, 2450] }
    }
  }
};

export default function RoleBasedExperience() {
  const [activeRole, setActiveRole] = useState<Role>('student');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const currentRole = rolesData[activeRole];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40"
      style={{
        background: 'linear-gradient(180deg, #f7faff 0%, #edf4ff 50%, #f7faff 100%)'
      }}
    >
      {/* Soft Background Blurs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: 2 }}
        className="absolute top-20 -left-20 w-96 h-96 bg-[#0a2e8a]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: 2 }}
        className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-[#f5a623]/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#0a2e8a] to-[#f5a623] text-white text-sm font-semibold tracking-wider uppercase shadow-lg">
              Role-Based Experience
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#10204e] mb-6 tracking-tight leading-[1.1]">
            Built for Every
            <br />
            <span className="bg-gradient-to-r from-[#0a2e8a] via-[#f5a623] to-[#0a2e8a] bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h2>

          <p className="text-xl md:text-xl text-[#10204e]/60 max-w-3xl mx-auto font-light leading-relaxed">
            A fully adaptive ecosystem designed for students, educators, institutions, and families
          </p>
        </motion.div>

        {/* Main Interactive Section - Creative Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
          
          {/* LEFT SIDE - Role Selector (Creative Layout) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 space-y-4"
          >
            {Object.values(rolesData).map((role, index) => {
              const isActive = activeRole === role.id;
              const Icon = role.icon;

              return (
                <motion.button
                  key={role.id}
                  onClick={() => setActiveRole(role.id)}
                  className={`w-full text-left p-6 md:p-8 rounded-3xl transition-all duration-500 relative overflow-hidden group ${
                    index === 1 ? 'lg:ml-8' : index === 2 ? 'lg:ml-4' : ''
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${role.color}15 0%, ${role.color}05 100%)`
                      : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${isActive ? role.color + '40' : 'rgba(255, 255, 255, 0.3)'}`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                        style={{ backgroundColor: role.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${role.color}20 0%, transparent 70%)`
                    }}
                  />

                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className="p-3 rounded-2xl flex-shrink-0"
                      style={{
                        backgroundColor: isActive ? `${role.color}20` : `${role.color}10`
                      }}
                      animate={{
                        scale: isActive ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon
                        className="w-6 h-6 md:w-7 md:h-7"
                        style={{ color: role.color }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className={`text-xl md:text-2xl font-bold mb-2 transition-colors ${
                          isActive ? 'text-[#10204e]' : 'text-[#10204e]/60'
                        }`}
                      >
                        {role.title}
                      </h3>
                      <p
                        className={`text-sm md:text-base transition-colors ${
                          isActive ? 'text-[#10204e]/70' : 'text-[#10204e]/40'
                        }`}
                      >
                        {role.subtitle}
                      </p>

                      {/* Stats - Show only when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-[#10204e]/10"
                          >
                            <div className="flex gap-4">
                              {role.stats.map((stat, idx) => (
                                <div key={idx}>
                                  <div
                                    className="text-lg font-bold"
                                    style={{ color: role.color }}
                                  >
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-[#10204e]/50">
                                    {stat.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        x: isActive ? 4 : 0,
                        opacity: isActive ? 1 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight
                        className="w-5 h-5"
                        style={{ color: role.color }}
                      />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* RIGHT SIDE - Live Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Dashboard Container */}
                <div
                  className="relative p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: `2px solid ${currentRole.color}20`
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-30"
                    style={{ backgroundColor: currentRole.color }}
                  />

                  {/* Header */}
                  <div className="relative mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#10204e] mb-2">
                      {currentRole.subtitle}
                    </h3>
                    <p className="text-[#10204e]/60">
                      {currentRole.description}
                    </p>
                  </div>

                  {/* Dashboard Cards */}
                  <div className="relative grid grid-cols-3 gap-4 mb-8">
                    {currentRole.dashboardPreview.cards.map((card, index) => {
                      const CardIcon = card.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-2xl bg-white shadow-lg"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                            style={{ backgroundColor: `${card.color}15` }}
                          >
                            <CardIcon className="w-5 h-5" style={{ color: card.color }} />
                          </div>
                          <div className="text-sm text-[#10204e]/60 mb-1">
                            {card.title}
                          </div>
                          <div className="text-2xl font-bold text-[#10204e] mb-1">
                            {card.value}
                          </div>
                          <div
                            className="text-xs font-medium"
                            style={{ color: card.color }}
                          >
                            {card.change}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Chart Visualization */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative h-48 p-6 rounded-2xl bg-white shadow-lg mb-8 overflow-hidden"
                  >
                    <div className="flex items-end justify-between h-full gap-3 overflow-hidden">

{(() => {
  const maxValue = Math.max(...currentRole.dashboardPreview.charts.data);

  return currentRole.dashboardPreview.charts.data.map((value, index) => {
    const normalizedHeight = (value / maxValue) * 100;

    return (
      <motion.div
        key={index}
        className="w-full max-w-[70px] rounded-t-xl self-end"
        style={{
          background: `linear-gradient(to top, ${currentRole.color}, ${currentRole.color}80)`
        }}
        initial={{ height: 0 }}
        animate={{ height: `${normalizedHeight}%` }}
        transition={{
          delay: 0.5 + index * 0.08,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
    );
  });
})()}
</div>
                  </motion.div>

                  {/* Features List */}
                  <div className="relative grid md:grid-cols-2 gap-4 mb-8">
                    {currentRole.features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${currentRole.color}15` }}
                          >
                            <FeatureIcon
                              className="w-4 h-4"
                              style={{ color: currentRole.color }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-[#10204e] text-sm mb-1">
                              {feature.title}
                            </div>
                            <div className="text-xs text-[#10204e]/60">
                              {feature.description}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="relative flex flex-wrap gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full font-semibold text-white shadow-xl"
                      style={{
                        background: `linear-gradient(135deg, ${currentRole.color}, ${currentRole.color}dd)`
                      }}
                    >
                      {currentRole.cta.primary}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 rounded-full font-semibold bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all"
                      style={{
                        color: currentRole.color,
                        border: `2px solid ${currentRole.color}30`
                      }}
                    >
                      {currentRole.cta.secondary}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 text-center"
        >
          <p className="text-[#10204e]/40 mb-8 text-lg">
            Trusted by leading educational institutions worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-24 h-12 bg-[#10204e]/10 rounded-lg" />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}