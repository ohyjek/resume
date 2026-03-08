/**
 * Maximum Number of Occurrences of a Substring
 *
 * Counts valid substrings using a fixed-size sliding window at minSize.
 */

export type MaximumNumberOfOccurrencesOfASubstringInput = {
  s: string;
  maxLetters: number;
  minSize: number;
  maxSize: number;
};

export type MaximumNumberOfOccurrencesOfASubstringOutput = number;

/**
 * Why minSize is enough:
 * Any longer valid substring contains a minSize prefix/sub-window.
 * The longer substring cannot appear more often than that minSize window.
 */
export function maximumNumberOfOccurrencesOfASubstring(input: MaximumNumberOfOccurrencesOfASubstringInput): MaximumNumberOfOccurrencesOfASubstringOutput {
  const { s, maxLetters, minSize } = input;

  if (minSize <= 0 || s.length < minSize || maxLetters <= 0) {
    return 0;
  }

  const charCounts = new Map<string, number>();
  const substringCounts = new Map<string, number>();
  let left = 0;
  let distinctCount = 0;
  let best = 0;

  for (let right = 0; right < s.length; right += 1) {
    const addChar = s[right];
    const priorAddCount = charCounts.get(addChar) ?? 0;
    if (priorAddCount === 0) {
      distinctCount += 1;
    }
    charCounts.set(addChar, priorAddCount + 1);

    while (right - left + 1 > minSize) {
      const removeChar = s[left];
      const remaining = (charCounts.get(removeChar) ?? 0) - 1;
      if (remaining === 0) {
        charCounts.delete(removeChar);
        distinctCount -= 1;
      } else {
        charCounts.set(removeChar, remaining);
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
