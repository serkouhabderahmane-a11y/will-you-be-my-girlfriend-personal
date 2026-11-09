import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { mission } from "../data/personalization";

function AnimatedTitleLine({
  text,
  accent = false,
}: {
  text: string;
  accent?: boolean;
}) {
  return (
    <span
      className={`hero__title-line${accent ? " hero__title-line--accent" : ""}`}
    >
      {text.split("").map((character, index) => (
        <span className="letter" key={`${character}-${index}`}>
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll(".letter");
    const titleAnimation = animate(letters, {
      opacity: [0, 1],
      translateY: [34, 0],
      rotate: [4, 0],
      delay: stagger(38),
      ease: "outExpo",
      duration: 900,
    });

    let subtitleAnimation: ReturnType<typeof animate> | undefined;
    let actionsAnimation: ReturnType<typeof animate> | undefined;

    if (subtitleRef.current) {
      subtitleAnimation = animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [18, 0],
        delay: 850,
        duration: 750,
        ease: "outExpo",
      });
    }

    if (actionsRef.current) {
      actionsAnimation = animate(actionsRef.current, {
        opacity: [0, 1],
        translateY: [18, 0],
        delay: 1050,
        duration: 750,
        ease: "outExpo",
      });
    }

    return () => {
      titleAnimation.pause();
      subtitleAnimation?.pause();
      actionsAnimation?.pause();
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="landing-title">
      <div className="hero__halo" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__mission-tag">{mission.eyebrow}</p>

        <h1 className="hero__title" id="landing-title" ref={titleRef}>
          <AnimatedTitleLine text={mission.titleTop} />
          <AnimatedTitleLine text={mission.titleBottom} accent />
        </h1>

        <p className="hero__subtitle" ref={subtitleRef} style={{ opacity: 0 }}>
          {mission.subtitle}
        </p>

        <div
          className="hero__actions"
          ref={actionsRef}
          style={{ opacity: 0 }}
        >
          <a className="btn btn--primary" href="#letter">
            {mission.cta} <span aria-hidden="true">→</span>
          </a>
          <p className="hero__note">{mission.note}</p>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>{mission.scrollHint}</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
