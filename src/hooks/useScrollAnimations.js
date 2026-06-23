import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show')
      })
    }, { threshold: 0.1 })

    const els = document.querySelectorAll('.svc-card,.port-card,.team-card')
    els.forEach((el, i) => {
      el.style.animationDelay = (i % 4) * 0.1 + 's'
      revealObs.observe(el)
    })

    return () => revealObs.disconnect()
  }, [])
}

export function useCounterAnimation() {
  useEffect(() => {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target
        const target = +el.dataset.target
        let cur = 0, step = target / 55
        const iv = setInterval(() => {
          cur = Math.min(cur + step, target)
          el.textContent = Math.round(cur) + (target === 98 ? '%' : '+')
          if (cur >= target) clearInterval(iv)
        }, 22)
        countObs.unobserve(el)
      })
    }, { threshold: 0.5 })

    document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el))
    return () => countObs.disconnect()
  }, [])
}
