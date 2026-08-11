import type { CampusEntry, CampusNewsletter } from "./types";
import { uiu } from "./content/uiu";

/**
 * Every UNITAR campus that receives an edition of the student newsletter.
 *
 * To publish a campus: write its content file under `content/`, import it here,
 * and set it as that entry's `newsletter`. Everything else — the route, the
 * hub card, the campus switcher — follows automatically.
 */
export const campuses: CampusEntry[] = [
  {
    slug: "uiu",
    name: "UIU",
    fullName: "UNITAR International University",
    location: "Kelana Jaya, Selangor",
    newsletter: uiu
  },
  {
    slug: "uuckl",
    name: "UUCKL",
    fullName: "UNITAR University College Kuala Lumpur",
    location: "Kuala Lumpur",
    newsletter: null
  },
  {
    slug: "uc-ipoh",
    name: "UC Ipoh",
    fullName: "UNITAR College Ipoh",
    location: "Ipoh, Perak",
    newsletter: null
  },
  {
    slug: "uc-johor-bahru",
    name: "UC Johor Bahru",
    fullName: "UNITAR College Johor Bahru",
    location: "Johor Bahru, Johor",
    newsletter: null
  },
  {
    slug: "uc-kota-bharu",
    name: "UC Kota Bharu",
    fullName: "UNITAR College Kota Bharu",
    location: "Kota Bharu, Kelantan",
    newsletter: null
  },
  {
    slug: "uc-kota-kinabalu",
    name: "UC Kota Kinabalu",
    fullName: "UNITAR College Kota Kinabalu",
    location: "Kota Kinabalu, Sabah",
    newsletter: null
  },
  {
    slug: "uc-kuala-terengganu",
    name: "UC Kuala Terengganu",
    fullName: "UNITAR College Kuala Terengganu",
    location: "Kuala Terengganu, Terengganu",
    newsletter: null
  },
  {
    slug: "uc-kuantan",
    name: "UC Kuantan",
    fullName: "UNITAR College Kuantan",
    location: "Kuantan, Pahang",
    newsletter: null
  },
  {
    slug: "uc-kuching",
    name: "UC Kuching",
    fullName: "UNITAR College Kuching",
    location: "Kuching, Sarawak",
    newsletter: null
  },
  {
    slug: "uc-melaka",
    name: "UC Melaka",
    fullName: "UNITAR College Melaka",
    location: "Melaka",
    newsletter: null
  },
  {
    slug: "uc-penang",
    name: "UC Penang",
    fullName: "UNITAR College Penang",
    location: "Penang",
    newsletter: null
  },
  {
    slug: "uc-sungai-petani",
    name: "UC Sungai Petani",
    fullName: "UNITAR College Sungai Petani",
    location: "Sungai Petani, Kedah",
    newsletter: null
  }
];

/** Campuses whose update is live. */
export const publishedCampuses = campuses.filter(
  (c): c is CampusEntry & { newsletter: CampusNewsletter } =>
    c.newsletter !== null
);

export function getCampus(slug: string): CampusEntry | undefined {
  return campuses.find((c) => c.slug === slug);
}

export function getNewsletter(slug: string): CampusNewsletter | null {
  return getCampus(slug)?.newsletter ?? null;
}
