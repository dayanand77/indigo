import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useTestimonial3D(canvasRef) {
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return
    let w = parent.offsetWidth || window.innerWidth
    let h = parent.offsetHeight || 200

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(0, 0, 6)

    const group = new THREE.Group()
    scene.add(group)

    const colors = [0x00C896, 0x7C3AED, 0xEC4899, 0x22D3EE, 0xF59E0B]
    const shapes = []
    for (let i = 0; i < 6; i++) {
      const geos = [
        new THREE.TetrahedronGeometry(0.3, 0),
        new THREE.OctahedronGeometry(0.28, 0),
        new THREE.IcosahedronGeometry(0.25, 0),
        new THREE.TorusGeometry(0.2, 0.07, 8, 12),
      ]
      const geo = geos[i % geos.length]
      const mat = new THREE.MeshPhysicalMaterial({
        color: colors[i % colors.length],
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.3,
        transparent: true,
        opacity: 0.25,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const angle = (i / 6) * Math.PI * 2
      const r = 1.8 + Math.random() * 0.4
      mesh.position.set(Math.cos(angle) * r, Math.sin(angle * 0.7) * 0.6, Math.sin(angle) * r * 0.4)
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      group.add(mesh)
      shapes.push({ mesh, speed: 0.005 + Math.random() * 0.005, rotSpeed: (Math.random() - 0.5) * 0.03 })
    }

    const centerGeo = new THREE.RingGeometry(0.6, 0.65, 40)
    const centerMat = new THREE.MeshBasicMaterial({
      color: 0x00C896, transparent: true, opacity: 0.06, side: THREE.DoubleSide,
    })
    const center = new THREE.Mesh(centerGeo, centerMat)
    group.add(center)

    const pCount = 60
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 8
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x00C896, size: 0.03, transparent: true, opacity: 0.1,
    })
    const stars = new THREE.Points(pGeo, pMat)
    scene.add(stars)

    let mx = 0, my = 0, targetMx = 0, targetMy = 0
    const onMouseMove = (e) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2
      targetMy = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const ro = new ResizeObserver(() => {
      const nw = parent.offsetWidth || window.innerWidth
      const nh = parent.offsetHeight || 200
      w = nw; h = nh
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    })
    ro.observe(parent)

    let t = 0
    function animate() {
      animRef.current = requestAnimationFrame(animate)
      t += 0.012

      mx += (targetMx - mx) * 0.06
      my += (targetMy - my) * 0.06

      group.rotation.y = t * 0.04 + mx * 0.15
      group.rotation.x = Math.sin(t * 0.03) * 0.05 + my * 0.1
      group.position.y = Math.sin(t * 0.06) * 0.04

      shapes.forEach(s => {
        s.mesh.rotation.x += s.rotSpeed
        s.mesh.rotation.y += s.rotSpeed * 0.7
      })

      stars.rotation.y = t * 0.005
      stars.rotation.x = Math.sin(t * 0.003) * 0.02

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      renderer.dispose()
    }
  }, [canvasRef])
}
