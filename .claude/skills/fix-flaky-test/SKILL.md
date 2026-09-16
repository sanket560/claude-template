---
name: fix-flaky-test
description: Investigate and fix a flaky test in the repo's test stack. Use when a test passes and fails intermittently, usually without code changes.
argument-hint: failing test name or path
---

# Fix flaky test

Diagnose the root cause of an intermittent failure before editing the test or code.

## When to use
- A test fails inconsistently.
- A test passes locally but fails in CI or on another run.

## Procedure
1. Reproduce the failure and capture the exact symptoms.
2. Check the test for timing, shared state, or hidden ordering assumptions.
3. Look for real code issues such as race conditions, stale mocks, or non-deterministic data.
4. Fix the root cause rather than adding a retry or blanket timeout.
5. Keep the test assertion meaningful and strong.

## Rules
- Do not add retries or longer sleeps as a substitute for a real fix.
- Do not weaken assertions to make the test pass.
- Keep the fix narrow and explain the cause in the final summary.

## Related
- `write-spec-test`
- `test-fixer`
