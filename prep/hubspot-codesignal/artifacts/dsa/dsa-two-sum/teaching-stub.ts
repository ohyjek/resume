/**
 * Teaching Stub (DSA)
 *
 * Problem: Two Sum
 * Category: DSA
 *
 * One-pass hash map approach:
 * check complement before storing the current value.
 */

export interface TwoSumInput {
  nums: number[];
  target: number;
}

export type TwoSumOutput = [number, number];

/**
 * Learning goals
 * 1) Use complement lookup with a hash map.
 * 2) Keep the map invariant: only prior indices are stored.
 * 3) Explain why duplicates and negatives still work.
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

/**
 * Suggested tests
 * - Canonical sample case
 * - Smallest valid input
 * - Duplicate-heavy case
 * - Negative numbers
 * - No-solution defensive behavior
 */

