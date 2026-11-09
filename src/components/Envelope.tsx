import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useNavigate } from "react-router-dom";
import { letter } from "../data/personalization";

export default function Envelope() {
  const navigate = useNavigate();
  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<SVGGElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 20, y: 20 });

  const noStarted = noAttempts > 0;
  const noGone = noAttempts >= letter.noMessages.length;
  const noMessage =
    noAttempts > 0
      ? letter.noMessages[Math.min(noAttempts - 1, letter.noMessages.length - 1)]
      : "";

  useEffect(() => {
    if (!envelopeRef.current) return;

    const floatAnimation = animate(envelopeRef.current, {
      translateY: [-6, 6],
      duration: 2400,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    return () => {
      floatAnimation.pause();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (flapRef.current) {
      animate(flapRef.current, {
        rotateX: [0, -180],
        duration: 700,
        ease: "outCubic",
      });
    }

    if (paperRef.current) {
      animate(paperRef.current, {
        opacity: [0, 1],
        translateY: [24, 0],
        scale: [0.97, 1],
        duration: 650,
        delay: 160,
        ease: "outExpo",
      });
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const getRandomPosition = () => {
    const buttonWidth = 92;
    const buttonHeight = 46;
    const padding = 16;
    const availableX = Math.max(
      padding,
      window.innerWidth - buttonWidth - padding * 2,
    );
    const availableY = Math.max(
      padding,
      window.innerHeight - buttonHeight - padding * 2,
    );
    return {
      x: padding + Math.random() * availableX,
      y: padding + Math.random() * availableY,
    };
  };

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (hintRef.current) {
      animate(hintRef.current, {
        opacity: [0.8, 0],
        duration: 300,
        ease: "outExpo",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setNoAttempts(0);
    if (hintRef.current) hintRef.current.style.opacity = "0.8";
  };

  const handleNo = () => {
    const next = noAttempts + 1;
    setNoAttempts(next);
    if (next < letter.noMessages.length) {
      setNoPos(getRandomPosition());
    }
  };

  const handleHover = () => {
    if (!isOpen && envelopeRef.current) {
      animate(envelopeRef.current, {
        rotate: [-1.5, 1.5, -1.5, 1.5, 0],
        duration: 500,
        ease: "inOutSine",
      });
    }
  };

  const handleToggle = () => {
    if (isOpen) return;
    handleOpen();
  };

  return (
    <section className="letter-stage" id="letter" aria-labelledby="letter-title">
      <header className="letter-stage__header">
        <div className="ornament" aria-hidden="true">
          ✦
        </div>
        <h2 className="letter-stage__title" id="letter-title">
          The First Clue
        </h2>
        <p className="letter-stage__hint">
          Within this envelope lies a mission, and possibly a certificate.
        </p>
      </header>

      <div className="envelope-wrap">
        <div ref={envelopeRef} style={{ width: "100%" }}>
          <svg
            className="envelope-svg"
            viewBox="0 0 280 180"
            xmlns="http://www.w3.org/2000/svg"
            role="button"
            tabIndex={0}
            aria-label="Open the letter"
            onClick={handleToggle}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleToggle();
              }
            }}
            onMouseEnter={handleHover}
          >
            <rect x="0" y="40" width="280" height="140" rx="6" fill="#fff5f0" />
            <polygon points="0,180 140,108 280,180" fill="#f8bbd0" />
            <polygon points="0,42 0,180 108,111" fill="#fce4ec" />
            <polygon points="280,42 280,180 172,111" fill="#fce4ec" />
            <polygon points="0,42 140,128 280,42" fill="#fce4ec" />
            <g
              ref={flapRef}
              style={{ transformOrigin: "50% 0%", transformBox: "fill-box" }}
            >
              <polygon points="0,42 140,130 280,42" fill="#f48fb1" />
            </g>
            <circle cx="140" cy="120" r="24" fill="#8b0000" />
            <circle cx="140" cy="120" r="20" fill="#b01840" />
            <circle cx="140" cy="120" r="16" fill="#e8375a" />
            <g transform="translate(140, 123)">
              <path
                d="M0 6 C0 6 -10 0 -10 -5 C-10 -9 -7 -11 -4 -11 C-2 -11 0 -9.5 0 -9.5 C0 -9.5 2 -11 4 -11 C7 -11 10 -9 10 -5 C10 0 0 6 0 6Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
      </div>

      <p className="envelope-hint" ref={hintRef}>
        {letter.hint}
      </p>

      {isOpen ? (
        <div
          className="letter-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-dialog-title"
        >
          <article className="letter-paper" ref={paperRef}>
            <div className="letter-paper__top">
              <span className="letter-paper__stamp">Private and confidential</span>
              <span className="eyebrow" aria-hidden="true">
                01 / 06
              </span>
            </div>

            <h2 className="letter-paper__salutation" id="letter-dialog-title">
              {letter.salutation}
            </h2>

            <div className="letter-paper__body">
              {letter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="letter-paper__signoff">{letter.signoff}</p>
            <p className="letter-paper__signature">{letter.signature}</p>
            <p className="letter-paper__ps">{letter.postscript}</p>

            <div className="letter-paper__actions">
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => navigate("/communication")}
              >
                {letter.beginLabel} <span aria-hidden="true">→</span>
              </button>
              {!noStarted && !noGone ? (
                <button
                  className="letter-paper__no"
                  type="button"
                  onClick={handleNo}
                >
                  {letter.noLabel}
                </button>
              ) : null}
            </div>

            <p className="letter-paper__message" aria-live="polite">
              {noMessage}
            </p>

            {noGone ? (
              <p className="letter-paper__gone">{letter.noGoneNote}</p>
            ) : null}

            <button
              className="btn--text letter-paper__close"
              type="button"
              onClick={handleClose}
            >
              {letter.closeLabel}
            </button>
          </article>
        </div>
      ) : null}

      {noStarted && !noGone ? (
        <button
          className="no-fly"
          type="button"
          onClick={handleNo}
          style={{ left: `${noPos.x}px`, top: `${noPos.y}px` }}
        >
          {letter.noLabel}
        </button>
      ) : null}
    </section>
  );
}
