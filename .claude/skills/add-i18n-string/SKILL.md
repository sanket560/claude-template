---
name: add-i18n-string
description: Add a user-facing string in the repo's supported i18n workflow. Use when a UI label, error message, or prompt needs translation and the repo has a translation system.
argument-hint: text to localize and context
---

# Add i18n string

Add the string through the repo's canonical translation flow instead of hard-coding it in a component.

## When to use
- A user-facing label or message is missing a translation key.
- The repo uses a central translation or message catalog.

## Procedure
1. Search for an existing translation key that matches the text.
2. Reuse the existing key if the wording and context match.
3. Add a new key only when it is genuinely necessary.
4. Update the canonical message file or source used by the app.
5. Confirm the UI call site uses the key, not a raw string.

## Rules
- Never duplicate a key unless the meaning is intentionally different.
- Keep translation strings in the managed message source, not scattered in components.
- Do not add raw user-facing text to code without checking the repo's i18n flow.

## Related
- `scaffold-component`
- `implement-ticket`
