// Matriz del Destino - Explicación de Significados

// Traducción y significado de cada número en la Matriz del Destino
export const destinyMatrix: Record<number, { name: string; meaning: string }> = {
    1: {
      name: "Iniciador / Líder",
      meaning: "Representa liderazgo, independencia, originalidad y ambición. Estas personas tienden a tomar la iniciativa y asumir roles de responsabilidad."
    },
    2: {
      name: "Mediador / Diplomático",
      meaning: "Simboliza cooperación, sensibilidad y empatía. Las personas con este número tienen facilidad para trabajar en equipo y buscar armonía en las relaciones."
    },
    3: {
      name: "Creativo / Comunicador",
      meaning: "Asociado a la expresión artística, la creatividad y la sociabilidad. Estas personas disfrutan de actividades sociales y suelen destacar en roles públicos."
    },
    4: {
      name: "Estabilidad / Constructor",
      meaning: "Indica disciplina, esfuerzo y organización. Quienes tienen este número tienden a ser metódicos y confiables, construyendo estructuras sólidas y duraderas."
    },
    5: {
      name: "Aventurero / Cambio",
      meaning: "Simboliza libertad, curiosidad y adaptabilidad. Las personas con este número disfrutan de explorar y buscan constantemente nuevas experiencias."
    },
    6: {
      name: "Responsable / Cuidador",
      meaning: "Representa responsabilidad, amor y cuidado por los demás. Estas personas suelen tener roles familiares importantes o vocación hacia el servicio comunitario."
    },
    7: {
      name: "Intelectual / Buscador",
      meaning: "Indica un enfoque introspectivo, con interés por el conocimiento y la espiritualidad. Tienden a ser analíticos y reflexivos."
    },
    8: {
      name: "Éxito / Poder",
      meaning: "Asociado al éxito material, poder y ambición. Estas personas suelen tener una fuerte capacidad para gestionar recursos y alcanzar objetivos financieros."
    },
    9: {
      name: "Humanitario / Idealista",
      meaning: "Simboliza generosidad, compasión y deseo de mejorar el mundo. Estas personas tienen un enfoque altruista y buscan servir a la comunidad."
    }
  };
  
  // Función para interpretar el Número de Vida
  export function interpretLifePathNumber(number: number): string {
    const meaning = destinyMatrix[number];
    return meaning
      ? `Tu Número de Vida es ${number}: ${meaning.name}. ${meaning.meaning}`
      : "Número no reconocido.";
  }
  
  // Ejemplo de uso
  console.log(interpretLifePathNumber(7));
  