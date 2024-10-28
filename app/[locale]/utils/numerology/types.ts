export interface UserData {
    name: string;
    birthDate: string;
    gender: string;
    time: string;
    place: string;
    currentYear: number;
  }
  
  export interface DestinyMatrix {
    lifePathNumber: string;
    soulNumber: string;
    personalityNumber: string;
    expressionNumber: string;
    realizationNumber: string;
    generationalPaths: {
      masculine: string;
      feminine: string;
    };
    genderEnergy: string;
    criticalAges: number[];
    pinnacles: string[];
    personalYear: string;
  }