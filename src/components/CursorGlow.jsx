import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const lastParticleTime = useRef(0)
  const trailContainer = useRef(null)

  useEffect(() => {
    trailContainer.current = document.createElement('div')
    trailContainer.current.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden;'
    document.body.appendChild(trailContainer.current)

    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px'
        glowRef.current.style.top = e.clientY + 'px'
      }

      const now = performance.now()
      if (now - lastParticleTime.current < 50) return

      lastParticleTime.current = now
      const particle = document.createElement('div')
      const size = Math.random() * 3 + 1.5
      const hue = Math.random() > 0.5 ? '330' : '270'
      particle.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;
        background:hsla(${hue}, 80%, 60%, 0.6);border-radius:50%;pointer-events:none;z-index:9997;
        transition:all 0.8s ease-out;box-shadow:0 0 ${size * 2}px hsla(${hue}, 80%, 60%, 0.3);
      `
      trailContainer.current?.appendChild(particle)

      requestAnimationFrame(() => {
        particle.style.opacity = '0'
        particle.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${-Math.random() * 40 - 10}px) scale(0)`
      })

      setTimeout(() => particle.remove(), 800)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      trailContainer.current?.remove()
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      style={{ left: -500, top: -500 }}
    />
  )
}
