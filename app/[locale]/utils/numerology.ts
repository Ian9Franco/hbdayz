// Tabla de valores numéricos de las letras (A=1, B=2, ..., Z=26)
const letterValues: Record<string, number> = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((char, i) => {
  letterValues[char] = (i % 9) + 1; // Ciclo de valores de 1 a 9
});

// Números maestros y otros números que no se reducirán
const masterNumbers = [11, 22, 33];

// Función para reducir a un solo dígito (excepto números maestros)
function reduceToSingleDigit(num: number): number {
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
function calculateSoulNumber(name: string): number {
  const vowels = 'AEIOU';
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => vowels.includes(char))
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Personalidad (consonantes del nombre)
function calculatePersonalityNumber(name: string): number {
  const vowels = 'AEIOU';
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .filter(char => !vowels.includes(char))
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Expresión (nombre completo)
function calculateExpressionNumber(name: string): number {
  const sum = name
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .reduce((acc, char) => acc + letterValues[char], 0);
  return reduceToSingleDigit(sum);
}

// Cálculo del Número de Realización (Número de Vida + Expresión)
function calculateRealizationNumber(lifePath: number, expression: number): number {
  return reduceToSingleDigit(lifePath + expression);
}

// Cálculo de Caminos Generacionales (masculino y femenino)
function calculateGenerationalPaths(birthDate: string): { masculine: number; feminine: number } {
  const [year, month, day] = birthDate.split('-').map(Number);
  return {
    masculine: reduceToSingleDigit(year),
    feminine: reduceToSingleDigit(day + month)
  };
}

// Cálculo de la Energía por Género (Activa o Pasiva)
function calculateGenderEnergy(gender: string): string {
  return ['M', 'HOMBRE'].includes(gender.toUpperCase()) ? 'Activa' : 'Pasiva';
}

// Cálculo de Edades Clave (múltiplos de 9)
function calculateCriticalAges(): number[] {
  const ages = [];
  for (let i = 9; i <= 81; i += 9) {
    ages.push(i);
  }
  return ages;
}

// Cálculo de los Pináculos (Fases clave de la vida)
function calculatePinnacles(birthDate: string): number[] {
  const [year, month, day] = birthDate.split('-').map(Number);
  const firstPinnacle = reduceToSingleDigit(month + day);
  const secondPinnacle = reduceToSingleDigit(day + year);
  const thirdPinnacle = reduceToSingleDigit(firstPinnacle + secondPinnacle);
  const fourthPinnacle = reduceToSingleDigit(month + year);
  return [firstPinnacle, secondPinnacle, thirdPinnacle, fourthPinnacle];
}

// Cálculo del Año Personal (influencias anuales)
function calculatePersonalYear(currentYear: number, birthDate: string): number {
  const birthMonthDay = birthDate.slice(5).replace('-', '');
  const sum = currentYear + parseInt(birthMonthDay);
  return reduceToSingleDigit(sum);
}

// Interpretaciones extendidas para cada número del 1 al 33
function getExtendedInterpretation(number: number): string {
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

// Generación completa del "Gráfico Virtual"
export function generateDestinyMatrix(data: {
  name: string;
  birthDate: string;
  gender: string;
  time: string;
  place: string;
  currentYear: number;
}) {
  const { name, birthDate, gender, currentYear } = data;

  const lifePathNumber = calculateLifePathNumber(birthDate);
  const soulNumber = calculateSoulNumber(name);
  const personalityNumber = calculatePersonalityNumber(name);
  const expressionNumber = calculateExpressionNumber(name);
  const realizationNumber = calculateRealizationNumber(lifePathNumber, expressionNumber);
  const generationalPaths = calculateGenerationalPaths(birthDate);
  const genderEnergy = calculateGenderEnergy(gender);
  const criticalAges = calculateCriticalAges();
  const pinnacles = calculatePinnacles(birthDate);
  const personalYear = calculatePersonalYear(currentYear, birthDate);

  return {
    lifePathNumber: getExtendedInterpretation(lifePathNumber),
    soulNumber: getExtendedInterpretation(soulNumber),
    personalityNumber: getExtendedInterpretation(personalityNumber),
    expressionNumber: getExtendedInterpretation(expressionNumber),
    realizationNumber: getExtendedInterpretation(realizationNumber),
    generationalPaths: {
      masculine: getExtendedInterpretation(generationalPaths.masculine),
      feminine: getExtendedInterpretation(generationalPaths.feminine)
    },
    genderEnergy,
    criticalAges,
    pinnacles: pinnacles.map(getExtendedInterpretation),
    personalYear: getExtendedInterpretation(personalYear)
  };
}

// Ejemplo de uso
export default function Component() {
  const userData = {
    name: "Carlos Alberto",
    birthDate: "1990-12-03",
    gender: "Hombre",
    time: "14:30",
    place: "Madrid",
    currentYear: 2024
  };

  const destinyMatrixResult = generateDestinyMatrix(userData);
  console.log(destinyMatrixResult);

  return null; // Este componente no renderiza nada, es solo un módulo
}