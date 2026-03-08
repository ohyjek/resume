/**
 * Teaching Stub (DSA)
 *
 * Problem: Find the Celebrity
 * Category: DSA
 *
 * This scaffold is intentionally problem-specific.
 * Replace placeholder types with concrete ones from the prompt.
 */

export type KnowsFn = (a: number, b: number) => boolean;
export type FindTheCelebrityInput = {
  n: number;
  knows: KnowsFn;
};
export type FindTheCelebrityOutput = number;

/**
 * Learning goals
 * 1) Identify the core pattern used by this problem.
 * 2) Maintain the right invariant while iterating or recursing.
 * 3) Explain complexity and edge-case behavior confidently.
 */
export function findTheCelebrity(input: FindTheCelebrityInput): FindTheCelebrityOutput {
  const { n, knows } = input;
  if (n <= 0) return -1;

  // Elimination phase: keep only one plausible celebrity candidate.
  let candidate = 0;
  for (let person = 1; person < n; person += 1) {
    if (knows(candidate, person)) {
      candidate = person;
    }
  }

  // Verification phase: candidate must know nobody and be known by everybody.
  for (let person = 0; person < n; person += 1) {
    if (person === candidate) continue;
    if (knows(candidate, person) || !knows(person, candidate)) {
      return -1;
    }
  }

  return candidate;
}

/**
 * Suggested tests
 * - n = 0 returns -1
 * - n = 1 returns 0
 * - Valid celebrity exists and is returned
 * - No celebrity exists due to candidate knowing someone
 * - No celebrity exists due to someone not knowing candidate
 */

