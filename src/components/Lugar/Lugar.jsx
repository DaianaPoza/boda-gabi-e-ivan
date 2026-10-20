import useReveal from '../../hooks/useReveal'
import './Lugar.css'

const crearLinkMaps = (direccion) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`

const LUGARES = [
  {
    id: 'ceremonia',
    etiqueta: 'Ceremonia',
    nombre: 'Iglesia Santa Teresita',
    direccion: 'Villarino 460',
    horario: '20:10 hs',
    boton: 'Cómo llegar a la iglesia',
    busqueda: 'Iglesia Santa Teresita, Villarino 460, Bahía Blanca',
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2v4M10 4h4M5 21V11l7-5 7 5v10M9 21v-5a3 3 0 0 1 6 0v5M3 21h18" />
      </svg>
    ),
  },
  {
    id: 'fiesta',
    etiqueta: 'Fiesta',
    nombre: 'Revoque Eventos',
    direccion: 'Hipólito Yrigoyen 3825',
    horario: 'A continuación',
    boton: 'Cómo llegar al salón',
    busqueda: 'Revoque Eventos, Hipólito Yrigoyen 3825, Bahía Blanca',
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 2h8l-1 7a3 3 0 0 1-6 0zM12 12v8M8 22h8" />
      </svg>
    ),
  },
]

export default function Lugar() {
  const ref = useReveal(0.1)

  return (
    <section ref={ref} className="seccion lugar">
      <h2 className="titulo aparecer delay-1">¿Dónde?</h2>
      <p className="texto aparecer delay-1">Bahía Blanca</p>

      {LUGARES.map((lugar, i) => (
        <div key={lugar.id} className="lugar__bloque">
          {i > 0 && (
            <div className="lugar__conector aparecer delay-2">
              <span className="lugar__linea" />
              <p className="subtitulo lugar__despues">y después, ¡a festejar!</p>
              <span className="lugar__linea" />
            </div>
          )}

          <div className={`aparecer ${i === 0 ? 'delay-2' : 'delay-3'}`}>
            <article className="lugar__tarjeta">
              <span className="lugar__cinta" aria-hidden="true" />

              <span className="lugar__icono">{lugar.icono}</span>
              <p className="texto-chico lugar__etiqueta">{lugar.etiqueta}</p>
              <h3 className="subtitulo lugar__nombre">{lugar.nombre}</h3>
              <p className="texto">{lugar.direccion}</p>
              <p className="texto lugar__horario">{lugar.horario}</p>

              <a
                className="boton lugar__boton"
                href={crearLinkMaps(lugar.busqueda)}
                target="_blank"
                rel="noreferrer"
              >
                {lugar.boton}
              </a>
            </article>
          </div>
        </div>
      ))}
    </section>
  )
}