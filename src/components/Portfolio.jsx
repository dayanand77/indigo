import { use3DTilt } from '../hooks/use3DTilt'
import ParticleBackground from './ParticleBackground'

const ptBg = {
  pt1: 'linear-gradient(135deg,#d0f5ec,#a8eddc)',
  pt2: 'linear-gradient(135deg,#c8eef7,#9de0f0)',
  pt3: 'linear-gradient(135deg,#c8f5e6,#8fe8cc)',
  pt4: 'linear-gradient(135deg,#bce8f5,#80d4ec)',
  pt5: 'linear-gradient(135deg,#d4f0e8,#b0e8d8)',
  pt6: 'linear-gradient(135deg,#c0eaf5,#90dcee)',
  pt7: 'linear-gradient(135deg,#d8f5ee,#b0eddc)',
  pt8: 'linear-gradient(135deg,#c4eef7,#94dff0)',
}

function ProjectCard({ thumb, type, name, desc, tags, pt }) {
  const tilt = use3DTilt()
  return (
    <div className="port-card" ref={tilt.ref}
      onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 22, overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        transition: 'transform 0.15s ease, box-shadow 0.3s',
        opacity: 0, transform: 'translateY(28px)',
        cursor: 'default', willChange: 'transform'
      }}>
      <div style={{
        height: 190, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '3.5rem', position: 'relative',
        background: ptBg[pt]
      }}>{thumb}</div>
      <div style={{ padding: '24px 26px' }}>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--green-dark)', marginBottom: 6
        }}>{type}</div>
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8
        }}>{name}</div>
        <div style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: 16 }}>{desc}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {tags.map((tag, j) => (
            <span key={j} style={{
              fontSize: '0.7rem', fontWeight: 600, padding: '4px 11px',
              borderRadius: 100,
              background: 'rgba(0,200,150,0.1)',
              border: '1px solid rgba(0,200,150,0.2)',
              color: 'var(--green-dark)'
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const projects = [
  { thumb: '🏭', type: 'ERP System', name: 'ManufacturePro — Factory ERP', desc: 'Full ERP covering production planning, multi-location inventory, HR, and financial reporting for a mid-size manufacturer across 3 plant locations.', tags: ['React', 'Node.js', 'PostgreSQL', 'AWS'], pt: 'pt1' },
  { thumb: '🛍️', type: 'E-Commerce', name: 'FreshMart — Multi-Vendor Grocery', desc: 'A multi-vendor grocery marketplace with real-time inventory tracking, 3 payment gateways, and a live delivery system used by 10,000+ monthly users.', tags: ['Next.js', 'Flutter', 'Razorpay', 'Firebase'], pt: 'pt2' },
  { thumb: '🏥', type: 'Healthcare App', name: 'MediTrack — Clinic Management', desc: 'End-to-end clinic system with appointment booking, electronic medical records, billing, and WhatsApp notifications — serving 5 clinics across Karnataka.', tags: ['Vue.js', 'Python', 'MySQL', 'WhatsApp API'], pt: 'pt3' },
  { thumb: '📊', type: 'Analytics Dashboard', name: 'InsightHub — Business Intelligence', desc: 'Real-time BI dashboard pulling from 8 data sources, helping a retail chain\'s leadership track KPIs live and make faster, data-driven decisions.', tags: ['React', 'D3.js', 'FastAPI', 'Redis'], pt: 'pt4' },
  { thumb: '📚', type: 'EdTech Platform', name: 'EduLearn — Online Learning', desc: 'A full-featured LMS with live classes, recorded lectures, assessments, and AI-powered personalized learning paths for 50,000+ students.', tags: ['Angular', 'Python', 'MongoDB', 'Azure'], pt: 'pt5' },
  { thumb: '💳', type: 'FinTech', name: 'FinPay — Digital Payment Gateway', desc: 'Secure payment processing platform supporting UPI, cards, net banking, and wallet integrations with fraud detection handling 100K+ daily transactions.', tags: ['React', 'Go', 'Redis', 'Kubernetes'], pt: 'pt6' },
  { thumb: '🚚', type: 'Logistics', name: 'LogiTrack — Fleet Management', desc: 'Real-time GPS tracking, route optimization, driver management, and delivery analytics for a logistics company operating 500+ vehicles across India.', tags: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps API'], pt: 'pt7' },
  { thumb: '🌐', type: 'Social Platform', name: 'SocialConnect — Brand Dashboard', desc: 'Unified social media management platform with scheduling, analytics, AI content suggestions, and multi-platform publishing for marketing agencies.', tags: ['Next.js', 'GraphQL', 'TypeScript', 'DynamoDB'], pt: 'pt8' },
]

export default function Portfolio() {
  return (
    <section className="sec" id="portfolio" style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <div className="sec-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="centered">
          <div className="eyebrow">Our Work</div>
          <h2 className="sec-title">Projects That Made<br />a Real Difference</h2>
          <p className="sec-desc">Each project is a story — of a problem solved, a business transformed, and a partnership built.</p>
        </div>
        <div className="port-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: 24, marginTop: 56,
          perspective: '1200px'
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
