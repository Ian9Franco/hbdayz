'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import useSound from 'use-sound'
import ToggleMenu from './toggleMenu'

interface LoginProps {
  onLoginSuccess: () => void
  currentLocale: string
}

export default function Login({ onLoginSuccess, currentLocale }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [shake, setShake] = useState(false)
  const { theme } = useTheme()
  const t = useTranslations('Login')
  
  const [playHover] = useSound('/sounds/hover.mp3')
  const [playType] = useSound('/sounds/type.mp3')
  const [playSubmit] = useSound('/sounds/submit.mp3')

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (confirmPassword.length >= password.length && e.target.value.length > confirmPassword.length) {
      setShake(true)
    } else {
      setConfirmPassword(e.target.value)
    }
    playType()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playSubmit()
    // Aquí iría la lógica de autenticación
    onLoginSuccess()
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
    playHover()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <ToggleMenu currentLocale={currentLocale} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale:  0.9, opacity: 0 }}
        className="w-full max-w-md rounded-3xl bg-card p-8 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-foreground text-center">
          {isLogin ? t('login') : t('register')}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); playType() }}
              onMouseEnter={() => playHover()}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('emailPlaceholder')}
            />
          </div>
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); playType() }}
                  onMouseEnter={() => playHover()}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={t('fullNamePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-foreground">
                  {t('birthDate')}
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => { setBirthDate(e.target.value); playType() }}
                  onMouseEnter={() => playHover()}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="birthTime" className="block text-sm font-medium text-foreground">
                  {t('birthTime')}
                </label>
                <input
                  type="time"
                  id="birthTime"
                  value={birthTime}
                  onChange={(e) => { setBirthTime(e.target.value); playType() }}
                  onMouseEnter={() => playHover()}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-foreground">
                  {t('birthPlace')}
                </label>
                <input
                  type="text"
                  id="birthPlace"
                  value={birthPlace}
                  onChange={(e) => { setBirthPlace(e.target.value); playType() }}
                  onMouseEnter={() => playHover()}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder={t('birthPlacePlaceholder')}
                />
              </div>
            </>
          )}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); playType() }}
              onMouseEnter={() => playHover()}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={t('passwordPlaceholder')}
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                {t('confirmPassword')}
              </label>
              <motion.input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onMouseEnter={() => playHover()}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t('confirmPasswordPlaceholder')}
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              />
            </div>
          )}
          <motion.button
            type="submit"
            className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onMouseEnter={() => playHover()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? t('loginButton') : t('registerButton')}
          </motion.button>
        </form>
        <motion.p
          className="mt-4 text-center text-sm text-foreground/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isLogin ? t('noAccount') : t('haveAccount')}
          <button
            onClick={toggleForm}
            className="ml-1 text-primary hover:underline focus:outline-none"
            onMouseEnter={() => playHover()}
          >
            {isLogin ? t('registerLink') : t('loginLink')}
          </button>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}