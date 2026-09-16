---
name: implement-ticket
description: Take a ticket from investigation to a repo-ready patch. Use when a change is planned but the work still needs a safe, staged implementation approach.
argument-hint: ticket summary or issue link
---

# Implement ticket

Turn the ticket into a reviewed patch with a small, staged workflow and explicit gates.

## When to use
- A ticket needs implementation.
- The work spans multiple files or touches behavior with risk.

## Procedure
1. Review the ticket requirements and identify the likely code paths.
2. Make a brief implementation plan and confirm the approach before changing code.
3. Write or update the failing spec or test that captures the expected behavior.
4. Implement the smallest correct change.
5. Run the relevant validation commands and fix issues before completion.
6. Summarize the result and any follow-up concerns.

## Rules
- Do not start broad refactors without a reason.
- Do not skip the failing-test step for a behavior change.
- Keep the patch focused and reviewable.

## Related
- `write-spec-test`
- `raise-pr`
