import type { CSSProperties } from "react";
import { useContent } from "../useContent";

export default function Work() {
  const { work } = useContent();

  return (
    <section className="section" id="work">
      <div className="section__head reveal">
        <p className="eyebrow">Projects</p>
        <h2>Sample work section</h2>
        <p className="section__lede">
          These cards are placeholders. Rewrite the titles, blurbs, and links in
          <code> src/content.ts </code>
          before you ship.
        </p>
      </div>
      <div className="work-list">
        {work.map((item, index) => (
          <article
            className={`work-card work-card--${item.tone} reveal`}
            key={item.title}
            style={{ "--i": index } as CSSProperties}
          >
            <div className="work-card__media" aria-hidden={!item.image}>
              {item.image ? (
                <img src={item.image} alt="" />
              ) : (
                <div className="work-card__placeholder">
                  <span>{item.title}</span>
                </div>
              )}
            </div>
            <div className="work-card__body">
              <div className="work-card__meta">
                <h3>{item.title}</h3>
                <p className="work-card__org">{item.org}</p>
              </div>
              <p>{item.blurb}</p>
              <ul className="tag-row">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="work-card__links">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                ) : null}
                {item.repo ? (
                  <a href={item.repo} target="_blank" rel="noreferrer">
                    Repo
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
