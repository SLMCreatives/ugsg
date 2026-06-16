export interface Slot {
  date: string;
  time: string;
  slots: number;
}

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

// Returns the wall-clock Date when this slot ends (e.g. "4:25 - 4:45 pm" → 16:45).
function slotEndDate(date: string, time: string): Date {
  // date: "Monday, 15 June 2026"
  const [, day, month, year] = date.replace(",", "").split(" ");

  // time end segment: last part after " - ", e.g. "10:20 am" or "12:05 pm"
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
  { date: "Monday, 15 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Monday, 15 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Monday, 15 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Monday, 15 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Monday, 15 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Tuesday, 16 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Tuesday, 16 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Thursday, 18 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Thursday, 18 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Friday, 19 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Friday, 19 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Friday, 19 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Friday, 19 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Friday, 19 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Monday, 22 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Monday, 22 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Monday, 22 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Monday, 22 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Monday, 22 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Tuesday, 23 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Tuesday, 23 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Wednesday, 24 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Wednesday, 24 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Thursday, 25 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Thursday, 25 June 2026", time: "4:25 - 4:45 pm", slots: 3 },

  { date: "Friday, 26 June 2026", time: "10:00 - 10:20 am", slots: 3 },
  { date: "Friday, 26 June 2026", time: "10:35 - 10:55 am", slots: 3 },
  { date: "Friday, 26 June 2026", time: "11:10 - 11:30 am", slots: 3 },
  { date: "Friday, 26 June 2026", time: "11:45 am - 12:05 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "12:20 - 12:40 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "12:55 - 1:15 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "1:30 - 1:50 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "2:05 - 2:25 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "2:40 - 3:00 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "3:15 - 3:35 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "3:50 - 4:10 pm", slots: 3 },
  { date: "Friday, 26 June 2026", time: "4:25 - 4:45 pm", slots: 3 },
];
