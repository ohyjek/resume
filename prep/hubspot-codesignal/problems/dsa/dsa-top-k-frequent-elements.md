# Top K Frequent Elements

## Metadata

- Category: DSA
- Difficulty: Medium
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Return the k most frequent values in an array.

## What it is really asking

- Frequency counting.
- Heap or bucket optimization.

## Input/Output expectations

- Input: array and integer k.
- Output: k most frequent elements.

## Constraints and edge cases

- Ties in frequency.
- k equals unique count.

## Solution paths

1. Hash map + min-heap size k.
2. Bucket sort by frequency.

## Recommended baseline approach

Hash map frequencies then use a size-k min-heap.

## Complexity

- Time: O(n log k)
- Space: O(n)

## Common pitfalls

- Incorrect heap comparator.
- Mishandling ties.

## Follow-up variants

- Top k frequent words.

## Practice checklist

- [ ] Explain when bucket sort is better.
- [ ] Return exactly k elements.

## Related HubSpot sightings

- Canonical question: Top K Frequent Elements.
