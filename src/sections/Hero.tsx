import { ArrowDown, ArrowUpRight, Play } from 'lucide-react'
import { GithubIcon } from '../components/BrandIcons'
import { hero } from '../data/content'
import { site, socialLinks } from '../data/site'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__status" aria-hidden="true" />
            {site.role}
          </p>

          <h1 className="hero__title" id="hero-title">
            {hero.headlineLines.map((line) => (
              // El espacio separa las frases para lectores de pantalla.
              <span key={line}>{line} </span>
            ))}
          </h1>

          <p className="hero__lead">{hero.lead}</p>
          <p className="hero__detail">{hero.detail}</p>

          <div className="hero__actions">
            <a className="button button--primary" href="#proyectos">
              Ver proyectos
              <ArrowDown size={16} strokeWidth={2} aria-hidden="true" />
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

          <a
            className="hero__tertiary"
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Play size={14} strokeWidth={2} aria-hidden="true" />
            Ver contenido en YouTube
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>

        <div className="hero__portrait">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/daniel-salinas-560.webp 560w, /images/daniel-salinas-840.webp 840w, /images/daniel-salinas-1120.webp 1120w"
              sizes="(min-width: 900px) 22rem, min(58vw, 14rem)"
            />
            <img
              className="hero__photo"
              src="/images/daniel-salinas.jpg"
              alt={hero.photoAlt}
              width={840}
              height={840}
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <p className="hero__caption">
            <span className="hero__caption-name">{site.name}</span>
            <span className="hero__caption-brand">{site.brand}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
