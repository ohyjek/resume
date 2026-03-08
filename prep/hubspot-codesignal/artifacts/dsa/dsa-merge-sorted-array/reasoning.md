# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Merge Sorted Array
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-sorted-array.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. We have `nums1` with enough trailing capacity and a second sorted array `nums2`; we must end with one sorted result in `nums1`.
2. Edge cases: `m = 0`, `n = 0`, duplicates, negative values, and unequal lengths.
3. Candidate 1: copy first `m` values to buffer and do forward merge. Correct but uses extra space.
4. Candidate 2: write from the back using two pointers over the valid tails. This avoids overwriting unread values.
5. Choose candidate 2 because it meets the in-place expectation and still stays linear.
6. Implementation: initialize `i = m - 1`, `j = n - 1`, `write = m + n - 1`. Repeatedly place the larger tail value at `write` and move pointers left.
7. Dry run (`nums1=[1,2,3,0,0,0], m=3`, `nums2=[2,5,6], n=3`): write `6`, `5`, `3`, `2`, `2`, `1` from right to left -> `[1,2,2,3,5,6]`.
8. Failure modes are mostly off-by-one bounds; loop guard `while (j >= 0)` is sufficient because remaining `nums1` prefix is already in place.

## Decision Log

- Most important insight: reverse direction protects unread `nums1` values from being clobbered.
- Rejected approach and reason: extra-buffer forward merge rejected for unnecessary `O(m+n)` memory.
- Potential follow-up optimization: for immutable input constraints, return a new merged array with the same two-pointer comparison logic.

## Interview Narration Script

"I want in-place merge with sorted order, so my main risk is overwriting values in `nums1` that I still need to compare. To avoid that, I compare from the rightmost valid elements: `nums1[m-1]` and `nums2[n-1]`, and write the larger value into the last open slot. After each write, that slot is finalized forever, so the invariant is that the suffix is always sorted and complete. I keep going until `nums2` is fully placed; then we are done in `O(m+n)` time and `O(1)` extra space."

