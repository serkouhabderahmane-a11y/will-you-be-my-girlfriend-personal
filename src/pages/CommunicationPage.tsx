import { useEffect, useState } from "react";
import { communication } from "../data/personalization";
import StageFooter from "../components/StageFooter";

export default function CommunicationPage() {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    if (!testing) return;
    const timer = window.setTimeout(() => {
      setTesting(false);
      setTested(true);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [testing]);

  return (
    <section aria-labelledby="communication-title">
      <div className="stage-head">
        <p className="stage-kicker">
          {communication.caseNumber} · {communication.kicker}
        </p>
        <h1 className="stage-title" id="communication-title">
          The Communication <em>Investigation</em>
        </h1>
        <p className="stage-intro">{communication.intro}</p>
      </div>

      <article className="paper paper--tilt">
        <div className="paper__inner">
          <div className="case-topbar">
            <span className="case-topbar__file">
              Department of Not Having to Guess
            </span>
            <span className="case-topbar__tag">Filed under: exceptional</span>
          </div>

          <h2 className="case-title">Subject: You.</h2>
          <p className="case-subtitle">
            A brief inquiry into a very good habit.
          </p>

          <div className="case-section">
            <p className="case-label">{communication.witnessLabel}</p>
            <blockquote className="case-quote">{communication.quote}</blockquote>
          </div>

          <div className="case-section">
            <p className="case-label">{communication.analysisLabel}</p>
            <p className="case-copy">{communication.analysis}</p>
            <p className="case-copy case-copy--sincere">
              {communication.sincere}
            </p>
          </div>

          <div className="mind-test">
            <p className="mind-test__copy">
              An attempt was made to read your mind. For legal reasons, the
              attempt was largely theatrical.
            </p>
            <button
              className="btn btn--paper"
              type="button"
              onClick={() => {
                if (testing || tested) return;
                setTesting(true);
              }}
              disabled={testing || tested}
            >
              {testing ? communication.testRunning : communication.testLabel}
            </button>
            {tested ? (
              <p className="mind-test__result" aria-live="polite">
                {communication.testResult}
              </p>
            ) : null}
          </div>
        </div>
      </article>

      <article className="certificate" aria-labelledby="certificate-title">
        <p className="certificate__label">{communication.certificateLabel}</p>
        <h2 className="certificate__title" id="certificate-title">
          {communication.certificateTitle}
        </h2>
        <p className="certificate__award">{communication.certificateAward}</p>
        <p className="certificate__body">{communication.certificateBody}</p>
        <p className="certificate__footer">{communication.certificateFooter}</p>
        <button
          className={`certificate__seal${stamped ? " is-stamped" : ""}`}
          type="button"
          onClick={() => setStamped(true)}
          disabled={stamped}
          aria-label={
            stamped ? "Certificate sealed" : communication.sealLabel
          }
        >
          {stamped ? (
            <>
              Officially
              <br />
              certified
            </>
          ) : (
            <>
              Press
              <br />
              the seal
            </>
          )}
        </button>
        {stamped ? (
          <div className="achievement" role="status">
            <span className="achievement__icon" aria-hidden="true">
              ✦
            </span>
            <span>{communication.achievement}</span>
          </div>
        ) : null}
      </article>

      <StageFooter
        backTo="/"
        backLabel="Back"
        nextTo="/first-date"
        nextLabel="Next case"
      />
    </section>
  );
}
