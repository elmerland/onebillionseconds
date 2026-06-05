// Pure calculation helpers — no DOM.
export const BILLION = 1_000_000_000;
export const SECONDS_PER_DAY = 86_400;
export const SECONDS_PER_WEEK = 604_800;
export const LIFE_YEARS = 90;
export const WEEKS_PER_YEAR = 52;
export const WEEKS_IN_LIFE = LIFE_YEARS * WEEKS_PER_YEAR; // 4,680

export function parseDate(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str + 'T12:00:00');
  if (isNaN(d.getTime())) return null;
  return d;
}

export function addSeconds(d: Date, s: number): Date {
  return new Date(d.getTime() + s * 1000);
}

export function fmtDate(d: Date | null): string {
  if (!d) return '—';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy} · ${mm} · ${dd}`;
}

export function fmtNum(n: number): string {
  return Math.floor(n).toLocaleString('en-US');
}

export interface Computed {
  birth: Date;
  now: Date;
  billionDate: Date;
  billionDow: string;
  secondsLived: number;
  secondsUntilBillion: number;
  daysLived: number;
  weeksLived: number;
  billionWeek: number;
  billionDay: number;
  billionAge: number;
  ageYears: number;
  lifeEnd: Date;
  secondsInLife: number;
  pctOfLife: number;
  pctToBillion: number;
  reached: boolean;
}

export function compute(birth: Date, now: Date = new Date()): Computed {
  const billionDate = addSeconds(birth, BILLION);
  const secondsLived = Math.max(0, (now.getTime() - birth.getTime()) / 1000);
  const daysLived = secondsLived / SECONDS_PER_DAY;
  const weeksLived = secondsLived / SECONDS_PER_WEEK;
  const billionAge = BILLION / (SECONDS_PER_DAY * 365.25);
  const ageYears = (now.getTime() - birth.getTime()) / (1000 * SECONDS_PER_DAY * 365.25);
  const lifeEnd = new Date(birth);
  lifeEnd.setFullYear(birth.getFullYear() + LIFE_YEARS);
  const secondsInLife = (lifeEnd.getTime() - birth.getTime()) / 1000;

  return {
    birth, now, billionDate,
    billionDow: billionDate.toLocaleString('en-US', { weekday: 'long' }).toUpperCase(),
    secondsLived,
    secondsUntilBillion: BILLION - secondsLived,
    daysLived, weeksLived,
    billionWeek: Math.floor(BILLION / SECONDS_PER_WEEK),
    billionDay: Math.floor(BILLION / SECONDS_PER_DAY),
    billionAge, ageYears, lifeEnd, secondsInLife,
    pctOfLife: Math.min(1, (now.getTime() - birth.getTime()) / (lifeEnd.getTime() - birth.getTime())),
    pctToBillion: Math.min(1, secondsLived / BILLION),
    reached: secondsLived >= BILLION,
  };
}
