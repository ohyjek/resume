export type KnowsFn = (a: number, b: number) => boolean;

/**
 * Returns the celebrity's index if one exists, otherwise -1.
 * A celebrity is known by everyone else and knows nobody else.
 */
export function findTheCelebrity(n: number, knows: KnowsFn): number {
  if (n <= 0) return -1;

  let candidate = 0;
  for (let person = 1; person < n; person += 1) {
    if (knows(candidate, person)) {
      candidate = person;
    }
  }

  for (let person = 0; person < n; person += 1) {
    if (person === candidate) continue;
    if (knows(candidate, person) || !knows(person, candidate)) {
      return -1;
    }
  }

  return candidate;
}
