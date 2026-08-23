import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/shell.css'
import './styles/views.css'
import './styles/alert.css'
import './styles/hotspots.css'
import './styles/rankings.css'
import './styles/flow.css'
import './styles/feedback.css'
import './styles/responsive.css'
import './styles/rankings.css'
import './styles/hotspots.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
