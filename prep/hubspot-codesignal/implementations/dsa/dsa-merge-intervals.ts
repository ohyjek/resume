/**
 * Merge Intervals
 *
 * Sort by start, then linearly merge overlapping intervals.
 */

export type Interval = [number, number];
export type MergeIntervalsInput = Interval[];
export type MergeIntervalsOutput = Interval[];

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

    // Overlap includes touching boundaries, e.g. [1,4] and [4,5].
    if (nextStart <= lastEnd) {
      merged[merged.length - 1] = [lastStart, Math.max(lastEnd, nextEnd)];
      continue;
    }

    merged.push([nextStart, nextEnd]);
  }

  return merged;
}
