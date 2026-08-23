import { Users, Inbox, Layers, TriangleAlert } from 'lucide-react'
import { useCountUp } from '../lib/useCountUp.js'
import { formatCompact, formatNumber } from '../lib/meta.js'

function AnimatedValue({ value, fmt }) {
  const v = useCountUp(value)
  if (value == null || Number.isNaN(Number(value))) return '—'
  return fmt ? fmt(v) : String(Math.round(v))
}

export default function KpiCards({ overview }) {
  const cards = [
    {
      key: 'population',
      Icon: Users,
      label: 'Population Analyzed',
      value: overview?.total_population,
      fmt: (v) => formatCompact(v),
      hint: `${formatNumber(overview?.total_population)} residents across assessed districts`,
      color: '#4c8dff',
    },
    {
      key: 'requests',
      Icon: Inbox,
      label: 'Citizen Requests',
      value: overview?.total_requests_estimate,
      fmt: (v) => formatCompact(v),
      hint: 'Estimated grievances & service signals',
      color: '#2dd4bf',
    },
    {
      key: 'regions',
      Icon: Layers,
      label: 'Regions Analyzed',
      value: overview?.regions_analyzed,
      hint: 'Districts under continuous assessment',
      color: '#a78bfa',
    },
    {
      key: 'critical',
      Icon: TriangleAlert,
      label: 'Critical Regions',
      value: overview?.critical_regions,
      hint: 'Above the intervention threshold',
      color: '#e5636f',
    },
  ]

  return (
    <div className="kpi-grid anim-rise">
      {cards.map(({ key, Icon, label, value, fmt, hint, color }) => (
        <article key={key} className="card kpi-card" style={{ '--kpi-accent': color }}>
          <div className="kpi-top">
            <span className="kpi-label">{label}</span>
            <span className="kpi-icon">
              <Icon size={16} strokeWidth={2.2} />
            </span>
          </div>
          <div className="kpi-value">
            <AnimatedValue value={value} fmt={fmt} />
          </div>
          <p className="kpi-hint">{hint}</p>
        </article>
      ))}
    </div>
  )
}
