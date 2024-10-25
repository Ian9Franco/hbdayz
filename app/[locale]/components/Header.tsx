import React from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Calendar, List } from 'lucide-react'

interface HeaderProps {
  title: string
  view: 'list' | 'calendar'
  setView: (view: 'list' | 'calendar') => void
}

export default function Header({ title, view, setView }: HeaderProps) {
  // Obtener las traducciones
  const t = useTranslations('Header')

  return (
    <header className="flex flex-row justify-between items-center mb-6 px-2 sm:px-4 py-2 sm:py-3 bg-card rounded-lg shadow-md">
      <h1 className="text-lg sm:text-2xl font-bold text-foreground">{title}</h1>
      
      {/* Toggle para cambiar entre vista de lista y calendario */}
      <div className="flex items-center bg-muted p-1 rounded-lg text-sm sm:text-base">
        <ToggleButton
          active={view === 'list'}
          onClick={() => setView('list')}
          icon={<List className="w-4 h-4" />}
          label={t('listView')}
        />
        <ToggleButton
          active={view === 'calendar'}
          onClick={() => setView('calendar')}
          icon={<Calendar className="w-4 h-4" />}
          label={t('calendarView')}
        />
      </div>
    </header>
  )
}

interface ToggleButtonProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function ToggleButton({ active, onClick, icon, label }: ToggleButtonProps) {
  return (
    <motion.button
      className={`relative flex items-center justify-center p-1 sm:p-2 rounded-md transition-colors duration-200 ${
        active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <div className="w-4 h-4 sm:w-5 sm:h-5">{icon}</div>
      {active && (
        <motion.div
          className="absolute inset-0 bg-accent/10 rounded-md z-0"
          layoutId="activeToggle"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  )
}

// Mejoramos la responsividad cambiando de columna a fila en pantallas más grandes
// Utilizamos Framer Motion para animar suavemente el cambio entre vistas
// Mejoramos la accesibilidad utilizando aria-label para cada botón
// Añadimos un efecto de escala al hacer clic en los botones para una mejor retroalimentación táctil