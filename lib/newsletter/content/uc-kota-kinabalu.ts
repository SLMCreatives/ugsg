import type { CampusNewsletter } from "../types";

/** Campus photography, supplied by UCKK. */
const KK = "/newsletter/kk";

/**
 * UC Kota Kinabalu — UNITAR College Kota Kinabalu.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the "UCKK Newsletter_Aug2026" draft. Only four of the
 * source's six photo slots were supplied. Two of the missing ones reuse
 * assets already used elsewhere in the project — the shared OSC Helpdesk
 * poster, and UIU's generic Wi-Fi illustration (the connectivity copy here
 * is close to a direct copy of UIU's own, including its "for UIU" line,
 * which is written below as "across campus" instead). The third — water
 * dispensers — has no existing equivalent, so a new illustration was made:
 * public/newsletter/kk/water-dispensers.svg.
 */
export const ucKotaKinabalu: CampusNewsletter = {
  slug: "uc-kota-kinabalu",
  name: "UC Kota Kinabalu",
  fullName: "UNITAR College Kota Kinabalu",
  location: "Kota Kinabalu, Sabah",

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
      "Inside this issue: a new student café, an instant WhatsApp feedback channel, Wi-Fi doubled to 2Gbps, water dispensers at every wing, a library open through exams, and a fuller calendar of student life."
  },

  intro: [
    "Following the responses from the Student Satisfaction Survey (SSS) from students conducted in September 2025, and based on your feedback, we have made some improvements.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2 Gbps", label: "Campus internet speed, doubled from 1 Gbps" },
    { value: "9–5", label: "The Bakery Café, open Mondays to Fridays" },
    { value: "Every wing", label: "Water dispensers now available" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "dining",
      navLabel: "Dining",
      kicker: "Campus dining",
      heading: "Variety of Dining Options on Campus",
      standfirst:
        "The new \"Bean There, Done That\" bakery and café — run by students, for students.",
      body: [
        "A new **\"Bean There, Done That\"** bakery and café opens Mondays to Fridays, 9am to 5pm. Coffee served is brewed with high-grade Bon Café coffee beans. Interestingly, the café is also run by our students, and catered to our students."
      ],
      notes: [
        {
          kind: "next",
          text: "Additional hot food selection and outlets, with an outdoor dining area."
        },
        {
          kind: "result",
          text: "More food and beverage variety, and a safe space to unwind and enjoy a cuppa within campus."
        }
      ],
      images: [
        {
          src: `${KK}/food.png`,
          alt: "Students in chef whites serving customers at The Bakery Café counter, with a customer seated at a checkered-cloth table",
          caption:
            "The Bakery Café — run by students, brewing Bon Café coffee, open weekdays 9am to 5pm."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief: "Add a café or dining area photo to public/newsletter/kk/."
      },
      caption: "More food and beverage variety, right on campus."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Prompt Support When You Need It",
      standfirst:
        "An upgraded ticketing platform, and a new instant WhatsApp channel.",
      bullets: [
        "One Stop Centre ticketing platform upgraded.",
        "Instant WhatsApp feedback service, which enhances quality monitoring."
      ],
      notes: [
        {
          kind: "result",
          text: "Prompt response and consistent support."
        }
      ],
      images: [
        {
          src: `${KK}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add a One Stop Centre or OSC Helpdesk photo to public/newsletter/kk/."
      },
      caption: "Prompt response, and more consistent support."
    },

    {
      id: "water",
      navLabel: "Water",
      kicker: "Campus amenities",
      heading: "Water Dispensers at Every Wing",
      standfirst: "Clean drinking water, now within reach wherever you are on campus.",
      bullets: [
        "Water dispensers are made available at every wing, for students' convenience."
      ],
      images: [
        {
          src: `${KK}/water-dispensers.svg`,
          fit: "contain",
          alt: "Illustration of a water dispenser, with the same convenience now available at every wing of the building",
          caption: "Water dispensers, now available at every wing."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief: "Add a water dispenser photo to public/newsletter/kk/."
      },
      caption: "Clean drinking water, wherever you are on campus."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Better Connectivity on Campus with Stronger Wi-Fi",
      standfirst:
        "Bandwidth doubled in February. Wider coverage is the next job.",
      body: [
        "Enhanced campus connectivity with a **100% increase in bandwidth**, doubling internet speed from **1Gbps to 2Gbps** (February 2026)."
      ],
      notes: [
        {
          kind: "next",
          text: "A cloud-managed Wi-Fi controller and more access points, for wider coverage across campus."
        },
        { kind: "target", text: "Q2 2027." }
      ],
      images: [
        {
          src: `${KK}/wifi-coverage.svg`,
          alt: "Illustration of a Wi-Fi access point sending signal across three floors of a building, with laptops and phones connected at the far ends",
          caption:
            "Illustration: capacity has doubled — the next phase extends coverage to the far end of each floor."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add a campus connectivity or student Wi-Fi photo to public/newsletter/kk/."
      },
      caption: "Stronger connectivity for studying, collaborating, and accessing resources."
    },

    {
      id: "library",
      navLabel: "Library",
      kicker: "Learning support",
      heading: "Library Open Consistently Throughout Examination Period",
      standfirst: "No more racing the clock before a closing time during exam week.",
      body: [
        "The library now stays open consistently throughout the examination period, giving students a reliable place to study right up to their exams."
      ],
      images: [
        {
          src: `${KK}/library.jpg`,
          alt: "The campus library, with tall bookshelves fully stocked and rows of white study tables and chairs",
          caption: "The library — open consistently right through exam period."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief: "Add a library or exam-period study photo to public/newsletter/kk/."
      },
      caption: "A reliable place to study, right through exam season."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Student Life and Engagement",
      standfirst:
        "A reimagined Clubs & Societies Open Day, and a fuller calendar of activities.",
      bullets: [
        "Reimagined Clubs & Societies Open Day.",
        "More diverse and engaging activities and events that support students' holistic development and character building.",
        "Opportunities for students to gain new experiences, skills, and connections."
      ],
      notes: [
        {
          kind: "result",
          text: "A more engaged campus life for conventional and online students."
        }
      ],
      images: [
        {
          src: `${KK}/student-1.png`,
          alt: "A student band posing on stage with a trophy and prize cheque at the Battle of the Bands Kelanggunaan event",
          caption: "Battle of the Bands — student musicians taking the stage."
        },
        {
          src: `${KK}/student-2.jpg`,
          alt: "Students in traditional Sabahan dress performing a cultural dance outdoors, in front of a balloon arch reading Majlis Anugerah Dekan",
          caption: "A traditional dance performance at the Majlis Anugerah Dekan."
        },
        {
          src: `${KK}/student-3.jpg`,
          alt: "A large group of students and staff posing together in the Jabatan Ketua Menteri meeting hall",
          caption: "Students and staff at the Jabatan Ketua Menteri — new connections beyond campus."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief: "Add student life and event photos to public/newsletter/kk/."
      },
      caption: "A more engaged campus life, for every student."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us cater to our student community.",
    body: "We thank you for your support! In turn, each response that we receive from the upcoming survey guides us to make further improvements. Thank you once again for your participation, UNITARians!",
    signature: "Student Experience Department"
  }
};
