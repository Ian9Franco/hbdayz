import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Birthday } from '../page'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface CalendarProps {
  birthdays: Birthday[]
  onSelectBirthday: (birthday: Birthday) => void
}

export default function Calendar({ birthdays, onSelectBirthday }: CalendarProps) {
  const t = useTranslations('Calendar')
  const monthT = useTranslations('months')

  const birthdaysByMonth = months.map(month => ({
    month,
    birthdays: birthdays.filter(b => new Date(b.date).getMonth() === months.indexOf(month))
  }))

  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {birthdaysByMonth.map(({ month, birthdays }, index) => (
        <motion.div
          key={month}
          className="bg-card text-card-foreground p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <motion.h3 
            className="text-lg font-semibold mb-3 text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {monthT(month)}
          </motion.h3>
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {birthdays.slice(0, 3).map(birthday => (
              <motion.div
                key={birthday.id}
                className="cursor-pointer hover:bg-muted p-2  rounded-md transition-colors duration-200"
                onClick={() => onSelectBirthday(birthday)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={`/userlogo/${birthday.gender}.png`}
                  alt={t('avatarAlt', { name: birthday.name })}
                  width={32}
                  height={32}
                  className="rounded-full shadow-sm"
                />
              </motion.div>
            ))}
            {birthdays.length > 3 && (
              <motion.div 
                className="flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full text-sm font-medium shadow-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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


// Implementamos un diseño de cuadrícula responsiva para mejor distribución en diferentes dispositivos
// Añadimos animaciones de entrada escalonadas para cada mes
// Mejoramos la interactividad de los avatares con efectos de escala al pasar el mouse y al hacer clic
// Utilizamos sombras sutiles para dar profundidad a las tarjetas de los meses