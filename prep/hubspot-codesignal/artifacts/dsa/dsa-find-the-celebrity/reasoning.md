# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. We must return an index `c` such that everyone knows `c` and `c` knows nobody.
2. The only API is `knows(a, b)`, so query count matters; target is linear time.
3. Brute force checks every pair for every candidate (`O(n^2)`), which is correct but inefficient.
4. Key insight: comparing two people can eliminate one immediately:
   - If `knows(a, b)` is true, `a` cannot be celebrity.
   - Else `b` cannot be celebrity.
5. One pass of pairwise elimination leaves at most one viable candidate.
6. Elimination alone is insufficient (a final candidate can still be invalid), so add a full verification pass.
7. Verification checks both required conditions against all others:
   - candidate knows nobody,
   - everybody knows candidate.
8. If all checks pass return candidate, else return `-1`.

## Decision Log

- Most important insight:
  Every `knows(a, b)` comparison permanently disqualifies one of the two.
- Rejected approach and reason:
  Build/scan full acquaintance matrix: too expensive (`O(n^2)` time and potentially more space) compared to linear elimination.
- Potential follow-up optimization:
  In environments where `knows` is remote/expensive, cache queried pairs to avoid duplicate calls across verification.

## Interview Narration Script

"I’ll avoid checking every candidate against everyone. Instead, I keep one running candidate.  
For each person `i`, if current candidate knows `i`, that candidate is disqualified and `i` becomes the new candidate; otherwise `i` is disqualified.  
After one pass, only one person can still possibly be celebrity.  
Then I verify that candidate by checking two rules against all others: they know nobody, and everybody knows them.  
If any check fails there is no celebrity, so return `-1`; otherwise return the candidate.  
This gives `O(n)` time and `O(1)` extra space."

