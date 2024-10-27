'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronRight, ChevronLeft, Sparkles, Flame, User2, Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Birthday } from '../page';
import { FaSun, FaMoon, FaMars, FaMercury, FaStar, FaHeart, FaTree } from 'react-icons/fa';

import {
  calculateZodiacSign,
  calculateAstrologicalElement,
  calculateDayOfWeek,
  calculateLifePathNumber, // Asegúrate de que esta función esté importada
  zodiacSigns,
  dayOfWeekMeaning,
  generateDestinyMatrix
} from '../utils/calculations';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WitchesSectionProps {
  birthdays: Birthday[];
  currentLocale: string;
}

type LocaleString = {
  es: string;
  en: string;
};

export default function WitchesSection({ birthdays, currentLocale }: WitchesSectionProps) {
  const [selectedUser, setSelectedUser] = useState<Birthday | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations('WitchesSection');

  // Función para manejar la selección de usuario
  const handleSelectUser = (birthday: Birthday) => {
    setSelectedUser(birthday);
    setIsSidebarOpen(false);
  };

  const getIcon = (day: string) => {
    switch (day) {
      case 'Domingo':
        return <FaSun className="text-yellow-500" />;
      case 'Lunes':
        return <FaMoon className="text-blue-500" />;
      case 'Martes':
        return <FaMars className="text-red-500" />;
      case 'Miércoles':
        return <FaMercury className="text-gray-500" />;
      case 'Jueves':
        return <FaStar className="text-indigo-500" />;
      case 'Viernes':
        return <FaHeart className="text-pink-500" />;
      case 'Sábado':
        return <FaTree className="text-green-500" />;
      default:
        return null;
    }
  };

  // Función para alternar la visibilidad de la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Cálculos astrológicos
  const zodiacSign = selectedUser ? calculateZodiacSign(`${selectedUser.date} ${selectedUser.birthYear}`) : null;
  const astrologicalElement = zodiacSign ? calculateAstrologicalElement(zodiacSign.en) : null;
  const dayOfWeek = selectedUser ? calculateDayOfWeek(`${selectedUser.date} ${selectedUser.birthYear}`) : null;

  // Calcular el número de vida



  // Función para obtener la cadena localizada
  const getLocaleString = (localeString: LocaleString): string => {
    return localeString[currentLocale as keyof LocaleString] || localeString.en;
  };

  // Generación de la matriz del destino
  const destinyMatrix = selectedUser ? generateDestinyMatrix({
    name: selectedUser.name,
    birthDate: `${selectedUser.birthYear}-${selectedUser.date.split(' ')[0]}-${selectedUser.date.split(' ')[1]}`,
    gender: selectedUser.gender,
    time: selectedUser.birthTime,
    place: selectedUser.birthPlace,
    currentYear: new Date().getFullYear()
  }) : null;


  return (
    <div className="flex flex-col h-screen bg-background text-foreground lg:flex-row">
      {/* Barra lateral con lista de usuarios */}
      <motion.div
        className={`fixed lg:relative top-0 left-0 h-full bg-card shadow-lg z-20 w-64 max-w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
          <h2 className="text-xl font-bold mb-4">{t('userList')}</h2>
          {birthdays.map((birthday) => (
            <motion.button
              key={birthday.id}
              onClick={() => handleSelectUser(birthday)}
              className="flex items-center w-full text-left p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={`/userlogo/${birthday.gender}.png`}
                alt={birthday.name}
                width={32}
                height={32}
                className="rounded-full mr-2"
              />
              <span>{birthday.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Botón para alternar la barra lateral en dispositivos móviles */}
      <motion.button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 p-2 bg-primary text-primary-foreground rounded-full shadow-lg lg:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </motion.button>

      {/* Contenido principal */}
      <div className="flex-1 p-4 lg:p-8 ml-16 lg:ml-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">{t('witchesSection')}</h1>

        {selectedUser ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedUser.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Carta Astral */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('astralChart')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <User2 className="w-6 h-6 text-primary mr-2" />
                      <div>
                        <p className="font-semibold text-sm">{t('name')}:</p>
                        <p className="text-lg">{selectedUser.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-6 h-6 text-primary mr-2" />
                      <div>
                        <p className="font-semibold text-sm">{t('birthDate')}:</p>
                        <p className="text-lg">{selectedUser.date}, {selectedUser.birthYear}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-6 h-6 text-primary mr-2" />
                      <div>
                        <p className="font-semibold text-sm">{t('birthTime')}:</p>
                        <p className="text-lg">{selectedUser.birthTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-primary mr-2" />
                      <div>
                        <p className="font-semibold text-sm">{t('birthPlace')}:</p>
                        <p className="text-lg">{selectedUser.birthPlace}</p>
                      </div>
                    </div>
                  </div>
                  {zodiacSign && (
                    <motion.div
                      className="mt-4 p-4 bg-accent text-accent-foreground rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="font-bold text-lg mb-2">{t('zodiacSign')}: {getLocaleString(zodiacSign)}</p>
                      <p className="text-sm">
                        {zodiacSigns[zodiacSign.en]?.description || t('descriptionNotAvailable')}
                      </p>
                    </motion.div>
                  )}
                  {astrologicalElement && (
                    <motion.p
                      className="mt-4 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="font-semibold">{t('element')}:</span> {getLocaleString(astrologicalElement)} - {t(`elementDescription.${getLocaleString(astrologicalElement)}`)}
                    </motion.p>
                  )}
                </CardContent>
              </Card>

              {/* Matriz del Destino */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{t('destinyMatrix')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {destinyMatrix && (
                    <div className="space-y-4">
                     {/* Life Path Number */}
                     <motion.div
                        className="p-4 bg-accent text-accent-foreground rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center mb-3">
                          <Sparkles
                            className="w-12 h-12 text-yellow-500 mr-3 flex-shrink-0"
                          />
                          <p className="font-bold text-xl">
                            {t('lifePathNumber')}: {destinyMatrix.lifePathNumber}
                          </p>
                        </div>
                        <p className="text-sm">{destinyMatrix.lifePathNumber}</p>
                      </motion.div>


                      {/* Soul Number */}
                      <motion.div
                        className="p-4 bg-accent text-accent-foreground rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center mb-3">
                          <Flame
                            className="w-12 h-12 text-red-500 mr-3 flex-shrink-0"
                          />
                          <p className="font-bold text-xl">
                            {t('soulNumber')}: {destinyMatrix.soulNumber}
                          </p>
                        </div>
                        <p className="text-sm">{destinyMatrix.soulNumber}</p>
                      </motion.div>

                      {/* Personality Number */}
                      <motion.div
                        className="p-4 bg-accent text-accent-foreground rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center mb-3">
                          <User2
                            className="w-12 h-12 text-blue-500 mr-3 flex-shrink-0"
                          />
                          <p className="font-bold text-xl">
                            {t('personalityNumber')}: {destinyMatrix.personalityNumber}
                          </p>
                        </div>
                        <p className="text-sm">{destinyMatrix.personalityNumber}</p>
                      </motion.div>
                    </div>
                  )}
                 {dayOfWeek && (
                    <motion.div
                      className="mt-4 flex items-center space-x-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center">
                        {getIcon(dayOfWeek)} {/* Icono correspondiente al día */}
                        <span className="ml-2 font-bold text-lg">{dayOfWeek}</span> {/* Nombre del día */}
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {dayOfWeekMeaning[dayOfWeek]} {/* Significado del día */}
                      </Badge>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-center text-lg text-muted-foreground">{t('selectUser')}</p>
        )}
      </div>
    </div>
  );
}