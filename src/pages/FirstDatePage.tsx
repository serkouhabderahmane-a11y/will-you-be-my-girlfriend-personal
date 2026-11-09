import { useState } from "react";
import { firstDate } from "../data/personalization";
import StageFooter from "../components/StageFooter";

export default function FirstDatePage() {
  const [accepted, setAccepted] = useState(false);

  return (
    <section aria-labelledby="first-date-title">
      <div className="stage-head">
        <p className="stage-kicker">
          {firstDate.caseNumber} · {firstDate.kicker}
        </p>
        <h1 className="stage-title" id="first-date-title">
          The Drinks <em>Incident</em>
        </h1>
        <p className="stage-intro">{firstDate.subtitle}</p>
      </div>

      <article className="paper paper--tilt">
        <div className="paper__inner">
          <div className="case-topbar">
            <span className="case-topbar__file">
              Official incident report  ·  first date division
            </span>
            <span className="case-topbar__tag">Suspect: this gentleman</span>
          </div>

          <h2 className="case-title">A small scandal, fully documented.</h2>
          <p className="case-subtitle">
            A thorough investigation, conducted by the only person who feels
            any guilt about it.
          </p>

          <div className="field-grid">
            {firstDate.fields.map((field) => (
              <div
                className={`field${field.label === "Verdict" ? " field--wide" : ""}`}
                key={field.label}
              >
                <p className="field__label">{field.label}</p>
                <p className="field__value">{field.value}</p>
              </div>
            ))}
          </div>

          <div className="evidence-receipt">
            <div className="evidence-receipt__head">
              <span>{firstDate.exhibitLabel}</span>
              <span>No. 001</span>
            </div>
            <div className="evidence-receipt__row">
              <span>{firstDate.receipt.item}</span>
              <strong>1</strong>
            </div>
            <div className="evidence-receipt__row">
              <span>Paid by</span>
              <strong>{firstDate.receipt.paidBy}</strong>
            </div>
            <div className="evidence-receipt__row">
              <span>Gentleman points</span>
              <strong>{firstDate.receipt.gentlemanPoints}</strong>
            </div>
            <p className="evidence-receipt__note">
              {firstDate.receipt.note}
            </p>
          </div>

          <div className="case-section">
            <p className="case-label">{firstDate.apologyLabel}</p>
            <p className="case-copy case-copy--sincere">
              {firstDate.apology}
            </p>
          </div>

          <div className="case-actions">
            {!accepted ? (
              <button
                className="btn btn--paper"
                type="button"
                onClick={() => setAccepted(true)}
              >
                {firstDate.acceptLabel}
              </button>
            ) : (
              <span className="stamp stamp--large">
                {firstDate.acceptedStamp}
              </span>
            )}
          </div>

          {accepted ? (
            <div className="case-result" role="status">
              <p className="case-result__title">{firstDate.acceptedTitle}</p>
              <p className="case-result__copy">{firstDate.acceptedBody}</p>
              <p className="case-result__copy case-result__copy--rose">
                {firstDate.caseClosed}
              </p>
            </div>
          ) : null}
        </div>
      </article>

      <StageFooter
        backTo="/communication"
        backLabel="Back"
        nextTo="/appreciation"
        nextLabel="Next: appreciation"
      />
    </section>
  );
}
