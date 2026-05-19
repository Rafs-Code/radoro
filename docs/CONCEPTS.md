# Radoro — Concepts Explained

> Technical concepts and tools used in Radoro, explained in plain language.
> Updated as new concepts are introduced during development.

---

## Build Tools

### Vite
A modern frontend build tool that provides:
- Fast dev server with **Hot Module Replacement (HMR)** — code changes appear instantly without full reload.
- Optimized production builds using Rollup.
- Native ES modules support — no bundling needed in development.

**Why Vite?** Replaces older tools like Create React App (CRA), which is slower and now deprecated.

---

### pnpm
A package manager (alternative to npm and yarn) that:
- Uses a **content-addressable store** — each package is stored once on disk, then linked to projects.
- Saves significant disk space when working with multiple projects.
- Installs faster than npm.

**Common commands**:
- `pnpm install` — install all dependencies from `package.json`
- `pnpm add <pkg>` — add a runtime dependency
- `pnpm add -D <pkg>` — add a development-only dependency
- `pnpm dev` — run the "dev" script defined in `package.json`

---

## Frontend Framework

### React
A JavaScript library for building user interfaces using a **component-based architecture**.
- UI is broken into reusable components.
- Each component manages its own state and renders based on data.
- Uses a **virtual DOM** for efficient updates.

---

### TypeScript
A typed superset of JavaScript that:
- Adds **static type checking** at development time.
- Catches errors before runtime.
- Improves IDE support (autocomplete, refactoring).
- Compiles down to plain JavaScript.

**Example**:
```ts
// JavaScript — error only at runtime
function add(a, b) { return a + b }
add(5, "10") // returns "510" 😱

// TypeScript — error at compile time
function add(a: number, b: number): number { return a + b }
add(5, "10") // ❌ TypeScript error: Argument of type 'string' is not assignable to 'number'
```

---

## Styling

### Tailwind CSS
A **utility-first** CSS framework. Instead of writing custom CSS, you compose styles using small utility classes directly in your markup.

**Example**:
```tsx
// Traditional CSS
<button className="my-button">Click</button>
// .my-button { background: blue; padding: 10px 20px; border-radius: 8px; }

// Tailwind CSS
<button className="bg-blue-500 px-5 py-2.5 rounded-lg">Click</button>
```

**Pros**:
- Faster development — no context-switching between HTML and CSS files.
- Consistent design system (preset colors, spacing, etc.).
- Smaller production CSS — only used classes are included.

---

## Code Quality

### ESLint
A **static analysis tool** that checks code for:
- Bugs (e.g., using undefined variables)
- Bad practices (e.g., unused imports)
- Style violations

Configured via `eslint.config.js`.

---

### Prettier
An **opinionated code formatter** that:
- Reformats code to a consistent style.
- Doesn't check for bugs — only formatting.
- Works on save (with VS Code integration).

Configured via `.prettierrc`.

---

### ESLint + Prettier Integration
They have overlapping concerns (style rules), so we use `eslint-config-prettier` to:
- **Disable ESLint rules** that conflict with Prettier.
- Let ESLint focus on **logic/bugs**, Prettier focus on **formatting**.

---

## Version Control

### Git
A distributed version control system that tracks file changes over time.

**Key concepts**:
- **Repository (repo)** — a project tracked by Git.
- **Commit** — a snapshot of changes with a message.
- **Branch** — a parallel line of development (`main` is the default).
- **Remote** — a hosted copy (e.g., on GitHub).
- **Staging area** — a "draft" area where changes are prepared before committing.

**Workflow**:
1. Edit files
2. `git add .` — stage changes
3. `git commit -m "message"` — save snapshot
4. `git push` — upload to remote

---

### Conventional Commits
A specification for commit messages that uses prefixes to indicate change type:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance
- `docs:` — documentation
- `style:` — formatting only
- `refactor:` — code change without behavior change
- `test:` — adding tests

**Benefits**:
- Easier to scan commit history.
- Automated tools can generate changelogs from commits.
- Industry-standard practice.

---

## More concepts will be added as the project progresses.

---

## Line Endings

### LF vs CRLF
Invisible characters at the end of each line in text files:
- **LF** (`\n`) — Linux/Mac standard
- **CRLF** (`\r\n`) — Windows standard

When working across operating systems, mixed line endings cause:
- Messy Git diffs (entire files appear changed when only endings differ)
- Issues with tools that expect specific endings
- Inconsistent formatting in shared codebases

**Modern best practice**: Use **LF everywhere**, even on Windows. Configured via:
1. `.prettierrc` — `"endOfLine": "lf"` for code formatting
2. `.gitattributes` — `* text=auto eol=lf` for Git operations
3. Editor settings — set default to LF

---

### `.gitattributes`
A Git config file (at repo root) that defines per-file attributes, including:
- Line ending normalization (`eol=lf`, `eol=crlf`)
- Marking files as binary (`*.png binary`)
- Diff and merge strategies
- Export filters

**Difference from `.gitignore`**: 
- `.gitignore` — files to **ignore** from Git
- `.gitattributes` — **rules for how Git handles** tracked files

---

## Git Authentication

### HTTPS vs SSH

Two ways to authenticate with GitHub when pushing/pulling:

**HTTPS**:
- URL format: `https://github.com/user/repo.git`
- Auth: Username + Personal Access Token (PAT) or browser popup
- Pros: Simple setup, works behind firewalls
- Cons: Need to authenticate repeatedly (or cache credentials)

**SSH**:
- URL format: `git@github.com:user/repo.git`
- Auth: SSH key pair (private key on your machine, public key on GitHub)
- Pros: Setup once, works seamlessly forever; more secure
- Cons: Slightly more complex initial setup; some firewalls block SSH

**Used in Radoro**: SSH (configured before project setup).

---

### SSH Key Pair
A cryptographic authentication method consisting of:
- **Private key** (kept on your machine, never shared) — proves your identity
- **Public key** (uploaded to GitHub) — verifies your identity

GitHub challenges you with encrypted data; only the matching private key can decrypt it. No passwords needed.

---

---

## Backend Services

### Backend-as-a-Service (BaaS)
A category of cloud services that provide pre-built backend infrastructure (database, auth, storage, APIs) so developers can focus on frontend without building/maintaining a backend.

**Examples**: Supabase, Firebase, AWS Amplify, PocketBase

**Pros**: 
- Faster development (no server setup)
- Built-in scaling, security, auth
- Generous free tiers

**Cons**:
- Vendor lock-in (varies)
- Less customization than custom backend

---

### Supabase
Open-source BaaS built on PostgreSQL. Provides:
- **Database** — managed Postgres
- **Auth** — built-in user management
- **Realtime** — websocket-based subscriptions
- **Storage** — file uploads (like S3)
- **Edge Functions** — serverless functions (Deno-based)
- **Auto-generated APIs** — REST + GraphQL from your schema

**Used in Radoro**: Database + Auth + Realtime (we won't use Storage, Edge Functions, or Functions in MVP).

---

## Authentication Tokens

### Database Password vs Publishable Key vs Personal Access Token

Three different "secrets" in Supabase ecosystem — easy to confuse:

| Type | Format | Used For | Where Stored |
|---|---|---|---|
| Database Password | random string | Direct DB connection (DBeaver, ORM) | Password manager |
| Publishable Key | `sb_publishable_...` | Frontend API calls (React app) | `.env.local` |
| Personal Access Token | `sbp_...` | Supabase CLI authentication | Env variable |

**Key insight**: Each has a different audience and scope. Mixing them up is a common cause of bugs.

---

## Environment Variables

### Concept
Key-value pairs that exist outside your code, accessible to programs at runtime. Used for:
- Storing secrets without committing to Git
- Different config per environment (dev/staging/prod)
- System-level configuration

### Scope Levels (Windows)
- **Process** — only the current shell session (lost when closed)
- **User** — persists for your user account
- **Machine** — persists for all users (requires admin)

### Vite Convention
Vite only exposes env variables starting with `VITE_` to client-side code:
```env
VITE_SUPABASE_URL=https://...     # accessible in frontend ✅
SECRET_API_KEY=abc                # NOT accessible in frontend ❌
```
**Reason**: Security. Forces developers to explicitly mark what's safe for the browser.

---

### .env Files
Special files for storing environment variables:
- `.env` — base config, can be committed
- `.env.local` — local overrides, **never commit** (in `.gitignore`)
- `.env.development` / `.env.production` — env-specific configs
- `.env.example` — template with empty values, **committed** for documentation

## More concepts will be added as the project progresses.

---

## Database Schema Management

### Migrations
SQL files that record incremental changes to database schema. Run in chronological order based on timestamp prefix.

**Why migrations instead of editing schema directly?**
- ✅ Version-controlled (Git history of every change)
- ✅ Reproducible (apply same migrations on dev/staging/prod)
- ✅ Reversible (write down-migrations if needed)
- ✅ Team-friendly (everyone applies same schema changes)

**File naming convention**:
[YYYYMMDDHHMMSS]_[descriptive_name].sql
20260518232325_create_profiles_table.sql
---

### Schema as Code
Workflow where database schema is treated as source code:
1. Schema changes written as SQL migration files
2. Files committed to Git
3. CI/CD or integration auto-applies migrations to environments

**Used in Radoro**: GitHub Integration (planned) / `supabase db push` (current)

---

## PostgreSQL Concepts

### Row Level Security (RLS)
A PostgreSQL feature that restricts which rows a user can SELECT/INSERT/UPDATE/DELETE based on policies.

**Without RLS**: Anyone with the anon/publishable key can access all rows in a table.
**With RLS**: Each user can only access rows that match defined policies.

**Example policy**:
```sql
create policy "Users can view own profile"
  on public.profiles
  for select
  using (auth.uid() = id);
```
Reads: "When user does SELECT on profiles table, only show rows where `auth.uid()` (current user's ID) matches the row's `id` column."

---

### RLS Policy Components
- `for [operation]` — SELECT, INSERT, UPDATE, DELETE, or ALL
- `using (expression)` — Filter for SELECT/UPDATE/DELETE (which rows are visible/affected)
- `with check (expression)` — Filter for INSERT/UPDATE (which rows can be created/modified)

---

### Foreign Keys
A constraint that ensures a column's value exists in another table.

**Example**:
```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  ...
);
```
- `references auth.users(id)` — profiles.id must exist in auth.users.id
- `on delete cascade` — if auth.users row is deleted, matching profiles row is auto-deleted

---

### Triggers
Database functions that auto-execute on table events (INSERT/UPDATE/DELETE).

**Used in Radoro**:
1. `on_auth_user_created` — auto-creates profile when new user signs up
2. `on_profile_updated` — auto-updates `updated_at` timestamp on profile changes

**Why triggers?**
- ✅ Logic stays in database (works even if app skips the step)
- ✅ Single source of truth
- ✅ Eliminates race conditions

---

---

## TypeScript & Supabase

### Type-Safe Database Queries
By passing the auto-generated `Database` type as a generic to `createClient`, all queries become type-safe:

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabase = createClient<Database>(url, key)

// Type-safe!
const { data } = await supabase
  .from('profiles')      // TypeScript knows 'profiles' is valid
  .select('id, username') // Autocomplete on columns

data?.[0].username       // TypeScript knows this is `string | null`
data?.[0].usrname        // ❌ TypeScript error: column doesn't exist
```

**Benefits**:
- ✅ Autocomplete on table names and columns
- ✅ Catch typos at compile time
- ✅ Refactoring is safer (rename column = TypeScript flags all usages)
- ✅ Documentation lives in the types

**Re-generation**: Run `supabase gen types typescript --linked > src/lib/database.types.ts` whenever schema changes.

---

## React Patterns

### Context API
React's built-in mechanism for sharing state without "prop drilling" (passing props through many components).

**When to use**:
- Auth state (current user, session)
- Theme (dark/light)
- Language/locale
- Any global app state

**Pattern**:
```tsx
// 1. Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 2. Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

// 3. Wrap app
<AuthProvider>
  <App />
</AuthProvider>

// 4. Use anywhere
function SomeComponent() {
  const { user } = useAuth()
  return <p>{user?.email}</p>
}
```

---

### Custom Hooks
Functions starting with `use` that encapsulate reusable logic. They can call other hooks.

**Why?**
- ✅ Reusable logic across components
- ✅ Cleaner component code
- ✅ Easier testing

**Convention**: Always prefix with `use` (e.g., `useAuth`, `useTimer`, `useTasks`)

---

## Authentication

### Supabase Auth Flow
1. **Sign Up**: `supabase.auth.signUp({ email, password })` → creates user in `auth.users`
2. **Sign In**: `supabase.auth.signInWithPassword({ email, password })` → returns session
3. **Sign Out**: `supabase.auth.signOut()` → clears session
4. **Listen**: `supabase.auth.onAuthStateChange(callback)` → subscribe to changes

**Session persistence**: By default, Supabase stores the session in `localStorage`. Reloading the page restores the session automatically.

---

### Email Confirmation
A security feature that requires users to click a link in their email before they can log in.

**Default**: ON
**Development**: Usually OFF (faster testing, no email setup needed)
**Production**: SHOULD be ON (prevents spam signups, verifies email ownership)

---

## More concepts will be added as the project progresses.