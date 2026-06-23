import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useHeroAnimation(canvasRef) {
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return
    let w = container.offsetWidth || 480
    let h = 480

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100)
    camera.position.set(0, 0.5, 8)

    function createDashboardTexture() {
      const size = 512
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const ctx = c.getContext('2d')
      const w = size, h = size

      const bg = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w/2)
      bg.addColorStop(0, '#0f0a1a')
      bg.addColorStop(0.5, '#0a1215')
      bg.addColorStop(1, '#080a0f')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(124,58,237,0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < w; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke()
      }

      const colors = ['#00C896', '#7C3AED', '#EC4899', '#22D3EE', '#F59E0B', '#0891B2']
      const barW = 18, gap = 8
      const startX = 40, chartTop = 95, chartH = 110
      for (let i = 0; i < 14; i++) {
        const bh = 25 + Math.random() * 85
        const grad = ctx.createLinearGradient(0, chartTop + chartH - bh, 0, chartTop + chartH)
        const col = colors[i % colors.length]
        grad.addColorStop(0, col)
        grad.addColorStop(1, col + '30')
        ctx.fillStyle = grad
        ctx.shadowColor = col
        ctx.shadowBlur = 8
        ctx.beginPath()
        ctx.roundRect(startX + i * (barW + gap), chartTop + chartH - bh, barW, bh, [4, 4, 0, 0])
        ctx.fill()
      }
      ctx.shadowBlur = 0

      const lineColors = ['#00C896', '#7C3AED', '#F59E0B']
      lineColors.forEach((lc, li) => {
        ctx.strokeStyle = lc
        ctx.lineWidth = 2 - li * 0.3
        ctx.shadowColor = lc
        ctx.shadowBlur = 6
        ctx.beginPath()
        const ly = 250 + li * 30
        const pts = [0, 0.6, 1, 0.3, 2, 0.55, 3, 0.2, 4, 0.65, 5, 0.3, 6, 0.5, 7, 0.15]
        pts.forEach((_, i) => {
          if (i % 2 === 0) {
            const px = 40 + (i/2) * 55, py = ly + 80 - pts[i+1] * 80
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
          }
        })
        ctx.stroke()
        pts.forEach((_, i) => {
          if (i % 2 === 0) {
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = lc
            ctx.shadowBlur = 10
            ctx.beginPath()
            ctx.arc(40 + (i/2) * 55, ly + 80 - pts[i+1] * 80, 3.5 - li * 0.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      })
      ctx.shadowBlur = 0

      const cards = [
        { x: 350, y: 40, w: 155, h: 74, color: '#7C3AED', val: '94%', label: 'UPTIME', valSize: 28, labelY: 60 },
        { x: 350, y: 122, w: 155, h: 74, color: '#EC4899', val: '2.4s', label: 'RESPONSE', valSize: 26, labelY: 154 },
        { x: 40, y: 360, w: 170, h: 100, color: '#00C896', val: '8,432', label: 'ACTIVE USERS', valSize: 30, labelY: 410 },
        { x: 222, y: 360, w: 170, h: 100, color: '#22D3EE', val: '99.7%', label: 'SUCCESS RATE', valSize: 28, labelY: 410 },
        { x: 404, y: 360, w: 100, h: 100, color: '#F59E0B', val: '56', label: 'ALERTS', valSize: 28, labelY: 410 },
      ]
      cards.forEach(c => {
        ctx.fillStyle = 'rgba(255,255,255,0.03)'
        ctx.shadowColor = c.color
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.roundRect(c.x, c.y, c.w, c.h, [8, 8, 8, 8])
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.strokeStyle = c.color + '30'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.roundRect(c.x, c.y, c.w, c.h, [8, 8, 8, 8])
        ctx.stroke()

        ctx.fillStyle = c.color
        ctx.shadowColor = c.color
        ctx.shadowBlur = 15
        ctx.font = `bold ${c.valSize}px Inter, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(c.val, c.x + c.w/2, c.y + 42)
        ctx.shadowBlur = 0
        ctx.fillStyle = 'rgba(255,255,255,0.35)'
        ctx.font = '9px Inter, sans-serif'
        ctx.fillText(c.label, c.x + c.w/2, c.labelY)
      })

      return new THREE.CanvasTexture(c)
    }

    const dashboardTex = createDashboardTexture()
    dashboardTex.needsUpdate = true

    const deviceGroup = new THREE.Group()
    scene.add(deviceGroup)

    const screenMat = new THREE.MeshPhysicalMaterial({
      map: dashboardTex,
      emissive: 0x7C3AED,
      emissiveMap: dashboardTex,
      emissiveIntensity: 0.35,
      metalness: 0.1,
      roughness: 0.2,
    })

    const deviceShells = [
      { color: 0x1a0a2e, metalness: 0.8, roughness: 0.2 }, // purple-tinted dark
      { color: 0x1a0f0a, metalness: 0.7, roughness: 0.3 }, // warm dark
      { color: 0x0a1a1f, metalness: 0.8, roughness: 0.2 }, // teal-tinted dark
    ]

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x7C3AED,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
    })

    // LAPTOP
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: deviceShells[0].color,
      metalness: deviceShells[0].metalness,
      roughness: deviceShells[0].roughness,
      transparent: true,
      opacity: 0.95,
    })

    const laptopScreen = new THREE.Mesh(
      new THREE.BoxGeometry(2.8, 1.9, 0.05),
      screenMat
    )
    laptopScreen.position.set(0, 0.95, 0)
    laptopScreen.rotation.x = -0.15
    deviceGroup.add(laptopScreen)

    const screenGlow = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 2.1, 0.02),
      glowMat.clone()
    )
    screenGlow.position.copy(laptopScreen.position)
    screenGlow.rotation.copy(laptopScreen.rotation)
    deviceGroup.add(screenGlow)

    const bezelMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0512,
      metalness: 0.8,
      roughness: 0.2,
    })
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(3.05, 2.15, 0.015), bezelMat)
    bezel.position.set(0, 0.95, -0.035)
    bezel.rotation.x = -0.15
    deviceGroup.add(bezel)

    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a0a2e,
      metalness: 0.6,
      roughness: 0.4,
    })
    const base = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.06, 2.0), baseMat)
    base.position.set(0, -0.06, 1.0)
    base.rotation.x = -0.15
    deviceGroup.add(base)

    const kbMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0512,
      metalness: 0.3,
      roughness: 0.7,
    })
    const kb = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.02, 1.4), kbMat)
    kb.position.set(0, 0.02, 1.0)
    kb.rotation.x = -0.15
    deviceGroup.add(kb)

    for (let i = 0; i < 30; i++) {
      const key = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.01, 0.08),
        new THREE.MeshBasicMaterial({ color: 0x3a1a4a, transparent: true, opacity: 0.5 })
      )
      const row = Math.floor(i / 10)
      const col = i % 10
      key.position.set(-1.0 + col * 0.22, 0.025, 1.0 - row * 0.22)
      key.rotation.x = -0.15
      deviceGroup.add(key)
    }

    // PHONE
    const phoneGroup = new THREE.Group()
    phoneGroup.position.set(-1.6, -0.5, 1.4)
    phoneGroup.rotation.y = 0.4
    phoneGroup.rotation.z = -0.1
    deviceGroup.add(phoneGroup)

    const phoneShellMat = new THREE.MeshPhysicalMaterial({
      color: deviceShells[1].color,
      metalness: deviceShells[1].metalness,
      roughness: deviceShells[1].roughness,
      transparent: true, opacity: 0.95,
    })
    const phoneBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.62, 0.035),
      phoneShellMat
    )
    phoneGroup.add(phoneBody)

    const phoneScreenMat = new THREE.MeshPhysicalMaterial({
      map: dashboardTex,
      emissive: 0xEC4899,
      emissiveMap: dashboardTex,
      emissiveIntensity: 0.18,
      metalness: 0.1, roughness: 0.2,
    })
    const phoneScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.56, 0.005),
      phoneScreenMat
    )
    phoneScreen.position.z = 0.02
    phoneGroup.add(phoneScreen)

    const phoneGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.64, 0.01),
      new THREE.MeshBasicMaterial({ color: 0xEC4899, transparent: true, opacity: 0.04, side: THREE.BackSide })
    )
    phoneGlow.position.z = 0.02
    phoneGroup.add(phoneGlow)

    // TABLET
    const tabGroup = new THREE.Group()
    tabGroup.position.set(1.8, -0.1, 1.2)
    tabGroup.rotation.y = -0.3
    tabGroup.rotation.z = 0.06
    deviceGroup.add(tabGroup)

    const tabShellMat = new THREE.MeshPhysicalMaterial({
      color: deviceShells[2].color,
      metalness: deviceShells[2].metalness,
      roughness: deviceShells[2].roughness,
      transparent: true, opacity: 0.95,
    })
    const tabBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1.05, 0.04),
      tabShellMat
    )
    tabGroup.add(tabBody)

    const tabScreenMat = new THREE.MeshPhysicalMaterial({
      map: dashboardTex,
      emissive: 0x22D3EE,
      emissiveMap: dashboardTex,
      emissiveIntensity: 0.2,
      metalness: 0.1, roughness: 0.2,
    })
    const tabScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.74, 0.98, 0.005),
      tabScreenMat
    )
    tabScreen.position.z = 0.025
    tabGroup.add(tabScreen)

    const tabGlow = new THREE.Mesh(
      new THREE.BoxGeometry(0.84, 1.1, 0.01),
      new THREE.MeshBasicMaterial({ color: 0x22D3EE, transparent: true, opacity: 0.04, side: THREE.BackSide })
    )
    tabGlow.position.z = 0.025
    tabGroup.add(tabGlow)



    // FLOATING COLORFUL GLOW ORBS
    const orbColors = [0x7C3AED, 0xEC4899, 0x22D3EE, 0xF59E0B, 0x00C896]
    orbColors.forEach((col, i) => {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.15 + Math.random() * 0.15, 12, 12),
        new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.08 })
      )
      const angle = (i / orbColors.length) * Math.PI * 2
      orb.position.set(Math.cos(angle) * 2.2, (Math.random() - 0.5) * 1.2, Math.sin(angle) * 2.2)
      scene.add(orb)
    })

    const starCount = 250
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 28
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 20
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 28
      const col = orbColors[Math.floor(Math.random() * orbColors.length)]
      starColors[i * 3] = ((col >> 16) & 0xff) / 255
      starColors[i * 3 + 1] = ((col >> 8) & 0xff) / 255
      starColors[i * 3 + 2] = (col & 0xff) / 255
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({
      size: 0.035, transparent: true, opacity: 0.3, vertexColors: true,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    const lights = [
      { color: 0x7C3AED, intensity: 1.5, pos: [3, 4, 5] },
      { color: 0xEC4899, intensity: 0.8, pos: [-4, -2, 4] },
      { color: 0x22D3EE, intensity: 0.6, pos: [0, -3, 5] },
      { color: 0xF59E0B, intensity: 0.5, pos: [2, 3, -3] },
    ]
    lights.forEach(l => {
      const light = new THREE.DirectionalLight(l.color, l.intensity)
      light.position.set(l.pos[0], l.pos[1], l.pos[2])
      scene.add(light)
    })
    scene.add(new THREE.AmbientLight(0x404060, 0.3))

    let mx = 0, my = 0
    let targetMx = 0, targetMy = 0
    const onPointer = (cx, cy) => {
      targetMx = (cx / window.innerWidth - 0.5) * 2
      targetMy = -(cy / window.innerHeight - 0.5) * 2
    }
    const onMouseMove = (e) => onPointer(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches.length > 0) onPointer(e.touches[0].clientX, e.touches[0].clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    const ro = new ResizeObserver(() => {
      const nw = container.offsetWidth || 480
      w = nw
      renderer.setSize(nw, h)
      camera.aspect = nw / h
      camera.updateProjectionMatrix()
    })
    ro.observe(container)

    let t = 0
    function animate() {
      animRef.current = requestAnimationFrame(animate)
      t += 0.012

      mx += (targetMx - mx) * 0.25
      my += (targetMy - my) * 0.25

      const autoRotY = Math.sin(t * 0.12) * 0.8
      const autoRotX = Math.sin(t * 0.06) * 0.4
      deviceGroup.rotation.y += (mx * 1.5 + autoRotY - deviceGroup.rotation.y) * 0.06
      deviceGroup.rotation.x += (my * 1.0 + autoRotX - deviceGroup.rotation.x) * 0.06
      deviceGroup.position.y = Math.sin(t * 0.07) * 0.2 + my * 0.2
      deviceGroup.position.x = Math.sin(t * 0.04) * 0.25 + mx * 0.25

      phoneGroup.rotation.y = 0.4 + mx * 0.4 + Math.sin(t * 0.04) * 0.3
      phoneGroup.rotation.z = -0.1 + my * 0.2 + Math.sin(t * 0.035) * 0.12
      tabGroup.rotation.y = -0.3 + mx * 0.35 + Math.sin(t * 0.035) * 0.25
      tabGroup.rotation.z = 0.06 + my * 0.18 + Math.sin(t * 0.03) * 0.1

      laptopScreen.material.emissiveIntensity = 0.35 + Math.sin(t * 0.5) * 0.06
      phoneScreen.material.emissiveIntensity = 0.18 + Math.sin(t * 0.6 + 1) * 0.04
      tabScreen.material.emissiveIntensity = 0.2 + Math.sin(t * 0.55 + 2) * 0.04

      stars.rotation.y = t * 0.005
      stars.rotation.x = Math.sin(t * 0.003) * 0.03

      camera.position.x += (mx * 1.2 - camera.position.x) * 0.1
      camera.position.y += (my * 0.8 - camera.position.y) * 0.1
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      ro.disconnect()
      renderer.dispose()
    }
  }, [canvasRef])
}
