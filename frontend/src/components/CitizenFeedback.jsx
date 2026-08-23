import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Mic,
  Square,
  SendHorizontal,
  Languages,
  MapPin,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react'
import { submitCitizenRequest } from '../lib/api.js'
import { categoryColor, formatCompact } from '../lib/meta.js'

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी — Hindi' },
  { value: 'mr', label: 'मराठी — Marathi' },
]

const SPEECH_LOCALES = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' }
const LANGUAGE_NAMES = { en: 'English', hi: 'Hindi', mr: 'Marathi' }

const REGIONS = [
  'Nagpur',
  'Pune',
  'Nashik',
  'Aurangabad',
  'Amravati',
  'Kolhapur',
  'Solapur',
  'Thane',
  'Satara',
  'Akola',
]

const SEVERITY_COLORS = {
  Critical: '#e5636f',
  High: '#d9a441',
  Medium: '#4c8dff',
  Moderate: '#4c8dff',
  Low: '#3ecf8e',
}

function getSpeechRecognition() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

function MicStatus({ listening, speechError, supported }) {
  if (!supported) return null
  return (
    <div
      className={`voice-status${listening ? ' is-listening' : speechError ? ' has-error' : ''}`}
      role="status"
      aria-live="polite"
    >
      {listening ? (
        <>
          <span className="pulse-dot" aria-hidden="true" />
          Listening… speak naturally. Tap stop when done.
        </>
      ) : speechError ? (
        <TriangleAlert size={14} color="var(--warn)" />
      ) : null}
      <span>{listening ? '' : speechError || 'Tap the microphone and speak — your words appear in the box for editing.'}</span>
    </div>
  )
}

function ResultPanel({ result }) {
  const analysis = result?.analysis ?? {}
  const context = result?.regional_context ?? null
  const severityColor = SEVERITY_COLORS[analysis.severity] ?? '#4c8dff'

  return (
    <div className="result-panel" role="region" aria-label="Request analysis result">
      <div className="result-head">
        <CircleCheck size={19} color="var(--good)" />
        <span className="result-title">Request analyzed{result?.request_id != null ? ` · Ref #${result.request_id}` : ''}</span>
        {result?.message && <span className="section-note">{result.message}</span>}
      </div>

      <div className="result-chips">
        {analysis.category && (
          <span className="chip" style={{ '--chip-color': categoryColor(analysis.category) }}>
            {analysis.category}
          </span>
        )}
        {analysis.severity && (
          <span className="chip" style={{ '--chip-color': severityColor }}>
            Severity: {analysis.severity}
          </span>
        )}
        {analysis.language && (
          <span className="chip neutral">
            <Languages size={12} />
            Detected: {LANGUAGE_NAMES[analysis.language] ?? analysis.language}
          </span>
        )}
      </div>

      {context && (
        <>
          <p className="result-context">
            <MapPin size={13} />
            Regional context for <b>{context.region}</b> · {context.category}
            {context.citizen_demand_baseline != null && (
              <> · demand baseline {context.citizen_demand_baseline}</>
            )}
          </p>
          <div className="result-stats">
            {context.priority_score != null && (
              <div className="stat-tile" style={{ '--tile-accent': '#d9a441' }}>
                <div className="stat-value">{Number(context.priority_score).toFixed(1)}</div>
                <div className="stat-label">Priority Score</div>
              </div>
            )}
            {context.population != null && (
              <div className="stat-tile" style={{ '--tile-accent': '#4c8dff' }}>
                <div className="stat-value">{formatCompact(context.population)}</div>
                <div className="stat-label">Regional Population</div>
              </div>
            )}
            {context.infrastructure_gap != null && (
              <div className="stat-tile" style={{ '--tile-accent': '#a78bfa' }}>
                <div className="stat-value">{context.infrastructure_gap}</div>
                <div className="stat-label">Infrastructure Gap</div>
              </div>
            )}
            {context.investment_gap != null && (
              <div className="stat-tile" style={{ '--tile-accent': '#2dd4bf' }}>
                <div className="stat-value">{context.investment_gap}</div>
                <div className="stat-label">Investment Gap</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default function CitizenFeedback({ onSynced }) {
  const [language, setLanguage] = useState('en')
  const [location, setLocation] = useState('Pune')
  const [message, setMessage] = useState('')
  const [listening, setListening] = useState(false)
  const [interim, setInterim] = useState('')
  const [speechError, setSpeechError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [result, setResult] = useState(null)
  const [supported] = useState(() => Boolean(getSpeechRecognition()))

  const recognitionRef = useRef(null)
  const baseMessageRef = useRef('')

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current
    if (rec) {
      try {
        rec.onend = null
        rec.stop()
      } catch {
        /* already stopped */
      }
      recognitionRef.current = null
    }
    setListening(false)
    setInterim('')
  }, [])

  useEffect(() => () => stopListening(), [stopListening])

  const startListening = () => {
    const SRClass = getSpeechRecognition()
    if (!SRClass) return
    setSpeechError(null)
    try {
      const rec = new SRClass()
      rec.lang = SPEECH_LOCALES[language] ?? 'en-IN'
      rec.interimResults = true
      rec.continuous = true
      rec.maxAlternatives = 1
      baseMessageRef.current = message.trim()

      let finals = ''
      rec.onresult = (event) => {
        let interimLocal = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i]
          if (res.isFinal) finals += `${res[0].transcript.trim()} `
          else interimLocal += res[0].transcript
        }
        const combined = `${baseMessageRef.current ? `${baseMessageRef.current} ` : ''}${finals}`
        setMessage(combined.replace(/\s+/g, ' ').trim())
        setInterim(interimLocal.trim())
      }
      rec.onerror = (event) => {
        const messages = {
          'not-allowed':
            'Microphone access denied. Allow mic permission in your browser settings, then try again.',
          'service-not-allowed':
            'Speech recognition blocked by browser policy. Check site permissions.',
          'audio-capture': 'No microphone found on this device.',
          'no-speech': 'No speech detected. Please try again.',
          network: 'Network interruption during voice recognition. Try again.',
        }
        const msg = messages[event.error]
        if (msg) setSpeechError(msg)
      }
      rec.onend = () => {
        recognitionRef.current = null
        setInterim('')
        setListening(false)
      }

      recognitionRef.current = rec
      rec.start()
      setListening(true)
    } catch {
      setSpeechError('Voice input could not start on this device.')
      setListening(false)
    }
  }

  const toggleListening = () => {
    if (listening) stopListening()
    else startListening()
  }

  const changeLanguage = (value) => {
    if (listening) stopListening()
    setLanguage(value)
  }

  const handleSubmit = async () => {
    const trimmed = message.trim()
    if (!trimmed) {
      setFormError('Please enter or dictate your issue before submitting.')
      return
    }
    if (!location) {
      setFormError('Please select your region.')
      return
    }
    setSubmitting(true)
    setFormError(null)
    setResult(null)
    try {
      const data = await submitCitizenRequest({ message: trimmed, language, location })
      setResult(data)
      setMessage('')
      if (typeof onSynced === 'function') onSynced()
    } catch (err) {
      const detail =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        (err?.response
          ? `Service responded with status ${err.response.status}.`
          : err?.message ?? 'Submission failed. Please retry.')
      setFormError(String(detail))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card feedback-wrap anim-rise">
      <div className="feedback-grid">
        <div className="feedback-main">
          <label className="field-label" htmlFor="cf-message">
            Describe the development issue
          </label>
          {!supported && (
            <div className="notice-box warn">
              <TriangleAlert size={15} />
              Voice input needs a browser with Web Speech support (e.g. Chrome or Edge). You can still
              type your message below.
            </div>
          )}
          <div className="input-shell">
            <textarea
              id="cf-message"
              className={`feedback-textarea${listening ? ' is-listening' : ''}`}
              placeholder="e.g. Irregular water supply in our ward for two weeks; roads damaged near the school…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={2000}
              rows={6}
            />
            <button
              type="button"
              className={`mic-btn${listening ? ' is-listening' : ''}`}
              onClick={toggleListening}
              disabled={!supported || submitting}
              aria-pressed={listening}
              title={
                !supported
                  ? 'Voice input not supported in this browser'
                  : listening
                    ? 'Stop listening'
                    : `Start voice input (${SPEECH_LOCALES[language]})`
              }
            >
              {listening ? <Square size={18} strokeWidth={2.4} /> : <Mic size={21} strokeWidth={2.2} />}
            </button>
          </div>
          <MicStatus listening={listening} speechError={speechError} supported={supported} />
          {interim && (
            <div className="interim-line" aria-live="polite">
              <span>Hearing</span> {interim}
            </div>
          )}
          {formError && (
            <div className="form-error" role="alert">
              <TriangleAlert size={14} />
              {formError}
            </div>
          )}
        </div>

        <aside className="side-stack">
          <div>
            <label className="field-label" htmlFor="cf-language">
              Language
            </label>
            <select
              id="cf-language"
              className="select-field"
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              disabled={submitting}
            >
              {LANGUAGES.map((l) => (
                <option key={l.value} value={l.value}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="cf-region">
              Region / District
            </label>
            <select
              id="cf-region"
              className="select-field"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={submitting}
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <button type="button" className="submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? (
              <>
                <span className="spinner spinner-sm" aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              <>
                <SendHorizontal size={16} strokeWidth={2.3} />
                Submit request
              </>
            )}
          </button>
          <p className="privacy-note">
            Routed to the district analytics engine for automatic categorization, severity and priority
            scoring.
          </p>
        </aside>
      </div>

      {result && <ResultPanel result={result} />}
    </div>
  )
}
