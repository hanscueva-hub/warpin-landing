import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad | WARPIN" },
      {
        name: "description",
        content:
          "Política de Privacidad de Warpin. Conoce cómo protegemos tus datos personales, cómo tratamos tu ubicación y cuáles son tus derechos según la Ley N.º 29733 del Perú.",
      },
      { property: "og:title", content: "Política de Privacidad | WARPIN" },
      {
        property: "og:description",
        content:
          "Conoce cómo protegemos tus datos personales, cómo tratamos tu ubicación y cuáles son tus derechos según la Ley N.º 29733 del Perú.",
      },
      { property: "og:url", content: "https://warpin.app/privacidad" },
    ],
    links: [{ rel: "canonical", href: "https://warpin.app/privacidad" }],
  }),
  component: PrivacidadPage,
});

function PrivacidadPage() {
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
              to="/terminos"
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              Términos
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
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Documento Legal
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Política de Privacidad de Warpin
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>Última actualización:</strong> 27 de agosto de 2026
            </p>
          </div>

          {/* Legal Text Card */}
          <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 text-[15px] sm:text-base leading-relaxed space-y-8 text-foreground/90">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                1. Quiénes somos
              </h2>
              <p className="text-muted-foreground">
                Warpin es una aplicación móvil de comunicación entre estudiantes, activa dentro de una zona delimitada de Arequipa, Perú.
              </p>
              <p className="text-muted-foreground">
                El responsable del tratamiento de tus datos es <strong className="text-white">Hans Haler Cueva Huamani</strong>, con domicilio en <strong className="text-white">Arequipa, Perú</strong>.
              </p>
              <p className="text-muted-foreground">
                Para cualquier consulta sobre esta política o sobre tus datos, escríbenos a{" "}
                <a href="mailto:admin@warpin.app" className="text-cyan hover:underline font-medium">
                  admin@warpin.app
                </a>.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                2. Qué datos recogemos
              </h2>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-white/95">
                  Los que nos das al registrarte
                </h3>
                <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                  <li><strong className="text-white">Correo electrónico.</strong> Lo usamos para verificar tu cuenta y para recuperar tu contraseña.</li>
                  <li><strong className="text-white">Contraseña.</strong> No la guardamos. Se almacena cifrada y de forma irreversible; nadie de Warpin puede verla.</li>
                  <li><strong className="text-white">Nombre, nombre de usuario (<code>@</code>), fecha de nacimiento, carrera, descripción e intereses.</strong></li>
                  <li><strong className="text-white">Hasta tres fotos de perfil.</strong></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-white/95">
                  Los que se generan al usar la app
                </h3>
                <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                  <li><strong className="text-white">Contenido que publicas:</strong> pines, comentarios, mensajes de chat y las fotos que adjuntes a cualquiera de ellos.</li>
                  <li><strong className="text-white">Tus conexiones con otras personas.</strong></li>
                  <li><strong className="text-white">Ubicación</strong>, únicamente en el momento en que publicas un pin. Ver la sección 3.</li>
                  <li><strong className="text-white">Actividad de tu cuenta:</strong> puntos de experiencia, títulos, número de pines publicados y de conexiones.</li>
                  <li><strong className="text-white">Preferencias de notificaciones</strong> y un identificador técnico de tu dispositivo, necesario para poder enviártelas.</li>
                  <li><strong className="text-white">Reportes y sanciones</strong>, si reportas a alguien o si un moderador aplica una medida sobre tu cuenta.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-semibold text-white/95">
                  Lo que NO recogemos
                </h3>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                    <li>No accedemos a tu lista de contactos.</li>
                    <li>No accedemos a tu cámara: solo a las fotos que tú eliges de tu galería.</li>
                    <li>No usamos publicidad ni compartimos tus datos con anunciantes.</li>
                    <li>No hacemos perfilado publicitario ni vendemos datos a nadie.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                3. Cómo tratamos tu ubicación
              </h2>
              <p className="text-muted-foreground">
                Esto merece su propia sección porque es el dato más sensible que maneja Warpin.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>
                  <strong className="text-white">Solo leemos tu ubicación mientras usas la app.</strong> Warpin <strong className="text-white">no</strong> te rastrea en segundo plano ni cuando la app está cerrada. En iPhone el permiso solicitado es explícitamente &quot;mientras se usa la app&quot;.
                </li>
                <li>
                  <strong className="text-white">Solo guardamos una ubicación cuando publicas un pin.</strong> Moverte por el campus no genera ningún registro.
                </li>
                <li>
                  <strong className="text-white">La coordenada del pin es pública</strong> para las personas que usan Warpin dentro del campus. Es el propósito de la app: un pin es un mensaje anclado a un lugar.
                </li>
                <li>
                  <strong className="text-white">Puedes activar &quot;proteger ubicación&quot; al publicar.</strong> Si lo haces, guardamos un punto <strong className="text-white">desplazado entre 30 y 40 metros en una dirección al azar</strong>, y tu coordenada exacta nunca sale de tu teléfono.
                </li>
                <li>
                  <strong className="text-white">Si no la activas, la coordenada que guardamos es exacta.</strong> Tenlo presente al publicar desde tu casa, tu habitación o cualquier sitio que no quieras señalar.
                </li>
                <li>
                  <strong className="text-white">Warpin solo funciona dentro de una zona delimitada de Arequipa:</strong> un radio de aproximadamente <strong className="text-white">2 km</strong> alrededor de Umacollo, que abarca León XIII, Yanahuara, la UCSM, el Centro Histórico y Vallecito. Un pin cuyas coordenadas caigan fuera de esa zona es rechazado por nuestro servidor, no solo por la aplicación.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                4. Para qué usamos tus datos y con qué base legal
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-display text-white">
                      <th className="px-4 py-3 font-semibold">Para qué</th>
                      <th className="px-4 py-3 font-semibold">Base legal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-muted-foreground">
                    <tr>
                      <td className="px-4 py-3 text-white/90">Crear y mantener tu cuenta</td>
                      <td className="px-4 py-3">Ejecución del servicio que solicitaste</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/90">Mostrar tu perfil y tu contenido a otros usuarios</td>
                      <td className="px-4 py-3">Ejecución del servicio</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/90">Enviarte notificaciones sobre actividad relevante</td>
                      <td className="px-4 py-3">Ejecución del servicio; puedes desactivarlas cuando quieras</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/90">Verificar que perteneces a la comunidad universitaria</td>
                      <td className="px-4 py-3">Interés legítimo en mantener el campus cerrado</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/90">Moderar contenido, atender reportes y aplicar sanciones</td>
                      <td className="px-4 py-3">Interés legítimo en la seguridad de los usuarios</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-white/90">Cumplir obligaciones legales</td>
                      <td className="px-4 py-3">Obligación legal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                5. Con quién se comparten
              </h2>
              <p className="text-muted-foreground">
                <strong className="text-white">No vendemos tus datos ni los cedemos con fines comerciales.</strong> Compartimos lo estrictamente necesario con los proveedores que hacen funcionar la app:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 font-display text-white">
                      <th className="px-4 py-3 font-semibold">Proveedor</th>
                      <th className="px-4 py-3 font-semibold">Para qué</th>
                      <th className="px-4 py-3 font-semibold">Qué recibe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-muted-foreground">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Supabase</td>
                      <td className="px-4 py-3">Alojamiento, base de datos, cuentas y almacenamiento de fotos</td>
                      <td className="px-4 py-3">Todos los datos de la sección 2</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Google (Firebase Cloud Messaging)</td>
                      <td className="px-4 py-3">Envío de notificaciones push</td>
                      <td className="px-4 py-3">Un identificador del dispositivo y el contenido del aviso</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Mapbox</td>
                      <td className="px-4 py-3">Mostrar el mapa</td>
                      <td className="px-4 py-3">Coordenadas aproximadas para dibujar el mapa en tu pantalla</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-white">Brevo</td>
                      <td className="px-4 py-3">Envío de los correos de verificación</td>
                      <td className="px-4 py-3">Tu correo electrónico</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground">
                Tus datos se alojan en servidores ubicados en <strong className="text-white">Sudamérica (región <code>sa-east-1</code>)</strong>.
              </p>
              <p className="text-muted-foreground">
                También podemos entregar datos si nos lo exige una autoridad competente mediante requerimiento válido.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                6. Cuánto tiempo los conservamos
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li><strong className="text-white">Tu perfil y tu contenido:</strong> mientras tu cuenta exista.</li>
                <li><strong className="text-white">Pines:</strong> se borran automáticamente <strong className="text-white">48 horas después de vencer</strong>. Las 48 horas son una ventana para poder atender reportes.</li>
                <li><strong className="text-white">Fotos de pines borrados:</strong> se eliminan del almacenamiento <strong className="text-white">48 horas después</strong> del borrado del pin.</li>
                <li><strong className="text-white">Mensajes de chat:</strong> se conservan mientras la conversación exista para alguno de los participantes.</li>
                <li><strong className="text-white">Registros de moderación</strong> (reportes y sanciones): se conservan aunque la cuenta implicada se elimine, porque son necesarios para poder moderar de forma justa ante una reincidencia. Se conservan <strong className="text-white">desvinculados de tu identidad</strong> cuando eliminas tu cuenta.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                7. Tus derechos
              </h2>
              <p className="text-muted-foreground">
                Puedes ejercer en cualquier momento tus derechos de <strong className="text-white">acceso, rectificación, cancelación y oposición</strong> sobre tus datos, conforme a la <strong className="text-white">Ley N.º 29733 de Protección de Datos Personales del Perú</strong> y su reglamento.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li><strong className="text-white">Rectificación:</strong> puedes editar tu perfil directamente desde la app.</li>
                <li><strong className="text-white">Eliminación de tu cuenta:</strong> desde <strong className="text-white">Ajustes → Cuenta → Eliminar mi cuenta</strong>. También puedes solicitarlo escribiendo a <a href="mailto:admin@warpin.app" className="text-cyan underline">admin@warpin.app</a> sin necesidad de instalar la app.</li>
                <li><strong className="text-white">Acceso a tus datos:</strong> escríbenos a <a href="mailto:admin@warpin.app" className="text-cyan underline">admin@warpin.app</a> y te entregaremos una copia.</li>
              </ul>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
                <p className="font-semibold text-white">Qué ocurre al eliminar tu cuenta:</p>
                <ul className="space-y-1 list-disc pl-5 text-muted-foreground text-sm">
                  <li>Se borran tu perfil, tus fotos, tus pines y tus comentarios.</li>
                  <li><strong className="text-white">Tus mensajes de chat se conservan</strong>, pero dejan de estar asociados a tu identidad y aparecen como <em>&quot;Usuario eliminado&quot;</em>. Lo hacemos así porque borrarlos mutilaría la conversación de la otra persona, que no pidió eliminar nada.</li>
                  <li>Los registros de moderación se conservan desvinculados de tu identidad, como se indica en la sección 6.</li>
                </ul>
              </div>

              <p className="text-xs text-muted-foreground">
                Tienes además derecho a presentar una reclamación ante la <strong className="text-white">Autoridad Nacional de Protección de Datos Personales del Perú</strong>.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                8. Menores de edad
              </h2>
              <p className="text-muted-foreground">
                Warpin está dirigida a estudiantes universitarios. Para usarla debes tener al menos <strong className="text-white">16 años</strong>.
              </p>
              <p className="text-muted-foreground">
                Pedimos tu fecha de nacimiento durante el registro. Si detectamos una cuenta de una persona por debajo de esa edad, la eliminaremos junto con sus datos.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                9. Seguridad
              </h2>
              <ul className="space-y-1.5 list-disc pl-5 text-muted-foreground">
                <li>Toda la comunicación entre la app y nuestros servidores viaja <strong className="text-white">cifrada (HTTPS)</strong>.</li>
                <li>Las contraseñas se almacenan cifradas de forma irreversible.</li>
                <li>El acceso a los datos está restringido por reglas aplicadas <strong className="text-white">en el servidor</strong>, no en la aplicación, de modo que nadie pueda saltárselas modificando la app.</li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                <strong className="text-white not-italic">Con honestidad:</strong> ningún sistema es completamente seguro. Si ocurriera una brecha que afecte a tus datos personales, te lo comunicaremos y lo notificaremos a la autoridad conforme a la ley.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                10. Cambios en esta política
              </h2>
              <p className="text-muted-foreground">
                Si modificamos esta política, actualizaremos la fecha del encabezado y te avisaremos dentro de la app cuando el cambio sea relevante. Los cambios sustanciales se notificarán con antelación razonable.
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white border-b border-white/10 pb-2">
                11. Contacto
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
            <Link to="/privacidad" className="text-cyan font-semibold">Privacidad</Link>
            <Link to="/terminos" className="hover:text-white transition-colors">Términos</Link>
            <a href="mailto:admin@warpin.app" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
