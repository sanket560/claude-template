# Testing standards

<!-- One line: the test stack, and that the full workflow is in the
     write-spec-test skill. -->
This repo uses a standard test workflow; create and update tests in the same style as the existing suite, following the write-spec-test guidance.

## Structure
<!-- File naming <TEST_PATTERN>, where tests live, how they are organised. -->
- Keep tests near the code they validate and follow the repository's naming pattern: <TEST_PATTERN>.
- Group by feature or component to make the suite easier to scan.

## Queries & events
<!-- How to find things and simulate interaction, in priority order. -->
- Prefer strongly scoped queries and accessible selectors.
- Simulate the user interaction that matters most for the behavior under test.

## Mocking & assertions
<!-- What to mock, what never to mock, which matchers to use. -->
- Mock only external boundaries or side effects, not the logic you are validating.
- Prefer explicit assertions over broad snapshots when the behavior is important.
- Keep assertions focused on the behavior and not on implementation details.

## What to test / skip
<!-- Two short lists. Include "delete tests that add nothing". -->
- Test real behavior that matters to users and business logic.
- Skip incidental implementation details and boilerplate.
- Delete tests that add nothing and do not protect an actual behavior.

## Worked examples
<!-- Bad/good pairs. -->
```ts
// ❌ tests a brittle implementation detail instead of behavior
expect(component.find('div').length).toBe(3);

// ✅ asserts directly on the user-visible outcome
expect(screen.getByRole('button', { name: /save/i })).toBeVisible();
```

```ts
// ❌ mock-heavy test that validates the mock instead of the code
const fn = jest.fn();
expect(fn).toHaveBeenCalled();

// ✅ test the real interaction end to end in a focused way
await user.click(screen.getByRole('button', { name: /submit/i }));
expect(screen.getByText(/saved successfully/i)).toBeVisible();
```

Run: <TEST_CMD> <file or path>
