export const CATEGORY_META = {
  Healthcare: { color: '#fb7185' },
  Water: { color: '#38bdf8' },
  Roads: { color: '#fbbf24' },
  Education: { color: '#a78bfa' },
  'Digital Connectivity': { color: '#34d399' },
}

const FALLBACK_COLORS = ['#60a5fa', '#f472b6', '#2dd4bf', '#c084fc']

export function categoryColor(category) {
  return (
    CATEGORY_META[category]?.color ??
    FALLBACK_COLORS[
      Math.abs(
        String(category)
          .split('')
          .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
      ) % FALLBACK_COLORS.length
    ]
  )
}

const TONES = [
  { min: 85, label: 'Critical', className: 'tone-critical', color: '#e5636f' },
  { min: 70, label: 'High', className: 'tone-high', color: '#d9a441' },
  { min: 50, label: 'Moderate', className: 'tone-moderate', color: '#4c8dff' },
]

export function severityTone(score) {
  const s = Number(score) || 0
  return (
    TONES.find((t) => s >= t.min) ?? { label: 'Watch', className: 'tone-watch', color: '#3ecf8e' }
  )
}

export function formatNumber(value) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  return new Intl.NumberFormat('en-IN').format(Math.round(Number(value)))
}

export function formatCompact(value) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value))
}
