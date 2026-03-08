# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Top K Frequent Elements
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-top-k-frequent-elements.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language: Given an array and `k`, return any `k` values that appear most often.
2. Identify constraints and edge cases: Duplicates dominate runtime, ties can happen, `k` can equal number of unique values, and empty input should return empty output.
3. Enumerate candidate approaches:
   - Count then sort all unique elements by frequency.
   - Count then keep size-`k` min-heap.
   - Count then bucket by frequency.
4. Compare tradeoffs and reject weaker options:
   - Full sort is simple but does extra work when `k` is small.
   - Bucket sort can be linear but needs `n + 1` buckets and can feel heavier in interviews.
5. Select baseline strategy and justify: Frequency map + min-heap is concise, interview-friendly, and efficient for `k << n`.
6. Outline implementation plan:
   - Build `Map<number, number>` counts.
   - Iterate unique pairs and maintain a min-heap of at most `k`.
   - Extract heap values into the output.
7. Dry run with representative example:
   - `nums = [1,1,1,2,2,3], k = 2`
   - Counts: `1->3, 2->2, 3->1`
   - Heap progression: `[1:3]`, `[2:2,1:3]`, add `3:1` then pop `3:1`
   - Result values: `[1,2]` (order not important).
8. Confirm complexity and failure modes:
   - `O(n + u log k)` time, `O(u + k)` space.
   - Main failure risk is wrong heap comparator direction, which would keep least frequent rather than most frequent.

## Decision Log

- Most important insight: The heap stores only the current best `k` candidates; popping on overflow enforces the top-`k` invariant continuously.
- Rejected approach and reason: Sorting all unique elements was rejected as baseline because it does unnecessary `log u` ordering work for entries that never make top `k`.
- Potential follow-up optimization: Use bucket sort for expected `O(n)` time when memory for buckets is acceptable.

## Interview Narration Script

I would first count frequencies with a hash map, because the problem is fundamentally about occurrences. Then, instead of sorting everything, I keep a min-heap of size `k` so I only track the best `k` candidates seen so far. Each new `(value, frequency)` is pushed, and if the heap grows past `k`, I pop the smallest frequency. That guarantees the heap always contains the top `k` frequent elements among processed values. This gives `O(n + u log k)` time and `O(u + k)` space, which is typically better than sorting all unique values when `k` is small.

