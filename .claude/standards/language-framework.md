# <STACK> standards

## Language
<!-- Strictness settings, typing rules, what to avoid. -->
Use the project's language and typing rules as the source of truth. Prefer explicit, typed APIs and avoid `any` unless it is clearly required and justified.

## Framework
<!-- Component/module style, export style, file layout, props typing. -->
Follow the framework conventions used in the repo. Keep module boundaries clear and favor the existing component or service structure over introducing a new one.

## Styling & structure
<!-- How styles are written and where they live. Name the one true way,
     and note honestly where the repo is inconsistent. -->
Use the repo's established styling approach consistently. When the codebase is inconsistent, prefer the pattern already used in the nearby code rather than reworking unrelated files.

## File naming
<!-- Naming patterns. If your static analysis excludes some patterns from
     coverage, say which, and warn that real logic must not hide in them. -->
Name files according to the repo's conventions and keep the shape consistent with adjacent modules. Do not hide logic in files named for a single concern when it belongs in a normal source module.

## Library versions (easy to get wrong)
<!-- CRITICAL. List any library whose major version differs from what a model
     would assume, with the API difference spelled out. This single section
     prevents a lot of confidently wrong code. -->
- Document any library version or API differences here before making assumptions.
- Example: if a library uses a different lifecycle, prop shape, or state API than the current major version commonly does, record the specific difference here.

## Worked examples
<!-- Bad/good pairs for the rules above. -->
```ts
// ❌ broad, unsafe typing hides issues
const value: any = getData();

// ✅ keep the type explicit and shaped to the actual contract
const value: UserRecord | null = getData();
```

```ts
// ❌ creates a new pattern in a feature directory
export default function Widget() {
  return <div />;
}

// ✅ follow the repository's local style and export pattern
export function Widget() {
  return <div />;
}
```
