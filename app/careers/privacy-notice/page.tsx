import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Applicant Privacy Notice | i4iSciences Careers",
  description:
    "How I4I Sciences LLC collects, uses and protects personal information submitted through the i4iSciences Careers form.",
  alternates: {
    canonical: "https://www.i4isciences.com/careers/privacy-notice",
  },
};

// Notice text is stored verbatim (unmodified) in notice.html, exactly as supplied.
const notice = fs.readFileSync(
  path.join(process.cwd(), "app/careers/privacy-notice/notice.html"),
  "utf8"
);

export default function CareersPrivacyNoticePage() {
  return (
    <div className="careers-privacy">
      <style>{`
        .careers-privacy{font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#1c2333;background:#fff;padding-top:96px}
        .careers-privacy article{max-width:820px;margin:0 auto;padding:24px 16px 56px}
        .careers-privacy h1{color:#182D5A;font-size:2rem;margin:0 0 .25rem}
        .careers-privacy h2{color:#182D5A;font-size:1.25rem;margin:2rem 0 .5rem}
        .careers-privacy table{border-collapse:collapse;width:100%;margin:1rem 0}
        .careers-privacy th,.careers-privacy td{border:1px solid #c9cfdd;padding:8px 10px;text-align:left;vertical-align:top}
        .careers-privacy th{background:#182D5A;color:#fff}
        .careers-privacy a{color:#182D5A}
        .careers-privacy ul{list-style:disc;padding-left:2rem;margin:1rem 0}
        .careers-privacy p{margin:1rem 0}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: notice }} />
    </div>
  );
}
