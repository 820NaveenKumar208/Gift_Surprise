import { motion } from 'framer-motion'

export function FloatingHearts({ count = 8 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 16 + 8
        const delay = Math.random() * 8
        const duration = Math.random() * 6 + 8
        const x = Math.random() * 100

        return (
          <motion.div
            key={i}
            className="absolute text-pink-400/20"
            style={{
              left: `${x}%`,
              bottom: '-5%',
              fontSize: size,
            }}
            animate={{
              y: [0, -window.innerHeight * 1.2],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, (Math.random() - 0.5) * 60],
              opacity: [0, 0.6, 0.4, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            ♥
          </motion.div>
        )
      })}
    </div>
  )
}

export function GlowingOrb({ color = '#ff2d75', size = 300, x = '50%', y = '50%', delay = 0 }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function Sparkles({ count = 15 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }, (_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 3 + 1
        const delay = Math.random() * 5
        const duration = Math.random() * 2 + 2

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              background: '#fff',
              boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.5)`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}

export function ShootingStar() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: 2,
        height: 2,
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 0 6px #fff, 0 0 12px rgba(255,255,255,0.5)',
        left: `${Math.random() * 60 + 10}%`,
        top: `${Math.random() * 30}%`,
      }}
      animate={{
        x: [0, 300],
        y: [0, 300],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 1.5,
        delay: Math.random() * 10,
        repeat: Infinity,
        repeatDelay: Math.random() * 15 + 5,
        ease: 'easeIn',
      }}
    >
      <div
        className="absolute"
        style={{
          width: 60,
          height: 1,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.6), transparent)',
          transform: 'rotate(-45deg)',
          transformOrigin: 'right center',
          right: 0,
        }}
      />
    </motion.div>
  )
}

export function NavigationButtons({ onPrev, onNext, prevLabel = 'Back', nextLabel = 'Continue' }) {
  return (
    <motion.div
      className="flex gap-4 items-center justify-center mt-8 flex-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {onPrev && (
        <button className="btn-secondary" onClick={onPrev}>
          <span>←</span>
          <span>{prevLabel}</span>
        </button>
      )}
      {onNext && (
        <button className="btn-primary" onClick={onNext}>
          <span>{nextLabel}</span>
          <span>→</span>
        </button>
      )}
    </motion.div>
  )
}
