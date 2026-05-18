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