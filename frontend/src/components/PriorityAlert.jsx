import { MapPin } from 'lucide-react'
import { useCountUp } from '../lib/useCountUp.js'
import { categoryColor, formatCompact } from '../lib/meta.js'

const FACTORS = [
  { key: 'citizen_demand', label: 'Citizen Demand', color: '#38bdf8' },
  { key: 'infrastructure_gap', label: 'Infrastructure Gap', color: '#a78bfa' },
  { key: 'urgency', label: 'Urgency', color: '#e5636f' },
  { key: 'investment_gap', label: 'Investment Gap', color: '#d9a441' },
]

export default function PriorityAlert({ overview, recommendations }) {
  const top = overview?.top_priority
  const score = useCountUp(top?.priority_score ?? 0)
  if (!top) return null

  const rec =
    recommendations.find((r) => r.region === top.region && r.category === top.category) ??
    recommendations[0]

  const R = 40
  const C = 2 * Math.PI * R

  return (
    <section className="section anim-rise" aria-label="Highest priority alert">
      <article className="card alert-card">
        <span className="alert-kicker">
          <span className="alert-beacon" aria-hidden="true" />
          Highest Priority Alert · Directive Focus
        </span>

        <div className="alert-main">
          <h2 className="alert-region">{top.region}</h2>
          <div className="alert-chips">
            <span className="chip" style={{ '--chip-color': categoryColor(top.category) }}>
              {top.category}
            </span>
            <span className="chip neutral">Population {formatCompact(top.population)}</span>
            {rec && <span className="chip neutral">Intervention Ready</span>}
          </div>
          <p className="alert-desc">
            {rec?.reason ??
              `${top.region} records the highest composite priority in the current assessment cycle.`}{' '}
            Immediate inter-departmental review is advised before the next budgeting window.
          </p>
          <span className="alert-coords">
            <MapPin size={13} />
            {top.latitude?.toFixed(4)}° N, {top.longitude?.toFixed(4)}° E
          </span>
        </div>

        <div className="alert-side">
          <div className="score-ring-row">
            <div className="score-ring">
              <svg width="92" height="92" viewBox="0 0 92 92">
                <defs>
                  <linearGradient id="alertRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d9a441" />
                    <stop offset="100%" stopColor="#e5636f" />
                  </linearGradient>
                </defs>
                <circle className="ring-track" cx="46" cy="46" r={R} strokeWidth="7" />
                <circle
                  className="ring-fill"
                  cx="46"
                  cy="46"
                  r={R}
                  strokeWidth="7"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - Math.min(score, 100) / 100)}
                />
              </svg>
              <div className="score-ring-center">
                <div>
                  <div className="score-ring-num">{score.toFixed(1)}</div>
                  <div className="score-ring-cap">Score</div>
                </div>
              </div>
            </div>
            <p className="score-caption">
              Ranked <strong>#1 of {overview?.regions_analyzed ?? '—'} regions</strong> on the composite
              priority index — the state's most acute development gap this cycle.
            </p>
          </div>

          <div className="factor-grid">
            {FACTORS.map((f) => (
              <div key={f.key}>
                <div className="factor-cell-label">
                  <span>{f.label}</span>
                  <span className="factor-cell-value">{top[f.key]}</span>
                </div>
                <div className="meter">
                  <span style={{ width: `${Math.min(top[f.key] ?? 0, 100)}%`, background: f.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  )
}
