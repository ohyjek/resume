# Problems Library Guide

Use this folder to keep canonical interview problem statements.

## File naming

- Use `kebab-case`.
- Prefix by category when helpful (for example `dsa-merge-two-sorted-lists.md`).

## Metadata conventions

At the top of each problem file, keep this metadata block:

- Category
- Difficulty
- Frequency
- Status (`stub`, `in-progress`, `validated`)
- Last-updated
- Primary-source

## Required sections

Every problem file must keep the same section order from `PROBLEM_TEMPLATE.md`:

1. Prompt (normalized)
2. What it is really asking
3. Input/Output expectations
4. Constraints and edge cases
5. Solution paths
6. Recommended baseline approach
7. Complexity
8. Common pitfalls
9. Follow-up variants
10. Practice checklist
11. Related HubSpot sightings

## Update protocol

- Keep problem markdowns under `dsa`, `system-design`, and `behavioral` as canonical source prompts.
- Generate or refresh artifact bundles before fan-out:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File "prep/hubspot-codesignal/tools/prepare-dsa-agent-prompts.ps1"`
- Open each generated `agent-prompt.md`, then manually copy/paste into a new agent.
- Keep source phrasing concise in `Related HubSpot sightings` instead of copying full posts.

## Required artifact bundle per problem

Each problem should have an artifact folder with:

- `artifacts/<category>/<problem-slug>/agent-prompt.md`
- `artifacts/<category>/<problem-slug>/solution.md`
- `artifacts/<category>/<problem-slug>/reasoning.md`
- DSA: `artifacts/dsa/<problem-slug>/teaching-stub.ts`
- System Design: `artifacts/system-design/<problem-slug>/teaching-notes.md`

Final implementation outputs remain separate and are written to:

- `prep/hubspot-codesignal/implementations/dsa/<problem-slug>.ts`
- `prep/hubspot-codesignal/implementations/system-design/<problem-slug>.md`

Use templates from `../templates`:

- `problem-solution.md`
- `problem-reasoning.md`
- `problem-teaching-stub.ts`
