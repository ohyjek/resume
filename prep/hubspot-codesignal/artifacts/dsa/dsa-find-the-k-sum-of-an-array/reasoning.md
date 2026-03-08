# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Find the K-Sum of an Array
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-k-sum-of-an-array.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.  
   We need the `k`-th largest subsequence sum, not just the maximum.
2. Identify constraints and edge cases.  
   `n` can be large, values can be negative, and `k` can be large enough that brute force is impossible.
3. Enumerate candidate approaches.  
   - Brute force all subsequences and sort sums (`O(2^n)`): impossible.  
   - DP over sum values: can explode when values are large.  
   - Heap-based ordered generation of sums/losses: feasible.
4. Compare tradeoffs and reject weaker options.  
   Heap generation gives ordered access to top candidates without full enumeration.
5. Select baseline strategy and justify.  
   Convert to a "loss from maximum" perspective:
   - `maxSum = sum(positive nums)`
   - Any subsequence sum = `maxSum - loss`, where `loss` is sum of selected absolute values.
6. Outline implementation plan.  
   - Build `absNums = nums.map(abs).sort(asc)`  
   - Min-heap stores `{loss, index}`  
   - Seed with `{absNums[0], 0}`  
   - Pop `k-1` times; each pop expands two next states.
7. Dry run with representative examples.  
   Example `nums = [2, 4, -2], k = 5`:  
   - `maxSum = 6`, `absNums = [2, 2, 4]`  
   - losses in order: `0, 2, 2, 4, 4, 6, ...`  
   - 5th largest sum = `6 - 4 = 2`.
8. Confirm complexity and failure modes.  
   Sorting is `O(n log n)`, heap ops are `O(k log k)`.  
   Guard invalid `k` and impossible requests (`k` larger than total subsequences).

## Decision Log

- Most important insight: k-th largest sum is equivalent to k-th smallest loss from `maxSum`.
- Rejected approach and reason: subset enumeration was rejected because it scales exponentially.
- Potential follow-up optimization: use `bigint` if input bounds can exceed safe JS integer range.

## Interview Narration Script

I start by computing the maximum subsequence sum, which is just the sum of positive numbers.  
Then instead of directly generating largest sums, I generate the smallest reductions from that maximum.  
Each subsequence corresponds to subtracting a set of absolute values, so the answer is `maxSum` minus the `(k-1)`-th smallest loss.  
I sort absolute values and use a min-heap to best-first expand valid next losses in sorted order, popping `k-1` times.  
That avoids exponential generation and gives `O(n log n + k log k)` time.

