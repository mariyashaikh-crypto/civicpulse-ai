import { useEffect, useState } from 'react'

export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const end = Number(target) || 0
    if (!Number.isFinite(end)) {
      const id = requestAnimationFrame(() => setValue(0))
      return () => cancelAnimationFrame(id)
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const id = requestAnimationFrame(() => setValue(end))
      return () => cancelAnimationFrame(id)
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(end * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return value
}
