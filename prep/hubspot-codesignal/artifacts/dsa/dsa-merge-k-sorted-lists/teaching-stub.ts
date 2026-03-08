/**
 * Teaching Stub (DSA)
 *
 * Problem: Merge k Sorted Lists
 * Category: DSA
 *
 * This scaffold is intentionally problem-specific.
 * Focus: min-heap based k-way merge over linked-list heads.
 */

export interface ListNode {
  val: number;
  next: ListNode | null;
}

export type MergeKSortedListsInput = Array<ListNode | null>;
export type MergeKSortedListsOutput = ListNode | null;

/**
 * Learning goals
 * 1) Explain why this is a k-way merge problem.
 * 2) Maintain the frontier invariant for the heap.
 * 3) Tie each line of logic to O(N log k) / O(k).
 */
export function mergeKSortedLists(lists: MergeKSortedListsInput): MergeKSortedListsOutput {
  // Step 1: Filter out null list heads.
  // TODO: initialize a min-heap with all non-null heads.

  // Step 2: Prepare a sentinel node and tail pointer for output stitching.
  // TODO: dummy node avoids a special-case for first append.

  // Step 3: While heap is not empty:
  //  - pop the minimum node
  //  - append it to output
  //  - if popped.next exists, push popped.next into heap

  // Step 4: Return dummy.next.
  // TODO: verify behavior for empty input and duplicate values.

  throw new Error("Implement with a min-heap over list heads.");
}

/**
 * Suggested tests
 * - Empty array => null
 * - [null, null] => null
 * - Single list is returned unchanged in order
 * - Multiple lists with interleaving values
 * - Duplicate-heavy values across different lists
 */

