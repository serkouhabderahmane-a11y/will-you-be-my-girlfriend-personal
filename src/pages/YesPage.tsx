import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { animate, stagger } from "animejs";
import HeartScene from "../components/HeartScene";
import Celebration from "../components/Celebration";
import LoveBook from "../components/LoveBook";
import LoveTimer from "./LoveTimer";
import { celebration } from "../data/personalization";
import { getAcceptanceTimestamp } from "../lib/relationship";

export default function YesPage() {
  const acceptedAt = getAcceptanceTimestamp();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const titleAnimation = animate(titleRef.current.querySelectorAll(".letter"), {
      opacity: [0, 1],
      translateY: [36, 0],
      delay: stagger(55),
      duration: 850,
      ease: "outExpo",
    });

    let subtitleAnimation: ReturnType<typeof animate> | undefined;
    let messageAnimation: ReturnType<typeof animate> | undefined;

    if (subtitleRef.current) {
      subtitleAnimation = animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [18, 0],
        delay: 850,
        duration: 700,
        ease: "outExpo",
      });
    }

    if (messageRef.current) {
      messageAnimation = animate(messageRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: 1150,
        duration: 750,
        ease: "outExpo",
      });
    }

    return () => {
      titleAnimation.pause();
      subtitleAnimation?.pause();
      messageAnimation?.pause();
    };
  }, []);

  if (!acceptedAt) {
    return <Navigate to="/proposal" replace />;
  }

  return (
    <div className="yes-page">
      <HeartScene />
      <div className="yes-overlay" aria-hidden="true" />
      <Celebration />

      <main id="main" className="yes-content">
        <section className="yes-hero" aria-labelledby="yes-title">
          <p className="eyebrow eyebrow--rose">· {celebration.eyebrow} ·</p>
          <h1 className="yes-title" id="yes-title" ref={titleRef}>
            {celebration.title.split("").map((character, index) => (
              <span className="letter" key={`${character}-${index}`}>
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
            <span aria-hidden="true">💝</span>
          </h1>
          <p className="yes-subtitle" ref={subtitleRef} style={{ opacity: 0 }}>
            {celebration.subtitle}
          </p>

          <div
            className="yes-message"
            ref={messageRef}
            style={{ opacity: 0 }}
          >
            {celebration.message.map((line, index) => (
              <p key={line}>
                {index === 0 ? (
                  <>
                    <strong>Thank you for saying yes.</strong>{" "}
                    {line.replace("Thank you for saying yes. ", "")}
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>

          <a className="yes-scroll" href="#contract">
            {celebration.contractHint}
          </a>
        </section>

        <section className="yes-section" id="contract">
          <LoveTimer acceptedAt={acceptedAt} />
        </section>

        <section className="yes-section yes-section--book" id="book">
          <header className="yes-section__head">
            <p className="eyebrow eyebrow--rose">· {celebration.bookHint} ·</p>
            <h2 className="yes-section__title">Your keepsake</h2>
            <p className="yes-section__note">
              Six pages from a story that has only just begun.
            </p>
          </header>
          <LoveBook />
        </section>
      </main>
    </div>
  );
}
