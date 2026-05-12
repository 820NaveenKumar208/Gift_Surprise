import { motion } from 'framer-motion'

export default function MusicToggle({ playing, onToggle }) {
  return (
    <motion.button
      className="music-toggle"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={playing ? 'Pause Music' : 'Play Music'}
    >
      <div className={`music-bars ${playing ? 'music-playing' : 'music-paused'}`}>
        <div className="music-bar" />
        <div className="music-bar" />
        <div className="music-bar" />
        <div className="music-bar" />
      </div>
    </motion.button>
  )
}
