### Step 3: Code Quality Tools & Git Setup
**Date**: [fill in tanggal hari ini]

**What was done**:
- Installed Prettier as dev dependency
- Created `.prettierrc` with style preferences (no semicolons, single quotes, 2-space tabs, LF line endings)
- Created `.prettierignore` to skip generated files (node_modules, dist, etc.)
- Installed `eslint-config-prettier` for ESLint-Prettier integration
- Updated `eslint.config.js` to include `prettierConfig`
- Updated VS Code user settings for format-on-save with Prettier as default formatter
- Added `lint:fix`, `format`, `format:check` scripts to `package.json`
- Created `.gitattributes` to enforce LF line endings (cross-platform consistency)
- Initialized Git repository with `main` as default branch
- Connected to GitHub remote `Rafs-Code/radoro` via SSH
- Made initial commit and pushed to `main`

**Commands used**: See [COMMANDS.md → Section 3](./COMMANDS.md#3-code-quality--git-setup)

**Files created/modified**:
- `.prettierrc` — Prettier config (no semis, single quotes, LF, 100 char width)
- `.prettierignore` — Prettier ignore list
- `.gitattributes` — Git line ending rules (force LF for text files)
- `eslint.config.js` — Added Prettier integration
- `package.json` — Added lint:fix, format, format:check scripts
- VS Code `settings.json` (global) — Auto-format on save with Prettier

**Errors encountered**: See [TROUBLESHOOTING.md → Step 3](./TROUBLESHOOTING.md)
- Typo in tailwind package name (`@tainwindcss` vs `@tailwindcss`)
- Typo `git remove` instead of `git remote`
- LF/CRLF line ending warnings (resolved with `.gitattributes`)

**Concepts introduced**: See [CONCEPTS.md](./CONCEPTS.md)
- Conventional Commits
- LF vs CRLF line endings
- SSH vs HTTPS for Git remotes
- ESLint + Prettier integration pattern
- `.gitattributes` for cross-platform line ending consistency

**Outcome**: 
- ✅ Code auto-formats on save
- ✅ ESLint runs clean (no errors/warnings)
- ✅ Project pushed to GitHub via SSH authentication
- ✅ Documentation structure (docs/) established
- ✅ Consistent LF line endings enforced via `.gitattributes`

---

### Step 4: Supabase Project Creation & CLI Setup
**Status**: 🚧 Next up

[Will be filled in as we progress]

- [x] Step 3: ESLint, Prettier, Git ✅
- [ ] Step 4: Supabase project & CLI ← **NEXT**