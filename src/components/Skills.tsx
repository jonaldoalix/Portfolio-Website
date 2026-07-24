import { useContent } from "../useContent";

export default function Skills() {
  const { skills } = useContent();

  return (
    <section className="section section--tight" id="skills">
      <div className="section__head reveal">
        <p className="eyebrow">Skills</p>
        <h2>Skills list</h2>
        <p className="section__lede">{skills.intro}</p>
      </div>
      <div className="skills-grid">
        {skills.groups.map((group) => (
          <div className="skill-group reveal" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
