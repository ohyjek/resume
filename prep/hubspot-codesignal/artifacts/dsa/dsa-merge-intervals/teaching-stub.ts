/**
 * Teaching Stub (DSA)
 *
 * Problem: Merge Intervals
 * Category: DSA
 */

export type Interval = [number, number];
export type MergeIntervalsInput = Interval[];
export type MergeIntervalsOutput = Interval[];

/**
 * Learning goals
 * 1) Use sort + sweep to merge ranges efficiently.
 * 2) Maintain the invariant that merged output stays sorted and non-overlapping.
 * 3) Apply the correct overlap rule for touching boundaries.
 */
export function mergeIntervals(input: MergeIntervalsInput): MergeIntervalsOutput {
  if (input.length === 0) {
    return [];
  }

  const sorted: Interval[] = [...input].sort((left, right) => left[0] - right[0]);
  const merged: Interval[] = [[sorted[0][0], sorted[0][1]]];

  for (let index = 1; index < sorted.length; index += 1) {
    const [nextStart, nextEnd] = sorted[index];
    const lastMerged = merged[merged.length - 1];
    const [lastStart, lastEnd] = lastMerged;

    if (nextStart <= lastEnd) {
      merged[merged.length - 1] = [lastStart, Math.max(lastEnd, nextEnd)];
      continue;
    }

    merged.push([nextStart, nextEnd]);
  }

  return merged;
}

/**
 * Suggested tests
 * - [[1,3],[2,6],[8,10],[15,18]] -> [[1,6],[8,10],[15,18]]
 * - [[1,4],[4,5]] -> [[1,5]] (touching boundaries)
 * - [[1,10],[2,3],[4,6]] -> [[1,10]] (nested intervals)
 * - [] -> []
 */

