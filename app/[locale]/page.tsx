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

// Interfaz para el objeto Birthday
export interface Birthday {
  id: string
  name: string
  date: string
  birthYear: number
  gender: 'male' | 'female'
  age: number 
}

// Datos de ejemplo para los cumpleaños
const birthdays: Birthday[] = [
  { id: '1', name: 'Leonel Ngoya', date: 'Jan 12', birthYear: 2003, gender: 'male', age: 20 },
  { id: '2', name: 'Xavier Vidal', date: 'Nov 3', birthYear: 2001, gender: 'male', age: 22 },
  { id: '3', name: 'Hugo Roche', date: 'Jun 18', birthYear: 2001, gender: 'male', age: 22 },
  { id: '4', name: 'Gina Lemoine', date: 'Mar 29', birthYear: 2002, gender: 'female', age: 21 },
  
  // Nuevos cumpleaños para completar los meses
  { id: '5', name: 'Carlos Peralta', date: 'Feb 11', birthYear: 1995, gender: 'male', age: 29 },
  { id: '6', name: 'Ana Méndez', date: 'Apr 22', birthYear: 1998, gender: 'female', age: 26 },
  { id: '7', name: 'Luisa Gómez', date: 'Jul 10', birthYear: 2004, gender: 'female', age: 20 },
  { id: '8', name: 'Manuel Rojas', date: 'Aug 8', birthYear: 2000, gender: 'male', age: 24 },
  { id: '9', name: 'Fernando Díaz', date: 'Sep 1', birthYear: 1997, gender: 'male', age: 27 },
  
  // Octubre (4 personas)
  { id: '10', name: 'María Fernández', date: 'Oct 3', birthYear: 1999, gender: 'female', age: 25 },
  { id: '11', name: 'Pedro Sánchez', date: 'Oct 15', birthYear: 1996, gender: 'male', age: 28 },
  { id: '12', name: 'Lucía Ortega', date: 'Oct 25', birthYear: 2002, gender: 'female', age: 22 },
  { id: '13', name: 'Jorge Salinas', date: 'Oct 30', birthYear: 2005, gender: 'male', age: 19 },

  // Noviembre (6 personas)
  { id: '14', name: 'Roberto Castillo', date: 'Nov 7', birthYear: 1998, gender: 'male', age: 26 },
  { id: '15', name: 'Sofía Ramírez', date: 'Nov 12', birthYear: 2001, gender: 'female', age: 22 },
  { id: '16', name: 'Elena Morales', date: 'Nov 20', birthYear: 1994, gender: 'female', age: 30 },
  { id: '17', name: 'Diego Torres', date: 'Nov 24', birthYear: 2003, gender: 'male', age: 21 },
  { id: '18', name: 'Carmen Silva', date: 'Nov 27', birthYear: 1992, gender: 'female', age: 32 },
  { id: '19', name: 'Adriana Cruz', date: 'Nov 30', birthYear: 1999, gender: 'female', age: 25 },

  { id: '20', name: 'Sebastián Pérez', date: 'Dec 23', birthYear: 2001, gender: 'male', age: 22 },
];


export default function Page({ params: { locale } }: { params: { locale: string } }) {
  // Estado para la vista actual (lista o calendario)
  const [view, setView] = useState<'list' | 'calendar'>('list')
  // Estado para el cumpleaños seleccionado
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(null)
  // Obtener las  traducciones
  const t = useTranslations('Index')
  // Estado para la carga
  const [isLoading, setIsLoading] = useState(true)
  // Estado para el inicio de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Sonidos para interacciones
  const [playViewChange] = useSound('/sounds/view-change.mp3')
  const [playSelect] = useSound('/sounds/select.mp3')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Función para manejar la selección de un cumpleaños
  const handleSelectBirthday = (birthday: Birthday) => {
    setSelectedBirthday(birthday)
    playSelect()
  }

  // Función para cerrar el detalle del cumpleaños
  const handleCloseBirthdayDetail = () => {
    setSelectedBirthday(null)
    playSelect()
  }

  // Función para manejar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    playSelect()
  }

  // Función para cambiar la vista
  const handleViewChange = (newView: 'list' | 'calendar') => {
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
              ) : (
                <Calendar birthdays={birthdays} onSelectBirthday={handleSelectBirthday} />
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