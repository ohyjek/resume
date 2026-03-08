/**
 * Problem: Find the K-Sum of an Array
 * Category: DSA
 */

export interface FindTheKSumOfAnArrayInput {
  nums: number[];
  k: number;
}

export type FindTheKSumOfAnArrayOutput = number;

interface LossState {
  loss: number;
  index: number;
}

class MinHeap<T> {
  private readonly data: T[] = [];

  constructor(private readonly compare: (a: T, b: T) => number) {}

  push(value: T): void {
    this.data.push(value);
    this.siftUp(this.data.length - 1);
  }

  pop(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }

    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftUp(startIndex: number): void {
    let child = startIndex;

    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (this.compare(this.data[child], this.data[parent]) >= 0) {
        break;
      }
      [this.data[child], this.data[parent]] = [this.data[parent], this.data[child]];
      child = parent;
    }
  }

  private siftDown(startIndex: number): void {
    let parent = startIndex;
    const n = this.data.length;

    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      let smallest = parent;

      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) {
        smallest = left;
      }
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) {
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

export function findTheKSumOfAnArray(input: FindTheKSumOfAnArrayInput): FindTheKSumOfAnArrayOutput {
  const { nums, k } = input;

  if (!Number.isInteger(k) || k <= 0) {
    throw new RangeError("k must be a positive integer.");
  }
  if (nums.length === 0) {
    if (k === 1) {
      return 0;
    }
    throw new RangeError("k exceeds the number of available subsequences.");
  }

  let maxSum = 0;
  for (const value of nums) {
    if (value > 0) {
      maxSum += value;
    }
  }
  if (k === 1) {
    return maxSum;
  }

  const sortedAbs = nums.map((value) => Math.abs(value)).sort((a, b) => a - b);
  const minHeap = new MinHeap<LossState>((a, b) => a.loss - b.loss);
  minHeap.push({ loss: sortedAbs[0], index: 0 });

  let kthLoss = 0;

  // Enumerate smallest losses in order with heap-state transitions.
  for (let poppedCount = 1; poppedCount < k; poppedCount += 1) {
    const current = minHeap.pop();
    if (!current) {
      throw new RangeError("k exceeds the number of available subsequences.");
    }

    kthLoss = current.loss;
    const nextIndex = current.index + 1;
    if (nextIndex < sortedAbs.length) {
      minHeap.push({
        loss: current.loss + sortedAbs[nextIndex],
        index: nextIndex,
      });
      minHeap.push({
        loss: current.loss - sortedAbs[current.index] + sortedAbs[nextIndex],
        index: nextIndex,
      });
    }
  }

  return maxSum - kthLoss;
}

