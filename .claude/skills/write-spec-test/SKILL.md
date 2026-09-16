---
name: write-spec-test
description: Write a spec or test in the repo's house style. Use when a behavior is being added, changed, or fixed and the test should define the expected result before the code change.
argument-hint: feature or bug name and the behavior to validate
---

# Write spec test

Write a focused test that captures the intended behavior and stays aligned with the repo's testing standards.

## When to use
- Adding new behavior or fixing a bug.
- Clarifying expected behavior before implementation.

## Procedure
1. Identify the exact user-visible behavior to validate.
2. Place the test next to the feature or component under test.
3. Use the existing query and interaction style from the repo.
4. Assert the outcome, not an implementation detail.
5. Keep the test lean and remove duplicates.

## Rules
- Prefer the smallest test that proves the behavior.
- Do not weaken assertions to make a test pass.
- Delete tests that add no protection.

## Related
- `fix-flaky-test`
- `implement-ticket`
