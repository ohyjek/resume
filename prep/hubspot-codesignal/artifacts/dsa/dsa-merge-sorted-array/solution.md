# Problem Solution Artifact

## Problem Metadata

- Problem title: Merge Sorted Array
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-sorted-array.md
- Difficulty: Easy
- Last-updated: 2026-03-07

## Final Solution

Use three pointers from the end:

- `write = m + n - 1` points to where the next largest value should go in `nums1`.
- `i = m - 1` scans initialized values in `nums1`.
- `j = n - 1` scans values in `nums2`.

At each step, place the larger of `nums1[i]` and `nums2[j]` at `nums1[write]`, then move that pointer left. Continue until `j < 0` (all `nums2` values placed). If `i` is exhausted first, remaining `nums2` values are copied; if `j` is exhausted first, `nums1` is already correct.

## Why This Works

- Correctness argument: writing from right to left guarantees we only write into positions that are no longer needed as unread input, so no unprocessed value gets overwritten.
- Key invariant(s): after each iteration, `nums1[write+1 ... m+n-1]` contains the largest processed values from both arrays in sorted order.
- Why edge cases are covered: if one side is empty, loops naturally skip or copy; duplicates and negatives are handled by ordinary numeric comparisons.

## Why This Is Appropriate

- Interview constraints fit: linear pass, constant auxiliary space, and straightforward pointer reasoning.
- Tradeoffs vs alternatives: extra-buffer merge is simpler but uses `O(m+n)` extra memory; reverse in-place merge keeps space `O(1)`.
- When to choose a different strategy: if in-place mutation is disallowed, use a separate output array.

## Complexity

- Time: `O(m + n)` because each element is examined and written once.
- Space: `O(1)` auxiliary space (in-place).

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

