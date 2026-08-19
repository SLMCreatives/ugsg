import type { CampusNewsletter } from "../types";

/** Campus posters and photography, supplied by UC Melaka. */
const M = "/newsletter/melaka";

/**
 * UC Melaka — UNITAR College Melaka.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's "Melaka SSS Newsletter Draft v1.2 UCMLK"
 * draft. Connectivity here is a 1 Gbps upgrade (as at Kota Bharu and Sungai
 * Petani) — not the 1 Gbps to 2 Gbps doubling reported by UIU, UUCKL, Ipoh,
 * Penang and Kuala Terengganu. Do not carry the 2 Gbps wording across.
 *
 * Event posters render `contain` so their dates and details stay readable;
 * room photography crops to fill.
 */
export const ucMelaka: CampusNewsletter = {
  slug: "uc-melaka",
  name: "UC Melaka",
  fullName: "UNITAR College Melaka",
  location: "Melaka",

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
      "Inside this issue: Wi-Fi upgraded to 1Gbps, a newly elected SRC with a full events calendar, a faster One Stop Centre, refurbished classrooms and labs, and enhanced Early Childhood Education facilities."
  },

  intro: [
    "Following the responses from the Student Satisfaction Survey (SSS) from students conducted in September 2025, and based on your feedback, we have made some improvements.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months."
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
      heading: "Stable Wi-Fi, Faster Connectivity on Campus",
      standfirst: "Campus Wi-Fi upgraded to 1Gbps.",
      body: [
        "Enhanced campus connectivity with a **1Gbps high-speed internet upgrade**, supporting seamless learning and digital activities."
      ],
      notes: [
        {
          kind: "result",
          text: "Faster internet speed, more stable connectivity, and an improved online experience for students and staff."
        }
      ],
      images: [
        {
          src: `${M}/wifi.png`,
          fit: "contain",
          alt: "A 1Gbps campus network diagram showing the network room main hub and splitter feeding satellite hubs in the open office area, classroom, and study and collaboration area",
          caption:
            "How the 1Gbps upgrade reaches each area, from the network room out to the satellite hubs."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 1Gbps connectivity diagram to public/newsletter/melaka/."
      },
      caption: "Faster, more stable connectivity across campus."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Student Life & Engagement",
      standfirst:
        "A newly elected Student Representative Council, and a full calendar of programmes to go with it.",
      body: [
        "The newly elected **Student Representative Council (SRC)** is eager to lead a dynamic calendar of programmes, events, and student engagement initiatives throughout the year."
      ],
      notes: [
        {
          kind: "result",
          text: "A more vibrant and connected campus community, offering students greater opportunities to engage, build meaningful relationships, develop leadership skills, and create memorable university experiences."
        }
      ],
      images: [
        {
          src: `${M}/student-life-1.png`,
          fit: "contain",
          alt: "Organisation chart of the Majlis Perwakilan Pelajar UNITAR College Melaka, showing the president, vice-president, and exco members across spirituality, welfare, academic, unity, arts, sports, multimedia, and protocol",
          caption:
            "The Majlis Perwakilan Pelajar — the newly elected SRC leading the year's calendar."
        },
        {
          src: `${M}/student-life-2.png`,
          fit: "contain",
          alt: "MPP Student Food Support Corner poster — take what you need, give if you can, listing bread, canned goods, dry food, biscuits, drinks and instant noodles",
          caption: "The MPP Student Food Support Corner — take what you need, give if you can."
        },
        {
          src: `${M}/student-life-3.png`,
          fit: "contain",
          alt: "Little Star Music and Movement Day poster — 24 July 2026 at the Library, UNITAR College Melaka, where little hearts move, music plays, and confidence shines",
          caption: "Little Star: Music and Movement Day, for the campus's youngest visitors."
        },
        {
          src: `${M}/student-life-4.png`,
          fit: "contain",
          alt: "Malam Gala Apresiasi & Majlis Anugerah Dekan 2026 poster — 12 February 2026 at Noble Resort Hotel Melaka, denim and pearls dress code",
          caption: "Malam Gala Apresiasi & Majlis Anugerah Dekan 2026."
        },
        {
          src: `${M}/student-life-5.png`,
          fit: "contain",
          alt: "Ramadan Mubarak poster for Program Pengurusan Jenazah 2026 — 12 March 2026 at the UNITAR College Melaka library",
          caption: "Program Pengurusan Jenazah 2026, held during Ramadan."
        },
        {
          src: `${M}/student-life-6.png`,
          fit: "contain",
          alt: "Uzhavar Thirunaal 2026 poster — 29 January 2026 at the UNITAR College Melaka library, traditional attire, with cooking, kolam making and traditional games",
          caption: "Uzhavar Thirunaal 2026 — cooking, kolam making, and traditional games."
        },
        {
          src: `${M}/student-life-7.png`,
          fit: "contain",
          alt: "Festival Sungai Melaka 2026 Tug of War poster — 18 July 2026 at Dataran Pengkalan Rama, with registration fees from RM100 to RM700",
          caption: "Tug of War at Festival Sungai Melaka 2026."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the SRC organisation chart and event posters to public/newsletter/melaka/."
      },
      caption: "A vibrant, connected campus community."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Prompt Support When You Need It",
      standfirst: "Enhanced One Stop Centre support, managed by IT personnel.",
      body: [
        "Enhanced One Stop Centre support is managed by IT personnel, for faster ICT assistance and solutions."
      ],
      notes: [
        { kind: "result", text: "Quicker responses and better support." }
      ],
      images: [
        {
          src: `${M}/osc.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/melaka/."
      },
      caption: "Faster ICT assistance, from dedicated IT personnel."
    },

    {
      id: "facilities",
      navLabel: "Facilities",
      kicker: "Campus facilities",
      heading: "Better Facilities, Greater Convenience, Improved Campus Experience",
      standfirst:
        "New furniture in classrooms, labs, the library and lounge — and upgraded Early Childhood Education facilities.",
      bullets: [
        "Refurbishment in classrooms, computer labs and library with new study tables and chairs and new computer tables.",
        "Enhancement of the student lounge and library with new furniture.",
        "**Upgrade facilities for the Diploma in Early Childhood Education lab**, to provide valuable experience in industry-relevant classroom settings."
      ],
      notes: [
        {
          kind: "result",
          text: "These enhancements reflect our ongoing commitment to creating a more connected, comfortable, and student-centric campus environment, ensuring a better experience for every student."
        }
      ],
      images: [
        {
          src: `${M}/facilities-1.jpg`,
          alt: "A refurbished classroom with new black study tables and chairs, facing a whiteboard and projector screen",
          caption: "Refurbished classrooms with new study tables and chairs."
        },
        {
          src: `${M}/facilities-2.jpg`,
          alt: "A second refurbished classroom, with new tables and chairs facing a whiteboard on a patterned wall",
          caption: "New furniture throughout the teaching spaces."
        },
        {
          src: `${M}/facilities-3.jpg`,
          alt: "A computer lab with rows of new desktop computers on wood-effect benches",
          caption: "New computer tables in the refurbished computer lab."
        },
        {
          src: `${M}/facilities-4.jpg`,
          alt: "A second computer lab, with new monitors and desktop towers along a bench beneath vertical window blinds",
          caption: "A second lab, refurbished with new computer tables."
        },
        {
          src: `${M}/facilities-5.jpg`,
          alt: "The library with new white tables and orange chairs, beside shelving and a display board",
          caption: "The library, enhanced with new furniture."
        },
        {
          src: `${M}/facilities-6.jpg`,
          alt: "The student lounge with an orange sofa and low tables against a mural wall reading 'Believe in yourself, play hard, never give up'",
          caption: "The refurbished student lounge, with new seating."
        },
        {
          src: `${M}/facilities-7.jpg`,
          alt: "The Diploma in Early Childhood Education lab, with a book display, a cot, toy storage, and an alphabet rug",
          caption:
            "Upgraded facilities for the Diploma in Early Childhood Education lab."
        },
        {
          src: `${M}/facilities-8.jpg`,
          alt: "A second view of the Early Childhood Education lab, with a cot, low tables and chairs, a whiteboard, and a play kitchen",
          caption: "Industry-relevant classroom settings, built for practical experience."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the refurbished classroom, lab, library, lounge and ECE facility photos to public/newsletter/melaka/."
      },
      caption: "A more connected, comfortable, student-centric campus."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
