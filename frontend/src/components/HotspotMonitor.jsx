import { categoryColor, severityTone } from '../lib/meta.js'

export default function HotspotMonitor({ hotspots, showCoords = false, compact = false }) {
  const ranked = [...(hotspots ?? [])].sort((a, b) => b.severity - a.severity)

  return (
    <aside className="card monitor-card" aria-label="Hotspot severity monitor">
      <div className="card-head">
        <div>
          <div className="card-title">Hotspot Monitor</div>
          <div className="card-sub">All assessed districts, ordered by urgency severity</div>
        </div>
      </div>
      <div className="monitor-list" style={compact ? { maxHeight: 430, overflowY: 'auto' } : undefined}>
        {ranked.map((h, i) => {
          const tone = severityTone(h.severity)
          const hasCoords = h.latitude != null && h.longitude != null
          return (
            <div
              key={`${h.region}-${h.category}`}
              className={`monitor-row${i === 0 ? ' is-top' : ''}`}
              title={`${tone.label} severity`}
            >
              <span className="monitor-rank">{String(i + 1).padStart(2, '0')}</span>
              <div style={{ minWidth: 0 }}>
                <div className="monitor-name">{h.region}</div>
                <span
                  className="chip"
                  style={{
                    '--chip-color': categoryColor(h.category),
                    fontSize: 9.5,
                    padding: '2px 8px',
                    marginTop: 3,
                  }}
                >
                  {h.category}
                </span>
                {showCoords && (
                  <div className="monitor-coords">
                    {hasCoords
                      ? `${Number(h.latitude).toFixed(4)}°, ${Number(h.longitude).toFixed(4)}°`
                      : 'coordinates unavailable'}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="monitor-val">{h.demand}</div>
                <div className="monitor-cap">Demand</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="monitor-val" style={{ color: tone.color }}>
                  {h.severity}
                </div>
                <div className="monitor-cap" style={{ color: i === 0 || h.severity >= 85 ? tone.color : undefined }}>
                  {tone.label}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
