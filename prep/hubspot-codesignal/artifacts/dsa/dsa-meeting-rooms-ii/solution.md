# Problem Solution Artifact

## Problem Metadata

- Problem title: Meeting Rooms II
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-meeting-rooms-ii.md
- Difficulty: Medium
- Last-updated: 2026-03-07

## Final Solution

Sort all start times and all end times separately, then scan with two pointers.

- If the next meeting starts before the earliest current ending meeting ends, we need a new room.
- Otherwise, one meeting has ended, so we move the end pointer to release a room.

Track the maximum number of simultaneously active meetings while scanning all starts; that maximum is the minimum number of rooms required.

## Why This Works

- Correctness argument:
  At each step, `startPtr` is the next meeting to begin and `endPtr` is the earliest ending active meeting. Comparing `starts[startPtr]` and `ends[endPtr]` exactly tells us whether overlap increases (new room) or decreases (room freed). The peak active overlap over time is the minimum rooms needed.
- Key invariant(s):
  `roomsInUse` equals active meetings after processing each start event; `endPtr` always points to the first not-yet-accounted-for ending among active meetings.
- Why edge cases are covered:
  Empty input returns `0`. Back-to-back meetings (`start === end`) reuse a room because we treat that as non-overlap by releasing first. Fully overlapping meetings push peak usage to `n`.

## Why This Is Appropriate

- Interview constraints fit:
  Meets expected `O(n log n)` due to sorting and then a linear scan.
- Tradeoffs vs alternatives:
  Similar complexity to a min-heap approach but less code and no custom heap in languages without one. Min-heap is better if intervals arrive online/streaming rather than batch.
- When to choose a different strategy:
  Use a min-heap when you also need room assignment details or dynamic updates; use brute force only for tiny inputs.

## Complexity

- Time: `O(n log n)` for sorting starts and ends.
- Space: `O(n)` for the two sorted arrays.

## Validation Checklist

- [x] Correct on canonical examples
- [x] Correct on edge cases
- [x] Complexity claims match implementation

