# Design Netflix

## Metadata

- Category: System Design
- Difficulty: Medium
- Frequency: repeated_sighting
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Multiple HubSpot experience posts

## Prompt (normalized)

Design a video streaming platform core flow (search, playback, resume, recommendations).

## What it is really asking

- End-to-end architecture under scale.
- Tradeoffs across availability, latency, and consistency.

## Input/Output expectations

- Inputs: user actions (search/play/pause/resume/rate).
- Outputs: streaming response + personalized results.

## Constraints and edge cases

- High read throughput.
- Resume accuracy across devices.
- Recommendation freshness.

## Solution paths

1. MVP architecture.
2. Scaled architecture with CDN, metadata, and event pipeline.

## Recommended baseline approach

Start with requirements, APIs, data model, then component diagram and scaling bottlenecks.

## Complexity

- N/A (system design)

## Common pitfalls

- Skipping requirement clarification.
- No capacity estimate.
- No failure-mode handling.

## Follow-up variants

- Multi-profile households.
- Offline downloads.

## Practice checklist

- [ ] Can define functional/non-functional requirements first.
- [ ] Can justify storage and caching choices.
- [ ] Can discuss scaling path.

## Related HubSpot sightings

- Repeated interview reports reference "Design Netflix."
