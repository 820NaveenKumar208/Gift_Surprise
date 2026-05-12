import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { GlowingOrb, Sparkles, FloatingHearts, NavigationButtons } from '../components/SharedEffects'

const galleryPhotos = [
  { id: 1, caption: 'Our first adventure together', emoji: '🌅', height: 'h-56 md:h-64' },
  { id: 2, caption: 'That perfect evening', emoji: '🌙', height: 'h-48 md:h-56' },
  { id: 3, caption: 'Your beautiful smile', emoji: '😊', height: 'h-64 md:h-72' },
  { id: 4, caption: 'Dancing in the rain', emoji: '🌧️', height: 'h-52 md:h-60' },
  { id: 5, caption: 'Our favorite spot', emoji: '📍', height: 'h-56 md:h-64' },
  { id: 6, caption: 'Late night talks', emoji: '🌃', height: 'h-48 md:h-56' },
  { id: 7, caption: 'That surprise birthday', emoji: '🎂', height: 'h-60 md:h-68' },
  { id: 8, caption: 'Sunday morning vibes', emoji: '☀️', height: 'h-52 md:h-60' },
  { id: 9, caption: 'Our food adventures', emoji: '🍕', height: 'h-56 md:h-64' },
]

const gradients = [
  'from-pink-900/30 to-purple-900/30',
  'from-purple-900/30 to-blue-900/30',
  'from-blue-900/30 to-cyan-900/30',
  'from-amber-900/20 to-pink-900/30',
  'from-rose-900/30 to-purple-900/30',
]

function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer h-full"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={() => onClick(photo)}
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        }}
      />

      <div className={`relative ${photo.height} rounded-2xl overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]} border border-white/5`}>
        {/* Photo placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl md:text-5xl mb-3 group-hover:scale-125 transition-transform duration-500">
            {photo.emoji}
          </span>
          <p className="text-xs text-white/20 font-outfit px-4 text-center">
            📸 Upload your memory
          </p>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-4"
        >
          <div>
            <p className="font-outfit text-sm text-white/90 font-medium">{photo.caption}</p>
            <p className="text-xs text-white/40 mt-1 font-dancing">Click to view</p>
          </div>
        </motion.div>

        {/* Sparkle effect on hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.span
            className="text-yellow-300/60 text-lg"
            animate={{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✦
          </motion.span>
        </div>

        {/* Glow border on hover */}
        <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255,45,117,0.2), rgba(168,85,247,0.2))',
            filter: 'blur(4px)',
            zIndex: -1,
          }}
        />
      </div>
    </motion.div>
  )
}

function PhotoModal({ photo, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-lg"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating hearts around modal */}
        <FloatingHearts count={8} />

        <div className="glass p-6 md:p-8 rounded-3xl text-center">
          {/* Photo placeholder */}
          <motion.div
            className="h-64 md:h-80 rounded-xl bg-gradient-to-br from-pink-900/20 to-purple-900/20 flex items-center justify-center mb-6 border border-white/5 overflow-hidden"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-6xl">{photo.emoji}</span>
          </motion.div>

          {/* Caption */}
          <h3 className="font-playfair text-xl md:text-2xl gradient-text-pink font-bold mb-2">
            {photo.caption}
          </h3>
          <p className="font-dancing text-white/40 text-sm">
            Every moment is a masterpiece with you 💕
          </p>

          <button
            className="btn-secondary mt-6"
            onClick={onClose}
          >
            Close Memory
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MemoryGallery({ onNext, onPrev }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowingOrb color="#ff2d75" size={400} x="15%" y="25%" />
        <GlowingOrb color="#a855f7" size={350} x="85%" y="70%" delay={1} />
        <GlowingOrb color="#3b82f6" size={300} x="50%" y="50%" delay={2} />
      </div>
      <Sparkles count={10} />

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
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📸
          </motion.span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold gradient-text-purple mb-4">
            Our Beautiful Moments
          </h2>
          <p className="font-outfit text-white/40 text-sm md:text-base max-w-md mx-auto">
            Every photo tells a story. Every story is ours.
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
          {galleryPhotos.map((photo, i) => (
            <div key={photo.id} className="mb-4 md:mb-6 break-inside-avoid">
              <PhotoCard
                photo={photo}
                index={i}
                onClick={setSelectedPhoto}
              />
            </div>
          ))}
        </div>

        {/* Upload hint */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-white/20 text-xs font-outfit">
            ✨ Replace placeholders with your real couple photos ✨
          </p>
        </motion.div>

        {/* Navigation */}
        <NavigationButtons onPrev={onPrev} onNext={onNext} nextLabel="Our Promises" />
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
