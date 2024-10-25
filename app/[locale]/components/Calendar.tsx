'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Birthday } from '../page'
import useSound from 'use-sound'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface CalendarProps {
  birthdays: Birthday[]
  onSelectBirthday: (birthday: Birthday) => void
}

export default function Calendar({ birthdays, onSelectBirthday }: CalendarProps) {
  const t = useTranslations('Calendar')
  const monthT = useTranslations('months')
  
  // Sonidos para interacciones
  const [playHover] = useSound('/sounds/hover.mp3')
  const [playSelect] = useSound('/sounds/select.mp3')

  const birthdaysByMonth = months.map(month => ({
    month,
    birthdays: birthdays.filter(b => new Date(b.date).getMonth() === months.indexOf(month))
  }))

  const currentMonth = new Date().getMonth()

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {birthdaysByMonth.map(({ month, birthdays }, index) => (
        <motion.div
          key={month}
          className={`bg-card text-card-foreground p-2 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ${
            index === currentMonth ? 'ring-2 ring-accent' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <motion.h3 
            className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${index === currentMonth ? 'text-accent' : 'text-foreground'}`}
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
            {birthdays.slice(0, 3).map(birthday => (
              <motion.div
                key={birthday.id}
                className="cursor-pointer hover:bg-muted p-1 sm:p-2 rounded-md transition-colors duration-200"
                onClick={() => { onSelectBirthday(birthday); playSelect() }}
                onMouseEnter={() => playHover()}
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
            {birthdays.length > 3 && (
              <motion.div 
                className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => playHover()}
              >
                +{birthdays.length - 3}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}