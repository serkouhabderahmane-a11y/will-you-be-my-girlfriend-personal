import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { bookPages } from "../data/personalization";

export default function LoveBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const candleFlameRef = useRef<HTMLDivElement>(null);
  const candleGlowRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const flipPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!candleFlameRef.current || !candleGlowRef.current) return;

    const flameAnimation = animate(candleFlameRef.current, {
      scaleX: [1, 0.88, 1.1, 0.92, 1],
      scaleY: [1, 1.06, 0.96, 1.04, 1],
      translateX: [0, -1, 1, -1, 0],
      duration: 1600,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    const glowAnimation = animate(candleGlowRef.current, {
      opacity: [0.5, 0.85, 0.6, 0.95, 0.55],
      scale: [1, 1.1, 0.95, 1.08, 1],
      duration: 1600,
      ease: "inOutSine",
      loop: true,
      alternate: true,
    });

    return () => {
      flameAnimation.pause();
      glowAnimation.pause();
    };
  }, []);

  const openBook = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    if (!coverRef.current) {
      setIsOpening(false);
      return;
    }

    animate(coverRef.current, {
      rotateY: [0, -160],
      duration: 900,
      ease: "outExpo",
      onComplete: () => {
        setIsOpen(true);
        setIsOpening(false);
      },
    });
  };

  const flipPage = (direction: "next" | "prev") => {
    if (isFlipping) return;
    if (direction === "next" && currentPage >= bookPages.length - 1) return;
    if (direction === "prev" && currentPage <= 0) return;
    if (!flipPageRef.current) return;

    setIsFlipping(true);

    animate(flipPageRef.current, {
      opacity: [1, 0],
      translateX: direction === "next" ? [0, -40] : [0, 40],
      duration: 250,
      ease: "inCubic",
      onComplete: () => {
        setCurrentPage((page) =>
          direction === "next" ? page + 1 : page - 1,
        );

        if (flipPageRef.current) {
          animate(flipPageRef.current, {
            opacity: [0, 1],
            translateX: direction === "next" ? [40, 0] : [-40, 0],
            duration: 350,
            ease: "outCubic",
            onComplete: () => setIsFlipping(false),
          });
        }
      },
    });
  };

  const page = bookPages[currentPage];

  return (
    <div className="love-book">
      <div className="love-book__candle" aria-hidden="true">
        <div ref={candleFlameRef} style={{ position: "relative" }}>
          <div
            ref={candleGlowRef}
            style={{
              position: "absolute",
              width: "70px",
              height: "70px",
              background:
                "radial-gradient(circle, rgba(255,180,50,0.45) 0%, transparent 70%)",
              top: "-15px",
              left: "50%",
              transform: "translateX(-50%)",
              filter: "blur(10px)",
              borderRadius: "50%",
            }}
          />
          <svg width="26" height="42" viewBox="0 0 26 42" fill="none">
            <path
              d="M13 42C5.8 42 1 35.5 1 28C1 19.5 8 13.5 10 8C11 5 12 2 13 0C14 2 15 5 16 8C18 13.5 25 19.5 25 28C25 35.5 20.2 42 13 42Z"
              fill="url(#bookFlame)"
            />
            <path
              d="M13 37C9.5 37 7 33 7 28C7 23 10.5 19 12 15C13 18 16 22 16 28C16 33 14.5 37 13 37Z"
              fill="rgba(255,255,200,0.85)"
            />
            <defs>
              <linearGradient
                id="bookFlame"
                x1="13"
                y1="0"
                x2="13"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#fff9a0" />
                <stop offset="35%" stopColor="#ffaa00" />
                <stop offset="100%" stopColor="#ff3300" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ width: "1px", height: "8px", background: "#555" }} />
        </div>
        <div
          style={{
            width: "26px",
            height: "72px",
            background:
              "linear-gradient(180deg,#fffbf0 0%,#fde68a 60%,#f5c842 100%)",
            boxShadow: "inset -3px 0 6px rgba(0,0,0,0.12)",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "34px",
            height: "7px",
            background: "linear-gradient(180deg,#f5c842,#c8973a)",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "50px",
            height: "6px",
            marginTop: "4px",
            background:
              "radial-gradient(ellipse,rgba(255,180,50,0.25) 0%,transparent 70%)",
            filter: "blur(3px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <p className="love-book__label">Our story, kept in paper</p>

      <div className="book-stage">
        {!isOpen && !isOpening ? (
          <div className="book-hint">✨ Open the book</div>
        ) : null}

        <div className="book">
          <div className="book__pages">
            <div className="book__paper-lines" />
            <div className="book__margin-line" />

            {isOpen ? (
              <div className="book__content" ref={flipPageRef}>
                <div className="book__top-row">
                  <span className="book__page-number">
                    {currentPage + 1} / {bookPages.length}
                  </span>
                  <span className="book__emoji" aria-hidden="true">
                    {page.emoji}
                  </span>
                </div>

                <p className="book__kicker">{page.kicker}</p>
                <h2 className="book__title">{page.title}</h2>

                <div className="book__text">
                  {page.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <nav className="book__nav" aria-label="Book pages">
                  <button
                    className="book__nav-button"
                    type="button"
                    onClick={() => flipPage("prev")}
                    disabled={currentPage === 0 || isFlipping}
                    style={{ textAlign: "left" }}
                  >
                    ← Previous
                  </button>

                  <div className="book__dots" aria-hidden="true">
                    {bookPages.map((bookPage, index) => (
                      <span
                        key={bookPage.title}
                        className={`book__dot${index === currentPage ? " is-current" : ""}`}
                      />
                    ))}
                  </div>

                  <button
                    className="book__nav-button"
                    type="button"
                    onClick={() => flipPage("next")}
                    disabled={
                      currentPage === bookPages.length - 1 || isFlipping
                    }
                    style={{ textAlign: "right" }}
                  >
                    Next →
                  </button>
                </nav>
              </div>
            ) : null}

            <div className="book__curl" />
          </div>

          <div className="book__spine" />

          {!isOpen ? (
            <div
              className="book__cover"
              ref={coverRef}
              onClick={openBook}
              role="button"
              tabIndex={0}
              aria-label="Open our story book"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openBook();
                }
              }}
            >
              <div className="book__cover-inner">
                <div className="book__cover-texture" />
                <div className="book__cover-content">
                  <div className="book__cover-rule" />
                  <span className="book__cover-emoji" aria-hidden="true">
                    📖
                  </span>
                  <h3 className="book__cover-title">Our Story in 99 Years</h3>
                  <p className="book__cover-subtitle">
                    A small keepsake, written with considerable affection
                  </p>
                  <div className="book__cover-rule" />
                </div>
                <span
                  className="book__cover-ornament book__cover-ornament--tl"
                  aria-hidden="true"
                >
                  ❧
                </span>
                <span
                  className="book__cover-ornament book__cover-ornament--br"
                  aria-hidden="true"
                >
                  ❧
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {isOpen ? (
          <p className="book__turn-hint">Tap the arrows to turn the page.</p>
        ) : null}
      </div>
    </div>
  );
}
