export const RELATIONSHIP_STORAGE_KEY = "wymg.relationship.acceptedAt.v1";
export const CONTRACT_YEARS = 99;

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export interface DurationParts {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RelationshipStats {
  start: Date;
  target: Date;
  elapsed: DurationParts;
  remaining: DurationParts;
  elapsedMs: number;
  remainingMs: number;
  progress: number;
  totalDays: number;
  isComplete: boolean;
}

function safeGetStorage(): Storage | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

/**
 * Reads the exact moment the proposal was accepted.
 * Returns null until the YES button has been clicked.
 */
export function getAcceptanceTimestamp(): string | null {
  const storage = safeGetStorage();
  if (!storage) return null;
  try {
    const value = storage.getItem(RELATIONSHIP_STORAGE_KEY);
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return value;
  } catch {
    return null;
  }
}

/**
 * Saves the acceptance timestamp exactly once.
 * Repeated YES clicks (or a refresh) never create a new start date.
 */
export function acceptProposal(now: Date = new Date()): string {
  const existing = getAcceptanceTimestamp();
  if (existing) return existing;

  const timestamp = now.toISOString();
  const storage = safeGetStorage();
  if (storage) {
    try {
      storage.setItem(RELATIONSHIP_STORAGE_KEY, timestamp);
    } catch {
      // Storage can be unavailable in private browsing. The in-memory
      // timestamp still lets this session celebrate correctly.
    }
  }
  return timestamp;
}

/**
 * Adds calendar years rather than 365-day chunks, so leap years are respected.
 * Feb 29 is clamped to Feb 28 when the target year is not a leap year.
 */
export function addCalendarYears(date: Date, years: number): Date {
  const result = new Date(date.getTime());
  const originalMonth = result.getMonth();
  result.setFullYear(result.getFullYear() + years);
  if (result.getMonth() !== originalMonth) {
    // The original day does not exist in the target month (Feb 29 -> Mar 1).
    // Move to the last day of the intended month instead.
    result.setDate(0);
  }
  return result;
}

function calendarDuration(from: Date, to: Date): DurationParts {
  if (to.getTime() <= from.getTime()) {
    return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = to.getFullYear() - from.getFullYear();
  if (years < 0) years = 0;
  while (addCalendarYears(from, years + 1).getTime() <= to.getTime()) years += 1;
  while (years > 0 && addCalendarYears(from, years).getTime() > to.getTime()) {
    years -= 1;
  }

  let remainder =
    to.getTime() - addCalendarYears(from, years).getTime();
  const days = Math.floor(remainder / MS_PER_DAY);
  remainder -= days * MS_PER_DAY;
  const hours = Math.floor(remainder / MS_PER_HOUR);
  remainder -= hours * MS_PER_HOUR;
  const minutes = Math.floor(remainder / MS_PER_MINUTE);
  remainder -= minutes * MS_PER_MINUTE;
  const seconds = Math.floor(remainder / MS_PER_SECOND);

  return { years, days, hours, minutes, seconds };
}

export function getRelationshipStats(
  acceptedAt: string,
  now: Date = new Date(),
): RelationshipStats | null {
  const start = new Date(acceptedAt);
  if (Number.isNaN(start.getTime())) return null;

  const target = addCalendarYears(start, CONTRACT_YEARS);
  const current = now.getTime() < start.getTime() ? start : now;
  const totalMs = target.getTime() - start.getTime();
  const elapsedMs = Math.max(0, current.getTime() - start.getTime());
  const remainingMs = Math.max(0, target.getTime() - current.getTime());
  const isComplete = current.getTime() >= target.getTime();

  return {
    start,
    target,
    elapsed: calendarDuration(start, current),
    remaining: isComplete
      ? { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
      : calendarDuration(current, target),
    elapsedMs,
    remainingMs,
    progress:
      totalMs > 0 ? Math.min(1, Math.max(0, elapsedMs / totalMs)) : 0,
    totalDays: totalMs / MS_PER_DAY,
    isComplete,
  };
}

export function formatCalendarDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatCalendarDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function plural(value: number, singular: string, pluralWord?: string): string {
  return `${value} ${value === 1 ? singular : (pluralWord ?? `${singular}s`)}`;
}

export function formatDuration(parts: DurationParts, includeSeconds = false): string {
  const pieces = [
    plural(parts.years, "year"),
    plural(parts.days, "day"),
    plural(parts.hours, "hour"),
  ];
  if (includeSeconds) {
    pieces.push(plural(parts.minutes, "minute"));
    pieces.push(plural(parts.seconds, "second"));
  }
  return pieces.join(", ");
}

export function formatProgress(progress: number): string {
  const percentage = progress * 100;
  if (percentage > 0 && percentage < 0.000001) return "<0.000001%";
  return `${percentage.toFixed(6)}%`;
}

export function clearAcceptanceForTesting(): void {
  const storage = safeGetStorage();
  if (!storage) return;
  try {
    storage.removeItem(RELATIONSHIP_STORAGE_KEY);
  } catch {
    // No-op.
  }
}
