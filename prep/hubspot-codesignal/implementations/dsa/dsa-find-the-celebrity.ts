/**
 * Find the Celebrity
 *
 * Candidate elimination in one pass, then candidate verification.
 */

export interface FindTheCelebrityInput {
  n: number;
  knows: (a: number, b: number) => boolean;
}

export type FindTheCelebrityOutput = number;

/**
 * Returns the celebrity index, or -1 when no celebrity exists.
 *
 * Invariant during elimination:
 * after processing person i, every scanned non-candidate is guaranteed
 * not to be a celebrity.
 */
export function findTheCelebrity({
  n,
  knows,
}: FindTheCelebrityInput): FindTheCelebrityOutput {
  if (n <= 0) {
    return -1;
  }

  let candidate = 0;
  for (let person = 1; person < n; person += 1) {
    if (knows(candidate, person)) {
      candidate = person;
    }
  }

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

