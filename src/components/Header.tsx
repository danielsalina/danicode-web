import { useEffect, useId, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navItems, socialLinks } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { SocialLinks } from './SocialLinks'
import './Header.css'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="header__inner container">
          <a className="header__brand" href="#inicio" onClick={() => setOpen(false)}>
            <span className="header__brand-mark" aria-hidden="true">
              DC
            </span>
            <span className="header__brand-text">Dani Code</span>
          </a>

          <nav className="header__nav" aria-label="Navegación principal">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className={`header__nav-link${active === item.id ? ' is-active' : ''}`}
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <SocialLinks className="header__socials" />
            <a
              className="button button--primary button--small header__cta"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="header__toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div id={menuId} className="mobile-menu" hidden={!open}>
        <nav className="container" aria-label="Navegación móvil">
          <ul className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className="mobile-menu__link"
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="button button--primary mobile-menu__cta"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Hablemos
            <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
          <SocialLinks variant="labelled" className="mobile-menu__socials" />
        </nav>
      </div>
    </>
  )
}
