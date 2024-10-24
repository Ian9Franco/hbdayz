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
    <header className="flex flex-col sm:flex-row justify-between items-center mb-6 px-4 py-3 bg-card rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-foreground mb-4 sm:mb-0">{title}</h1>
      
      {/* Toggle para cambiar entre vista de lista y calendario */}
      <div className="flex items-center bg-muted p-1 rounded-lg">
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
      className={`relative flex items-center justify-center p-2 rounded-md transition-colors duration-200 ${
        active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {icon}
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

// 1. Hemos creado un nuevo componente ToggleButton para mejorar la reutilización y legibilidad del código.
// 2. El toggle ahora utiliza dos botones separados para lista y calendario, lo que mejora la usabilidad.
// 3. Utilizamos Framer Motion para animar suavemente el cambio entre vistas con un efecto de "layout".
// 4. Mejoramos la accesibilidad utilizando aria-label para cada botón.
// 5. El diseño es responsivo, cambiando de columna a fila en pantallas más grandes.
// 6. Utilizamos colores de la paleta de Tailwind para mantener la consistencia con el tema de la aplicación.
// 7. Añadimos un efecto de escala al hacer clic en los botones para una mejor retroalimentación táctil.