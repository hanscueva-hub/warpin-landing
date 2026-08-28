import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos de Uso | WARPIN" },
      {
        name: "description",
        content:
          "Términos de Uso de Warpin. Conoce las condiciones, normas de convivencia, moderación y sanciones en la comunidad universitaria.",
      },
      { property: "og:title", content: "Términos de Uso | WARPIN" },
      {
        property: "og:description",
        content:
          "Términos de Uso de Warpin. Conoce las condiciones, normas de convivencia, moderación y sanciones en la comunidad universitaria.",
      },
      { property: "og:url", content: "https://warpin.app/terminos" },
    ],
    links: [{ rel: "canonical", href: "https://warpin.app/terminos" }],
  }),
  component: TerminosPage,
});

function TerminosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-magenta/40 selection:text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-3 left-0 right-0 z-50 px-4 md:top-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full glass-strong px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2 pl-1 text-[15px] font-bold tracking-tight text-white">
            <img
              src="/warpin-logo.png"
              alt="WARPIN"
              className="h-8 w-8 rounded-lg object-cover shadow-[inset_0_1px_0_oklch(1_0_0/0.3),0_4px_12px_-2px_oklch(0.6_0.23_305/0.5)]"
            />
            WARPIN
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              Inicio
            </Link>
            <Link
              to="/privacidad"
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              Privacidad
            </Link>
            <a
              href="https://chat.whatsapp.com/IK4zPo8yN4gIc9Y5RY1ecq"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_oklch(1_0_0/0.25)] transition-colors hover:bg-white/15"
            >
              Comunidad
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-magenta/15 blur-[140px]" />
          <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-cyan/15 blur-[160px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Back link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Volver al inicio
            </Link>
          </div>

          {/* Title Card */}
          <div className="glass rounded-3xl p-8 sm:p-10 mb-8 border border-white/10 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 mb-4 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
              Documento Legal
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Términos de Uso de Warpin
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Última actualización:</strong> 28 de agosto de 2026
            </p>
          </div>

          {/* Legal Text Card */}
          <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 text-[15px] sm:text-base leading-relaxed space-y-8 text-foreground/90">
            
            <div className="space-y-3 border-b border-white/10 pb-6">
              <p className="text-white/95 font-medium">
                Al crear una cuenta en Warpin aceptas estos términos. Si no estás de acuerdo con ellos, no uses la aplicación.
              </p>
              <p className="text-muted-foreground">
                Warpin es operada por <strong className="text-white">Hans Haler Cueva Huamani</strong>, con domicilio en <strong className="text-white">Arequipa, Perú</strong>. Contacto:{" "}
                <a href="mailto:admin@warpin.app" className="text-cyan hover:underline font-medium">
                  admin@warpin.app
                </a>.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                1. Qué es Warpin
              </h2>
              <p className="text-muted-foreground">
                Warpin es una aplicación para dejar mensajes anclados a un lugar —llamados <strong className="text-white">pines</strong>— y comunicarte con otras personas de tu comunidad universitaria.
              </p>
              <p className="text-muted-foreground">
                Funciona <strong className="text-white">solo dentro de una zona delimitada de Arequipa</strong>: un radio de aproximadamente 2 km alrededor de Umacollo, que abarca León XIII, Yanahuara, la UCSM, el Centro Histórico y Vallecito. Fuera de esa zona no puedes publicar.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                2. Quién puede usarla
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Debes tener <strong className="text-white">16 años o más</strong>.</li>
                <li>Necesitas un <strong className="text-white">correo institucional</strong> (<code>.edu</code>) o un <strong className="text-white">código de fundador</strong> válido.</li>
                <li><strong className="text-white">Una persona, una cuenta.</strong> No puedes crear cuentas para otros ni hacerte pasar por alguien más.</li>
                <li>La información que registras —tu nombre, tu carrera, tu fecha de nacimiento— debe ser verdadera.</li>
              </ul>
              <p className="text-xs text-muted-foreground">
                Si descubrimos que una cuenta incumple lo anterior, podemos eliminarla.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                3. Tu contenido es tuyo, y eres responsable de él
              </h2>
              <p className="text-muted-foreground">
                <strong className="text-white">Conservas la propiedad de todo lo que publicas.</strong> No reclamamos derechos sobre tus pines, comentarios, mensajes ni fotos.
              </p>
              <p className="text-muted-foreground">
                Nos das permiso para almacenarlo y mostrarlo dentro de Warpin, únicamente para que la aplicación funcione. Ese permiso termina cuando borras el contenido o eliminas tu cuenta.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-white">Eres responsable de lo que publicas.</strong> Solo publica contenido que sea tuyo o que tengas derecho a compartir.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                4. Lo que no está permitido
              </h2>
              <p className="text-muted-foreground">No puedes usar Warpin para:</p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li><strong className="text-white">Acosar, amenazar, intimidar o hostigar</strong> a nadie.</li>
                <li>Publicar contenido <strong className="text-white">sexual explícito</strong>, violento o que incite al odio.</li>
                <li>Publicar <strong className="text-white">datos personales de otras personas</strong> sin su consentimiento: su ubicación, su teléfono, sus fotos, su horario.</li>
                <li><strong className="text-white">Suplantar</strong> a otra persona o a una institución.</li>
                <li>Difundir <strong className="text-white">spam</strong>, publicidad no solicitada o estafas.</li>
                <li><strong className="text-white">Falsificar tu ubicación</strong> para publicar pines donde no estás.</li>
                <li>Intentar <strong className="text-white">acceder a datos, cuentas o partes del sistema</strong> que no te corresponden, o interferir con el funcionamiento del servicio.</li>
                <li>Extraer datos de forma automatizada.</li>
                <li>Publicar contenido que <strong className="text-white">infrinja derechos de autor</strong> o cualquier otro derecho de terceros.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                5. Los pines son efímeros
              </h2>
              <p className="text-muted-foreground">
                Cada pin tiene un tiempo de vida que tú eliges al publicarlo. Cuando vence, deja de mostrarse.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-white">Se elimina de nuestros servidores 48 horas después de vencer</strong>, junto con sus fotos. Esas 48 horas son una ventana para poder atender reportes.
              </p>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-rose-200 text-sm">
                ⚠️ <strong className="text-rose-100">Un pin vencido no se puede recuperar.</strong> Si quieres conservar algo, guárdalo por tu cuenta antes.
              </div>
              <p className="text-muted-foreground">
                Los mensajes de chat <strong className="text-white">no</strong> son efímeros: se conservan mientras la conversación exista.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                6. Moderación y sanciones
              </h2>
              <p className="text-muted-foreground">
                Cualquier persona puede reportar contenido o cuentas desde la aplicación. Revisamos los reportes y podemos aplicar estas medidas:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-display text-white">
                      <th className="px-4 py-3 font-semibold">Nivel</th>
                      <th className="px-4 py-3 font-semibold">Qué implica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-muted-foreground">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Advertencia</td>
                      <td className="px-4 py-3">Recibes un aviso. No pierdes ninguna función</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Silencio</td>
                      <td className="px-4 py-3">No puedes publicar pines ni comentar</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Suspensión</td>
                      <td className="px-4 py-3">Lo anterior, y además no puedes chatear, conectar, vibrar ni seguir pines</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Total</td>
                      <td className="px-4 py-3">Lo anterior, y además no puedes cambiar preferencias. Solo puedes apelar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground">
                <strong className="text-white">En ningún nivel te impedimos leer.</strong> Y salvo en el nivel total, <strong className="text-white">siempre puedes seguir reportando</strong>: si te están acosando, debes poder denunciarlo aunque estés sancionado.
              </p>
              <p className="text-muted-foreground">
                Las sanciones pueden ser temporales o indefinidas, según la gravedad y la reincidencia.
              </p>

              <div className="space-y-2 pt-2">
                <h3 className="font-display text-lg font-semibold text-white/95">
                  Apelaciones
                </h3>
                <p className="text-muted-foreground">
                  Si crees que una sanción es injusta, <strong className="text-white">puedes apelarla una vez</strong> desde la aplicación, explicando tu caso. Revisaremos la apelación y te responderemos por el mismo medio.
                </p>
                <p className="text-muted-foreground">
                  Conservamos el registro de las sanciones aunque se levanten. Sin ese historial no podríamos moderar de forma justa ante una reincidencia.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                7. Bloquear a otras personas
              </h2>
              <p className="text-muted-foreground">
                Puedes bloquear a cualquiera. Al hacerlo, dejan de verse mutuamente el contenido y no pueden escribirse. Bloquear <strong className="text-white">no</strong> es lo mismo que reportar: son acciones distintas y cada una tiene su botón.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                8. Tu cuenta
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Eres responsable de mantener tu contraseña en secreto y de la actividad de tu cuenta.</li>
                <li>Si sospechas que alguien accedió a ella, escríbenos a <a href="mailto:admin@warpin.app" className="text-cyan underline">admin@warpin.app</a>.</li>
                <li><strong className="text-white">Puedes eliminar tu cuenta cuando quieras</strong> desde Ajustes → Cuenta. Qué se borra y qué se conserva está detallado en nuestra <Link to="/privacidad" className="text-cyan underline">Política de Privacidad</Link>.</li>
                <li>Podemos suspender o cerrar tu cuenta si incumples estos términos. Salvo en casos graves, te lo comunicaremos y podrás apelar.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                9. El servicio se ofrece tal como está
              </h2>
              <p className="text-muted-foreground">
                Warpin es un producto en desarrollo. Nos esforzamos por que funcione bien, pero:
              </p>
              <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                <li><strong className="text-white">No garantizamos</strong> que esté disponible sin interrupciones ni que esté libre de errores.</li>
                <li><strong className="text-white">No garantizamos</strong> que no se pierdan datos. Guarda por tu cuenta lo que te importe.</li>
                <li>Podemos <strong className="text-white">cambiar, suspender o descontinuar</strong> funciones. Si un cambio es sustancial, avisaremos con antelación razonable.</li>
                <li><strong className="text-white">No somos responsables del contenido que publican otros usuarios</strong> ni de lo que ocurra entre personas fuera de la aplicación.</li>
              </ul>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4 text-rose-200 text-sm">
                ⚠️ <strong className="text-rose-100">Sobre encontrarte con gente:</strong> Warpin conecta a personas de tu campus. Lo que decidas hacer fuera de la aplicación es tu decisión y tu responsabilidad. Usa el mismo criterio que usarías con cualquier desconocido.
              </div>
              <p className="text-xs text-muted-foreground">
                En la medida en que la ley lo permita, nuestra responsabilidad se limita al perjuicio directo y comprobable causado por nosotros.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                10. Propiedad de Warpin
              </h2>
              <p className="text-muted-foreground">
                El nombre, el logotipo, el diseño y el código de Warpin nos pertenecen. Estos términos no te dan derecho a usarlos fuera de la aplicación.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                11. Cambios en estos términos
              </h2>
              <p className="text-muted-foreground">
                Si los modificamos, actualizaremos la fecha del encabezado y te avisaremos dentro de la aplicación cuando el cambio sea relevante. Seguir usando Warpin después de un cambio significa que lo aceptas.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                12. Ley aplicable
              </h2>
              <p className="text-muted-foreground">
                Estos términos se rigen por las <strong className="text-white">leyes de la República del Perú</strong>. Cualquier controversia se someterá a los jueces y tribunales de <strong className="text-white">Arequipa, Perú</strong>.
              </p>
              <p className="text-xs text-muted-foreground">
                Nada en estos términos limita los derechos que la ley peruana te reconoce como consumidor.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                13. Contacto
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="font-mono text-sm text-white">admin@warpin.app</span>
                <a
                  href="mailto:admin@warpin.app"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                >
                  Enviar correo
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-6 bg-black/40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">WARPIN</span>
            <span>© 2026 Hans Haler Cueva Huamani. Arequipa, Perú.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <Link to="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            <Link to="/terminos" className="text-magenta font-semibold">Términos</Link>
            <a href="mailto:admin@warpin.app" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
