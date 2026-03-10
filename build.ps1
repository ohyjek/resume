# Build resume PDF with MiKTeX (works even when pdflatex is not on PATH)
# Usage: .\build.ps1                          # builds main.tex
#        .\build.ps1 companies\sway\main.tex  # builds a specific .tex file
param(
    [string]$TexFile = "main.tex"
)

$miktexPaths = @(
    "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64\pdflatex.exe",
    "C:\Program Files\MiKTeX\miktex\bin\x64\pdflatex.exe"
)
$pdflatex = $null
foreach ($p in $miktexPaths) {
    if (Test-Path $p) { $pdflatex = $p; break }
}
if (-not $pdflatex) {
    $pdflatex = (Get-Command pdflatex -ErrorAction SilentlyContinue).Source
}
if (-not $pdflatex) {
    Write-Error "pdflatex not found. Install MiKTeX or add it to PATH."
    exit 1
}

$resolvedTex = Join-Path $PSScriptRoot $TexFile
if (-not (Test-Path $resolvedTex)) {
    Write-Error "File not found: $resolvedTex"
    exit 1
}

$texDir = Split-Path $resolvedTex -Parent
$texName = Split-Path $resolvedTex -Leaf

Push-Location $texDir
try {
    & $pdflatex -interaction=nonstopmode $texName
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    $outPdf = [System.IO.Path]::ChangeExtension($texName, ".pdf")
    Write-Host "Done. Output: $(Join-Path $texDir $outPdf)" -ForegroundColor Green
} finally {
    Pop-Location
}
