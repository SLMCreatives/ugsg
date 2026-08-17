import type { CampusNewsletter } from "../types";

/** Campus posters and photography, supplied by UC Penang. */
const P = "/newsletter/penang";

/**
 * UC Penang — UNITAR College Penang.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's "Student Feedback Action Update 2026" draft.
 * Nearly every visual is an event poster, so they render `contain` — cropping
 * one to fill the frame would cut off its dates and details.
 */
export const ucPenang: CampusNewsletter = {
  slug: "uc-penang",
  name: "UC Penang",
  fullName: "UNITAR College Penang",
  location: "Penang",

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
      "Inside this issue: the OSC Helpdesk live on one platform, Pause & Breathe student life, learning beyond the classroom, library updates, hostel news, faster Wi-Fi — and iBITA coming next."
  },

  intro: [
    "Thanks to UNITARians' responses via the Student Satisfaction Survey (SSS) conducted in September 2025. Based on this feedback, we have been working on improvement measures from January to June 2026.",
    "Here's what's new at UNITAR College Penang, and what's coming next."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2 Gbps", label: "Campus internet speed, doubled from 1 Gbps" },
    { value: "6 Jan", label: "OSC Helpdesk went live in 2026" },
    { value: "5", label: "Student life initiatives under Pause & Breathe" },
    { value: "Jan–Jun", label: "Improvement measures delivered in 2026" }
  ],

  sections: [
    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Enhanced One-Stop Centre (OSC) Support",
      standfirst: "One-Stop Centre Helpdesk goes live 2026.",
      body: [
        "The OSC Helpdesk is now live, giving you one platform for enquiries, feedback, and suggestions. It is reached through your Student Portal at **auth.unitar.my**, and went live on **6 January 2026**."
      ],
      bullets: [
        "One central platform for all enquiries, requests, feedback and suggestions.",
        "Faster response and issue resolution.",
        "Improved communication between users and college's management.",
        "Enhanced user experience through timely support.",
        "Continuous service improvement based on your feedback and suggestions."
      ],
      notes: [
        {
          kind: "result",
          text: "These enhancements reflect our ongoing commitment to creating a more connected, comfortable, and student-centric campus environment, ensuring a better experience for every student."
        }
      ],
      images: [
        {
          src: `${P}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk went live on 6 January 2026 — reach it from your Student Portal."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk — Go Live 6 January 2026' poster to public/newsletter/penang/."
      },
      caption: "One platform for enquiries, feedback, and suggestions."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student life & engagement",
      heading: "Pause & Breathe!",
      standfirst:
        "Five initiatives built to bring the campus community together.",
      body: ["We have organised a variety of initiatives for students:"],
      bullets: [
        "**Junior UNITAR Race Ventures** — inspiring student engagement through exciting team-based challenges and fun interactive games.",
        "**UNITARian Stall Day** — providing opportunities for students to connect, collaborate, showcase their creativity, and develop entrepreneurial skills beyond the classroom.",
        "**UNITAR Got Talent** — celebrating talent, diversity, and creativity while bringing the campus community together through memorable performances.",
        "**MLBB Mania (Mobile Legends Tournament)** — encouraging healthy competition, teamwork, strategic thinking, and camaraderie among students.",
        "**Run From Stress** — promoting mental wellbeing, healthy lifestyles, and stress management through fun wellness-focused activities."
      ],
      notes: [
        {
          kind: "result",
          text: "These initiatives foster a more vibrant and connected student community, strengthening teamwork, friendships, leadership skills, and a sense of belonging while creating meaningful and memorable campus experiences."
        }
      ],
      images: [
        {
          src: `${P}/up-penang-4.jpg`,
          fit: "contain",
          alt: "Junior UNITAR Race Ventures poster — One Race One Team One UNITAR, 4 August 2026, registration at the Student Lounge, with cash prizes for the top three groups",
          caption:
            "Junior UNITAR Race Ventures — one race, one team, with cash prizes for the top three groups."
        },
        {
          src: `${P}/up-penang-5.jpg`,
          fit: "contain",
          alt: "UNITARian Stall Day poster — Food, Fun and Taste, 30 July 2026, hallway at Level One, with 6% of profits donated to charity",
          caption:
            "UNITARian Stall Day, with 6% of profits going to charity."
        },
        {
          src: `${P}/up-penang-6.jpg`,
          fit: "contain",
          alt: "UNITAR Got Talent final poster — 30 July 2026 at Classroom One, organised by Diploma Tourism Management",
          caption: "The UNITAR Got Talent final: let's join, share your talent."
        },
        {
          src: `${P}/up-penang-7.jpg`,
          fit: "contain",
          alt: "MLBB Mania poster — a Mobile Legends Bang Bang tournament on 27 July 2026 at the Library, organised by the Student Representative Council",
          caption: "MLBB Mania — \"let's the battle begin\", run by the SRC."
        },
        {
          src: `${P}/up-penang-3.jpg`,
          fit: "contain",
          alt: "Run From Stress poster — managing stress through sports, 22 July 2026 at Classroom 1, with guest speaker Rais Fakhri bin Azha",
          caption:
            "Run From Stress: managing stress through sports, with guest speaker Rais Fakhri bin Azha."
        },
        {
          src: `${P}/up-penang-2.jpg`,
          fit: "contain",
          alt: "Batik Art Coloring workshop poster with Ekat Celop — 22 July 2026 at Classroom 1, Level 1",
          caption:
            "A Batik Art Coloring workshop with Ekat Celop — every pattern preserves a tradition."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the Pause & Breathe event posters to public/newsletter/penang/."
      },
      caption:
        "A more vibrant and connected student community, on campus and beyond."
    },

    {
      id: "learning",
      navLabel: "Learning",
      kicker: "Beyond the classroom",
      heading: "Learning Beyond the Classroom",
      standfirst:
        "Industry visits, community outreach, and a mentorship programme for certificate-level students.",
      bullets: [
        "**CSR Programme: Berinfaq Bersama Masjid Al Qahhar** — cultivating a spirit of compassion, social responsibility, and community service through meaningful outreach activities.",
        "**PEN Expedition: Tourism and Supply Chain Industry** — providing students with valuable exposure to the tourism and supply chain sectors through experiential learning and industry engagement.",
        "**Beyond the Shore: Marine Operations** — offering insights into marine operations and industry best practices, enabling students to gain a deeper understanding of the maritime sector.",
        "**Apa Itu Kurikulum Prasekolah 2026?** — equipping students with knowledge of the latest preschool curriculum developments to better prepare them for future educational and professional opportunities.",
        "**Brain Bridge Mentorship Programme** — supporting certificate-level students through mentoring, guidance, and academic development initiatives designed to enhance their learning journey."
      ],
      notes: [
        {
          kind: "result",
          text: "Students gain valuable real-world exposure, strengthen their leadership and interpersonal skills, expand their professional knowledge, and develop a greater sense of social responsibility, preparing them for future academic and career success."
        }
      ],
      images: [
        {
          src: `${P}/up-penang-8.jpg`,
          fit: "contain",
          alt: "Berinfaq Bersama Masjid Al Qahhar poster — a dry goods and cash donation drive run by Diploma e-Perniagaan students, collection 21 to 31 July 2026, handover 1 August 2026",
          caption:
            "Berinfaq Bersama Masjid Al Qahhar, run by Diploma e-Perniagaan students."
        },
        {
          src: `${P}/up-penang-9.jpg`,
          fit: "contain",
          alt: "Beyond the Shore education visit poster — 28 July 2026 with the Marine Police, Penang, covering a workshop visit, submarine viewing, and knowledge sharing",
          caption:
            "Beyond the Shore: a Marine Police visit with submarine viewing and knowledge sharing."
        },
        {
          src: `${P}/up-penang-10.jpg`,
          fit: "contain",
          alt: "Apa Itu Kurikulum Prasekolah 2026 poster — a talk by Puan Nursuriatul Azwa binti Mohd Saman on 31 July 2026 at Classroom 1, organised by Diploma in Early Childhood Education",
          caption:
            "Apa Itu Kurikulum Prasekolah 2026, for Early Childhood Education students."
        },
        {
          src: `${P}/up-penang-12.jpg`,
          fit: "contain",
          alt: "Brain Bridge Mentorship poster — 5 June 2026 for all Certificate of Business Management students, led by lecturers Nurul A'Aisyah Saffie and Muhammad Asyraf Nazman",
          caption:
            "Brain Bridge Mentorship, pairing certificate students with business lecturers."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the programme posters to public/newsletter/penang/. Still missing: the PEN Expedition (Tourism and Supply Chain Industry) poster."
      },
      caption: "Real-world exposure, industry engagement, and mentorship."
    },

    {
      id: "library",
      navLabel: "Library",
      kicker: "Learning resources",
      heading: "Library Updates 2026",
      standfirst:
        "No book? Not a problem — borrow beyond your campus library.",
      body: [
        "Need a reference that's not available in your campus library? Two routes now cover the gap:"
      ],
      bullets: [
        "**Interlibrary Loan (ILL)** — borrow books from other UNITAR libraries.",
        "**E-Books** — access thousands of digital books anytime, anywhere."
      ],
      notes: [
        {
          kind: "result",
          text: "Access to learning resources anytime, anywhere."
        }
      ],
      images: [
        {
          src: `${P}/penang-linrary-1.png`,
          fit: "contain",
          alt: "Interlibrary Loan poster — place a request to borrow items from other UNITAR libraries when they are not available at the UC Penang library, with the Learning Resource Centre portal at lrc.unitar.my",
          caption:
            "Interlibrary Loan: borrow beyond your campus library — the librarian will assist."
        },
        {
          src: `${P}/penang-library-2.png`,
          fit: "contain",
          alt: "E-Book poster — access thousands of digital books anytime, anywhere, available 24/7 on laptop, tablet, or smartphone with your student login",
          caption:
            "E-Books: thousands of academic titles, on or off campus, 24/7."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the 'Interlibrary Loan' and 'E-Book' library update posters to public/newsletter/penang/."
      },
      caption: "Learning resources, anytime and anywhere."
    },

    {
      id: "hostel",
      navLabel: "Hostel",
      kicker: "Hostel life",
      heading: "Hostel News & Updates",
      standfirst:
        "New furniture, a PDRM safety talk, and check-in/check-out now monitored digitally.",
      bullets: [
        "**Furniture Replacement and Upgrades** — refurbishment and replacement of hostel furniture to provide greater comfort, functionality, and an improved living experience for students.",
        "**Hostel Safety and Crime Prevention Talk by Polis Diraja Malaysia (PDRM)** — conducted to raise awareness of personal safety, crime prevention measures, and responsible living within the hostel community.",
        "**CICO System Implementation** — check-in and check-out monitoring for enhanced safety control."
      ],
      notes: [
        { kind: "result", text: "Strengthened hostel management." }
      ],
      images: [
        {
          src: `${P}/penang-hostel-1.jpg`,
          alt: "A hostel room with new blue-mattressed bunk beds, a ceiling fan, and a balcony looking out over greenery",
          caption: "Replacement bunks and furniture in the refurbished rooms."
        },
        {
          src: `${P}/penang-hostel-2.jpg`,
          fit: "contain",
          alt: "Hostel Safety and Crime Prevention poster — an awareness talk by Polis Diraja Malaysia on 5 August at Classroom One, covering personal safety, crime prevention tips, and cyber and scam awareness",
          caption:
            "The PDRM awareness talk: personal safety, crime prevention, and scam awareness."
        },
        {
          src: `${P}/penang-hostel-3.jpg`,
          fit: "contain",
          alt: "Hostel Check-In and Check-Out poster with separate QR codes to scan before leaving and on returning to the hostel",
          caption:
            "CICO: scan out before you leave, scan in as soon as you're back."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the hostel room photo and the PDRM and CICO posters to public/newsletter/penang/."
      },
      caption: "A safer, more comfortable place to live and study."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Faster, Stronger Wi-Fi Connectivity",
      standfirst:
        "Campus internet speed doubled in February 2026, with wider coverage to follow.",
      body: [
        "Enhanced campus connectivity with a **100% increase in bandwidth**, doubling internet speed from **1 Gbps to 2 Gbps** (February 2026)."
      ],
      notes: [
        {
          kind: "next",
          text: "A cloud-managed Wi-Fi controller and additional access points, for wider coverage across campus."
        },
        { kind: "target", text: "Q2 2027." },
        {
          kind: "result",
          text: "Faster, more stable Wi-Fi wherever you study."
        }
      ],
      images: [
        {
          src: `${P}/penang-wifi-1.jpg`,
          fit: "contain",
          alt: "Speed Up Your Learning poster — a +2 GB extra data boost, effective now, covering all UNITAR campus Wi-Fi hotspots",
          caption:
            "More campus internet allocation, across all UNITAR Wi-Fi hotspots."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'Speed Up Your Learning — +2 GB Extra Data Boost' Wi-Fi poster to public/newsletter/penang/."
      },
      caption: "Double the bandwidth, across campus Wi-Fi hotspots."
    },

    {
      id: "ibita",
      navLabel: "iBITA",
      kicker: "Coming soon",
      heading: "iBITA: news for UNITAR Penang students",
      standfirst:
        "One-off financial assistance for eligible Penang students.",
      variant: "coming-soon",
      body: [
        "UNITAR will be joining **iBITA** (Sistem Bantuan Pendaftaran Pelajar ke Institut Pengajian Tinggi Negeri Pulau Pinang)."
      ],
      bullets: [
        "Eligible Penang students enrolled full-time in a Diploma or Bachelor's Degree can receive one-off financial assistance."
      ],
      notes: [
        {
          kind: "result",
          text: "Reduced financial obligations for students."
        }
      ],
      images: [
        {
          src: `${P}/penang-coming-soon.jpg`,
          fit: "contain",
          alt: "iBita Pulau Pinang 2026 poster — Bantuan Pendaftaran Pelajar ke IPT, listing RM1,200 for universities in Sabah and Sarawak, RM1,000 for peninsular universities, and RM300 for Politeknik Malaysia, with applications open 1 July to 30 September 2026",
          caption:
            "iBita Pulau Pinang 2026 — applications run 1 July to 30 September 2026."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'iBita Pulau Pinang 2026' poster to public/newsletter/penang/."
      },
      caption: "Support with the cost of starting your studies."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
