import { useMemo } from 'react'
import PriorityIntelligence from '../components/PriorityIntelligence.jsx'

export default function PrioritiesPage({ priorities, usedFallback }) {
  const ranked = useMemo(
    () => [...priorities].sort((a, b) => b.priority_score - a.priority_score),
    [priorities]
  )

  return (
    <>
      {usedFallback && (
        <div className="alert-banner" role="status">
          Detailed analytics endpoint unavailable — showing the priority set from the dashboard feed.
        </div>
      )}
      {ranked.length ? (
        <div className="anim-rise">
          <PriorityIntelligence priorities={ranked} />
          <p className="table-footnote">
            Showing all {ranked.length} assessed regions · composite weighting computed server-side from
            citizen demand, infrastructure gap, urgency, investment gap and population impact.
          </p>
        </div>
      ) : (
        <div className="state-panel card">
          <h2>No ranking data available</h2>
          <p>Sync data once the analytics service is reachable.</p>
        </div>
      )}
    </>
  )
}
