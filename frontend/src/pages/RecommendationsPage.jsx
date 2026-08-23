import RecommendedProjects from '../components/RecommendedProjects.jsx'
import DecisionSupport from '../components/DecisionSupport.jsx'
import { formatCompact } from '../lib/meta.js'

export default function RecommendationsPage({ recommendations, overview }) {
  const totalReach = recommendations.reduce((s, r) => s + (Number(r.affected_population) || 0), 0)
  const avgScore = recommendations.length
    ? recommendations.reduce((s, r) => s + (Number(r.priority_score) || 0), 0) / recommendations.length
    : 0

  const strip = [
    { label: 'Projects in pipeline', value: recommendations.length || '—' },
    { label: 'Combined reach', value: recommendations.length ? formatCompact(totalReach) : '—' },
    { label: 'Avg priority score', value: recommendations.length ? avgScore.toFixed(1) : '—' },
    {
      label: 'Top region',
      value: overview?.top_priority?.region ?? (recommendations[0]?.region ?? '—'),
    },
  ]

  return recommendations.length ? (
    <>
      <div className="pipeline-strip anim-rise">
        {strip.map((s) => (
          <div key={s.label} className="stat-tile" style={{ '--tile-accent': 'var(--accent)' }}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <RecommendedProjects recommendations={recommendations} />

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">
            <span className="section-index">M</span>
            Scoring Methodology
          </h2>
          <span className="section-note">How raw signals become a development recommendation</span>
        </div>
        <DecisionSupport overview={overview} recommendations={recommendations} />
      </section>
    </>
  ) : (
    <div className="state-panel card">
      <h2>No recommendations available</h2>
      <p>Sync data once the analytics service is reachable.</p>
    </div>
  )
}
