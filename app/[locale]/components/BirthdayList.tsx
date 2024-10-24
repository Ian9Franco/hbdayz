import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Birthday } from '../page'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

interface BirthdayListProps {
  birthdays: Birthday[]
  onSelectBirthday: (birthday: Birthday) => void
}

export default function BirthdayList({ birthdays, onSelectBirthday }: BirthdayListProps) {
  const t = useTranslations('BirthdayList')
  const monthT = useTranslations('months')

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const birthdaysByMonth = months.map(month => ({
    month,
    birthdays: birthdays.filter(b => new Date(b.date).getMonth() === months.indexOf(month))
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <motion.div 
        className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {birthdaysByMonth.map((monthData) => (
          <motion.div 
            key={monthData.month} 
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs font-medium text-foreground/70 mb-2">{monthT(monthData.month)}</span>
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
                  className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-xs font-medium text-secondary-foreground shadow-md"
                  whileHover={{ scale: 1.1 }}
                >
                  +{monthData.birthdays.length - 3}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
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
        {birthdays.map((birthday, index) => (
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
            <div className="text-lg font-bold text-accent">{t('age', { age: calculateAge(birthday.date) })}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}