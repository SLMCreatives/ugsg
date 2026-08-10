export interface ProgrammeGroup {
  label: string;
  options: string[];
}

// The groupings below only organise the dropdown visually — they are not
// official faculty names. Reorder or flatten them freely; the option strings
// are what gets written to the sheet, so keep those exact.
export const PROGRAMME_GROUPS: ProgrammeGroup[] = [
  {
    label: "Business & Accounting",
    options: [
      "Bachelor in Accounting (Honours) (Conventional)",
      "Bachelor in Accounting (Honours) (Online)",
      "Bachelor of Business Administration (Hons) (Conventional)",
      "Bachelor of Business Administration (Hons) (Online)",
      "Bachelor of Finance (Fintech) (Honours) (Conventional)",
      "Bachelor of Finance (Fintech) (Honours) (Online)",
      "Bachelor in International Business (Honours) (Conventional)",
      "Bachelor in International Business (Honours) (Online)",
      "Bachelor in Human Resource Management (Honours) (Conventional)",
      "Bachelor in Human Resource Management (Honours) (Online)"
    ]
  },
  {
    label: "Education & Psychology",
    options: [
      "Bachelor of Education (Hons) (Conventional)",
      "Bachelor of Education (Hons) (Online)",
      "Bachelor of Education (Early Childhood Education) (Hons) (Conventional)",
      "Bachelor of Education (Early Childhood Education) (Hons) (Online)",
      "Bachelor of Psychology (Honours) (Conventional)",
      "Bachelor of Psychology (Honours) (Online)"
    ]
  },
  {
    label: "IT, Media & Design",
    options: [
      "Bachelor of Mass Communication (Honours) (Conventional)",
      "Bachelor of Information Technology (Hons) (Conventional)",
      "Bachelor of Information Technology (Hons) (Online)",
      "Bachelor of Fashion Design with Marketing (Honours) (Conventional)",
      "Bachelor of Animation Design with Game Art (Honours) (Conventional)"
    ]
  }
];

// Students who have not decided yet still need to be able to RSVP — the event
// itself is partly there to help them choose.
export const NOT_SURE_YET = "Not sure yet";

// Flat list used to validate submissions server-side.
export const PROGRAMMES: string[] = [
  ...PROGRAMME_GROUPS.flatMap((group) => group.options),
  NOT_SURE_YET
];
