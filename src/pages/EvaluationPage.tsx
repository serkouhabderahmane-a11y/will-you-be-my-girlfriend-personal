import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { evaluation } from "../data/personalization";

export default function EvaluationPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const timeout = window.setTimeout(
      () => {
        if (step < evaluation.loadingLines.length) {
          setStep((current) => current + 1);
        } else {
          setDone(true);
        }
      },
      step === 0 ? 420 : 480,
    );
    return () => window.clearTimeout(timeout);
  }, [step, done]);

  const progress = done
    ? 100
    : Math.round((step / evaluation.loadingLines.length) * 100);

  return (
    <section aria-labelledby="evaluation-title">
      <div className="stage-head stage-head--center">
        <p className="stage-kicker">
          {evaluation.caseNumber} · {evaluation.kicker}
        </p>
        <h1 className="stage-title" id="evaluation-title">
          The Last Bit of <em>Paperwork</em>
        </h1>
      </div>

      <div className="evaluation-panel">
        <div className="evaluation-panel__head">
          <span>Mission Control  ·  Final Review</span>
          <span>Clearance level: you</span>
        </div>

        <div className="evaluation-panel__body">
          {!done ? (
            <div aria-live="polite">
              <div className="eval-loader__label">
                <span>{evaluation.loadingLabel}</span>
                <span className="eval-loader__percent">{progress}%</span>
              </div>
              <div
                className="eval-progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label={evaluation.loadingLabel}
              >
                <div
                  className="eval-progress__bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="eval-lines">
                {evaluation.loadingLines.slice(0, step).map((line) => (
                  <p className="eval-line eval-line--done" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="eval-complete">
              <h2 className="eval-complete__title">{evaluation.complete}</h2>

              <div className="eval-results">
                {evaluation.results.map((result, index) => (
                  <div
                    className="eval-row"
                    key={result.label}
                    style={{ animationDelay: `${0.08 + index * 0.09}s` }}
                  >
                    <span className="eval-row__label">{result.label}</span>
                    <span
                      className={`eval-row__value eval-row__value--${result.tone ?? "default"}`}
                    >
                      {result.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="eval-next"
                style={{ animationDelay: `${0.08 + evaluation.results.length * 0.09}s` }}
              >
                <span className="eval-next__label">
                  {evaluation.nextActionLabel}
                </span>
                <span className="eval-next__value">{evaluation.nextAction}</span>
                <Link className="btn btn--gold" to="/proposal">
                  {evaluation.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>

              <p className="eval-footnote">{evaluation.footnote}</p>
            </div>
          )}
        </div>
      </div>

      <footer className="stage-footer">
        <Link className="stage-footer__back" to="/childhood">
          ← Back
        </Link>
      </footer>
    </section>
  );
}
