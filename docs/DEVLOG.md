# Radoro — Development Log

> A chronological log of development progress for the Radoro Pomodoro PWA.
> Each entry covers what was built, decisions made, and links to related docs.

---

## 📅 Phase 0 — Planning & Setup

### Project Overview
- **Name**: Radoro
- **Description**: Personal Pomodoro PWA with dark purple theme, custom timer presets, task list, stats, and animations.
- **Tech Stack**: React + TypeScript + Vite + Tailwind CSS + Supabase + Zustand + Howler.js + date-fns
- **Hosting**: Vercel
- **Repository**: github.com/Rafs-Code/radoro
- **Database**: Supabase (PostgreSQL)
- **Target**: Personal use, accessible on desktop (browser) & mobile (PWA install)

### Key Decisions
| Topic | Decision | Rationale |
|---|---|---|
| Database | Supabase | Modern, SQL-based, generous free tier, learning value |
| Auth strategy | Supabase Auth | Built-in, multi-device sync |
| Schema management | GitHub Integration | Learn professional migration workflow |
| Local path | `C:\Projects\radoro` | Avoid spaces in Windows username path |
| Git workflow | Main only + Conventional Commits | Simple but professional |
| Default language | English (with Indonesian option) | Broader appeal, learning value |

---

## 📅 Phase 1 — MVP Development

### Step 1: Project Initialization
**Date**: [fill in]

**What was done**:
- Created Vite project with React + TypeScript template
- Installed dependencies with pnpm
- Verified dev server runs at `http://localhost:5173/`

**Commands used**: See [COMMANDS.md → Section 1](./COMMANDS.md#1-project-initialization)

**Files created/modified**: Default Vite template

**Outcome**: ✅ Vite dev server running with default React template

---

### Step 2: Tailwind CSS Setup
**Date**: [fill in]

**What was done**:
- Installed Tailwind CSS v4 with Vite plugin
- Configured `vite.config.ts` to use Tailwind plugin
- Replaced `src/index.css` with Tailwind import
- Cleared `src/App.css`
- Updated `App.tsx` with first Tailwind-styled component (purple theme test)

**Commands used**: See [COMMANDS.md → Section 2](./COMMANDS.md#2-tailwind-css-setup)

**Files created/modified**:
- `vite.config.ts` — Added Tailwind plugin
- `src/index.css` — Replaced with `@import "tailwindcss";`
- `src/App.css` — Cleared
- `src/App.tsx` — Replaced with Radoro splash screen test

**Outcome**: ✅ Tailwind classes working, purple theme rendered correctly

---

### Step 3: Code Quality Tools & Git Setup
**Date**: [fill in]

**What was done**:
- Installed Prettier as dev dependency
- Created `.prettierrc` with style preferences (no semicolons, single quotes, 2-space tabs, etc.)
- Created `.prettierignore` to skip generated files
- Installed `eslint-config-prettier` for ESLint-Prettier integration
- Updated `eslint.config.js` to include `prettierConfig`
- Updated VS Code settings for format-on-save
- Added `lint:fix`, `format`, `format:check` scripts to `package.json`
- Initialized Git repository
- Connected to GitHub remote `Rafs-Code/radoro`
- Made initial commit and pushed to `main`

**Commands used**: See [COMMANDS.md → Section 3](./COMMANDS.md#3-code-quality--git-setup)

**Files created/modified**:
- `.prettierrc` — Prettier config
- `.prettierignore` — Prettier ignore list
- `eslint.config.js` — Added Prettier integration
- `package.json` — Added scripts
- VS Code `settings.json` (global) — Format on save

**Errors encountered**: See [TROUBLESHOOTING.md → Step 3](./TROUBLESHOOTING.md#step-3-typo-in-tailwind-package-name)

**Outcome**: ✅ Code auto-formats on save, ESLint runs clean, project pushed to GitHub

---

### Step 4: Supabase Project Creation & CLI Setup
**Status**: 🚧 In Progress

[Will be filled in as we progress]

---

## 📊 Progress Tracker

- [x] Phase 0 — Planning
- [ ] Phase 1 — MVP (In Progress)
  - [x] Step 1: Vite + React + TS
  - [x] Step 2: Tailwind CSS
  - [x] Step 3: ESLint, Prettier, Git
  - [ ] Step 4: Supabase project & CLI
  - [ ] Step 5: Environment variables
  - [ ] Step 6: Database schema (first migration)
  - [ ] Step 7: Supabase JS client integration
  - [ ] Step 8: PWA setup (vite-plugin-pwa)
  - [ ] Step 9: Folder structure & state management
  - [ ] Step 10: Core timer functionality
  - [ ] Step 11: Deploy to Vercel
- [ ] Phase 2 — Core Features
- [ ] Phase 3 — Enhancement
- [ ] Phase 4 — Polish

---

## 📚 Related Docs
- [COMMANDS.md](./COMMANDS.md) — Terminal commands reference
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) — Errors & solutions
- [CONCEPTS.md](./CONCEPTS.md) — Technical concepts explained