# Resume

Built from LaTeX (`main.tex`). The PDF is built and deployed automatically on every push to `main`.

**One-time setup:** In the repo go to **Settings → Pages** and set **Source** to **GitHub Actions** (so the workflow can deploy).

**View resume:** after the first deploy, open  
`https://<your-github-username>.github.io/resume/main.pdf`  
or use the link from the repo’s **Settings → Pages** (source: GitHub Actions).

## Build locally

```powershell
.\build.ps1
```

Output: `main.pdf`
