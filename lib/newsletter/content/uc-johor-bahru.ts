import type { CampusNewsletter } from "../types";

/** Campus posters and photography, supplied by UCJB. */
const JB = "/newsletter/jb";

/**
 * UC Johor Bahru — UNITAR College Johor Bahru.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's UCJB draft. Connectivity here is a 1 Gbps
 * upgrade (as at Kota Bharu, Sungai Petani and Melaka) — not the 1 Gbps to
 * 2 Gbps doubling reported by UIU, UUCKL, Ipoh, Penang and Kuala Terengganu.
 * Do not carry the 2 Gbps wording across.
 *
 * Event posters render `contain` so their dates and details stay readable;
 * washroom photography crops to fill.
 */
export const ucJohorBahru: CampusNewsletter = {
  slug: "uc-johor-bahru",
  name: "UC Johor Bahru",
  fullName: "UNITAR College Johor Bahru",
  location: "Johor Bahru, Johor",

  issue: {
    label: "Issue 01",
    date: "August 2026"
  },

  hero: {
    eyebrow: "Student Feedback Action Update 2026",
    headline: "You spoke.",
    headlineAccent: "We acted.",
    headlineTail: "Here's what has improved!",
    subtitle:
      "Inside this issue: Wi-Fi upgraded to 1Gbps, a newly elected SRC with a full events calendar, a faster One Stop Centre, and new mirrors and slippers in the washrooms."
  },

  intro: [
    "Thanks to UNITARians' responses via the Student Satisfaction Survey (SSS) conducted in September 2025. Based on this feedback, we have been working on improvement measures from January to June 2026.",
    "Discover the latest improvements designed to enhance your campus experience, making learning, engagement, and student support better than ever."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "1 Gbps", label: "Campus Wi-Fi connectivity, upgraded" },
    { value: "6 Jan", label: "New OSC Helpdesk went live in 2026" },
    { value: "2026/27", label: "Term of the newly elected SRC" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Faster, Stronger Wi-Fi Connectivity",
      standfirst:
        "Seamless online learning and browsing, with upgraded high-speed internet across the campus.",
      body: [
        "Enhanced campus connectivity with a **1Gbps high-speed internet upgrade**, supporting seamless learning and digital activities."
      ],
      notes: [
        {
          kind: "result",
          text: "Faster internet speed, more stable connectivity, and an improved online experience for students."
        }
      ],
      images: [
        {
          src: `${JB}/wifi-1.png`,
          fit: "contain",
          alt: "A 1Gbps campus network diagram showing the network room main hub and splitter feeding satellite hubs in the open office area, classroom, and study and collaboration area",
          caption:
            "How the 1Gbps upgrade reaches each area, from the network room out to the satellite hubs."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief: "Add the 1Gbps connectivity diagram to public/newsletter/jb/."
      },
      caption: "Faster, more stable connectivity across campus."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "A New SRC Team, A New Chapter",
      standfirst:
        "A newly elected Student Representative Council, and a full calendar of programmes to go with it.",
      body: [
        "Get ready for an exciting year ahead with a newly elected **Student Representative Council (SRC)**, bringing more engaging, meaningful, and student-focused activities for our students.",
        "The newly elected SRC is eager to lead a dynamic calendar of programmes, events, and student engagement initiatives throughout the year."
      ],
      notes: [
        {
          kind: "result",
          text: "A more vibrant and connected campus community, offering students greater opportunities to engage, build meaningful relationships, develop leadership skills, and create memorable university experiences."
        }
      ],
      images: [
        {
          src: `${JB}/student-1.jpg`,
          fit: "contain",
          alt: "Majlis Perwakilan Pelajar Kolej UNITAR Johor Bahru poster for session 2026/27, with the SRC members pictured above the values Bersatu, Berwawasan, Berintegriti",
          caption:
            "The Majlis Perwakilan Pelajar UCJB for session 2026/27 — the newly elected SRC."
        },
        {
          src: `${JB}/student-3.png`,
          fit: "contain",
          alt: "Program Tanggungjawab Sosial Universiti (USR) poster — Gotong-Royong di Zoo Johor, 7 August 2026",
          caption: "Program Tanggungjawab Sosial Universiti — a gotong-royong at Zoo Johor."
        },
        {
          src: `${JB}/student-2.png`,
          fit: "contain",
          alt: "A colourful student lounge event poster with a 2 August (Wednesday) date, 9am to 12pm timing, and venue details",
          caption: "A student lounge event, part of the year's engagement calendar."
        },
        {
          src: `${JB}/student-4.png`,
          fit: "contain",
          alt: "UCJB Kaiju Overload match-up schedule poster, listing bracket fixtures across July 2026",
          caption: "The UCJB Kaiju Overload tournament match-up schedule."
        },
        {
          src: `${JB}/student-5.jpg`,
          fit: "contain",
          alt: "English Debate Competition poster — Speak Bold, Think Sharp, 16 July 2026 in Classroom 3 & 4, 9am to 12pm, with a registration QR code",
          caption: "English Debate Competition — speak bold, think sharp."
        },
        {
          src: `${JB}/student-6.png`,
          fit: "contain",
          alt: "Kejohanan Futsal poster for the Malaysian Indian Congress 80th anniversary, 20 June 2026 at TMIYC Renggam, with cash prizes up to RM1,500",
          caption:
            "Kejohanan Futsal, marking the Malaysian Indian Congress's 80th anniversary."
        },
        {
          src: `${JB}/student-7.png`,
          fit: "contain",
          alt: "CodeWar++ Competition poster — 7 April 2026, 9.30am to 1pm, in Computer Lab 1, an academic coding competition aligned with EDI103 Fundamental of Programming",
          caption:
            "CodeWar++ Competition, run alongside the Fundamental of Programming subject."
        },
        {
          src: `${JB}/student-8.jpg`,
          fit: "contain",
          alt: "Career Launchpad & Employability poster — Monday 6 April 2026, 8.30am to 1pm, at the Student Lounge, compulsory for internship students",
          caption:
            "Career Launchpad & Employability — compulsory for internship-semester students."
        },
        {
          src: `${JB}/student-9.png`,
          fit: "contain",
          alt: "Detektif Integriti Cilik poster — a children's integrity programme on 30 July 2026 at SK Taman Cahaya Masai, run under MPU2422 Kursus Integriti dan Anti Rasuah",
          caption:
            "Detektif Integriti Cilik — an anti-corruption awareness programme for schoolchildren."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the SRC organisation chart and event posters to public/newsletter/jb/."
      },
      caption: "A vibrant, connected campus community."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Enhanced One-Stop Centre (OSC) Support",
      standfirst:
        "An upgraded ticketing system, backed by dedicated IT support.",
      body: [
        "Our upgraded **OSC ticketing system**, backed by dedicated IT support, ensures faster response times, efficient issue resolution, and an improved student service experience.",
        "Enhanced One Stop Centre support is managed by IT personnel, for faster ICT assistance and solutions."
      ],
      notes: [
        { kind: "result", text: "Quicker responses and better support." }
      ],
      images: [
        {
          src: `${JB}/osc.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/jb/."
      },
      caption: "Faster ICT assistance, from dedicated IT personnel."
    },

    {
      id: "facilities",
      navLabel: "Facilities",
      kicker: "Campus facilities",
      heading: "Improved Student Facilities",
      standfirst:
        "New mirrors in the washrooms, and complimentary slippers at the student lounge.",
      bullets: [
        "Installation of mirrors at all washroom areas, for student convenience and comfort.",
        "Student Lounge washrooms are now equipped with slippers, for added convenience and comfort."
      ],
      notes: [
        {
          kind: "result",
          text: "Improved student comfort and convenience through enhanced washroom facilities."
        }
      ],
      images: [
        {
          src: `${JB}/facilities-1.jpg`,
          fit: "contain",
          alt: "New mirrors installed above two washroom sinks",
          caption: "New mirrors installed at all washroom areas."
        },
        {
          src: `${JB}/facilities-2.jpg`,
          fit: "contain",
          alt: "A rack of complimentary slippers outside the Student Lounge washroom doors",
          caption: "Complimentary slippers now available at the Student Lounge washrooms."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the washroom mirror and slipper rack photos to public/newsletter/jb/."
      },
      caption: "Small conveniences, better everyday comfort."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
