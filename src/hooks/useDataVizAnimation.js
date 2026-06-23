import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useDataVizAnimation(canvasRef) {
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
    camera.position.set(0, 3.5, 7)
    camera.lookAt(0, 1.2, 0)

    const grid = new THREE.GridHelper(7, 10, 0x00C896, 0x0891B2)
    grid.position.y = -0.05
    grid.material.transparent = true
    grid.material.opacity = 0.12
    scene.add(grid)

    const barData = [
      { val: 50, color: 0x00C896, emissive: 0x00C896, x: -1.5, label: '50+' },
      { val: 30, color: 0x7C3AED, emissive: 0x7C3AED, x: -0.5, label: '30+' },
      { val: 5, color: 0x22D3EE, emissive: 0x22D3EE, x: 0.5, label: '5+' },
      { val: 98, color: 0xF59E0B, emissive: 0xF59E0B, x: 1.5, label: '98%' },
    ]
    const maxVal = 100
    const maxHeight = 3.5

    const bars = []
    barData.forEach((d, i) => {
      const targetH = (d.val / maxVal) * maxHeight
      const geo = new THREE.BoxGeometry(0.55, 0.1, 0.55)
      const mat = new THREE.MeshPhysicalMaterial({
        color: d.color,
        emissive: d.emissive,
        emissiveIntensity: 0.3,
        metalness: 0.2,
        roughness: 0.3,
        transparent: true,
        opacity: 0.85,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(d.x, 0, 0)
      scene.add(mesh)

      const edgeGeo = new THREE.EdgesGeometry(geo)
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0xffffff, transparent: true, opacity: 0.08,
      })
      const edge = new THREE.LineSegments(edgeGeo, edgeMat)
      edge.position.copy(mesh.position)
      scene.add(edge)

      const topGeo = new THREE.BoxGeometry(0.62, 0.04, 0.62)
      const topMat = new THREE.MeshBasicMaterial({
        color: d.color, transparent: true, opacity: 0.15,
      })
      const top = new THREE.Mesh(topGeo, topMat)
      top.position.set(d.x, 0, 0)
      scene.add(top)

      bars.push({
        mesh, edge, top,
        targetH, x: d.x,
        currentH: 0, phase: i * 0.3,
        color: d.color, label: d.label,
      })
    })

    const pointsGeo = new THREE.BufferGeometry()
    const pCount = 80
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 8
      pPos[i * 3 + 1] = Math.random() * 4.5
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({
      color: 0x00C896, size: 0.04, transparent: true, opacity: 0.2,
    })
    const points = new THREE.Points(pointsGeo, pMat)
    scene.add(points)

    const connectMat = new THREE.LineBasicMaterial({
      color: 0x7C3AED, transparent: true, opacity: 0.04,
    })
    const connPoints = [
      new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(-0.5, 0, 0),
      new THREE.Vector3(-0.5, 0, 0), new THREE.Vector3(0.5, 0, 0),
      new THREE.Vector3(0.5, 0, 0), new THREE.Vector3(1.5, 0, 0),
    ]
    const connGeo = new THREE.BufferGeometry().setFromPoints(connPoints)
    const connLine = new THREE.LineSegments(connGeo, connectMat)
    scene.add(connLine)

    let mx = 0, my = 0, targetMx = 0, targetMy = 0
    const onMouseMove = (e) => {
      targetMx = (e.clientX / window.innerWidth - 0.5) * 2
      targetMy = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const ro = new ResizeObserver(() => {
      const nw = parent.offsetWidth || window.innerWidth
      const nh = parent.offsetHeight || 400
      w = nw; h = nh
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    })
    ro.observe(parent)

    let t = 0
    function animate() {
      animRef.current = requestAnimationFrame(animate)
      t += 0.016

      mx += (targetMx - mx) * 0.06
      my += (targetMy - my) * 0.06

      bars.forEach((b, i) => {
        const delay = 1 + i * 0.6
        const raw = Math.max(0, Math.min((t - delay) * 0.15, 1))
        const ease = 1 - Math.pow(1 - raw, 3)
        const h = b.targetH * ease
        b.currentH = h

        b.mesh.scale.y = h / 0.1
        b.mesh.position.y = h / 2
        b.edge.scale.y = h / 0.1
        b.edge.position.y = h / 2
        b.top.position.y = h

        const pulse = 1 + Math.sin(t * 1.2 + b.phase) * 0.04
        b.top.scale.setScalar(pulse)
        b.top.material.opacity = 0.08 + Math.sin(t * 1.5 + b.phase) * 0.04
      })

      points.rotation.y = t * 0.02 + mx * 0.05

      camera.position.x += (mx * 0.5 - (camera.position.x - 0)) * 0.03
      camera.position.y += (my * 0.3 - (camera.position.y - 3.5)) * 0.03
      camera.lookAt(0, 1.2, 0)

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
