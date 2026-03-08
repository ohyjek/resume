/**
 * Teaching Stub (DSA)
 *
 * Problem: Find the Celebrity
 * Category: DSA
 *
 * Core pattern: one-pass candidate elimination, then full verification.
 */

export type KnowsFn = (a: number, b: number) => boolean;
export type FindTheCelebrityInput = {
  n: number;
  knows: KnowsFn;
};
export type FindTheCelebrityOutput = number;

/**
 * Learning goals
 * 1) Explain why each comparison eliminates one person.
 * 2) Keep the elimination invariant: only one possible candidate survives.
 * 3) Verify both celebrity conditions without missing directed-edge mistakes.
 */
export function findTheCelebrity(input: FindTheCelebrityInput): FindTheCelebrityOutput {
  const { n, knows } = input;
  if (n <= 0) return -1;

  // Elimination pass: after index i, only `candidate` can still be a celebrity
  // among people [0..i].
  let candidate = 0;
  for (let i = 1; i < n; i += 1) {
    if (knows(candidate, i)) {
      candidate = i;
    }
  }

  // Verification pass: candidate must know nobody, and everybody must know candidate.
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
 * - Canonical sample case
 * - n = 1 returns 0
 * - Candidate from elimination fails verification
 * - No celebrity in dense graph
 * - Celebrity at highest index
 */

