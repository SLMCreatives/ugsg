import type { CampusNewsletter } from "../types";

/** Campus posters, supplied by UCSP. */
const SP = "/newsletter/sp";

/**
 * UC Sungai Petani — UNITAR College Sungai Petani.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's "Student Feedback Action Update 2026" draft.
 * Note the connectivity figure: UCSP upgraded to 1 Gbps, where other campuses
 * doubled 1 Gbps to 2 Gbps. Do not carry the 2 Gbps wording across.
 *
 * Every visual is an event poster, so they render `contain` — cropping one to
 * fill the frame would cut off its detail panels.
 */
export const ucSungaiPetani: CampusNewsletter = {
  slug: "uc-sungai-petani",
  name: "UC Sungai Petani",
  fullName: "UNITAR College Sungai Petani",
  location: "Sungai Petani, Kedah",

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
      "Inside this issue: a 1 Gbps high-speed internet upgrade, professional cleaning services across campus, stronger IT support, and a new campus building launched in March."
  },

  intro: [
    "Thanks to UNITARians' responses via the Student Satisfaction Survey (SSS) conducted in September 2025. Since then, we've been working on improvement measures, and for the first half of 2026 we've made significant progress in acting on your feedback.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "1 Gbps", label: "High-speed campus internet upgrade" },
    { value: "March", label: "New campus building launched" },
    { value: "Instant", label: "WhatsApp feedback at the One Stop Centre" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Stronger Wi-Fi, Better Connectivity on Campus",
      standfirst:
        "A 1 Gbps high-speed internet upgrade, supporting seamless learning and digital activities.",
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
          src: `${SP}/wifi.png`,
          fit: "contain",
          alt: "Stronger Wi-Fi, Better Connectivity poster for UNITAR College Sungai Petani, marked 1GB connectivity, over a photo of a full lecture hall",
          caption:
            "Stronger connection, better learning experience — now on 1GB connectivity."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'Stronger Wi-Fi, Better Connectivity' poster to public/newsletter/sp/."
      },
      caption: "Faster, more stable connectivity across campus."
    },

    {
      id: "cleanliness",
      navLabel: "Cleanliness",
      kicker: "Campus environment",
      heading: "Improved Campus Cleanliness",
      standfirst:
        "Professional cleaning services, for a cleaner and more welcoming campus.",
      body: [
        "UNITAR College Sungai Petani is committed to enhancing campus cleanliness through the appointment of **professional cleaning services**, creating a cleaner, healthier and more welcoming environment for all students."
      ],
      bullets: [
        "A cleaner and conducive learning environment.",
        "Consistent cleanliness across campus facilities.",
        "Professional cleaning standards.",
        "A more comfortable environment for students."
      ],
      notes: [
        {
          kind: "result",
          text: "A cleaner, healthier, and more welcoming campus for every student."
        }
      ],
      images: [
        {
          src: `${SP}/cleanliness.png`,
          fit: "contain",
          alt: "Improving Campus Cleanliness poster — professional cleaning services, showing a cleaner mopping a corridor beside a caution wet floor sign, with the line 'A Cleaner Campus. A Better Experience.'",
          caption: "A cleaner campus, a better experience."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'Improving Campus Cleanliness' poster to public/newsletter/sp/."
      },
      caption: "Consistent, professional cleaning standards across campus."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Prompt Support When You Need It",
      standfirst:
        "An upgraded ticketing platform, and instant WhatsApp feedback.",
      body: [
        "UNITAR College Sungai Petani is committed to strengthening IT support services, to ensure students and staff have a smooth, reliable and efficient digital experience across campus."
      ],
      bullets: [
        "One Stop Centre ticketing platform upgraded.",
        "One Stop Centre offering the instant WhatsApp feedback service, which enhances quality monitoring."
      ],
      notes: [
        {
          kind: "result",
          text: "Students and staff benefit from more reliable technology services, reduced downtime, and a smoother learning and teaching experience, enabling them to stay connected, productive, and focused on their academic goals."
        }
      ],
      images: [
        {
          src: `${SP}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/sp/."
      },
      caption: "A smoother, more reliable digital experience."
    },

    {
      id: "infrastructure",
      navLabel: "Campus",
      kicker: "Campus facilities",
      heading: "Better Infrastructure, Safety and Accessibility",
      standfirst:
        "A new campus building, launched in March, with complete educational facilities.",
      body: [
        "UNITAR College Sungai Petani (UCSP) is proud to provide students with a modern learning environment through its **new campus building** and complete educational facilities.",
        "Designed to support academic excellence, the campus features well-equipped classrooms, computer laboratories, student learning spaces, accessible facilities, and enhanced safety measures, to ensure a secure and comfortable learning experience."
      ],
      notes: [
        {
          kind: "result",
          text: "The new campus, launched in March, has comprehensive facilities to provide students with a safer, more accessible, and conducive learning environment, enhancing both the overall student experience and academic excellence."
        }
      ],
      images: [
        {
          src: `${SP}/safety.png`,
          fit: "contain",
          alt: "Better Infrastructure, Safety and Accessibility poster showing the new UNITAR College Sungai Petani building, with panels for enhanced safety, modern facilities, better accessibility, and a conducive environment",
          caption:
            "Modern campus, complete facilities, safe learning environment."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'Better Infrastructure, Safety & Accessibility' poster to public/newsletter/sp/."
      },
      caption: "A safer, more accessible campus, opened in March."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses helped us to serve you better.",
    body: "Every survey response shapes what happens next on campus and in the online space. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
