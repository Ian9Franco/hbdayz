// Importaciones de módulos locales
import * as constants from './constants';
import * as calculations from './calculations';
import * as interpretations from './interpretations';
import * as types from './types';

// Exportación de todos los elementos de los módulos importados
export * from './constants';
export * from './calculations';
export * from './interpretations';
export * from './types';

// Importación de funciones específicas del módulo de cálculos
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
  calculatePersonalYear,
  generateDestinyMatrix,
  calculatePersonalityTraits,
  calculateLifeChallenges
} from './calculations';

// Importación de funciones de interpretación
import {
  getExtendedInterpretation,
  getPersonalityTraitInterpretation,
  getLifeChallengeInterpretation,
  getGenderEnergyInterpretation,
  getGenerationalPathInterpretation,
  getPersonalYearInterpretation
} from './interpretations';

// Importación de tipos
import { UserData, DestinyMatrix, PersonalityTraits } from './types';

// Función auxiliar para convertir string a number
function toNumber(value: string | number): number {
  return typeof value === 'string' ? parseInt(value, 10) : value;
}

// Función wrapper actualizada para generar la matriz del destino con interpretaciones
export function generateDestinyMatrixWrapper(data: UserData): DestinyMatrix {
  const matrix = generateDestinyMatrix(data);

  return {
    ...matrix,
    lifePathNumber: toNumber(matrix.lifePathNumber),
    soulNumber: toNumber(matrix.soulNumber),
    personalityNumber: toNumber(matrix.personalityNumber),
    expressionNumber: toNumber(matrix.expressionNumber),
    realizationNumber: toNumber(matrix.realizationNumber),
    generationalPaths: {
      masculine: toNumber(matrix.generationalPaths.masculine),
      feminine: toNumber(matrix.generationalPaths.feminine)
    },
    pinnacles: matrix.pinnacles.map(toNumber),
    personalYear: toNumber(matrix.personalYear),
    personalityTraits: {
      strengths: matrix.personalityTraits.strengths.map(getPersonalityTraitInterpretation),
      weaknesses: matrix.personalityTraits.weaknesses.map(getPersonalityTraitInterpretation),
      idealCareer: matrix.personalityTraits.idealCareer
    },
    lifeChallenges: matrix.lifeChallenges.map(getLifeChallengeInterpretation)
  };
}

// Exportar todas las funciones y tipos necesarios
export {
  calculateLifePathNumber,
  calculateSoulNumber,
  calculatePersonalityNumber,
  calculateExpressionNumber,
  calculateRealizationNumber,
  calculateGenerationalPaths,
  calculateGenderEnergy,
  calculateCriticalAges,
  calculatePinnacles,
  calculatePersonalYear,
  calculatePersonalityTraits,
  calculateLifeChallenges,
  getExtendedInterpretation,
  getPersonalityTraitInterpretation,
  getLifeChallengeInterpretation,
  getGenderEnergyInterpretation,
  getGenerationalPathInterpretation,
  getPersonalYearInterpretation,

};

export type { UserData } from './types';
export type { DestinyMatrix } from './types';
export type { PersonalityTraits } from './types';