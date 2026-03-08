# Problem Solution Artifact

## Problem Metadata

- Problem title: Merge k Sorted Lists
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-k-sorted-lists.md
- Difficulty: Hard
- Last-updated: 2026-03-07

## Final Solution

Use a min-heap (priority queue) seeded with the head of each non-empty list. Repeatedly pop the smallest node, append it to the output list, and if that node has a `next`, push `next` into the heap. Continue until the heap is empty.

Interview framing: this is a k-way merge where the heap always tracks the smallest unmerged candidate from each list.

## Why This Works

- Correctness argument: every pop returns the globally smallest remaining node because the heap contains exactly one frontier node from each list and is ordered by node value. Appending popped nodes therefore preserves non-decreasing order in the merged list.
- Key invariant(s): (1) heap contains the current smallest not-yet-emitted node from each list that still has remaining elements; (2) output list is sorted and contains exactly the nodes popped so far.
- Why edge cases are covered: empty `lists` or all-null heads return `null`; single non-empty list is returned in sorted order naturally; duplicate values are handled because heap ordering allows ties and still emits valid sorted output.

## Why This Is Appropriate

- Interview constraints fit: it achieves the expected `O(N log k)` for `N` total nodes across `k` lists, which is optimal for comparison-based k-way merge in this setting.
- Tradeoffs vs alternatives: divide-and-conquer pairwise merge also gives `O(N log k)` but may be simpler without custom heap utilities in some languages; heap is usually easier to narrate as "always pick next smallest."
- When to choose a different strategy: choose pairwise merge if a robust merge-two-lists helper already exists and you want minimal custom data structures.

## Complexity

- Time: `O(N log k)` where `N` is total nodes and `k` is the number of lists.
- Space: `O(k)` auxiliary heap space (excluding output linkage, which reuses existing nodes).

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

