# Claude Code Workspace — Repo Template

A blank, reusable skeleton for a **shared AI workspace**: the `.claude/` folder you commit
alongside your code so a whole team gets the same behaviour from Claude Code instead of each
person keeping their own prompts.

This file is a **build spec**, not the finished setup. Every file below is listed with its
purpose, its headings, and a note under each heading saying what to write there. The content is
deliberately empty — you fill it with your own project's rules.

---

## How to use this file

1. Drop this file into the repo where you want the workspace.
2. Open Claude Code in that repo and say:

   > Read `claude-workspace-template.md` and build the workspace it describes.
   > Ask me the questions in "Decide these first" before you start, then create every file
   > with the headings given and placeholder notes under each heading. Do not invent rules
   > about my code — leave the placeholders for me to fill in.

3. Answer the questions.
4. Go through the files and replace the placeholders with what is actually true in your repo.
5. Commit the folder. Review it in a pull request like any other code.

Step 4 is the real work. The skeleton takes minutes; the value is in what you write into it.

---

## Decide these first

Claude should ask for these before creating anything. Everything in the template refers back to
them.

| Placeholder | Meaning | Example answers |
|---|---|---|
| `<PROJECT_NAME>` | Repo / product name | `acme-web` |
| `<STACK>` | Language + framework + major versions | `React 19 + TypeScript`, `Django + Python 3.12` |
| `<PKG_MANAGER>` | Exact package manager and version | `pnpm 9`, `npm`, `poetry` |
| `<DEFAULT_BRANCH>` | Branch PRs target | `main`, `develop` |
| `<TEST_CMD>` | Run the tests | `pnpm test` |
| `<LINT_CMD>` | Run the linter | `pnpm lint` |
| `<TYPECHECK_CMD>` | Type check, if any | `pnpm tsc --noEmit` |
| `<BUILD_CMD>` | Build | `pnpm build` |
| `<DEV_CMD>` | Start locally | `pnpm dev` |
| `<TEST_PATTERN>` | Test file naming | `*.spec.ts`, `*_test.py` |
| `<TICKET_PREFIX>` | Issue tracker key, if branches require one | `PROJ`, or *none* |
| `<BRANCH_RULE>` | Branch naming rule, if enforced | `feat/PROJ-123-short-name` |
| `<PROTECTED_PATHS>` | Files nothing should edit | generated clients, lockfiles, vendored code |
| `<SOURCE_ROOT>` | Where the code lives | `src/`, `app/`, `packages/` |

If an answer is "we don't have one", say so and leave that part out rather than inventing it.

---

## The structure

```
<repo root>/
│
├── CLAUDE.md                          ● always in context
│
├── .claude/
│   ├── README.md                      for humans, not the model
│   ├── .gitignore
│   ├── settings.json                  permissions + hook wiring (committed)
│   ├── settings.local.json            personal overrides (git-ignored)
│   │
│   ├── standards/                     ● always in context
│   │   ├── coding.md
│   │   ├── language-framework.md
│   │   └── testing.md
│   │
│   ├── skills/                        ▲ loads when the task matches
│   │   ├── scaffold-component/SKILL.md
│   │   ├── write-spec-test/SKILL.md
│   │   ├── add-i18n-string/SKILL.md
│   │   ├── fix-flaky-test/SKILL.md
│   │   ├── implement-ticket/SKILL.md
│   │   └── raise-pr/SKILL.md
│   │
│   ├── agents/                        ◆ runs in its own context window
│   │   ├── code-reviewer.md
│   │   ├── test-fixer.md
│   │   └── codebase-explorer.md
│   │
│   ├── commands/                      ⌘ you invoke these by name
│   │   ├── guide.md
│   │   ├── investigate.md
│   │   ├── plan-feature.md
│   │   ├── new-component.md
│   │   └── raise-pr.md
│   │
│   └── hooks/                         ■ code that runs and can refuse
│       └── guard-protected-paths.js
│
└── <SOURCE_ROOT>/<area>/CLAUDE.md     ○ loads only inside that folder
```

Rename anything that doesn't fit your stack. `language-framework.md` stands in for whatever
your main language file should be called — `typescript-react.md`, `python.md`, `go.md`.

---

## Why it is split this way — the four tiers

This is the one idea worth understanding before filling anything in. Context is finite, so
**when** a rule loads matters as much as what it says.

| Tier | What | Loads | Cost |
|---|---|---|---|
| ● Always | `CLAUDE.md`, `standards/` | every single turn | high — keep it short |
| ○ By folder | nested `CLAUDE.md` | when work touches that folder | free until then |
| ▲ By task | `skills/` | when the task matches the description | free until then |
| ◆ Delegated | `agents/` | when you hand off a job | none — separate context |
| ■ Enforced | `hooks/` | before every matching tool call | it is code, not advice |

**Put each rule in the cheapest tier that still guarantees it arrives.** Only things true
everywhere belong in the always-on tier.

---

## File specs

Create each file with exactly these headings. Under every heading put a short HTML comment
saying what belongs there, so whoever fills it in knows what is wanted.

### `CLAUDE.md` — the front door

```markdown
# CLAUDE.md

<!-- One line: what <PROJECT_NAME> is, the stack, the default branch. -->

## Authority

<!-- State that this file and the real code win over any other doc. -->
<!-- Import the always-on standards: @.claude/standards/<file>.md for each one. -->

## Commands

| Task | Command |
|------|---------|
| Type check | <TYPECHECK_CMD> |
| Lint | <LINT_CMD> |
| Tests | <TEST_CMD> |
| Single test | <TEST_CMD> <path> |
| Build | <BUILD_CMD> |
| Run locally | <DEV_CMD> |

<!-- Add any rule about the package manager, e.g. "use X, never Y". -->

## Gotchas

<!-- THE MOST VALUABLE SECTION. Write only things that would cause a WRONG answer
     if the model did not know them. Ask yourself: what does a new joiner get wrong
     in week one? Typical entries:
       - a library major version that differs from what the model expects
       - an API in this repo that looks standard but is not
       - a helper everyone forgets exists
       - a file that must never be hand-edited
     Three to six lines. If it is not a trap, it does not go here. -->

## Where things live

<!-- A short map of <SOURCE_ROOT>: the main areas and what each holds.
     Name the current module vs any legacy one, if that applies. -->

## Git & PR

<!-- Branch rule <BRANCH_RULE>, commit format, PR target <DEFAULT_BRANCH>,
     size guidance, anything your hooks enforce. -->
<!-- If you want approval before commits/pushes, say so explicitly here. -->

## Before you call a change done

<!-- A checklist the model runs before reporting completion. Suggested groups: -->

**Correctness**
- [ ] <TYPECHECK_CMD> passes
- [ ] <LINT_CMD> passes
- [ ] <TEST_CMD> passes and changed behaviour has a test
- [ ] Bug fixes include a test that fails without the fix

**House rules**
- [ ] <!-- your top 3-5 gotchas restated as checkboxes -->

**Hygiene**
- [ ] No stray debug logging or commented-out code
- [ ] Imports your change orphaned are removed
- [ ] Diff is focused
```

Keep this file **short**. It is read on every turn.

---

### `.claude/README.md` — for humans

```markdown
# The `.claude/` workspace

<!-- One paragraph: this folder is the shared Claude Code setup, versioned and
     reviewed like the rest of the repo. -->

<!-- Paste the folder tree here. -->

## Commands
<!-- One line per command: name — what it does. -->

## Skills
<!-- One line per skill. Note that these load themselves; you never name them. -->

## Agents
<!-- One line per agent. Note they run in their own context and report back. -->

## Hooks
<!-- What each hook blocks, and why that is a hook rather than a written rule. -->
<!-- Also note what you deliberately did NOT make a hook, and why. -->

## Permissions
<!-- Summarise the allow list and the deny list from settings.json. -->

## Standards & nested CLAUDE.md
<!-- Which files are always on, and which folders carry their own CLAUDE.md. -->
```

---

### `.claude/settings.json`

Committed and shared. **Deny wins over allow**, so the deny list is your safety net.

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Skill",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)"
    ],
    "deny": [
      "Bash(rm -rf:*)",
      "Bash(git push --force:*)",
      "Bash(git push -f:*)",
      "Bash(git reset --hard:*)",
      "Bash(git clean -f:*)",
      "Bash(git checkout -- .:*)",
      "Bash(git branch -D:*)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write|MultiEdit|Read|Bash",
        "hooks": [
          { "type": "command", "command": "node .claude/hooks/guard-protected-paths.js" }
        ]
      }
    ]
  }
}
```

**Add to `allow`:** your own read-only commands — `<TEST_CMD>`, `<LINT_CMD>`,
`<TYPECHECK_CMD>`, read-only `gh`/`git`. Each one you add is a prompt you stop seeing.

**Keep in `deny`:** anything that destroys work with no undo. Write this list before you need
it, not after the day that teaches you to.

---

### `.claude/.gitignore`

```gitignore
# Personal, machine-specific settings — never committed
settings.local.json

# Runtime hook output
logs/
```

---

### `.claude/settings.local.json`

Git-ignored. Personal overrides only — extra permissions one person wants, never rules that
should apply to the team.

```json
{
  "permissions": {
    "allow": []
  }
}
```

---

### `.claude/standards/*.md` — always in context

Three files, imported by `CLAUDE.md`. **These are read on every turn, so keep them tight.**
Only things true in every file belong here.

#### `coding.md`

```markdown
# General coding standards

<!-- One line: these are the always-on basics; the real code wins over this doc. -->

## Naming
<!-- Your casing rules for files, components, functions, constants. -->

## Values & control flow
<!-- Immutability, null handling, and how to match surrounding style. -->

## Error handling
<!-- How to wrap async work, when to use error boundaries, what to log. -->

## Comments
<!-- Your comment density. Most teams want: none by default, except a rare "why". -->

## Worked examples
<!-- For each rule above that people actually break, one bad + one good snippet.
     See "Writing rules that work" below. -->
```

#### `language-framework.md`

```markdown
# <STACK> standards

## Language
<!-- Strictness settings, typing rules, what to avoid. -->

## Framework
<!-- Component/module style, export style, file layout, props typing. -->

## Styling & structure
<!-- How styles are written and where they live. Name the one true way,
     and note honestly where the repo is inconsistent. -->

## File naming
<!-- Naming patterns. If your static analysis excludes some patterns from
     coverage, say which, and warn that real logic must not hide in them. -->

## Library versions (easy to get wrong)
<!-- CRITICAL. List any library whose major version differs from what a model
     would assume, with the API difference spelled out. This single section
     prevents a lot of confidently wrong code. -->

## Worked examples
<!-- Bad/good pairs for the rules above. -->
```

#### `testing.md`

```markdown
# Testing standards

<!-- One line: the test stack, and that the full workflow is in the
     write-spec-test skill. -->

## Structure
<!-- File naming <TEST_PATTERN>, where tests live, how they are organised. -->

## Queries & events
<!-- How to find things and simulate interaction, in priority order. -->

## Mocking & assertions
<!-- What to mock, what never to mock, which matchers to use. -->

## What to test / skip
<!-- Two short lists. Include "delete tests that add nothing". -->

## Worked examples
<!-- Bad/good pairs. -->

Run: <TEST_CMD> <file or path>
```

---

### `.claude/skills/<name>/SKILL.md` — loads when the task matches

A skill is a folder with one file. **The `description` is the most important line in it** —
that is what Claude matches against to decide whether to pull the skill in. Write it as
"do X. Use when Y."

Every skill uses this shape:

```markdown
---
name: <folder-name>
description: <What it does. Use when: the situations that should trigger it.>
argument-hint: <optional — what the user passes, if anything>
---

# <Title>

<!-- One or two lines: what this produces. -->

## When to use
<!-- The situations. Match the description. -->

## Procedure
<!-- Numbered steps. Be concrete. Name real commands and real paths. -->

## Rules
<!-- The non-obvious constraints for this job. -->

## Related
<!-- Point at other skills/agents that pair with this one. -->
```

Create these six:

| Skill | Purpose | Notes for whoever fills it in |
|---|---|---|
| `scaffold-component/` | Create a new unit of UI the house way | List every file a new component folder needs, and the export style |
| `write-spec-test/` | Write a test the house way | Naming, location, query priority, "keep it lean" |
| `add-i18n-string/` | Add user-facing text correctly | Which file is safe to edit, which are machine-managed; say to reuse an existing key before adding a duplicate |
| `fix-flaky-test/` | Chase a test that passes sometimes | Rank the causes by what actually bites in your suite; ban retries and longer timeouts as "fixes" |
| `implement-ticket/` | Take a ticket from tracker to PR | Phases with a gate at each; require plan approval before writing code |
| `raise-pr/` | Commit and open a PR | Commit format, branch rule `<BRANCH_RULE>`, the PR template sections, whether a co-author trailer is wanted |

Drop any that don't apply. A repo with no translations doesn't need `add-i18n-string`.

---

### `.claude/agents/<name>.md` — runs in its own context

An agent goes away, does a job, and returns a summary. Everything it read stays out of your
conversation. Reach for one when the work means **reading a lot to produce a little**.

```markdown
---
name: <agent-name>
description: <What it does and when to use it. Say if it is read-only.>
tools: <e.g. Read, Grep, Glob, Bash — narrow this deliberately>
model: <optional>
---

<!-- One line: who this agent is and what it must never do. -->

## How to run
<!-- Numbered steps, including how it gets its input (a diff, a path, a failure). -->

## What to check / what to do
<!-- The substance. Be specific to your repo. -->

## Output
<!-- The exact shape you want back. Specify severity grouping, file:line citations,
     and a one-line verdict. A vague output spec gives you a vague report. -->
```

Create these three:

| Agent | Purpose | Key constraint to write in |
|---|---|---|
| `code-reviewer.md` | Reviews the working diff against your standards | **Read-only.** Tell it to verify with grep before asserting something is wrong |
| `test-fixer.md` | Runs failing tests and fixes the real cause | Forbid making tests pass the wrong way: no skipping, no weakened assertions, no blind snapshot updates, no added retries |
| `codebase-explorer.md` | Maps an unfamiliar area and reports back | Read-only. Ask for entry points, data flow, key files, and gotchas |

---

### `.claude/commands/<name>.md` — you invoke these by name

The difference from a skill: **a skill turns up by itself; a command is something you choose to
start.**

```markdown
---
description: <One line, shown in the command list.>
argument-hint: <what the user types after the name, if anything>
---

<!-- The instruction. Write it as a direct order, referencing a skill where one exists
     rather than repeating its content. -->
```

Create these five:

| Command | Purpose |
|---|---|
| `guide.md` | Print a plain-language cheat sheet of everything in `.claude/` |
| `investigate.md` | Look into a bug **read-only** and propose a fix plan before changing anything |
| `plan-feature.md` | Plan a feature end to end before writing code |
| `new-component.md` | Scaffold a component (delegates to the skill) |
| `raise-pr.md` | Commit and open the PR (delegates to the skill) |

---

### `.claude/hooks/guard-protected-paths.js` — the only real enforcement

Everything above is writing the model is *asked* to follow. A hook is a program that runs
before a tool call and **can refuse it**.

Skeleton — fill in the three lists at the top:

```js
#!/usr/bin/env node
/**
 * PreToolUse hook. Reads a JSON payload on stdin, exits 2 to DENY.
 * Wired up in .claude/settings.json.
 */

// 1. Paths nothing may edit (machine-generated, vendored, build output).
const PROTECTED_EDIT = [
  // e.g. /^generated\//, /^dist\//
];

// 2. Paths nothing may read (secrets).
const PROTECTED_READ = [
  /^\.env($|\.)/,
];

// 3. Shell commands that skip your safety gates.
const FORBIDDEN_BASH = [
  /--no-verify/,
  /\bHUSKY=0\b/,
  /\[skip ci\]|\[ci skip\]/,
];

let raw = '';
process.stdin.on('data', (c) => { raw += c; });
process.stdin.on('end', () => {
  let payload = {};
  try { payload = JSON.parse(raw || '{}'); } catch { process.exit(0); }

  const tool = payload.tool_name || '';
  const input = payload.tool_input || {};
  const file = input.file_path || '';
  const cmd = input.command || '';

  const deny = (msg) => { console.error(msg); process.exit(2); };

  if (/^(Edit|Write|MultiEdit)$/.test(tool)) {
    if (PROTECTED_EDIT.some((re) => re.test(file))) {
      deny(`Blocked: ${file} is generated or vendored. Change the source instead.`);
    }
  }

  if (tool === 'Read' && PROTECTED_READ.some((re) => re.test(file))) {
    deny(`Blocked: ${file} holds secrets.`);
  }

  if (tool === 'Bash' && FORBIDDEN_BASH.some((re) => re.test(cmd))) {
    deny('Blocked: that command skips the project safety checks.');
  }

  process.exit(0);
});
```

**Test it before trusting it.** A hook that silently fails open is worse than no hook:

```bash
echo '{"tool_name":"Read","tool_input":{"file_path":".env"}}' | node .claude/hooks/guard-protected-paths.js
# should print the block message and exit 2
```

**Do not** make lint or type-check a hook if your pre-commit already runs them — you would pay
that cost on every single edit for no gain.

---

### `<SOURCE_ROOT>/<area>/CLAUDE.md` — loads only in that folder

The cheapest place to put a rule. Costs nothing until someone works in that folder.

```markdown
# <area> — <one line on what lives here>

## Conventions
<!-- Only what is specific to THIS folder. If it is true repo-wide,
     it belongs in standards/ instead. -->
```

Good candidates: your API/client layer, your shared component folder, your i18n folder, and
each large feature area.

---

## Writing rules that work

The single highest-value habit. **Pair every rule with a wrong example.**

A sentence like "don't derive state inside an effect" is easy to skip past. This is not:

````markdown
```js
// ❌ two copies of the same thing, and they can drift apart
const [items, setItems] = useState([]);
const [active, setActive] = useState([]);
useEffect(() => { setActive(items.filter(i => i.active)); }, [items]);

// ✅ worked out as it renders, so it is never out of date
const [items, setItems] = useState([]);
const active = items.filter(i => i.active);
```
````

Models copy patterns. Two labelled snippets beat three paragraphs describing the same rule.

Other things that make the difference:

- **Write gotchas, not textbook.** The model already knows general good practice. It does not
  know that *your* library is a major version behind, or that *this* file is generated.
- **Say what is uncertain.** If the repo is inconsistent, say so and say which way to go for
  new code. A rule stated as absolute when it isn't causes wrong "fixes" to correct code.
- **Never copy another team's rules without checking.** Grep their rule against your own code
  first. A confidently wrong rule is worse than no rule — it will be followed.
- **Review it like code.** It lives in the repo now. A wrong rule reaches every session.

---

## Build checklist

- [ ] Answered everything in **Decide these first**
- [ ] `CLAUDE.md` created — short, with a real gotchas section
- [ ] `standards/` — three files, each with worked bad/good examples
- [ ] `skills/` — the ones that apply, each with a sharp `description` line
- [ ] `agents/` — three files, each with an explicit output shape
- [ ] `commands/` — the ones that apply
- [ ] `hooks/` — one hook, **tested** with the command above
- [ ] `settings.json` — allow list covers your routine commands, deny list covers the undoable
- [ ] `.gitignore` ignores `settings.local.json`
- [ ] A nested `CLAUDE.md` in at least one folder
- [ ] Placeholders replaced with things that are actually true
- [ ] Committed and opened as a pull request for the team to review

---

## Five things to remember

1. It is just files in your repo
2. Start by writing down common mistakes
3. Keep the always-read part small
4. Let the rest load only when needed
5. Add one hook to block mistakes

The point is simple — everyone on the team gets the same good answer.
