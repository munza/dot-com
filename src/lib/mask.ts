/**
 * Partly hidden names: "▮" in a title is a hidden letter. Content files store only the masked
 * form, so the full name never reaches the repo or the built pages.
 */
export const MASK = "▮";

/** Text runs and runs of hidden letters, in order: "Ku▮▮▮" → { text: "Ku" }, { hidden: 3 }. */
export function maskParts(title: string): { text: string; hidden: number }[] {
  return [...title.matchAll(/▮+|[^▮]+/g)].map(([part]) =>
    part.startsWith(MASK) ? { text: "", hidden: part.length } : { text: part, hidden: 0 },
  );
}
