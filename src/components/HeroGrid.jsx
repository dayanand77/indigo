import { useRef } from 'react'
import { useHeroGrid } from '../hooks/useHeroGrid'

export default function HeroGrid() {
  const canvasRef = useRef(null)
  useHeroGrid(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
