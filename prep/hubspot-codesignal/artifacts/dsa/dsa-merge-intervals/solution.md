# Problem Solution Artifact

## Problem Metadata

- Problem title: Merge Intervals
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-intervals.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Sort intervals by start time, then sweep once while maintaining the last merged interval in the result.
For each next interval, compare its start to the current merged end:

- If `nextStart <= currentEnd`, they overlap (including touching boundaries), so extend the current merged end to `max(currentEnd, nextEnd)`.
- Otherwise, push a new interval into the result and continue.

This works because sorting guarantees any possible overlap for the current interval can only come from intervals that appear next in order.

## Why This Works

- Correctness argument:
  - After processing the first `i` sorted intervals, `result` contains exactly the merged, non-overlapping coverage of those `i` intervals.
  - When the next interval overlaps the last merged one, merging by max end preserves coverage and avoids duplicates.
  - When it does not overlap, no earlier interval can overlap it (due to sort order), so starting a new merged block is safe.
- Key invariant(s):
  - `result` stays sorted by start.
  - `result` stays non-overlapping.
  - The last interval in `result` is the only candidate that can overlap the next sorted interval.
- Why edge cases are covered:
  - Empty input returns empty output.
  - Single interval returns unchanged.
  - Fully nested intervals collapse into the outer interval via max-end merge.
  - Touching boundaries (e.g. `[1,4]` and `[4,5]`) are merged by `<=` overlap check.

## Why This Is Appropriate

- Interview constraints fit:
  - `O(n log n)` from sorting is standard and expected for unsorted intervals.
  - Single linear pass after sort is easy to explain and implement bug-free.
- Tradeoffs vs alternatives:
  - Faster than repeated pairwise merge attempts (`O(n^2)` worst case).
  - Uses `O(n)` output space (or less if doing in-place compaction), which is acceptable for interview constraints.
- When to choose a different strategy:
  - If intervals are already sorted by start, skip sorting and run `O(n)` sweep.
  - For dynamic insert/query workloads, interval trees or segment structures may be better than re-merging arrays each time.

## Complexity

- Time: `O(n log n)` (sort) + `O(n)` (sweep) => `O(n log n)`.
- Space: `O(n)` for output (excluding input copy details).

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

