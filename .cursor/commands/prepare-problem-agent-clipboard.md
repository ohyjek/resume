Prepare Problem Agent Clipboard

Generate paste-ready prompts for all DSA problems so each can be manually copied into a new agent.

Execution rules
- Run:
  - `powershell -NoProfile -ExecutionPolicy Bypass -File "prep/hubspot-codesignal/tools/prepare-dsa-agent-prompts.ps1"`
- Do not run other scripts unless user asks.

Output requirements
- Return:
  1) number of prompt files generated,
  2) where they were written (`prep/hubspot-codesignal/artifacts/dsa/*/agent-prompt.md`),
  3) reminder: "Open each `agent-prompt.md`, copy its full contents, click New Agent, paste, send."

Optional variants (only when user asks)
- Preserve existing artifact files (no clean reset):
  - `powershell -NoProfile -ExecutionPolicy Bypass -File "prep/hubspot-codesignal/tools/prepare-dsa-agent-prompts.ps1" -NoClean`
