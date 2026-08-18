import type { CampusNewsletter } from "../types";

/** Campus posters and photography, supplied by UCKT. */
const KT = "/newsletter/kt";

/**
 * UC Kuala Terengganu — UNITAR College Kuala Terengganu.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's UCKT draft. Connectivity here is the 1 Gbps
 * to 2 Gbps doubling (as at UIU, UUCKL, Ipoh and Penang) — not the single
 * 1 Gbps upgrade reported by Kota Bharu and Sungai Petani.
 *
 * Event posters render `contain` so their dates and details stay readable;
 * photography crops to fill.
 */
export const ucKualaTerengganu: CampusNewsletter = {
  slug: "uc-kuala-terengganu",
  name: "UC Kuala Terengganu",
  fullName: "UNITAR College Kuala Terengganu",
  location: "Kuala Terengganu, Terengganu",

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
      "Inside this issue: self-service food at Level 3, a faster One Stop Centre, refurbished computer labs and student lounge, double the Wi-Fi speed, a full calendar of student development — and a new payment gateway coming soon."
  },

  intro: [
    "Following the responses from the Student Satisfaction Survey (SSS) from students conducted in September 2025, and based on your feedback, we have made some improvements.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2 Gbps", label: "Campus internet speed, doubled from 1 Gbps" },
    { value: "Level 3", label: "Self-service food options on campus" },
    { value: "Q2 2027", label: "Target for wider Wi-Fi coverage" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "food",
      navLabel: "Food & Drink",
      kicker: "Campus amenities",
      heading: "Food and Beverage Options on Campus",
      standfirst:
        "Affordable self-service food at Level 3, and clean drinking water on tap.",
      bullets: [
        "Offering a wide range of food options with affordable prices, available at **Level 3** on a self-service basis.",
        "Installation of a **Coway water purification system**, providing access to clean drinking water anytime."
      ],
      notes: [
        {
          kind: "next",
          text: "Vending machines within campus offering snacks, basic medication, and personal care items."
        },
        {
          kind: "result",
          text: "More food variety and access to daily essentials."
        }
      ],
      images: [
        {
          src: `${KT}/fnb-1.jpg`,
          alt: "A long self-service food counter at Level 3, lined with covered trays and containers of prepared food",
          caption:
            "The Level 3 self-service counter — a wider range of food at affordable prices."
        },
        {
          src: `${KT}/fnb-2.jpg`,
          alt: "A student using an Atlas Oasis vending machine stocked with bottled drinks and canned beverages",
          caption: "Cold drinks on campus, alongside the new water system."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the Level 3 food counter and Coway water system photos to public/newsletter/kt/."
      },
      caption: "More variety, and daily essentials within reach."
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
        "New instantaneous WhatsApp feedback channel for prompt service."
      ],
      notes: [
        { kind: "result", text: "Prompt response and consistent support." }
      ],
      images: [
        {
          src: `${KT}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/kt/."
      },
      caption: "A faster, more consistent route to an answer."
    },

    {
      id: "labs",
      navLabel: "Labs & Lounge",
      kicker: "Learning spaces",
      heading: "Refurbished Computer Labs and Student Lounge",
      standfirst:
        "New computers and furniture in the labs, and a lounge rebuilt around how students actually use it.",
      bullets: [
        "Computer labs refurbished with new computers and furniture.",
        "Refurbished student lounge with new sofa and discussion table."
      ],
      notes: [
        {
          kind: "result",
          text: "Conducive spaces to enhance the student experience."
        }
      ],
      images: [
        {
          src: `${KT}/computer-lab.jpg`,
          alt: "Students working at rows of new desktop computers in a refurbished computer lab",
          caption: "New computers and furniture in the refurbished labs."
        },
        {
          src: `${KT}/computer-lab-2.jpg`,
          alt: "A second computer lab in use, with a wall mural and a projector screen at the front",
          caption: "A second lab, in use for class."
        },
        {
          src: `${KT}/student-lounge.jpg`,
          alt: "Students relaxing on orange sofas and at round tables in the refurbished student lounge, on a striped carpet",
          caption:
            "The refurbished student lounge, with new sofas and a discussion table."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the refurbished computer lab and student lounge photos to public/newsletter/kt/."
      },
      caption: "Spaces built for studying together."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Better Connectivity on Campus with Stronger Wi-Fi",
      standfirst:
        "Internet speed doubled in February 2026, with wider coverage to follow.",
      body: [
        "Enhanced campus connectivity with a **100% increase in bandwidth**, doubling internet speed from **1 Gbps to 2 Gbps** (February 2026)."
      ],
      notes: [
        {
          kind: "next",
          text: "A cloud-managed Wi-Fi controller and more access points, for wider coverage."
        },
        { kind: "target", text: "Q2 2027." },
        {
          kind: "result",
          text: "Faster, more stable Wi-Fi connection throughout campus."
        }
      ],
      images: [
        {
          src: `${KT}/wifi-1.png`,
          fit: "contain",
          alt: "Campus network diagram showing the network room main hub and splitter feeding satellite hubs in the open office area, classroom, and study and collaboration area",
          caption:
            "How the network reaches each area, from the network room out to the satellite hubs."
        },
        {
          src: `${KT}/wifi-2.jpg`,
          alt: "A desktop monitor and keyboard on campus, with a web page loaded in the browser",
          caption: "Faster, more stable browsing across campus."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief: "Add the campus connectivity artwork to public/newsletter/kt/."
      },
      caption: "Double the bandwidth, throughout campus."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Student Development, Leadership & Campus Engagement",
      standfirst:
        "Sports, drama, youth leadership, and career readiness — a campus experience that extends beyond the classroom.",
      body: [
        "We are committed to creating a vibrant campus experience that extends beyond the classroom, providing students with opportunities to develop leadership skills, nurture talents, and build meaningful connections. Our key initiatives are as follows:"
      ],
      bullets: [
        "**Sports Tournament 2026**, an internal Sports Week, including both physical and online gaming competitions.",
        "**Takraw Varsity League (VSL)** participation, representing UNITAR in the inter-varsity tournament at the east coast zone.",
        "**English Drama Competition**, showcasing student creativity and talent at an inter-varsity competition in Terengganu.",
        "**Establishment of the Rakan Muda Secretariat** in collaboration with the Ministry of Youth and Sports (KBS), promoting youth development and community engagement.",
        "**Career Readiness Workshop**, designed to equip students with essential employability skills and industry insights."
      ],
      notes: [
        {
          kind: "result",
          text: "Students gain greater opportunities to participate, lead, compete, and grow beyond academics, fostering a more engaged campus community while enhancing their personal, professional, and leadership development — a more engaged campus life for conventional and online students alike."
        }
      ],
      images: [
        {
          src: `${KT}/student-activity-7.jpg`,
          fit: "contain",
          alt: "UNITAR KT Premier Sports 2026 poster listing bola tampar, aerodance, bola jaring, futsal and badminton across dates from 24 July to 1 August 2026",
          caption:
            "UNITAR KT Premier Sports 2026 — Bangkit Bersama, Sukan Untuk Semua."
        },
        {
          src: `${KT}/student-activity-1.jpg`,
          alt: "A badminton match under way on an indoor court during the sports tournament",
          caption: "Badminton in the internal Sports Week."
        },
        {
          src: `${KT}/student-activity-2.jpg`,
          alt: "Players warming up on a badminton court in a hall with a brightly patterned mural wall",
          caption: "Warming up ahead of a match."
        },
        {
          src: `${KT}/student-activity-3.jpg`,
          alt: "Students playing netball on an outdoor court, wearing team bibs",
          caption: "Bola jaring on the outdoor court."
        },
        {
          src: `${KT}/student-activity-5.jpg`,
          alt: "A futsal match on an outdoor covered court",
          caption: "Futsal, one of five sports on the programme."
        },
        {
          src: `${KT}/student-activity-6.jpg`,
          alt: "An indoor futsal match on a blue court, with players in green bibs",
          caption: "Indoor futsal during the tournament."
        },
        {
          src: `${KT}/student-activity-4.jpg`,
          alt: "Students performing on stage at an English drama competition in a hall, in costume",
          caption:
            "The English Drama Competition — an inter-varsity competition in Terengganu."
        },
        {
          src: `${KT}/student-activity-8.png`,
          fit: "contain",
          alt: "Sijil Pengesahan Penubuhan from the Jabatan Belia dan Sukan Negara, certifying the registration of Kolej UNITAR Kuala Terengganu, dated 15 May 2026",
          caption:
            "The Rakan Muda Secretariat, registered with the Jabatan Belia dan Sukan Negara."
        },
        {
          src: `${KT}/student-activity-10.jpg`,
          fit: "contain",
          alt: "Career Readiness Session 1 poster — a professional resume writing workshop on 18 July 2026 with certified trainer Puan Balilah Hassan",
          caption:
            "Career Readiness, session one: professional resume writing."
        },
        {
          src: `${KT}/student-activity-11.jpg`,
          fit: "contain",
          alt: "Career Readiness Session 2 poster — a professional email writing workshop on 29 July 2026 with Dr Ramizatunnisah binti Jais",
          caption: "Career Readiness, session two: professional email writing."
        },
        {
          src: `${KT}/student-activity-9.jpg`,
          fit: "contain",
          alt: "Mobile Legends: Bang Bang Tournament poster — battle for glory on 17 June 2026 at the Exam Hall, RM10 per team of five",
          caption:
            "Mobile Legends: Bang Bang — the online half of the sports programme."
        },
        {
          src: `${KT}/student-activity-12.jpg`,
          fit: "contain",
          alt: "Eco Camp: UNITAR Edition poster — 17 and 18 July 2026 at Mangkuk Village Glamping Park, RM65, a CSR collaboration with EcoShed",
          caption: "Eco Camp: let's camp, let's make a change.",
        },
        {
          src: `${KT}/student-activity-13.jpg`,
          fit: "contain",
          alt: "Cinema Night 2.0 poster — lights off, fun on, a double feature on 17 June 2026 for RM2",
          caption: "Cinema Night 2.0 — a double feature on campus."
        },
        {
          src: `${KT}/student-activity-14.jpg`,
          fit: "contain",
          alt: "Zoo Care: Caring for Nature poster — 22 July 2026, together for animals, together for our planet",
          caption: "Zoo Care: caring for nature, together."
        },
        {
          src: `${KT}/student-activity-15.jpg`,
          fit: "contain",
          alt: "Program Induksi Perdana poster — Membina Kesepaduan Warga Baharu UNITAR, 11 February 2026 at UNITAR College Kuala Terengganu",
          caption:
            "Program Induksi Perdana, welcoming new UNITARians to campus."
        },
        {
          src: `${KT}/student-activity-16.jpg`,
          fit: "contain",
          alt: "Integrity Fun Day poster — 27 July 2026, with a wheel of activities and a lucky draw",
          caption: "Integrity Fun Day, run with the student council."
        }
      ],
      placeholder: {
        label: "Photos and posters needed",
        brief:
          "Add the sports, drama, and event posters and photographs to public/newsletter/kt/."
      },
      caption:
        "Opportunities to participate, lead, compete, and grow beyond academics."
    },

    {
      id: "hostel",
      navLabel: "Hostel",
      kicker: "Student residence",
      heading: "Hostel Upgrade",
      standfirst:
        "Every hostel unit upgraded and fully furnished.",
      body: [
        "**Enhanced hostel facilities** — all hostel units have been upgraded and are now fully furnished with **new beds, mattresses, dedicated wardrobes, study tables and chairs, as well as newly installed curtains**, providing students with a more comfortable, functional, and conducive living environment."
      ],
      notes: [
        {
          kind: "result",
          text: "Students can enjoy a higher standard of accommodation with improved comfort, privacy, and study-friendly spaces that support both their academic success and overall wellbeing."
        }
      ],
      images: [
        {
          src: `${KT}/hosterl-1.jpg`,
          alt: "An upgraded hostel room with a bunk bed, new mattresses, dedicated wardrobes, a wall fan, air conditioning, and newly installed curtains",
          caption:
            "New beds, mattresses, wardrobes, and curtains throughout the units."
        },
        {
          src: `${KT}/hostel-2.jpg`,
          alt: "A row of new study tables and chairs along a hostel room wall, beside a curtained window",
          caption: "Study tables and chairs, for study-friendly space at home."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the upgraded hostel unit photos to public/newsletter/kt/."
      },
      caption: "A higher standard of accommodation, in every unit."
    },

    {
      id: "payment",
      navLabel: "Payment",
      kicker: "Coming soon",
      heading: "Enhanced Payment Services",
      standfirst: "A new payment gateway, with more ways to pay.",
      variant: "coming-soon",
      body: [
        "A new payment gateway is coming, for students' convenience, with multiple payment options:"
      ],
      bullets: ["Credit card", "Bank transfer", "E-wallets"],
      notes: [
        { kind: "result", text: "Convenient and flexible ways to pay." }
      ],
      images: [
        {
          src: "/newsletter/uiu/payment/payment-options.svg",
          alt: "Illustration of three payment routes — a credit card, a bank, and an e-wallet on a phone — all feeding into a single payment gateway",
          caption:
            "Illustration: card, bank transfer, and e-wallet, all through one gateway."
        }
      ],
      placeholder: {
        label: "Artwork needed",
        brief:
          "Add payment gateway artwork showing the card, bank transfer, and e-wallet options to public/newsletter/kt/."
      },
      caption: "More convenient payment options are on the way."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "Your September 2025 SSS responses shaped everything above.",
    body: "Every survey response shapes what happens next on campus and in the online spaces. Thank you for speaking up, UNITARians!",
    signature: "Student Experience Department"
  }
};
