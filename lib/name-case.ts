// Title-cases ALL-CAPS Malaysian names for display/storage while preserving the
// conventions around common name particles:
//   - A/L, A/P, S/O, D/O (and anything containing "/") stay fully UPPERCASE
//   - bin, binti, bt, bte are lowercased (standard Malay style)
//   - the "@" alias marker is preserved
//   - every other word is Capitalised, including the part after a hyphen
//     (e.g. ABDUL-RAHMAN -> Abdul-Rahman), while letters after an apostrophe
//     stay lower (JA'AFEAR -> Ja'afear)

const LOWER_PARTICLES = new Set(["bin", "binti", "bt", "bte"]);

export function titleCaseName(raw: string): string {
  if (!raw) return "";

  return raw
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (word.includes("/")) return word.toUpperCase(); // A/L, A/P, S/O, D/O
      if (word === "@") return "@";

      const lower = word.toLowerCase();
      if (LOWER_PARTICLES.has(lower)) return lower;

      return lower.replace(/(^|-)([a-z])/g, (_, sep, ch) => sep + ch.toUpperCase());
    })
    .join(" ");
}
