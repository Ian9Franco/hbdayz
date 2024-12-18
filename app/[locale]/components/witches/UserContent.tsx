import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Flame, User2, Calendar, Clock, MapPin, Heart, HeartCrack, Star, Zap, Target, Crosshair } from 'lucide-react';
import { FaSun, FaMoon, FaMars, FaMercury, FaStar, FaHeart, FaTree } from 'react-icons/fa';
import { Birthday } from '../../page';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  calculateZodiacSign,
  calculateAstrologicalElement,
  calculateDayOfWeek,
  zodiacSigns,
  dayOfWeekMeaning,
  generateDestinyMatrixWrapper,
  calculateAllCompatibilities,
  getLeastCompatibleSigns,
  CalculationsCompatibilityResult
} from '../../utils/masterCalculations';
import {
  getExtendedInterpretation,
  getGenerationalPathInterpretation,
  getPinnacleInterpretation,
  getCriticalAgeInterpretation
} from '../../utils/numerology/interpretations';

interface UserContentProps {
  selectedUser: Birthday | null;
  currentLocale: string;
  t: (key: string) => string;
}

const MotionCard = motion(Card);

function AnimatedCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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
      className={`neon-glow ${className}`}
    >
      {children}
    </MotionCard>
  );
}

export default function UserContent({ selectedUser, currentLocale, t }: UserContentProps) {
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

  const getLocaleString = (localeString: { es: string; en: string }): string => {
    return localeString[currentLocale as keyof typeof localeString] || localeString.en;
  };

  if (!selectedUser) {
    return <p className="text-center text-lg text-muted-foreground">{t('selectUser')}</p>;
  }

  const zodiacSign = calculateZodiacSign(`${selectedUser.date} ${selectedUser.birthYear}`);
  const astrologicalElement = zodiacSign ? calculateAstrologicalElement(zodiacSign.en) : null;
  const compatibilityResults = zodiacSign ? calculateAllCompatibilities(zodiacSign.en) : null;
  const leastCompatibleSigns = zodiacSign ? getLeastCompatibleSigns(zodiacSign.en) : null;
  const dayOfWeek = calculateDayOfWeek(`${selectedUser.date} ${selectedUser.birthYear}`);
  
  const destinyMatrix = generateDestinyMatrixWrapper({
    name: selectedUser.name,
    birthDate: `${selectedUser.birthYear}-${selectedUser.date.split(' ')[0]}-${selectedUser.date.split(' ')[1]}`,
    gender: selectedUser.gender,
    time: selectedUser.birthTime,
    place: selectedUser.birthPlace,
    currentYear: new Date().getFullYear()
  });

  const renderInterpretation = (value: string | number) => {
    const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(numericValue) ? t('interpretationNotAvailable') : getExtendedInterpretation(numericValue);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Astral Chart */}
      <div className="space-y-6">
        <AnimatedCard delay={0.1}>
          <CardHeader>
            <CardTitle className="text-xl">{t('astralChart')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            {dayOfWeek && (
              <motion.div
                className="mt-4 flex items-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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

        {/* Compatibility */}
        <AnimatedCard delay={0.5}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </AnimatedCard>

        {/* Least Compatible */}
        <AnimatedCard delay={0.6}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {leastCompatibleSigns.slice(0, 2).map((result: CalculationsCompatibilityResult, index: number) => (
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
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </AnimatedCard>
      </div>

      {/* Destiny Matrix and other components */}
      <div className="space-y-6">
        <AnimatedCard delay={0.2}>
          <CardHeader>
            <CardTitle className="text-xl">{t('destinyMatrix')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-3">
                  <Sparkles className="w-12 h-12 text-yellow-500 mr-3 flex-shrink-0" />
                  <p className="font-bold text-xl">
                    {t('lifePathNumber')}: {destinyMatrix.lifePathNumber}
                  </p>
                </div>
                <p className="text-sm">{renderInterpretation(destinyMatrix.lifePathNumber)}</p>
              </motion.div>

              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center mb-3">
                  <Flame className="w-12 h-12 text-red-500 mr-3 flex-shrink-0" />
                  <p className="font-bold text-xl">
                    {t('soulNumber')}: {destinyMatrix.soulNumber}
                  </p>
                </div>
                <p className="text-sm">{renderInterpretation(destinyMatrix.soulNumber)}</p>
              </motion.div>

              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center mb-3">
                  <User2 className="w-12 h-12 text-blue-500 mr-3 flex-shrink-0" />
                  <p className="font-bold text-xl">
                    {t('personalityNumber')}: {destinyMatrix.personalityNumber}
                  </p>
                </div>
                <p className="text-sm">{renderInterpretation(destinyMatrix.personalityNumber)}</p>
              </motion.div>

              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center mb-3">
                  <Star className="w-12 h-12 text-purple-500 mr-3 flex-shrink-0" />
                  <p className="font-bold text-xl">
                    {t('expressionNumber')}: {destinyMatrix.expressionNumber}
                  </p>
                </div>
                <p className="text-sm">{renderInterpretation(destinyMatrix.expressionNumber)}</p>
              </motion.div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.3}>
          <CardHeader>
            <CardTitle className="text-xl">{t('generationalPathsAndEnergy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-bold text-lg mb-2">{t('masculinePath')}: {destinyMatrix.generationalPaths.masculine}</p>
                <p className="text-sm">{getGenerationalPathInterpretation('masculine')}</p>
              </motion.div>
              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-bold text-lg mb-2">{t('femininePath')}: {destinyMatrix.generationalPaths.feminine}</p>
                <p className="text-sm">{getGenerationalPathInterpretation('feminine')}</p>
              </motion.div>
              <motion.div
                className="p-4 bg-accent text-accent-foreground rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-bold text-lg mb-2">{t('genderEnergy')}: {destinyMatrix.genderEnergy}</p>
                <p className="text-sm">{t(`genderEnergyDescription.${destinyMatrix.genderEnergy}`)}</p>
              </motion.div>
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle className="text-xl">{t('criticalAgesAndPinnacles')}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-bold text-lg mb-2">{t('criticalAges')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destinyMatrix.criticalAges.map((age: number, index: number) => (
                  <div key={index} className="flex flex-col">
                    <Badge variant="secondary" className="self-start mb-1">{age}</Badge>
                    <p className="text-sm">{getCriticalAgeInterpretation(age)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="space-y-4">
              {destinyMatrix.pinnacles.map((pinnacle: number, index: number) => (
                <motion.div
                  key={index}
                  className="p-4 bg-accent text-accent-foreground rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <p className="font-bold text-lg mb-2">{t('pinnacle')} {index + 1}: {pinnacle}</p>
                  <p className="text-sm">{getPinnacleInterpretation(pinnacle, destinyMatrix.pinnacleAges[index])}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.5}>
          <CardHeader>
            <CardTitle className="text-xl">{t('personalYear')}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-bold text-lg mb-2">{t('personalYearNumber')}: {destinyMatrix.personalYear}</p>
              <p className="text-sm">{renderInterpretation(destinyMatrix.personalYear)}</p>
            </motion.div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.6}>
          <CardHeader>
            <CardTitle className="text-xl">{t('personalityTraits')}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="font-bold text-lg mb-2">{t('strengths')}: {destinyMatrix.personalityTraits.strengths.join(', ')}</p>
              <p className="font-bold text-lg mb-2">{t('weaknesses')}: {destinyMatrix.personalityTraits.weaknesses.join(', ')}</p>
              <p className="font-bold text-lg">{t('idealCareer')}: {destinyMatrix.personalityTraits.idealCareer}</p>
            </motion.div>
          </CardContent>
        </AnimatedCard>

        <AnimatedCard delay={0.7}>
          <CardHeader>
            <CardTitle className="text-xl">{t('lifeChallenges')}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div
              className="p-4 bg-accent text-accent-foreground rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destinyMatrix.lifeChallenges.map((challenge: string, index: number) => (
                  <li key={index} className="text-sm mb-2">{challenge}</li>
                ))}
              </ul>
            </motion.div>
          </CardContent>
        </AnimatedCard>
      </div>
    </div>
  );
}