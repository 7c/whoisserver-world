#!/usr/bin/env node
/**
 * Dependency-isolation guard (zero dependencies).
 *
 * Enforces that this package's manifest matches its own source:
 *   - every runtime `dependencies` entry is actually imported here
 *     (a foreign / private-only package leaking in shows up as UNUSED)
 *   - every bare import in runtime source is declared as a dependency
 *     (a dep imported at runtime but only in devDependencies / missing shows up)
 *
 * Test files, build config and devDependencies are intentionally ignored.
 * Exits 1 on any violation so it can gate `npm run build` / `npm test` / CI.
 */
const fs = require('fs')
const path = require('path')
const { builtinModules } = require('module')

const ROOT = __dirname
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'))
const declared = new Set(Object.keys(pkg.dependencies || {}))
const devDeps = new Set(Object.keys(pkg.devDependencies || {}))
const builtins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)])

const SKIP_DIRS = new Set(['node_modules', '.git', 'data', 'coverage', 'tlds', 'models', 'tests'])
const SKIP_FILES = new Set([path.basename(__filename), 'jest.config.js'])
const SRC_EXT = new Set(['.ts', '.js'])
const isTestFile = (f) => /\.(test|jest|spec)\.[tj]s$/.test(f) || SKIP_FILES.has(f)

// require('x') and dynamic import('x') — anchored on the closing paren so a bare
// `from '...'` inside a template string can't false-match
const CALL_RE = /(?:require|import)\(\s*['"]([^'"]+)['"]\s*\)/g
// static `import ... from 'x'` / `export ... from 'x'` and side-effect `import 'x'`
// — matched per line so the `import`/`export` keyword must start the statement
const FROM_RE = /^\s*(?:import|export)\b[^\n]*?\bfrom\s+['"]([^'"]+)['"]/
const SIDE_EFFECT_RE = /^\s*import\s+['"]([^'"]+)['"]/

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out)
    } else if (SRC_EXT.has(path.extname(entry.name)) && !isTestFile(entry.name)) {
      out.push(path.join(dir, entry.name))
    }
  }
}

// 'mybase/ts' -> 'mybase', 'punycode/' -> 'punycode', '@scope/x/y' -> '@scope/x'
function toPackage(spec) {
  if (spec.startsWith('.') || spec.startsWith('/')) return null
  const clean = spec.replace(/^node:/, '')
  const parts = clean.split('/').filter(Boolean)
  return clean.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]
}

const files = []
walk(ROOT, files)

const imported = new Set()
const add = (spec) => {
  const clean = spec.replace(/^node:/, '')
  const name = toPackage(spec)
  if (!name) return
  // 'punycode/' (trailing slash) deliberately resolves to the userland npm
  // package, not the deprecated core module — so treat it as a real dependency
  const isUserlandPunycode = name === 'punycode' && clean !== 'punycode'
  if (builtins.has(name) && !isUserlandPunycode) return
  imported.add(name)
}

for (const file of files) {
  const code = fs.readFileSync(file, 'utf8')
  let m
  CALL_RE.lastIndex = 0
  while ((m = CALL_RE.exec(code)) !== null) add(m[1])
  for (const line of code.split(/\n/)) {
    const mm = line.match(FROM_RE) || line.match(SIDE_EFFECT_RE)
    if (mm) add(mm[1])
  }
}

const unused = [...declared].filter((d) => !imported.has(d))
const missing = [...imported].filter((d) => !declared.has(d) && !devDeps.has(d))
const usedDevAtRuntime = [...imported].filter((d) => !declared.has(d) && devDeps.has(d))

let bad = false
if (unused.length) {
  bad = true
  console.error(`✗ declared but never imported (remove, or it belongs to another package):\n  - ${unused.join('\n  - ')}`)
}
if (missing.length) {
  bad = true
  console.error(`✗ imported but not declared as a dependency:\n  - ${missing.join('\n  - ')}`)
}
if (usedDevAtRuntime.length) {
  bad = true
  console.error(`✗ imported by runtime code but only in devDependencies:\n  - ${usedDevAtRuntime.join('\n  - ')}`)
}

if (bad) {
  console.error(`\ndependency isolation check FAILED for "${pkg.name}"`)
  process.exit(1)
}
console.log(`✓ dependency isolation OK for "${pkg.name}" (${declared.size} deps, all imported)`)
