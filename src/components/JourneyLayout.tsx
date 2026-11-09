import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { journeyStages } from "../data/personalization";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function JourneyLayout() {
  const { pathname } = useLocation();
  const currentIndex = journeyStages.findIndex((stage) => stage.path === pathname);
  const currentStage = currentIndex >= 0 ? journeyStages[currentIndex] : null;

  return (
    <div className="journey">
      <div className="journey__glow" aria-hidden="true" />
      <header className="journey-header">
        <div className="journey-header__inner">
          <Link className="mission-brand" to="/" aria-label="Back to the beginning">
            <span className="mission-brand__mark" aria-hidden="true">
              99
            </span>
            <span className="mission-brand__text">
              <span className="mission-brand__title">Mission: 99 years</span>
              <span className="mission-brand__sub">A very important investigation</span>
            </span>
          </Link>

          <nav className="journey-progress" aria-label="Mission progress">
            {journeyStages.map((stage) => {
              const isCurrent = stage.path === pathname;
              return (
                <NavLink
                  key={stage.path}
                  to={stage.path}
                  className={`journey-progress__item${isCurrent ? " is-current" : ""}`}
                  aria-current={isCurrent ? "page" : undefined}
                  title={stage.label}
                >
                  <span className="journey-progress__number">{stage.number}</span>
                  <span>{stage.shortLabel}</span>
                </NavLink>
              );
            })}
          </nav>

          {currentStage ? (
            <span className="journey-progress__mobile" aria-hidden="true">
              Step <strong>{currentStage.number} / 06</strong>
              <span>·</span>
              <span>{currentStage.shortLabel}</span>
            </span>
          ) : null}
        </div>
      </header>

      <main id="main" className="journey-main">
        <Outlet />
      </main>
    </div>
  );
}
