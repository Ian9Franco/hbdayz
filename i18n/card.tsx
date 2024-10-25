import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    y: 120,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(1)

  const handleClick = () => setStep((prevStep) => ((prevStep % 3) + 1) as Step)

  const currentStyle = stepStyles[step]

  return (
    <main className="bg-background relative flex min-h-screen w-full items-start justify-center bg-cover bg-center px-4 py-10 md:items-center">
      <motion.div
        className="relative cursor-pointer overflow-hidden bg-white p-2"
        style={{
          width: currentStyle.containerWidth,
          height: currentStyle.containerHeight,
          borderRadius: 24,
        }}
        layout
        onClick={handleClick}
      >
        <motion.div
          layout
          style={{
            height: currentStyle.imageHeight,
            borderRadius: 18,
          }}
          className="relative w-full cursor-pointer overflow-hidden"
        >
          <motion.img
            src="/main.png"
            alt="main-image"
            className="bg-slte-50 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.img
              layout
              src="/logo-light.svg"
              alt="logo-lndevui"
              className="bg-slte-50 w-20"
            />
          </div>
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
          <motion.h1 layout className="text-4xl">
            Auto-layout <br /> Interaction
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
            <motion.p layout className="mr-6">
              www.config.com
            </motion.p>
            <motion.p layout>Last update 2024</motion.p>
          </motion.div>
        </motion.div>
        <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div
              className="absolute -bottom-40 left-0 right-0 flex w-full items-center justify-center gap-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
            >
              <motion.img
                src="/card.png"
                alt="card-image"
                className="bg-slte-50 mt-10 cursor-pointer object-cover"
                style={{
                  width: 220,
                  height: 250,
                  borderRadius: 14,
                }}
                initial={{ rotate: -6 }}
                layout
              />
              <motion.img
                src="/card.png"
                alt="card-image"
                className="bg-slte-50 cursor-pointer object-cover"
                style={{
                  width: 220,
                  height: 250,
                  borderRadius: 14,
                }}
                layout
              />
              <motion.img
                src="/card.png"
                alt="card-image"
                className="bg-slte-50 mt-10 cursor-pointer object-cover"
                style={{
                  width: 220,
                  height: 250,
                  borderRadius: 14,
                }}
                initial={{ rotate: 6 }}
                layout
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}

export default App
