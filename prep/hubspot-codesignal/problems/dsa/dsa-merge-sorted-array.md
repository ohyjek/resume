# Merge Sorted Array

## Metadata

- Category: DSA
- Difficulty: Easy
- Frequency: very_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Given two sorted arrays, merge the second into the first while preserving sorted order.

## What it is really asking

- Two-pointer fundamentals.
- Careful in-place write strategy and boundary handling.

## Input/Output expectations

- Input: two sorted arrays and valid lengths.
- Output: merged sorted array.

## Constraints and edge cases

- Empty one side.
- Duplicates.
- Negative values.

## Solution paths

1. Extra buffer merge.
2. In-place reverse merge.

## Recommended baseline approach

Use reverse two-pointers from the end for in-place correctness.

## Complexity

- Time: O(m+n)
- Space: O(1) in-place

## Common pitfalls

- Overwriting unread values.
- Off-by-one indices.

## Follow-up variants

- Merge K sorted arrays.

## Practice checklist

- [ ] Implement in-place reverse merge correctly.
- [ ] Explain why reverse direction avoids overwrite.

## Related HubSpot sightings

- Canonical question: Merge Sorted Array.
