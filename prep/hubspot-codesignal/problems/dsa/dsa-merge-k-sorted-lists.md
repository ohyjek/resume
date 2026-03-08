# Merge k Sorted Lists

## Metadata

- Category: DSA
- Difficulty: Hard
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Merge k sorted linked lists into one sorted linked list.

## What it is really asking

- Priority queue usage.
- Multiway merge strategy.

## Input/Output expectations

- Input: list of sorted linked-list heads.
- Output: merged sorted list head.

## Constraints and edge cases

- Empty input.
- Many short lists.

## Solution paths

1. Min-heap by node value.
2. Divide-and-conquer pairwise merge.

## Recommended baseline approach

Use a min-heap to always pull the next smallest node.

## Complexity

- Time: O(N log k)
- Space: O(k)

## Common pitfalls

- Forgetting to push `next` node after pop.

## Follow-up variants

- Merge k sorted arrays.

## Practice checklist

- [ ] State `N` vs `k` complexity clearly.
- [ ] Avoid pointer cycles.

## Related HubSpot sightings

- Canonical question: Merge k Sorted Lists.
