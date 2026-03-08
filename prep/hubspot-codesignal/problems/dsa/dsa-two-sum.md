# Two Sum

## Metadata

- Category: DSA
- Difficulty: Easy
- Frequency: somewhat_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Find two indices such that nums[i] + nums[j] equals target.

## What it is really asking

- Hash map lookup pattern.
- Complement thinking.

## Input/Output expectations

- Input: array and target.
- Output: index pair.

## Constraints and edge cases

- Duplicates.
- Negative numbers.

## Solution paths

1. One-pass hash map.
2. Sort + two pointers (if index mapping handled).

## Recommended baseline approach

One-pass hash map for linear time.

## Complexity

- Time: O(n)
- Space: O(n)

## Common pitfalls

- Returning same element twice.
- Overwriting useful earliest index.

## Follow-up variants

- Two Sum II (sorted).

## Practice checklist

- [ ] Explain complement map invariant.
- [ ] Handle duplicate-value case.

## Related HubSpot sightings

- Canonical question: Two Sum.
- Experience wording includes "two sum variation."
