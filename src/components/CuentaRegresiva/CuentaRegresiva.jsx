import useReveal from '../../hooks/useReveal'
import useCuentaRegresiva from '../../hooks/useCuentaRegresiva'
import './CuentaRegresiva.css'

// Fecha y hora del evento (hora de Argentina)
const FECHA_EVENTO = new Date('2026-12-05T20:10:00-03:00')

const UNIDADES = [
  { clave: 'dias', singular: 'Día', plural: 'Días' },
  { clave: 'horas', singular: 'Hora', plural: 'Horas' },
  { clave: 'minutos', singular: 'Minuto', plural: 'Minutos' },
  { clave: 'segundos', singular: 'Segundo', plural: 'Segundos' },
]

export default function CuentaRegresiva() {
  const ref = useReveal()
  const tiempo = useCuentaRegresiva(FECHA_EVENTO)

  return (
    <section ref={ref} className="seccion cuenta">
      <h2 className="titulo aparecer delay-1">¡Ya falta poco!</h2>

      {tiempo ? (
        <div className="cuenta__grilla aparecer delay-2">
          {UNIDADES.map(({ clave, singular, plural }) => (
            <div key={clave} className="cuenta__tarjeta">
              <span key={tiempo[clave]} className="cuenta__numero">
                {String(tiempo[clave]).padStart(2, '0')}
              </span>
              <span className="cuenta__etiqueta">
                {tiempo[clave] === 1 ? singular : plural}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="subtitulo cuenta__llego aparecer delay-2">
          ¡Llegó el gran día!
        </p>
      )}

    
    </section>
  )
}