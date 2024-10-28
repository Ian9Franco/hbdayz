export type ZodiacSign = {
    element: string;
    modality: "Cardinal" | "Fijo" | "Mutable";
    ruler: string;
    description: string;
    associatedDay?: string;
  };
  
  export interface CompatibilityResult {
    sign: string;
    compatible: boolean;
    score: number;
    compatibilityLevel: string;
    message: string;
    compatibilityFactors: string[];
  }
  
  export type Planet = "Sol" | "Luna" | "Marte" | "Venus" | "Mercurio" | 
                       "Júpiter" | "Saturno" | "Urano" | "Neptuno" | "Plutón";
  
  export interface NatalChart {
    planet: Planet;
    sign: string;
  }