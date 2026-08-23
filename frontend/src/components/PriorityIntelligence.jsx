import { categoryColor, formatCompact } from '../lib/meta.js'

const COLUMNS = [
  { key: 'citizen_demand', label: 'Citizen Demand' },
  { key: 'infrastructure_gap', label: 'Infra Gap' },
  { key: 'urgency', label: 'Urgency' },
  { key: 'investment_gap', label: 'Investment Gap' },
]

export default function PriorityIntelligence({ priorities }) {
  const ranked = [...(priorities ?? [])].sort((a, b) => b.priority_score - a.priority_score)

  return (
    <article className="card" aria-label="Priority intelligence rankings">
      <div className="card-head">
        <div>
          <div className="card-title">Ranked Assessment</div>
          <div className="card-sub">Composite priority index across all assessed factors, per district</div>
        </div>
        <span className="section-note">
          {ranked.length} of {ranked.length} regions ranked
        </span>
      </div>
      <div className="table-scroll">
        <table className="pi-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Region</th>
              <th>Priority Score</th>
              {COLUMNS.map((c) => (
                <th key={c.key} className="num">
                  {c.label}
                </th>
              ))}
              <th className="num">Population</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((r, i) => (
              <tr key={`${r.region}-${r.category}`} className={i === 0 ? 'rank-1' : undefined}>
                <td>
                  <span className="rank-badge">{i + 1}</span>
                </td>
                <td>
                  <div className="region-cell">
                    <span className="region-name">{r.region}</span>
                    <span
                      className="chip"
                      style={{
                        '--chip-color': categoryColor(r.category),
                        fontSize: 9.5,
                        padding: '2px 8px',
                        width: 'fit-content',
                      }}
                    >
                      {r.category}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="score-cell">
                    <div className="score-bar">
                      <span style={{ width: `${Math.min(r.priority_score, 100)}%` }} />
                    </div>
                    <span className="score-num">{Number(r.priority_score).toFixed(1)}</span>
                  </div>
                </td>
                {COLUMNS.map((c) => (
                  <td key={c.key} className="num">
                    {r[c.key]}
                  </td>
                ))}
                <td className="num">{formatCompact(r.population)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  )
}
