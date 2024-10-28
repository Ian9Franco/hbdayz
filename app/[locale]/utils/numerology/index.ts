export * from './constants';
export * from './calculations';
export * from './interpretations';
export * from './types';

import {
  calculateLifePathNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculateExpressionNumber,
  calculateRealizationNumber,
  calculateGenerationalPaths,
  calculateGenderEnergy,
  calculateCriticalAges,
  calculatePinnacles,
  calculatePersonalYear
} from './calculations';
import { getExtendedInterpretation } from './interpretations';
import { UserData, DestinyMatrix } from './types';

// Generación completa del "Gráfico Virtual"
export function generateDestinyMatrix(data: UserData): DestinyMatrix {
  const { name, birthDate, gender, currentYear } = data;

  const lifePathNumber = calculateLifePathNumber(birthDate);
  const soulNumber = calculateSoulNumber(name);
  const personalityNumber = calculatePersonalityNumber(name);
  const expressionNumber = calculateExpressionNumber(name);
  const realizationNumber = calculateRealizationNumber(lifePathNumber, expressionNumber);
  const generationalPaths = calculateGenerationalPaths(birthDate);
  const genderEnergy = calculateGenderEnergy(gender);
  const criticalAges = calculateCriticalAges();
  const pinnacles = calculatePinnacles(birthDate);
  const personalYear = calculatePersonalYear(currentYear, birthDate);

  return {
    lifePathNumber: getExtendedInterpretation(lifePathNumber),
    soulNumber: getExtendedInterpretation(soulNumber),
    personalityNumber: getExtendedInterpretation(personalityNumber),
    expressionNumber: getExtendedInterpretation(expressionNumber),
    realizationNumber: getExtendedInterpretation(realizationNumber),
    generationalPaths: {
      masculine: getExtendedInterpretation(generationalPaths.masculine),
      feminine: getExtendedInterpretation(generationalPaths.feminine)
    },
    genderEnergy,
    criticalAges,
    pinnacles: pinnacles.map(getExtendedInterpretation),
    personalYear: getExtendedInterpretation(personalYear)
  };
}