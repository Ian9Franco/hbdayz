'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

// Componente de partícula
const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-primary rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }}
    transition={{ duration: 1, delay, ease: "easeInOut" }}
  />
)

export default function Preloader() {
  const [showParticles, setShowParticles] = useState(true)
  const [playStart] = useSound('/sounds/start.mp3') // Sonido al iniciar el preloader
  const [playEnd] = useSound('/sounds/end.mp3') // Sonido al finalizar el preloader

  useEffect(() => {
    // Reproducir sonido al iniciar
    playStart()

    // Ocultar partículas después de 1.5 segundos
    const timer = setTimeout(() => setShowParticles(false), 1500)

    // Mostrar partículas nuevamente antes de que termine el preloader
    const endTimer = setTimeout(() => {
      setShowParticles(true)
      playEnd()
    }, 3500)

    return () => {
      clearTimeout(timer)
      clearTimeout(endTimer)
    }
  }, [playStart, playEnd])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-20 h-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full"
            style={{ 
              transform: `rotate(${index * 120}deg)`,
              opacity: 1 - index * 0.3
            }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'linear',
              delay: index * 0.2
            }}
          />
        ))}
      </motion.div>
      {showParticles && (
        <>
          {[...Array(10)].map((_, i) => (
            <Particle key={i} delay={i * 0.1} />
          ))}
        </>
      )}
    </motion.div>
  )
}