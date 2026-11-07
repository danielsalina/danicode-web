#!/usr/bin/env node
// CHEQUEO DE IDENTIDAD UI · SIN DEPENDENCIAS · NODE >= 18
// USO:
//   node scripts/check-identidad.mjs            -> REVISA TODO EL REPO
//   node scripts/check-identidad.mjs --staged   -> SOLO ARCHIVOS EN STAGE (HOOK DE GIT)
//   node scripts/check-identidad.mjs --hook     -> MODO HOOK DE CLAUDE CODE (LEE JSON POR STDIN)
//   node scripts/check-identidad.mjs a.tsx b.css -> SOLO ESOS ARCHIVOS
// EXCEPCION PUNTUAL: COMENTARIO "identidad-ok: <motivo>" EN LA MISMA LINEA
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, basename } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const EXT = new Set(['.css', '.scss', '.sass', '.less', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs',
  '.vue', '.svelte', '.astro', '.html', '.php', '.twig', '.jinja', '.j2']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', 'build', 'out', '.next', '.nuxt', '.svelte-kit',
  '.output', 'coverage', 'vendor', 'storage', '.venv', 'venv', '__pycache__', 'public', 'static', 'docs', '.turbo']);
const SKIP_FILES = new Set(['check-identidad.mjs']);

// ---------- REGLAS ----------
const TW_COLORS = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const TW_PREFIX = 'bg|text|border|border-[trblxy]|ring|ring-offset|from|via|to|fill|stroke|outline|divide|shadow|accent|caret|decoration|placeholder';
const FONTS = ['Inter', 'Geist', 'Roboto', 'Poppins', 'Montserrat', 'Space Grotesk', 'JetBrains Mono', 'Manrope',
  'Plus Jakarta Sans', 'DM Sans', 'Outfit', 'Sora', 'Open Sans', 'Lato', 'Nunito'];

const RULES = [
  { id: 'amarillo-tw', msg: 'amarillo/ambar de Tailwind prohibido', re: new RegExp(`(?<![\\w-])(?:[\\w-]+:)*(?:${TW_PREFIX})-(?:yellow|amber)-\\d{2,3}\\b`, 'g') },
  { id: 'paleta-tw', msg: 'paleta por defecto de Tailwind: usar la clase del token (bg-surface, text-muted...)', re: new RegExp(`(?<![\\w-])(?:[\\w-]+:)*(?:${TW_PREFIX})-(?:${TW_COLORS})-\\d{2,3}(?:\\/\\d+)?\\b`, 'g') },
  { id: 'color-literal', msg: 'color literal fuera de tokens.css: usar var(--token)', re: /(?<![\w&-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![\w-])|\b(?:rgba?|hsla?|oklch)\(\s*[\d.]/g, onlyColorContext: true },
  { id: 'tipografia', msg: 'tipografia prohibida: usar IBM Plex Sans / Mono', re: new RegExp(`(?:font-family|fontFamily|@fontsource/|fonts\\.googleapis|family=|['"\`])\\s*:?\\s*['"\`]?(?:${FONTS.map(f => f.replace(' ', '[ +_-]?')).join('|')})\\b`, 'gi') },
  { id: 'gradiente', msg: 'degradado prohibido', re: /\b(?:linear|radial|conic)-gradient\(|(?<![\w-])(?:[\w-]+:)*bg-(?:gradient|linear|radial|conic)-[\w-]+|(?<![\w-])bg-clip-text\b/g },
  { id: 'blur-glow', msg: 'blur/glow prohibido', re: /(?<![\w-])(?:[\w-]+:)*(?:backdrop-blur(?:-\w+)?|backdrop-filter|drop-shadow-\w+)\b|backdrop-filter\s*:|text-shadow\s*:\s*(?!none)/g },
  { id: 'sombra', msg: 'sombra grande prohibida: solo var(--shadow-overlay) en overlays', re: /(?<![\w-])(?:[\w-]+:)*shadow-(?:lg|xl|2xl|inner)\b/g },
  { id: 'radio', msg: 'radio mayor a 6 px prohibido (rounded-full solo avatares/toggles)', re: /(?<![\w-])(?:[\w-]+:)*rounded(?:-[trblse]{1,2})?-(?:xl|2xl|3xl|4xl)\b|border-radius\s*:\s*(?:[7-9]|[1-9]\d+)px|borderRadius\s*:\s*['"]?(?:[7-9]|[1-9]\d+)(?:px)?\b/g },
  { id: 'rebote', msg: 'animacion con rebote prohibida: usar var(--ease)', re: /(?<![\w-])animate-(?:bounce|ping|spin-slow)\b|type\s*:\s*['"]spring['"]|cubic-bezier\((?!\s*0\.2\s*,\s*0\s*,\s*0\s*,\s*1\s*\))[^)]*\)|\bease-(?:in-out|out|in)-back\b/g },
  { id: 'emoji', msg: 'emoji usado en UI: usar icono de linea de la libreria del proyecto', re: /\p{Extended_Pictographic}/gu, exts: new Set(['.jsx', '.tsx', '.vue', '.svelte', '.astro', '.html', '.php', '.twig', '.jinja', '.j2']) },
];

const COLOR_CTX = /(?:color|background|border|fill|stroke|shadow|outline|bg|fg|text|accent|primary|theme|style|#[0-9a-fA-F]{3,8}\s*[;,)'"]|:\s*['"]?#)/i;

// ---------- ARCHIVOS ----------
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, out);
    else if (EXT.has(ext(p)) && !SKIP_FILES.has(basename(p))) out.push(p);
  }
  return out;
}
function ext(p) { return p.endsWith('.blade.php') ? '.php' : extname(p).toLowerCase(); }

function isTokenFile(path, src) {
  return /\/\*\s*identidad:tokens\s*\*\//.test(src.slice(0, 400)) || /tailwind\.config\.[cm]?[jt]s$/.test(path);
}

function check(path) {
  if (!existsSync(path) || !EXT.has(ext(path))) return [];
  const src = readFileSync(path, 'utf8');
  const tokenFile = isTokenFile(path, src);
  const out = [];
  src.split('\n').forEach((line, i) => {
    if (/identidad-ok:/.test(line)) return;
    for (const r of RULES) {
      if (r.exts && !r.exts.has(ext(path))) continue;
      if (tokenFile && r.id === 'color-literal') continue;
      r.re.lastIndex = 0;
      let m;
      while ((m = r.re.exec(line))) {
        if (r.onlyColorContext && !COLOR_CTX.test(line)) break;
        if (r.id === 'paleta-tw' && /-(?:yellow|amber)-/.test(m[0])) continue;
        // "#123" SOLO DIGITOS SUELE SER UN ISSUE O UN ANCLA: SE REPORTA SOLO SI HAY PROPIEDAD DE COLOR EN LA LINEA
        if (r.id === 'color-literal' && /^#\d+$/.test(m[0]) && !/(?:color|background|fill|stroke|border)\s*[:=]/i.test(line)) continue;
        out.push({ path: relative(ROOT, path), line: i + 1, rule: r.id, msg: r.msg, hit: m[0].trim() });
      }
    }
  });
  return out;
}

// ---------- MODOS ----------
const args = process.argv.slice(2);
let files;
if (args.includes('--hook')) {
  let input = '';
  try { input = readFileSync(0, 'utf8'); } catch {}
  let fp;
  try { const j = JSON.parse(input); fp = j.tool_input?.file_path || j.tool_input?.path; } catch {}
  if (!fp) process.exit(0);
  const found = check(fp);
  if (!found.length) process.exit(0);
  console.error(report(found) + '\nCorrige estas violaciones de docs/IDENTIDAD_UI.md antes de seguir. No edites el chequeo para que pase.');
  process.exit(2); // CLAUDE CODE DEVUELVE STDERR AL AGENTE
} else if (args.includes('--staged')) {
  const list = execSync('git diff --cached --name-only --diff-filter=ACMR', { encoding: 'utf8' }).split('\n').filter(Boolean);
  files = list.map(f => join(ROOT, f)).filter(f => !SKIP_FILES.has(basename(f)) && !f.split('/').some(s => SKIP_DIRS.has(s)));
} else if (args.length) {
  files = args.map(f => join(ROOT, f));
} else {
  files = walk(ROOT);
}

const found = files.flatMap(check);
if (!found.length) { console.log(`identidad-ui: OK (${files.length} archivos revisados)`); process.exit(0); }
console.error(report(found));
process.exit(1);

function report(list) {
  const byRule = {};
  for (const f of list) (byRule[f.rule] ??= []).push(f);
  let s = `identidad-ui: ${list.length} violaciones\n`;
  for (const [rule, items] of Object.entries(byRule)) {
    s += `\n[${rule}] ${items[0].msg} (${items.length})\n`;
    for (const f of items.slice(0, 50)) s += `  ${f.path}:${f.line}  ${f.hit}\n`;
    if (items.length > 50) s += `  ... y ${items.length - 50} mas\n`;
  }
  return s;
}
