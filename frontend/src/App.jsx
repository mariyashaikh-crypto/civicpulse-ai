import { useCallback, useEffect, useState } from 'react'
import { fetchDashboard, fetchPriorities, fetchRequests } from './lib/api.js'
import { useHashRoute } from './lib/router.js'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import OverviewPage from './pages/OverviewPage.jsx'
import CitizenVoicePage from './pages/CitizenVoicePage.jsx'
import PrioritiesPage from './pages/PrioritiesPage.jsx'
import HotspotsPage from './pages/HotspotsPage.jsx'
import RecommendationsPage from './pages/RecommendationsPage.jsx'
import CitizenIntelligencePage from './pages/CitizenIntelligencePage.jsx'

export default function App() {
  const route = useHashRoute()
  const [navOpen, setNavOpen] = useState(false)
  const [data, setData] = useState(null)
  const [allPriorities, setAllPriorities] = useState([])
  const [prioritiesFallback, setPrioritiesFallback] = useState(false)
  const [requests, setRequests] = useState([])
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('cp-theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('cp-theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const refresh = useCallback(() => {
    setLoading(true)
    setReloadKey((k) => k + 1)
  }, [])

  useEffect(() => {
    let active = true
    const run = async () => {
      const [dashRes, prioRes, reqRes] = await Promise.allSettled([
        fetchDashboard(),
        fetchPriorities(),
        fetchRequests(),
      ])
      if (!active) return
      if (dashRes.status === 'fulfilled') {
        setData(dashRes.value)
        setLive(true)
      } else {
        setData(null)
        setLive(false)
      }
      if (prioRes.status === 'fulfilled' && Array.isArray(prioRes.value) && prioRes.value.length) {
        setAllPriorities(prioRes.value)
        setPrioritiesFallback(false)
      } else {
        setPrioritiesFallback(true)
      }
      if (reqRes.status === 'fulfilled' && Array.isArray(reqRes.value)) {
        setRequests(reqRes.value)
      } else {
        setRequests([])
      }
      setUpdatedAt(new Date())
      setLoading(false)
    }
    run()
    return () => {
      active = false
    }
  }, [reloadKey])

  const navigate = useCallback((path) => {
    setNavOpen(false)
    window.location.hash = `#/${path}`
  }, [])

  const overview = data?.overview
  const hotspots = data?.hotspots ?? []
  const recommendations = data?.recommendations ?? []
  const priorities =
    !prioritiesFallback && allPriorities.length ? allPriorities : (data?.top_priorities ?? [])

  const common = {
    overview,
    hotspots,
    recommendations,
    requests,
    live,
    loading,
    updatedAt,
    theme,
  }

  const page = (() => {
    switch (route) {
      case 'citizen-voice':
        return <CitizenVoicePage />
      case 'priorities':
        return <PrioritiesPage priorities={priorities} usedFallback={prioritiesFallback && live} />
      case 'hotspots':
        return <HotspotsPage hotspots={hotspots} theme={theme} />
      case 'recommendations':
        return <RecommendationsPage recommendations={recommendations} overview={overview} />
      case 'citizen-intelligence':
        return <CitizenIntelligencePage requests={requests} hotspots={hotspots} />
      default:
        return (
          <OverviewPage
            data={data}
            priorities={priorities}
            {...common}
          />
        )
    }
  })()

  return (
    <div className="app-frame">
      <Sidebar route={route} open={navOpen} onNavigate={navigate} />
      <div className="app-main">
        <Header
          route={route}
          live={live}
          loading={loading}
          updatedAt={updatedAt}
          onRefresh={refresh}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onMenu={() => setNavOpen((o) => !o)}
        />
        <main className="app-content" key={route}>
          {page}
        </main>
        <footer className="footer-note app-footer">
          <span>CivicPulse AI · Government Digital Public Infrastructure Platform</span>
          <span>GET /api/dashboard/ · GET /api/analytics/priorities · GET /api/requests/ · POST /api/requests/</span>
        </footer>
      </div>
    </div>
  )
}
