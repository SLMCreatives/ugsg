import type { CampusNewsletter } from "../types";

/** Web-sized copies of the campus shoot live alongside the camera originals. */
const PHOTOS = "/newsletter/uuckl/web";

/**
 * UUCKL — UNITAR University College Kuala Lumpur.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the vetted "SSS Newsletter Edited_UUCKL" draft.
 */
export const uuckl: CampusNewsletter = {
  slug: "uuckl",
  name: "UUCKL",
  fullName: "UNITAR University College Kuala Lumpur",
  location: "Kuala Lumpur",

  issue: {
    label: "Issue 01",
    date: "August 2026"
  },

  hero: {
    eyebrow: "The annual student feedback newsletter",
    headline: "Creating",
    headlineAccent: "better experiences",
    headlineTail: "through meaningful change.",
    subtitle:
      "Inside this issue: a campus expanded to Level 2, internet speed doubled, a fully digital One-Stop Centre, food and beverage on campus, and enhanced access control at the entrance."
  },

  intro: [
    "At UNITAR University College Kuala Lumpur, we are constantly enhancing the student experience by investing in better learning environments and smarter student services.",
    "From our expanded campus with enhanced learning spaces to the launch of a fully digital One-Stop Centre, we are continuously improving the UUCKL student experience to make your university journey more convenient, comfortable, and connected. Here's what's new at UUCKL!"
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2 Gbps", label: "Internet speed, doubled from 1 Gbps" },
    { value: "23", label: "Wi-Fi access points, up from 10 units" },
    { value: "Level 2", label: "Campus expanded onto a new floor" },
    { value: "Anytime", label: "OSC Helpdesk enquiries, from any device" }
  ],

  sections: [
    {
      id: "campus",
      navLabel: "Campus",
      kicker: "Campus expansion",
      heading: "Creating More Space for Better Learning",
      standfirst:
        "The campus has expanded to Level 2, with upgraded facilities, smart classrooms, and enhanced Early Childhood Education spaces.",
      body: [
        "At UUCKL, we are committed to creating a modern, comfortable, and collaborative learning environment that supports student success. As part of our continuous campus enhancement efforts, we have expanded our campus to **Level 2**, providing more space and upgraded facilities to enrich your learning experience.",
        "**Expanded campus facilities**"
      ],
      bullets: [
        "New spacious multipurpose hall at Level 2 for university events, workshops and student activities.",
        "Additional student study lounge at the Level 2 foyer where students can relax, meet friends, or complete assignments between classes.",
        "Refurbished with new 'flip chairs' for interactive and collaborative learning in classes.",
        "Refurbished classroom chairs for student's comfort.",
        "Ergonomic and spacious examination tables to provide a better examination experience.",
        "**Smart classrooms** — all classrooms are equipped with built-in projectors to enhance teaching and learning.",
        "**Enhanced Early Childhood Education facilities** — to enhance practical learning, two upgraded mock kindergarten classrooms have been introduced at Level 2, targeted at Diploma in Early Childhood Education students to provide valuable experience in industry-relevant classroom settings."
      ],
      notes: [
        {
          kind: "next",
          text: "Our campus enhancement journey continues with possible opportunities for further expansion: additional classrooms to support future student growth, more collaborative study and discussion spaces, enhanced facilities for student activities, workshops and university events, and continued upgrades to learning environments and student amenities."
        },
        { kind: "target", text: "2027." },
        {
          kind: "result",
          text: "Students can now enjoy a modern, comfortable, and industry-ready campus equipped with enhanced learning facilities, collaborative spaces, and improved accessibility — all designed to support an engaging and enjoyable university experience."
        }
      ],
      images: [
        {
          src: `${PHOTOS}/entrance-level-2.jpg`,
          alt: "Open double doors leading into the Level 2 campus, flanked by tall orange UNITAR University College Kuala Lumpur banners",
          caption: "The Level 2 entrance — the newest part of campus."
        },
        {
          src: `${PHOTOS}/student-lounge.jpg`,
          alt: "Students sitting at round tables and yellow chairs in the Level 2 student lounge, along a long blue UNITAR feature wall",
          caption:
            "The additional student study lounge at the Level 2 foyer, busy between classes."
        },
        {
          src: `${PHOTOS}/study-area.jpg`,
          alt: "Two long study tables surrounded by yellow chairs, in front of a blue UNITAR wall panel",
          caption: "Study and discussion space on Level 2."
        },
        {
          src: `${PHOTOS}/mini-library.jpg`,
          alt: "A mini library with book shelving, two desktop workstations along the wall, and a black sofa",
          caption:
            "The mini library on Level 2 — shelves, workstations, and somewhere to sit and read."
        },
        {
          src: `${PHOTOS}/class-lab-1.jpg`,
          alt: "A computer lab with rows of desktop workstations facing a whiteboard and projector screen, with a projector mounted on the ceiling",
          caption:
            "Smart classrooms: all classrooms are equipped with built-in projectors."
        },
        {
          src: `${PHOTOS}/class-lab-2.jpg`,
          alt: "A computer lab with rows of monitors and desktop towers on light wood benches, lit by ceiling panels",
          caption: "Upgraded lab space for hands-on classes."
        },
        {
          src: `${PHOTOS}/mock-kindergarten-1.jpg`,
          alt: "A mock kindergarten classroom with a low table and child-sized chairs on an alphabet rug, teaching posters on the wall, and a window looking onto the street",
          caption:
            "One of two upgraded mock kindergarten classrooms introduced at Level 2."
        },
        {
          src: `${PHOTOS}/mock-kindergarten-2.jpg`,
          alt: "A mock kindergarten room with foam floor mats, a whiteboard carrying a weekly routine chart, toy storage shelving, and a play kitchen",
          caption:
            "An industry-relevant classroom setting for Diploma in Early Childhood Education students."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add photos of the Level 2 multipurpose hall, the new flip chairs, and the examination tables to public/newsletter/uuckl/web/."
      },
      caption:
        "More space and upgraded facilities, on a campus that now runs up to Level 2."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Stronger Wi-Fi, Better Connectivity",
      standfirst:
        "Internet speed doubled in February 2026, and the number of access points has more than doubled with it.",
      body: [
        "A fast and reliable internet connection is essential for learning, research, and collaboration. As part of our campus expansion, we have enhanced the Wi-Fi infrastructure to provide students with a better online experience throughout the campus.",
        "**Better connectivity on campus with stronger Wi-Fi** — enhanced campus connectivity with a 100% increase in bandwidth, doubling internet speed from **1 Gbps to 2 Gbps** (February 2026).",
        "**Expanded Wi-Fi coverage** — to ensure stronger and more reliable connectivity across the expanded campus:"
      ],
      bullets: [
        "The number of Wi-Fi Access Points has increased from **10 units to 23 units**.",
        "Stable Wi-Fi access across campus from Levels 1 and 9."
      ],
      notes: [
        {
          kind: "next",
          text: "To further enhance the digital learning experience, we will continue to monitor network performance and user experience across campus, optimise Wi-Fi coverage to cater to our growing student population, and upgrade network infrastructure to support future campus expansion and digital learning initiatives."
        },
        {
          kind: "result",
          text: "Students can enjoy faster, stable, and reliable internet connectivity across the campus, making it easier to attend online classes and sessions, access learning materials, collaborate on assignments, and stay connected online while they are on campus."
        }
      ],
      images: [
        {
          src: "/newsletter/uuckl/wifi/wifi-coverage.svg",
          fit: "contain",
          alt: "Before-and-now diagram: campus bandwidth up from 1 Gbps to 2 Gbps, and Wi-Fi access points up from 10 units to 23 units, with stable access across campus from Levels 1 and 9",
          caption:
            "Illustration: double the bandwidth, and 13 more access points across campus."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add a photo of the new access points or a connected study area to public/newsletter/uuckl/wifi/."
      },
      caption: "Faster, more stable connectivity across campus."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading:
        "Prompt Support When You Need It with One Stop Centre Helpdesk",
      standfirst:
        "Getting assistance is now faster and more convenient than ever.",
      body: [
        "We have introduced the **OSC Helpdesk**, a centralised online support platform that connects students directly with the right department through a single portal. Accessible via the UNITAR Student Dashboard, students can submit enquiries anytime, anywhere using their mobile devices or computers through a Single Sign-On (SSO).",
        "**One digital helpdesk**"
      ],
      bullets: [
        "Accessible student support services through a single online platform.",
        "Single Sign-On (SSO) via the UNITAR Student Dashboard — no separate login required.",
        "**No more waiting** — no need to wait for a response at the counter or via WhatsApp.",
        "Seamlessly submit enquiries to relevant departments in just a few clicks.",
        "Requests are monitored and resolved within established service turnaround times based on the level of urgency.",
        "**Simplified payment submission** — students can easily upload tuition fees or payment receipts through the \"Payment Evidence Submission\" online. Once verified, students will receive their Official Receipt digitally, making the entire payment verification process faster, convenient, and paperless."
      ],
      notes: [
        {
          kind: "result",
          text: "Students can now enjoy a faster, more convenient, and transparent support experience with prompt responses, easier payment submissions, real-time tracking of enquiries, and improved access to UUCKL student services with the use of one digital platform."
        }
      ],
      images: [
        {
          src: `${PHOTOS}/osc-helpdesk.png`,
          fit: "contain",
          alt: "The UNITAR One-Stop Centre helpdesk portal, with a search bar and cards to browse help articles or request a service",
          caption:
            "The OSC Helpdesk: search, browse help articles, or raise a request — one login, every service."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add a screenshot of the OSC Helpdesk or a photo of the One Stop Centre counter to public/newsletter/uuckl/web/."
      },
      caption: "One platform, all your student services."
    },

    {
      id: "food",
      navLabel: "Food & Beverage",
      kicker: "Campus amenities",
      heading: "Food and Beverage on Campus",
      standfirst:
        "SF Coffee within the building, and two vending machines in the lobby.",
      body: [
        "Whether you need a quick pick-me-up between classes or during your study break, we have included available food and beverages on campus.",
        "**SF Coffee on campus** — grab your favourite coffee or beverages, or snacks from SF Coffee. It is conveniently located in the building and an ideal hang out for students who dine in.",
        "**Vending machines** — two vending machines are now available at the building lobby, offering a selection of:"
      ],
      bullets: ["Refreshing beverages", "Light snacks"],
      notes: [
        {
          kind: "result",
          text: "Whether you are between classes or tackling assignments, refreshments are available on campus. Students can conveniently enjoy coffee, beverages, and light snacks while they are on campus — and stay focused on what matters most: your studies."
        }
      ],
      images: [
        {
          src: `${PHOTOS}/sf-coffee.jpg`,
          alt: "The SF Coffee counter in the building lobby, with menu screens above the bar and wooden stools along the front",
          caption: "SF Coffee, conveniently located in the building."
        },
        {
          src: `${PHOTOS}/vending-tastybox.jpg`,
          alt: "A TastyBot vending machine in the lobby, stocked with snacks and canned drinks, with a touchscreen and card reader on the right",
          caption: "TastyBot — light snacks and refreshing beverages."
        },
        {
          src: `${PHOTOS}/vending-tealive.jpg`,
          alt: "A purple Tealive vending machine beside the TastyBot machine, with a touchscreen showing a three-step ordering guide",
          caption:
            "The second machine, Tealive, brews drinks to order right beside it."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add photos of SF Coffee and the lobby vending machines to public/newsletter/uuckl/web/."
      },
      caption: "Refreshments available on campus, without leaving the building."
    },

    {
      id: "safety",
      navLabel: "Safety",
      kicker: "Campus safety",
      heading: "Enhanced Campus Safety & Security",
      standfirst:
        "Security barricades at the Level 1 entrance strengthen access control for the UUCKL community.",
      body: [
        "Providing a safe and secure learning environment remains our priority. To enhance campus security and safeguard our students, staff, and visitors, additional safety measures have been implemented across the campus.",
        "**Access control** — to further strengthen campus safety, security barricades have been installed at the **Level 1 entrance**, enhancing access control and providing an additional layer of protection for the UUCKL community.",
        "These enhancements help to:"
      ],
      bullets: [
        "Improve the safety and wellbeing of students, staff, and visitors.",
        "Strengthen security measures at key campus entry points.",
        "Enhance monitoring and access control across the campus.",
        "Foster a safer, more secure, and conducive learning environment for all."
      ],
      notes: [
        {
          kind: "next",
          text: "We will continue to strengthen campus security by regularly reviewing campus safety measures and policy, upgrading security infrastructure as required, and working closely with building management and security personnel to ensure a safe, secure, and welcoming campus environment."
        },
        {
          kind: "result",
          text: "Students and staff can enjoy greater peace of mind, knowing that enhanced security measures are in place to support a safe and secure campus experience."
        }
      ],
      images: [
        {
          src: `${PHOTOS}/security-barricade.jpg`,
          alt: "Access-control gates installed across the Level 1 lobby entrance, their indicator lights showing green, with the lift lobby beyond",
          caption: "The security barricades at the Level 1 entrance."
        },
        {
          src: `${PHOTOS}/main-entrance-lobby.jpg`,
          alt: "The UNITAR University College Kuala Lumpur entrance off the building lobby, with UNITAR 35 Bangkit Bersama flags either side of the doorway and the reception counter beyond",
          caption: "The main entrance to UUCKL, off the building lobby."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add a photo of the Level 1 security barricades to public/newsletter/uuckl/web/."
      },
      caption: "Enhanced access control at key campus entry points."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading: "The next edition starts with your next survey.",
    body: "Everything in this issue began as a survey response. If you like what you’re seeing, we’d love to hear that too. When the Student Satisfaction Survey comes around, take a moment to share what you’re enjoying, what’s working well, or leave us a little encouragement. Your positive feedback helps our teams know what to keep doing and build on.",
    signature: "Student Experience Department"
  }
};
