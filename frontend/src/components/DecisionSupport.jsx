import { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCountUp } from '../lib/useCountUp.js'
import { categoryColor, formatCompact } from '../lib/meta.js'

const FACTORS = [
  { key: 'citizen_demand', label: 'Citizen Demand', color: '#38bdf8' },
  { key: 'infrastructure_gap', label: 'Infrastructure Gap', color: '#a78bfa' },
  { key: 'population_impact', label: 'Population Impact', color: '#3ecf8e' },
  { key: 'urgency', label: 'Urgency', color: '#e5636f' },
  { key: 'investment_gap', label: 'Investment Gap', color: '#d9a441' },
]

function FlowArrow() {
  return (
    <div className="flow-arrow" aria-hidden="true">
      <span className="flow-line" />
      <ChevronDown size={15} className="flow-chevron" />
    </div>
  )
}

export default function DecisionSupport({ overview, recommendations }) {
  const top = overview?.top_priority
  const score = useCountUp(top?.priority_score ?? 0)
  if (!top) return null

  const rec =
    recommendations.find((r) => r.region === top.region && r.category === top.category) ??
    recommendations[0]

  const R = 48
  const C = 2 * Math.PI * R
  const fmt = (v) => (Number.isInteger(v) ? String(v) : (Math.round(v * 10) / 10).toFixed(1))

  return (
    <article className="card flow-card anim-rise" aria-label="Policy decision support model">
      <div className="flow-factors">
        {FACTORS.map((f, i) => (
          <Fragment key={f.key}>
            {i > 0 && <span className="flow-plus">+</span>}
            <div className="factor-node" style={{ '--factor-color': f.color }}>
              <div className="factor-value">{fmt(Number(top[f.key]) || 0)}</div>
              <div className="factor-label">{f.label}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <FlowArrow />

      <div className="score-node">
        <div className="gauge-wrap">
          <svg width="108" height="108" viewBox="0 0 108 108">
            <defs>
              <linearGradient id="flowGauge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4c8dff" />
                <stop offset="100%" stopColor="#d9a441" />
              </linearGradient>
            </defs>
            <circle className="gauge-track" cx="54" cy="54" r={R} strokeWidth="8" />
            <circle
              className="gauge-fill"
              cx="54"
              cy="54"
              r={R}
              strokeWidth="8"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - Math.min(score, 100) / 100)}
            />
          </svg>
          <div className="gauge-center">
            <div style={{ textAlign: 'center' }}>
              <div className="gauge-num">{score.toFixed(1)}</div>
              <div className="gauge-cap">of 100</div>
            </div>
          </div>
        </div>
        <div className="score-node-copy">
          <span className="overline-sm">Priority Score</span>
          <p>
            The composite index blends all five signals into one comparable measure.{' '}
            <b style={{ color: 'var(--text)' }}>
              {top.region} scores {Number(top.priority_score).toFixed(1)}
            </b>{' '}
            — the highest among {overview?.regions_analyzed ?? 'all'} assessed regions this cycle.
          </p>
        </div>
      </div>

      <FlowArrow />

      <div className="rec-node">
        <span className="rec-kicker">Development Recommendation</span>
        <h3 className="rec-title">{rec?.recommended_project ?? `${top.category} intervention`}</h3>
        <div className="rec-meta">
          <span className="region-name">{top.region}</span>
          <span className="chip" style={{ '--chip-color': categoryColor(top.category) }}>
            {top.category}
          </span>
          <span className="chip neutral">
            Reach {formatCompact(rec?.affected_population ?? top.population)}
          </span>
        </div>
        <p className="rec-reason">{rec?.reason ?? 'Derived directly from the highest composite priority.'}</p>
      </div>

      <p className="flow-footnote">
        Composite weighting is computed server-side from live district assessments — every figure above is
        drawn from the current API response.
      </p>
    </article>
  )
}
