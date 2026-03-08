/**
 * Teaching Stub (DSA)
 *
 * Problem: Top K Frequent Elements
 * Category: DSA
 *
 * This scaffold is intentionally problem-specific.
 * It demonstrates the frequency-map + size-k min-heap approach.
 */

export type TopKFrequentElementsInput = {
  nums: number[];
  k: number;
};

export type TopKFrequentElementsOutput = number[];

/**
 * Learning goals
 * 1) Identify the core pattern used by this problem.
 * 2) Maintain the right invariant while iterating or recursing.
 * 3) Explain complexity and edge-case behavior confidently.
 */
export function topKFrequentElements(input: TopKFrequentElementsInput): TopKFrequentElementsOutput {
  const { nums, k } = input;
  if (k <= 0 || nums.length === 0) {
    return [];
  }

  const frequency = new Map<number, number>();
  for (const value of nums) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }

  const heap: Array<[value: number, count: number]> = [];
  for (const [value, count] of frequency.entries()) {
    pushMinHeap(heap, [value, count]);
    if (heap.length > k) {
      popMinHeap(heap);
    }
  }

  return heap.map(([value]) => value);
}

/**
 * Suggested tests
 * - Canonical sample case
 * - Smallest valid input
 * - Duplicate-heavy case
 * - Constraint-limit case
 * - Tricky edge case discussed in reasoning.md
 */

function pushMinHeap(heap: Array<[number, number]>, entry: [number, number]): void {
  heap.push(entry);
  siftUp(heap, heap.length - 1);
}

function popMinHeap(heap: Array<[number, number]>): [number, number] | undefined {
  if (heap.length === 0) {
    return undefined;
  }
  const root = heap[0];
  const tail = heap.pop();
  if (heap.length > 0 && tail) {
    heap[0] = tail;
    siftDown(heap, 0);
  }
  return root;
}

function siftUp(heap: Array<[number, number]>, index: number): void {
  let child = index;
  while (child > 0) {
    const parent = Math.floor((child - 1) / 2);
    if (heap[parent][1] <= heap[child][1]) {
      break;
    }
    [heap[parent], heap[child]] = [heap[child], heap[parent]];
    child = parent;
  }
}

function siftDown(heap: Array<[number, number]>, index: number): void {
  let parent = index;
  while (true) {
    const left = parent * 2 + 1;
    const right = parent * 2 + 2;
    let smallest = parent;

    if (left < heap.length && heap[left][1] < heap[smallest][1]) {
      smallest = left;
    }
    if (right < heap.length && heap[right][1] < heap[smallest][1]) {
      smallest = right;
    }
    if (smallest === parent) {
      break;
    }

    [heap[parent], heap[smallest]] = [heap[smallest], heap[parent]];
    parent = smallest;
  }
}

