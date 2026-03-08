# Meeting Rooms II

## Metadata

- Category: DSA
- Difficulty: Medium
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Given meeting intervals, compute the minimum number of rooms needed.

## What it is really asking

- Overlap counting.
- Heap or sweep-line pattern.

## Input/Output expectations

- Input: interval list.
- Output: minimum rooms.

## Constraints and edge cases

- No meetings.
- Fully overlapping schedule.

## Solution paths

1. Min-heap of end times.
2. Two sorted arrays (starts/ends).

## Recommended baseline approach

Min-heap of active meeting end times.

## Complexity

- Time: O(n log n)
- Space: O(n)

## Common pitfalls

- Using strict/loose overlap condition incorrectly.

## Follow-up variants

- Return actual room assignment.

## Practice checklist

- [ ] Explain heap invariant.
- [ ] Handle back-to-back meetings.

## Related HubSpot sightings

- Canonical question: Meeting Rooms II.
