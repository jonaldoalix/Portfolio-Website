import { useContent } from "../useContent";

export default function Hero() {
  const { hero, profile } = useContent();

  return (
    <section className="hero" id="top">
      <div className="hero__atmosphere" aria-hidden="true" />
      <div className="hero__grid">
        <div className="hero__copy reveal">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.headline}</h1>
          <p className="lede">{hero.lede}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </a>
            <a className="btn btn--ghost" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>
          <ul className="hero__meta">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.practice.url} target="_blank" rel="noreferrer">
                {profile.practice.name}
              </a>
            </li>
          </ul>
        </div>
        <aside className="hero__panel reveal reveal--delay">
          <p className="hero__panel-status">{hero.panel.status}</p>
          <div className="hero__panel-block">
            <p className="hero__panel-label">{hero.panel.fitLabel}</p>
            <p>{hero.panel.fit}</p>
          </div>
          <div className="hero__panel-block">
            <p className="hero__panel-label">{hero.panel.shapeLabel}</p>
            <p>{hero.panel.shape}</p>
          </div>
          <div className="hero__panel-block">
            <p className="hero__panel-label">{hero.panel.nextLabel}</p>
            <p>{hero.panel.next}</p>
            <a className="hero__panel-link" href="#contact">
              Go to contact
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
