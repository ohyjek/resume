# Problem Solution Artifact

## Problem Metadata

- Problem title: Merge Two Sorted Lists
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-two-sorted-lists.md
- Difficulty: Easy
- Last-updated: 2026-03-07

## Final Solution

Use an iterative two-pointer merge with a dummy head node.

Maintain a `tail` pointer to the last node in the merged list and compare the current nodes from each input list (`list1` and `list2`). Attach the smaller node to `tail.next`, advance that list pointer, and then advance `tail`. When one list runs out, append the remaining nodes from the other list directly.

This avoids value copying and reuses existing nodes, which keeps memory overhead minimal and logic interview-friendly.

## Why This Works

- Correctness argument:
  - At each step, we append the smallest available head among the two remaining sublists, so the merged prefix is always sorted.
- Key invariant(s):
  - Before every iteration, `dummy.next ... tail` is a fully sorted merge of all nodes already removed from the heads of `list1`/`list2`.
  - `list1` and `list2` always point to the first unmerged nodes of their respective original lists.
- Why edge cases are covered:
  - If one list is empty initially, we skip the loop and return the other list via the remainder attach.
  - If values are equal, choosing either side first still preserves sorted order.
  - If one list is exhausted early, attaching the remainder is valid because each input list is already sorted.

## Why This Is Appropriate

- Interview constraints fit:
  - Single pass through all nodes with simple pointer updates and no extra data structures.
- Tradeoffs vs alternatives:
  - Iterative merge avoids recursion depth risk and stack overhead compared with recursive merge.
- When to choose a different strategy:
  - Use recursion only when interviewer explicitly prefers recursive style and list sizes are small enough to avoid stack concerns.

## Complexity

- Time:
  - `O(n + m)`, where `n` and `m` are the list lengths.
- Space:
  - `O(1)` extra space (ignoring input nodes).

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

