import type { ComponentType } from 'react'
import { socials } from '../data/site'
import type { SocialKey } from '../data/site'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from './BrandIcons'

const icons: Record<SocialKey, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
}

interface SocialLinksProps {
  /** `icon` muestra solo el icono; `labelled` acompaña con el nombre de la red. */
  variant?: 'icon' | 'labelled'
  className?: string
}

export function SocialLinks({ variant = 'icon', className }: SocialLinksProps) {
  return (
    <ul className={['social-links', `social-links--${variant}`, className].filter(Boolean).join(' ')}>
      {socials.map(({ key, label, href }) => {
        const Icon = icons[key]
        return (
          <li key={key}>
            <a
              className="social-links__item"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={variant === 'icon' ? `${label} (se abre en una pestaña nueva)` : undefined}
            >
              <Icon size={17} />
              {variant === 'labelled' && <span>{label}</span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
