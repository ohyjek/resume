/**
 * Merge k sorted linked lists using a min-heap frontier.
 * Time: O(N log k), Space: O(k)
 */

export interface ListNode {
  val: number;
  next: ListNode | null;
}

export type MergeKSortedListsInput = Array<ListNode | null>;
export type MergeKSortedListsOutput = ListNode | null;

class MinHeap<T> {
  private readonly data: T[] = [];
  private readonly compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  size(): number {
    return this.data.length;
  }

  push(value: T): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }

    const top = this.data[0];
    const last = this.data.pop() as T;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  private bubbleUp(startIdx: number): void {
    let idx = startIdx;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.compare(this.data[idx], this.data[parentIdx]) >= 0) {
        return;
      }
      [this.data[idx], this.data[parentIdx]] = [this.data[parentIdx], this.data[idx]];
      idx = parentIdx;
    }
  }

  private bubbleDown(startIdx: number): void {
    let idx = startIdx;
    const n = this.data.length;

    while (true) {
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      let smallest = idx;

      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === idx) {
        return;
      }

      [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
      idx = smallest;
    }
  }
}

/**
 * Merges k sorted linked lists into one sorted linked list.
 */
export function mergeKSortedLists(lists: MergeKSortedListsInput): MergeKSortedListsOutput {
  if (lists.length === 0) {
    return null;
  }

  const heap = new MinHeap<ListNode>((a, b) => a.val - b.val);
  for (const node of lists) {
    if (node !== null) {
      heap.push(node);
    }
  }

  if (heap.size() === 0) {
    return null;
  }

  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;

  while (heap.size() > 0) {
    const smallest = heap.pop() as ListNode;
    tail.next = smallest;
    tail = smallest;

    if (smallest.next !== null) {
      heap.push(smallest.next);
    }
  }

  tail.next = null;
  return dummy.next;
}

