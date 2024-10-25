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
import WitchesSection from './components/WitchesSection'

// Interfaz para el objeto Birthday
export interface Birthday {
  id: string
  name: string
  date: string
  birthYear: number
  gender: 'male' | 'female'
  age: number
  birthTime: string // Nueva propiedad para la hora de nacimiento
  birthPlace: string // Nueva propiedad para el lugar de nacimiento
}
// Datos de ejemplo para los cumpleaños
const birthdays: Birthday[] = [
  { 
    id: '1', 
    name: 'Leonel Ngoya', 
    date: 'Jan 12', 
    birthYear: 2003, 
    gender: 'male', 
    age: 20, 
    birthTime: '14:30', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '2', 
    name: 'Xavier Vidal', 
    date: 'Nov 3', 
    birthYear: 1999, 
    gender: 'male', 
    age: 50, 
    birthTime: '09:15', 
    birthPlace: 'Madrid, España' 
  },
  { 
    id: '3', 
    name: 'Hugo Roche', 
    date: 'Jun 18', 
    birthYear: 2001, 
    gender: 'male', 
    age: 22, 
    birthTime: '23:45', 
    birthPlace: 'París, Francia' 
  },
  { 
    id: '4', 
    name: 'Gina Lemoine', 
    date: 'Mar 29', 
    birthYear: 2002, 
    gender: 'female', 
    age: 21, 
    birthTime: '04:10', 
    birthPlace: 'Lima, Perú' 
  },
  // Nuevos cumpleaños
  { 
    id: '5', 
    name: 'Carlos Peralta', 
    date: 'Feb 11', 
    birthYear: 1995, 
    gender: 'male', 
    age: 29, 
    birthTime: '12:00', 
    birthPlace: 'Ciudad de México, México' 
  },
  { 
    id: '6', 
    name: 'Ana Méndez', 
    date: 'Apr 22', 
    birthYear: 1998, 
    gender: 'female', 
    age: 26, 
    birthTime: '08:45', 
    birthPlace: 'Bogotá, Colombia' 
  },
  { 
    id: '7', 
    name: 'Luisa Gómez', 
    date: 'Jul 10', 
    birthYear: 2004, 
    gender: 'female', 
    age: 20, 
    birthTime: '22:15', 
    birthPlace: 'Quito, Ecuador' 
  },
  { 
    id: '8', 
    name: 'Manuel Rojas', 
    date: 'Aug 8', 
    birthYear: 2000, 
    gender: 'male', 
    age: 24, 
    birthTime: '16:30', 
    birthPlace: 'Santiago, Chile' 
  },
  { 
    id: '9', 
    name: 'Fernando Díaz', 
    date: 'Sep 1', 
    birthYear: 1997, 
    gender: 'male', 
    age: 27, 
    birthTime: '10:00', 
    birthPlace: 'San Juan, Puerto Rico' 
  },
  // Octubre
  { 
    id: '10', 
    name: 'María Fernández', 
    date: 'Oct 3', 
    birthYear: 1999, 
    gender: 'female', 
    age: 25, 
    birthTime: '18:25', 
    birthPlace: 'Barcelona, España' 
  },
  { 
    id: '11', 
    name: 'Pedro Sánchez', 
    date: 'Oct 15', 
    birthYear: 1996, 
    gender: 'male', 
    age: 28, 
    birthTime: '07:50', 
    birthPlace: 'Sevilla, España' 
  },
  { 
    id: '12', 
    name: 'Aldana Skvor', 
    date: 'Oct 11', 
    birthYear: 2000, 
    gender: 'female', 
    age: 24, 
    birthTime: '19:50', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '13', 
    name: 'Jaz Barcos', 
    date: 'Oct 19', 
    birthYear: 2000, 
    gender: 'female', 
    age: 24, 
    birthTime: '19:19', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '14', 
    name: 'Ian Pontorno', 
    date: 'May 26', 
    birthYear: 1999, 
    gender: 'male', 
    age: 25, 
    birthTime: '10:30', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  // Agrega más datos según sea necesario...
]

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const [view, setView] = useState<'list' | 'calendar' | 'witches'>('list')
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(null)
  const t = useTranslations('Index')
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
      <ToggleMenu currentLocale={locale} />
      {!isLoading && isLoggedIn && (
        <div className="space-y-8">
          <Header title={t('title')} view={view} setView={handleViewChange} />
          <AnimatePresence mode="wait">
            <motion.main
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {view === 'list' ? (
                <BirthdayList birthdays={birthdays} onSelectBirthday={handleSelectBirthday} />
              ) : view === 'calendar' ? (
                <Calendar birthdays={birthdays} onSelectBirthday={handleSelectBirthday} />
              ) : (
                <WitchesSection birthdays={birthdays} /> // Pass the birthdays prop here
              )}
            </motion.main>
          </AnimatePresence>
          {selectedBirthday && (
            <BirthdayDetail birthday={selectedBirthday} onClose={handleCloseBirthdayDetail} />
          )}
        </div>
      )}
    </>
  )
}