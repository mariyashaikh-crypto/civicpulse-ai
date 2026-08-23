import HotspotMap from '../components/HotspotMap.jsx'
import HotspotMonitor from '../components/HotspotMonitor.jsx'

export default function HotspotsPage({ hotspots, theme }) {
  return hotspots.length ? (
    <div className="grid-hotspots hotspots-page anim-rise">
      <HotspotMap hotspots={hotspots} theme={theme} />
      <HotspotMonitor hotspots={hotspots} showCoords />
    </div>
  ) : (
    <div className="state-panel card">
      <h2>No hotspot data available</h2>
      <p>Sync data once the analytics service is reachable.</p>
    </div>
  )
}
