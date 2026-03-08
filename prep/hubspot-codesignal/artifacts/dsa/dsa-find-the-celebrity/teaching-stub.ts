/**
 * Teaching Stub (DSA)
 *
 * Problem: Find the Celebrity
 * Category: DSA
 *
 * This scaffold is intentionally problem-specific.
 * Replace placeholder types with concrete ones from the prompt.
 */

export interface FindTheCelebrityInput {
  n: number;
  knows: (a: number, b: number) => boolean;
}
export type FindTheCelebrityOutput = number;

/**
 * Learning goals
 * 1) Identify the core pattern used by this problem.
 * 2) Maintain the right invariant while iterating or recursing.
 * 3) Explain complexity and edge-case behavior confidently.
 */
export function findTheCelebrity(input: FindTheCelebrityInput): FindTheCelebrityOutput {
  const { n, knows } = input;
  if (n <= 0) {
    return -1;
  }

  // Elimination invariant:
  // after scanning person i, all scanned non-candidates are disqualified.
  let candidate = 0;
  for (let person = 1; person < n; person += 1) {
    if (knows(candidate, person)) {
      candidate = person;
    }
  }

  // Verification is required because elimination leaves a possible candidate,
  // not a guaranteed one.
  for (let person = 0; person < n; person += 1) {
    if (person === candidate) {
      continue;
    }

    if (knows(candidate, person) || !knows(person, candidate)) {
      return -1;
    }
  }

  return candidate;
}

/**
 * Suggested tests
 * - Canonical sample case
 * - Smallest valid input
 * - Duplicate-heavy case
 * - Constraint-limit case
 * - Tricky edge case discussed in reasoning.md
 */

