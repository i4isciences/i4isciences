import { POSTING_HTML } from "@/components/careers/postingHtml";

/**
 * Fill these two before go-live (Ran's decision). While either is null, the
 * "Posted / Applications reviewed" line is left out so no "{{...}}" can ever show.
 */
const GO_LIVE_DATE: string | null = null; // e.g. "November 17, 2026"
const REVIEW_DATE: string | null = null; // e.g. "January 31, 2027" (suggested)

function buildPosting() {
  let html = POSTING_HTML.replace(/<!--[\s\S]*?-->\s*/, ""); // internal prepared-by comment
  const datesLine = /\s*<p><small>Posted: \{\{GO_LIVE_DATE\}\}[\s\S]*?<\/small><\/p>/;
  if (GO_LIVE_DATE && REVIEW_DATE) {
    html = html.replace("{{GO_LIVE_DATE}}", GO_LIVE_DATE).replace("{{REVIEW_DATE}}", REVIEW_DATE);
  } else {
    html = html.replace(datesLine, "");
  }
  return html;
}

const posting = buildPosting();

export default function RolePosting() {
  return <div className="role-posting-wrap" dangerouslySetInnerHTML={{ __html: posting }} />;
}
