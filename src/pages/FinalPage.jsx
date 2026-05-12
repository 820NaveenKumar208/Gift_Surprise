import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { GlowingOrb, Sparkles, FloatingHearts, ShootingStar } from '../components/SharedEffects'

// Removed MemoryCounter per requirements

function CuteDog() {
  return (
    <motion.div
      className="absolute bottom-10 right-4 md:bottom-12 md:right-12 pointer-events-none z-50 flex flex-col items-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3.5, duration: 1, type: 'spring' }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <span className="text-6xl md:text-7xl drop-shadow-2xl">🐶</span>
        <motion.span
          className="absolute -top-4 -right-2 text-2xl"
          animate={{ scale: [0.8, 1.2, 0.8], y: [0, -15, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,45,117,0.5))' }}
        >
          ❤️
        </motion.span>
      </motion.div>
      <motion.div 
        className="mt-3 glass px-4 py-2 rounded-2xl text-xs font-poppins text-white/90 border border-white/10 shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5, duration: 0.5 }}
      >
        You were living in my thoughts ❤️
      </motion.div>
    </motion.div>
  )
}

function HeartExplosion({ onComplete }) {
  const hearts = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * window.innerWidth,
    y: (Math.random() - 0.5) * window.innerHeight,
    size: Math.random() * 30 + 15,
    delay: Math.random() * 0.5,
    rotation: Math.random() * 360,
  }))

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400"
          style={{
            fontSize: heart.size,
            filter: `drop-shadow(0 0 ${heart.size/2}px rgba(255,45,117,0.4))`,
          }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: heart.x,
            y: heart.y,
            scale: [0, 1.5, 1],
            opacity: [0, 1, 0.8],
            rotate: heart.rotation,
          }}
          transition={{
            duration: 2,
            delay: heart.delay,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8, type: 'spring' }}
      >
        <h2 className="font-playfair text-4xl md:text-6xl font-bold gradient-text-love mb-4">
          I Love You Forever
        </h2>
        <motion.span
          className="text-5xl inline-block"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          💖
        </motion.span>
      </motion.div>

      <motion.button
        className="absolute bottom-10 btn-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={onComplete}
      >
        Close ✨
      </motion.button>
    </motion.div>
  )
}

export default function FinalPage({ onPrev }) {
  const [showExplosion, setShowExplosion] = useState(false)
  const galaxyRef = useRef(null)

  useEffect(() => {
    // Slow galaxy rotation
    if (galaxyRef.current) {
      gsap.to(galaxyRef.current, {
        rotation: 360,
        duration: 120,
        repeat: -1,
        ease: 'none',
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Galaxy background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={galaxyRef}
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(255,45,117,0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 50%)
            `,
          }}
        />
        <GlowingOrb color="#ff2d75" size={500} x="25%" y="20%" />
        <GlowingOrb color="#a855f7" size={450} x="75%" y="70%" delay={1} />
        <GlowingOrb color="#f5c842" size={350} x="50%" y="40%" delay={2} />
        <GlowingOrb color="#3b82f6" size={300} x="60%" y="85%" delay={3} />
      </div>

      <Sparkles count={60} />
      <FloatingHearts count={20} />
      {[...Array(4)].map((_, i) => <ShootingStar key={i} />)}

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Animated couple photo placeholder */}
        <motion.div
          className="relative w-52 h-52 md:w-72 md:h-72 mx-auto mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
        >
          {/* Animated glowing border */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #ff2d75, #a855f7, #3b82f6, #f5c842, #ff2d75)',
              backgroundSize: '300% 300%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute -inset-3 rounded-full blur-xl opacity-40"
            style={{
              background: 'linear-gradient(135deg, #ff2d75, #a855f7, #3b82f6)',
            }}
          />

          <img
            src="/photo/image7.jpg"
            alt="Couple"
            className="w-full h-full object-cover rounded-full border-2 border-white/10 relative z-10"
          />
        </motion.div>

        {/* Main text */}
        <motion.h1
          className="font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="gradient-text-love">You Are My Favorite Chapter</span>
          <motion.span
            className="inline-block ml-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ❤️
          </motion.span>
        </motion.h1>

        <motion.div
          className="space-y-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="font-outfit text-base md:text-lg text-white/50 font-light">
            No matter where life goes…
          </p>
          <p className="font-outfit text-base md:text-lg text-white/50 font-light">
            I'll always cherish every moment with you.
          </p>
        </motion.div>

        {/* Emotional Section (Replaces Stats) */}
        <motion.div
          className="my-12 px-6 py-8 md:py-12 glass-subtle rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {/* Subtle animated background glow */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 blur-xl"
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
          />
          <h2 className="font-playfair text-3xl md:text-4xl italic text-white/90 mb-4 relative z-10 leading-snug drop-shadow-md">
            "You were living in my thoughts"
          </h2>
          <p className="font-poppins text-sm md:text-lg text-white/70 relative z-10 tracking-wide font-light">
            And somehow you became my favorite feeling.
          </p>
        </motion.div>

        {/* Final Heart Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <motion.button
            className="relative group"
            onClick={() => setShowExplosion(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative glass px-8 py-4 rounded-full flex items-center gap-3 border-pink-500/30">
              <span className="font-outfit text-base text-white/80">Touch My Heart</span>
              <motion.span
                className="text-2xl"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,45,117,0.5))' }}
              >
                💖
              </motion.span>
            </div>
          </motion.button>
        </motion.div>

        {/* Back button */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <button className="btn-secondary text-sm" onClick={onPrev}>
            <span>←</span>
            <span>Back</span>
          </button>
        </motion.div>

        {/* Made with love */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="font-dancing text-lg md:text-xl text-white/20">
              Made with love by{' '}
              <span className="gradient-text-pink">Your Name</span>
            </p>
            <motion.div
              className="flex justify-center gap-1 mt-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-white/10">∞</span>
              <span className="text-xs text-pink-400/30">♥</span>
              <span className="text-xs text-white/10">∞</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Heart Explosion */}
      <AnimatePresence>
        {showExplosion && (
          <HeartExplosion onComplete={() => setShowExplosion(false)} />
        )}
      </AnimatePresence>

      <CuteDog />
    </div>
  )
}
