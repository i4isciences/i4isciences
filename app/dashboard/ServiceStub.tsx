"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import type { DashboardService } from "./services-data";

export default function ServiceStub({ service }: { service: DashboardService }) {
  return (
    <div className="sstub" style={{ "--accent": service.accentColor } as React.CSSProperties}>
      <Link href="/dashboard" className="sstub-back">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <div className="sstub-card">
        <span className="sstub-logo">
          <Image src={service.logo} alt="" width={36} height={36} />
        </span>
        <h1>{service.name}</h1>
        <p className="sstub-tagline">{service.tagline}</p>

        <div className="sstub-notice">
          <Sparkles size={15} />
          <span>This workspace is coming soon — we&apos;re building the real {service.name} experience right here.</span>
        </div>
      </div>

      <style jsx global>{`
        .sstub { max-width: 680px; margin: 0 auto; padding: 48px 24px 80px; font-family: var(--font-geist-sans), "Geist", sans-serif; }
        .sstub-back { display: inline-flex; align-items: center; gap: 6px; margin-bottom: 28px; font-size: 13px; font-weight: 500; color: #86868b; text-decoration: none; }
        .sstub-back:hover { color: #10204e; }

        .sstub-card { position: relative; background: #fff; border-radius: 18px; padding: 48px 40px; text-align: center; border: 1px solid #e8e8ed; box-shadow: 0 1px 2px rgba(0,0,0,0.03); overflow: hidden; }
        .sstub-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--accent); }
        .sstub-logo { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 16px; background: #f5f5f7; border: 1px solid #e8e8ed; overflow: hidden; margin-bottom: 22px; }
        .sstub-logo :global(img) { object-fit: cover; width: 100%; height: 100%; }
        .sstub-card h1 { margin: 0 0 10px; font-size: 1.5rem; font-weight: 700; color: #10204e; letter-spacing: -0.01em; }
        .sstub-tagline { margin: 0 0 28px; color: #6e6e73; font-size: 0.94rem; line-height: 1.6; }

        .sstub-notice {
          display: inline-flex; align-items: center; gap: 10px; padding: 13px 18px;
          border-radius: 12px; background: #f5f5f7; color: #10204e;
          font-size: 0.86rem; font-weight: 500; text-align: left; line-height: 1.5;
        }
        .sstub-notice :global(svg) { color: var(--accent); flex-shrink: 0; }
      `}</style>
    </div>
  );
}
