import { useRef } from 'react'
import { useParticles } from '../hooks/useParticles'

export default function ParticleBackground({ style }) {
  const ref = useRef(null)
  useParticles(ref)
  return (
    <canvas ref={ref} style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
      ...style
    }} />
  )
}
