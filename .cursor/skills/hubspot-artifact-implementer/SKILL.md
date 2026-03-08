---
name: hubspot-artifact-implementer
description: Executes a full per-problem authoring workflow from an artifact folder: gather context, draft plan, implement output, and update artifact markdowns. Use when the user wants one agent to complete a problem bundle end-to-end from agent-prompt.md.
---
# HubSpot Artifact Implementer

## Purpose

Turn one problem artifact bundle into a completed deliverable:

- updated `solution.md`
- updated `reasoning.md`
- updated teaching artifact
- implementation output in `prep/hubspot-codesignal/implementations/...`

Primary input folder:

- `prep/hubspot-codesignal/artifacts/<category>/<problem-slug>/`

Expected files in that folder:

- `solution.md`
- `reasoning.md`
- `agent-prompt.md`
- DSA: `teaching-stub.ts`
- System Design: `teaching-notes.md`
- run tracking file: `.skill-run-state.json` (create on first run)

## Default implementation output locations

- DSA implementation code:
  - `prep/hubspot-codesignal/implementations/dsa/<problem-slug>.ts`
- System design implementation notes:
  - `prep/hubspot-codesignal/implementations/system-design/<problem-slug>.md`

If user provides a different output path, honor the user's path.

## Workflow (single-agent, end-to-end)

1. Validate input bundle
   - Ensure these files exist in the artifact folder:
     - `solution.md`
     - `reasoning.md`
     - `agent-prompt.md`
   - Ensure category-appropriate teaching artifact exists.
   - If `solution.md`, `reasoning.md`, or teaching artifact are template/empty, treat them as output targets for this run.
   - If any of those files already has non-template content, stop immediately and report `skipped: already processed (multi-run not supported)`.
   - If required files are missing, stop and report what is missing.

2. Determine run history and increment counter
   - In the artifact directory, use `.skill-run-state.json` to track executions.
   - If file does not exist, create it with:
     - `run_count: 0`
     - `history: []`
   - Before authoring, increment `run_count` by 1 and append a history entry with:
     - `run_number`
     - `timestamp`
     - `mode: "artifact-implementer"`
   - Persist the updated state file.
   - Do not increment run state when the run is skipped.

3. Gather context from input directory
   - Read `agent-prompt.md` first.
   - Resolve the problem markdown path in this order:
     1) parse `- Source file:` from `solution.md` metadata,
     2) if present, parse `- Problem markdown:` from `agent-prompt.md`.
   - Read the resolved problem markdown before implementation.
   - Treat the problem markdown as authoritative for prompt details, constraints, and I/O.
   - Read `solution.md`, `reasoning.md`, and teaching artifact only when they already contain non-template content worth preserving.

4. Create a brief internal plan
   - Plan must include:
     - chosen approach
     - artifact updates to make
     - implementation output target path
   - Keep the plan concise and proceed immediately.

5. Author and update artifacts
   - Replace placeholder/template text in `solution.md` with concrete content.
   - Replace placeholder/template text in `reasoning.md` with concrete, problem-specific reasoning.
   - Update teaching artifact with problem-appropriate guidance:
     - DSA: concrete function signature and implementation notes in `teaching-stub.ts`
     - System Design: concrete architecture prompts in `teaching-notes.md`

6. Produce implementation output
   - DSA: create concrete TypeScript solution in target `.ts`.
   - System Design: create implementation-oriented architecture output in target `.md`.

7. Finalize
   - Summarize what was updated in artifact files and implementation output.
   - Report run-tracking info:
     - current `run_count`
     - whether this was first run or repeat run
   - If skipped, return a concise skip reason and do not modify artifact or implementation files.
   - Do not run tests and do not add test files unless user explicitly asks.

## Content extraction rules

- Use `solution.md` and `reasoning.md` as structured scaffolds, not as final truth.
- Use referenced problem markdown for exact problem semantics.
- Prefer concrete examples over abstract statements.

## Implementation contract extraction

From all gathered context, derive:

- function or API contract
- core invariant
- edge-case list
- complexity target

Then implement to that contract.

## Non-goals

- Do not perform repository-wide audits.
- Do not run validation scripts unless explicitly requested.
- Do not execute tests unless explicitly requested.

## Quality bar

DSA:
- No placeholder text remains in artifact markdowns.
- No generic naming (`solve`, `Input`, `Output`) unless user requested.
- Complexity in implementation comments matches `solution.md`.

System Design:
- Teaching and implementation docs include explicit tradeoffs and failure handling.
- No placeholder prompts remain.

## Notes on status updates

- Update queue/index statuses only if user explicitly requests status mutation in that run.

## Run tracking schema

Store this in `<artifact-dir>/.skill-run-state.json`:

```json
{
  "run_count": 2,
  "history": [
    {
      "run_number": 1,
      "timestamp": "2026-03-08T03:00:00Z",
      "mode": "artifact-implementer"
    },
    {
      "run_number": 2,
      "timestamp": "2026-03-08T03:10:00Z",
      "mode": "artifact-implementer"
    }
  ]
}
```

## Previous guidance retained

When deriving details, still:
   - From `solution.md`, capture approach, invariants, and complexity targets.
   - From `reasoning.md`, capture edge cases and sequencing.
   - From teaching artifact, capture naming and teaching intent.
   - From referenced problem markdown, capture final function contract details.

## Naming rules

- Prefer function names from problem slug:
  - `dsa-find-the-celebrity` -> `findTheCelebrity`
  - `dsa-merge-intervals` -> `mergeIntervals`
- Use descriptive type names:
  - `<ProblemName>Input`
  - `<ProblemName>Output`
- Avoid generic names (`solve`, `Input`, `Output`) unless user explicitly wants interview-minimal style.

## When to ask user before proceeding

Ask only if one of these is unclear:

- Which problem slug to implement
- Desired output path differs from defaults

Otherwise proceed directly.
