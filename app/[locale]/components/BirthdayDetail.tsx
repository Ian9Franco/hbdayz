'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { X, Facebook, Twitter, Instagram, Globe, Clock, MapPin, ChevronLeft, Users, Star, User } from 'lucide-react'
import { Birthday } from '../page'
import { 
  calculateCurrentAge, 
  calculateZodiacSign, 
  calculateAstrologicalElement, 
  calculateAllCompatibilities, 
  calculateCompatibility, 
  calculateDayOfWeek, 
  calculateLifePathNumber,
  zodiacSigns
} from '../utils/masterCalculations'

// Definimos los tipos de los pasos
type Step = 1 | 2 | 3

// Manejamos los estilos para cada paso
interface StepStyle {
  containerWidth: number
  containerHeight: string | number
  imageHeight: number
  contentDirection: 'row' | 'column'
  contentAlign: 'flex-start' | 'center'
  contentJustify: 'flex-start' | 'space-between'
  infoDirection: 'row' | 'column'
  infoAlign: 'flex-start' | 'center'
  infoJustify: 'flex-start' | 'space-between'
  infoWidth: string
}

// Estilos para cada paso
const stepStyles: Record<Step, StepStyle> = {
  1: {
    containerWidth: 400,
    containerHeight: 'auto',
    imageHeight: 230,
    contentDirection: 'column',
    contentAlign: 'flex-start',
    contentJustify: 'flex-start',
    infoDirection: 'column',
    infoAlign: 'flex-start',
    infoJustify: 'flex-start',
    infoWidth: '100%',
  },
  2: {
    containerWidth: 550,
    containerHeight: 'auto',
    imageHeight: 280,
    contentDirection: 'column',
    contentAlign: 'flex-start',
    contentJustify: 'flex-start',
    infoDirection: 'row',
    infoAlign: 'center',
    infoJustify: 'space-between',
    infoWidth: '100%',
  },
  3: {
    containerWidth: 700,
    containerHeight: 'auto',
    imageHeight: 330,
    contentDirection: 'column',
    contentAlign: 'flex-start',
    contentJustify: 'flex-start',
    infoDirection: 'row',
    infoAlign: 'flex-start',
    infoJustify: 'flex-start',
    infoWidth: '100%',
  },
}

// Variantes de animación para las tarjetas
const cardVariants = {
  hidden: {
    width: 0,
    opacity: 0,
  },
  visible: {
    width: '300px',
    opacity: 1,
    transition: {
      width: {
        duration: 0.3,
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
}

// Propiedades del componente BirthdayDetail
interface BirthdayDetailProps {
  birthday: Birthday
  onClose: () => void
}

export default function BirthdayDetail({ birthday, onClose }: BirthdayDetailProps) {
  const [step, setStep] = useState<Step>(1)
  const [isClosing, setIsClosing] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)
  const t = useTranslations('BirthdayDetail')

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [step])

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('.card-content')) return
    setStep((prevStep) => ((prevStep % 3) + 1) as Step)
  }

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.birthday-detail-content')) {
      handleClose()
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const toggleCard = (cardName: string) => {
    setActiveCard(activeCard === cardName ? null : cardName)
  }

  const currentStyle = stepStyles[step]

// Cálculos astrológicos
  const currentAge = calculateCurrentAge(`${birthday.date} ${birthday.birthYear}`)
  const zodiacSign = calculateZodiacSign(`${birthday.date} ${birthday.birthYear}`)
  const astrologicalElement = calculateAstrologicalElement(zodiacSign.en)
  const compatibilityResults = calculateAllCompatibilities(zodiacSign.en)
  const bestCompatibility = compatibilityResults[0]
  const dayOfWeek = calculateDayOfWeek(`${birthday.date} ${birthday.birthYear}`)
  const lifePathNumber = calculateLifePathNumber(`${birthday.date} ${birthday.birthYear}`)


  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOutsideClick}
        >
          <motion.div
            className="relative bg-card text-card-foreground p-6 shadow-lg birthday-detail-content rounded-3xl overflow-hidden"
            style={{
              width: currentStyle.containerWidth,
              height: currentStyle.containerHeight,
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
            layout
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <motion.div
              layout
              style={{
                height: currentStyle.imageHeight,
              }}
              className="relative w-full cursor-pointer overflow-hidden rounded-2xl"
              onClick={handleClick}
            >
              <Image
                src={`/userlogo/${birthday.gender}.png`}
                alt={birthday.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
            <motion.div
              ref={contentRef}
              className="flex flex-col gap-6 px-5 pb-10 pt-10 overflow-y-auto"
              style={{ maxHeight: `calc(90vh - ${currentStyle.imageHeight}px - 48px)` }}
              layout
            >
              <motion.h1 layout className="text-4xl font-bold text-foreground">
                {birthday.name}
              </motion.h1>
              <motion.div
                className="flex gap-4 flex-wrap"
                style={{
                  flexDirection: currentStyle.infoDirection,
                  justifyContent: currentStyle.infoJustify,
                  alignItems: currentStyle.infoAlign,
                  width: currentStyle.infoWidth,
                }}
              >
                <motion.p layout className="text-foreground/80">
                  {birthday.date}
                </motion.p>
                <motion.p layout className="text-accent font-semibold">
                  {t('age')}: {currentAge}
                </motion.p>
                <motion.p layout className="text-secondary font-medium">
                  {t('sign')}: {zodiacSign.en}
                </motion.p>

                {step >= 2 && (
                  <>
                    <motion.p layout className="flex items-center text-secondary">
                      <Clock className="mr-2" size={16} />
                      {t('birthTime')}: {birthday.birthTime}
                    </motion.p>
                    <motion.p layout className="flex items-center text-secondary">
                      <MapPin className="mr-2" size={16} />
                      {t('birthPlace')}: {birthday.birthPlace}
                    </motion.p>
                  </>
                )}

                {step === 3 && (
                  <>
                    <motion.p layout className="text-secondary">
                      {t('element')}: {astrologicalElement.en}
                    </motion.p>
                    <motion.p layout className="text-secondary">
                      {t('dayOfWeek')}: {dayOfWeek}
                    </motion.p>
                    <motion.p layout className="text-secondary">
                      {t('lifePathNumber')}: {lifePathNumber}
                    </motion.p>
                    <motion.p layout className="text-secondary mt-2">
                      {t('bestCompatibility')}: {bestCompatibility.sign} - {bestCompatibility.message}
                    </motion.p>
                    <motion.p layout className="text-secondary mt-1">
                      {t('compatibilityScore')}: {bestCompatibility.score}
                    </motion.p>
                  </>
                )}
              </motion.div>
            </motion.div>

            {step === 3 && (
              <motion.div
                className="absolute top-0 right-0 bottom-0 flex flex-col justify-start gap-16 pt-6"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: 100 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              >
                <CardFlap
                  icon={<Users size={24} />}
                  title={t('socialNetworks')}
                  isActive={activeCard === 'social'}
                  onClick={() => toggleCard('social')}
                >
                  <ul className="space-y-2">
                    <li className="flex items-center"><Facebook className="mr-2" /> Facebook</li>
                    <li className="flex items-center"><Twitter className="mr-2" /> Twitter</li>
                    <li className="flex items-center"><Instagram className="mr-2" /> Instagram</li>
                  </ul>
                </CardFlap>
                <CardFlap
                  icon={<Star size={24} />}
                  title={t('astralChart')}
                  isActive={activeCard === 'astral'}
                  onClick={() => toggleCard('astral')}
                >
                  <p>{t('astralChartDescription')}</p>
                  <a href="#" className="flex items-center mt-4 text-accent hover:underline">
                    <Globe className="mr-2" /> {t('viewChart')}
                  </a>
                </CardFlap>
                <CardFlap
                  icon={<User size={24} />}
                  title={t('personalityTraits')}
                  isActive={activeCard === 'personality'}
                  onClick={() => toggleCard('personality')}
                >
                  <ul className="list-disc list-inside">
                    <li>{t('creative')}</li>
                    <li>{t('ambitious')}</li>
                    <li>{t('empathetic')}</li>
                    <li>{t('adventurous')}</li>
                  </ul>
                </CardFlap>
              </motion.div>
            )}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 text-foreground/50 hover:text-accent transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente CardFlap para mostrar información adicional
interface CardFlapProps {
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function CardFlap({ icon, title, isActive, onClick, children }: CardFlapProps) {
  return (
    <div className="relative">
      <motion.div
        className="bg-primary text-primary-foreground p-4 rounded-l-lg cursor-pointer flex items-center justify-between absolute right-0"
        onClick={onClick}
        whileHover={{ x: -2 }}
        whileTap={{ x: 0 }}
        style={{ width: isActive ? '312px' : '48px', overflow: 'hidden' }}
        animate={{ width: isActive ? '312px' : '48px' }}
      >
        {isActive ? (
          <>
            <ChevronLeft className={`transform transition-transform ${isActive ? 'rotate-180' : ''}`} />
            <h3 className="text-lg font-semibold ml-2 whitespace-nowrap">{title}</h3>
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            {icon}
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="bg-card text-card-foreground p-4 rounded-l-lg shadow-lg overflow-hidden absolute right-0 top-14 mr-12"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}