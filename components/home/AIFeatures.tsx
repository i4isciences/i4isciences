"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
    TYPES
───────────────────────────────────────────── */
interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  visual: React.ReactNode;
  glow: string;
  accentRGB: string;
}

/* ─────────────────────────────────────────────
    ANIMATED VISUALS (pure SVG + CSS keyframes)
───────────────────────────────────────────── */

const RecommendVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4DA8FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4DA8FF" stopOpacity="0" />
        </radialGradient>
        <filter id="glow1">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="140" cy="90" r="70" fill="url(#rg1)" />
      {[
        [140, 90, 10, "#4DA8FF", 1],
        [80,  50, 7,  "#4DA8FF", 0.7],
        [200, 50, 7,  "#f5a623", 0.7],
        [60,  120, 6, "#4DA8FF", 0.5],
        [220, 120, 6, "#f5a623", 0.5],
        [140, 150, 7, "#4DA8FF", 0.6],
        [110, 30,  5, "#ffffff", 0.4],
        [170, 30,  5, "#ffffff", 0.4],
      ].map(([cx, cy, r, fill, op], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={fill as string} opacity={op as number} filter="url(#glow1)" />
      ))}
      {[
        [140,90, 80,50],  [140,90, 200,50], [140,90, 60,120],
        [140,90, 220,120],[140,90, 140,150],[80,50, 110,30],
        [200,50, 170,30],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.25"
          strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" from="0" to="-14" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
      <g>
        <rect x="12" y="60" width="56" height="28" rx="6" fill="rgba(77,168,255,0.12)" stroke="rgba(77,168,255,0.35)" strokeWidth="0.8" />
        <rect x="18" y="66" width="30" height="5" rx="2.5" fill="#4DA8FF" fillOpacity="0.6" />
        <rect x="18" y="75" width="44" height="4" rx="2" fill="white" fillOpacity="0.18" />
        <rect x="18" y="82" width="36" height="4" rx="2" fill="white" fillOpacity="0.12" />
      </g>
      <g>
        <rect x="212" y="60" width="56" height="28" rx="6" fill="rgba(245,166,35,0.10)" stroke="rgba(245,166,35,0.30)" strokeWidth="0.8" />
        <rect x="218" y="66" width="30" height="5" rx="2.5" fill="#f5a623" fillOpacity="0.6" />
        <rect x="218" y="75" width="44" height="4" rx="2" fill="white" fillOpacity="0.18" />
        <rect x="218" y="82" width="36" height="4" rx="2" fill="white" fillOpacity="0.12" />
      </g>
      <circle cx="140" cy="90" r="18" fill="none" stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.3">
        <animate attributeName="r" from="12" to="26" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

const TutorMatchVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B2A8F" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0B2A8F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="90" r="65" fill="url(#rg2)" />
      <circle cx="140" cy="90" r="55" fill="none" stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="6 4">
        <animateTransform attributeName="transform" type="rotate" from="0 140 90" to="360 140 90" dur="8s" repeatCount="indefinite" />
      </circle>
      {[[-1, 60], [0, 90], [1, 60]].map(([side, y], i) => {
        const x = 70 + i * 70;
        return (
          <g key={i}>
            <rect x={x - 22} y={y - 28} width="44" height="56" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(77,168,255,0.25)" strokeWidth="0.8" />
            <circle cx={x} cy={y - 10} r="11" fill="rgba(77,168,255,0.20)" />
            <circle cx={x} cy={y - 10} r="7" fill="rgba(77,168,255,0.40)" />
            <rect x={x - 14} y={y + 6} width="28" height="4" rx="2" fill="white" fillOpacity="0.25" />
            <rect x={x - 10} y={y + 14} width="20" height="4" rx="2" fill="white" fillOpacity="0.14" />
            {i === 1 && (
              <>
                <rect x={x - 22} y={y - 28} width="44" height="56" rx="8" fill="rgba(77,168,255,0.08)" stroke="#4DA8FF" strokeWidth="1.2" />
                <text x={x} y={y + 28} textAnchor="middle" fontSize="8" fill="#4DA8FF" fontWeight="bold" fontFamily="monospace">98% MATCH</text>
              </>
            )}
          </g>
        );
      })}
      <circle cx="140" cy="62" r="26" fill="none" stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.4">
        <animate attributeName="r" from="22" to="34" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <line x1="50" y1="90" x2="230" y2="90" stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.15">
        <animate attributeName="y1" from="40" to="140" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y2" from="40" to="140" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0;0.35;0" dur="2.5s" repeatCount="indefinite" />
      </line>
    </svg>
  </div>
);

const AccentVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg3" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="110" r="80" fill="url(#rg3)" />
      {Array.from({ length: 36 }, (_, i) => {
        const heights = [8,14,22,34,28,18,42,56,44,32,20,14,10,18,30,48,60,48,30,18,10,14,20,32,44,56,42,18,28,34,22,14,8,12,20,10];
        const h = heights[i % heights.length];
        const x = 24 + i * 6.5;
        const isCenter = i >= 14 && i <= 22;
        return (
          <g key={i}>
            <rect x={x - 1.5} y={90 - h / 2} width="3" height={h} rx="1.5"
              fill={isCenter ? "#f5a623" : "#4DA8FF"}
              fillOpacity={isCenter ? 0.85 : 0.4}>
              {isCenter && (
                <animate attributeName="height" values={`${h};${h * 1.3};${h}`} dur={`${0.4 + (i - 14) * 0.06}s`} repeatCount="indefinite" />
              )}
            </rect>
          </g>
        );
      })}
      <rect x="95" y="130" width="90" height="32" rx="8" fill="rgba(245,166,35,0.12)" stroke="rgba(245,166,35,0.35)" strokeWidth="0.8" />
      <text x="140" y="148" textAnchor="middle" fontSize="10" fill="#f5a623" fontWeight="800" fontFamily="monospace">95/100 PRONUNCIATION</text>
      <rect x="128" y="20" width="24" height="36" rx="12" fill="rgba(245,166,35,0.18)" stroke="rgba(245,166,35,0.45)" strokeWidth="1" />
      <rect x="133" y="26" width="14" height="24" rx="7" fill="rgba(245,166,35,0.30)" />
      <line x1="140" y1="56" x2="140" y2="66" stroke="#f5a623" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="128" y1="66" x2="152" y2="66" stroke="#f5a623" strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="65" cy="30" r="4" fill="#f5a623">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x="74" y="34" fontSize="8" fill="#f5a623" fillOpacity="0.7" fontFamily="monospace">ANALYZING</text>
    </svg>
  </div>
);

const PredictiveVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4DA8FF" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#4DA8FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DA8FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4DA8FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="140" cy="90" r="80" fill="url(#rg4)" />
      {[40,65,90,115,140].map(y => (
        <line key={y} x1="30" y1={y} x2="250" y2={y} stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      ))}
      <path d="M30,130 L60,110 L90,100 L120,85 L150,70 L180,55 L210,45 L240,38 L240,140 L30,140Z" fill="url(#chartFill)" />
      <path d="M30,130 L60,110 L90,100 L120,85 L150,70 L180,55 L210,45 L240,38" stroke="#4DA8FF" strokeWidth="2" fill="none" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" from="0 600" to="600 0" dur="2s" fill="freeze" />
      </path>
      <path d="M240,38 L265,28" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      <circle cx="240" cy="38" r="4" fill="#4DA8FF">
        <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <rect x="180" y="14" width="72" height="22" rx="6" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.40)" strokeWidth="0.8" />
      <text x="216" y="29" textAnchor="middle" fontSize="8" fill="#f5a623" fontWeight="700" fontFamily="monospace">↑ 34% GROWTH</text>
      <line x1="30" y1="140" x2="250" y2="140" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
      <line x1="30" y1="40" x2="30" y2="140" stroke="white" strokeOpacity="0.10" strokeWidth="1" />
    </svg>
  </div>
);

const ScreeningVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B2A8F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0B2A8F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="90" r="70" fill="url(#rg5)" />
      <rect x="70" y="30" width="140" height="100" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(77,168,255,0.25)" strokeWidth="1" />
      <circle cx="140" cy="62" r="18" fill="rgba(77,168,255,0.20)" stroke="rgba(77,168,255,0.40)" strokeWidth="1" />
      <circle cx="140" cy="58" r="9" fill="rgba(77,168,255,0.50)" />
      <ellipse cx="140" cy="76" rx="13" ry="8" fill="rgba(77,168,255,0.25)" />
      {["Qualification Verified", "Background Clear", "AI Score: 96/100"].map((txt, i) => (
        <g key={i}>
          <circle cx="86" cy={90 + i * 14} r="4" fill={i === 2 ? "#f5a623" : "#4DA8FF"} fillOpacity="0.9" />
          <text x="96" y={94 + i * 14} fontSize="7.5" fill="white" fillOpacity="0.75" fontFamily="monospace">{txt}</text>
        </g>
      ))}
      <rect x="70" y="30" width="140" height="4" rx="2" fill="#4DA8FF" fillOpacity="0.5">
        <animate attributeName="y" from="30" to="126" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
      </rect>
      <rect x="86" y="140" width="108" height="22" rx="8" fill="rgba(77,168,255,0.18)" stroke="rgba(77,168,255,0.45)" strokeWidth="1" />
      <text x="140" y="155" textAnchor="middle" fontSize="9" fill="#4DA8FF" fontWeight="800" fontFamily="monospace">✓  AI APPROVED</text>
    </svg>
  </div>
);

const FraudVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B2A8F" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B2A8F" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="90" r="72" fill="url(#rg6)" />
      <path d="M140,28 L175,44 L175,80 C175,104 159,120 140,130 C121,120 105,104 105,80 L105,44 Z" fill="rgba(77,168,255,0.10)" stroke="rgba(77,168,255,0.40)" strokeWidth="1.5" />
      <path d="M140,40 L165,52 L165,80 C165,98 153,112 140,120 C127,112 115,98 115,80 L115,52 Z" fill="rgba(77,168,255,0.08)" stroke="rgba(77,168,255,0.25)" strokeWidth="1" />
      <path d="M127,82 L136,92 L155,70" stroke="#4DA8FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {[[50,50,"#f5a623"], [220,60,"#f5a623"], [60,130,"#4DA8FF"], [210,120,"#4DA8FF"]].map(([cx, cy, col], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="5" fill={col as string} fillOpacity="0.6">
            <animate attributeName="r" values="5;9;5" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.6;0.1;0.6" dur={`${1.5 + i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <line x1={cx as number} y1={cy as number} x2="140" y2="90" stroke={col as string} strokeWidth="0.8" strokeOpacity="0.18" strokeDasharray="3 3" />
        </g>
      ))}
      <rect x="86" y="144" width="108" height="22" rx="8" fill="rgba(77,168,255,0.15)" stroke="rgba(77,168,255,0.35)" strokeWidth="0.8" />
      <text x="140" y="159" textAnchor="middle" fontSize="8.5" fill="#4DA8FF" fontWeight="800" fontFamily="monospace">ENTERPRISE PROTECTED</text>
    </svg>
  </div>
);

const OlympiadVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 280 180" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="rg7" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="140" cy="90" r="70" fill="url(#rg7)" />
      <path d="M118,50 L162,50 L158,80 C158,96 151,108 140,114 C129,108 122,96 122,80 Z" fill="rgba(245,166,35,0.15)" stroke="rgba(245,166,35,0.40)" strokeWidth="1.2" />
      <path d="M118,50 L106,50 L106,64 C106,74 112,80 122,80" fill="none" stroke="rgba(245,166,35,0.35)" strokeWidth="1.5" />
      <path d="M162,50 L174,50 L174,64 C174,74 168,80 158,80" fill="none" stroke="rgba(245,166,35,0.35)" strokeWidth="1.5" />
      <rect x="132" y="114" width="16" height="16" rx="0" fill="rgba(245,166,35,0.20)" />
      <rect x="120" y="130" width="40" height="10" rx="3" fill="rgba(245,166,35,0.25)" stroke="rgba(245,166,35,0.40)" strokeWidth="0.8" />
      <path d="M140,58 L142.5,65 L150,65 L144,69.5 L146.5,76.5 L140,72 L133.5,76.5 L136,69.5 L130,65 L137.5,65 Z" fill="#f5a623" fillOpacity="0.80" />
      {[44, 54, 64].map((r, i) => (
        <circle key={i} cx="140" cy="90" r={r} fill="none" stroke="#f5a623" strokeWidth="0.6" strokeOpacity={0.12 - i * 0.03} strokeDasharray="3 5">
          <animateTransform attributeName="transform" type="rotate" from={`${i % 2 === 0 ? 0 : 360} 140 90`} to={`${i % 2 === 0 ? 360 : 0} 140 90`} dur={`${10 + i * 5}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {["1st","2nd","3rd"].map((rank, i) => (
        <g key={rank}>
          <rect x={50 + i * 65} y="148" width="40" height="20" rx="5" fill={i === 0 ? "rgba(245,166,35,0.22)" : "rgba(255,255,255,0.07)"} stroke={i === 0 ? "rgba(245,166,35,0.50)" : "rgba(255,255,255,0.12)"} strokeWidth="0.8" />
          <text x={70 + i * 65} y="162" textAnchor="middle" fontSize="8" fill={i === 0 ? "#f5a623" : "rgba(255,255,255,0.50)"} fontWeight="700" fontFamily="monospace">{rank}</text>
        </g>
      ))}
    </svg>
  </div>
);

const VirtualTutorVisual = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
    <svg viewBox="0 0 560 280" fill="none" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="vt_bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#4DA8FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4DA8FF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vt_gold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5a623" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
        </radialGradient>
        <filter id="vt_glow">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx="280" cy="140" r="160" fill="url(#vt_bg)" />
      <circle cx="420" cy="80" r="90" fill="url(#vt_gold)" />
      {[80, 100, 120].map((r, i) => (
        <circle key={i} cx="130" cy="140" r={r} fill="none" stroke="#4DA8FF" strokeWidth="0.7" strokeOpacity={0.15 - i * 0.04} strokeDasharray="5 6">
          <animateTransform attributeName="transform" type="rotate" from={`${i % 2 === 0 ? 0 : 360} 130 140`} to={`${i % 2 === 0 ? 360 : 0} 130 140`} dur={`${14 + i * 4}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <circle cx="130" cy="140" r="54" fill="rgba(77,168,255,0.08)" stroke="rgba(77,168,255,0.40)" strokeWidth="1.5" filter="url(#vt_glow)" />
      <circle cx="130" cy="140" r="38" fill="rgba(77,168,255,0.14)" stroke="rgba(77,168,255,0.30)" strokeWidth="1" />
      <circle cx="130" cy="140" r="22" fill="rgba(77,168,255,0.25)" />
      <circle cx="122" cy="135" r="3.5" fill="#4DA8FF" fillOpacity="0.8" />
      <circle cx="138" cy="135" r="3.5" fill="#4DA8FF" fillOpacity="0.8" />
      <path d="M122,148 Q130,155 138,148" stroke="#4DA8FF" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="130" cy="140" r="54" fill="none" stroke="#4DA8FF" strokeWidth="1" strokeOpacity="0.4">
        <animate attributeName="r" from="54" to="72" dur="2s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="220" y="20" width="320" height="240" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <rect x="220" y="20" width="320" height="36" rx="14" fill="rgba(255,255,255,0.06)" />
      <circle cx="238" cy="38" r="8" fill="rgba(77,168,255,0.35)" />
      <circle cx="238" cy="38" r="5" fill="#4DA8FF" fillOpacity="0.6" />
      <rect x="252" y="32" width="80" height="7" rx="3.5" fill="white" fillOpacity="0.22" />
      <rect x="252" y="42" width="50" height="5" rx="2.5" fill="rgba(77,168,255,0.40)" />
      <circle cx="516" cy="38" r="5" fill="#4DA8FF" fillOpacity="0.5">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="510" y="42" textAnchor="middle" fontSize="7" fill="#4DA8FF" fontFamily="monospace">LIVE</text>
      {[
        { x: 232, y: 72, w: 180, h: 22, side: "left",  col: "rgba(255,255,255,0.08)" },
        { x: 356, y: 104, w: 170, h: 22, side: "right", col: "rgba(77,168,255,0.18)" },
        { x: 232, y: 136, w: 200, h: 22, side: "left",  col: "rgba(255,255,255,0.08)" },
        { x: 368, y: 168, w: 158, h: 22, side: "right", col: "rgba(77,168,255,0.18)" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="8" fill={b.col} stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />
          <rect x={b.x + 8} y={b.y + 7} width={b.w - 20} height="5" rx="2.5" fill="white" fillOpacity={b.side === "right" ? 0.40 : 0.18} />
          <rect x={b.x + 8} y={b.y + 14} width={b.w * 0.6} height="4" rx="2" fill="white" fillOpacity={b.side === "right" ? 0.25 : 0.10} />
        </g>
      ))}
      {[0, 1, 2].map(i => (
        <circle key={i} cx={232 + i * 14} cy={210} r="4" fill="#4DA8FF" fillOpacity="0.7">
          <animate attributeName="cy" values="210;205;210" dur="0.8s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {["Multilingual", "Adaptive", "24/7 Live", "AI Assessed"].map((tag, i) => (
        <g key={tag}>
          <rect x={232 + i * 78} y={224} width={72} height={18} rx="9" fill={i === 0 ? "rgba(245,166,35,0.18)" : "rgba(77,168,255,0.12)"} stroke={i === 0 ? "rgba(245,166,35,0.35)" : "rgba(77,168,255,0.25)"} strokeWidth="0.7" />
          <text x={232 + i * 78 + 36} y={236} textAnchor="middle" fontSize="7" fill={i === 0 ? "#f5a623" : "#4DA8FF"} fontWeight="700" fontFamily="monospace">{tag}</text>
        </g>
      ))}
      <line x1="184" y1="120" x2="220" y2="80" stroke="#4DA8FF" strokeWidth="0.8" strokeOpacity="0.20" strokeDasharray="4 4" />
      <line x1="184" y1="160" x2="220" y2="200" stroke="#4DA8FF" strokeWidth="0.8" strokeOpacity="0.20" strokeDasharray="4 4" />
    </svg>
  </div>
);

/* ─────────────────────────────────────────────
    FEATURE DATA
───────────────────────────────────────────── */
const FEATURES: Feature[] = [
  {
    id: "recommend",
    title: "AI Recommendation Engine",
    subtitle: "Adaptive Pathways",
    description: "Personalized AI-driven learning paths that adapt in real time — analyzing gaps, predicting outcomes, and surfacing exactly the right content for every learner.",
    tags: ["Real-time adaptation", "Gap analysis", "Path generation"],
    glow: "rgba(77,168,255,0.12)",
    accentRGB: "77,168,255",
    visual: <RecommendVisual />,
  },
  {
    id: "matching",
    title: "AI Tutor Matching",
    subtitle: "98% Compatibility",
    description: "Proprietary AI scans tutor credentials, teaching style, subject depth, and student profile to produce near-perfect tutor-to-learner pairings in seconds.",
    tags: ["Multi-factor scoring", "Style matching", "Instant pairing"],
    glow: "rgba(11,42,143,0.22)",
    accentRGB: "77,168,255",
    visual: <TutorMatchVisual />,
  },
  {
    id: "accent",
    title: "Accent Analysis",
    subtitle: "Real-Time Speech AI",
    description: "Proprietary voice AI evaluates pronunciation, fluency, and accent in real time — delivering instant scores and targeted coaching to close language gaps.",
    tags: ["Waveform analysis", "Live scoring", "40+ accents"],
    glow: "rgba(245,166,35,0.10)",
    accentRGB: "245,166,35",
    visual: <AccentVisual />,
  },
  {
    id: "predictive",
    title: "Predictive Analytics",
    subtitle: "Learning Intelligence",
    description: "Institutional dashboards powered by ML models that forecast learner performance, identify at-risk students weeks before they fall behind, and guide curriculum decisions.",
    tags: ["Dropout prediction", "Performance modeling", "Institutional insights"],
    glow: "rgba(77,168,255,0.10)",
    accentRGB: "77,168,255",
    visual: <PredictiveVisual />,
  },
  {
    id: "screening",
    title: "AI Teacher Screening",
    subtitle: "Enterprise-Grade Vetting",
    description: "Multi-layer AI verification combining credential authentication, behavioral analysis, and live assessment scoring to maintain the highest educator quality standards.",
    tags: ["Credential AI", "Live assessment", "Behavioral scoring"],
    glow: "rgba(11,42,143,0.20)",
    accentRGB: "77,168,255",
    visual: <ScreeningVisual />,
  },
  {
    id: "fraud",
    title: "Fraud Detection",
    subtitle: "Zero-Trust Security",
    description: "Enterprise fraud intelligence monitors session behavior, payment anomalies, identity mismatches, and account takeovers — protecting learners and institutions at scale.",
    tags: ["Behavioral AI", "Payment protection", "Identity verification"],
    glow: "rgba(11,42,143,0.18)",
    accentRGB: "77,168,255",
    visual: <FraudVisual />,
  },
  {
    id: "olympiad",
    title: "AI Olympiad Evaluation",
    subtitle: "Competitive Intelligence",
    description: "Automated evaluation engines grade complex open-ended answers, rank submissions globally, and surface elite talent — powering academic competitions at any scale.",
    tags: ["Auto-grading", "Global ranking", "Talent detection"],
    glow: "rgba(245,166,35,0.12)",
    accentRGB: "245,166,35",
    visual: <OlympiadVisual />,
  },
];

function AnimGrid() {
  return (
    <div
      style={{
        position:    "absolute",
        inset:       0,
        pointerEvents: "none",
        backgroundImage:
          "linear-gradient(rgba(77,168,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(77,168,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:   "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
    TYPEWRITER HEADING COMPONENT
───────────────────────────────────────────── */
function TypewriterHeading({ isInView }: { isInView: boolean }) {
  const line1 = "AI-Powered Intelligence";
  const line2 = "Built to Think. Designed to Scale.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03 }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" }
  };

  return (
    <h2 style={{
      fontWeight: 800,
      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
      lineHeight: 1.25,
      color: "#ffffff",
      letterSpacing: "-0.02em",
      marginBottom: "1rem",
    }}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ display: "inline-block" }}
      >
        {line1.split("").map((char, i) => (
          <motion.span key={i} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
      <br />
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          background: "linear-gradient(90deg, #4DA8FF 0%, #f5a623 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          display: "inline-block"
        }}
      >
        {line2.split("").map((char, i) => (
          <motion.span key={i} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
        {/* Animated terminal typing cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          style={{
            display: "inline-block",
            marginLeft: "2px",
            width: "3px",
            height: "1em",
            backgroundColor: "#f5a623",
            verticalAlign: "middle"
          }}
        />
      </motion.span>
    </h2>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:      "relative",
        borderRadius:  "16px",
        overflow:      "hidden",
        background:    "rgba(255,255,255,0.025)",
        backdropFilter:"blur(12px)",
        border:        `1px solid ${hovered ? `rgba(${feature.accentRGB},0.35)` : "rgba(255,255,255,0.05)"}`,
        boxShadow:     hovered
          ? `0 12px 40px rgba(0,0,0,0.45), 0 0 40px rgba(${feature.accentRGB},0.05)`
          : "0 4px 20px rgba(0,0,0,0.25)",
        transition:    "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Visual Panel */}
        <div 
          className="p-6 md:p-8 flex items-center justify-center overflow-hidden"
          style={{
            order: isLeft ? 2 : 1,
            gridColumn: "span 5 / span 5",
            position: "relative",
            background: `rgba(${feature.accentRGB},0.02)`,
            borderLeft: isLeft ? "1px solid rgba(255,255,255,0.03)" : "none",
            borderRight: !isLeft ? "1px solid rgba(255,255,255,0.03)" : "none",
          }}
        >
          <div style={{ width: "100%", height: "140px" }}>{feature.visual}</div>
        </div>

        {/* Content Panel */}
        <div 
          className="p-6 md:p-8 flex flex-col justify-center"
          style={{
            order: isLeft ? 1 : 2,
            gridColumn: "span 7 / span 7",
          }}
        >
          <span style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            padding: "0.25rem 0.65rem",
            borderRadius: "999px",
            background: `rgba(${feature.accentRGB},0.10)`,
            border: `1px solid rgba(${feature.accentRGB},0.20)`,
            fontFamily: "monospace",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: `rgba(${feature.accentRGB},1)`,
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}>
            {feature.subtitle}
          </span>

          <h3 style={{
            fontWeight: 800,
            fontSize: "1.35rem",
            color: "#ffffff",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}>
            {feature.title}
          </h3>

          <p style={{
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.5)",
            marginBottom: "1.25rem",
          }}>
            {feature.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {feature.tags.map(tag => (
              <span key={tag} style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.45)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
    MAIN SECTION COMPONENT
───────────────────────────────────────────── */
export default function AIFeatures() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  const previewFeatures = FEATURES.slice(0, 2);
  const hiddenFeatures = FEATURES.slice(2);

  return (
    <section className="py-16 md:py-24" style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background: "linear-gradient(180deg, #071326 0%, #081b34 40%, #0a1020 100%)",
    }}>
      <AnimGrid />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        
        {/* COMPACT CLEAN HEADER WITH TYPEWRITER */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.3rem 0.9rem",
            borderRadius: "999px",
            background: "rgba(77,168,255,0.06)",
            border: "1px solid rgba(77,168,255,0.15)",
            marginBottom: "1.25rem",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4DA8FF", display: "inline-block" }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "#4DA8FF", textTransform: "uppercase" }}>
              AI Intelligence Engine
            </span>
          </div>

          <TypewriterHeading isInView={inView} />
        </div>

        {/* FLAGSHIP VIRTUAL AI TUTOR HIGHLIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-10"
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(77,168,255,0.15)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            marginBottom: "24px",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span style={{
                padding: "0.25rem 0.65rem",
                borderRadius: "6px",
                background: "rgba(77,168,255,0.1)",
                fontSize: "0.65rem",
                fontWeight: 700,
                color: "#4DA8FF",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Flagship Product
              </span>

              <h3 style={{ fontWeight: 800, fontSize: "1.75rem", color: "#ffffff", marginTop: "12px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                Virtual AI Tutor: <span style={{ background: "linear-gradient(90deg, #4DA8FF, #f5a623)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>The World's Classroom.</span>
              </h3>

              <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", marginBottom: "1.5rem" }}>
                A fully autonomous AI tutor that conducts live sessions, generates personalized lessons, and adapts in real time across 120+ languages, 24 hours a day.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-white/60">
                {["• AI chat assistant", "• AI lesson generation", "• Smart recommendations", "• AI-powered assessments"].map(txt => (
                  <span key={txt}>{txt}</span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 flex items-center justify-center" style={{ height: "200px", position: "relative" }}>
              <VirtualTutorVisual />
            </div>
          </div>
        </motion.div>

        {/* COMPACT MINI MATRIX HUB CONTAINER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Always Visible Core Triggers */}
          {previewFeatures.map((f, i) => (
            <FeatureCard key={f.id} feature={f} index={i} />
          ))}

          {/* Collapsible Local Ecosystem Vault */}
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {hiddenFeatures.map((f, i) => (
                  <FeatureCard key={f.id} feature={f} index={i + 2} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* IN-PAGE DISCOVERY TOGGLE ACTION */}
        <div style={{ textAlign: "center", marginTop: "32px", marginBottom: "48px" }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 28px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(77,168,255,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {showAll ? "Collapse Extra Core Modules" : "Preview Entire Feature Set"}
            <motion.div animate={{ rotate: showAll ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} className="text-[#4DA8FF]" />
            </motion.div>
          </button>
        </div>

        {/* REDIRECT ANCHOR ACTION LINK TO GLOBAL ECOSYSTEM PAGE */}
        <div style={{ textAlign: "center" }}>
          <a
            href="/ai-ecosystem"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #0B2A8F, #4DA8FF)",
              color: "#ffffff",
              fontSize: "0.95rem",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(77,168,255,0.25)",
              transition: "transform 0.2s, boxShadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(77,168,255,0.45)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(77,168,255,0.25)";
            }}
          >
            Explore AI Ecosystem Full Architecture
            <ArrowRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}