import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowingOrb, Sparkles, FloatingHearts, NavigationButtons } from '../components/SharedEffects'

const reasons = [
  { text: "Your smile fixes my worst days.", icon: "😊" },
  { text: "You make normal moments unforgettable.", icon: "✨" },
  { text: "Your voice feels like home.", icon: "🏡" },
  { text: "You are my peace.", icon: "🕊️" },
  { text: "Your laugh is my favorite melody.", icon: "🎵" },
  { text: "You believe in me even when I don't.", icon: "💪" },
  { text: "You make my heart race and feel calm at the same time.", icon: "💓" },
  { text: "Every moment with you is a treasure.", icon: "💎" },
  { text: "You understand me without words.", icon: "🤝" },
  { text: "You make the world feel safer.", icon: "🌍" },
  { text: "Your kindness inspires me daily.", icon: "🌟" },
  { text: "You turn ordinary into extraordinary.", icon: "🪄" },
  { text: "Your eyes hold an entire universe.", icon: "🌌" },
  { text: "You love me at my best and worst.", icon: "💝" },
  { text: "You are my answered prayer.", icon: "🙏" },
  { text: "Being with you feels like a beautiful dream.", icon: "☁️" },
  { text: "You make me want to be a better person.", icon: "⭐" },
  { text: "Your presence is my favorite gift.", icon: "🎁" },
  { text: "You're the reason I believe in forever.", icon: "♾️" },
  { text: "Loving you is the easiest thing I've ever done.", icon: "💖" },
]

const cardColors = [
  'from-pink-500/20 to-purple-500/20',
  'from-purple-500/20 to-blue-500/20',
  'from-blue-500/20 to-cyan-500/20',
  'from-amber-500/20 to-pink-500/20',
  'from-pink-500/20 to-rose-500/20',
]

function ReasonCard({ reason, index }) {
  const [expanded, setExpanded] = useState(false)
  const colorClass = cardColors[index % cardColors.length]
  const delay = index * 0.08
  const row = Math.floor(index / 4)
  const col = index % 4

  return (
    <motion.div
      className="relative cursor-pointer h-full flex flex-col"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.3 + delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      onClick={() => setExpanded(!expanded)}
      layout
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,45,117,0.3), rgba(168,85,247,0.3))',
          filter: 'blur(8px)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className={`relative glass-subtle p-5 md:p-6 rounded-2xl h-full bg-gradient-to-br ${colorClass} overflow-hidden`}>
        {/* Floating animation */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3 + (index % 3),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.2,
          }}
        >
          <motion.span
            className="text-2xl md:text-3xl block mb-3"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          >
            {reason.icon}
          </motion.span>

          <p className="font-outfit text-sm md:text-base text-white/80 leading-relaxed font-light">
            "{reason.text}"
          </p>

          {/* Expanded state */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 pt-3 border-t border-white/5"
              >
                <p className="text-xs text-white/40 font-dancing italic">
                  — with all my heart 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Corner sparkle */}
        <motion.div
          className="absolute top-2 right-2 text-white/10 text-xs"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
        >
          ✦
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ReasonsLove({ onNext, onPrev }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowingOrb color="#ff2d75" size={500} x="20%" y="30%" />
        <GlowingOrb color="#a855f7" size={450} x="80%" y="50%" delay={1} />
        <GlowingOrb color="#f5c842" size={300} x="50%" y="80%" delay={2} />
      </div>
      <Sparkles count={35} />
      <FloatingHearts count={10} />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="w-full flex flex-col items-center text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl md:text-6xl mb-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,45,117,0.5))' }}
          >
            💖
          </motion.div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold gradient-text-pink mb-4">
            Reasons Why You Are Special
          </h2>
          <p className="font-outfit text-white/40 text-sm md:text-base">
            Every reason is a heartbeat. Click any card to feel it.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {reasons.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>

        {/* Bottom message */}
        <motion.p
          className="text-center mt-12 font-dancing text-lg md:text-xl text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          ...and a million more reasons I'm still discovering 💫
        </motion.p>

        {/* Navigation */}
        <NavigationButtons onPrev={onPrev} onNext={onNext} nextLabel="Our Memories" />
      </div>
    </div>
  )
}
