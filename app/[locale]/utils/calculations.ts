// Función para calcular la edad actual
export function calculateCurrentAge(birthDate: string): number {
  const today = new Date();
  const [month, day, year] = birthDate.split(' ');
  const birthDateObj = new Date(`${month} ${day}, ${year}`);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
}

// Función para calcular la edad en el próximo cumpleaños
export function calculateNextAge(birthDate: string): number {
  return calculateCurrentAge(birthDate) + 1;
}

// Función para calcular el signo zodiacal
export function calculateZodiacSign(birthDate: string): { es: string; en: string } {
  const [month, day] = birthDate.split(' ');
  const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
  const dayNum = parseInt(day);

  if ((monthIndex === 2 && dayNum >= 21) || (monthIndex === 3 && dayNum <= 19)) return { es: "Aries", en: "Aries" };
  if ((monthIndex === 3 && dayNum >= 20) || (monthIndex === 4 && dayNum <= 20)) return { es: "Tauro", en: "Taurus" };
  if ((monthIndex === 4 && dayNum >= 21) || (monthIndex === 5 && dayNum <= 20)) return { es: "Géminis", en: "Gemini" };
  if ((monthIndex === 5 && dayNum >= 21) || (monthIndex === 6 && dayNum <= 22)) return { es: "Cáncer", en: "Cancer" };
  if ((monthIndex === 6 && dayNum >= 23) || (monthIndex === 7 && dayNum <= 22)) return { es: "Leo", en: "Leo" };
  if ((monthIndex === 7 && dayNum >= 23) || (monthIndex === 8 && dayNum <= 22)) return { es: "Virgo", en: "Virgo" };
  if ((monthIndex === 8 && dayNum >= 23) || (monthIndex === 9 && dayNum <= 22)) return { es: "Libra", en: "Libra" };
  if ((monthIndex === 9 && dayNum >= 23) || (monthIndex === 10 && dayNum <= 21)) return { es: "Escorpio", en: "Scorpio" };
  if ((monthIndex === 10 && dayNum >= 22) || (monthIndex === 11 && dayNum <= 21)) return { es: "Sagitario", en: "Sagittarius" };
  if ((monthIndex === 11 && dayNum >= 22) || (monthIndex === 0 && dayNum <= 19)) return { es: "Capricornio", en: "Capricorn" };
  if ((monthIndex === 0 && dayNum >= 20) || (monthIndex === 1 && dayNum <= 18)) return { es: "Acuario", en: "Aquarius" };
  return { es: "Piscis", en: "Pisces" };
}

// Función para calcular el elemento astrológico
export function calculateAstrologicalElement(zodiacSign: string): { es: string; en: string } {
  const fireSigns = ["Aries", "Leo", "Sagitario", "Sagittarius"];
  const earthSigns = ["Tauro", "Virgo", "Capricornio", "Taurus", "Capricorn"];
  const airSigns = ["Géminis", "Libra", "Acuario", "Gemini", "Aquarius"];
  const waterSigns = ["Cáncer", "Escorpio", "Piscis", "Cancer", "Scorpio", "Pisces"];

  if (fireSigns.includes(zodiacSign)) return { es: "Fuego", en: "Fire" };
  if (earthSigns.includes(zodiacSign)) return { es: "Tierra", en: "Earth" };
  if (airSigns.includes(zodiacSign)) return { es: "Aire", en: "Air" };
  if (waterSigns.includes(zodiacSign)) return { es: "Agua", en: "Water" };
  return { es: "Desconocido", en: "Unknown" };
}

// Función para calcular la compatibilidad entre dos signos
export function calculateCompatibility(sign1: string, sign2: string): string {
  const compatiblePairs = [
    ["Aries", "Leo"], ["Tauro", "Virgo"], ["Géminis", "Libra"], ["Cáncer", "Escorpio"],
    ["Sagitario", "Acuario"], ["Capricornio", "Tauro"]
  ];

  return compatiblePairs.some(pair => pair.includes(sign1) && pair.includes(sign2))
    ? "Alta compatibilidad"
    : "Compatibilidad moderada";
}

// Función para calcular el día de la semana de nacimiento
export function calculateDayOfWeek(birthDate: string): string {
  const [month, day, year] = birthDate.split(' ');
  const date = new Date(`${month} ${day}, ${year}`);
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return days[date.getDay()];
}

// Función para calcular el número de vida (numerología)
export function calculateLifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((acc, num) => acc + num, 0);

  while (sum >= 10) {
    sum = sum.toString().split('').map(Number).reduce((acc, num) => acc + num, 0);
  }
  return sum;
}

// Función para calcular la diferencia horaria entre el lugar de nacimiento y el usuario
export function calculateTimeDifference(birthPlace: string, userTimezone: string): string {
  // Aquí puedes integrar una API externa para obtener los husos horarios si lo necesitas
  return `Diferencia horaria entre ${birthPlace} y ${userTimezone} pendiente de implementar.`;
}
