import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlowingOrb, Sparkles, NavigationButtons } from '../components/SharedEffects'

const memories = [
  {
    title: 'The First Glance',
    text: 'The moment I first saw you, something changed forever. Time stood still, and I knew you were different.',
    emoji: '👀',
    image: '/photo/image1.jpg',
    note: 'Our very first memory together',
    color: '#ff2d75',
  },
  {
    title: 'Our First Conversation',
    text: 'That nervous hello turned into hours of talking. Every word felt like discovering a new universe.',
    emoji: '💬',
    image: '/photo/image2.jpg',
    note: 'The conversation that started everything',
    color: '#a855f7',
  },
  {
    title: 'The First Smile',
    text: 'Your smile that day — I still carry it in my heart. It was like the sunrise after a long dark night.',
    emoji: '😊',
    image: '/photo/image3.jpg',
    note: 'A smile I can never forget',
    color: '#f5c842',
  },
  {
    title: 'Our First Laugh Together',
    text: 'That moment we couldn’t stop laughing — I knew this was something real, something beautiful.',
    emoji: '😂',
    image: '/photo/image4.jpg',
    note: 'Our happiest silly moment',
    color: '#3b82f6',
  },
  {
    title: 'When I Knew',
    text: 'There was a quiet moment when I realized — you weren’t just someone in my life, you were becoming my life.',
    emoji: '💖',
    image: '/photo/image5.jpg',
    note: 'The moment I realized your value',
    color: '#ff6b9d',
  },
  {
    title: 'Forever Us',
    text: 'Every memory with you feels magical. And this story is only getting more beautiful with time.',
    emoji: '✨',
    image: '/photo/image6.jpg',
    note: 'A memory for forever',
    color: '#8b5cf6',
  },
]

function TimelineCard({ memory, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-between gap-8 md:gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Timeline connector dot */}
      <motion.div
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10 items-center justify-center"
        style={{
          background: memory.color,
          boxShadow: `0 0 20px ${memory.color}60`,
        }}
        animate={isInView ? { scale: [0, 1.3, 1] } : {}}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      {/* Photo placeholder */}
      <motion.div
        className={`w-full md:w-5/12 flex justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}
        whileHover={{ scale: 1.02 }}
      >
        <div className="polaroid inline-block">
          <div
            className="w-full max-w-sm h-48 md:h-52 rounded flex items-center justify-center relative overflow-hidden mx-auto"
            style={{
              background: `linear-gradient(135deg, ${memory.color}15, ${memory.color}05)`,
              border: `1px dashed ${memory.color}30`,
            }}
          >
            <img
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-cover rounded"
            />

            {/* Sparkle on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at center, ${memory.color}10 0%, transparent 70%)`,
              }}
            />
          </div>
          <p className="text-xs text-white/30 mt-3 font-dancing text-center italic">
            {memory.note}
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className={`w-full md:w-5/12 flex flex-col justify-center ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} text-center`}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span
          className="text-xs font-outfit uppercase tracking-widest mb-2 block"
          style={{ color: `${memory.color}80` }}
        >
          {memory.date}
        </span>
        <h3
          className="font-playfair text-xl md:text-2xl font-bold mb-3"
          style={{
            background: `linear-gradient(135deg, ${memory.color}, #fff)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {memory.title}
        </h3>
        <p className="text-sm md:text-base font-outfit font-light leading-relaxed text-white/60">
          {memory.text}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function OurStory({ onNext, onPrev }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden px-4 py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <GlowingOrb color="#ff2d75" size={400} x="10%" y="20%" />
        <GlowingOrb color="#a855f7" size={350} x="90%" y="60%" delay={1} />
      </div>
      <Sparkles count={25} />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="w-full flex flex-col items-center text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-3xl mb-4 block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📖
          </motion.span>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold gradient-text-pink mb-4">
            Our Beautiful Story
          </h2>
          <p className="font-outfit text-white/40 text-sm md:text-base max-w-md mx-auto">
            Every great love story has a beginning. Here's ours.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px]">
            <motion.div
              className="w-full h-full"
              style={{
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, transparent, rgba(255,45,117,0.3), rgba(168,85,247,0.3), transparent)',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </div>

          {/* Memory cards */}
          <div className="space-y-16 md:space-y-24">
            {memories.map((memory, i) => (
              <TimelineCard key={i} memory={memory} index={i} />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <NavigationButtons onPrev={onPrev} onNext={onNext} nextLabel="Why I Love You" />
      </div>
    </div>
  )
}
