# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Maximum Number of Occurrences of a Substring
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-maximum-number-of-occurrences-of-a-substring.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.  
   We need the highest count of any substring whose length is between `minSize` and `maxSize` and whose number of distinct characters is at most `maxLetters`.
2. Identify constraints and edge cases.  
   - If `minSize > s.length`, answer is `0`.  
   - Repeated-character strings can create high frequency counts.  
   - Tight distinct bounds (for example `maxLetters = 1`) reject most windows.
3. Enumerate candidate approaches.  
   - Brute force all substring lengths and all start indices with a distinct-char check each time.  
   - Sliding window for each length in range.  
   - Sliding window for only `minSize` + frequency map.
4. Compare tradeoffs and reject weaker options.  
   Enumerating every length is unnecessary and slower to explain/implement. Checking only `minSize` is enough due to monotonic frequency behavior.
5. Select baseline strategy and justify.  
   Use one fixed-size window at `minSize`, track character counts in-window, and count valid substrings in a map.
6. Outline implementation plan.  
   - Expand right pointer and update char counts.  
   - Shrink from left when window exceeds `minSize`.  
   - When window is exactly `minSize` and distinct count is valid, increment frequency map and best answer.
7. Dry run with representative examples.  
   For `s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4`:  
   valid windows of size 3 include `"aab"` (twice), `"aba"` (once), `"bab"` (once), `"caa"` (once). Best is `2`.
8. Confirm complexity and failure modes.  
   - Pointer movement is linear.  
   - Main failure risk is incorrect distinct-character maintenance while shrinking, so increment/decrement logic must be symmetric.

## Decision Log

- Most important insight: The optimum frequency is always obtainable from length `minSize`, so larger lengths can be ignored.
- Rejected approach and reason: Sliding windows for every length in `[minSize, maxSize]` is redundant and adds complexity without better results.
- Potential follow-up optimization: Replace raw substring keys with rolling-hash keys to reduce substring-allocation overhead.

## Interview Narration Script

I start by recognizing this as a substring counting problem with constraints, so sliding window is a natural fit.  
The key observation is that I only need to inspect windows of size `minSize`: any longer substring contains a `minSize` sub-window, and the longer one cannot appear more frequently than that shorter piece.  
So I run one fixed-size window, maintain character frequencies and distinct count, and only count windows that satisfy `distinct <= maxLetters`.  
I store counts in a map and track the maximum seen. This gives linear scan behavior with clean, interview-friendly logic.

