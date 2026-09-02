import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { useReveal } from './hooks/useReveal'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Content } from './sections/Content'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Stack } from './sections/Stack'

export default function App() {
  const mainRef = useReveal<HTMLElement>()

  return (
    <>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal" ref={mainRef}>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Content />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
