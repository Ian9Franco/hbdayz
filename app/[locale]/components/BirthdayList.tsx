import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Birthday } from '../page'
import { useState, useRef, useEffect } from 'react'
import { calculateCurrentAge, calculateNextAge } from '../utils/calculations'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface BirthdayListProps {
  birthdays: Birthday[]
  onSelectBirthday: (birthday: Birthday) => void
}

export default function BirthdayList({ birthdays, onSelectBirthday }: BirthdayListProps) {
  const t = useTranslations('BirthdayList')
  const monthT = useTranslations('months')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Organiza los cumpleaños por mes
  const birthdaysByMonth = months.map(month => ({
    month,
    birthdays: birthdays.filter(b => new Date(b.date).getMonth() === months.indexOf(month))
  }))

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const nextMonth = (currentMonth + 1) % 12;

  // Filtra los cumpleaños próximos (este mes y el siguiente)
  const upcomingBirthdays = birthdays.filter(birthday => {
    const birthMonth = new Date(birthday.date).getMonth();
    return birthMonth === currentMonth || birthMonth === nextMonth;
  });

  // Efecto para cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedMonth(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Función para obtener el nombre completo del mes
  const getFullMonthName = (monthAbbr: string) => {
    const date = new Date(Date.parse(`${monthAbbr} 1, 2000`))
    return date.toLocaleString('default', { month: 'long' })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Barra de meses */}
      <motion.div 
        className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {birthdaysByMonth.map((monthData, index) => (
          <motion.div 
            key={monthData.month} 
            className={`flex flex-col items-center ${index === currentMonth ? 'shadow-md rounded-lg p-2' : ''}`}
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-xs font-medium mb-2 ${index === currentMonth ? 'text-accent' : 'text-foreground/70'}`}>
              {monthT(monthData.month)}
            </span>
            <div className="flex -space-x-2">
              {monthData.birthdays.slice(0, 3).map((birthday) => (
                <motion.div
                  key={birthday.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  onClick={() => onSelectBirthday(birthday)}
                >
                  <Image
                    src={`/userlogo/${birthday.gender}.png`}
                    alt={t('avatarAlt', { name: birthday.name })}
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-background shadow-md cursor-pointer"
                  />
                </motion.div>
              ))}
              {monthData.birthdays.length > 3 && (
                <motion.div 
                  className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs font-medium text-secondary-foreground shadow-md cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setSelectedMonth(monthData.month)}
                >
                  +{monthData.birthdays.length - 3}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Sección de próximos cumpleaños */}
      <motion.h2 
        className="text-xl font-semibold text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {t('upcoming')}
      </motion.h2>
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {upcomingBirthdays.map((birthday, index) => (
          <motion.div
            key={birthday.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 bg-card p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all duration-300"
            onClick={() => onSelectBirthday(birthday)}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src={`/userlogo/${birthday.gender}.png`}
              alt={t('avatarAlt', { name: birthday.name })}
              width={48}
              height={48}
              className="rounded-full shadow-sm"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-foreground">{birthday.name}</h3>
              <p className="text-sm text-foreground/70">{birthday.date}</p>
            </div>
            {/* Mostramos la edad actual */}
            <div className="text-lg font-bold text-accent">
              {t('age', { age: calculateCurrentAge(`${birthday.date} ${birthday.birthYear}`) })}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal para mostrar todos los cumpleaños de un mes */}
      <AnimatePresence>
        {selectedMonth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedMonth(null)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-6 rounded-lg shadow-lg max-w-sm w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                {t('birthdaysIn', { month: getFullMonthName(selectedMonth) })}
              </h3>
              <div className="space-y-2">
                {birthdaysByMonth.find(m => m.month === selectedMonth)?.birthdays.map((birthday) => (
                  <motion.div
                    key={birthday.id}
                    className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md transition-colors duration-200"
                    onClick={() => {
                      onSelectBirthday(birthday)
                      setSelectedMonth(null)
                    }}
                  >
                    <Image
                      src={`/userlogo/${birthday.gender}.png`}
                      alt={t('avatarAlt', { name: birthday.name })}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{birthday.name}</span>
                    {/* Mostramos la edad actual */}
                    <span className="text-accent font-semibold">
                      {t('age', { age: calculateCurrentAge(`${birthday.date} ${birthday.birthYear}`) })}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}