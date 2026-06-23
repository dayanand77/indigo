import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useHeroGrid(canvasRef) {
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    let w = parent.clientWidth || window.innerWidth
    let h = parent.clientHeight || 600

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.set(0, 0, 8)

    const palette = [0xffffff, 0x22D3EE, 0x7C3AED, 0xEC4899]

    const count = 60
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const speed = new Float32Array(count)
    const size = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = ((c >> 16) & 0xff) / 255
      col[i * 3 + 1] = ((c >> 8) & 0xff) / 255
      col[i * 3 + 2] = (c & 0xff) / 255
      speed[i] = 0.5 + Math.random() * 0.8
      size[i] = 0.04 + Math.random() * 0.1
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(size, 1))

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    let t = 0
    let running = true

    function animate() {
      if (!running) return
      animRef.current = requestAnimationFrame(animate)
      t += 0.003

      const p = points.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        p[i * 3 + 1] -= speed[i] * 0.006
        if (p[i * 3 + 1] < -7) {
          p[i * 3 + 1] = 7
          p[i * 3] = (Math.random() - 0.5) * 24
          p[i * 3 + 2] = (Math.random() - 0.5) * 12
        }
      }
      points.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      const nw = parent.clientWidth || window.innerWidth
      const nh = parent.clientHeight || 600
      w = nw; h = nh
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [canvasRef])
}
