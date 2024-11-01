// Interpretaciones extendidas para cada número del 1 al 33
export function getExtendedInterpretation(number: number): string {
    const interpretations: Record<number, string> = {
      1: "Liderazgo, individualidad, acción. Eres un pionero con una fuerte voluntad para lograr tus objetivos.",
      2: "Cooperación, diplomacia y sensibilidad. Tu misión es encontrar equilibrio en las relaciones.",
      3: "Creatividad, expresión artística y sociabilidad. Tienes talento para comunicarte e inspirar.",
      4: "Disciplina, organización y esfuerzo. Estás destinado a construir cosas duraderas.",
      5: "Libertad, aventura y cambio. Te motiva explorar el mundo y adaptarte rápidamente.",
      6: "Responsabilidad, amor y cuidado. Tiendes a ser protector y a buscar armonía en la familia.",
      7: "Espiritualidad, introspección y análisis. Buscas conocimiento profundo y crecimiento interno.",
      8: "Éxito material, ambición y poder. Eres un gestor nato, orientado a los resultados.",
      9: "Humanitarismo, generosidad y altruismo. Tienes el deseo de ayudar y mejorar el mundo.",
      10: "Perfección, tenacidad y determinación. Buscas siempre la excelencia en lo que haces.",
      11: "Inspiración espiritual, visión y liderazgo. Tu misión es iluminar a los demás.",
      12: "Intuición, autoconocimiento y creatividad. Tienes habilidades especiales para comprenderte a ti mismo.",
      13: "Transformación y renacimiento. Eres capaz de cambiar y adaptarte a nuevas circunstancias.",
      14: "Aventura y exploración. Tienes un fuerte deseo de experimentar la vida al máximo.",
      15: "Maestría personal y desarrollo espiritual. Eres un maestro en tu propio camino.",
      16: "Desarrollo personal y autodescubrimiento. Buscas entenderte a un nivel más profundo.",
      17: "Éxito y reconocimiento. Estás destinado a alcanzar grandes logros en la vida.",
      18: "Desafíos y superación. Tienes la capacidad de enfrentar y superar dificultades.",
      19: "Autonomía y liderazgo. Estás destinado a crear tu propio camino.",
      20: "Intuición y sensibilidad. Te guías por tus instintos y comprendes a los demás.",
      21: "Creatividad y expresión. Tienes un talento innato para el arte y la comunicación.",
      22: "Construcción de grandes sueños. Estás destinado a lograr cosas excepcionales.",
      23: "Dinamismo y versatilidad. Tienes la capacidad de adaptarte y prosperar en diversas situaciones.",
      24: "Familia y amor. Buscas crear un hogar cálido y amoroso.",
      25: "Investigación y profundidad. Tienes una mente inquisitiva y analítica.",
      26: "Éxito en el negocio y liderazgo. Tienes habilidades naturales para el comercio y la gestión.",
      27: "Espiritualidad y servicio. Buscas ayudar a los demás y mejorar el mundo.",
      28: "Ambición y perseverancia. Tienes una fuerte voluntad para alcanzar tus metas.",
      29: "Humanitarismo y sacrificio. Eres capaz de poner a los demás antes que a ti mismo.",
      30: "Expresión creativa y artística. Tienes un don especial para la música, el arte o la escritura.",
      31: "Autenticidad y originalidad. Buscas ser fiel a ti mismo y a tus ideales.",
      32: "Maestría y enseñanza. Tienes la capacidad de guiar a los demás hacia su propio crecimiento.",
      33: "Amor incondicional y servicio. Tu propósito es inspirar y servir a la humanidad.",
      34: "Creatividad práctica. Combinas imaginación con habilidades prácticas para crear cosas tangibles.",
      35: "Expresión versátil. Tienes la capacidad de comunicarte efectivamente en diversas formas.",
      36: "Responsabilidad social. Sientes un fuerte llamado a contribuir al bienestar de tu comunidad.",
      37: "Sabiduría intuitiva. Posees una profunda comprensión que va más allá del conocimiento convencional.",
      38: "Liderazgo visionario. Tienes la capacidad de inspirar a otros hacia un futuro mejor.",
      39: "Expresión universal. Tu creatividad tiene el potencial de tocar vidas en todo el mundo.",
      40: "Practicidad espiritual. Puedes aplicar principios espirituales en la vida cotidiana.",
      // Add more interpretations as needed
    };
    return interpretations[number] || "Número no reconocido.";
  }

  // Nuevas interpretaciones para rasgos de personalidad
export function getPersonalityTraitInterpretation(trait: string): string {
  const traitInterpretations: Record<string, string> = {
    "Adaptable": "Tienes una gran capacidad para ajustarte a nuevas situaciones y entornos.",
    "Creativo": "Posees una mente imaginativa y la habilidad de generar ideas originales.",
    "Determinado": "Muestras una fuerte resolución y perseverancia en la consecución de tus objetivos.",
    "Impaciente": "A veces puedes sentirte ansioso por ver resultados inmediatos.",
    "Terco": "Tu firmeza puede ser una fortaleza, pero también puede dificultar el cambio de opinión.",
    "Indeciso": "Ocasionalmente, puedes tener dificultades para tomar decisiones rápidas.",
    // Add more trait interpretations as needed
  };
  return traitInterpretations[trait] || "Interpretación no disponible.";
}

// Nuevas interpretaciones para desafíos de vida
export function getLifeChallengeInterpretation(challenge: string): string {
  const challengeInterpretations: Record<string, string> = {
    "Superar la duda personal": "Aprender a confiar en tus habilidades y juicio es crucial para tu crecimiento.",
    "Construir relaciones significativas": "Desarrollar conexiones profundas y duraderas será una parte importante de tu viaje.",
    "Encontrar equilibrio entre trabajo y vida personal": "Lograr una armonía entre tus responsabilidades y tu bienestar personal es un desafío clave.",
    "Descubrir la verdadera pasión": "Identificar y perseguir lo que realmente te apasiona será fundamental para tu realización.",
    // Add more challenge interpretations as needed
  };
  return challengeInterpretations[challenge] || "Interpretación no disponible.";
}

// Nueva interpretación para la energía de género
export function getGenderEnergyInterpretation(energy: string): string {
  const energyInterpretations: Record<string, string> = {
    "Activa": "Tiendes a ser proactivo, iniciador y orientado a la acción en tu enfoque de la vida. Tu energía se manifiesta en la toma de iniciativas, la búsqueda de desafíos y la capacidad de liderar. Eres dinámico y te sientes cómodo tomando decisiones rápidas.",
    "Pasiva": "Tu fuerza radica en la receptividad, la reflexión y la capacidad de respuesta a las situaciones. Eres intuitivo, paciente y tienes una gran habilidad para adaptarte a las circunstancias. Tu energía se manifiesta en la empatía, la comprensión profunda y la capacidad de nutrir relaciones.",
    "Dual": "Posees una combinación única de energías activas y pasivas. Eres versátil y capaz de adaptarte a diferentes situaciones, utilizando tanto la iniciativa como la receptividad según sea necesario. Tu energía se manifiesta en la flexibilidad, la creatividad y la capacidad de ver las cosas desde múltiples perspectivas.",
    "Neutra": "Tu energía trasciende las categorías tradicionales, manifestándose de manera única y personal. Eres adaptable, equilibrado y capaz de fluir entre diferentes estados energéticos según la situación lo requiera. Tu fuerza radica en tu capacidad de ser auténtico y no estar limitado por expectativas convencionales."
  };
  return energyInterpretations[energy] || "Interpretación no disponible.";
}


// Nueva interpretación para los caminos generacionales
export function getGenerationalPathInterpretation(path: string): string {
  const pathInterpretations: Record<string, string> = {
    "masculine": "Este camino representa las influencias y lecciones heredadas de tu linaje paterno.",
    "feminine": "Este camino refleja las energías y sabiduría transmitidas a través de tu linaje materno.",
  };
  return pathInterpretations[path] || "Interpretación no disponible.";
}
// New interpretation for Pinnacles
export function getPinnacleInterpretation(pinnacleNumber: number, pinnacleAge: number): string {
  const baseInterpretation = getExtendedInterpretation(pinnacleNumber);
  return `Desde los ${pinnacleAge} años: ${baseInterpretation} Este período se enfoca en el desarrollo y manifestación de estas cualidades.`;
}

// New interpretation for Critical Ages
export function getCriticalAgeInterpretation(age: number): string {
  const interpretations: Record<number, string> = {
    9: "Transición de la niñez a la pre-adolescencia. Desarrollo de la identidad personal.",
    18: "Entrada a la edad adulta. Toma de decisiones importantes sobre el futuro.",
    27: "Consolidación de la carrera y relaciones. Posible crisis de identidad.",
    36: "Evaluación de logros y metas de vida. Posible cambio de dirección.",
    45: "Madurez y sabiduría. Reflexión sobre el propósito de vida.",
    54: "Nuevas perspectivas y posibles cambios de carrera o estilo de vida.",
    63: "Entrada a la tercera edad. Reflexión sobre el legado personal.",
    72: "Sabiduría y transmisión de conocimientos a generaciones más jóvenes.",
    81: "Contemplación y paz interior. Celebración de una vida plena."
  };
  return interpretations[age] || "Un momento de reflexión y potencial cambio en tu vida.";
}


// Nueva interpretación para el año personal
export function getPersonalYearInterpretation(year: number): string {
  const yearInterpretations: Record<number, string> = {
    1: "Un año de nuevos comienzos y oportunidades para la iniciativa personal.",
    2: "Un año para la cooperación, las relaciones y el equilibrio.",
    3: "Un año de creatividad, expresión personal y expansión social.",
    4: "Un año para construir bases sólidas y trabajar diligentemente.",
    5: "Un año de cambio, aventura y nuevas experiencias.",
    6: "Un año centrado en la familia, el hogar y las responsabilidades.",
    7: "Un año de reflexión, análisis y crecimiento espiritual.",
    8: "Un año de logros materiales, poder y reconocimiento.",
    9: "Un año de conclusiones, liberación y preparación para un nuevo ciclo.",
  };
  return yearInterpretations[year] || "Interpretación no disponible.";
}