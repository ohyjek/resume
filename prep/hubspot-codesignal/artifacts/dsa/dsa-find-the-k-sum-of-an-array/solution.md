# Problem Solution Artifact

## Problem Metadata

- Problem title: Find the K-Sum of an Array
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-k-sum-of-an-array.md
- Difficulty: Hard
- Last-updated: 2026-03-07

## Final Solution

Compute the maximum subsequence sum first (take every positive number). Then reinterpret the k-th largest subsequence sum as:

- `maxSum - (k-1-th smallest "loss")`

Where each loss is a sum of absolute values for elements we "flip away" from `maxSum`.  
Sort absolute values ascending and run a best-first expansion over loss states with a min-heap:

- State: `(loss, index)` means the current loss includes `absNums[index]` as the last chosen absolute value.
- From `(loss, i)`, push:
  - `(loss + absNums[i + 1], i + 1)` (add next absolute value),
  - `(loss - absNums[i] + absNums[i + 1], i + 1)` (replace current last choice with next).

After popping from the min-heap `k - 1` times, the latest popped loss is the `(k-1)`-th smallest loss, so answer is `maxSum - loss`.

## Why This Works

- Correctness argument: every subsequence sum can be written as `maxSum - loss`, where `loss` is a sum of chosen absolute values. Sorting absolutes lets us enumerate these losses in increasing order via the heap transitions, identical to merging sorted "next candidate" frontiers.
- Key invariant(s): each popped heap state is the smallest unseen loss; each transition only creates valid next losses with non-decreasing index, so no smaller unseen loss is skipped.
- Why edge cases are covered: all-negative arrays still work because `maxSum = 0`; duplicates in absolute values are valid and still produce correct ordering; `k = 1` returns `maxSum` immediately.

## Why This Is Appropriate

- Interview constraints fit: avoids `2^n` enumeration and hits the expected hard-problem target with a heap and sorted preprocessing.
- Tradeoffs vs alternatives: dynamic programming over sums is infeasible with large value ranges; brute-force subset generation is exponentially slow.
- When to choose a different strategy: if values are tiny and bounded, sum-DP/bitset approaches can be competitive for full top-k enumeration.

## Complexity

- Time: `O(n log n + k log k)`
- Space: `O(k)` heap states (plus sorted absolute array)

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

