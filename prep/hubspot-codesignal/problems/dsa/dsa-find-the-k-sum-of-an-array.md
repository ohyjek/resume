# Find the K-Sum of an Array

## Metadata

- Category: DSA
- Difficulty: Hard
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Find the k-th largest subsequence sum from an integer array.

## What it is really asking

- Transforming sums into ordered state exploration.
- Heap-based best-first search.

## Input/Output expectations

- Input: integer array and k.
- Output: k-th largest subsequence sum.

## Constraints and edge cases

- Negative values.
- Large k.

## Solution paths

1. Max-sum transform + min-heap over state transitions.

## Recommended baseline approach

Use known heap-state formulation after converting to absolute-loss ordering.

## Complexity

- Time: O(n log n + k log k)
- Space: O(k)

## Common pitfalls

- Brute-forcing all subsequences.
- Incorrect state deduplication.

## Follow-up variants

- Return top-k sums, not only k-th.

## Practice checklist

- [ ] Explain transformation step clearly.
- [ ] Track state expansion correctness.

## Related HubSpot sightings

- Canonical question: Find the K-Sum of an Array.
