
import useReveal from '../../hooks/useReveal'
import './Confirmacion.css'
import { useEffect, useRef, useState } from 'react'

const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbytxZbrztqaKmpwikxRBIDftIlnO3BuHgZTht3eGPKE2DJ5xYLmwkpCoImaSQgv-IwDYw/exec'              // ← pegá acá la URL que termina en /exec
const FECHA_LIMITE = ''            // ← ej: '20 de noviembre' (si queda vacío, no se muestra)
const CANTIDAD_MAXIMA = 2
const RESTRICCIONES = ['Ninguna', 'Vegano', 'Vegetariano', 'Celíaco', 'Alergia', 'Otra']
const PIDEN_DETALLE = ['Alergia', 'Otra']

const invitadoVacio = () => ({ nombre: '', restriccion: 'Ninguna', detalle: '' })

export default function Confirmacion() {
  const ref = useReveal(0.1)
  const [asistencia, setAsistencia] = useState('')
  const [invitados, setInvitados] = useState([invitadoVacio()])
  const [estado, setEstado] = useState('inicial')   // inicial | enviando | enviado | error
  const [mensajeError, setMensajeError] = useState('')

  const cajaRef = useRef(null)

// Al registrarse la respuesta, centra el mensaje en la pantalla
useEffect(() => {
  if (estado === 'enviado') {
    cajaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}, [estado])

  const asiste = asistencia === 'Sí'

  const cambiarCantidad = (cantidad) => {
    setInvitados((prev) =>
      Array.from({ length: cantidad }, (_, i) => prev[i] || invitadoVacio())
    )
  }

  const cambiarInvitado = (indice, campo, valor) => {
    setInvitados((prev) =>
      prev.map((inv, i) => (i === indice ? { ...inv, [campo]: valor } : inv))
    )
  }

  const validar = () => {
    if (!asistencia) return 'Contanos si vas a poder venir.'
    if (invitados.some((inv) => inv.nombre.trim().split(/\s+/).length < 2)) {
      return 'Completá nombre y apellido de cada persona.'
    }
    if (
      asiste &&
      invitados.some((inv) => PIDEN_DETALLE.includes(inv.restriccion) && !inv.detalle.trim())
    ) {
      return 'Contanos el detalle de la alergia o restricción.'
    }
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validar()
    if (error) {
      setMensajeError(error)
      return
    }

    setMensajeError('')
    setEstado('enviando')

    const datos = {
      asistencia,
      invitados: invitados.map((inv) => ({
        nombre: inv.nombre.trim(),
        restriccion: asiste ? inv.restriccion : '',
        detalle: asiste && PIDEN_DETALLE.includes(inv.restriccion) ? inv.detalle.trim() : '',
      })),
    }

    try {
      const respuesta = await fetch(URL_SCRIPT, {
        method: 'POST',
        body: JSON.stringify(datos),
      })
      const resultado = await respuesta.json()
      if (!resultado.ok) throw new Error(resultado.error)

      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  return (
    <section ref={ref} className="seccion confirmacion">
      <h2 className="titulo aparecer delay-1">¿Venís?</h2>

      <p className="texto manuscrita confirmacion__texto aparecer delay-1">
        Nos encantaría que seas parte <br /> de este día
        {FECHA_LIMITE && (
          <> Confirmá tu asistencia antes del <strong>{FECHA_LIMITE}</strong>.</>
        )}
      </p>


{/* ===== NOTA: SOLO ADULTOS ===== */}
      <p className="texto manuscrita confirmacion__nota aparecer delay-1">
        Pensamos esta noche para que disfrutes sin horarios ni apuros, por eso será una celebración solo para adultos
      </p>






     <div ref={cajaRef} className="confirmacion__caja aparecer delay-2">
        {estado === 'enviado' ? (
          /* ===== MENSAJE DE RESPUESTA REGISTRADA ===== */
          <div className="confirmacion__gracias" role="status">
            <svg className="confirmacion__tilde" viewBox="0 0 52 52" aria-hidden="true">
              <circle cx="26" cy="26" r="24" />
              <path d="M15 27l7 7 15-15" />
            </svg>

            <p className="confirmacion__registrada">¡Tu respuesta fue registrada!</p>

            <p className="subtitulo">
              {asiste ? '¡Nos vemos en la fiesta!' : 'Gracias por avisarnos, los vamos a extrañar'}
            </p>

            <div className="confirmacion__resumen">
              <p className="texto-chico confirmacion__resumen-titulo">
                {asiste ? 'Confirmaron asistencia:' : 'Avisaron que no pueden ir:'}
              </p>
              <ul className="confirmacion__lista">
                {invitados.map((inv, i) => (
                  <li key={i} className="texto">{inv.nombre.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          /* ===== FORMULARIO ===== */
          <form className="confirmacion__form" onSubmit={handleSubmit} noValidate>
            {/* Asistencia */}
            <fieldset className="confirmacion__grupo">
              <legend className="confirmacion__etiqueta">¿Vas a poder venir?</legend>
              <div className="confirmacion__opciones">
                {[
                  { valor: 'Sí', texto: '¡Sí, voy!' },
                  { valor: 'No', texto: 'No puedo' },
                ].map((opcion) => (
                  <button
                    key={opcion.valor}
                    type="button"
                    className={`confirmacion__opcion ${
                      asistencia === opcion.valor ? 'confirmacion__opcion--activa' : ''
                    }`}
                    onClick={() => setAsistencia(opcion.valor)}
                    aria-pressed={asistencia === opcion.valor}
                  >
                    {opcion.texto}
                  </button>
                ))}
              </div>
            </fieldset>

            {asistencia && (
              <>
                {/* Cantidad */}
                <label className="confirmacion__grupo">
                  <span className="confirmacion__etiqueta">
                    {asiste ? '¿Cuántas personas van?' : '¿Cuántas personas no van a poder ir?'}
                  </span>
                  <select
                    value={invitados.length}
                    onChange={(e) => cambiarCantidad(Number(e.target.value))}
                  >
                    {Array.from({ length: CANTIDAD_MAXIMA }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </label>

                {/* Una tarjeta por persona */}
                {invitados.map((inv, i) => (
                  <div key={i} className="confirmacion__persona">
                    <p className="confirmacion__persona-titulo">Persona {i + 1}</p>

                    <label className="confirmacion__grupo">
                      <span className="confirmacion__etiqueta">Nombre y apellido</span>
                      <input
                        type="text"
                        value={inv.nombre}
                        onChange={(e) => cambiarInvitado(i, 'nombre', e.target.value)}
                        autoComplete="off"
                      />
                    </label>

                    {asiste && (
                      <label className="confirmacion__grupo">
                        <span className="confirmacion__etiqueta">Restricción alimentaria</span>
                        <select
                          value={inv.restriccion}
                          onChange={(e) => cambiarInvitado(i, 'restriccion', e.target.value)}
                        >
                          {RESTRICCIONES.map((r) => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>
                      </label>
                    )}

                    {asiste && PIDEN_DETALLE.includes(inv.restriccion) && (
                      <label className="confirmacion__grupo">
                        <span className="confirmacion__etiqueta">
                          {inv.restriccion === 'Alergia' ? '¿A qué sos alérgico/a?' : 'Contanos cuál'}
                        </span>
                        <input
                          type="text"
                          value={inv.detalle}
                          onChange={(e) => cambiarInvitado(i, 'detalle', e.target.value)}
                          autoComplete="off"
                        />
                      </label>
                    )}
                  </div>
                ))}

                {mensajeError && (
                  <p className="confirmacion__error" role="alert">{mensajeError}</p>
                )}
                {estado === 'error' && (
                  <p className="confirmacion__error" role="alert">
                    No pudimos enviar tu respuesta. Probá de nuevo en un ratito.
                  </p>
                )}

                <button
                  type="submit"
                  className="boton confirmacion__enviar"
                  disabled={estado === 'enviando'}
                >
                  {estado === 'enviando' ? 'Enviando...' : 'Enviar confirmación'}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  )
}