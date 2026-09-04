"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { DASHBOARD_SERVICES } from "./services-data";

function greetingForHour(hour: number): string {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHome({ fullName, role }: { fullName: string; role: string }) {
  // Rendered on the server as a stable default, then corrected to the
  // viewer's local time once mounted — avoids a hydration mismatch since
  // the server has no notion of the visitor's timezone.
  const [greeting, setGreeting] = useState("Welcome back");
  useEffect(() => setGreeting(greetingForHour(new Date().getHours())), []);

  return (
    <div className="dhome">
      <motion.div className="dhome-header" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <span className="dhome-eyebrow">{role}</span>
        <h1>
          {greeting}, {fullName.split(" ")[0]}.
        </h1>
        <p>Everything you have access to lives here — open a model below to get started.</p>
      </motion.div>

      <div className="dhome-grid">
        {DASHBOARD_SERVICES.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
          >
            <Link href={`/dashboard/${s.slug}`} className="dhome-card" style={{ "--accent": s.accentColor } as React.CSSProperties}>
              <span className="dhome-card-stripe" />
              <div className="dhome-card-body">
                <div className="dhome-card-top">
                  <span className="dhome-card-logo">
                    <Image src={s.logo} alt="" width={26} height={26} />
                  </span>
                  <ArrowRight size={16} className="dhome-card-arrow" />
                </div>
                <span className="dhome-card-name">{s.name}</span>
                <span className="dhome-card-tagline">{s.tagline}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .dhome { max-width: 1080px; margin: 0 auto; padding: 56px 24px 90px; font-family: var(--font-geist-sans), "Geist", sans-serif; }

        .dhome-header { margin-bottom: 44px; }
        .dhome-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; }
        .dhome-header h1 { margin: 10px 0 12px; font-size: clamp(2rem, 4.4vw, 2.9rem); font-weight: 700; color: #10204e; letter-spacing: -0.025em; line-height: 1.1; }
        .dhome-header p { margin: 0; max-width: 480px; color: #6e6e73; font-size: 1rem; line-height: 1.6; }

        .dhome-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        @media (max-width: 1000px) {
          .dhome-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .dhome-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 420px) {
          .dhome-grid { grid-template-columns: 1fr; }
        }
        .dhome-card {
          position: relative; display: flex; height: 100%;
          border-radius: 16px; background: #ffffff;
          border: 1px solid #e8e8ed; text-decoration: none; overflow: hidden;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }
        .dhome-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); border-color: #d9d9de; }

        .dhome-card-stripe { width: 4px; flex-shrink: 0; background: var(--accent); }
        .dhome-card-body { display: flex; flex-direction: column; gap: 8px; padding: 20px 20px 22px; flex: 1; }

        .dhome-card-top { display: flex; align-items: center; justify-content: space-between; }
        .dhome-card-logo {
          width: 40px; height: 40px; border-radius: 10px;
          background: #f5f5f7; border: 1px solid #e8e8ed;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .dhome-card-logo :global(img) { object-fit: cover; width: 100%; height: 100%; }
        .dhome-card-arrow { color: #c7c7cc; transition: transform 0.18s ease, color 0.18s ease; }
        .dhome-card:hover .dhome-card-arrow { color: var(--accent); transform: translateX(2px); }

        .dhome-card-name { font-size: 0.98rem; font-weight: 700; color: #10204e; margin-top: 4px; }
        .dhome-card-tagline { font-size: 0.83rem; color: #86868b; line-height: 1.5; }

        @media (max-width: 480px) {
          .dhome { padding: 40px 18px 70px; }
        }
      `}</style>
    </div>
  );
}
