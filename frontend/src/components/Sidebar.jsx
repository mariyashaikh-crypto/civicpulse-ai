import { Activity, Gauge, Mic, ListOrdered, MapPinned, Building2, Users, ShieldCheck } from 'lucide-react'
import { ROUTES } from '../lib/router.js'

const ICONS = {
  overview: Gauge,
  'citizen-voice': Mic,
  priorities: ListOrdered,
  hotspots: MapPinned,
  recommendations: Building2,
  'citizen-intelligence': Users,
}

export default function Sidebar({ route, open, onNavigate }) {
  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={() => onNavigate(route)} aria-hidden="true" />}
      <nav className={`sidebar${open ? ' is-open' : ''}`} aria-label="Primary">
        <div className="side-brand">
          <span className="brand-mark" aria-hidden="true">
            <Activity size={20} strokeWidth={2.6} />
          </span>
          <div>
            <div className="brand-name" style={{ fontSize: 16.5 }}>
              CivicPulse <em>AI</em>
            </div>
            <div className="brand-tagline">Development Intelligence</div>
          </div>
        </div>

        <div className="side-nav">
          {ROUTES.map((r, i) => {
            const Icon = ICONS[r.path] ?? Gauge
            const active = route === r.path
            return (
              <button
                key={r.path}
                type="button"
                className={`nav-item${active ? ' active' : ''}`}
                onClick={() => onNavigate(r.path)}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={17} strokeWidth={2.1} />
                <span>{r.label}</span>
                <span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>

        <div className="side-foot">
          <span className="status-pill" style={{ justifyContent: 'center' }}>
            <ShieldCheck size={13} color="var(--accent-2)" />
            Gov DSS · DPI Platform
          </span>
          <span style={{ textAlign: 'center' }}>Local analytics engine · no external services</span>
        </div>
      </nav>
    </>
  )
}
