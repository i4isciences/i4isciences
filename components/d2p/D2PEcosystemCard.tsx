import { d2pLink } from "@/lib/d2p";

/** 6th ecosystem card. Render inside the same grid cell wrapper as the others. */
export default function D2PEcosystemCard() {
  return (
    <>
      <span className="d2p-eyebrow">For Postdocs</span>
      <article className="d2p-card">
        <div className="d2p-card-media">
          <img
            src="/d2p/d2p-card-art.svg"
            alt="Two interlocking links and the question: Who is one step ahead of me in my field?"
            width={800}
            height={480}
          />
          <span className="d2p-chip">Doc2Postdoc℠ · Peer matching</span>
        </div>
        <div className="d2p-card-body">
          <div className="d2p-card-head">
            <h3>Meet Someone<br />One Step Ahead.</h3>
            <span className="d2p-card-icon"><img src="/d2p/d2p-mark.svg" alt="" width={30} height={16} /></span>
          </div>
          <p>Peer support for the next step in your research career.</p>
          <ul className="d2p-list">
            <li>Matched by field, career stage, place and language</li>
            <li>Ring the Bell: your own connections are asked first</li>
            <li>Travel Companion for visiting parents (coming soon)</li>
            <li>eyewee℠, your AI guide, by text or voice</li>
          </ul>
          <a className="d2p-btn" href={d2pLink("card", true)}>Join the Waitlist ↗</a>
          <span className="d2p-note">For adults (18+): PhD students and postdocs</span>
        </div>
      </article>
    </>
  );
}
