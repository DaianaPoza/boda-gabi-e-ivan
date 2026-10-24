import useReveal from '../../hooks/useReveal'
import './FechaHora.css'

// ===== DATOS DEL EVENTO =====
const ANIO = 2026
const MES = 11            // 0 = enero ... 11 = diciembre
const DIA_EVENTO = 5
const HORA_TEXTO = '20:10 hs'   

const DIAS_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

// Link para agendar en Google Calendar (ajustar horario de inicio y fin)
const linkCalendario =
  'https://calendar.google.com/calendar/render?' +
  new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Casamiento de Gaby e Iván',
    dates: '20261205T201000/20261206T050000',
    ctz: 'America/Argentina/Buenos_Aires',
  }).toString()

// Arma los días del mes (con espacios vacíos al inicio, semana empieza lunes)
function armarCalendario(anio, mes) {
  const primerDia = new Date(anio, mes, 1).getDay()
  const espacios = (primerDia + 6) % 7
  const diasDelMes = new Date(anio, mes + 1, 0).getDate()

  return [
    ...Array(espacios).fill(null),
    ...Array.from({ length: diasDelMes }, (_, i) => i + 1),
  ]
}

export default function FechaHora() {
  const ref = useReveal()
  const dias = armarCalendario(ANIO, MES)

  return (
    <section ref={ref} className="seccion fecha">
      <h2 className="titulo aparecer delay-1">
        Guardá este día 
      </h2>

<div className="fecha__envoltorio aparecer delay-2">
  <div className="fecha__calendario">
          <span className="fecha__cinta" aria-hidden="true" />

          <p className="subtitulo fecha__mes">Diciembre · {ANIO}</p>

          <div className="fecha__grilla">
            {DIAS_SEMANA.map((dia, i) => (
              <span key={`semana-${i}`} className="fecha__dia-semana">
                {dia}
              </span>
            ))}

            {dias.map((dia, i) => {
              const esEvento = dia === DIA_EVENTO
              return (
                <span
                  key={i}
                  className={`fecha__dia ${esEvento ? 'fecha__dia--evento' : ''}`}
                >
                  {dia}
                  {esEvento && (
                    <svg
                      className="fecha__circulo"
                      viewBox="0 0 100 100"
                      aria-hidden="true"
                    >
                      <path d="M52 6 C82 6, 97 30, 92 56 C86 86, 42 97, 16 76 C-4 58, 8 16, 46 7" />
                    </svg>
                  )}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <p className="texto manuscrita aparecer delay-3">Sábado 5 de diciembre </p>
     <p className="subtitulo fecha__hora aparecer delay-3">{HORA_TEXTO}</p>

      <a
        className="boton fecha__boton aparecer delay-4"
        href={linkCalendario}
        target="_blank"
        rel="noreferrer"
      >
        Agendar
      </a>
    </section>
  )
}