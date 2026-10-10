/** Original vector artwork; no template photography or third-party assets. */
export function DeveloperVisual() {
  return (
    <div className="developer-visual">
      <div className="canvas-copy">
        <span className="mono">A DEVELOPER’S PROCESS</span>
        <p lang="en">
          THINK.
          <br />
          BUILD.
          <br />
          <span>REFINE.</span>
        </p>
        <span className="canvas-caption">
          이해하고, 구현하고, 더 나은 답을 찾습니다.
        </span>
      </div>
      <svg
        className="canvas-art"
        viewBox="0 0 700 420"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sphere-fill">
            <stop stopColor="#e6e7eb" stopOpacity=".09" />
            <stop offset="1" stopColor="#e6e7eb" stopOpacity=".01" />
          </radialGradient>
          <linearGradient
            id="sphere-line"
            x1="120"
            y1="65"
            x2="490"
            y2="355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e6e7eb" stopOpacity=".8" />
            <stop offset="1" stopColor="#e6e7eb" stopOpacity=".14" />
          </linearGradient>
        </defs>
        <path d="M40 210H660M350 25V395" stroke="#fff" strokeOpacity=".08" />
        <g transform="rotate(-24 350 210)" stroke="url(#sphere-line)">
          <circle cx="350" cy="210" r="172" fill="url(#sphere-fill)" />
          {[40, 85, 130].map((radius) => (
            <ellipse key={radius} cx="350" cy="210" rx={radius} ry="172" />
          ))}
          {[50, 100, 145].map((radius) => (
            <ellipse key={radius} cx="350" cy="210" rx="172" ry={radius} />
          ))}
          <path d="M178 210H522M350 38V382" />
        </g>
        <path d="M182 95L552 319" stroke="#4169ff" strokeWidth="1.5" />
        <circle cx="182" cy="95" r="5" fill="#4169ff" />
        <circle cx="552" cy="319" r="5" fill="#4169ff" />
        <path d="M116 338H243M457 82H584" stroke="#fff" strokeOpacity=".28" />
      </svg>
      <div className="canvas-index" aria-hidden="true">
        <span>01 / CODE</span>
        <span>02 / DATA</span>
        <span>03 / MOBILE</span>
      </div>
    </div>
  );
}
