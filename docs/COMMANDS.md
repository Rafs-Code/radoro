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