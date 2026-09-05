import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const srcDir = fileURLToPath(new URL('..', import.meta.url))
const publicDir = fileURLToPath(new URL('../../public', import.meta.url))

const ACCENT = '#d9a441'
const ACCENT_RGB = '217, 164, 65'

/** Azul del acento anterior, en hex y en rgba(). Ningún archivo debe conservarlo. */
const LEGACY_ACCENT = /#4c8dff|#6ba1ff|76,\s*141,\s*255/i

function collectFiles(dir: string, extensions: readonly string[]): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return collectFiles(path, extensions)
    return extensions.some((extension) => path.endsWith(extension)) ? [path] : []
  })
}

const tokens = readFileSync(join(srcDir, 'styles/tokens.css'), 'utf8')

describe('acento de marca', () => {
  it('define el oro como acento y sus variantes derivadas', () => {
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
