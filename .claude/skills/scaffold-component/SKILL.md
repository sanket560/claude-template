---
name: scaffold-component
description: Create a new UI component in the repo's house style. Use when a feature needs a new component, reusable block, or screen fragment and the structure must follow project conventions.
argument-hint: component name and optional folder
---

# Scaffold component

Create a new component using the repo's naming and export conventions.

## When to use
- A new feature needs a reusable UI unit.
- A page or screen needs a new sub-part with a consistent folder layout.

## Procedure
1. Inspect the nearest existing component in the same area.
2. Create the component folder and file structure used by that area.
3. Keep the component focused on one responsibility.
4. Add the export path expected by local conventions.
5. Ensure the component has a minimal, relevant test or usage example when required.

## Rules
- Match the surrounding folder structure, not a generic template.
- Reuse existing patterns before inventing new abstractions.
- Do not create broad wrappers or unrelated helper files.

## Related
- `write-spec-test`
- `implement-ticket`
