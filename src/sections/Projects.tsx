import { ArrowUpRight, Check } from 'lucide-react'
import { projects } from '../data/projects'
import './Projects.css'

export function Projects() {
  return (
    <section className="section section--divided" id="proyectos" aria-labelledby="projects-title">
      <div className="container">
        <p className="section__label">Proyectos</p>
        <h2 className="section__title" id="projects-title">
          Productos reales, funcionando en producción
        </h2>
        <p className="section__intro">
          No son demos ni ejercicios. Son plataformas multi-tenant con usuarios, permisos, base de
          datos y deploy propio. Podés entrar y verlas.
        </p>

        <ul className="projects__list">
          {projects.map((project) => (
            <li key={project.id} className="project reveal">
              <article className="project__card">
                <header className="project__header">
                  <div>
                    <p className="project__kind">{project.kind}</p>
                    <h3 className="project__name">{project.name}</h3>
                  </div>
                  <p className="project__status">
                    <span className="project__status-dot" aria-hidden="true" />
                    En producción
                  </p>
                </header>

                <div className="project__body">
                  <div className="project__column">
                    <p className="project__problem">{project.problem}</p>
                    <p className="project__description">{project.description}</p>
                    <p className="project__audience">
                      <span className="project__audience-label">Para</span>
                      {project.audience}
                    </p>
                  </div>

                  <div className="project__column">
                    <h4 className="project__subtitle">Qué incluye</h4>
                    <ul className="project__capabilities">
                      {project.capabilities.map((capability) => (
                        <li key={capability}>
                          <Check size={14} strokeWidth={2.25} aria-hidden="true" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <footer className="project__footer">
                  <ul className="project__tech" aria-label={`Tecnologías de ${project.name}`}>
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <a
                    className="button button--secondary button--small project__link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver producto
                    <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
                    <span className="visually-hidden">{`— ${project.name}, se abre en una pestaña nueva`}</span>
                  </a>
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
