import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección visible más cercana al borde superior del
 * viewport, para marcar el estado activo en la navegación.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top)
          } else {
            visible.delete(entry.target.id)
          }
        })

        if (visible.size === 0) return

        const [closest] = [...visible.entries()].sort(
          (a, b) => Math.abs(a[1]) - Math.abs(b[1]),
        )
        if (closest) setActive(closest[0])
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
