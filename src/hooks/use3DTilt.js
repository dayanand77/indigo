import { useRef, useCallback } from 'react'

export function use3DTilt(maxTilt = 12) {
  const ref = useRef(null)
  const ticking = useRef(false)

  const onMouseMove = useCallback((e) => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const el = ref.current
      if (!el) { ticking.current = false; return }
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt
      el.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`
      el.style.transition = 'transform 0.08s ease-out'
      ticking.current = false
    })
  }, [maxTilt])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    el.style.transition = 'transform 0.4s ease-out'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
