---
name: raise-pr
description: Prepare the branch, commit, and pull request for review. Use when work is validated and ready to be shared with the team.
argument-hint: PR title and summary
---

# Raise PR

Prepare a clean branch, a focused commit, and a reviewable pull request.

## When to use
- Code is implemented and validated.
- A pull request should be opened against the repo's target branch.

## Procedure
1. Confirm the branch name matches the repo rule: <BRANCH_RULE>.
2. Review the diff and remove stray edits.
3. Commit with a clear, conventional message that matches the repo convention.
4. Open a PR against <DEFAULT_BRANCH> with a summary and validation notes.
5. Include the relevant context, risks, and test commands in the PR body.

## Rules
- Keep the PR focused on one change.
- Do not force-push without explicit approval if the team requires it.
- Do not include unrelated cleanup or formatting churn.

## Related
- `implement-ticket`
- `code-reviewer`
