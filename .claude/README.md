# The `.claude/` workspace

<!-- One paragraph: this folder is the shared Claude Code setup, versioned and
     reviewed like the rest of the repo. -->
This folder is the shared Claude Code setup for the repository. It is versioned with the app code so the team gets the same guardrails, commands, standards, and helper workflows from one source of truth.

<!-- Paste the folder tree here. -->
```text
.claude/
├── README.md
├── .gitignore
├── settings.json
├── settings.local.json
├── standards/
│   ├── coding.md
│   ├── language-framework.md
│   └── testing.md
├── skills/
│   ├── scaffold-component/SKILL.md
│   ├── write-spec-test/SKILL.md
│   ├── add-i18n-string/SKILL.md
│   ├── fix-flaky-test/SKILL.md
│   ├── implement-ticket/SKILL.md
│   └── raise-pr/SKILL.md
├── agents/
│   ├── code-reviewer.md
│   ├── test-fixer.md
│   └── codebase-explorer.md
├── commands/
│   ├── guide.md
│   ├── investigate.md
│   ├── plan-feature.md
│   ├── new-component.md
│   └── raise-pr.md
└── hooks/
    └── guard-protected-paths.js
```

## Commands
<!-- One line per command: name — what it does. -->
- `guide` — prints a plain-language overview of the shared Claude rules and commands.
- `investigate` — performs a read-only bug investigation and proposes a fix plan before code changes.
- `plan-feature` — outlines a feature plan before implementation starts.
- `new-component` — scaffolds a new component using the repo's conventions.
- `raise-pr` — commits the prepared work and opens a pull request.

## Skills
<!-- One line per skill. Note that these load themselves; you never name them. -->
- `scaffold-component` — builds a new UI unit using the standard folder and export patterns.
- `write-spec-test` — writes a focused test aligned with the repo's test strategy.
- `add-i18n-string` — adds a user-facing string in the repo's supported translation workflow.
- `fix-flaky-test` — investigates and removes the root cause of an unstable test.
- `implement-ticket` — moves a ticket from investigation into a reviewable patch.
- `raise-pr` — prepares a branch, commit, and PR using the repo's conventions.

## Agents
<!-- One line per agent. Note they run in their own context and report back. -->
- `code-reviewer` — reviews the current diff against repo standards and the working code.
- `test-fixer` — runs failing tests and repairs the root cause without weakening checks.
- `codebase-explorer` — maps a new area of the repo and reports its entry points and conventions.

## Hooks
<!-- What each hook blocks, and why that is a hook rather than a written rule. -->
- `guard-protected-paths.js` blocks edits to protected/generated files and reads of secret files before a tool call is allowed. This is a hook because it must be enforced consistently every time, even when the model is stressed or in a hurry.

<!-- Also note what you deliberately did NOT make a hook, and why. -->
This workspace does not turn lint or type-check into a hook because that would add cost to every edit. The repo relies on the explicit commands in the root guidance instead.

## Permissions
<!-- Summarise the allow list and the deny list from settings.json. -->
The shared allow list is intentionally narrow and read-only by default. It includes common repo reads, workspace lookup, git status/log/diff, and obvious project commands. The deny list blocks destructive actions like forced push, hard reset, branch deletion, and secret file reads.

## Standards & nested CLAUDE.md
<!-- Which files are always on, and which folders carry their own CLAUDE.md. -->
The files in `.claude/standards/` are always on and imported by the root `CLAUDE.md`. Nested `CLAUDE.md` files can be added under feature or module folders when a team needs local rules for a specific area of the codebase.
