import { planetInfluences } from './data';
import { NatalChart } from './types';

export function explainElement(element: string): string {
  const descriptions: Record<string, string> = {
    Fuego: "Los signos de fuego son apasionados, energéticos y buscan la acción.",
    Tierra: "Los signos de tierra son prácticos, estables y buscan la seguridad.",
    Aire: "Los signos de aire son intelectuales, comunicativos y buscan nuevas ideas.",
    Agua: "Los signos de agua son emocionales, intuitivos y buscan la conexión profunda.",
  };
  return descriptions[element] ?? "Elemento no reconocido.";
}

export function explainTimeDifference(
  place: string,
  timezone: string
): string {
  return `La diferencia horaria entre ${place} y ${timezone} puede influir en tus ritmos y sincronización con los demás.`;
}

export function generateNatalChartInterpretation(
  chart: NatalChart[]
): string {
  return chart
    .map(({ planet, sign }) =>
      `${planet} en ${sign}: ${planetInfluences[planet][sign] ?? "Sin interpretación disponible aún."}`
    )
    .join("\n");
}