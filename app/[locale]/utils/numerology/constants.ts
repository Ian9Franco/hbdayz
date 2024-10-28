// Tabla de valores numéricos de las letras (A=1, B=2, ..., Z=26)
export const letterValues: Record<string, number> = {};
'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((char, i) => {
  letterValues[char] = (i % 9) + 1; // Ciclo de valores de 1 a 9
});

// Números maestros y otros números que no se reducirán
export const masterNumbers = [11, 22, 33];

// Vocales para cálculos
export const vowels = 'AEIOU';