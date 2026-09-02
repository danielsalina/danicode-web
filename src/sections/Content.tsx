import { ArrowUpRight } from 'lucide-react'
import { YoutubeIcon } from '../components/BrandIcons'
import { content } from '../data/content'
import { socialLinks } from '../data/site'
import './Content.css'

export function Content() {
  return (
    <section className="section section--divided" id="contenido" aria-labelledby="content-title">
      <div className="container">
        <p className="section__label">{content.title}</p>

        <div className="content__grid">
          <div className="content__main">
            <h2 className="section__title" id="content-title">
              {content.headline}
            </h2>

            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="content__paragraph">
                {paragraph}
              </p>
            ))}

            <a
              className="button button--primary content__cta"
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon size={17} />
              Ver canal de YouTube
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <aside className="content__topics reveal" aria-label="Temas del canal">
            <h3 className="content__topics-title">De qué hablo</h3>
            <ul>
              {content.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
