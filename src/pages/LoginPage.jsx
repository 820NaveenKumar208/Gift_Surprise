import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { FloatingHearts, GlowingOrb, Sparkles } from '../components/SharedEffects'

const CORRECT_USERNAME = 'yoesh'
const CORRECT_PASSWORD = '9th'

function TypewriterText({ text, delay = 0, speed = 60, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let timeout
    const startTimeout = setTimeout(() => {
      let i = 0
      const type = () => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1))
          i++
          timeout = setTimeout(type, speed)
        } else {
          setDone(true)
        }
      }
      type()
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeout)
    }
  }, [text, delay, speed])

  return (
    <span className={className}>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-pink-400 ml-1 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  )
}

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const cardRef = useRef(null)
  const portalRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      username.toLowerCase().trim() === CORRECT_USERNAME &&
      password.toLowerCase().trim() === CORRECT_PASSWORD
    ) {
      setTransitioning(true)
      // Cinematic portal zoom effect
      if (portalRef.current) {
        gsap.to(portalRef.current, {
          scale: 50,
          opacity: 0,
          duration: 2,
          ease: 'power3.in',
        })
      }
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'power2.in',
        })
      }
      setTimeout(onLogin, 1800)
    } else {
      setError(true)
      // Shake animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -10 },
          { x: 10, duration: 0.08, repeat: 5, yoyo: true, ease: 'power2.inOut', onComplete: () => gsap.set(cardRef.current, { x: 0 }) }
        )
      }
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Ambient background */}
      <div className="absolute inset-0">
        <GlowingOrb color="#ff2d75" size={400} x="20%" y="30%" delay={0} />
        <GlowingOrb color="#a855f7" size={350} x="80%" y="60%" delay={1} />
        <GlowingOrb color="#3b82f6" size={300} x="50%" y="80%" delay={2} />
      </div>

      <Sparkles count={40} />
      <FloatingHearts count={12} />

      {/* Portal effect (appears on success) */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            ref={portalRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, #ff2d75 0%, #a855f7 40%, transparent 70%)',
                boxShadow: '0 0 60px #ff2d75, 0 0 120px #a855f7',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        ref={cardRef}
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Animated border glow */}
        <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-50 blur-sm animate-pulse-glow" />

        <div className="relative glass p-8 md:p-10 rounded-3xl">
          {/* Heart icon */}
          <motion.div
            className="text-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-4xl filter drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 15px rgba(255,45,117,0.5))' }}>
              💖
            </span>
          </motion.div>

          {/* Title with typewriter */}
          <h1 className="font-playfair text-2xl md:text-3xl text-center font-bold mb-3 gradient-text-pink">
            <TypewriterText text="Before Entering My Heart…" speed={70} />
          </h1>

          <motion.p
            className="text-center text-sm md:text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Only one special person can unlock this world.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <label className="block text-xs font-outfit text-purple-300/60 mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                className="input-luxury"
                placeholder="Type your boy name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              <label className="block text-xs font-outfit text-purple-300/60 mb-2 uppercase tracking-wider">
                Secret Question
              </label>
              <input
                type="text"
                className="input-luxury"
                placeholder="Which standard did we first meet?"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-center text-pink-400/80 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✨ That's not quite right... try again, love ✨
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.5 }}
            >
              <button type="submit" className="btn-primary w-full justify-center text-base">
                <span>Unlock My World</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💗
                </motion.span>
              </button>
            </motion.div>
          </form>

          {/* Subtle hint */}
          <motion.p
            className="text-center text-[10px] mt-6 text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            hint: remember when our paths first crossed?
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
