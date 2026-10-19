import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fraunces/latin-400.css'
import '@fontsource/fraunces/latin-ext-400.css'
import '@fontsource/fraunces/latin-500.css'
import '@fontsource/fraunces/latin-ext-500.css'
import '@fontsource/fraunces/latin-400-italic.css'
import '@fontsource/fraunces/latin-ext-400-italic.css'
import '@fontsource/fraunces/latin-600.css'
import '@fontsource/fraunces/latin-ext-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-ext-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/ibm-plex-mono/latin-ext-500.css'
import './index.css'
import { LocaleProvider } from './i18n/locale.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
