# Plan de implementación — danicode.tech

## Punto de partida

Repositorio vacío. Se bootstrapea con Vite (`react-ts`). No hay código previo que reutilizar.

## Arquitectura

Single Page estática. Sin router, sin estado global, sin backend, sin API propia.

```
public/
  fonts/          Inter (woff2, subsets latin + latin-ext, self-hosted)
  images/         foto de perfil (webp responsive + jpg fallback), OG image
  robots.txt
  sitemap.xml
  favicon.svg
src/
  components/     piezas reutilizables (Section, SectionHeading, SocialLinks, MobileMenu…)
  sections/       una por bloque de la página (Hero, About, Services, Projects, Stack, Content, Contact)
  data/           contenido editable desacoplado de los componentes (site.ts, projects.ts, stack.ts…)
  hooks/          useActiveSection, useReveal, useScrollLock
  styles/         tokens.css, base.css + un .css por sección
  App.tsx
  main.tsx
```

Regla: el contenido editorial vive en `src/data/*.ts` tipado. Los componentes no llevan copy hardcodeado.
Esto deja la puerta abierta a i18n futuro (un `data/es/` + `data/en/`) sin refactor estructural.

## Secciones

Header · Hero · Sobre mí · Qué hago · Proyectos · Stack · Contenido · Contacto · Footer

Orden editorial: persona → qué construye → productos reales → cómo trabaja → tecnología → contenido → contacto.
Proyectos por encima de Stack, deliberadamente.

## Decisiones técnicas

| Decisión | Motivo |
|---|---|
| CSS moderno con custom properties, sin Tailwind | Un sitio de una página no justifica el toolchain. Menos build, CSS final más chico, control total del sistema de diseño. |
| Sin React Router | Navegación por anchors + `scroll-margin-top`. Una sola URL. |
| Sin librería de animación | `IntersectionObserver` + transiciones CSS. Respeta `prefers-reduced-motion`. |
| `lucide-react` como única dependencia extra | Iconografía consistente; se importan solo los iconos usados (tree-shaking). |
| Inter self-hosted | Sin request a fonts.gstatic.com: mejor LCP, sin dependencia de terceros, sin problemas de CSP. `font-display: swap` + `preload` del subset latin. |
| TypeScript `strict` + `noUncheckedIndexedAccess` | Sin `any`. |

## Estrategia responsive

Mobile-first. Breakpoints: 640 / 900 / 1120 px.
Grid fluido con `clamp()` para tipografía y espaciado; sin media queries por cada tamaño.
Hero: columna única en móvil (foto arriba, copy debajo), dos columnas desde 900px.
Menú móvil como panel a pantalla completa con focus trap y bloqueo de scroll.

## Estrategia SEO

- `title`, `description`, `canonical`, `theme-color`, `lang="es"`.
- Open Graph + Twitter Card con imagen 1200×630 generada en el repo.
- JSON-LD `Person` con `sameAs` (GitHub, LinkedIn, YouTube) — solo campos verificables.
- `robots.txt` y `sitemap.xml` estáticos (una sola URL).
- HTML semántico: un solo `<h1>`, `<section>` con `aria-labelledby`.

## Estrategia de assets

Foto de perfil real (`/home/dani/Pictures/Perfil.png`, 1254×1254) reescalada a 560/840/1120 px en WebP
(q82) + fallback JPG. `<picture>` con `srcset` y `fetchpriority="high"` (es el LCP, no se hace lazy).
Fuentes: solo dos woff2 (~130 KB combinados). Sin iconos bitmap: favicon SVG.

## Estrategia Render

Static Site vía Blueprint (`render.yaml` en raíz). Sin base de datos, sin web service, sin cron.
Los static sites de Render son gratuitos y no aceptan el campo `plan`.
`autoDeployTrigger: commit`. Rewrite `/*` → `/index.html`.
Headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`
y `Cache-Control: immutable` para `/assets/*` (hasheados por Vite). Sin CSP restrictiva
(no aporta en un sitio sin JS de terceros y rompe con facilidad).

## Contenido: qué es verificable

Descripciones de productos derivadas de los README de los repos locales
(`sistema_de_gestion_de_ventas`, `menu_qr`, `BeautyOps`) y de los `<title>`/`<meta description>`
de los sitios en producción. Stack derivado de los `package.json` reales de esos repos.
No se inventan métricas, clientes, años de experiencia ni funcionalidades.
