import { d2pLink } from "@/lib/d2p";

export default function D2PBanner() {
  return (
    <div className="d2p-banner-wrap">
      <section className="d2p-banner" aria-labelledby="d2p-banner-h">
        <div className="d2p-banner-in">
          <div className="d2p-banner-copy">
            <span className="d2p-kicker">New from i4iSciences</span>
            <h2 id="d2p-banner-h">Where the next step has <em>already been taken.</em></h2>
            <p>Doc2Postdoc℠ matches PhD researchers and postdocs with people one step ahead of them, and helps with everything that comes with the move.</p>
            <div className="d2p-actions">
              <a className="d2p-cta" href={d2pLink("banner", true)}>Join the waitlist ↗</a>
              <a className="d2p-cta d2p-cta-ghost" href={d2pLink("banner_learn")}>Learn more</a>
            </div>
          </div>
          <div className="d2p-banner-art">
            <img src="/d2p/d2p-banner-art.webp" alt="Postdocs connected across a city at night" width={1080} height={1080} loading="lazy" />
          </div>
        </div>
        <div className="d2p-banner-note">Doc2Postdoc is a service of i4iSciences for adults (18+). Opening metro by metro, Chicago and St. Louis first.</div>
      </section>
    </div>
  );
}
