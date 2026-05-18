# Radoro — Troubleshooting Log

> Errors encountered during development, their causes, and solutions.

---

## Step 3: Typo in Tailwind package name

### Error
ERR_PNPM_FETCH_404 GET https://registry.npmjs.org/@tainwindcss%2Fvite: Not Found - 404
This error happened while installing a direct dependency of C:\Projects\radoro
@tainwindcss/vite is not in the npm registry, or you have no permission to fetch it.
### Cause
Typo in the package name: `@tainwindcss/vite` instead of `@tailwindcss/vite`.
Missing the letter `l` in "tai**l**wind".

### Solution
Run the command with the correct package name:
```bash
pnpm add tailwindcss @tailwindcss/vite
```

### Lesson Learned
- Always double-check package names against official documentation.
- npm registry returns 404 when a package doesn't exist — usually a typo indicator.
- Use VS Code's IntelliSense or copy directly from official docs to avoid typos.

---

## Step 3: Typo `git remove` instead of `git remote`

### Error

$ git remove -v
git: 'remove' is not a git command. See 'git --help'.
The most similar command is
remote
### Cause
Typo: `git remove` instead of `git remote`. Git CLI doesn't have a `remove` command.

### Solution
Use the correct command:
```bash
git remote -v
```

### Lesson Learned
- Git CLI suggests similar commands when there's a typo. Always read the hint.
- Common Git subcommands: `add`, `commit`, `push`, `pull`, `remote`, `branch`, `status`, `log`.

---

## Step 3: LF/CRLF Line Ending Warnings

### Error / Warning

warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
... (multiple files)

### Context
Happened during `git add .` after Prettier formatted files with LF endings, while Windows Git defaults to CRLF.

### Cause
Cross-platform line ending mismatch:
- **Prettier config** (`.prettierrc`) — set to `"endOfLine": "lf"` (Linux/Mac style)
- **Windows Git default** — auto-converts to CRLF (Windows style)
- Result: Git warns about the conversion

### Solution
Create `.gitattributes` at project root to enforce LF consistently across all platforms:

text=auto eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.jsx text eol=lf
*.json text eol=lf
*.md text eol=lf
*.css text eol=lf
*.html text eol=lf
*.yaml text eol=lf
*.yml text eol=lf
*.svg text eol=lf
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
*.mp3 binary
*.wav binary
*.ogg binary

Then re-normalize:
```bash
git reset
git add --renormalize .
git add .
```

After applying `.gitattributes`, the warning direction reversed:

CRLF will be replaced by LF the next time Git touches it

This is correct behavior — Git is now normalizing existing CRLF files to LF.

### Lesson Learned
- Always include `.gitattributes` in cross-platform projects.
- Choose ONE line ending style and enforce it everywhere (Prettier + Git + editor).
- LF is the modern standard, even on Windows. Most modern editors handle both correctly.
- Line ending warnings are not errors — files still commit, but inconsistency leads to messy diffs.

---

## Template for Future Errors

### Error