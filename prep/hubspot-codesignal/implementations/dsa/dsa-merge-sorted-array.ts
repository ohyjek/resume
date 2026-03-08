export type MergeSortedArrayInput = {
  nums1: number[];
  m: number;
  nums2: number[];
  n: number;
};

export type MergeSortedArrayOutput = number[];

/**
 * Merges nums2 into nums1 in place and returns nums1.
 * Assumes nums1 has length m + n and enough trailing capacity.
 */
export function mergeSortedArray(input: MergeSortedArrayInput): MergeSortedArrayOutput {
  const { nums1, m, nums2, n } = input;

  let i = m - 1;
  let j = n - 1;
  let write = m + n - 1;

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

