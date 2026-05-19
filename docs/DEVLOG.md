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

### Step 4: Supabase Setup (Project + CLI + Connection)
**Date**: [fill in tanggal hari ini]

**What was done**:
- Created Supabase project "radoro" via dashboard with these settings:
  - Region: Southeast Asia (Singapore) — `ap-southeast-1`
  - Security: Enable Data API ✅, Enable automatic RLS ✅
  - GitHub Integration: connected to `Rafs-Code/radoro`
- Retrieved Project URL & Publishable Key from API Keys settings
- Installed Scoop package manager for Windows
- Installed Supabase CLI v2.98.2 via Scoop
- Generated Personal Access Token for CLI authentication
- Set `SUPABASE_ACCESS_TOKEN` as permanent User environment variable
- Initialized Supabase folder structure (`supabase/config.toml`, `supabase/migrations/`)
- Linked local project to Supabase cloud project via `supabase link`
- Created `.env.local` with Supabase credentials (URL + Publishable Key)
- Created `.env.example` as template for environment variables
- Installed `@supabase/supabase-js` client library
- Created `src/lib/supabase.ts` as single source of truth for Supabase client
- Verified connection from React app to Supabase cloud (Step 4.8)

**Commands used**: See [COMMANDS.md → Section 4](./COMMANDS.md#4-supabase-setup)

**Files created/modified**:
- `.env.local` — Supabase credentials (gitignored)
- `.env.example` — Template for env variables
- `src/lib/supabase.ts` — Supabase client instance
- `src/App.tsx` — Temporary connection test UI
- `supabase/config.toml` — Supabase CLI config (auto-generated)
- `supabase/.gitignore` — Supabase-specific gitignore
- `package.json` — Added `@supabase/supabase-js` dependency

**Errors encountered**: See [TROUBLESHOOTING.md → Step 4](./TROUBLESHOOTING.md)
- Username with space in Windows path caused Supabase CLI login failure
- Workaround: Used Personal Access Token instead of OAuth login
- Permanent environment variable required PowerShell restart to load

**Concepts introduced**: See [CONCEPTS.md](./CONCEPTS.md)
- Backend-as-a-Service (BaaS)
- Free tier model (freemium)
- Database Password vs Publishable Key vs Personal Access Token
- Environment variables (process, user, machine scopes)
- Vite env variable convention (`VITE_` prefix)
- Supabase CLI workflow
- Schema as Code (foundation)

**Outcome**: 
- ✅ Supabase cloud project ready
- ✅ Local development environment connected to cloud
- ✅ React app can communicate with Supabase
- ✅ Foundation ready for migrations & feature development

---

### Step 5: First Database Migration — Profiles Table
**Date**: [fill in tanggal hari ini]

**What was done**:
- Created first migration file via `supabase migration new create_profiles_table`
- Wrote SQL for:
  - `profiles` table with columns: id, username, language, theme, created_at, updated_at
  - Foreign key relationship to `auth.users(id)` with CASCADE delete
  - CHECK constraints for language ('en'/'id') and theme ('dark'/'light')
  - Row Level Security (RLS) enabled
  - 3 RLS policies: users can SELECT/INSERT/UPDATE only their own profile
  - Trigger `on_auth_user_created` — auto-creates profile when user signs up
  - Trigger `on_profile_updated` — auto-updates `updated_at` on every UPDATE
- Attempted GitHub Integration auto-deploy (didn't work, see Troubleshooting)
- Fallback: deployed migration manually via `supabase db push`
- Verified profiles table appears in Supabase Dashboard Table Editor

**Commands used**: See [COMMANDS.md → Section 5](./COMMANDS.md#5-database-migrations)

**Files created/modified**:
- `supabase/migrations/[TIMESTAMP]_create_profiles_table.sql` — first migration

**Errors encountered**: See [TROUBLESHOOTING.md → Step 5](./TROUBLESHOOTING.md)
- GitHub Integration didn't auto-deploy migration despite being connected
- Workaround: manual `supabase db push`

**Concepts introduced**: See [CONCEPTS.md](./CONCEPTS.md)
- Database migrations
- Row Level Security (RLS) policies
- Postgres triggers & functions
- Foreign key constraints
- `auth.users` vs `public.profiles` separation

**Outcome**:
- ✅ First migration successfully deployed to Supabase cloud
- ✅ profiles table created with RLS protection
- ✅ Auto-create profile trigger ready for first signup
- ⚠️ GitHub Integration auto-deploy not working yet (to be investigated later)

---

### Step 6: Auth Setup & TypeScript Types
**Status**: 🚧 Next up

[Will be filled in as we progress]

- [x] Step 3: ESLint, Prettier, Git ✅
- [x] Step 4: Supabase project & CLI ✅
- [x] Step 5: Database schema (first migration) ✅
- [ ] Step 6: Supabase JS client integration & Auth ← **NEXT**