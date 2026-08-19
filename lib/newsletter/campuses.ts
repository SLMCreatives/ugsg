import type { CampusEntry, CampusNewsletter } from "./types";
import { uiu } from "./content/uiu";
import { uuckl } from "./content/uuckl";
import { ucPenang } from "./content/uc-penang";
import { ucIpoh } from "./content/uc-ipoh";
import { ucSungaiPetani } from "./content/uc-sungai-petani";
import { ucKotaBharu } from "./content/uc-kota-bharu";
import { ucKualaTerengganu } from "./content/uc-kuala-terengganu";
import { ucKuantan } from "./content/uc-kuantan";
import { ucMelaka } from "./content/uc-melaka";
import { ucJohorBahru } from "./content/uc-johor-bahru";
import { ucKuching } from "./content/uc-kuching";
import { ucKotaKinabalu } from "./content/uc-kota-kinabalu";

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
    newsletter: uuckl
  },
  {
    slug: "uc-ipoh",
    name: "UC Ipoh",
    fullName: "UNITAR College Ipoh",
    location: "Ipoh, Perak",
    newsletter: ucIpoh
  },
  {
    slug: "uc-johor-bahru",
    name: "UC Johor Bahru",
    fullName: "UNITAR College Johor Bahru",
    location: "Johor Bahru, Johor",
    newsletter: ucJohorBahru
  },
  {
    slug: "uc-kota-bharu",
    name: "UC Kota Bharu",
    fullName: "UNITAR College Kota Bharu",
    location: "Kota Bharu, Kelantan",
    newsletter: ucKotaBharu
  },
  {
    slug: "uc-kota-kinabalu",
    name: "UC Kota Kinabalu",
    fullName: "UNITAR College Kota Kinabalu",
    location: "Kota Kinabalu, Sabah",
    newsletter: ucKotaKinabalu
  },
  {
    slug: "uc-kuala-terengganu",
    name: "UC Kuala Terengganu",
    fullName: "UNITAR College Kuala Terengganu",
    location: "Kuala Terengganu, Terengganu",
    newsletter: ucKualaTerengganu
  },
  {
    slug: "uc-kuantan",
    name: "UC Kuantan",
    fullName: "UNITAR College Kuantan",
    location: "Kuantan, Pahang",
    newsletter: ucKuantan
  },
  {
    slug: "uc-kuching",
    name: "UC Kuching",
    fullName: "UNITAR College Kuching",
    location: "Kuching, Sarawak",
    newsletter: ucKuching
  },
  {
    slug: "uc-melaka",
    name: "UC Melaka",
    fullName: "UNITAR College Melaka",
    location: "Melaka",
    newsletter: ucMelaka
  },
  {
    slug: "uc-penang",
    name: "UC Penang",
    fullName: "UNITAR College Penang",
    location: "Penang",
    newsletter: ucPenang
  },
  {
    slug: "uc-sungai-petani",
    name: "UC Sungai Petani",
    fullName: "UNITAR College Sungai Petani",
    location: "Sungai Petani, Kedah",
    newsletter: ucSungaiPetani
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
