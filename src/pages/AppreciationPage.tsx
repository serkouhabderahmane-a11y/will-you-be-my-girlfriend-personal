import { useMemo, useState } from "react";
import { appreciation, qualities } from "../data/personalization";
import StageFooter from "../components/StageFooter";

export default function AppreciationPage() {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const openSet = useMemo(() => new Set(openIds), [openIds]);
  const allOpen = openIds.length === qualities.length;

  const toggleCard = (id: string) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <section aria-labelledby="appreciation-title">
      <div className="stage-head">
        <p className="stage-kicker">
          {appreciation.caseNumber} · {appreciation.kicker}
        </p>
        <h1 className="stage-title" id="appreciation-title">
          Personnel <em>Review</em>
        </h1>
        <p className="stage-intro">{appreciation.intro}</p>
      </div>

      <div className="review-status">
        <p className="review-status__text">
          {appreciation.instruction}
        </p>
        <p className="review-status__count" aria-live="polite">
          {openIds.length} / {qualities.length} {appreciation.reviewed}
        </p>
      </div>

      <div className="review-grid">
        {qualities.map((quality) => {
          const isOpen = openSet.has(quality.id);
          return (
            <button
              key={quality.id}
              className={`quality-card${isOpen ? " is-open" : ""}`}
              type="button"
              onClick={() => toggleCard(quality.id)}
              aria-expanded={isOpen}
              aria-label={`${quality.title}: ${isOpen ? "close file" : "open file"}`}
            >
              <span className="quality-card__inner">
                <span className="quality-card__face quality-card__front">
                  <span className="quality-card__number">
                    FILE {quality.number}
                  </span>
                  <span className="quality-card__glyph" aria-hidden="true">
                    {quality.glyph}
                  </span>
                  <span className="quality-card__title">{quality.title}</span>
                  <span className="quality-card__teaser">{quality.teaser}</span>
                  <span className="quality-card__open-label">
                    Open file →
                  </span>
                </span>
                <span className="quality-card__face quality-card__back">
                  <span className="quality-card__back-label">
                    {quality.title} · note {quality.number}
                  </span>
                  <span className="quality-card__note">{quality.note}</span>
                  <span className="quality-card__close-label">
                    Close file
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {allOpen ? (
        <div className="verdict-banner" role="status">
          <span className="verdict-banner__mark" aria-hidden="true">
            ✦
          </span>
          <p className="verdict-banner__copy">{appreciation.verdict}</p>
        </div>
      ) : null}

      <article
        className="paper appreciation-memo"
        aria-labelledby="appreciation-memo-title"
      >
        <div className="paper__inner">
          <div className="case-topbar">
            <span className="case-topbar__file">
              {appreciation.partnerMemo.file}
            </span>
            <span className="case-topbar__tag">
              {appreciation.partnerMemo.tag}
            </span>
          </div>

          <h2 className="case-title" id="appreciation-memo-title">
            {appreciation.partnerMemo.title}
          </h2>
          <p className="case-subtitle">
            {appreciation.partnerMemo.subtitle}
          </p>

          <div className="case-section">
            <p className="case-label">{appreciation.partnerMemo.label}</p>
            {appreciation.partnerMemo.lines.map((line) => (
              <p className="case-copy" key={line}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </article>

      <StageFooter
        backTo="/first-date"
        backLabel="Back"
        nextTo="/childhood"
        nextLabel={appreciation.cta}
      />
    </section>
  );
}
