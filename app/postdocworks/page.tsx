"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PostDocWorksPage() {
  return (
    <main className="pdw-root">
      <div className="pdw-glow" aria-hidden="true" />

      <div className="pdw-content">
        <motion.span
          className="pdw-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="pdw-dot" />
          Coming Soon
        </motion.span>

        <motion.h1
          className="pdw-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
        >
          PostDocWorks
        </motion.h1>

        <motion.p
          className="pdw-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
        >
          Something genuinely impressive is on the way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
        >
          <Link href="/" className="pdw-back">
            Back to home
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .pdw-root {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
          overflow: hidden;
          font-family: var(--font-geist-sans), "Geist", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .pdw-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1100px;
          height: 700px;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center, rgba(245,166,35,0.14) 0%, rgba(10,46,138,0.10) 40%, transparent 70%);
          filter: blur(10px);
          pointer-events: none;
        }

        .pdw-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
        }

        .pdw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(255,255,255,0.56);
          margin-bottom: 28px;
        }
        .pdw-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5A623;
          box-shadow: 0 0 0 0 rgba(245,166,35,0.6);
          animation: pdw-pulse 2.2s ease-out infinite;
        }
        @keyframes pdw-pulse {
          0% { box-shadow: 0 0 0 0 rgba(245,166,35,0.5); }
          70% { box-shadow: 0 0 0 8px rgba(245,166,35,0); }
          100% { box-shadow: 0 0 0 0 rgba(245,166,35,0); }
        }

        .pdw-title {
          font-size: clamp(48px, 9vw, 104px);
          font-weight: 600;
          letter-spacing: -0.04em;
          line-height: 1.02;
          margin: 0 0 22px;
          background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.65) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .pdw-subtitle {
          font-size: clamp(17px, 2vw, 21px);
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          margin: 0 0 56px;
          max-width: 460px;
          letter-spacing: -0.01em;
        }

        .pdw-back {
          display: inline-block;
          font-size: 0.92rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 12px 2px;
          border-bottom: 1px solid rgba(255,255,255,0.25);
          transition: border-color 0.25s, color 0.25s;
        }
        .pdw-back:hover {
          color: #ffffff;
          border-color: rgba(255,255,255,0.85);
        }

        @media (prefers-reduced-motion: reduce) {
          .pdw-dot { animation: none; }
        }
      `}</style>
    </main>
  );
}
