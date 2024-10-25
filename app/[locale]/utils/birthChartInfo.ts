// Explicación detallada de conceptos de la Carta Astral

export const zodiacSigns: Record<string, { element: string; description: string }> = {
    Aries: {
      element: "Fuego",
      description: 
        "Aries es enérgico, valiente y directo. Tiende a ser impulsivo pero tiene una gran capacidad de liderazgo e iniciativa."
    },
    Tauro: {
      element: "Tierra",
      description: 
        "Tauro es estable, leal y práctico. Valora la seguridad y disfruta de los placeres materiales."
    },
    Géminis: {
      element: "Aire",
      description: 
        "Géminis es curioso, comunicativo y versátil. Se adapta rápidamente y disfruta de la conversación y el aprendizaje constante."
    },
    Cáncer: {
      element: "Agua",
      description: 
        "Cáncer es emocional, protector y empático. Suele enfocarse en la familia y las relaciones cercanas."
    },
    Leo: {
      element: "Fuego",
      description: 
        "Leo es carismático, creativo y seguro de sí mismo. Le encanta ser el centro de atención y busca el reconocimiento."
    },
    Virgo: {
      element: "Tierra",
      description: 
        "Virgo es analítico, perfeccionista y trabajador. Tiene una gran atención al detalle y busca ayudar a los demás."
    },
    Libra: {
      element: "Aire",
      description: 
        "Libra es diplomático, encantador y amante de la armonía. Valora las relaciones y busca la justicia y el equilibrio."
    },
    Escorpio: {
      element: "Agua",
      description: 
        "Escorpio es intenso, apasionado y reservado. Tiene una gran capacidad de transformación y busca la verdad profunda."
    },
    Sagitario: {
      element: "Fuego",
      description: 
        "Sagitario es optimista, aventurero y amante de la libertad. Le encanta viajar y explorar nuevas ideas y culturas."
    },
    Capricornio: {
      element: "Tierra",
      description: 
        "Capricornio es disciplinado, ambicioso y responsable. Se enfoca en alcanzar metas a largo plazo."
    },
    Acuario: {
      element: "Aire",
      description: 
        "Acuario es innovador, humanitario e independiente. Valora la originalidad y busca contribuir al bien común."
    },
    Piscis: {
      element: "Agua",
      description: 
        "Piscis es sensible, intuitivo y compasivo. Tiene una gran imaginación y conexión con el mundo emocional."
    }
  };
  
  // Días de la semana y sus significados astrológicos
  export const dayOfWeekMeaning: Record<string, string> = {
    Domingo: "Regido por el Sol. Un día para el crecimiento personal y la autoexpresión.",
    Lunes: "Regido por la Luna. Ideal para conectarse con las emociones y el hogar.",
    Martes: "Regido por Marte. Favorece la acción, la iniciativa y la valentía.",
    Miércoles: "Regido por Mercurio. Propicio para la comunicación y el aprendizaje.",
    Jueves: "Regido por Júpiter. Un día para la expansión, el conocimiento y la abundancia.",
    Viernes: "Regido por Venus. Excelente para el amor, la belleza y la armonía.",
    Sábado: "Regido por Saturno. Ideal para la disciplina y la planificación a largo plazo."
  };
  
  // Función para explicar el elemento astrológico
  export function explainElement(element: string): string {
    switch (element) {
      case "Fuego":
        return "Los signos de fuego son apasionados, energéticos y buscan la acción.";
      case "Tierra":
        return "Los signos de tierra son prácticos, estables y buscan la seguridad.";
      case "Aire":
        return "Los signos de aire son intelectuales, comunicativos y buscan nuevas ideas.";
      case "Agua":
        return "Los signos de agua son emocionales, intuitivos y buscan la conexión profunda.";
      default:
        return "Elemento no reconocido.";
    }
  }
  
  // Función para interpretar la compatibilidad de signos
  export function explainCompatibility(sign1: string, sign2: string): string {
    if (
      (sign1 === "Aries" && sign2 === "Leo") || 
      (sign1 === "Tauro" && sign2 === "Virgo") ||
      (sign1 === "Géminis" && sign2 === "Libra")
    ) {
      return `${sign1} y ${sign2} tienen alta compatibilidad por su energía similar y objetivos comunes.`;
    }
    return `${sign1} y ${sign2} pueden tener desafíos, pero con esfuerzo pueden complementarse bien.`;
  }
  
  // Función para interpretar la diferencia horaria
  export function explainTimeDifference(place: string, timezone: string): string {
    return `La diferencia horaria entre ${place} y ${timezone} puede afectar tus ritmos personales y conexiones con otras personas.`;
  }
  