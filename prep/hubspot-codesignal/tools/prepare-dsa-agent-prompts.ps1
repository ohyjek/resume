param(
  [string]$ProblemsRoot = "prep/hubspot-codesignal/problems/dsa",
  [string]$ArtifactsRoot = "prep/hubspot-codesignal/artifacts/dsa",
  [string]$ImplementationsRoot = "prep/hubspot-codesignal/implementations/dsa",
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

function Get-RenderedSolutionTemplate {
  param(
    [string]$TemplateContent,
    [string]$ProblemTitle,
    [string]$ProblemDifficulty,
    [string]$ProblemRelPath,
    [string]$LastUpdatedValue
  )
  $solution = $TemplateContent
  $solution = $solution -replace "Problem title:", "Problem title: $ProblemTitle"
  $solution = $solution -replace "Category:", "Category: DSA"
  $solution = $solution -replace "Source file:", "Source file: $ProblemRelPath"
  $solution = $solution -replace "Difficulty:", "Difficulty: $ProblemDifficulty"
  $solution = $solution -replace "Last-updated:", "Last-updated: $LastUpdatedValue"
  return $solution
}

function Normalize-SolutionForComparison {
  param([string]$Content)
  if ($null -eq $Content) { return "" }
  $normalized = $Content -replace "`r`n", "`n"
  $normalized = $normalized -replace "`r", "`n"
  # Ignore date differences so prior template-only runs are treated as untouched.
  $normalized = $normalized -replace '(?m)^- Last-updated:\s*.*$', "- Last-updated:"
  return $normalized.Trim()
}

function Confirm-CleanResetForProblem {
  param([string]$Slug)
  while ($true) {
    $response = Read-Host "Detected non-template solution for '$Slug'. Reset artifacts + implementation? (y/N)"
    if (-not $response) { return $false }
    switch ($response.Trim().ToLowerInvariant()) {
      "y" { return $true }
      "yes" { return $true }
      "n" { return $false }
      "no" { return $false }
      default { Write-Host "Please enter y or n." }
    }
  }
}

$problemsRootFull = Resolve-RepoPath $ProblemsRoot
$artifactsRootFull = Resolve-RepoPath $ArtifactsRoot
$implementationsRootFull = Resolve-RepoPath $ImplementationsRoot
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

$null = New-Item -ItemType Directory -Path $artifactsRootFull -Force
$null = New-Item -ItemType Directory -Path $implementationsRootFull -Force

$problemFiles = @(Get-ChildItem -Path $problemsRootFull -File -Filter "*.md" | Sort-Object Name)
if (@($problemFiles).Count -eq 0) {
  Write-Host "No DSA problem files found under: $problemsRootFull"
  exit 0
}

$updatedPrompts = @()
$resetArtifactsCount = 0
$preservedArtifactsCount = 0
$resetImplementationsCount = 0
$solutionTemplateContent = Get-Content -Path $solutionTemplateFull -Raw
$reasoningTemplateContent = Get-Content -Path $reasoningTemplateFull -Raw
$stubTemplateContent = Get-Content -Path $dsaStubTemplateFull -Raw

foreach ($problemFile in $problemFiles) {
  $slug = [System.IO.Path]::GetFileNameWithoutExtension($problemFile.Name)
  $meta = Get-ProblemMeta -ProblemFilePath $problemFile.FullName
  $problemRelPath = "prep/hubspot-codesignal/problems/dsa/$($problemFile.Name)"
  $artifactRelPath = "prep/hubspot-codesignal/artifacts/dsa/$slug"
  $artifactDir = Join-Path $artifactsRootFull $slug
  $implementationPath = Join-Path $implementationsRootFull "$slug.ts"

  $null = New-Item -ItemType Directory -Path $artifactDir -Force

  $solutionPath = Join-Path $artifactDir "solution.md"
  $reasoningPath = Join-Path $artifactDir "reasoning.md"
  $stubPath = Join-Path $artifactDir "teaching-stub.ts"
  $promptPath = Join-Path $artifactDir "agent-prompt.md"
  $legacyRunStatePath = Join-Path $artifactDir ".skill-run-state.json"

  $lastUpdated = Get-Date -Format "yyyy-MM-dd"
  $shouldResetArtifacts = -not $NoClean

  if ($shouldResetArtifacts -and (Test-Path $solutionPath)) {
    $existingSolution = Get-Content -Path $solutionPath -Raw
    $expectedTemplate = Get-RenderedSolutionTemplate `
      -TemplateContent $solutionTemplateContent `
      -ProblemTitle $meta.Title `
      -ProblemDifficulty $meta.Difficulty `
      -ProblemRelPath $problemRelPath `
      -LastUpdatedValue $lastUpdated

    $existingNormalized = Normalize-SolutionForComparison -Content $existingSolution
    $expectedNormalized = Normalize-SolutionForComparison -Content $expectedTemplate

    if ($existingNormalized -ne $expectedNormalized) {
      $shouldResetArtifacts = Confirm-CleanResetForProblem -Slug $slug
    }
  }

  if ($shouldResetArtifacts) {
    Get-ChildItem -Path $artifactDir -Force | Remove-Item -Recurse -Force
    $resetArtifactsCount += 1
  } else {
    $preservedArtifactsCount += 1
    # Legacy migration: this state file is no longer used by the skill workflow.
    if (Test-Path $legacyRunStatePath) {
      Remove-Item -Path $legacyRunStatePath -Force
    }
  }

  if ($shouldResetArtifacts) {
    $solution = Get-RenderedSolutionTemplate `
      -TemplateContent $solutionTemplateContent `
      -ProblemTitle $meta.Title `
      -ProblemDifficulty $meta.Difficulty `
      -ProblemRelPath $problemRelPath `
      -LastUpdatedValue $lastUpdated
    Set-Content -Path $solutionPath -Value $solution

    $reasoning = $reasoningTemplateContent
    $reasoning = $reasoning -replace "Problem title:", "Problem title: $($meta.Title)"
    $reasoning = $reasoning -replace "Category:", "Category: DSA"
    $reasoning = $reasoning -replace "Source file:", "Source file: $problemRelPath"
    $reasoning = $reasoning -replace "Last-updated:", "Last-updated: $lastUpdated"
    Set-Content -Path $reasoningPath -Value $reasoning

    $functionName = ConvertTo-FunctionName -Slug $slug
    $functionNamePascal = ConvertTo-PascalCase -Name $functionName
    $stub = $stubTemplateContent
    $stub = $stub.Replace("<PROBLEM_TITLE>", $meta.Title)
    $stub = $stub.Replace("<CATEGORY>", "DSA")
    $stub = $stub.Replace("<FUNCTION_NAME>", $functionName)
    $stub = $stub.Replace("<FUNCTION_NAME_PASCAL>", $functionNamePascal)
    Set-Content -Path $stubPath -Value $stub

    # Keep implementation reset in sync with clean artifact reset.
    Set-Content -Path $implementationPath -Value $stub
    $resetImplementationsCount += 1
  }

  $prompt = "/hubspot-problem-agent $artifactRelPath"
  Set-Content -Path $promptPath -Value $prompt -NoNewline
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
  Write-Host "Mode: clean-reset (template solutions auto-reset; custom solutions require confirmation)."
  Write-Host "Artifacts reset: $resetArtifactsCount"
  Write-Host "Artifacts preserved: $preservedArtifactsCount"
  Write-Host "Implementations reset: $resetImplementationsCount"
}
