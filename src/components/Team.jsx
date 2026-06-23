import { use3DTilt } from '../hooks/use3DTilt'

const bgColors = [
  'var(--grad)',
  'var(--grad3)',
  'linear-gradient(135deg,#06D6A0,#0891B2)',
  'linear-gradient(135deg,#00976E,#06D6A0)',
  'linear-gradient(135deg,#0891B2,#065F7A)',
  'linear-gradient(135deg,#00C896,#065F7A)',
  'linear-gradient(135deg,#06D6A0,#00C896)',
  'linear-gradient(135deg,#065F7A,#00976E)',
]

function TeamCard({ initials, name, role, chips, bgIndex }) {
  const tilt = use3DTilt()
  return (
    <div className="team-card" ref={tilt.ref}
      onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 20, padding: '32px 20px',
        textAlign: 'center', boxShadow: 'var(--shadow)',
        transition: 'transform 0.15s ease, box-shadow 0.3s',
        opacity: 0, transform: 'translateY(28px)',
        cursor: 'default', willChange: 'transform'
      }}>
      <div className="t-avatar" style={{
        width: 76, height: 76, borderRadius: '50%',
        margin: '0 auto 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.4rem', fontWeight: 800, color: '#fff',
        boxShadow: '0 6px 20px rgba(0,200,150,0.3)',
        background: bgColors[bgIndex]
      }}>{initials}</div>
      <div className="t-name" style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4
      }}>{name}</div>
      <div className="t-role" style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 16 }}>{role}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
        {chips.map((chip, j) => (
          <span key={j} className="chip" style={{
            fontSize: '0.68rem', fontWeight: 600,
            padding: '3px 9px', borderRadius: 100,
            background: 'rgba(8,145,178,0.08)',
            border: '1px solid rgba(8,145,178,0.15)',
            color: 'var(--teal-dark)'
          }}>{chip}</span>
        ))}
      </div>
    </div>
  )
}

const members = [
  { initials: 'AK', name: 'Arjun Kumar', role: 'Founder & CEO', chips: ['Strategy', 'Leadership'], bgIndex: 0 },
  { initials: 'PS', name: 'Priya Sharma', role: 'Lead Frontend Engineer', chips: ['React', 'Three.js'], bgIndex: 1 },
  { initials: 'RN', name: 'Rahul Nair', role: 'Backend Architect', chips: ['Node.js', 'AWS'], bgIndex: 2 },
  { initials: 'DM', name: 'Divya Menon', role: 'Head of Design', chips: ['Figma', 'UX Research'], bgIndex: 3 },
  { initials: 'AP', name: 'Anika Patel', role: 'Data Scientist', chips: ['Python', 'ML', 'TensorFlow'], bgIndex: 4 },
  { initials: 'VS', name: 'Vikram Singh', role: 'DevOps Engineer', chips: ['Docker', 'K8s', 'Terraform'], bgIndex: 5 },
  { initials: 'NG', name: 'Neha Gupta', role: 'Project Manager', chips: ['Agile', 'Scrum', 'Jira'], bgIndex: 6 },
  { initials: 'AV', name: 'Amit Verma', role: 'Mobile Developer', chips: ['Flutter', 'Kotlin', 'Swift'], bgIndex: 7 },
]

export default function Team() {
  return (
    <section className="sec" id="team" style={{ background: '#fff' }}>
      <div className="sec-inner">
        <div className="centered">
          <div className="eyebrow">The People</div>
          <h2 className="sec-title">The Team Behind<br />Your Next Big Build</h2>
          <p className="sec-desc">Passionate developers, sharp designers, and clear-headed strategists — all working for your success.</p>
        </div>
        <div className="team-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 22, marginTop: 56,
          perspective: '1200px'
        }}>
          {members.map((m, i) => (
            <TeamCard key={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}
