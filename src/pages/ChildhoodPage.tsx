import { childhood } from "../data/personalization";
import StageFooter from "../components/StageFooter";

export default function ChildhoodPage() {
  return (
    <section aria-labelledby="childhood-title">
      <div className="memory-page">
        <div className="memory-glow" aria-hidden="true" />
        <div className="memory-inner">
          <div className="memory-ornament" aria-hidden="true">
            ✦
          </div>
          <p className="eyebrow">{childhood.kicker}</p>
          <h1 className="memory-title" id="childhood-title">
            {childhood.title}
          </h1>

          <div className="memory-lines">
            {childhood.lines.map((line, index) => (
              <p
                key={line.text}
                className={`memory-line${line.emphasis ? " memory-line--emphasis" : ""}`}
                style={{ animationDelay: `${0.18 + index * 0.16}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>

          <p
            className="memory-footnote"
            style={{ animationDelay: "1.05s" }}
          >
            {childhood.footnote}
          </p>
        </div>
      </div>

      <StageFooter
        backTo="/appreciation"
        backLabel="Back"
        nextTo="/evaluation"
        nextLabel={childhood.cta}
      />
    </section>
  );
}
