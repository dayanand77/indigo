import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useLoaderAnimation(canvasRef, progressRef) {
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(280, 280)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(3.5, 1.8, 5.5)
    camera.lookAt(0, 0.3, 0)

    const group = new THREE.Group()
    scene.add(group)

    const ambient = new THREE.AmbientLight(0x334455, 0.6)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x88ddff, 1.8)
    keyLight.position.set(5, 8, 6)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xcc88ff, 0.6)
    fillLight.position.set(-4, 3, -3)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x00ffcc, 0.8)
    rimLight.position.set(0, -2, -5)
    scene.add(rimLight)

    const layers = [
      { label: 'Database', y: -1.3, color: 0x00C896, emissive: 0x006655, geom: 'cylinder' },
      { label: 'Backend', y: -0.25, color: 0x7C3AED, emissive: 0x3b1a7a, geom: 'box' },
      { label: 'Frontend', y: 0.8, color: 0x06B6D4, emissive: 0x035a6e, geom: 'monitor' },
      { label: 'UI', y: 1.85, color: 0xF59E0B, emissive: 0x7a4f04, geom: 'screen' },
    ]

    const allParts = []

    layers.forEach((l) => {
      if (l.geom === 'cylinder') {
        const discs = 3
        for (let d = 0; d < discs; d++) {
          const g = new THREE.CylinderGeometry(0.6, 0.6, 0.08, 24)
          const m = new THREE.MeshPhysicalMaterial({
            color: d === 1 ? 0x1a2a3a : l.color,
            metalness: 0.7,
            roughness: 0.25,
            transparent: true,
            opacity: 0.9,
            clearcoat: 0.3,
          })
          const mesh = new THREE.Mesh(g, m)
          mesh.position.set(0, l.y + (d - 1) * 0.12, 0)
          group.add(mesh)
          allParts.push(mesh)
        }
        const poleG = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8)
        const poleM = new THREE.MeshPhysicalMaterial({ color: 0x8899aa, metalness: 0.9, roughness: 0.2 })
        for (let side = 0; side < 4; side++) {
          const a = (side / 4) * Math.PI * 2
          const pole = new THREE.Mesh(poleG, poleM)
          pole.position.set(Math.cos(a) * 0.58, l.y, Math.sin(a) * 0.58)
          group.add(pole)
          allParts.push(pole)
        }
      } else if (l.geom === 'box') {
        const g = new THREE.BoxGeometry(0.6, 0.35, 0.5)
        const m = new THREE.MeshPhysicalMaterial({
          color: l.color,
          metalness: 0.6,
          roughness: 0.3,
          transparent: true,
          opacity: 0.92,
          clearcoat: 0.2,
        })
        const mesh = new THREE.Mesh(g, m)
        mesh.position.set(0, l.y, 0)
        group.add(mesh)
        allParts.push(mesh)

        for (let r = 0; r < 3; r++) {
          const ledG = new THREE.SphereGeometry(0.025, 8, 8)
          const ledM = new THREE.MeshBasicMaterial({ color: 0x22ff88 })
          const led = new THREE.Mesh(ledG, ledM)
          led.position.set(-0.2 + r * 0.2, l.y + 0.12, 0.26)
          group.add(led)
          allParts.push(led)
        }
      } else if (l.geom === 'monitor') {
        const screenG = new THREE.BoxGeometry(0.65, 0.35, 0.04)
        const screenM = new THREE.MeshPhysicalMaterial({
          color: 0x0a1628,
          metalness: 0.1,
          roughness: 0.05,
          transparent: true,
          opacity: 0.95,
          emissive: 0x06B6D4,
          emissiveIntensity: 0.08,
        })
        const panel = new THREE.Mesh(screenG, screenM)
        panel.position.set(0, l.y, 0.15)
        group.add(panel)
        allParts.push(panel)

        const bezelG = new THREE.BoxGeometry(0.7, 0.4, 0.04)
        const bezelM = new THREE.MeshPhysicalMaterial({
          color: 0x1a2a3a, metalness: 0.5, roughness: 0.4, transparent: true, opacity: 0.9,
        })
        const bezel = new THREE.Mesh(bezelG, bezelM)
        bezel.position.set(0, l.y, 0.18)
        group.add(bezel)
        allParts.push(bezel)

        const standG = new THREE.BoxGeometry(0.08, 0.12, 0.04)
        const standM = new THREE.MeshPhysicalMaterial({ color: 0x445566, metalness: 0.7, roughness: 0.3 })
        const stand = new THREE.Mesh(standG, standM)
        stand.position.set(0, l.y - 0.24, 0.15)
        group.add(stand)
        allParts.push(stand)

        const baseG = new THREE.BoxGeometry(0.18, 0.03, 0.12)
        const base = new THREE.Mesh(baseG, standM)
        base.position.set(0, l.y - 0.32, 0.12)
        group.add(base)
        allParts.push(base)

        const glowStrip = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.005, 0.001),
          new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.3 })
        )
        glowStrip.position.set(0, l.y + 0.16, 0.18)
        group.add(glowStrip)
        allParts.push(glowStrip)
      } else if (l.geom === 'screen') {
        const g = new THREE.BoxGeometry(0.72, 0.04, 0.52)
        const m = new THREE.MeshPhysicalMaterial({
          color: l.color,
          metalness: 0.4,
          roughness: 0.15,
          transparent: true,
          opacity: 0.88,
          clearcoat: 0.5,
          emissive: l.emissive,
          emissiveIntensity: 0.2,
        })
        const mesh = new THREE.Mesh(g, m)
        mesh.position.set(0, l.y, 0)
        group.add(mesh)
        allParts.push(mesh)

        const rimG = new THREE.EdgesGeometry(g)
        const rimM = new THREE.LineBasicMaterial({ color: l.color, transparent: true, opacity: 0.3 })
        const rim = new THREE.LineSegments(rimG, rimM)
        rim.position.copy(mesh.position)
        group.add(rim)
        allParts.push(rim)
      }

      const layerMat = new THREE.MeshPhysicalMaterial({
        color: l.color, transparent: true, opacity: 0.03, metalness: 0.5, roughness: 0.3,
      })
      let spreadGeo
      if (l.geom === 'cylinder') spreadGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.02, 24)
      else spreadGeo = new THREE.BoxGeometry(0.9, 0.02, 0.8)
      const spread = new THREE.Mesh(spreadGeo, layerMat)
      spread.position.set(0, l.y - (l.geom === 'cylinder' ? 0.22 : 0.2), 0)
      group.add(spread)
      allParts.push(spread)
    })

    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x00C896, emissive: 0x00C896, emissiveIntensity: 0.6,
      metalness: 0.3, roughness: 0.2, transparent: true, opacity: 0.15,
    })
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.4, 8), coreMat)
    core.position.set(0, 0.3, 0)
    group.add(core)
    allParts.push(core)

    const dataParticles = []
    for (let i = 0; i < 10; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.8 })
      )
      const offset = (i / 10) * 3.15
      sphere.position.set((Math.random() - 0.5) * 0.25, offset - 1.3, (Math.random() - 0.5) * 0.25)
      group.add(sphere)
      dataParticles.push({
        mesh: sphere, offset,
        speed: 0.01 + Math.random() * 0.008,
        driftX: (Math.random() - 0.5) * 0.004,
        driftZ: (Math.random() - 0.5) * 0.004,
      })
    }

    let t = 0, converge = false, convergeT = 0
    document.body.style.overflow = 'hidden'

    function animate() {
      if (!document.getElementById('loader')) return
      animRef.current = requestAnimationFrame(animate)
      t += 0.016

      if (!converge) {
        group.rotation.y = t * 0.12

        dataParticles.forEach((p) => {
          p.offset += p.speed
          if (p.offset > 3.15) p.offset = 0
          p.mesh.position.y = p.offset - 1.3
          p.mesh.position.x += p.driftX
          p.mesh.position.z += p.driftZ
          if (Math.abs(p.mesh.position.x) > 0.2) p.driftX *= -1
          if (Math.abs(p.mesh.position.z) > 0.2) p.driftZ *= -1
          const dist = layers.reduce((min, l) => Math.min(min, Math.abs(p.mesh.position.y - l.y)), Infinity)
          p.mesh.material.opacity = dist < 0.2 ? 0.1 : 0.9
        })

        core.material.emissiveIntensity = 0.4 + Math.sin(t * 1.1) * 0.2
      } else {
        convergeT += 0.04
        group.scale.setScalar(1 - convergeT * 0.08)
        allParts.forEach((p) => {
          if (p.material && p.material.opacity !== undefined) {
            p.material.opacity = Math.max(0, (p.material.opacity || 1) - 0.025)
          }
        })
        if (convergeT > 2) {
          document.body.style.overflow = ''
        }
      }
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      document.body.style.overflow = ''
      renderer.dispose()
    }
  }, [canvasRef])
}
