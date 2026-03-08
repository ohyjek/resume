# 01 - Timed Simulation (90 Minutes)

Use this as a realistic dry run for a "Progressive Filesystem"-style assessment.

## Rules

- 90 minutes hard stop.
- Single file implementation (`solution.ts`).
- No external libraries.
- Correctness first, then edge cases and complexity.

## Problem Statement

Implement an in-memory filesystem that supports commands in order and returns output for read operations.

### Operations

1. `mkdir(path)`
   - Create directory and any missing intermediate directories.
2. `addContentToFile(filePath, content)`
   - Create file if missing.
   - Append content if file already exists.
3. `readContentFromFile(filePath)`
   - Return file content.
4. `ls(path)`
   - If `path` is a file, return `[fileName]`.
   - If `path` is a directory, return all child names sorted lexicographically.
5. `rm(path)` (extension requirement)
   - Remove file or directory recursively if exists.
   - No-op if path does not exist.

### Input/Output Model (for local practice)

Input:

```ts
type Command =
  | ["mkdir", string]
  | ["add", string, string]
  | ["read", string]
  | ["ls", string]
  | ["rm", string];
```

Output:

```ts
string[] // only for "read" and "ls" commands
```

Notes:

- For local harness simplicity, convert each `ls` array to one comma-separated string.
- If `ls` returns an empty list, the emitted output string is `""`.

## Sample

Commands:

```ts
[
  ["mkdir", "/a/b"],
  ["add", "/a/b/x.txt", "hello"],
  ["add", "/a/b/x.txt", " world"],
  ["read", "/a/b/x.txt"],
  ["ls", "/a/b"],
  ["rm", "/a/b/x.txt"],
  ["ls", "/a/b"]
]
```

Expected output:

```ts
["hello world", "x.txt", ""]
```

## Time Boxing

- 0-8 min: parse prompt + invariants
- 8-18 min: data model and helper functions
- 18-55 min: core ops (`mkdir`, `add`, `read`, `ls`)
- 55-75 min: `rm` + edge cases
- 75-85 min: simplify/refactor small hotspots
- 85-90 min: final pass and submit stable version

Escalation rule:

- If blocked for 6+ minutes, stop coding and write the failing invariant in one sentence.
- Either simplify scope to stable baseline or switch to a helper-based rewrite of only the failing operation.

## Scoring Rubric (Self-Score)

- 0-4: directories/files modeled incorrectly, frequent path bugs
- 5-7: baseline commands work, misses edge cases
- 8-9: robust behavior, clean helper boundaries, good complexity
- 10: complete + concise + clearly reasoned tradeoffs

## Edge Cases Checklist

- root path (`"/"`) handling
- duplicate slashes (`"//a///b"`) normalization
- `ls` on file vs directory
- append behavior for existing files
- remove non-existent path
- deleting nested directories
- `mkdir` called repeatedly on existing path
- `add` called on path whose parent does not yet exist

## Deliverables (after run)

- Save final solution to `prep/hubspot-codesignal/artifacts/sim1-solution.ts`
- Fill `01-retrospective-template.md`
- Record minute reached for baseline completion (target: <= 55)
