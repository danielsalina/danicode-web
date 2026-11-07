# Instrucciones para agentes

<!-- SI EL REPO YA TIENE UN AGENTS.md, PEGA DESDE AQUI HASTA EL FINAL COMO UNA SECCION MAS -->

## Identidad UI (obligatorio en cualquier cambio visual)

TEMA: SENAL

Antes de crear o modificar cualquier componente, vista, estilo o clase CSS, lee `docs/IDENTIDAD_UI.md`. Es la fuente de verdad del diseño y tiene prioridad sobre tus preferencias por defecto, sobre ejemplos de documentación de librerías y sobre lo que haya en el código viejo.

Reglas que más se rompen (detalle completo en el documento):

1. Colores solo por token: `var(--surface)`, `bg-surface`, `text-muted`. Ningún `#hex`, `rgb()` ni `hsl()` fuera de `src/styles/tokens.css`. Ninguna clase de la paleta por defecto de Tailwind (`bg-blue-500`, `text-gray-400`, `border-slate-200`…).
2. Nada de oro, dorado, amarillo ni ámbar. Advertencias en `--warn` (naranja).
3. Tipografía: IBM Plex Sans para la interfaz, IBM Plex Mono para datos técnicos. Nunca Inter, Geist, Roboto ni las demás de la lista.
4. Sin degradados, texto con degradado, `backdrop-blur`, glow ni sombras grandes. Superficies separadas con bordes de 1 px. Sombra solo `--shadow-overlay` en menús, popovers y modales.
5. Radios de 2, 4 o 6 px. Nada de `rounded-xl` o mayor (salvo `rounded-full` en avatares y toggles).
6. Movimiento: `var(--ease)` y duraciones 120/200/320 ms. Sin rebote, sin spring, sin escala de entrada.
7. Cada elemento interactivo con hover, active, `:focus-visible` y disabled. Cada vista con datos con carga, vacío, error y éxito. Etiquetas de formulario visibles.
8. Sin emojis como íconos. Una sola librería de íconos de línea, la que ya use el proyecto.

## Flujo de trabajo

- Al terminar cualquier cambio de UI, corre `node scripts/check-identidad.mjs`. La tarea no está terminada hasta que da `OK`.
- Si necesitas una excepción real (por ejemplo, el color oficial de un logo de terceros), agrega `identidad-ok: <motivo>` en esa línea y menciónala en tu resumen final.
- Nunca edites, desactives ni saltes `scripts/check-identidad.mjs`, `.githooks/pre-commit` ni `.claude/settings.json` para que el chequeo pase. Si una regla te bloquea sin sentido, detente y explícame el caso.
- No cambies el TEMA, no agregues dependencias de UI, animación, íconos o fuentes, y no toques lógica de negocio en tareas de estilo sin preguntarme.
- Si el TEMA está vacío o no coincide con el producto, pregúntame antes de escribir estilos.
