import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  displayTitle,
  title,
  description,
  action,
}: {
  eyebrow: string;
  displayTitle?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={`section-heading${displayTitle ? " section-heading-editorial" : ""}`}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>
          {displayTitle ? (
            <span className="section-display" lang="en" aria-hidden="true">
              {displayTitle}
            </span>
          ) : null}
          <span className="section-title">{title}</span>
        </h2>
        {description ? (
          <p className="section-description">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        <span className="accent">.</span>
      </h1>
      <p>{description}</p>
    </div>
  );
}
