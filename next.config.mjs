/**
 * Campus slugs from lib/newsletter/campuses.ts, kept here as a plain list so
 * the short links (/uuckl -> /newsletter/uuckl) work for every campus.
 * Unpublished campuses land on the "not published yet" page, not a bare 404.
 */
const campusSlugs = [
  "uiu",
  "uuckl",
  "uc-ipoh",
  "uc-johor-bahru",
  "uc-kota-bharu",
  "uc-kota-kinabalu",
  "uc-kuala-terengganu",
  "uc-kuantan",
  "uc-kuching",
  "uc-melaka",
  "uc-penang",
  "uc-sungai-petani"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: `/:campus(${campusSlugs.join("|")})`,
        destination: "/newsletter/:campus",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
