'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { X, Facebook, Twitter, Instagram, Globe, Clock, MapPin } from 'lucide-react'
import { Birthday } from '../page'
import { calculateCurrentAge, calculateNextAge, calculateZodiacSign, calculateAstrologicalElement, calculateCompatibility, calculateDayOfWeek, calculateLifePathNumber } from '../utils/calculations'

type Step = 1 | 2 | 3

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
    containerHeight: 800,
    imageHeight: 330,
    contentDirection: 'row',
    contentAlign: 'flex-start',
    contentJustify: 'space-between',
    infoDirection: 'column',
    infoAlign: 'flex-start',
    infoJustify: 'flex-start',
    infoWidth: '50%',
  },
}

// Animaciones para las tarjetas
const cardVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

interface BirthdayDetailProps {
  birthday: Birthday
  onClose: () => void
}

export default function BirthdayDetail({ birthday, onClose }: BirthdayDetailProps) {
  const [step, setStep] = useState<Step>(1)
  const [isClosing, setIsClosing] = useState(false)
  const t = useTranslations('BirthdayDetail')

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

  const currentStyle = stepStyles[step]

  // Cálculos para la información del cumpleaños
  const currentAge = calculateCurrentAge(`${birthday.date} ${birthday.birthYear}`)
  const nextAge = calculateNextAge(`${birthday.date} ${birthday.birthYear}`)
  const zodiacSign = calculateZodiacSign(`${birthday.date} ${birthday.birthYear}`)
  const astrologicalElement = calculateAstrologicalElement(zodiacSign.en)
  const compatibility = calculateCompatibility(zodiacSign.en, "Libra") // Ejemplo de compatibilidad con Libra
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
              onClick={() => setStep((prevStep) => ((prevStep % 3) + 1) as Step)}
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
  className="flex items-start gap-10 px-5 pb-10 pt-10" // Cambié pb-8 a pb-10
  style={{
    flexDirection: currentStyle.contentDirection,
    alignItems: currentStyle.contentAlign,
    justifyContent: currentStyle.contentJustify,
  }}
  layout
>
  <motion.h1 layout className="text-4xl font-bold text-foreground">
    {birthday.name}
  </motion.h1>
  <motion.div
    className="flex flex-col gap-4"
    style={{
      flexDirection: currentStyle.infoDirection,
      justifyContent: currentStyle.infoJustify,
      alignItems: currentStyle.infoAlign,
      width: currentStyle.infoWidth,
    }}
  >
    {/* Paso 1: Edad, nombre y signo */}
    <motion.p layout className="text-foreground/80">
      {birthday.date}
    </motion.p>
    <motion.p layout className="text-accent font-semibold">
      {t('age')}: {currentAge}
    </motion.p>
    <motion.p layout className="text-secondary font-medium">
      {t('sign')}: {zodiacSign.en}
    </motion.p>

    {/* Paso 2: Hora y lugar de nacimiento */}
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

    {/* Paso 3: Información adicional */}
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
        <motion.p layout className="text-secondary">
          {t('compatibility')}: {compatibility}
        </motion.p>
      </>
    )}
  </motion.div>
</motion.div>

<AnimatePresence mode="wait">
  {step === 3 && (
    <motion.div
      className="absolute bottom-0 left-0 right-0 flex justify-between gap-4 overflow-visible px-4 pb-4"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cardVariants}
    >
      <motion.div
        className="bg-primary text-primary-foreground p-4 rounded-lg card-content shadow-lg flex-1 transform -translate-y-8 -rotate-6"
        style={{
          width: 200,
          height: 280,
          zIndex: 3,
        }}
        layout
      >
        <h3 className="text-xl font-semibold mb-2">{t('socialNetworks')}</h3>
        <ul className="space-y-2">
          <li className="flex items-center"><Facebook className="mr-2" /> Facebook</li>
          <li className="flex items-center"><Twitter className="mr-2" /> Twitter</li>
          <li className="flex items-center"><Instagram className="mr-2" /> Instagram</li>
        </ul>
      </motion.div>
      <motion.div
        className="bg-secondary text-secondary-foreground p-4 rounded-lg card-content shadow-lg flex-1 transform -translate-y-4"
        style={{
          width: 200,
          height: 280,
          zIndex: 2,
        }}
        layout
      >
        <h3 className="text-xl font-semibold mb-2">{t('astralChart')}</h3>
        <p>{t('astralChartDescription')}</p>
        <a href="#" className="flex items-center mt-4 text-accent hover:underline">
          <Globe className="mr-2" /> {t('viewChart')}
        </a>
      </motion.div>
      <motion.div
        className="bg-muted text-muted-foreground p-4 rounded-lg card-content shadow-lg flex-1 transform -translate-y-8 rotate-6"
        style={{
          width: 200,
          height: 280,
          zIndex: 1,
        }}
        layout
      >
        <h3 className="text-xl font-semibold mb-2">{t('personalityTraits')}</h3>
        <ul className="list-disc list-inside">
          <li>{t('creative')}</li>
          <li>{t('ambitious')}</li>
          <li>{t('empathetic')}</li>
          <li>{t('adventurous')}</li>
        </ul>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
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