#!/usr/bin/env node
/**
 * PreToolUse hook. Reads a JSON payload on stdin, exits 2 to DENY.
 * Wired up in .claude/settings.json.
 */

// 1. Paths nothing may edit (machine-generated, vendored, build output).
const PROTECTED_EDIT = [
  // e.g. /^generated\//, /^dist\//
  /^\.claude\/settings\.local\.json$/,
  /^\.env($|\.)/,
];

// 2. Paths nothing may read (secrets).
const PROTECTED_READ = [
  /^\.env($|\.)/,
];

// 3. Shell commands that skip your safety gates.
const FORBIDDEN_BASH = [
  /--no-verify/,
  /\bHUSKY=0\b/,
  /\[skip ci\]|\[ci skip\]/,
];

let raw = '';
process.stdin.on('data', (c) => { raw += c; });
process.stdin.on('end', () => {
  let payload = {};
  try { payload = JSON.parse(raw || '{}'); } catch { process.exit(0); }

  const tool = payload.tool_name || '';
  const input = payload.tool_input || {};
  const file = input.file_path || '';
  const cmd = input.command || '';

  const deny = (msg) => { console.error(msg); process.exit(2); };

  if (/^(Edit|Write|MultiEdit)$/.test(tool)) {
    if (PROTECTED_EDIT.some((re) => re.test(file))) {
      deny(`Blocked: ${file} is generated or protected. Change the source instead.`);
    }
  }

  if (tool === 'Read' && PROTECTED_READ.some((re) => re.test(file))) {
    deny(`Blocked: ${file} holds secrets.`);
  }

  if (tool === 'Bash' && FORBIDDEN_BASH.some((re) => re.test(cmd))) {
    deny('Blocked: that command skips the project safety checks.');
  }

  process.exit(0);
});
