'use client'

import { useSpring, animated, config } from 'react-spring'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

const Particle = ({ delay }: { delay: number }) => {
  const props = useSpring({
    from: { opacity: 0, scale: 0, x: 0, y: 0 },
    to: async (next) => {
      await next({ opacity: 1, scale: 1, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 })
      await next({ opacity: 0, scale: 0 })
    },
    config: config.gentle,
    delay,
  })

  return <animated.div className="absolute w-2 h-2 bg-primary rounded-full" style={props} />
}

export default function Preloader() {
  const [showParticles, setShowParticles] = useState(true)
  const [playStart] = useSound('/sounds/start.mp3')
  const [playEnd] = useSound('/sounds/end.mp3')

  const spinnerProps = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    loop: true,
    config: { duration: 2000 },
  })

  useEffect(() => {
    playStart()
    const timer = setTimeout(() => setShowParticles(false), 1500)
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
    <animated.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      style={useSpring({ opacity: 1, from: { opacity: 0 } })}
    >
      <animated.div className="relative w-20 h-20" style={spinnerProps}>
        {[0, 1, 2].map((index) => (
          <animated.span
            key={index}
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-primary rounded-full"
            style={{
              transform: `rotate(${index * 120}deg)`,
              opacity: 1 - index * 0.3,
            }}
          />
        ))}
      </animated.div>
      {showParticles && (
        <>
          {[...Array(10)].map((_, i) => (
            <Particle key={i} delay={i * 100} />
          ))}
        </>
      )}
    </animated.div>
  )
}