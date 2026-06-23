import { useRef } from 'react'
import { useHeroAnimation } from '../hooks/useHeroAnimation'
import HeroGrid from './HeroGrid'
export default function Hero() {
  const canvasRef = useRef(null)
  useHeroAnimation(canvasRef)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={{
      minHeight: '100vh', paddingTop: 68,
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #f5f0ff 0%, #fff 35%, #E8F7F2 65%, #D0F0E8 100%)'
    }}>
      <HeroGrid />
      <div style={{
        position: 'absolute', borderRadius: '50%',
        filter: 'blur(80px)', opacity: 0.3, pointerEvents: 'none',
        width: 600, height: 600,
        background: 'radial-gradient(circle, #7C3AED, transparent 70%)',
        top: -200, right: -80
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%',
        filter: 'blur(80px)', opacity: 0.25, pointerEvents: 'none',
        width: 400, height: 400,
        background: 'radial-gradient(circle, #EC4899, transparent 70%)',
        bottom: -80, left: -60
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%',
        filter: 'blur(60px)', opacity: 0.2, pointerEvents: 'none',
        width: 300, height: 300,
        background: 'radial-gradient(circle, #00C896, transparent 70%)',
        top: '40%', left: '40%'
      }} />
      <div className="hero-inner" style={{
        maxWidth: 1160, margin: '0 auto', padding: '80px 60px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 60, alignItems: 'center', width: '100%'
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg,rgba(124,58,237,0.08),rgba(0,200,150,0.08))',
            border: '1px solid rgba(124,58,237,0.2)',
            color: 'var(--purple)', padding: '6px 14px',
            borderRadius: 100, fontSize: '0.78rem',
            fontWeight: 600, letterSpacing: '0.05em',
            textTransform: 'uppercase', marginBottom: 24
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--purple)',
              animation: 'blink 2s infinite'
            }} />
            Now Accepting Projects — 2025
          </div>
          <h1 className="hero-title" style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800, lineHeight: 1.1,
            letterSpacing: '-0.03em', marginBottom: 20,
            color: 'var(--text)'
          }}>
            We Build Software<br />That{' '}
            <span className="grad-text" style={{
              background: 'linear-gradient(135deg, #00C896, #22D3EE, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Powers Your<br />Growth</span>
          </h1>
          <p className="hero-desc" style={{
            fontSize: '1.05rem', color: 'var(--text2)',
            lineHeight: 1.75, marginBottom: 36, maxWidth: 480
          }}>
            From enterprise ERP systems to stunning web & mobile apps — Indigo Data Services crafts digital products that solve real problems and scale with your ambitions.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52 }}>
            <button className="btn-primary" onClick={() => scrollTo('contact')} style={{
              padding: '15px 32px', borderRadius: 12,
              fontSize: '0.95rem', fontWeight: 600,
              border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}>Start Your Project →</button>
            <button className="btn-outline" onClick={() => scrollTo('portfolio')} style={{
              background: 'transparent', color: 'var(--purple)',
              padding: '15px 32px', borderRadius: 12,
              fontSize: '0.95rem', fontWeight: 600,
              border: '2px solid rgba(124,58,237,0.3)',
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              transition: 'border-color 0.2s, background 0.2s'
            }}>See Our Work</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex' }}>
              {[
                { initials: 'SM', bg: 'linear-gradient(135deg,#00C896,#0891B2)' },
                { initials: 'LR', bg: 'linear-gradient(135deg,#7C3AED,#EC4899)' },
                { initials: 'DK', bg: 'linear-gradient(135deg,#22D3EE,#00C896)' },
                { initials: 'VG', bg: 'linear-gradient(135deg,#F59E0B,#EC4899)' },
              ].map((a, i) => (
                <span key={i} style={{
                  width: 38, height: 38, borderRadius: '50%',
                  border: '3px solid #fff', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, color: '#fff',
                  marginLeft: i === 0 ? 0 : -10,
                  background: a.bg
                }}>{a.initials}</span>
              ))}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>
              <strong style={{ color: 'var(--text)', fontWeight: 600 }}>30+ clients</strong> trust us to build their software
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} id="hero-canvas" style={{ width: '100%', maxWidth: 480, height: 480 }} />
        </div>
      </div>
    </section>
  )
}
