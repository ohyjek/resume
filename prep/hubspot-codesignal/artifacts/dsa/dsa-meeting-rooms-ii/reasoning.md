# Problem Reasoning Artifact

## Problem Metadata

- Problem title: Meeting Rooms II
- Category: DSA
- Source file: prep/hubspot-codesignal/problems/dsa/dsa-meeting-rooms-ii.md
- Last-updated: 2026-03-07

## Step-by-Step Thought Process

1. Restate prompt in plain language.  
   We need the maximum number of meetings happening at the same time.
2. Identify constraints and edge cases.  
   Empty list, single meeting, all overlapping, and back-to-back boundaries.
3. Enumerate candidate approaches.  
   Min-heap of active end times, or sweep-line with sorted starts/ends.
4. Compare tradeoffs and reject weaker options.  
   Brute-force overlap counting is too slow (`O(n^2)`).
5. Select baseline strategy and justify.  
   Two sorted arrays + two pointers gives `O(n log n)` and clean logic.
6. Outline implementation plan.  
   Build `starts`/`ends`, sort both, sweep starts while releasing ended meetings.
7. Dry run with representative examples.  
   For `[[0,30],[5,10],[15,20]]`, active counts become `1 -> 2 -> 2`, peak `2`.
8. Confirm complexity and failure modes.  
   Sorting dominates time; ensure `start === end` is treated as room reuse.

## Decision Log

- Most important insight:
  This is a "maximum concurrent intervals" problem; once reframed, sweep-line is direct.
- Rejected approach and reason:
  Pairwise overlap checks were rejected because they scale poorly for larger `n`.
- Potential follow-up optimization:
  Return room assignments by switching to a min-heap of `(endTime, roomId)`.

## Interview Narration Script

I treat each start and end as timeline events. Instead of sorting full intervals only once, I sort all starts and all ends independently. Then I walk starts from left to right. If a meeting starts before the earliest current end, overlap increases so I allocate another room. Otherwise, a room got freed, so I advance the end pointer and reuse it. The largest overlap observed during this sweep is exactly the minimum number of rooms required. This runs in `O(n log n)` time and `O(n)` extra space.

