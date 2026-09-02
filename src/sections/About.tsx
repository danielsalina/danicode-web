import { Blocks, Cloud, Package, Server } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { about, services } from '../data/content'
import type { ServiceIcon } from '../data/content'
import './About.css'

const icons: Record<ServiceIcon, LucideIcon> = {
  server: Server,
  blocks: Blocks,
  package: Package,
  cloud: Cloud,
}

export function About() {
  return (
    <section className="section section--divided" id="sobre-mi" aria-labelledby="about-title">
      <div className="container">
        <p className="section__label">Sobre mí</p>

        <div className="about__grid">
          <h2 className="section__title reveal" id="about-title">
            Software que sale a producción y se queda funcionando
          </h2>

          <div className="about__body">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="about__paragraph reveal">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <h3 className="about__services-title" id="services-title">
          Qué hago
        </h3>
        <ul className="about__services" aria-labelledby="services-title">
          {services.map((service) => {
            const Icon = icons[service.icon]
            return (
              <li key={service.title} className="service-card reveal">
                <Icon className="service-card__icon" size={20} strokeWidth={1.6} aria-hidden="true" />
                <h4 className="service-card__title">{service.title}</h4>
                <p className="service-card__text">{service.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
