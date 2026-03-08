# Design Weather App API

## Metadata

- Category: System Design
- Difficulty: Medium
- Frequency: repeated_sighting
- Status: `stub`
- Last-updated: 2026-03-07
- Primary-source: Multiple HubSpot experience posts

## Prompt (normalized)

Design a weather service that ingests periodic external weather data and serves weather by location/zip.

## What it is really asking

- Data ingestion + serving architecture.
- Freshness, rate limits, and caching tradeoffs.

## Input/Output expectations

- Input: periodic upstream weather feeds and client location queries.
- Output: normalized weather response by location.

## Constraints and edge cases

- External provider outages.
- Zip-code coverage and query spikes.

## Solution paths

1. Batch polling ingestion + read API.
2. Event-driven updates with cache invalidation.

## Recommended baseline approach

Define data flow from external source to storage to read API with TTL caching.

## Complexity

- N/A (system design)

## Common pitfalls

- Not addressing stale data policy.
- Ignoring upstream API limits.

## Follow-up variants

- Global localization and units.
- Severe weather alert push pipeline.

## Practice checklist

- [ ] Can define freshness SLO.
- [ ] Can design fallback behavior for provider failures.

## Related HubSpot sightings

- Repeated interview reports reference weather app/API design.
