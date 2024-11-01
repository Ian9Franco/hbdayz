// Interfaz para los datos del usuario
export interface UserData {
  name: string;
  birthDate: string;
  gender: string;
  time: string;
  place: string;
  currentYear: number;
}

// Interfaz actualizada para los rasgos de personalidad
export interface PersonalityTraits {
  strengths: string[];
  weaknesses: string[];
  idealCareer: string;
}

export interface DestinyMatrix {
  lifePathNumber: number;
  soulNumber: number;
  personalityNumber: number;
  expressionNumber: number;
  realizationNumber: number;
  generationalPaths: {
    masculine: number;
    feminine: number;
  };
  genderEnergy: string;
  criticalAges: number[];
  pinnacles: number[];
  pinnacleAges: number[]; // New property
  personalYear: number;
  personalityTraits: PersonalityTraits;
  lifeChallenges: string[];
}

