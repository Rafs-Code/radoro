# Radoro — Terminal Commands Reference

> All terminal commands used during development, organized by step.
> Each command includes purpose and explanation.

---

## 1. Project Initialization

### Navigate to Projects folder
```bash
cd /c/Projects
```
**Purpose**: Move to the parent directory where projects are stored.
**Notes**: In Git Bash, Windows paths use `/c/` instead of `C:\`.

---

### Create Vite project with React + TypeScript template
```bash
pnpm create vite@latest radoro --template react-ts
```
**Purpose**: Scaffold a new Vite project named `radoro` using the React + TypeScript template.
**Breakdown**:
- `pnpm create vite@latest` — uses pnpm to invoke the latest Vite scaffolding tool
- `radoro` — project folder name
- `--template react-ts` — specifies React with TypeScript

---

### Enter project folder
```bash
cd radoro
```
**Purpose**: Move into the newly created project directory.

---

### Install dependencies
```bash
pnpm install
```
**Purpose**: Read `package.json` and install all listed dependencies into `node_modules/`. Also creates `pnpm-lock.yaml` for version locking.

---

### Start development server
```bash
pnpm dev
```
**Purpose**: Run Vite dev server with hot module replacement (HMR). Default port: 5173.

---

### Stop development server
```bash
Ctrl + C
```
**Purpose**: Terminate the running dev server. Confirm with `Y` if prompted.

---

## 2. Tailwind CSS Setup

### Install Tailwind CSS v4
```bash
pnpm add tailwindcss @tailwindcss/vite
```
**Purpose**: Install Tailwind core library and the official Vite integration plugin.
**Notes**: Tailwind v4 uses a Vite plugin instead of PostCSS-based setup (simpler than v3).

---

## 3. Code Quality & Git Setup

### Install Prettier (dev dependency)
```bash
pnpm add -D prettier
```
**Purpose**: Install Prettier as a development-only dependency. Won't be included in production builds.
**Breakdown**:
- `-D` (or `--save-dev`) — marks as devDependency

---

### Install ESLint-Prettier bridge
```bash
pnpm add -D eslint-config-prettier
```
**Purpose**: Disables ESLint rules that conflict with Prettier, so they don't fight over formatting.

---

### Format all source files
```bash
pnpm format
```
**Purpose**: Run Prettier to format all `.ts`, `.tsx`, `.css` files in `src/`.
**Custom script** defined in `package.json`.

---

### Check formatting (without modifying)
```bash
pnpm format:check
```
**Purpose**: Verify if files match Prettier rules without changing them. Useful for CI/CD.

---

### Run ESLint
```bash
pnpm lint
```
**Purpose**: Check all files for code quality issues (unused vars, bad practices, etc.).

---

### Auto-fix ESLint issues
```bash
pnpm lint:fix
```
**Purpose**: Automatically fix ESLint errors where possible.

---

### Initialize Git repository
```bash
git init
```
**Purpose**: Create a new Git repository in the current folder. Creates a hidden `.git/` directory.

---

### Rename default branch to `main`
```bash
git branch -M main
```
**Purpose**: Force-rename the current branch to `main` (modern convention, replaces `master`).

---

### Add remote GitHub repository
```bash
git remote add origin https://github.com/Rafs-Code/radoro.git
```
**Purpose**: Link the local repo to a GitHub repo using nickname `origin`.

---

### Verify remote
```bash
git remote -v
```
**Purpose**: List configured remotes with their fetch/push URLs.

---

### Check Git status
```bash
git status
```
**Purpose**: Show which files are modified, staged, or untracked.

---

### Stage all changes
```bash
git add .
```
**Purpose**: Move all changed files (respecting `.gitignore`) to staging area, ready for commit.

---

### Create commit
```bash
git commit -m "chore: initial commit with vite, react, ts, tailwind, eslint, prettier"
```
**Purpose**: Record staged changes with a descriptive message.
**Convention used**: [Conventional Commits](https://www.conventionalcommits.org/)
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance/setup
- `docs:` — documentation
- `style:` — formatting (non-logic)
- `refactor:` — code restructure
- `test:` — testing

---

### Push to GitHub (first time)
```bash
git push -u origin main
```
**Purpose**: Push local `main` to GitHub `origin/main`. The `-u` flag sets upstream tracking, so future pushes just need `git push`.

---

### Push to GitHub (subsequent times)
```bash
git push
```
**Purpose**: Push committed changes to the linked remote (after upstream is set).

---

### Test Git status
```bash
git status
```
**Purpose**: Show the status of files in the working directory:
- Untracked files (red) — new files not yet added
- Modified files (red) — tracked files with changes
- Staged files (green) — files ready to commit
- Branch info — current branch and sync status with remote

---

### Reset staged files
```bash
git reset
```
**Purpose**: Unstage all files (move them back from staging area to working directory). Files are NOT deleted, just unstaged.
**Use case**: Used after a typo or mistake to start over.

---

### Re-normalize files according to .gitattributes
```bash
git add --renormalize .
```
**Purpose**: Re-read all files using `.gitattributes` rules and re-stage them. Useful when adding `.gitattributes` after files already exist.

---

### Test SSH connection to GitHub
```bash
ssh -T git@github.com
```
**Purpose**: Verify that your SSH key is properly configured and recognized by GitHub.
**Success output**: `Hi <username>! You've successfully authenticated...`

---

### Configure Git line endings (global)
```bash
git config --global core.autocrlf false
git config --global core.eol lf
```
**Purpose**: Configure Git globally to NOT auto-convert line endings, and default to LF.
**Note**: Alternative to using `.gitattributes`. We chose `.gitattributes` for per-project control.

---

## 4. Supabase Setup

### Install Scoop package manager (PowerShell, one-time)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```
**Purpose**: Install Scoop, a command-line package manager for Windows. Used to install developer tools cleanly.

---

### Verify Scoop installation
```powershell
scoop --version
```

---

### Add Supabase bucket to Scoop
```powershell
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
```
**Purpose**: Register the official Supabase Scoop bucket so we can install Supabase CLI.

---

### Install Supabase CLI
```powershell
scoop install supabase
```

---

### Verify Supabase CLI version
```powershell
supabase --version
```

---

### Set Personal Access Token (current session only)
```powershell
$env:SUPABASE_ACCESS_TOKEN = "YOUR_TOKEN"
```
**Purpose**: Authenticate Supabase CLI for the current PowerShell session.

---

### Set Personal Access Token (permanent, user scope)
```powershell
[System.Environment]::SetEnvironmentVariable('SUPABASE_ACCESS_TOKEN', 'YOUR_TOKEN', 'User')
```
**Purpose**: Persist the token across PowerShell sessions. Requires PowerShell restart to take effect.

---

### Verify env variable persisted
```powershell
[System.Environment]::GetEnvironmentVariable('SUPABASE_ACCESS_TOKEN', 'User')
```

---

### List Supabase projects (verify auth)
```powershell
supabase projects list
```

---

### Initialize Supabase in project (creates supabase/ folder)
```powershell
supabase init
```

---

### Link local project to Supabase cloud
```powershell
supabase link --project-ref YOUR_PROJECT_REF
```
**Purpose**: Connect the local `supabase/` folder to the cloud project. Required for migrations.

---

### Install Supabase JS client library
```bash
pnpm add @supabase/supabase-js
```
**Purpose**: Install the official Supabase client library for use in React app.

---

### Check if a specific file is gitignored
```bash
git check-ignore -v <filename>
```
**Purpose**: Verify whether a file is being ignored by Git, and show which `.gitignore` rule matches.
**Example**:
```bash
git check-ignore -v .env.local
# Output: .gitignore:13:*.local   .env.local
```

---

## 5. Database Migrations

### Create a new migration file
```powershell
supabase migration new <migration_name>
```
**Purpose**: Generate a new SQL migration file with a timestamp prefix.
**Example**:
```powershell
supabase migration new create_profiles_table
# Creates: supabase/migrations/[TIMESTAMP]_create_profiles_table.sql
```

---

### Apply migrations to remote database (manual)
```powershell
supabase db push
```
**Purpose**: Push all local migrations that haven't been applied to the remote (cloud) database.
**When to use**: As an alternative to GitHub Integration auto-deploy, or when integration isn't set up.

---

### Apply migrations to local database (for local dev)
```powershell
supabase db reset
```
**Purpose**: Reset local Supabase database and re-apply all migrations from scratch.
**Note**: Only used for local development with Docker — we don't use this in Radoro yet.

---

### Trigger empty commit (useful for re-triggering integrations)
```bash
git commit --allow-empty -m "chore: trigger deploy"
git push
```
**Purpose**: Push a commit with no file changes. Useful for re-triggering CI/CD or webhooks.

---

## 6. TypeScript Types & Auth

### Generate TypeScript types from Supabase schema
```powershell
supabase gen types typescript --linked > src/lib/database.types.ts
```
**Purpose**: Generate TypeScript types from the current cloud database schema. Output redirected to a file in the React app.
**Re-run**: Whenever the database schema changes (new tables, columns, etc.).
**Notes**:
- `--linked` uses the project linked via `supabase link`
- The output file should never be edited manually — re-generate instead
- Add this to a script in `package.json` for convenience (e.g., `pnpm types:gen`)

---

### Use type-safe Supabase client
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>(url, key)
```
**Purpose**: Make all `supabase.from('table_name').select(...)` calls type-safe based on the generated schema types.