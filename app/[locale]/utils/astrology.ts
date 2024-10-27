// Tipos e Interfaces
type ZodiacSign = {
  element: string;
  modality: "Cardinal" | "Fijo" | "Mutable";
  ruler: string;
  description: string;
  associatedDay?: string;
};

type CompatibilityResult = {
  compatible: boolean;
  message: string;
};

type Planet = "Sol" | "Luna" | "Marte" | "Venus" | "Mercurio" | 
              "Júpiter" | "Saturno" | "Urano" | "Neptuno" | "Plutón";

interface NatalChart {
  planet: Planet;
  sign: string;
}

// Datos de los signos zodiacales
export const zodiacSigns: Record<string, ZodiacSign> = {
  Aries: {
    element: "Fuego",
    modality: "Cardinal",
    ruler: "Marte",
    description: "Aries es enérgico, valiente y directo. Tiende a ser impulsivo pero tiene gran capacidad de liderazgo.",
  },
  Taurus: {
    element: "Tierra",
    modality: "Fijo",
    ruler: "Venus",
    description: "Tauro es estable, leal y práctico. Valora la seguridad y disfruta de los placeres materiales.",
  },
  Gemini: {
    element: "Aire",
    modality: "Mutable",
    ruler: "Mercurio",
    description: "Géminis es curioso, adaptable y comunicativo. Tiene un espíritu inquieto y busca constantemente nuevos conocimientos.",
  },
  Cancer: {
    element: "Agua",
    modality: "Cardinal",
    ruler: "Luna",
    description: "Cáncer es emocional, intuitivo y protector. Valora la familia y el hogar, y tiende a ser muy sensible.",
  },
  Leo: {
    element: "Fuego",
    modality: "Fijo",
    ruler: "Sol",
    description: "Leo es carismático, generoso y dramático. Le gusta ser el centro de atención y tiene una gran capacidad creativa.",
  },
  Virgo: {
    element: "Tierra",
    modality: "Mutable",
    ruler: "Mercurio",
    description: "Virgo es analítico, práctico y meticuloso. Se preocupa por los detalles y busca la perfección en todo lo que hace.",
  },
  Libra: {
    element: "Aire",
    modality: "Cardinal",
    ruler: "Venus",
    description: "Libra es diplomático, justo y sociable. Valora las relaciones y busca el equilibrio y la armonía.",
  },
  Scorpio: {
    element: "Agua",
    modality: "Fijo",
    ruler: "Plutón",
    description: "Escorpio es intenso, apasionado y misterioso. Tiene un gran poder de transformación y profundiza en lo oculto.",
  },
  Sagittarius: {
    element: "Fuego",
    modality: "Mutable",
    ruler: "Júpiter",
    description: "Sagitario es aventurero, optimista y filosófico. Busca la verdad y disfruta de la libertad y la exploración.",
  },
  Capricorn: {
    element: "Tierra",
    modality: "Cardinal",
    ruler: "Saturno",
    description: "Capricornio es ambicioso, disciplinado y responsable. Tiene un enfoque práctico hacia la vida y busca alcanzar sus metas.",
  },
  Aquarius: {
    element: "Aire",
    modality: "Fijo",
    ruler: "Urano",
    description: "Acuario es innovador, independiente y humanitario. Valora la originalidad y busca cambiar el mundo.",
  },
  Pisces: {
    element: "Agua",
    modality: "Mutable",
    ruler: "Neptuno",
    description: "Piscis es soñador, empático y espiritual. Tiende a ser muy sensible y busca la conexión con lo trascendental.",
  },
};

// Significados de los días de la semana
export const dayOfWeekMeaning: Record<string, string> = {
  Domingo: "Regido por el Sol. Un día para el crecimiento personal y la autoexpresión.",
  Lunes: "Regido por la Luna. Ideal para conectar con las emociones y nutrir la reflexión.",
  Martes: "Regido por Marte. Un día para la acción, el coraje y la actividad física.",
  Miércoles: "Regido por Mercurio. Propicio para la comunicación, el aprendizaje y los viajes.",
  Jueves: "Regido por Júpiter. Un día para la expansión, la suerte y la prosperidad.",
  Viernes: "Regido por Venus. Ideal para el amor, la belleza y las relaciones.",
  Sábado: "Regido por Saturno. Un día para la disciplina, la responsabilidad y la estructura."
};


// Planetary Influences
export const planetInfluences: Record<Planet, Record<string, string>> = {
  Sol: {
    Aries: "Energía, liderazgo y espíritu pionero.",
    Tauro: "Estabilidad, búsqueda de placeres y seguridad.",
    Géminis: "Versatilidad, comunicación y curiosidad.",
    Cáncer: "Creatividad, autoexpresión y necesidad de afecto.",
    Leo: "Confianza, generosidad y deseo de ser admirado.",
    Virgo: "Practicidad, atención al detalle y enfoque en el servicio.",
    Libra: "Armonía, relaciones y búsqueda de belleza.",
    Escorpio: "Intensidad, pasión y deseo de transformación.",
    Sagitario: "Aventura, filosofía y búsqueda de la verdad.",
    Capricornio: "Ambición, disciplina y necesidad de estructura.",
    Acuario: "Innovación, originalidad y enfoque en la comunidad.",
    Piscis: "Sensibilidad, espiritualidad y conexión con lo intuitivo.",
  },
  Luna: {
    Aries: "Emociones intensas y reacciones rápidas.",
    Tauro: "Necesidad de seguridad emocional y estabilidad.",
    Géminis: "Cambio constante en los estados emocionales.",
    Cáncer: "Profunda conexión emocional y deseo de cuidar.",
    Leo: "Necesidad de reconocimiento y expresión creativa.",
    Virgo: "Análisis emocional y búsqueda de orden.",
    Libra: "Búsqueda de equilibrio en las relaciones personales.",
    Escorpio: "Emociones profundas y deseo de conexión intensa.",
    Sagitario: "Necesidad de libertad y exploración emocional.",
    Capricornio: "Enfoque práctico y control emocional.",
    Acuario: "Emociones desapegadas y pensamiento innovador.",
    Piscis: "Intuición emocional y sensibilidad extrema.",
  },
  Mercurio: {
    Aries: "Pensamiento rápido y comunicación directa.",
    Tauro: "Enfoque práctico en la comunicación y el aprendizaje.",
    Géminis: "Comunicación versátil y curiosidad intelectual.",
    Cáncer: "Pensamientos emocionales y comunicación sensible.",
    Leo: "Creatividad en la expresión y pensamientos optimistas.",
    Virgo: "Análisis detallado y enfoque práctico en la comunicación.",
    Libra: "Comunicación diplomática y búsqueda de armonía.",
    Escorpio: "Pensamiento profundo y habilidades investigativas.",
    Sagitario: "Comunicación entusiasta y pensamientos filosóficos.",
    Capricornio: "Comunicación estructurada y enfoque pragmático.",
    Acuario: "Pensamiento original y comunicación innovadora.",
    Piscis: "Comunicación intuitiva y conexión espiritual.",
  },
  Venus: {
    Aries: "Amor apasionado y deseo de aventura.",
    Tauro: "Búsqueda de placer y estabilidad en las relaciones.",
    Géminis: "Relaciones dinámicas y comunicación en el amor.",
    Cáncer: "Amor nutritivo y emocional.",
    Leo: "Amor generoso y deseo de admiración.",
    Virgo: "Amor práctico y atención a los detalles.",
    Libra: "Amor romántico y búsqueda de equilibrio.",
    Escorpio: "Amor intenso y emocionalmente profundo.",
    Sagitario: "Amor aventurero y filosófico.",
    Capricornio: "Amor serio y compromiso a largo plazo.",
    Acuario: "Amor independiente y original.",
    Piscis: "Amor espiritual y compasivo.",
  },
  Marte: {
    Aries: "Acción audaz y energía competitiva.",
    Tauro: "Energía persistente y enfoque en objetivos.",
    Géminis: "Acción rápida y versatilidad.",
    Cáncer: "Energía protectora y emocional.",
    Leo: "Energía creativa y deseo de destacar.",
    Virgo: "Energía práctica y enfocada en el trabajo.",
    Libra: "Acción diplomática y búsqueda de equilibrio.",
    Escorpio: "Energía intensa y motivación profunda.",
    Sagitario: "Energía aventurera y deseo de explorar.",
    Capricornio: "Energía disciplinada y orientada a metas.",
    Acuario: "Energía innovadora y pensamiento original.",
    Piscis: "Energía intuitiva y compasiva.",
  },
  Júpiter: {
    Aries: "Expansión a través de la acción y el liderazgo.",
    Tauro: "Expansión a través de la estabilidad y el crecimiento.",
    Géminis: "Expansión a través de la comunicación y el aprendizaje.",
    Cáncer: "Expansión emocional y conexión familiar.",
    Leo: "Expansión creativa y búsqueda de reconocimiento.",
    Virgo: "Expansión a través del servicio y el análisis.",
    Libra: "Expansión a través de relaciones y asociaciones.",
    Escorpio: "Expansión a través de la transformación y el poder.",
    Sagitario: "Expansión a través de la aventura y la filosofía.",
    Capricornio: "Expansión a través de la disciplina y el trabajo duro.",
    Acuario: "Expansión a través de la innovación y el pensamiento progresista.",
    Piscis: "Expansión a través de la espiritualidad y la creatividad.",
  },
  Saturno: {
    Aries: "Desafíos en la toma de decisiones rápidas.",
    Tauro: "Desafíos relacionados con la seguridad y el bienestar.",
    Géminis: "Desafíos en la comunicación y el aprendizaje.",
    Cáncer: "Desafíos emocionales y necesidad de estabilidad.",
    Leo: "Desafíos en la expresión y el reconocimiento.",
    Virgo: "Desafíos en el servicio y la atención al detalle.",
    Libra: "Desafíos en las relaciones y el equilibrio.",
    Escorpio: "Desafíos en la transformación y el poder personal.",
    Sagitario: "Desafíos en la búsqueda de la verdad y la aventura.",
    Capricornio: "Desafíos en la ambición y la disciplina.",
    Acuario: "Desafíos en la innovación y la independencia.",
    Piscis: "Desafíos en la intuición y la sensibilidad.",
  },
  Urano: {
    Aries: "Innovación y cambios inesperados en la acción.",
    Tauro: "Cambios en la estabilidad y la seguridad financiera.",
    Géminis: "Innovación en la comunicación y el aprendizaje.",
    Cáncer: "Cambios emocionales y en el hogar.",
    Leo: "Innovación creativa y en la autoexpresión.",
    Virgo: "Innovación en el trabajo y el servicio.",
    Libra: "Cambios en las relaciones y la diplomacia.",
    Escorpio: "Transformaciones inesperadas y profundas.",
    Sagitario: "Innovación en la filosofía y el pensamiento.",
    Capricornio: "Cambios en la estructura y la autoridad.",
    Acuario: "Innovación y liberación de restricciones.",
    Piscis: "Transformación y espiritualidad profunda.",
  },
  Neptuno: {
    Aries: "Sueños y visiones sobre la acción.",
    Tauro: "Sueños sobre la seguridad y la estabilidad.",
    Géminis: "Sueños relacionados con la comunicación.",
    Cáncer: "Sueños emocionales y familiares.",
    Leo: "Sueños creativos y de autoexpresión.",
    Virgo: "Sueños sobre el servicio y el trabajo.",
    Libra: "Sueños sobre el amor y las relaciones.",
    Escorpio: "Sueños profundos y transformadores.",
    Sagitario: "Sueños aventureros y filosóficos.",
    Capricornio: "Sueños sobre el éxito y la estructura.",
    Acuario: "Sueños innovadores y originales.",
    Piscis: "Sueños y espiritualidad profunda.",
  },
  Plutón: {
    Aries: "Transformación a través de la acción.",
    Tauro: "Transformación en la seguridad y los valores.",
    Géminis: "Transformación en la comunicación.",
    Cáncer: "Transformación emocional y familiar.",
    Leo: "Transformación en la autoexpresión.",
    Virgo: "Transformación en el servicio y el trabajo.",
    Libra: "Transformación en las relaciones.",
    Escorpio: "Transformación profunda y poderosa.",
    Sagitario: "Transformación filosófica y espiritual.",
    Capricornio: "Transformación en la ambición y la estructura.",
    Acuario:  "Transformación en la comunidad e innovación.",
    Piscis: "Transformación espiritual y emocional.",
  },
};

// Funciones
export function explainElement(element: string): string {
  const descriptions: Record<string, string> = {
    Fuego: "Los signos de fuego son apasionados, energéticos y buscan la acción.",
    Tierra: "Los signos de tierra son prácticos, estables y buscan la seguridad.",
    Aire: "Los signos de aire son intelectuales, comunicativos y buscan nuevas ideas.",
    Agua: "Los signos de agua son emocionales, intuitivos y buscan la conexión profunda.",
  };
  return descriptions[element] ?? "Elemento no reconocido.";
}

export function calculateCompatibility(
  sign1: string, 
  sign2: string
): CompatibilityResult {
  // Verificar si ambos signos existen en el objeto zodiacSigns
  if (!zodiacSigns[sign1] || !zodiacSigns[sign2]) {
    return {
      compatible: false,
      message: "Uno o ambos signos no son válidos."
    };
  }

  const element1 = zodiacSigns[sign1].element;
  const element2 = zodiacSigns[sign2].element;

  const compatibleElements = element1 === element2 || 
    (element1 === "Fuego" && element2 === "Aire") ||
    (element1 === "Aire" && element2 === "Fuego") ||
    (element1 === "Tierra" && element2 === "Agua") ||
    (element1 === "Agua" && element2 === "Tierra");

  const message = compatibleElements
    ? `${sign1} y ${sign2} tienen alta compatibilidad por su afinidad elemental.`
    : `${sign1} y ${sign2} podrían tener desafíos, pero con esfuerzo pueden complementarse.`;

  return { compatible: compatibleElements, message };
}

export function explainTimeDifference(
  place: string, 
  timezone: string
): string {
  return `La diferencia horaria entre ${place} y ${timezone} puede influir en tus ritmos y sincronización con los demás.`;
}

export function generateNatalChartInterpretation(chart: NatalChart[]): string {
  return chart
    .map(({ planet, sign }) =>
      `${planet} en ${sign}: ${planetInfluences[planet][sign] ?? "Sin interpretación disponible aún."}`
    )
    .join("\n");
}

// Example usage
export default function Component() {
  // Compatibility example
  const compatibilityResult = calculateCompatibility("Aries", "Leo");
  console.log(compatibilityResult.message);

  // Natal chart interpretation example
  const userChart: NatalChart[] = [
    { planet: "Sol", sign: "Leo" },
    { planet: "Luna", sign: "Piscis" },
    { planet: "Marte", sign: "Aries" },
    { planet: "Venus", sign: "Tauro" }
  ];
  console.log(generateNatalChartInterpretation(userChart));

  return null; // This component doesn't render anything, it's just a module
}