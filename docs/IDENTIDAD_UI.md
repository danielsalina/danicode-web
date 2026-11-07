# Identidad UI · reglas del proyecto (v2 · noviembre 2026)

Fuente de verdad del diseño visual de este repositorio. Toda persona o agente que toque la interfaz la sigue. Si una tarea pide algo que choca con este documento, se avisa y se pregunta antes de hacerlo; no se resuelve en silencio.

El cumplimiento se verifica con `node scripts/check-identidad.mjs`. Un cambio de UI no está terminado hasta que ese comando termina sin errores.

---

## 1. Tema del proyecto

El tema se elige una vez por repositorio y se declara en `AGENTS.md` (línea `TEMA:`).

| Tema | Para qué | Modo |
| --- | --- | --- |
| `INSTITUCIONAL` | Apps no tech: servicios, reservas, gestión, seguros, salones, condominios | Claro |
| `CONSOLA` | Apps tech: pagos, pasarelas, backoffice técnico, herramientas internas, dashboards operativos | Oscuro |
| `SENAL` | Solo sitios de la marca personal Dani Code (portfolio, landing del canal, danicode.tech) | Oscuro |

Un producto nunca usa `SENAL`: la marca personal no se impone a los productos.

---

## 2. Tokens

Los tokens viven en un solo archivo, `src/styles/tokens.css` (o la ruta equivalente del framework), que empieza con el comentario `/* identidad:tokens */`. Es el **único** archivo del proyecto donde puede aparecer un color literal (`#hex`, `rgb()`, `hsl()`). Los archivos base están en `styles/` de este kit: se copia el del tema elegido.

Nombres semánticos (iguales en los tres temas, cambian los valores):

| Token | Uso |
| --- | --- |
| `--bg` | Fondo de la app |
| `--surface`, `--surface-2` | Tarjetas, paneles; panel elevado y hover |
| `--border` | Separadores y bordes de tarjetas (decorativos) |
| `--border-input` | Borde de inputs, selects, checkboxes y botones secundarios (≥ 3:1) |
| `--text`, `--text-muted`, `--text-subtle` | Texto principal, secundario y terciario (todos ≥ 4,5:1) |
| `--primary`, `--primary-hover`, `--primary-active`, `--primary-fg`, `--primary-soft` | Acción principal y selección |
| `--link`, `--focus` | Enlaces y anillo de foco |
| `--ok`, `--warn`, `--err`, `--info` (+ `-soft`) | Estados. `--warn` es naranja, nunca amarillo |
| `--accent` | Solo `SENAL`: azul de marca para texto grande y detalles, no para botones |

Valores, contrastes y comunes (radios, sombras, movimiento, espaciado, tipografía) están en los archivos de `styles/`. No se inventan tokens nuevos sin medir su contraste: texto ≥ 4,5:1, bordes de componentes interactivos e íconos que transmiten información ≥ 3:1.

### Tailwind

- **v4** (`@import "tailwindcss"`): mapear los tokens dentro de `@theme inline { --color-bg: var(--bg); --color-primary: var(--primary); … }` y desactivar la paleta por defecto con `--color-*: initial;` al inicio del bloque `@theme`.
- **v3** (`tailwind.config.*`): `theme.colors` (no `extend`) con los tokens vía `var(--token)`, para que la paleta por defecto no exista. Igual con `fontFamily`, `borderRadius`, `boxShadow`, `transitionTimingFunction`, `transitionDuration`.
- Clases resultantes: `bg-surface`, `text-muted`, `border-input`, etc. Nunca `bg-blue-500`, `text-gray-400` ni similares.

---

## 3. Prohibido (el chequeo lo detecta)

| Regla | Ejemplos |
| --- | --- |
| Oro, dorado, amarillo y ámbar en cualquier forma | `#D4AF37`, `#F59E0B`, `#FACC15`, `yellow-*`, `amber-*`, warnings amarillos |
| Colores literales fuera de `tokens.css` | `color: #333`, `style={{background:'#fff'}}`, `rgba(0,0,0,.5)` |
| Paleta por defecto de Tailwind | `bg-indigo-500`, `text-slate-400`, `border-gray-200`, `from-blue-600` |
| Tipografías genéricas | Inter, Geist, Roboto, Poppins, Montserrat, Space Grotesk, JetBrains Mono, Manrope, Plus Jakarta Sans, DM Sans, Outfit, Sora |
| Degradados y efectos | `linear-gradient`, `bg-gradient-*`, `bg-clip-text`, `backdrop-blur`, glow, `drop-shadow` de color, `shadow-xl`, `shadow-2xl` |
| Radios grandes | `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `border-radius` > 6 px (excepto `rounded-full` en avatares y toggles) |
| Movimiento con rebote | `animate-bounce`, `cubic-bezier` distinto del token, `type: "spring"`, escala de entrada |
| Emojis como íconos | `<span>🚀</span>` en botones, menús o tarjetas |

Excepción puntual: comentario `identidad-ok: <motivo>` en la misma línea (por ejemplo, el color de una marca de terceros en un logo de pago). Cada excepción se reporta al terminar la tarea.

---

## 4. Tipografía

- IBM Plex Sans (400/500/600/700) para toda la interfaz; IBM Plex Mono (400/500) para IDs, códigos, montos técnicos, logs, endpoints. En `SENAL`, títulos grandes en IBM Plex Sans Condensed 700.
- Autoalojadas: `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono` (y `@fontsource/ibm-plex-sans-condensed` en `SENAL`), o woff2 locales con `font-display: swap`. Nunca Google Fonts por CDN.
- Escala: 12 / 13 / 14 / 16 / 20 / 24 / 32 px. Base 14 px en apps densas (backoffice, consola) y 16 px en apps de cliente final. Peso máximo 700.
- `font-variant-numeric: tabular-nums` en tablas, montos, contadores y fechas.

---

## 5. Geometría y profundidad

- Radios: `--radius-sm` 2 px (tablas densas, badges) · `--radius` 4 px (botones, inputs, tarjetas) · `--radius-lg` 6 px (modales, paneles grandes).
- La separación entre superficies se hace con bordes de 1 px en `--border`, no con sombras.
- Sombra solo `--shadow-overlay`, y solo en menús, popovers, dropdowns y modales.

---

## 6. Movimiento

- Easing único `var(--ease)` = `cubic-bezier(0.2, 0, 0, 1)`. Duraciones `--dur-fast` 120 ms (estado) · `--dur-base` 200 ms (entrada) · `--dur-slow` 320 ms (paneles).
- Solo se animan `color`, `background-color`, `border-color`, `opacity` y `transform: translateX/Y` (8 a 24 px). Sin escala, sin rotación, sin rebote.
- `@media (prefers-reduced-motion: reduce)` desactiva traslaciones.

---

## 7. Componentes y estados

- Botones: primario (`--primary`), secundario (borde `--border-input`, fondo transparente), terciario (solo texto `--link`), peligro (`--err`). Uno solo primario por vista.
- Cada elemento interactivo tiene hover, active, `:focus-visible` (anillo de 2 px en `--focus` con 2 px de separación) y disabled. Nunca `outline: none` sin reemplazo.
- Cada vista con datos tiene carga (skeleton), vacío (mensaje + acción), error (qué pasó + cómo resolverlo) y éxito.
- Formularios: etiqueta visible siempre (el placeholder no es etiqueta). Error junto al campo, en `--err`, con texto, no solo color.
- Tablas: encabezado `--text-muted` 12 px en mayúsculas con `letter-spacing: 0.04em`; filas con borde inferior de 1 px; números a la derecha con `tabular-nums`.
- Íconos: una sola librería de íconos de línea (la que ya tenga el proyecto). Si no hay ninguna, preguntar antes de agregar una.
- Textos de interfaz en español neutro, sin signos de exclamación de relleno ni emojis.

---

## 8. Qué no hace un agente sin preguntar

- Cambiar el tema del proyecto.
- Agregar dependencias (UI kits, librerías de animación, íconos, fuentes que no sean IBM Plex).
- Tocar lógica, rutas, llamadas a la API, validaciones o estructura de datos durante una tarea de estilos.
- Desactivar, editar o saltar `scripts/check-identidad.mjs` o el hook de commit para que pase.
