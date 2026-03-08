param(
  [string]$ProblemsRoot = "prep/hubspot-codesignal/problems/dsa",
  [string]$ArtifactsRoot = "prep/hubspot-codesignal/artifacts/dsa",
  [string]$SolutionTemplate = "prep/hubspot-codesignal/templates/problem-solution.md",
  [string]$ReasoningTemplate = "prep/hubspot-codesignal/templates/problem-reasoning.md",
  [string]$DsaStubTemplate = "prep/hubspot-codesignal/templates/problem-teaching-stub-dsa.ts",
  [switch]$NoClean
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Resolve-RepoPath {
  param([string]$PathValue)
  if ([System.IO.Path]::IsPathRooted($PathValue)) {
    return [System.IO.Path]::GetFullPath($PathValue)
  }
  $repoRoot = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
  return [System.IO.Path]::GetFullPath((Join-Path $repoRoot $PathValue))
}

function ConvertTo-FunctionName {
  param([string]$Slug)
  $base = $Slug
  if ($base -match '^[a-z]+-(.+)$') {
    $base = $Matches[1]
  }
  $parts = @($base.Split('-') | Where-Object { $_ -ne "" })
  if (@($parts).Count -eq 0) {
    return "solveProblem"
  }
  $first = $parts[0].ToLower()
  $rest = @()
  foreach ($part in ($parts | Select-Object -Skip 1)) {
    if ($part.Length -eq 0) { continue }
    $rest += ($part.Substring(0, 1).ToUpper() + $part.Substring(1).ToLower())
  }
  $candidate = "$first$($rest -join '')"
  if ($candidate -match '^[0-9]') {
    return "solve$($candidate)"
  }
  return $candidate
}

function ConvertTo-PascalCase {
  param([string]$Name)
  if (-not $Name) {
    return "SolveProblem"
  }
  return $Name.Substring(0, 1).ToUpper() + $Name.Substring(1)
}

function Get-ProblemMeta {
  param([string]$ProblemFilePath)
  $lines = Get-Content -Path $ProblemFilePath
  $title = ""
  $difficulty = ""
  foreach ($line in $lines) {
    if (-not $title -and $line -match '^#\s+(.+)$') {
      $title = $Matches[1].Trim()
      continue
    }
    if (-not $difficulty -and $line -match '^- Difficulty:\s*(.+)$') {
      $difficulty = $Matches[1].Trim()
    }
    if ($title -and $difficulty) {
      break
    }
  }
  if (-not $title) {
    $title = [System.IO.Path]::GetFileNameWithoutExtension($ProblemFilePath)
  }
  if (-not $difficulty) {
    $difficulty = "Unknown"
  }
  return [pscustomobject]@{
    Title = $title
    Difficulty = $difficulty
  }
}

$problemsRootFull = Resolve-RepoPath $ProblemsRoot
$artifactsRootFull = Resolve-RepoPath $ArtifactsRoot
$solutionTemplateFull = Resolve-RepoPath $SolutionTemplate
$reasoningTemplateFull = Resolve-RepoPath $ReasoningTemplate
$dsaStubTemplateFull = Resolve-RepoPath $DsaStubTemplate
$repoRootFull = Split-Path -Parent (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))

if (-not (Test-Path $problemsRootFull)) {
  throw "Problems root does not exist: $problemsRootFull"
}
if (-not (Test-Path $solutionTemplateFull)) {
  throw "Missing template: $solutionTemplateFull"
}
if (-not (Test-Path $reasoningTemplateFull)) {
  throw "Missing template: $reasoningTemplateFull"
}
if (-not (Test-Path $dsaStubTemplateFull)) {
  throw "Missing template: $dsaStubTemplateFull"
}

$problemFiles = @(Get-ChildItem -Path $problemsRootFull -File -Filter "*.md" | Sort-Object Name)
if (@($problemFiles).Count -eq 0) {
  Write-Host "No DSA problem files found under: $problemsRootFull"
  exit 0
}

$updatedPrompts = @()

foreach ($problemFile in $problemFiles) {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($problemFile.Name)
  $meta = Get-ProblemMeta -ProblemFilePath $problemFile.FullName
  $problemRelPath = "prep/hubspot-codesignal/problems/dsa/$($problemFile.Name)"
  $artifactRelPath = "prep/hubspot-codesignal/artifacts/dsa/$slug"
  $artifactDir = Join-Path $artifactsRootFull $slug

  $null = New-Item -ItemType Directory -Path $artifactDir -Force
  if (-not $NoClean) {
    Get-ChildItem -Path $artifactDir -Force | Remove-Item -Recurse -Force
  }

  $solutionPath = Join-Path $artifactDir "solution.md"
  $reasoningPath = Join-Path $artifactDir "reasoning.md"
  $stubPath = Join-Path $artifactDir "teaching-stub.ts"
  $promptPath = Join-Path $artifactDir "agent-prompt.md"

  $lastUpdated = Get-Date -Format "yyyy-MM-dd"

  $solution = Get-Content -Path $solutionTemplateFull -Raw
  $solution = $solution -replace "Problem title:", "Problem title: $($meta.Title)"
  $solution = $solution -replace "Category:", "Category: DSA"
  $solution = $solution -replace "Source file:", "Source file: $problemRelPath"
  $solution = $solution -replace "Difficulty:", "Difficulty: $($meta.Difficulty)"
  $solution = $solution -replace "Last-updated:", "Last-updated: $lastUpdated"
  Set-Content -Path $solutionPath -Value $solution

  $reasoning = Get-Content -Path $reasoningTemplateFull -Raw
  $reasoning = $reasoning -replace "Problem title:", "Problem title: $($meta.Title)"
  $reasoning = $reasoning -replace "Category:", "Category: DSA"
  $reasoning = $reasoning -replace "Source file:", "Source file: $problemRelPath"
  $reasoning = $reasoning -replace "Last-updated:", "Last-updated: $lastUpdated"
  Set-Content -Path $reasoningPath -Value $reasoning

  $functionName = ConvertTo-FunctionName -Slug $slug
  $functionNamePascal = ConvertTo-PascalCase -Name $functionName
  $stub = Get-Content -Path $dsaStubTemplateFull -Raw
  $stub = $stub.Replace("<PROBLEM_TITLE>", $meta.Title)
  $stub = $stub.Replace("<CATEGORY>", "DSA")
  $stub = $stub.Replace("<FUNCTION_NAME>", $functionName)
  $stub = $stub.Replace("<FUNCTION_NAME_PASCAL>", $functionNamePascal)
  Set-Content -Path $stubPath -Value $stub

  $prompt = @"
/hubspot-problem-agent
artifact directory path: $artifactRelPath
"@
  Set-Content -Path $promptPath -Value $prompt
  $updatedPrompts += $promptPath
}

Write-Host "Prepared DSA artifact prompts: $($updatedPrompts.Count)"
Write-Host "Prompt files:"
foreach ($path in $updatedPrompts) {
  $relative = $path.Replace("$repoRootFull\", "")
  Write-Host " - $relative"
}
if ($NoClean) {
  Write-Host "Mode: no-clean (existing artifact files preserved except rewritten templates/prompts)."
} else {
  Write-Host "Mode: clean-reset (DSA artifact directories reset to template baseline)."
}
