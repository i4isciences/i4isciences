"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  BookOpen, Award, Globe, Users, CheckCircle,
  ChevronDown, Play, Download, BarChart2,
  ClipboardList, Star, MapPin, ArrowRight,
  GraduationCap, Lightbulb, Target, Compass,
  Clock, FileText, TrendingUp, Heart,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   TOKENS
═══════════════════════════════════════════════════ */
const C = {
  bg:       "#F8F4EC",
  bgSoft:   "#FFFDF8",
  navy:     "#0A2E8A",
  gold:     "#F5A623",
  text:     "#10204E",
  muted:    "#5A6A8A",
  border:   "rgba(10,46,138,0.10)",
  cardBg:   "rgba(255,255,255,0.85)",
};

const font = "'Geist','Geist Variable',sans-serif";
const fontCurvy = "'Caveat','Kalam',cursive";          // warm handwritten feel

/* ═══════════════════════════════════════════════════
   TINY SHARED ATOMS
═══════════════════════════════════════════════════ */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display:       "inline-flex",
      alignItems:    "center",
      gap:           "0.45rem",
      padding:       "0.3rem 1rem",
      borderRadius:  "999px",
      background:    "rgba(10,46,138,0.07)",
      border:        `1px solid ${C.border}`,
      fontFamily:    font,
      fontSize:      "0.67rem",
      fontWeight:    700,
      letterSpacing: "0.14em",
      textTransform: "uppercase" as const,
      color:         C.navy,
      marginBottom:  "1.1rem",
    }}>
      <span style={{ width:6,height:6,borderRadius:"50%",background:C.gold,display:"inline-block" }} />
      {children}
    </span>
  );
}

function SectionTitle({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 style={{
      fontFamily:    font,
      fontWeight:    800,
      fontSize:      "clamp(1.9rem,3.8vw,3.1rem)",
      lineHeight:    1.1,
      letterSpacing: "-0.025em",
      color:         C.text,
      marginBottom:  "1rem",
      textAlign:     center ? "center" : "left",
    }}>
      {children}
    </h2>
  );
}

function Gold({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: C.gold, fontFamily: fontCurvy, fontSize:"1.08em", fontWeight:700 }}>
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div style={{ width:44, height:3, borderRadius:999, background: C.gold, opacity:0.7, margin:"1rem 0" }} />
  );
}

function FadeIn({ children, delay=0, className="" }: { children:React.ReactNode; delay?:number; className?:string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity:0, y:28 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   S1 — HERO
═══════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{
      background:  C.bg,
      minHeight:   "100vh",
      display:     "flex",
      alignItems:  "center",
      position:    "relative",
      overflow:    "hidden",
      padding:     "clamp(80px,12vh,130px) clamp(20px,6vw,96px) clamp(60px,8vh,100px)",
    }}>
      {/* watercolour dot pattern */}
      <div style={{
        position:"absolute", top:0, right:0, width:"55%", height:"100%",
        backgroundImage:`radial-gradient(circle at 70% 30%, rgba(245,166,35,0.10) 0%, transparent 55%),
                         radial-gradient(circle at 90% 70%, rgba(10,46,138,0.07) 0%, transparent 50%)`,
        pointerEvents:"none",
      }} />
      


      <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(40px,5vw,80px)", alignItems:"center" }}>
        

        {/* LEFT — content */}
        <div style={{ marginTop: "84px" }}>
          <FadeIn>
            <Eyebrow>Global Teacher Development Platform</Eyebrow>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 style={{
              fontFamily:    font,
              fontWeight:    800,
              fontSize:      "clamp(2.4rem,5vw,4.2rem)",
              lineHeight:    1.08,
              letterSpacing: "-0.03em",
              color:         C.text,
              marginBottom:  "1.3rem",
            }}>
              Turn Teaching Passion<br />
              Into <Gold>Global Opportunity</Gold>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p style={{ fontFamily:font, fontSize:"clamp(0.9rem,1.1vw,1.05rem)", lineHeight:1.75, color:C.muted, maxWidth:460, marginBottom:"2rem" }}>
              Train, certify, and prepare to teach learners across the world through structured learning,
              assessments, and internationally aligned standards.
            </p>
          </FadeIn>

          <FadeIn delay={0.22}>
            <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
              <a href="#pathway" style={{
                display:"inline-flex", alignItems:"center", gap:"0.5rem",
                padding:"0.82rem 1.8rem", borderRadius:999,
                background: C.navy, color:"#fff",
                fontFamily:font, fontSize:"0.9rem", fontWeight:600,
                textDecoration:"none", letterSpacing:"-0.01em",
                boxShadow:`0 4px 22px rgba(10,46,138,0.28)`,
                transition:"transform 0.2s,box-shadow 0.2s",
              }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 8px 32px rgba(10,46,138,0.38)"; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 4px 22px rgba(10,46,138,0.28)"; }}
              >
                Explore Certification Path <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a href="/dashboard/ttt" style={{
                display:"inline-flex", alignItems:"center",
                padding:"0.82rem 1.8rem", borderRadius:999,
                background:"rgba(255,255,255,0.7)", border:`1.5px solid ${C.border}`,
                color:C.navy, fontFamily:font, fontSize:"0.9rem", fontWeight:600,
                textDecoration:"none", letterSpacing:"-0.01em",
                transition:"transform 0.2s,background 0.2s",
              }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.95)"; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.7)"; }}
              >
                View Teacher Dashboard
              </a>
            </div>
          </FadeIn>

          {/* small trust bar */}
          <FadeIn delay={0.3}>
            <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginTop:"2.2rem", flexWrap:"wrap" }}>
              {["4 Countries","10M+ Users","Internationally Aligned"].map((t,i) => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                  <CheckCircle size={14} style={{ color:C.gold }} strokeWidth={2.5} />
                  <span style={{ fontFamily:font, fontSize:"0.78rem", fontWeight:500, color:C.muted }}>{t}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* RIGHT — hero photo in organic blob + certification roadmap card */}
        <FadeIn delay={0.18}>
          <div style={{ position:"relative" }}>

            {/* Organic painted blob frame */}
            <div style={{ position:"relative", maxWidth:520, margin:"0 auto" }}>
              {/* The blob shape is achieved via border-radius + overflow hidden */}
              <div style={{
                borderRadius:"62% 38% 54% 46% / 48% 58% 42% 52%",
                overflow:"hidden",
                boxShadow:`0 24px 72px rgba(10,46,138,0.14)`,
                border:`3px solid rgba(245,166,35,0.25)`,
                aspectRatio:"1 / 0.85",
              }}>
                <img
                  src="/images/tto.png"
                  alt="Teacher teaching online confidently"
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
                  draggable={false}
                />
              </div>

              {/* Floating cert roadmap card */}
              <div style={{
                position:"absolute", bottom:"-28px", left:"-28px",
                background:"#fff", borderRadius:16, padding:"1.1rem 1.3rem",
                boxShadow:"0 8px 32px rgba(10,46,138,0.14)",
                border:`1px solid ${C.border}`,
                minWidth:172,
              }}>
                <div style={{ fontFamily:font, fontSize:"0.65rem", fontWeight:700, color:C.gold, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.6rem" }}>
                  Certification Path
                </div>
                {["Foundations","Communication","Assessment","Certification","Deployment"].map((step, i) => (
                  <div key={step} style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom: i<4 ? "0.35rem":"0" }}>
                    <div style={{
                      width:18, height:18, borderRadius:"50%",
                      background: i===4 ? C.gold : i<2 ? C.navy : "rgba(10,46,138,0.12)",
                      display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    }}>
                      {i<2 && <CheckCircle size={10} color="#fff" strokeWidth={3} />}
                      {i>=2 && i<4 && <span style={{ width:6,height:6,borderRadius:"50%",background: i===2?C.navy:"rgba(10,46,138,0.35)" }} />}
                      {i===4 && <Star size={9} color="#fff" strokeWidth={2.5} />}
                    </div>
                    <span style={{ fontFamily:font, fontSize:"0.74rem", fontWeight: i===4?700:500, color: i===4?C.gold:C.text }}>
                      {step}
                    </span>
                    {i<4 && (
                      <div style={{ position:"absolute", left:8, top:18+i*26, width:2, height:18, background:"rgba(10,46,138,0.10)", borderRadius:999 }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Small gold star accent */}
              <div style={{
                position:"absolute", top:-16, right:24,
                width:44, height:44, borderRadius:"50%",
                background:C.gold, opacity:0.18,
              }} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S2 — THE PROBLEM
═══════════════════════════════════════════════════ */
const problems = [
  { icon: Globe,       title:"Limited International Pathways",   body:"Most qualified teachers have no clear route to teach globally. Borders, credentials, and complexity block opportunity." },
  { icon: FileText,    title:"Complex Certification Processes",  body:"Fragmented requirements make teacher certification feel impossible — TTT brings it all into one clear journey." },
  { icon: BookOpen,    title:"Lack of Structured Preparation",   body:"Teachers are passionate but lack the structured, internationally-aligned training they need to truly excel." },
  { icon: Compass,     title:"Few Deployment Opportunities",     body:"Even certified educators struggle to find quality teaching placements. We bridge that gap directly." },
];

function ProblemSection() {
  return (
    <section style={{ background: C.bgSoft, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,68px)" }}>
            <Eyebrow>The Challenge</Eyebrow>
            <SectionTitle center>
              Great Teachers Deserve <Gold>Greater Opportunities</Gold>
            </SectionTitle>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.72, color:C.muted, maxWidth:520, margin:"0 auto" }}>
              The world has brilliant educators who are being held back by systems that weren't designed for their ambitions.
            </p>
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"clamp(16px,2vw,24px)" }}>
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={{
                  background:"#fff",
                  borderRadius:18,
                  padding:"clamp(24px,3vw,36px) clamp(20px,2.5vw,28px)",
                  border:`1.5px solid ${C.border}`,
                  boxShadow:"0 2px 18px rgba(10,46,138,0.05)",
                  height:"100%",
                  transition:"transform 0.25s, box-shadow 0.25s",
                }}
                  onMouseEnter={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 12px 36px rgba(10,46,138,0.10)"; }}
                  onMouseLeave={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 18px rgba(10,46,138,0.05)"; }}
                >
                  <div style={{
                    width:48, height:48, borderRadius:14,
                    background:"rgba(10,46,138,0.07)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    marginBottom:"1.1rem",
                  }}>
                    <Icon size={22} style={{ color:C.navy }} strokeWidth={1.8} />
                  </div>
                  <div style={{ width:28, height:2.5, borderRadius:999, background:C.gold, opacity:0.6, marginBottom:"0.9rem" }} />
                  <h3 style={{ fontFamily:font, fontWeight:700, fontSize:"0.98rem", color:C.text, marginBottom:"0.5rem", lineHeight:1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily:font, fontSize:"0.8rem", lineHeight:1.65, color:C.muted, margin:0 }}>
                    {p.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S3 — A TEACHER'S JOURNEY (horizontal timeline)
═══════════════════════════════════════════════════ */
const journey = [
  { step:"01", icon:Lightbulb, title:"Discover",  body:"Explore TTT and understand how your teaching career can go global. Find your path.",       color:"#FDEFC3" },
  { step:"02", icon:BookOpen,  title:"Learn",     body:"Access structured recorded courses aligned to international teaching standards.",           color:"#D6E6FF" },
  { step:"03", icon:Target,    title:"Practice",  body:"Complete assignments, lesson simulations, and project-based learning activities.",          color:"#D9F0E8" },
  { step:"04", icon:ClipboardList, title:"Assess",body:"Undergo comprehensive assessments evaluated by our AI-assisted certification engine.",      color:"#FDEFC3" },
  { step:"05", icon:Globe,     title:"Teach",     body:"Get deployed globally — classrooms, online platforms, and partner institutions.",           color:"#D6E6FF" },
];

function JourneySection() {
  return (
    <section style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)", overflow:"hidden" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>The Journey</Eyebrow>
            <SectionTitle center>
              A Teacher's Path to <Gold>Global Impact</Gold>
            </SectionTitle>
          </div>
        </FadeIn>

        {/* horizontal steps */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"0", position:"relative" }}>
          {/* connecting line */}
          <div style={{ position:"absolute", top:52, left:"10%", right:"10%", height:2, background:`linear-gradient(90deg, ${C.navy}22, ${C.navy}44, ${C.navy}22)`, zIndex:0, borderRadius:999 }} />

          {journey.map((j, i) => {
            const Icon = j.icon;
            return (
              <FadeIn key={j.title} delay={i * 0.12}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", padding:"0 clamp(8px,1.5vw,16px)", position:"relative", zIndex:1 }}>
                  {/* circle */}
                  <div style={{
                    width:56, height:56, borderRadius:"50%",
                    background: i===0||i===3 ? C.gold : C.navy,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:`0 4px 16px rgba(10,46,138,0.18)`,
                    marginBottom:"1.1rem",
                    border:`3px solid #fff`,
                  }}>
                    <Icon size={22} color="#fff" strokeWidth={1.8} />
                  </div>
                  <span style={{ fontFamily:fontCurvy, fontSize:"1.45rem", color:C.gold, fontWeight:700, marginBottom:"0.2rem" }}>
                    {j.step}
                  </span>
                  <h4 style={{ fontFamily:font, fontWeight:800, fontSize:"0.96rem", color:C.text, marginBottom:"0.5rem" }}>
                    {j.title}
                  </h4>
                  <div style={{
                    background:"#fff", borderRadius:12,
                    padding:"0.9rem 1rem",
                    border:`1px solid ${C.border}`,
                    boxShadow:"0 2px 12px rgba(10,46,138,0.05)",
                  }}>
                    <p style={{ fontFamily:font, fontSize:"0.76rem", lineHeight:1.62, color:C.muted, margin:0 }}>
                      {j.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S4 — WHAT IS TTT
═══════════════════════════════════════════════════ */
function WhatIsTTT() {
  return (
    <section style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"clamp(48px,6vw,88px)", alignItems:"center" }}>

        {/* LEFT — editorial text */}
        <FadeIn>
          <div>
            <Eyebrow>About TTT</Eyebrow>
            <SectionTitle>
              What Is <Gold>Teach The Teacher?</Gold>
            </SectionTitle>
            <Divider />
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1.02rem)", lineHeight:1.78, color:C.muted, marginBottom:"1.4rem" }}>
              TTT is WingsUP's flagship teacher development ecosystem — a structured, globally-minded programme
              that prepares passionate educators to teach confidently anywhere in the world.
            </p>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1.02rem)", lineHeight:1.78, color:C.muted, marginBottom:"2rem" }}>
              Through recorded courses, live assessments, internationally-recognised certifications and
              direct deployment opportunities, TTT transforms teaching careers from local to global.
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem" }}>
              {["Structured Courses","Recognised Certificates","Practical Assignments","Global Deployments","Community Support","Progress Tracking"].map(item => (
                <div key={item} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <CheckCircle size={14} style={{ color:C.gold, flexShrink:0 }} strokeWidth={2.5} />
                  <span style={{ fontFamily:font, fontSize:"0.8rem", fontWeight:500, color:C.text }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* RIGHT — TTT visual */}
<FadeIn delay={0.12}>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}
  >
    <img
      src="/images/m1whatisttt.png"
      alt="Teach The Teacher ecosystem"
      style={{
        width: "100%",
        maxWidth: "620px",
        height: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  </div>
</FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S5 — CERTIFICATION PATHWAY
═══════════════════════════════════════════════════ */
const levels = [
  { num:"01", title:"Foundations of Teaching",         desc:"Core pedagogy, classroom management, and learning psychology fundamentals.",                  tag:"4 weeks" },
  { num:"02", title:"Communication & Engagement",      desc:"Effective communication strategies, student engagement techniques, and digital tools.",        tag:"3 weeks" },
  { num:"03", title:"Assessment Design",               desc:"Creating fair, meaningful assessments aligned to international curricula and standards.",       tag:"3 weeks" },
  { num:"04", title:"Teaching Excellence",             desc:"Advanced delivery, differentiation strategies, and lesson planning for diverse classrooms.",    tag:"4 weeks" },
  { num:"05", title:"Global Certification",            desc:"Final review, comprehensive evaluation, and internationally-recognised certification award.",   tag:"2 weeks" },
];

function CertPathSection() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section id="pathway" style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>Certification Pathway</Eyebrow>
            <SectionTitle center>
              Your <Gold>Step-by-Step</Gold> Academic Journey
            </SectionTitle>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.72, color:C.muted, maxWidth:480, margin:"0 auto" }}>
              Five carefully sequenced levels — each building on the last, each bringing you closer to global deployment.
            </p>
          </div>
        </FadeIn>

        <div style={{ position:"relative" }}>
          {/* vertical connector */}
          <div style={{ position:"absolute", left:30, top:28, bottom:28, width:2, background:`linear-gradient(180deg,${C.gold},${C.navy})`, borderRadius:999, opacity:0.25 }} />

          {levels.map((l, i) => (
            <FadeIn key={l.num} delay={i * 0.08}>
              <div
                style={{
                  display:"flex", gap:"1.4rem", marginBottom:"1rem",
                  paddingLeft:"0", position:"relative",
                }}
              >
                {/* level number bubble */}
                <div style={{
                  width:60, height:60, borderRadius:"50%", flexShrink:0,
                  background: i===4 ? C.gold : i<2 ? C.navy : "#fff",
                  border:`2px solid ${i<2?C.navy:i===4?C.gold:C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 3px 14px rgba(10,46,138,0.10)",
                  zIndex:1,
                }}>
                  <span style={{ fontFamily:fontCurvy, fontSize:"1.2rem", fontWeight:700, color: i===4?"#fff":i<2?"#fff":C.navy }}>
                    {l.num}
                  </span>
                </div>

                <div
                  style={{
                    flex:1, background:"#fff",
                    borderRadius:16, padding:"1.1rem 1.4rem",
                    border:`1.5px solid ${open===i?C.gold:C.border}`,
                    boxShadow:`0 2px 16px rgba(10,46,138,0.05)`,
                    cursor:"pointer", transition:"border-color 0.25s, box-shadow 0.25s",
                  }}
                  onClick={() => setOpen(open===i ? null : i)}
                  onMouseEnter={e=>{ if(open!==i)(e.currentTarget as HTMLDivElement).style.borderColor="rgba(10,46,138,0.25)"; }}
                  onMouseLeave={e=>{ if(open!==i)(e.currentTarget as HTMLDivElement).style.borderColor=C.border; }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontFamily:font, fontWeight:800, fontSize:"0.98rem", color:C.text }}>{l.title}</div>
                      <div style={{ fontFamily:font, fontSize:"0.72rem", color:C.gold, fontWeight:600, marginTop:"0.2rem" }}>{l.tag}</div>
                    </div>
                    <motion.div animate={{ rotate: open===i ? 180 : 0 }} transition={{ duration:0.3 }}>
                      <ChevronDown size={18} style={{ color:C.muted }} />
                    </motion.div>
                  </div>
                  <AnimatePresence initial={false}>
                    {open===i && (
                      <motion.div
                        key="body"
                        initial={{ height:0, opacity:0 }}
                        animate={{ height:"auto", opacity:1 }}
                        exit={{ height:0, opacity:0 }}
                        transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
                        style={{ overflow:"hidden" }}
                      >
                        <p style={{ fontFamily:font, fontSize:"0.82rem", lineHeight:1.68, color:C.muted, marginTop:"0.75rem", marginBottom:0 }}>
                          {l.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S6 — RECORDED LEARNING EXPERIENCE
═══════════════════════════════════════════════════ */
const learningFeatures = [
  { icon:Clock,       title:"Self-Paced",               body:"Learn anywhere, anytime at your own pace — no fixed schedule required." },
  { icon:ClipboardList, title:"Built-in Assessments",   body:"Check understanding with quizzes, assignments and practical teaching tasks." },
  { icon:Award,       title:"Earn Certificates",         body:"Earn recognised certificates to boost your teaching career globally." },
  { icon:BarChart2,   title:"Progress Tracking",         body:"Track every module, stay motivated, and know exactly where you stand." },
  { icon:Download,    title:"Downloadable Resources",    body:"Access study materials, lesson templates, and guides — whenever you need." },
];

function LearningSection() {
  return (
    <section style={{ background:C.bgSoft, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.05fr", gap:"clamp(48px,6vw,80px)", alignItems:"center" }}>

        {/* LEFT — features */}
        <FadeIn>
          <div>
            <Eyebrow>Learning Experience</Eyebrow>
            <SectionTitle>
              Learn the Way <Gold>Life Actually Works</Gold>
            </SectionTitle>
            <Divider />
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.75, color:C.muted, marginBottom:"2rem" }}>
              Our recorded learning platform is calm, structured, and centred on you — not on tech for the sake of it.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
              {learningFeatures.map(({ icon: Icon, title, body }) => (
                <div key={title} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                  <div style={{
                    width:40, height:40, borderRadius:12, flexShrink:0,
                    background:"rgba(10,46,138,0.07)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    border:`1px solid ${C.border}`,
                  }}>
                    <Icon size={18} style={{ color:C.navy }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontFamily:font, fontWeight:700, fontSize:"0.9rem", color:C.text, marginBottom:"0.2rem" }}>{title}</div>
                    <div style={{ fontFamily:font, fontSize:"0.78rem", lineHeight:1.62, color:C.muted }}>{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* RIGHT — image */}
        <FadeIn delay={0.14}>
          <div style={{
            borderRadius:"24px 48px 24px 48px",
            overflow:"hidden",
            boxShadow:"0 20px 60px rgba(10,46,138,0.12)",
            border:`2px solid rgba(245,166,35,0.20)`,
            aspectRatio:"4/3",
          }}>
            <img
              src="/images/m1s6.png"
              alt="Teacher studying online with features around her"
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
              draggable={false}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S7 — ASSESSMENT & GROWTH
═══════════════════════════════════════════════════ */
const assessTypes = [
  { icon:ClipboardList, title:"Knowledge Checks",          body:"Short, focused quizzes at the end of every module to reinforce what you've learned." },
  { icon:FileText,      title:"Project Submissions",        body:"Real-world project work that demonstrates your teaching capabilities in practice." },
  { icon:Play,          title:"Teaching Simulations",       body:"Practise delivering lessons in simulated classroom environments before the real thing." },
  { icon:GraduationCap, title:"Certification Review",       body:"Comprehensive final review — thorough, fair, and internationally benchmarked." },
];

function AssessmentSection() {
  return (
    <section style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>Assessment & Growth</Eyebrow>
            <SectionTitle center>
              Meaningful Evaluation — <Gold>Not Just Tests</Gold>
            </SectionTitle>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.72, color:C.muted, maxWidth:480, margin:"0 auto" }}>
              Every assessment is designed to reveal your growth — not trick you. Built by educators, for educators.
            </p>
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"clamp(16px,2vw,22px)" }}>
          {assessTypes.map(({ icon:Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.09}>
              <div style={{
                background:"#fff", borderRadius:18,
                padding:"clamp(22px,3vw,32px) clamp(18px,2.5vw,26px)",
                border:`1.5px solid ${C.border}`,
                boxShadow:"0 2px 16px rgba(10,46,138,0.05)",
                textAlign:"center", height:"100%",
                transition:"transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 12px 32px rgba(10,46,138,0.10)"; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 16px rgba(10,46,138,0.05)"; }}
              >
                <div style={{
                  width:52, height:52, borderRadius:"50%",
                  background:"rgba(10,46,138,0.07)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 1rem",
                }}>
                  <Icon size={22} style={{ color:C.navy }} strokeWidth={1.8} />
                </div>
                <h3 style={{ fontFamily:font, fontWeight:700, fontSize:"0.94rem", color:C.text, marginBottom:"0.5rem" }}>{title}</h3>
                <p style={{ fontFamily:font, fontSize:"0.78rem", lineHeight:1.65, color:C.muted, margin:0 }}>{body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S8 — CAREER OUTCOMES
═══════════════════════════════════════════════════ */
const careers = [
  { icon:Users,       title:"Online Educator",        body:"Teach globally from home — on your schedule, at your terms.", color:"#D6E6FF" },
  { icon:Heart,       title:"Private Tutor",           body:"Build a sustainable private practice with internationally certified credentials.", color:"#FDEFC3" },
  { icon:Globe,       title:"International Teacher",   body:"Step into classrooms across four continents with confidence and recognised qualifications.", color:"#D9F0E8" },
  { icon:BookOpen,    title:"Curriculum Specialist",   body:"Design and develop curricula for institutions, platforms, and education publishers.", color:"#FFE4E1" },
];

function CareersSection() {
  return (
    <section style={{ background:C.bgSoft, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>Career Outcomes</Eyebrow>
            <SectionTitle center>
              Where This Journey <Gold>Can Take You</Gold>
            </SectionTitle>
          </div>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"clamp(16px,2vw,22px)" }}>
          {careers.map(({ icon:Icon, title, body, color }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div style={{
                background:"#fff", borderRadius:20,
                overflow:"hidden",
                border:`1.5px solid ${C.border}`,
                boxShadow:"0 2px 16px rgba(10,46,138,0.05)",
                height:"100%",
                transition:"transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 16px 40px rgba(10,46,138,0.10)"; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 16px rgba(10,46,138,0.05)"; }}
              >
                <div style={{ height:80, background:color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon size={30} style={{ color:C.navy }} strokeWidth={1.6} />
                </div>
                <div style={{ padding:"1.2rem 1.4rem" }}>
                  <h3 style={{ fontFamily:font, fontWeight:800, fontSize:"0.96rem", color:C.text, marginBottom:"0.45rem" }}>{title}</h3>
                  <p style={{ fontFamily:font, fontSize:"0.78rem", lineHeight:1.65, color:C.muted, margin:0 }}>{body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S9 — GLOBAL OPPORTUNITIES
═══════════════════════════════════════════════════ */
const destinations = [
  { flag:"🇺🇸", country:"USA",          note:"Teach diverse, multicultural classroom communities." },
  { flag:"🇨🇦", country:"Canada",       note:"Build stronger newcomer education programmes." },
  { flag:"🇬🇧", country:"UK",           note:"Support of a legacy of education and innovation." },
  { flag:"🇦🇺", country:"Australia",    note:"Experience vibrant classrooms, bridge the future." },
  { flag:"🇦🇪", country:"Middle East",  note:"Expanding learner access. Global impact. Bold presence." },
];

function GlobalSection() {
  return (
    <section style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>Global Opportunities</Eyebrow>
            <SectionTitle center>
              Teaching <Gold>Beyond Borders</Gold>
            </SectionTitle>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.72, color:C.muted, maxWidth:460, margin:"0 auto" }}>
              Multiple pathways. One purpose. Your TTT certification opens doors you didn't know were there.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
  <div
    style={{
      marginBottom: "clamp(32px,4vw,48px)",
    }}
  >
    <img
      src="/images/m1s10.png"
      alt="Teacher looking at the global teaching opportunity map"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
      draggable={false}
    />
  </div>
</FadeIn>

        {/* destination cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"clamp(12px,1.5vw,18px)" }}>
          {destinations.map(({ flag, country, note }, i) => (
            <FadeIn key={country} delay={i * 0.09}>
              <div style={{
                background:"#fff", borderRadius:16,
                padding:"1.2rem 1rem", textAlign:"center",
                border:`1.5px solid ${C.border}`,
                boxShadow:"0 2px 14px rgba(10,46,138,0.05)",
                transition:"transform 0.22s, box-shadow 0.22s",
              }}
                onMouseEnter={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 10px 28px rgba(10,46,138,0.09)"; }}
                onMouseLeave={e=>{ (e.currentTarget as HTMLDivElement).style.transform="translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow="0 2px 14px rgba(10,46,138,0.05)"; }}
              >
                <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>{flag}</div>
                <div style={{ fontFamily:font, fontWeight:800, fontSize:"0.88rem", color:C.navy, marginBottom:"0.35rem" }}>{country}</div>
                <div style={{ fontFamily:font, fontSize:"0.71rem", lineHeight:1.55, color:C.muted }}>{note}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S10 — DASHBOARD PREVIEW
═══════════════════════════════════════════════════ */
function DashboardSection() {
  return (
    <section style={{ background:C.bgSoft, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(40px,5vw,60px)" }}>
            <Eyebrow>Teacher Workspace</Eyebrow>
            <SectionTitle center>Your <Gold>Teacher Dashboard</Gold></SectionTitle>
            <p style={{ fontFamily:font, fontSize:"clamp(0.88rem,1.05vw,1rem)", lineHeight:1.72, color:C.muted, maxWidth:460, margin:"0 auto" }}>
              Everything you need — courses, certificates, assessments, opportunities — in one calm, organised space.
            </p>
          </div>
        </FadeIn>

        {/* Mock dashboard */}
        <FadeIn delay={0.1}>
          <div style={{
            background:"#fff", borderRadius:22,
            border:`1.5px solid ${C.border}`,
            boxShadow:"0 12px 48px rgba(10,46,138,0.10)",
            overflow:"hidden",
          }}>
            {/* chrome bar */}
            <div style={{ background:C.navy, padding:"0.75rem 1.2rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              {["#ff5f57","#febc2e","#28c840"].map(c => (
                <div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }} />
              ))}
              <div style={{ flex:1, textAlign:"center", fontFamily:font, fontSize:"0.72rem", color:"rgba(255,255,255,0.45)" }}>
                dashboard.wingsup.com/ttt
              </div>
            </div>

            {/* dashboard body */}
            <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", minHeight:340 }}>
              {/* sidebar */}
              <div style={{ background:"#F8F4EC", borderRight:`1px solid ${C.border}`, padding:"1.2rem 1rem" }}>
                <div style={{ fontFamily:font, fontSize:"0.65rem", fontWeight:700, color:C.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.8rem" }}>Navigation</div>
                {["My Courses","Certificates","Assessments","Applications","Opportunities"].map((item, i) => (
                  <div key={item} style={{
                    display:"flex", alignItems:"center", gap:"0.6rem",
                    padding:"0.55rem 0.75rem", borderRadius:10, marginBottom:"0.25rem",
                    background: i===0 ? "rgba(10,46,138,0.09)" : "transparent",
                    cursor:"default",
                  }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background: i===0 ? C.navy : "rgba(10,46,138,0.20)" }} />
                    <span style={{ fontFamily:font, fontSize:"0.78rem", fontWeight: i===0?700:400, color: i===0?C.navy:C.muted }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* main area */}
              <div style={{ padding:"1.4rem 1.6rem" }}>
                <div style={{ fontFamily:font, fontWeight:700, fontSize:"0.95rem", color:C.text, marginBottom:"1rem" }}>
                  Welcome back, <span style={{ color:C.navy }}>Priya</span> 👋
                </div>

                {/* stat cards */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0.75rem", marginBottom:"1.2rem" }}>
                  {[
                    { label:"Courses", val:"3/5" }, { label:"Certificates", val:"1" },
                    { label:"Assessments", val:"8" }, { label:"Applications", val:"2" },
                  ].map(s => (
                    <div key={s.label} style={{
                      background:C.bg, borderRadius:12,
                      padding:"0.85rem 1rem",
                      border:`1px solid ${C.border}`,
                    }}>
                      <div style={{ fontFamily:font, fontWeight:800, fontSize:"1.15rem", color:C.navy, letterSpacing:"-0.02em" }}>{s.val}</div>
                      <div style={{ fontFamily:font, fontSize:"0.68rem", color:C.muted, marginTop:"0.1rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* progress bar area */}
                <div style={{ background:C.bg, borderRadius:12, padding:"1rem 1.1rem", border:`1px solid ${C.border}` }}>
                  <div style={{ fontFamily:font, fontWeight:700, fontSize:"0.78rem", color:C.text, marginBottom:"0.7rem" }}>Certification Progress</div>
                  {["Foundations","Communication","Assessment Design"].map((lev, i) => (
                    <div key={lev} style={{ marginBottom:"0.6rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:font, fontSize:"0.68rem", color:C.muted, marginBottom:"0.25rem" }}>
                        <span>{lev}</span><span>{[100,75,40][i]}%</span>
                      </div>
                      <div style={{ height:6, borderRadius:999, background:"rgba(10,46,138,0.08)" }}>
                        <div style={{ height:"100%", borderRadius:999, width:`${[100,75,40][i]}%`, background: i===0?C.gold:C.navy }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ textAlign:"center", marginTop:"2rem" }}>
            <a href="/dashboard/ttt" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              padding:"0.82rem 1.9rem", borderRadius:999,
              background:C.navy, color:"#fff",
              fontFamily:font, fontSize:"0.9rem", fontWeight:600,
              textDecoration:"none", letterSpacing:"-0.01em",
              boxShadow:`0 4px 22px rgba(10,46,138,0.28)`,
              transition:"transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 8px 32px rgba(10,46,138,0.38)"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 4px 22px rgba(10,46,138,0.28)"; }}
            >
              Launch Dashboard <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S11 — SUCCESS STORIES
═══════════════════════════════════════════════════ */
const stories = [
  {
    name:"Ananya Sharma", from:"India → Canada",
    quote:"TTT didn't just give me a certificate. It gave me the confidence to walk into an international classroom and truly belong there.",
    role:"Online Educator, Toronto",
    featured: true,
  },
  {
    name:"Michael Osei", from:"Ghana → UK",
    quote:"The structured pathway made everything feel achievable. Six months later I was teaching in London.",
    role:"Secondary School Teacher",
    featured: false,
  },
  {
    name:"Maria Santos", from:"Philippines → UAE",
    quote:"I finally had a globally recognised qualification that matched my experience. TTT bridged that gap perfectly.",
    role:"Curriculum Specialist, Dubai",
    featured: false,
  },
];

function StoriesSection() {
  return (
    <section style={{ background:C.bg, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,64px)" }}>
            <Eyebrow>Success Stories</Eyebrow>
            <SectionTitle center>
              Teachers Who <Gold>Made the Leap</Gold>
            </SectionTitle>
          </div>
        </FadeIn>

        {/* Featured story */}
        <FadeIn>
          <div style={{
            background:"#fff", borderRadius:22,
            padding:"clamp(28px,4vw,52px)",
            border:`1.5px solid ${C.border}`,
            boxShadow:"0 8px 36px rgba(10,46,138,0.08)",
            marginBottom:"1.2rem",
            display:"grid", gridTemplateColumns:"auto 1fr",
            gap:"clamp(24px,4vw,48px)", alignItems:"center",
          }}>
            {/* avatar blob */}
            <div style={{
              width:90, height:90, borderRadius:"40% 60% 55% 45% / 50% 45% 55% 50%",
              background:"rgba(10,46,138,0.10)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0,
              border:`3px solid rgba(245,166,35,0.30)`,
            }}>
              <Users size={36} style={{ color:C.navy }} strokeWidth={1.5} />
            </div>
            <div>
              <div style={{ display:"flex", gap:"0.35rem", marginBottom:"0.8rem" }}>
                {[...Array(5)].map((_,i) => <Star key={i} size={14} style={{ color:C.gold }} strokeWidth={0} fill={C.gold} />)}
              </div>
              <p style={{ fontFamily:fontCurvy, fontSize:"clamp(1.1rem,1.8vw,1.45rem)", lineHeight:1.5, color:C.text, marginBottom:"1rem", fontWeight:600 }}>
                "{stories[0].quote}"
              </p>
              <div>
                <div style={{ fontFamily:font, fontWeight:700, fontSize:"0.88rem", color:C.navy }}>{stories[0].name}</div>
                <div style={{ fontFamily:font, fontSize:"0.74rem", color:C.muted }}>{stories[0].from} · {stories[0].role}</div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Smaller stories */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          {stories.slice(1).map((s, i) => (
            <FadeIn key={s.name} delay={i * 0.1}>
              <div style={{
                background:"#fff", borderRadius:18,
                padding:"1.4rem 1.6rem",
                border:`1.5px solid ${C.border}`,
                boxShadow:"0 2px 16px rgba(10,46,138,0.05)",
              }}>
                <div style={{ display:"flex", gap:"0.3rem", marginBottom:"0.7rem" }}>
                  {[...Array(5)].map((_,j) => <Star key={j} size={12} fill={C.gold} strokeWidth={0} style={{ color:C.gold }} />)}
                </div>
                <p style={{ fontFamily:fontCurvy, fontSize:"1.05rem", lineHeight:1.55, color:C.text, marginBottom:"0.9rem", fontWeight:500 }}>
                  "{s.quote}"
                </p>
                <div style={{ fontFamily:font, fontWeight:700, fontSize:"0.82rem", color:C.navy }}>{s.name}</div>
                <div style={{ fontFamily:font, fontSize:"0.7rem", color:C.muted }}>{s.from} · {s.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   S12 — FAQ
═══════════════════════════════════════════════════ */
const faqs = [
  { q:"Who can join TTT?", a:"Any educator — whether you're a qualified teacher, a subject expert, or someone passionate about education — is welcome. No prior international teaching experience required." },
  { q:"How long does certification take?", a:"The full pathway typically takes 16 weeks of self-paced learning. You can go faster or slower depending on your schedule." },
  { q:"Do I need teaching experience?", a:"Some experience is helpful but not mandatory. Our Foundations level is designed to welcome educators at all stages." },
  { q:"Is the learning fully self-paced?", a:"Yes. All recorded content is available on-demand. You set your own schedule and progress at your own rhythm." },
  { q:"Is the certification internationally recognised?", a:"Yes. TTT certifications are aligned to international teaching frameworks and recognised by our growing network of institutional partners." },
  { q:"What happens after I certify?", a:"You gain access to our global deployment network — real teaching opportunities in the USA, Canada, UK, Australia, and the Middle East." },
  { q:"Is there any community support?", a:"Absolutely. Every student joins the TTT community — live Q&As, peer groups, mentor sessions, and ongoing career guidance." },
  { q:"How much does TTT cost?", a:"Flexible pricing plans are available including monthly subscriptions and one-time access options. Institutional partnerships available." },
];

function FAQSection() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <section style={{ background:C.bgSoft, padding:"clamp(72px,10vw,110px) clamp(20px,6vw,96px)" }}>
      <div style={{ maxWidth:780, margin:"0 auto" }}>
        <FadeIn>
          <div style={{ textAlign:"center", marginBottom:"clamp(44px,6vw,60px)" }}>
            <Eyebrow>Frequently Asked</Eyebrow>
            <SectionTitle center>
              Everything You <Gold>Wanted to Know</Gold>
            </SectionTitle>
          </div>
        </FadeIn>

        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          {faqs.map((f, i) => (
            <FadeIn key={f.q} delay={i * 0.05}>
              <div
                style={{
                  background:"#fff", borderRadius:14,
                  border:`1.5px solid ${open===i ? C.gold : C.border}`,
                  boxShadow:"0 2px 14px rgba(10,46,138,0.04)",
                  overflow:"hidden", cursor:"pointer",
                  transition:"border-color 0.25s",
                }}
                onClick={() => setOpen(open===i ? null : i)}
              >
                <div style={{ padding:"1.1rem 1.4rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontFamily:font, fontWeight:700, fontSize:"0.9rem", color:C.text }}>{f.q}</span>
                  <motion.div animate={{ rotate: open===i?180:0 }} transition={{ duration:0.3 }}>
                    <ChevronDown size={17} style={{ color:C.muted, flexShrink:0 }} />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {open===i && (
                    <motion.div
                      key="ans"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:"auto", opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
                      style={{ overflow:"hidden" }}
                    >
                      <div style={{ padding:"0 1.4rem 1.1rem" }}>
                        <div style={{ height:1, background:C.border, marginBottom:"0.9rem" }} />
                        <p style={{ fontFamily:font, fontSize:"0.82rem", lineHeight:1.7, color:C.muted, margin:0 }}>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FINAL CTA
═══════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section style={{
      background:  C.bg,
      padding:     "clamp(80px,12vw,140px) clamp(20px,6vw,96px)",
      textAlign:   "center",
      position:    "relative",
      overflow:    "hidden",
    }}>
      {/* warm orbs */}
      <div style={{ position:"absolute", top:"-60px", left:"20%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(245,166,35,0.12), transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-60px", right:"15%", width:240, height:240, borderRadius:"50%", background:"radial-gradient(circle, rgba(10,46,138,0.07), transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth:680, margin:"0 auto", position:"relative", zIndex:1 }}>
        <FadeIn>
          <Eyebrow>Begin Your Journey</Eyebrow>
          <h2 style={{
            fontFamily:font, fontWeight:800,
            fontSize:"clamp(2.2rem,5vw,4rem)",
            lineHeight:1.08, letterSpacing:"-0.03em",
            color:C.text, marginBottom:"0.7rem",
          }}>
            The World Needs
          </h2>
          <h2 style={{
            fontFamily:fontCurvy,
            fontSize:"clamp(2.4rem,5.5vw,4.4rem)",
            fontWeight:700, color:C.gold,
            lineHeight:1.08, marginBottom:"1.4rem",
          }}>
            Great Teachers.
          </h2>
          <p style={{ fontFamily:font, fontSize:"clamp(0.9rem,1.1vw,1.05rem)", lineHeight:1.72, color:C.muted, marginBottom:"2.2rem" }}>
            Let's prepare you for it.
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#pathway" style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              padding:"0.9rem 2rem", borderRadius:999,
              background:C.navy, color:"#fff",
              fontFamily:font, fontSize:"0.95rem", fontWeight:600,
              textDecoration:"none", letterSpacing:"-0.01em",
              boxShadow:`0 4px 24px rgba(10,46,138,0.30)`,
              transition:"transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 8px 36px rgba(10,46,138,0.40)"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow="0 4px 24px rgba(10,46,138,0.30)"; }}
            >
              Start Your Journey <ArrowRight size={15} strokeWidth={2.5} />
            </a>
            <a href="/dashboard/ttt" style={{
              display:"inline-flex", alignItems:"center",
              padding:"0.9rem 2rem", borderRadius:999,
              background:"rgba(255,255,255,0.72)", border:`1.5px solid ${C.border}`,
              color:C.navy, fontFamily:font, fontSize:"0.95rem", fontWeight:600,
              textDecoration:"none", letterSpacing:"-0.01em",
              transition:"transform 0.2s, background 0.2s",
            }}
              onMouseEnter={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.95)"; }}
              onMouseLeave={e=>{ (e.currentTarget as HTMLAnchorElement).style.transform="translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(255,255,255,0.72)"; }}
            >
              Open Teacher Dashboard
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FONT IMPORT + ROOT EXPORT
═══════════════════════════════════════════════════ */
export default function TTTPage() {
  return (
    <>
      {/* Caveat for curvy gold text */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');`}</style>
      <main style={{ fontFamily:font }}>
        <HeroSection />
        <ProblemSection />
        <JourneySection />
        <WhatIsTTT />
        <CertPathSection />
        <LearningSection />
        <AssessmentSection />
        <CareersSection />
        <GlobalSection />
        <DashboardSection />
        <StoriesSection />
        <FAQSection />
        <FinalCTA />
      </main>
    </>
  );
}