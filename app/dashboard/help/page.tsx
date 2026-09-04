"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I switch between services?",
    a: "Use the row of service icons in the navigation bar at the top — click any one to open its workspace. You can jump between services at any time; nothing you're doing gets lost.",
  },
  {
    q: "Can I update my phone number, country, or other details?",
    a: "Profile editing isn't available yet from Settings. In the meantime, reach out to our team from the Contact link and we'll update it for you.",
  },
  {
    q: "Who do I contact about a specific service, like tutoring or certification?",
    a: "Use the Contact team link in the navigation bar — it reaches our team directly, and we'll route your question to the right people.",
  },
  {
    q: "Is my information and my child's information kept private?",
    a: "Yes. We only collect what each service needs to work, and we never sell personal information. See our Privacy Policy for the full details.",
  },
  {
    q: "How do I sign out?",
    a: "Click Sign out in the navigation bar. You'll be securely logged out and returned to the sign-in page.",
  },
];

function AccordionItem({ item, open, onToggle }: { item: (typeof FAQS)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className={`hacc-item ${open ? "hacc-item-open" : ""}`}>
      <button type="button" onClick={onToggle} className="hacc-trigger">
        <span>{item.q}</span>
        <span className={`hacc-chevron ${open ? "hacc-chevron-open" : ""}`}>
          <ChevronDown size={16} />
        </span>
      </button>
      <motion.div animate={{ gridTemplateRows: open ? "1fr" : "0fr" }} initial={false} transition={{ duration: 0.28 }} style={{ display: "grid" }}>
        <div style={{ overflow: "hidden" }}>
          <p className="hacc-answer">{item.a}</p>
        </div>
      </motion.div>

      <style jsx>{`
        .hacc-item { background: #fff; border: 1px solid #e8e8ed; border-radius: 12px; overflow: hidden; transition: border-color 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
        .hacc-item-open { border-color: #c7c7cc; }
        .hacc-trigger { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 15px 18px; background: none; border: none; cursor: pointer; text-align: left; font-family: var(--font-geist-sans), "Geist", sans-serif; font-weight: 600; font-size: 0.9rem; color: #10204e; }
        .hacc-chevron { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: #f5f5f7; display: flex; align-items: center; justify-content: center; color: #10204e; transition: transform 0.25s, background 0.2s; }
        .hacc-chevron-open { transform: rotate(180deg); background: #10204e; color: #fff; }
        .hacc-answer { margin: 0; padding: 0 18px 18px; font-size: 0.86rem; line-height: 1.65; color: #6e6e73; }
      `}</style>
    </div>
  );
}

export default function HelpPage() {
  const [open, setOpen] = useState(0);

  return (
    <div className="help">
      <div className="help-header">
        <span className="help-eyebrow">Help</span>
        <h1>Questions about your account</h1>
        <p>Can&apos;t find what you need? Reach our team from the Contact link in the navigation bar.</p>
      </div>

      <div className="help-list">
        {FAQS.map((item, i) => (
          <AccordionItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>

      <style jsx>{`
        .help { max-width: 640px; margin: 0 auto; padding: 48px 24px 80px; font-family: var(--font-geist-sans), "Geist", sans-serif; }
        .help-header { margin-bottom: 28px; }
        .help-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; }
        .help-header h1 { margin: 8px 0 8px; font-size: 1.7rem; font-weight: 700; color: #10204e; letter-spacing: -0.01em; }
        .help-header p { margin: 0; color: #6e6e73; font-size: 0.9rem; }
        .help-list { display: flex; flex-direction: column; gap: 10px; }
      `}</style>
    </div>
  );
}
