// All copy for the Introduction to Bachelor's RSVP page lives here so it can be
// edited in one place.

export const EVENT = {
  name: "Introduction to Bachelor's",
  eyebrow: "You're Invited",
  audience: "For UNITAR Foundation & Diploma Graduates",
  subtitle: "Know your options before you choose your next programme.",
  description:
    "A special session for UNITAR Foundation and Diploma graduates to hear directly from Bachelor's Programme Leaders, understand your available progression options and ask the questions you need answered before making your decision.",

  date: "Saturday, 15 August 2026",
  time: "9:30 am – 10:30 am",
  venue: "Online via Microsoft Teams",
  platform: "Microsoft Teams",

  // Set to false to close RSVPs and show a closed notice instead of the form.
  rsvpOpen: true,

  benefits: [
    {
      icon: "🎓",
      title: "Hear From Programme Leaders",
      description:
        "Listen to talks from the different faculty Programme Leaders and get the latest information about the Bachelor's programmes you are considering."
    },
    {
      icon: "💬",
      title: "Ask Them Anything",
      description:
        "Ask about subjects, study expectations, career pathways, programme differences, or what you can do after completing the Bachelor's degree."
    },
    {
      icon: "🧭",
      title: "Still Not Sure? That's Okay.",
      description:
        "If you are still deciding which programme to join, attend the faculty breakout sessions, compare your options and ask questions before choosing."
    }
  ],

  offers: [
    {
      title: "20% Discount",
      description:
        "Secure the progression discount available for eligible students joining the September intake.",
      accent: true
    },
    {
      title: "Free Credit Transfer",
      description:
        "Available for eligible Diploma students, subject to programme and credit-transfer requirements.",
      accent: false
    },
    {
      title: "Fast Track Application",
      description:
        "No need to wait for your final results — submit your COL to your EC to start the application process.",
      accent: false
    }
  ],

  agenda: [
    {
      minutes: "5",
      title: "Introduction",
      description: "Welcome, session flow and what you can expect."
    },
    {
      minutes: "10",
      title: "Offers & Promotions",
      description:
        "Understand the 20% discount, credit-transfer benefit and fast-track application process."
    },
    {
      minutes: "30",
      title: "Breakout by Faculty",
      description:
        "Join the faculty you are interested in and hear directly from the Programme Leaders."
    },
    {
      minutes: "15",
      title: "Q&A",
      description:
        "Ask your questions and clarify anything before deciding on your next programme."
    }
  ],

  rsvpChecklist: [
    "Hear directly from Bachelor's Programme Leaders.",
    "Understand the September progression offers available to you.",
    "Ask questions before making your programme decision.",
    "Receive the Microsoft Teams joining link at your registered email."
  ]
};
