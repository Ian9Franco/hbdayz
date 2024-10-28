import { letterValues, masterNumbers, vowels } from './constants';

// Función para reducir a un solo dígito (excepto números maestros)
export function reduceToSingleDigit(num: number): number {
  while (num > 9 && !masterNumbers.includes(num)) {
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return num;
}

// Cálculo del Número de Vida
export function calculateLifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número del Alma (vocales del nombre)
export function calculateSoulNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => vowels.includes(char))
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Personalidad (consonantes del nombre)
export function calculatePersonalityNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => !vowels.includes(char))
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Expresión (nombre completo)
export function calculateExpressionNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Realización (Número de Vida + Expresión)
export function calculateRealizationNumber(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression);
}

// Cálculo de Caminos Generacionales (masculino y femenino)
export function calculateGenerationalPaths(birthDate: string): { masculine: number; feminine: number } {
  const [year, month, day] = birthDate.split('-').map(Number);
  return {
    masculine: reduceToSingleDigit(year),
    feminine: reduceToSingleDigit(day + month)
  };
}

// Cálculo de la Energía por Género (Activa o Pasiva)
export function calculateGenderEnergy(gender: string): string {
  return ['M', 'HOMBRE'].includes(gender.toUpperCase()) ? 'Activa' : 'Pasiva';
}

// Cálculo de Edades Clave (múltiplos de 9)
export function calculateCriticalAges(): number[] {
  const ages = [];
  for (let i = 9; i <= 81; i += 9) {
    ages.push(i);
  }
  return ages;
}

// Cálculo de los Pináculos (Fases clave de la vida)
export function calculatePinnacles(birthDate: string): number[] {
  const [year, month, day] = birthDate.split('-').map(Number);
  const firstPinnacle = reduceToSingleDigit(month + day);
  const secondPinnacle = reduceToSingleDigit(day + year);
  const thirdPinnacle = reduceToSingleDigit(firstPinnacle + secondPinnacle);
  const fourthPinnacle = reduceToSingleDigit(month + year);
  return [firstPinnacle, secondPinnacle, thirdPinnacle, fourthPinnacle];
}

// Cálculo del Año Personal (influencias anuales)
export function calculatePersonalYear(currentYear: number, birthDate: string): number {
  const birthMonthDay = birthDate.slice(5).replace('-', '');
  const sum = currentYear + parseInt(birthMonthDay);
  return reduceToSingleDigit(sum);
}