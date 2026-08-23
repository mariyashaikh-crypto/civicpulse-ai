import { useMemo } from 'react'
import HotspotMonitor from '../components/HotspotMonitor.jsx'
import { categoryColor, formatCompact } from '../lib/meta.js'

function normalizeLanguage(value) {
  const s = String(value ?? '').toLowerCase()
  if (s.startsWith('hi')) return 'Hindi'
  if (s.startsWith('mr')) return 'Marathi'
  if (s.startsWith('en')) return 'English'
  return value ? String(value) : 'Unspecified'
}

function countBy(items, pick) {
  const map = new Map()
  for (const item of items) {
    const key = pick(item) ?? 'Unknown'
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1])
}

function DistributionCard({ title, sub, entries, colorFor }) {
  const max = Math.max(...entries.map(([, c]) => c), 1)
  return (
    <div className="card card-pad anim-rise">
      <div className="card-title">{title}</div>
      <div className="card-sub">{sub}</div>
      <div className="dist-list">
        {entries.map(([key, count]) => (
          <div key={key} className="dist-row">
            <span className="dist-label" title={key}>
              {key}
            </span>
            <div className="dist-track">
              <span style={{ width: `${(count / max) * 100}%`, background: colorFor ? colorFor(key) : 'var(--accent)' }} />
            </div>
            <span className="dist-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CitizenIntelligencePage({ requests, hotspots }) {
  const stats = useMemo(() => {
    const total = requests.length
    const critical = requests.filter((r) => String(r.severity).toLowerCase() === 'critical').length
    const high = requests.filter((r) => String(r.severity).toLowerCase() === 'high').length
    const languages = countBy(requests, (r) => normalizeLanguage(r.language))
    const categories = countBy(requests, (r) => r.category || 'Other')
    const regions = countBy(requests, (r) => r.location || 'Unknown')
    const multilingualShare =
      total > 0
        ? Math.round((requests.filter((r) => normalizeLanguage(r.language) !== 'English').length / total) * 100)
        : 0
    return { total, critical, high, languages, categories, regions, multilingualShare }
  }, [requests])

  const tiles = [
    { label: 'Total Requests Stored', value: stats.total || '—', accent: '#4c8dff' },
    { label: 'Critical Severity', value: stats.critical || '—', accent: '#e5636f' },
    { label: 'High Severity', value: stats.high || '—', accent: '#d9a441' },
    { label: 'Multilingual Share', value: `${stats.multilingualShare}%`, accent: '#2dd4bf' },
  ]

  return (
    <>
      <div className="kpi-grid anim-rise">
        {tiles.map((t) => (
          <article key={t.label} className="card kpi-card" style={{ '--kpi-accent': t.accent }}>
            <div className="kpi-top">
              <span className="kpi-label">{t.label}</span>
              <span className="kpi-icon" style={{ background: 'transparent' }} aria-hidden="true" />
            </div>
            <div className="kpi-value">{t.value}</div>
            <p className="kpi-hint">Derived live from GET /api/requests/</p>
          </article>
        ))}
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="section-title">
            <span className="section-index">A</span>
            Participation Distributions
          </h2>
          <span className="section-note">
            Multilingual participation visible across {stats.total} stored citizen requests
          </span>
        </div>
        <div className="grid-3">
          <DistributionCard
            title="Language Distribution"
            sub="Citizens writing in their own language"
            entries={stats.languages}
          />
          <DistributionCard
            title="Category Distribution"
            sub="What citizens are reporting"
            entries={stats.categories}
            colorFor={(key) => categoryColor(key)}
          />
          <DistributionCard
            title="Regional Distribution"
            sub="Where requests originate"
            entries={stats.regions}
            colorFor={() => 'var(--accent-2)'}
          />
        </div>
      </section>

      {hotspots.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2 className="section-title">
              <span className="section-index">B</span>
              Demand Hotspots Feeding This View
            </h2>
            <span className="section-note">Aggregate demand baseline of {formatCompact(hotspots.reduce((s, h) => s + (h.demand ?? 0), 0))} index points across districts</span>
          </div>
          <HotspotMonitor hotspots={hotspots} compact />
        </section>
      )}
    </>
  )
}
