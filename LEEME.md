# Prompt para agentes de código: identidad UI en proyectos personales (v2)

> **Por qué cambió.** La v1 era un prompt de una sola vez: el agente lo seguía en esa sesión y en la siguiente volvía a `bg-indigo-500`, Inter y `rounded-2xl`. Las reglas que se respetan son las que el agente **lee siempre** (archivos de instrucciones del repo) y las que **una máquina verifica** (un chequeo que falla). La v2 instala las dos cosas y después migra.

## Qué trae `kit_identidad_ui.zip`

| Archivo | Para qué |
| --- | --- |
| `docs/IDENTIDAD_UI.md` | Las reglas completas. Fuente de verdad |
| `AGENTS.md` | Lo leen Codex, Cursor, Copilot (modo agente), Gemini CLI y otros. Incluye la línea `TEMA:` |
| `CLAUDE.md` | Para Claude Code: importa `AGENTS.md` y el documento de reglas |
| `.claude/settings.json` | Hook de Claude Code: corre el chequeo después de **cada** edición y le devuelve los errores al agente en el momento |
| `.github/copilot-instructions.md` | Copilot en VS Code |
| `.cursor/rules/identidad-ui.mdc` | Cursor (regla siempre activa) |
| `styles/tokens.*.css` | Tokens de los tres temas + comunes, con contrastes medidos |
| `scripts/check-identidad.mjs` | Chequeo sin dependencias: hex sueltos, paleta Tailwind, amarillo, fuentes, degradados, blur, sombras, radios, rebotes, emojis |
| `.githooks/pre-commit` | Bloquea commits que rompan las reglas |
| `.github/workflows/identidad-ui.yml` | Falla el PR si algo se coló |

## Cómo usarlo

1. Descomprime el kit en la raíz del repo. Si ya tienes `AGENTS.md` o `CLAUDE.md`, el agente fusiona (paso 1 del prompt).
2. Completa la línea `TEMA:` del bloque de abajo.
3. Pega el bloque en tu agente. Un repo por vez.

**Temas:** `INSTITUCIONAL` (apps no tech, claro) · `CONSOLA` (apps tech, oscuro) · `SENAL` (solo sitios de tu marca personal: portfolio, danicode.tech; nunca un producto).

```text
Eres un ingeniero frontend senior. Vas a instalar las reglas de identidad UI de este repositorio y migrar la interfaz a ellas, sin cambiar ninguna lógica de negocio. Trabaja por etapas, con commits pequeños, en la rama `chore/identidad-ui`. No avances a la siguiente etapa sin terminar la anterior.

TEMA: <INSTITUCIONAL | CONSOLA | SENAL>
Si la línea está vacía o el tema no coincide con el producto (por ejemplo, SENAL en una app de clientes), detente y pregúntame.

## Límites (no negociables)
- No cambies lógica, rutas, llamadas a la API, validaciones, textos funcionales ni estructura de datos. Solo estilos, tokens, tipografía y componentes visuales.
- No agregues dependencias salvo @fontsource/ibm-plex-sans y @fontsource/ibm-plex-mono (más @fontsource/ibm-plex-sans-condensed si el TEMA es SENAL).
- Nunca edites, desactives ni saltes scripts/check-identidad.mjs, el hook de git ni .claude/settings.json para que algo pase.

## 1. Instalar las reglas
- Lee docs/IDENTIDAD_UI.md completo. Desde ahora es tu fuente de verdad.
- Si el repo ya tenía AGENTS.md, CLAUDE.md, .github/copilot-instructions.md o reglas de Cursor, fusiónalos: conserva lo que ya había y agrega la sección "Identidad UI". No borres instrucciones existentes.
- Escribe el TEMA en la línea `TEMA:` de AGENTS.md.
- Crea el archivo de tokens en la ruta de estilos del framework (src/styles/tokens.css o equivalente): tokens.<tema>.css + tokens.comunes.css del kit, en un solo archivo que empiece con `/* identidad:tokens */`. Impórtalo antes que cualquier otro estilo. Borra la carpeta styles/ del kit de la raíz si no es la ruta real.
- Tailwind: v4 → bloque @theme con `--color-*: initial;` y los tokens mapeados con `var()`. v3 → `theme.colors` (no `extend`) con los tokens. Ninguna clase de la paleta por defecto debe seguir existiendo.
- Agrega a package.json el script "check:ui": "node scripts/check-identidad.mjs" (si no hay package.json, no lo crees; el chequeo corre igual con node).
- Corre `git config core.hooksPath .githooks` y `chmod +x .githooks/pre-commit`.
- Commit: "chore: instala reglas de identidad UI".

## 2. Auditoría (no cambies componentes todavía)
- Corre `node scripts/check-identidad.mjs` y guarda la salida.
- Busca también lo que el chequeo no ve: colores en SVG inline, imágenes de fondo con amarillo/oro, librerías de componentes con tema propio, `outline: none` sin reemplazo, vistas sin estado de carga/vacío/error, formularios con solo placeholder.
- Entrégame el informe agrupado por categoría con el conteo, y sigue.

## 3. Tipografía
- Instala las fuentes (fontsource o woff2 locales con font-display: swap). Elimina imports de Google Fonts y de las tipografías prohibidas.
- Aplica la escala 12/13/14/16/20/24/32, base 14 px en apps densas y 16 px en apps de cliente final, tabular-nums en datos.

## 4. Reemplazo
- Cada color literal y cada clase de la paleta Tailwind → su token semántico. Amarillo/oro → --warn (estados) o --primary (acentos).
- Quita degradados, blur, glow y sombras grandes; separa superficies con bordes de 1 px.
- Radios a 2/4/6 px. Transiciones con var(--ease) y las tres duraciones; sin rebote ni escala.
- Emojis usados como íconos → la librería de íconos que ya exista. Si no hay ninguna, pregúntame.
- Commits por área (layout, formularios, tablas, etc.).

## 5. Componentes y estados
- Botones primario/secundario/terciario/peligro; inputs con borde --border-input; un solo primario por vista.
- Hover, active, :focus-visible (anillo 2 px --focus con 2 px de separación) y disabled en todo lo interactivo.
- Carga (skeleton), vacío, error y éxito en cada vista con datos. Etiquetas visibles y errores junto al campo.
- Tablas según docs/IDENTIDAD_UI.md §7.

## 6. Verificación
- `node scripts/check-identidad.mjs` debe dar OK. Las excepciones solo con `identidad-ok: <motivo>` y justificadas.
- Compila, corre tests y linter. Si algo se rompe, corrígelo sin tocar lógica.
- Si hay comando de dev, capturas de 3 pantallas clave (por ejemplo login, listado, formulario) en escritorio y a 390 px, antes y después.
- Contraste con axe u otra herramienta automática si está disponible.

## 7. Entrega
Resumen con: archivos de instrucciones creados o fusionados, tokens, colores y clases reemplazados, tipografías eliminadas, componentes ajustados, capturas antes/después, excepciones `identidad-ok` y su motivo, y decisiones que necesiten mi aprobación. No hagas merge.
```

## Después de la migración

Para tareas nuevas no hace falta pegar nada: el agente lee `AGENTS.md`/`CLAUDE.md` solo, el hook lo corrige mientras edita y el pre-commit y el CI frenan lo que se escape. Si un agente igual se desvía, la frase corta es: *"Relee docs/IDENTIDAD_UI.md y corre node scripts/check-identidad.mjs hasta que dé OK."*

## Qué corregí respecto de la v1

- **Bordes de inputs.** La v1 pedía 3:1 para bordes interactivos, pero `--border-strong` daba 1,8:1 (Institucional) y 1,7:1 (Consola). Nuevo token `--border-input`: 3,7:1 en ambos.
- **Tema Señal para tus sitios.** No existía. Ojo: blanco sobre el azul de marca `#3A75FF` da 4,1:1 y no llega al mínimo para texto de botón; por eso en Señal los botones usan `--primary` `#2E6BE6` (4,8:1) y `#3A75FF` queda como `--accent` para texto grande y detalles.
- **Tailwind v4.** La v1 solo contemplaba `theme.extend` (v3), que además deja viva la paleta por defecto. Ahora se reemplaza (`theme.colors` en v3, `--color-*: initial` en v4).
- **Sin cláusula de marca de cliente:** este kit es para tus proyectos. Para un repo de un cliente con manual de marca propio, no se usa.
