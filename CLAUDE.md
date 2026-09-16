# CLAUDE.md

<!-- One line: what <PROJECT_NAME> is, the stack, the default branch. -->
<PROJECT_NAME> is a <STACK> project. The default branch is <DEFAULT_BRANCH>.

## Authority

<!-- State that this file and the real code win over any other doc. -->
This file and the code in the repository take precedence over any generic guidance or older docs.
<!-- Import the always-on standards: @.claude/standards/coding.md, @.claude/standards/language-framework.md, @.claude/standards/testing.md -->

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
Use <PKG_MANAGER> for dependency management and project scripts. Do not switch to another package manager without updating the repo instructions.

## Gotchas

<!-- THE MOST VALUABLE SECTION. Write only things that would cause a WRONG answer
     if the model did not know them. Ask yourself: what does a new joiner get wrong
     in week one? Typical entries:
       - a library major version that differs from what the model expects
       - an API in this repo that looks standard but is not
       - a helper everyone forgets exists
       - a file that must never be hand-edited
     Three to six lines. If it is not a trap, it does not go here. -->
- Treat <SOURCE_ROOT> as the source of truth for app code; do not add new business logic outside it.
- <PROTECTED_PATHS> should be treated as generated or machine-managed files and not edited by hand.
- <BRANCH_RULE> is the expected branch naming convention for work in this repo.
- <TEST_PATTERN> is the repo test naming pattern; new tests should match it exactly.
- If a library version is pinned or intentionally lagging, follow the repo convention even if it differs from what a general model expects.

## Where things live

<!-- A short map of <SOURCE_ROOT>: the main areas and what each holds.
     Name the current module vs any legacy one, if that applies. -->
The main application code lives under <SOURCE_ROOT>. Keep feature code grouped by domain or area, and place shared UI/helpers in the house-standard directories for that area. If a legacy path still exists, prefer the current module unless the task explicitly targets the legacy implementation.

## Git & PR

<!-- Branch rule <BRANCH_RULE>, commit format, PR target <DEFAULT_BRANCH>,
     size guidance, anything your hooks enforce. -->
- Branch naming rule: <BRANCH_RULE>
- PR target branch: <DEFAULT_BRANCH>
- Keep changes focused and reviewable; avoid unrelated cleanup in feature work.
- Use a clear commit message and keep the branch scoped to one task.
<!-- If you want approval before commits/pushes, say so explicitly here. -->
Do not push or merge without confirming the target branch and review requirements for the repo.

## Before you call a change done

<!-- A checklist the model runs before reporting completion. Suggested groups: -->

**Correctness**
- [ ] <TYPECHECK_CMD> passes
- [ ] <LINT_CMD> passes
- [ ] <TEST_CMD> passes and changed behaviour has a test
- [ ] Bug fixes include a test that fails without the fix

**House rules**
- [ ] Follow the repo gotchas above
- [ ] Use the repo's naming and structure conventions
- [ ] Keep changes within the intended feature area
- [ ] Do not edit protected/generated files unless explicitly instructed

**Hygiene**
- [ ] No stray debug logging or commented-out code
- [ ] Imports orphaned by the change are removed
- [ ] Diff is focused
