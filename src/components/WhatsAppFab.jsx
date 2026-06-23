export default function WhatsAppFab() {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 200,
      width: 56, height: 56, borderRadius: '50%',
      background: '#25D366', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '1.6rem',
      boxShadow: '0 8px 24px rgba(37,211,102,0.45)',
      textDecoration: 'none', animation: 'waPulse 3s ease-in-out infinite'
    }}>💬</a>
  )
}
