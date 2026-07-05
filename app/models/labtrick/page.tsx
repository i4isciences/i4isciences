"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   GEIST FONT + GLOBAL STYLES
   NOTE: everything is now scoped under ".lt-scope"
   so it can never leak onto the shared Navbar/Footer
   or any other page. The old unused "FOOTER" CSS block
   (bare `footer{...}` + `.footer-*` selectors) has been
   removed entirely — LabTricks never rendered its own
   <footer>, so that block only existed to collide with
   the real shared Footer component's <footer> tag.
───────────────────────────────────────────── */
const GeistStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap');

    .lt-scope, .lt-scope *, .lt-scope *::before, .lt-scope *::after{
      box-sizing:border-box;margin:0;padding:0;
    }
    html{scroll-behavior:smooth;}

    .lt-scope{
      font-family:'Geist',sans-serif;
      background:#fff;
      color:#0F172A;

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

    .lt-scope .container{max-width:1200px;margin:0 auto;padding:0 24px;}
    .lt-scope .gold{color:var(--gold);}

    .lt-scope .section-label{
      display:inline-flex;align-items:center;gap:8px;
      font-size:16px;font-weight:800;letter-spacing:.14em;
      text-transform:uppercase;color:var(--gold);margin-bottom:16px;
    }
    .lt-scope .section-label::before{
      content:'';display:inline-block;width:20px;height:2px;
      background:var(--gold);border-radius:2px;
    }
    .lt-scope .section-title{
      font-size:clamp(30px,4vw,50px);font-weight:900;
      line-height:1.1;color:var(--navy);letter-spacing:-.02em;
    }
    .lt-scope .section-sub{
      font-size:17px;color:var(--muted);line-height:1.75;margin-top:16px;
    }

    /* FADE UP */
    .lt-scope .fade-up{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);}
    .lt-scope .fade-up.visible{opacity:1;transform:none;}
    .lt-scope .d1{transition-delay:.08s;} .lt-scope .d2{transition-delay:.18s;} .lt-scope .d3{transition-delay:.28s;} .lt-scope .d4{transition-delay:.38s;} .lt-scope .d5{transition-delay:.48s;}

    .lt-scope .site-logo-sticky{
      position:fixed;
      top:96px;
      right:24px;
      z-index:999;
      background:transparent;
      border:none;
      padding:0;
      transition:transform .25s ease;
    }
    
    .lt-scope .site-logo-image{
      width:90px;
      height:auto;
      display:block;
    }
    
    .lt-scope .site-logo-sticky:hover{
      transform:scale(1.05);
    }
    
    @media(max-width:768px){
      .lt-scope .site-logo-sticky{
        top:84px;
        right:12px;
      }
    
      .lt-scope .site-logo-image{
        width:70px;
      }
    }

    /* ═══════════ HERO ═══════════ */
    .lt-scope #hero{
      min-height:100vh;
      display:flex;
      align-items:center;
      overflow:hidden;
      position:relative;
      background:#fff;
    }
    /* animated science doodles background */
    .lt-scope .hero-canvas{
      position:absolute;inset:0;pointer-events:none;overflow:hidden;
    }
    .lt-scope .doodle{
      position:absolute;opacity:.055;
      animation:lt-drifts 18s ease-in-out infinite;
    }
    @keyframes lt-drifts{
      0%,100%{transform:translateY(0) rotate(0deg);}
      33%{transform:translateY(-14px) rotate(6deg);}
      66%{transform:translateY(8px) rotate(-4deg);}
    }

    .lt-scope .hero-grid{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:56px;
      align-items:center;
      padding:80px 0 64px;
    }
    .lt-scope .hero-pill{
      display:inline-flex;align-items:center;gap:10px;
      background:linear-gradient(90deg,#EFF6FF,#F0FDF4);
      border:1.5px solid #BFDBFE;border-radius:999px;
      padding:7px 16px 7px 10px;margin-bottom:28px;
    }
    .lt-scope .hero-pill-dot{
      width:8px;height:8px;border-radius:50%;background:var(--chem);
      box-shadow:0 0 0 3px rgba(34,197,94,.2);
      animation:lt-ping 2s ease-in-out infinite;
    }
    @keyframes lt-ping{0%,100%{box-shadow:0 0 0 3px rgba(34,197,94,.2);}50%{box-shadow:0 0 0 7px rgba(34,197,94,.05);}}
    .lt-scope .hero-pill span{font-size:12px;font-weight:700;color:var(--navy);letter-spacing:.04em;}

    .lt-scope .hero-h1{
      font-size:clamp(38px,5.5vw,66px);font-weight:900;
      line-height:1.05;color:var(--navy);letter-spacing:-.03em;
    }
    .lt-scope .hero-h1 em{font-style:normal;color:var(--gold);position:relative;}
    .lt-scope .hero-h1 em::after{
      content:'';position:absolute;left:0;bottom:-4px;right:0;height:4px;
      background:var(--gold);border-radius:2px;opacity:.35;
    }
    .lt-scope .hero-sub{
      font-size:17px;
      font-weight:500;
      color:var(--muted);
      line-height:1.75;
      margin-top:24px;
      max-width:560px;
    }
    .lt-scope .hero-actions{display:flex;gap:14px;margin-top:40px;flex-wrap:wrap;}

    .lt-scope .btn-primary{
      background:var(--navy);color:#fff;font-size:15px;font-weight:700;
      padding:14px 28px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-flex;align-items:center;gap:8px;
    }
    .lt-scope .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(10,46,138,.3);}
    .lt-scope .btn-outline{
      background:transparent;color:var(--navy);font-size:15px;font-weight:700;
      padding:14px 28px;border-radius:12px;border:2px solid #BFDBFE;
      text-decoration:none;transition:all .22s;display:inline-block;
    }
    .lt-scope .btn-outline:hover{background:var(--navy);color:#fff;border-color:var(--navy);}

    .lt-scope .hero-img-wrap{
      position:relative;border-radius:24px;overflow:hidden;
      box-shadow:0 40px 100px rgba(10,46,138,.16);
    }
    .lt-scope .hero-img-wrap img{width:100%;display:block;object-fit:cover;}

    .lt-scope .hero-float{
      position:absolute;bottom:20px;left:20px;
      background:rgba(255,255,255,.97);border-radius:14px;
      padding:13px 18px;display:flex;align-items:center;gap:12px;
      box-shadow:0 8px 32px rgba(0,0,0,.13);
    }
    .lt-scope .hero-float-icon{
      width:36px;height:36px;border-radius:10px;
      background:linear-gradient(135deg,var(--chem),#16a34a);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }
    .lt-scope .hero-float b{font-size:13px;font-weight:800;color:var(--navy);display:block;}
    .lt-scope .hero-float small{font-size:11px;color:var(--muted);}

    .lt-scope .hero-tag-right{
      position:absolute;top:20px;right:20px;
      background:var(--navy);border-radius:12px;
      padding:10px 16px;text-align:center;
      box-shadow:0 8px 24px rgba(10,46,138,.3);
    }
    .lt-scope .hero-tag-right b{font-size:22px;font-weight:900;color:#fff;display:block;}
    .lt-scope .hero-tag-right small{font-size:10px;color:rgba(255,255,255,.6);font-weight:600;letter-spacing:.06em;text-transform:uppercase;}

    /* ═══════════ PROBLEM ═══════════ */
    .lt-scope #problem{background:var(--navy);padding:70px 0;overflow:hidden;position:relative;}
    .lt-scope .problem-blob{
      position:absolute;width:500px;height:500px;border-radius:50%;
      background:rgba(255,255,255,.03);top:-100px;right:-100px;pointer-events:none;
    }
    .lt-scope .problem-head{max-width:580px;}
    .lt-scope .problem-head .section-title{color:#fff;}
    .lt-scope .problem-head .section-label{color:rgba(245,166,35,.9);}
    .lt-scope .problem-sub{font-size:18px;color:rgba(245,166,35,.9);margin-top:12px;line-height:1.7;}

    .lt-scope .problem-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:60px;}
    .lt-scope .problem-card{
      background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
      border-radius:20px;padding:32px 26px;position:relative;overflow:hidden;
      transition:background .3s,transform .3s;cursor:default;
    }
    .lt-scope .problem-card::before{
      content:'';position:absolute;top:0;left:0;right:0;height:3px;
      border-radius:20px 20px 0 0;
    }
    .lt-scope .problem-card:nth-child(1)::before{background:var(--phys);}
    .lt-scope .problem-card:nth-child(2)::before{background:var(--gold);}
    .lt-scope .problem-card:nth-child(3)::before{background:var(--chem);}
    .lt-scope .problem-card:nth-child(4)::before{background:var(--bio);}
    .lt-scope .problem-card:hover{background:rgba(255,255,255,.1);transform:translateY(-6px);}
    .lt-scope .problem-icon-ring{
      width:52px;height:52px;border-radius:14px;
      display:flex;align-items:center;justify-content:center;margin-bottom:20px;
    }
    .lt-scope .problem-card h3{font-size:18px;font-weight:800;color:#fff;margin-bottom:8px;}
    .lt-scope .problem-card p{font-size:15px;color:rgba(245,166,35,.9);line-height:1.65;}
    .lt-scope .problem-foot{
      text-align:center;margin-top:56px;font-size:14px;font-weight:600;
      color:rgba(255,255,255,.3);letter-spacing:.04em;
    }

    /* ═══════════ WHY ═══════════ */
    .lt-scope #why{background:var(--bg1);padding:110px 0;}
    .lt-scope .why-stack {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 40px;
    }

    .lt-scope .why-head {
      max-width: 640px;
    }

    .lt-scope .why-img-wrap {
      width: 100%;
      max-width: 520px;
      display: flex;
      justify-content: center;
    }

    .lt-scope .why-benefits-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      width: 100%;
    }

    .lt-scope .why-benefit {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 10px;
    }

    .lt-scope .why-benefit-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .lt-scope .why-benefit h4 {
      margin: 0 0 4px;
    }

    .lt-scope .why-benefit p {
      margin: 0;
    }

    @media (max-width: 900px) {
      .lt-scope .why-benefits-row {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 520px) {
      .lt-scope .why-benefits-row {
        grid-template-columns: 1fr;
      }
    }
    .lt-scope .why-img-shell{
      position:relative;border-radius:24px;overflow:hidden;
      box-shadow:0 28px 72px rgba(10,46,138,.15);
    }
    .lt-scope .why-img-shell img{width:100%;display:block;object-fit:cover;height:400px;}
    .lt-scope .why-badge{
      position:absolute;bottom:24px;right:24px;
      background:#fff;border-radius:14px;padding:16px 20px;
      box-shadow:0 8px 24px rgba(0,0,0,.12);
    }
    .lt-scope .why-badge-row{display:flex;align-items:center;gap:10px;margin-bottom:4px;}
    .lt-scope .why-badge-bar{height:6px;border-radius:3px;margin-top:6px;}
    .lt-scope .why-benefits{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
    .lt-scope .why-benefit{
      background:#fff;border-radius:14px;padding:18px 16px;
      border:1px solid #E8EFF8;display:flex;align-items:flex-start;gap:12px;
      transition:box-shadow .2s,transform .2s;
    }
    .lt-scope .why-benefit:hover{box-shadow:0 8px 24px rgba(10,46,138,.09);transform:translateY(-2px);}
    .lt-scope .why-benefit-icon{
      width:38px;height:38px;border-radius:10px;flex-shrink:0;
      display:flex;align-items:center;justify-content:center;
    }
    .lt-scope .why-benefit h4{font-size:13px;font-weight:800;color:var(--navy);}
    .lt-scope .why-benefit p{font-size:12px;color:var(--muted);margin-top:3px;line-height:1.5;}

    /* ═══════════ HOW IT WORKS (STEP PATH) ═══════════ */
    .lt-scope #how{background:#fff;padding:90px 0;}
    .lt-scope .how-head{text-align:center;}
    .lt-scope .steps-wrapper{margin-top:72px;position:relative;}

    .lt-scope .steps-line{
      position:absolute;top:40px;left:6%;right:6%;
      height:2px;z-index:0;
      background:linear-gradient(90deg,
        var(--phys) 0%,var(--chem) 33%,var(--bio) 66%,var(--gold) 100%
      );
      opacity:.25;
    }

    .lt-scope .steps-grid{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      align-items:flex-start;
      gap:36px 24px;
      position:relative;z-index:1;
      max-width:960px;
      margin:0 auto;
    }
    .lt-scope .step-col{
      display:flex;flex-direction:column;align-items:center;text-align:center;
      width:110px;
    }
    .lt-scope .step-bubble{
      width:80px;height:80px;border-radius:50%;
      background:#fff;border:2px solid #E2E8F0;
      display:flex;align-items:center;justify-content:center;
      margin-bottom:16px;position:relative;
      transition:border-color .25s,box-shadow .25s,transform .25s;
      cursor:default;
    }
    .lt-scope .step-bubble:hover{
      border-color:var(--navy);
      box-shadow:0 8px 28px rgba(10,46,138,.18);
      transform:scale(1.08);
    }
    .lt-scope .step-num-badge{
      position:absolute;top:-6px;right:-6px;
      width:22px;height:22px;border-radius:50%;
      background:var(--gold);
      font-size:10px;font-weight:900;color:#fff;
      display:flex;align-items:center;justify-content:center;
      border:2px solid #fff;
    }
    .lt-scope .step-label{font-size:11px;font-weight:700;color:var(--navy);line-height:1.4;}
    .lt-scope .step-sub{font-size:10px;color:var(--muted);margin-top:3px;}


    /* ═══════════ HOW IT WORKS (DETAILED CARDS) ═══════════ */
    .lt-scope #how-detail {
      background: #F8FAFC;
      padding: 90px 0;
      position: relative;
    }

    .lt-scope .how-detail-head {
      text-align: center;
      max-width: 640px;
      margin: 0 auto;
    }

    .lt-scope .how-steps-grid {
      margin-top: 56px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
    }

    .lt-scope .how-step-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      padding: 28px 22px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      transition: border-color .25s, box-shadow .25s, transform .25s;

      flex: 1 1 260px;
      max-width: calc(25% - 18px);
    }

    .lt-scope .how-step-card:hover {
      border-color: var(--navy);
      box-shadow: 0 10px 30px rgba(10,46,138,.10);
      transform: translateY(-4px);
    }

    .lt-scope .how-step-top {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .lt-scope .how-step-num {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--navy);
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .lt-scope .how-step-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: #FFF7ED;
    }

    .lt-scope .how-step-card h4 {
      font-size: 15px;
      font-weight: 800;
      color: var(--navy);
      margin: 0;
    }

    .lt-scope .how-step-card p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.65;
      margin: 0;
    }

    @media (max-width: 1000px) {
      .lt-scope .how-step-card { max-width: calc(50% - 12px); }
    }

    @media (max-width: 560px) {
      .lt-scope .how-step-card { max-width: 100%; }
    }

    /* ═══════════ ECOSYSTEM / THE NETWORK ═══════════ */
    .lt-scope #ecosystem{background:#fff;padding:60px 0;text-align:center;}
    .lt-scope .network-intro{max-width:720px;margin:56px auto 0;text-align:center;}
    .lt-scope .network-intro h3{font-size:clamp(22px,2.6vw,28px);font-weight:900;color:var(--navy);}

    .lt-scope .network-steps{
      display:grid;grid-template-columns:1fr 1fr;gap:28px;
      margin-top:40px;text-align:left;
    }
    .lt-scope .network-step-card{
      background:var(--bg1);border:1px solid #E8EFF8;border-radius:20px;
      padding:32px 28px;position:relative;overflow:hidden;
      transition:box-shadow .25s,transform .25s;
    }
    .lt-scope .network-step-card:hover{box-shadow:0 14px 36px rgba(10,46,138,.1);transform:translateY(-4px);}
    .lt-scope .network-step-num{
      width:44px;height:44px;border-radius:12px;
      background:var(--navy);color:#fff;font-weight:900;font-size:16px;
      display:flex;align-items:center;justify-content:center;margin-bottom:18px;
    }
    .lt-scope .network-step-card h4{font-size:18px;font-weight:800;color:var(--navy);margin-bottom:10px;}
    .lt-scope .network-step-card p{font-size:14px;color:var(--muted);line-height:1.7;}

    .lt-scope .network-tiers-head{max-width:720px;margin:80px auto 0;text-align:center;}
    .lt-scope .network-tiers-head h3{font-size:clamp(22px,2.6vw,28px);font-weight:900;color:var(--navy);}

    .lt-scope .network-tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;text-align:left;}
    .lt-scope .tier-card{
      background:#fff;border:1px solid #E8EFF8;border-radius:20px;padding:30px 24px;
      position:relative;overflow:hidden;transition:transform .25s,box-shadow .25s;
    }
    .lt-scope .tier-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;}
    .lt-scope .tier-card:nth-child(1)::before{background:var(--phys);}
    .lt-scope .tier-card:nth-child(2)::before{background:var(--chem);}
    .lt-scope .tier-card:nth-child(3)::before{background:var(--gold);}
    .lt-scope .tier-card:hover{transform:translateY(-5px);box-shadow:0 14px 36px rgba(10,46,138,.1);}
    .lt-scope .tier-badge{
      display:inline-block;font-size:11px;font-weight:800;letter-spacing:.06em;
      text-transform:uppercase;color:#fff;padding:5px 12px;border-radius:999px;margin-bottom:14px;
    }
    .lt-scope .tier-card:nth-child(1) .tier-badge{background:var(--phys);}
    .lt-scope .tier-card:nth-child(2) .tier-badge{background:var(--chem);}
    .lt-scope .tier-card:nth-child(3) .tier-badge{background:var(--gold);}
    .lt-scope .tier-card h4{font-size:17px;font-weight:800;color:var(--navy);margin-bottom:8px;}
    .lt-scope .tier-card p{font-size:13.5px;color:var(--muted);line-height:1.65;}

    .lt-scope .network-closing{max-width:680px;margin:48px auto 0;text-align:center;font-size:15px;color:var(--muted);line-height:1.75;}

    @media(max-width:900px){
      .lt-scope .network-steps,.lt-scope .network-tiers{grid-template-columns:1fr;}
    }

    /* ═══════════ DISCIPLINES / EXPLORE SCIENCE ═══════════ */
    .lt-scope #disciplines{background:#fff;padding:60px 0;text-align:center;}
    .lt-scope .disciplines-layout{
      display:grid;
      grid-template-columns:320px 1fr;
      gap:56px;
      align-items:center;
      justify-content:center;
    }
    .lt-scope .disc-img-wrap-vertical{
      display:flex;
      flex-direction:column;
      align-items:center;
      gap:18px;
    }

    .lt-scope .disc-img-vertical-item{
      width:250px;
      border-radius:18px;
      overflow:hidden;
      box-shadow:0 12px 30px rgba(10,46,138,.10);
    }

    .lt-scope .disc-img-vertical-item img{
      width:100%;
      display:block;
      object-fit:contain;
    }

    .lt-scope .disc-img-vertical-item:hover{
      transform:translateY(-6px);
      box-shadow:0 26px 60px rgba(10,46,138,.18);
    }

    .lt-scope .book-experiment-card{
      background:linear-gradient(150deg,var(--navy) 0%,#1544b8 100%);
      border-radius:24px;padding:44px 40px;color:#fff;
      position:relative;overflow:hidden;
    }
    .lt-scope .book-experiment-card::before{
      content:'';position:absolute;top:-70px;right:-70px;width:220px;height:220px;
      border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none;
    }
    .lt-scope .book-experiment-card::after{
      content:'';position:absolute;bottom:-60px;left:-60px;width:160px;height:160px;
      border-radius:50%;background:rgba(245,166,35,.12);pointer-events:none;
    }
    .lt-scope .book-experiment-card h3{
      font-size:clamp(22px,2.6vw,28px);font-weight:900;margin-bottom:16px;
      position:relative;z-index:1;
    }
    .lt-scope .book-experiment-card p{
      font-size:15px;line-height:1.8;color:rgba(255,255,255,.82);
      position:relative;z-index:1;
    }
    .lt-scope .book-experiment-actions{display:flex;gap:14px;margin-top:28px;flex-wrap:wrap;position:relative;z-index:1;}

    @media(max-width:900px){
      .lt-scope .disciplines-layout{grid-template-columns:1fr;}
    }

    /* ═══════════ FOR STUDENTS ═══════════ */
    .lt-scope #students{background:var(--bg1);padding:80px 0;}
    .lt-scope .students-intro{max-width:760px;margin:0 auto;text-align:center;}

    .lt-scope .students-faq-head{text-align:center;max-width:600px;margin:72px auto 0;}
    .lt-scope .students-faq-head h2{font-size:clamp(26px,3.4vw,38px);}

    .lt-scope .faq-list{max-width:820px;margin:40px auto 0;display:flex;flex-direction:column;gap:16px;}
    .lt-scope .faq-item{
      background:#fff;border:1px solid #E8EFF8;border-radius:16px;padding:24px 28px;
      transition:box-shadow .2s,transform .2s;
    }
    .lt-scope .faq-item:hover{box-shadow:0 10px 30px rgba(10,46,138,.08);transform:translateY(-2px);}
    .lt-scope .faq-q{display:flex;align-items:flex-start;gap:12px;font-size:15.5px;font-weight:800;color:var(--navy);margin-bottom:8px;}
    .lt-scope .faq-q-mark{
      width:26px;height:26px;border-radius:50%;background:var(--gold);color:#fff;
      font-size:13px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;
      margin-top:1px;
    }
    .lt-scope .faq-a{font-size:14px;color:var(--muted);line-height:1.7;padding-left:38px;}
    .lt-scope .students-closing{max-width:640px;margin:48px auto 0;text-align:center;font-size:15px;font-weight:600;color:var(--navy);}

    /* ═══════════ FOR LAB PARTNERS ═══════════ */
    .lt-scope #labs{background:var(--bg2);padding:80px 0;}
    .lt-scope .labs-grid{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
    .lt-scope .lab-perks{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:32px;}
    .lt-scope .lab-perk{
      background:#fff;border-radius:16px;padding:22px;border:1px solid #E2E8F0;
      transition:box-shadow .2s,transform .2s;
    }
    .lt-scope .lab-perk:hover{box-shadow:0 8px 28px rgba(10,46,138,.1);transform:translateY(-3px);}
    .lt-scope .lab-perk-icon{
      width:44px;height:44px;border-radius:12px;
      display:flex;align-items:center;justify-content:center;margin-bottom:12px;
    }
    .lt-scope .lab-perk h4{font-size:16px;font-weight:800;color:var(--navy);}
    .lt-scope .lab-perk p{font-size:14px;color:var(--muted);margin-top:4px;line-height:1.55;}

    .lt-scope .lab-cta-box{
      background:linear-gradient(135deg,var(--navy) 0%,#1544b8 100%);
      border-radius:18px;padding:32px;margin-top:28px;
      box-shadow:0 16px 48px rgba(10,46,138,.25);
    }
    .lt-scope .lab-cta-box h3{font-size:19px;font-weight:900;color:#fff;margin-bottom:6px;}
    .lt-scope .lab-cta-box p{font-size:15px;color:rgba(255,255,255,.65);margin-bottom:20px;line-height:1.6;}

    .lt-scope .lab-checklist{display:flex;flex-direction:column;gap:12px;}
    .lt-scope .lab-check{
      background:#fff;border-radius:10px;padding:12px 16px;
      font-size:16px;font-weight:700;color:var(--navy);
      display:flex;align-items:center;gap:12px;
    }
    .lt-scope .check-tick{
      width:20px;height:20px;border-radius:6px;background:var(--chem);
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
    }

    /* ═══════════ SAFETY ═══════════ */
    .lt-scope #safety{background:#fff;padding:110px 0;text-align:center;}
    .lt-scope .safety-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:56px;}
    .lt-scope .safety-card{
      background:var(--bg1);border-radius:20px;padding:36px 26px;text-align:left;
      border:1px solid #E8EFF8;transition:box-shadow .2s,transform .2s;position:relative;overflow:hidden;
    }
    .lt-scope .safety-card::after{
      content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
      border-radius:0 0 20px 20px;opacity:0;transition:opacity .25s;
    }
    .lt-scope .safety-card:nth-child(1)::after,.lt-scope .safety-card:nth-child(4)::after{background:var(--navy);}
    .lt-scope .safety-card:nth-child(2)::after,.lt-scope .safety-card:nth-child(5)::after{background:var(--chem);}
    .lt-scope .safety-card:nth-child(3)::after,.lt-scope .safety-card:nth-child(6)::after{background:var(--gold);}
    .lt-scope .safety-card:hover{box-shadow:0 10px 32px rgba(10,46,138,.1);transform:translateY(-4px);}
    .lt-scope .safety-card:hover::after{opacity:1;}
    .lt-scope .safety-icon-wrap{
      width:52px;height:52px;border-radius:14px;margin-bottom:18px;
      display:flex;align-items:center;justify-content:center;
    }
    .lt-scope .safety-card h3{font-size:16px;font-weight:800;color:var(--navy);margin-bottom:8px;}
    .lt-scope .safety-card p{font-size:13px;color:var(--muted);line-height:1.65;}

    /* ═══════════ IMPACT ═══════════ */
    .lt-scope #impact{background:var(--bg1);padding:80px 0;text-align:center;}
    .lt-scope .impact-grid{
      display:grid;grid-template-columns:repeat(5,1fr);
      gap:18px;margin-top:56px;
    }
    .lt-scope .impact-card{
      background:#fff;border-radius:20px;padding:40px 20px;
      border:1px solid #E8EFF8;position:relative;overflow:hidden;
      transition:box-shadow .2s,transform .2s;
    }
    .lt-scope .impact-card:hover{box-shadow:0 12px 36px rgba(10,46,138,.1);transform:translateY(-4px);}
    .lt-scope .impact-bar{
      position:absolute;top:0;left:0;right:0;height:4px;
    }
    .lt-scope .impact-card:nth-child(1) .impact-bar{background:var(--phys);}
    .lt-scope .impact-card:nth-child(2) .impact-bar{background:var(--chem);}
    .lt-scope .impact-card:nth-child(3) .impact-bar{background:var(--bio);}
    .lt-scope .impact-card:nth-child(4) .impact-bar{background:var(--gold);}
    .lt-scope .impact-card:nth-child(5) .impact-bar{background:var(--navy);}
    .lt-scope .impact-number{
      font-size:clamp(30px,3.5vw,46px);font-weight:900;color:var(--navy);
      letter-spacing:-.03em;line-height:1;
    }
    .lt-scope .impact-number span{color:var(--gold);}
    .lt-scope .impact-label{font-size:12px;color:var(--muted);margin-top:10px;font-weight:600;letter-spacing:.02em;}

    /* ═══════════ CAREERS ═══════════ */
    .lt-scope #careers{background:var(--navy);padding:110px 0;text-align:center;overflow:hidden;position:relative;}
    .lt-scope .careers-orb{
      position:absolute;width:600px;height:600px;border-radius:50%;
      border:1px solid rgba(255,255,255,.04);
      top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
    }
    .lt-scope .careers-orb2{
      position:absolute;width:400px;height:400px;border-radius:50%;
      border:1px solid rgba(255,255,255,.06);
      top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;
    }
    .lt-scope #careers .section-title{color:#fff;}
    .lt-scope #careers .section-label{color:rgba(245,166,35,.85);}
    .lt-scope .careers-sub{font-size:16px;color:rgba(255,255,255,.5);margin-top:12px;line-height:1.7;}

    .lt-scope .careers-path{
      display:flex;align-items:center;justify-content:center;
      flex-wrap:wrap;gap:0;margin-top:72px;position:relative;z-index:1;
    }
    .lt-scope .career-node{
      display:flex;flex-direction:column;align-items:center;gap:10px;
      background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
      border-radius:18px;padding:22px 18px;min-width:106px;
      transition:background .25s,transform .25s,border-color .25s;
    }
    .lt-scope .career-node:hover{
      background:rgba(255,255,255,.14);transform:translateY(-6px);
      border-color:rgba(245,166,35,.4);
    }
    .lt-scope .career-node-icon{
      width:48px;height:48px;border-radius:14px;
      background:rgba(255,255,255,.1);
      display:flex;align-items:center;justify-content:center;
    }
    .lt-scope .career-node p{font-size:12px;font-weight:800;color:#fff;letter-spacing:.03em;}
    .lt-scope .career-arrow{
      color:rgba(255,255,255,.2);font-size:18px;
      padding:0 6px;font-weight:300;
    }

    /* ═══════════ FINAL CTA ═══════════ */
    .lt-scope #cta-final{
      background:linear-gradient(135deg,#0A2E8A 0%,#1544b8 60%,#0A2E8A 100%);
      padding:130px 0;text-align:center;
    }
    .lt-scope #cta-final .section-title{color:#fff;font-size:clamp(34px,5vw,58px);}
    .lt-scope .cta-sub{font-size:18px;color:rgba(255,255,255,.65);max-width:520px;margin:18px auto 0;line-height:1.7;}
    .lt-scope .cta-buttons{display:flex;gap:16px;justify-content:center;margin-top:48px;flex-wrap:wrap;}
    .lt-scope .btn-white{
      background:#fff;color:var(--navy);font-size:15px;font-weight:800;
      padding:16px 34px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-block;
    }
    .lt-scope .btn-white:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(0,0,0,.22);}
    .lt-scope .btn-gold{
      background:var(--gold);color:#fff;font-size:15px;font-weight:800;
      padding:16px 34px;border-radius:12px;text-decoration:none;
      transition:transform .22s,box-shadow .22s;display:inline-block;
    }
    .lt-scope .btn-gold:hover{transform:translateY(-3px);box-shadow:0 14px 36px rgba(245,166,35,.45);}

    /* ═══════════ RESPONSIVE ═══════════ */
    @media(max-width:960px){
      .lt-scope .hero-grid,.lt-scope .why-grid,.lt-scope .students-grid,.lt-scope .labs-grid{grid-template-columns:1fr;}
      .lt-scope .hero-img-wrap{display:none;}
      .lt-scope .problem-grid{grid-template-columns:1fr 1fr;}
      .lt-scope .impact-grid{grid-template-columns:repeat(3,1fr);}
      .lt-scope .steps-line{display:none;}
    }
    @media(max-width:600px){
      .lt-scope .problem-grid,.lt-scope .why-benefits,.lt-scope .lab-perks,.lt-scope .safety-grid{grid-template-columns:1fr;}
      .lt-scope .impact-grid{grid-template-columns:1fr 1fr;}
      .lt-scope .careers-path{gap:6px;}
      .lt-scope .career-arrow{display:none;}
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
    case "log-in": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
      </svg>
    );
    case "sliders": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
      </svg>
    );
    case "list-checks": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M3 6l2 2 4-4M3 14l2 2 4-4M11 6h10M11 14h10M11 20h10"/>
      </svg>
    );
    case "clipboard-list": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>
      </svg>
    );
    case "flask-conical": return (
      <svg style={s} viewBox="0 0 24 24" {...p}>
        <path d="M9 3h6M10 3v6.5l-6 10a1 1 0 0 0 .9 1.5h14.2a1 1 0 0 0 .9-1.5l-6-10V3"/>
        <path d="M6.5 14h11" strokeOpacity=".4"/>
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
    const els = document.querySelectorAll(".lt-scope .fade-up");
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

/* ─────────────────────────────────────────────
   STICKY LOGO BADGE
───────────────────────────────────────────── */
const StickyLogo = () => (
  <div className="site-logo-sticky" aria-label="LabTricks">
    <img
      src="/images/labtrickslogo-removebg-preview.png"
      alt="LabTricks"
      className="site-logo-image"
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   PAGE
   Everything is now wrapped in a single ".lt-scope" div so the
   <style> block above can never leak onto the shared Navbar/Footer
   or other pages.
═══════════════════════════════════════════════════════════════ */
export default function LabTricksPage() {
  useReveal();

  return (
    <div className="lt-scope">
      <GeistStyle />
      <StickyLogo />

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
                <img src="/images/labhero.jpg" alt="Student scientist performing chemistry experiment" />
                <div className="hero-float">
                  <div className="hero-float-icon">
                    <Icon name="flask" size={20} color="#fff" strokeWidth={1.8}/>
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
    <div className="why-stack">

      {/* Heading */}
      <div className="fade-up why-head">
        <span className="section-label">Why It Matters</span>
        <h2 className="section-title">
          Knowledge Becomes<br/>
          Powerful When Students<br/>
          Can <span style={{color:_gold}}>Touch It.</span>
        </h2>
        <p className="section-sub">
          Textbooks describe. Experiments reveal — and a student remembers why science matters long after the exam.
        </p>
      </div>

      {/* Image */}
      <div className="fade-up d1 why-img-wrap">
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

      {/* Benefits row */}
      <div className="why-benefits-row">
        {[
          { icon:"lightbulb", bg:"#FEFCE8", c:"#CA8A04", title:"Deeper Understanding", desc:"Concepts stick when experienced, not just read." },
          { icon:"rocket", bg:"#FFF7ED", c:"#EA580C", title:"Innovation Mindset", desc:"Curiosity nurtured early builds tomorrow's inventors." },
          { icon:"puzzle", bg:"#F0FDFA", c:_bio, title:"Problem Solving", desc:"Real experiments demand real thinking." },
          { icon:"briefcase", bg:"#FAF5FF", c:"#9333EA", title:"Career Readiness", desc:"Hands-on work connects students to STEM paths." },
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
</section>

      {/* ══════════════════════════════════════
          S4 · HOW IT WORKS  (THE JOURNEY — 7 steps, centered)
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
                Seven steps from sign-up to certified — every one frictionless.
              </p>
            </div>
          </div>

          <div className="steps-wrapper">
            <div className="steps-line" />
            <div className="steps-grid">
              {[
                { icon:"user-circle", label:"Create Account" },
                { icon:"book-open",   label:"Get Matched" },
                { icon:"flask",       label:"Select Experiment" },
                { icon:"calendar",    label:"Book Session" },
                { icon:"shield-check",label:"Prepare" },
                { icon:"microscope",  label:"Do the Experiment" },
                { icon:"trending-up", label:"Track Progress" },
              ].map((s, i) => (
                <div className={`step-col fade-up d${(i%5)+1}`} key={i}>
                  <div className="step-bubble">
                    <Icon name={s.icon} size={28} color={_navy} strokeWidth={1.6}/>
                    <div className="step-num-badge">{i + 1}</div>
                  </div>
                  <div className="step-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="how-steps-grid">
      {[
        { icon:"log-in",        c:"#EA580C", title:"Log In",           desc:"Your child creates a profile on the LabTricks website." },
        { icon:"sliders",       c:_chem,     title:"Get Matched",      desc:"Based on your child's class, our system sets up the right experiments for their level." },
        { icon:"list-checks",   c:"#CA8A04", title:"Choose",           desc:"Pick a full course or just a single experiment, whatever your child needs most." },
        { icon:"map-pin",       c:_bio,      title:"Book a Session",   desc:"We show you the nearest lab based on your location and help you book a time." },
        { icon:"clipboard-list",c:"#9333EA", title:"Prepare",          desc:"Before the session, your child is told exactly what to bring and what safety steps to follow." },
        { icon:"flask-conical", c:_chem,     title:"Experiment",       desc:"At the lab, your child checks in safely, gets the right equipment, and performs the experiment with proper guidance." },
        { icon:"trending-up",   c:"#16A34A", title:"Track Progress",   desc:"Every session is recorded on your child's profile, so you can watch their skills and confidence grow." },
      ].map((s, i) => (
        <div className={`how-step-card fade-up d${(i % 3) + 1}`} key={i}>
          <div className="how-step-top">
            <div className="how-step-num">{i + 1}</div>
            <div className="how-step-icon" style={{background:`${s.c}1A`}}>
              <Icon name={s.icon} size={18} color={s.c} strokeWidth={1.8}/>
            </div>
          </div>
          <h4>{s.title}</h4>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S5 · THE NETWORK
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

          <div className="network-intro fade-up d1">
            <h3>How LabTricks Helps</h3>
            <p className="section-sub">We bring science back to life in two simple steps.</p>
          </div>

          <div className="network-steps">
            <div className="network-step-card fade-up d1">
              <div className="network-step-num">1</div>
              <h4>Learn The Concept</h4>
              <p>
                First, your child learns the concept the easy way, through clear and friendly videos that explain the real science behind each experiment. No confusion and no dry lectures. Just the idea, explained simply and clearly enough that it actually sticks.
              </p>
            </div>
            <div className="network-step-card fade-up d2">
              <div className="network-step-num">2</div>
              <h4>Perform The Experiment</h4>
              <p>
                Then comes the fun part. Your child is connected to a real lab near you, where they actually perform the experiment with their own hands. Watching a reaction on a screen is one thing. Doing it yourself, with the beakers and the equipment right in front of you, is something a student never forgets. That is the moment science stops being a subject and starts being an adventure.
              </p>
            </div>
          </div>

          <div className="network-tiers-head fade-up">
            <h3>Three Tiers for Every Stage</h3>
            <p className="section-sub">
              Every child is at a different point in their science journey, so LabTricks is built in three tiers.
            </p>
          </div>

          <div className="network-tiers">
            <div className="tier-card fade-up d1">
              <span className="tier-badge">Elementary</span>
              <h4>Elementary</h4>
              <p>Simple, safe, and exciting first experiments that spark a love for science early.</p>
            </div>
            <div className="tier-card fade-up d2">
              <span className="tier-badge">Middle School</span>
              <h4>Middle School</h4>
              <p>Hands-on experiments that match what students are studying in classes 6 to 8 and build real confidence.</p>
            </div>
            <div className="tier-card fade-up d3">
              <span className="tier-badge">High School</span>
              <h4>High School</h4>
              <p>Deeper, exam-focused practical for classes 9 to 12, designed to prepare students for board practical exams and beyond.</p>
            </div>
          </div>

          <p className="network-closing fade-up">
            Each tier matches what your child is learning in school, so every session supports their classwork instead of adding to it. Your child never feels out of their depth, and never feels held back.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S6 · EXPLORE SCIENCE  (vertical images + booking CTA)
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

          <div className="disciplines-layout">
          <div className="disc-img-wrap-vertical fade-up d1">

<div className="disc-img-vertical-item">
  <img
    src="/images/labchem.png"
    alt="Chemistry Experiments"
  />
</div>

<div className="disc-img-vertical-item">
  <img
    src="/images/labphy.png"
    alt="Physics Experiments"
  />
</div>

<div className="disc-img-vertical-item">
  <img
    src="/images/labbiology.png"
    alt="Biology Experiments"
  />
</div>

</div>

            <div className="book-experiment-card fade-up d2">
              <h3>Book Your First Experiment</h3>
              <p>
                Give your child the hands-on science education they deserve, and the confidence that comes with it. Summer is the perfect time to start, while school is out and labs are ready. Email or call us today to book your first session, and our friendly team will connect you with a trusted lab near you and get your
              </p>
              <div className="book-experiment-actions">
                <a href="#cta-final" className="btn-gold">Book a Session</a>
                <a href="#how" className="btn-outline" style={{borderColor:"rgba(255,255,255,.4)",color:"#fff"}}>See How It Works</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          S7 · FOR STUDENTS
      ══════════════════════════════════════ */}
      <section id="students">
        <div className="container">
          <div className="students-intro fade-up">
            <span className="section-label">For Students</span>
            <h2 className="section-title">Why LabTricks Is Different</h2>
            <p className="section-sub">
              Plenty of platforms throw more theory and more videos at students. We do the opposite. We get students out of the textbook and into the lab, where science actually happens. We bridge the gap between knowing and doing, the gap that schools so often leave open. For a child who learns by doing, and most children truly do, this one change makes science click in a way no textbook ever could.
            </p>
          </div>

          <div className="students-faq-head fade-up">
            <span className="section-label">FAQs</span>
            <h2 className="section-title">Questions Parents Often Ask</h2>
          </div>

          <div className="faq-list">
            {[
              {
                q:"How can my child do experiments without a school lab?",
                a:"That is exactly what LabTricks solves. We connect your child to a real lab near you, no school lab required."
              },
              {
                q:"Is this useful for board exams?",
                a:"Absolutely. Our experiments are matched to CBSE and state board practical requirements for the relevant classes."
              },
              {
                q:"What if my child is nervous or new to labs?",
                a:"Every session is guided and safe, and we start at a comfortable level for your child's class and confidence."
              },
              {
                q:"Does my child get proof of their work?",
                a:"Yes. Students earn a certificate and regular progress tracking they can be proud of."
              },
            ].map((f, i) => (
              <div className={`faq-item fade-up d${(i%4)+1}`} key={i}>
                <div className="faq-q">
                  <span className="faq-q-mark">Q</span>
                  <span>{f.q}</span>
                </div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>

          <p className="students-closing fade-up">
            Have another question? Email or call us anytime and we will
          </p>
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
              { icon:"lock",             bg:"#EFF6FF", c:_navy, title:"Verified Labs",         desc:"Every lab passes our rigorous on-site safety and equipment inspection before going live." },
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
              Science Is Innovating.<br/>
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
              <a href="/contact" className="btn-gold">Partner With LabTricks</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* colour constants used inline (avoids var() in JSX style props) */
const _navy = "#0A2E8A";
const _gold = "#F5A623";
const _chem = "#22C55E";
const _phys = "#3B82F6";
const _bio  = "#14B8A6";
const _muted = "#64748B";