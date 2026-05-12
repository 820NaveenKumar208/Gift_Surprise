import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlowingOrb, Sparkles, FloatingHearts, ShootingStar } from '../components/SharedEffects'

function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const now = new Date()
      const target = new Date(targetDate)
      // If birthday passed this year, show next year
      if (target < now) target.setFullYear(target.getFullYear() + 1)
      const diff = target - now
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTime(calc())
    const interval = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
      {units.map((unit, i) => (
        <motion.div
          key={unit.label}
          className="glass-subtle w-24 h-24 md:w-28 md:h-28 flex flex-col items-center justify-center rounded-2xl relative"
          style={{ boxShadow: '0 0 15px rgba(255, 45, 117, 0.1)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 + i * 0.1, duration: 0.5, type: 'spring' }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(255, 45, 117, 0.4)' }}
        >
          <motion.span
            key={unit.value}
            className="block text-3xl md:text-4xl font-bold font-poppins gradient-text-gold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(unit.value).padStart(2, '0')}
          </motion.span>
          <span className="text-[10px] md:text-xs text-white/50 font-poppins uppercase tracking-[0.2em] mt-2 block">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function AnimatedLine({ text, delay, className = '' }) {
  return (
    <motion.p
      className={`text-lg md:text-xl font-outfit font-light ${className}`}
      style={{ color: 'var(--text-secondary)' }}
      initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.8, ease: 'easeOut' }}
    >
      {text}
    </motion.p>
  )
}

export default function BirthdayIntro({ onNext }) {
  // Floating roses
  const roses = ['🌹', '🥀', '🌸', '🌺', '💐']

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <GlowingOrb color="#ff2d75" size={500} x="30%" y="20%" />
        <GlowingOrb color="#a855f7" size={400} x="70%" y="70%" delay={1.5} />
        <GlowingOrb color="#f5c842" size={300} x="50%" y="50%" delay={3} />
      </div>

      <Sparkles count={50} />
      <FloatingHearts count={20} />
      
      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <ShootingStar key={i} />
      ))}

      {/* Floating roses */}
      {roses.map((rose, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-3xl pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5 + i,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {rose}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Heartbeat pulse */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.span
            className="text-5xl md:text-6xl inline-block"
            animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 0 25px rgba(255,45,117,0.6))' }}
          >
            💖
          </motion.span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="gradient-text-love">Happy Birthday</span>
          <br />
          <span className="gradient-text-pink">My Love</span>
          <span className="inline-block ml-2 animate-heartbeat">❤️</span>
        </motion.h1>

        {/* Animated lines */}
        <div className="space-y-4 mb-12">
          <AnimatedLine text="You entered my life…" delay={1.2} />
          <AnimatedLine text="And slowly became my favorite feeling." delay={1.8} />
        </div>

        {/* Countdown */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/30 mb-4 font-outfit">
            Counting moments until your next birthday
          </p>
          {/* Set the birthday date */}
          <CountdownTimer targetDate="2026-05-15T00:00:00" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
        >
          <button className="btn-primary text-lg px-10 py-4" onClick={onNext}>
            <span>Start Our Story</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Subtle scroll hint */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <motion.div
            className="text-white/20 text-sm"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
