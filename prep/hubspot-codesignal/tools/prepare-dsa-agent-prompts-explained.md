# `prepare-dsa-agent-prompts.ps1` Explained (for TypeScript Engineers)

This is a guided walkthrough of `prep/hubspot-codesignal/tools/prepare-dsa-agent-prompts.ps1`.

If you are strong in TypeScript but lighter on shell/PowerShell, think of this script as a deterministic batch job:

- input: problem markdown files in `problems/dsa`
- transform: derive metadata + apply templates
- output: reset/preserved artifacts, implementation stubs, and one prompt file per problem

---

## Mental Model: It Is Basically a DSA Pipeline

You can model this as:

- **Array of problems** (`problemFiles`)
- **Per-element transform** (parse metadata, decide reset, render templates)
- **Conditional branch** (clean-reset vs preserve)
- **Accumulation** (`updatedPrompts`, reset counters)

In DSA terms, this is a single-pass loop over sorted input plus bounded string processing per element.

---

## What the Script Does End-to-End

1. Resolve all paths to absolute paths (`Resolve-RepoPath`).
2. Validate required directories/templates exist.
3. Enumerate all DSA problem files (`*.md`) and sort them.
4. For each problem:
   - compute slug (`dsa-two-sum` style)
   - parse title/difficulty from markdown
   - derive artifact/implementation paths
   - decide whether reset is allowed/needed
   - if reset:
     - regenerate `solution.md`, `reasoning.md`, `teaching-stub.ts`
     - regenerate implementation stub in `implementations/dsa/<slug>.ts`
   - always regenerate `agent-prompt.md`
5. Print summary stats and mode info.

---

## The Interesting Part: Safe Reset Logic

The script now prevents accidental wipe of custom solutions.

### Rule

- If `-NoClean` is passed: no reset path is taken.
- In clean mode:
  - if `solution.md` is still template-like, reset automatically
  - if `solution.md` appears custom, ask user to confirm reset for that specific slug

### How "template-like" is detected

It renders what the template *should* look like for that problem, then compares normalized strings:

- normalize line endings (`CRLF` vs `LF`)
- ignore `Last-updated` value differences
- trim edges

If normalized content differs, it is considered non-template/custom.

This is effectively a structural equality check with one ignored field (date).

---

## Function-by-Function Map

### `Resolve-RepoPath`

Equivalent to a robust `path.resolve(...)` utility in TS:

- accepts relative/absolute
- returns absolute full path

### `ConvertTo-FunctionName` and `ConvertTo-PascalCase`

Generate stable function/type names from slug:

- `dsa-find-the-celebrity` -> `findTheCelebrity`
- `findTheCelebrity` -> `FindTheCelebrity`

### `Get-ProblemMeta`

Parses markdown lines to extract:

- first `# ...` as title
- `- Difficulty: ...` as difficulty

Uses fallbacks if missing.

### `Get-RenderedSolutionTemplate`

Template rendering helper for `solution.md`.
Think: a tiny handwritten templating function, not a full engine.

### `Normalize-SolutionForComparison`

Canonicalization function before comparison:

- line ending normalization
- date-line scrubbing
- trim

### `Confirm-CleanResetForProblem`

Per-problem interactive guardrail (`y/yes/n/no`, default no).

---

## Pseudocode in TypeScript Terms

```ts
for (const problem of sortedProblemFiles) {
  const meta = parseMeta(problem);
  let shouldReset = !noClean;

  if (shouldReset && exists(solutionPath)) {
    const existing = normalize(read(solutionPath));
    const expected = normalize(renderSolutionTemplate(meta, today));
    if (existing !== expected) {
      shouldReset = askUserYesNo(`Reset ${slug}?`);
    }
  }

  if (shouldReset) {
    clearArtifactDir(slug);
    writeSolution(meta);
    writeReasoning(meta);
    const stub = renderStub(meta);
    writeTeachingStub(stub);
    writeImplementationStub(stub);
  }

  writeAgentPrompt(slug); // always
}
```

---

## Complexity: How Expensive Is It?

Let:

- `N` = number of problem files
- `S` = average size of `solution.md`/templates
- `F` = average number of files in one artifact folder

### Time

- File enumeration/sort: `O(N log N)` (sorting by name)
- Main loop:
  - metadata parse: linear in problem-file length
  - optional compare: `O(S)`
  - reset branch file delete/write: proportional to files/content touched

Practical total: roughly `O(N log N + N * (S + F))` with I/O dominating CPU.

### Space

- In-memory template strings + small per-problem strings/counters
- `O(S)` working memory per iteration (effectively constant for this dataset)

In normal repo scale, complexity is low; disk I/O is the limiting factor, not algorithmic overhead.

---

## Why This Design Is Reasonable

- **Deterministic output**: same input + choices => same generated artifacts.
- **Guardrails where it matters**: only prompt when a solution looks custom.
- **Fast defaults**: template-only problems reset with no interaction.
- **Single source of truth**: templates drive both artifact stubs and implementation stubs.

---

## Caveats / Things to Keep in Mind

- "Custom solution" detection only looks at `solution.md`, not `reasoning.md` or stubs.
- In clean mode, if user confirms reset, both artifact files and implementation stub are replaced.
- Prompt files are always regenerated, even when a problem is preserved.

If you ever want stricter safety, add similar content checks for `reasoning.md` and `teaching-stub.ts` before reset.

---

## If You Want To Treat It Like a Practice Problem

A fun framing:

- **Problem**: Given a set of problem descriptors and artifact folders, regenerate prompt files and optionally reset derived artifacts while preserving user-authored work unless explicitly confirmed.
- **Core pattern**: scan + classify + conditional rewrite.
- **Invariant**: after each iteration, `agent-prompt.md` is correct for that slug; reset side effects are applied only when allowed.
- **Follow-up**: make it non-interactive with flags like `-ForceResetCustom` or `-SkipCustom`.

That is basically "filesystem interval scheduling" meets "safe overwrite semantics."
