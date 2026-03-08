/**
 * Teaching Stub (DSA)
 *
 * Problem: Maximum Number of Occurrences of a Substring
 * Category: DSA
 *
 * Core idea:
 * - Only windows of size minSize need to be counted.
 * - Track distinct character count with a sliding window.
 */

export type MaximumNumberOfOccurrencesOfASubstringInput = {
  s: string;
  maxLetters: number;
  minSize: number;
  maxSize: number;
};

export type MaximumNumberOfOccurrencesOfASubstringOutput = number;

/**
 * Learning goals
 * 1) Identify the core pattern used by this problem.
 * 2) Maintain the right invariant while iterating or recursing.
 * 3) Explain complexity and edge-case behavior confidently.
 */
export function maximumNumberOfOccurrencesOfASubstring(input: MaximumNumberOfOccurrencesOfASubstringInput): MaximumNumberOfOccurrencesOfASubstringOutput {
  const { s, maxLetters, minSize } = input;

  if (minSize <= 0 || s.length < minSize || maxLetters <= 0) {
    return 0;
  }

  const charCounts = new Map<string, number>();
  const substringCounts = new Map<string, number>();
  let distinctCount = 0;
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    const added = s[right];
    const prevAddedCount = charCounts.get(added) ?? 0;
    if (prevAddedCount === 0) {
      distinctCount += 1;
    }
    charCounts.set(added, prevAddedCount + 1);

    while (right - left + 1 > minSize) {
      const removed = s[left];
      const removedCount = (charCounts.get(removed) ?? 0) - 1;
      if (removedCount === 0) {
        charCounts.delete(removed);
        distinctCount -= 1;
      } else {
        charCounts.set(removed, removedCount);
      }
      left += 1;
    }

    if (right - left + 1 === minSize && distinctCount <= maxLetters) {
      const window = s.slice(left, right + 1);
      const nextCount = (substringCounts.get(window) ?? 0) + 1;
      substringCounts.set(window, nextCount);
      if (nextCount > best) {
        best = nextCount;
      }
    }
  }

  return best;
}

/**
 * Suggested tests
 * - s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4 => 2
 * - s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3 => 2
 * - s = "abcde", maxLetters = 2, minSize = 3, maxSize = 3 => 0
 * - s shorter than minSize => 0
 */

