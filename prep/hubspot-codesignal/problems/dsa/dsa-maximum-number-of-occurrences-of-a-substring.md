# Maximum Number of Occurrences of a Substring

## Metadata

- Category: DSA
- Difficulty: Medium
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Find the max frequency of any valid substring given size and character constraints.

## What it is really asking

- Sliding window with counting.
- Constraint-based pruning.

## Input/Output expectations

- Input: string plus min/max size and unique-char limit.
- Output: maximum occurrence count.

## Constraints and edge cases

- Repeated characters.
- Tight unique-char bounds.

## Solution paths

1. Fixed-size sliding window + hash frequency.

## Recommended baseline approach

Use a fixed window at minimum allowed size and count valid substrings.

## Complexity

- Time: O(n)
- Space: O(n) substring map

## Common pitfalls

- Using variable window unnecessarily.
- Expensive substring handling.

## Follow-up variants

- Return substring itself, not just count.

## Practice checklist

- [ ] Justify why min-size window is enough.
- [ ] Implement frequency map cleanly.

## Related HubSpot sightings

- Canonical question: Maximum Number of Occurrences of a Substring.
