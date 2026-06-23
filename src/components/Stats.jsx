import DataVizBackground from './DataVizBackground'

export default function Stats() {
  const iconStyles = [
    { bg: 'linear-gradient(135deg,rgba(0,200,150,.12),rgba(0,200,150,.05))', border: '1px solid rgba(0,200,150,.2)' },
    { bg: 'linear-gradient(135deg,rgba(124,58,237,.12),rgba(124,58,237,.05))', border: '1px solid rgba(124,58,237,.2)' },
    { bg: 'linear-gradient(135deg,rgba(34,211,238,.12),rgba(34,211,238,.05))', border: '1px solid rgba(34,211,238,.2)' },
    { bg: 'linear-gradient(135deg,rgba(245,158,11,.12),rgba(245,158,11,.05))', border: '1px solid rgba(245,158,11,.2)' },
  ]
  const statBorders = [
    '3px solid #00C896',
    '3px solid #7C3AED',
    '3px solid #22D3EE',
    '3px solid #F59E0B',
  ]
  const statGrads = [
    'linear-gradient(135deg, #00C896, #0891B2)',
    'linear-gradient(135deg, #7C3AED, #EC4899)',
    'linear-gradient(135deg, #22D3EE, #00C896)',
    'linear-gradient(135deg, #F59E0B, #EC4899)',
  ]

  return (
    <section className="sec" id="stats" style={{ background: 'linear-gradient(160deg, #fff 0%, #f5f0ff 40%, #f0faf7 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="sec-glow" style={{ width: 450, height: 450, background: 'radial-gradient(circle,rgba(124,58,237,.05),transparent 70%)', top: -80, right: -60 }} />
      <div className="sec-glow" style={{ width: 350, height: 350, background: 'radial-gradient(circle,rgba(0,200,150,.04),transparent 70%)', bottom: -60, left: -60 }} />
      <div className="sec-inner">
        <div className="stats-wrap" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 80, alignItems: 'center'
        }}>
          <div>
            <div className="eyebrow">Why Choose Us</div>
            <h2 className="sec-title sec-title-gradient">Real Results for<br />Real Businesses</h2>
            <p className="sec-desc">We're not an agency that disappears after delivery. We're a partner invested in your long-term success.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 36 }}>
              {[
                { ico: '⚡', title: 'Fast Without Cutting Corners', body: 'Sprint-based delivery with full transparency — you always know exactly where your project stands.' },
                { ico: '🔐', title: 'Security Built In, Not Bolted On', body: 'OWASP standards, encrypted data, and security audits as a standard part of every project.' },
                { ico: '📈', title: 'Architecture That Grows With You', body: 'We design systems for tomorrow — so your software handles 10x growth without a rebuild.' },
                { ico: '🤝', title: 'Support You Can Actually Reach', body: 'WhatsApp, calls, email — we respond fast and stay accountable long after your product goes live.' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    background: iconStyles[i].bg,
                    border: iconStyles[i].border,
                  }}>{r.ico}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>{r.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>{r.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="stat-cards" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20
          }}>
            {[
              { num: '50', label: 'Projects Delivered', suffix: '+' },
              { num: '30', label: 'Happy Clients', suffix: '+' },
              { num: '5', label: 'Years Experience', suffix: '+' },
              { num: '98', label: '% Satisfaction Rate', suffix: '%' },
            ].map((s, i) => (
              <div key={i} className="stat-card" style={{
                background: 'var(--glass)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--glass-border)',
                borderRadius: 18, padding: '30px 24px',
                boxShadow: 'var(--shadow)', textAlign: 'center',
                borderTop: statBorders[i],
              }}>
                <div className="stat-num" data-target={s.num} style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '2.4rem', fontWeight: 800,
                  background: statGrads[i], WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  lineHeight: 1, marginBottom: 6
                }}>0{s.suffix}</div>
                <div style={{ color: 'var(--text2)', fontSize: '0.82rem', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
