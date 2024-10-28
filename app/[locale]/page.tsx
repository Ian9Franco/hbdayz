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
    name: 'Mazi', 
    date: 'Nov 23', 
    birthYear: 1998, 
    gender: 'male', 
    age: 25, 
    birthTime: '00:00', 
    birthPlace: 'Entre Ríos, Argentina' 
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
    name: 'AzuzaCooper', 
    date: 'Jul 16', 
    birthYear: 1999, 
    gender: 'male', 
    age: 25, 
    birthTime: '06:00', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '6', 
    name: 'Izang', 
    date: 'Nov 5', 
    birthYear: 2003, 
    gender: 'male', 
    age: 20, 
    birthTime: '20:03', 
    birthPlace: 'Buenos Aires, Argentina' 
  },
  { 
    id: '7', 
    name: 'Pacheco', 
    date: 'Dec 9', 
    birthYear: 1998, 
    gender: 'male', 
    age: 25, 
    birthTime: '15:25', 
    birthPlace: 'Buenos Aires, Argentina' 
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
    date: 'Dec 3', 
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
  { 
    id: '15', 
    name: 'Lionel Messi', 
    date: 'Jun 24', 
    birthYear: 1987, 
    gender: 'male', 
    age: 36, 
    birthTime: '09:30', 
    birthPlace: 'Rosario, Argentina' 
  },
  { 
    id: '16', 
    name: 'Cristiano Ronaldo', 
    date: 'Feb 5', 
    birthYear: 1985, 
    gender: 'male', 
    age: 39, 
    birthTime: '18:30', 
    birthPlace: 'Funchal, Madeira, Portugal' 
  },
  { 
    id: '17', 
    name: 'Sergio Ramos', 
    date: 'Mar 30', 
    birthYear: 1986, 
    gender: 'male', 
    age: 37, 
    birthTime: '10:30', 
    birthPlace: 'Camas, España' 
  },
  { 
    id: '18', 
    name: 'Neymar Jr.', 
    date: 'Feb 5', 
    birthYear: 1992, 
    gender: 'male', 
    age: 32, 
    birthTime: '09:00', 
    birthPlace: 'Mogi das Cruzes, Brasil' 
  },
  { 
    id: '19', 
    name: 'Kylian Mbappé', 
    date: 'Dec 20', 
    birthYear: 1998, 
    gender: 'male', 
    age: 25, 
    birthTime: '10:00', 
    birthPlace: 'Bondy, Francia' 
  },
  { 
    id: '20', 
    name: 'Zlatan Ibrahimović', 
    date: 'Oct 3', 
    birthYear: 1981, 
    gender: 'male', 
    age: 42, 
    birthTime: '00:00', 
    birthPlace: 'Malmö, Suecia' 
  },
  { 
    id: '21', 
    name: 'Andrés Iniesta', 
    date: 'May 11', 
    birthYear: 1984, 
    gender: 'male', 
    age: 40, 
    birthTime: '20:00', 
    birthPlace: 'Fuentealbilla, España' 
  },
  { 
    id: '22', 
    name: 'LeBron James', 
    date: 'Dec 30', 
    birthYear: 1984, 
    gender: 'male', 
    age: 39, 
    birthTime: '18:00', 
    birthPlace: 'Akron, Ohio, EE. UU.' 
  },
  { 
    id: '23', 
    name: 'Stephen Curry', 
    date: 'Mar 14', 
    birthYear: 1988, 
    gender: 'male', 
    age: 36, 
    birthTime: '01:30', 
    birthPlace: 'Akron, Ohio, EE. UU.' 
  },
  { 
    id: '24', 
    name: 'Kevin Durant', 
    date: 'Sept 29', 
    birthYear: 1988, 
    gender: 'male', 
    age: 36, 
    birthTime: '10:00', 
    birthPlace: 'Washington, D.C., EE. UU.' 
  },
  { 
    id: '25', 
    name: 'Gareth Bale', 
    date: 'Jul 16', 
    birthYear: 1989, 
    gender: 'male', 
    age: 34, 
    birthTime: '00:00', 
    birthPlace: 'Cardiff, Gales' 
},
{ 
  id: '26', 
  name: 'Klay Thompson', 
  date: 'Feb 8', 
  birthYear: 1990, 
  gender: 'male', 
  age: 34, 
  birthTime: '00:00', 
  birthPlace: 'Los Ángeles, California, EE. UU.' 
},
{
  id: '27',
  name: 'Roberto Carlos',
  date: 'Apr 10',
  birthYear: 1973,
  gender: 'male',
  age: 51,
  birthTime: '00:00',
  birthPlace: 'Rio de Janeiro, Brasil'
}
  // Agrega más datos según sea necesario...
]

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  // Estados para manejar la vista, el cumpleaños seleccionado, carga y autenticación
  const [view, setView] = useState<'list' | 'calendar' | 'witches'>('list')
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Hooks para traducciones y sonidos
  const t = useTranslations('Index')
  const [playViewChange] = useSound('/sounds/view-change.mp3')
  const [playSelect] = useSound('/sounds/select.mp3')

  // Efecto para simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Manejadores de eventos
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
                <WitchesSection birthdays={birthdays} currentLocale={locale} />
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