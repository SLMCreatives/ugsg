import type { CampusNewsletter } from "../types";

/** Campus posters and photography, supplied by UCKB. */
const KB = "/newsletter/kb";

/**
 * UC Kota Bharu — UNITAR College Kota Bharu.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's UCKB draft. Note the connectivity figure:
 * UCKB upgraded to 1 Gbps, where UIU, UUCKL, Ipoh and Penang doubled 1 Gbps
 * to 2 Gbps. Do not carry the 2 Gbps wording across.
 *
 * Event posters render `contain` so their dates and details stay readable;
 * room photography crops to fill.
 */
export const ucKotaBharu: CampusNewsletter = {
  slug: "uc-kota-bharu",
  name: "UC Kota Bharu",
  fullName: "UNITAR College Kota Bharu",
  location: "Kota Bharu, Kelantan",

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
      "Inside this issue: a 1 Gbps internet upgrade, a newly elected SRC with a full events calendar, enhanced One-Stop Centre support, new hostel units, and new computers in the lab and library."
  },

  intro: [
    "Thanks to UNITARians' responses via the Student Satisfaction Survey (SSS) conducted in September 2025. Since then, we have been working on improvement measures, and for the first half of 2026 we have made significant progress in acting on your feedback.",
    "Here's everything we've fixed, upgraded, and launched, plus what's coming next."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "1 Gbps", label: "High-speed campus internet upgrade" },
    { value: "18", label: "New computers installed in the library" },
    { value: "2026/27", label: "Term of the newly elected SRC" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Stronger Wi-Fi, Better Connectivity on Campus",
      standfirst:
        "Seamless online learning and browsing, with upgraded high-speed internet across the campus.",
      body: [
        "Enhanced campus connectivity with a **1 Gbps high-speed internet upgrade**, supporting seamless learning and digital activities."
      ],
      notes: [
        {
          kind: "result",
          text: "Faster internet speed, more stable connectivity, and an improved online experience for students."
        }
      ],
      images: [
        {
          src: `${KB}/wifi.png`,
          fit: "contain",
          alt: "A 1Gbps campus network diagram showing the network room main hub and splitter feeding satellite hubs in the open office area, classroom, and study and collaboration area",
          caption:
            "How the 1Gbps upgrade reaches each area, from the network room out to the satellite hubs."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief: "Add the 1Gbps connectivity diagram to public/newsletter/kb/."
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
          src: `${KB}/student-life-1.jpg`,
          fit: "contain",
          alt: "Organisation chart of the Majlis Perwakilan Pelajar UCKB 2026/2027, showing the Majlis Tertinggi with the president and the Barisan Exco members",
          caption:
            "The Majlis Perwakilan Pelajar UCKB for 2026/2027 — the newly elected SRC."
        },
        {
          src: `${KB}/student-life-6.jpg`,
          fit: "contain",
          alt: "Senarai Aktiviti UNITAR Kota Bharu poster listing UNITAR Got Talents, the Table Tennis Tournament, the Thunder Rally Tournament, and the Hari Kebudayaan & Kemerdekaan programme",
          caption:
            "The activity calendar: Bangkit Bersama, Sukan Untuk Semua."
        },
        {
          src: `${KB}/student-life-2.jpg`,
          fit: "contain",
          alt: "Program Kebudayaan & Kemerdekaan 2026 poster — 3 August 2026 at Dewan Perniagaan Cina, with booths, a photobooth, cultural performances, and UNITAR Got Talent",
          caption:
            "Program Kebudayaan & Kemerdekaan 2026 — budaya, identiti, negara."
        },
        {
          src: `${KB}/student-life-3.jpg`,
          fit: "contain",
          alt: "Career Ready Workshop poster — 30 July 2026 at Dewan Mini, covering resume building, interview preparation, and the MYFutureJobs career platform, streamed live on TikTok",
          caption:
            "Career Ready Workshop: resume building, interviews, and MYFutureJobs."
        },
        {
          src: `${KB}/student-life-5.jpg`,
          fit: "contain",
          alt: "Business Day alumni sharing poster — 15 July 2026 at Dewan Mini Hall, with alumni Jiha and Ikmal and a full tentative programme",
          caption: "Business Day: Alumni Kita, Inspirasi Kita."
        },
        {
          src: `${KB}/student-life-4.jpg`,
          fit: "contain",
          alt: "Blood Donation poster — 1 July 2026 at the Mini Hall, UNITAR Kota Bharu, organised by BISEC Club with Hospital Tanah Merah",
          caption:
            "Blood Donation with Hospital Tanah Merah — be a hero, save a life."
        },
        {
          src: `${KB}/student-life-7.jpg`,
          fit: "contain",
          alt: "UCKB Got Talents poster — open to all semester 1 students, in categories for singing, instruments, stand-up comedy, and magic, closing 24 July 2026",
          caption:
            "UCKB Got Talents: meraikan warisan, menyatukan kita."
        },
        {
          src: `${KB}/student-life-8.jpg`,
          fit: "contain",
          alt: "UCKB Thunder Rally Tournament 2026 poster — badminton men's and women's doubles and men's futsal on 25 July 2026 at Massa Planet Enterprise",
          caption:
            "Thunder Rally Tournament: badminton doubles and futsal."
        },
        {
          src: `${KB}/student-life-9.jpg`,
          fit: "contain",
          alt: "Table Tennis Tournament poster — UNITAR Kota Bharu 2026, running 19 to 22 July 2026 in the Student Lounge Room",
          caption:
            "Table Tennis Tournament — one team, one spirit, one victory."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the SRC organisation chart and event posters to public/newsletter/kb/."
      },
      caption: "A vibrant, connected campus community."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Prompt Support When You Need It",
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
          src: `${KB}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/kb/."
      },
      caption: "Faster ICT assistance, from dedicated IT personnel."
    },

    {
      id: "hostel",
      navLabel: "Hostel",
      kicker: "Student residence",
      heading: "Better Facilities, Greater Convenience, Enhanced Hostel Living",
      standfirst:
        "New hostel units with modern amenities, high-speed Wi-Fi, CCTV, and access card entry.",
      body: [
        "To provide students with a more comfortable and secure living environment, new hostel units have been introduced with upgraded facilities designed to support student wellbeing and convenience.",
        "**Key improvements**"
      ],
      bullets: [
        "New hostel units equipped with modern amenities.",
        "High-speed Wi-Fi access in all hostels.",
        "CCTV surveillance for enhanced security.",
        "Access card entry system, to ensure controlled and secure access."
      ],
      notes: [
        {
          kind: "result",
          text: "Students can enjoy a safer, more comfortable, and well-connected living environment, leading to improved satisfaction, greater peace of mind, and an enhanced hostel experience."
        }
      ],
      images: [
        {
          src: `${KB}/facilities-1.jpg`,
          alt: "A hostel room with bunk beds, blue mattresses, bedside tables, and curtained windows",
          caption: "A new hostel unit, with modern amenities."
        },
        {
          src: `${KB}/facilities-2.jpg`,
          alt: "A larger hostel dormitory lined with bunk beds on new wood-effect flooring, with ceiling fans and air conditioning",
          caption: "New units introduced to support student wellbeing."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief: "Add the new hostel unit photos to public/newsletter/kb/."
      },
      caption: "A safer, more comfortable place to live."
    },

    {
      id: "facilities",
      navLabel: "Facilities",
      kicker: "Campus facilities",
      heading: "Improved Student Facilities",
      standfirst:
        "New computers in the lab and library, and small conveniences around campus.",
      bullets: [
        "**New computers at the Computer Lab.**",
        "**18 computers** were installed in the library.",
        "New mirrors have been installed in the washroom area.",
        "Complimentary slippers are now available at the student lounge washrooms, providing convenience for students."
      ],
      notes: [
        {
          kind: "result",
          text: "Better access to technology for study and coursework, and everyday conveniences that make the campus easier to live with."
        }
      ],
      images: [
        {
          src: `${KB}/facilities-3.jpg`,
          alt: "A computer lab with rows of new desktop computers on light wood benches, facing a ceiling-mounted projector",
          caption: "New computers at the Computer Lab."
        },
        {
          src: `${KB}/facilities-5.jpg`,
          alt: "The library with rows of desks carrying new computers, beside shelving and study seating",
          caption: "18 computers were installed in the library."
        },
        {
          src: `${KB}/facilities-4.jpg`,
          alt: "Individual study carrels in the library, with task chairs and shelving beyond",
          caption: "Study carrels alongside the new library workstations."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the computer lab and library photos to public/newsletter/kb/."
      },
      caption: "More computers, and more everyday convenience."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
