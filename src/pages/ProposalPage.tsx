import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartScene from "../components/HeartScene";
import { proposal } from "../data/personalization";
import { acceptProposal } from "../lib/relationship";

export default function ProposalPage() {
  const navigate = useNavigate();
  const [noAttempts, setNoAttempts] = useState(0);
  const [noSettled, setNoSettled] = useState(false);
  const [noPos, setNoPos] = useState({ x: 24, y: 24 });

  const randomPosition = () => {
    const width = 100;
    const height = 48;
    const padding = 18;
    const availableX = Math.max(
      padding,
      window.innerWidth - width - padding * 2,
    );
    const availableY = Math.max(
      padding,
      window.innerHeight - height - padding * 2,
    );
    return {
      x: padding + Math.random() * availableX,
      y: padding + Math.random() * availableY,
    };
  };

  const handleNoDodge = () => {
    if (noSettled) return;
    const next = noAttempts + 1;
    setNoAttempts(next);
    if (next >= proposal.noMessages.length) {
      setNoSettled(true);
      return;
    }
    setNoPos(randomPosition());
  };

  const handleYes = () => {
    acceptProposal();
    navigate("/yes");
  };

  const noMessage =
    noAttempts > 0 && !noSettled
      ? proposal.noMessages[Math.min(noAttempts - 1, proposal.noMessages.length - 1)]
      : "";

  return (
    <section className="proposal-page" aria-labelledby="proposal-title">
      <HeartScene />
      <div className="proposal-overlay" aria-hidden="true" />

      <article className="proposal-card">
        <div className="proposal-card__seal" aria-hidden="true">
          {proposal.seal}
        </div>
        <p className="proposal-card__eyebrow">{proposal.eyebrow}</p>

        <div className="proposal-intro">
          {proposal.intro.map((line, index) => (
            <p key={line} style={{ animationDelay: `${0.16 + index * 0.14}s` }}>
              {line}
            </p>
          ))}
        </div>

        <h1 className="proposal-question" id="proposal-title">
          {proposal.question}
        </h1>

        <div className="proposal-actions">
          <button className="btn btn--primary" type="button" onClick={handleYes}>
            {proposal.yesLabel} <span aria-hidden="true">❤️</span>
          </button>

          {noSettled ? (
            <button
              className="proposal-no"
              type="button"
              onClick={() => navigate("/not-now")}
            >
              {proposal.honestNo}
            </button>
          ) : noAttempts === 0 ? (
            <button
              className="proposal-no"
              type="button"
              onClick={handleNoDodge}
            >
              {proposal.noLabel}
            </button>
          ) : null}
        </div>

        {noMessage ? (
          <p className="proposal-message" aria-live="polite">
            {noMessage}
          </p>
        ) : null}

        {noSettled ? (
          <div className="proposal-respect" role="status">
            <p className="proposal-respect__copy">{proposal.respectNote}</p>
            <div className="proposal-respect__actions">
              <Link className="btn btn--ghost" to="/not-now">
                {proposal.honestNo}
              </Link>
              <button
                className="btn btn--primary"
                type="button"
                onClick={handleYes}
              >
                {proposal.yesAgain}
              </button>
            </div>
          </div>
        ) : (
          <Link className="proposal-honest-link" to="/not-now">
            {proposal.honestLink}
          </Link>
        )}
      </article>

      {noAttempts > 0 && !noSettled ? (
        <button
          className="no-fly"
          type="button"
          onClick={handleNoDodge}
          style={{ left: `${noPos.x}px`, top: `${noPos.y}px` }}
        >
          {proposal.noLabel}
        </button>
      ) : null}
    </section>
  );
}
