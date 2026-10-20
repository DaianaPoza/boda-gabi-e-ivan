import useReveal from '../../hooks/useReveal'
import { FaSpotify } from 'react-icons/fa'
import './Playlist.css'

const LINK_PLAYLIST = ''   // ← acá va el link de la playlist colaborativa

export default function Playlist() {
  const ref = useReveal()
  const hayLink = LINK_PLAYLIST !== ''

  return (
    <section ref={ref} className="seccion playlist">
      <div className="playlist__notas aparecer delay-1" aria-hidden="true">
        <svg className="playlist__nota" viewBox="0 0 24 24">
          <path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
        </svg>
        <svg className="playlist__nota playlist__nota--chica" viewBox="0 0 24 24">
          <path d="M12 18V4l6 2M12 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
        </svg>
      </div>

      <h2 className="titulo aparecer delay-1">¡Armemos la playlist!</h2>

      <p className="texto playlist__texto aparecer delay-2">
      ¡¡  Queremos que la fiesta <br />suene para todos!!
      <br />  Sumá sos temas que te hacen <br /> salir a bailar
      </p>

      {hayLink ? (
        <a
          className="boton playlist__boton aparecer delay-3"
          href={LINK_PLAYLIST}
          target="_blank"
          rel="noreferrer"
        >
          <FaSpotify className="playlist__spotify" aria-hidden="true" />
          Sumar canciones
        </a>
      ) : (
        <span className="boton playlist__boton playlist__boton--pronto aparecer delay-3">
<FaSpotify className="playlist__spotify" aria-hidden="true" />
          ¡Muy pronto!
        </span>
      )}
    </section>
  )
}