/**
 * WARPIN Brand Book 2026 - Algoritmo Unificado de Jittering (Levitación Orgánica)
 * 
 * Calcula un desplazamiento 2D (x, y) suave e impredecible utilizando ondas sinusoides
 * de frecuencias no armónicas, emulando la flotación física sobre el agua.
 * Se utiliza para proteger la privacidad del usuario difuminando su posición exacta.
 * 
 * @param timeSeconds Tiempo transcurrido en segundos (Date.now() / 1000)
 * @param amplitude Amplitud máxima del desfase en píxeles (por defecto 8px)
 */
export function calculateJitter(timeSeconds: number, amplitude: number = 8) {
  const x = Math.sin(timeSeconds * 1.3) * 0.6 + Math.cos(timeSeconds * 0.7) * 0.4;
  const y = Math.cos(timeSeconds * 1.1) * 0.6 + Math.sin(timeSeconds * 0.5) * 0.4;

  return {
    x: x * amplitude,
    y: y * amplitude,
  };
}
