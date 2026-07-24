import { useContent } from "../useContent";

export default function Experience() {
  const { experience } = useContent();

  return (
    <section className="section" id="experience">
      <div className="section__head reveal">
        <p className="eyebrow">Experience</p>
        <h2>Work history</h2>
      </div>
      <ol className="timeline">
        {experience.map((job) => (
          <li className="timeline__item reveal" key={`${job.org}-${job.dates}`}>
            <div className="timeline__when">{job.dates}</div>
            <div className="timeline__content">
              <h3>{job.org}</h3>
              <p className="timeline__role">{job.role}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
