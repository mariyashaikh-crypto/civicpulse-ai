import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { categoryColor } from '../lib/meta.js'

function FitToHotspots({ hotspots }) {
  const map = useMap()
  useEffect(() => {
    if (!hotspots?.length) return
    const bounds = hotspots.map((h) => [h.latitude, h.longitude])
    map.fitBounds(bounds, { padding: [42, 42] })
  }, [hotspots, map])
  return null
}

const TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
}

export default function HotspotMap({ hotspots, theme }) {
  return (
    <article className="card" aria-label="Demand hotspot geographic view">
      <div className="map-frame">
        <MapContainer center={[19.4, 75.5]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            key={theme}
            url={TILES[theme] ?? TILES.dark}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {(hotspots ?? []).map((h) => {
            const color = categoryColor(h.category)
            const radius = 9 + ((Number(h.severity) || 0) / 100) * 15
            return (
              <CircleMarker
                key={`${h.region}-${h.category}`}
                center={[h.latitude, h.longitude]}
                radius={radius}
                pathOptions={{
                  color,
                  weight: 2,
                  fillColor: color,
                  fillOpacity: 0.26 + (Number(h.severity) / 100) * 0.3,
                }}
              >
                <Popup>
                  <div className="popup-region">{h.region}</div>
                  <div className="popup-meta">
                    Category: <b>{h.category}</b>
                    <br />
                    Citizen demand: <b>{h.demand}</b> · Severity: <b>{h.severity}</b>
                    <br />
                    Coordinates: {Number(h.latitude).toFixed(4)}, {Number(h.longitude).toFixed(4)}
                  </div>
                  <div className="sev-bar">
                    <span style={{ width: `${Math.min(h.severity, 100)}%`, background: color }} />
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
          <FitToHotspots hotspots={hotspots} />
        </MapContainer>

        <div className="map-legend">
          <div className="map-legend-row">
            {['Healthcare', 'Water', 'Roads', 'Education', 'Digital Connectivity'].map((c) => (
              <span key={c} className="legend-item" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="legend-swatch" style={{ background: categoryColor(c) }} />
                {c}
              </span>
            ))}
          </div>
          <div className="map-legend-row">
            <span className="size-dots">
              <span className="size-dot" style={{ width: 7, height: 7 }} />
              <span className="size-dot" style={{ width: 11, height: 11 }} />
              <span className="size-dot" style={{ width: 15, height: 15 }} />
            </span>
            marker size = urgency severity
          </div>
        </div>
      </div>
    </article>
  )
}
