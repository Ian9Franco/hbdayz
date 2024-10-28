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
      33: "Amor incondicional y servicio. Tu propósito es inspirar y servir a la humanidad."
    };
    return interpretations[number] || "Número no reconocido.";
  }