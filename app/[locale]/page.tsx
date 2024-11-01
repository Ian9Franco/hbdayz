'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from 'use-sound'
import Header from './components/Header'
import BirthdayList from './components/BirthdayList'
import Calendar from './components/Calendar'
import BirthdayDetail from './components/BirthdayDetail'
import Preloader from './components/Preloader'
import Login from './components/Login'
import ToggleMenu from './components/toggleMenu'
import WitchesSection from './components/witches/WitchesSection'

// Interfaz para el objeto Birthday
export interface Birthday {
  id: string
  name: string
  date: string
  birthYear: number
  gender: 'male' | 'female'
  age: number
  birthTime: string
  birthPlace: string
}
// Datos de ejemplo para los cumpleaños
const birthdays: Birthday[] = [
  { 
    id: '1', 
    name: 'Mazi', 
    date: 'Nov 23', 
    birthYear: 1998, 
    gender: 'male', 
    age: 25, 
    birthTime: '00:00', 
    birthPlace: 'Entre Ríos, Argentina' 
  },
  // Nuevos cumpleaños
  { 
    id: '2', 
    name: 'AzuzaCooper', 
    date: 'Jul 16', 
    birthYear: 1999, 
    gender: 'male', 
    age: 25, 
    birthTime: '06:00', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '3', 
    name: 'Izang', 
    date: 'Nov 5', 
    birthYear: 2003, 
    gender: 'male', 
    age: 20, 
    birthTime: '20:03', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  // Octubre
  { 
    id: '5', 
    name: 'Domizo', 
    date: 'May 7', 
    birthYear: 2001, 
    gender: 'female', 
    age: 23, 
    birthTime: '11:30', 
    birthPlace: 'Salta, Argentina' 
  },
  { 
    id: '6', 
    name: 'Aldana Skvor', 
    date: 'Oct 11', 
    birthYear: 2000, 
    gender: 'female', 
    age: 24, 
    birthTime: '19:50', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '7', 
    name: 'Jaz', 
    date: 'Oct 19', 
    birthYear: 2000, 
    gender: 'female', 
    age: 24, 
    birthTime: '19:19', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '8', 
    name: 'Ian', 
    date: 'May 26', 
    birthYear: 1999, 
    gender: 'male', 
    age: 25, 
    birthTime: '10:30', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '9', 
    name: 'Andrea', 
    date: 'Oct 9', 
    birthYear: 1998, 
    gender: 'female', 
    age: 25, 
    birthTime: '14:08', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '10', 
    name: 'Lionel Messi', 
    date: 'Jun 24', 
    birthYear: 1987, 
    gender: 'male', 
    age: 36, 
    birthTime: '09:30', 
    birthPlace: 'Rosario, Argentina' 
  },
  { 
    id: '11', 
    name: 'Cristiano Ronaldo', 
    date: 'Feb 5', 
    birthYear: 1985, 
    gender: 'male', 
    age: 39, 
    birthTime: '18:30', 
    birthPlace: 'Funchal, Madeira, Portugal' 
  },
]

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const [view, setView] = useState<'list' | 'calendar' | 'witches'>('list')
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const t = useTranslations('Index')
  const [playViewChange] = useSound('/sounds/view-change.mp3')
  const [playSelect] = useSound('/sounds/select.mp3')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSelectBirthday = (birthday: Birthday) => {
    setSelectedBirthday(birthday)
    playSelect()
  }

  const handleCloseBirthdayDetail = () => {
    setSelectedBirthday(null)
    playSelect()
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    playSelect()
  }

  const handleViewChange = (newView: 'list' | 'calendar' | 'witches') => {
    setView(newView)
    playViewChange()
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
        {!isLoading && !isLoggedIn && <Login onLoginSuccess={handleLoginSuccess} currentLocale={locale} />}
      </AnimatePresence>
      {!isLoading && isLoggedIn && (
        // Contenedor principal con efecto de sombra 3D
        <div className={`px-4 py-8 ${view === 'witches' ? 'max-w-[1600px]' : 'max-w-3xl'} mx-auto rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)]`}>
          {/* Comentario: Encabezado */}
          <Header title={t('title')} view={view} setView={handleViewChange} />
          <AnimatePresence mode="wait">
            <motion.main
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-lg mt-4"
            >
              {view === 'list' ? (
                // Comentario: Lista de cumpleaños
                <BirthdayList birthdays={birthdays} onSelectBirthday={handleSelectBirthday} />
              ) : view === 'calendar' ? (
                // Comentario: Calendario
                <Calendar birthdays={birthdays} onSelectBirthday={handleSelectBirthday} />
              ) : (
                // Comentario: Sección de brujas
                <WitchesSection birthdays={birthdays} currentLocale={locale} />
              )}
            </motion.main>
          </AnimatePresence>
          {selectedBirthday && (
            // Comentario: Detalle de cumpleaños
            <BirthdayDetail birthday={selectedBirthday} onClose={handleCloseBirthdayDetail} />
          )}
        </div>
      )}
      {/* Comentario: Menú de alternancia */}
      <ToggleMenu currentLocale={locale} />
    </>
  )
}