import { CircleAlert, CircleCheck, ArrowRight, Radio } from 'lucide-react'
import KpiCards from '../components/KpiCards.jsx'
import PriorityAlert from '../components/PriorityAlert.jsx'
import { categoryColor } from '../lib/meta.js'
import { navigateTo } from '../lib/router.js'

function SnapshotRow({ rank, region, category, score }) {
  return (
    <div className="snap-row">
      <span className={`rank-num${rank === 1 ? ' top' : ''}`}>#{rank}</span>
      <div style={{ minWidth: 0 }}>
        <div className="rank-line-1">
          <span className="rank-region">{region}</span>
          <span className="chip" style={{ '--chip-color': categoryColor(category), fontSize: 9.5, padding: '2px 8px' }}>
            {category}
          </span>
        </div>
        <div className="score-track" style={{ width: '100%', marginTop: 6 }}>
          <div className="score-fill" style={{ width: `${Math.min(score, 100)}%` }} />
        </div>
      </div>
      <span className="score-value">{Number(score).toFixed(1)}</span>
    </div>
  )
}

function SystemStatus({ live, loading, updatedAt, data, requestsCount }) {
  const rows = [
    { key: 'Analytics service', value: loading ? 'Connecting…' : live ? 'Operational' : 'Unreachable' },
    {
      key: 'Last sync',
      value: updatedAt ? updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '—',
    },
    { key: 'Districts assessed', value: data?.overview?.regions_analyzed ?? '—' },
    { key: 'Hotspots tracked', value: data?.hotspots?.length ?? '—' },
    { key: 'Active recommendations', value: data?.recommendations?.length ?? '—' },
    { key: 'Citizen requests stored', value: requestsCount },
  ]
  return (
    <div className="card card-pad" aria-label="System status">
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
        <Radio size={16} color="var(--accent)" />
        <div className="card-title">System Status</div>
      </div>
      <p className="card-sub" style={{ marginBottom: 10 }}>
        Live integration with the local analytics engine
      </p>
      <div>
        {rows.map((r) => (
          <div key={r.key} className="sys-row">
            <span className="sys-key">{r.key}</span>
            <span className={`sys-val${r.key === 'Analytics service' ? (live ? ' ok' : ' bad') : ''}`}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <p className="sys-sources">
        <CircleCheck size={13} color="var(--good)" />
        GET /api/dashboard/ · GET /api/analytics/priorities · GET /api/requests/
      </p>
    </div>
  )
}

export default function OverviewPage({ data, overview, recommendations, priorities, requests, live, loading, updatedAt }) {
  const snapshot = [...priorities].sort((a, b) => b.priority_score - a.priority_score).slice(0, 3)

  return (
    <>
      {!live && !loading && (
        <div className="alert-banner" role="status">
          <CircleAlert size={17} />
          Analytics service unreachable. Verify the backend at http://127.0.0.1:8000 and press Sync Data.
        </div>
      )}

      {loading && !data ? (
        <>
          <div className="skeleton-grid">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="skeleton" />
            ))}
          </div>
          <div className="skeleton" style={{ height: 190 }} />
        </>
      ) : (
        data && (
          <>
            <KpiCards overview={overview} />
            <PriorityAlert overview={overview} recommendations={recommendations} />

            <div className="section grid-2">
              <div className="card card-pad anim-rise" aria-label="Priority summary">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                  <div>
                    <div className="card-title">Top Priority Summary</div>
                    <div className="card-sub">Highest-ranked districts this assessment cycle</div>
                  </div>
                  <button type="button" className="btn" onClick={() => navigateTo('priorities')}>
                    Full ranking
                    <ArrowRight size={14} />
                  </button>
                </div>
                <div style={{ marginTop: 8 }}>
                  {snapshot.map((p, i) => (
                    <SnapshotRow key={`${p.region}-${p.category}`} rank={i + 1} {...p} />
                  ))}
                  {!snapshot.length && <p className="section-note">No priority data available yet.</p>}
                </div>
              </div>

              <SystemStatus live={live} loading={loading} updatedAt={updatedAt} data={data} requestsCount={requests.length || '—'} />
            </div>
          </>
        )
      )}
    </>
  )
}
