# Merge Two Sorted Lists

## Metadata

- Category: DSA
- Difficulty: Easy
- Frequency: somewhat_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Given two sorted linked lists, merge them into one sorted linked list.

## What it is really asking

- Pointer manipulation discipline.
- Invariant-driven iteration.

## Input/Output expectations

- Input: two sorted list heads.
- Output: head of merged sorted list.

## Constraints and edge cases

- One list empty.
- All values identical.
- One list exhausted early.

## Solution paths

1. Iterative with dummy head.
2. Recursive merge.

## Recommended baseline approach

Use iterative merge with a dummy head for clarity and fewer pointer bugs.

## Complexity

- Time: O(n+m)
- Space: O(1) iterative

## Common pitfalls

- Losing tail pointer.
- Forgetting to attach remainder list.

## Follow-up variants

- Merge k sorted lists.

## Practice checklist

- [ ] Explain list invariant at every iteration.
- [ ] Implement without null-pointer mistakes.

## Related HubSpot sightings

- Canonical question: Merge Two Sorted Lists.
- Experience phrasing also appears as "merge two sorted lists up to k elements."
