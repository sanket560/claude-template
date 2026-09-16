# Claude Workspace Template

A reusable, shareable Claude Code workspace template for teams who want consistent AI guidance, standards, and guardrails checked into the repository.

This repo is designed to be copied into a real project and then customized with the project’s actual conventions, commands, and branch rules.

## What is included

The template contains a ready-to-use `.claude/` workspace with:

- a root `CLAUDE.md` for always-on project guidance
- shared standards for coding, testing, and framework rules
- reusable skills for common tasks
- specialist agents for review, testing, and exploration
- command definitions for common workflows
- a protected-path hook to block risky edits and secret reads

## Folder structure

```text
.
├── CLAUDE.md
├── README.md
├── claude-workspace-template.md
├── .claude/
│   ├── README.md
│   ├── .gitignore
│   ├── settings.json
│   ├── settings.local.json
│   ├── standards/
│   │   ├── coding.md
│   │   ├── language-framework.md
│   │   └── testing.md
│   ├── skills/
│   │   ├── add-i18n-string/SKILL.md
│   │   ├── fix-flaky-test/SKILL.md
│   │   ├── implement-ticket/SKILL.md
│   │   ├── raise-pr/SKILL.md
│   │   ├── scaffold-component/SKILL.md
│   │   └── write-spec-test/SKILL.md
│   ├── agents/
│   │   ├── code-reviewer.md
│   │   ├── codebase-explorer.md
│   │   └── test-fixer.md
│   ├── commands/
│   │   ├── guide.md
│   │   ├── investigate.md
│   │   ├── new-component.md
│   │   ├── plan-feature.md
│   │   └── raise-pr.md
│   └── hooks/
│       └── guard-protected-paths.js
└── .gitignore
```

## How to use this template

1. Copy the repository into your real project.
2. Replace the placeholder values in the root `CLAUDE.md`:
   - project name
   - stack
   - package manager
   - default branch
   - test/lint/typecheck/build/dev commands
   - source root
   - branch naming convention
3. Edit the standards files to match your team's actual conventions.
4. Remove or keep skills based on your project needs.
5. Commit this folder alongside your main application code.

## Why this helps

This keeps Claude Code behavior consistent across the team without each developer maintaining a separate local setup. The files in `.claude/` become part of the project itself, so everyone works from the same default instructions, guardrails, and workflow expectations.

## Customization checklist

Before using this template in a real repo, update these values:

- project name
- stack and framework
- package manager
- test command
- lint command
- typecheck command
- build command
- local dev command
- branch naming rule
- protected/generated folders
- main source root

## License

This template is intended as a reusable starter for team workflows. Use it as a base for your own repo and adjust the rules to fit your project.

## Notes

The main template source is `claude-workspace-template.md`. The actual working setup is the generated `CLAUDE.md` and the files under `.claude/`.
