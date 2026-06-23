const testimonials = [
  { stars: '★★★★★', quote: '"Indigo built our ERP from scratch and delivered ahead of schedule. Our factory operations are now 40% more efficient — it genuinely transformed how we run the business."', initials: 'SM', name: 'Suresh Mehta', co: 'MD, Mehta Industries Pvt. Ltd.', bg: 'var(--grad)' },
  { stars: '★★★★★', quote: '"The FreshMart platform handles thousands of orders daily without a hiccup. Their team is responsive, skilled, and genuinely invested in our success long after launch."', initials: 'LR', name: 'Lakshmi Rao', co: 'Founder, FreshMart Online', bg: 'var(--grad3)' },
  { stars: '★★★★★', quote: '"Best tech partner we\'ve worked with. They understood our clinic\'s needs perfectly and delivered a system our staff actually enjoys using every day."', initials: 'DK', name: 'Dr. Deepak Kamath', co: 'Director, Kamath Clinics', bg: 'linear-gradient(135deg,#06D6A0,#0891B2)' },
  { stars: '★★★★★', quote: '"We came in with just an idea. They turned it into a fully working product in 3 months. Code quality, design, support — everything was outstanding."', initials: 'VG', name: 'Vikram Gupta', co: 'CEO, RetailEdge Solutions', bg: 'linear-gradient(135deg,#00976E,#06D6A0)' },
  { stars: '★★★★★', quote: '"Fast, transparent, and technically brilliant. The BI dashboard they built in 6 weeks now drives our entire growth strategy. Can\'t imagine operating without it."', initials: 'AN', name: 'Ananya Nath', co: 'COO, SprintRetail Chain', bg: 'var(--grad)' },
]

import { useRef } from 'react'
import { useTestimonial3D } from '../hooks/useTestimonial3D'

export default function Testimonials() {
  const canvasRef = useRef(null)
  useTestimonial3D(canvasRef)

  return (
    <section className="sec" id="testimonials" style={{ background: 'var(--bg)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 180, zIndex: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', opacity: 0.5 }} />
      </div>
      <div className="sec-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="centered">
          <div className="eyebrow">Client Love</div>
          <h2 className="sec-title">What Our Clients Say</h2>
          <p className="sec-desc">Words from the people we've had the privilege of building for.</p>
        </div>
      </div>
      <div className="testi-runner" style={{ marginTop: 56 }}>
        <div className="testi-track" style={{
          display: 'flex', gap: 22, width: 'max-content',
          animation: 'slide 32s linear infinite'
        }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="testi-card" style={{
              width: 340, flexShrink: 0,
              background: 'var(--glass)',
              backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20, padding: '28px 26px',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ color: '#F59E0B', fontSize: '0.85rem', letterSpacing: 2, marginBottom: 14 }}>{t.stars}</div>
              <div style={{ color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.72, marginBottom: 22, fontStyle: 'italic' }}>{t.quote}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', fontWeight: 700, color: '#fff',
                  background: t.bg
                }}>{t.initials}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.co}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
