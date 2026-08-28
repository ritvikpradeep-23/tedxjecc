import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import ScannerApp from './admin/ScannerApp.jsx'
import TicketView from './ticket/TicketView.jsx'

const path = window.location.pathname

function pickRoute() {
  // Order matters — /admin/scanner is a prefix match of /admin, so it must
  // be checked first or it'll always fall through to AdminApp.
  if (path.startsWith('/admin/scanner')) return <ScannerApp />
  if (path.startsWith('/admin')) return <AdminApp />
  if (path.startsWith('/ticket/')) return <TicketView uuid={path.split('/')[2]} />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {pickRoute()}
  </StrictMode>,
)
