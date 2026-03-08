# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Merge Two Sorted Lists
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-merge-two-sorted-lists.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.
   - We need to stitch two already-sorted singly linked lists into one sorted list and return its head.
2. Identify constraints and edge cases.
   - Either head can be `null`.
   - Duplicates are allowed.
   - One list may finish much earlier than the other.
3. Enumerate candidate approaches.
   - Iterative merge with a dummy head and two pointers.
   - Recursive merge that picks the smaller head each call.
4. Compare tradeoffs and reject weaker options.
   - Recursive is elegant but uses call stack `O(n+m)` in worst case.
   - Iterative keeps the same logic with `O(1)` extra space and fewer runtime risks.
5. Select baseline strategy and justify.
   - Choose iterative dummy-head merge because it is clear, robust, and matches interview expectations.
6. Outline implementation plan.
   - Create `dummy` and `tail`.
   - While both pointers are non-null, append smaller node and advance.
   - Attach the remaining non-null list once loop ends.
   - Return `dummy.next`.
7. Dry run with representative examples.
   - `1->2->4` and `1->3->4` produces `1->1->2->3->4->4` by repeatedly taking smaller head.
   - `null` and `0` returns `0` immediately by remainder attach.
8. Confirm complexity and failure modes.
   - Time `O(n+m)` because each node is visited once.
   - Extra space `O(1)` iterative.
   - Main failure risk is pointer mis-linking; dummy node simplifies head handling.

## Decision Log

- Most important insight:
  - The merged list can be built in-place by always linking the smallest current head.
- Rejected approach and reason:
  - Recursive merge rejected as baseline due to avoidable stack growth.
- Potential follow-up optimization:
  - No asymptotic improvement over `O(n+m)` for full merge; optimization focus is readability and pointer safety.

## Interview Narration Script

"I see two sorted linked lists, so I can do a classic two-pointer merge like merge sort. I’ll keep a dummy head to avoid special-casing the first insertion, and a `tail` pointer for the end of the merged list. While both lists have nodes, I compare current values, link the smaller node to `tail.next`, and advance that list pointer plus `tail`. After one list ends, I attach the remaining nodes from the other list, because they are already sorted. This processes each node once for `O(n+m)` time and uses `O(1)` extra space."

