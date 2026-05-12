import { motion } from 'framer-motion'

export default function PageIndicator({ total, current, names, onNavigate }) {
  return (
    <motion.div
      className="page-indicator"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {Array.from({ length: total }, (_, i) => (
        <motion.button
          key={i}
          className={`page-dot ${i === current ? 'active' : ''}`}
          onClick={() => onNavigate(i)}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.8 }}
          title={names[i]}
        />
      ))}
    </motion.div>
  )
}
