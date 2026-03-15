import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { CssBaseline, ThemeProvider } from '@mui/material'

import App from './App.tsx'
import './index.css'
import { theme } from './lib/theme.ts'
import { store } from './store.ts'

// TODO: replace HashRouter with BrowserRouter when deploying to a real server
// (e.g. Vercel, Nginx) that supports SPA routing
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
