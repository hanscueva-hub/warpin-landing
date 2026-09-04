/**
 * Un solo lugar para la fecha de lanzamiento y los enlaces de las tiendas.
 * Cambiar la fecha aquí cambia el contador, el estado de los botones y los
 * textos de toda la página.
 */

/** 15 de setiembre de 2026, 10:00 a. m. hora de Perú (UTC-5). */
export const LAUNCH_ISO = "2026-09-15T10:00:00-05:00";
export const LAUNCH_MS = Date.parse(LAUNCH_ISO);

export const LAUNCH_DATE_LABEL = "15 de setiembre";
export const LAUNCH_TIME_LABEL = "10:00 a.\u00A0m.";
export const LAUNCH_FULL_LABEL = `${LAUNCH_DATE_LABEL} · ${LAUNCH_TIME_LABEL}`;

export const APP_STORE_URL = "https://apps.apple.com/app/warpin/id6806744263";

/**
 * Qué tienda ya reparte la app.
 * iOS: publicada (1.0.1, aprobada el 2026-09-04).
 * Android: todavía en prueba cerrada — la ficha pública da 404, así que el
 * botón queda en "muy pronto" hasta que pase a producción.
 */
export const TIENDA_DISPONIBLE = { ios: true, android: false };
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.warpin.warpin_app";
export const WHATSAPP_URL = "https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq";

/** Cifras que se repiten en varias secciones. Un solo lugar para cambiarlas. */
export const ACCESOS_RECLAMADOS = "1003";
export const ACCESOS_REDONDEADO = "+1.000";
export const RADIO_RADAR = "3 km";
export const CAMPUS_ACTIVOS = ["UCSM"];
