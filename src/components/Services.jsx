import { use3DTilt } from '../hooks/use3DTilt'
import ParticleBackground from './ParticleBackground'

const icBg = {
  ic1: 'linear-gradient(135deg,rgba(0,200,150,.15),rgba(0,200,150,.05))',
  ic2: 'linear-gradient(135deg,rgba(124,58,237,.15),rgba(124,58,237,.05))',
  ic3: 'linear-gradient(135deg,rgba(236,72,153,.15),rgba(236,72,153,.05))',
  ic4: 'linear-gradient(135deg,rgba(34,211,238,.15),rgba(34,211,238,.05))',
  ic5: 'linear-gradient(135deg,rgba(245,158,11,.15),rgba(245,158,11,.05))',
  ic6: 'linear-gradient(135deg,rgba(0,200,150,.15),rgba(124,58,237,.05))',
}

const icBorder = {
  ic1: '1px solid rgba(0,200,150,.2)',
  ic2: '1px solid rgba(124,58,237,.2)',
  ic3: '1px solid rgba(236,72,153,.2)',
  ic4: '1px solid rgba(34,211,238,.2)',
  ic5: '1px solid rgba(245,158,11,.2)',
  ic6: '1px solid rgba(0,200,150,.2)',
}

const linkColors = {
  ic1: 'var(--green)',
  ic2: 'var(--purple)',
  ic3: 'var(--pink)',
  ic4: 'var(--cyan)',
  ic5: 'var(--amber)',
  ic6: 'var(--green)',
}

function ServiceCard({ icon, name, desc, ic }) {
  const tilt = use3DTilt()
  return (
    <div className="svc-card" ref={tilt.ref}
      onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave}
      style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        borderRadius: 20, padding: '36px 28px',
        boxShadow: 'var(--shadow)',
        transition: 'transform 0.15s ease, box-shadow 0.3s',
        position: 'relative', overflow: 'hidden',
        opacity: 0, transform: 'translateY(28px)',
        cursor: 'default', willChange: 'transform'
      }}>
      <div className="svc-icon" style={{
        width: 56, height: 56, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: 22,
        background: icBg[ic], border: icBorder[ic],
      }}>{icon}</div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '1.05rem', fontWeight: 700,
        color: 'var(--text)', marginBottom: 10
      }}>{name}</div>
      <div style={{ color: 'var(--text2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</div>
      <a href="#contact" className="svc-link" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        marginTop: 18, fontSize: '0.82rem', fontWeight: 600,
        color: linkColors[ic], textDecoration: 'none',
        transition: 'gap 0.2s'
      }}>Learn more →</a>
    </div>
  )
}

const services = [
  { icon: '🏢', name: 'ERP Systems', desc: 'Fully custom enterprise platforms unifying HR, inventory, finance, and operations — built specifically for how your business works.', ic: 'ic1' },
  { icon: '📱', name: 'Web & Mobile Apps', desc: 'Scalable, performant apps for web and mobile. From MVPs to complex platforms — built to handle real users and real traffic.', ic: 'ic2' },
  { icon: '🎨', name: 'UI/UX Design', desc: 'Interfaces people actually enjoy using. Research-backed, accessibility-first, and visually crafted to convert visitors into loyal users.', ic: 'ic3' },
  { icon: '☁️', name: 'Cloud & Infrastructure', desc: 'AWS, Azure, or GCP — we architect cloud systems that are secure, fast, and ready to scale from day one to millions of users.', ic: 'ic4' },
  { icon: '🤖', name: 'AI & Automation', desc: 'Intelligent chatbots, document processing, predictive analytics, and workflow automation that save hours every single day.', ic: 'ic5' },
  { icon: '🛒', name: 'E-Commerce Platforms', desc: 'Multi-vendor marketplaces, custom storefronts, payment integrations, and order management — built to sell and built to scale.', ic: 'ic6' },
  { icon: '📊', name: 'Data Analytics & BI', desc: 'Custom dashboards, real-time reporting, and data pipelines that turn raw information into actionable business intelligence.', ic: 'ic4' },
  { icon: '🔒', name: 'Cybersecurity Solutions', desc: 'Penetration testing, SOC audits, compliance frameworks, and security architecture — we keep your digital assets safe.', ic: 'ic2' },
  { icon: '⚙️', name: 'DevOps & CI/CD', desc: 'Automated deployments, container orchestration, monitoring, and infrastructure-as-code for bulletproof delivery pipelines.', ic: 'ic3' },
  { icon: '🔄', name: 'Legacy Modernization', desc: 'Migrate outdated systems to modern architectures without downtime — preserving data and business logic while unlocking new capabilities.', ic: 'ic5' },
]

export default function Services() {
  return (
    <section className="sec" id="services" style={{ background: '#fff', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <div className="sec-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle,rgba(124,58,237,.06),transparent 70%)', top: -100, right: -100 }} />
      <div className="sec-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,200,150,.05),transparent 70%)', bottom: -80, left: -80 }} />
      <div className="sec-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="centered">
          <div className="eyebrow">What We Build</div>
          <h2 className="sec-title sec-title-gradient">Software Solutions for<br />Every Business Need</h2>
          <p className="sec-desc">End-to-end digital products built with precision — from first sketch to live deployment and beyond.</p>
        </div>
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 22, marginTop: 56,
          perspective: '1200px'
        }}>
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
