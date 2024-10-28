import { zodiacSigns } from './data';
import { CompatibilityResult } from './types';

export function calculateCompatibility(
  sign1: string,
  sign2: string
): CompatibilityResult {
  const { element: element1, modality: modality1 } = zodiacSigns[sign1 as keyof typeof zodiacSigns];
  const { element: element2, modality: modality2 } = zodiacSigns[sign2 as keyof typeof zodiacSigns];

  let score = 0;
  let compatibilityFactors: string[] = [];

  // Element compatibility
  if (element1 === element2) {
    score += 30;
    compatibilityFactors.push("Elementos iguales (+30)");
  } else if (
    (element1 === "Fuego" && element2 === "Aire") ||
    (element1 === "Aire" && element2 === "Fuego") ||
    (element1 === "Tierra" && element2 === "Agua") ||
    (element1 === "Agua" && element2 === "Tierra")
  ) {
    score += 20;
    compatibilityFactors.push("Elementos complementarios (+20)");
  }

  // Modality compatibility
  if (modality1 === modality2) {
    score += 15;
    compatibilityFactors.push("Misma modalidad (+15)");
  } else if (
    (modality1 === "Cardinal" && modality2 === "Mutable") ||
    (modality1 === "Mutable" && modality2 === "Cardinal")
  ) {
    score += 10;
    compatibilityFactors.push("Modalidades complementarias (+10)");
  }

  // Specific sign compatibility
  const oppositeSignBonus: Record<string, string> = {
    Aries: "Libra", Taurus: "Scorpio", Gemini: "Sagittarius", Cancer: "Capricorn",
    Leo: "Aquarius", Virgo: "Pisces", Libra: "Aries", Scorpio: "Taurus",
    Sagittarius: "Gemini", Capricorn: "Cancer", Aquarius: "Leo", Pisces: "Virgo"
  };

  if (oppositeSignBonus[sign1] === sign2) {
    score += 25;
    compatibilityFactors.push("Signos opuestos complementarios (+25)");
  }

  // Determine compatibility level and message
  let compatibilityLevel: string, message: string;
  if (score >= 70) {
    compatibilityLevel = "Excelente";
    message = `${sign1} y ${sign2} tienen una compatibilidad excelente. Su relación tiene un gran potencial para el crecimiento y la armonía.`;
  } else if (score >= 50) {
    compatibilityLevel = "Buena";
    message = `${sign1} y ${sign2} tienen una buena compatibilidad. Con esfuerzo y comprensión, pueden formar una relación sólida.`;
  } else if (score >= 30) {
    compatibilityLevel = "Moderada";
    message = `${sign1} y ${sign2} tienen una compatibilidad moderada. Pueden enfrentar desafíos, pero también tienen oportunidades de aprendizaje y crecimiento.`;
  } else {
    compatibilityLevel = "Desafiante";
    message = `${sign1} y ${sign2} pueden enfrentar desafíos significativos en su compatibilidad. Se requerirá mucha comprensión y adaptación mutua.`;
  }

  return {
    sign: sign2,
    compatible: score >= 50,
    score,
    compatibilityLevel,
    message,
    compatibilityFactors
  };
}

export function calculateAllCompatibilities(sign: string): CompatibilityResult[] {
  const allSigns = Object.keys(zodiacSigns);
  return allSigns
    .filter(otherSign => otherSign !== sign)
    .map(otherSign => calculateCompatibility(sign, otherSign))
    .sort((a, b) => b.score - a.score);
}

export function getLeastCompatibleSigns(sign: string): CompatibilityResult[] {
  return calculateAllCompatibilities(sign)
    .filter(result => result.compatibilityLevel === "Desafiante")
    .slice(0, 3);
}