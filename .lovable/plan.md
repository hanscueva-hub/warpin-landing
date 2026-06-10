# Plan: Mejoras de copy + Sección Fundador con 2 tarjetas

## 1. Header (`Header.tsx`) — Navegación real
- Añadir 3 anclas: `Cómo funciona` (#interaccion), `Privacidad` (#privacidad), `Fundadores` (#fundador).
- Pequeño CTA secundario "Entrar" alineado a la derecha del pill (estilo glass sutil).
- Mantener logo + badge "Beta".
- Responsive: en mobile colapsar anclas (solo logo + CTA "Entrar").

## 2. Copy global — Unificación y mejoras
Cambios puntuales (mismos tokens, sin tocar layout):

| Componente | Antes | Después |
|---|---|---|
| `Hero.tsx` pill | "Radar local en vivo · Arequipa" | "Radar en vivo · Arequipa" |
| `Hero.tsx` subcopy | "mensajes temporales de tu ecosistema local" | "mensajes que desaparecen, de gente cerca de ti" |
| `InteractionSection` intro | "Un mapa interactivo con mensajes temporales…" | "Mapa en vivo. Mensajes que duran horas, no años." |
| `PrivacySection` chip | "Ubicación Ofuscada" | "Ubicación difusa" |
| `PrivacySection` tagline | "Privacidad garantizada" | "Privacidad por diseño" |
| `Footer` | "Menores de 30 años. Privacidad garantizada." | "Hecho para la generación <30 · Privacidad por diseño" |
| `FinalCTA` botón | "🔥 Reclamar mi Título de Fundador" | "🔥 Asegura tu acceso" (hace scroll a #fundador) |

## 3. Sección Fundador (`FounderSection.tsx`) — Rediseño con 2 tarjetas
Reemplazar los dos botones apilados por **dos tarjetas glass lado a lado** (stack en mobile).

**Encabezado de sección:**
- Título: `Arequipa ya está hablando. Únete a Warpin.`
- Subtítulo: `Elige tu status dentro de la app.`

### Tarjeta A — Miembro Fundador
- Badge: `Comunidad Beta`
- Título: `Miembro Fundador`
- Descripción: "Para quienes quieren estar desde el inicio. Únete a la comunidad beta y reserva tu título exclusivo dentro de WARPIN."
- Lista de beneficios (con check icon):
  - Título "Miembro Fundador" dentro de la app
  - Acceso a la comunidad beta
  - Avisos antes del lanzamiento
  - Participación en decisiones iniciales
- CTA (botón secundario glass): **"Unirme a la comunidad"** → `https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq` (target=_blank, rel=noopener)

### Tarjeta B — Fundador Élite *(destacada)*
- Estilo: borde luminoso + glow, badge "Recomendado", escala ligeramente mayor.
- Badge: `Acceso Élite`
- Título: `Fundador Élite`
- Descripción: "Para quienes quieren ayudar a construir WARPIN desde cero. Responde la encuesta, entra a la comunidad y obtén acceso prioritario a la beta."
- Beneficios:
  - Título "Fundador Élite" dentro de la app
  - Acceso anticipado prioritario
  - Reportes prioritarios dentro de la app
  - Tu feedback influirá en las primeras funciones
  - Comunidad beta exclusiva
- CTA (`.ios-button` principal): **"Completar encuesta y reclamar estatus"** → `https://tally.so/r/68PdWY` (target=_blank, rel=noopener)

Eliminar los CTAs antiguos (los dos botones apilados) de FounderSection.

## Detalles técnicos
- Archivos editados: `Header.tsx`, `Hero.tsx`, `InteractionSection.tsx`, `PrivacySection.tsx`, `FinalCTA.tsx` (botón + footer), `FounderSection.tsx`.
- Sin cambios de routing ni backend.
- Mantener tokens existentes (`glass`, `glass-strong`, `ios-button`, `--neon-*`).
- Cards: `rounded-3xl glass` con `p-8`, grid `md:grid-cols-2 gap-6`. Élite usa `ring-1 ring-primary/40` + halo blur detrás.
- Iconos check: lucide-react `Check` (ya disponible).
- Links externos: `<a target="_blank" rel="noopener noreferrer">`.
- Anclas: `#interaccion` y `#privacidad` — añadir `id` a las secciones existentes si no lo tienen.
