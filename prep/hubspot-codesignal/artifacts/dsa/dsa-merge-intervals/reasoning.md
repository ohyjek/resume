# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Merge Intervals
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-intervals.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.
   - We are given intervals `[start, end]` and must return a reduced list where any overlapping ranges are combined.
2. Identify constraints and edge cases.
   - Input may be empty, contain one interval, include nested intervals, or intervals that just touch at boundaries.
3. Enumerate candidate approaches.
   - Brute force repeatedly merging pairs until stable.
   - Sort by start then do one linear pass.
4. Compare tradeoffs and reject weaker options.
   - Repeated pairwise merging can degrade to `O(n^2)`.
   - Sorting once gives a predictable `O(n log n)` and simpler correctness reasoning.
5. Select baseline strategy and justify.
   - Sort by start, initialize result with the first interval, then compare each next interval with the last merged one.
6. Outline implementation plan.
   - Return early for empty input.
   - Sort ascending by start.
   - Push first interval to result.
   - For each next interval:
     - If `nextStart <= lastEnd`, merge by updating `lastEnd = max(lastEnd, nextEnd)`.
     - Else push a new interval.
7. Dry run with representative examples.
   - Input: `[[1,3],[2,6],[8,10],[15,18]]`
   - Sorted stays same; merge first two -> `[[1,6],[8,10],[15,18]]`.
   - Input: `[[1,4],[4,5]]`
   - Boundary touch merges with `<=` -> `[[1,5]]`.
8. Confirm complexity and failure modes.
   - Time `O(n log n)` from sort, sweep `O(n)`.
   - Space `O(n)` output.
   - Main failure mode is wrong overlap check (`<` vs `<=`) or mutating wrong interval reference.

## Decision Log

- Most important insight:
  - After sorting, only the most recently merged interval can overlap the current interval.
- Rejected approach and reason:
  - Repeated scanning and merging without sorting was rejected due to `O(n^2)` behavior and higher bug surface.
- Potential follow-up optimization:
  - If caller guarantees sorted input, remove sort step and run a pure `O(n)` sweep.

## Interview Narration Script

"I would sort intervals by start first so overlap checks are local. Then I keep a result list of merged intervals and compare each interval to the last merged one. If they overlap, I extend the end with `max`; if not, I start a new interval. The invariant is that result is always sorted and non-overlapping for everything processed so far. This handles nested and touching intervals naturally, and the complexity is `O(n log n)` time and `O(n)` space."

