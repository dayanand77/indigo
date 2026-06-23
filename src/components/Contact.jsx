export default function Contact() {
  const iconStyles = [
    { bg: 'linear-gradient(135deg,rgba(0,200,150,.12),rgba(0,200,150,.05))', border: '1px solid rgba(0,200,150,.2)' },
    { bg: 'linear-gradient(135deg,rgba(124,58,237,.12),rgba(124,58,237,.05))', border: '1px solid rgba(124,58,237,.2)' },
    { bg: 'linear-gradient(135deg,rgba(236,72,153,.12),rgba(236,72,153,.05))', border: '1px solid rgba(236,72,153,.2)' },
    { bg: 'linear-gradient(135deg,rgba(34,211,238,.12),rgba(34,211,238,.05))', border: '1px solid rgba(34,211,238,.2)' },
  ]

  return (
    <section className="sec" id="contact" style={{ background: 'linear-gradient(160deg, #f5f0ff 0%, #fff 40%, #f0faf7 100%)', position: 'relative', overflow: 'hidden' }}>
      <div className="sec-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(236,72,153,.05),transparent 70%)', top: -120, left: -80 }} />
      <div className="sec-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,200,150,.04),transparent 70%)', bottom: -60, right: -60 }} />
      <div className="sec-inner">
        <div className="contact-wrap" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.1fr',
          gap: 72, alignItems: 'start'
        }}>
          <div>
            <div className="eyebrow">Get In Touch</div>
            <h2 className="sec-title sec-title-gradient">Let's Build Something<br />Great Together</h2>
            <p className="sec-desc">Tell us about your project. We'll get back within 24 hours with a free consultation — no strings attached.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 36 }}>
              {[
                { ico: '📍', label: 'Location', val: 'Bengaluru, Karnataka, India' },
                { ico: '📧', label: 'Email', val: 'hello@indigodata.in' },
                { ico: '📞', label: 'Phone / WhatsApp', val: '+91 98765 43210' },
                { ico: '🕐', label: 'Working Hours', val: 'Mon–Sat · 9 AM – 7 PM IST' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    background: iconStyles[i].bg,
                    border: iconStyles[i].border,
                  }}>{d.ico}</div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{d.label}</div>
                    <div style={{ fontWeight: 500, color: 'var(--text)', fontSize: '0.9rem' }}>{d.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.95)',
            borderRadius: 24, padding: '40px 36px',
            boxShadow: '0 8px 32px rgba(124,58,237,0.08), 0 20px 60px rgba(8,145,178,0.12)'
          }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Your Name</label>
                <input type="text" placeholder="Rajesh Kumar" />
              </div>
              <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Email</label>
                <input type="email" placeholder="you@company.com" />
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Phone / WhatsApp</label>
                <input type="tel" placeholder="+91 98765 00000" />
              </div>
              <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Company</label>
                <input type="text" placeholder="Your Company" />
              </div>
            </div>
            <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>What do you need built?</label>
              <select>
                <option value="">Select a service...</option>
                {['ERP System', 'Web Application', 'Mobile App', 'E-Commerce Platform', 'UI/UX Design', 'AI / Automation', 'Cloud Infrastructure', 'Something else'].map((o, i) => (
                  <option key={i}>{o}</option>
                ))}
              </select>
            </div>
            <div className="fg" style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text2)' }}>Tell us about your project</label>
              <textarea placeholder="Describe your idea, goals, timeline, or any questions you have..." />
            </div>
            <button className="form-btn" style={{
              width: '100%', color: '#fff',
              padding: 15, borderRadius: 12, fontSize: '0.95rem',
              fontWeight: 700, border: 'none', cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              marginTop: 4
            }}>Send Message & Book Free Consultation →</button>
          </div>
        </div>
      </div>
    </section>
  )
}
