/**
 * Teaching Stub (DSA)
 *
 * Problem: Merge Sorted Array
 * Category: DSA
 */

export type MergeSortedArrayInput = {
  nums1: number[];
  m: number;
  nums2: number[];
  n: number;
};

export type MergeSortedArrayOutput = number[];

/**
 * Learning goals
 * 1) Explain why backward pointers avoid overwrite.
 * 2) Keep suffix-sorted invariant after each write.
 * 3) Justify O(m+n) time and O(1) extra space.
 */
export function mergeSortedArray(input: MergeSortedArrayInput): MergeSortedArrayOutput {
  const { nums1, m, nums2, n } = input;

  let i = m - 1;
  let j = n - 1;
  let write = m + n - 1;

  // Fill from the end so unread nums1 values are never overwritten.
  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[write] = nums1[i];
      i -= 1;
    } else {
      nums1[write] = nums2[j];
      j -= 1;
    }
    write -= 1;
  }

  return nums1;
}

/**
 * Suggested tests
 * - nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3 -> [1,2,2,3,5,6]
 * - nums1=[0], m=0, nums2=[1], n=1 -> [1]
 * - nums1=[1], m=1, nums2=[], n=0 -> [1]
 * - nums1=[2,0], m=1, nums2=[1], n=1 -> [1,2]
 */

