import { d2pLink } from "@/lib/d2p";

/** Slim announcement bar. Positioning/offset is handled by TopStrip. Remove after launch month. */
export default function D2PAnnouncementBar() {
  return (
    <div className="d2p-bar" role="region" aria-label="Announcement">
      <span className="d2p-new">NEW</span>
      <span>Doc2Postdoc℠: peer matching for PhDs &amp; postdocs.</span>
      <a href={d2pLink("bar", true)}>Join the waitlist →</a>
    </div>
  );
}
