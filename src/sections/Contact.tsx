import { ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { contact } from '../data/content'
import { socialLinks } from '../data/site'
import './Contact.css'

export function Contact() {
  return (
    <section className="section section--divided" id="contacto" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__card">
          <h2 className="contact__title" id="contact-title">
            {contact.headline}
          </h2>
          <p className="contact__lead">{contact.lead}</p>

          <div className="contact__actions">
            <a
              className="button button--primary"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon size={16} />
              Escribirme por LinkedIn
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              className="button button--secondary"
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
