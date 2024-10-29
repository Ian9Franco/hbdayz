import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Birthday } from '../page'
import { useState, useRef, useEffect } from 'react'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface CalendarProps {
  birthdays: Birthday[]
  onSelectBirthday: (birthday: Birthday) => void
}

export default function Calendar({ birthdays, onSelectBirthday }: CalendarProps) {
  const t = useTranslations('Calendar')
  const monthT = useTranslations('months')
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const birthdaysByMonth = months.map(month => ({
    month,
    birthdays: birthdays.filter(b => new Date(b.date).getMonth() === months.indexOf(month))
  }))

  const currentMonth = new Date().getMonth()

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

  const getFullMonthName = (monthAbbr: string) => {
    const date = new Date(Date.parse(`${monthAbbr} 1, 2000`))
    return date.toLocaleString('default', { month: 'long' })
  }

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {birthdaysByMonth.map(({ month, birthdays }, index) => (
        <motion.div
          key={month}
          className={`bg-card text-card-foreground p-2 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
            index === currentMonth ? 'ring-2 ring-accent neon-glow' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <motion.h3 
            className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${index === currentMonth ? 'text-accent neon-text' : 'text-foreground'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {monthT(month)}
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-1 sm:gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {birthdays.slice(0, 5).map(birthday => (
              <motion.div
                key={birthday.id}
                className="cursor-pointer hover:bg-muted p-1 sm:p-2 rounded-md transition-colors duration-200"
                onClick={() => onSelectBirthday(birthday)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={`/userlogo/${birthday.gender}.png`}
                  alt={t('avatarAlt', { name: birthday.name })}
                  width={24}
                  height={24}
                  className="rounded-full shadow-sm"
                />
              </motion.div>
            ))}
            {birthdays.length > 5 && (
              <motion.div 
                className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium shadow-sm cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMonth(month)}
              >
                +{birthdays.length - 5}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ))}

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