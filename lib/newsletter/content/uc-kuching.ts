import type { CampusNewsletter } from "../types";

/** Campus photography, supplied by UC Kuching. */
const KC = "/newsletter/kuching";

/**
 * UC Kuching — UNITAR College Kuching.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's "UC KUCHING" draft — the only campus draft
 * headlined "Here's what has CHANGED!" rather than "...has improved!", kept
 * as written. Unlike most other campuses, the Wi-Fi item here states no
 * bandwidth figure — only that speed and coverage were upgraded in November
 * 2025 — so no Gbps figure should be added to this section.
 *
 * "Understanding items in Student Statements (SOA)" was in the source draft
 * as "Photo 4", but no corresponding image was supplied — that section keeps
 * its placeholder until one arrives.
 */
export const ucKuching: CampusNewsletter = {
  slug: "uc-kuching",
  name: "UC Kuching",
  fullName: "UNITAR College Kuching",
  location: "Kuching, Sarawak",

  issue: {
    label: "Issue 01",
    date: "August 2026"
  },

  hero: {
    eyebrow: "Student Feedback Action Update 2026",
    headline: "You spoke.",
    headlineAccent: "We acted.",
    headlineTail: "Here's what has changed!",
    subtitle:
      "Inside this issue: faster campus Wi-Fi, strong SRC engagement, a faster One Stop Centre, clearer student statements, transport for hostel students, and safer, better-equipped campus spaces."
  },

  intro: [
    "Following the responses from the Student Satisfaction Survey (SSS) from students conducted in September 2025, and based on your feedback, we have made some improvements.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "Nov 2025", label: "Campus Wi-Fi speed and coverage upgraded" },
    { value: "Mar 2026", label: "Hostel transport service introduced" },
    { value: "New", label: "SRC to be elected soon" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Faster and More Efficient Internet, Wi-Fi on Campus",
      standfirst:
        "Wi-Fi speed and coverage upgraded across campus in November 2025.",
      body: [
        "UNITAR has upgraded Wi-Fi speed and coverage at the campus in **November 2025**. These initiatives have provided a faster, more reliable, and seamless internet experience for all students."
      ],
      images: [
        {
          src: `${KC}/photo-1.jpeg`,
          alt: "Students working on laptops and tablets in a classroom, connected to campus Wi-Fi",
          caption: "Students online in class — faster, more reliable Wi-Fi campus-wide."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add a campus Wi-Fi or connected study space photo to public/newsletter/kuching/."
      },
      caption: "A faster, more reliable, and seamless internet experience."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Excellent SRC Engagement in Students' Activities",
      standfirst:
        "The Student Representative Council keeps growing clubs and societies membership.",
      body: [
        "The Student Representative Council (SRC) effectively represents the voice of students. In addition to a growing number of clubs and societies, we aim to attract strong participants and promote membership, so it can give students opportunities for leadership, personal development, and campus engagement.",
        "This initiative promotes active student participation in clubs and societies, and ensures that students' views and concerns are effectively represented in decision-making processes."
      ],
      notes: [
        {
          kind: "next",
          text: "The new SRC will be elected soon, with more exciting plans for students."
        }
      ],
      images: [
        {
          src: `${KC}/photo-2-1.jpeg`,
          alt: "Students signing up at registration tables during a campus event",
          caption: "Students signing up — growing membership across clubs and societies."
        },
        {
          src: `${KC}/photo-2-2.jpeg`,
          alt: "Staff and students high-fiving in a line at a campus event",
          caption: "Campus engagement in action, at one of the year's student events."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add SRC and clubs & societies event photos to public/newsletter/kuching/."
      },
      caption: "Students' voices, represented and engaged."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Enhanced One-Stop Centre (OSC) Support",
      standfirst:
        "An upgraded ticketing system, backed by dedicated IT support.",
      body: [
        "Our upgraded OSC ticketing system, backed by dedicated IT support, ensures faster response times, efficient issue resolution, and an improved student service experience."
      ],
      images: [
        {
          src: `${KC}/photo-3.jpeg`,
          alt: "A student photographing the One Stop Centre Helpdesk poster pinned to a campus noticeboard",
          caption: "The OSC Helpdesk poster, pinned up around campus."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add a One Stop Centre or OSC Helpdesk photo to public/newsletter/kuching/."
      },
      caption: "Faster responses, and a more consistent service experience."
    },

    {
      id: "soa",
      navLabel: "Statements",
      kicker: "Financial transparency",
      heading: "Understanding Items in Student Statements (SOA)",
      standfirst:
        "The HOD walks new students through their Statement of Account at onboarding.",
      body: [
        "The HOD explains the items in the SOA during the onboarding briefing, and welcomes students by providing guidance and clarification whenever it is required. Students are encouraged to seek assistance at any time, so they fully understand the fees and charges outlined in the statement.",
        "This initiative promotes transparency, improves students' understanding of financial matters, and ensures that any questions or concerns regarding the SOA are addressed promptly and effectively."
      ],
      notes: [
        {
          kind: "next",
          text: "Students are also encouraged to channel their questions to the One Stop Centre (OSC) by raising a ticket at any time."
        }
      ],
      images: [
        {
          src: `${KC}/soa-explainer.svg`,
          fit: "contain",
          alt: "Illustration of a sample Statement of Account, with callouts explaining the tuition and other fees, payments received, and balance due lines",
          caption:
            "A sample statement, walking through tuition fees, payments received, and the balance due."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add an onboarding briefing or SOA walkthrough photo to public/newsletter/kuching/."
      },
      caption: "Clearer fees, and support whenever it's needed."
    },

    {
      id: "transport",
      navLabel: "Transport",
      kicker: "Student residence",
      heading: "Transport for Hostel's Students",
      standfirst: "A shuttle service for hostel students, running since March 2026.",
      body: [
        "UNITAR has provided transport to hostel students since **March 2026**. This initiative enhances their overall student experience, and supports their academic and extracurricular activities."
      ],
      notes: [
        {
          kind: "next",
          text: "There are plans in place to provide buses that can accommodate more students."
        }
      ],
      images: [
        {
          src: `${KC}/photo-5-1.jpeg`,
          alt: "Students boarding the UNITAR shuttle van, marked #AccelerateYourFuture",
          caption: "Boarding the hostel shuttle, running since March 2026."
        },
        {
          src: `${KC}/photo-5-2.jpeg`,
          alt: "The UNITAR shuttle van parked on a street, branded with the UNITAR logo and the tagline Dengan Pendidikan, Anda Mampu Melangkah Jauh",
          caption: "The UNITAR shuttle, connecting the hostel to campus."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add hostel shuttle service photos to public/newsletter/kuching/."
      },
      caption: "Supporting academic and extracurricular life beyond campus."
    },

    {
      id: "infrastructure",
      navLabel: "Infrastructure",
      kicker: "Campus safety",
      heading: "Infrastructure, Safety & Accessibility",
      standfirst:
        "Refurbished classrooms, better computer facilities, and CCTV surveillance.",
      body: [
        "The college has improved its infrastructure, safety, and accessibility by refurbishing classrooms with new furniture, enhancing computer facilities, and installing **CCTV surveillance systems**. These improvements provide a safer, more conducive, and technology-enabled learning environment for students."
      ],
      images: [
        {
          src: `${KC}/photo-6.jpeg`,
          alt: "A security monitor displaying a grid of Hikvision CCTV camera feeds covering corridors, stairwells, and the road outside campus",
          caption: "The new CCTV surveillance system, monitoring campus around the clock."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add refurbished classroom or computer facility photos to public/newsletter/kuching/."
      },
      caption: "A safer, more conducive, technology-enabled campus."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
