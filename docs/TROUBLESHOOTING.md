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

---

## Step 4: Supabase CLI Login Failed Due to Username with Space

### Error

Unable to create CLI sign-in
Supabase could not create the CLI sign-in session.
Error: Unknown error

### Context
Running `supabase login` opens browser for OAuth authorization, but the page shows "Unable to create CLI sign-in" error.

### Cause

Windows username contains a space (`rafs loq`), which gets included in the auto-generated token name:
token_name=cli_DESKTOP-5KPP3ML\rafs loq@DESKTOP-5KPP3ML
↑ space here

Supabase backend doesn't handle this gracefully.

### Solution
**Option A** (didn't work in our case): Use custom token name flag:
```powershell
supabase login --name radoro-cli
```

**Option B** (worked): Generate Personal Access Token manually from dashboard:
1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate new token"
3. Name: `radoro-cli`
4. Copy the token (`sbp_...`)
5. Set as environment variable:
```powershell
   $env:SUPABASE_ACCESS_TOKEN = "TOKEN_HERE"
```
6. Verify with:
```powershell
   supabase projects list
```

### Lesson Learned
- Windows usernames with spaces cause subtle issues across many developer tools.
- Personal Access Tokens are a reliable fallback for CI/CD or restricted environments.
- Always have a non-OAuth authentication method available.

---

## Step 4: Permanent Env Variable Not Loading in New Terminal

### Error
After setting permanent environment variable, the value was empty when echoed in a new PowerShell session:
```powershell
echo $env:SUPABASE_ACCESS_TOKEN
# (empty output)
```

### Context
Set the variable permanent via:
```powershell
[System.Environment]::SetEnvironmentVariable('SUPABASE_ACCESS_TOKEN', 'TOKEN', 'User')
```

### Cause
PowerShell sessions cache environment variables when started. Opening a "new" terminal inside VS Code doesn't always create a truly fresh session — VS Code may reuse the cached parent environment.

### Solution
Full restart of VS Code:
1. Close VS Code completely
2. Reopen VS Code
3. Open project folder
4. Open new terminal
5. Verify:
```powershell
   echo $env:SUPABASE_ACCESS_TOKEN
```

### Lesson Learned
- Permanent environment variables require a fresh shell session to load.
- "New terminal" in VS Code is not always a fresh session — sometimes a full VS Code restart is needed.
- Use `[System.Environment]::GetEnvironmentVariable('NAME', 'User')` to verify the variable was actually saved to system, independent of current session cache.

---

## Step 4: Console Error 404 on Supabase Test (NOT AN ERROR)

### Error / Warning

Failed to load resource: the server responded with a status of 404 ()
rkcksearylookrzvztge...?select=*&limit=1:1

### Context
Appears in browser DevTools Console when testing Supabase connection on first load.

### Cause
**This is NOT an error.** Our connection test queries a non-existent table (`_test_dummy_table`) intentionally to verify the connection.

- ✅ React → Supabase cloud network request succeeded
- ✅ Authentication (publishable key) valid
- ✅ Supabase responded with HTTP 404 (table not found) — expected
- ✅ Our code catches this as "connection successful" because it confirms the API is reachable

### Solution
None needed — the 404 is the expected response. The UI displays "✅ Supabase connected successfully!" which is the actual success indicator.

### Lesson Learned
- HTTP status codes ≠ application errors. A 404 from Supabase API means "endpoint responded, but resource not found" — connection is working.
- Real connection failures show: CORS errors, network errors, or 401/403 (auth errors).
- Always interpret errors in the context of what the code is testing.

---

## Step 5: GitHub Integration Didn't Auto-Deploy Migration

### Error / Behavior
- Pushed migration file (`create_profiles_table.sql`) to GitHub `main` branch.
- Expected: Supabase auto-deploys migration to cloud database.
- Actual: Migration didn't deploy. Table `profiles` didn't appear in Table Editor even after 5+ minutes.

### Context
GitHub Integration was set up in Supabase, but with "Deploy to production" toggle initially OFF.

### Cause (suspected)
- "Deploy to production" toggle was OFF when migration was first pushed.
- Toggle was enabled afterward, but Supabase didn't auto-trigger deploy for past commits.
- Possibly need to push a new commit *after* enabling toggle for it to take effect.

### Solution (Workaround)
Manual deploy via CLI bypasses GitHub Integration entirely:
```powershell
supabase db push
```

This deployed the migration successfully and `profiles` table appeared in Table Editor.

### Future Investigation
- [ ] After enabling "Deploy to production" toggle + setting branch name to `main`, push a fresh commit to verify auto-deploy works.
- [ ] Check Supabase Integrations docs for required setup details.
- [ ] Investigate if Free Plan has limitations on auto-deploy.

### Lesson Learned
- Always verify integration settings (especially toggles) **before** pushing important changes.
- Have a fallback strategy (manual push) when integrations don't work as expected.
- Don't get stuck investigating issues — workaround first, deep-dive later.