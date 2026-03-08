/**
 * Teaching Stub (DSA)
 *
 * Problem: Merge Two Sorted Lists
 * Category: DSA
 *
 * Iterative baseline: merge with a dummy head.
 */
export type ListNode = {
  val: number;
  next: ListNode | null;
};

export type MergeTwoSortedListsInput = {
  list1: ListNode | null;
  list2: ListNode | null;
};

export type MergeTwoSortedListsOutput = ListNode | null;

/**
 * Learning goals
 * 1) Identify the core pattern used by this problem.
 * 2) Maintain the right invariant while iterating or recursing.
 * 3) Explain complexity and edge-case behavior confidently.
 */
export function mergeTwoSortedLists(input: MergeTwoSortedListsInput): MergeTwoSortedListsOutput {
  let { list1, list2 } = input;

  // Dummy head avoids special-case logic for the first appended node.
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;

  // Invariant: dummy.next..tail is sorted and contains all consumed nodes.
  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  // At most one list remains; it is already sorted.
  tail.next = list1 ?? list2;

  return dummy.next;
}

/**
 * Suggested tests
 * - Canonical sample case
 * - One empty, one non-empty
 * - Duplicate-heavy case
 * - One list exhausted much earlier
 * - Both inputs empty
 */

