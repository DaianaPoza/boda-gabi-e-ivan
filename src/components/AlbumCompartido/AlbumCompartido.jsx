import { FiCamera } from 'react-icons/fi'
import useReveal from '../../hooks/useReveal'
import './AlbumCompartido.css'

const LINK_ALBUM = 'https://www.elgrandia.events/album/boda-gabi-e-ivan'   // ← acá va el link de El Gran Día

const PASOS = [
  'Sacá fotos y videos durante la fiesta',
  'Tocá el botón de abajo',
  'Subilas al álbum, ¡así de fácil!',
]

export default function AlbumCompartido() {
  const ref = useReveal()
  const hayLink = LINK_ALBUM !== ''

  return (
    <section ref={ref} className="seccion album">
      <div className="album__icono aparecer delay-1" aria-hidden="true">
        <FiCamera />
        <span className="album__flash" />
      </div>

      <h2 className="titulo aparecer delay-1">¡Que no se pierda ningún momento!</h2>

     <p className="texto manuscrita album__texto aparecer delay-2">
        Queremos ver la fiesta desde tus ojos.
        Compartí tus fotos en nuestro álbum.
      </p>

      <ol className="album__pasos aparecer delay-2">
        {PASOS.map((paso, i) => (
          <li key={i} className="album__paso">
            <span className="album__numero">{i + 1}</span>
            <span className="texto">{paso}</span>
          </li>
        ))}
      </ol>

      {hayLink ? (
        <a
          className="boton album__boton aparecer delay-3"
          href={LINK_ALBUM}
          target="_blank"
          rel="noreferrer"
        >
          <FiCamera aria-hidden="true" />
          Subir fotos
        </a>
      ) : (
        <span className="boton album__boton album__boton--pronto aparecer delay-3">
          <FiCamera aria-hidden="true" />
          ¡Muy pronto!
        </span>
      )}
    </section>
  )
}