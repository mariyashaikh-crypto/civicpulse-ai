import { HeartPulse, Droplets, Route, GraduationCap, Wifi, Building2 } from 'lucide-react'
import { categoryColor, formatCompact } from '../lib/meta.js'

const CATEGORY_ICONS = {
  Healthcare: HeartPulse,
  Water: Droplets,
  Roads: Route,
  Education: GraduationCap,
  'Digital Connectivity': Wifi,
}

export default function RecommendedProjects({ recommendations }) {
  const ranked = [...(recommendations ?? [])].sort((a, b) => b.priority_score - a.priority_score)

  return (
    <div className="proj-grid anim-rise">
      {ranked.map((rec, i) => {
        const color = categoryColor(rec.category)
        const Icon = CATEGORY_ICONS[rec.category] ?? Building2
        return (
          <article key={`${rec.region}-${rec.category}`} className="card proj-card" style={{ '--proj-accent': color }}>
            <span className="proj-rank">#{i + 1}</span>
            <span className="proj-icon">
              <Icon size={19} strokeWidth={2.1} />
            </span>
            <h3 className="proj-name">{rec.recommended_project}</h3>
            <div className="proj-region-row">
              <span className="region-name">{rec.region}</span>
              <span className="chip" style={{ '--chip-color': color, fontSize: 9.5, padding: '2px 8px' }}>
                {rec.category}
              </span>
            </div>
            <p className="proj-reason">{rec.reason}</p>
            <div className="proj-stats">
              <div>
                <div className="proj-stat-label">Infra Gap</div>
                <div className="proj-stat-value">{rec.infrastructure_gap}</div>
              </div>
              <div>
                <div className="proj-stat-label">Urgency</div>
                <div className="proj-stat-value">{rec.urgency}</div>
              </div>
              <div>
                <div className="proj-stat-label">Invest Gap</div>
                <div className="proj-stat-value">{rec.investment_gap}</div>
              </div>
            </div>
            <div className="proj-foot">
              <span>
                Affected&nbsp;
                <b style={{ color: 'var(--text)' }}>{formatCompact(rec.affected_population)}</b>
              </span>
              <span>
                Priority&nbsp;<span className="proj-score">{Number(rec.priority_score).toFixed(1)}</span>
              </span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
