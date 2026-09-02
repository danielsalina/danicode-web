# Dani Code

Web personal y portfolio de Daniel Salinas. Single page estática, sin backend.

Producción: <https://danicode.tech>

## Stack

React 19 · TypeScript · Vite · CSS moderno (custom properties) · lucide-react

Sin router, sin estado global, sin API. El contenido editorial vive tipado en `src/data/`.

## Estructura

```
public/
  fonts/          Inter self-hosted (woff2, subsets latin y latin-ext)
  images/         foto de perfil (webp + jpg) y og-danicode.jpg
  favicon.svg  robots.txt  sitemap.xml
src/
  components/     Header, Footer, SocialLinks, BrandIcons
  sections/       Hero, About, Projects, Stack, Content, Contact (+ su CSS)
  data/           site.ts, projects.ts, content.ts  ← contenido editable
  hooks/          useReveal, useActiveSection
  styles/         tokens.css, base.css
render.yaml       Blueprint de Render (static site)
DEPLOYMENT.md     Deploy y DNS paso a paso
```

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm typecheck
pnpm build
```

## Tests

```bash
pnpm test
```

## Preview

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Editar el contenido

| Qué | Dónde |
|---|---|
| Nombre, enlaces sociales, navegación, metadatos | `src/data/site.ts` |
| Proyectos (nombre, problema, público, capacidades, stack, URL) | `src/data/projects.ts` |
| Hero, sobre mí, qué hago, stack, contenido, contacto | `src/data/content.ts` |
| Title, description, Open Graph, JSON-LD | `index.html` |

## Foto de perfil

Las variantes de `public/images/daniel-salinas-*.webp` y `daniel-salinas.jpg`
se generan a partir de una imagen cuadrada. Para reemplazarlas:

```bash
python3 - <<'PY'
from PIL import Image
src = Image.open("ruta/a/tu-foto.png").convert("RGB")
for w in (560, 840, 1120):
    src.resize((w, w), Image.LANCZOS).save(f"public/images/daniel-salinas-{w}.webp", "WEBP", quality=82, method=6)
src.resize((840, 840), Image.LANCZOS).save("public/images/daniel-salinas.jpg", "JPEG", quality=86, optimize=True, progressive=True)
PY
```

## Deploy

Render Blueprint (`render.yaml`) como Static Site. Ver [DEPLOYMENT.md](./DEPLOYMENT.md).
