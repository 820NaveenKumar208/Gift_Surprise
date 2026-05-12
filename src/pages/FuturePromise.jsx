import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingOrb, Sparkles, ShootingStar, NavigationButtons } from '../components/SharedEffects'

const promises = [
  { front: "I Promise…", back: "I'll always support your dreams, no matter how big they are.", icon: "🌟" },
  { front: "I Promise…", back: "I'll stay beside you through every storm and every sunrise.", icon: "🌅" },
  { front: "I Promise…", back: "More memories are waiting for us, and I'll make each one special.", icon: "💫" },
  { front: "I Promise…", back: "This is only the beginning of our forever story.", icon: "♾️" },
  { front: "I Promise…", back: "To make you laugh on your worst days.", icon: "😂" },
  { front: "I Promise…", back: "To always choose you, every single day.", icon: "💝" },
]

const bucketList = [
  { text: "Travel the world together", emoji: "✈️" },
  { text: "Late night drives to nowhere", emoji: "🚗" },
  { text: "Watching sunsets on a beach", emoji: "🌅" },
  { text: "Building our dream life", emoji: "🏡" },
  { text: "Cook dinner together every Sunday", emoji: "👩‍🍳" },
  { text: "Dance in the rain", emoji: "💃" },
  { text: "Write love letters to each other", emoji: "💌" },
  { text: "Stargaze on a clear night", emoji: "🌌" },
]

function FlipCard({ promise, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="relative h-52 md:h-56 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 40, rotateY: -30 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.7, type: 'spring' }}
      onClick={() => setFlipped(!flipped)}
      whileHover={{ scale: 1.03 }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass-subtle p-6 rounded-2xl flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-30"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(255,45,117,0.3))',
              filter: 'blur(4px)',
              zIndex: -1,
            }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          />
          <motion.span
            className="text-3xl mb-3"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            {promise.icon}
          </motion.span>
          <p className="font-playfair text-xl md:text-2xl gradient-text-gold font-bold">
            {promise.front}
          </p>
          <p className="text-xs text-white/20 mt-3 font-outfit">tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass p-6 rounded-2xl flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="font-outfit text-sm md:text-base text-white/80 leading-relaxed font-light italic">
            "{promise.back}"
          </p>
          <p className="text-xs text-white/30 mt-4 font-dancing">— forever yours 💕</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ClickHeart({ x, y, id }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-[100] text-2xl"
      style={{ left: x, top: y }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.5, 1],
        opacity: [1, 0.8, 0],
        y: -100,
        x: (Math.random() - 0.5) * 60,
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      💖
    </motion.div>
  )
}

export default function FuturePromise({ onNext, onPrev }) {
  const [clickHearts, setClickHearts] = useState([])

  const handleClick = useCallback((e) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX - 15,
      y: e.clientY - 15,
    }
    setClickHearts(prev => [...prev, newHeart])
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id))
    }, 1500)
  }, [])

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden px-4 py-20"
      onClick={handleClick}
    >
      {/* Aurora gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(168,85,247,0.08) 30%, rgba(255,45,117,0.05) 60%, rgba(59,130,246,0.05) 100%)',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <GlowingOrb color="#06b6d4" size={400} x="20%" y="20%" />
        <GlowingOrb color="#a855f7" size={450} x="75%" y="60%" delay={1} />
        <GlowingOrb color="#ff2d75" size={300} x="50%" y="85%" delay={2} />
      </div>
      
      <Sparkles count={40} />
      {[...Array(3)].map((_, i) => <ShootingStar key={i} />)}

      {/* Click hearts */}
      <AnimatePresence>
        {clickHearts.map(heart => (
          <ClickHeart key={heart.id} {...heart} />
        ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="w-full flex flex-col items-center text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-4xl mb-4 block"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌠
          </motion.span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold gradient-text-purple mb-4">
            Our Future Together
          </h2>
          <p className="font-outfit text-white/40 text-sm md:text-base max-w-md mx-auto">
            Every promise is a star in our sky. Click anywhere to spread love. ✨
          </p>
        </motion.div>

        {/* Promise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {promises.map((promise, i) => (
            <FlipCard key={i} promise={promise} index={i} />
          ))}
        </div>

        {/* Bucket List Section */}
        <motion.div
          className="w-full max-w-3xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <h3 className="font-playfair text-2xl md:text-3xl text-center gradient-text-gold font-bold mb-8">
            Future Bucket List Together
          </h3>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bucketList.map((item, i) => (
              <motion.div
                key={i}
                className="glass-subtle px-5 py-4 rounded-xl flex items-center gap-3 group cursor-default"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(245,200,66,0.3)',
                  boxShadow: '0 0 20px rgba(245,200,66,0.1)',
                }}
              >
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                  {item.emoji}
                </span>
                <span className="font-outfit text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {item.text}
                </span>
                <motion.span
                  className="ml-auto text-white/10 group-hover:text-gold-soft/30 transition-colors text-xs"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  ☐
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <NavigationButtons onPrev={onPrev} onNext={onNext} nextLabel="Forever" />
      </div>
    </div>
  )
}
