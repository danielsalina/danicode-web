import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
import '@fontsource/ibm-plex-sans/latin-ext-400.css'
import '@fontsource/ibm-plex-sans/latin-ext-500.css'
import '@fontsource/ibm-plex-sans/latin-ext-600.css'
import '@fontsource/ibm-plex-sans/latin-ext-700.css'
import '@fontsource/ibm-plex-sans-condensed/latin-700.css'
import '@fontsource/ibm-plex-sans-condensed/latin-ext-700.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontró el elemento #root')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
