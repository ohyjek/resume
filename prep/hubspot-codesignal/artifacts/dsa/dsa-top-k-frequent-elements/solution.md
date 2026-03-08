# Problem Solution Artifact

## Problem Metadata

- Problem title: Top K Frequent Elements
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-top-k-frequent-elements.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Count frequencies with a hash map, then keep only the top `k` candidates in a min-heap keyed by frequency.

Algorithm:
1. Build `freq: Map<number, number>` from the input array.
2. Iterate through each `(value, count)` in `freq`.
3. Push `(value, count)` into a min-heap.
4. If heap size exceeds `k`, pop once (removes the smallest frequency so far).
5. After processing all unique values, extract the heap values as the answer.

This guarantees the heap always contains the `k` most frequent elements seen so far.

## Why This Works

- Correctness argument: At any point, if heap size is `<= k`, all candidates are valid top-`k` contenders. When size becomes `k + 1`, removing the minimum-frequency candidate cannot remove any element that should be in the final top `k`, because at least `k` elements have frequency greater than or equal to it.
- Key invariant(s): After each iteration over unique elements, the heap contains exactly the `k` highest-frequency elements among those processed so far (or all processed elements if fewer than `k` exist).
- Why edge cases are covered: Empty input returns empty output. `k = uniqueCount` returns all unique values. Frequency ties are naturally supported because ordering among equal-frequency elements is not constrained by the prompt.

## Why This Is Appropriate

- Interview constraints fit: Hash map + size-`k` heap is a standard medium-level pattern, easy to explain, and scales when `k << n`.
- Tradeoffs vs alternatives: Compared to sorting all unique elements by frequency (`O(u log u)`), heap gives `O(u log k)` after counting, which is better when `k` is small. Bucket sort can be `O(n)` time but uses an array of buckets up to size `n` and may be less straightforward to implement quickly.
- When to choose a different strategy: Prefer bucket sort when strict linear time is required and memory proportional to `n` buckets is acceptable.

## Complexity

- Time: `O(n + u log k)`, where `n` is array length and `u` is number of unique values. Commonly stated as `O(n log k)` in interview shorthand because `u <= n`.
- Space: `O(u + k)` for frequency map plus heap, often summarized as `O(n)` in the worst case.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

