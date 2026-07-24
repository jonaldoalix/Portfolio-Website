import { useContent } from "../useContent";

export default function About() {
  const { about, profile } = useContent();

  return (
    <section className="section section--about" id="about">
      <div className="about-grid">
        <div className="section__head reveal">
          <p className="eyebrow">About</p>
          <h2>{about.title}</h2>
          {about.body.map((paragraph) => (
            <p className="section__lede" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <p className="about-practice">
            Business site:{" "}
            <a href={profile.practice.url} target="_blank" rel="noreferrer">
              {profile.practice.name}
            </a>
            {". Update or remove this line in About.tsx."}
          </p>
        </div>
        <aside className="edu-card reveal reveal--delay">
          <p className="eyebrow">Education</p>
          <h3>{about.education.school}</h3>
          <p className="edu-card__degree">{about.education.degree}</p>
          <p>{about.education.detail}</p>
          <p className="edu-card__date">Graduated {about.education.graduated}</p>
        </aside>
      </div>
    </section>
  );
}
