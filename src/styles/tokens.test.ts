import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = fileURLToPath(new URL('..', import.meta.url))
const publicDir = fileURLToPath(new URL('../../public', import.meta.url))

const ACCENT = '#4c8dff' // identidad-ok: constante de test que verifica el valor exacto definido en tokens.css
const ACCENT_RGB = '76, 141, 255'

/** Oro descartado por violar docs/IDENTIDAD_UI.md (prohíbe oro/dorado). Ningún archivo debe conservarlo. */
const LEGACY_ACCENT = /#d9a441|#e8b95c|217,\s*164,\s*65/i // identidad-ok: patrón de test para detectar restos del acento oro descartado

function collectFiles(dir: string, extensions: readonly string[]): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return collectFiles(path, extensions)
    return extensions.some((extension) => path.endsWith(extension)) ? [path] : []
  })
}

const tokens = readFileSync(join(srcDir, 'styles/tokens.css'), 'utf8')

describe('acento de marca', () => {
  it('define el azul como acento y sus variantes derivadas', () => {
    expect(tokens).toContain(`--accent: ${ACCENT};`)
    expect(tokens).toContain(`--accent-dim: rgba(${ACCENT_RGB}, 0.14);`)
    expect(tokens).toContain(`--accent-border: rgba(${ACCENT_RGB}, 0.32);`)
    expect(tokens).toMatch(/--accent-hover: #[0-9a-f]{6};/)
  })

  it('no deja rastros del acento azul anterior en el código fuente', () => {
    // Los propios tests nombran el color viejo para poder detectarlo.
    const files = collectFiles(srcDir, ['.css', '.ts', '.tsx']).filter(
      (file) => !file.endsWith('.test.ts'),
    )

    for (const file of files) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(LEGACY_ACCENT)
    }
  })

  it('usa el acento de marca en el favicon', () => {
    const favicon = readFileSync(join(publicDir, 'favicon.svg'), 'utf8')

    expect(favicon).toContain(ACCENT)
    expect(favicon).not.toMatch(LEGACY_ACCENT)
  })
})
