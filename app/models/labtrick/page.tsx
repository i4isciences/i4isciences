"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   GEIST FONT + GLOBAL STYLES
───────────────────────────────────────────── */
const GeistStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{font-family:'Geist',sans-serif;background:#fff;color:#0F172A;}

    :root{
      --navy:#0A2E8A;
      --gold:#F5A623;
      --chem:#22C55E;
      --phys:#3B82F6;
      --bio:#14B8A6;
      --bg0:#FFFFFF;
      --bg1:#F7F9FC;
      --bg2:#F3F7FD;
      --text:#0F172A;
      --muted:#64748B;
    }

    .container{max-width:1200px;margin:0 auto;padding:0 24px;}
    .gold{color:var(--gold);}

    .section-label{
      display:inline-flex;align-items:center;gap:8px;
      font-size:11px;font-weight:800;letter-spacing:.14em;
      text-transform:uppercase;color:var(--gold);margin-bottom:16px;
    }
    .section-label::before{
      content:'';display:inline-block;width:20px;height:2px;
      background:var(--gold);border-radius:2px;
    }
    .section-title{
      font-size:clamp(30px,4vw,50px);font-weight:900;
      line-height:1.1;color:var(--navy);letter-spacing:-.02em;
    }
    .section-sub{
      font-size:17px;color:var(--muted);line-height:1.75;margin-top:16px;
    }

    /* FADE UP */
    .fade-up{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
    .fade-up.visible{opacity:1;transform:none;}
    .d1{transition-delay:.08s;} .d2{transition-delay:.18s;} .d3{transition-delay:.28s;} .d4{transition-delay:.38s;} .d5{transition-delay:.48s;}

    /* ═══════════ NAV (UNTOUCHED) ═══════════ */
    nav{
      position:fixed;top:0;left:0;right:0;z-index:100;
      background:rgba(255,255,255,.92);backdrop-filter:blur(12px);
      border-bottom:1px solid #E2E8F0;
      height:64px;display:flex;align-items:center;
    }
    .nav-inner{display:flex;align-items:center;justify-content:space-between;width:100%;}
    .nav-logo{font-size:20px;font-weight:800;color:var(--navy);}
    .nav-logo span{color:var(--gold);}
    .nav-links{display:flex;gap:28px;list-style:none;}
    .nav-links a{font-size:14px;font-weight:500;color:var(--muted);text-decoration:none;transition:color .2s;}
    .nav-links a:hover{color:var(--navy);}
    .nav-cta{
      background:var(--navy);color:#fff;font-size:13px;font-weight:700;
      padding:9px 20px;border-radius:8px;text-decoration:none;transition:opacity .2s;
    }
    .nav-cta:hover{opacity:.85;}

    /* ═══════════ HERO ═══════════ */
    #hero{
      min-height:100vh;display:flex;align-items:center;
      padding-top:64px;overflow:hidden;position:relative;
      background:#fff;
    }
    /* animated science doodles background */
    .hero-canvas{
      position:absolute;inset:0;pointer-events:none;overflow:hidden;
    }
    .doodle{
      position:absolute;opacity:.055;
      animation:drifts 18s ease-in-out infinite;
    }
    @keyframes drifts{
      0%,100%{transform:translateY(0) rotate(0deg);}
      33%{transform:translateY(-14px) rotate(6deg);}
      66%{transform:translateY(8px) rotate(-4deg);}
    }

    .hero-grid{
      display:grid;grid-template-columns:1fr 1fr;
      gap:56px;align-items:center;padding:88px 0 64px;
      position:relative;z-index:1;
    }
    .hero-pill{
      display:inline-flex;align-items:center;gap:10px;
      background:linear-gradient(90deg,#EFF6FF,#F0FDF4);
      border:1.5px solid #BFDBFE;border-radius:999px;
      padding:7px 16px 7px 10px;margin-bottom:28px;
    }
    .hero-pill-dot{
      width:8px;height:8px;border-radius:50%;background:var(--chem);
      box-shadow:0 0 0 3px rgba(34,197,94,.2);
      animation:ping 2s ease-in-out infinite;
    }
    @keyframes ping{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2);}50%{box-shadow:0 0 0 7px rgba(34,197,94,.05);}}
    .hero-pill span{font-size:12px;font-weight:700;color:var(--navy);letter-spacing:.04em;}

    .hero-h1{
      font-size:clamp(38px,5.5vw,66px);font-weight:900;
      line-height:1.05;color:var(--navy);letter-spacing:-.03em;
    }
    .hero-h1 em{font-style:normal;color:var(--gold);position:relative;}
    .hero-h1 em::after{
      content:'';position:absolute;left:0;bottom:-4px;right:0;height:4px;
      background:var(--gold);border-radius:2px;opacity:.35;
    }
    .hero-sub{font-size:18px;color:var(--muted);line-height:1.75;margin-top:22px;max-width:460px;}
    .hero-actions{display:flex;gap:14px;margin-top:40px;flex-wrap:wrap;}

    .btn-primary{
      background:var(--navy);color:#fff;font-size:15px;font-weight:700;
      padding:14px 28px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-flex;align-items:center;gap:8px;
    }
    .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(10,46,138,.3);}
    .btn-outline{
      background:transparent;color:var(--navy);font-size:15px;font-weight:700;
      padding:14px 28px;border-radius:12px;border:2px solid #BFDBFE;
      text-decoration:none;transition:all .22s;display:inline-block;
    }
    .btn-outline:hover{background:var(--navy);color:#fff;border-color:var(--navy);}

    .hero-img-wrap{
      position:relative;border-radius:24px;overflow:hidden;
      box-shadow:0 40px 100px rgba(10,46,138,.16);
    }
    .hero-img-wrap img{width:100%;display:block;object-fit:cover;}

    .hero-float{
      position:absolute;bottom:20px;left:20px;
      background:rgba(255,255,255,.97);border-radius:14px;
      padding:13px 18px;display:flex;align-items:center;gap:12px;
      box-shadow:0 8px 32px rgba(0,0,0,.13);
    }
    .hero-float-icon{
      width:36px;height:36px;border-radius:10px;
      background:linear-gradient(135deg,var(--chem),#16a34a);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .hero-float b{font-size:13px;font-weight:800;color:var(--navy);display:block;}
    .hero-float small{font-size:11px;color:var(--muted);}

    .hero-tag-right{
      position:absolute;top:20px;right:20px;
      background:var(--navy);border-radius:12px;
      padding:10px 16px;text-align:center;
      box-shadow:0 8px 24px rgba(10,46,138,.3);
    }
    .hero-tag-right b{font-size:22px;font-weight:900;color:#fff;display:block;}
    .hero-tag-right small{font-size:10px;color:rgba(255,255,255,.6);font-weight:600;letter-spacing:.06em;text-transform:uppercase;}

    /* ═══════════ PROBLEM ═══════════ */
    #problem{background:var(--navy);padding:110px 0;overflow:hidden;position:relative;}
    .problem-blob{
      position:absolute;width:500px;height:500px;border-radius:50%;
      background:rgba(255,255,255,.03);top:-100px;right:-100px;pointer-events:none;
    }
    .problem-head{max-width:580px;}
    .problem-head .section-title{color:#fff;}
    .problem-head .section-label{color:rgba(245,166,35,.9);}
    .problem-sub{font-size:17px;color:rgba(255,255,255,.55);margin-top:14px;line-height:1.7;}

    .problem-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:60px;}
    .problem-card{
      background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
      border-radius:20px;padding:32px 26px;position:relative;overflow:hidden;
      transition:background .3s,transform .3s;cursor:default;
    }
    .problem-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:3px;
      border-radius:20px 20px 0 0;
    }
    .problem-card:nth-child(1)::before{background:var(--phys);}
    .problem-card:nth-child(2)::before{background:var(--gold);}
    .problem-card:nth-child(3)::before{background:var(--chem);}
    .problem-card:nth-child(4)::before{background:var(--bio);}
    .problem-card:hover{background:rgba(255,255,255,.1);transform:translateY(-6px);}
    .problem-icon-ring{
      width:52px;height:52px;border-radius:14px;
      display:flex;align-items:center;justify-content:center;margin-bottom:20px;
    }
    .problem-card h3{font-size:17px;font-weight:800;color:#fff;margin-bottom:8px;}
    .problem-card p{font-size:13px;color:rgba(255,255,255,.55);line-height:1.65;}
    .problem-foot{
      text-align:center;margin-top:56px;font-size:14px;font-weight:600;
      color:rgba(255,255,255,.3);letter-spacing:.04em;
    }

    /* ═══════════ WHY ═══════════ */
    #why{background:var(--bg1);padding:110px 0;}
    .why-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
    .why-img-shell{
      position:relative;border-radius:24px;overflow:hidden;
      box-shadow:0 28px 72px rgba(10,46,138,.15);
    }
    .why-img-shell img{width:100%;display:block;object-fit:cover;height:540px;}
    .why-badge{
      position:absolute;bottom:24px;right:24px;
      background:#fff;border-radius:14px;padding:16px 20px;
      box-shadow:0 8px 24px rgba(0,0,0,.12);
    }
    .why-badge-row{display:flex;align-items:center;gap:10px;margin-bottom:4px;}
    .why-badge-bar{height:6px;border-radius:3px;margin-top:6px;}
    .why-benefits{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
    .why-benefit{
      background:#fff;border-radius:14px;padding:18px 16px;
      border:1px solid #E8EFF8;display:flex;align-items:flex-start;gap:12px;
      transition:box-shadow .2s,transform .2s;
    }
    .why-benefit:hover{box-shadow:0 8px 24px rgba(10,46,138,.09);transform:translateY(-2px);}
    .why-benefit-icon{
      width:38px;height:38px;border-radius:10px;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
    }
    .why-benefit h4{font-size:13px;font-weight:800;color:var(--navy);}
    .why-benefit p{font-size:12px;color:var(--muted);margin-top:3px;line-height:1.5;}

    /* ═══════════ HOW IT WORKS ═══════════ */
    #how{background:#fff;padding:110px 0;}
    .how-head{text-align:center;}
    .steps-wrapper{margin-top:72px;position:relative;}

    /* the connecting line */
    .steps-line{
      position:absolute;top:40px;left:calc(100%/18);right:calc(100%/18);
      height:2px;z-index:0;
      background:linear-gradient(90deg,
        var(--phys) 0%,var(--phys) 22%,
        var(--chem) 22%,var(--chem) 55%,
        var(--bio) 55%,var(--bio) 78%,
        var(--gold) 78%,var(--gold) 100%
      );
      opacity:.25;
    }
    .steps-grid{
      display:grid;grid-template-columns:repeat(9,1fr);
      gap:4px;position:relative;z-index:1;
    }
    .step-col{display:flex;flex-direction:column;align-items:center;text-align:center;}
    .step-bubble{
      width:80px;height:80px;border-radius:50%;
      background:#fff;border:2px solid #E2E8F0;
      display:flex;align-items:center;justify-content:center;
      margin-bottom:16px;position:relative;
      transition:border-color .25s,box-shadow .25s,transform .25s;
      cursor:default;
    }
    .step-bubble:hover{
      border-color:var(--navy);
      box-shadow:0 8px 28px rgba(10,46,138,.18);
      transform:scale(1.08);
    }
    .step-num-badge{
      position:absolute;top:-6px;right:-6px;
      width:22px;height:22px;border-radius:50%;
      background:var(--gold);
      font-size:10px;font-weight:900;color:#fff;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #fff;
    }
    .step-label{font-size:11px;font-weight:700;color:var(--navy);line-height:1.4;}
    .step-sub{font-size:10px;color:var(--muted);margin-top:3px;}

    /* ═══════════ ECOSYSTEM ═══════════ */
    #ecosystem{background:#fff;padding:110px 0;text-align:center;}
    .ecosystem-img-wrap{
      max-width:820px;margin:56px auto 0;
      border-radius:24px;overflow:hidden;
      box-shadow:0 20px 60px rgba(10,46,138,.08);
    }
    .ecosystem-img-wrap img{width:100%;display:block;}

    /* ═══════════ DISCIPLINES ═══════════ */
    #disciplines{background:#fff;padding:110px 0;text-align:center;}
    .disc-img-wrap{
      max-width:1100px;margin:56px auto 0;
      border-radius:24px;overflow:hidden;
      box-shadow:0 20px 60px rgba(0,0,0,.07);
    }
    .disc-img-wrap img{width:100%;display:block;}

    /* ═══════════ FOR STUDENTS ═══════════ */
    #students{background:var(--bg1);padding:110px 0;}
    .students-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;}
    .student-cards{display:flex;flex-direction:column;gap:14px;margin-top:32px;}
    .student-card{
      background:#fff;border-radius:14px;padding:20px;
      border:1px solid #E8EFF8;display:flex;align-items:center;gap:16px;
      border-left:4px solid transparent;
      transition:border-color .2s,box-shadow .2s,transform .2s;
    }
    .student-card:nth-child(1){border-left-color:var(--phys);}
    .student-card:nth-child(2){border-left-color:var(--chem);}
    .student-card:nth-child(3){border-left-color:var(--gold);}
    .student-card:nth-child(4){border-left-color:var(--bio);}
    .student-card:nth-child(5){border-left-color:var(--navy);}
    .student-card:hover{box-shadow:0 6px 20px rgba(10,46,138,.09);transform:translateX(4px);}
    .student-card-icon{
      width:44px;height:44px;border-radius:12px;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
    }
    .student-card h4{font-size:14px;font-weight:800;color:var(--navy);}
    .student-card p{font-size:12px;color:var(--muted);margin-top:3px;}

    /* journey timeline on right */
    .journey-box{
      background:var(--navy);border-radius:24px;padding:40px 32px;
      position:relative;overflow:hidden;
    }
    .journey-box::before{
      content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;
      border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none;
    }
    .journey-title{
      font-size:16px;font-weight:900;color:#fff;margin-bottom:32px;
      letter-spacing:-.01em;
    }
    .journey-title span{color:var(--gold);}
    .journey-list{display:flex;flex-direction:column;gap:0;}
    .journey-item{display:flex;gap:16px;align-items:flex-start;}
    .journey-spine{display:flex;flex-direction:column;align-items:center;}
    .journey-circle{
      width:40px;height:40px;border-radius:50%;flex-shrink:0;
      background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);
      display:flex;align-items:center;justify-content:center;
    }
    .journey-line{width:2px;flex:1;min-height:22px;background:rgba(255,255,255,.12);margin:4px 0;}
    .journey-text{padding-top:8px;padding-bottom:20px;}
    .journey-text h4{font-size:13px;font-weight:800;color:#fff;}
    .journey-text p{font-size:11px;color:rgba(255,255,255,.5);margin-top:2px;}

    /* ═══════════ FOR LAB PARTNERS ═══════════ */
    #labs{background:var(--bg2);padding:110px 0;}
    .labs-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
    .lab-perks{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
    .lab-perk{
      background:#fff;border-radius:16px;padding:22px;border:1px solid #E2E8F0;
      transition:box-shadow .2s,transform .2s;
    }
    .lab-perk:hover{box-shadow:0 8px 28px rgba(10,46,138,.1);transform:translateY(-3px);}
    .lab-perk-icon{
      width:44px;height:44px;border-radius:12px;
      display:flex;align-items:center;justify-content:center;margin-bottom:12px;
    }
    .lab-perk h4{font-size:14px;font-weight:800;color:var(--navy);}
    .lab-perk p{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.55;}

    .lab-cta-box{
      background:linear-gradient(135deg,var(--navy) 0%,#1544b8 100%);
      border-radius:18px;padding:32px;margin-top:28px;
      box-shadow:0 16px 48px rgba(10,46,138,.25);
    }
    .lab-cta-box h3{font-size:19px;font-weight:900;color:#fff;margin-bottom:6px;}
    .lab-cta-box p{font-size:13px;color:rgba(255,255,255,.65);margin-bottom:20px;line-height:1.6;}

    .lab-checklist{display:flex;flex-direction:column;gap:12px;}
    .lab-check{
      background:#fff;border-radius:10px;padding:12px 16px;
      font-size:13px;font-weight:700;color:var(--navy);
      display:flex;align-items:center;gap:12px;
    }
    .check-tick{
      width:20px;height:20px;border-radius:6px;background:var(--chem);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }

    /* ═══════════ SAFETY ═══════════ */
    #safety{background:#fff;padding:110px 0;text-align:center;}
    .safety-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px;}
    .safety-card{
      background:var(--bg1);border-radius:20px;padding:36px 26px;text-align:left;
      border:1px solid #E8EFF8;transition:box-shadow .2s,transform .2s;position:relative;overflow:hidden;
    }
    .safety-card::after{
      content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
      border-radius:0 0 20px 20px;opacity:0;transition:opacity .25s;
    }
    .safety-card:nth-child(1)::after,.safety-card:nth-child(4)::after{background:var(--navy);}
    .safety-card:nth-child(2)::after,.safety-card:nth-child(5)::after{background:var(--chem);}
    .safety-card:nth-child(3)::after,.safety-card:nth-child(6)::after{background:var(--gold);}
    .safety-card:hover{box-shadow:0 10px 32px rgba(10,46,138,.1);transform:translateY(-4px);}
    .safety-card:hover::after{opacity:1;}
    .safety-icon-wrap{
      width:52px;height:52px;border-radius:14px;margin-bottom:18px;
      display:flex;align-items:center;justify-content:center;
    }
    .safety-card h3{font-size:16px;font-weight:800;color:var(--navy);margin-bottom:8px;}
    .safety-card p{font-size:13px;color:var(--muted);line-height:1.65;}

    /* ═══════════ IMPACT ═══════════ */
    #impact{background:var(--bg1);padding:110px 0;text-align:center;}
    .impact-grid{
      display:grid;grid-template-columns:repeat(5,1fr);
      gap:18px;margin-top:56px;
    }
    .impact-card{
      background:#fff;border-radius:20px;padding:40px 20px;
      border:1px solid #E8EFF8;position:relative;overflow:hidden;
      transition:box-shadow .2s,transform .2s;
    }
    .impact-card:hover{box-shadow:0 12px 36px rgba(10,46,138,.1);transform:translateY(-4px);}
    .impact-bar{
      position:absolute;top:0;left:0;right:0;height:4px;
    }
    .impact-card:nth-child(1) .impact-bar{background:var(--phys);}
    .impact-card:nth-child(2) .impact-bar{background:var(--chem);}
    .impact-card:nth-child(3) .impact-bar{background:var(--bio);}
    .impact-card:nth-child(4) .impact-bar{background:var(--gold);}
    .impact-card:nth-child(5) .impact-bar{background:var(--navy);}
    .impact-number{
      font-size:clamp(30px,3.5vw,46px);font-weight:900;color:var(--navy);
      letter-spacing:-.03em;line-height:1;
    }
    .impact-number span{color:var(--gold);}
    .impact-label{font-size:12px;color:var(--muted);margin-top:10px;font-weight:600;letter-spacing:.02em;}

    /* ═══════════ CAREERS ═══════════ */
    #careers{background:var(--navy);padding:110px 0;text-align:center;overflow:hidden;position:relative;}
    .careers-orb{
      position:absolute;width:600px;height:600px;border-radius:50%;
      border:1px solid rgba(255,255,255,.04);
      top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
    }
    .careers-orb2{
      position:absolute;width:400px;height:400px;border-radius:50%;
      border:1px solid rgba(255,255,255,.06);
      top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
    }
    #careers .section-title{color:#fff;}
    #careers .section-label{color:rgba(245,166,35,.85);}
    .careers-sub{font-size:16px;color:rgba(255,255,255,.5);margin-top:12px;line-height:1.7;}

    .careers-path{
      display:flex;align-items:center;justify-content:center;
      flex-wrap:wrap;gap:0;margin-top:72px;position:relative;z-index:1;
    }
    .career-node{
      display:flex;flex-direction:column;align-items:center;gap:10px;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
      border-radius:18px;padding:22px 18px;min-width:106px;
      transition:background .25s,transform .25s,border-color .25s;
    }
    .career-node:hover{
      background:rgba(255,255,255,.14);transform:translateY(-6px);
      border-color:rgba(245,166,35,.4);
    }
    .career-node-icon{
      width:48px;height:48px;border-radius:14px;
      background:rgba(255,255,255,.1);
      display:flex;align-items:center;justify-content:center;
    }
    .career-node p{font-size:12px;font-weight:800;color:#fff;letter-spacing:.03em;}
    .career-arrow{
      color:rgba(255,255,255,.2);font-size:18px;
      padding:0 6px;font-weight:300;
    }

    /* ═══════════ FINAL CTA ═══════════ */
    #cta-final{
      background:linear-gradient(135deg,#0A2E8A 0%,#1544b8 60%,#0A2E8A 100%);
      padding:130px 0;text-align:center;
    }
    #cta-final .section-title{color:#fff;font-size:clamp(34px,5vw,58px);}
    .cta-sub{font-size:18px;color:rgba(255,255,255,.65);max-width:520px;margin:18px auto 0;line-height:1.7;}
    .cta-buttons{display:flex;gap:16px;justify-content:center;margin-top:48px;flex-wrap:wrap;}
    .btn-white{
      background:#fff;color:var(--navy);font-size:15px;font-weight:800;
      padding:16px 34px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-block;
    }
    .btn-white:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.22);}
    .btn-gold{
      background:var(--gold);color:#fff;font-size:15px;font-weight:800;
      padding:16px 34px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-block;
    }
    .btn-gold:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(245,166,35,.45);}

    /* ═══════════ FOOTER (UNTOUCHED) ═══════════ */
    footer{
      background:#020B1E;padding:32px 0;text-align:center;
      font-size:13px;color:rgba(255,255,255,.35);
    }
    footer span{color:var(--gold);}

    /* ═══════════ RESPONSIVE ═══════════ */
    @media(max-width:960px){
      .hero-grid,.why-grid,.students-grid,.labs-grid{grid-template-columns:1fr;}
      .hero-img-wrap{display:none;}
      .problem-grid{grid-template-columns:1fr 1fr;}
      .impact-grid{grid-template-columns:repeat(3,1fr);}
      .steps-grid{grid-template-columns:repeat(3,1fr);gap:24px;}
      .steps-line{display:none;}
      .nav-links{display:none;}
    }
    @media(max-width:600px){
      .problem-grid,.why-benefits,.lab-perks,.safety-grid{grid-template-columns:1fr;}
      .impact-grid{grid-template-columns:1fr 1fr;}
      .careers-path{gap:6px;}
      .career-arrow{display:none;}
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   CUSTOM SVG ICON LIBRARY  (zero emojis)
───────────────────────────────────────────── */
type IconProps = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const Icon = ({
  name,
  size = 22,
  color = "currentColor",
  strokeWidth = 1.7,
}: IconProps) => {  const s = { width: size, height: size, display: "block" };
const p = {
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
};  switch (name) {
    /* nav live dot */
    case "live": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="3" fill={color} stroke="none"/>
        <circle cx="12" cy="12" r="6" strokeOpacity=".4"/>
        <circle cx="12" cy="12" r="10" strokeOpacity=".15"/>
      </svg>
    );
    /* hero arrow */
    case "arrow-right": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    );
    /* problem: no lab */
    case "building-off": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 21h18M5 21V7l7-4 7 4v14"/>
        <path d="M9 9h2v3H9zM13 9h2v3h-2zM9 15h2v6H9zM13 15h2v6h-2z" fill={color} stroke="none" opacity=".25"/>
        <line x1="3" y1="3" x2="21" y2="21"/>
      </svg>
    );
    /* problem: no equipment */
    case "flask-off": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 3h6M10 3v5l-6 13h16l-2-4.3"/>
        <line x1="3" y1="3" x2="21" y2="21"/>
      </svg>
    );
    /* problem: exam */
    case "clipboard-x": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="10" y1="12" x2="14" y2="16"/><line x1="14" y1="12" x2="10" y2="16"/>
      </svg>
    );
    /* problem: rural */
    case "map-pin-off": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M17.8 17.8A9 9 0 0 1 3 12c0-3.3 1.8-6.2 4.4-7.8M12 3a9 9 0 0 1 9 9c0 1.6-.4 3-.1 4.3"/>
        <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <line x1="3" y1="3" x2="21" y2="21"/>
        <path d="M12 12v9l3-3"/>
      </svg>
    );
    /* why: bulb / understanding */
    case "lightbulb": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2-.5.3-.5.8-.5 1.3V17H9v-.5c0-.5 0-1-.5-1.3A7 7 0 0 1 12 2z"/>
      </svg>
    );
    /* why: brain / retention */
    case "brain": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.1A2.5 2.5 0 0 0 4.5 7a2.5 2.5 0 0 0 0 5 2.5 2.5 0 0 0 2 4.9A2.5 2.5 0 0 0 9.5 19h5a2.5 2.5 0 0 0 3-2.1A2.5 2.5 0 0 0 19.5 12a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.5-2.4V4.5A2.5 2.5 0 0 0 14.5 2z"/>
        <line x1="12" y1="6" x2="12" y2="19"/>
        <path d="M9 9h3M12 13h3"/>
      </svg>
    );
    /* why: trophy / confidence */
    case "trophy": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M8 21h8M12 17v4"/>
        <path d="M5 3H3v4a4 4 0 0 0 4 4m10-8h2v4a4 4 0 0 1-4 4"/>
        <path d="M7 3h10v8a5 5 0 0 1-10 0V3z"/>
      </svg>
    );
    /* why: rocket / innovation */
    case "rocket": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    );
    /* why: puzzle / problem solving */
    case "puzzle": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M20.59 13.41A2 2 0 0 0 19 13h-1v-2a2 2 0 0 0-2-2h-2V8a2 2 0 1 0-4 0v1H8a2 2 0 0 0-2 2v2H5a2 2 0 1 0 0 4h1v2a2 2 0 0 0 2 2h2v-1a2 2 0 1 1 4 0v1h2a2 2 0 0 0 2-2v-2h1a2 2 0 0 0 1.41-3.41z"/>
      </svg>
    );
    /* why: briefcase / career */
    case "briefcase": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01M2 12h20"/>
      </svg>
    );
    /* steps */
    case "user-circle": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
      </svg>
    );
    case "book-open": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    );
    case "flask": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 3h6M10 3v6.5l-5.5 10a1 1 0 0 0 .9 1.5h13.2a1 1 0 0 0 .9-1.5L14 9.5V3"/>
        <path d="M8 17h8" strokeOpacity=".4"/>
      </svg>
    );
    case "map-pin": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    );
    case "calendar": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    );
    case "shield-check": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    );
    case "microscope": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M6 18h12M6 22h12"/>
        <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M12 6v5m0 0a5 5 0 1 0 5 5H7a5 5 0 0 0 5-5z"/>
        <line x1="12" y1="6" x2="9" y2="3"/><line x1="12" y1="6" x2="15" y2="3"/>
      </svg>
    );
    case "trending-up": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    );
    case "award": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    );
    /* lab partner */
    case "chart-bar": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    );
    case "users": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    );
    case "currency": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="10"/>
        <path d="M15 9.354a4 4 0 1 0 0 5.292M12 7v10M9 8h5.5M9 16h5.5"/>
      </svg>
    );
    case "globe": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    );
    /* safety */
    case "lock": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    );
    case "user-check": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
      </svg>
    );
    case "tool": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    );
    case "clipboard-check": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    );
    case "alert-circle": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    );
    case "bell": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    );
    /* career nodes */
    case "graduation": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
      </svg>
    );
    case "atom": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <circle cx="12" cy="12" r="1" fill={color} stroke="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="4"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>
      </svg>
    );
    case "star": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    );
    case "certificate": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0zM19 11v9l-2-1.5L15 20v-9"/>
      </svg>
    );
    case "cpu": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    );
    case "heart-pulse": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    );
    /* hero science shapes */
    case "dna": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M2 15c6.667-6 13.333 0 20-6M2 9c6.667 6 13.333 0 20 6"/>
        <path d="M2 12h20M7 6.5l2 1M15 16.5l2 1M7 17.5l2-1M15 7.5l2-1"/>
      </svg>
    );
    case "satellite": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="m13 7 1.1-2.9a1 1 0 0 1 1.3-.6l3.1 1.2a1 1 0 0 1 .6 1.3L17.9 9M13 7l2 2m-2-2-2 2m4 0-2 2m0 0-2.9 1.1a1 1 0 0 0-.6 1.3l1.2 3.1a1 1 0 0 0 1.3.6l2.9-1.1"/>
        <path d="M11 9 9 11M2 22 9 15M13 17l2 2"/>
        <circle cx="6" cy="18" r="2"/>
      </svg>
    );
    case "beaker": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M4.5 3h15M6 3v10l-3 7h18l-3-7V3"/>
        <path d="M6 14h12" strokeOpacity=".4"/>
      </svg>
    );
    default: return null;
  }
};

/* ─────────────────────────────────────────────
   INTERSECTION OBSERVER HOOK
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
type CounterProps = {
  target: number;
  suffix?: string;
};

function Counter({ target, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 70;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target);
          setCount(Math.floor(cur));
          if (cur >= target) clearInterval(t);
        }, 1800 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   SVG DOODLES for hero background
───────────────────────────────────────────── */
const HeroDoodles = () => (
  <div className="hero-canvas" aria-hidden="true">
    {/* molecule structure */}
    <svg className="doodle" style={{top:"8%",left:"3%",animationDelay:"0s"}} width="90" height="90" viewBox="0 0 90 90" fill="none" stroke="#0A2E8A" strokeWidth="1.5">
      <circle cx="45" cy="45" r="8"/><circle cx="20" cy="25" r="5"/><circle cx="70" cy="20" r="5"/><circle cx="75" cy="65" r="5"/><circle cx="22" cy="70" r="5"/>
      <line x1="37" y1="40" x2="25" y2="30"/><line x1="53" y1="40" x2="65" y2="25"/><line x1="53" y1="50" x2="70" y2="60"/><line x1="37" y1="50" x2="27" y2="65"/>
    </svg>
    {/* wave */}
    <svg className="doodle" style={{top:"72%",left:"6%",animationDelay:"3s"}} width="120" height="40" viewBox="0 0 120 40" fill="none" stroke="#3B82F6" strokeWidth="2">
      <path d="M0 20c20-20 40 20 60 0s40-20 60 0"/>
    </svg>
    {/* flask */}
    <svg className="doodle" style={{top:"20%",right:"4%",animationDelay:"1.5s"}} width="60" height="80" viewBox="0 0 60 80" fill="none" stroke="#22C55E" strokeWidth="2">
      <path d="M20 5h20M22 5v22L5 72h50L38 27V5"/>
      <path d="M12 55h36" strokeOpacity=".4"/>
      <circle cx="25" cy="62" r="3" fill="#22C55E" opacity=".3"/>
      <circle cx="38" cy="66" r="2" fill="#22C55E" opacity=".3"/>
    </svg>
    {/* sine wave / physics */}
    <svg className="doodle" style={{bottom:"18%",right:"6%",animationDelay:"4s"}} width="100" height="50" viewBox="0 0 100 50" fill="none" stroke="#14B8A6" strokeWidth="2">
      <path d="M0 25 Q12 5 25 25 T50 25 T75 25 T100 25"/>
      <circle cx="50" cy="25" r="4" fill="#14B8A6" opacity=".4"/>
    </svg>
    {/* helix */}
    <svg className="doodle" style={{top:"55%",left:"1%",animationDelay:"6s"}} width="50" height="90" viewBox="0 0 50 90" fill="none" stroke="#F5A623" strokeWidth="1.8">
      <path d="M10 5c20 10 20 20 0 30s-20 20 0 30 20 20 0 30"/><path d="M40 5c-20 10-20 20 0 30s20 20 0 30-20 20 0 30"/>
      <line x1="10" y1="20" x2="40" y2="20" strokeOpacity=".3"/>
      <line x1="10" y1="50" x2="40" y2="50" strokeOpacity=".3"/>
      <line x1="10" y1="80" x2="40" y2="80" strokeOpacity=".3"/>
    </svg>
    {/* atom */}
    <svg className="doodle" style={{top:"35%",right:"2%",animationDelay:"2s"}} width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#0A2E8A" strokeWidth="1.5">
      <circle cx="40" cy="40" r="4" fill="#0A2E8A" opacity=".5"/>
      <ellipse cx="40" cy="40" rx="36" ry="14"/>
      <ellipse cx="40" cy="40" rx="36" ry="14" transform="rotate(60 40 40)"/>
      <ellipse cx="40" cy="40" rx="36" ry="14" transform="rotate(120 40 40)"/>
    </svg>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function LabTricksPage() {
  useReveal();

  return (
    <>
      <GeistStyle />

      {/* ══ NAV — UNTOUCHED ══ */}
      <nav>
        <div className="container">
          <div className="nav-inner">
            <div className="nav-logo">Lab<span>Tricks</span></div>
            <ul className="nav-links">
              <li><a href="#problem">The Problem</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#disciplines">Disciplines</a></li>
              <li><a href="#labs">For Labs</a></li>
              <li><a href="#safety">Safety</a></li>
            </ul>
            <a href="#cta-final" className="nav-cta">Find Nearby Labs →</a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          S1 · HERO
      ══════════════════════════════════════ */}
      <section id="hero">
        <HeroDoodles />
        <div className="container">
          <div className="hero-grid">
            {/* LEFT */}
            <div>
              <div className="hero-pill fade-up">
                <div className="hero-pill-dot" />
                <span>Now Live in 50+ Cities Across India</span>
              </div>
              <h1 className="hero-h1 fade-up d1">
                Science Was Never<br/>
                Meant To Stay Inside<br/>
                A&nbsp;<em>Textbook.</em>
              </h1>
              <p className="hero-sub fade-up d2">
                LabTricks connects students with real laboratories, real equipment,
                and real experiments that transform the way science is learned.
              </p>
              <div className="hero-actions fade-up d3">
                <a href="#disciplines" className="btn-primary">
                  Explore Experiments
                  <Icon name="arrow-right" size={18} color="#fff" strokeWidth={2.2}/>
                </a>
                <a href="#how" className="btn-outline">Find Nearby Labs</a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="fade-up d2">
              <div className="hero-img-wrap">
                <img src="/images/labhero.png" alt="Student scientist performing chemistry experiment" />
                <div className="hero-float">
                  <div className="hero-float-icon">
                    <Icon name="flask" size={20} color="#fff" strokeWidth={1.8}/>
                  </div>
                  <div>
                    <b>Live Sessions Available</b>
                    <small>Chemistry · Physics · Biology</small>
                  </div>
                </div>
                <div className="hero-tag-right">
                  <b>500+</b>
                  <small>Partner Labs</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S2 · THE PROBLEM
      ══════════════════════════════════════ */}
      <section id="problem">
        <div className="problem-blob" />
        <div className="container">
          <div className="problem-head fade-up">
            <span className="section-label">The Reality</span>
            <h2 className="section-title">
              Millions Learn Science.<br/>
              Few <span style={{color:_gold}}>Experience</span> It.
            </h2>
            <p className="problem-sub">
              Across India, millions of students study science without ever setting foot in a functional laboratory. LabTricks was built to close that gap.
            </p>
          </div>

          <div className="problem-grid">
            {[
              {
                icon:"building-off", iconColor:"#93C5FD", iconBg:"rgba(59,130,246,.15)",
                title:"No Lab Access",
                desc:"Thousands of schools operate without a single functional laboratory. Students learn about experiments they've never been able to touch."
              },
              {
                icon:"flask-off", iconColor:"#FCD34D", iconBg:"rgba(245,166,35,.15)",
                title:"Equipment Shortages",
                desc:"Even schools with labs face chronic shortfalls — twenty students sharing one apparatus, observing instead of doing."
              },
              {
                icon:"clipboard-x", iconColor:"#86EFAC", iconBg:"rgba(34,197,94,.15)",
                title:"Exams Without Exposure",
                desc:"Practical exams test skills students have never built. They memorise steps instead of performing them."
              },
              {
                icon:"map-pin-off", iconColor:"#5EEAD4", iconBg:"rgba(20,184,166,.15)",
                title:"Rural & Board Gaps",
                desc:"State board and rural students face the steepest disadvantage. Geography shouldn't determine scientific opportunity."
              },
            ].map((c, i) => (
              <div className={`problem-card fade-up d${i+1}`} key={i}>
                <div className="problem-icon-ring" style={{background:c.iconBg}}>
                  <Icon name={c.icon} size={24} color={c.iconColor} strokeWidth={1.8}/>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <p className="problem-foot fade-up">
            LabTricks closes this gap — one experiment at a time.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S3 · WHY PRACTICAL LEARNING
      ══════════════════════════════════════ */}
      <section id="why">
        <div className="container">
          <div className="why-grid">
            {/* Image */}
            <div className="fade-up">
              <div className="why-img-shell">
                <img src="/images/labs3.png" alt="Student focused on chemistry experiment in real lab" />
                <div className="why-badge">
                  <div className="why-badge-row">
                    <Icon name="trending-up" size={16} color={_chem} strokeWidth={2}/>
                    <span style={{fontSize:12,fontWeight:800,color:_navy}}>Retention Rate</span>
                  </div>
                  <div style={{fontSize:22,fontWeight:900,color:_navy}}>4.7×</div>
                  <div className="why-badge-bar" style={{width:"100%",background:"linear-gradient(90deg,"+_chem+",#16a34a)"}}/>
                  <div style={{fontSize:10,color:_muted,marginTop:6}}>vs. textbook-only learning</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="fade-up d1">
              <span className="section-label">Why It Matters</span>
              <h2 className="section-title">
                Knowledge Becomes<br/>
                Powerful When Students<br/>
                Can <span style={{color:_gold}}>Touch It.</span>
              </h2>
              <p className="section-sub">
                Textbooks describe. Experiments reveal. The difference is curiosity ignited — and a student who remembers why science matters long after the exam.
              </p>
              <div className="why-benefits" style={{marginTop:28}}>
                {[
                  { icon:"lightbulb", bg:"#FEFCE8", c:"#CA8A04", title:"Deeper Understanding", desc:"Concepts stick when experienced, not just read." },
                  { icon:"brain",     bg:"#EFF6FF", c:_phys,     title:"Higher Retention",    desc:"Practical memory far outlasts rote learning." },
                  { icon:"trophy",    bg:"#F0FDF4", c:_chem,     title:"Exam Confidence",     desc:"Students who do it score better on practicals." },
                  { icon:"rocket",    bg:"#FFF7ED", c:"#EA580C",  title:"Innovation Mindset",  desc:"Curiosity nurtured early builds tomorrow's inventors." },
                  { icon:"puzzle",    bg:"#F0FDFA", c:_bio,      title:"Problem Solving",     desc:"Real experiments demand real thinking." },
                  { icon:"briefcase", bg:"#FAF5FF", c:"#9333EA",  title:"Career Readiness",    desc:"Hands-on work connects students to STEM paths." },
                ].map((b, i) => (
                  <div className={`why-benefit fade-up d${(i%3)+1}`} key={i}>
                    <div className="why-benefit-icon" style={{background:b.bg}}>
                      <Icon name={b.icon} size={20} color={b.c} strokeWidth={1.8}/>
                    </div>
                    <div>
                      <h4>{b.title}</h4>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S4 · HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how">
        <div className="container">
          <div className="how-head">
            <div className="fade-up">
              <span className="section-label">The Journey</span>
              <h2 className="section-title">
                A Simple Path From<br/>
                <span style={{color:_gold}}>Theory To Experiment.</span>
              </h2>
              <p className="section-sub" style={{maxWidth:520,margin:"14px auto 0"}}>
                Nine steps from sign-up to certified — every one frictionless.
              </p>
            </div>
          </div>

          <div className="steps-wrapper">
            <div className="steps-line" />
            <div className="steps-grid">
              {[
                { icon:"user-circle", label:"Create Account",     sub:"Sign up free" },
                { icon:"book-open",   label:"Choose Grade",       sub:"Class 6–12" },
                { icon:"flask",       label:"Select Experiment",   sub:"100+ listed" },
                { icon:"map-pin",     label:"Find Nearby Lab",    sub:"Your city" },
                { icon:"calendar",    label:"Book Session",       sub:"Pick a slot" },
                { icon:"shield-check",label:"Verify & Attend",    sub:"Safe entry" },
                { icon:"microscope",  label:"Do the Experiment",  sub:"Hands on" },
                { icon:"trending-up", label:"Track Progress",     sub:"Dashboard" },
                { icon:"award",       label:"Earn Certificate",   sub:"Verified" },
              ].map((s, i) => (
                <div className={`step-col fade-up d${(i%5)+1}`} key={i}>
                  <div className="step-bubble">
                    <Icon name={s.icon} size={28} color={_navy} strokeWidth={1.6}/>
                    <div className="step-num-badge">{i + 1}</div>
                  </div>
                  <div className="step-label">{s.label}</div>
                  <div className="step-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S5 · ECOSYSTEM
      ══════════════════════════════════════ */}
      <section id="ecosystem">
        <div className="container">
          <div className="fade-up">
            <span className="section-label">The Network</span>
            <h2 className="section-title">
              The LabTricks <span style={{color:_gold}}>Ecosystem</span>
            </h2>
            <p className="section-sub" style={{maxWidth:520,margin:"14px auto 0"}}>
              One student at the centre. Every resource, mentor, and institution orbiting their growth.
            </p>
          </div>
          <div className="ecosystem-img-wrap fade-up d1">
            <img src="/images/labs5.png" alt="LabTricks ecosystem — student surrounded by labs, mentors, equipment, schools, parents, and certificates" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S6 · DISCIPLINES
      ══════════════════════════════════════ */}
      <section id="disciplines">
        <div className="container">
          <div className="fade-up">
            <span className="section-label">Explore Science</span>
            <h2 className="section-title">
              Three Worlds.<br/>
              Infinite <span style={{color:_gold}}>Discoveries.</span>
            </h2>
            <p className="section-sub" style={{maxWidth:520,margin:"14px auto 0"}}>
              Chemistry, Physics, Biology — each is a door. LabTricks opens all three for every student.
            </p>
          </div>
          <div className="disc-img-wrap fade-up d1">
            <img src="/images/labs6.png" alt="Chemistry, Physics and Biology lab cards showing real equipment" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S7 · FOR STUDENTS
      ══════════════════════════════════════ */}
      <section id="students">
        <div className="container">
          <div className="students-grid">
            {/* Left */}
            <div>
              <div className="fade-up">
                <span className="section-label">For Students</span>
                <h2 className="section-title">
                  Your Lab.<br/>
                  Your <span style={{color:_gold}}>Moment.</span>
                </h2>
                <p className="section-sub">
                  Whether you&apos;re preparing for board exams or hungry to understand how the world works, LabTricks puts a fully equipped laboratory within reach.
                </p>
              </div>
              <div className="student-cards">
                {[
                  { icon:"microscope",   iconBg:"#EFF6FF", iconC:_phys, title:"Hands-On Learning",   desc:"Real equipment, real reactions, real understanding." },
                  { icon:"clipboard-check",iconBg:"#F0FDF4",iconC:_chem, title:"Exam Preparation",    desc:"Practice exactly what practical papers ask of you." },
                  { icon:"star",         iconBg:"#FFFBEB", iconC:_gold, title:"Confidence Building", desc:"Doing once beats reading a hundred times over." },
                  { icon:"atom",         iconBg:"#F0FDFA", iconC:_bio,  title:"Career Exploration",  desc:"Discover whether medicine, engineering, or research is your path." },
                  { icon:"award",        iconBg:"#F5F3FF", iconC:"#9333EA",title:"Verified Certificates",desc:"Recognised proof of practical experience for your portfolio." },
                ].map((b, i) => (
                  <div className={`student-card fade-up d${(i%4)+1}`} key={i}>
                    <div className="student-card-icon" style={{background:b.iconBg}}>
                      <Icon name={b.icon} size={22} color={b.iconC} strokeWidth={1.7}/>
                    </div>
                    <div>
                      <h4>{b.title}</h4>
                      <p>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: journey */}
            <div className="fade-up d2">
              <div className="journey-box">
                <div className="journey-title">
                  The Student <span>Journey</span>
                </div>
                <div className="journey-list">
                  {[
                    { icon:"graduation",   title:"Curious Student",      desc:"Signs up on LabTricks" },
                    { icon:"book-open",    title:"Discovers Experiments", desc:"Browses 100+ real experiments" },
                    { icon:"map-pin",      title:"Finds a Nearby Lab",   desc:"Picks from verified partners" },
                    { icon:"calendar",     title:"Books a Session",      desc:"Chooses date, time, mentor" },
                    { icon:"flask",        title:"Performs Experiment",   desc:"Hands on in a real lab" },
                    { icon:"trending-up",  title:"Tracks Progress",      desc:"Dashboard updates live" },
                    { icon:"award",        title:"Earns Certificate",    desc:"Verified and downloadable" },
                  ].map((s, i, arr) => (
                    <div className="journey-item" key={i}>
                      <div className="journey-spine">
                        <div className="journey-circle">
                          <Icon name={s.icon} size={18} color="#fff" strokeWidth={1.6}/>
                        </div>
                        {i < arr.length - 1 && <div className="journey-line" />}
                      </div>
                      <div className="journey-text">
                        <h4>{s.title}</h4>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S8 · FOR LAB PARTNERS
      ══════════════════════════════════════ */}
      <section id="labs">
        <div className="container">
          <div className="labs-grid">
            {/* Left */}
            <div>
              <div className="fade-up">
                <span className="section-label">For Lab Partners</span>
                <h2 className="section-title">
                  Turn Existing Laboratories<br/>
                  Into <span style={{color:_gold}}>Learning Hubs.</span>
                </h2>
                <p className="section-sub">
                  Your lab sits idle after hours. LabTricks fills those hours with students who need exactly what you have — and pays you for the impact.
                </p>
              </div>
              <div className="lab-perks">
                {[
                  { icon:"chart-bar", bg:"#EFF6FF", c:_phys, title:"More Utilisation",  desc:"Fill empty lab hours with booked student sessions every week." },
                  { icon:"users",     bg:"#F0FDF4", c:_chem, title:"Wider Reach",       desc:"Connect with hundreds of students across your city." },
                  { icon:"currency",  bg:"#FFFBEB", c:_gold, title:"Additional Revenue",desc:"Turn idle capacity into consistent, meaningful income." },
                  { icon:"globe",     bg:"#F0FDFA", c:_bio,  title:"Community Impact",  desc:"Give every student the lab access they deserve." },
                ].map((p, i) => (
                  <div className={`lab-perk fade-up d${(i%4)+1}`} key={i}>
                    <div className="lab-perk-icon" style={{background:p.bg}}>
                      <Icon name={p.icon} size={22} color={p.c} strokeWidth={1.8}/>
                    </div>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="lab-cta-box fade-up d3">
                <h3>Ready to make a difference?</h3>
                <p>Join 500+ partner laboratories already transforming science education across India.</p>
                <a href="#cta-final" className="btn-white" style={{display:"inline-block"}}>Partner Your Laboratory</a>
              </div>
            </div>

            {/* Right: checklist */}
            <div className="fade-up d2">
              <div style={{
                background:"linear-gradient(160deg,#F0FDF4,#EFF6FF)",
                borderRadius:20,padding:36,height:"100%",
                display:"flex",flexDirection:"column",justifyContent:"center",
                border:"1px solid #E2E8F0"
              }}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
                  <div style={{width:52,height:52,borderRadius:16,background:_navy,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Icon name="beaker" size={26} color="#fff" strokeWidth={1.7}/>
                  </div>
                  <div>
                    <div style={{fontSize:17,fontWeight:900,color:_navy}}>Your Lab Has Potential.</div>
                    <div style={{fontSize:13,color:_muted,marginTop:2}}>We bring the students.</div>
                  </div>
                </div>
                <div className="lab-checklist">
                  {[
                    "List your lab in minutes",
                    "Set your own schedule and availability",
                    "We handle bookings and payments",
                    "Mentors verified by LabTricks",
                    "Safety protocols pre-certified",
                    "Impact dashboard for your records",
                  ].map((item, i) => (
                    <div className="lab-check" key={i}>
                      <div className="check-tick">
                        <Icon name="shield-check" size={13} color="#fff" strokeWidth={2.2}/>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S9 · SAFETY & TRUST
      ══════════════════════════════════════ */}
      <section id="safety">
        <div className="container">
          <div className="fade-up" style={{textAlign:"center"}}>
            <span className="section-label">Safety & Trust</span>
            <h2 className="section-title">
              Parents Can <span style={{color:_gold}}>Rest Easy.</span>
            </h2>
            <p className="section-sub" style={{maxWidth:520,margin:"14px auto 0"}}>
              Every LabTricks session is built on a foundation of verified safety — from the lab to the mentor to the equipment.
            </p>
          </div>
          <div className="safety-grid">
            {[
              { icon:"lock",             bg:"#EFF6FF", c:_navy, title:"Verified Labs",         desc:"Every partner lab passes our rigorous on-site safety and equipment inspection before going live." },
              { icon:"user-check",       bg:"#F0FDF4", c:_chem, title:"Qualified Mentors",     desc:"All mentors hold science degrees and complete LabTricks certification before guiding any student." },
              { icon:"tool",             bg:"#FFFBEB", c:_gold, title:"Safe Equipment",        desc:"All apparatus is tested, calibrated, and maintained to the highest standard between every session." },
              { icon:"clipboard-check",  bg:"#EFF6FF", c:_navy, title:"Attendance Tracking",  desc:"Real-time check-in and check-out lets parents see exactly when their child arrived and departed." },
              { icon:"alert-circle",     bg:"#F0FDF4", c:_chem, title:"Emergency Support",    desc:"Every lab has a designated safety officer and a direct line to LabTricks support at all times." },
              { icon:"bell",             bg:"#FFFBEB", c:_gold, title:"Parent Notifications", desc:"Automated alerts keep parents informed at every stage — booking confirmed, session started, completed." },
            ].map((c, i) => (
              <div className={`safety-card fade-up d${(i%3)+1}`} key={i}>
                <div className="safety-icon-wrap" style={{background:c.bg}}>
                  <Icon name={c.icon} size={24} color={c.c} strokeWidth={1.7}/>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S10 · IMPACT
      ══════════════════════════════════════ */}
      <section id="impact">
        <div className="container">
          <div className="fade-up" style={{textAlign:"center"}}>
            <span className="section-label">Our Impact</span>
            <h2 className="section-title">
              Science Is Moving.<br/>
              <span style={{color:_gold}}>The Numbers Prove It.</span>
            </h2>
          </div>
          <div className="impact-grid">
            {[
              { target:10000,  suffix:"+", label:"Experiments Conducted" },
              { target:500,    suffix:"+", label:"Partner Labs" },
              { target:50,     suffix:"+", label:"Cities" },
              { target:100000, suffix:"+", label:"Students Impacted" },
              { target:95,     suffix:"%", label:"Completion Rate" },
            ].map((stat, i) => (
              <div className={`impact-card fade-up d${(i%5)+1}`} key={i}>
                <div className="impact-bar" />
                <div className="impact-number">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="impact-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S11 · CAREERS
      ══════════════════════════════════════ */}
      <section id="careers">
        <div className="careers-orb" /><div className="careers-orb2" />
        <div className="container" style={{position:"relative",zIndex:1}}>
          <div className="fade-up">
            <span className="section-label">Where It Leads</span>
            <h2 className="section-title" style={{color:"#fff"}}>
              Today&apos;s Experiment.<br/>
              <span style={{color:_gold}}>Tomorrow&apos;s Innovation.</span>
            </h2>
            <p className="careers-sub">
              Every great scientist, engineer, and doctor once held a test tube for the first time.<br/>
              LabTricks makes sure every student gets that moment.
            </p>
          </div>
          <div className="careers-path fade-up d1">
            {[
              { icon:"graduation", label:"Student" },
              { icon:"flask",      label:"Experiment" },
              { icon:"star",       label:"Confidence" },
              { icon:"certificate",label:"Certification" },
              { icon:"atom",       label:"Scientist" },
              { icon:"cpu",        label:"Engineer" },
              { icon:"book-open",  label:"Researcher" },
              { icon:"heart-pulse",label:"Doctor" },
            ].map((n, i, arr) => (
              <div key={i} style={{display:"flex",alignItems:"center"}}>
                <div className="career-node">
                  <div className="career-node-icon">
                    <Icon name={n.icon} size={24} color="#fff" strokeWidth={1.6}/>
                  </div>
                  <p>{n.label}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="career-arrow">&#8250;</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S12 · FINAL CTA
      ══════════════════════════════════════ */}
      <section id="cta-final">
        <div className="container">
          <div className="fade-up">
            <span className="section-label" style={{color:"rgba(255,255,255,.45)"}}>Get Started Today</span>
            <h2 className="section-title" style={{color:"#fff"}}>
              Every Student Deserves<br/>
              The Chance To <span style={{color:_gold}}>Experiment.</span>
            </h2>
            <p className="cta-sub">
              Bring practical science learning to your city, school, or laboratory. The next generation of scientists is waiting.
            </p>
            <div className="cta-buttons">
              <a href="#how" className="btn-white">Find Nearby Labs</a>
              <a href="#labs" className="btn-gold">Partner With LabTricks</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER — UNTOUCHED ══ */}
      <footer>
        <div className="container">
          <p>
            &copy; 2025 <span>LabTricks</span> &middot; A product of{" "}
            <span>i4iSciences</span> &middot; Where Science Leaves The Textbook.
          </p>
        </div>
      </footer>
    </>
  );
}

/* colour constants used inline (avoids var() in JSX style props) */
const _navy = "#0A2E8A";
const _gold = "#F5A623";
const _chem = "#22C55E";
const _phys = "#3B82F6";
const _bio  = "#14B8A6";
const _muted = "#64748B";