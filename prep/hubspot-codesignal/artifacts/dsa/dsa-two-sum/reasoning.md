# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Two Sum
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-two-sum.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.
   We need two distinct indices `i` and `j` such that `nums[i] + nums[j] = target`.
2. Identify constraints and edge cases.
   Handle duplicates (e.g. `[3,3]`), negative numbers, and ensure we do not reuse
   the same index.
3. Enumerate candidate approaches.
   - Brute force nested loops.
   - Sort + two pointers with index reconstruction.
   - One-pass hash map of seen values.
4. Compare tradeoffs and reject weaker options.
   Brute force is O(n^2), too slow. Sort + two pointers is O(n log n) and adds
   complexity to preserve original indices.
5. Select baseline strategy and justify.
   One-pass hash map gives O(n) time and straightforward correctness reasoning.
6. Outline implementation plan.
   For each index `i`, compute `target - nums[i]`, check map, return match if found,
   else insert current value/index.
7. Dry run with representative examples.
   `nums=[2,7,11,15], target=9`: at `i=1`, complement `2` already seen at `0`,
   return `[0,1]`.
8. Confirm complexity and failure modes.
   O(n) time, O(n) space. If no pair exists (outside canonical assumption), throw
   an error to avoid silent incorrect output.

## Decision Log

- Most important insight:
  Convert pair search into complement lookup so each element is processed once.
- Rejected approach and reason:
  Sorting was rejected because it loses direct index positions and is slower.
- Potential follow-up optimization:
  For repeated queries on the same static array, preprocess value->indices map.

## Interview Narration Script

I would solve this with a one-pass hash map. As I scan the array, I ask:
"what value would complete the target with this number?" If that complement was
already seen, I can return its index and the current index immediately. If not,
I store the current value and index for future elements. This preserves the key
invariant that the map only contains prior indices, so I never use the same
element twice. It handles duplicates and negatives naturally, runs in O(n) time,
and uses O(n) extra space.

