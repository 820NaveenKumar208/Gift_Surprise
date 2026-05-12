import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import CursorGlow from './components/CursorGlow'
import ParticleBackground from './components/ParticleBackground'
import MusicToggle from './components/MusicToggle'
import PageIndicator from './components/PageIndicator'
import LoginPage from './pages/LoginPage'
import BirthdayIntro from './pages/BirthdayIntro'
import OurStory from './pages/OurStory'
import ReasonsLove from './pages/ReasonsLove'
import MemoryGallery from './pages/MemoryGallery'
import FuturePromise from './pages/FuturePromise'
import FinalPage from './pages/FinalPage'

const PAGE_NAMES = [
  'Login', 'Birthday', 'Our Story', 'Reasons', 'Gallery', 'Promises', 'Forever'
]

// Music controller — place your MP3 at /public/music.mp3
function useMusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Try to load background music — gracefully degrades if file not found
    const audio = new Audio('/music.mp3')
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // Music file not found or autoplay blocked — that's fine
        setIsPlaying(false)
      })
    }
  }, [isPlaying])

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [])

  return { isPlaying, toggle, start }
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef(null)
  const music = useMusicPlayer()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!loggedIn || currentPage === 0) return
      if (e.key === 'ArrowRight' && currentPage < 6) {
        setDirection(1)
        setCurrentPage(prev => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentPage > 1) {
        setDirection(-1)
        setCurrentPage(prev => prev - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [loggedIn, currentPage])

  const navigateTo = useCallback((pageIndex) => {
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)
  }, [currentPage])

  const goNext = useCallback(() => {
    if (currentPage < 6) {
      setDirection(1)
      setCurrentPage(prev => prev + 1)
    }
  }, [currentPage])

  const goPrev = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1)
      setCurrentPage(prev => prev - 1)
    }
  }, [currentPage])

  const handleLogin = useCallback(() => {
    setLoggedIn(true)
    music.start()
    setTimeout(() => {
      setDirection(1)
      setCurrentPage(1)
    }, 100)
  }, [music])

  const pageVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir > 0 ? 60 : -60,
      scale: 0.97,
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir > 0 ? -60 : 60,
      scale: 0.97,
    }),
  }

  const pages = [
    <LoginPage key="login" onLogin={handleLogin} />,
    <BirthdayIntro key="birthday" onNext={goNext} />,
    <OurStory key="story" onNext={goNext} onPrev={goPrev} />,
    <ReasonsLove key="reasons" onNext={goNext} onPrev={goPrev} />,
    <MemoryGallery key="gallery" onNext={goNext} onPrev={goPrev} />,
    <FuturePromise key="promise" onNext={goNext} onPrev={goPrev} />,
    <FinalPage key="final" onPrev={goPrev} />,
  ]

  if (loading) return <LoadingScreen />

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      <CursorGlow />
      <ParticleBackground />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="min-h-screen w-full flex flex-col"
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      {loggedIn && currentPage > 0 && (
        <PageIndicator
          total={7}
          current={currentPage}
          names={PAGE_NAMES}
          onNavigate={navigateTo}
        />
      )}

      {loggedIn && (
        <MusicToggle
          playing={music.isPlaying}
          onToggle={music.toggle}
        />
      )}
    </div>
  )
}

