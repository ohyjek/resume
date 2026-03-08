# Problem Solution Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Use a two-pass strategy around a candidate pointer:

1. **Elimination pass**: walk people `1..n-1` and keep a single candidate.  
   If `knows(candidate, person)` is true, the current candidate cannot be a celebrity, so promote `person` as the new candidate.
2. **Verification pass**: for every other person `i`, check both:
   - `knows(candidate, i)` must be false (celebrity knows no one),
   - `knows(i, candidate)` must be true (everyone knows celebrity).

If any verification check fails, return `-1`; otherwise return the candidate index.

## Why This Works

- Correctness argument:
  During elimination, after processing index `i`, every person in `0..i` except `candidate` has been proven non-celebrity. A person can be disqualified either because they know someone else, or because someone does not know them. This guarantees that if a celebrity exists, it is the final candidate.
- Key invariant(s):
  After each elimination step, there is exactly one undetermined candidate among the scanned prefix.
- Why edge cases are covered:
  - `n = 1` returns `0` (the only person trivially satisfies both properties).
  - If no celebrity exists, verification fails and returns `-1`.
  - Directed-graph asymmetry is handled by checking both relation directions in verification.

## Why This Is Appropriate

- Interview constraints fit:
  It uses exactly the intended linear-query elimination pattern and stays within tight query bounds.
- Tradeoffs vs alternatives:
  A full matrix scan takes `O(n^2)` checks; this method reduces checks to `O(n)` while keeping code simple.
- When to choose a different strategy:
  If `knows(a, b)` calls are very expensive and batching/caching is allowed, memoization may reduce repeated API calls in custom environments.

## Complexity

- Time: `O(n)` relation checks in elimination + verification.
- Space: `O(1)` extra space.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

