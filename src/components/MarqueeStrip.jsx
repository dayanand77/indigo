const items = ['ERP Systems', 'Web Applications', 'Mobile Apps', 'UI/UX Design', 'Cloud Infrastructure', 'AI & Automation', 'E-Commerce Platforms', 'Business Intelligence']

export default function MarqueeStrip() {
  return (
    <div style={{
      background: 'var(--grad)', padding: '14px 0', overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex', gap: 0, width: 'max-content',
        animation: 'marquee 20s linear infinite'
      }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            whiteSpace: 'nowrap', padding: '0 36px',
            fontSize: '0.82rem', fontWeight: 600,
            color: 'rgba(255,255,255,0.9)', letterSpacing: '0.06em',
            textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12
          }}>
            {item}
            <span style={{ opacity: 0.6 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
