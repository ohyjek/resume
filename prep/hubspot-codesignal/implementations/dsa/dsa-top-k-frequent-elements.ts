/**
 * Top K Frequent Elements
 *
 * Baseline approach:
 * 1) Count occurrences with a hash map.
 * 2) Keep a size-k min-heap by frequency.
 *
 * Time: O(n + u log k), where u is unique values (u <= n).
 * Space: O(u + k).
 */

export type TopKFrequentElementsInput = {
  nums: number[];
  k: number;
};

type FrequencyEntry = [value: number, count: number];

export function topKFrequentElements(input: TopKFrequentElementsInput): number[] {
  const { nums, k } = input;
  if (k <= 0 || nums.length === 0) {
    return [];
  }

  const frequency = new Map<number, number>();
  for (const value of nums) {
    frequency.set(value, (frequency.get(value) ?? 0) + 1);
  }

  const heap = new MinHeap();
  for (const [value, count] of frequency.entries()) {
    heap.push([value, count]);
    if (heap.size() > k) {
      heap.pop();
    }
  }

  return heap.values().map(([value]) => value);
}

class MinHeap {
  private readonly data: FrequencyEntry[] = [];

  size(): number {
    return this.data.length;
  }

  values(): FrequencyEntry[] {
    return this.data;
  }

  push(entry: FrequencyEntry): void {
    this.data.push(entry);
    this.siftUp(this.data.length - 1);
  }

  pop(): FrequencyEntry | undefined {
    if (this.data.length === 0) {
      return undefined;
    }

    const root = this.data[0];
    const tail = this.data.pop();
    if (this.data.length > 0 && tail) {
      this.data[0] = tail;
      this.siftDown(0);
    }
    return root;
  }

  private siftUp(index: number): void {
    let child = index;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (this.data[parent][1] <= this.data[child][1]) {
        break;
      }
      [this.data[parent], this.data[child]] = [this.data[child], this.data[parent]];
      child = parent;
    }
  }

  private siftDown(index: number): void {
    let parent = index;
    while (true) {
      const left = parent * 2 + 1;
      const right = parent * 2 + 2;
      let smallest = parent;

      if (left < this.data.length && this.data[left][1] < this.data[smallest][1]) {
        smallest = left;
      }
      if (right < this.data.length && this.data[right][1] < this.data[smallest][1]) {
        smallest = right;
      }
      if (smallest === parent) {
        break;
      }

      [this.data[parent], this.data[smallest]] = [this.data[smallest], this.data[parent]];
      parent = smallest;
    }
  }
}

