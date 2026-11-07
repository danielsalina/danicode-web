# Instrucciones para Copilot

Este repositorio tiene reglas de diseño obligatorias en `docs/IDENTIDAD_UI.md` y en la sección "Identidad UI" de `AGENTS.md`. Léelas antes de generar o modificar cualquier componente, estilo o clase CSS.

Resumen para sugerencias en línea:
- Colores solo por token (`var(--surface)`, `bg-surface`, `text-muted`). Nunca hex sueltos ni la paleta por defecto de Tailwind (`bg-blue-500`, `text-gray-400`).
- Nada amarillo, dorado ni ámbar. Advertencias con `--warn`.
- IBM Plex Sans e IBM Plex Mono. Nunca Inter, Geist ni Roboto.
- Sin degradados, blur, glow ni sombras grandes. Radios de 2, 4 o 6 px.
- Transiciones con `var(--ease)` y 120/200/320 ms. Sin rebote ni spring.
- Estados completos: hover, active, focus-visible, disabled; carga, vacío, error y éxito.
- Sin emojis como íconos.

Al terminar un cambio de UI, el chequeo es `node scripts/check-identidad.mjs`.
