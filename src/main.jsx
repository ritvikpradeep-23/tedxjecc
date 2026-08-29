import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './admin/AdminApp.jsx'
import ScannerPage from './checkin/ScannerPage.jsx'
import DashboardPage from './checkin/DashboardPage.jsx'
import TicketView from './ticket/TicketView.jsx'

const path = window.location.pathname

function pickRoute() {
  // Two deliberately separate, purpose-built pages for check-in — the
  // scanner (phone, at the door) does nothing but scan; the dashboard
  // (laptop, monitoring) does nothing but show live status. Neither shares
  // layout with the admin dashboard or public site, both share its login.
  if (path.startsWith('/ticket-scanner')) return <ScannerPage />
  if (path.startsWith('/check-in-dashboard')) return <DashboardPage />
  if (path.startsWith('/admin')) return <AdminApp />
  if (path.startsWith('/ticket/')) return <TicketView uuid={path.split('/')[2]} />
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {pickRoute()}
  </StrictMode>,
)
