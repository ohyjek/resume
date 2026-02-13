# Build resume PDF with MiKTeX (works even when pdflatex is not on PATH)
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

$root = $PSScriptRoot
Push-Location $root
try {
    & $pdflatex -interaction=nonstopmode main.tex
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "Done. Output: main.pdf" -ForegroundColor Green
} finally {
    Pop-Location
}
