"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoon({
  icon,
  title,
  description,
  accentColor = "#0a2e8a",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
}) {
  return (
    <div className="csoon" style={{ "--accent": accentColor } as React.CSSProperties}>
      <Link href="/dashboard" className="csoon-back">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <div className="csoon-card">
        <span className="csoon-icon">{icon}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <style jsx global>{`
        .csoon { max-width: 600px; margin: 0 auto; padding: 48px 24px 80px; font-family: var(--font-geist-sans), "Geist", sans-serif; }
        .csoon-back { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 28px; font-size: 13px; font-weight: 500; color: #86868b; text-decoration: none; }
        .csoon-back:hover { color: #10204e; }

        .csoon-card { position: relative; background: #fff; border-radius: 18px; padding: 48px 40px; text-align: center; border: 1px solid #e8e8ed; box-shadow: 0 1px 2px rgba(0,0,0,0.03); overflow: hidden; }
        .csoon-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); }
        .csoon-icon {
          display: inline-flex; align-items: center; justify-content: center; width: 60px; height: 60px;
          border-radius: 16px; background: #f5f5f7; border: 1px solid #e8e8ed; color: var(--accent); margin-bottom: 22px;
        }
        .csoon-card h1 { margin: 0 0 10px; font-size: 1.4rem; font-weight: 700; color: #10204e; letter-spacing: -0.01em; }
        .csoon-card p { margin: 0; color: #6e6e73; font-size: 0.92rem; line-height: 1.6; max-width: 380px; margin-left: auto; margin-right: auto; }
      `}</style>
    </div>
  );
}
