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

## Template for Future Errors

### Error

### Context
- What were you doing when it happened?
- Which step were you in?

### Cause
[Explain the root cause]

### Solution
[Step-by-step fix]

### Lesson Learned
[Takeaway / how to prevent next time]

---