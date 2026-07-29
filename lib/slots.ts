export interface Slot {
  date: string;
  time: string;
  slots: number;
}

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

// Returns the wall-clock Date when this slot ends (e.g. "3:30 - 4:00 pm" → 16:00).
function slotEndDate(date: string, time: string): Date {
  // date: "Tuesday, 1 September 2026"
  const [, day, month, year] = date.replace(",", "").split(" ");

  // time end segment: last part after " - ", e.g. "11:30 am" or "12:00 pm"
  const endPart = time.split(" - ").at(-1)!.trim();
  const isPM = /pm$/i.test(endPart);
  const [hStr, mStr] = endPart.replace(/\s*(am|pm)/i, "").trim().split(":");
  let h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;

  return new Date(parseInt(year, 10), MONTHS[month], parseInt(day, 10), h, m, 0);
}

export function isSlotPast(date: string, time: string): boolean {
  return slotEndDate(date, time) < new Date();
}

export const SLOTS: Slot[] = [
  { date: "Tuesday, 1 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Tuesday, 1 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Wednesday, 2 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Wednesday, 2 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Thursday, 3 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Thursday, 3 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Friday, 4 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Friday, 4 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Friday, 4 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Monday, 7 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Monday, 7 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Monday, 7 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Tuesday, 8 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Tuesday, 8 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Wednesday, 9 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Wednesday, 9 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Thursday, 10 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Thursday, 10 September 2026", time: "3:30 - 4:00 pm", slots: 2 },

  { date: "Friday, 11 September 2026", time: "11:00 - 11:30 am", slots: 2 },
  { date: "Friday, 11 September 2026", time: "11:30 am - 12:00 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "12:00 - 12:30 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "12:30 - 1:00 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "1:00 - 1:30 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "1:30 - 2:00 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "2:00 - 2:30 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "2:30 - 3:00 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "3:00 - 3:30 pm", slots: 2 },
  { date: "Friday, 11 September 2026", time: "3:30 - 4:00 pm", slots: 2 },
];
