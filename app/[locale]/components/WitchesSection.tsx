'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Birthday } from '../page';
import {
  calculateCurrentAge,
  calculateNextAge,
  calculateZodiacSign,
  calculateAstrologicalElement,
  calculateCompatibility,
  calculateDayOfWeek,
  calculateLifePathNumber,
  calculateTimeDifference,
} from '../utils/calculations';
import { zodiacSigns, explainElement, dayOfWeekMeaning } from '../utils/birthChartInfo';
import { interpretLifePathNumber } from '../utils/destinyMatrix';

interface WitchesSectionProps {
  birthdays: Birthday[];
}

export default function WitchesSection({ birthdays }: WitchesSectionProps) {
  const [selectedUser, setSelectedUser] = useState<Birthday | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations('WitchesSection');

  // Función para seleccionar un usuario
  const handleSelectUser = (birthday: Birthday) => {
    setSelectedUser(birthday);
    setIsSidebarOpen(false);
  };

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Cálculos astrológicos para el usuario seleccionado
  const zodiacSign = selectedUser ? calculateZodiacSign(`${selectedUser.date} ${selectedUser.birthYear}`) : null;
  const astrologicalElement = zodiacSign ? calculateAstrologicalElement(zodiacSign.en) : null;
  const lifePathNumber = selectedUser ? calculateLifePathNumber(`${selectedUser.date} ${selectedUser.birthYear}`) : null;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground sm:flex-row">
      {/* Barra lateral */}
      <motion.div
        className="fixed sm:relative top-0 left-0 h-full bg-card shadow-lg z-20 sm:w-1/4"
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">{t('userList')}</h2>
          {birthdays.map((birthday) => (
            <button
              key={birthday.id}
              onClick={() => handleSelectUser(birthday)}
              className="block w-full text-left p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
            >
              {birthday.name}
            </button>
          ))}
        </div>
      </motion.div>
  
      {/* Botón para alternar la barra lateral */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 p-2 bg-primary text-primary-foreground rounded-full shadow-lg sm:hidden"
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
  
      {/* Contenido principal */}
      <div className="flex-1 p-4 sm:p-8 ml-16 sm:ml-0 sm:pl-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{t('witchesSection')}</h1>
        
        {selectedUser ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUser.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 sm:space-y-8"
            >
              <div className="bg-card p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t('astralChart')}</h2>
                <p>{t('name')}: {selectedUser.name}</p>
                <p>{t('birthDate')}: {selectedUser.date}, {selectedUser.birthYear}</p>
                <p>{t('birthTime')}: {selectedUser.birthTime}</p>
                <p>{t('birthPlace')}: {selectedUser.birthPlace}</p>
                {zodiacSign && (
                  <>
                    <p>{t('zodiacSign')}: {zodiacSign.en}</p>
                    <p>
                      {t('zodiacDescription')}: 
                      {zodiacSigns[zodiacSign.en]?.description || t('descriptionNotAvailable')}
                    </p>
                  </>
                )}
                {astrologicalElement && (
                  <p>{t('element')}: {astrologicalElement.en} - {explainElement(astrologicalElement.en)}</p>
                )}
              </div>
  
              <div className="bg-card p-4 sm:p-6 rounded-lg shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t('destinyMatrix')}</h2>
                {lifePathNumber && (
                  <p>{interpretLifePathNumber(lifePathNumber)}</p>
                )}
                <p>{t('dayOfWeekMeaning')}: {dayOfWeekMeaning[calculateDayOfWeek(`${selectedUser.date} ${selectedUser.birthYear}`)]}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p>{t('selectUser')}</p>
        )}
      </div>
    </div>
  );
}