import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useParticles(canvasRef) {
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    let w = parent.offsetWidth || window.innerWidth
    let h = parent.offsetHeight || 400

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
    camera.position.z = 25

    const count = 300
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      sizes[i] = 0.05 + Math.random() * 0.15
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.PointsMaterial({
      color: 0x00C896,
      size: 0.12,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    let t = 0
    function animate() {
      animRef.current = requestAnimationFrame(animate)
      t += 0.003
      particles.rotation.y = t * 0.08
      particles.rotation.x = Math.sin(t * 0.03) * 0.05
      const pos = particles.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(t + i) * 0.001
      }
      particles.geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    const ro = new ResizeObserver(() => {
      const nw = parent.offsetWidth || window.innerWidth
      const nh = parent.offsetHeight || 400
      w = nw; h = nh
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    })
    ro.observe(parent)

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
      renderer.dispose()
    }
  }, [canvasRef])
}
