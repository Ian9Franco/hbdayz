import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Flame, User2, Calendar, Clock, MapPin, Heart, HeartCrack } from 'lucide-react';
import { FaSun, FaMoon, FaMars, FaMercury, FaStar, FaHeart, FaTree } from 'react-icons/fa';
import { Birthday } from '../../page';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  calculateZodiacSign,
  calculateAstrologicalElement,
  calculateDayOfWeek,
  calculateLifePathNumber,
  zodiacSigns,
  dayOfWeekMeaning,
  generateDestinyMatrixWrapper,
  calculateAllCompatibilities,
  getLeastCompatibleSigns,
  CalculationsCompatibilityResult
} from '../../utils/masterCalculations';
import { getExtendedInterpretation } from '../../utils/numerology';

interface UserContentProps {
  selectedUser: Birthday | null;
  currentLocale: string;
  t: (key: string) => string;
}

const MotionCard = motion(Card);

// Componente para animar las tarjetas al entrar en el viewport
function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionCard
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 }
      }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </MotionCard>
  );
}

export default function UserContent({ selectedUser, currentLocale, t }: UserContentProps) {
  // Función para obtener el icono del día de la semana
  const getIcon = (day: string) => {
    switch (day) {
      case 'Domingo': return <FaSun className="text-yellow-500" />;
      case 'Lunes': return <FaMoon className="text-blue-500" />;
      case 'Martes': return <FaMars className="text-red-500" />;
      case 'Miércoles': return <FaMercury className="text-gray-500" />;
      case 'Jueves': return <FaStar className="text-indigo-500" />;
      case 'Viernes': return <FaHeart className="text-pink-500" />;
      case 'Sábado': return <FaTree className="text-green-500" />;
      default: return null;
    }
  };

  // Función para obtener la cadena localizada
  const getLocaleString = (localeString: { es: string; en: string }): string => {
    return localeString[currentLocale as keyof typeof localeString] || localeString.en;
  };

  // Si no hay usuario seleccionado, mostrar mensaje
  if (!selectedUser) {
    return <p className="text-center text-lg text-muted-foreground">{t('selectUser')}</p>;
  }

  // Cálculos astrológicos y numerológicos
  const zodiacSign = calculateZodiacSign(`${selectedUser.date} ${selectedUser.birthYear}`);
  const astrologicalElement = zodiacSign ? calculateAstrologicalElement(zodiacSign.en) : null;
  const compatibilityResults = zodiacSign ? calculateAllCompatibilities(zodiacSign.en) : null;
  const leastCompatibleSigns = zodiacSign ? getLeastCompatibleSigns(zodiacSign.en) : null;
  const dayOfWeek = calculateDayOfWeek(`${selectedUser.date} ${selectedUser.birthYear}`);
  const lifePathNumber = calculateLifePathNumber(`${selectedUser.date} ${selectedUser.birthYear}`);
  const destinyMatrix = generateDestinyMatrixWrapper({
    name: selectedUser.name,
    birthDate: `${selectedUser.birthYear}-${selectedUser.date.split(' ')[0]}-${selectedUser.date.split(' ')[1]}`,
    gender: selectedUser.gender,
    time: selectedUser.birthTime,
    place: selectedUser.birthPlace,
    currentYear: new Date().getFullYear()
  });

  return (
    <div className="space-y-6">
      {/* Carta Astral */}
      <AnimatedCard delay={0.1}>
        <CardHeader>
          <CardTitle className="text-xl">{t('astralChart')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Información del usuario */}
            <div className="flex items-center">
              <User2 className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t('name')}:</p>
                <p className="text-lg">{selectedUser.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t('birthDate')}:</p>
                <p className="text-lg">{selectedUser.date}, {selectedUser.birthYear}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t('birthTime')}:</p>
                <p className="text-lg">{selectedUser.birthTime}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-primary mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">{t('birthPlace')}:</p>
                <p className="text-lg">{selectedUser.birthPlace}</p>
              </div>
            </div>
          </div>
          {/* Signo zodiacal y elemento */}
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
      </AnimatedCard>

      {/* Matriz del Destino */}
      <AnimatedCard delay={0.2}>
        <CardHeader>
          <CardTitle className="text-xl">{t('destinyMatrix')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Número de Camino de Vida */}
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center mb-3">
                <Sparkles className="w-12 h-12 text-yellow-500 mr-3 flex-shrink-0" />
                <p className="font-bold text-xl">
                  {t('lifePathNumber')}: {lifePathNumber}
                </p>
              </div>
              <p className="text-sm">{lifePathNumber ? getExtendedInterpretation(lifePathNumber) : t('lifePathNumberNotAvailable')}</p>
            </motion.div>

            {/* Número del Alma */}
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <Flame className="w-12 h-12 text-red-500 mr-3 flex-shrink-0" />
                <p className="font-bold text-xl">
                  {t('soulNumber')}: {destinyMatrix?.soulNumber}
                </p>
              </div>
              <p className="text-sm">{destinyMatrix?.soulNumber}</p>
            </motion.div>

            {/* Número de Personalidad */}
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center mb-3">
                <User2 className="w-12 h-12 text-blue-500 mr-3 flex-shrink-0" />
                <p className="font-bold text-xl">
                  {t('personalityNumber')}: {destinyMatrix?.personalityNumber}
                </p>
              </div>
              <p className="text-sm">{destinyMatrix?.personalityNumber}</p>
            </motion.div>
          </div>
          {/* Día de nacimiento */}
          {dayOfWeek && (
            <motion.div
              className="mt-4 flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center">
                {getIcon(dayOfWeek)}
                <span className="ml-2 font-bold text-lg">{dayOfWeek}</span>
              </div>
              <Badge variant="outline" className="text-sm">
                {dayOfWeekMeaning[dayOfWeek]}
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </AnimatedCard>

      {/* Compatibilidad */}
      <AnimatedCard delay={0.3}>
        <CardHeader>
          <CardTitle className="text-xl">{t('compatibility')}</CardTitle>
        </CardHeader>
        <CardContent>
          {compatibilityResults && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Heart className="mr-2 text-green-500" />
                {t('mostCompatible')}
              </h3>
              {compatibilityResults.slice(0, 3).map((result: CalculationsCompatibilityResult, index: number) => (
                <motion.div
                  key={result.sign}
                  className="p-4 bg-accent text-accent-foreground rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="font-bold text-lg mb-2">{index + 1}. {result.sign}</p>
                  <p className="text-sm">{result.message}</p>
                  <p className="text-sm mt-1">{t('compatibilityScore')}: {result.score}</p>
                  <p className="text-sm mt-1">{t('compatibilityLevel')}: {result.compatibilityLevel}</p>
                  <ul className="text-sm mt-2">
                    {result.compatibilityFactors.map((factor: string, i: number) => (
                      <li key={i}>{factor}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </AnimatedCard>

      {/* Menor Compatibilidad */}
      <AnimatedCard delay={0.4}>
        <CardHeader>
          <CardTitle className="text-xl">{t('leastCompatible')}</CardTitle>
        </CardHeader>
        <CardContent>
          {leastCompatibleSigns && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <HeartCrack className="mr-2 text-red-500" />
                {t('challengingCompatibility')}
              </h3>
              {leastCompatibleSigns.map((result: CalculationsCompatibilityResult, index: number) => (
                <motion.div
                  key={result.sign}
                  className="p-4 bg-accent text-accent-foreground rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <p className="font-bold text-lg mb-2">{index + 1}. {result.sign}</p>
                  <p className="text-sm">{result.message}</p>
                  <p className="text-sm mt-1">{t('compatibilityScore')}: {result.score}</p>
                  <p className="text-sm mt-1">{t('compatibilityLevel')}: {result.compatibilityLevel}</p>
                  <ul className="text-sm mt-2">
                    {result.compatibilityFactors.map((factor: string, i: number) => (
                      <li key={i}>{factor}</li>
                    ))}
                  </ul>
                
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </AnimatedCard>
    </div>
  );
}