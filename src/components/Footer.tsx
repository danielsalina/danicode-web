import { site } from '../data/site'
import { SocialLinks } from './SocialLinks'
import './Footer.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__identity">
          <span className="footer__name">{site.name}</span>
          <span className="footer__brand">{site.brand}</span>
        </p>

        <SocialLinks />

        <p className="footer__copy">© {year} Daniel Salinas</p>
      </div>
    </footer>
  )
}
