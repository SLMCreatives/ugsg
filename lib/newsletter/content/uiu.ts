import type { CampusNewsletter } from "../types";

/** Web-sized copies of the café shoot live alongside the camera originals. */
const CAFE = "/newsletter/uiu/new_cafe/web";
const LABS = "/newsletter/uiu/labs/web";
const GAMES = "/newsletter/uiu/games";

/**
 * UIU — UNITAR International University (Kelana Jaya).
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 */
export const uiu: CampusNewsletter = {
  slug: "uiu",
  name: "UIU",
  fullName: "UNITAR International University",
  location: "Kelana Jaya, Selangor",

  issue: {
    label: "Issue 01",
    date: "August 2026"
  },

  hero: {
    eyebrow: "The annual student feedback newsletter",
    headline: "You spoke.",
    headlineAccent: "We acted.",
    headlineTail: "Here's what has improved.",
    subtitle:
      "Inside this issue: a new café operator, six new labs and studios, double the Wi-Fi, and the payment upgrade arriving next."
  },

  intro: [
    "Welcome to the first edition of this newsletter. In September 2025, UNITARians told us through the Student Satisfaction Survey what was working at UIU and what was not — the food, the Wi-Fi, the classrooms, the queues at the counter.",
    "This issue is our reply. Every story on these pages began as something a student wrote down. Some of that work is now finished and you can see it on campus today. Some is still underway, and where that is the case we have said so, along with when you can expect it."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2×", label: "Faster campus internet bandwidth" },
    { value: "6", label: "New studios and labs built this year" },
    { value: "500+", label: "Students involved in UNITAR Games 2026" },
    { value: "Instant", label: "WhatsApp feedback for service monitoring" }
  ],

  sections: [
    {
      id: "dining",
      navLabel: "Dining",
      kicker: "Campus dining",
      heading: "The café has a new operator — and a bigger menu",
      standfirst: "Wider choice at lower prices, served on campus since June.",
      body: [
        "A new café operator took over campus dining on **15 June 2026**, bringing a wider menu at more affordable prices. Both were points students raised in the survey.",
        "The next step is to cover the gaps between meals — and the small essentials that are easy to forget until you need them."
      ],
      notes: [
        {
          kind: "next",
          text: "Campus-wide vending machines offering snacks, basic medication, and personal care essentials."
        },
        {
          kind: "result",
          text: "More food variety, and easier access to everyday essentials."
        }
      ],
      images: [
        {
          src: `${CAFE}/u1_09500.jpg`,
          alt: "The café counter, with cooked dishes in the display case and a menu board listing prices from RM7 to RM10",
          caption: "The new menu board — most mains sit between RM7 and RM10."
        },
        {
          src: `${CAFE}/u1_09503.jpg`,
          alt: "Close-up of serving trays filled with curried chicken and other cooked dishes",
          caption: "Hot dishes replenished through the day at the counter."
        },
        {
          src: `${CAFE}/u1_09510.jpg`,
          alt: "Cups of crispy fried enoki mushrooms on the counter, with egg tarts lined up behind",
          caption: "Snacks and sides for between classes."
        },
        {
          src: `${CAFE}/u1_09509.jpg`,
          alt: "A row of packaged egg tarts arranged along the café counter",
          caption: "Freshly baked items are packed and ready to take away."
        },
        {
          src: `${CAFE}/u1_09506.jpg`,
          alt: "The wide café seating hall, with booth seating and an #AccelerateYourFuture wall",
          caption: "The dining hall seats students across booths and long tables."
        },
        {
          src: `${CAFE}/u1_09514.jpg`,
          alt: "High tables with orange bar stools and booth seating in the café",
          caption: "High tables and booths for eating, working, or waiting between classes."
        },
        {
          src: `${CAFE}/u1_09512.jpg`,
          alt: "Students sitting with laptops at tables in the café during the day",
          caption: "Outside mealtimes the hall doubles as study space."
        }
      ],
      placeholder: {
        label: "Photo 1",
        brief: "Replace with a photo of the new café, menu, or dining area."
      },
      caption: "More choices and better value for the UNITAR community."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "A faster route to getting your question answered",
      standfirst:
        "A new ticketing system at the One Stop Centre — and a WhatsApp channel that tells us how it went.",
      body: [
        "Two changes have been made to how student support works. The One Stop Centre's ticketing platform has been upgraded, so enquiries are logged and tracked reliably from the moment you raise them.",
        "Alongside it, a new instant WhatsApp feedback channel lets you tell us about the service you received while it is still fresh. That gives the team a live picture of where support is working well and where it needs attention, rather than waiting a year to find out."
      ],
      notes: [
        {
          kind: "result",
          text: "Quicker responses, better support, and a more consistent service experience."
        }
      ],
      images: [
        {
          src: "/newsletter/uiu/support/osc_helpdesk.png",
          fit: "contain",
          alt: "The UNITAR One Stop Centre helpdesk portal, with a search bar and options to browse help articles or request a service",
          caption:
            "The upgraded One Stop Centre portal: search, browse help articles, or raise a request."
        }
      ],
      placeholder: {
        label: "Photo 2",
        brief:
          "Replace with a photo of the One Stop Centre or student support team."
      },
      caption: "A more responsive and accountable student support experience."
    },

    {
      id: "facilities",
      navLabel: "Facilities",
      kicker: "Learning spaces",
      heading: "Six new labs and studios opened this year",
      standfirst:
        "New AI Labs, two SMArD Studios on Level 10, and three converted studio classrooms on Level 1.",
      body: [
        "New AI Labs are now in use for teaching, learning, and innovation across programmes, including IT and Business Analytics. On Level 10, two new SMArD Studios have opened, and three classrooms on Level 1 have been converted into studio spaces.",
        "The rooms were designed around how classes actually run now:"
      ],
      bullets: [
        "Flexible layouts for group work, presentations, and hybrid classes.",
        "Specialist upgrades for creative programmes — new drafting tables, mannequins, and improved Animation Studio workstations."
      ],
      notes: [
        {
          kind: "result",
          text: "Better-equipped spaces that support hands-on learning, creativity, teamwork, and industry readiness."
        }
      ],
      images: [
        {
          src: `${LABS}/u1_09469.jpg`,
          alt: "Rows of desktop workstations in a computer lab, with students working at the machines and pixel-art murals on the glass partition behind",
          caption: "Workstations in one of the upgraded computer labs."
        },
        {
          src: `${LABS}/u1_09543.jpg`,
          alt: "A studio classroom filled with adjustable drafting tables and orange drafting stools, facing a whiteboard and projector screen",
          caption: "New drafting tables and stools for the creative programmes."
        },
        {
          src: `${LABS}/u1_09525.jpg`,
          alt: "A studio classroom with mood boards and design presentation panels pinned along the wall, and scale models on the tables",
          caption:
            "A studio classroom set up for design reviews, with student work on the boards."
        },
        {
          src: `${LABS}/u1_09536.jpg`,
          alt: "Open shelving filled with student-built scale models, beside a low table, rug, and bean bag in a studio space",
          caption:
            "Studio space for model-making, with student work on display."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add photos of the AI Lab, the SMArD Studios on Level 10, the converted Level 1 classrooms, and the Animation Studio to public/newsletter/uiu/labs/."
      },
      caption:
        "Industry-ready spaces for creativity, learning, and collaboration."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Campus Wi-Fi is now twice as fast",
      standfirst:
        "Bandwidth doubled in February. Wider coverage is the next job.",
      body: [
        "In February 2026, campus internet bandwidth was doubled from **1GB to 2GB** — a 100% increase in capacity. Connectivity was one of the clearest themes running through your survey responses, both on campus and for those studying online.",
        "Capacity is only half the problem, though. The next phase is about coverage: making the signal as good at the far end of the building as it is next to the router."
      ],
      notes: [
        {
          kind: "next",
          text: "A cloud-managed Wi-Fi controller and additional access points, for wider coverage across UIU."
        },
        { kind: "target", text: "Q2 2027." },
        {
          kind: "result",
          text: "Faster and more stable Wi-Fi wherever you study."
        }
      ],
      images: [
        {
          src: "/newsletter/uiu/wifi/wifi-coverage.svg",
          alt: "Illustration of a Wi-Fi access point sending signal across three floors of a building, with laptops and phones connected at the far ends",
          caption:
            "Illustration: capacity has doubled — the next phase extends coverage to the far end of each floor."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add a campus connectivity, study area, or student Wi-Fi photo to public/newsletter/uiu/wifi/."
      },
      caption:
        "Stronger connectivity for studying, collaborating, and accessing resources."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Nearly 500 students turned out for UNITAR Games 2026",
      standfirst:
        "On-campus and Fully Online Students competing in the same tournament.",
      body: [
        "UNITAR Games 2026 brought together nearly 500 students, including Fully Online Students. It was the largest single gathering of the student community this year — and it turned up talent the university did not know it had."
      ],
      bullets: [
        "New student talent was identified for MASISWA and SUKIPT.",
        "The Clubs and Societies Open Day was refreshed to create a more engaging experience."
      ],
      notes: [
        {
          kind: "result",
          text: "A more connected student community, both on campus and online."
        }
      ],
      images: [
        {
          src: `${GAMES}/unitar-games-5.jpg`,
          alt: "Students reaching for the ball during a volleyball match, with spectators watching from the side",
          caption: "Volleyball in the sports hall."
        },
        {
          src: `${GAMES}/unitar-games-4.jpg`,
          alt: "Students playing netball on an outdoor court, wearing position bibs",
          caption: "Netball on the outdoor court."
        },
        {
          src: `${GAMES}/unitar-games-3.jpg`,
          alt: "Students playing futsal on an indoor court while teammates watch from the sideline",
          caption: "Futsal drew some of the largest crowds."
        },
        {
          src: `${GAMES}/unitar-games-6.jpg`,
          alt: "A team performing a synchronised aerobics routine in front of UNITAR banners",
          caption: "Aerobics — one of eleven sports on the programme."
        },
        {
          src: `${GAMES}/unitar-games-2.jpg`,
          alt: "A large group of students and staff posing together with certificates at the closing ceremony",
          caption: "The closing ceremony, with certificates for every team."
        },
        {
          src: `${GAMES}/unitar-games.png`,
          fit: "contain",
          alt: "UNITAR Games 2026 poster, with the theme Bangkit Bersama, the dates 20 and 24 June 2026, and the eleven sports on the programme",
          caption:
            "The 2026 campaign: Bangkit Bersama, and the road to MASISWA and SUKIPT."
        }
      ],
      placeholder: {
        label: "Photo 5",
        brief:
          "Replace with a UNITAR Games or Clubs and Societies Open Day photo."
      },
      caption:
        "Connecting students through sports, activities, and shared experiences."
    },

    {
      id: "payment",
      navLabel: "Payment",
      kicker: "Coming soon",
      heading: "More ways to pay, arriving soon",
      standfirst:
        "A new payment gateway, with card, transfer, and e-wallet options.",
      variant: "coming-soon",
      body: [
        "Paying fees should not be the hardest part of the semester. A new payment gateway is being introduced, adding several ways to settle what you owe:"
      ],
      bullets: ["Credit card", "Bank transfer", "E-wallets"],
      notes: [
        {
          kind: "result",
          text: "Faster, safer, and more flexible ways to make payments."
        }
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
        label: "Photos needed",
        brief:
          "Add a payment portal, mobile payment, or finance services image to public/newsletter/uiu/payment/."
      },
      caption: "More convenient payment options are on the way."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "The next edition starts with your next survey.",
    body: "Everything in this issue began as a survey response. If you like what you’re seeing, we’d love to hear that too. When the Student Satisfaction Survey comes around, take a moment to share what you’re enjoying, what’s working well, or leave us a little encouragement. Your positive feedback helps our teams know what to keep doing and build on.",
    signature: "Student Experience Department"
  }
};
