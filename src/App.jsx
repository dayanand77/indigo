import { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import Services from './components/Services'
import Process from './components/Process'
import Stats from './components/Stats'
import Portfolio from './components/Portfolio'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import { useScrollReveal, useCounterAnimation } from './hooks/useScrollAnimations'

function App() {
  const [loading, setLoading] = useState(true)

  useScrollReveal()
  useCounterAnimation()

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <Services />
      <Process />
      <Stats />
      <Portfolio />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </>
  )
}

export default App
