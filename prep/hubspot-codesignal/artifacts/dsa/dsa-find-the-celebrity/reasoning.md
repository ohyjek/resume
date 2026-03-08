# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt: a celebrity is known by everyone and knows nobody; return their index or `-1`.
2. Key constraint: only the `knows(a, b)` API is available, so relation checks are query-based.
3. Candidate approaches:
   - brute force: test every person against all others (`O(n^2)`),
   - elimination + verify: remove impossible candidates in one pass.
4. Why elimination works:
   - if `a` knows `b`, then `a` is not a celebrity;
   - if `a` does not know `b`, then `b` is not a celebrity.
5. One scan therefore keeps exactly one possible candidate.
6. A second scan is required because elimination only guarantees "possible", not "valid."
7. Verification checks both directions for every other person:
   - candidate knows nobody;
   - everybody knows candidate.
8. If all checks pass, return candidate; otherwise return `-1`.

## Decision Log

- Most important insight:
  Each comparison can eliminate one of the two people immediately.
- Rejected approach and reason:
  Full matrix/brute-force scanning was rejected because it over-queries and misses the intended linear-time insight.
- Potential follow-up optimization:
  Cache `knows` results if the API cost dominates runtime and memory tradeoff is acceptable.

## Interview Narration Script

I would solve this in two passes. First, I eliminate candidates in linear time: keep one candidate and compare them with each person. If the candidate knows someone, they cannot be the celebrity, so I replace them; otherwise the other person is eliminated. After that pass, only one possible celebrity remains. Second, I verify that this person knows no one and everyone else knows them. If any check fails, there is no celebrity, so I return `-1`; otherwise I return that index. This gives `O(n)` time and `O(1)` space.

