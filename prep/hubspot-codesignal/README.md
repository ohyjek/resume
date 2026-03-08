# HubSpot CodeSignal Prep

This folder is your working system for HubSpot-focused interview prep with a manual parallel-agent workflow.

## Start Here

- Run simulation: `01-timed-simulation-90m.md`
- Review after run: `01-retrospective-template.md`
- Drill plan: `02-targeted-drills.md`
- Problem library index: `problems/INDEX.md`

## Current Workflow (manual New Agent fan-out)

1. Generate reset artifact bundles + prompt files:
   - `powershell -NoProfile -ExecutionPolicy Bypass -File "prep/hubspot-codesignal/tools/prepare-dsa-agent-prompts.ps1"`
2. Open each:
   - `prep/hubspot-codesignal/artifacts/dsa/<problem-slug>/agent-prompt.md`
3. For each prompt file, copy full contents and paste into a new Cursor agent chat.
4. Let each agent run independently in parallel.
5. Each agent updates artifact docs and also writes a separate implementation file under `implementations/`.

Cursor slash-command equivalent:

- `/prepare-problem-agent-clipboard`

## Artifact layout

Per problem artifact bundle:

- `prep/hubspot-codesignal/artifacts/<category>/<problem-slug>/agent-prompt.md`
- `prep/hubspot-codesignal/artifacts/<category>/<problem-slug>/solution.md`
- `prep/hubspot-codesignal/artifacts/<category>/<problem-slug>/reasoning.md`
- DSA: `prep/hubspot-codesignal/artifacts/dsa/<problem-slug>/teaching-stub.ts`
- System Design: `prep/hubspot-codesignal/artifacts/system-design/<problem-slug>/teaching-notes.md`

## Implementation output layout

- `prep/hubspot-codesignal/implementations/dsa/<problem-slug>.ts`
- `prep/hubspot-codesignal/implementations/system-design/<problem-slug>.md`

## Structure

- `problems/dsa`: algorithm/data-structure prompts
- `problems/system-design`: architecture prompts
- `problems/behavioral`: STAR-style prompts
- `artifacts`: generated working bundles used by agents
- `templates`: template files used to reset artifact bundles
- `tools/prepare-dsa-agent-prompts.ps1`: prompt/bundle generator
