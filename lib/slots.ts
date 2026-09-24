export interface Slot {
  date: string;
  time: string;
  slots: number;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Sessions run 10 am - 5 pm in 30-minute slots, minus lunch. Friday lunch is
// longer (12:30 - 2:30 pm) to cover Friday prayers. Values are minutes from midnight.
const DAY_WINDOWS: [number, number][] = [[10 * 60, 13 * 60], [14 * 60, 17 * 60]];
const FRIDAY_WINDOWS: [number, number][] = [[10 * 60, 12 * 60 + 30], [14 * 60 + 30, 17 * 60]];
const SLOT_MINUTES = 30;

// Bookable days, inclusive. Weekends are skipped.
const FIRST_DAY = { year: 2026, month: 9, day: 12 }; // 12 October 2026
const LAST_DAY = { year: 2026, month: 9, day: 30 }; // 30 October 2026

// Students per time slot: first week (12-16 Oct), then the following two weeks (19-30 Oct).
const FIRST_WEEK_END = Date.UTC(2026, 9, 16);
const FIRST_WEEK_CAPACITY = 2;
const LATER_CAPACITY = 3;

function formatClock(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return {
    clock: `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")}`,
    meridiem: h < 12 ? "am" : "pm",
  };
}

// e.g. "11:00 - 11:30 am", "11:30 am - 12:00 pm"
function formatRange(start: number) {
  const a = formatClock(start);
  const b = formatClock(start + SLOT_MINUTES);
  return a.meridiem === b.meridiem
    ? `${a.clock} - ${b.clock} ${b.meridiem}`
    : `${a.clock} ${a.meridiem} - ${b.clock} ${b.meridiem}`;
}

function buildSlots(): Slot[] {
  const slots: Slot[] = [];
  const last = Date.UTC(LAST_DAY.year, LAST_DAY.month, LAST_DAY.day);

  for (
    let t = Date.UTC(FIRST_DAY.year, FIRST_DAY.month, FIRST_DAY.day);
    t <= last;
    t += 24 * 60 * 60 * 1000
  ) {
    const d = new Date(t);
    const weekday = d.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;

    // date: "Monday, 12 October 2026"
    const date = `${WEEKDAYS[weekday]}, ${d.getUTCDate()} ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    const capacity = t <= FIRST_WEEK_END ? FIRST_WEEK_CAPACITY : LATER_CAPACITY;
    const windows = weekday === 5 ? FRIDAY_WINDOWS : DAY_WINDOWS;

    for (const [from, to] of windows) {
      for (let start = from; start + SLOT_MINUTES <= to; start += SLOT_MINUTES) {
        slots.push({ date, time: formatRange(start), slots: capacity });
      }
    }
  }

  return slots;
}

export const SLOTS: Slot[] = buildSlots();

// Calendar day as a sortable number (e.g. 20261012), always in Malaysia time
// so the server (UTC) and the student's browser agree on what "today" is.
function malaysiaDayKey(now: Date): number {
  const myt = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  return myt.getUTCFullYear() * 10000 + (myt.getUTCMonth() + 1) * 100 + myt.getUTCDate();
}

function slotDayKey(date: string): number {
  // date: "Monday, 12 October 2026"
  const [, day, month, year] = date.replace(",", "").split(" ");
  return parseInt(year, 10) * 10000 + (MONTH_NAMES.indexOf(month) + 1) * 100 + parseInt(day, 10);
}

// Slots must be booked at least one day ahead: anything today or earlier is closed.
export function isSlotBookable(date: string, now: Date = new Date()): boolean {
  return slotDayKey(date) > malaysiaDayKey(now);
}
