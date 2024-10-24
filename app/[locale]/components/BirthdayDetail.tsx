'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Facebook, Twitter, Instagram, Globe } from 'lucide-react'
import { Birthday } from '../page'
import { useTranslations } from 'next-intl'

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
    containerHeight: 600,
    imageHeight: 330,
    contentDirection: 'row',
    contentAlign: 'center',
    contentJustify: 'space-between',
    infoDirection: 'row',
    infoAlign: 'center',
    infoJustify: 'space-between',
    infoWidth: 'auto',
  },
}

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
            className="relative bg-card text-card-foreground p-4 shadow-lg birthday-detail-content rounded-3xl overflow-hidden"
            style={{
              width: currentStyle.containerWidth,
              height: currentStyle.containerHeight,
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
              className="flex items-start gap-10 px-5 pb-8 pt-10"
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
                className="flex"
                style={{
                  flexDirection: currentStyle.infoDirection,
                  justifyContent: currentStyle.infoJustify,
                  alignItems: currentStyle.infoAlign,
                  width: currentStyle.infoWidth,
                }}
              >
                <motion.p layout className="mr-6 text-foreground/80">
                  {birthday.date}
                </motion.p>
                <motion.p layout className="text-accent font-semibold">{t('age')}: {birthday.age}</motion.p>
              </motion.div>
            </motion.div>
            <AnimatePresence mode="wait">
              {step === 3 && (
                <motion.div
                  className="absolute -bottom-24 left-0 right-0 flex w-full items-center justify-center gap-4"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={cardVariants}
                >
                  <motion.div
                    className="bg-primary text-primary-foreground p-4 rounded-lg card-content shadow-lg"
                    style={{
                      width: 220,
                      height: 250,
                    }}
                    initial={{ rotate: -6 }}
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
                    className="bg-secondary text-secondary-foreground p-4 rounded-lg card-content shadow-lg"
                    style={{
                      width: 220,
                      height: 250,
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
                    className="bg-muted text-muted-foreground p-4 rounded-lg card-content shadow-lg"
                    style={{
                      width: 220,
                      height: 250,
                    }}
                    initial={{ rotate: 6 }}
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
// Añadimos un efecto de desenfoque al fondo para mejorar el contraste
// Suavizamos las esquinas de los elementos para un aspecto más moderno
// Implementamos transiciones suaves en los cambios de estado
// Mejoramos la interactividad con efectos hover en imágenes y botones