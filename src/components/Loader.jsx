import { useEffect, useRef, useState } from 'react'
import { useLoaderAnimation } from '../hooks/useLoaderAnimation'

export default function Loader({ onComplete }) {
  const canvasRef = useRef(null)
  const barRef = useRef(null)
  const [hidden, setHidden] = useState(false)

  useLoaderAnimation(canvasRef, barRef)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    let progress = 0
    const pInterval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 3, 100)
      bar.style.width = progress + '%'
      if (progress >= 100) {
        clearInterval(pInterval)
        setTimeout(() => {
          setHidden(true)
          if (onComplete) onComplete()
        }, 600)
      }
    }, 60)
    return () => clearInterval(pInterval)
  }, [onComplete])

  return (
    <div id="loader" style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.8s ease, visibility 0.8s ease',
      opacity: hidden ? 0 : 1,
      visibility: hidden ? 'hidden' : 'visible',
      pointerEvents: hidden ? 'none' : 'auto'
    }}>
      <canvas ref={canvasRef} width="280" height="280" style={{ width: 280, height: 280 }} />
      <div style={{
        marginTop: 20, textAlign: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.4rem', fontWeight: 700,
        background: 'var(--grad)', WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        letterSpacing: '-0.02em'
      }}>Indigo Data Services</div>
      <div style={{
        marginTop: 6, fontSize: '0.8rem', color: 'var(--muted)',
        letterSpacing: '0.08em', textTransform: 'uppercase'
      }}>Building What's Next</div>
      <div style={{
        width: 180, height: 3, background: '#e5f5f0',
        borderRadius: 2, marginTop: 20, overflow: 'hidden'
      }}>
        <div ref={barRef} style={{
          height: '100%', width: '0%', background: 'var(--grad)',
          borderRadius: 2, transition: 'width 0.05s linear'
        }} />
      </div>
    </div>
  )
}
