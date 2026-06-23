const steps = [
  { num: '1', title: 'Discovery & Planning', desc: 'We deep-dive into your goals, audience, and constraints — then design a technical roadmap before writing a single line of code.' },
  { num: '2', title: 'Design & Prototype', desc: 'Interactive Figma prototypes let you see and feel the product before it\'s built — saving time and ensuring alignment.' },
  { num: '3', title: 'Agile Development', desc: '2-week sprints with demo calls, real-time progress updates, and your feedback baked into every cycle.' },
  { num: '4', title: 'Launch & Support', desc: 'We handle deployment, performance tuning, and stay on as your long-term technical partner post-launch.' },
]

import ParticleBackground from './ParticleBackground'

export default function Process() {
  const grads = [
    'linear-gradient(135deg, #00C896, #0891B2)',
    'linear-gradient(135deg, #7C3AED, #EC4899)',
    'linear-gradient(135deg, #22D3EE, #00C896)',
    'linear-gradient(135deg, #F59E0B, #EC4899)',
  ]

  return (
    <section className="sec" id="process" style={{ background: 'linear-gradient(160deg, #f0faf7 0%, #f5f0ff 100%)', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <div className="sec-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(124,58,237,.05),transparent 70%)', top: -60, right: -40 }} />
      <div className="sec-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="centered">
          <div className="eyebrow">How We Work</div>
          <h2 className="sec-title sec-title-gradient">From Idea to Launch —<br />A Clear, Proven Path</h2>
          <p className="sec-desc">No surprises, no delays. A transparent process that keeps you in control at every step.</p>
        </div>
        <div className="process-steps" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, marginTop: 60
        }}>
          {steps.map((s, i) => (
            <div key={i} className="proc-step" style={{
              textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 16px'
            }}>
              <div className="proc-num" style={{
                width: 64, height: 64, borderRadius: '50%',
                background: '#fff', border: '3px solid transparent',
                backgroundClip: 'padding-box',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '1.3rem', fontWeight: 800,
                boxShadow: '0 8px 32px rgba(124,58,237,0.12)'
              }}>
                <span style={{
                  background: grads[i], WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>{s.num}</span>
              </div>
              <div className="proc-title" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.95rem', fontWeight: 700,
                color: 'var(--text)', marginBottom: 8
              }}>{s.title}</div>
              <div className="proc-desc" style={{
                fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.65
              }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
