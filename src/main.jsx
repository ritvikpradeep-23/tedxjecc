import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import TicketScannerApp from './scanner/TicketScannerApp.jsx'
import TicketView from './ticket/TicketView.jsx'

const path = window.location.pathname

function pickRoute() {
  // The scanner is a deliberately standalone site — own route, own layout,
  // doesn't share chrome with the admin dashboard or public site — but
  // still gated by the same admin login.
  if (path.startsWith('/ticket-scanner')) return <TicketScannerApp />
  if (path.startsWith('/admin')) return <AdminApp />
  if (path.startsWith('/ticket/')) return <TicketView uuid={path.split('/')[2]} />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {pickRoute()}
  </StrictMode>,
)
