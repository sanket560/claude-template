# General coding standards

<!-- One line: these are the always-on basics; the real code wins over this doc. -->
These baseline rules apply to all code in this repository. If a file or feature docs disagree, the real code and the local `CLAUDE.md` win.

## Naming
<!-- Your casing rules for files, components, functions, constants. -->
- Use clear, descriptive names.
- Prefer lowerCamelCase for variables and functions, UpperCamelCase for component/class names, and UPPER_SNAKE_CASE for constants.
- Keep file names aligned with the module they represent and avoid vague names like `utils` unless the file is genuinely generic.

## Values & control flow
<!-- Immutability, null handling, and how to match surrounding style. -->
- Prefer immutable data updates and avoid mutating inputs in place.
- Handle empty or missing values explicitly and keep logic easy to follow.
- Match the surrounding style of the codebase instead of introducing a new pattern for a single fix.

## Error handling
<!-- How to wrap async work, when to use error boundaries, what to log. -->
- Surface errors where the user or caller can act on them.
- Keep failure paths explicit and avoid swallowing exceptions silently.
- Log or report only meaningful errors; do not leave debug noise in production code.

## Comments
<!-- Your comment density. Most teams want: none by default, except a rare "why". -->
- Prefer self-explanatory code over comments.
- Add a comment only when the reasoning is not obvious from the code itself.

## Worked examples
<!-- For each rule above that people actually break, one bad + one good snippet.
     See "Writing rules that work" below. -->
```js
// ❌ mutates a value in place and hides intent
const user = { ...payload };
user.name = user.name.trim();
user.roles.push('admin');

// ✅ creates the updated value explicitly
const nextUser = {
  ...payload,
  name: payload.name.trim(),
  roles: [...payload.roles, 'admin'],
};
```

```js
// ❌ unclear naming hides the work
const data = getStuff(items);

// ✅ descriptive names explain the value and purpose
const activeItems = items.filter((item) => item.isActive);
```
