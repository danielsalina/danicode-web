import { stackGroups } from '../data/content'
import './Stack.css'

export function Stack() {
  return (
    <section className="section section--divided" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <p className="section__label">Stack</p>
        <h2 className="section__title" id="stack-title">
          Las herramientas con las que trabajo
        </h2>
        <p className="section__intro">
          No es una lista de todo lo que toqué alguna vez: es lo que uso para construir y sostener
          los productos de arriba.
        </p>

        <div className="stack__grid">
          {stackGroups.map((group) => (
            <section className="stack__group reveal" key={group.title}>
              <h3 className="stack__group-title">{group.title}</h3>
              <ul className="stack__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
