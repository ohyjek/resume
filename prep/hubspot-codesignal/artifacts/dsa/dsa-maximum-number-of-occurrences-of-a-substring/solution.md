# Problem Solution Artifact

## Problem Metadata

- Problem title: Maximum Number of Occurrences of a Substring
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-maximum-number-of-occurrences-of-a-substring.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Use a fixed-size sliding window of length `minSize`.

Count characters in the current window so we can check whether it has at most `maxLetters` distinct characters.  
When the window size is exactly `minSize`:

1. If distinct characters `<= maxLetters`, record that substring in a frequency map.
2. Track the maximum frequency seen so far.
3. Move the window forward by one character.

We intentionally ignore larger lengths (`minSize + 1 ... maxSize`). Any longer valid substring has a `minSize` sub-window, and that shorter sub-window can only occur at least as often as the longer one. So the best frequency is always achievable at `minSize`.

## Why This Works

- Correctness argument: We examine every contiguous substring of length `minSize` exactly once. For each one, we accept it iff it satisfies the distinct-character constraint. Therefore every valid `minSize` candidate is counted correctly. Because an optimal answer can be found at `minSize`, the maximum count in this set equals the global optimum.
- Key invariant(s):  
  - Window always represents `s[left..right]` with accurate per-character counts.  
  - `distinctCount` always equals the number of characters with positive count inside the window.  
  - Frequency map stores exact occurrence counts for valid `minSize` substrings processed so far.
- Why edge cases are covered: Empty strings, `minSize > s.length`, or impossible constraints naturally return `0` because no full valid window is counted. Duplicate-heavy strings work because frequency counting is independent per window position.

## Why This Is Appropriate

- Interview constraints fit: One pass over the string with small maps is straightforward, explainable, and avoids brute-force enumeration of all sizes and all substrings.
- Tradeoffs vs alternatives: This is much simpler than trying variable windows for every length in `[minSize, maxSize]`. It does rely on the key observation that only `minSize` is needed.
- When to choose a different strategy: If constraints made substring materialization expensive (very large `minSize` and long strings), use rolling hash IDs to avoid creating many substring objects.

## Complexity

- Time: `O(n)` window moves, plus substring materialization cost in JS/TS (`O(minSize)` per valid extraction). In interview settings where `minSize` is small/bounded, this is treated as `O(n)`.
- Space: `O(n)` in the worst case for substring frequency map, plus `O(Alphabet)` for window character counts.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

