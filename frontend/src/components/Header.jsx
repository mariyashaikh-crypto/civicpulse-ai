import { RefreshCw, Sun, Moon, Menu } from 'lucide-react'
import { ROUTES } from '../lib/router.js'

export default function Header({ route, live, loading, updatedAt, onRefresh, theme, onToggleTheme, onMenu }) {
  const meta = ROUTES.find((r) => r.path === route) ?? ROUTES[0]
  return (
    <div className="app-topbar">
      <button
        type="button"
        className="btn icon-only menu-btn"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu size={17} />
      </button>
      <div className="topbar-titles">
        <h1 className="topbar-title">{meta.title}</h1>
        <p className="topbar-subtitle">
          {meta.subtitle}
          {updatedAt && !loading && (
            <>
              {' '}
              · synced{' '}
              {updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </>
          )}
        </p>
      </div>
      <div className="topbar-spacer" />
      <div className="topbar-actions">
        <span className="status-pill" title={live ? 'Connected to the analytics service' : 'Analytics service unreachable'}>
          <span className={`status-dot ${live ? 'online' : 'offline'}`} style={live ? undefined : { color: 'var(--bad)' }} />
          {loading ? 'Connecting…' : live ? 'System Online' : 'System Offline'}
        </span>
        <button
          type="button"
          className="btn icon-only"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button type="button" className={`btn primary${loading ? ' spin' : ''}`} onClick={onRefresh} disabled={loading}>
          <RefreshCw size={14} strokeWidth={2.4} className="icon-spin" />
          Sync Data
        </button>
      </div>
    </div>
  )
}
