# Find the Celebrity

## Metadata

- Category: DSA
- Difficulty: Medium
- Frequency: not_likely
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Taro HubSpot canonical list

## Prompt (normalized)

Find the celebrity in a group: known by everyone, knows no one.

## What it is really asking

- Candidate elimination strategy.
- Query efficiency reasoning.

## Input/Output expectations

- Input: n and `knows(a, b)` API.
- Output: celebrity index or -1.

## Constraints and edge cases

- No celebrity exists.
- Single person.

## Solution paths

1. Two-pass elimination + verification.

## Recommended baseline approach

Eliminate impossible candidates in one pass, then verify remaining candidate.

## Complexity

- Time: O(n)
- Space: O(1)

## Common pitfalls

- Missing verification phase.
- Misreading directed relationship.

## Follow-up variants

- Multiple possible celebrities variant.

## Practice checklist

- [ ] Explain proof of elimination correctness.
- [ ] Verify candidate correctly.

## Related HubSpot sightings

- Canonical question: Find the Celebrity.
