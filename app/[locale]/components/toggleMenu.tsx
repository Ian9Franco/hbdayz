'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

interface ToggleMenuProps {
  currentLocale: string
}

export default function ToggleMenu({ currentLocale }: ToggleMenuProps) {
  const [active, setActive] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'es' : 'en'
    router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`))
  }

  const toggles = [
    {
      icon: <Globe className="w-6 h-6" />,
      onClick: toggleLanguage,
      active: currentLocale === 'en'
    },
    {
      icon: theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />,
      onClick: () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        setActive(false)
      },
      active: theme === 'dark'
    }
  ]

  return (
    <motion.div 
      className="fixed bottom-8 right-8 flex items-center justify-center z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center justify-center relative">
        <motion.button
          className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setActive(!active)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: active ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.button>
        <AnimatePresence>
          {active && toggles.map((toggle, index) => (
            <motion.button
              key={index}
              className="absolute w-12 h-12 bg-card text-card-foreground rounded-full flex items-center justify-center shadow-md"
              onClick={toggle.onClick}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: index * 0.1,
              }}
              style={{
                top: `-${(index + 1) * 60}px`,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {toggle.icon}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// Mejoramos la animación del botón principal con una rotación suave
// Implementamos una aparición escalonada de los botones de alternancia
// Añadimos efectos de escala al pasar el mouse y al hacer clic para mayor interactividad
// Utilizamos AnimatePresence para manejar las animaciones de entrada y salida de los botones