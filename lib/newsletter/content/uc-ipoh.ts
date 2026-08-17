import type { CampusNewsletter } from "../types";

/**
 * Web-sized copies of the campus shoot. The camera originals stay in the
 * numbered folders alongside, as they were supplied.
 */
const I = "/newsletter/ipoh/web";

/**
 * UC Ipoh — UNITAR College Ipoh.
 * 2026 edition, reporting on action taken since the September 2025
 * Student Satisfaction Survey.
 *
 * Body copy follows the campus's edited SSS newsletter draft. Event posters
 * render `contain` so their dates, schedules, and QR codes stay readable;
 * room photography crops to fill.
 */
export const ucIpoh: CampusNewsletter = {
  slug: "uc-ipoh",
  name: "UC Ipoh",
  fullName: "UNITAR College Ipoh",
  location: "Ipoh, Perak",

  issue: {
    label: "Issue 01",
    date: "August 2026"
  },

  hero: {
    eyebrow: "Student Satisfaction Survey 2025 Update",
    headline: "You spoke.",
    headlineAccent: "We acted.",
    headlineTail: "Here's what has improved!",
    subtitle:
      "Inside this issue: a new computer laboratory and refurbished classrooms, instant WhatsApp support, hostel refurbishment, double the Wi-Fi speed, a reimagined Clubs & Societies Open Day, more transport, and a refurbished student lounge."
  },

  intro: [
    "Thanks to all of you who have responded to the Student Satisfaction Survey (SSS) conducted in September 2025.",
    "Significant progress has been made between January and June 2026, with several exciting initiatives and enhancements planned for the coming months."
  ],

  highlightsTitle: "By the numbers",

  highlights: [
    { value: "2 Gbps", label: "Campus internet speed, doubled from 1 Gbps" },
    { value: "Instant", label: "WhatsApp feedback at the One Stop Centre" },
    { value: "Jan–Jun", label: "Progress delivered across 2026" },
    { value: "Q2 2027", label: "Target for wider Wi-Fi coverage" }
  ],

  sections: [
    {
      id: "learning-spaces",
      navLabel: "Learning Spaces",
      kicker: "Learning spaces",
      heading: "Smart Learning Spaces",
      standfirst:
        "A new computer laboratory, and classrooms refurnished throughout.",
      bullets: [
        "**New computer laboratory** to support teaching, learning, and digital skill development.",
        "**Refurbished classrooms** with new tables and chairs, to create a more comfortable and conducive learning experience."
      ],
      notes: [
        {
          kind: "next",
          text: "Plans to refurbish the library with a vibrant new look, improved study spaces, and an enhanced learning atmosphere."
        },
        {
          kind: "result",
          text: "A conducive and student-centred learning environment that supports academic success and engagement."
        }
      ],
      images: [
        {
          src: `${I}/lab-blinds-computers.jpg`,
          alt: "The new computer laboratory, with rows of monitors and desktop towers on light wood benches, mesh task chairs, a ceiling projector, and a pull-down screen",
          caption:
            "The new computer laboratory, set up for teaching and digital skill development."
        },
        {
          src: `${I}/lab-new-computers.jpg`,
          alt: "The computer laboratory seen from the back, with workstations facing a whiteboard on a lime green wall",
          caption: "Workstations facing the teaching wall."
        },
        {
          src: `${I}/classroom-blinds.jpg`,
          alt: "A refurbished classroom with rows of blue tablet-arm chairs, a lecturer's desk, a mobile whiteboard, and new roller blinds along the windows",
          caption: "New tablet-arm seating and roller blinds."
        },
        {
          src: `${I}/classroom-1.jpg`,
          alt: "A refurbished classroom with rows of new black tables and chairs facing a projector screen",
          caption: "New tables and chairs throughout the classrooms."
        },
        {
          src: `${I}/classroom-2.jpg`,
          alt: "A refurbished classroom with new black tables and chairs, a whiteboard on a lime green wall, and a ceiling projector",
          caption: "A more comfortable and conducive learning experience."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the computer laboratory and refurbished classroom photos to public/newsletter/ipoh/web/."
      },
      caption:
        "A student-centred learning environment, built for academic success."
    },

    {
      id: "support",
      navLabel: "Support",
      kicker: "Student support",
      heading: "Faster Support, Better Service",
      standfirst:
        "The One Stop Centre ticketing platform now runs on instant WhatsApp communications.",
      body: [
        "The **One Stop Centre ticketing platform** has been upgraded with instant WhatsApp communications, so enquiries reach the right people quickly and the service you receive stays consistent."
      ],
      notes: [
        { kind: "result", text: "Prompt response and consistent support." }
      ],
      images: [
        {
          src: `${I}/osc-helpdesk.png`,
          fit: "contain",
          alt: "One Stop Centre Helpdesk poster: access via your Student Portal at auth.unitar.my, with a scan-me QR code and a go-live date of 6 January 2026",
          caption:
            "The OSC Helpdesk — reach it from your Student Portal at auth.unitar.my."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'One Stop Centre Helpdesk' poster to public/newsletter/ipoh/web/."
      },
      caption: "One platform, with a faster route to an answer."
    },

    {
      id: "hostel",
      navLabel: "Hostel",
      kicker: "Student residence",
      heading: "Refurbishment at the student hostel",
      standfirst: "Making your home away from home more comfortable and secure.",
      body: [
        "We are committed to making your home away from home more comfortable and secure, with:"
      ],
      bullets: [
        "Improved hostel facilities with essential amenities.",
        "Heightened safety and security measures.",
        "A conducive living environment designed to support student wellbeing."
      ],
      notes: [
        {
          kind: "result",
          text: "Enhanced student wellbeing, safety, and satisfaction through a secure student residential environment."
        }
      ],
      images: [
        {
          src: `${I}/hostel-1.jpg`,
          alt: "A hostel room with bunk beds either side of an ensuite bathroom doorway, an air conditioner, and privacy curtains",
          caption: "Rooms with ensuite facilities and air conditioning."
        },
        {
          src: `${I}/hostel-2.jpg`,
          alt: "A hostel room with a dressing table and mirror, tall storage lockers, a wall fan, and a bunk bed with new mattresses",
          caption: "Essential amenities: storage, study surface, and fresh bedding."
        },
        {
          src: `${I}/hostel-3.jpg`,
          alt: "A hostel room with two sets of bunk beds and new mattresses, a storage locker, and curtained windows",
          caption: "New mattresses throughout the residence."
        },
        {
          src: `${I}/hostel-4.jpg`,
          alt: "A spacious hostel room with new flooring, a dressing table, storage lockers, and a bunk bed",
          caption: "A conducive living environment, designed around student wellbeing."
        }
      ],
      placeholder: {
        label: "Photos needed",
        brief:
          "Add the refurbished hostel room photos to public/newsletter/ipoh/web/."
      },
      caption: "A more comfortable and secure place to live."
    },

    {
      id: "wifi",
      navLabel: "Wi-Fi",
      kicker: "Digital infrastructure",
      heading: "Stronger Wi-Fi, Better Connectivity on Campus",
      standfirst:
        "Campus internet speed has doubled since February 2026, with wider coverage to follow.",
      body: [
        "Enhanced campus connectivity with a **100% increase in bandwidth**, doubling internet speed from **1 Gbps to 2 Gbps** since February 2026."
      ],
      notes: [
        {
          kind: "next",
          text: "A cloud-managed Wi-Fi controller and more access points, for wider coverage within the college."
        },
        { kind: "target", text: "Q2 2027." },
        {
          kind: "result",
          text: "Faster and stable Wi-Fi wherever you are on campus."
        }
      ],
      images: [
        {
          src: `${I}/wifi.png`,
          fit: "contain",
          alt: "Stronger Wi-Fi, Better Connectivity poster for UNITAR College Ipoh: internet bandwidth doubled from 1GB to 2GB, a 100% increase in speed, with a cloud-managed Wi-Fi controller and more access points targeted for Q2 2027",
          caption:
            "Bandwidth doubled from 1GB to 2GB — with wider coverage targeted for Q2 2027."
        }
      ],
      placeholder: {
        label: "Poster needed",
        brief:
          "Add the 'Stronger Wi-Fi, Better Connectivity' poster to public/newsletter/ipoh/web/."
      },
      caption: "Double the bandwidth, across campus."
    },

    {
      id: "student-life",
      navLabel: "Student Life",
      kicker: "Student experience",
      heading: "Vibrant Student Life",
      standfirst:
        "Campus life is about more than just academics — starting with a reimagined Clubs & Societies Open Day.",
      body: [
        "We have reimagined our **Clubs & Societies Open Day**, giving students opportunities to:"
      ],
      bullets: [
        "Discover new interests.",
        "Build friendships.",
        "Develop leadership skills.",
        "Be part of a vibrant campus community."
      ],
      notes: [
        {
          kind: "result",
          text: "Students benefit from opportunities for personal growth, leadership development, social engagement, wellbeing, and a vibrant university experience beyond the classroom."
        }
      ],
      images: [
        {
          src: `${I}/orientation.jpg`,
          fit: "contain",
          alt: "Ipoh Connect poster — new students orientation crossed with UNITAR Club Day at Kia Hall, Ipoh on 22 July 2026, in collaboration with UNITAR Titanz, Bunyi Society, IT Club, Nexus Club, EduVibes, E-Sec Club, ICS, CCS and GPS",
          caption:
            "Ipoh Connect: orientation and Club Day together — connect, explore, belong."
        },
        {
          src: `${I}/club-day-4.jpg`,
          fit: "contain",
          alt: "EduVibe Club Day poster — 22 July 2026 at UNITAR Ipoh, venue DECE 2, with a henna booth, kunafa marshmallow, and a spin-the-wheel educational game",
          caption:
            "EduVibe's booths: henna, kunafa marshmallow, and spin the wheel."
        },
        {
          src: `${I}/club-day-5.jpg`,
          fit: "contain",
          alt: "Bunyi Society Club Day poster — uniting spirits through music, 22 July 2026 at the studio, with drum, tone, mic and guitar challenges",
          caption:
            "Bunyi Society: \"it's more than music, it's our community.\""
        },
        {
          src: `${I}/club-day-1.jpg`,
          fit: "contain",
          alt: "UNITAR College Ipoh Club Day 2026 poster from Nexus Club — a spray-can mural activity based on the UNITAR 35 Bangkit Bersama design",
          caption:
            "Nexus Club's Bangkit Bersama mural: create, express, inspire."
        },
        {
          src: `${I}/club-day-2.jpg`,
          fit: "contain",
          alt: "IT Club Club Day poster — 22 July 2026 in Lab 3, with computer games, cup stacking, crossword puzzles, PC building, and car fixing",
          caption: "IT Club: learn, play, build, connect."
        },
        {
          src: `${I}/club-day-3.jpg`,
          fit: "contain",
          alt: "E-Secretaryship Club Day poster — 22 July 2026 at venue B-0-1-0-2, with chocolate pani puri, sprite drinks, games and prizes",
          caption: "E-Secretaryship Club: fun, food, friends, memories."
        }
      ],
      placeholder: {
        label: "Posters needed",
        brief:
          "Add the Club Day and Ipoh Connect posters to public/newsletter/ipoh/web/."
      },
      caption: "A campus community worth being part of."
    },

    {
      id: "transport",
      navLabel: "Transport",
      kicker: "Getting to campus",
      heading: "Transportation to campus",
      standfirst:
        "More frequent buses, and a new scheduled van service for the male hostel.",
      body: [
        "To improve accessibility and convenience, we have expanded our transportation services by:"
      ],
      bullets: [
        "Increasing the frequency of bus trips between the hostel and campus.",
        "Introducing scheduled van services for students staying at the male hostel."
      ],
      notes: [
        {
          kind: "result",
          text: "More convenient, reliable, and accessible transportation to campus."
        }
      ],
      images: [
        {
          src: `${I}/bus-schedule.png`,
          fit: "contain",
          alt: "Bus Trip Schedule (Female) between UNITAR Residence and UNITAR College Ipoh — four trips daily at 8:15 AM, 12:45 PM, 1:00 PM and 5:30 PM",
          caption:
            "The shuttle bus schedule between UNITAR Residence and campus — four trips a day."
        },
        {
          src: `${I}/van-schedule.png`,
          fit: "contain",
          alt: "Van Trip Schedule (Male) between Cherry Apartment & Taman Lim and UNITAR College Ipoh — four trips daily at 8:50 AM, 12:30 PM, 12:45 PM and 5:40 PM",
          caption:
            "The new van service for male students, from Cherry Apartment and Taman Lim."
        }
      ],
      placeholder: {
        label: "Schedules needed",
        brief:
          "Add the bus and van trip schedule posters to public/newsletter/ipoh/web/."
      },
      caption: "Getting to campus, made easier."
    },

    {
      id: "lounge",
      navLabel: "Lounge",
      kicker: "Campus spaces",
      heading: "Student lounge",
      standfirst: "Your favourite spot on campus just got better.",
      body: [
        "The student lounge has been refurbished, offering a conducive environment for studying, socialising, and relaxing."
      ],
      notes: [
        {
          kind: "next",
          text: "A complete makeover of the student lounge, including board games and other indoor recreational facilities."
        },
        {
          kind: "result",
          text: "A welcoming place where students can connect, unwind, and enjoy campus life."
        }
      ],
      images: [
        {
          src: `${I}/student-lounge.jpg`,
          alt: "The refurbished student lounge, with round white tables, orange and white chairs, an orange banquette sofa, and a black feature wall with white circles",
          caption:
            "The refurbished student lounge — for studying, socialising, and relaxing."
        }
      ],
      placeholder: {
        label: "Photo needed",
        brief:
          "Add the refurbished student lounge photo to public/newsletter/ipoh/web/."
      },
      caption: "Somewhere to connect, unwind, and enjoy campus life."
    }
  ],

  closing: {
    eyebrow: "Keep talking to us",
    heading:
      "Your September 2025 survey responses helped us shape these for our student community.",
    body: "Thank you for your support! In turn, each response we receive from the upcoming survey guides us to make further improvements. Thank you once again for your participation, UNITARians!",
    signature: "Student Experience Department"
  }
};
