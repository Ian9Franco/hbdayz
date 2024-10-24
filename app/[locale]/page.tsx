'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import BirthdayList from './components/BirthdayList'
import Calendar from './components/Calendar'
import BirthdayDetail from './components/BirthdayDetail'

export interface Birthday {
  id: string
  name: string
  date: string
  birthYear: number
  gender: 'male' | 'female'
  age: number 
}

const birthdays: Birthday[] = [
  { id: '1', name: 'Leonel Ngoya', date: 'Feb 19', birthYear: 2003, gender: 'male', age: 20 },
  { id: '2', name: 'Xavier Vidal', date: 'Dec 23', birthYear: 2001, gender: 'male', age: 22 },
  { id: '3', name: 'Hugo Roche', date: 'May 28', birthYear: 2001, gender: 'male', age: 22 },
  { id: '4', name: 'Gina Lemoine', date: 'May 29', birthYear: 2002, gender: 'female', age: 21 },
]

export default function Home() {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [selectedBirthday, setSelectedBirthday] = useState<Birthday | null>(null)
  const t = useTranslations('Index')

  const handleSelectBirthday = (birthday: Birthday) => {
    setSelectedBirthday(birthday)
  }

  const handleCloseBirthdayDetail = () => {
    setSelectedBirthday(null)
  }

  return (
    <div className="space-y-8">
      <Header title={t('title')} view={view} setView={setView} />
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
  )
}
