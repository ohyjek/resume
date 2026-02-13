# Resume

LaTeX source for my resume. Built for fun and nostalgia from college LaTeX days.

## Build

**Requirements:** A LaTeX distribution (e.g. [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/) on Windows).

**Easiest:** from the repo root in PowerShell:

```powershell
.\build.ps1
```

The script finds MiKTeX even when it’s not on PATH (e.g. user install under `%LOCALAPPDATA%\Programs\MiKTeX`).

**If `pdflatex` is on PATH:**

```bash
pdflatex main.tex
```

**Adding MiKTeX to PATH (optional):** Add this to your user PATH so `pdflatex` works in any terminal:

- `%LOCALAPPDATA%\Programs\MiKTeX\miktex\bin\x64`

Run pdflatex twice if you add references or a table of contents. Output: `main.pdf`.

## Layout

- `main.tex` — single-file resume: contact, summary, experience, education, skills, publications, languages.
- Edit sections and content directly in `main.tex`. Uses standard `article` + `geometry`, `enumitem`, `titlesec`, and `hyperref` (no custom class).

## License

See [LICENSE](LICENSE).
