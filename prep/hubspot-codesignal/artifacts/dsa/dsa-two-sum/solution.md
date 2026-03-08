# Problem Solution Artifact

## Problem Metadata

- Problem title: Two Sum
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-two-sum.md
- Difficulty: Easy
- Last-updated: 2026-03-07

## Final Solution

Use a one-pass hash map from value -> index while scanning left to right.
For each number `nums[i]`, compute `complement = target - nums[i]`. If `complement`
is already in the map, return `[map.get(complement), i]`. Otherwise store
`nums[i] -> i` and continue.

This guarantees we only pair the current index with an earlier index, so we never
reuse the same element twice.

## Why This Works

- Correctness argument:
  At index `i`, if a valid pair ends at `i`, its partner value must be
  `target - nums[i]`. Because all prior values were inserted in the map, we can
  detect that pair in O(1) average time.
- Key invariant(s):
  Before processing index `i`, the map contains exactly the values from indices
  `[0..i-1]` mapped to a usable prior index. Therefore, any complement lookup at
  `i` only finds a distinct earlier element.
- Why edge cases are covered:
  Duplicates work because the first seen occurrence can match a later duplicate
  (example: `[3,3]`, target `6`). Negative values are handled naturally by integer
  subtraction and hash lookup.

## Why This Is Appropriate

- Interview constraints fit:
  It is the expected baseline for this problem: linear pass and constant-time
  average lookups.
- Tradeoffs vs alternatives:
  Sort + two pointers can also find values but requires preserving original
  indices and costs O(n log n), making it slower for single-query input.
- When to choose a different strategy:
  If the array is already sorted and index order guarantees are different
  (Two Sum II style), two pointers may be simpler and use O(1) extra space.

## Complexity

- Time: O(n)
- Space: O(n)

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

