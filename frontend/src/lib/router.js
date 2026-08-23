import { useEffect, useState } from 'react'

export const ROUTES = [
  {
    path: 'overview',
    label: 'Overview',
    title: 'National Development Overview',
    subtitle: 'Consolidated status across all assessed districts',
  },
  {
    path: 'citizen-voice',
    label: 'Citizen Voice',
    title: 'Citizen Voice',
    subtitle: 'Report a development issue — voice or text, analyzed instantly',
  },
  {
    path: 'priorities',
    label: 'Priority Intelligence',
    title: 'Priority Intelligence',
    subtitle: 'Complete district ranking by composite priority score',
  },
  {
    path: 'hotspots',
    label: 'Demand Hotspots',
    title: 'Demand Hotspots',
    subtitle: 'Geographic distribution of citizen demand and urgency',
  },
  {
    path: 'recommendations',
    label: 'Recommendations',
    title: 'Project Recommendations',
    subtitle: 'Actionable investment pipeline from live assessments',
  },
  {
    path: 'citizen-intelligence',
    label: 'Citizen Intelligence',
    title: 'Citizen Intelligence',
    subtitle: 'Multilingual participation and request analytics',
  },
]

function readHash() {
  if (typeof window === 'undefined') return ROUTES[0].path
  const h = window.location.hash.replace(/^#\/?/, '').toLowerCase()
  return ROUTES.some((r) => r.path === h) ? h : ROUTES[0].path
}

export function useHashRoute() {
  const [route, setRoute] = useState(readHash)
  useEffect(() => {
    const onChange = () => setRoute(readHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export function navigateTo(path) {
  window.location.hash = `#/${path}`
}
