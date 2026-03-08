/**
 * Merge Two Sorted Lists (iterative)
 *
 * Contract:
 * - Input: heads of two sorted singly linked lists
 * - Output: head of one sorted merged list
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
 * Time: O(n + m)
 * Space: O(1) extra
 */
export function mergeTwoSortedLists(input: MergeTwoSortedListsInput): MergeTwoSortedListsOutput {
  let { list1, list2 } = input;

  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;

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

  tail.next = list1 ?? list2;
  return dummy.next;
}

