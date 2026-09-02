export const site = {
  name: 'Daniel Salinas',
  brand: 'Dani Code',
  role: 'Software Developer · Backend · SaaS',
  url: 'https://danicode.tech',
  locale: 'es',
  title: 'Daniel Salinas — Software Developer | Dani Code',
  description:
    'Construyo productos SaaS y sistemas backend que funcionan en producción. Proyectos reales, arquitectura, cloud y contenido técnico.',
} as const

export const socialLinks = {
  github: 'https://github.com/danielsalina',
  linkedin: 'https://www.linkedin.com/in/danielsalina',
  youtube: 'https://www.youtube.com/@Dani-Code',
} as const

export type SocialKey = keyof typeof socialLinks

export const socials: ReadonlyArray<{
  key: SocialKey
  label: string
  href: string
}> = [
  { key: 'github', label: 'GitHub', href: socialLinks.github },
  { key: 'linkedin', label: 'LinkedIn', href: socialLinks.linkedin },
  { key: 'youtube', label: 'YouTube', href: socialLinks.youtube },
]

export const navItems: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Stack' },
  { id: 'contenido', label: 'Contenido' },
]
