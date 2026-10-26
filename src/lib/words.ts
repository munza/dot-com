const WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

/** Spelled-out number for prose ("Fourteen years"); digits above twenty. */
export function numberWord(n: number, { capitalize = false } = {}): string {
  const word = WORDS[n] ?? String(n);
  return capitalize ? word[0]!.toUpperCase() + word.slice(1) : word;
}
