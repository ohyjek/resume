# Problem Solution Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Use a two-pass strategy:
1) **Elimination pass**: walk from person `1` to `n - 1` while tracking one candidate `cand`.  
If `cand` knows `i`, then `cand` cannot be a celebrity, so set `cand = i`.  
Otherwise `i` cannot be a celebrity and `cand` stays.
2) **Verification pass**: check every other person `j`:
   - `cand` must **not** know `j`
   - `j` **must** know `cand`
If either condition fails for any `j`, return `-1`; otherwise return `cand`.

## Why This Works

- Correctness argument:
  After processing index `i` in the elimination pass, every person in `[0..i]` except `cand` is proven non-celebrity.
- Key invariant(s):
  The current `cand` is the only remaining feasible celebrity among processed people.
- Why edge cases are covered:
  - `n = 1`: no comparisons are needed, person `0` is valid.
  - no celebrity exists: verification catches the failure and returns `-1`.
  - directed relation confusion is avoided by checking both required properties in verification.

## Why This Is Appropriate

- Interview constraints fit:
  Uses exactly the intended `O(n)` query pattern and constant extra memory.
- Tradeoffs vs alternatives:
  Brute force checks each person against everyone (`O(n^2)`) and is unnecessary.
- When to choose a different strategy:
  If `knows(a, b)` is very expensive and cached answers are allowed, memoization can reduce duplicate API calls at the cost of extra space.

## Complexity

- Time: `O(n)` API checks in elimination plus `O(n)` in verification, overall `O(n)`.
- Space: `O(1)` auxiliary space.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

