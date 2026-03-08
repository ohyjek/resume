# Merge Intervals

## Metadata

- Category: DSA
- Difficulty: Medium
- Frequency: somewhat_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Given intervals, merge all overlapping intervals and return the reduced set.

## What it is really asking

- Sorting + linear sweep.
- Correct overlap condition reasoning.

## Input/Output expectations

- Input: list of [start, end].
- Output: merged non-overlapping intervals.

## Constraints and edge cases

- Single interval.
- Fully nested intervals.
- Touching boundaries.

## Solution paths

1. Sort by start, then sweep.

## Recommended baseline approach

Sort by start and maintain a current merged interval.

## Complexity

- Time: O(n log n)
- Space: O(n) output

## Common pitfalls

- Wrong overlap condition.
- Mutating wrong interval reference.

## Follow-up variants

- Insert Interval.

## Practice checklist

- [ ] State merge condition clearly.
- [ ] Handle nested intervals correctly.

## Related HubSpot sightings

- Canonical question: Merge Intervals.
