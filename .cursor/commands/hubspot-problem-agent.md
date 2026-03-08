HubSpot Problem Agent

Use this as the default command for a brand new agent run on one problem.

Inputs

- Required: artifact directory path
  - example: `prep/hubspot-codesignal/artifacts/dsa/dsa-find-the-celebrity`
- Optional: implementation output override path

Execution rules

- Use `hubspot-artifact-implementer` skill.
- Context gathering is required and scoped:
  1. Read `agent-prompt.md` in the artifact directory.
  2. Parse and read the referenced problem markdown path.
  3. If `solution.md`, `reasoning.md`, or teaching artifact already has non-template content, treat this as already processed and skip the run.
- Then perform full workflow in one run:
  - create brief plan
  - update artifact markdowns with concrete content
  - create implementation output file
- Do not run tests, validators, or repo-wide audits.

Output requirements

- Return:
  1. artifact directory used,
  2. skip status (`skipped` or `executed`) and reason,
  3. files updated in artifact folder,
  4. implementation output path,
  5. concise summary of solution approach.
