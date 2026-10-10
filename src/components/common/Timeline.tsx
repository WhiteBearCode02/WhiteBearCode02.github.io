import { experiences } from "@/data/experience";

export function Timeline({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="timeline">
      {experiences.map((experience) => (
        <article className="timeline-item" key={experience.title}>
          <div className="timeline-date">
            <span className="mono">{experience.type}</span>
            <p>{experience.period}</p>
          </div>
          <div className="timeline-content">
            <div className="timeline-title">
              <h3>{experience.title}</h3>
              <span className="status-badge">{experience.status}</span>
            </div>
            <p className="timeline-organization">{experience.organization}</p>
            <p>{experience.description}</p>
            {detailed ? (
              <ul className="detail-list">
                {experience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
