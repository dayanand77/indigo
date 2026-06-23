export default function Footer() {
  return (
    <footer style={{
      background: 'var(--text)', color: 'rgba(255,255,255,0.75)',
      padding: '64px 60px 28px'
    }}>
      <div className="sec-inner">
        <div className="footer-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 56, marginBottom: 48
        }}>
          <div className="ft-brand" style={{ maxWidth: 280 }}>
            <div className="ft-logo" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: 14
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: 'var(--grad)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.9rem', color: '#fff', fontWeight: 800
              }}>I</div>
              Indigo Data Services
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>Building software that powers the next generation of Indian businesses — from Bengaluru to the world.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {['in', 'tw', 'gh', 'yt'].map((s, i) => (
                <a key={i} href="#" style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s'
                }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Services', links: ['ERP Systems', 'Web Apps', 'Mobile Apps', 'UI/UX Design', 'Cloud & DevOps', 'AI Solutions'] },
            { title: 'Company', links: ['About Us', 'Our Team', 'Portfolio', 'Careers', 'Blog'] },
            { title: 'Contact', links: ['hello@indigodata.in', '+91 98765 43210', 'WhatsApp Us', 'Book a Free Demo'] },
          ].map((col, i) => (
            <div key={i} className="ft-col">
              <h4 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.85rem', fontWeight: 700, color: '#fff',
                marginBottom: 18
              }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map((link, j) => (
                  <li key={j}><a href="#" style={{
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    fontSize: '0.83rem', transition: 'color 0.2s'
                  }}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom" style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          fontSize: '0.78rem'
        }}>
          <span>© 2025 Indigo Data Services Pvt. Ltd. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  )
}
