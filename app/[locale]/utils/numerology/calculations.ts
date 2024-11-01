import { letterValues, masterNumbers, vowels } from './constants';
import { UserData, DestinyMatrix, PersonalityTraits } from './types';

// Función para reducir a un solo dígito (excepto números maestros)
export function reduceToSingleDigit(num: number): number {
  if (isNaN(num)) return 0; // Manejo de NaN
  while (num > 9 && !masterNumbers.includes(num)) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Cálculo del Número de Vida
export function calculateLifePathNumber(birthDate: string): number {
  if (!birthDate) return 0; // Manejo de entrada vacía
  const digits = birthDate.replace(/\D/g, '').split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número del Alma (vocales del nombre)
export function calculateSoulNumber(name: string): number {
  if (!name) return 0; // Manejo de entrada vacía
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => vowels.includes(char))
    .reduce((acc, char) => acc + (letterValues[char] || 0), 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Personalidad (consonantes del nombre)
export function calculatePersonalityNumber(name: string): number {
  if (!name) return 0; // Manejo de entrada vacía
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => !vowels.includes(char))
    .reduce((acc, char) => acc + (letterValues[char] || 0), 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Expresión (nombre completo)
export function calculateExpressionNumber(name: string): number {
  if (!name) return 0; // Manejo de entrada vacía
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .reduce((acc, char) => acc + (letterValues[char] || 0), 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Realización (Número de Vida + Expresión)
export function calculateRealizationNumber(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression);
}

// Cálculo de Caminos Generacionales (masculino y femenino)
export function calculateGenerationalPaths(birthDate: string): { masculine: number; feminine: number } {
  if (!birthDate) return { masculine: 0, feminine: 0 };
  const [year, month, day] = birthDate.split('-').map(Number);
  return {
    masculine: reduceToSingleDigit(year),
    feminine: reduceToSingleDigit(month + day)
  };
}


// Cálculo de la Energía por Género (Activa, Pasiva, Dual o Neutra)
export function calculateGenderEnergy(gender: string): string {
  const upperGender = gender.toUpperCase();
  if (['M', 'HOMBRE', 'MALE'].includes(upperGender)) {
    return 'Activa';
  } else if (['F', 'MUJER', 'FEMALE'].includes(upperGender)) {
    return 'Pasiva';
  } else if (['NB', 'NO BINARIO', 'NON-BINARY'].includes(upperGender)) {
    return 'Dual';
  } else {
    return 'Neutra';
  }
}
// Cálculo de Edades Clave (múltiplos de 9)
export function calculateCriticalAges(): number[] {
  return Array.from({ length: 9 }, (_, i) => (i + 1) * 9);
}

// Cálculo de los Pináculos (Fases clave de la vida)
export function calculatePinnacles(birthDate: string): number[] {
  if (!birthDate) return [0, 0, 0, 0]; // Manejo de entrada vacía
  const [year, month, day] = birthDate.split('-').map(Number);
  const firstPinnacle = reduceToSingleDigit(month + day);
  const secondPinnacle = reduceToSingleDigit(day + year);
  const thirdPinnacle = reduceToSingleDigit(firstPinnacle + secondPinnacle);
  const fourthPinnacle = reduceToSingleDigit(month + year);
  return [firstPinnacle, secondPinnacle, thirdPinnacle, fourthPinnacle];
}

// Cálculo del Año Personal (influencias anuales)
export function calculatePersonalYear(currentYear: number, birthDate: string): number {
  if (!birthDate) return 0; // Manejo de entrada vacía
  const birthMonthDay = birthDate.slice(5).replace('-', '');
  const sum = currentYear + parseInt(birthMonthDay, 10);
  return reduceToSingleDigit(sum);
}

// Nueva función para calcular rasgos de personalidad basados en el nombre y la fecha de nacimiento
export function calculatePersonalityTraits(name: string, birthDate: string): PersonalityTraits {
  if (!name || !birthDate) return { strengths: [], weaknesses: [], idealCareer: '' };
  const nameSum = name.toUpperCase().split('').reduce((sum, char) => sum + (letterValues[char] || 0), 0);
  const dateSum = birthDate.replace(/\D/g, '').split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  
  const allStrengths = ['Adaptable', 'Creativo', 'Determinado', 'Intuitivo', 'Analítico'];
  const allWeaknesses = ['Impaciente', 'Terco', 'Indeciso', 'Perfeccionista', 'Sensible'];
  const careers = ['Tecnología', 'Artes', 'Negocios', 'Salud', 'Educación', 'Ciencias'];

  return {
    strengths: [allStrengths[nameSum % 5], allStrengths[(nameSum + 1) % 5]],
    weaknesses: [allWeaknesses[dateSum % 5], allWeaknesses[(dateSum + 1) % 5]],
    idealCareer: careers[((nameSum + dateSum) % 6)],
  };
}
// Función actualizada para calcular las edades de los Pináculos
export function calculatePinnacleAges(birthDate: string): number[] {
  if (!birthDate) return [0, 0, 0, 0];
  const [year, month, day] = birthDate.split('-').map(Number);
  const firstPinnacleEnd = 36 - reduceToSingleDigit(month + day);
  return [
    firstPinnacleEnd,
    firstPinnacleEnd + 9,
    firstPinnacleEnd + 18,
    99 // El cuarto pináculo dura hasta el final de la vida
  ];
}

// Nueva función para calcular desafíos de vida
export function calculateLifeChallenges(birthDate: string): string[] {
  if (!birthDate) return [];
  const challenges = [
    'Superar la duda personal',
    'Construir relaciones significativas',
    'Encontrar equilibrio entre trabajo y vida personal',
    'Descubrir la verdadera pasión',
    'Desarrollar la confianza en uno mismo',
    'Aprender a comunicarse efectivamente'
  ];
  const dateSum = birthDate.replace(/\D/g, '').split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  return challenges.slice(0, (dateSum % 3) + 2);
}

// Función actualizada para generar la Matriz del Destino
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
  const pinnacleAges = calculatePinnacleAges(birthDate);
  const personalYear = calculatePersonalYear(currentYear, birthDate);
  const personalityTraits = calculatePersonalityTraits(name, birthDate);
  const lifeChallenges = calculateLifeChallenges(birthDate);

  return {
    lifePathNumber,
    soulNumber,
    personalityNumber,
    expressionNumber,
    realizationNumber,
    generationalPaths,
    genderEnergy,
    criticalAges,
    pinnacles,
    pinnacleAges,
    personalYear,
    personalityTraits,
    lifeChallenges,
  };
}