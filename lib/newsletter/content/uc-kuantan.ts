import type { CampusNewsletter } from "../types";

/**
 * Web-sized copies of the campus shoot. The originals stay in the folder
 * above, as they were supplied.
 */
const K = "/newsletter/kuantan/web";

/**
 * UC Kuantan — UNITAR College Kuantan.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's Kuantan draft. Note: unlike every other
 * campus, Kuantan's connectivity section quotes no bandwidth figure — it
 * reports ICT support and stability only. The 1Gbps label appears on the
 * supplied diagram, not in the copy, so it stays out of the body text.
 */
export const ucKuantan: CampusNewsletter = {
  slug: "uc-kuantan",
  name: "UC Kuantan",
  fullName: "UNITAR College Kuantan",
  location: "Kuantan, Pahang",

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
      "Inside this issue: more industry talks and career preparation, a stronger campus network, CSR work in the community, better library and digital resources, refurbished learning spaces, and a One Stop Centre backed by IT support."
  },

  intro: [
    "Following the responses from the Student Satisfaction Survey (SSS) from students conducted in September 2025, and based on your feedback, we have made some improvements.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned in the coming months. Better campus, better experience."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "6", label: "Focus areas improved since your feedback" },
    { value: "Prompt", label: "ICT assistance at the One Stop Centre" },
    { value: "Digital", label: "Databases, e-books, and journals online" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" }
  ],

  sections: [
    {
      id: "career",
      navLabel: "Career",
      kicker: "Career readiness",
      heading: "Career and Industry Readiness",
      standfirst:
        "More industry talks, guest speakers, and employability initiatives.",
      bullets: [
        "More industry talks and guest speakers.",
        "Career preparation and employability initiatives."
      ],
      notes: [
        {
          kind: "result",
          text: "Greater exposure and stronger career readiness for our students."
        }
      ],
      images: [
        {
          src: `${K}/career-1.jpg`,
          alt: "A guest speaker receiving a UNITAR gift bag from two staff members in front of the UNITAR #AccelerateYourFuture wall at an awards ceremony",
          caption: "A visiting speaker welcomed to campus."
        },
        {
          src: `${K}/career-2.jpg`,
          alt: "A large group of students and staff on stage at the Anugerah Belia Diraja 2026 ceremony",
          caption:
            "Students at Anugerah Belia Diraja 2026 — exposure well beyond the classroom."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add industry talk and career event photos to public/newsletter/kuantan/web/."
      },
      caption: "Greater exposure, and stronger career readiness."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Stronger and Stable Wi-Fi & Connectivity",
      standfirst:
        "A campus network backed by dedicated ICT personnel.",
      bullets: [
        "Campus network and connectivity supported by personnel from the ICT team.",
        "Stronger and stable connectivity."
      ],
      notes: [
        {
          kind: "result",
          text: "Reliable internet access for classes, learning, and collaboration."
        }
      ],
      images: [
        {
          src: `${K}/wifi-1.png`,
          fit: "contain",
          alt: "A 1Gbps campus network diagram showing the network room main hub and splitter feeding satellite hubs in the open office area, classroom, and study and collaboration area",
          caption:
            "How the network reaches each area, from the network room out to the satellite hubs."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the campus connectivity diagram to public/newsletter/kuantan/web/."
      },
      caption: "Reliable connectivity for classes and collaboration."
    },

    {
      id: "community",
      navLabel: "Community",
      kicker: "Student engagement",
      heading: "Community Impact Through Meaningful Engagement",
      standfirst:
        "CSR work with corporate partners, NGOs, government agencies, schools, and local communities.",
      body: [
        "Students participated in a range of **Corporate Social Responsibility (CSR)** initiatives organised in collaboration with corporate partners, NGOs, government agencies, schools, and local communities, providing valuable opportunities to contribute to society while developing practical life skills."
      ],
      notes: [
        {
          kind: "result",
          text: "Through these initiatives, students strengthen their soft skills — including effective communication, leadership, teamwork, problem-solving, and community engagement — moulding future leaders."
        }
      ],
      images: [
        {
          src: `${K}/community-1.jpg`,
          alt: "Students gathered around a serviceman in uniform at a community outreach event in a hall, with children colouring at a low table in the foreground",
          caption: "A community outreach day, run with local partners."
        },
        {
          src: `${K}/community-3.jpg`,
          alt: "Students stirring a large cooking pot at an outdoor community kitchen, alongside local residents and children",
          caption: "Cooking for the community — practical life skills in action."
        },
        {
          src: `${K}/community-2.jpg`,
          alt: "Students in red and black team jerseys standing with staff at an outdoor community event",
          caption: "Representing UC Kuantan at a community event."
        },
        {
          src: `${K}/community-4.jpg`,
          alt: "Students sitting in a circle around a campfire among trees at night during a camp",
          caption: "Evening reflection around the campfire."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief: "Add CSR activity photos to public/newsletter/kuantan/web/."
      },
      caption: "Contributing to society, and building life skills."
    },

    {
      id: "resources",
      navLabel: "Resources",
      kicker: "Learning support",
      heading: "Learning Resources",
      standfirst:
        "Better library access, and digital resources you can reach from anywhere.",
      bullets: [
        "Better access to resources at the library, with enhanced facilities and support services.",
        "**Digital Learning Resources** to encourage wider utilisation of online databases, e-books, journals, and other academic materials."
      ],
      notes: [
        {
          kind: "result",
          text: "Students can more easily access library services and digital learning resources, empowering them to conduct research, support their studies, and enhance their overall learning experience."
        }
      ],
      images: [
        {
          src: `${K}/lrc.jpg`,
          fit: "contain",
          alt: "The Learning Resource Centre website at lrc.unitar.my, with navigation for e-resources, guides, and research support, and a keyword search box",
          caption:
            "The Learning Resource Centre at lrc.unitar.my — databases, e-books, and journals."
        }
      ],
      placeholder: {
        label: "Screenshot needed",
        brief:
          "Add the Learning Resource Centre screenshot to public/newsletter/kuantan/web/."
      },
      caption: "Library services and digital resources, easier to reach."
    },

    {
      id: "spaces",
      navLabel: "Spaces",
      kicker: "Campus spaces",
      heading: "Improved Learning Spaces",
      standfirst:
        "Refurbished common areas, and ongoing facilities work across campus.",
      bullets: [
        "Continuous enhancement of learning spaces and common areas through refurbishment initiatives.",
        "Ongoing improvements of facilities on campus."
      ],
      notes: [
        {
          kind: "result",
          text: "A more comfortable and conducive learning environment."
        }
      ],
      images: [
        {
          src: `${K}/facilities-1.jpg`,
          alt: "The refurbished campus reception area, with round white tables and orange chairs in front of a timber-slatted wall carrying the UNITAR sign",
          caption: "The refurbished reception and lounge area."
        },
        {
          src: `${K}/facilities-3.jpg`,
          alt: "A common area with round tables, orange chairs, and blue and orange modular seating against a mural reading 'As UNITARians, We Embody Excellence'",
          caption:
            "Common-area seating against the As UNITARians feature wall."
        },
        {
          src: `${K}/facilities-2.jpg`,
          alt: "A mock kindergarten teaching room with alphabet and number rugs, child-sized tables and chairs, a book display, a play kitchen, and a cot",
          caption:
            "The mock kindergarten room, set up for Early Childhood Education classes."
        },
        {
          src: `${K}/facilities-4.jpg`,
          alt: "A large hall laid out with rows of banquet chairs facing a stage, with windows along one side",
          caption: "The hall, ready for university events."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add refurbished learning space photos to public/newsletter/kuantan/web/."
      },
      caption: "More comfortable, more conducive spaces to learn in."
    },

    {
      id: "feedback",
      navLabel: "Feedback",
      kicker: "Continuous improvement",
      heading: "Listening, Improving, Delivering Better Experiences",
      standfirst:
        "Your feedback matters — and it keeps shaping what happens next.",
      bullets: [
        "Enhanced One Stop Centre, supported by IT personnel for prompt ICT assistance.",
        "Regular review of student feedback.",
        "Ongoing improvements on campus facilities and student services.",
        "Strong collaboration across academic and support teams, to support students better."
      ],
      notes: [
        {
          kind: "result",
          text: "Continuous improvements focused on an enhanced student experience."
        }
      ],
      images: [
        {
          src: `${K}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/kuantan/web/."
      },
      caption: "Listening, improving, and delivering better experiences."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading:
      "Your September 2025 survey responses have helped us cater to our student community.",
    body: "We thank you for your support! In turn, each response that we receive from the upcoming survey guides us to make further improvements. Thank you once again for your participation, UNITARians!",
    signature: "Student Experience Department"
  }
};
