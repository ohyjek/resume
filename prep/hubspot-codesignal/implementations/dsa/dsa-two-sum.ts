/**
 * Two Sum (DSA)
 *
 * Returns indices [i, j] where nums[i] + nums[j] === target.
 * Uses a one-pass hash map for O(n) time.
 */

export interface TwoSumInput {
  nums: number[];
  target: number;
}

export type TwoSumOutput = [number, number];

/**
 * Invariant:
 * Before index i is processed, indexByValue stores only indices < i.
 * Therefore a complement match always uses two distinct elements.
 */
export function twoSum({ nums, target }: TwoSumInput): TwoSumOutput {
  const indexByValue = new Map<number, number>();

  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i];
    const complement = target - value;
    const complementIndex = indexByValue.get(complement);

    if (complementIndex !== undefined) {
      return [complementIndex, i];
    }

    indexByValue.set(value, i);
  }

  throw new Error("No two-sum pair found for the provided input.");
}

