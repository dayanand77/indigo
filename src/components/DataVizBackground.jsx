import { useRef } from 'react'
import { useDataVizAnimation } from '../hooks/useDataVizAnimation'

export default function DataVizBackground() {
  const canvasRef = useRef(null)
  useDataVizAnimation(canvasRef)

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
      }}
    />
  )
}
