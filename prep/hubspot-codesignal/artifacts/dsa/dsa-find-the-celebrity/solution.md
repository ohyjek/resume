# Problem Solution Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Use a two-pass strategy:

1. **Elimination pass**: keep a single `candidate` initialized to `0`.  
   For each person `i` from `1..n-1`, if `candidate` knows `i`, then `candidate` cannot be the celebrity, so set `candidate = i`.
2. **Verification pass**: validate the final `candidate` against everyone else:
   - `candidate` must not know any other person.
   - every other person must know `candidate`.
   If either condition fails for any person, return `-1`; otherwise return `candidate`.

This works with the provided `knows(a, b)` API and returns an index or `-1` when no celebrity exists.

## Why This Works

- Correctness argument: in the elimination pass, each comparison removes at least one person from celebrity consideration. If `candidate` knows `i`, `candidate` is disqualified; otherwise `i` is disqualified. After one pass, only one possible celebrity remains.
- Key invariant(s): after processing people `0..i`, the current `candidate` is the only person in that prefix who has not been disproven.
- Why edge cases are covered: for `n <= 0`, return `-1`. For `n = 1`, candidate `0` is valid because there is no contradictory relationship to check. If no celebrity exists, the verification pass detects the violation and returns `-1`.

## Why This Is Appropriate

- Interview constraints fit: this is the canonical O(n) query strategy and improves over brute force O(n^2) candidate checking.
- Tradeoffs vs alternatives: brute force is simpler to reason about but slower; this approach adds a proof step but stays optimal for query count.
- When to choose a different strategy: if relationship data is precomputed as a full matrix and `n` is tiny, brute force may be acceptable for clarity, but elimination + verify remains best general-purpose.

## Complexity

- Time: `O(n)` API calls in asymptotic terms (one elimination pass plus one verification pass).
- Space: `O(1)`.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

