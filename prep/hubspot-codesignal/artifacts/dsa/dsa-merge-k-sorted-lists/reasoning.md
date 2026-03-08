# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Merge k Sorted Lists
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-k-sorted-lists.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate the task as a k-way merge over sorted linked lists; output one sorted linked list head.
2. Identify key constraints: many lists may be empty, total nodes `N` can be large, and we should avoid repeatedly scanning all list heads.
3. Candidate A: repeatedly scan all current heads to find minimum (`O(Nk)`), easy but too slow when `k` is large.
4. Candidate B: min-heap of current heads (`O(N log k)`), standard multiway merge and strongly aligned with interview expectations.
5. Candidate C: divide-and-conquer pairwise merges (`O(N log k)`), also valid but less direct when explaining "next minimum" behavior.
6. Choose min-heap baseline for clarity: push each non-null head, pop smallest, append to result, push popped node's `next`.
7. Dry run mentally on three lists with overlapping values and duplicates; each pop is globally smallest because heap always stores frontier nodes.
8. Confirm complexity: each node is pushed/popped at most once, so `O(N log k)` time and `O(k)` heap space.

## Decision Log

- Most important insight: treat each list as a sorted stream and maintain one current candidate per stream in a min-heap.
- Rejected approach and reason: linear scan across all `k` list heads per emitted node, rejected due to `O(Nk)` worst-case runtime.
- Potential follow-up optimization: switch to divide-and-conquer merge if codebase already has a heavily optimized merge-two-lists utility.

## Interview Narration Script

I model this as a k-way merge. At any point, each list contributes at most one candidate node: its current head. If I keep those candidates in a min-heap, I can always extract the smallest next node in `log k` time. After I pop one node, I append it to the output and push its `next` node from the same list, preserving the frontier invariant. That guarantees sorted output because the heap top is always the global minimum among unmerged nodes. Since each of the `N` nodes is inserted and removed once, total time is `O(N log k)` with `O(k)` extra space.

