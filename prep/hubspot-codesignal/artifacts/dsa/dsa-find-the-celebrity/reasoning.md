# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Find the Celebrity
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-find-the-celebrity.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate: we need an index `c` such that everyone knows `c`, and `c` knows nobody.
2. Constraints: only access is via `knows(a, b)` calls; output `-1` if no valid person exists.
3. Candidate approaches:
   - brute force all people and check both conditions for each (`O(n^2)`),
   - elimination + verification (`O(n)`).
4. Key observation: comparing two people `a` and `b` lets us discard one immediately:
   - if `knows(a, b)`, then `a` is not celebrity;
   - else `b` is not celebrity.
5. So we can scan once to keep one surviving candidate.
6. That candidate is only a *possible* celebrity, so we must verify against all others.
7. Dry run idea:
   - if there is a true celebrity `k`, elimination can never permanently discard `k`;
   - non-celebrities are eventually eliminated by some comparison.
8. Final check confirms both required properties and returns either candidate or `-1`.

## Decision Log

- Most important insight: each `knows` comparison removes one candidate from consideration, enabling a linear pass.
- Rejected approach and reason: brute force was rejected because it does unnecessary repeated checks and is quadratic.
- Potential follow-up optimization: if `knows` calls are expensive external RPCs, memoize queried pairs to avoid duplicate calls during verification.

## Interview Narration Script

“I’ll treat this as a candidate elimination problem. Start with person 0 as candidate, then scan forward.  
If candidate knows person i, candidate cannot be the celebrity, so replace candidate with i.  
Otherwise person i cannot be the celebrity, so keep current candidate. After one pass, only one possible celebrity remains.  
Then I do a full verification pass to ensure this candidate knows nobody and everybody knows them.  
If any check fails I return -1; otherwise I return that index. This gives O(n) time and O(1) space.”

