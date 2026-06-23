export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 60px', height: 68,
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(0,200,150,0.12)',
      boxShadow: '0 2px 20px rgba(8,145,178,0.07)'
    }}>
      <a href="#" className="nav-logo" style={{
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.25rem', fontWeight: 800,
        letterSpacing: '-0.03em', color: 'var(--text)',
        textDecoration: 'none'
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'var(--grad)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', color: '#fff', fontWeight: 800
        }}>I</div>
        Indigo Data Services
      </a>
      <ul className="nav-links" style={{
        display: 'flex', gap: 32, listStyle: 'none'
      }}>
        {['Services', 'Process', 'Portfolio', 'Team', 'Contact'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()) }}>{item}</a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('contact')} style={{
        background: 'var(--grad)', color: '#fff',
        padding: '10px 22px', borderRadius: 10,
        fontSize: '0.85rem', fontWeight: 600,
        border: 'none', cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        boxShadow: '0 4px 16px rgba(0,200,150,0.35)',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}>Free Consultation</button>
    </nav>
  )
}
