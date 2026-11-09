import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { contract } from "../data/personalization";
import {
  formatCalendarDate,
  formatCalendarDateTime,
  formatDuration,
  formatProgress,
  getRelationshipStats,
} from "../lib/relationship";

function TimerUnit({ value, label }: { value: number; label: string }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const previousValue = useRef(value);
  const digits = String(value).padStart(2, "0");

  useEffect(() => {
    if (previousValue.current === value || !numberRef.current) {
      previousValue.current = value;
      return;
    }
    previousValue.current = value;
    animate(numberRef.current, {
      translateY: [7, 0],
      opacity: [0.45, 1],
      duration: 380,
      ease: "outExpo",
    });
  }, [value]);

  return (
    <div className="timer-unit">
      <div className="timer-unit__box">
        <span
          className="timer-unit__digits"
          ref={numberRef}
          aria-label={`${value} ${label}`}
        >
          {digits.split("").map((digit, index) => (
            <span className="timer-unit__digit" key={`${index}-${digit}`}>
              {digit}
            </span>
          ))}
        </span>
      </div>
      <span className="timer-unit__label">{label}</span>
    </div>
  );
}

export default function LoveTimer({ acceptedAt }: { acceptedAt: string }) {
  const [now, setNow] = useState(() => new Date());
  const [noticeIndex, setNoticeIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    const onVisibilityChange = () => {
      if (!document.hidden) setNow(new Date());
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNoticeIndex((current) => (current + 1) % contract.notices.length);
    }, 6200);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!wrapRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const unitsAnimation = animate(
      wrapRef.current.querySelectorAll(".timer-unit"),
      {
        opacity: [0, 1],
        translateY: [22, 0],
        delay: stagger(80, { start: 220 }),
        duration: 700,
        ease: "outExpo",
      },
    );

    const detailAnimation = animate(
      wrapRef.current.querySelectorAll(".contract__meta, .contract__progress-label, .contract__progress, .contract__notices, .contract__special"),
      {
        opacity: [0, 1],
        translateY: [14, 0],
        delay: stagger(70, { start: 560 }),
        duration: 650,
        ease: "outExpo",
      },
    );

    return () => {
      hasAnimated.current = false;
      unitsAnimation.pause();
      detailAnimation.pause();
    };
  }, [acceptedAt]);

  const stats = getRelationshipStats(acceptedAt, now);
  if (!stats) return null;

  const units = [
    { label: "Years", value: stats.elapsed.years },
    { label: "Days", value: stats.elapsed.days },
    { label: "Hours", value: stats.elapsed.hours },
    { label: "Minutes", value: stats.elapsed.minutes },
    { label: "Seconds", value: stats.elapsed.seconds },
  ];

  const notice = contract.notices[noticeIndex];
  const status = stats.isComplete ? "COMPLETE" : contract.status;

  return (
    <section className="contract" aria-labelledby="contract-heading" ref={wrapRef}>
      <div className="contract__head">
        <p className="contract__label">{contract.label}</p>
        <h2 className="contract__heading" id="contract-heading">
          {contract.heading}
        </h2>
        <div className="contract__dates">
          <span>Officially begun on: {formatCalendarDate(stats.start)}</span>
          <span>{contract.durationLine}</span>
          <span>Concludes after 99 years: {formatCalendarDate(stats.target)}</span>
        </div>
        <div className="contract__status">
          <span className="contract__status-dot" aria-hidden="true" />
          {contract.statusLabel}: {status}
        </div>
      </div>

      <div
        className="timer-grid"
        aria-label="Time elapsed since you said yes"
      >
        {units.map((unit) => (
          <TimerUnit key={unit.label} label={unit.label} value={unit.value} />
        ))}
      </div>

      <div className="contract__meta">
        <div className="contract__meta-item">
          <p className="contract__meta-label">Time elapsed</p>
          <p className="contract__meta-value">
            {formatDuration(stats.elapsed, true)}
          </p>
        </div>
        <div className="contract__meta-item">
          <p className="contract__meta-label">
            {stats.isComplete ? "Contract completed" : "Time remaining"}
          </p>
          <p className="contract__meta-value">
            {stats.isComplete
              ? "All 99 years, honoured in full."
              : formatDuration(stats.remaining, true)}
          </p>
        </div>
      </div>

      <div className="contract__progress-label">
        <span>Progress toward 99 years</span>
        <span className="contract__progress-value">
          {formatProgress(stats.progress)}
        </span>
      </div>
      <div
        className="contract__progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number((stats.progress * 100).toFixed(6))}
        aria-valuetext={`${formatProgress(stats.progress)} of the full contract`}
        aria-label="Progress toward 99 years"
      >
        <div
          className="contract__progress-bar"
          style={{
            width: `${stats.progress * 100}%`,
            minWidth: stats.progress > 0 ? "2px" : 0,
          }}
        />
      </div>

      <div className="contract__notices" aria-live="polite">
        <p className="contract__notice" key={notice}>
          {notice}
        </p>
      </div>

      <p className="contract__special">{contract.specialLine}</p>
      <p className="contract__signature">
        Signed at <strong>{formatCalendarDateTime(stats.start)}</strong>, by you,
        witnessed by me
      </p>
    </section>
  );
}
